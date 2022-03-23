export interface ICustomException {
  getStatus(): number;
  getMessage(): string;
  getResponse(): string | object;
}
