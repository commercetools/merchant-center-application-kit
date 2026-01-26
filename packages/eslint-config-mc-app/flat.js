/**
 * TODO: This is a basic/temporary flat config implementation created to unblock CI
 * and enable the root eslint.config.js to work. This file will need further work
 * to be fully feature-complete and maintain 100% backwards compatibility with the
 * legacy index.js config.
 *
 * Current status:
 * - ✅ Basic flat config structure working
 * - ✅ Supports TypeScript, React, JSX, and test files
 * - ✅ Maintains dual export (index.js for legacy, flat.js for flat config)
 * - ⚠️  May have minor rule differences from legacy config
 * - ⚠️  Not all edge cases tested yet
 *
 * Next steps for full Phase 1 completion:
 * - Add comprehensive test coverage comparing legacy vs flat output
 * - Verify all plugin configurations match legacy exactly
 * - Test with external consumers
 * - Update documentation
 *
 * See plans/flat-config.md Phase 1 for complete migration plan.
 */

process.env.BABEL_ENV = 'production';

const babelParser = require('@babel/eslint-parser');
const typescriptPlugin = require('@typescript-eslint/eslint-plugin');
const typescriptParser = require('@typescript-eslint/parser');
const prettierConfig = require('eslint-config-prettier');
const cypressPlugin = require('eslint-plugin-cypress');
const importPlugin = require('eslint-plugin-import');
const jestPlugin = require('eslint-plugin-jest');
const jestDomPlugin = require('eslint-plugin-jest-dom');
const jsxA11yPlugin = require('eslint-plugin-jsx-a11y');
const prettierPlugin = require('eslint-plugin-prettier');
const reactPlugin = require('eslint-plugin-react');
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const testingLibraryPlugin = require('eslint-plugin-testing-library');
const globals = require('globals');

// Reuse existing helpers
const { statusCode, allSupportedExtensions } = require('./helpers/eslint');
const hasJsxRuntime = require('./helpers/has-jsx-runtime');
const { craRules } = require('./helpers/rules-presets');

/**
 * ESLint flat config format for @commercetools-frontend/eslint-config-mc-app
 * @type {import("eslint").Linter.FlatConfig[]}
 */
