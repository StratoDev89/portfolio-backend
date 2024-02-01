import { NextFunction, Request, Response } from "express";
import { envs } from "../../config";

const password = envs.ADMIN_PASSWORD;

export class AuthMiddelware {
  static checkAuthHeaders(req: Request, res: Response, next: NextFunction) {
    const auth = req.headers.authorization;

    if (!auth || auth !== password) {
      res.status(401).json({ error: "Autorization Error" });
      return;
    }

    next();
  }
}
