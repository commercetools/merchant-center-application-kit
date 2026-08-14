import path from 'node:path';
import { installPlugin } from '@chromatic-com/cypress';
import { defineConfig } from 'cypress';
import {
  customViewConfig,
  customApplicationConfig,
} from '@commercetools-frontend/cypress/task';

export default defineConfig({
  expose: {
    // Chromatic's archiver drops off-origin responses unless they're named here, and
    // the shell loads its fonts off-origin.
    assetDomains: ['fonts.googleapis.com', 'fonts.gstatic.com'],
  },
  retries: 1,
  video: false,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    async setupNodeEvents(on, cypressConfig) {
      // Add coverage task
      require('@cypress/code-coverage/task')(on, cypressConfig);
      // Only the playground archives; support/e2e.ts gates on the same flag.
      if (process.env.CHROMATIC_VRT) {
        installPlugin(on, cypressConfig);
      }
      // Load the config
      if (!process.env.CI) {
        const envPath = path.join(__dirname, 'cypress/.env');
        console.log('Loading environment variables from', envPath);
        const dotenv = await import('dotenv');
        dotenv.config({ path: envPath });
      }

      on('task', {
        customApplicationConfig,
      });
      on('task', {
        customViewConfig,
      });

      return Object.assign({}, cypressConfig, {
        env: Object.assign({}, cypressConfig.env, {
          CHROMATIC_VRT: process.env.CHROMATIC_VRT,
          LOGIN_USER: process.env.CYPRESS_LOGIN_USER,
          LOGIN_PASSWORD: process.env.CYPRESS_LOGIN_PASSWORD,
          PROJECT_KEY: process.env.CYPRESS_PROJECT_KEY,
          PACKAGE_NAME: process.env.CYPRESS_PACKAGE_NAME,
          // In case we want to test the login flow with a different Identity URL.
          // This is generally not needed as by default we use the production Identity URL.
          IDENTITY_URL: process.env.CYPRESS_IDENTITY_URL,
        }),
      });
    },
    baseUrl: 'http://localhost:3001',
    // Chromatic re-renders at the config viewport, and the shell's `height: 100vh`
    // stops it detecting a natural page height.
    viewportWidth: 1024,
    viewportHeight: 1024,
  },
});
