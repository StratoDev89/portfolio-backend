import { Request, Response, NextFunction } from "express";
import {
  JoiAdapter,
  // Validators,
  envs,
} from "../../config";

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

    const { title, description, techs, charge, projectUrl } = req.body;

    req.body.createProjectDto = {
      title,
      description,
      techs,
      charge,
      projectUrl,
      file,
    };

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

    const { title, url } = req.body;

    req.body.createCertificationDto = { title, url };

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

    const file = req.file;
    console.log(file);

    const { title, description, techs, charge, projectUrl } = req.body;
    req.body.updateProjectDto = {
      title,
      description,
      techs,
      file,
      charge,
      projectUrl,
    };

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

  static validateLoginUserData(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const [isValidData, error] = JoiAdapter.validateLoginUserSchema(req.body);

    if (!isValidData) {
      return res.status(400).json({ error });
    }

    const { username, password } = req.body;

    req.body.loginUserDto = { username, password };
    next();
  }

  static validateEmailData(req: Request, res: Response, next: NextFunction) {
    const [isValidEmail, error] = JoiAdapter.validateEmail(req.body);

    if (!isValidEmail) {
      return res.status(400).json({ error: error });
    }

    next();
  }

  static validatePasswordlData(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const [isValidEmail, error] = JoiAdapter.validatePassword(req.body);

    if (!isValidEmail) {
      return res.status(400).json({ error: error });
    }

    next();
  }
}
