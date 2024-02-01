import {
  CertificationEntity,
  CertificationRepository,
  UpdateCertificationDto,
} from "../..";

interface UpdateCertificationUseCase {
  execute(
    updateCertificationDto: UpdateCertificationDto
  ): Promise<CertificationEntity>;
}

export class UpdateCertification implements UpdateCertificationUseCase {
  constructor(private certificationRepository: CertificationRepository) {}

  execute(
    updateCertificationDto: UpdateCertificationDto
  ): Promise<CertificationEntity> {
    return this.certificationRepository.update(updateCertificationDto);
  }
}
