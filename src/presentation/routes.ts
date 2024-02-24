import { Router } from "express";
import {
  CertificationRoutes,
  ProjectRoutes,
  UserRoutes,
  ContactRoutes,
} from ".";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/projects", ProjectRoutes.routes);
    router.use("/api/certifications", CertificationRoutes.routes);
    router.use("/api/users", UserRoutes.routes);
    router.use("/api/contacts", ContactRoutes.routes);

    return router;
  }
}
