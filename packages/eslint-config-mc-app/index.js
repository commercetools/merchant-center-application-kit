process.env.BABEL_ENV = 'production';

// This is a workaround for https://github.com/eslint/eslint/issues/3458
require('@rushstack/eslint-patch/modern-module-resolution');

const { statusCode, allSupportedExtensions } = require('./helpers/eslint');
const hasJsxRuntime = require('./helpers/has-jsx-runtime');

/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  parserOptions: {
    babelOptions: {
      presets: [
        require.resolve(
          '@commercetools-frontend/babel-preset-mc-app/production'
        ),
      ],
    },
  },
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
  rules: {
    // NOTE: The regular rule does not support do-expressions. The equivalent rule of babel does.
    'no-unused-expressions': statusCode.off,

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
    // Enabling these would be a breaking change to the config
    'testing-library/render-result-naming-convention': statusCode.off,
    'testing-library/prefer-screen-queries': statusCode.off,
    'testing-library/no-container': statusCode.warn,

    // React
    'react/jsx-uses-vars': statusCode.error,
    'react/no-deprecated': statusCode.error,
    'react/no-unused-prop-types': statusCode.error,
    ...(hasJsxRuntime() && {
      'react/jsx-uses-react': statusCode.off,
      'react/react-in-jsx-scope': statusCode.off,
    }),
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: allSupportedExtensions,
      },
    },
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
          statusCode.error,
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
            extensions: allSupportedExtensions,
          },
        },
      },
    },
    {
      files: [
        '.custom-application-config.{js,cjs,mjs,ts}',
        'custom-application-config.{js,cjs,mjs,ts}',
      ],
      rules: {
        'no-template-curly-in-string': statusCode.off,
      },
    },
  ],
};
