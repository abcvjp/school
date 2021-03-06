import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import { AppService } from './app.service';
import { AppController } from './app.controller';

import appConfig from './config/app.config';
import dbConfig from './config/db.config';
import workerConfig from './config/worker.config';

import { DatabaseModule } from './database';
import { UserModule } from './modules/user/user.module';
import { StudentModule } from './modules/student/student.module';
import { ClassModule } from './modules/class/class.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuards } from './auth/guards/roles.guard';
import { AllExceptionsFilter } from './common/filters/global-exception.filter';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggerModule } from './logger/logger.module';
import { HttpLoggerInterceptor } from './common/interceptors/http-logger.interceptor';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, dbConfig, workerConfig],
    }),
    LoggerModule.register(),
    DatabaseModule,
    UserModule,
    AuthModule,
    StudentModule,
    ClassModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuards,
    },
    {
      provide: APP_INTERCEPTOR,
      // scope: Scope.REQUEST,
      useClass: HttpLoggerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
