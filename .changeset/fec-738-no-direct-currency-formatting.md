---
'@commercetools-frontend/eslint-config-mc-app': minor
---

Add bundled `no-direct-currency-formatting` rule via the `@commercetools-frontend/eslint-config-mc-app/rules` inline plugin.

This rule disallows direct currency formatting through `intl.formatNumber`, `intl.formatCurrency`, `new Intl.NumberFormat` when using a `currency` option or `style: 'currency'`, and `<FormattedNumber />` from `react-intl`.

Use a shared currency formatting wrapper instead, and allowlist that wrapper path if needed.

## How to update

Enable the bundled rule in your project config:

```js
// eslint.config.js
import mcAppConfig from '@commercetools-frontend/eslint-config-mc-app';

export default [
  ...mcAppConfig,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      '@commercetools-frontend/eslint-config-mc-app/rules/no-direct-currency-formatting':
        [
          'error',
          {
            allowedWrapperPaths: [
              'src/utils/money.js', // path to your shared wrapper implementation
            ],
          },
        ],
    },
  },
];
```

If you need to customize the wrapper allowlist, pass `allowedWrapperPaths` as shown above.

## Why

Direct currency formatting is hard to standardize across applications and can drift in behavior over time.
Enforcing a shared wrapper keeps formatting logic consistent, testable, and centrally maintainable.
