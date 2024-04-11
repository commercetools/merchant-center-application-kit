# @commercetools-frontend/jest-preset-mc-app

<p align="center">
  <a href="https://www.npmjs.com/package/@commercetools-frontend/jest-preset-mc-app"><img src="https://badgen.net/npm/v/@commercetools-frontend/jest-preset-mc-app" alt="Latest release (latest dist-tag)" /></a> <a href="https://www.npmjs.com/package/@commercetools-frontend/jest-preset-mc-app"><img src="https://badgen.net/npm/v/@commercetools-frontend/jest-preset-mc-app/next" alt="Latest release (next dist-tag)" /></a> <a href="https://bundlephobia.com/result?p=@commercetools-frontend/jest-preset-mc-app"><img src="https://badgen.net/bundlephobia/minzip/@commercetools-frontend/jest-preset-mc-app" alt="Minified + GZipped size" /></a> <a href="https://github.com/commercetools/merchant-center-application-kit/blob/main/LICENSE"><img src="https://badgen.net/github/license/commercetools/merchant-center-application-kit" alt="GitHub license" /></a>
</p>

Jest preset used by Merchant Center customizations.

## Install

```bash
$ npm install --save @commercetools-frontend/jest-preset-mc-app
```

## Usage

```js
module.exports = {
  preset: '@commercetools-frontend/jest-preset-mc-app',
};
```

## Custom config

You can pass a custom config using one of the [cosmiconfig](https://github.com/davidtheclark/cosmiconfig) format options. The config module name to use is `jest-preset-mc-app`.
For example:

```
.jest-preset-mc-apprc
.jest-preset-mc-apprc.json
.jest-preset-mc-apprc.yaml
.jest-preset-mc-apprc.yml
.jest-preset-mc-apprc.js
jest-preset-mc-app.config.js
```

Supported options are:

- `silenceConsoleWarnings`: a list of strings or RegEx to match against console logs. If the value matches, the log will be suppressed. This option only takes effect when the environment variable `CI` is defined.
- `notThrowWarnings`: a list of strings or RegEx to match against console logs. If the value matches, no error will be thrown. This option only takes effect when the environment variable `CI` is defined.

## TypeScript support

If you need to use the Jest preset with additional TypeScript support, you need to point to the `@commercetools-frontend/jest-preset-mc-app/typescript` preset in your Jest config.

For example:

```js
module.exports = {
  preset: '@commercetools-frontend/jest-preset-mc-app/typescript',
};
```

## Opt-in Enzyme support

This Jest preset does not ship with Enzyme support anymore (version `>=20`).

In case you still use Enzyme in your tests, you need to do a bit of extra configuration as described below:

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

Similarly, you can use the `@commercetools-frontend/jest-preset-mc-app/typescript` instead of the `@commercetools-frontend/jest-preset-mc-app`.

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

Similarly, you can use the `@commercetools-frontend/jest-preset-mc-app/typescript` instead of the `@commercetools-frontend/jest-preset-mc-app`.