module.exports = [
  // Base config for all JavaScript/TypeScript files
  {
    files: ['**/*.{js,jsx,ts,tsx,cjs,mjs}'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        sourceType: 'module',
        requireConfigFile: false,
        babelOptions: {
          presets: [
            require.resolve(
              '@commercetools-frontend/babel-preset-mc-app/production'
            ),
          ],
        },
      },
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.commonjs,
        ...globals.es2015,
        ...globals.node,
      },
    },
    plugins: {
      import: importPlugin,
      'jsx-a11y': jsxA11yPlugin,
      prettier: prettierPlugin,
      cypress: cypressPlugin,
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: allSupportedExtensions,
        },
      },
    },
    rules: {
      ...craRules.base,
      // Disable React rules in base config - they'll be enabled in React file configs
      'react/forbid-foreign-prop-types': statusCode.off,
      'react/jsx-no-comment-textnodes': statusCode.off,
      'react/jsx-no-duplicate-props': statusCode.off,
      'react/jsx-no-target-blank': statusCode.off,
      'react/jsx-no-undef': statusCode.off,
      'react/jsx-pascal-case': statusCode.off,
      'react/no-danger-with-children': statusCode.off,
      'react/no-direct-mutation-state': statusCode.off,
      'react/no-is-mounted': statusCode.off,
      'react/no-typos': statusCode.off,
      'react/require-render-return': statusCode.off,
      'react/style-prop-object': statusCode.off,
      'react-hooks/exhaustive-deps': statusCode.off,
      'react-hooks/rules-of-hooks': statusCode.off,
      'no-unused-expressions': statusCode.off,
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
      'import/namespace': statusCode.off,
      'import/no-extraneous-dependencies': statusCode.off,
      'import/no-named-as-default': statusCode.off,
      'import/no-named-as-default-member': statusCode.off,
      'import/no-unresolved': statusCode.error,
      'prettier/prettier': 'error',
    },
  },

  // TypeScript files (non-React)
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        warnOnUnsupportedTypeScriptVersion: true,
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
        node: {
          extensions: allSupportedExtensions,
        },
      },
    },
    rules: {
      ...craRules.typescript,
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
    },
  },

  // React/JSX files (JavaScript)
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/jsx-uses-vars': statusCode.error,
      'react/no-deprecated': statusCode.error,
      'react/no-unused-prop-types': statusCode.error,
      ...(hasJsxRuntime() && {
        'react/jsx-uses-react': statusCode.off,
        'react/react-in-jsx-scope': statusCode.off,
      }),
      'react/no-unknown-property': [
        statusCode.error,
        {
          ignore: ['css'], // Emotion's css prop
        },
      ],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },

  // TypeScript + React files (TSX)
  {
    files: ['**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        warnOnUnsupportedTypeScriptVersion: true,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
        node: {
          extensions: allSupportedExtensions,
        },
      },
    },
    rules: {
      ...craRules.typescript,
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
      'react/jsx-uses-vars': statusCode.error,
      'react/no-deprecated': statusCode.error,
      'react/no-unused-prop-types': statusCode.off,
      'react/prop-types': statusCode.off,
      ...(hasJsxRuntime() && {
        'react/jsx-uses-react': statusCode.off,
        'react/react-in-jsx-scope': statusCode.off,
      }),
      'react/no-unknown-property': [
        statusCode.error,
        {
          ignore: ['css'],
        },
      ],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },

  // Test files (non-React)
  {
    files: ['**/*.{spec,test}.{js,ts}'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    plugins: {
      jest: jestPlugin,
      'jest-dom': jestDomPlugin,
      'testing-library': testingLibraryPlugin,
    },
    rules: {
      ...craRules.jest,
      'react/display-name': statusCode.off,
      'jest/expect-expect': statusCode.off,
      'jest/no-identical-title': statusCode.warn,
      'jest/no-focused-tests': statusCode.error,
      'testing-library/prefer-presence-queries': statusCode.error,
      'testing-library/await-async-query': statusCode.error,
      'testing-library/render-result-naming-convention': statusCode.off,
      'testing-library/prefer-screen-queries': statusCode.off,
      'testing-library/no-container': statusCode.warn,
      'testing-library/no-node-access': statusCode.warn,
    },
  },

  // Test files (React/JSX)
  {
    files: ['**/*.{spec,test}.{jsx,tsx}'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    plugins: {
      jest: jestPlugin,
      'jest-dom': jestDomPlugin,
      'testing-library': testingLibraryPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    rules: {
      ...craRules.jest,
      'react/display-name': statusCode.off,
      'jest/expect-expect': statusCode.off,
      'jest/no-identical-title': statusCode.warn,
      'jest/no-focused-tests': statusCode.error,
      'testing-library/prefer-presence-queries': statusCode.error,
      'testing-library/await-async-query': statusCode.error,
      'testing-library/render-result-naming-convention': statusCode.off,
      'testing-library/prefer-screen-queries': statusCode.off,
      'testing-library/no-container': statusCode.warn,
      'testing-library/no-node-access': statusCode.warn,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },

  // Test utility files (e.g., test-utils.tsx, test-helpers.tsx)
  // These files aren't named *.spec.* or *.test.* but contain testing code
  // and use inline eslint-disable comments for testing-library rules
  {
    files: [
      '**/test-utils/**/*.{jsx,tsx}',
      '**/*test-utils.{jsx,tsx}',
      '**/*test-helpers.{jsx,tsx}',
    ],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    plugins: {
      jest: jestPlugin,
      'jest-dom': jestDomPlugin,
      'testing-library': testingLibraryPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    rules: {
      'react/display-name': statusCode.off,
      'testing-library/render-result-naming-convention': statusCode.off,
      'testing-library/no-node-access': statusCode.warn,
      'react-hooks/exhaustive-deps': 'warn',
    },
  },

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
        ...globals.jest,
      },
    },
  },

  // Custom application config files
  {
    files: [
      '.custom-application-config.{js,cjs,mjs,ts}',
      'custom-application-config.{js,cjs,mjs,ts}',
    ],
    rules: {
      'no-template-curly-in-string': statusCode.off,
    },
  },

  // Prettier must be last to override formatting rules
  prettierConfig,
];
