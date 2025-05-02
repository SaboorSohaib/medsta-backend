// src/mail/mail.module.ts
import { Module } from "@nestjs/common"
import { MailService } from "./mail.service"
import { MailerModule } from "@nestjs-modules/mailer"
import { MailController } from "./mail.controller" // Import the MailController
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter"
import { join } from "path"

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: "smtp.gmail.com",
        port: process.env.APP_PORT,
        secure: false,
        auth: {
          user: process.env.APP_EMAIL,
          pass: process.env.APP_PASSWORD,
        },
      },
      defaults: {
        from: '"Your Site" <your.email@gmail.com>',
      },
      template: {
        dir: join(__dirname, "templates"),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  controllers: [MailController], // Register the MailController
  exports: [MailService],
})
export class MailModule {}
