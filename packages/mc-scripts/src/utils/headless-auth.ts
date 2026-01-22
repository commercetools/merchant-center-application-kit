import crypto from 'node:crypto';
import jwtDecode from 'jwt-decode';
import fetch from 'node-fetch';
import type { TMcCliAuthToken } from '../types';
import CredentialsStorage from './credentials-storage';

type TSessionToken = { exp: number; nonce: string };

type THeadlessAuthOptions = {
  mcApiUrl: string;
  email: string;
  password: string;
};

type THeadlessAuthResult = {
  token: string;
  expiresAt: number;
};

const generateRandomHash = (length: number = 16) =>
  crypto.randomBytes(length).toString('hex');

/**
 * Performs headless authentication using email and password.
 * This bypasses the browser-based OIDC flow for CI environments.
 */
async function headlessLogin({
  mcApiUrl,
  email,
  password,
}: THeadlessAuthOptions): Promise<THeadlessAuthResult> {
  const state = generateRandomHash();
  const nonce = generateRandomHash();

  // Step 1: Initiate the OIDC flow to get the login URL
  const authUrl = new URL('/login/authorize', mcApiUrl);
  authUrl.searchParams.set('response_type', 'id_token');
  authUrl.searchParams.set('response_mode', 'query');
  authUrl.searchParams.set('client_id', '__local:mc-scripts-ci');
  authUrl.searchParams.set('scope', 'openid');
  authUrl.searchParams.set('state', state);
  authUrl.searchParams.set('nonce', nonce);

  // Step 2: Get the login page to extract any necessary tokens/cookies
  const authResponse = await fetch(authUrl.toString(), {
    redirect: 'manual',
  });

  // The authorize endpoint typically redirects to the login page
  const loginPageUrl = authResponse.headers.get('location');
  if (!loginPageUrl) {
    throw new Error('Failed to get login page URL from authorize endpoint');
  }

  // Step 3: Submit login credentials
  const mcUrl = mcApiUrl.replace('mc-api', 'mc');
  const loginSubmitUrl = new URL('/api/login', mcUrl);

  const loginResponse = await fetch(loginSubmitUrl.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      state,
      nonce,
      clientId: '__local:mc-scripts-ci',
      responseType: 'id_token',
      responseMode: 'query',
      scope: 'openid',
    }),
    redirect: 'manual',
  });

  // Check for successful login
  if (loginResponse.status === 401 || loginResponse.status === 403) {
    throw new Error('Authentication failed: Invalid email or password');
  }

  // Try to get token from response body or redirect
  const responseData = await loginResponse.json().catch(() => null);

  if (responseData && typeof responseData === 'object') {
    // Check if token is in the response body
    const data = responseData as Record<string, unknown>;
    if (data.sessionToken && typeof data.sessionToken === 'string') {
      const decodedToken = jwtDecode<TSessionToken>(data.sessionToken);
      return {
        token: data.sessionToken,
        expiresAt: decodedToken.exp,
      };
    }

    // Check for error in response
    if (data.error || data.message) {
      throw new Error(`Authentication failed: ${data.error || data.message}`);
    }
  }

  // Check redirect location for token
  const redirectLocation = loginResponse.headers.get('location');
  if (redirectLocation) {
    const redirectUrl = new URL(redirectLocation, mcUrl);
    const sessionToken = redirectUrl.searchParams.get('sessionToken');
    if (sessionToken) {
      const decodedToken = jwtDecode<TSessionToken>(sessionToken);
      return {
        token: sessionToken,
        expiresAt: decodedToken.exp,
      };
    }
  }

  throw new Error(
    'Authentication failed: Could not retrieve session token. The MC API may not support headless authentication.'
  );
}

/**
 * Environment variable names for headless authentication
 */
const ENV_VARS = {
  TOKEN: 'MC_CLI_TOKEN',
  EMAIL: 'MC_CLI_EMAIL',
  PASSWORD: 'MC_CLI_PASSWORD',
} as const;

type TAuthenticateForCIOptions = {
  mcApiUrl: string;
};

/**
 * Authenticates for CI environments using environment variables.
 * Checks for MC_CLI_TOKEN first, then falls back to MC_CLI_EMAIL/MC_CLI_PASSWORD.
 */
async function authenticateForCI({
  mcApiUrl,
}: TAuthenticateForCIOptions): Promise<TMcCliAuthToken> {
  const credentialsStorage = new CredentialsStorage();

  // Option 1: Use pre-existing token from environment
  const envToken = process.env[ENV_VARS.TOKEN];
  if (envToken) {
    // Validate and decode the token
    try {
      const decodedToken = jwtDecode<TSessionToken>(envToken);
      const now = Math.floor(Date.now() / 1000);
      if (decodedToken.exp <= now) {
        throw new Error('The provided MC_CLI_TOKEN has expired');
      }
      return {
        token: envToken,
        expiresAt: decodedToken.exp,
      };
    } catch (error) {
      if (error instanceof Error && error.message.includes('expired')) {
        throw error;
      }
      throw new Error('The provided MC_CLI_TOKEN is invalid');
    }
  }

  // Option 2: Use email/password to authenticate
  const email = process.env[ENV_VARS.EMAIL];
  const password = process.env[ENV_VARS.PASSWORD];

  if (email && password) {
    const result = await headlessLogin({ mcApiUrl, email, password });
    // Store the token for subsequent requests
    credentialsStorage.setToken(mcApiUrl, result);
    return result;
  }

  // Option 3: Check if there's already a valid session
  if (credentialsStorage.isSessionValid(mcApiUrl)) {
    const token = credentialsStorage.getToken(mcApiUrl);
    if (token) {
      const decodedToken = jwtDecode<TSessionToken>(token);
      return {
        token,
        expiresAt: decodedToken.exp,
      };
    }
  }

  throw new Error(
    `No valid authentication found for CI mode. Please provide one of:\n` +
      `  - ${ENV_VARS.TOKEN}: A valid session token\n` +
      `  - ${ENV_VARS.EMAIL} and ${ENV_VARS.PASSWORD}: Your commercetools identity credentials\n` +
      `  - Or run "mc-scripts login" first to create a session`
  );
}

export { headlessLogin, authenticateForCI, ENV_VARS };
