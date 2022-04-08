import path from 'path';
import { processConfig } from '../src';
import loadConfig from '../src/load-config';
import fixtureConfigSimple from './fixtures/config-simple.json';
import fixtureConfigFull from './fixtures/config-full.json';
import fixtureConfigOidc from './fixtures/config-oidc.json';
import fixtureConfigEnvVariables from './fixtures/config-env-variables.json';
import fixtureConfigIntlVariables from './fixtures/config-intl-variables.json';
import fixtureConfigFilePathVariables from './fixtures/config-file-path-variables.json';

jest.mock('../src/load-config');

const createTestOptions = (options) => ({
  disableCache: true,
  processEnv: {
    NODE_ENV: 'test',
  },
  applicationPath: path.join(__dirname, 'fixtures'),
  ...options,
});

beforeEach(() => {
  loadConfig.mockClear();
});

describe('processing a simple config', () => {
  beforeEach(() => {
    loadConfig.mockReturnValue(fixtureConfigSimple);
  });
  it('should process the config and prepare the application environment and headers', () => {
    const result = processConfig(createTestOptions());
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
    it('should process the config as if for production', () => {
      const result = processConfig(
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
    it('should process the config where the MC_APP_ENV variable takes precedence over NODE_ENV', () => {
      const result = processConfig(
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
    it('should process the config in production mode', () => {
      const result = processConfig(
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
    loadConfig.mockReturnValue(fixtureConfigFull);
  });
  it('should process the config and prepare the application environment and headers', () => {
    const result = processConfig(createTestOptions());
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
        featurePolicies: {
          microphone: 'none',
        },
        permissionsPolicies: {
          microphone: '()',
        },
        strictTransportSecurity: ['includeSubDomains'],
      },
    });
  });
  describe('with NODE_ENV=production', () => {
    it('should process the config as if for production', () => {
      const result = processConfig(
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
          featurePolicies: {
            microphone: 'none',
          },
          permissionsPolicies: {
            microphone: '()',
          },
          strictTransportSecurity: ['includeSubDomains'],
        },
      });
    });
  });
  describe('with MC_APP_ENV=development and NODE_ENV=production', () => {
    it('should process the config where the MC_APP_ENV variable takes precedence over NODE_ENV', () => {
      const result = processConfig(
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
          featurePolicies: {
            microphone: 'none',
          },
          permissionsPolicies: {
            microphone: '()',
          },
          strictTransportSecurity: ['includeSubDomains'],
        },
      });
    });
  });
  describe('with MC_APP_ENV=staging and NODE_ENV=production', () => {
    it('should process the config in production mode', () => {
      const result = processConfig(
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
          featurePolicies: {
            microphone: 'none',
          },
          permissionsPolicies: {
            microphone: '()',
          },
          strictTransportSecurity: ['includeSubDomains'],
        },
      });
    });
  });
});

describe('processing a config with environment variable placeholders', () => {
  beforeEach(() => {
    loadConfig.mockReturnValue(fixtureConfigEnvVariables);
  });
  it('should process the config and prepare the application environment and headers', () => {
    const result = processConfig(
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
    it('should process the config as if for production', () => {
      const result = processConfig(
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
    it('should process the config where the MC_APP_ENV variable takes precedence over NODE_ENV', () => {
      const result = processConfig(
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
    it('should process the config in production mode', () => {
      const result = processConfig(
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
    loadConfig.mockReturnValue(fixtureConfigIntlVariables);
  });
  it('should process the config and correctly parse the translations', () => {
    const result = processConfig(createTestOptions());
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
    loadConfig.mockReturnValue(fixtureConfigFilePathVariables);
  });
  it('should process the config and correctly parse the file content', () => {
    const result = processConfig(createTestOptions());
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
    loadConfig.mockReturnValue(fixtureConfigOidc);
  });
  it('should process the config and prepare the application environment and headers, as well as the __DEVELOPMENT__ object', () => {
    const result = processConfig(
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
    it('should process the config as if for production without the __DEVELOPMENT__ object', () => {
      const result = processConfig(
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

describe('when app URL is malformed', () => {
  beforeEach(() => {
    loadConfig.mockReturnValue({
      ...fixtureConfigSimple,
      env: {
        ...fixtureConfigSimple.env,
        production: {
          ...fixtureConfigSimple.env.production,
          url: 'wrong url',
        },
      },
    });
  });
  it('should throw', () => {
    expect(() =>
      processConfig(
        createTestOptions({
          processEnv: {
            NODE_ENV: 'production',
          },
        })
      )
    ).toThrowErrorMatchingInlineSnapshot(
      `"Invalid application URL: \\"wrong url\\""`
    );
  });
});
describe('when CDN URL is malformed', () => {
  beforeEach(() => {
    loadConfig.mockReturnValue({
      ...fixtureConfigSimple,
      env: {
        ...fixtureConfigSimple.env,
        production: {
          ...fixtureConfigSimple.env.production,
          cdnUrl: 'wrong url',
        },
      },
    });
  });
  it('should throw', () => {
    expect(() =>
      processConfig(
        createTestOptions({
          processEnv: {
            NODE_ENV: 'production',
          },
        })
      )
    ).toThrowErrorMatchingInlineSnapshot(
      `"Invalid application CDN URL: \\"wrong url\\""`
    );
  });
});
describe('when MC API URL is malformed', () => {
  beforeEach(() => {
    loadConfig.mockReturnValue({
      ...fixtureConfigSimple,
      mcApiUrl: 'wrong url',
    });
  });
  it('should throw', () => {
    expect(() =>
      processConfig(createTestOptions())
    ).toThrowErrorMatchingInlineSnapshot(
      `"Invalid MC API URL: \\"wrong url\\""`
    );
  });
});
