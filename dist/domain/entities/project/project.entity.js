"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectEntity = void 0;
class ProjectEntity {
    constructor(id, title, description, techs, image) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.techs = techs;
        this.image = image;
    }
    static fromObject(object) {
        const { id, _id, title, description, techs, image } = object;
        //TODO VALIDATIONS
        return new ProjectEntity(id || _id, title, description, techs, image);
    }
}
exports.ProjectEntity = ProjectEntity;
