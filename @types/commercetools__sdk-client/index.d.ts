declare module '@commercetools/sdk-client' {
  export type Json = { [key: string]: unknown };
  export type Headers = { [key: string]: string };
  export type MethodType =
    | 'GET'
    | 'POST'
    | 'DELETE'
    | 'HEAD'
    | 'OPTIONS'
    | 'PUT'
    | 'PATCH'
    | 'TRACE';
  export type ClientRequest = {
    uri: string;
    method: MethodType;
    body?: unknown;
    headers?: Headers;
  };
  export class HttpErrorType {
    constructor(message: string, meta?: Json);
    name: string;
    message: string;
    code: number;
    status: number;
    statusCode: number;
    originalRequest: ClientRequest;
    body?: Json;
    headers?: Headers;
  }
  export type SuccessResult = {
    body: Json;
    statusCode: number;
    headers?: Headers;
  };
  export type ClientResult = SuccessResult | HttpErrorType;
  export type Client = {
    execute: (request: ClientRequest) => Promise<SuccessResult>;
  };
  export type MiddlewareRequest = ClientRequest;
  export type MiddlewareResponse = {
    resolve(response: Json): void;
    reject(error: Json): void;
    body?: Json;
    error?: HttpErrorType;
    statusCode: number;
    headers?: Headers;
    request?: Json;
  };
  export type Dispatch = (
    request: MiddlewareRequest,
    response: MiddlewareResponse
  ) => unknown;
  export type Middleware = (next: Dispatch) => Dispatch;
  export type Next = (
    request: MiddlewareRequest,
    response: MiddlewareResponse
  ) => unknown;
  export type ClientOptions = {
    middlewares: Middleware[];
  };
  export function createClient(options: ClientOptions): Client;
}
