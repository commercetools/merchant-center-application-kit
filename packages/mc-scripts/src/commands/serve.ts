import http from 'http';
import sirv from 'sirv';
import {
  type ApplicationRuntimeConfig,
  processConfig,
} from '@commercetools-frontend/application-config';
import paths from '../config/paths';

const DEFAULT_PORT = 3001;

type RunOptions = {
  port?: number;
  publicPath?: string;
  applicationConfig?: ApplicationRuntimeConfig;
};

async function run(options: RunOptions = {}): Promise<http.Server> {
  const port = options.port ?? DEFAULT_PORT;
  const publicPath = options.publicPath ?? paths.appBuild;
  const applicationConfig =
    options.applicationConfig ?? (await processConfig());
  const isLocalMcApi =
    applicationConfig.env.mcApiUrl.startsWith('http://localhost');

  // `single: true` gives us the SPA fallback — any unmatched path is served as
  // the root `index.html`. This replaces the complex glob workaround that
  // `serve-handler` needed because of vercel/serve-handler#71.
  const staticHandler = sirv(publicPath, {
    single: true,
    etag: true,
  });

  const server = http.createServer((request, response) => {
    // Localhost-only: inline replacement for the login/logout UI that
    // `mc-dev-authentication` used to ship as static HTML (#3734).
    if (isLocalMcApi && request.url?.startsWith('/login/authorize')) {
      const redirectTo = new URL(request.url, applicationConfig.env.mcApiUrl);
      response.writeHead(301, { Location: redirectTo.toString() }).end();
      return;
    }
    if (isLocalMcApi && request.url?.startsWith('/logout')) {
      response.end('Please clear your session storage.');
      return;
    }

    // Preserve the pre-swap contract: any other `/login*` or `/logout*`
    // request (bare `/login`, non-localhost auth callbacks, etc.) must NOT
    // fall back to the SPA — that would mask OAuth callback
    // misconfigurations by rendering the app on a URL the backend owns.
    if (
      request.url?.startsWith('/login') ||
      request.url?.startsWith('/logout')
    ) {
      response.writeHead(404).end();
      return;
    }

    // Absorb `/favicon*` variants (e.g. `/favicon.ico`, `/favicon-32x32.png`)
    // into the single PNG the app ships.
    if (request.url?.startsWith('/favicon')) {
      request.url = '/favicon.png';
    }

    staticHandler(request, response, () => {
      response.writeHead(404).end();
    });
  });

  return new Promise((resolve) => {
    server.listen(port, () => resolve(server));
  });
}

export default run;
