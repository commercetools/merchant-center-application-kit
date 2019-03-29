const path = require('path');
const {
  loadEnv,
  loadHeaders,
} = require('@commercetools-frontend/mc-html-template');
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');

const sourcePath = process.cwd();
const localEnv = loadEnv(path.join(sourcePath, 'env.json'));
const headers = loadHeaders(localEnv, {
  cspPath: path.join(sourcePath, 'csp.json'),
});

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const host = process.env.HOST || '0.0.0.0';

module.exports = ({ proxy, allowedHost, contentBase, publicPath }) => ({
  // WebpackDevServer 2.4.3 introduced a security fix that prevents remote
  // websites from potentially accessing local content through DNS rebinding:
  // https://github.com/webpack/webpack-dev-server/issues/887
  // https://medium.com/webpack/webpack-dev-server-middleware-security-issues-1489d950874a
  // However, it made several existing use cases such as development in cloud
  // environment or subdomains in development significantly more complicated:
  // https://github.com/facebookincubator/create-react-app/issues/2271
  // https://github.com/facebookincubator/create-react-app/issues/2233
  // While we're investigating better solutions, for now we will take a
  // compromise. Since our WDS configuration only serves files in the `public`
  // folder we won't consider accessing them a vulnerability. However, if you
  // use the `proxy` feature, it gets more dangerous because it can expose
  // remote code execution vulnerabilities in backends like Django and Rails.
  // So we will disable the host check normally, but enable it if you have
  // specified the `proxy` setting. Finally, we let you override it if you
  // really know what you're doing with a special environment variable.
  disableHostCheck:
    !proxy || process.env.DANGEROUSLY_DISABLE_HOST_CHECK === 'true',
  // Enable gzip compression of generated files.
  compress: true,
  // Silence WebpackDevServer's own logs since they're generally not useful.
  // It will still show compile warnings and errors with this setting.
  clientLogLevel: 'none',
  // By default WebpackDevServer serves physical files from current directory
  // in addition to all the virtual build products that it serves from memory.
  // This is confusing because those files won’t automatically be available in
  // production build folder unless we copy them. However, copying the whole
  // project directory is dangerous because we may expose sensitive files.
  // Instead, we establish a convention that only files in `public` directory
  // get served. Our build script will copy `public` into the `build` folder.
  // In `index.html`, you can get URL of `public` folder with %PUBLIC_URL%:
  // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
  // In JavaScript code, you can access it with `process.env.PUBLIC_URL`.
  // Note that we only recommend to use `public` folder as an escape hatch
  // for files like `favicon.ico`, `manifest.json`, and libraries that are
  // for some reason broken when imported through Webpack. If you just want to
  // use an image, put it in `src` and `import` it from JavaScript instead.
  contentBase,
  // By default files from `contentBase` will not trigger a page reload.
  watchContentBase: false,
  // Enable hot reloading server. It will provide /sockjs-node/ endpoint
  // for the WebpackDevServer client so it can learn when the files were
  // updated. The WebpackDevServer client is included as an entry point
  // in the Webpack development configuration. Note that only changes
  // to CSS are currently hot reloaded. JS changes will refresh the browser.
  hot: true,
  publicPath,
  // WebpackDevServer is noisy by default so we emit custom message instead
  // by listening to the compiler events with `compiler.hooks[...].tap` calls
  // above.
  quiet: true,
  // Reportedly, this avoids CPU overload on some systems.
  // https://github.com/facebookincubator/create-react-app/issues/293
  // src/node_modules is not ignored to support absolute imports
  // https://github.com/facebookincubator/create-react-app/issues/1065
  watchOptions: {
    // ignored: '',
  },
  // Enable HTTPS if the HTTPS environment variable is set to 'true'
  https: protocol === 'https',
  host,
  overlay: false,
  historyApiFallback: {
    // Paths with dots should still use the history fallback.
    // See https://github.com/facebookincubator/create-react-app/issues/387.
    disableDotRule: true,
  },
  headers,
  public: allowedHost,
  proxy,
  before(app) {
    // This lets us open files from the runtime error overlay.
    app.use(errorOverlayMiddleware());
    // This service worker file is effectively a 'no-op' that will reset any
    // previous service worker registered for the same host:port combination.
    // We do this in development to avoid hitting the production cache if
    // it used the same host and port.
    // https://github.com/facebookincubator/create-react-app/issues/2272#issuecomment-302832432
    app.use(noopServiceWorkerMiddleware());
    app.use('/api/graphql', (request, response) => {
      response.statusCode = 400;
      response.setHeader('Content-Type', 'application/json');
      const errorMessage = `This GraphQL endpoint is not available in ${
        process.env.NODE_ENV
      } mode as it's not necessary. The menu configuration is loaded from the file "menu.json" (more info at https://www.npmjs.com/package/@commercetools-frontend/application-shell). In case you do need to test things out, you can pass a "mcProxyApiUrl" to your "env.json" and point it to e.g. "https://mc.commercetools.com/api/graphql"`;
      const fakeApolloError = new Error(errorMessage);
      response.end(
        JSON.stringify({
          data: null,
          error: fakeApolloError,
        })
      );
    });
    // Intercept the /logout page and "remove" the auth cookie value
    app.use((request, response, next) => {
      if (request.url.startsWith('/logout')) {
        response.setHeader(
          'Set-Cookie',
          [
            `mcAccessToken=''`, // <-- unset the value
            'Path=/',
            `Expires=${new Date(0).toUTCString()}`, // <-- put a date in the past
            'HttpOnly',
          ].join('; ')
        );
      }
      next();
    });
  },
});
