import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import workerConfig from 'src/config/worker.config';
import { MailerProvider } from './mailer.provider';

@Module({
  imports: [ConfigModule.forFeature(workerConfig)],
  providers: [MailerProvider],
  exports: [MailerProvider],
})
export class MailerServiceModule {}
