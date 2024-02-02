import { Request, Response } from "express";
import {
  CustomError,
  CertificationRepository,
  CreateCertification,
  GetCertification,
  GetAllCertifications,
  UpdateCertificationDto,
  DeleteCertification,
  UpdateCertification,
} from "../../domain";
import { UploadFileService } from "..";

export class CertificationtController {
  constructor(private certificationRepository: CertificationRepository) {}

  create = async (req: Request, res: Response) => {
    let publicImageId: string | null = null;

    try {
      const { title, file } = req.body.createCertificationDto;

      const image = await UploadFileService.uploadSingle(file);

      if (!image) {
        return res.status(500).json({ error: "Cloudinary error" });
      }

      publicImageId = image.id;
      const data = { title, image };

      const certification = await new CreateCertification(
        this.certificationRepository
      ).execute(data);

      res.status(201).json(certification);
    } catch (error) {
      if (publicImageId) await UploadFileService.deleteFile(publicImageId);
      this.errorHandler(error, res);
    }
  };

  get = (req: Request, res: Response) => {
    const { id } = req.params;

    new GetCertification(this.certificationRepository)
      .execute(id)
      .then((certification) => res.status(200).json(certification))
      .catch((error) => this.errorHandler(error, res));
  };

  getAll = (req: Request, res: Response) => {
    new GetAllCertifications(this.certificationRepository)
      .execute()
      .then((certifications) => res.status(200).json(certifications))
      .catch((error) => this.errorHandler(error, res));
  };

  update = (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body.updateCertificationDto as UpdateCertificationDto;

    new UpdateCertification(this.certificationRepository)
      .execute({ ...data, id })
      .then((certification) => res.status(200).json(certification))
      .catch((error) => this.errorHandler(error, res));
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const certification = await new DeleteCertification(
        this.certificationRepository
      ).execute(id);
      const publicImageId = certification.image.id;

      const wasDeleted = await UploadFileService.deleteFile(publicImageId);

      res.status(200).json({ certification, cloudinaryDeleted: wasDeleted });
    } catch (error) {
      this.errorHandler(error, res);
    }
  };

  private errorHandler(error: unknown, res: Response) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    res.status(500).json({ error: "Internal server error" });
  }
}
