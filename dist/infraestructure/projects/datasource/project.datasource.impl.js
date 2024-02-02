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
exports.ProjectDatasourceImpl = void 0;
const mongo_1 = require("../../../data/mongo");
const domain_1 = require("../../../domain");
class ProjectDatasourceImpl {
    create(createProjectDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const isProject = yield mongo_1.ProjectModel.findOne({
                title: createProjectDto.title,
            });
            if (isProject) {
                throw domain_1.CustomError.badRequest("Project title already exists");
            }
            const project = new mongo_1.ProjectModel(createProjectDto);
            project.save();
            return domain_1.ProjectEntity.fromObject(project);
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = yield mongo_1.ProjectModel.findById(id);
            if (!project) {
                throw domain_1.CustomError.notFound("Project not found");
            }
            return domain_1.ProjectEntity.fromObject(project);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const projects = yield mongo_1.ProjectModel.find();
            if (!projects) {
                throw domain_1.CustomError.notFound("Project not found");
            }
            return projects.map(domain_1.ProjectEntity.fromObject);
        });
    }
    update(updateProjectDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = updateProjectDto, updates = __rest(updateProjectDto, ["id"]);
            yield this.get(id);
            const project = yield mongo_1.ProjectModel.findByIdAndUpdate(id, updates, {
                new: true,
            });
            return domain_1.ProjectEntity.fromObject(project);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.get(id);
            const project = yield mongo_1.ProjectModel.findByIdAndDelete(id);
            return domain_1.ProjectEntity.fromObject(project);
        });
    }
}
exports.ProjectDatasourceImpl = ProjectDatasourceImpl;
