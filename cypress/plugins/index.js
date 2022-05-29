/// <reference types="cypress" />

const customApplications = require('@commercetools-frontend/cypress/task');

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, cypressConfig) => {
  // Load the config
  if (!process.env.CI) {
    const path = require('path');
    const envPath = path.join(__dirname, '../.env');
    console.log('Loading environment variables from', envPath);
    require('dotenv').config({ path: envPath });
  }

  on('task', {
    ...customApplications,
  });

  return Object.assign({}, cypressConfig, {
    env: Object.assign({}, cypressConfig.env, {
      LOGIN_USER: process.env.CYPRESS_LOGIN_USER,
      LOGIN_PASSWORD: process.env.CYPRESS_LOGIN_PASSWORD,
      PROJECT_KEY: process.env.CYPRESS_PROJECT_KEY,
    }),
  });
};
