"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllCertifications = void 0;
class GetAllCertifications {
    constructor(certificationRepository) {
        this.certificationRepository = certificationRepository;
    }
    execute() {
        return this.certificationRepository.getAll();
    }
}
exports.GetAllCertifications = GetAllCertifications;
