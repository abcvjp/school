import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { Logger } from 'src/logger/logger.decorator';
import { MyLogger } from 'src/logger/my-logger.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(@Logger('HttpAccess') private readonly logger: MyLogger) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest();
    const statusCode = exception.getStatus();

    // const exceptionResponse = exception.getResponse();
    // const error =
    // typeof exceptionResponse === 'string'
    // ? { message: exceptionResponse }
    // : (exceptionResponse as Record<string, any>);

    const responseBody = exception.getResponse();
    response.status(statusCode).json(responseBody);

    // const { originalUrl, method, params, query, body } = request;
    // this.logger.error(`${method} ${originalUrl} ${statusCode}`, {
    // originalUrl,
    // method,
    // statusCode,
    // requestParams: params,
    // requestQuery: query,
    // requestBody: body,
    // responseBody,
    // });
  }
}
