import path from 'node:path';
import { defineConfig } from 'cypress';
import {
  customViewConfig,
  customApplicationConfig,
} from '@commercetools-frontend/cypress/task';

export default defineConfig({
  retries: 1,
  video: false,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    async setupNodeEvents(on, cypressConfig) {
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
          LOGIN_USER: process.env.CYPRESS_LOGIN_USER,
          LOGIN_PASSWORD: process.env.CYPRESS_LOGIN_PASSWORD,
          PROJECT_KEY: process.env.CYPRESS_PROJECT_KEY,
          PACKAGE_NAME: process.env.CYPRESS_PACKAGE_NAME,
        }),
      });
    },
    baseUrl: 'http://localhost:3001',
  },
});
