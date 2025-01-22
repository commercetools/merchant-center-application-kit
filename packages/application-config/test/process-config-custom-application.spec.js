import path from 'path';
import { processConfig } from '../src';
import loadConfig from '../src/load-config';
import fixtureConfigAccountLinks from './fixtures/custom-applications/config-account-links.json';
import fixtureConfigEnvVariables from './fixtures/custom-applications/config-env-variables.json';
import fixtureConfigFilePathVariables from './fixtures/custom-applications/config-file-path-variables.json';
import fixtureConfigFull from './fixtures/custom-applications/config-full.json';
import fixtureConfigIntlVariables from './fixtures/custom-applications/config-intl-variables.json';
import fixtureConfigOidcWithTeamId from './fixtures/custom-applications/config-oidc-with-team-id.json';
import fixtureConfigOidc from './fixtures/custom-applications/config-oidc.json';
import fixtureConfigSimple from './fixtures/custom-applications/config-simple.json';

jest.mock('../src/load-config');

const createTestOptions = (options) => ({
  disableCache: true,
  processEnv: {
    NODE_ENV: 'test',
  },
  applicationPath: path.join(__dirname, 'fixtures/custom-applications'),
  ...options,
});

beforeEach(() => {
  loadConfig.mockClear();
});

describe('processing a simple config', () => {
  beforeEach(() => {
    loadConfig.mockReturnValue(
      Promise.resolve({
        filepath: '/custom-application-config.js',
        config: fixtureConfigSimple,
      })
    );
  });
  it('should process the config and prepare the application environment and headers', async () => {
    const result = await processConfig(createTestOptions());
    expect(result).toEqual({
      data: {
        id: 'app-id-123',
        name: 'avengers-app',
        description: undefined,
        entryPointUriPath: 'avengers',
        url: 'https://avengers.app',
        permissions: [
          {
            name: 'viewAvengers',
            oAuthScopes: ['view_products'],
          },
          {
            name: 'manageAvengers',
            oAuthScopes: [],
          },
        ],
        icon: '<svg><path fill="#000000" /></svg>',
        mainMenuLink: {
          defaultLabel: 'Avengers',
          labelAllLocales: [],
          permissions: [],
        },
        submenuLinks: [],
      },
      env: {
        applicationId: '__local:avengers',
        applicationIdentifier: '__local:avengers',
        applicationName: 'avengers-app',
        entryPointUriPath: 'avengers',
        cdnUrl: 'http://localhost:3001/',
        env: 'test',
        frontendHost: 'localhost:3001',
        location: 'gcp-eu',
        mcApiUrl: 'https://mc-api.europe-west1.gcp.commercetools.com',
        revision: '',
        servedByProxy: false,
        __DEVELOPMENT__: {
          accountLinks: undefined,
          menuLinks: {
            defaultLabel: 'Avengers',
            icon: '<svg><path fill="#000000" /></svg>',
            labelAllLocales: [],
            permissions: [],
            submenuLinks: [],
          },
          oidc: {
            authorizeUrl:
              'https://mc.europe-west1.gcp.commercetools.com/login/authorize',
            initialProjectKey: 'test',
            oAuthScopes: {
              view: ['view_products'],
            },
          },
        },
      },
      headers: {
        csp: {
          'connect-src': ['https://mc-api.europe-west1.gcp.commercetools.com'],
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
        data: {
          id: 'app-id-123',
          name: 'avengers-app',
          description: undefined,
          entryPointUriPath: 'avengers',
          url: 'https://avengers.app',
          permissions: [
            {
              name: 'viewAvengers',
              oAuthScopes: ['view_products'],
            },
            {
              name: 'manageAvengers',
              oAuthScopes: [],
            },
          ],
          icon: '<svg><path fill="#000000" /></svg>',
          mainMenuLink: {
            defaultLabel: 'Avengers',
            labelAllLocales: [],
            permissions: [],
          },
          submenuLinks: [],
        },
        env: {
          applicationId: 'app-id-123:avengers',
          applicationIdentifier: 'app-id-123:avengers',
          applicationName: 'avengers-app',
          entryPointUriPath: 'avengers',
          cdnUrl: 'https://avengers.app/',
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
              'https://mc-api.europe-west1.gcp.commercetools.com',
              'https://avengers.app/',
            ],
            'script-src': ['https://avengers.app/'],
            'style-src': ['https://avengers.app/'],
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
        data: {
          id: 'app-id-123',
          name: 'avengers-app',
          description: undefined,
          entryPointUriPath: 'avengers',
          url: 'https://avengers.app',
          permissions: [
            {
              name: 'viewAvengers',
              oAuthScopes: ['view_products'],
            },
            {
              name: 'manageAvengers',
              oAuthScopes: [],
            },
          ],
          icon: '<svg><path fill="#000000" /></svg>',
          mainMenuLink: {
            defaultLabel: 'Avengers',
            labelAllLocales: [],
            permissions: [],
          },
          submenuLinks: [],
        },
        env: {
          applicationId: '__local:avengers',
          applicationIdentifier: '__local:avengers',
          applicationName: 'avengers-app',
          entryPointUriPath: 'avengers',
          cdnUrl: 'http://localhost:3001/',
          env: 'development',
          frontendHost: 'localhost:3001',
          location: 'gcp-eu',
          mcApiUrl: 'https://mc-api.europe-west1.gcp.commercetools.com',
          revision: '',
          servedByProxy: false,
          __DEVELOPMENT__: {
            accountLinks: undefined,
            menuLinks: {
              defaultLabel: 'Avengers',
              icon: '<svg><path fill="#000000" /></svg>',
              labelAllLocales: [],
              permissions: [],
              submenuLinks: [],
            },
            oidc: {
              authorizeUrl:
                'https://mc.europe-west1.gcp.commercetools.com/login/authorize',
              initialProjectKey: 'test',
              oAuthScopes: {
                view: ['view_products'],
              },
            },
          },
        },
        headers: {
          csp: {
            'connect-src': [
              'https://mc-api.europe-west1.gcp.commercetools.com',
            ],
            'script-src': [],
            'style-src': [],
          },
        },
      });
    });
  });
  describe('with MC_APP_ENV=staging and NODE_ENV=production', () => {
    it('should process the config in production mode', async () => {
      const result = await processConfig(
        createTestOptions({
          processEnv: {
            NODE_ENV: 'production',
            MC_APP_ENV: 'staging',
          },
        })
      );
      expect(result).toEqual({
        data: {
          id: 'app-id-123',
          name: 'avengers-app',
          description: undefined,
          entryPointUriPath: 'avengers',
          url: 'https://avengers.app',
          permissions: [
            {
              name: 'viewAvengers',
              oAuthScopes: ['view_products'],
            },
            {
              name: 'manageAvengers',
              oAuthScopes: [],
            },
          ],
          icon: '<svg><path fill="#000000" /></svg>',
          mainMenuLink: {
            defaultLabel: 'Avengers',
            labelAllLocales: [],
            permissions: [],
          },
          submenuLinks: [],
        },
        env: {
          applicationId: 'app-id-123:avengers',
          applicationIdentifier: 'app-id-123:avengers',
          applicationName: 'avengers-app',
          entryPointUriPath: 'avengers',
          cdnUrl: 'https://avengers.app/',
          env: 'staging',
          frontendHost: 'avengers.app',
          location: 'gcp-eu',
          mcApiUrl: 'https://mc-api.europe-west1.gcp.commercetools.com',
          revision: '',
          servedByProxy: true,
        },
        headers: {
          csp: {
            'connect-src': [
              'https://mc-api.europe-west1.gcp.commercetools.com',
              'https://avengers.app/',
            ],
            'script-src': ['https://avengers.app/'],
            'style-src': ['https://avengers.app/'],
          },
        },
      });
    });
  });
});

