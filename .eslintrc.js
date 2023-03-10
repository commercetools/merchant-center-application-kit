process.env.ENABLE_NEW_JSX_TRANSFORM = 'true';

/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  extends: ['@commercetools-frontend/eslint-config-mc-app'],
  plugins: ['graphql'],
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
  overrides: [
    {
      files: ['**/*.mc.graphql'],
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
  ],
};
