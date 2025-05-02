// src/mail/mail.controller.ts
import { Controller, Post, Body } from "@nestjs/common"
import { MailService } from "./mail.service"
import { sendEmailDto } from "./mailDto/mail.dto"

@Controller("mail")
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post("contact")
  async sendContactEmail(@Body() body: sendEmailDto) {
    try {
      await this.mailService.sendContactEmail(body)
      return { success: true, message: "Email sent successfully" }
    } catch (error) {
      return { success: false, message: "Failed to send email" }
    }
  }
}