describe('processing a full config', () => {
  beforeEach(() => {
    loadConfig.mockReturnValue(
      Promise.resolve({
        filepath: '/custom-application-config.js',
        config: fixtureConfigFull,
      })
    );
  });
  it('should process the config and prepare the application environment and headers', async () => {
    const result = await processConfig(createTestOptions());
    expect(result).toEqual({
      data: {
        id: 'app-id-123',
        name: 'avengers-app',
        description: undefined,
        entryPointUriPath: 'avengers',
        url: 'https://avengers.app',
        permissions: [
          { name: 'viewAvengers', oAuthScopes: ['view_products'] },
          { name: 'manageAvengers', oAuthScopes: [] },
          { name: 'viewAvengersMovies', oAuthScopes: ['view_products'] },
          { name: 'manageAvengersMovies', oAuthScopes: [] },
          { name: 'viewAvengersMerch', oAuthScopes: ['view_channels'] },
          { name: 'manageAvengersMerch', oAuthScopes: ['manage_channels'] },
        ],
        icon: '<svg><path fill="#000000" /></svg>',
        mainMenuLink: {
          defaultLabel: 'Avengers',
          labelAllLocales: [],
          permissions: [],
        },
        submenuLinks: [],
      },
      env: {
        applicationId: '__local:avengers',
        applicationIdentifier: '__local:avengers',
        applicationName: 'avengers-app',
        entryPointUriPath: 'avengers',
        cdnUrl: 'http://localhost:3001/',
        env: 'test',
        frontendHost: 'localhost:3001',
        location: 'gcp-eu',
        mcApiUrl: 'https://mc-api.europe-west1.gcp.commercetools.com',
        numberOfMovies: 4,
        revision: '',
        servedByProxy: false,
        __DEVELOPMENT__: {
          accountLinks: undefined,
          menuLinks: {
            defaultLabel: 'Avengers',
            icon: '<svg><path fill="#000000" /></svg>',
            labelAllLocales: [],
            permissions: [],
            submenuLinks: [],
          },
          oidc: {
            authorizeUrl:
              'https://mc.europe-west1.gcp.commercetools.com/login/authorize',
            initialProjectKey: 'test',
            oAuthScopes: {
              view: ['view_products'],
            },
            additionalOAuthScopes: [
              {
                name: 'movies',
                view: ['view_products'],
              },
              {
                name: 'merch',
                view: ['view_channels'],
                manage: ['manage_channels'],
              },
            ],
          },
        },
      },
      headers: {
        csp: {
          'connect-src': [
            'https://track.avengers.app',
            'https://mc-api.europe-west1.gcp.commercetools.com',
          ],
          'script-src': ['https://track.avengers.app'],
          'style-src': [],
        },
        permissionsPolicies: {
          microphone: '*',
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
        data: {
          id: 'app-id-123',
          name: 'avengers-app',
          description: undefined,
          entryPointUriPath: 'avengers',
          url: 'https://avengers.app',
          permissions: [
            { name: 'viewAvengers', oAuthScopes: ['view_products'] },
            { name: 'manageAvengers', oAuthScopes: [] },
            { name: 'viewAvengersMovies', oAuthScopes: ['view_products'] },
            { name: 'manageAvengersMovies', oAuthScopes: [] },
            { name: 'viewAvengersMerch', oAuthScopes: ['view_channels'] },
            { name: 'manageAvengersMerch', oAuthScopes: ['manage_channels'] },
          ],
          icon: '<svg><path fill="#000000" /></svg>',
          mainMenuLink: {
            defaultLabel: 'Avengers',
            labelAllLocales: [],
            permissions: [],
          },
          submenuLinks: [],
        },
        env: {
          applicationId: 'app-id-123:avengers',
          applicationIdentifier: 'app-id-123:avengers',
          applicationName: 'avengers-app',
          entryPointUriPath: 'avengers',
          cdnUrl: 'https://cdn.avengers.app/',
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
              'https://track.avengers.app',
              'https://mc-api.europe-west1.gcp.commercetools.com',
              'https://avengers.app/',
            ],
            'script-src': [
              'https://track.avengers.app',
              'https://avengers.app/',
              'https://cdn.avengers.app/',
            ],
            'style-src': ['https://avengers.app/', 'https://cdn.avengers.app/'],
          },
          permissionsPolicies: {
            microphone: '*',
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
        data: {
          id: 'app-id-123',
          name: 'avengers-app',
          description: undefined,
          entryPointUriPath: 'avengers',
          url: 'https://avengers.app',
          permissions: [
            { name: 'viewAvengers', oAuthScopes: ['view_products'] },
            { name: 'manageAvengers', oAuthScopes: [] },
            { name: 'viewAvengersMovies', oAuthScopes: ['view_products'] },
            { name: 'manageAvengersMovies', oAuthScopes: [] },
            { name: 'viewAvengersMerch', oAuthScopes: ['view_channels'] },
            { name: 'manageAvengersMerch', oAuthScopes: ['manage_channels'] },
          ],
          icon: '<svg><path fill="#000000" /></svg>',
          mainMenuLink: {
            defaultLabel: 'Avengers',
            labelAllLocales: [],
            permissions: [],
          },
          submenuLinks: [],
        },
        env: {
          applicationId: '__local:avengers',
          applicationIdentifier: '__local:avengers',
          applicationName: 'avengers-app',
          entryPointUriPath: 'avengers',
          cdnUrl: 'http://localhost:3001/',
          env: 'development',
          frontendHost: 'localhost:3001',
          location: 'gcp-eu',
          mcApiUrl: 'https://mc-api.europe-west1.gcp.commercetools.com',
          numberOfMovies: 4,
          revision: '',
          servedByProxy: false,
          __DEVELOPMENT__: {
            accountLinks: undefined,
            menuLinks: {
              defaultLabel: 'Avengers',
              icon: '<svg><path fill="#000000" /></svg>',
              labelAllLocales: [],
              permissions: [],
              submenuLinks: [],
            },
            oidc: {
              authorizeUrl:
                'https://mc.europe-west1.gcp.commercetools.com/login/authorize',
              initialProjectKey: 'test',
              oAuthScopes: {
                view: ['view_products'],
              },
              additionalOAuthScopes: [
                {
                  name: 'movies',
                  view: ['view_products'],
                },
                {
                  name: 'merch',
                  view: ['view_channels'],
                  manage: ['manage_channels'],
                },
              ],
            },
          },
        },
        headers: {
          csp: {
            'connect-src': [
              'https://track.avengers.app',
              'https://mc-api.europe-west1.gcp.commercetools.com',
            ],
            'script-src': ['https://track.avengers.app'],
            'style-src': [],
          },
          permissionsPolicies: {
            microphone: '*',
          },
        },
      });
    });
  });
  describe('with MC_APP_ENV=staging and NODE_ENV=production', () => {
    it('should process the config in production mode', async () => {
      const result = await processConfig(
        createTestOptions({
          processEnv: {
            NODE_ENV: 'production',
            MC_APP_ENV: 'staging',
          },
        })
      );
      expect(result).toEqual({
        data: {
          id: 'app-id-123',
          name: 'avengers-app',
          description: undefined,
          entryPointUriPath: 'avengers',
          url: 'https://avengers.app',
          permissions: [
            { name: 'viewAvengers', oAuthScopes: ['view_products'] },
            { name: 'manageAvengers', oAuthScopes: [] },
            { name: 'viewAvengersMovies', oAuthScopes: ['view_products'] },
            { name: 'manageAvengersMovies', oAuthScopes: [] },
            { name: 'viewAvengersMerch', oAuthScopes: ['view_channels'] },
            { name: 'manageAvengersMerch', oAuthScopes: ['manage_channels'] },
          ],
          icon: '<svg><path fill="#000000" /></svg>',
          mainMenuLink: {
            defaultLabel: 'Avengers',
            labelAllLocales: [],
            permissions: [],
          },
          submenuLinks: [],
        },
        env: {
          applicationId: 'app-id-123:avengers',
          applicationIdentifier: 'app-id-123:avengers',
          applicationName: 'avengers-app',
          entryPointUriPath: 'avengers',
          cdnUrl: 'https://cdn.avengers.app/',
          env: 'staging',
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
              'https://track.avengers.app',
              'https://mc-api.europe-west1.gcp.commercetools.com',
              'https://avengers.app/',
            ],
            'script-src': [
              'https://track.avengers.app',
              'https://avengers.app/',
              'https://cdn.avengers.app/',
            ],
            'style-src': ['https://avengers.app/', 'https://cdn.avengers.app/'],
          },
          permissionsPolicies: {
            microphone: '*',
          },
        },
      });
    });
  });
});

