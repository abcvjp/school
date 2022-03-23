import { HttpStatus } from '@nestjs/common';
import { ErrorResponse } from '../respones';
import { ICustomException } from './custom-exception.interface';

export class CustomException extends Error implements ICustomException {
  private readonly response: string | object;
  private readonly code: number;

  constructor(message: string, path: string, code?: number) {
    super(message);
    this.code = code ? code : HttpStatus.INTERNAL_SERVER_ERROR;
    this.response = new ErrorResponse(message, path, code);
  }

  public getResponse() {
    return this.response;
  }

  public getStatus() {
    return this.code;
  }

  public getMessage(): string {
    return this.message;
  }
}
