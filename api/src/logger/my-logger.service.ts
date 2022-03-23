import { Inject, Injectable, LoggerService, Scope } from '@nestjs/common';
import { Logger } from 'winston';

@Injectable({ scope: Scope.TRANSIENT })
export class MyLogger implements LoggerService {
  private prefix?: string;

  constructor(@Inject('WINSTON_LOGGER') private readonly logger: Logger) {}

  error(message: string, meta?: object) {
    const logMessage = this.prefix ? `[${this.prefix}] - ${message}` : message;
    const logMeta = { meta };
    this.prefix && Object.assign(logMeta, { prefix: this.prefix });
    this.logger.error(logMessage, logMeta);
  }

  warn(message: string, meta?: object) {
    const logMessage = this.prefix ? `[${this.prefix}] - ${message}` : message;
    this.logger.warn(logMessage, meta);
  }

  log(message: string, meta?: object) {
    const logMessage = this.prefix ? `[${this.prefix}] - ${message}` : message;
    const logMeta = { meta };
    this.prefix && Object.assign(logMeta, { prefix: this.prefix });
    this.logger.info(logMessage, logMeta);
  }

  info(message: string, meta?: object) {
    const logMessage = this.prefix ? `[${this.prefix}] - ${message}` : message;
    const logMeta = { meta };
    this.prefix && Object.assign(logMeta, { prefix: this.prefix });
    this.logger.info(logMessage, logMeta);
  }

  debug(message: string, meta?: object) {
    const logMessage = this.prefix ? `[${this.prefix}] - ${message}` : message;
    this.logger.debug(logMessage, meta);
  }

  verbose(message: string, meta?: object) {
    const logMessage = this.prefix ? `[${this.prefix}] - ${message}` : message;
    this.logger.verbose(logMessage, meta);
  }

  setPrefix(prefix: string) {
    this.prefix = prefix;
  }
}
