const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const { processConfig } = require('@commercetools-frontend/application-config');
const { processHeaders } = require('@commercetools-frontend/mc-html-template');
const devAuthentication = require('@commercetools-frontend/mc-dev-authentication');

// Feature flags
const isOidcForDevelopmentEnabled =
  process.env.ENABLE_OIDC_FOR_DEVELOPMENT === 'true' ||
  process.env.ENABLE_OIDC_FOR_DEVELOPMENT === true;

const applicationConfig = processConfig();
const compiledHeaders = processHeaders(applicationConfig);

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const host = process.env.HOST || '0.0.0.0';

module.exports = ({ allowedHost, contentBase, port, publicPath }) => {
  const webSocketURL = new URL(allowedHost);
  return {
    client: {
      overlay: false,
      webSocketURL: {
        hostname: webSocketURL.hostname,
        pathname: webSocketURL.pathname,
        port: webSocketURL.port,
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
    https: protocol === 'https',
    port,
    // Enable HTTPS if the HTTPS environment variable is set to 'true'
    // `proxy` is run between `before` and `after` `webpack-dev-server` hooks
    onBeforeSetupMiddleware({ app }) {
      app.set('views', devAuthentication.views);
      app.set('view engine', devAuthentication.config.viewEngine);
      // This lets us open files from the runtime error overlay.
      app.use(errorOverlayMiddleware());
      app.use('/api/graphql', (request, response) => {
        response.statusCode = 400;
        response.setHeader('Content-Type', 'application/json');
        const errorMessage = `This GraphQL endpoint is not available in ${process.env.NODE_ENV} mode, as it's not necessary. The menu configuration is loaded from the file "menu.json" (more info at https://www.npmjs.com/package/@commercetools-frontend/application-shell). In case you do need to test things out, you can pass a "mcProxyApiUrl" to your application config (in the "additionalEnv" properties) and point it to the production environment, for example for GCP-EU use "https://mc.europe-west1.gcp.commercetools.com/api/graphql".`;
        const fakeApolloError = new Error(errorMessage);
        response.end(
          JSON.stringify({
            data: null,
            error: fakeApolloError,
          })
        );
      });

      if (!isOidcForDevelopmentEnabled) {
        app.use(
          '/login',
          devAuthentication.middlewares.createLoginMiddleware(
            applicationConfig.env
          )
        );
        // Intercept the /logout page and "remove" the auth cookie value
        app.use(
          '/logout',
          devAuthentication.middlewares.createLogoutMiddleware(
            applicationConfig.env
          )
        );
      }
    },
  };
};
