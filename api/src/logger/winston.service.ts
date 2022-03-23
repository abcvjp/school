import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger, format, transports, config, createLogger } from 'winston';
import {
  ConsoleTransportInstance,
  FileTransportInstance,
} from 'winston/lib/winston/transports';

@Injectable()
export class WinstonService {
  private logger: Logger;
  constructor(private readonly configService: ConfigService) {
    this.logger = this.createLogger();
  }

  private createLogger() {
    const options = {
      combinedFile: {
        format: format.combine(format.timestamp(), format.json()),
        filename: './logs/combined.log',
        handleExceptions: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
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
        colorize: false,
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
        json: false,
        colorize: true,
      },
    };
    const logTransports: Array<
      FileTransportInstance | ConsoleTransportInstance
    > = [
      new transports.File(options.combinedFile),
      new transports.File(options.errorFile),
    ];
    if (this.configService.get('app.environment') !== 'production') {
      logTransports.push(new transports.Console(options.console));
    }
    return createLogger({
      levels: config.npm.levels,
      transports: logTransports,
      exitOnError: false,
    });
  }

  public getLogger(): Logger {
    return this.logger;
  }
}
