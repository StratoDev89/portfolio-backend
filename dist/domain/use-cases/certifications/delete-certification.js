"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCertification = void 0;
class DeleteCertification {
    constructor(certificationRepository) {
        this.certificationRepository = certificationRepository;
    }
    execute(id) {
        return this.certificationRepository.delete(id);
    }
}
exports.DeleteCertification = DeleteCertification;
