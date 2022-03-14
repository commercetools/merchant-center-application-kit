const { existsSync, writeFileSync, readFileSync, mkdirSync } = require('fs');
const cookie = require('cookie');
const homedir = require('os').homedir();

const dirPath = `${homedir}/.commercetools`;
const filename = 'mc-credentials.json';
const filePath = `${dirPath}/${filename}`;

class CredentialsStorage {
  _updateCredentialsFile(credentials) {
    writeFileSync(filePath, JSON.stringify(credentials), { encoding: 'utf8' });
  }

  _getAllCredentials() {
    if (!existsSync(dirPath)) {
      mkdirSync(dirPath);
      this._updateCredentialsFile({});
    }
    const data = readFileSync(filePath, { encoding: 'utf8' });
    return JSON.parse(data);
  }

  getToken(mcApiUrl) {
    const allCredentials = this._getAllCredentials();
    if (!this.isSessionValid()) {
      return null;
    }
    return allCredentials[mcApiUrl].sessionToken;
  }

  setToken(cookieData, mcApiUrl) {
    const allCredentials = this._getAllCredentials();
    const parsedCookie = cookie.parse(cookieData);
    allCredentials[mcApiUrl] = {
      sessionToken: parsedCookie.mcAccessToken,
      expiresAt: parsedCookie.Expires,
    };
    this._updateCredentialsFile(allCredentials);
  }

  isSessionValid(mcApiUrl) {
    const allCredentials = this._getAllCredentials();
    const credential = allCredentials[mcApiUrl];
    if (!credential) {
      return false;
    }
    const now = new Date();
    return now < new Date(allCredentials[mcApiUrl].expiresAt);
  }
}

module.exports = CredentialsStorage;
