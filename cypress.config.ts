import path from 'path';
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3001',
    retries: 1,
    async setupNodeEvents(on, cypressConfig) {
      // Load the config
      if (!process.env.CI) {
        const envPath = path.join(__dirname, 'cypress/.env');
        console.log('Loading environment variables from', envPath);
        const dotenv = await import('dotenv');
        dotenv.config({ path: envPath });
      }

      const { customApplicationConfig } = await import(
        '@commercetools-frontend/cypress/task'
      );

      on('task', {
        customApplicationConfig,
      });

      return Object.assign({}, cypressConfig, {
        env: Object.assign({}, cypressConfig.env, {
          LOGIN_USER: process.env.CYPRESS_LOGIN_USER,
          LOGIN_PASSWORD: process.env.CYPRESS_LOGIN_PASSWORD,
          PROJECT_KEY: process.env.CYPRESS_PROJECT_KEY,
        }),
      });
    },
  },
});
