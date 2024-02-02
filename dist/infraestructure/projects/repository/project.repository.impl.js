"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRepositoryImpl = void 0;
class ProjectRepositoryImpl {
    constructor(projectDatasource) {
        this.projectDatasource = projectDatasource;
    }
    create(createProjectDto) {
        return this.projectDatasource.create(createProjectDto);
    }
    get(id) {
        return this.projectDatasource.get(id);
    }
    getAll() {
        return this.projectDatasource.getAll();
    }
    update(updateProjectDto) {
        return this.projectDatasource.update(updateProjectDto);
    }
    delete(id) {
        return this.projectDatasource.delete(id);
    }
}
exports.ProjectRepositoryImpl = ProjectRepositoryImpl;
