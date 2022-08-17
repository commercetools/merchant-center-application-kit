import { defineConfig } from 'cypress';

export default defineConfig({
  retries: 1,
  video: false,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      // eslint-disable-next-line import/extensions
      return require('./cypress/plugins/index.js')(on, config);
    },
    baseUrl: 'http://localhost:3001',
  },
});
