import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly mailerService: MailerService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async sendMail(user: any): Promise<void> {
    const { email, fullName } = user;
    await this.mailerService.sendMail({
      to: email, // list of receivers
      from: 'hoaideptrai@example.com', // sender address
      subject: 'Your account has been registered successfully', // Subject line
      // text: 'welcome', // plaintext body
      html: `<b>welcome to my world, ${fullName}</b>`, // HTML body content
    });
  }
}
