/**
 * @type {import('stylelint').Config}
 */
module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  plugins: ['stylelint-order', 'stylelint-value-no-unknown-custom-properties'],
  rules: {
    'font-family-name-quotes': ['always-unless-keyword'],
    'function-url-quotes': 'always',
    'selector-attribute-quotes': 'always',
    'string-quotes': 'single',
    'selector-class-pattern': null,
    'selector-pseudo-class-no-unknown': [
      true,
      { ignorePseudoClasses: ['global'] },
    ],
    'order/properties-order': [['composes'], { unspecified: 'bottom' }],
    'declaration-block-no-duplicate-properties': [
      true,
      { ignoreProperties: ['composes'] },
    ],
    'property-no-unknown': [true, { ignoreProperties: ['composes'] }],
    'declaration-colon-newline-after': null,
    'rule-empty-line-before': null,
    'value-list-comma-newline-after': null,
    indentation: null,
    'selector-descendant-combinator-no-non-space': null,
    'no-descending-specificity': null,
    'no-duplicate-selectors': null,
    'no-empty-source': null,
    'declaration-empty-line-before': null,
    'no-missing-end-of-source-newline': null,
    'function-name-case': null,
    'comment-empty-line-before': null,
    'csstools/value-no-unknown-custom-properties': [
      true,
      {
        importFrom: [
          'node_modules/@commercetools-uikit/design-system/materials/custom-properties.css',
        ],
      },
    ],
    // TODO: fix them in uikit design system
    'color-function-notation': null,
    'hue-degree-notation': null,
    'number-max-precision': null,
    'alpha-value-notation': null,
  },
};
