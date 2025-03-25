import crypto from 'node:crypto';
import http, { IncomingMessage, Server } from 'node:http';
import chalk from 'chalk';
import jwtDecode from 'jwt-decode';
import prompts from 'prompts';
import { decode } from 'qss';
import { processConfig } from '@commercetools-frontend/application-config';
import { getAuthToken } from '../utils/auth';
import CredentialsStorage from '../utils/credentials-storage';

type AuthorizeCallbackFragments = { sessionToken?: string; state: string };
type SessionToken = { exp: number; nonce: string };

const credentialsStorage = new CredentialsStorage();
const port = 3001;

const startServer = (server: Server) =>
  new Promise((resolve, reject) => {
    server
      .listen(port)
      .on('listening', resolve)
      .on('error', (error) => {
        console.error('Problem starting server', error);
        return reject(error);
      });
  });

const generateRandomHash = (length: number = 16) =>
  crypto.randomBytes(length).toString('hex');

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

async function run() {
  const shouldUseExperimentalIdentityAuthFlow =
    process.env.ENABLE_EXPERIMENTAL_IDENTITY_AUTH_FLOW === 'true';

  const applicationConfig = await processConfig();
  const { mcApiUrl } = applicationConfig.env;

  console.log(`Using Merchant Center environment "${chalk.green(mcApiUrl)}".`);
  console.log();

  if (credentialsStorage.isSessionValid(mcApiUrl)) {
    console.log(`You already have a valid session.`);
    return;
  }

  if (shouldUseExperimentalIdentityAuthFlow) {
    const open = await import('open');

    const state = generateRandomHash();
    const nonce = generateRandomHash();

    const authUrl = new URL('/login/authorize', mcApiUrl);
    authUrl.searchParams.set('response_type', 'id_token');
    authUrl.searchParams.set('response_mode', 'form_post');
    authUrl.searchParams.set('client_id', '__local:@@cli@@');
    authUrl.searchParams.set(
      'scope',
      [
        'openid',
        // 'project_key:??',
      ].join(' ')
    );
    authUrl.searchParams.set('state', state);
    authUrl.searchParams.set('nonce', nonce);

    const server = http.createServer(async (request, response) => {
      try {
        if (
          request.url?.includes('/oidc/callback') &&
          request.method === 'POST' &&
          request.headers['content-type'] ===
            'application/x-www-form-urlencoded'
        ) {
          const body = await parseRequestBody(request);
          const authParams = decode<AuthorizeCallbackFragments>(body);
          const { sessionToken } = authParams;

          if (!sessionToken) {
            throw new Error(
              'Invalid authentication flow (missing sessionToken)'
            );
          }
          const decodedSessionToken = jwtDecode<SessionToken>(sessionToken);

          if (decodedSessionToken?.nonce !== nonce) {
            throw new Error('Invalid authentication flow (nonce mismatch)');
          }
          if (authParams.state !== state) {
            throw new Error('Invalid authentication flow (state mismatch)');
          }

          credentialsStorage.setToken(mcApiUrl, {
            token: sessionToken,
            expiresAt: decodedSessionToken.exp,
          });

          console.log(chalk.green(`Login successful.`));
          console.log();

          response.writeHead(200, 'Success!', { 'content-type': 'text/html' });
          response.end();
          server.close();
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
          response.writeHead(500, error.message, {
            'content-type': 'text/html',
          });
        } else {
          console.error(error);
          response.writeHead(500, `Something went wrong. Please try again.`, {
            'content-type': 'text/html',
          });
        }
        response.end();

        server.close();
      }
    });

    await startServer(server);

    await open.default(authUrl.toString());

    console.log('Waiting for the OIDC authentication to complete...');
  } else {
    console.log(`Enter the login credentials:`);

    const { email } = await prompts({
      type: 'text',
      name: 'email',
      message: 'Email',
    });
    const { password } = await prompts({
      type: 'invisible',
      name: 'password',
      message: 'Password (hidden)',
    });

    if (!email || !password) {
      throw new Error(`Missing email or password values. Aborting.`);
    }

    const credentials = await getAuthToken(mcApiUrl, { email, password });
    credentialsStorage.setToken(mcApiUrl, credentials);

    console.log(chalk.green(`Login successful.`));
    console.log();
  }
}

export default run;
