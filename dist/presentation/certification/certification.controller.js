"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificationtController = void 0;
const domain_1 = require("../../domain");
const __1 = require("..");
const config_1 = require("../../config");
class CertificationtController {
    constructor(certificationRepository) {
        this.certificationRepository = certificationRepository;
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { title, file } = req.body.createCertificationDto;
            const publicPath = "uploads/certifications";
            const filename = __1.UploadFileService.uploadSingle(file, publicPath);
            if (!filename) {
                return res.status(500).json({ error: "Internal server error" });
            }
            const fileUrl = `${config_1.envs.HOST}/app/certifications/${filename}`;
            const data = { title, file: fileUrl };
            new domain_1.CreateCertification(this.certificationRepository)
                .execute(data)
                .then((certification) => res.status(201).json(certification))
                .catch((error) => {
                __1.UploadFileService.deleteFile(filename, publicPath);
                this.errorHandler(error, res);
            });
        });
        this.get = (req, res) => {
            const { id } = req.params;
            new domain_1.GetCertification(this.certificationRepository)
                .execute(id)
                .then((certification) => res.status(200).json(certification))
                .catch((error) => this.errorHandler(error, res));
        };
        this.getAll = (req, res) => {
            new domain_1.GetAllCertifications(this.certificationRepository)
                .execute()
                .then((certifications) => res.status(200).json(certifications))
                .catch((error) => this.errorHandler(error, res));
        };
        this.update = (req, res) => {
            const id = req.params.id;
            const data = req.body.updateCertificationDto;
            new domain_1.UpdateCertification(this.certificationRepository)
                .execute(Object.assign(Object.assign({}, data), { id }))
                .then((certification) => res.status(200).json(certification))
                .catch((error) => this.errorHandler(error, res));
        };
        this.delete = (req, res) => {
            const { id } = req.params;
            new domain_1.DeleteCertification(this.certificationRepository)
                .execute(id)
                .then((certification) => res.status(200).json(certification))
                .catch((error) => this.errorHandler(error, res));
        };
    }
    errorHandler(error, res) {
        if (error instanceof domain_1.CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        res.status(500).json({ error: "Internal server error" });
    }
}
exports.CertificationtController = CertificationtController;
