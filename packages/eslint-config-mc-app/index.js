const { statusCode } = require('./helpers/eslint');
const hasJsxRuntime = require('./helpers/has-jsx-runtime');

module.exports = {
  extends: [
    // https://github.com/facebook/create-react-app/tree/master/packages/eslint-config-react-app
    'react-app',
    'react-app/jest',
    // https://github.com/cypress-io/eslint-plugin-cypress
    'plugin:cypress/recommended',
    // https://github.com/benmosher/eslint-plugin-import
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    // https://github.com/jest-community/eslint-plugin-jest
    'plugin:jest/recommended',
    // https://github.com/yannickcr/eslint-plugin-react
    'plugin:react/recommended',
    // https://github.com/testing-library/eslint-plugin-testing-library
    'plugin:testing-library/react',
    // https://github.com/prettier/prettier-eslint
    // NOTE: this should go last.
    'prettier',
  ],
  plugins: [
    // https://github.com/testing-library/eslint-plugin-jest-dom
    'jest-dom',
    // https://github.com/prettier/prettier-eslint
    'prettier',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.mjs', '.cjs'],
      },
    },
  },
  rules: {
    // NOTE: The regular rule does not support do-expressions. The equivalent rule of babel does.
    'no-unused-expressions': 0,

    // Imports
    'import/extensions': [
      statusCode.error,
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        mjs: 'never',
        json: 'always',
        svg: 'always',
        graphql: 'always',
      },
    ],
    'import/default': statusCode.off,
    'import/first': statusCode.error,
    // TODO: enable this once there is support for `import type`
    // 'import/order': statusCode.error,
    'import/namespace': statusCode.off,
    'import/no-extraneous-dependencies': statusCode.off,
    'import/no-named-as-default': statusCode.off,
    'import/no-named-as-default-member': statusCode.off,
    'import/no-unresolved': statusCode.error,

    // Jest
    'jest/expect-expect': statusCode.off,
    'jest/no-identical-title': statusCode.warn,
    'jest/no-focused-tests': statusCode.error,

    // RTL
    'testing-library/prefer-presence-queries': statusCode.error,
    'testing-library/await-async-query': statusCode.error,

    // React
    'react/jsx-uses-vars': statusCode.error,
    'react/no-deprecated': statusCode.error,
    'react/no-unused-prop-types': statusCode.error,
    ...(hasJsxRuntime() && {
      'react/jsx-uses-react': statusCode.off,
      'react/react-in-jsx-scope': statusCode.off,
    }),
  },
  overrides: [
    {
      files: ['*.{spec,test}.*'],
      rules: {
        'react/display-name': statusCode.off,
      },
    },
    {
      files: ['**/*.ts?(x)'],
      extends: ['prettier'],
      rules: {
        // TypeScript
        '@typescript-eslint/ban-types': statusCode.off,
        '@typescript-eslint/naming-convention': statusCode.off,
        '@typescript-eslint/consistent-type-definitions': statusCode.off,
        '@typescript-eslint/no-explicit-any': statusCode.error,
        '@typescript-eslint/no-use-before-define': [
          statusCode.error,
          { functions: false },
        ],
        '@typescript-eslint/no-var-requires': statusCode.off,
        '@typescript-eslint/unbound-method': statusCode.off,
        '@typescript-eslint/ban-ts-comment': statusCode.off,
        '@typescript-eslint/explicit-function-return-type': statusCode.off,
        '@typescript-eslint/explicit-member-accessibility': [
          2,
          { accessibility: 'no-public' },
        ],
        '@typescript-eslint/no-require-imports': statusCode.off,
        '@typescript-eslint/promise-function-async': statusCode.off,

        // React
        'react/no-unused-prop-types': statusCode.off,
        'react/prop-types': statusCode.off,
      },
      settings: {
        react: {
          version: 'detect',
        },
        'import/parsers': {
          '@typescript-eslint/parser': ['.js', '.jsx', '.ts', '.tsx'],
        },
        'import/resolver': {
          'eslint-import-resolver-typescript': true,
          typescript: {},
          node: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
          },
        },
      },
    },
  ],
};
