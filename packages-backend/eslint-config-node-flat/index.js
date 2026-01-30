/**
 * ESLint flat config (v9+) for @commercetools-backend/eslint-config-node-flat
 *
 * This package provides ESLint configuration using the new flat config format
 * introduced in ESLint v9 for Node.js backend projects. It includes support for:
 * - TypeScript
 * - Jest
 * - Node.js specific rules (eslint-plugin-n)
 * - Import ordering and validation
 * - Prettier integration
 */

const babelParser = require('@babel/eslint-parser');
const typescriptPlugin = require('@typescript-eslint/eslint-plugin');
const typescriptParser = require('@typescript-eslint/parser');
const prettierConfig = require('eslint-config-prettier');
const importPlugin = require('eslint-plugin-import');
const jestPlugin = require('eslint-plugin-jest');
const nPlugin = require('eslint-plugin-n');
const prettierPlugin = require('eslint-plugin-prettier');
const globals = require('globals');

const { statusCode, allSupportedExtensions } = require('./helpers/eslint');

/**
 * @type {import("eslint").Linter.FlatConfig[]}
 */
module.exports = [
  // Base config for all JavaScript/TypeScript files
  {
    files: ['**/*.{js,ts,cjs,mjs}'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        sourceType: 'module',
        requireConfigFile: false,
        babelOptions: {
          presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
        },
      },
      ecmaVersion: 2022,
      globals: {
        ...globals.node,
        ...globals.commonjs,
        ...globals.es2015,
        // Explicitly NOT including globals.browser
      },
    },
    plugins: {
      import: importPlugin,
      n: nPlugin,
      prettier: prettierPlugin,
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: allSupportedExtensions,
        },
      },
    },
    rules: {
      // Node.js specific rules
      'n/no-missing-import': statusCode.off,
      'n/no-unsupported-features/es-syntax': statusCode.off,

      // NOTE: The regular rule does not support do-expressions
      'no-unused-expressions': statusCode.off,

      // Import rules
      'import/extensions': [
        statusCode.error,
        {
          js: 'never',
          ts: 'never',
          mjs: 'never',
          json: 'always',
          graphql: 'always',
        },
      ],
      'import/default': statusCode.off,
      'import/first': statusCode.error,
      'import/named': statusCode.off,
      'import/namespace': statusCode.off,
      'import/no-extraneous-dependencies': statusCode.off,
      'import/no-named-as-default': statusCode.off,
      'import/no-named-as-default-member': statusCode.off,
      'import/no-unresolved': statusCode.error,

      // Prettier
      'prettier/prettier': 'error',
    },
  },

  // TypeScript files
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        warnOnUnsupportedTypeScriptVersion: true,
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
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
    rules: {
      // TypeScript's `noFallthroughCasesInSwitch` option is more robust
      'default-case': statusCode.off,
      // 'tsc' already handles this
      'no-dupe-class-members': statusCode.off,
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

      // TypeScript specific
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
  },

  // Test files
  {
    files: ['**/*.{spec,test}.{js,ts}'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    plugins: {
      jest: jestPlugin,
    },
    rules: {
      'jest/expect-expect': statusCode.off,
      'jest/no-identical-title': statusCode.warn,
      'jest/no-focused-tests': statusCode.error,

      // Allow test-specific dependencies
      'n/no-extraneous-require': [
        statusCode.error,
        {
          allowModules: ['jest-each', 'msw'],
        },
      ],

      // Jest-specific rules
      'jest/no-conditional-expect': statusCode.error,
      'jest/no-interpolation-in-snapshots': statusCode.error,
      'jest/no-jasmine-globals': statusCode.error,
      'jest/no-mocks-import': statusCode.error,
      'jest/valid-describe-callback': statusCode.error,
      'jest/valid-expect': statusCode.error,
      'jest/valid-expect-in-promise': statusCode.error,
      'jest/valid-title': statusCode.warn,
    },
  },

  // Prettier must be last to override formatting rules
  prettierConfig,
];
