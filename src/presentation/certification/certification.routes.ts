import { Router } from "express";
import { CertificationtController } from "./certification.controller";
import {
  // CertificationDatasourceImpl,
  CertificationMySqlDatasourceImpl,
  CertificationRepositoryImpl,
} from "../../infraestructure";
import { ValidationMiddelware, AuthMiddelware } from "..";

export class CertificationRoutes {
  static get routes(): Router {
    const router = Router();

    // const certificationDatasourceImpl = new CertificationDatasourceImpl();
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
      // ValidationMiddelware.mongoIdValidator,
      controller.get
    );

    router.put(
      "/:id",
      AuthMiddelware.checkAuthHeaders,
      // ValidationMiddelware.mongoIdValidator,
      ValidationMiddelware.validateUpdateCertificationData,
      controller.update
    );

    router.delete(
      "/:id",
      AuthMiddelware.checkAuthHeaders,
      // ValidationMiddelware.mongoIdValidator,
      controller.delete
    );

    return router;
  }
}
