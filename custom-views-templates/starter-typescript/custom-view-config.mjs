const config = {
  name: 'Custom View Template Starter',
  cloudIdentifier: 'gcp-eu',
  env: {
    development: {
      // TODO: This should be populated in the template installation process
      initialProjectKey: 'almond-40',
      // TODO: This should be an optional attribute
      hostUrl: '/test-project-with-sample-data/products/47741ed1-ae01-4700-a858-45117e2a1730'
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
    size: 'SMALL', // SMALL, LARGE
  }
};

export default config;
