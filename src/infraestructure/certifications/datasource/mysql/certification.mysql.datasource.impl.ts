import { SqlCertificationEntity } from "../../../../data/mysql/entities/certification.entity";
import {
  CertificationDatasource,
  CertificationEntity,
  CreateCertificationDto,
  CustomError,
  UpdateCertificationDto,
} from "../../../../domain";

export class CertificationMySqlDatasourceImpl
  implements CertificationDatasource
{
  async create(
    createCertificationDto: CreateCertificationDto
  ): Promise<CertificationEntity> {
    const { title, url } = createCertificationDto;

    const isCertification = await SqlCertificationEntity.findOne({
      where: {
        title: title,
      },
    });

    if (isCertification) {
      throw CustomError.badRequest("Certification title already exists");
    }

    const newCertification = new SqlCertificationEntity();

    newCertification.title = title;
    newCertification.url = url;

    const certification = await newCertification.save();

    return CertificationEntity.fromObject(certification);
  }

  async get(id: string): Promise<CertificationEntity> {
    const certification = await SqlCertificationEntity.findOneBy({ id: +id });

    if (!certification) {
      throw CustomError.notFound("Certification not found");
    }

    return CertificationEntity.fromObject(certification);
  }

  async getAll(): Promise<CertificationEntity[]> {
    const certifications = await SqlCertificationEntity.find();

    if (!certifications) {
      throw CustomError.notFound("Certifications not found");
    }

    return certifications.map(CertificationEntity.fromObject);
  }

  async update(
    updateCertificationDto: UpdateCertificationDto
  ): Promise<CertificationEntity> {
    const { id, ...updates } = updateCertificationDto;

    await this.get(id);

    const result = await SqlCertificationEntity.update(id, updates);

    if (result.affected && result.affected > 0) {
      const certification = await this.get(id);
      return CertificationEntity.fromObject(certification);
    } else {
      throw CustomError.internalServer("Internal Server Error");
    }
  }

  async delete(id: string): Promise<CertificationEntity> {
    const certification = await this.get(id);

    const result = await SqlCertificationEntity.delete(id);

    if (result.affected && result.affected > 0) {
      return CertificationEntity.fromObject(certification);
    } else {
      throw CustomError.internalServer("Internal Server Error");
    }
  }
}
