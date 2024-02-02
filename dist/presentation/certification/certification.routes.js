"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificationRoutes = void 0;
const express_1 = require("express");
const certification_controller_1 = require("./certification.controller");
const infraestructure_1 = require("../../infraestructure");
const __1 = require("..");
const multer_adapter_1 = require("../../config/multer.adapter");
class CertificationRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const certificationDatasourceImpl = new infraestructure_1.CertificationDatasourceImpl();
        const certificationRepositoryImpl = new infraestructure_1.CertificationRepositoryImpl(certificationDatasourceImpl);
        const controller = new certification_controller_1.CertificationtController(certificationRepositoryImpl);
        router.post("", __1.AuthMiddelware.checkAuthHeaders, multer_adapter_1.MulterAdapter.fileMiddelware().single("file"), __1.ValidationMiddelware.validateCreateCertificationData, controller.create);
        router.get("", controller.getAll);
        router.get("/:id", __1.ValidationMiddelware.mongoIdValidator, controller.get);
        router.put("/:id", __1.AuthMiddelware.checkAuthHeaders, __1.ValidationMiddelware.mongoIdValidator, __1.ValidationMiddelware.validateUpdateCertificationData, controller.update);
        router.delete("/:id", __1.AuthMiddelware.checkAuthHeaders, __1.ValidationMiddelware.mongoIdValidator, controller.delete);
        return router;
    }
}
exports.CertificationRoutes = CertificationRoutes;
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
