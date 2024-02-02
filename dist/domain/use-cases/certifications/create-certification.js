"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCertification = void 0;
class CreateCertification {
    constructor(certificationRepository) {
        this.certificationRepository = certificationRepository;
    }
    execute(createCertificationtDto) {
        return this.certificationRepository.create(createCertificationtDto);
    }
}
exports.CreateCertification = CreateCertification;
