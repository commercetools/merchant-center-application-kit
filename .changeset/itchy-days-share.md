---
"@commercetools-frontend/mc-scripts": minor
---

Adds a `webpack` loader to compile i18n messages when building

When setting `ENABLE_WEBPACK_LOADER_I18N_MESSAGE_COMPILATION` to `true` on the `process.env` a `i18n-message-compilation-loader` will transform any file matching `/i18n\/data\/.*\.json$/` using the `compile` function from `@formatjs/cli-lib` when building.
