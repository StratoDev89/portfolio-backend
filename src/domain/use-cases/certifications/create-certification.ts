import {
  CertificationEntity,
  CertificationRepository,
  CreateCertificationDto,
} from "../..";

interface CreateCertificationUseCase {
  execute(
    createCertificationtDto: CreateCertificationDto
  ): Promise<CertificationEntity>;
}

export class CreateCertification implements CreateCertificationUseCase {
  constructor(private certificationRepository: CertificationRepository) {}

  execute(createCertificationtDto: CreateCertificationDto) {
    return this.certificationRepository.create(createCertificationtDto);
  }
}
