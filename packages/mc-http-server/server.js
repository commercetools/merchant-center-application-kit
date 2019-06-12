/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const http = require('http');
const morgan = require('morgan');
const { createLightship } = require('lightship');
const {
  createMiddleware: createPrometheusMetricsMiddleware,
} = require('@promster/express');
const {
  createServer: createPrometheusMetricsServer,
} = require('@promster/server');
const compression = require('compression');
const devAuthentication = require('@commercetools-frontend/mc-dev-authentication');
const express = require('express');
const { createLogoutHandler, createLoginHandler } = require('./routes');

// Config
const serverPort = process.env.HTTP_PORT || 3001;
const serverUri = `http://localhost`;
const serverUrl = `${serverUri}:${serverPort}`;

const lightship = createLightship({
  detectKubernetes: true,
});

/**
 * 👇 Middlewares
 */

// Gather and expose metrics to Prometheus
const prometheusMetricsMiddleware = createPrometheusMetricsMiddleware({
  options: {
    accuracies: ['ms'],
    metricTypes: ['httpRequestsHistogram'],
    metricNames: {
      httpRequestDurationInMilliseconds:
        'http_request_duration_buckets_milliseconds',
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

const startServer = options => {
  throwIfIndexHtmlIsMissing(options);

  const serverIndexMiddleware = createServerIndexMiddleware(options);

  // Configure and start the HTTP server.
  const app = express()
    .disable('x-powered-by')
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

  const server = http.createServer(app);

  return new Promise((resolve, reject) => {
    server.listen(serverPort, async error => {
      if (error) {
        lightship.signalNotReady();
        reject(error);
      }

      const prometheusMetricsServer = await createPrometheusMetricsServer();

      lightship.registerShutdownHandler(async () => {
        /**
         * NOTE: The default k8s grace period is 60 seconds. It is often
         * recommended to not exceed the grace period given by k8s by half.
         * 20 seconds is chosen here under the assumption that any outstanging
         * request just settle by then.
         */
        await new Promise(resolveShutdownDelay =>
          setTimeout(resolveShutdownDelay, 20000)
        );

        prometheusMetricsServer.close();
      });

      lightship.signalReady();

      console.log(
        `[@commercetools-frontend/mc-http-server] server is listening on ${serverUrl}`
      );
      console.log(
        `[@commercetools-frontend/mc-http-server] Prometheus metrics available on ${serverUri}:7788`
      );

      resolve();
    });
  });
};

module.exports = startServer;
