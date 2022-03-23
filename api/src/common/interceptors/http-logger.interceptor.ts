import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { tap } from 'rxjs';
import { Logger } from 'src/logger/logger.decorator';
import { MyLogger } from 'src/logger/my-logger.service';

@Injectable()
export class HttpLoggerInterceptor implements NestInterceptor {
  constructor(
    @Logger('HttpAccess') private readonly httpLogger: MyLogger, // @Logger() private readonly logger: MyLogger,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const { statusCode } = ctx.getResponse();
    const { originalUrl, method, params, query, body } = request;
    // const timeBeforeHandle = Date.now();

    return next.handle().pipe(
      tap({
        next: (data) => {
          this.httpLogger.info(`${method} ${originalUrl} ${statusCode}`, {
            originalUrl,
            method,
            statusCode,
            requestParams: params,
            requestQuery: query,
            requestBody: body,
            responseBody: data,
          });
        },
        error: (err) => {
          const statusCode = err.getStatus();
          const errResponse = err.getResponse();
          this.httpLogger.error(`${method} ${originalUrl} ${statusCode}`, {
            originalUrl,
            method,
            statusCode,
            requestParams: params,
            requestQuery: query,
            requestBody: body,
            responseBody: errResponse,
          });
        },
      }),
    );
  }
}
