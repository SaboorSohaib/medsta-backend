// src/mail/mail.service.ts
import { Injectable } from "@nestjs/common"
import { MailerService } from "@nestjs-modules/mailer"
import { sendEmailDto } from "./mailDto/mail.dto"

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendContactEmail({ name, email, message }: sendEmailDto) {
    await this.mailerService.sendMail({
      to: process.env.APP_EMAIL,
      subject: "New Contact Form Submission",
      html: `
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: auto;
            background: #ffffff;
            border: 1px solid #e0e0e0;
            padding: 20px;
            border-radius: 8px;
          }
          h2 {
            color: #333333;
          }
          p {
            color: #555555;
            line-height: 1.5;
          }
          strong {
            color: #222222;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong><br/>${message}</p>
        </div>
      </body>
             `,
    })
  }
}
