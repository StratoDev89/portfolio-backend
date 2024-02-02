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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectController = void 0;
const domain_1 = require("../../domain");
const __1 = require("..");
const config_1 = require("../../config");
class ProjectController {
    constructor(projectRepository) {
        this.projectRepository = projectRepository;
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const _a = req.body.createProjectDto, { file } = _a, body = __rest(_a, ["file"]);
            const publicPath = "uploads/projects";
            const filename = __1.UploadFileService.uploadSingle(file, publicPath);
            if (!filename) {
                return res.status(500).json({ error: "Internal server error" });
            }
            const imageUrl = `${config_1.envs.HOST}/app/projects/${filename}`;
            const data = Object.assign({ image: imageUrl }, body);
            new domain_1.CreateProject(this.projectRepository)
                .execute(data)
                .then((project) => res.status(201).json(project))
                .catch((error) => {
                __1.UploadFileService.deleteFile(filename, publicPath);
                this.errorHandler(error, res);
            });
        });
        this.get = (req, res) => {
            const { id } = req.params;
            new domain_1.GetProject(this.projectRepository)
                .execute(id)
                .then((project) => res.status(200).json(project))
                .catch((error) => this.errorHandler(error, res));
        };
        this.getAll = (req, res) => {
            new domain_1.GetAllProjects(this.projectRepository)
                .execute()
                .then((projects) => res.status(200).json(projects))
                .catch((error) => this.errorHandler(error, res));
        };
        this.update = (req, res) => {
            const id = req.params.id;
            const data = req.body.updateProjectDto;
            new domain_1.UpdateProject(this.projectRepository)
                .execute(Object.assign(Object.assign({}, data), { id }))
                .then((project) => res.status(200).json(project))
                .catch((error) => this.errorHandler(error, res));
        };
        this.delete = (req, res) => {
            const { id } = req.params;
            new domain_1.DeleteProject(this.projectRepository)
                .execute(id)
                .then((project) => res.status(200).json(project))
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
exports.ProjectController = ProjectController;
