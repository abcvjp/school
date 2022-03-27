import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { User, UserSchema } from './schemas/user.schema';
import { UserService } from './user.service';
// import { ClientsModule, Transport } from '@nestjs/microservices';
import { MailerServiceModule } from 'src/workers/mailer/mailer.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    // ClientsModule.register([
    // {
    // name: 'MAILER_SERVICE',
    // transport: Transport.KAFKA,
    // options: {
    // client: {
    // clientId: 'mailer',
    // brokers: ['kafka:29092'],
    // },
    // consumer: {
    // groupId: 'mailer-consumer',
    // },
    // },
    // },
    // ]),
    MailerServiceModule,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
