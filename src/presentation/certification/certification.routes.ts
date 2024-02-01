import { Router } from "express";
import { CertificationtController } from "./certification.controller";
import {
  CertificationDatasourceImpl,
  CertificationRepositoryImpl,
} from "../../infraestructure";
import { ValidationMiddelware, AuthMiddelware } from "..";
import { MulterAdapter } from "../../config/multer.adapter";

export class CertificationRoutes {
  static get routes(): Router {
    const router = Router();

    const certificationDatasourceImpl = new CertificationDatasourceImpl();
    const certificationRepositoryImpl = new CertificationRepositoryImpl(
      certificationDatasourceImpl
    );

    const controller = new CertificationtController(
      certificationRepositoryImpl
    );

    router.post(
      "",
      AuthMiddelware.checkAuthHeaders,
      MulterAdapter.fileMiddelware().single("file"),
      ValidationMiddelware.validateCreateCertificationData,
      controller.create
    );

    router.get("", controller.getAll);

    router.get("/:id", ValidationMiddelware.mongoIdValidator, controller.get);

    router.put(
      "/:id",
      AuthMiddelware.checkAuthHeaders,
      ValidationMiddelware.mongoIdValidator,
      ValidationMiddelware.validateUpdateCertificationData,
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

// ```
//  - seharia una carpeta en certification con su router y su controller para el file upload
//  - la ruta debe se algo como single/:type/:img
//  el type es para ser flexible por si la imagen es de proyecto o certification

//  lo manejaria a traves de un servicio porq sera compartido entre el datasource de proyectos y de certificaticons

// el servicio debe verificar si existe la carpeta de desitno
// se neceista el archvo el foulder
// extensiones validas
// necesito uuid
// express fileupload
// ```
