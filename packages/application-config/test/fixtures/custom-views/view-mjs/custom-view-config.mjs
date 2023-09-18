const name = 'Test view';

/**
 * @type {import('../../../../src/types').ConfigOptionsForCustomView}
 */
const config = {
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
};

export default config;
