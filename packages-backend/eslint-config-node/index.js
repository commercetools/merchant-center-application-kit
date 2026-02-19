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
 * @type {import("eslint").Linter.Config[]}
 */
module.exports = [
  // Base configuration for all JS/TS files
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      parser: babelParser,
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
      globals: {
        ...globals.commonjs,
        ...globals.es2015,
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      import: importPlugin,
      jest: jestPlugin,
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
      // Nodejs
      'n/no-missing-import': statusCode.off,
      'n/no-unsupported-features/es-syntax': statusCode.off,

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
  },

  // TypeScript-specific configuration
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptParser,
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
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },
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

  // Test files configuration
  {
    files: ['*.{spec,test}.*'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      'n/no-extraneous-require': [
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

  // Prettier configuration (must be last)
  prettierConfig,
];
