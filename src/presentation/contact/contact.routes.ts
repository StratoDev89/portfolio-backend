import { Router } from "express";
import { ContactController } from "./contact.controller";

export class ContactRoutes {
  static get routes(): Router {
    const router = Router();
    const contactController = new ContactController();

    router.post("", contactController.sendContactEmail);

    return router;
  }
}
