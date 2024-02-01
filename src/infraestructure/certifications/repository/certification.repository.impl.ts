import {
  CertificationDatasource,
  CertificationEntity,
  CertificationRepository,
  CreateCertificationDto,
  UpdateCertificationDto,
} from "../../../domain";

export class CertificationRepositoryImpl implements CertificationRepository {
  constructor(private certificationtDatasource: CertificationDatasource) {}

  create(
    createCertificationDto: CreateCertificationDto
  ): Promise<CertificationEntity> {
    return this.certificationtDatasource.create(createCertificationDto);
  }

  get(id: string): Promise<CertificationEntity> {
    return this.certificationtDatasource.get(id);
  }

  getAll(): Promise<CertificationEntity[]> {
    return this.certificationtDatasource.getAll();
  }

  update(
    updateCertificationDto: UpdateCertificationDto
  ): Promise<CertificationEntity> {
    return this.certificationtDatasource.update(updateCertificationDto);
  }

  delete(id: string): Promise<CertificationEntity> {
    return this.certificationtDatasource.delete(id);
  }
}
