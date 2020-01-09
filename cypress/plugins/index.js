// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @param `on` is used to hook into various events Cypress emits
 * @param `config` is the resolved Cypress config
 * @return {[type]} [description]
 */

// Reference: https://docs.cypress.io/api/plugins/configuration-api.html#Promises

/* eslint-disable global-require */
const fs = require('fs');
const path = require('path');
const percyHealthCheck = require('@percy/cypress/task');

// plugins file
module.exports = (on, cypressConfig) => {
  // Load the config
  if (!process.env.CI) {
    const path = require('path');
    const envPath = path.join(__dirname, '../.env');
    console.log('Loading environment variables from', envPath);
    require('dotenv').config({ path: envPath });
  }

  on('task', {
    ...percyHealthCheck,
    // This will be available as `cy.task('getGraphQLSchema')`
    getGraphQLSchema(targetName) {
      const schemaPath = path.resolve(
        __dirname,
        `../../schemas/${targetName}.json`
      );
      if (fs.existsSync(schemaPath)) {
        const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
        return schema.data;
      }
      throw new Error(`Unknown schema target ${targetName}`);
    },
  });

  return Object.assign({}, cypressConfig, {
    env: Object.assign({}, cypressConfig.env, {
      LOGIN_USER: process.env.CYPRESS_LOGIN_USER,
      LOGIN_PASSWORD: process.env.CYPRESS_LOGIN_PASSWORD,
      PROJECT_KEY: process.env.CYPRESS_PROJECT_KEY,
    }),
  });
};
