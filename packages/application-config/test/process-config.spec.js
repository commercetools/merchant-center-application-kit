import { processConfig } from '../src';
import loadConfig from '../src/load-config';
const fixtureConfigSimple = require('./fixtures/config-simple.json');
const fixtureConfigFull = require('./fixtures/config-full.json');
const fixtureConfigEnvVariables = require('./fixtures/config-env-variables.json');

jest.mock('../src/load-config');

const createTestOptions = (options) => ({
  disableCache: true,
  processEnv: {
    NODE_ENV: 'test',
  },
  ...options,
});

describe('processing a simple config', () => {
  beforeEach(() => {
    loadConfig.mockClear();
    loadConfig.mockReturnValue(fixtureConfigSimple);
  });
  it('should process the config and prepare the application environment and headers', async () => {
    const result = await processConfig(createTestOptions());
    expect(result).toEqual({
      env: {
        applicationId: undefined,
        applicationName: 'avengers-app',
        cdnUrl: 'http://localhost:3001',
        env: 'test',
        frontendHost: 'localhost:3001',
        location: 'gcp-eu',
        mcApiUrl: 'https://mc-api.europe-west1.gcp.commercetools.com',
        revision: '',
        servedByProxy: false,
      },
      headers: {
        csp: {
          'connect-src': ['mc-api.europe-west1.gcp.commercetools.com'],
          'script-src': [],
          'style-src': [],
        },
      },
    });
  });
  describe('with NODE_ENV=production', () => {
    it('should process the config as if for production', async () => {
      const result = await processConfig(
        createTestOptions({
          processEnv: {
            NODE_ENV: 'production',
          },
        })
      );
      expect(result).toEqual({
        env: {
          applicationId: undefined,
          applicationName: 'avengers-app',
          cdnUrl: 'https://avengers.app',
          env: 'production',
          frontendHost: 'avengers.app',
          location: 'gcp-eu',
          mcApiUrl: 'https://mc-api.europe-west1.gcp.commercetools.com',
          revision: '',
          servedByProxy: true,
        },
        headers: {
          csp: {
            'connect-src': [
              'mc-api.europe-west1.gcp.commercetools.com',
              'avengers.app',
            ],
            'script-src': ['avengers.app'],
            'style-src': ['avengers.app'],
          },
        },
      });
    });
  });
  describe('with MC_APP_ENV=development and NODE_ENV=production', () => {
    it('should process the config where the MC_APP_ENV variable takes precedence over NODE_ENV', async () => {
      const result = await processConfig(
        createTestOptions({
          processEnv: {
            NODE_ENV: 'production',
            MC_APP_ENV: 'development',
          },
        })
      );
      expect(result).toEqual({
        env: {
          applicationId: undefined,
          applicationName: 'avengers-app',
          cdnUrl: 'http://localhost:3001',
          env: 'development',
          frontendHost: 'localhost:3001',
          location: 'gcp-eu',
          mcApiUrl: 'https://mc-api.europe-west1.gcp.commercetools.com',
          revision: '',
          servedByProxy: false,
        },
        headers: {
          csp: {
            'connect-src': ['mc-api.europe-west1.gcp.commercetools.com'],
            'script-src': [],
            'style-src': [],
          },
        },
      });
    });
  });
});

describe('processing a full config', () => {
  beforeEach(() => {
    loadConfig.mockClear();
    loadConfig.mockReturnValue(fixtureConfigFull);
  });
  it('should process the config and prepare the application environment and headers', async () => {
    const result = await processConfig(createTestOptions());
    expect(result).toEqual({
      env: {
        applicationId: undefined,
        applicationName: 'avengers-app',
        cdnUrl: 'http://localhost:3001',
        env: 'test',
        frontendHost: 'localhost:3001',
        location: 'gcp-eu',
        mcApiUrl: 'https://mc-api.europe-west1.gcp.commercetools.com',
        numberOfMovies: 4,
        revision: '',
        servedByProxy: false,
      },
      headers: {
        csp: {
          'connect-src': [
            'cdn.avengers.app',
            'mc-api.europe-west1.gcp.commercetools.com',
          ],
          'script-src': ['cdn.avengers.app'],
          'style-src': ['cdn.avengers.app'],
        },
        featurePolicies: {
          microphone: 'none',
        },
      },
    });
  });
  describe('with NODE_ENV=production', () => {
    it('should process the config as if for production', async () => {
      const result = await processConfig(
        createTestOptions({
          processEnv: {
            NODE_ENV: 'production',
          },
        })
      );
      expect(result).toEqual({
        env: {
          applicationId: undefined,
          applicationName: 'avengers-app',
          cdnUrl: 'https://cdn.avengers.app',
          env: 'production',
          frontendHost: 'avengers.app',
          location: 'gcp-eu',
          mcApiUrl: 'https://mc-api.europe-west1.gcp.commercetools.com',
          numberOfMovies: 4,
          revision: '',
          servedByProxy: true,
        },
        headers: {
          csp: {
            'connect-src': [
              'cdn.avengers.app',
              'mc-api.europe-west1.gcp.commercetools.com',
              'avengers.app',
            ],
            'script-src': ['cdn.avengers.app', 'avengers.app'],
            'style-src': ['cdn.avengers.app', 'avengers.app'],
          },
          featurePolicies: {
            microphone: 'none',
          },
        },
      });
    });
  });
  describe('with MC_APP_ENV=development and NODE_ENV=production', () => {
    it('should process the config where the MC_APP_ENV variable takes precedence over NODE_ENV', async () => {
      const result = await processConfig(
        createTestOptions({
          processEnv: {
            NODE_ENV: 'production',
            MC_APP_ENV: 'development',
          },
        })
      );
      expect(result).toEqual({
        env: {
          applicationId: undefined,
          applicationName: 'avengers-app',
          cdnUrl: 'http://localhost:3001',
          env: 'development',
          frontendHost: 'localhost:3001',
          location: 'gcp-eu',
          mcApiUrl: 'https://mc-api.europe-west1.gcp.commercetools.com',
          numberOfMovies: 4,
          revision: '',
          servedByProxy: false,
        },
        headers: {
          csp: {
            'connect-src': [
              'cdn.avengers.app',
              'mc-api.europe-west1.gcp.commercetools.com',
            ],
            'script-src': ['cdn.avengers.app'],
            'style-src': ['cdn.avengers.app'],
          },
          featurePolicies: {
            microphone: 'none',
          },
        },
      });
    });
  });
});

