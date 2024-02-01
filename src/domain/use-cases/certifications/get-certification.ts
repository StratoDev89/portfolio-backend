import { CertificationEntity, CertificationRepository } from "../..";

interface GetCertificationUseCase {
  execute(id: string): Promise<CertificationEntity>;
}

export class GetCertification implements GetCertificationUseCase {
  constructor(private certificationRepository: CertificationRepository) {}

  execute(id: string): Promise<CertificationEntity> {
    return this.certificationRepository.get(id);
  }
}
