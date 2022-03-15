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

describe('when session is valid', () => {
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

  it('should load credentials', () => {
    expect(credentialsStorage.getToken(mcApiUrl)).toBe('hello-world');
    expect(credentialsStorage.isSessionValid(mcApiUrl)).toBe(true);
  });

  it('should update token', () => {
    const newSessionData = {
      sessionToken: 'fizz-buzz',
      expiresAt: getExpiryDate(36000),
    };
    credentialsStorage.setToken(mcApiUrl, newSessionData);
    expect(credentialsStorage.getToken(mcApiUrl)).toBe('fizz-buzz');
  });
});

describe('when session is expired', () => {
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

  it('should not load credentials', () => {
    expect(credentialsStorage.isSessionValid(mcApiUrl)).toBe(false);
    expect(credentialsStorage.getToken(mcApiUrl)).toBe(null);
  });
});

describe('when credentials file is missing', () => {
  beforeEach(() => {
    mock({});
  });

  it('should not load credentials', () => {
    expect(credentialsStorage.getToken(mcApiUrl)).toBe(null);
    expect(credentialsStorage.isSessionValid(mcApiUrl)).toBe(false);
  });

  it('should update token', () => {
    const newSessionData = {
      sessionToken: 'fizz-buzz',
      expiresAt: getExpiryDate(36000),
    };
    credentialsStorage.setToken(mcApiUrl, newSessionData);
    expect(credentialsStorage.getToken(mcApiUrl)).toBe('fizz-buzz');
  });
});
