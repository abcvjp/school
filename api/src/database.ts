import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const dbConfig = configService.get('db');
        const { username, password, host, port, database } = dbConfig;
        return {
          uri: `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=admin`,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
