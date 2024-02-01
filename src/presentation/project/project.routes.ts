import { Router } from "express";
import { ProjectController } from "./project.controller";
import {
  ProjectDatasourceImpl,
  ProjectRepositoryImpl,
} from "../../infraestructure";
import { ValidationMiddelware, AuthMiddelware } from "..";
import { MulterAdapter } from "../../config/";

export class ProjectRoutes {
  static get routes(): Router {
    const router = Router();
    const projectDatasourceImpl = new ProjectDatasourceImpl();
    const projectRepositoryImpl = new ProjectRepositoryImpl(
      projectDatasourceImpl
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

    router.get("/:id", ValidationMiddelware.mongoIdValidator, controller.get);

    router.put(
      "/:id",
      AuthMiddelware.checkAuthHeaders,
      ValidationMiddelware.mongoIdValidator,
      ValidationMiddelware.validateUpdateProjectData,
      controller.update
    );
    
    router.delete(
      "/:id",
      AuthMiddelware.checkAuthHeaders,
      ValidationMiddelware.mongoIdValidator,
      controller.delete
    );

    return router;
  }
}
