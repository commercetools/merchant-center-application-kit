const mock = require('mock-fs');
const CredentialsStorage = require('./credentials-storage');
const homedir = require('os').homedir();

const fullCredentialsPath = `${homedir}/.mcscriptsrc/credentials.json`;
const domain = 'europe-west1.gcp.commercetools.com';

const getExpiryDate = (hours) => {
  const date = new Date();
  const expireTime = date.getTime() + 1000 * hours;
  date.setTime(expireTime);
  return date.toUTCString();
};

const credentialsStorage = new CredentialsStorage('gcp-eu');

afterEach(() => {
  mock.restore();
});

describe('When cookie is not expired', () => {
  beforeEach(() => {
    mock({
      [fullCredentialsPath]: JSON.stringify({
        'gcp-eu': `mcAccessToken=hello-world; Domain=${domain}; Path=/; Expires=${getExpiryDate(
          36000
        )}; HttpOnly; Secure`,
      }),
    });
  });

  it('should return token', () => {
    expect(credentialsStorage.getToken()).toBe('hello-world');
  });

  it('should return true', () => {
    expect(credentialsStorage.isSessionValid()).toBe(true);
  });

  it('should return new token', () => {
    const newCookie = `mcAccessToken=fizz-buzz; Domain=${domain}; Path=/; Expires=${getExpiryDate(
      36000
    )}; HttpOnly; Secure`;
    credentialsStorage.update(newCookie);
    expect(credentialsStorage.getToken()).toBe('fizz-buzz');
  });
});

describe('When cookie is expired', () => {
  beforeEach(() => {
    mock({
      [fullCredentialsPath]: JSON.stringify({
        'gcp-eu': `mcAccessToken=hello-world; Domain=${domain}; Path=/; Expires=${getExpiryDate(
          -3600
        )}; HttpOnly; Secure`,
      }),
    });
  });

  it('should not return token', () => {
    expect(credentialsStorage.getToken()).toBe(null);
  });

  it('should return false', () => {
    expect(credentialsStorage.isSessionValid()).toBe(false);
  });
});

describe('When credentials folder is not present', () => {
  beforeEach(() => {
    mock({});
  });

  it('should not return token', () => {
    expect(credentialsStorage.getToken()).toBe(null);
  });

  it('should return false', () => {
    expect(credentialsStorage.isSessionValid()).toBe(false);
  });

  it('should return new token', () => {
    const newCookie = `mcAccessToken=fizz-buzz; Domain=${domain}; Path=/; Expires=${getExpiryDate(
      36000
    )}; HttpOnly; Secure`;
    credentialsStorage.update(newCookie);
    expect(credentialsStorage.getToken()).toBe('fizz-buzz');
  });
});
