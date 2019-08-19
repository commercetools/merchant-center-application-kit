declare module '@commercetools/sdk-middleware-http' {
  import { Middleware, Json, HttpErrorType } from '@commercetools/sdk-client';

  export type HttpMiddlewareOptions = {
    host: string;
    credentialsMode?: 'omit' | 'same-origin' | 'include';
    includeHeaders?: boolean;
    includeResponseHeaders?: boolean;
    includeOriginalRequest?: boolean;
    maskSensitiveHeaderData?: boolean;
    enableRetry?: boolean;
    retryConfig?: {
      maxRetries?: number;
      retryDelay?: number;
      backoff?: boolean;
      maxDelay?: number;
    };
    fetch?: (url: string | Request, init?: RequestInit) => Promise<Response>;
  };
  export function createHttpMiddleware(
    options: HttpMiddlewareOptions
  ): Middleware;
  export function getErrorByCode(code: number): HttpErrorType;
}
