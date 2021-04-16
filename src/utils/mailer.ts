import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export class MailUtils {
  constructor(
    private transporter: Mail = nodemailer.createTransport({
      host: process.env.HOST_MAIL,
      port: 587,
      secure: false,
      auth: {
        user: process.env.USER_MAIL,
        pass: process.env.PASS_MAIL,
      },
    })
  ) {}

  async sendingMail(userEmail: string, html: string) {
    await this.transporter.sendMail(
      {
        from: process.env.USER_MAIL,
        to: [userEmail, process.env.SENDING_MAIL!],
        subject: "Confirmation de compte",
        html: html,
      },
      function (err, info) {
        if (err) {
          console.log("error Mail");
          console.log(err);
        }
      }
    );
  }
}
