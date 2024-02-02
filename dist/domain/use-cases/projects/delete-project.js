"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProject = void 0;
class DeleteProject {
    constructor(projectRepository) {
        this.projectRepository = projectRepository;
    }
    execute(id) {
        return this.projectRepository.delete(id);
    }
}
exports.DeleteProject = DeleteProject;
