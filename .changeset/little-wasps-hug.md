---
'@commercetools-frontend/mc-scripts': minor
---

Migrate CLI to TypeScript.

Internally, the CLI now uses [cac](https://github.com/cacjs/cac) to handle CLI commands and options.

# Deprecated entry points

Importing the function `createPostcssConfig` from the main entry point `@commercetools-frontend/mc-scripts` is now deprecated. Use the entry point `@commercetools-frontend/mc-scripts/postcss` instead.

```diff
const {
  createPostcssConfig,
-} = require('@commercetools-frontend/mc-scripts');
+} = require('@commercetools-frontend/mc-scripts/postcss');
```

Importing the functions `createWebpackConfigForDevelopment` and `createWebpackConfigForProduction` from the main entry point `@commercetools-frontend/mc-scripts` is now deprecated. Use the entry point `@commercetools-frontend/mc-scripts/webpack` instead.

```diff
const {
  createWebpackConfigForDevelopment,
  createWebpackConfigForProduction,
-} = require('@commercetools-frontend/mc-scripts');
+} = require('@commercetools-frontend/mc-scripts/webpack');
```
