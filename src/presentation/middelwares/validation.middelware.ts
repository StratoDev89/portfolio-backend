import { Request, Response, NextFunction } from "express";
import { JoiAdapter, Validators, envs } from "../../config";

export class ValidationMiddelware {
  static validateCreateProjectData(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const [isValidData, error] = JoiAdapter.validateCreateProjectSchema(
      req.body
    );

    if (!isValidData) {
      return res.status(400).json({ error });
    }
    const file = req.file;
    
    const { title, description, techs } = req.body;
    req.body.createProjectDto = { title, description, techs, file };

    next();
  }

  static validateCreateCertificationData(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const [isValidData, error] = JoiAdapter.validateCreateCertificationSchema(
      req.body
    );

    if (!isValidData) {
      return res.status(400).json({ error });
    }

    const file = req.file;
    const { title } = req.body;

    req.body.createCertificationDto = { title, file };

    next();
  }

  static validateUpdateProjectData(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const [isValidData, error] = JoiAdapter.validateUpdateProjectSchema(
      req.body
    );

    if (!isValidData) {
      return res.status(400).json({ error });
    }

    const { title, description, techs, image } = req.body;
    req.body.updateProjectDto = { title, description, techs, image };

    next();
  }

  static validateUpdateCertificationData(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const [isValidData, error] = JoiAdapter.validateUpdateCertificationSchema(
      req.body
    );

    if (!isValidData) {
      return res.status(400).json({ error });
    }

    const { title, url } = req.body;
    req.body.updateCertificationDto = { title, url };

    next();
  }

  static mongoIdValidator(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    const isValidMondoId = Validators.isMongoID(id);

    if (!isValidMondoId) {
      return res.status(400).json({ error: "Invalid id" });
    }

    next();
  }
}
