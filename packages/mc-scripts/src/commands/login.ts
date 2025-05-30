import crypto from 'node:crypto';
import type { Server } from 'node:http';
import process from 'node:process';
import chalk from 'chalk';
import prompts from 'prompts';
import { processConfig } from '@commercetools-frontend/application-config';
import pkgJson from '../../package.json';
import { getAuthToken } from '../utils/auth';
import { createAuthCallbackServer } from '../utils/auth-callback';
import CredentialsStorage from '../utils/credentials-storage';

const credentialsStorage = new CredentialsStorage();
const port = 3001;
const clientIdentifier = `mc-scripts-${pkgJson.version}`;

const startServer = (server: Server) =>
  new Promise((resolve, reject) => {
    server
      .listen(port)
      .on('listening', resolve)
      .on('error', (error) => {
        console.error('Problem starting server', error);
        return reject(error);
      })
      .on('close', () => {
        process.exit();
      });
  });

const generateRandomHash = (length: number = 16) =>
  crypto.randomBytes(length).toString('hex');

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
    authUrl.searchParams.set('response_mode', 'query');
    authUrl.searchParams.set('client_id', `__local:${clientIdentifier}`);
    authUrl.searchParams.set(
      'scope',
      [
        'openid',
        // 'project_key:??',
      ].join(' ')
    );
    authUrl.searchParams.set('state', state);
    authUrl.searchParams.set('nonce', nonce);

    const server = createAuthCallbackServer({
      clientIdentifier,
      state,
      nonce,
      onSuccess: (tokenContext) => {
        credentialsStorage.setToken(mcApiUrl, tokenContext);

        console.log();
        console.log(chalk.green(`Login successful.`));
        console.log();
      },
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
