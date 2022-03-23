import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map, Observable, throwError } from 'rxjs';
import { CustomHttpException } from '../exceptions/custom-http.exception';
import { CustomException } from '../exceptions/custom.exception';
import { OkResponse } from '../respones';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, OkResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<OkResponse<T>> | Promise<Observable<OkResponse<T>>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const { originalUrl } = request;
    return next.handle().pipe(
      // transform data to a formated response
      map((data) => {
        const { statusCode } = ctx.getResponse();
        return new OkResponse(data, statusCode);
      }),
      // transform default http exception to custom http exception
      catchError((exception) => {
        if (exception instanceof HttpException) {
          return throwError(
            new CustomHttpException(
              exception.message,
              originalUrl,
              exception.getStatus(),
            ),
          );
        } else {
          return throwError(
            new CustomException(exception.message, originalUrl),
          );
        }
      }),
    );
  }
}
