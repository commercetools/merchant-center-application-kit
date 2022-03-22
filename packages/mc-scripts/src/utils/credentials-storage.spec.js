const mock = require('mock-fs');
const CredentialsStorage = require('./credentials-storage');

afterEach(() => {
  mock.restore();
});

const mcApiUrl = 'https://mc-api.europe-west1.gcp.commercetools.com';

describe('when session is valid', () => {
  let credentialsStorage;
  beforeEach(() => {
    mock({
      [CredentialsStorage.location]: JSON.stringify({
        [mcApiUrl]: {
          token: 'hello-world',
          expiresAt: Math.floor(Date.now() / 1000) + 60 * 60 * 36,
        },
      }),
    });
    credentialsStorage = new CredentialsStorage();
  });

  it('should load credentials and update token', () => {
    expect(credentialsStorage.getToken(mcApiUrl)).toBe('hello-world');
    expect(credentialsStorage.isSessionValid(mcApiUrl)).toBe(true);

    const newSessionData = {
      token: 'fizz-buzz',
      expiresAt: Math.floor(Date.now() / 1000) + 60 * 60 * 36,
    };
    credentialsStorage.setToken(mcApiUrl, newSessionData);
    expect(credentialsStorage.getToken(mcApiUrl)).toBe('fizz-buzz');
  });
});

describe('when session is expired', () => {
  let credentialsStorage;
  beforeEach(() => {
    mock({
      [CredentialsStorage.location]: JSON.stringify({
        [mcApiUrl]: {
          token: 'hello-world',
          expiresAt: Math.floor(Date.now() / 1000) - 1,
        },
      }),
    });
    credentialsStorage = new CredentialsStorage();
  });

  it('should not load credentials', () => {
    expect(credentialsStorage.isSessionValid(mcApiUrl)).toBe(false);
    expect(credentialsStorage.getToken(mcApiUrl)).toBe(null);
  });
});

describe('when credentials file is missing', () => {
  let credentialsStorage;
  beforeEach(() => {
    mock({});
    credentialsStorage = new CredentialsStorage();
  });

  it('should not load credentials and update token', () => {
    expect(credentialsStorage.getToken(mcApiUrl)).toBe(null);
    expect(credentialsStorage.isSessionValid(mcApiUrl)).toBe(false);

    const newSessionData = {
      token: 'fizz-buzz',
      expiresAt: Math.floor(Date.now() / 1000) + 60 * 60 * 36,
    };
    credentialsStorage.setToken(mcApiUrl, newSessionData);
    expect(credentialsStorage.getToken(mcApiUrl)).toBe('fizz-buzz');
  });
});
