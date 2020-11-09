# @commercetools-frontend/eslint-config-mc-app

## 17.2.0

### Patch Changes

- [`e0ec004`](https://github.com/commercetools/merchant-center-application-kit/commit/e0ec004d611f93b24f015120d09f6f18389b219f) [#1854](https://github.com/commercetools/merchant-center-application-kit/pull/1854) Thanks [@emmenko](https://github.com/emmenko)! - chore: update deps

## 17.1.0

### Minor Changes

- [`eb545e0`](https://github.com/commercetools/merchant-center-application-kit/commit/eb545e088af38af86611a2c0b7b69a16a5318b4b) [#1819](https://github.com/commercetools/merchant-center-application-kit/pull/1819) Thanks [@tdeekens](https://github.com/tdeekens)! - feat: adds the ability to opt into the new `automatic` JSX runtime

  Recent React versions support a new JSX runtime. Read more about it [here](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html).

  You may opt into the new runtime in `automatic` mode by setting the `ENABLE_NEW_JSX_TRANSFORM` environment variable to `true`. Please note you need at least React v17 or v16.14 in your application.
  Opting into the new JSX transform automatically also changes the Babel, Jest and ESLint configurations. As a consequence ESLint will warn whenever it discovers React being in scope by importing it as `import React from 'react`'. You have to remove those imports using the respective codemod by running `npx react-codemod update-react-imports`.

  Lastly, all code of the Merchant Center Application Kit will continue to be bundled in `classic` mode to support older versions of React.

## 16.16.4

### Patch Changes

- [`5b9ca52`](https://github.com/commercetools/merchant-center-application-kit/commit/5b9ca52bf521332151c2771b80514542bf47c0a3) [#1714](https://github.com/commercetools/merchant-center-application-kit/pull/1714) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update dependency eslint-plugin-jest to v24

  Add support for using both eslint-plugin-jest to v24 and v23.

## 16.15.3

### Patch Changes

- [`6d98245`](https://github.com/commercetools/merchant-center-application-kit/commit/6d98245615ddb83e805e5cc2cc0620920b4a71c7) [#1643](https://github.com/commercetools/merchant-center-application-kit/pull/1643) Thanks [@emmenko](https://github.com/emmenko)! - Update copyright date to 2020 in LICENSE files

## 16.11.1

### Patch Changes

- [`ee0b882`](https://github.com/commercetools/merchant-center-application-kit/commit/ee0b882c711040a2af8f8c86899cd889b5e6c635) [#1581](https://github.com/commercetools/merchant-center-application-kit/pull/1581) Thanks [@tdeekens](https://github.com/tdeekens)! - fix(eslint-config-mc-app): add missing peer dep

## 16.11.0

### Minor Changes

- [`30e2501`](https://github.com/commercetools/merchant-center-application-kit/commit/30e250124f819884c8ea7c21e3cff1d0d7b29ca5) [#1579](https://github.com/commercetools/merchant-center-application-kit/pull/1579) Thanks [@tdeekens](https://github.com/tdeekens)! - feat(eslint-config-mc-app): to add jest-dom plugin

## 16.10.0

### Minor Changes

- [`8d3f626`](https://github.com/commercetools/merchant-center-application-kit/commit/8d3f626c540b00dfdf45e0b84c6524119c6c5c40) [#1570](https://github.com/commercetools/merchant-center-application-kit/pull/1570) Thanks [@ahmehri](https://github.com/ahmehri)! - enable `react/no-unused-prop-types` eslint rule

## 16.9.1

### Patch Changes

- [`f92ec54`](https://github.com/commercetools/merchant-center-application-kit/commit/f92ec54e78edb668e8dff53342e8542e96d8c319) [#1551](https://github.com/commercetools/merchant-center-application-kit/pull/1551) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

## 16.8.6

### Patch Changes

- [`9391762`](https://github.com/commercetools/merchant-center-application-kit/commit/939176298df3558970a267b6e6478051a355ffae) [#1530](https://github.com/commercetools/merchant-center-application-kit/pull/1530) Thanks [@emmenko](https://github.com/emmenko)! - Update `@commercetools-uikit/*` packages to `10.21.0`

## 16.8.2

### Patch Changes

- [`1ace0e6`](https://github.com/commercetools/merchant-center-application-kit/commit/1ace0e65d73911751ef6dbb6e083fb2dc6ac8f29) [#1497](https://github.com/commercetools/merchant-center-application-kit/pull/1497) Thanks [@emmenko](https://github.com/emmenko)! - Allow to use `eslint@7` and `jest@26`
