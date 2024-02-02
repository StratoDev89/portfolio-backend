"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificationEntity = void 0;
class CertificationEntity {
    constructor(id, title, url) {
        this.id = id;
        this.title = title;
        this.url = url;
    }
    static fromObject(object) {
        const { id, _id, title, url } = object;
        // TODO VALIDATIONS
        return new CertificationEntity(id || _id, title, url);
    }
}
exports.CertificationEntity = CertificationEntity;
