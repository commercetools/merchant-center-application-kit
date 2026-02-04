process.env.ENABLE_NEW_JSX_TRANSFORM = 'true';

const graphqlPlugin = require('@graphql-eslint/eslint-plugin');
const mcAppConfig = require('@commercetools-frontend/eslint-config-mc-app-flat');

/**
 * @type {import("eslint").Linter.FlatConfig[]}
 */
module.exports = [
  ...mcAppConfig,

  // GraphQL validation
  {
    files: ['**/*.ctp.graphql'],
    plugins: {
      '@graphql-eslint': graphqlPlugin,
    },
    languageOptions: {
      parser: graphqlPlugin,
      parserOptions: {
        graphQLConfig: {
          schema: './schemas/ctp.json',
        },
      },
    },
    rules: {
      '@graphql-eslint/known-type-names': 'error',
      '@graphql-eslint/known-argument-names': 'error',
      '@graphql-eslint/known-directives': 'error',
      '@graphql-eslint/scalar-leafs': 'error',
    },
  },
];
