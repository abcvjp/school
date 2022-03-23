import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorResponse } from '../respones';
import { ICustomException } from './custom-exception.interface';

export class CustomHttpException
  extends HttpException
  implements ICustomException
{
  constructor(
    response: string | string[],
    private readonly path: string,
    status: HttpStatus,
  ) {
    super(new ErrorResponse(response, path, status), status);
  }

  public getMessage(): string {
    return this.message;
  }
}
