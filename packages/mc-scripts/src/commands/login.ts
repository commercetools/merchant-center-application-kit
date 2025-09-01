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

const resolveMcApiUrl = async () => {
  // We first check whether the user has set the MC_API_URL environment variable
  if (process.env.MC_API_URL) {
    return process.env.MC_API_URL;
  }

  // In the future we might want to support this value as a command line parameter

  // If not, we parse the Custom Application configuration and check if it's defined over there
  const applicationConfig = await processConfig();
  const { mcApiUrl } = applicationConfig.env;

  return mcApiUrl;
};

const resolveProjectKey = async () => {
  // We first check whether the user has set the CTP_PROJECT_KEY environment variable
  if (process.env.CTP_PROJECT_KEY) {
    return process.env.CTP_PROJECT_KEY;
  }

  // In the future we might want to support this value as a command line parameter

  try {
    const applicationConfig = await processConfig();
    // @ts-expect-error - We know that the initialProjectKey is defined in the development environment
    return applicationConfig.env.development.initialProjectKey;
  } catch (error) {
    // It's ok if there's not application config file or if it does not contain the initialProjectKey
    return null;
  }
};

const generateRandomHash = (length: number = 16) =>
  crypto.randomBytes(length).toString('hex');

async function run() {
  const shouldUseExperimentalIdentityAuthFlow =
    process.env.ENABLE_EXPERIMENTAL_IDENTITY_AUTH_FLOW === 'true';

  const mcApiUrl = await resolveMcApiUrl();

  if (!mcApiUrl) {
    throw new Error('No Merchant Center API environment URL found. Aborting.');
  }

  console.log(`Using Merchant Center environment "${chalk.green(mcApiUrl)}".`);
  console.log();

  if (credentialsStorage.isSessionValid(mcApiUrl)) {
    console.log(`You already have a valid session.`);
    return;
  }

  if (shouldUseExperimentalIdentityAuthFlow) {
    const open = await import('open');

    const projectKey = await resolveProjectKey();
    const state = generateRandomHash();
    const nonce = generateRandomHash();

    const scopes = ['openid'];
    if (projectKey) {
      scopes.push(`project_key:${projectKey}`);
      scopes.push(`view_project_settings:${projectKey}`);
      scopes.push(`manage_project:${projectKey}`);
    }

    const authUrl = new URL('/login/authorize', mcApiUrl);
    authUrl.searchParams.set('response_type', 'id_token');
    authUrl.searchParams.set('response_mode', 'query');
    authUrl.searchParams.set('client_id', `__local:${clientIdentifier}`);
    authUrl.searchParams.set('scope', scopes.join(' '));
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