describe('processing a config with environment variable placeholders', () => {
  beforeEach(() => {
    loadConfig.mockReturnValue(
      Promise.resolve({
        filepath: '/custom-application-config.js',
        config: fixtureConfigEnvVariables,
      })
    );
  });
  it('should process the config and prepare the application environment and headers', async () => {
    const result = await processConfig(
      createTestOptions({
        processEnv: {
          ENTRY_POINT_URI_PATH: 'avengers',
          APP_URL: 'https://avengers.app',
          CLOUD_IDENTIFIER: 'gcp-eu',
          NODE_ENV: 'test',
          PROJECT_KEY: 'test',
        },
      })
    );
    expect(result).toEqual({
      data: {
        id: 'app-id-123',
        name: 'avengers-app',
        description: undefined,
        entryPointUriPath: 'avengers',
        url: 'https://avengers.app',
        permissions: [
          {
            name: 'viewAvengers',
            oAuthScopes: ['view_products'],
          },
          {
            name: 'manageAvengers',
            oAuthScopes: [],
          },
        ],
        icon: '<svg><path fill="#000000" /></svg>',
        mainMenuLink: {
          defaultLabel: 'Avengers',
          labelAllLocales: [],
          permissions: [],
        },
        submenuLinks: [],
      },
      env: {
        applicationId: '__local:avengers',
        applicationIdentifier: '__local:avengers',
        applicationName: 'avengers-app',
        entryPointUriPath: 'avengers',
        cdnUrl: 'http://localhost:3001/',
        env: 'test',
        frontendHost: 'localhost:3001',
        location: 'gcp-eu',
        mcApiUrl: 'https://mc-api.europe-west1.gcp.commercetools.com',
        revision: '',
        servedByProxy: false,
        __DEVELOPMENT__: {
          accountLinks: undefined,
          menuLinks: {
            defaultLabel: 'Avengers',
            icon: '<svg><path fill="#000000" /></svg>',
            labelAllLocales: [],
            permissions: [],
            submenuLinks: [],
          },
          oidc: {
            authorizeUrl:
              'https://mc.europe-west1.gcp.commercetools.com/login/authorize',
            initialProjectKey: 'test',
            oAuthScopes: {
              view: ['view_products'],
            },
          },
        },
      },
      headers: {
        csp: {
          'connect-src': ['https://mc-api.europe-west1.gcp.commercetools.com'],
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
            ENTRY_POINT_URI_PATH: 'avengers',
            APP_URL: 'https://avengers.app',
            CLOUD_IDENTIFIER: 'gcp-eu',
            NODE_ENV: 'production',
            PROJECT_KEY: 'test',
          },
        })
      );
      expect(result).toEqual({
        data: {
          id: 'app-id-123',
          name: 'avengers-app',
          description: undefined,
          entryPointUriPath: 'avengers',
          url: 'https://avengers.app',
          permissions: [
            {
              name: 'viewAvengers',
              oAuthScopes: ['view_products'],
            },
            {
              name: 'manageAvengers',
              oAuthScopes: [],
            },
          ],
          icon: '<svg><path fill="#000000" /></svg>',
          mainMenuLink: {
            defaultLabel: 'Avengers',
            labelAllLocales: [],
            permissions: [],
          },
          submenuLinks: [],
        },
        env: {
          applicationId: 'app-id-123:avengers',
          applicationIdentifier: 'app-id-123:avengers',
          applicationName: 'avengers-app',
          entryPointUriPath: 'avengers',
          cdnUrl: 'https://avengers.app/',
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
              'https://mc-api.europe-west1.gcp.commercetools.com',
              'https://avengers.app/',
            ],
            'script-src': ['https://avengers.app/'],
            'style-src': ['https://avengers.app/'],
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
            ENTRY_POINT_URI_PATH: 'avengers',
            APP_URL: 'https://avengers.app',
            CLOUD_IDENTIFIER: 'gcp-eu',
            NODE_ENV: 'production',
            MC_APP_ENV: 'development',
            PROJECT_KEY: 'test',
          },
        })
      );
      expect(result).toEqual({
        data: {
          id: 'app-id-123',
          name: 'avengers-app',
          description: undefined,
          entryPointUriPath: 'avengers',
          url: 'https://avengers.app',
          permissions: [
            {
              name: 'viewAvengers',
              oAuthScopes: ['view_products'],
            },
            {
              name: 'manageAvengers',
              oAuthScopes: [],
            },
          ],
          icon: '<svg><path fill="#000000" /></svg>',
          mainMenuLink: {
            defaultLabel: 'Avengers',
            labelAllLocales: [],
            permissions: [],
          },
          submenuLinks: [],
        },
        env: {
          applicationId: '__local:avengers',
          applicationIdentifier: '__local:avengers',
          applicationName: 'avengers-app',
          entryPointUriPath: 'avengers',
          cdnUrl: 'http://localhost:3001/',
          env: 'development',
          frontendHost: 'localhost:3001',
          location: 'gcp-eu',
          mcApiUrl: 'https://mc-api.europe-west1.gcp.commercetools.com',
          revision: '',
          servedByProxy: false,
          __DEVELOPMENT__: {
            accountLinks: undefined,
            menuLinks: {
              defaultLabel: 'Avengers',
              icon: '<svg><path fill="#000000" /></svg>',
              labelAllLocales: [],
              permissions: [],
              submenuLinks: [],
            },
            oidc: {
              authorizeUrl:
                'https://mc.europe-west1.gcp.commercetools.com/login/authorize',
              initialProjectKey: 'test',
              oAuthScopes: {
                view: ['view_products'],
              },
            },
          },
        },
        headers: {
          csp: {
            'connect-src': [
              'https://mc-api.europe-west1.gcp.commercetools.com',
            ],
            'script-src': [],
            'style-src': [],
          },
        },
      });
    });
  });
  describe('with MC_APP_ENV=staging and NODE_ENV=production', () => {
    it('should process the config in production mode', async () => {
      const result = await processConfig(
        createTestOptions({
          processEnv: {
            ENTRY_POINT_URI_PATH: 'avengers',
            APP_URL: 'https://avengers.app',
            CLOUD_IDENTIFIER: 'gcp-eu',
            NODE_ENV: 'production',
            MC_APP_ENV: 'staging',
            PROJECT_KEY: 'test',
          },
        })
      );
      expect(result).toEqual({
        data: {
          id: 'app-id-123',
          name: 'avengers-app',
          description: undefined,
          entryPointUriPath: 'avengers',
          url: 'https://avengers.app',
          permissions: [
            {
              name: 'viewAvengers',
              oAuthScopes: ['view_products'],
            },
            {
              name: 'manageAvengers',
              oAuthScopes: [],
            },
          ],
          icon: '<svg><path fill="#000000" /></svg>',
          mainMenuLink: {
            defaultLabel: 'Avengers',
            labelAllLocales: [],
            permissions: [],
          },
          submenuLinks: [],
        },
        env: {
          applicationId: 'app-id-123:avengers',
          applicationIdentifier: 'app-id-123:avengers',
          applicationName: 'avengers-app',
          entryPointUriPath: 'avengers',
          cdnUrl: 'https://avengers.app/',
          env: 'staging',
          frontendHost: 'avengers.app',
          location: 'gcp-eu',
          mcApiUrl: 'https://mc-api.europe-west1.gcp.commercetools.com',
          revision: '',
          servedByProxy: true,
        },
        headers: {
          csp: {
            'connect-src': [
              'https://mc-api.europe-west1.gcp.commercetools.com',
              'https://avengers.app/',
            ],
            'script-src': ['https://avengers.app/'],
            'style-src': ['https://avengers.app/'],
          },
        },
      });
    });
  });
});

