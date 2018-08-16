/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const http = require('http');
const morgan = require('morgan');
const {
  createMiddleware: createPrometheusMetricsMiddleware,
} = require('@promster/express');
const compression = require('compression');
const express = require('express');
const logout = require('./routes/logout');
const metrics = require('./routes/metrics');
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
const serverUrl = `http://localhost:${serverPort}`;

/**
 * 👇 Middlewares
 */

// Gather and expose metrics to Prometheus
const prometheusMetricsMiddleware = createPrometheusMetricsMiddleware({
  options: {
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

// Configure and start the HTTP server.
const app = express()
  .use(compression())
  .use(prometheusMetricsMiddleware)
  .use(morgan('combined', { stream: process.stdout }))
  .use('/metrics', metrics)
  .use('/version', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ revision: options.env.revision }));
  })
  // Intercept the /logout page and "remove" the auth cookie value
  .use(logout)
  // Try serving a static file that matches the url, otherwise go to
  // the next middleware (e.g. favicon.ico)
  .use(express.static(publicFolderPath))
  .use('*', (request, response) => {
    // Define security headers!
    Object.keys(options.headers).forEach(key => {
      response.setHeader(key, options.headers[key]);
    });
    // Fall back to index.html
    response.sendFile(path.join(publicFolderPath, 'index.html'));
  });

http.createServer(app).listen(serverPort, error => {
  if (error) throw error;
  console.log(`Server is listening on ${serverUrl}...`);
});
