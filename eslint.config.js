process.env.ENABLE_NEW_JSX_TRANSFORM = 'true';

const graphqlPlugin = require('@graphql-eslint/eslint-plugin');
const mcAppConfig = require('@commercetools-frontend/eslint-config-mc-app-flat');

/**
 * Helper function to create GraphQL ESLint config for a specific schema type
 * @param {string} schemaType - The schema type (e.g., 'mc', 'ctp', 'core')
 * @param {string} schemaPath - Path to the JSON schema file
 * @returns {import("eslint").Linter.FlatConfig}
 */
function createGraphQLConfig(schemaType, schemaPath) {
  return {
    files: [`**/*.${schemaType}.graphql`],
    plugins: {
      '@graphql-eslint': graphqlPlugin,
    },
    languageOptions: {
      parser: require('@graphql-eslint/eslint-plugin'),
      parserOptions: {
        schema: schemaPath,
      },
    },
    rules: {
      '@graphql-eslint/known-type-names': 'error',
      '@graphql-eslint/no-deprecated': 'warn',
    },
  };
}

/**
 * @type {import("eslint").Linter.FlatConfig[]}
 */
module.exports = [
  // Global ignores
  {
    ignores: [
      '_translations/',
      'dist/',
      'build/',
      'node_modules/*',
      '**/node_modules/*',
      'packages/application-shell/test-utils/index.js',
      'packages/application-shell-connectors/test-utils/index.js',
      'packages/sdk/test-utils/index.js',
      '**/.cache/*',
    ],
  },

  // Base config from eslint-config-mc-app
  ...mcAppConfig,

  // Repository-specific overrides
  {
    files: ['**/*.{js,jsx,ts,tsx,cjs,mjs}'],
    rules: {
      'import/order': [
        'error',
        {
          alphabetize: { order: 'asc', caseInsensitive: true },
          pathGroups: [
            {
              pattern: 'jest-mock',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'msw',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'prop-types',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@emotion/**',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@commercetools-frontend/**',
              group: 'external',
              position: 'after',
            },
            {
              pattern: '@commercetools-uikit/**',
              group: 'external',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
        },
      ],
    },
  },

  // GraphQL validation - using @graphql-eslint/eslint-plugin
  // Context-aware linting for 5 different GraphQL schema types
  createGraphQLConfig('mc', './schemas/mc.json'),
  createGraphQLConfig('ctp', './schemas/ctp.json'),
  createGraphQLConfig('core', './schemas/core.json'),
  createGraphQLConfig('settings', './schemas/settings.json'),
  createGraphQLConfig('proxy', './schemas/proxy.json'),
];
