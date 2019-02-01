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
const express = require('express');
const logout = require('./routes/logout');
const options = require('./load-options');

const publicFolderPath = path.join(__dirname, 'public');

// Make sure that the `index.html` is available.
try {
  fs.accessSync(path.join(publicFolderPath, 'index.html'), fs.F_OK);
} catch (error) {
  throw new Error('Missing "index.html" file in "public" folder.');
}

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

const serverIndexMiddleware = (request, response) => {
  // Define security headers!
  Object.keys(options.headers).forEach(key => {
    response.setHeader(key, options.headers[key]);
  });
  // Fall back to index.html
  response.sendFile(path.join(publicFolderPath, 'index.html'));
};

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
  .use(logout)
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
  .use(express.static(publicFolderPath))
  // Catch all middleware to serve the `index.html` (for SPA routes)
  .use('*', serverIndexMiddleware);

http.createServer(app).listen(serverPort, async error => {
  if (error) {
    lightship.signalNotReady();
    throw error;
  }

  const prometheusMetricsServer = await createPrometheusMetricsServer();

  lightship.registerShutdownHandler(async () => {
    /**
     * NOTE: The default k8s grace period is 60 seconds. It is often
     * recommended to not exceed the grace period given by k8s by half.
     * 20 seconds is chosen here under the assumption that any outstanging
     * request just settle by then.
     */
    await new Promise(resolve => setTimeout(resolve, 20000));

    prometheusMetricsServer.close();
  });

  lightship.signalReady();

  console.log(
    `[@commercetools-frontend/mc-http-server] server is listening on ${serverUrl}`
  );
  console.log(
    `[@commercetools-frontend/mc-http-server] Prometheus metrics available on ${serverUri}:7788`
  );
});
