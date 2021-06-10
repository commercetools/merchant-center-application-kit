---
"@commercetools-frontend/mc-scripts": minor
---

Adds the ability to explicitly disable core-js for `mc-scripts` and the webpack configs

Some environments or build targets might not require core-js. In order to opt-out of it you can specify a `disableCoreJs` option.
