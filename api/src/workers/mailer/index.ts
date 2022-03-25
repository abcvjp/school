import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory } from '@nestjs/microservices';

export const MAILER_SERVICE = 'MAILER_SERVICE';
export const MailerService = {
  provide: MAILER_SERVICE,
  useFactory: (configService: ConfigService) => {
    const options = configService.get('worker.mailer');
    return ClientProxyFactory.create(options);
  },
  inject: [ConfigService],
};
