"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProject = void 0;
class UpdateProject {
    constructor(projectRepository) {
        this.projectRepository = projectRepository;
    }
    execute(updateProjectDto) {
        return this.projectRepository.update(updateProjectDto);
    }
}
exports.UpdateProject = UpdateProject;
