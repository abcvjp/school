import { Module } from '@nestjs/common';
import { MailerService } from '.';

@Module({
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerServiceModule {}
