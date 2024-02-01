import {
  CertificationEntity,
  CreateCertificationDto,
  UpdateCertificationDto,
} from "..";

export abstract class CertificationDatasource {
  abstract create(
    createCertificationDto: CreateCertificationDto
  ): Promise<CertificationEntity>;
  abstract get(id: string): Promise<CertificationEntity>;
  abstract getAll(): Promise<CertificationEntity[]>;
  abstract update(
    updateCertificationDto: UpdateCertificationDto
  ): Promise<CertificationEntity>;
  abstract delete(id: string): Promise<CertificationEntity>;
}
