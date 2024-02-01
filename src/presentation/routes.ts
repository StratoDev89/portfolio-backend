import { Router } from "express";
import { CertificationRoutes, ProjectRoutes } from ".";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/projects", ProjectRoutes.routes);
    router.use("/api/certifications", CertificationRoutes.routes);

    return router;
  }
}
