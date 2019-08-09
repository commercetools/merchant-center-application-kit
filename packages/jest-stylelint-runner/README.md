#jest-stylelint-runner

## Description

Jest-stylelint-runner is inspired by [jest-runner-stylelint](https://github.com/keplersj/jest-runner-stylelint).

However, it has two main distinctions.

- `jest-stylelint-runner` will process your CSS with PostCSS given a `postcss.config.js` file in your project. This means that it can resolve imports and custom properties through the use of postcss plugins
- `jest-stylelint-runner` has `stylelint` as a peer dependency

## Usage

### Install

Install `jest`_(it needs Jest 21+)_,`jest-stylelint-runner`, `postcss` and any postcss plugins you need.

```bash
yarn add --dev jest postcss @commercetools-frontend/jest-stylelint-runner

# or with NPM

npm install --save-dev jest postcss @commercetools-frontend/jest-stylelint-runner
```

### Add It to Your Jest Config

In your `package.json`

```json
{
  "jest": {
    "runner": "@commercetools-frontend/jest-stylelint-runner",
    "moduleFileExtensions": ["css"],
    "testMatch": ["**/*.css"]
  }
}
```

Or in `jest.config.js`

```js
module.exports = {
  runner: '@commercetools-frontend/jest-stylelint-runner',
  moduleFileExtensions: ['css'],
  testMatch: ['**/*.css'],
};
```

### Define Your Postcss Config

In your `postcss.config.js`

```js
module.exports = () => {
  return {
    parser: false,
    map: false,
    plugins: {
      'postcss-import': {},
      'postcss-custom-properties': {
        preserve: false,
        importFrom: [
          require.resolve(
            '@commercetools-frontend/ui-kit/materials/custom-properties.css'
          ),
        ],
      },
    },
  };
};
```

### Run Jest

```bash
yarn jest
```
