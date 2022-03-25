/**
 * This file contains rules copied from other libraries, to make it easier to differentiate with
 * our own rules and to better maintain them.
 */

// The ESLint browser environment defines all browser globals as valid,
// even though most people don't know some of them exist (e.g. `name` or `status`).
// This is dangerous as it hides accidentally undefined variables.
// We deny the globals that we deem potentially confusing.
// To use them, explicitly reference them, e.g. `window.name` or `window.status`.
const restrictedGlobals = require('confusing-browser-globals');

const { statusCode } = require('./eslint');

// NOTE: When adding rules here, you need to make sure they are compatible with
// `typescript-eslint`, as some rules such as `no-array-constructor` aren't compatible.
// https://github.com/facebook/create-react-app/blob/main/packages/eslint-config-react-app/index.js
const craRules = {
  base: {
    // http://eslint.org/docs/rules/
    'array-callback-return': statusCode.warn,
    'default-case': [statusCode.warn, { commentPattern: '^no default$' }],
    'dot-location': [statusCode.warn, 'property'],
    eqeqeq: [statusCode.warn, 'smart'],
    'new-parens': statusCode.warn,
    'no-array-constructor': statusCode.warn,
    'no-caller': statusCode.warn,
    'no-cond-assign': [statusCode.warn, 'except-parens'],
    'no-const-assign': statusCode.warn,
    'no-control-regex': statusCode.warn,
    'no-delete-var': statusCode.warn,
    'no-dupe-args': statusCode.warn,
    'no-dupe-class-members': statusCode.warn,
    'no-dupe-keys': statusCode.warn,
    'no-duplicate-case': statusCode.warn,
    'no-empty-character-class': statusCode.warn,
    'no-empty-pattern': statusCode.warn,
    'no-eval': statusCode.warn,
    'no-ex-assign': statusCode.warn,
    'no-extend-native': statusCode.warn,
    'no-extra-bind': statusCode.warn,
    'no-extra-label': statusCode.warn,
    'no-fallthrough': statusCode.warn,
    'no-func-assign': statusCode.warn,
    'no-implied-eval': statusCode.warn,
    'no-invalid-regexp': statusCode.warn,
    'no-iterator': statusCode.warn,
    'no-label-var': statusCode.warn,
    'no-labels': [statusCode.warn, { allowLoop: true, allowSwitch: false }],
    'no-lone-blocks': statusCode.warn,
    'no-loop-func': statusCode.warn,
    'no-mixed-operators': [
      statusCode.warn,
      {
        groups: [
          ['&', '|', '^', '~', '<<', '>>', '>>>'],
          ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
          ['&&', '||'],
          ['in', 'instanceof'],
        ],
        allowSamePrecedence: false,
      },
    ],
    'no-multi-str': statusCode.warn,
    'no-global-assign': statusCode.warn,
    'no-unsafe-negation': statusCode.warn,
    'no-new-func': statusCode.warn,
    'no-new-object': statusCode.warn,
    'no-new-symbol': statusCode.warn,
    'no-new-wrappers': statusCode.warn,
    'no-obj-calls': statusCode.warn,
    'no-octal': statusCode.warn,
    'no-octal-escape': statusCode.warn,
    'no-redeclare': statusCode.warn,
    'no-regex-spaces': statusCode.warn,
    'no-restricted-syntax': [statusCode.warn, 'WithStatement'],
    'no-script-url': statusCode.warn,
    'no-self-assign': statusCode.warn,
    'no-self-compare': statusCode.warn,
    'no-sequences': statusCode.warn,
    'no-shadow-restricted-names': statusCode.warn,
    'no-sparse-arrays': statusCode.warn,
    'no-template-curly-in-string': statusCode.warn,
    'no-this-before-super': statusCode.warn,
    'no-throw-literal': statusCode.warn,
    'no-undef': statusCode.error,
    'no-restricted-globals': [statusCode.error].concat(restrictedGlobals),
    'no-unreachable': statusCode.warn,
    'no-unused-expressions': [
      statusCode.error,
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
      },
    ],
    'no-unused-labels': statusCode.warn,
    'no-unused-vars': [
      statusCode.warn,
      {
        args: 'none',
        ignoreRestSiblings: true,
      },
    ],
    'no-use-before-define': [
      statusCode.warn,
      {
        functions: false,
        classes: false,
        variables: false,
      },
    ],
    'no-useless-computed-key': statusCode.warn,
    'no-useless-concat': statusCode.warn,
    'no-useless-constructor': statusCode.warn,
    'no-useless-escape': statusCode.warn,
    'no-useless-rename': [
      statusCode.warn,
      {
        ignoreDestructuring: false,
        ignoreImport: false,
        ignoreExport: false,
      },
    ],
    'no-with': statusCode.warn,
    'no-whitespace-before-property': statusCode.warn,
    'react-hooks/exhaustive-deps': statusCode.warn,
    'require-yield': statusCode.warn,
    'rest-spread-spacing': [statusCode.warn, 'never'],
    strict: [statusCode.warn, 'never'],
    'unicode-bom': [statusCode.warn, 'never'],
    'use-isnan': statusCode.warn,
    'valid-typeof': statusCode.warn,
    'no-restricted-properties': [
      statusCode.error,
      {
        object: 'require',
        property: 'ensure',
        message:
          'Please use import() instead. More info: https://facebook.github.io/create-react-app/docs/code-splitting',
      },
      {
        object: 'System',
        property: 'import',
        message:
          'Please use import() instead. More info: https://facebook.github.io/create-react-app/docs/code-splitting',
      },
    ],
    'getter-return': statusCode.warn,

    // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules
    'import/first': statusCode.error,
    'import/no-amd': statusCode.error,
    'import/no-anonymous-default-export': statusCode.warn,
    'import/no-webpack-loader-syntax': statusCode.error,

    // https://github.com/yannickcr/eslint-plugin-react/tree/master/docs/rules
    'react/forbid-foreign-prop-types': [
      statusCode.warn,
      { allowInPropTypes: true },
    ],
    'react/jsx-no-comment-textnodes': statusCode.warn,
    'react/jsx-no-duplicate-props': statusCode.warn,
    'react/jsx-no-target-blank': statusCode.warn,
    'react/jsx-no-undef': statusCode.error,
    'react/jsx-pascal-case': [
      statusCode.warn,
      {
        allowAllCaps: true,
        ignore: [],
      },
    ],
    'react/no-danger-with-children': statusCode.warn,
    // Disabled because of undesirable warnings
    // See https://github.com/facebook/create-react-app/issues/5204 for
    // blockers until its re-enabled
    // 'react/no-deprecated': statusCode.warn,
    'react/no-direct-mutation-state': statusCode.warn,
    'react/no-is-mounted': statusCode.warn,
    'react/no-typos': statusCode.error,
    'react/require-render-return': statusCode.error,
    'react/style-prop-object': statusCode.warn,

    // https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules
    'jsx-a11y/alt-text': statusCode.warn,
    'jsx-a11y/anchor-has-content': statusCode.warn,
    'jsx-a11y/anchor-is-valid': [
      statusCode.warn,
      {
        aspects: ['noHref', 'invalidHref'],
      },
    ],
    'jsx-a11y/aria-activedescendant-has-tabindex': statusCode.warn,
    'jsx-a11y/aria-props': statusCode.warn,
    'jsx-a11y/aria-proptypes': statusCode.warn,
    'jsx-a11y/aria-role': [statusCode.warn, { ignoreNonDOM: true }],
    'jsx-a11y/aria-unsupported-elements': statusCode.warn,
    'jsx-a11y/heading-has-content': statusCode.warn,
    'jsx-a11y/iframe-has-title': statusCode.warn,
    'jsx-a11y/img-redundant-alt': statusCode.warn,
    'jsx-a11y/no-access-key': statusCode.warn,
    'jsx-a11y/no-distracting-elements': statusCode.warn,
    'jsx-a11y/no-redundant-roles': statusCode.warn,
    'jsx-a11y/role-has-required-aria-props': statusCode.warn,
    'jsx-a11y/role-supports-aria-props': statusCode.warn,
    'jsx-a11y/scope': statusCode.warn,

    // https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks
    'react-hooks/rules-of-hooks': statusCode.error,
  },

  typescript: {
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
      statusCode.warn,
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
  },

  jest: {
    // https://github.com/jest-community/eslint-plugin-jest
    'jest/no-conditional-expect': statusCode.error,
    'jest/no-identical-title': statusCode.error,
    'jest/no-interpolation-in-snapshots': statusCode.error,
    'jest/no-jasmine-globals': statusCode.error,
    'jest/no-jest-import': statusCode.error,
    'jest/no-mocks-import': statusCode.error,
    'jest/valid-describe-callback': statusCode.error,
    'jest/valid-expect': statusCode.error,
    'jest/valid-expect-in-promise': statusCode.error,
    'jest/valid-title': statusCode.warn,

    // https://github.com/testing-library/eslint-plugin-testing-library
    'testing-library/await-async-query': statusCode.error,
    'testing-library/await-async-utils': statusCode.error,
    'testing-library/no-await-sync-query': statusCode.error,
    'testing-library/no-container': statusCode.error,
    'testing-library/no-debugging-utils': statusCode.error,
    'testing-library/no-dom-import': [statusCode.error, 'react'],
    'testing-library/no-node-access': statusCode.error,
    'testing-library/no-promise-in-fire-event': statusCode.error,
    'testing-library/no-render-in-setup': statusCode.error,
    'testing-library/no-unnecessary-act': statusCode.error,
    'testing-library/no-wait-for-empty-callback': statusCode.error,
    'testing-library/no-wait-for-multiple-assertions': statusCode.error,
    'testing-library/no-wait-for-side-effects': statusCode.error,
    'testing-library/no-wait-for-snapshot': statusCode.error,
    'testing-library/prefer-find-by': statusCode.error,
    'testing-library/prefer-presence-queries': statusCode.error,
    'testing-library/prefer-query-by-disappearance': statusCode.error,
    'testing-library/prefer-screen-queries': statusCode.error,
    'testing-library/render-result-naming-convention': statusCode.error,
  },
};

exports.craRules = craRules;
