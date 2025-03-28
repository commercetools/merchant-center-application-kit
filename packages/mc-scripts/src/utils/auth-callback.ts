import http from 'node:http';
import jwtDecode from 'jwt-decode';
import type { TMcCliAuthToken } from '../types';

type TAuthCallbackServerOptions = {
  clientIdentifier: string;
  state: string;
  nonce: string;
  onSuccess: (tokenContext: TMcCliAuthToken) => void;
};
type TSessionToken = { exp: number; nonce: string };

function createAuthCallbackServer(options: TAuthCallbackServerOptions) {
  const server = http.createServer(async (request, response) => {
    try {
      if (request.url?.includes(`/${options.clientIdentifier}/oidc/callback`)) {
        const incomingUrl = new URL(request.url, 'http://localhost');
        const sessionToken = incomingUrl.searchParams.get('sessionToken');
        const requestedState = incomingUrl.searchParams.get('state');

        if (!sessionToken) {
          throw new Error('Invalid authentication flow (missing sessionToken)');
        }
        const decodedSessionToken = jwtDecode<TSessionToken>(sessionToken);

        if (decodedSessionToken?.nonce !== options.nonce) {
          throw new Error('Invalid authentication flow (nonce mismatch)');
        }
        if (requestedState !== options.state) {
          throw new Error('Invalid authentication flow (state mismatch)');
        }

        options.onSuccess({
          token: sessionToken,
          expiresAt: decodedSessionToken.exp,
        });

        response.setHeader('content-type', 'text/html');
        response.end('Success!');

        server.close();
      }
    } catch (error) {
      response.setHeader('content-type', 'text/html');
      if (error instanceof Error) {
        console.error(error.message);
        response.end(error.message);
      } else {
        console.error(error);
        response.end(`Invalid authentication flow.`);
      }

      server.close();
    }
  });

  return server;
}

export { createAuthCallbackServer };
