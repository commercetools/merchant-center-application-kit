process.env.ENABLE_NEW_JSX_TRANSFORM = 'true';

const graphqlPlugin = require('@graphql-eslint/eslint-plugin');
const mcAppConfig = require('@commercetools-frontend/eslint-config-mc-app');

/**
 * Helper to create GraphQL config for different schema types
 * @param {string} schemaType - The schema type (mc, ctp, core, settings, proxy)
 * @param {string} schemaPath - Path to the schema JSON file
 * @returns {import("eslint").Linter.FlatConfig}
 */
function createGraphQLConfig(schemaType, schemaPath) {
  return {
    files: [`**/*.${schemaType}.graphql`],
    languageOptions: {
      parser: graphqlPlugin,
      parserOptions: {
        graphQLConfig: {
          schema: schemaPath,
        },
      },
    },
    plugins: {
      '@graphql-eslint': graphqlPlugin,
    },
    rules: {
      '@graphql-eslint/known-type-names': 'error',
      '@graphql-eslint/known-argument-names': 'error',
      '@graphql-eslint/known-directives': 'error',
      '@graphql-eslint/scalar-leafs': 'error',
    },
  };
}

/**
 * @type {import("eslint").Linter.FlatConfig[]}
 */
module.exports = [
  // Global ignores (equivalent to .eslintignore)
  {
    ignores: [
      '_translations/',
      'dist/',
      'build/',
      'coverage/',
      'node_modules/',
      '**/node_modules/',
      'packages/application-shell/test-utils/index.js',
      'packages/application-shell-connectors/test-utils/index.js',
      'packages/sdk/test-utils/index.js',
      '**/.cache/',
    ],
  },

  // Extend the base mc-app config
  ...mcAppConfig,

  // Override base config with custom rules
  {
    files: ['**/*.{js,jsx,ts,tsx,cjs,mjs}'],
    plugins: {
      '@graphql-eslint': graphqlPlugin,
    },
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

  // GraphQL configs for different schema types
  createGraphQLConfig('mc', './schemas/mc.json'),
  createGraphQLConfig('ctp', './schemas/ctp.json'),
  createGraphQLConfig('core', './schemas/core.json'),
  createGraphQLConfig('settings', './schemas/settings.json'),
  createGraphQLConfig('proxy', './schemas/proxy.json'),

  // Jest setup/config files (need jest globals but aren't named *.test.* or *.spec.*)
  {
    files: [
      '**/jest-preset-mc-app/**/*.js',
      '**/setupTests.js',
      '**/setup-test-framework*.js',
      '**/fail-on-console.js',
    ],
    languageOptions: {
      globals: {
        ...require('globals').jest,
      },
    },
  },
];
