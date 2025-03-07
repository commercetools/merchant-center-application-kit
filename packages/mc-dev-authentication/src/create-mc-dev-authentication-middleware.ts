import type { ServerResponse } from 'node:http';
import type { IncomingMessage, NextFunction } from 'connect';
import type { TCustomApplicationRuntimeConfig } from './types';

const trimTrailingSlash = (value: string) => value.replace(/\/$/, '');

function createMcDevAuthenticationMiddleware(
  applicationConfig: TCustomApplicationRuntimeConfig
) {
  const isDevAuthenticationMiddlewareDisabled =
    String(applicationConfig.env.disableAuthRoutesOfDevServer) === 'true' ||
    applicationConfig.env.servedByProxy;

  return (
    request: IncomingMessage,
    response: ServerResponse,
    next: NextFunction
  ) => {
    if (request.originalUrl === '/api/graphql') {
      response.statusCode = 404;
      response.setHeader('Content-Type', 'application/json');
      response.end(
        JSON.stringify({
          message: `This GraphQL endpoint is only available in production in the [Merchant Center Proxy Router](https://docs.commercetools.com/merchant-center-customizations/concepts/merchant-center-proxy-router). Please check that you are not calling this endpoint in development mode.`,
        })
      );
      return;
    }

    if (applicationConfig.env.__DEVELOPMENT__?.oidc?.authorizeUrl) {
      // Handle login page for OIDC workflow when developing against a local MC API.
      if (
        applicationConfig.env.__DEVELOPMENT__.oidc.authorizeUrl.startsWith(
          'http://localhost'
        )
      ) {
        if (request.originalUrl?.startsWith('/login/authorize')) {
          if (!isDevAuthenticationMiddlewareDisabled) {
            // Redirect to the MC API to initiate the authorize flow.
            const redirectTo = new URL(
              request.originalUrl,
              trimTrailingSlash(applicationConfig.env.mcApiUrl)
            );
            response.writeHead(301, { Location: redirectTo.toString() }).end();
            return;
          }
        }
      }
    }

    next();
  };
}

export default createMcDevAuthenticationMiddleware;
