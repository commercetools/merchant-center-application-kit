const mock = require('mock-fs');
const CredentialsStorage = require('./credentials-storage');
const homedir = require('os').homedir();

const fullCredentialsPath = `${homedir}/.commercetools/mc-credentials.json`;

const getExpiryDate = (hours) => {
  const date = new Date();
  const expireTime = date.getTime() + 1000 * hours;
  date.setTime(expireTime);
  return date.toUTCString();
};

const credentialsStorage = new CredentialsStorage();

afterEach(() => {
  mock.restore();
});

const mcApiUrl = 'https://mc-api.europe-west1.gcp.commercetools.com';

describe('When cookie is not expired', () => {
  beforeEach(() => {
    mock({
      [fullCredentialsPath]: JSON.stringify({
        [mcApiUrl]: {
          sessionToken: 'hello-world',
          expiresAt: getExpiryDate(36000),
        },
      }),
    });
  });

  it('should return token', () => {
    expect(credentialsStorage.getToken(mcApiUrl)).toBe('hello-world');
  });

  it('should return true', () => {
    expect(credentialsStorage.isSessionValid(mcApiUrl)).toBe(true);
  });

  it('should return new token', () => {
    const newSessionData = {
      sessionToken: 'fizz-buzz',
      expiresAt: getExpiryDate(36000),
    };
    credentialsStorage.setToken(mcApiUrl, newSessionData);
    expect(credentialsStorage.getToken(mcApiUrl)).toBe('fizz-buzz');
  });
});

describe('When cookie is expired', () => {
  beforeEach(() => {
    mock({
      [fullCredentialsPath]: JSON.stringify({
        [mcApiUrl]: {
          sessionToken: 'hello-world',
          expiresAt: getExpiryDate(-36000),
        },
      }),
    });
  });

  it('should not return token', () => {
    expect(credentialsStorage.getToken(mcApiUrl)).toBe(null);
  });

  it('should return false', () => {
    expect(credentialsStorage.isSessionValid(mcApiUrl)).toBe(false);
  });
});

describe('When credentials folder is not present', () => {
  beforeEach(() => {
    mock({});
  });

  it('should not return token', () => {
    expect(credentialsStorage.getToken(mcApiUrl)).toBe(null);
  });

  it('should return false', () => {
    expect(credentialsStorage.isSessionValid(mcApiUrl)).toBe(false);
  });

  it('should return new token', () => {
    const newSessionData = {
      sessionToken: 'fizz-buzz',
      expiresAt: getExpiryDate(36000),
    };
    credentialsStorage.setToken(mcApiUrl, newSessionData);
    expect(credentialsStorage.getToken(mcApiUrl)).toBe('fizz-buzz');
  });
});
