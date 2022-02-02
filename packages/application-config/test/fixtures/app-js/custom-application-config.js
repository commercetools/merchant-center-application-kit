const { entryPointUriPath } = require('./constants');

const name = 'Test application';

/**
 * @type {import('../../../src/types').ConfigOptions}
 */
const config = {
  name,
  cloudIdentifier: 'gcp-eu',
  entryPointUriPath,
  env: {
    development: {
      initialProjectKey: 'project-key',
    },
    production: {
      applicationId: 'TODO',
      url: 'https://test.com',
    },
  },
  oAuthScopes: {
    view: ['view_products'],
    manage: [],
  },
  icon: '<svg><path fill="#000000" /></svg>',
  mainMenuLink: {
    defaultLabel: 'Avengers',
    labelAllLocales: [],
    permissions: [],
  },
  submenuLinks: [],
};

module.exports = config;
