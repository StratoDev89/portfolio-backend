"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRoutes = void 0;
const express_1 = require("express");
const project_controller_1 = require("./project.controller");
const infraestructure_1 = require("../../infraestructure");
const __1 = require("..");
const config_1 = require("../../config/");
class ProjectRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const projectDatasourceImpl = new infraestructure_1.ProjectDatasourceImpl();
        const projectRepositoryImpl = new infraestructure_1.ProjectRepositoryImpl(projectDatasourceImpl);
        const controller = new project_controller_1.ProjectController(projectRepositoryImpl);
        router.post("", __1.AuthMiddelware.checkAuthHeaders, config_1.MulterAdapter.fileMiddelware().single("image"), __1.ValidationMiddelware.validateCreateProjectData, controller.create);
        router.get("", controller.getAll);
        router.get("/:id", __1.ValidationMiddelware.mongoIdValidator, controller.get);
        router.put("/:id", __1.AuthMiddelware.checkAuthHeaders, __1.ValidationMiddelware.mongoIdValidator, __1.ValidationMiddelware.validateUpdateProjectData, controller.update);
        router.delete("/:id", __1.AuthMiddelware.checkAuthHeaders, __1.ValidationMiddelware.mongoIdValidator, controller.delete);
        return router;
    }
}
exports.ProjectRoutes = ProjectRoutes;
