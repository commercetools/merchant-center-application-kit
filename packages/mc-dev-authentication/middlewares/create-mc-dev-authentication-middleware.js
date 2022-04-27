const path = require('path');
const pug = require('pug');
const { logout } = require('../routes');

const compileLoginView = pug.compileFile(
  path.join(__dirname, '../views/login.pug')
);
const compileLogoutView = pug.compileFile(
  path.join(__dirname, '../views/logout.pug')
);

function createMcDevAuthenticationMiddleware(applicationConfig) {
  const htmlLogin = compileLoginView({ env: applicationConfig.env });
  const htmlLogout = compileLogoutView({ env: applicationConfig.env });

  const isDevAuthenticationMiddlewareDisabled =
    String(applicationConfig.env.disableAuthRoutesOfDevServer) === 'true' ||
    applicationConfig.env.servedByProxy;

  /**
   * @type {import('express').RequestHandler}
   */
  return (request, response, next) => {
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
        if (request.originalUrl.startsWith('/login/authorize')) {
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

module.exports = createMcDevAuthenticationMiddleware;
