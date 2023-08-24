
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
      customViewId: 'TODO',
      url: 'https://my-custom-view.com',
    }
  },
  oAuthScopes: {
    view: ['view_products'],
    manage: ['manage_products'],
  },
  type: 'CustomPanel',
  typeSettings: {
    size: 'SMALL',
  }
};

export default config;
