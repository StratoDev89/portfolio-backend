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
import { envs } from "../../config";

export class CertificationtController {
  constructor(private certificationRepository: CertificationRepository) {}

  create = async (req: Request, res: Response) => {
    const { title, file } = req.body.createCertificationDto;
    const publicPath = "public/uploads/certifications";

    const filename = UploadFileService.uploadSingle(file, publicPath);
    if (!filename) {
      return res.status(500).json({ error: "Internal server error" });
    }

    const fileUrl = `${envs.HOST}/app/certifications/${filename}`;
    const data = { title, file: fileUrl };

    new CreateCertification(this.certificationRepository)
      .execute(data)
      .then((certification) => res.status(201).json(certification))
      .catch((error) => {
        UploadFileService.deleteFile(filename, publicPath);
        this.errorHandler(error, res);
      });
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

  delete = (req: Request, res: Response) => {
    const { id } = req.params;

    new DeleteCertification(this.certificationRepository)
      .execute(id)
      .then((certification) => res.status(200).json(certification))
      .catch((error) => this.errorHandler(error, res));
  };

  private errorHandler(error: unknown, res: Response) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    res.status(500).json({ error: "Internal server error" });
  }
}
