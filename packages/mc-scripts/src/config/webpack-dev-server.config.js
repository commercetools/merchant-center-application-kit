const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const { processConfig } = require('@commercetools-frontend/application-config');
const { processHeaders } = require('@commercetools-frontend/mc-html-template');
const devAuthentication = require('@commercetools-frontend/mc-dev-authentication');

const applicationConfig = processConfig();
const compiledHeaders = processHeaders(applicationConfig);

const host = process.env.HOST || '0.0.0.0';
// We support configuring the sockjs pathname during development.
// These settings let a developer run multiple simultaneous projects.
// They are used as the connection `hostname`, `pathname` and `port`
// in webpackHotDevClient. They are used as the `sockHost`, `sockPath`
// and `sockPort` options in webpack-dev-server.
const sockHost = process.env.WDS_SOCKET_HOST;
const sockPath = process.env.WDS_SOCKET_PATH; // default: '/ws'
const sockPort = process.env.WDS_SOCKET_PORT;

module.exports = ({ allowedHost, contentBase, port, publicPath }) => ({
  client: {
    overlay: false,
    webSocketURL: {
      hostname: sockHost,
      pathname: sockPath,
      port: sockPort,
    },
  },
  // Enable gzip compression of generated files.
  compress: true,
  devMiddleware: {
    // It is important to tell WebpackDevServer to use the same "publicPath" path as
    // we specified in the webpack config. When homepage is '.', default to serving
    // from the root.
    publicPath,
  },
  headers: compiledHeaders,
  historyApiFallback: {
    // Paths with dots should still use the history fallback.
    // See https://github.com/facebookincubator/create-react-app/issues/387.
    disableDotRule: true,
    index: publicPath,
  },
  host,
  hot: true,
  https: false,
  port,
  // Enable HTTPS if the HTTPS environment variable is set to 'true'
  // `proxy` is run between `before` and `after` `webpack-dev-server` hooks
  setupMiddlewares(middlewares, devServer) {
    if (!devServer) {
      throw new Error('webpack-dev-server is not defined');
    }

    // This lets us open files from the runtime error overlay.
    middlewares.unshift(errorOverlayMiddleware());

    devServer.app.set('views', devAuthentication.views);
    devServer.app.set('view engine', devAuthentication.config.viewEngine);
    devServer.app.post('/api/graphql', (request, response) => {
      response.statusCode = 404;
      response.setHeader('Content-Type', 'application/json');
      response.end(
        JSON.stringify({
          message: `This GraphQL endpoint is only available in production in the [Merchant Center Proxy Router](https://docs.commercetools.com/custom-applications/concepts/merchant-center-proxy-router). Please check that you are not calling this endpoint in development mode.`,
        })
      );
    });

    if (applicationConfig.env.__DEVELOPMENT__?.oidc?.authorizeUrl) {
      // Handle login page for OIDC workflow when developing against a local MC API.
      if (
        applicationConfig.env.__DEVELOPMENT__?.oidc?.authorizeUrl.startsWith(
          'http://localhost'
        )
      ) {
        devServer.app.get(
          '/login/authorize',
          devAuthentication.middlewares.createLoginMiddleware(
            applicationConfig.env
          )
        );
      }
    } else {
      devServer.app.get(
        '/login',
        devAuthentication.middlewares.createLoginMiddleware(
          applicationConfig.env
        )
      );
      // Intercept the /logout page and "remove" the auth cookie value
      devServer.app.get(
        '/logout',
        devAuthentication.middlewares.createLogoutMiddleware(
          applicationConfig.env
        )
      );
    }

    return middlewares;
  },
});
