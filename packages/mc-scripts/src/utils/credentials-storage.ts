import fs from 'fs';
import path from 'path';
import os from 'os';
import type { TMcCliAuthToken, TMcCliCredentialsStorage } from '../types';

const homedir = os.homedir();
const credentialsFolderPath = path.join(homedir, `.commercetools`);
const credentialsFilePath = path.join(
  credentialsFolderPath,
  'mc-credentials.json'
);

class CredentialsStorage {
  static location = credentialsFilePath;

  constructor() {
    // Ensure the credentials file is present
    if (!fs.existsSync(credentialsFilePath)) {
      fs.mkdirSync(credentialsFolderPath, { recursive: true });
      // Initialize with an empty object
      this._writeCredentials();
    }
  }

  _writeCredentials(credentials?: TMcCliCredentialsStorage) {
    fs.writeFileSync(
      credentialsFilePath,
      JSON.stringify(credentials || {}, null, 2),
      { encoding: 'utf8' }
    );
  }

  _loadCredentials(): TMcCliCredentialsStorage {
    const data = fs.readFileSync(credentialsFilePath, { encoding: 'utf8' });
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
