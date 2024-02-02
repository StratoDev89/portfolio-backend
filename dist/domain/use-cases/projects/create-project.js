"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProject = void 0;
class CreateProject {
    constructor(projectRepository) {
        this.projectRepository = projectRepository;
    }
    execute(createProjectDto) {
        return this.projectRepository.create(createProjectDto);
    }
}
exports.CreateProject = CreateProject;