describe('processing a config with intl variable placeholders', () => {
  beforeEach(() => {
    loadConfig.mockReturnValue(
      Promise.resolve({
        filepath: '/custom-application-config.js',
        config: fixtureConfigIntlVariables,
      })
    );
  });
  it('should process the config and correctly parse the translations', async () => {
    const result = await processConfig(createTestOptions());
    expect(result).toEqual({
      data: {
        id: 'app-id-123',
        name: 'avengers-app',
        description: undefined,
        entryPointUriPath: 'avengers',
        url: 'https://my-app.com',
        permissions: [
          {
            name: 'viewAvengers',
            oAuthScopes: ['view_products'],
          },
          {
            name: 'manageAvengers',
            oAuthScopes: [],
          },
        ],
        icon: '<svg><path fill="#000000" /></svg>',
        mainMenuLink: {
          defaultLabel: 'Avengers',
          labelAllLocales: [
            {
              locale: 'en',
              value: 'The Avengers',
            },
            {
              locale: 'de',
              value: 'Die Avengers',
            },
          ],
          permissions: ['ViewAvengers'],
        },
        submenuLinks: [
          {
            defaultLabel: 'Add avenger',
            labelAllLocales: [],
            permissions: ['ManageAvengers'],
            uriPath: 'avengers/new',
          },
        ],
      },
      env: {
        applicationId: '__local:avengers',
        applicationIdentifier: '__local:avengers',
        applicationName: 'avengers-app',
        entryPointUriPath: 'avengers',
        cdnUrl: 'http://localhost:3001/',
        env: 'test',
        frontendHost: 'localhost:3001',
        location: 'gcp-eu',
        mcApiUrl: 'https://mc-api.europe-west1.gcp.commercetools.com',
        revision: '',
        servedByProxy: false,
        __DEVELOPMENT__: {
          accountLinks: undefined,
          menuLinks: expect.objectContaining({
            icon: expect.stringContaining('<svg'),
            defaultLabel: 'Avengers',
            labelAllLocales: [
              {
                locale: 'en',
                value: 'The Avengers',
              },
              {
                locale: 'de',
                value: 'Die Avengers',
              },
            ],
            permissions: ['ViewAvengers'],
            submenuLinks: [
              {
                uriPath: 'avengers/new',
                defaultLabel: 'Add avenger',
                labelAllLocales: [],
                permissions: ['ManageAvengers'],
              },
            ],
          }),
          oidc: {
            authorizeUrl:
              'https://mc.europe-west1.gcp.commercetools.com/login/authorize',
            initialProjectKey: 'test',
            oAuthScopes: {
              view: ['view_products'],
            },
          },
        },
      },
      headers: {
        csp: {
          'connect-src': ['https://mc-api.europe-west1.gcp.commercetools.com'],
          'script-src': [],
          'style-src': [],
        },
      },
    });
  });
});

