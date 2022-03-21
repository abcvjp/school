import { HttpStatus } from '@nestjs/common';

export class ErrorResponse {
  code: HttpStatus;
  message: string | string[];
  path: string;
  timestamp: string;

  constructor(
    message: string | string[],
    path: string,
    code?: HttpStatus,
    timestamp?: string,
  ) {
    this.code = code ? code : 1;
    this.message = message;
    this.path = path;
    this.timestamp = timestamp ? timestamp : new Date().toISOString();
  }
}
