/* eslint-disable no-console,global-require,import/no-dynamic-require */
const http = require('http');
const serveHandler = require('serve-handler');
const paths = require('../config/paths');

const port = 3001;

const server = http.createServer((request, response) => {
  // You pass two more arguments for config and middleware
  // More details here: https://github.com/vercel/serve-handler#options
  return serveHandler(request, response, {
    public: paths.appBuild,
    rewrites: [
      {
        source: '/favicon*',
        destination: '/favicon.png',
      },
      {
        source: '/login*',
        destination: '/login.html',
      },
      {
        source: '/logout',
        destination: '/logout.html',
      },
      {
        // Match all routes except for the login, logout, and favicon routes.
        // NOTE: this complex glob pattern would not be necessary if the rewrite
        // implementation would stop at the first match.
        // See https://github.com/vercel/serve-handler/issues/71
        source: '{/!(favicon|login|logout)*/**,/!(favicon|login|logout)*}',
        destination: '/index.html',
      },
    ],
  });
});

server.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});