describe('processing a config with file path variable placeholders', () => {
  beforeEach(() => {
    loadConfig.mockReturnValue(
      Promise.resolve({
        filepath: '/custom-application-config.js',
        config: fixtureConfigFilePathVariables,
      })
    );
  });
  it('should process the config and correctly parse the file content', async () => {
    const result = await processConfig(createTestOptions());
    expect(result).toEqual({
      data: {
        id: 'app-id-123',
        name: 'avengers-app',
        description: undefined,
        entryPointUriPath: 'avengers',
        url: 'https://my-app.com',
        permissions: [
          {
            name: 'viewAvengers',
            oAuthScopes: ['view_products'],
          },
          {
            name: 'manageAvengers',
            oAuthScopes: [],
          },
        ],
        icon: expect.stringContaining('<svg'),
        mainMenuLink: {
          defaultLabel: 'Avengers',
          labelAllLocales: [
            {
              locale: 'en',
              value: 'The Avengers',
            },
          ],
          permissions: ['ViewAvengers'],
        },
        submenuLinks: [],
      },
      env: {
        applicationId: '__local:avengers',
        applicationIdentifier: '__local:avengers',
        applicationName: 'avengers-app',
        entryPointUriPath: 'avengers',
        cdnUrl: 'http://localhost:3001/',
        env: 'test',
        frontendHost: 'localhost:3001',
        location: 'gcp-eu',
        mcApiUrl: 'https://mc-api.europe-west1.gcp.commercetools.com',
        revision: '',
        servedByProxy: false,
        __DEVELOPMENT__: {
          accountLinks: undefined,
          menuLinks: {
            icon: expect.stringContaining('<svg'),
            defaultLabel: 'Avengers',
            labelAllLocales: [
              {
                locale: 'en',
                value: 'The Avengers',
              },
            ],
            permissions: ['ViewAvengers'],
            submenuLinks: [],
          },
          oidc: {
            authorizeUrl:
              'https://mc.europe-west1.gcp.commercetools.com/login/authorize',
            initialProjectKey: 'test',
            oAuthScopes: {
              view: ['view_products'],
            },
          },
        },
      },
      headers: {
        csp: {
          'connect-src': ['https://mc-api.europe-west1.gcp.commercetools.com'],
          'script-src': [],
          'style-src': [],
        },
      },
    });
  });
});

