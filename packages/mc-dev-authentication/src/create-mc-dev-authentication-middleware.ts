import type { ServerResponse } from 'node:http';
import type { IncomingMessage, NextFunction } from 'connect';
// https://babeljs.io/blog/2017/09/11/zero-config-with-babel-macros
import pages from /* preval */ './pages';
import { logout } from './routes';
import type { TCustomApplicationRuntimeConfig } from './types';

const trimTrailingSlash = (value: string) => value.replace(/\/$/, '');

function createMcDevAuthenticationMiddleware(
  applicationConfig: TCustomApplicationRuntimeConfig
) {
  const htmlLogin = pages.loginPage.replace(
    new RegExp('__MC_API_URL__', 'g'),
    trimTrailingSlash(applicationConfig.env.mcApiUrl)
  );
  const htmlLogout = pages.logoutPage;

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
          message: `This GraphQL endpoint is only available in production in the [Merchant Center Proxy Router](https://docs.commercetools.com/custom-applications/concepts/merchant-center-proxy-router). Please check that you are not calling this endpoint in development mode.`,
        })
      );
      return;
    }

    if (applicationConfig.env.__DEVELOPMENT__?.oidc?.authorizeUrl) {
      // Handle login page for OIDC workflow when developing against a local MC API.
      if (
        applicationConfig.env.__DEVELOPMENT__?.oidc?.authorizeUrl.startsWith(
          'http://localhost'
        )
      ) {
        if (request.originalUrl?.startsWith('/login/authorize')) {
          if (isDevAuthenticationMiddlewareDisabled) {
            next();
          } else {
            response.end(htmlLogin);
          }
          return;
        }
      }
    } else {
      if (request.originalUrl === '/login') {
        if (isDevAuthenticationMiddlewareDisabled) {
          next();
        } else {
          response.end(htmlLogin);
        }
        return;
      }
      if (request.originalUrl === '/logout') {
        logout(response);

        if (isDevAuthenticationMiddlewareDisabled) {
          next();
        } else {
          response.end(htmlLogout);
        }
        return;
      }
    }

    next();
  };
}

export default createMcDevAuthenticationMiddleware;
