---
"@commercetools-frontend/jest-preset-mc-app": minor
---

Add a `babelConfig` to the `jest-preset-mc-app` `cosmiconfig`.

To use it create a `jest-preset-mc-app.config.js` in the root of your project and e.g. add a:

```js
module.exports = {
  babelConfig: {
    disableCoreJs: true,
  },
};
```
