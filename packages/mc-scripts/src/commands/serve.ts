import http from 'http';
import serveHandler from 'serve-handler';
import { processConfig } from '@commercetools-frontend/application-config';
import paths from '../config/paths';

const port = 3001;

async function run() {
  const applicationConfig = await processConfig();

  const server = http.createServer((request, response) => {
    // When developing against local APIs, handle the login|logout routes separately.
    if (applicationConfig.env.mcApiUrl.startsWith('http://localhost')) {
      if (request.url?.startsWith('/login/authorize')) {
        const redirectTo = new URL(request.url, applicationConfig.env.mcApiUrl);
        response.writeHead(301, { Location: redirectTo.toString() }).end();
        return;
      }
      if (request.url?.startsWith('/logout')) {
        response.end('Please clear your session storage.');
        return;
      }
    }

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
}

export default run;
