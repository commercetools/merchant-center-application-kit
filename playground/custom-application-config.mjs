import { PERMISSIONS, entryPointUriPath } from './src/constants';
const name = 'AppKit Playground Application';

/**
 * @type {import('@commercetools-frontend/application-config').ConfigOptions}
 */
const config = {
  name,
  entryPointUriPath,
  cloudIdentifier: '${env:CLOUD_IDENTIFIER}',
  mcApiUrl: '${env:MC_API_URL}',
  oAuthScopes: {
    view: ['view_orders', 'view_states'],
    manage: [],
  },
  env: {
    development: {
      initialProjectKey: '${env:CTP_INITIAL_PROJECT_KEY}',
    },
    production: {
      applicationId: '${env:APP_ID}',
      url: '${env:APP_URL}',
    },
  },
  additionalEnv: {
    trackingSentry:
      'https://327619347ab84c8e9702a1dc16460198@o32365.ingest.sentry.io/1549825',
    echoServerApiUrl: '${env:ECHO_SERVER_URL}',
  },
  headers: {
    csp: {
      'connect-src': ['${env:HOST_GCP_STAGING}'],
    },
  },
  icon: '${path:@commercetools-frontend/assets/application-icons/rocket.svg}',
  mainMenuLink: {
    defaultLabel: '${intl:en:Menu.StateMachines}',
    labelAllLocales: [
      {
        locale: 'en',
        value: '${intl:en:Menu.StateMachines}',
      },
      {
        locale: 'de',
        value: '${intl:de:Menu.StateMachines}',
      },
    ],
    permissions: [PERMISSIONS.View],
  },
  submenuLinks: [
    {
      uriPath: 'notifications',
      permissions: [PERMISSIONS.View],
      defaultLabel: 'Notifications',
      labelAllLocales: [],
    },
    {
      uriPath: 'echo-server',
      permissions: [PERMISSIONS.View],
      defaultLabel: '${intl:en:Menu.EchoServer}',
      labelAllLocales: [
        {
          locale: 'en',
          value: '${intl:en:Menu.EchoServer}',
        },
        {
          locale: 'de',
          value: '${intl:de:Menu.EchoServer}',
        },
      ],
    },
  ],
};

export default config;
