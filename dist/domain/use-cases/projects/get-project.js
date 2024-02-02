"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProject = void 0;
class GetProject {
    constructor(projectRepository) {
        this.projectRepository = projectRepository;
    }
    execute(id) {
        return this.projectRepository.get(id);
    }
}
exports.GetProject = GetProject;
