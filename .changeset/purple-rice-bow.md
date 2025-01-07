---
'@commercetools-frontend/babel-preset-mc-app': minor
'@commercetools-frontend/mc-scripts': minor
---

Add `babel-plugin-formatjs` to avoid bloating bundles with useless data from `formatjs` messages (`description`, `defaultMessage` props). Opt-in webpack toggle flags:

- i18nAst: pre-parse defaultMessage into AST for faster runtime perf
- i18nRemoveDefaultMessage: remove defaultMessage field in generated js after extraction

To set webpack toggle flags you can modify your `webpack.config.prod.cjs` as follows:

```
const {
  createWebpackConfigForDevelopment,
} = require('@commercetools-frontend/mc-scripts/webpack');
const { sourceFolders } = require('../../mc-apps.config');

const config = createWebpackConfigForProduction({
  sourceFolders,
  toggleFlags: {
    i18nRemoveDefaultMessage: true,
  },
});

module.exports = config;
```
