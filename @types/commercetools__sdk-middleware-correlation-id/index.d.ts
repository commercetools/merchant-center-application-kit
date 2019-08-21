declare module '@commercetools/sdk-middleware-correlation-id' {
  import { Middleware, Json } from '@commercetools/sdk-client';
  import { Request, RequestInit, Response } from 'node-fetch';

  export type CorrelationIdMiddlewareOptions = {
    generate: () => string;
  };
  export function createCorrelationIdMiddleware(
    options: CorrelationIdMiddlewareOptions
  ): Middleware;
}
