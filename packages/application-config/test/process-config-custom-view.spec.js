import path from 'path';
import { processConfig } from '../src';
import loadConfig from '../src/load-config';
import fixtureConfigSimple from './fixtures/custom-views/config-simple.json';

jest.mock('../src/load-config');

const createTestOptions = (options) => ({
  disableCache: true,
  processEnv: {
    NODE_ENV: 'test',
  },
  applicationPath: path.join(__dirname, 'fixtures/custom-views'),
  ...options,
});

beforeEach(() => {
  loadConfig.mockClear();
});

describe('processing a simple config', () => {
  beforeEach(() => {
    loadConfig.mockReturnValue({
      filepath: '/custom-view-config.js',
      config: fixtureConfigSimple,
    });
  });
  it('should process the config and prepare the application environment and headers', () => {
    const result = processConfig(createTestOptions());
    expect(result).toEqual({
      data: {
        id: 'custom-view-id-123',
        defaultLabel: 'avengers-custom-view',
        description: undefined,
        labelAllLocales: [],
        url: 'https://avengers.app',
        permissions: [
          {
            name: 'view',
            oAuthScopes: ['view_products'],
          },
          {
            name: 'manage',
            oAuthScopes: [],
          },
        ],
        locators: [],
        type: 'CustomPanel',
        typeSettings: {
          size: 'LARGE',
        },
      },
      env: {
        applicationId: '__local:@@custom-view-host@@',
        applicationIdentifier: '__local:@@custom-view-host@@',
        applicationName: 'avengers-custom-view',
        entryPointUriPath: '@@custom-view-host@@',
        customViewId: 'custom-view-id-123',
        cdnUrl: 'http://localhost:3001/',
        env: 'test',
        frontendHost: 'localhost:3001',
        location: 'gcp-eu',
        mcApiUrl: 'https://mc-api.europe-west1.gcp.commercetools.com',
        revision: '',
        servedByProxy: false,
        __DEVELOPMENT__: {
          customViewHostUrl: 'http://localhost:3001/test/@@custom-view-host@@',
          customViewConfig: {
            id: 'custom-view-id-123',
            defaultLabel: 'avengers-custom-view',
            labelAllLocales: [],
            description: undefined,
            url: 'https://avengers.app',
            permissions: [
              {
                name: 'view',
                oAuthScopes: ['view_products'],
              },
              {
                name: 'manage',
                oAuthScopes: [],
              },
            ],
            locators: [],
            type: 'CustomPanel',
            typeSettings: {
              size: 'LARGE',
            },
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
          id: 'custom-view-id-123',
          defaultLabel: 'avengers-custom-view',
          description: undefined,
          labelAllLocales: [],
          url: 'https://avengers.app',
          permissions: [
            {
              name: 'view',
              oAuthScopes: ['view_products'],
            },
            {
              name: 'manage',
              oAuthScopes: [],
            },
          ],
          locators: [],
          type: 'CustomPanel',
          typeSettings: {
            size: 'LARGE',
          },
        },
        env: {
          applicationId: 'custom-view-id-123:@@custom-view-host@@',
          applicationIdentifier: 'custom-view-id-123:@@custom-view-host@@',
          applicationName: 'avengers-custom-view',
          entryPointUriPath: '@@custom-view-host@@',
          customViewId: 'custom-view-id-123',
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
