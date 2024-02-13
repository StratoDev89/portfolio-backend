import nodemailer from "nodemailer";
import { envs } from "./envs";

interface SendMailOptions {
  to: string;
  subject: string;
  htmlBody: string;
}

export class NodeMailerAdapter {
  private static transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  static async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody } = options;

    try {
      const sentInfo = await this.transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
      });

      return true;
    } catch (error) {
      return false;
    }
  }

}
