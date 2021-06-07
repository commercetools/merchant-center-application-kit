---
"@commercetools-frontend/jest-preset-mc-app": minor
---

Add ability to additionally silence warnings of the `console`.

The use of the `console` is discouraged on CI. As a result any log level will log a warning and throw an error. However, some logging (e.g. from libraries) can not be avoided. To circumvent this a `silenceConsoleWarnings` can be added on the `jest-preset-mc-app.config.js`. 

In addition to be above this adds `console.config` object with `addSilencedWarning` and `addNotThrowingWarning`. Allowing to add additional silenced messages at runtime of a test.
