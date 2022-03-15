const mock = require('mock-fs');
const CredentialsStorage = require('./credentials-storage');

const getExpiryDate = (hours) => {
  const date = new Date();
  const expireTime = date.getTime() + 1000 * hours;
  date.setTime(expireTime);
  return date.toUTCString();
};

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
          sessionToken: 'hello-world',
          expiresAt: getExpiryDate(36000),
        },
      }),
    });
    credentialsStorage = new CredentialsStorage();
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
  let credentialsStorage;
  beforeEach(() => {
    mock({
      [CredentialsStorage.location]: JSON.stringify({
        [mcApiUrl]: {
          sessionToken: 'hello-world',
          expiresAt: getExpiryDate(-36000),
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
