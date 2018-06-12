/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const http = require('http');
const morgan = require('morgan');
const {
  createMiddleware: createPrometheusMetricsMiddleware,
} = require('@promster/express');
const compression = require('compression');
const connect = require('connect');
const history = require('connect-history-api-fallback');
const serveStatic = require('serve-static');
const headers = require('@commercetools-frontend/mc-http-server-config/headers');
const logout = require('@commercetools-frontend/mc-http-server-config/routes/logout');
const metrics = require('./routes/metrics');

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

// Serve static files from the `public` folder.
const staticFilesMiddleware = serveStatic(publicFolderPath, {
  // Define security headers!
  setHeaders(res) {
    Object.keys(headers).forEach(key => {
      res.setHeader(key, headers[key]);
    });
  },
});
// Gather and expose metrics to Prometheus
const prometheusMetricsMiddleware = createPrometheusMetricsMiddleware();

// Configure and start the HTTP server.
const app = connect()
  .use(compression())
  .use(prometheusMetricsMiddleware)
  .use(morgan('combined', { stream: process.stdout }))
  .use('/metrics', metrics)
  .use('/version', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ revision: process.env.GIT_SHA }));
  })
  // Intercept the /logout page and "remove" the auth cookie value
  .use(logout)
  .use(history())
  .use(staticFilesMiddleware);

http.createServer(app).listen(serverPort, error => {
  if (error) throw error;
  console.log(`Server is listening on ${serverUrl}...`);
});
