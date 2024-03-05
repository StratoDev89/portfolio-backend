import { Router } from "express";
import { ProjectController } from "./project.controller";
import {
  ProjectMySqlDatasourceImpl,
  ProjectRepositoryImpl,
} from "../../infraestructure";
import { ValidationMiddelware, AuthMiddelware } from "..";
import { MulterAdapter } from "../../config/";

export class ProjectRoutes {
  static get routes(): Router {
    const router = Router();
    const projectMySqlDatasourceImpl = new ProjectMySqlDatasourceImpl();

    const projectRepositoryImpl = new ProjectRepositoryImpl(
      projectMySqlDatasourceImpl
    );

    const controller = new ProjectController(projectRepositoryImpl);

    router.post(
      "",
      AuthMiddelware.checkAuthHeaders,
      MulterAdapter.fileMiddelware().single("image"),
      ValidationMiddelware.validateCreateProjectData,
      controller.create
    );

    router.get("", controller.getAll);

    router.get(
      "/:id",
      controller.get
    );

    router.put(
      "/:id",
      AuthMiddelware.checkAuthHeaders,
      MulterAdapter.fileMiddelware().single("image"),
      ValidationMiddelware.validateUpdateProjectData,
      controller.update
    );

    router.delete(
      "/:id",
      AuthMiddelware.checkAuthHeaders,
      controller.delete
    );

    return router;
  }
}
