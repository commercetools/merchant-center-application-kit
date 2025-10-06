process.env.ENABLE_NEW_JSX_TRANSFORM = 'true';

/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  extends: ['@commercetools-frontend/eslint-config-mc-app'],
  plugins: ['@graphql-eslint'],
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
      parser: '@graphql-eslint/eslint-plugin',
      parserOptions: {
        graphQLConfig: {
          schema: './schemas/mc.json',
        },
      },
      rules: {
        '@graphql-eslint/known-type-names': 'error',
        '@graphql-eslint/known-argument-names': 'error',
        '@graphql-eslint/known-directives': 'error',
        '@graphql-eslint/scalar-leafs': 'error',
      },
    },
    {
      files: ['**/*.ctp.graphql'],
      parser: '@graphql-eslint/eslint-plugin',
      parserOptions: {
        graphQLConfig: {
          schema: './schemas/ctp.json',
        },
      },
      rules: {
        '@graphql-eslint/known-type-names': 'error',
        '@graphql-eslint/known-argument-names': 'error',
        '@graphql-eslint/known-directives': 'error',
        '@graphql-eslint/scalar-leafs': 'error',
      },
    },
    {
      files: ['**/*.core.graphql'],
      parser: '@graphql-eslint/eslint-plugin',
      parserOptions: {
        graphQLConfig: {
          schema: './schemas/core.json',
        },
      },
      rules: {
        '@graphql-eslint/known-type-names': 'error',
        '@graphql-eslint/known-argument-names': 'error',
        '@graphql-eslint/known-directives': 'error',
        '@graphql-eslint/scalar-leafs': 'error',
      },
    },
    {
      files: ['**/*.settings.graphql'],
      parser: '@graphql-eslint/eslint-plugin',
      parserOptions: {
        graphQLConfig: {
          schema: './schemas/settings.json',
        },
      },
      rules: {
        '@graphql-eslint/known-type-names': 'error',
        '@graphql-eslint/known-argument-names': 'error',
        '@graphql-eslint/known-directives': 'error',
        '@graphql-eslint/scalar-leafs': 'error',
      },
    },
    {
      files: ['**/*.proxy.graphql'],
      parser: '@graphql-eslint/eslint-plugin',
      parserOptions: {
        graphQLConfig: {
          schema: './schemas/proxy.json',
        },
      },
      rules: {
        '@graphql-eslint/known-type-names': 'error',
        '@graphql-eslint/known-argument-names': 'error',
        '@graphql-eslint/known-directives': 'error',
        '@graphql-eslint/scalar-leafs': 'error',
      },
    },
  ],
};
