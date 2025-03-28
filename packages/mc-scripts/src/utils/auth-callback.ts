import http, { type IncomingMessage } from 'node:http';
import jwtDecode from 'jwt-decode';
import type { TMcCliAuthToken } from '../types';

type TAuthCallbackServerOptions = {
  state: string;
  nonce: string;
  onSuccess: (tokenContext: TMcCliAuthToken) => void;
};
type TAuthorizeCallbackFragments = { sessionToken?: string; state: string };
type TSessionToken = { exp: number; nonce: string };

const parseRequestBody = async (request: IncomingMessage): Promise<string> => {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    request.on('data', (chunk) => {
      chunks.push(chunk);
    });
    request.on('end', () => {
      try {
        const body = Buffer.concat(chunks).toString();
        resolve(body);
      } catch (error) {
        reject(error);
      }
    });
    request.on('error', (error) => {
      reject(error);
    });
  });
};

function createAuthCallbackServer(options: TAuthCallbackServerOptions) {
  const server = http.createServer(async (request, response) => {
    try {
      if (
        request.url?.includes('/oidc/callback') &&
        request.method === 'POST' &&
        request.headers['content-type'] === 'application/x-www-form-urlencoded'
      ) {
        const body = await parseRequestBody(request);
        const authParams = Object.fromEntries(
          new URLSearchParams(body)
        ) as TAuthorizeCallbackFragments;
        const { sessionToken } = authParams;

        if (!sessionToken) {
          throw new Error('Invalid authentication flow (missing sessionToken)');
        }
        const decodedSessionToken = jwtDecode<TSessionToken>(sessionToken);

        if (decodedSessionToken?.nonce !== options.nonce) {
          throw new Error('Invalid authentication flow (nonce mismatch)');
        }
        if (authParams.state !== options.state) {
          throw new Error('Invalid authentication flow (state mismatch)');
        }

        options.onSuccess({
          token: sessionToken,
          expiresAt: decodedSessionToken.exp,
        });

        response.writeHead(200, 'Success!', { 'content-type': 'text/html' });
        response.end();
        server.close();
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        response.writeHead(400, error.message, {
          'content-type': 'text/html',
        });
      } else {
        console.error(error);
        response.writeHead(400, `Invalid authentication flow.`, {
          'content-type': 'text/html',
        });
      }
      response.end();

      server.close();
    }
  });

  return server;
}

export { createAuthCallbackServer };
