import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

export const MAILER_SERVICE = 'MAILER_SERVICE';
export const MailerProvider = {
  provide: MAILER_SERVICE,
  useFactory: (configService: ConfigService) => {
    const options = configService.get('worker.mailer');
    return ClientProxyFactory.create({ transport: Transport.KAFKA, options });
  },
  inject: [ConfigService],
};
