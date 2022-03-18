import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { OkResponse } from '../respones';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, OkResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<OkResponse<T>> | Promise<Observable<OkResponse<T>>> {
    return next.handle().pipe(
      map((data) => {
        const { statusCode } = context.switchToHttp().getResponse();
        return new OkResponse(data, statusCode);
      }),
    );
  }
}
