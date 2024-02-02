"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificationRepositoryImpl = void 0;
class CertificationRepositoryImpl {
    constructor(certificationtDatasource) {
        this.certificationtDatasource = certificationtDatasource;
    }
    create(createCertificationDto) {
        return this.certificationtDatasource.create(createCertificationDto);
    }
    get(id) {
        return this.certificationtDatasource.get(id);
    }
    getAll() {
        return this.certificationtDatasource.getAll();
    }
    update(updateCertificationDto) {
        return this.certificationtDatasource.update(updateCertificationDto);
    }
    delete(id) {
        return this.certificationtDatasource.delete(id);
    }
}
exports.CertificationRepositoryImpl = CertificationRepositoryImpl;
