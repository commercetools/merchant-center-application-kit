---
"@commercetools-frontend/babel-preset-mc-app": patch
---

Set Node.js version to `current` in the `babel-preset-mc-app` for `babel-preset-env`

The previous version was hard-coded to `8` while `current` whill always use the version of the running process.
