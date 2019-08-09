#jest-textlint-runner

## Description

## Usage

### Install

Install `jest`_(it needs Jest 21+)_,`jest-textlint-runner`, `textlint` and any textlint rules and plugins you need.

```bash
yarn add --dev jest textlint @commercetools-frontend/jest-textlint-runner

# or with NPM

npm install --save-dev jest textlint @commercetools-frontend/jest-textlint-runner
```

### Add It to Your Jest Config

In your `package.json`

```json
{
  "jest": {
    "runner": "@commercetools-frontend/jest-textlint-runner",
    "moduleFileExtensions": ["md"],
    "testMatch": ["**/*.md"]
  }
}
```

Or in `jest.config.js`

```js
module.exports = {
  runner: '@commercetools-frontend/jest-textlint-runner',
  moduleFileExtensions: ['md'],
  testMatch: ['**/*.md'],
};
```

### Run Jest

```bash
yarn jest
```
