import { CertificationEntity, CertificationRepository } from "../..";

interface GetAllCertificationsUseCase {
  execute(id: string): Promise<CertificationEntity[]>;
}

export class GetAllCertifications implements GetAllCertificationsUseCase {
  constructor(private certificationRepository: CertificationRepository) {}

  execute(): Promise<CertificationEntity[]> {
    return this.certificationRepository.getAll();
  }
}
