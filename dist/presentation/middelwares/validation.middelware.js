"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationMiddelware = void 0;
const config_1 = require("../../config");
class ValidationMiddelware {
    static validateCreateProjectData(req, res, next) {
        const [isValidData, error] = config_1.JoiAdapter.validateCreateProjectSchema(req.body);
        if (!isValidData) {
            return res.status(400).json({ error });
        }
        const file = req.file;
        const { title, description, techs } = req.body;
        req.body.createProjectDto = { title, description, techs, file };
        next();
    }
    static validateCreateCertificationData(req, res, next) {
        const [isValidData, error] = config_1.JoiAdapter.validateCreateCertificationSchema(req.body);
        if (!isValidData) {
            return res.status(400).json({ error });
        }
        const file = req.file;
        const { title } = req.body;
        req.body.createCertificationDto = { title, file };
        next();
    }
    static validateUpdateProjectData(req, res, next) {
        const [isValidData, error] = config_1.JoiAdapter.validateUpdateProjectSchema(req.body);
        if (!isValidData) {
            return res.status(400).json({ error });
        }
        const { title, description, techs, image } = req.body;
        req.body.updateProjectDto = { title, description, techs, image };
        next();
    }
    static validateUpdateCertificationData(req, res, next) {
        const [isValidData, error] = config_1.JoiAdapter.validateUpdateCertificationSchema(req.body);
        if (!isValidData) {
            return res.status(400).json({ error });
        }
        const { title, url } = req.body;
        req.body.updateCertificationDto = { title, url };
        next();
    }
    static mongoIdValidator(req, res, next) {
        const id = req.params.id;
        const isValidMondoId = config_1.Validators.isMongoID(id);
        if (!isValidMondoId) {
            return res.status(400).json({ error: "Invalid id" });
        }
        next();
    }
}
exports.ValidationMiddelware = ValidationMiddelware;
