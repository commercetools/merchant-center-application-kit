import type { Request, Response, NextFunction } from 'express';
import pages from /* preval */ './pages';
import { logout } from './routes';
import type { TCustomApplicationRuntimeConfig } from './types';
// https://babeljs.io/blog/2017/09/11/zero-config-with-babel-macros

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

  return (request: Request, response: Response, next: NextFunction) => {
    if (request.originalUrl === '/api/graphql') {
      response.statusCode = 404;
      response.setHeader('Content-Type', 'application/json');
      response.send(
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
        if (request.originalUrl.startsWith('/login/authorize')) {
          if (isDevAuthenticationMiddlewareDisabled) {
            next();
          } else {
            response.send(htmlLogin);
          }
          return;
        }
      }
    } else {
      if (request.originalUrl === '/login') {
        if (isDevAuthenticationMiddlewareDisabled) {
          next();
        } else {
          response.send(htmlLogin);
        }
        return;
      }
      if (request.originalUrl === '/logout') {
        logout(response);

        if (isDevAuthenticationMiddlewareDisabled) {
          next();
        } else {
          response.send(htmlLogout);
        }
        return;
      }
    }

    next();
  };
}

export default createMcDevAuthenticationMiddleware;
