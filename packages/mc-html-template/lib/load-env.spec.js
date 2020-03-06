const fs = require('fs');
const loadEnv = require('./load-env');

jest.mock('fs');

const minimalEnvConfig = {
  applicationName: 'testa-application',
  frontendHost: 'test-frontend-host',
  mcApiUrl: 'test-mc-api-url',
  location: 'test-location',
  env: 'test-env',
  cdnUrl: 'test-cdn-url',
};

const fsMocks = {
  withMissingKey: JSON.stringify({
    ...minimalEnvConfig,
    cdnUrl: undefined,
  }),
  withoutMissingKey: JSON.stringify(minimalEnvConfig),
  withPlaceholders: JSON.stringify({
    ...minimalEnvConfig,
    apiUrl: 'env:API_URL',
  }),
};

describe('with missing required environment config values', () => {
  it('should throw an error and not return the parsed config', () => {
    fs.readFileSync.mockReturnValue(fsMocks.withMissingKey);

    expect(() => loadEnv(undefined, { disableCache: true })).toThrow(
      /Missing 'cdnUrl' required configuration field/
    );
  });
});

describe('with all required environment config values', () => {
  it('should return the parsed config and all values', () => {
    fs.readFileSync.mockReturnValue(fsMocks.withoutMissingKey);

    expect(loadEnv(undefined, { disableCache: true })).toEqual(
      expect.objectContaining(minimalEnvConfig)
    );
  });
  it('should return default values', () => {
    fs.readFileSync.mockReturnValue(fsMocks.withoutMissingKey);

    expect(loadEnv(undefined, { disableCache: true })).toEqual(
      expect.objectContaining({ servedByProxy: false })
    );
  });
});

describe('with environment variable placeholders', () => {
  describe('when all placeholders are defined on environment', () => {
    it('should return the parsed config and all values without placeholders', () => {
      process.env.API_URL = 'test-api-url';

      fs.readFileSync.mockReturnValue(fsMocks.withPlaceholders);

      expect(loadEnv(undefined, { disableCache: true })).toEqual(
        expect.objectContaining(minimalEnvConfig)
      );
    });
    it('should return the parsed config and all values with placeholders', () => {
      process.env.API_URL = 'test-api-url';

      fs.readFileSync.mockReturnValue(fsMocks.withPlaceholders);

      expect(loadEnv(undefined, { disableCache: true })).toEqual(
        expect.objectContaining({
          apiUrl: process.env.API_URL,
        })
      );
    });
  });
  describe('when not all placeholders are defined on environment', () => {
    it('should throw an error and not return the parsed config', () => {
      // NOTE: Setting to undefined will make it appear as a string.
      delete process.env.API_URL;

      fs.readFileSync.mockReturnValue(fsMocks.withPlaceholders);

      expect(() => loadEnv(undefined, { disableCache: true })).toThrow(
        /Missing 'API_URL' specified in config as 'env:API_URL/
      );
    });
  });
});
