const config = {
  name: 'ljks',
  cloudIdentifier: 'gcp-eu',
  entryPointUriPath: 'kjnsf',
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
