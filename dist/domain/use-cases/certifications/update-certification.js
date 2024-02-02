"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCertification = void 0;
class UpdateCertification {
    constructor(certificationRepository) {
        this.certificationRepository = certificationRepository;
    }
    execute(updateCertificationDto) {
        return this.certificationRepository.update(updateCertificationDto);
    }
}
exports.UpdateCertification = UpdateCertification;
