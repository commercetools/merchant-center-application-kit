const { existsSync, writeFileSync, readFileSync, mkdirSync } = require('fs');
const cookie = require('cookie');
const homedir = require('os').homedir();

const dirPath = `${homedir}/.mcscriptsrc`;
const filename = 'credentials.json';
const filePath = `${dirPath}/${filename}`;

class CredentialsStorage {
  constructor(cloudIdentifier) {
    this.cloudIdentifier = cloudIdentifier;
  }

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

  get() {
    const allCredentials = this._getAllCredentials();
    return allCredentials[this.cloudIdentifier];
  }

  update(cookieData) {
    const allCredentials = this._getAllCredentials();
    allCredentials[this.cloudIdentifier] = cookieData;
    this._updateCredentialsFile(allCredentials);
  }

  isSessionValid() {
    const allCredentials = this._getAllCredentials();
    const credential = allCredentials[this.cloudIdentifier];
    if (!credential) {
      return false;
    }
    const now = new Date();
    const parsedCookie = cookie.parse(credential);
    return now < new Date(parsedCookie.Expires);
  }
}

module.exports = CredentialsStorage;
