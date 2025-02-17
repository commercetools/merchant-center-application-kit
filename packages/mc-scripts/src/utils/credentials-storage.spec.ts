import os from 'node:os';
import { mocked } from 'jest-mock';
import mock from 'mock-fs';
import CredentialsStorage from './credentials-storage';

jest.mock('node:os');

afterEach(() => {
  mock.restore();
  mocked(os.homedir).mockClear();
});

const testHomedir = '/me/home';
const testCredentialsFilePath = `${testHomedir}/.commercetools/mc-credentials.json`;
const mcApiUrl = 'https://mc-api.europe-west1.gcp.commercetools.com';

describe('when session is valid', () => {
  beforeEach(() => {
    mock({
      [testCredentialsFilePath]: JSON.stringify({
        [mcApiUrl]: {
          token: 'hello-world',
          expiresAt: Math.floor(Date.now() / 1000) + 60 * 60 * 36,
        },
      }),
    });
    mocked(os.homedir).mockImplementation(() => testHomedir);
  });

  it('should load credentials and update token', () => {
    const credentialsStorage = new CredentialsStorage();
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
  beforeEach(() => {
    mock({
      [testCredentialsFilePath]: JSON.stringify({
        [mcApiUrl]: {
          token: 'hello-world',
          expiresAt: Math.floor(Date.now() / 1000) - 1,
        },
      }),
    });
  });

  it('should not load credentials', () => {
    const credentialsStorage = new CredentialsStorage();
    expect(credentialsStorage.isSessionValid(mcApiUrl)).toBe(false);
    expect(credentialsStorage.getToken(mcApiUrl)).toBe(null);
  });
});

describe('when credentials file is missing', () => {
  beforeEach(() => {
    mock({});
  });

  it('should not load credentials and update token', () => {
    const credentialsStorage = new CredentialsStorage();
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
