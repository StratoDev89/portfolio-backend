"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllProjects = void 0;
class GetAllProjects {
    constructor(projectRepository) {
        this.projectRepository = projectRepository;
    }
    execute() {
        return this.projectRepository.getAll();
    }
}
exports.GetAllProjects = GetAllProjects;