describe('processing a config with environment variable placeholders', () => {
  beforeEach(() => {
    loadConfig.mockClear();
    loadConfig.mockReturnValue(fixtureConfigEnvVariables);
  });
  it('should process the config and prepare the application environment and headers', async () => {
    const result = await processConfig(
      createTestOptions({
        processEnv: {
          APP_URL: 'https://avengers.app',
          CLOUD_IDENTIFIER: 'gcp-eu',
          NODE_ENV: 'test',
        },
      })
    );
    expect(result).toEqual({
      env: {
        applicationId: undefined,
        applicationName: 'avengers-app',
        cdnUrl: 'http://localhost:3001',
        env: 'test',
        frontendHost: 'localhost:3001',
        location: 'gcp-eu',
        mcApiUrl: 'https://mc-api.europe-west1.gcp.commercetools.com',
        revision: '',
        servedByProxy: false,
      },
      headers: {
        csp: {
          'connect-src': ['mc-api.europe-west1.gcp.commercetools.com'],
          'script-src': [],
          'style-src': [],
        },
      },
    });
  });
  describe('with NODE_ENV=production', () => {
    it('should process the config as if for production', async () => {
      const result = await processConfig(
        createTestOptions({
          processEnv: {
            APP_URL: 'https://avengers.app',
            CLOUD_IDENTIFIER: 'gcp-eu',
            NODE_ENV: 'production',
          },
        })
      );
      expect(result).toEqual({
        env: {
          applicationId: undefined,
          applicationName: 'avengers-app',
          cdnUrl: 'https://avengers.app',
          env: 'production',
          frontendHost: 'avengers.app',
          location: 'gcp-eu',
          mcApiUrl: 'https://mc-api.europe-west1.gcp.commercetools.com',
          revision: '',
          servedByProxy: true,
        },
        headers: {
          csp: {
            'connect-src': [
              'mc-api.europe-west1.gcp.commercetools.com',
              'avengers.app',
            ],
            'script-src': ['avengers.app'],
            'style-src': ['avengers.app'],
          },
        },
      });
    });
  });
  describe('with MC_APP_ENV=development and NODE_ENV=production', () => {
    it('should process the config where the MC_APP_ENV variable takes precedence over NODE_ENV', async () => {
      const result = await processConfig(
        createTestOptions({
          processEnv: {
            APP_URL: 'https://avengers.app',
            CLOUD_IDENTIFIER: 'gcp-eu',
            NODE_ENV: 'production',
            MC_APP_ENV: 'development',
          },
        })
      );
      expect(result).toEqual({
        env: {
          applicationId: undefined,
          applicationName: 'avengers-app',
          cdnUrl: 'http://localhost:3001',
          env: 'development',
          frontendHost: 'localhost:3001',
          location: 'gcp-eu',
          mcApiUrl: 'https://mc-api.europe-west1.gcp.commercetools.com',
          revision: '',
          servedByProxy: false,
        },
        headers: {
          csp: {
            'connect-src': ['mc-api.europe-west1.gcp.commercetools.com'],
            'script-src': [],
            'style-src': [],
          },
        },
      });
    });
  });
});

describe('when app URL is malformed', () => {
  beforeEach(() => {
    loadConfig.mockClear();
    loadConfig.mockReturnValue({
      ...fixtureConfigSimple,
      env: {
        production: {
          url: 'wrong url',
        },
      },
    });
  });
  it('should throw', () =>
    expect(
      processConfig(
        createTestOptions({
          processEnv: {
            NODE_ENV: 'production',
          },
        })
      )
    ).rejects.toEqual(
      expect.objectContaining({
        message: expect.stringContaining(
          'Invalid application URL: "wrong url"'
        ),
      })
    ));
});
describe('when CDN URL is malformed', () => {
  beforeEach(() => {
    loadConfig.mockClear();
    loadConfig.mockReturnValue({
      ...fixtureConfigSimple,
      env: {
        production: {
          url: 'https://avengers.app',
          cdnUrl: 'wrong url',
        },
      },
    });
  });
  it('should throw', () =>
    expect(
      processConfig(
        createTestOptions({
          processEnv: {
            NODE_ENV: 'production',
          },
        })
      )
    ).rejects.toEqual(
      expect.objectContaining({
        message: expect.stringContaining(
          'Invalid application CDN URL: "wrong url"'
        ),
      })
    ));
});
describe('when MC API URL is malformed', () => {
  beforeEach(() => {
    loadConfig.mockClear();
    loadConfig.mockReturnValue({
      ...fixtureConfigSimple,
      mcApiUrl: 'wrong url',
    });
  });
  it('should throw', () =>
    expect(processConfig(createTestOptions())).rejects.toEqual(
      expect.objectContaining({
        message: expect.stringContaining('Invalid MC API URL: "wrong url"'),
      })
    ));
});
