declare module '@commercetools/sdk-middleware-correlation-id' {
  import type { Middleware } from '@commercetools/sdk-client';

  export type CorrelationIdMiddlewareOptions = {
    generate: () => string;
  };
  export function createCorrelationIdMiddleware(
    options: CorrelationIdMiddlewareOptions
  ): Middleware;
}
