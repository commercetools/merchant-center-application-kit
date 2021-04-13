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

2. In your Jest config, instead of importing the preset `@commercetools-frontend/jest-preset-mc-app` you need to import `@commercetools-frontend/jest-preset-mc-app/enzyme/jest-preset-for-enzyme-16.js`

For example:

```js
const jestPreset = require('@commercetools-frontend/jest-preset-mc-app');
const jestPresetForEnzyme16 = require('@commercetools-frontend/jest-preset-mc-app/enzyme/jest-preset-for-enzyme-16');

module.exports = {
  preset: {
    ...jestPreset,
    ...jestPresetForEnzyme16,
  },
};
```

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

2. In your Jest config, instead of importing the preset `@commercetools-frontend/jest-preset-mc-app` you need to import `@commercetools-frontend/jest-preset-mc-app/enzyme/jest-preset-for-enzyme-17.js`

For example:

```js
const jestPreset = require('@commercetools-frontend/jest-preset-mc-app');
const jestPresetForEnzyme17 = require('@commercetools-frontend/jest-preset-mc-app/enzyme/jest-preset-for-enzyme-17');

module.exports = {
  preset: {
    ...jestPreset,
    ...jestPresetForEnzyme17,
  },
};
```

