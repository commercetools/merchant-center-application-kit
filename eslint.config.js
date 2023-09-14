process.env.ENABLE_NEW_JSX_TRANSFORM = 'true';

const { FlatCompat } = require('@eslint/eslintrc');
const graphqlPlugin = require('eslint-plugin-graphql');

// To be able to load legacy ESLint configurations and plugins (https://github.com/eslint/eslintrc)
// TODO: remove once the new flat format is fully supported.
const compat = new FlatCompat();

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
  ...compat.extends('@commercetools-frontend/eslint-config-mc-app'),
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
  {
    files: ['**/*.mc.graphql'],
    plugins: {
      graphql: graphqlPlugin,
    },
    rules: {
      'graphql/template-strings': [
        'error',
        {
          env: 'literal',
          schemaJson: require('./schemas/mc.json'),
        },
      ],
    },
  },
  {
    files: ['**/*.ctp.graphql'],
    plugins: {
      graphql: graphqlPlugin,
    },
    rules: {
      'graphql/template-strings': [
        'error',
        {
          env: 'literal',
          schemaJson: require('./schemas/ctp.json'),
        },
      ],
    },
  },
  {
    files: ['**/*.core.graphql'],
    plugins: {
      graphql: graphqlPlugin,
    },
    rules: {
      'graphql/template-strings': [
        'error',
        {
          env: 'literal',
          schemaJson: require('./schemas/core.json'),
        },
      ],
    },
  },
  {
    files: ['**/*.settings.graphql'],
    plugins: {
      graphql: graphqlPlugin,
    },
    rules: {
      'graphql/template-strings': [
        'error',
        {
          env: 'literal',
          schemaJson: require('./schemas/settings.json'),
        },
      ],
    },
  },
  {
    files: ['**/*.proxy.graphql'],
    plugins: {
      graphql: graphqlPlugin,
    },
    rules: {
      'graphql/template-strings': [
        'error',
        {
          env: 'literal',
          schemaJson: require('./schemas/proxy.json'),
        },
      ],
    },
  },
];
