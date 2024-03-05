import { Router } from "express";
import { CertificationtController } from "./certification.controller";
import {
  CertificationMySqlDatasourceImpl,
  CertificationRepositoryImpl,
} from "../../infraestructure";
import { ValidationMiddelware, AuthMiddelware } from "..";

export class CertificationRoutes {
  static get routes(): Router {
    const router = Router();

    const certificationMySqlDatasourceImpl =
      new CertificationMySqlDatasourceImpl();

    const certificationRepositoryImpl = new CertificationRepositoryImpl(
      certificationMySqlDatasourceImpl
    );

    const controller = new CertificationtController(
      certificationRepositoryImpl
    );

    router.post(
      "",
      AuthMiddelware.checkAuthHeaders,
      ValidationMiddelware.validateCreateCertificationData,
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
      ValidationMiddelware.validateUpdateCertificationData,
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