describe('processing a config with OIDC', () => {
  beforeEach(() => {
    loadConfig.mockReturnValue(
      Promise.resolve({
        filepath: '/custom-application-config.js',
        config: fixtureConfigOidc,
      })
    );
  });
  it('should process the config and prepare the application environment and headers, as well as the __DEVELOPMENT__ object', async () => {
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
      data: {
        id: 'app-id-123',
        name: 'avengers-app',
        description: undefined,
        entryPointUriPath: 'avengers',
        url: 'https://avengers.app',
        permissions: [
          {
            name: 'viewAvengers',
            oAuthScopes: ['view_orders', 'view_states'],
          },
          {
            name: 'manageAvengers',
            oAuthScopes: ['manage_orders'],
          },
          {
            name: 'viewAvengersMovies',
            oAuthScopes: ['view_products'],
          },
          {
            name: 'manageAvengersMovies',
            oAuthScopes: [],
          },
          {
            name: 'viewAvengersMerch',
            oAuthScopes: [],
          },
          {
            name: 'manageAvengersMerch',
            oAuthScopes: ['manage_channels'],
          },
        ],
        icon: '<svg><path fill="#000000" /></svg>',
        mainMenuLink: {
          defaultLabel: 'Avengers',
          labelAllLocales: [],
          permissions: [],
        },
        submenuLinks: [],
      },
      env: {
        __DEVELOPMENT__: {
          oidc: {
            authorizeUrl:
              'https://mc.europe-west1.gcp.commercetools.com/login/authorize',
            initialProjectKey: 'project-key',
            oAuthScopes: {
              manage: ['manage_orders'],
              view: ['view_orders', 'view_states'],
            },
            additionalOAuthScopes: [
              {
                name: 'movies',
                view: ['view_products'], // mind that `"manage": []` is filtered out by `omitEmpty` as no additional `manage_` scope should be requested for this group
              },
              {
                name: 'merch',
                manage: ['manage_channels'], // mind that `"view": []` is filtered out by `omitEmpty` as no additional `view_` scope should be requested for this group
              },
            ],
          },
          accountLinks: undefined,
          menuLinks: {
            icon: '<svg><path fill="#000000" /></svg>',
            defaultLabel: 'Avengers',
            labelAllLocales: [],
            permissions: [],
            submenuLinks: [],
          },
        },
        applicationId: '__local:avengers',
        applicationIdentifier: '__local:avengers',
        applicationName: 'avengers-app',
        entryPointUriPath: 'avengers',
        cdnUrl: 'http://localhost:3001/',
        env: 'test',
        frontendHost: 'localhost:3001',
        location: 'gcp-eu',
        mcApiUrl: 'https://mc-api.europe-west1.gcp.commercetools.com',
        revision: '',
        servedByProxy: false,
      },
      headers: {
        csp: {
          'connect-src': ['https://mc-api.europe-west1.gcp.commercetools.com'],
          'script-src': [],
          'style-src': [],
        },
      },
    });
  });
  describe('with NODE_ENV=production', () => {
    it('should process the config as if for production without the __DEVELOPMENT__ object', async () => {
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
        data: {
          id: 'app-id-123',
          name: 'avengers-app',
          description: undefined,
          entryPointUriPath: 'avengers',
          url: 'https://avengers.app',
          permissions: [
            {
              name: 'viewAvengers',
              oAuthScopes: ['view_orders', 'view_states'],
            },
            {
              name: 'manageAvengers',
              oAuthScopes: ['manage_orders'],
            },
            {
              name: 'viewAvengersMovies',
              oAuthScopes: ['view_products'],
            },
            {
              name: 'manageAvengersMovies',
              oAuthScopes: [],
            },
            {
              name: 'viewAvengersMerch',
              oAuthScopes: [],
            },
            {
              name: 'manageAvengersMerch',
              oAuthScopes: ['manage_channels'],
            },
          ],
          icon: '<svg><path fill="#000000" /></svg>',
          mainMenuLink: {
            defaultLabel: 'Avengers',
            labelAllLocales: [],
            permissions: [],
          },
          submenuLinks: [],
        },
        env: {
          applicationId: 'app-id-123:avengers',
          applicationIdentifier: 'app-id-123:avengers',
          applicationName: 'avengers-app',
          entryPointUriPath: 'avengers',
          cdnUrl: 'https://avengers.app/',
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
              'https://mc-api.europe-west1.gcp.commercetools.com',
              'https://avengers.app/',
            ],
            'script-src': ['https://avengers.app/'],
            'style-src': ['https://avengers.app/'],
          },
        },
      });
    });
  });
});

