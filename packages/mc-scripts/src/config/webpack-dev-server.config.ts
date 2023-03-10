import type { Configuration, Headers } from 'webpack-dev-server';
import { processConfig } from '@commercetools-frontend/application-config';
import { createMcDevAuthenticationMiddleware } from '@commercetools-frontend/mc-dev-authentication';
import { processHeaders } from '@commercetools-frontend/mc-html-template';

const host = process.env.HOST || '0.0.0.0';
// We support configuring the sockjs pathname during development.
// These settings let a developer run multiple simultaneous projects.
// They are used as the connection `hostname`, `pathname` and `port`
// in webpackHotDevClient. They are used as the `sockHost`, `sockPath`
// and `sockPort` options in webpack-dev-server.
const sockHost = process.env.WDS_SOCKET_HOST;
const sockPath = process.env.WDS_SOCKET_PATH; // default: '/ws'
const sockPort = process.env.WDS_SOCKET_PORT;

const createWebpackDevServerConfig = ({
  port,
  publicPath,
}: {
  port: number;
  publicPath?: string;
}): Configuration => {
  const applicationConfig = processConfig();
  const compiledHeaders = processHeaders(applicationConfig);

  return {
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
    headers: compiledHeaders as Headers,
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
    setupMiddlewares(middlewares, devServer) {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }

      devServer.app?.use(
        createMcDevAuthenticationMiddleware(applicationConfig)
      );

      return middlewares;
    },
  };
};

export default createWebpackDevServerConfig;
