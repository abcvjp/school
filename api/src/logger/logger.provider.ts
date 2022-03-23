import { Provider } from '@nestjs/common';
import { prefixesForLoggers } from './logger.decorator';
import { MyLogger } from './my-logger.service';

function loggerFactory(logger: MyLogger, prefix: string) {
  if (prefix) {
    logger.setPrefix(prefix);
  }
  return logger;
}

function createLoggerProvider(prefix: string): Provider<MyLogger> {
  return {
    provide: `MyLogger${prefix}`,
    useFactory: (logger) => loggerFactory(logger, prefix),
    inject: [MyLogger],
  };
}

export function createLoggerProviders(): Array<Provider<MyLogger>> {
  return prefixesForLoggers.map((prefix) => createLoggerProvider(prefix));
}
