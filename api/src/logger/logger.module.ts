import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { createLoggerProviders } from './logger.provider';
import { MyLogger } from './my-logger.service';
import { winstonProvider } from './winston.provider';

@Global()
@Module({})
export class LoggerModule {
  static register(): DynamicModule {
    const prefixedLoggerProviders = createLoggerProviders();
    return {
      module: LoggerModule,
      imports: [ConfigModule],
      providers: [winstonProvider, MyLogger, ...prefixedLoggerProviders],
      exports: [MyLogger, ...prefixedLoggerProviders],
    };
  }
}
