# @commercetools-frontend/jest-stylelint-runner

<p align="center">
  <a href="https://www.npmjs.com/package/@commercetools-frontend/jest-stylelint-runner"><img src="https://badgen.net/npm/v/@commercetools-frontend/jest-stylelint-runner" alt="Latest release (latest dist-tag)" /></a> <a href="https://www.npmjs.com/package/@commercetools-frontend/jest-stylelint-runner"><img src="https://badgen.net/npm/v/@commercetools-frontend/jest-stylelint-runner/next" alt="Latest release (next dist-tag)" /></a> <a href="https://bundlephobia.com/result?p=@commercetools-frontend/jest-stylelint-runner"><img src="https://badgen.net/bundlephobia/minzip/@commercetools-frontend/jest-stylelint-runner" alt="Minified + GZipped size" /></a> <a href="https://github.com/commercetools/merchant-center-application-kit/blob/main/LICENSE"><img src="https://badgen.net/github/license/commercetools/merchant-center-application-kit" alt="GitHub license" /></a>
</p>

Jest runner for Stylelint.

## Disclaimer

`@commercetools-frontend/jest-stylelint-runner` is inspired by [jest-runner-stylelint](https://github.com/keplersj/jest-runner-stylelint).

However, it has two main distinctions.

- `jest-stylelint-runner` will process your CSS with PostCSS given a `postcss.config.js` file in your project. This means that it can resolve imports and custom properties through the use of PostCSS plugins.
- `jest-stylelint-runner` has `stylelint` as a peer dependency.

## Install

Install `jest`_(it needs Jest 21+)_,`jest-stylelint-runner`, `postcss` and any PostCSS plugins you need.

```bash
yarn add --dev jest postcss stylelint @commercetools-frontend/jest-stylelint-runner

# or with NPM

npm install --save-dev jest postcss stylelint @commercetools-frontend/jest-stylelint-runner
```

## Usage

Add it to your Jest config.

In your `package.json`:

```json
{
  "jest": {
    "runner": "@commercetools-frontend/jest-stylelint-runner",
    "moduleFileExtensions": ["css"],
    "testMatch": ["**/*.css"]
  }
}
```

Or in `jest.stylelint.config.js`:

```js
module.exports = {
  runner: '@commercetools-frontend/jest-stylelint-runner',
  displayName: 'stylelint',
  moduleFileExtensions: ['css'],
  testMatch: ['**/*.css'],
};
```

Run it as `jest --config jest.stylelint.config.js`.

### Define your PostCSS config

In your `postcss.config.js`:

```js
module.exports = () => {
  return {
    parser: false,
    map: false,
    plugins: {
      'postcss-import': {},
      // ...
    },
  };
};
```

## Recommended setup for Custom Applications

If you are developing Custom Applications for commercetools's Merchant Center, and are using CSS Modules, we recommend to additionally install the following dependencies:

```
yarn add -E postcss-syntax stylelint-config-prettier stylelint-config-standard stylelint-order stylelint-value-no-unknown-custom-properties
```

Then configure Stylelint as following:

```js
/**
 * @type {import('stylelint').Config}
 */
module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  plugins: ['stylelint-order', 'stylelint-value-no-unknown-custom-properties'],
  rules: {
    // other rules...
    'csstools/value-no-unknown-custom-properties': [
      true,
      {
        importFrom: [
          'node_modules/@commercetools-uikit/design-system/materials/custom-properties.css',
        ],
      },
    ],
  },
};
```

Furthermore, the `postcss.config.js` should be configured as following:

```js
const { createPostcssConfig } = require('@commercetools-frontend/mc-scripts');

// Re-export the pre-configured `postcss.config.js`.
// This file is only used by file/scripts in this repository, for example linters etc.
module.exports = createPostcssConfig();
```

You can also customize some of the plugins (see function signature).
