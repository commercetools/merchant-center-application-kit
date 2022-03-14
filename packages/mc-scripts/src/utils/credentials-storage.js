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
    const parsedCookie = cookie.parse(allCredentials[mcApiUrl]);
    return parsedCookie['mcAccessToken'];
  }

  setToken(cookieData, mcApiUrl) {
    const allCredentials = this._getAllCredentials();
    allCredentials[mcApiUrl] = cookieData;
    this._updateCredentialsFile(allCredentials);
  }

  isSessionValid(mcApiUrl) {
    const allCredentials = this._getAllCredentials();
    const credential = allCredentials[mcApiUrl];
    if (!credential) {
      return false;
    }
    const now = new Date();
    const parsedCookie = cookie.parse(credential);
    return now < new Date(parsedCookie.Expires);
  }
}

module.exports = CredentialsStorage;
