---
'@commercetools-frontend/mc-scripts': minor
'@commercetools-local/visual-testing-app': minor
---

Improve the Webpack configuration of `mc-scripts`.

If you are using the `createWebpackConfigForDevelopment` and `createWebpackConfigForProduction` functions, the following options are now optional:

- `distPath`: it defaults to the `./dist` folder.
- `entryPoint`: it defaults to the file`./src/index`, with the file extension being one of `js | jsx | ts | tsx`.
- `sourceFolders`: it defaults to the folders `[./src]`.

> All paths are relative to the Custom Application folder.

Additionally, there is a new option that can be used to enhance the Postcss configuration:

- `postcssOptions`
- `postcssOptions.postcssImportPaths`: a list of paths where to look for files used by the `@import` statements.
- `postcssOptions.postcssCustomMediaPaths`: a list of paths where to look for files with custom media queries.
- `postcssOptions.postcssCustomPropertiesPaths`: a list of paths where to look for files with custom properties.
- `postcssOptions.postcssColorModPaths`: a list of paths where to look for files with color-mod properties.

Furthermore, the `postcss.config.js` file that was shipped with the `mc-scripts` package has been removed in favor of the factory function `createPostcssConfig`, which accepts the same `postcssOptions` described above.

In case you have your own `postcss.config.js` file in the root of your repository, you can use the `createPostcssConfig` function to have a pre-configured setup.

```diff
# postcss.config.js

-const postcssConfig = require('@commercetools-frontend/mc-scripts/postcss.config.js');
+const { createPostcssConfig } = require('@commercetools-frontend/mc-scripts');

-module.exports = postcssConfig;
+module.exports = createPostcssConfig();
```
