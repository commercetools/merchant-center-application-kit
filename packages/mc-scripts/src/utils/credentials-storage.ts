import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import type { TMcCliAuthToken, TMcCliCredentialsStorage } from '../types';
import doesFileExist from '../utils/does-file-exist';

/**
 * Environment variable name for providing a token directly (useful for CI).
 * When set, this token will be used instead of the stored credentials.
 */
const MC_CLI_TOKEN_ENV_VAR = 'MC_CLI_TOKEN';

class CredentialsStorage {
  private credentialsFilePath: string;

  constructor() {
    const homedir = os.homedir();
    const credentialsFolderPath = path.join(homedir, `.commercetools`);
    this.credentialsFilePath = path.join(
      credentialsFolderPath,
      'mc-credentials.json'
    );

    // Ensure the credentials file is present (skip if using env var token)
    if (
      !process.env[MC_CLI_TOKEN_ENV_VAR] &&
      !doesFileExist(this.credentialsFilePath)
    ) {
      fs.mkdirSync(credentialsFolderPath, { recursive: true });
      // Initialize with an empty object
      this._writeCredentials();
    }
  }

  _writeCredentials(credentials?: TMcCliCredentialsStorage) {
    fs.writeFileSync(
      this.credentialsFilePath,
      JSON.stringify(credentials || {}, null, 2),
      { encoding: 'utf8' }
    );
  }

  _loadCredentials(): TMcCliCredentialsStorage {
    const data = fs.readFileSync(this.credentialsFilePath, {
      encoding: 'utf8',
    });
    return JSON.parse(data);
  }

  getToken(environmentKey: string) {
    // Check for environment variable token first (useful for CI)
    const envToken = process.env[MC_CLI_TOKEN_ENV_VAR];
    if (envToken) {
      return envToken;
    }

    const allCredentials = this._loadCredentials();
    if (!this.isSessionValid(environmentKey)) {
      return null;
    }
    return allCredentials[environmentKey].token;
  }

  setToken(environmentKey: string, credentials: TMcCliAuthToken) {
    // Don't write credentials if using env var token
    if (process.env[MC_CLI_TOKEN_ENV_VAR]) {
      return;
    }
    const allCredentials = this._loadCredentials();
    allCredentials[environmentKey] = credentials;
    this._writeCredentials(allCredentials);
  }

  isSessionValid(environmentKey: string) {
    // If using environment variable token, assume it's valid
    if (process.env[MC_CLI_TOKEN_ENV_VAR]) {
      return true;
    }

    const allCredentials = this._loadCredentials();
    const credentials = allCredentials[environmentKey];
    if (!credentials) {
      return false;
    }
    const now = Math.floor(Date.now() / 1000);
    return now < credentials.expiresAt;
  }
}

export default CredentialsStorage;
