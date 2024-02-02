import { CertificationModel } from "../../../data";
import {
  CertificationDatasource,
  CertificationEntity,
  CreateCertificationDto,
  CustomError,
  UpdateCertificationDto,
} from "../../../domain";

export class CertificationDatasourceImpl implements CertificationDatasource {
  async create(
    createCertificationDto: CreateCertificationDto
  ): Promise<CertificationEntity> {
    const { title, file } = createCertificationDto;

    const isCertification = await CertificationModel.findOne({
      title: createCertificationDto.title,
    });

    if (isCertification) {
      throw CustomError.badRequest("Certification title already exists");
    }

    const data = { title: title, url: file };

    const certification = new CertificationModel(data);
    certification.save();

    return CertificationEntity.fromObject(certification);
  }

  async get(id: string): Promise<CertificationEntity> {
    const certification = await CertificationModel.findById(id);

    if (!certification) {
      throw CustomError.notFound("Certification not found");
    }

    return CertificationEntity.fromObject(certification);
  }

  async getAll(): Promise<CertificationEntity[]> {
    const certifications = await CertificationModel.find();

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

    const certification = await CertificationModel.findByIdAndUpdate(
      id,
      updates,
      {
        new: true,
      }
    );

    if (!certification)
      throw CustomError.internalServer("Internal Server Error");

    return CertificationEntity.fromObject(certification);
  }

  async delete(id: string): Promise<CertificationEntity> {
    await this.get(id);

    const certification = await CertificationModel.findByIdAndDelete(id);
    if (!certification)
      throw CustomError.internalServer("Internal Server Error");

    return CertificationEntity.fromObject(certification);
  }
}
