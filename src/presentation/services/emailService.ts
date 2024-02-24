import { NodeMailerAdapter, envs } from "../../config";
import { CustomError } from "../../domain";

export class EmailService {
  static async manageEmails(
    clientName: string,
    clientEmail: string,
    clientMessage: string
  ) {
    const data = {
      name: clientName,
      email: clientEmail,
      message: clientMessage,
    };

    const emailToAdmin = await this.sendEmailToAdmin(data);

    if (!emailToAdmin)
      throw CustomError.internalServer("Error sending email to admin");

    const emailToClient = await this.sendEmailToUser(clientEmail);

    if (!emailToClient)
      throw CustomError.internalServer("Error sending email to Client");
  }

  private static async sendEmailToUser(to: string) {
    try {
      const options = {
        to: to,
        subject: "Confirmación de contacto",
        htmlBody: `
                    <h1>Gracias por contactarme!</h1>
                    <p>Revisare tu requerimiento y te contactare lo antes posible.</p>
                    <h3>Atentamente: Daniel Pacheco.</h3>
                    <span>Whatsapp: +584147972877</span>           
                    `,
      };

      await NodeMailerAdapter.sendEmail(options);
      return true;
    } catch (error) {
      return false;
    }
  }

  private static async sendEmailToAdmin(data: any) {
    try {
      const options = {
        to: envs.CLIENT_EMAIL,
        subject: "Notificación de contacto",
        htmlBody: `
                <h1><strong>Nombre</strong>:</h1>
                <p> ${data.name}</p>
                <h1><strong>Email</strong>:</h1>
                <p> ${data.email}</p>
                <h1><strong>Mensaje</strong>:</h1>    
                <p> ${data.message}</p>       
                `,
      };

      await NodeMailerAdapter.sendEmail(options);

      return true;
    } catch (error) {
      return false;
    }
  }
}
