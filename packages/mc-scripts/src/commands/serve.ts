import http from 'http';
import serveHandler from 'serve-handler';
import {
  processConfig,
  type ApplicationRuntimeConfig,
} from '@commercetools-frontend/application-config';
import paths from '../config/paths';

type RunOptions = {
  port?: number;
  publicPath?: string;
  applicationConfig?: ApplicationRuntimeConfig;
};

async function run({
  port = 3001,
  publicPath,
  applicationConfig: providedConfig,
}: RunOptions = {}): Promise<http.Server> {
  const applicationConfig = providedConfig ?? (await processConfig());
  const resolvedPublicPath = publicPath ?? paths.appBuild;

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
      public: resolvedPublicPath,
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

  return new Promise((resolve) => {
    server.listen(port, () => {
      const address = server.address();
      const boundPort =
        address && typeof address === 'object' ? address.port : port;
      console.log(`Running at http://localhost:${boundPort}`);
      resolve(server);
    });
  });
}

export default run;
