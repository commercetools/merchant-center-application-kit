process.env.ENABLE_NEW_JSX_TRANSFORM = 'true';

const mcAppConfig = require('@commercetools-frontend/eslint-config-mc-app-flat');

/**
 * @type {import("eslint").Linter.FlatConfig[]}
 */
module.exports = [...mcAppConfig];
