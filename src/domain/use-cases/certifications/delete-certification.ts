import { CertificationEntity, CertificationRepository } from "../..";

interface DeleteCertificationUseCase {
  execute(id: string): Promise<CertificationEntity>;
}

export class DeleteCertification implements DeleteCertificationUseCase {
  constructor(private certificationRepository: CertificationRepository) {}

  execute(id: string): Promise<CertificationEntity> {
    return this.certificationRepository.delete(id);
  }
}
