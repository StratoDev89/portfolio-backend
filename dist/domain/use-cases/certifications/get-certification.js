"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCertification = void 0;
class GetCertification {
    constructor(certificationRepository) {
        this.certificationRepository = certificationRepository;
    }
    execute(id) {
        return this.certificationRepository.get(id);
    }
}
exports.GetCertification = GetCertification;
