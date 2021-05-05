/* eslint-disable no-console,global-require,import/no-dynamic-require */

// Do this as the first thing so that any code reading it knows the right env.
process.env.NODE_ENV = 'production';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', (err) => {
  throw err;
});

const fs = require('fs');
const path = require('path');
const http = require('http');
const serveHandler = require('serve-handler');

const port = 3001;

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const publicAssetsPath = resolveApp('public');

const server = http.createServer((request, response) => {
  // You pass two more arguments for config and middleware
  // More details here: https://github.com/vercel/serve-handler#options
  return serveHandler(request, response, {
    public: publicAssetsPath,
    rewrites: [
      {
        source: '/favicon*',
        destination: '/favicon.png',
      },
      {
        source: '/login',
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