describe('processing a config with account links', () => {
  beforeEach(() => {
    loadConfig.mockReturnValue(
      Promise.resolve({
        filepath: '/custom-application-config.js',
        config: fixtureConfigAccountLinks,
      })
    );
  });
  it('should process the config and correctly parse the file content', async () => {
    const result = await processConfig(createTestOptions());
    expect(result).toEqual({
      data: {
        id: 'app-id-123',
        name: 'avengers-app',
        description: undefined,
        entryPointUriPath: 'avengers',
        url: 'https://avengers.app',
        permissions: [
          {
            name: 'viewAvengers',
            oAuthScopes: ['view_products'],
          },
          {
            name: 'manageAvengers',
            oAuthScopes: [],
          },
        ],
        icon: 'unused',
        mainMenuLink: {
          defaultLabel: '',
          labelAllLocales: [],
          permissions: [],
        },
        submenuLinks: [],
      },
      env: {
        applicationId: '__local:avengers',
        applicationIdentifier: '__local:avengers',
        applicationName: 'avengers-app',
        entryPointUriPath: 'avengers',
        cdnUrl: 'http://localhost:3001/',
        env: 'test',
        frontendHost: 'localhost:3001',
        location: 'gcp-eu',
        mcApiUrl: 'https://mc-api.europe-west1.gcp.commercetools.com',
        revision: '',
        servedByProxy: false,
        __DEVELOPMENT__: {
          accountLinks: undefined,
          menuLinks: {
            icon: 'unused',
            defaultLabel: '',
            labelAllLocales: [],
            permissions: [],
            submenuLinks: [],
          },
          accountLinks: [
            {
              uriPath: 'profile',
              defaultLabel: 'Profile',
              labelAllLocales: [],
              permissions: [],
            },
          ],
          oidc: {
            authorizeUrl:
              'https://mc.europe-west1.gcp.commercetools.com/login/authorize',
            initialProjectKey: 'test',
            oAuthScopes: {
              view: ['view_products'],
            },
          },
        },
      },
      headers: {
        csp: {
          'connect-src': ['https://mc-api.europe-west1.gcp.commercetools.com'],
          'script-src': [],
          'style-src': [],
        },
      },
    });
  });
});

describe('when app URL is malformed', () => {
  beforeEach(() => {
    loadConfig.mockReturnValue(
      Promise.resolve({
        filepath: '/custom-application-config.js',
        config: {
          ...fixtureConfigSimple,
          env: {
            ...fixtureConfigSimple.env,
            production: {
              ...fixtureConfigSimple.env.production,
              url: 'wrong url',
            },
          },
        },
      })
    );
  });
  it('should throw', async () => {
    await expect(
      processConfig(
        createTestOptions({
          processEnv: {
            NODE_ENV: 'production',
          },
        })
      )
    ).rejects.toMatchInlineSnapshot(
      `[Error: Invalid application URL: "wrong url"]`
    );
  });
});
describe('when app URL has non-root path without ending backslash', () => {
  const appUrl = 'https://avengers.app/admin';
  beforeEach(() => {
    loadConfig.mockReturnValue(
      Promise.resolve({
        filepath: '/custom-application-config.js',
        config: {
          ...fixtureConfigSimple,
          env: {
            ...fixtureConfigSimple.env,
            production: {
              ...fixtureConfigSimple.env.production,
              url: appUrl,
            },
          },
        },
      })
    );
  });
  it('CSP headers should include app URL with a backslash', async () => {
    const result = await processConfig(
      createTestOptions({
        processEnv: {
          NODE_ENV: 'production',
        },
      })
    );

    Object.values(result.headers.csp).forEach((cspDirectiveValues) =>
      expect(cspDirectiveValues).toEqual(expect.arrayContaining([`${appUrl}/`]))
    );
  });
});

