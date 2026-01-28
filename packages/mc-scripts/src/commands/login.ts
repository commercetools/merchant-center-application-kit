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

/**
 * Performs headless login using Puppeteer.
 * Requires IDENTITY_EMAIL and IDENTITY_PASSWORD environment variables.
 */
async function runHeadlessLogin(authUrl: URL): Promise<void> {
  const email = process.env.IDENTITY_EMAIL;
  const password = process.env.IDENTITY_PASSWORD;

  if (!email || !password) {
    throw new Error(
      'Headless login requires IDENTITY_EMAIL and IDENTITY_PASSWORD environment variables'
    );
  }

  let puppeteer;
  try {
    puppeteer = await import('puppeteer');
  } catch {
    throw new Error(
      'Puppeteer is required for headless login. Install it with: npm install puppeteer'
    );
  }

  const browser = await puppeteer.default.launch({
    headless: 'new' as const,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();

    await page.goto(authUrl.toString(), { waitUntil: 'networkidle2' });

    // Wait for the login page to load
    await page.waitForSelector('input[name="identifier"]', { timeout: 30000 });

    // Dismiss cookie banner if present
    // Note: Using string-based evaluate to avoid bundler transforming Array.from
    try {
      await page.evaluate(`
        (function() {
          var buttons = Array.from(document.querySelectorAll('button'));
          var acceptBtn = buttons.find(function(btn) {
            return btn.textContent && btn.textContent.includes('Accept all cookies');
          });
          if (acceptBtn) acceptBtn.click();
        })()
      `);
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch {
      // Cookie banner not found or already dismissed
    }

    // Fill in email
    await page.type('input[name="identifier"]', email);
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Click "Next" button
    await page.evaluate(`
      (function() {
        var buttons = Array.from(document.querySelectorAll('button'));
        var nextBtn = buttons.find(function(btn) {
          return btn.textContent && btn.textContent.toLowerCase().includes('next');
        });
        if (nextBtn) nextBtn.click();
      })()
    `);

    // Wait for password field
    await page.waitForSelector('input[name="password"]', {
      visible: true,
      timeout: 30000,
    });

    // Fill in password
    await page.type('input[name="password"]', password);
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Click "Submit" button
    await page.evaluate(`
      (function() {
        var buttons = Array.from(document.querySelectorAll('button'));
        var submitBtn = buttons.find(function(btn) {
          return btn.textContent && btn.textContent.toLowerCase().includes('submit');
        });
        if (submitBtn) submitBtn.click();
      })()
    `);

    // Wait for the callback to be processed (the server will close and exit)
    // We just need to keep the browser alive until the redirect happens
    const startTime = Date.now();
    const timeout = 60000;

    while (Date.now() - startTime < timeout) {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const currentUrl = page.url();
      if (currentUrl.includes('sessionToken=')) {
        // Token was captured by the callback server, we can exit
        break;
      }

      const pageContent = await page.content();
      if (
        pageContent.includes('Invalid credentials') ||
        pageContent.includes('invalid_grant')
      ) {
        throw new Error('Invalid credentials');
      }

      // Check if page shows success (callback server response)
      if (pageContent.includes('Success!')) {
        break;
      }
    }
  } finally {
    await browser.close();
  }
}

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

  if (options.headless) {
    console.log(`Initiating headless authentication flow using Puppeteer...`);
    console.log();

    await runHeadlessLogin(authUrl);
  } else {
    console.log(
      `Initiating the OIDC authentication flow, opening the login page in your browser...`
    );
    console.log(`  ${authUrl}`);
    console.log();

    const open = await import('open');
    await open.default(authUrl.toString());

    console.log('Waiting for the OIDC authentication to complete...');
  }
}

export default run;
