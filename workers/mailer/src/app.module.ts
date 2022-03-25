import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: 'smtp://b27a16343d6db7:de22094ebe08b1@smtp.mailtrap.io:2525',
      defaults: {
        from: '"hoai-dep-trai" <from@example.com>',
      },
      preview: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
