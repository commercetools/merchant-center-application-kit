
const config = {
  name: 'Custom View Template Starter',
  cloudIdentifier: 'gcp-eu',
  // TODO: This should be read from an environment variable
  mcApiUrl: 'https://mc-api.europe-west1.gcp.escemo.com/graphql',
  env: {
    development: {
      // TODO: This should be read from an environment variable
      initialProjectKey: 'almond-40',
    },
    production: {
      // TODO: These should be empty by default
      customViewId: '0f4cb295-e2f9-4ee2-80e5-271297619f29',
      url: 'https://my-custom-view.com',
    }
  },
  oAuthScopes: {
    view: ['view_products'],
    manage: ['manage_products'],
  },
};

export default config;
