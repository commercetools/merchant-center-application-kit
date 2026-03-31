---
'@commercetools-frontend/eslint-config-mc-app': minor
---

Add bundled `no-direct-currency-formatting` rule via the `@commercetools-frontend/mc-app` inline plugin.

The rule disallows direct currency formatting through `intl.formatNumber`, `intl.formatCurrency`, or `new Intl.NumberFormat` with a `currency` option or `style: 'currency'`, enforcing the use of a shared wrapper instead.

To enable it in your project:

```js
// eslint.config.js
import mcAppConfig from '@commercetools-frontend/eslint-config-mc-app';

export default [
  ...mcAppConfig,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      '@commercetools-frontend/mc-app/no-direct-currency-formatting': [
        'error',
        {
          allowedWrapperPaths: [
            'src/utils/money.js', // path to your shared wrapper
          ],
        },
      ],
    },
  },
];
```
