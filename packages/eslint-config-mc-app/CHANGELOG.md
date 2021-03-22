# @commercetools-frontend/eslint-config-mc-app

## 18.6.0

### Patch Changes

- [#2099](https://github.com/commercetools/merchant-center-application-kit/pull/2099) [`d09a154b`](https://github.com/commercetools/merchant-center-application-kit/commit/d09a154b9e74bc180da033acd8e74ac8ed32fc75) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

## 18.5.4

### Patch Changes

- [`d44f5b69`](https://github.com/commercetools/merchant-center-application-kit/commit/d44f5b6916c3897ce198eb06757d29d40535b8d4) [#2076](https://github.com/commercetools/merchant-center-application-kit/pull/2076) Thanks [@tdeekens](https://github.com/tdeekens)! - refactor: to remove lerna and only use many-pkg

## 18.5.2

### Patch Changes

- [`7f26c54e`](https://github.com/commercetools/merchant-center-application-kit/commit/7f26c54e55eff8aeac786ec0d011d36e40b0d263) [#2066](https://github.com/commercetools/merchant-center-application-kit/pull/2066) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

## 18.5.1

### Patch Changes

- [`ea9cc2e5`](https://github.com/commercetools/merchant-center-application-kit/commit/ea9cc2e50ccca4b534145aa12679c31202151d62) [#2063](https://github.com/commercetools/merchant-center-application-kit/pull/2063) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update dependency eslint-config-prettier to v8

## 18.4.1

### Patch Changes

- [`074ec33d`](https://github.com/commercetools/merchant-center-application-kit/commit/074ec33d97282fc9750fd59ccceb33ff0430da41) [#2053](https://github.com/commercetools/merchant-center-application-kit/pull/2053) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

## 18.1.4

### Patch Changes

- [`c9589f5e`](https://github.com/commercetools/merchant-center-application-kit/commit/c9589f5e3d1fd18393c7bf501c3b23b8ec402804) [#2020](https://github.com/commercetools/merchant-center-application-kit/pull/2020) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

## 18.0.0

### Major Changes

- [`7f8b219`](https://github.com/commercetools/merchant-center-application-kit/commit/7f8b219b46c6d1935fdc2757346e195aae08afc6) [#1961](https://github.com/commercetools/merchant-center-application-kit/pull/1961) Thanks [@emmenko](https://github.com/emmenko)! - Restructure and simplify ESLint config for MC applications, in particular the rules and list of plugins.
  We now base our config to ESLint React App instead of Airbnb.

  Also, there is now only `eslint` as a required peer dependency.

  > Note that this is primarily to avoid consumers having to install all of the potentially required peer dependencies, as per recommendation from ESLint when publishing sharable configs.
  > However, all the dependencies are defined with a caret `^` version range, which gives a bit of flexibility to the consumers in case of version conflicts.

  ```diff
  {
  -  "babel-eslint": "10.1.0",
    "eslint": "7.18.0"
  -  "eslint-config-airbnb-base": "14.2.1",
  -  "eslint-config-prettier": "7.2.0",
  -  "eslint-plugin-babel": "5.3.1",
  -  "eslint-plugin-import": "2.22.1",
  -  "eslint-plugin-jest": "24.1.3",
  -  "eslint-plugin-jest-dom": "3.6.5",
  -  "eslint-plugin-jsx-a11y": "6.4.1",
  -  "eslint-plugin-prefer-object-spread": "1.2.1",
  -  "eslint-plugin-prettier": "3.3.1",
  -  "eslint-plugin-react": "7.22.0"
  }
  ```

## 17.10.1

### Patch Changes

- [`5557c5c`](https://github.com/commercetools/merchant-center-application-kit/commit/5557c5c5744bf34a981247d04dc2f1117c15767d) [#1976](https://github.com/commercetools/merchant-center-application-kit/pull/1976) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

## 17.8.0

### Patch Changes

- [`4971a78`](https://github.com/commercetools/merchant-center-application-kit/commit/4971a78438fb4d2ca5487764192a0bb1ffc3b18e) [#1952](https://github.com/commercetools/merchant-center-application-kit/pull/1952) Thanks [@tdeekens](https://github.com/tdeekens)! - chore: add and apply fixes via manypkg for automatic mono-repo validation

## 17.6.2

### Patch Changes

- [`9c44ec6`](https://github.com/commercetools/merchant-center-application-kit/commit/9c44ec68cc35e6d03e815265e5ec4a1041f11a78) [#1917](https://github.com/commercetools/merchant-center-application-kit/pull/1917) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update dependency eslint-config-prettier to v7

## 17.3.0

### Patch Changes

- [`71c9111`](https://github.com/commercetools/merchant-center-application-kit/commit/71c9111308832009d1a27e91e4f2d2da4c53367c) [#1866](https://github.com/commercetools/merchant-center-application-kit/pull/1866) Thanks [@emmenko](https://github.com/emmenko)! - Update to uikit v10.39.8

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
