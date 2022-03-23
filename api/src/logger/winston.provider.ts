import { ConfigService } from '@nestjs/config';
import { Logger, format, transports, config, createLogger } from 'winston';
import {
  ConsoleTransportInstance,
  FileTransportInstance,
} from 'winston/lib/winston/transports';

function winstonFactory(configService: ConfigService): Logger {
  const options: Record<string, transports.FileTransportOptions> = {
    combinedFile: {
      format: format.combine(format.timestamp(), format.json()),
      filename: './logs/combined.log',
      handleExceptions: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    },
    errorFile: {
      level: 'error',
      format: format.combine(
        format.timestamp(),
        format.errors({ stack: true }),
        format.json(),
      ),
      filename: './logs/error.log',
      handleExceptions: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    },
    console: {
      level: 'info',
      format: format.combine(
        format.label({ label: 'DEBUG LOG' }),
        format.timestamp(),
        format.printf(({ level, message, label, timestamp }) => {
          return `${timestamp} [${label}] ${level}: ${message}`;
        }),
        format.colorize({ all: true }),
      ),
      handleExceptions: true,
    },
  };
  const logTransports: Array<FileTransportInstance | ConsoleTransportInstance> =
    [
      new transports.File(options.combinedFile),
      new transports.File(options.errorFile),
    ];
  if (configService.get('app.environment') !== 'production') {
    logTransports.push(new transports.Console(options.console));
  }
  return createLogger({
    levels: config.npm.levels,
    transports: logTransports,
    exitOnError: false,
  });
}

export const winstonProvider = {
  provide: 'WINSTON_LOGGER',
  inject: [ConfigService],
  useFactory: winstonFactory,
};
