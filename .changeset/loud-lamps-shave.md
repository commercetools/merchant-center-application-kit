---
"@commercetools-frontend/jest-preset-mc-app": patch
---

Fix `jest-preset-mc-app` to use default v16 enzyme adapter

In a recent release we prematurely migrated to a community version of the v17 adapter of enzyme. We noticed that this adapter can not be used as easily as we have hoped.

As a result, we revert to using the default v16 adapter while offering a configuration option to use any adapter needed.

In a `jest-preset-mc-app.config.js` file you can configure the adapter as follows:

```js
const EnzymeAdapter = require('@wojtekmaj/enzyme-adapter-react-17');

module.exports = {
  EnzymeAdapter,
};
```
