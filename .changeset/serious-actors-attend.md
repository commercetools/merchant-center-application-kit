---
'@commercetools-frontend/jest-preset-mc-app': major
---

We [strongly recommend and believe](https://docs.commercetools.com/custom-applications/development/testing) to use React Testing Library for testing your Custom Application and therefore we are finally dropping support for `Enzyme`.

You can still use Enzyme as an opt-in preset following the instructions below:

### Enzyme 16

1. Install the necessary dependencies:

```
yarn add \
  @commercetools/enzyme-extensions \
  @commercetools/jest-enzyme-matchers \
  enzyme \
  enzyme-adapter-react-16 \
  enzyme-matchers \
  enzyme-to-json \
  jest-enzyme
```

2. In your Jest config, instead of importing the preset `@commercetools-frontend/jest-preset-mc-app` you need to use the helper function `@commercetools-frontend/jest-preset-mc-app/enzyme/apply-jest-preset-with-enzyme.js` to merge one of the main presets with the opt-in Enzyme setup.

For example:

```js
const jestPreset = require('@commercetools-frontend/jest-preset-mc-app');
const applyJestPresetWithEnzyme = require('@commercetools-frontend/jest-preset-mc-app/enzyme/apply-jest-preset-with-enzyme');

module.exports = {
  ...applyJestPresetWithEnzyme({
    enzymeAdapterVersion: 16,
    jestPreset,
  }),
};
```

Similarly, you can use the `@commercetools-frontend/jest-preset-mc-app/jest-preset-for-typescript` instead of the `@commercetools-frontend/jest-preset-mc-app`.

### Enzyme 17

1. Install the necessary dependencies:

```
yarn add \
  @commercetools/enzyme-extensions \
  @commercetools/jest-enzyme-matchers \
  @wojtekmaj/enzyme-adapter-react-17 \
  enzyme \
  enzyme-matchers \
  enzyme-to-json \
  jest-enzyme
```

> NOTE that the `@wojtekmaj/enzyme-adapter-react-17` is not the official supported package by Enzyme. Follow the progress on [this PR](https://github.com/enzymejs/enzyme/pull/2430) to know when the official adapter is going to be released.

2. In your Jest config, instead of importing the preset `@commercetools-frontend/jest-preset-mc-app` you need to use the helper function `@commercetools-frontend/jest-preset-mc-app/enzyme/apply-jest-preset-with-enzyme.js` to merge one of the main presets with the opt-in Enzyme setup.

For example:

```js
const jestPreset = require('@commercetools-frontend/jest-preset-mc-app');
const applyJestPresetWithEnzyme = require('@commercetools-frontend/jest-preset-mc-app/enzyme/apply-jest-preset-with-enzyme');

module.exports = {
  ...applyJestPresetWithEnzyme({
    enzymeAdapterVersion: 17,
    jestPreset,
  }),
};
```

Similarly, you can use the `@commercetools-frontend/jest-preset-mc-app/jest-preset-for-typescript` instead of the `@commercetools-frontend/jest-preset-mc-app`.
