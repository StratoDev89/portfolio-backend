import { Request, Response } from "express";
import { EmailService } from "..";
import { CustomError } from "../../domain";

export class ContactController {
  async sendContactEmail(req: Request, res: Response) {
    const { name, email, message } = req.body;

    EmailService.manageEmails(name, email, message)
      .then(() => res.status(200).json("Email sent successfully"))
      .catch((error) => this.errorHandler(error, res));
  }

  private errorHandler(error: unknown, res: Response) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    res.status(500).json({ error: "Internal server error" });
  }
}
