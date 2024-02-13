import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config";
export class AuthMiddelware {
  static checkAuthHeaders(req: Request, res: Response, next: NextFunction) {
    const auth = req.headers.authorization;

    if (!auth) {
      res.status(401).json({ error: "Autorization Error" });
      return;
    }

    const [authType, token] = auth.split(" ");

    if (authType !== "Bearer") {
      res.status(401).json({ error: "Autorization Type Error" });
      return;
    }

    const [isTokenValid, error] = JwtAdapter.validateToken(token);

    if (!isTokenValid) {
      res.status(401).json({ error: error });
      return;
    }

    next();
  }
}
