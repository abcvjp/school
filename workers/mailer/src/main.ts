import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'mailer',
          brokers: ['kafka:29092'],
        },
        consumer: {
          groupId: 'mailer-consumer',
        },
      },
    },
  );
  await app.listen();
}
bootstrap();
