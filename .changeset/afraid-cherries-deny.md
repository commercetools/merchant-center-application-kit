---
'@commercetools-frontend/mc-scripts': minor
---

Adds a `vite` plugin to compile i18n messages when building

When both `ENABLE_EXPERIMENTAL_VITE_BUNDLER` and `ENABLE_I18N_MESSAGE_COMPILATION` are set to `true` on the `process.env`, `vite-plugin-i18n-message-compilation` will transform any file matching `**/i18n/data/*.json` using the `compile` function from `@formatjs/cli-lib` when building.

Previously added `ENABLE_WEBPACK_LOADER_I18N_MESSAGE_COMPILATION` has been renamed to `ENABLE_I18N_MESSAGE_COMPILATION` for consistency.
