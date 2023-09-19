import type { ConfigOptionsForCustomView } from '../../../../src/types';

const name = 'Test view';

const config: ConfigOptionsForCustomView = {
  name,
  cloudIdentifier: 'gcp-eu',
  env: {
    development: {
      initialProjectKey: 'project-key',
    },
    production: {
      customViewId: 'TODO',
      url: 'https://test.com',
    },
  },
  oAuthScopes: {
    view: ['view_products'],
    manage: [],
  },
  type: 'CustomPanel',
  typeSettings: {
    size: 'LARGE',
  },
  locators: [],
  labelAllLocales: [],
};

export default config;