describe('processing a config with OIDC with teamId', () => {
  beforeEach(() => {
    loadConfig.mockReturnValue(
      Promise.resolve({
        filepath: '/custom-application-config.js',
        config: fixtureConfigOidcWithTeamId,
      })
    );
  });
  it('should process the config and prepare the application environment and headers, as well as the __DEVELOPMENT__ object', async () => {
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
      data: {
        id: 'app-id-123',
        name: 'avengers-app',
        description: undefined,
        entryPointUriPath: 'avengers',
        url: 'https://avengers.app',
        permissions: [
          {
            name: 'viewAvengers',
            oAuthScopes: ['view_orders', 'view_states'],
          },
          {
            name: 'manageAvengers',
            oAuthScopes: ['manage_orders'],
          },
          {
            name: 'viewAvengersMovies',
            oAuthScopes: ['view_products'],
          },
          {
            name: 'manageAvengersMovies',
            oAuthScopes: [],
          },
          {
            name: 'viewAvengersMerch',
            oAuthScopes: [],
          },
          {
            name: 'manageAvengersMerch',
            oAuthScopes: ['manage_channels'],
          },
        ],
        icon: '<svg><path fill="#000000" /></svg>',
        mainMenuLink: {
          defaultLabel: 'Avengers',
          labelAllLocales: [],
          permissions: [],
        },
        submenuLinks: [],
      },
      env: {
        __DEVELOPMENT__: {
          oidc: {
            applicationId: 'app-id-123',
            authorizeUrl:
              'https://mc.europe-west1.gcp.commercetools.com/login/authorize',
            initialProjectKey: 'project-key',
            oAuthScopes: {
              manage: ['manage_orders'],
              view: ['view_orders', 'view_states'],
            },
            teamId: 'team-id',
            additionalOAuthScopes: [
              {
                name: 'movies',
                view: ['view_products'], // mind that `"manage": []` is filtered out by `omitEmpty` as no additional `manage_` scope should be requested for this group
              },
              {
                name: 'merch',
                manage: ['manage_channels'], // mind that `"view": []` is filtered out by `omitEmpty` as no additional `view_` scope should be requested for this group
              },
            ],
          },
          accountLinks: undefined,
          menuLinks: {
            icon: '<svg><path fill="#000000" /></svg>',
            defaultLabel: 'Avengers',
            labelAllLocales: [],
            permissions: [],
            submenuLinks: [],
          },
        },
        applicationId: '__local:avengers',
        applicationIdentifier: '__local:avengers',
        applicationName: 'avengers-app',
        entryPointUriPath: 'avengers',
        cdnUrl: 'http://localhost:3001/',
        env: 'test',
        frontendHost: 'localhost:3001',
        location: 'gcp-eu',
        mcApiUrl: 'https://mc-api.europe-west1.gcp.commercetools.com',
        revision: '',
        servedByProxy: false,
      },
      headers: {
        csp: {
          'connect-src': ['https://mc-api.europe-west1.gcp.commercetools.com'],
          'script-src': [],
          'style-src': [],
        },
      },
    });
  });
});

describe('when CDN URL is malformed', () => {
  beforeEach(() => {
    loadConfig.mockReturnValue(
      Promise.resolve({
        filepath: '/custom-application-config.js',
        config: {
          ...fixtureConfigSimple,
          env: {
            ...fixtureConfigSimple.env,
            production: {
              ...fixtureConfigSimple.env.production,
              cdnUrl: 'wrong url',
            },
          },
        },
      })
    );
  });
  it('should throw', async () => {
    await expect(
      processConfig(
        createTestOptions({
          processEnv: {
            NODE_ENV: 'production',
          },
        })
      )
    ).rejects.toMatchInlineSnapshot(
      `[Error: Invalid application CDN URL: "wrong url"]`
    );
  });
});
describe('when CDN URL has non-root path without ending backslash', () => {
  const appUrl = 'https://avengers.app/admin';
  const cdnUrl = 'https://justice-league.app/inventory';
  beforeEach(() => {
    loadConfig.mockReturnValue(
      Promise.resolve({
        filepath: '/custom-application-config.js',
        config: {
          ...fixtureConfigSimple,
          env: {
            ...fixtureConfigSimple.env,
            production: {
              ...fixtureConfigSimple.env.production,
              url: appUrl,
              cdnUrl: cdnUrl,
            },
          },
        },
      })
    );
  });
  it('CSP headers should include CDN URL with a backslash', async () => {
    const result = await processConfig(
      createTestOptions({
        processEnv: {
          NODE_ENV: 'production',
        },
      })
    );

    const cspDirectiveValues = result.headers.csp;
    expect(cspDirectiveValues['connect-src']).toEqual(
      expect.arrayContaining([`${appUrl}/`])
    );
    expect(cspDirectiveValues['script-src']).toEqual(
      expect.arrayContaining([`${cdnUrl}/`])
    );
    expect(cspDirectiveValues['style-src']).toEqual(
      expect.arrayContaining([`${cdnUrl}/`])
    );
  });
});

describe('when MC API URL is malformed', () => {
  beforeEach(() => {
    loadConfig.mockReturnValue(
      Promise.resolve({
        filepath: '/custom-application-config.js',
        config: {
          ...fixtureConfigSimple,
          mcApiUrl: 'wrong url',
        },
      })
    );
  });
  it('should throw', async () => {
    await expect(
      processConfig(createTestOptions())
    ).rejects.toMatchInlineSnapshot(`[Error: Invalid MC API URL: "wrong url"]`);
  });
});
