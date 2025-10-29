import crypto from 'node:crypto';
import type { Server } from 'node:http';
import process from 'node:process';
import chalk from 'chalk';
import { processConfig } from '@commercetools-frontend/application-config';
import pkgJson from '../../package.json';
import type { TCliCommandLoginOptions } from '../types';
import { createAuthCallbackServer } from '../utils/auth-callback';
import CredentialsStorage from '../utils/credentials-storage';

const credentialsStorage = new CredentialsStorage();
const port = 3001;
const clientIdentifier = `mc-scripts-${pkgJson.version}`;

const isServerError = (error: unknown): error is NodeJS.ErrnoException => {
  return error instanceof Error && 'code' in error;
};

const startServer = (server: Server) =>
  new Promise((resolve, reject) => {
    server
      .listen(port, 'localhost')
      .on('listening', resolve)
      .on('error', (error) => {
        if (isServerError(error) && error.code === 'EADDRINUSE') {
          return reject(
            new Error(
              `The address "localhost:${port}" is already in use. Are you running a Merchant Center application in other process? Please stop that and try again.`,
              { cause: error }
            )
          );
        }
        return reject(new Error('Problem starting server', { cause: error }));
      })
      .on('close', () => {
        process.exit();
      });
  });

const resolveMcApiUrl = async (
  options: TCliCommandLoginOptions
): Promise<string> => {
  if (options.mcApiUrl) {
    return options.mcApiUrl;
  }

  // We first check whether the user has set the MC_API_URL environment variable
  if (process.env.MC_API_URL) {
    return process.env.MC_API_URL;
  }

  // If not, we parse the configuration and check if it's defined over there
  const applicationConfig = await processConfig();
  const { mcApiUrl } = applicationConfig.env;

  return mcApiUrl;
};

const resolveProjectKey = async (
  options: TCliCommandLoginOptions
): Promise<string | undefined> => {
  if (options.projectKey) {
    return options.projectKey;
  }

  // We first check whether the user has set the CTP_PROJECT_KEY environment variable
  if (process.env.CTP_PROJECT_KEY) {
    return process.env.CTP_PROJECT_KEY;
  }

  try {
    const applicationConfig = await processConfig();
    return applicationConfig.env.__DEVELOPMENT__?.oidc?.initialProjectKey;
  } catch (error) {
    // It's ok if there's not application config file or if it does not contain the initialProjectKey
    return;
  }
};

const mapOAuthScopesToClaims = (scopes: string[]): string[] => {
  return scopes.map((scope) => {
    if (scope.startsWith('view_')) {
      return `view:${scope}`;
    }
    if (scope.startsWith('manage_')) {
      return `manage:${scope}`;
    }
    return scope;
  });
};
const mapAdditionalOAuthScopesToClaims = (
  name: string,
  scopes: string[]
): string[] => {
  return scopes.map((scope) => {
    if (scope.startsWith('view_')) {
      return `view/${name}:${scope}`;
    }
    if (scope.startsWith('manage_')) {
      return `manage/${name}:${scope}`;
    }
    return scope;
  });
};

const resolveOAuthScopes = async (
  options: TCliCommandLoginOptions
): Promise<string[]> => {
  if (options.oauthScope) {
    return mapOAuthScopesToClaims(options.oauthScope);
  }

  // We first check whether the user has set the CTP_OAUTH_SCOPES environment variable
  if (process.env.CTP_OAUTH_SCOPES) {
    return mapOAuthScopesToClaims(
      process.env.CTP_OAUTH_SCOPES?.split(',').map((scope) => scope.trim()) ??
        []
    );
  }

  try {
    const applicationConfig = await processConfig();
    const configuredOAuthScopes =
      applicationConfig.env.__DEVELOPMENT__?.oidc?.oAuthScopes;
    const configuredAdditionalOAuthScopes =
      applicationConfig.env.__DEVELOPMENT__?.oidc?.additionalOAuthScopes;

    return [
      ...mapOAuthScopesToClaims(configuredOAuthScopes?.view ?? []),
      ...mapOAuthScopesToClaims(configuredOAuthScopes?.manage ?? []),
      ...(configuredAdditionalOAuthScopes?.flatMap((scope) =>
        mapAdditionalOAuthScopesToClaims(scope.name, scope.view)
      ) ?? []),
      ...(configuredAdditionalOAuthScopes?.flatMap((scope) =>
        mapAdditionalOAuthScopesToClaims(scope.name, scope.manage)
      ) ?? []),
    ];
  } catch (error) {
    // It's ok if there's not application config file or if it does not contain the initialProjectKey
    return [];
  }
};

const generateRandomHash = (length: number = 16) =>
  crypto.randomBytes(length).toString('hex');

async function run(options: TCliCommandLoginOptions) {
  const mcApiUrl = await resolveMcApiUrl(options);

  if (!mcApiUrl) {
    throw new Error('No Merchant Center API URL found. Aborting.');
  }

  console.log(`Using Merchant Center environment "${chalk.green(mcApiUrl)}".`);
  console.log();

  if (!options.force && credentialsStorage.isSessionValid(mcApiUrl)) {
    console.log(`You already have a valid session.`);
    return;
  }

  const projectKey = await resolveProjectKey(options);
  const oauthScopes = await resolveOAuthScopes(options);

  const scopes = ['openid'];
  if (projectKey) {
    scopes.push(`project_key:${projectKey}`);
    oauthScopes.forEach((scope) => {
      scopes.push(scope);
    });
  }

  const state = generateRandomHash();
  const nonce = generateRandomHash();

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

  console.log(
    `Initiating the OIDC authentication flow, opening the login page in your browser...`
  );
  console.log(`  ${authUrl}`);
  console.log();

  const open = await import('open');
  await open.default(authUrl.toString());

  console.log('Waiting for the OIDC authentication to complete...');
}

export default run;
