import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import type { TMcCliAuthToken, TMcCliCredentialsStorage } from '../types';
import doesFileExist from '../utils/does-file-exist';

class CredentialsStorage {
  private credentialsFilePath: string;

  constructor() {
    const homedir = os.homedir();
    const credentialsFolderPath = path.join(homedir, `.commercetools`);
    this.credentialsFilePath = path.join(
      credentialsFolderPath,
      'mc-credentials.json'
    );

    // Ensure the credentials file is present
    if (!doesFileExist(this.credentialsFilePath)) {
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
    const allCredentials = this._loadCredentials();
    if (!this.isSessionValid(environmentKey)) {
      return null;
    }
    return allCredentials[environmentKey].token;
  }

  setToken(environmentKey: string, credentials: TMcCliAuthToken) {
    const allCredentials = this._loadCredentials();
    allCredentials[environmentKey] = credentials;
    this._writeCredentials(allCredentials);
  }

  isSessionValid(environmentKey: string) {
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
