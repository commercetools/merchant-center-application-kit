---
'@commercetools-frontend/mc-scripts': patch
---

Replaced `webpackbar` with webpack's own built-in `ProgressPlugin` progress bar (`progressBar: 'auto'`) in the development webpack config. `webpackbar` is unmaintained and was the reason `webpack` had been held back at 5.105.1 (see the "Held back" note this changeset previously replaced): webpack 5.109.x defers `ProgressPlugin` option-schema validation from the constructor to a later `compiler.hooks.validate` tap, and `webpackbar@5.0.2` overwrites `this.options` with its own non-schema `name`/`color`/`reporters`/`reporter` keys after calling `super()`, which that deferred validation now rejects. Dropping `webpackbar` removes the incompatibility, so `webpack` is bumped back to 5.109.2.

No default-path behavior change (`mc-scripts start`/`build` still show progress while compiling), but note for anyone who imports `createWebpackConfigForDevelopment` from `@commercetools-frontend/mc-scripts/webpack` directly and inspects/replaces the `WebpackBar` plugin instance in the returned `Configuration.plugins` array: that plugin is now a `webpack.ProgressPlugin` instance instead.
