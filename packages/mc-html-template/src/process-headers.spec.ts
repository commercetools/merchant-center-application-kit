import type { ApplicationRuntimeConfig } from '@commercetools-frontend/application-config';
import { HTTP_SECURITY_HEADERS } from '@commercetools-frontend/constants';
import processHeaders from './process-headers';

const defaultApplicationConfig: ApplicationRuntimeConfig = {
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
          manage: [],
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
};

describe('security headers', () => {
  it('should set the default security headers', () => {
    const processedApplicationConfig = processHeaders(defaultApplicationConfig);

    expect(processedApplicationConfig).toEqual(
      expect.objectContaining(HTTP_SECURITY_HEADERS)
    );
  });
});
describe('csp', () => {
  it('should set the header value', () => {
    const testApplicationConfig = {
      ...defaultApplicationConfig,
      headers: {
        csp: {
          'connect-src': ['https://example.com'],
        },
      },
    };

    const processedApplicationConfig = processHeaders(testApplicationConfig);

    expect(
      processedApplicationConfig['Content-Security-Policy']
    ).toMatchInlineSnapshot(
      `"default-src 'none'; script-src 'self' www.googletagmanager.com/gtm.js www.google-analytics.com/analytics.js 'sha256-RACUtlMzZqF+zLJFAGOjaIZxjIlawfiKwgX9HWbQ9yQ=' 'sha256-OvuGL7YLVhPmNp2EH+HLhMJbK4noh/2eIHOhHTshZYk=' 'sha256-K4tyBnwnqF68wrXckWx1ce5+E4534Hv/ZdQEZLf+Z7Y=' 'sha256-j9wVXX+M7R/Q+73Prl2sR1sFWF52/i8TxdhdDkne77o='; connect-src 'self' app.launchdarkly.com clientstream.launchdarkly.com events.launchdarkly.com app.getsentry.com *.sentry.io www.google-analytics.com https://example.com; img-src * data:; style-src 'self' fonts.googleapis.com data: 'unsafe-inline'; font-src 'self' fonts.gstatic.com data:; upgrade-insecure-requests "`
    );
  });
});
describe('featurePolicies', () => {
  it('should set the header value', () => {
    const testApplicationConfig = {
      ...defaultApplicationConfig,
      headers: {
        featurePolicies: {
          microphone: "'none'",
          camera: ["'self'", "'https://example.com'"],
        },
      },
    };

    const processedApplicationConfig = processHeaders(testApplicationConfig);

    expect(processedApplicationConfig['Feature-Policy']).toMatchInlineSnapshot(
      `"microphone 'none'; camera 'self' 'https://example.com'"`
    );
  });
});
describe('permissionsPolicies', () => {
  it('should set the header value', () => {
    const testApplicationConfig = {
      ...defaultApplicationConfig,
      headers: {
        permissionsPolicies: {
          microphone: '()',
          camera: '(self)',
        },
      },
    };

    const processedApplicationConfig = processHeaders(testApplicationConfig);

    expect(
      processedApplicationConfig['Permissions-Policy']
    ).toMatchInlineSnapshot(`"microphone=(), camera=(self)"`);
  });
});
describe('strictTransportSecurity', () => {
  it('should add extra options', () => {
    const testApplicationConfig = {
      ...defaultApplicationConfig,
      headers: {
        strictTransportSecurity: ['includeSubDomains'],
      },
    };

    // @ts-ignore
    const processedApplicationConfig = processHeaders(testApplicationConfig);

    expect(
      processedApplicationConfig['Strict-Transport-Security']
    ).toMatchInlineSnapshot(`"max-age=31536000; includeSubDomains"`);
  });
});
