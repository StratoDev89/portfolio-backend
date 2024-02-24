import nodemailer from "nodemailer";
import { envs } from "./envs";

interface SendMailOptions {
  to: string;
  subject: string;
  htmlBody: string;
}

export class NodeMailerAdapter {
  private static transporter = nodemailer.createTransport({
    host: envs.SMTP_HOST,
    port: envs.SMTP_PORT,
    secure: true,
    auth: {
      user: envs.SMTP_USER,
      pass: envs.SMTP_PASS,
    },

    // gmail config
    // service: envs.MAILER_SERVICE,
    // auth: {
    //   user: envs.MAILER_EMAIL,
    //   pass: envs.MAILER_SECRET_KEY,
    // },
  });

  static async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody } = options;

    try {
      const sentInfo = await this.transporter.sendMail({
        from: '"Admin Strato-dev" <admin@strato-dev.pw>',
        to: to,
        subject: subject,
        html: htmlBody,
      });

      return true;
    } catch (error) {
      console.log({ error });
      return false;
    }
  }
}
