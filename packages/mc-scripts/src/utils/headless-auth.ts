import jwtDecode from 'jwt-decode';
import type { TMcCliAuthToken } from '../types';
import CredentialsStorage from './credentials-storage';

type TSessionToken = { exp: number; nonce: string };

/**
 * Environment variable names for CI authentication
 */
const ENV_VARS = {
  TOKEN: 'MC_ACCESS_TOKEN',
} as const;

type TAuthenticateForCIOptions = {
  mcApiUrl: string;
};

/**
 * Authenticates for CI environments using environment variables.
 * Supports two authentication methods:
 * 1. MC_ACCESS_TOKEN - Pre-existing session token
 * 2. Existing session from previous mc-scripts login
 */
async function authenticateForCI({
  mcApiUrl,
}: TAuthenticateForCIOptions): Promise<TMcCliAuthToken> {
  const credentialsStorage = new CredentialsStorage();

  // Option 1: Use pre-existing token from environment
  const envToken = process.env[ENV_VARS.TOKEN];
  if (envToken) {
    try {
      const decodedToken = jwtDecode<TSessionToken>(envToken);
      const now = Math.floor(Date.now() / 1000);
      if (decodedToken.exp <= now) {
        throw new Error('The provided MC_ACCESS_TOKEN has expired');
      }
      // Store the token for subsequent requests
      credentialsStorage.setToken(mcApiUrl, {
        token: envToken,
        expiresAt: decodedToken.exp,
      });
      return {
        token: envToken,
        expiresAt: decodedToken.exp,
      };
    } catch (error) {
      if (error instanceof Error && error.message.includes('expired')) {
        throw error;
      }
      throw new Error('The provided MC_ACCESS_TOKEN is invalid');
    }
  }

  // Option 2: Check if there's already a valid session (from previous mc-scripts login)
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
      `  - ${ENV_VARS.TOKEN}: A valid MC session token\n` +
      `  - Run "mc-scripts login --headless" with MC_USER_NAME and MC_USER_PASSWORD\n` +
      `  - Run "mc-scripts login" interactively to create a session`
  );
}

export { authenticateForCI, ENV_VARS };
