// This is a workaround for https://github.com/eslint/eslint/issues/3458
require('@rushstack/eslint-patch/modern-module-resolution');

const { statusCode, allSupportedExtensions } = require('./helpers/eslint');

/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  root: true,

  parser: '@babel/eslint-parser',

  parserOptions: {
    sourceType: 'module',
    requireConfigFile: false,
    /**
     * @type {import('@babel/core').TransformOptions}
     */
    babelOptions: {
      presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
    },
  },

  env: {
    browser: false,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },

  extends: [
    'eslint:recommended',
    // https://github.com/mysticatea/eslint-plugin-n
    'plugin:n/recommended',
    // https://github.com/benmosher/eslint-plugin-import
    'plugin:import/errors',
    'plugin:import/warnings',
    // https://github.com/jest-community/eslint-plugin-jest
    'plugin:jest/recommended',
    // NOTE: this should go last.
    'prettier',
  ],

  plugins: [
    // https://github.com/import-js/eslint-plugin-import
    'import',
    // https://github.com/jest-community/eslint-plugin-jest
    'jest',
    // https://github.com/prettier/prettier-eslint
    'prettier',
  ],

  settings: {
    'import/resolver': {
      node: {
        extensions: allSupportedExtensions,
      },
    },
  },

  rules: {
    // Nodejs
    'node/no-missing-import': statusCode.off,
    'node/no-unsupported-features/es-syntax': statusCode.off,

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
    'import/named': statusCode.off,
    'import/namespace': statusCode.off,
    'import/no-extraneous-dependencies': statusCode.off,
    'import/no-named-as-default': statusCode.off,
    'import/no-named-as-default-member': statusCode.off,
    'import/no-unresolved': statusCode.error,

    // Jest
    'jest/expect-expect': statusCode.off,
    'jest/no-identical-title': statusCode.warn,
    'jest/no-focused-tests': statusCode.error,
  },

  overrides: [
    {
      files: ['*.{spec,test}.*'],
      env: {
        'jest/globals': true,
      },
      rules: {
        'node/no-extraneous-require': [
          statusCode.error,
          {
            allowModules: ['jest-each', 'msw'],
          },
        ],
        // https://github.com/jest-community/eslint-plugin-jest
        'jest/no-conditional-expect': statusCode.error,
        'jest/no-identical-title': statusCode.error,
        'jest/no-interpolation-in-snapshots': statusCode.error,
        'jest/no-jasmine-globals': statusCode.error,
        'jest/no-mocks-import': statusCode.error,
        'jest/valid-describe-callback': statusCode.error,
        'jest/valid-expect': statusCode.error,
        'jest/valid-expect-in-promise': statusCode.error,
        'jest/valid-title': statusCode.warn,
      },
    },
    {
      files: ['**/*.ts?(x)'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        // typescript-eslint specific options
        warnOnUnsupportedTypeScriptVersion: true,
        /**
         * @type {import('@babel/core').TransformOptions}
         */
        babelOptions: {
          presets: [
            ['@babel/preset-env', { targets: { node: 'current' } }],
            ['@babel/preset-typescript'],
          ],
        },
      },
      plugins: ['@typescript-eslint'],
      rules: {
        // TypeScript's `noFallthroughCasesInSwitch` option is more robust (#6906)
        'default-case': statusCode.off,
        // 'tsc' already handles this (https://github.com/typescript-eslint/typescript-eslint/issues/291)
        'no-dupe-class-members': statusCode.off,
        // 'tsc' already handles this (https://github.com/typescript-eslint/typescript-eslint/issues/477)
        'no-undef': statusCode.off,

        // Add TypeScript specific rules (and turn off ESLint equivalents)
        '@typescript-eslint/consistent-type-assertions': statusCode.warn,
        'no-array-constructor': statusCode.off,
        '@typescript-eslint/no-array-constructor': statusCode.warn,
        'no-redeclare': statusCode.off,
        '@typescript-eslint/no-redeclare': statusCode.warn,
        'no-use-before-define': statusCode.off,
        '@typescript-eslint/no-use-before-define': [
          statusCode.error,
          {
            functions: false,
            classes: false,
            variables: false,
            typedefs: false,
          },
        ],
        'no-unused-expressions': statusCode.off,
        '@typescript-eslint/no-unused-expressions': [
          statusCode.error,
          {
            allowShortCircuit: true,
            allowTernary: true,
            allowTaggedTemplates: true,
          },
        ],
        'no-unused-vars': statusCode.off,
        '@typescript-eslint/no-unused-vars': [
          statusCode.warn,
          {
            args: 'none',
            ignoreRestSiblings: true,
          },
        ],
        'no-useless-constructor': statusCode.off,
        '@typescript-eslint/no-useless-constructor': statusCode.warn,

        // TypeScript
        '@typescript-eslint/ban-types': statusCode.off,
        '@typescript-eslint/naming-convention': statusCode.off,
        '@typescript-eslint/consistent-type-definitions': statusCode.off,
        '@typescript-eslint/no-explicit-any': statusCode.error,
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
      },
      settings: {
        'import/parsers': {
          '@typescript-eslint/parser': allSupportedExtensions,
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
  ],
};
