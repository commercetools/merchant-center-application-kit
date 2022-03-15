const { existsSync, writeFileSync, readFileSync, mkdirSync } = require('fs');
const homedir = require('os').homedir();

const dirPath = `${homedir}/.commercetools`;
const filename = 'mc-credentials.json';
const filePath = `${dirPath}/${filename}`;

class CredentialsStorage {
  _writeCredentials(credentials) {
    writeFileSync(filePath, JSON.stringify(credentials, null, 2), {
      encoding: 'utf8',
    });
  }

  _loadCredentials() {
    if (!existsSync(dirPath)) {
      mkdirSync(dirPath);
      this._writeCredentials({});
      return {};
    }
    const data = readFileSync(filePath, { encoding: 'utf8' });
    return JSON.parse(data);
  }

  getToken(environmentKey) {
    const allCredentials = this._loadCredentials();
    if (!this.isSessionValid(environmentKey)) {
      return null;
    }
    return allCredentials[environmentKey].sessionToken;
  }

  setToken(environmentKey, sessionData) {
    const allCredentials = this._loadCredentials();
    allCredentials[environmentKey] = sessionData;
    this._writeCredentials(allCredentials);
  }

  isSessionValid(environmentKey) {
    const allCredentials = this._loadCredentials();
    const credentials = allCredentials[environmentKey];
    if (!credentials) {
      return false;
    }
    const now = new Date();
    return now < new Date(allCredentials[environmentKey].expiresAt);
  }
}

module.exports = CredentialsStorage;
