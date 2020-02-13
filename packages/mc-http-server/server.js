/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const http = require('http');
const morgan = require('morgan');
const hidePoweredBy = require('hide-powered-by');
const { createLightship } = require('lightship');
const {
  createMiddleware: createPrometheusMetricsMiddleware,
  signalIsUp,
  signalIsNotUp,
} = require('@promster/express');
const {
  createServer: createPrometheusMetricsServer,
} = require('@promster/server');
const compression = require('compression');
const devAuthentication = require('@commercetools-frontend/mc-dev-authentication');
const express = require('express');
const { createLogoutHandler, createLoginHandler } = require('./routes');

// Config
const lightshipServerPort = 9000;
const applicationServerPort = process.env.HTTP_PORT || 3001;
const prometheusMetricsServerPort = 7788;
const applicationServerUri = `http://localhost`;
const applicationServerUrl = `${applicationServerUri}:${applicationServerPort}`;

let lightshipServer;
let applicationServer;
let prometheusMetricsServer;

const createLightshipServer = options => {
  const lightship = createLightship({
    detectKubernetes: true,
    ...options,
  });
  lightship.registerShutdownHandler(async () => {
    /**
     * NOTE: The default k8s grace period is 60 seconds. It is often
     * recommended to not exceed the grace period given by k8s by half.
     * 20 seconds is chosen here under the assumption that any outstanging
     * request just settle by then.
     */
    await new Promise(resolve => setTimeout(resolve, 20000));

    signalIsNotUp();

    if (applicationServer) applicationServer.close();
    if (prometheusMetricsServer) prometheusMetricsServer.close();
  });

  return lightship;
};

const startServer = (server, port) =>
  new Promise((resolve, reject) => {
    server.listen(port, error => {
      if (error) reject(error);
      else resolve();
    });
  });

const shutdownServer = async () => {
  // Something bad happened, trigger a manual shutdown of lightship,
  // which in turn will close the other servers (`registerShutdownHandler`).
  // If lightship was not setup due to early error we themeexit the process.
  if (lightshipServer) await lightshipServer.shutdown();
  else process.exit(1);
};

/**
 * 👇 Middlewares
 */

// Gather and expose metrics to Prometheus
const prometheusMetricsMiddleware = createPrometheusMetricsMiddleware({
  options: {
    accuracies: ['ms'],
    metricTypes: ['httpRequestsHistogram'],
    metricNames: {
      httpRequestDurationInMilliseconds: [
        'mc_http_request_duration_milliseconds',
      ],
    },
    getLabelValues: () => ({
      /**
       * NOTE:
       *   We do not need to know the path. It is only the index.html
       *   for this service. As it is public facing attackers can "scrape"
       *   any url causing an unindented increase of cardinality in Prometheus.
       */
      path: '',
    }),
  },
});

const createServerIndexMiddleware = options => (request, response) => {
  // Define security headers!
  Object.keys(options.headers).forEach(key => {
    response.setHeader(key, options.headers[key]);
  });
  // Fall back to index.html
  response.sendFile(path.join(options.paths.publicAssetsPath, 'index.html'));
};
const throwIfIndexHtmlIsMissing = options => {
  // Make sure that the `index.html` is available.
  const indexHtmlPath = path.join(options.paths.publicAssetsPath, 'index.html');
  try {
    fs.accessSync(indexHtmlPath, fs.F_OK);
  } catch (error) {
    throw new Error(
      `Cannot find "index.html" file in ${path.join(
        options.paths.publicAssetsPath,
        'index.html'
      )}`
    );
  }
};

const configureApplication = options => {
  throwIfIndexHtmlIsMissing(options);

  const serverIndexMiddleware = createServerIndexMiddleware(options);

  // Configure and start the HTTP server.
  const app = express();
  app.use(hidePoweredBy());
  app
    .get('/version', (request, response) => {
      response.setHeader('Content-Type', 'application/json');
      response.end(
        JSON.stringify({
          deployedAt: options.env.deployedAt,
          revision: options.env.revision,
        })
      );
    })
    // Request access logs
    .use(morgan('combined', { stream: process.stdout }))
    // Intercept the /logout page and "remove" the auth cookie value
    .get('/logout', createLogoutHandler(options.env))
    .get('/login', createLoginHandler(options.env))
    // Keep this after the scraping endpoint `/metrics`
    .use(prometheusMetricsMiddleware)
    // From here on, compress all responses
    .use(compression())
    // Explicitly check if the request is asking for the `index.html`
    // to avoid letting it be served by the static middleware without
    // the proper security headers.
    .use((request, response, next) => {
      if (request.url === '/' || request.url.startsWith('/index.html'))
        serverIndexMiddleware(request, response);
      else next();
    })
    // Try serving a static file that matches the url, otherwise go to
    // the next middleware (e.g. favicon.png)
    .use(express.static(options.paths.publicAssetsPath))
    // Catch all middleware to serve the `index.html` (for SPA routes)
    .use('*', serverIndexMiddleware);

  app.set('views', devAuthentication.views);
  app.set('view engine', devAuthentication.config.viewEngine);

  return app;
};

const createHttpServer = options => {
  const app = configureApplication(options);
  const server = http.createServer(app);

  return server;
};

const launchServer = async options => {
  try {
    lightshipServer = await createLightshipServer({
      port: lightshipServerPort,
    });
    prometheusMetricsServer = await createPrometheusMetricsServer({
      port: prometheusMetricsServerPort,
      detectKubernetes: true,
    });
    applicationServer = createHttpServer(options);

    await startServer(applicationServer, applicationServerPort);

    console.log(
      `[@commercetools-frontend/mc-http-server] Server is listening on ${applicationServerUrl}`
    );
    console.log(
      `[@commercetools-frontend/mc-http-server] Prometheus metrics available on ${applicationServerUri}:${prometheusMetricsServerPort}`
    );
    console.log(
      `[@commercetools-frontend/mc-http-server] Lightship available on ${applicationServerUri}:${lightshipServerPort}`
    );

    lightshipServer.signalReady();
    signalIsUp();
  } catch (error) {
    console.log(error.stack || error);

    await shutdownServer();
  }
};

module.exports = launchServer;
