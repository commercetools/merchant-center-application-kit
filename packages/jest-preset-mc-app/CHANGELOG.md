# @commercetools-frontend/jest-preset-mc-app

## 21.8.0

### Patch Changes

- [#2661](https://github.com/commercetools/merchant-center-application-kit/pull/2661) [`43a9df21`](https://github.com/commercetools/merchant-center-application-kit/commit/43a9df2193000b49a0299c02d5218c50d71567ed) Thanks [@emmenko](https://github.com/emmenko)! - Drop the copyright year from the license files

- Updated dependencies [[`43a9df21`](https://github.com/commercetools/merchant-center-application-kit/commit/43a9df2193000b49a0299c02d5218c50d71567ed)]:
  - @commercetools-frontend/babel-preset-mc-app@21.8.0

## 21.7.0

### Patch Changes

- [#2627](https://github.com/commercetools/merchant-center-application-kit/pull/2627) [`5a8c301d`](https://github.com/commercetools/merchant-center-application-kit/commit/5a8c301d5627df1e8bb6dcf8870575c6ca32c0a7) Thanks [@emmenko](https://github.com/emmenko)! - Add proper entry point for Jest preset for `typescript`.

  ```diff
  -const jestPresetForTypeScript = require('@commercetools-frontend/jest-preset-mc-app/jest-preset-for-typescript');

  module.exports = {
  -  ...jestPresetForTypeScript,
  +  preset: '@commercetools-frontend/jest-preset-mc-app/typescript'
  };
  ```

  The import `@commercetools-frontend/jest-preset-mc-app/jest-preset-for-typescript` still works for backwards compatibility.

## 21.6.0

### Patch Changes

- [#2555](https://github.com/commercetools/merchant-center-application-kit/pull/2555) [`0b7a3743`](https://github.com/commercetools/merchant-center-application-kit/commit/0b7a3743207172ace7f2b6893b9c7d61c351967b) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

* [#2590](https://github.com/commercetools/merchant-center-application-kit/pull/2590) [`7c6415d1`](https://github.com/commercetools/merchant-center-application-kit/commit/7c6415d1b4f5f17d8ea0421b07051e6d2f7265c1) Thanks [@emmenko](https://github.com/emmenko)! - Use proper [Intl polyfills](https://formatjs.io/docs/polyfills).

- [#2614](https://github.com/commercetools/merchant-center-application-kit/pull/2614) [`7c74f7f6`](https://github.com/commercetools/merchant-center-application-kit/commit/7c74f7f6a9df8478abfc3c6a55844573a9d026f2) Thanks [@emmenko](https://github.com/emmenko)! - Fix missing globals `TextEncoder` and `TextDecoder` when using `jsdom`.

## 21.3.4

### Patch Changes

- [#2546](https://github.com/commercetools/merchant-center-application-kit/pull/2546) [`dc76e5a9`](https://github.com/commercetools/merchant-center-application-kit/commit/dc76e5a9a7f875dadf2ed5a11c48a1ddff7b431c) Thanks [@renovate](https://github.com/apps/renovate)! - Upgrade dependencies

- Updated dependencies [[`dc76e5a9`](https://github.com/commercetools/merchant-center-application-kit/commit/dc76e5a9a7f875dadf2ed5a11c48a1ddff7b431c)]:
  - @commercetools-frontend/babel-preset-mc-app@21.3.4

## 21.3.2

### Patch Changes

- Updated dependencies [[`cc7c19d0`](https://github.com/commercetools/merchant-center-application-kit/commit/cc7c19d06e25002e0d35c072b6f9388dd61f87cb)]:
  - @commercetools-frontend/babel-preset-mc-app@21.3.2

## 21.3.0

### Patch Changes

- [#2520](https://github.com/commercetools/merchant-center-application-kit/pull/2520) [`6f3a2083`](https://github.com/commercetools/merchant-center-application-kit/commit/6f3a2083efac387e9a2994fbaaeb18914e739aa8) Thanks [@renovate](https://github.com/apps/renovate)! - Upgrade dependencies

- Updated dependencies [[`6f3a2083`](https://github.com/commercetools/merchant-center-application-kit/commit/6f3a2083efac387e9a2994fbaaeb18914e739aa8)]:
  - @commercetools-frontend/babel-preset-mc-app@21.3.0

## 21.2.1

### Patch Changes

- [#2471](https://github.com/commercetools/merchant-center-application-kit/pull/2471) [`dc02733d`](https://github.com/commercetools/merchant-center-application-kit/commit/dc02733dfe14ce864e6efd36c6746892170ade3d) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

## 21.0.0

### Patch Changes

- [#2450](https://github.com/commercetools/merchant-center-application-kit/pull/2450) [`eb8f5b2c`](https://github.com/commercetools/merchant-center-application-kit/commit/eb8f5b2c885a4c3ffc7857a61e50508b429bf964) Thanks [@emmenko](https://github.com/emmenko)! - Update dependencies

* [#2430](https://github.com/commercetools/merchant-center-application-kit/pull/2430) [`bb1f7d75`](https://github.com/commercetools/merchant-center-application-kit/commit/bb1f7d75ff54f7fef05c4d2b3328b88e400b4867) Thanks [@emmenko](https://github.com/emmenko)! - Use version range for Babel packages.

* Updated dependencies [[`bb1f7d75`](https://github.com/commercetools/merchant-center-application-kit/commit/bb1f7d75ff54f7fef05c4d2b3328b88e400b4867), [`eb8f5b2c`](https://github.com/commercetools/merchant-center-application-kit/commit/eb8f5b2c885a4c3ffc7857a61e50508b429bf964), [`bb1f7d75`](https://github.com/commercetools/merchant-center-application-kit/commit/bb1f7d75ff54f7fef05c4d2b3328b88e400b4867), [`bb1f7d75`](https://github.com/commercetools/merchant-center-application-kit/commit/bb1f7d75ff54f7fef05c4d2b3328b88e400b4867)]:
  - @commercetools-frontend/babel-preset-mc-app@21.0.0

## 21.0.0-rc.7

### Patch Changes

- Updated dependencies [[`71171d65`](https://github.com/commercetools/merchant-center-application-kit/commit/71171d65c276801d499f9b39923674114dff360c)]:
  - @commercetools-frontend/babel-preset-mc-app@21.0.0-rc.7

## 21.0.0-rc.5

### Patch Changes

- Updated dependencies [[`8c189ad3`](https://github.com/commercetools/merchant-center-application-kit/commit/8c189ad3233b7bf7846e097539f2c47827c79b2b)]:
  - @commercetools-frontend/babel-preset-mc-app@21.0.0-rc.5

## 21.0.0-rc.1

### Patch Changes

- [#2430](https://github.com/commercetools/merchant-center-application-kit/pull/2430) [`5ea8baf1`](https://github.com/commercetools/merchant-center-application-kit/commit/5ea8baf1b2ca2661aac9a6a572d2c8e596ee0b2c) Thanks [@emmenko](https://github.com/emmenko)! - Use version range for Babel packages.

- Updated dependencies [[`5ea8baf1`](https://github.com/commercetools/merchant-center-application-kit/commit/5ea8baf1b2ca2661aac9a6a572d2c8e596ee0b2c)]:
  - @commercetools-frontend/babel-preset-mc-app@21.0.0-rc.1

## 21.0.0-rc.0

### Patch Changes

- [#2450](https://github.com/commercetools/merchant-center-application-kit/pull/2450) [`eb8f5b2c`](https://github.com/commercetools/merchant-center-application-kit/commit/eb8f5b2c885a4c3ffc7857a61e50508b429bf964) Thanks [@emmenko](https://github.com/emmenko)! - Update dependencies

- Updated dependencies [[`eb8f5b2c`](https://github.com/commercetools/merchant-center-application-kit/commit/eb8f5b2c885a4c3ffc7857a61e50508b429bf964)]:
  - @commercetools-frontend/babel-preset-mc-app@21.0.0-rc.0

## 20.12.3

### Patch Changes

- [#2433](https://github.com/commercetools/merchant-center-application-kit/pull/2433) [`d65e29e4`](https://github.com/commercetools/merchant-center-application-kit/commit/d65e29e4eea4d1809abaa8cc82cc246c681dfa27) Thanks [@emmenko](https://github.com/emmenko)! - Replace `ts-jest/utils` with `jest-mock`, for using the `mocked` function.

* [#2433](https://github.com/commercetools/merchant-center-application-kit/pull/2433) [`d65e29e4`](https://github.com/commercetools/merchant-center-application-kit/commit/d65e29e4eea4d1809abaa8cc82cc246c681dfa27) Thanks [@emmenko](https://github.com/emmenko)! - Update dependencies

* Updated dependencies [[`d65e29e4`](https://github.com/commercetools/merchant-center-application-kit/commit/d65e29e4eea4d1809abaa8cc82cc246c681dfa27), [`d65e29e4`](https://github.com/commercetools/merchant-center-application-kit/commit/d65e29e4eea4d1809abaa8cc82cc246c681dfa27)]:
  - @commercetools-frontend/babel-preset-mc-app@20.12.3

## 20.12.1

### Patch Changes

- [#2384](https://github.com/commercetools/merchant-center-application-kit/pull/2384) [`cf914004`](https://github.com/commercetools/merchant-center-application-kit/commit/cf9140043ade6edb3ee71a7558b757f5e19bee81) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

- Updated dependencies [[`cf914004`](https://github.com/commercetools/merchant-center-application-kit/commit/cf9140043ade6edb3ee71a7558b757f5e19bee81)]:
  - @commercetools-frontend/babel-preset-mc-app@20.12.1

## 20.11.0

### Patch Changes

- [#2349](https://github.com/commercetools/merchant-center-application-kit/pull/2349) [`96eae0b7`](https://github.com/commercetools/merchant-center-application-kit/commit/96eae0b760efabb97a491238f77a92e34cc12bdf) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update dependency make-plural to v7

## 20.10.7

### Patch Changes

- [#2395](https://github.com/commercetools/merchant-center-application-kit/pull/2395) [`5543128b`](https://github.com/commercetools/merchant-center-application-kit/commit/5543128b8dee4d50a3bf164980e10cb68f0a9f28) Thanks [@emmenko](https://github.com/emmenko)! - Use `babel-jest` also for TypeScript files instead of `ts-jest`.

## 20.10.6

### Patch Changes

- [#2386](https://github.com/commercetools/merchant-center-application-kit/pull/2386) [`d7fcf6fc`](https://github.com/commercetools/merchant-center-application-kit/commit/d7fcf6fc8495d4eae68e0a4f4c1f1b3e0e394454) Thanks [@emmenko](https://github.com/emmenko)! - Upgrade to Yarn v3

- Updated dependencies [[`d7fcf6fc`](https://github.com/commercetools/merchant-center-application-kit/commit/d7fcf6fc8495d4eae68e0a4f4c1f1b3e0e394454)]:
  - @commercetools-frontend/babel-preset-mc-app@20.10.6

## 20.10.4

### Patch Changes

- [#2380](https://github.com/commercetools/merchant-center-application-kit/pull/2380) [`7fa4d7d0`](https://github.com/commercetools/merchant-center-application-kit/commit/7fa4d7d0c560226eba69ccb73c4014879939e8da) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

- Updated dependencies [[`7fa4d7d0`](https://github.com/commercetools/merchant-center-application-kit/commit/7fa4d7d0c560226eba69ccb73c4014879939e8da)]:
  - @commercetools-frontend/babel-preset-mc-app@20.10.4

## 20.10.3

### Patch Changes

- [#2362](https://github.com/commercetools/merchant-center-application-kit/pull/2362) [`f6b3ae02`](https://github.com/commercetools/merchant-center-application-kit/commit/f6b3ae02133927642976f976d2d2fd5eb675ce84) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

- Updated dependencies [[`f6b3ae02`](https://github.com/commercetools/merchant-center-application-kit/commit/f6b3ae02133927642976f976d2d2fd5eb675ce84)]:
  - @commercetools-frontend/babel-preset-mc-app@20.10.3

## 20.10.1

### Patch Changes

- [#2348](https://github.com/commercetools/merchant-center-application-kit/pull/2348) [`3247e604`](https://github.com/commercetools/merchant-center-application-kit/commit/3247e6048533a72c9f64cd316621dd51471cd1a8) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

* [#2342](https://github.com/commercetools/merchant-center-application-kit/pull/2342) [`91ba0910`](https://github.com/commercetools/merchant-center-application-kit/commit/91ba0910ce09ab7f3552fd381983724a63d7243d) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- [#2356](https://github.com/commercetools/merchant-center-application-kit/pull/2356) [`e34fe076`](https://github.com/commercetools/merchant-center-application-kit/commit/e34fe076aab6681cdcc54622d84123f2c22020e6) Thanks [@ByronDWall](https://github.com/ByronDWall)! - set node version to 16.8 in nvmrc to avoid a bug in node/v8

- Updated dependencies [[`3247e604`](https://github.com/commercetools/merchant-center-application-kit/commit/3247e6048533a72c9f64cd316621dd51471cd1a8), [`91ba0910`](https://github.com/commercetools/merchant-center-application-kit/commit/91ba0910ce09ab7f3552fd381983724a63d7243d), [`e34fe076`](https://github.com/commercetools/merchant-center-application-kit/commit/e34fe076aab6681cdcc54622d84123f2c22020e6)]:
  - @commercetools-frontend/babel-preset-mc-app@20.10.1

## 20.9.4

### Patch Changes

- Updated dependencies [[`8c6c13a7`](https://github.com/commercetools/merchant-center-application-kit/commit/8c6c13a79f91ea9476983e12c48ae834ca4640c1)]:
  - @commercetools-frontend/babel-preset-mc-app@20.9.4

## 20.9.3

### Patch Changes

- Updated dependencies [[`83f2add2`](https://github.com/commercetools/merchant-center-application-kit/commit/83f2add2a56ba6696c51fd930a0a1dadbf36c134)]:
  - @commercetools-frontend/babel-preset-mc-app@20.9.3

## 20.9.0

### Patch Changes

- Updated dependencies [[`487fcca6`](https://github.com/commercetools/merchant-center-application-kit/commit/487fcca6bcc03a4df59830e5204ca89cc5395df4)]:
  - @commercetools-frontend/babel-preset-mc-app@20.9.0

## 20.8.0

### Patch Changes

- [#2300](https://github.com/commercetools/merchant-center-application-kit/pull/2300) [`b3437eab`](https://github.com/commercetools/merchant-center-application-kit/commit/b3437eab6fd7b1529f5eac78eda658028474afa7) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

- Updated dependencies [[`b3437eab`](https://github.com/commercetools/merchant-center-application-kit/commit/b3437eab6fd7b1529f5eac78eda658028474afa7)]:
  - @commercetools-frontend/babel-preset-mc-app@20.8.0

## 20.7.0

### Patch Changes

- [#2287](https://github.com/commercetools/merchant-center-application-kit/pull/2287) [`f5aa350a`](https://github.com/commercetools/merchant-center-application-kit/commit/f5aa350a29983383dd5933ac38c0beb56f0b9cf5) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`f5aa350a`](https://github.com/commercetools/merchant-center-application-kit/commit/f5aa350a29983383dd5933ac38c0beb56f0b9cf5)]:
  - @commercetools-frontend/babel-preset-mc-app@20.7.0

## 20.5.2

### Patch Changes

- [#2274](https://github.com/commercetools/merchant-center-application-kit/pull/2274) [`374659f3`](https://github.com/commercetools/merchant-center-application-kit/commit/374659f3a06f61a2c9a0218d298ba5ee0de0c9c4) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update dependency @testing-library/react to v12

* [#2273](https://github.com/commercetools/merchant-center-application-kit/pull/2273) [`b96d4f3d`](https://github.com/commercetools/merchant-center-application-kit/commit/b96d4f3d6ab177da66bc8cab337172bf3a85b2c6) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

* Updated dependencies [[`b96d4f3d`](https://github.com/commercetools/merchant-center-application-kit/commit/b96d4f3d6ab177da66bc8cab337172bf3a85b2c6)]:
  - @commercetools-frontend/babel-preset-mc-app@20.5.2

## 20.5.1

### Patch Changes

- [#2264](https://github.com/commercetools/merchant-center-application-kit/pull/2264) [`e0ea1333`](https://github.com/commercetools/merchant-center-application-kit/commit/e0ea1333218aa7a916ff0971a52ed8175be4d697) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`e0ea1333`](https://github.com/commercetools/merchant-center-application-kit/commit/e0ea1333218aa7a916ff0971a52ed8175be4d697), [`c370f242`](https://github.com/commercetools/merchant-center-application-kit/commit/c370f242bb85bc0041b4825bc4ebc877eaaa61e4)]:
  - @commercetools-frontend/babel-preset-mc-app@20.5.1

## 20.5.0

### Minor Changes

- [#2262](https://github.com/commercetools/merchant-center-application-kit/pull/2262) [`4d9bce0f`](https://github.com/commercetools/merchant-center-application-kit/commit/4d9bce0ff9aee5c6f27f751e44815465f1452c09) Thanks [@tdeekens](https://github.com/tdeekens)! - Add a `babelConfig` to the `jest-preset-mc-app` `cosmiconfig`.

  To use it create a `jest-preset-mc-app.config.js` in the root of your project and e.g. add a:

  ```js
  module.exports = {
    babelConfig: {
      disableCoreJs: true,
    },
  };
  ```

### Patch Changes

- Updated dependencies [[`481fb8f8`](https://github.com/commercetools/merchant-center-application-kit/commit/481fb8f8ace9502e48d89eb81b58ebf70a5724ba), [`9aba0c49`](https://github.com/commercetools/merchant-center-application-kit/commit/9aba0c49d9ce643f66c58031c69b25ded9eb4859)]:
  - @commercetools-frontend/babel-preset-mc-app@20.5.0

## 20.4.0

### Minor Changes

- [#2254](https://github.com/commercetools/merchant-center-application-kit/pull/2254) [`43e367be`](https://github.com/commercetools/merchant-center-application-kit/commit/43e367be2a79e7bbd90fb9b09edc96e76f305472) Thanks [@tdeekens](https://github.com/tdeekens)! - Add ability to additionally silence warnings of the `console`.

  The use of the `console` is discouraged on CI. As a result any log level will log a warning and throw an error. However, some logging (e.g. from libraries) can not be avoided. To circumvent this a `silenceConsoleWarnings` can be added on the `jest-preset-mc-app.config.js`.

  In addition to be above this adds `console.config` object with `addSilencedWarning` and `addNotThrowingWarning`. Allowing to add additional silenced messages at runtime of a test.

### Patch Changes

- [#2247](https://github.com/commercetools/merchant-center-application-kit/pull/2247) [`f8f759b6`](https://github.com/commercetools/merchant-center-application-kit/commit/f8f759b6f0f6d8cc677efd90fecbd19d103c6a4f) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

* [#2233](https://github.com/commercetools/merchant-center-application-kit/pull/2233) [`e642229a`](https://github.com/commercetools/merchant-center-application-kit/commit/e642229a7be1c544ede8de831cb9e3633deb3fdd) Thanks [@tdeekens](https://github.com/tdeekens)! - Updates to `jest` v27 including `jest-each`, `pretty-format` and `ts-jest`.

  The breaking changes of `jest` are encapsulated into `jest-preset-mc-app` while a condition was added to ensure backwards compatibility of `babel-jest` and the export of `createTransformer`.

* Updated dependencies [[`f8f759b6`](https://github.com/commercetools/merchant-center-application-kit/commit/f8f759b6f0f6d8cc677efd90fecbd19d103c6a4f)]:
  - @commercetools-frontend/babel-preset-mc-app@20.4.0

## 20.3.1

### Patch Changes

- [#2234](https://github.com/commercetools/merchant-center-application-kit/pull/2234) [`4dd3398a`](https://github.com/commercetools/merchant-center-application-kit/commit/4dd3398a6cd951a29237e6e468f8accc8632981e) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

- Updated dependencies [[`4dd3398a`](https://github.com/commercetools/merchant-center-application-kit/commit/4dd3398a6cd951a29237e6e468f8accc8632981e)]:
  - @commercetools-frontend/babel-preset-mc-app@20.3.1

## 20.3.0

### Patch Changes

- [#2212](https://github.com/commercetools/merchant-center-application-kit/pull/2212) [`5961c019`](https://github.com/commercetools/merchant-center-application-kit/commit/5961c019ab908bc1a5d58acd4511e7c579976797) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`6de28034`](https://github.com/commercetools/merchant-center-application-kit/commit/6de28034f51e53b3cd1f293eaa16b8f66d9ae9e0), [`5961c019`](https://github.com/commercetools/merchant-center-application-kit/commit/5961c019ab908bc1a5d58acd4511e7c579976797)]:
  - @commercetools-frontend/babel-preset-mc-app@20.3.0

## 20.1.2

### Patch Changes

- Updated dependencies [[`0bfa1613`](https://github.com/commercetools/merchant-center-application-kit/commit/0bfa16134450fb0699018b2210e0da904f646140), [`99ea52d3`](https://github.com/commercetools/merchant-center-application-kit/commit/99ea52d354a9ad61187388553e1490964347550f)]:
  - @commercetools-frontend/babel-preset-mc-app@20.1.2

## 20.0.1

### Patch Changes

- Updated dependencies [[`26d4487a`](https://github.com/commercetools/merchant-center-application-kit/commit/26d4487a15dcee5c526de7b1f227e042e2711d3f)]:
  - @commercetools-frontend/babel-preset-mc-app@20.0.1

## 20.0.0

### Major Changes

- [#2175](https://github.com/commercetools/merchant-center-application-kit/pull/2175) [`49d253ad`](https://github.com/commercetools/merchant-center-application-kit/commit/49d253ad4aeb373389e424f8e09ecdafc15405c8) Thanks [@emmenko](https://github.com/emmenko)! - We [strongly recommend and believe](https://docs.commercetools.com/custom-applications/development/testing) to use React Testing Library for testing your Custom Application and therefore we are finally dropping support for `Enzyme`.

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

## 19.4.0

### Minor Changes

- [#2165](https://github.com/commercetools/merchant-center-application-kit/pull/2165) [`d019bc54`](https://github.com/commercetools/merchant-center-application-kit/commit/d019bc54c59ec52a49006f88366dd4bc7212c2aa) Thanks [@tdeekens](https://github.com/tdeekens)! - Adds support for the `*.mjs` and `*.cjs` JavaScript file extensions.

  Updates the webpack configurations, Jest and ESLint presets to support the `*.mjs` and `*.cjs` extensions. This allows better integration with packages using ES modules.

## 19.3.1

### Patch Changes

- [#2157](https://github.com/commercetools/merchant-center-application-kit/pull/2157) [`e757dd2b`](https://github.com/commercetools/merchant-center-application-kit/commit/e757dd2b114f0c751400eca6179700bddbb3aecc) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`e757dd2b`](https://github.com/commercetools/merchant-center-application-kit/commit/e757dd2b114f0c751400eca6179700bddbb3aecc)]:
  - @commercetools-frontend/babel-preset-mc-app@19.3.1

## 19.1.1

### Patch Changes

- [#2150](https://github.com/commercetools/merchant-center-application-kit/pull/2150) [`f9b1140c`](https://github.com/commercetools/merchant-center-application-kit/commit/f9b1140c02aca9c27e123ed9a25d31e8e1a3b28a) Thanks [@tdeekens](https://github.com/tdeekens)! - Fix `jest-preset-mc-app` to use default v16 enzyme adapter

  In a recent release we prematurely migrated to a community version of the v17 adapter of enzyme. We noticed that this adapter can not be used as easily as we have hoped.

  As a result, we revert to using the default v16 adapter while offering a configuration option to use any adapter needed.

  In a `jest-preset-mc-app.config.js` file you can configure the adapter as follows:

  ```js
  const EnzymeAdapter = require('@wojtekmaj/enzyme-adapter-react-17');

  module.exports = {
    EnzymeAdapter,
  };
  ```

## 19.0.1

### Patch Changes

- [#2139](https://github.com/commercetools/merchant-center-application-kit/pull/2139) [`084e9a7a`](https://github.com/commercetools/merchant-center-application-kit/commit/084e9a7ab7879096b6b3139c0fc40a67ba1e069a) Thanks [@emmenko](https://github.com/emmenko)! - Use Enzyme adapter for React v17

* [#2135](https://github.com/commercetools/merchant-center-application-kit/pull/2135) [`598d3bb5`](https://github.com/commercetools/merchant-center-application-kit/commit/598d3bb52a43b261f4ddf0393722927b76339870) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

* Updated dependencies [[`598d3bb5`](https://github.com/commercetools/merchant-center-application-kit/commit/598d3bb52a43b261f4ddf0393722927b76339870)]:
  - @commercetools-frontend/babel-preset-mc-app@19.0.1

## 19.0.0

### Major Changes

- [#2041](https://github.com/commercetools/merchant-center-application-kit/pull/2041) [`a240f657`](https://github.com/commercetools/merchant-center-application-kit/commit/a240f6574a9240a2ac82febb67b0f6c814db979f) Thanks [@emmenko](https://github.com/emmenko)! - - The peer dependency `@testing-library/react` now only requires version `>=11`.
  - The peer dependency `@jest` now only requires version `>=26`.

* [#2041](https://github.com/commercetools/merchant-center-application-kit/pull/2041) [`a240f657`](https://github.com/commercetools/merchant-center-application-kit/commit/a240f6574a9240a2ac82febb67b0f6c814db979f) Thanks [@emmenko](https://github.com/emmenko)! - Upgrade and migrate packages to use `ui-kit@v12`

## 18.7.0

### Patch Changes

- [#2110](https://github.com/commercetools/merchant-center-application-kit/pull/2110) [`c850d6dc`](https://github.com/commercetools/merchant-center-application-kit/commit/c850d6dcf8edabb5eb9390e41def4b6b52879b7a) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`c850d6dc`](https://github.com/commercetools/merchant-center-application-kit/commit/c850d6dcf8edabb5eb9390e41def4b6b52879b7a)]:
  - @commercetools-frontend/babel-preset-mc-app@18.7.0

## 18.6.0

### Patch Changes

- [#2099](https://github.com/commercetools/merchant-center-application-kit/pull/2099) [`d09a154b`](https://github.com/commercetools/merchant-center-application-kit/commit/d09a154b9e74bc180da033acd8e74ac8ed32fc75) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

- Updated dependencies [[`d09a154b`](https://github.com/commercetools/merchant-center-application-kit/commit/d09a154b9e74bc180da033acd8e74ac8ed32fc75)]:
  - @commercetools-frontend/babel-preset-mc-app@18.6.0

## 18.5.6

### Patch Changes

- [`ca4ea6eb`](https://github.com/commercetools/merchant-center-application-kit/commit/ca4ea6eb17c14bf015a8448248c58881e005ac99) [#2085](https://github.com/commercetools/merchant-center-application-kit/pull/2085) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`ca4ea6eb`](https://github.com/commercetools/merchant-center-application-kit/commit/ca4ea6eb17c14bf015a8448248c58881e005ac99)]:
  - @commercetools-frontend/babel-preset-mc-app@18.5.6

## 18.5.4

### Patch Changes

- [`d44f5b69`](https://github.com/commercetools/merchant-center-application-kit/commit/d44f5b6916c3897ce198eb06757d29d40535b8d4) [#2076](https://github.com/commercetools/merchant-center-application-kit/pull/2076) Thanks [@tdeekens](https://github.com/tdeekens)! - refactor: to remove lerna and only use many-pkg

- Updated dependencies [[`d44f5b69`](https://github.com/commercetools/merchant-center-application-kit/commit/d44f5b6916c3897ce198eb06757d29d40535b8d4)]:
  - @commercetools-frontend/babel-preset-mc-app@18.5.4

## 18.5.2

### Patch Changes

- [`7f26c54e`](https://github.com/commercetools/merchant-center-application-kit/commit/7f26c54e55eff8aeac786ec0d011d36e40b0d263) [#2066](https://github.com/commercetools/merchant-center-application-kit/pull/2066) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

- Updated dependencies [[`7f26c54e`](https://github.com/commercetools/merchant-center-application-kit/commit/7f26c54e55eff8aeac786ec0d011d36e40b0d263)]:
  - @commercetools-frontend/babel-preset-mc-app@18.5.2

## 18.5.1

### Patch Changes

- Updated dependencies [[`bb2ceac2`](https://github.com/commercetools/merchant-center-application-kit/commit/bb2ceac229b94836482dbed57824d679a9cbd5d6)]:
  - @commercetools-frontend/babel-preset-mc-app@18.5.1

## 18.4.1

### Patch Changes

- [`074ec33d`](https://github.com/commercetools/merchant-center-application-kit/commit/074ec33d97282fc9750fd59ccceb33ff0430da41) [#2053](https://github.com/commercetools/merchant-center-application-kit/pull/2053) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

- Updated dependencies [[`074ec33d`](https://github.com/commercetools/merchant-center-application-kit/commit/074ec33d97282fc9750fd59ccceb33ff0430da41)]:
  - @commercetools-frontend/babel-preset-mc-app@18.4.1

## 18.4.0

### Patch Changes

- [`eb2fbb22`](https://github.com/commercetools/merchant-center-application-kit/commit/eb2fbb2279eff99048c91da352a69e1883eb54af) [#2044](https://github.com/commercetools/merchant-center-application-kit/pull/2044) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

- Updated dependencies [[`eb2fbb22`](https://github.com/commercetools/merchant-center-application-kit/commit/eb2fbb2279eff99048c91da352a69e1883eb54af)]:
  - @commercetools-frontend/babel-preset-mc-app@18.4.0

## 18.2.1

### Patch Changes

- [`3e1567ed`](https://github.com/commercetools/merchant-center-application-kit/commit/3e1567ed599e3440b5fdfff3b2123d5f48dce7e0) [#2029](https://github.com/commercetools/merchant-center-application-kit/pull/2029) Thanks [@emmenko](https://github.com/emmenko)! - Remove `jest-watch-master` plugin, as it defaults to the `master` branch.

## 18.1.4

### Patch Changes

- [`c9589f5e`](https://github.com/commercetools/merchant-center-application-kit/commit/c9589f5e3d1fd18393c7bf501c3b23b8ec402804) [#2020](https://github.com/commercetools/merchant-center-application-kit/pull/2020) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

## 18.1.0

### Patch Changes

- [`3bf32993`](https://github.com/commercetools/merchant-center-application-kit/commit/3bf329935a109a73a7c33580fdf618e60fdbcc2c) [#1971](https://github.com/commercetools/merchant-center-application-kit/pull/1971) Thanks [@tdeekens](https://github.com/tdeekens)! - Add internal opt-in support for combining feature flag adapters.

- Updated dependencies [[`3bf32993`](https://github.com/commercetools/merchant-center-application-kit/commit/3bf329935a109a73a7c33580fdf618e60fdbcc2c)]:
  - @commercetools-frontend/babel-preset-mc-app@18.1.0

## 18.0.2

### Patch Changes

- [`b38cb57f`](https://github.com/commercetools/merchant-center-application-kit/commit/b38cb57f678e79a862f1b97df2d1c753838ffbb7) [#1991](https://github.com/commercetools/merchant-center-application-kit/pull/1991) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

## 17.10.1

### Patch Changes

- [`5557c5c`](https://github.com/commercetools/merchant-center-application-kit/commit/5557c5c5744bf34a981247d04dc2f1117c15767d) [#1976](https://github.com/commercetools/merchant-center-application-kit/pull/1976) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

- Updated dependencies [[`5557c5c`](https://github.com/commercetools/merchant-center-application-kit/commit/5557c5c5744bf34a981247d04dc2f1117c15767d)]:
  - @commercetools-frontend/babel-preset-mc-app@17.10.1

## 17.10.0

### Patch Changes

- Updated dependencies [[`dc7a443`](https://github.com/commercetools/merchant-center-application-kit/commit/dc7a4437f02cfe9c840ae6f22cc85f94cf6a0bc9)]:
  - @commercetools-frontend/babel-preset-mc-app@17.10.0

## 17.9.1

### Patch Changes

- [`e1794e6`](https://github.com/commercetools/merchant-center-application-kit/commit/e1794e629190397976ca9a8bc84576583c67b47b) [#1962](https://github.com/commercetools/merchant-center-application-kit/pull/1962) Thanks [@tdeekens](https://github.com/tdeekens)! - refactor(jest-preset): to remove unhandled promise lockfile

## 17.8.0

### Patch Changes

- [`48a9886`](https://github.com/commercetools/merchant-center-application-kit/commit/48a98861dcf4193041e02e8ac11eb2940826f5d0) [#1954](https://github.com/commercetools/merchant-center-application-kit/pull/1954) Thanks [@tdeekens](https://github.com/tdeekens)! - chore: update dependencies across packages

* [`4971a78`](https://github.com/commercetools/merchant-center-application-kit/commit/4971a78438fb4d2ca5487764192a0bb1ffc3b18e) [#1952](https://github.com/commercetools/merchant-center-application-kit/pull/1952) Thanks [@tdeekens](https://github.com/tdeekens)! - chore: add and apply fixes via manypkg for automatic mono-repo validation

* Updated dependencies [[`48a9886`](https://github.com/commercetools/merchant-center-application-kit/commit/48a98861dcf4193041e02e8ac11eb2940826f5d0), [`4971a78`](https://github.com/commercetools/merchant-center-application-kit/commit/4971a78438fb4d2ca5487764192a0bb1ffc3b18e)]:
  - @commercetools-frontend/babel-preset-mc-app@17.8.0

## 17.7.2

### Patch Changes

- Updated dependencies [[`fab682b`](https://github.com/commercetools/merchant-center-application-kit/commit/fab682b6598006a44c530b9f2fb7d8f450110f97)]:
  - @commercetools-frontend/babel-preset-mc-app@17.7.2

## 17.7.1

### Patch Changes

- [`f6f3c5e`](https://github.com/commercetools/merchant-center-application-kit/commit/f6f3c5ebd08226fd4eca22aec5c39791cf5c5d6a) [#1935](https://github.com/commercetools/merchant-center-application-kit/pull/1935) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`99558e7`](https://github.com/commercetools/merchant-center-application-kit/commit/99558e74cc0b0c747cfa7ab43bed51490dc5194e), [`f6f3c5e`](https://github.com/commercetools/merchant-center-application-kit/commit/f6f3c5ebd08226fd4eca22aec5c39791cf5c5d6a)]:
  - @commercetools-frontend/babel-preset-mc-app@17.7.1

## 17.7.0

### Patch Changes

- Updated dependencies [[`1ec4379`](https://github.com/commercetools/merchant-center-application-kit/commit/1ec4379938b093d4444ec9e4079524c48afd4a42)]:
  - @commercetools-frontend/babel-preset-mc-app@17.7.0

## 17.6.2

### Patch Changes

- [`1a96e83`](https://github.com/commercetools/merchant-center-application-kit/commit/1a96e831c94250e10de61dee40e682a77313445f) [#1905](https://github.com/commercetools/merchant-center-application-kit/pull/1905) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`1a96e83`](https://github.com/commercetools/merchant-center-application-kit/commit/1a96e831c94250e10de61dee40e682a77313445f), [`e4dc8f8`](https://github.com/commercetools/merchant-center-application-kit/commit/e4dc8f88c1d101f846655e92a69505db6ba2acfd)]:
  - @commercetools-frontend/babel-preset-mc-app@17.6.2

## 17.6.0

### Patch Changes

- [`2287813`](https://github.com/commercetools/merchant-center-application-kit/commit/2287813c19a54b7edb7005d417c5f6a7b34cad1f) [#1871](https://github.com/commercetools/merchant-center-application-kit/pull/1871) Thanks [@emmenko](https://github.com/emmenko)! - Compile and bundle packages using [preconstruct](https://preconstruct.tools)

- Updated dependencies [[`2287813`](https://github.com/commercetools/merchant-center-application-kit/commit/2287813c19a54b7edb7005d417c5f6a7b34cad1f)]:
  - @commercetools-frontend/babel-preset-mc-app@17.6.0

## 17.4.1

### Patch Changes

- [`ec9e10f`](https://github.com/commercetools/merchant-center-application-kit/commit/ec9e10fde15351cc7cb825aaebb53cdb6e00e0d9) [#1889](https://github.com/commercetools/merchant-center-application-kit/pull/1889) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

- Updated dependencies [[`d832bd4`](https://github.com/commercetools/merchant-center-application-kit/commit/d832bd44c354aaf2374c0c75c9050c673998ff32), [`ec9e10f`](https://github.com/commercetools/merchant-center-application-kit/commit/ec9e10fde15351cc7cb825aaebb53cdb6e00e0d9)]:
  - @commercetools-frontend/babel-preset-mc-app@17.4.1

## 17.3.1

### Patch Changes

- [`89c4464`](https://github.com/commercetools/merchant-center-application-kit/commit/89c4464c334dd6c3922d031872286ad3bea8cf67) [#1872](https://github.com/commercetools/merchant-center-application-kit/pull/1872) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

- Updated dependencies [[`89c4464`](https://github.com/commercetools/merchant-center-application-kit/commit/89c4464c334dd6c3922d031872286ad3bea8cf67)]:
  - @commercetools-frontend/babel-preset-mc-app@17.3.1

## 17.3.0

### Patch Changes

- [`71c9111`](https://github.com/commercetools/merchant-center-application-kit/commit/71c9111308832009d1a27e91e4f2d2da4c53367c) [#1866](https://github.com/commercetools/merchant-center-application-kit/pull/1866) Thanks [@emmenko](https://github.com/emmenko)! - Update to uikit v10.39.8

- Updated dependencies [[`71c9111`](https://github.com/commercetools/merchant-center-application-kit/commit/71c9111308832009d1a27e91e4f2d2da4c53367c)]:
  - @commercetools-frontend/babel-preset-mc-app@17.3.0

## 17.2.1

### Patch Changes

- [`310e98c`](https://github.com/commercetools/merchant-center-application-kit/commit/310e98c39c0b6479175b7685b3f29ea0a5baa22b) Thanks [@emmenko](https://github.com/emmenko)! - Update dependencies (https://github.com/commercetools/merchant-center-application-kit/pull/1857)

- Updated dependencies [[`310e98c`](https://github.com/commercetools/merchant-center-application-kit/commit/310e98c39c0b6479175b7685b3f29ea0a5baa22b), [`9003354`](https://github.com/commercetools/merchant-center-application-kit/commit/9003354080a08f8423e9689cdf49657dca4edaf0)]:
  - @commercetools-frontend/babel-preset-mc-app@17.2.1

## 17.2.0

### Patch Changes

- [`e0ec004`](https://github.com/commercetools/merchant-center-application-kit/commit/e0ec004d611f93b24f015120d09f6f18389b219f) [#1854](https://github.com/commercetools/merchant-center-application-kit/pull/1854) Thanks [@emmenko](https://github.com/emmenko)! - chore: update deps

- Updated dependencies [[`e0ec004`](https://github.com/commercetools/merchant-center-application-kit/commit/e0ec004d611f93b24f015120d09f6f18389b219f)]:
  - @commercetools-frontend/babel-preset-mc-app@17.2.0

## 17.1.4

### Patch Changes

- Updated dependencies [[`56d4361`](https://github.com/commercetools/merchant-center-application-kit/commit/56d43616ca78623530a89b912bc5501f47faa54e)]:
  - @commercetools-frontend/babel-preset-mc-app@17.1.4

## 17.1.0

### Minor Changes

- [`eb545e0`](https://github.com/commercetools/merchant-center-application-kit/commit/eb545e088af38af86611a2c0b7b69a16a5318b4b) [#1819](https://github.com/commercetools/merchant-center-application-kit/pull/1819) Thanks [@tdeekens](https://github.com/tdeekens)! - feat: adds the ability to opt into the new `automatic` JSX runtime

  Recent React versions support a new JSX runtime. Read more about it [here](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html).

  You may opt into the new runtime in `automatic` mode by setting the `ENABLE_NEW_JSX_TRANSFORM` environment variable to `true`. Please note you need at least React v17 or v16.14 in your application.
  Opting into the new JSX transform automatically also changes the Babel, Jest and ESLint configurations. As a consequence ESLint will warn whenever it discovers React being in scope by importing it as `import React from 'react`'. You have to remove those imports using the respective codemod by running `npx react-codemod update-react-imports`.

  Lastly, all code of the Merchant Center Application Kit will continue to be bundled in `classic` mode to support older versions of React.

### Patch Changes

- [`5d9d5da`](https://github.com/commercetools/merchant-center-application-kit/commit/5d9d5da44364fe5590b67be21ac3630e177326e3) [#1820](https://github.com/commercetools/merchant-center-application-kit/pull/1820) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

* [`368ffbd`](https://github.com/commercetools/merchant-center-application-kit/commit/368ffbd94de4cf689ce42cfc222c39f52ddc14c5) [#1824](https://github.com/commercetools/merchant-center-application-kit/pull/1824) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update dependency pkg-dir to v5 dropping support for Node.js v10

* Updated dependencies [[`eb545e0`](https://github.com/commercetools/merchant-center-application-kit/commit/eb545e088af38af86611a2c0b7b69a16a5318b4b)]:
  - @commercetools-frontend/babel-preset-mc-app@17.1.0

## 17.0.1

### Patch Changes

- [`71c5f78`](https://github.com/commercetools/merchant-center-application-kit/commit/71c5f7875c7476e34b65d37046d48ca47e96f12e) [#1795](https://github.com/commercetools/merchant-center-application-kit/pull/1795) Thanks [@renovate](https://github.com/apps/renovate)! - update dependencies

- Updated dependencies [[`71c5f78`](https://github.com/commercetools/merchant-center-application-kit/commit/71c5f7875c7476e34b65d37046d48ca47e96f12e)]:
  - @commercetools-frontend/babel-preset-mc-app@17.0.1

## 17.0.0

### Patch Changes

- [`633d8c7`](https://github.com/commercetools/merchant-center-application-kit/commit/633d8c7b8ddc2f25128d8249579b7bb287a62e30) [#1805](https://github.com/commercetools/merchant-center-application-kit/pull/1805) Thanks [@emmenko](https://github.com/emmenko)! - update deps

## 16.18.0

### Patch Changes

- [`8cdb025`](https://github.com/commercetools/merchant-center-application-kit/commit/8cdb02591b718406c910a2c4128d4be3dfe24785) [#1776](https://github.com/commercetools/merchant-center-application-kit/pull/1776) Thanks [@renovate](https://github.com/apps/renovate)! - update deps

## 16.17.2

### Patch Changes

- [`9752622`](https://github.com/commercetools/merchant-center-application-kit/commit/9752622b7422e821bb62d61af360a01f6994dc6b) [#1758](https://github.com/commercetools/merchant-center-application-kit/pull/1758) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

## 16.17.0

### Patch Changes

- [`786c697`](https://github.com/commercetools/merchant-center-application-kit/commit/786c6978c1febf927db6b45c758498b72e8e48be) [#1745](https://github.com/commercetools/merchant-center-application-kit/pull/1745) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

* [`178ff31`](https://github.com/commercetools/merchant-center-application-kit/commit/178ff317426e0cfcfe1c0adf42a9eada3b134642) [#1734](https://github.com/commercetools/merchant-center-application-kit/pull/1734) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

- [`9bc8558`](https://github.com/commercetools/merchant-center-application-kit/commit/9bc85581d336c7d75fda5dc82a1c02f32f16c1fb) [#1704](https://github.com/commercetools/merchant-center-application-kit/pull/1704) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`9bc8558`](https://github.com/commercetools/merchant-center-application-kit/commit/9bc85581d336c7d75fda5dc82a1c02f32f16c1fb)]:
  - @commercetools-frontend/babel-preset-mc-app@16.17.0

## 16.16.4

### Patch Changes

- [`d8915a8`](https://github.com/commercetools/merchant-center-application-kit/commit/d8915a8b29ac940839720d5912a1ef0050b9ada5) [#1713](https://github.com/commercetools/merchant-center-application-kit/pull/1713) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update dependency @testing-library/react to v11

  Added support for both @testing-library/react to v11 and v10.

## 16.16.1

### Patch Changes

- [`bc15ac2`](https://github.com/commercetools/merchant-center-application-kit/commit/bc15ac2f6d53d4c8e0d53ceb6c1a0e5ba0f5353e) [#1692](https://github.com/commercetools/merchant-center-application-kit/pull/1692) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

- Updated dependencies [[`bc15ac2`](https://github.com/commercetools/merchant-center-application-kit/commit/bc15ac2f6d53d4c8e0d53ceb6c1a0e5ba0f5353e)]:
  - @commercetools-frontend/babel-preset-mc-app@16.16.1

## 16.16.0

### Patch Changes

- [`f144292`](https://github.com/commercetools/merchant-center-application-kit/commit/f1442921650ca4e6c9bf61ce31bda2b63e72038a) [#1673](https://github.com/commercetools/merchant-center-application-kit/pull/1673) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

- Updated dependencies [[`f144292`](https://github.com/commercetools/merchant-center-application-kit/commit/f1442921650ca4e6c9bf61ce31bda2b63e72038a)]:
  - @commercetools-frontend/babel-preset-mc-app@16.16.0

## 16.15.8

### Patch Changes

- [`43fdb3d`](https://github.com/commercetools/merchant-center-application-kit/commit/43fdb3d6465911c99a3abcfedd8e96ea54b4941c) [#1663](https://github.com/commercetools/merchant-center-application-kit/pull/1663) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update dependency cosmiconfig to v7

## 16.15.3

### Patch Changes

- [`6d98245`](https://github.com/commercetools/merchant-center-application-kit/commit/6d98245615ddb83e805e5cc2cc0620920b4a71c7) [#1643](https://github.com/commercetools/merchant-center-application-kit/pull/1643) Thanks [@emmenko](https://github.com/emmenko)! - Update copyright date to 2020 in LICENSE files

- Updated dependencies [[`6d98245`](https://github.com/commercetools/merchant-center-application-kit/commit/6d98245615ddb83e805e5cc2cc0620920b4a71c7)]:
  - @commercetools-frontend/babel-preset-mc-app@16.15.3

## 16.15.2

### Patch Changes

- [`0f3dcc3`](https://github.com/commercetools/merchant-center-application-kit/commit/0f3dcc38c81a5fb3c668faecce9a13057f66a66b) [#1638](https://github.com/commercetools/merchant-center-application-kit/pull/1638) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`0f3dcc3`](https://github.com/commercetools/merchant-center-application-kit/commit/0f3dcc38c81a5fb3c668faecce9a13057f66a66b)]:
  - @commercetools-frontend/babel-preset-mc-app@16.15.2

## 16.15.0

### Patch Changes

- [`cc8b37b`](https://github.com/commercetools/merchant-center-application-kit/commit/cc8b37bf85d4683a605a6c3233100627e670ebe7) [#1627](https://github.com/commercetools/merchant-center-application-kit/pull/1627) Thanks [@renovate](https://github.com/apps/renovate)! - chore: update dependencies

- Updated dependencies [[`72c42f4`](https://github.com/commercetools/merchant-center-application-kit/commit/72c42f4eb05f690914372281f2361630e2184687)]:
  - @commercetools-frontend/babel-preset-mc-app@16.15.0

## 16.14.0

### Patch Changes

- [`779100b`](https://github.com/commercetools/merchant-center-application-kit/commit/779100b432ad448eefec311f31f87891f35489f6) [#1608](https://github.com/commercetools/merchant-center-application-kit/pull/1608) Thanks [@renovate](https://github.com/apps/renovate)! - Update all dependencies

* [`4168061`](https://github.com/commercetools/merchant-center-application-kit/commit/41680612042d476422776e5eaa254450bf874581) [#1618](https://github.com/commercetools/merchant-center-application-kit/pull/1618) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

* Updated dependencies [[`4168061`](https://github.com/commercetools/merchant-center-application-kit/commit/41680612042d476422776e5eaa254450bf874581)]:
  - @commercetools-frontend/babel-preset-mc-app@16.14.0

## 16.12.1

### Patch Changes

- [`f1946cc`](https://github.com/commercetools/merchant-center-application-kit/commit/f1946cc841906820235c8cb1bab0c2a92ae7601a) [#1593](https://github.com/commercetools/merchant-center-application-kit/pull/1593) Thanks [@tdeekens](https://github.com/tdeekens)! - fix(jest-preset-mc-app): to import with cjs

## 16.12.0

### Patch Changes

- [`640051f`](https://github.com/commercetools/merchant-center-application-kit/commit/640051f9713815a27997a15849a557b5d5450155) [#1586](https://github.com/commercetools/merchant-center-application-kit/pull/1586) Thanks [@tdeekens](https://github.com/tdeekens)! - feat(jest-preset-mc-app): add config for rtl

* [`fa6386c`](https://github.com/commercetools/merchant-center-application-kit/commit/fa6386c347df0505235c199232353bc315a47c81) [#1587](https://github.com/commercetools/merchant-center-application-kit/pull/1587) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

* Updated dependencies [[`fa6386c`](https://github.com/commercetools/merchant-center-application-kit/commit/fa6386c347df0505235c199232353bc315a47c81)]:
  - @commercetools-frontend/babel-preset-mc-app@16.12.0

## 16.10.0

### Patch Changes

- [`f8f8609`](https://github.com/commercetools/merchant-center-application-kit/commit/f8f86098687c8cecaaec1b13debabe290b007b58) [#1573](https://github.com/commercetools/merchant-center-application-kit/pull/1573) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

## 16.9.2

### Patch Changes

- [`aabc88f`](https://github.com/commercetools/merchant-center-application-kit/commit/aabc88f23b58946aa5619c0fb58a2bddbfcae146) [#1566](https://github.com/commercetools/merchant-center-application-kit/pull/1566) Thanks [@emmenko](https://github.com/emmenko)! - Pass correct args to `fs.writeFile`

## 16.9.1

### Patch Changes

- [`f92ec54`](https://github.com/commercetools/merchant-center-application-kit/commit/f92ec54e78edb668e8dff53342e8542e96d8c319) [#1551](https://github.com/commercetools/merchant-center-application-kit/pull/1551) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`f92ec54`](https://github.com/commercetools/merchant-center-application-kit/commit/f92ec54e78edb668e8dff53342e8542e96d8c319)]:
  - @commercetools-frontend/babel-preset-mc-app@16.9.1

## 16.9.0

### Patch Changes

- [`ccbabfd`](https://github.com/commercetools/merchant-center-application-kit/commit/ccbabfdc75972aedcc12e833cc958b5585cb6d60) [#1549](https://github.com/commercetools/merchant-center-application-kit/pull/1549) Thanks [@tdeekens](https://github.com/tdeekens)! - chore: update deps to prepare for release

## 16.8.8

### Patch Changes

- [`0925da6`](https://github.com/commercetools/merchant-center-application-kit/commit/0925da6f11e35cc712cc12337716f846a67c0e4c) [#1537](https://github.com/commercetools/merchant-center-application-kit/pull/1537) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`0925da6`](https://github.com/commercetools/merchant-center-application-kit/commit/0925da6f11e35cc712cc12337716f846a67c0e4c)]:
  - @commercetools-frontend/babel-preset-mc-app@16.8.8

## 16.8.6

### Patch Changes

- [`9391762`](https://github.com/commercetools/merchant-center-application-kit/commit/939176298df3558970a267b6e6478051a355ffae) [#1530](https://github.com/commercetools/merchant-center-application-kit/pull/1530) Thanks [@emmenko](https://github.com/emmenko)! - Update `@commercetools-uikit/*` packages to `10.21.0`

- Updated dependencies [[`9391762`](https://github.com/commercetools/merchant-center-application-kit/commit/939176298df3558970a267b6e6478051a355ffae)]:
  - @commercetools-frontend/babel-preset-mc-app@16.8.6

## 16.8.5

### Patch Changes

- [`a66fb1f`](https://github.com/commercetools/merchant-center-application-kit/commit/a66fb1f37a06271b0fad0b2a3f6ea41c61455f0e) [#1518](https://github.com/commercetools/merchant-center-application-kit/pull/1518) Thanks [@tdeekens](https://github.com/tdeekens)! - chore(deps): update all dependencies

* [`a66fb1f`](https://github.com/commercetools/merchant-center-application-kit/commit/a66fb1f37a06271b0fad0b2a3f6ea41c61455f0e) [#1518](https://github.com/commercetools/merchant-center-application-kit/pull/1518) Thanks [@tdeekens](https://github.com/tdeekens)! - Update remaining dependencies

## 16.8.4

### Patch Changes

- [`6ffe293`](https://github.com/commercetools/merchant-center-application-kit/commit/6ffe29312433e357ac6c57ce39e98cf9cba49ba5) [#1508](https://github.com/commercetools/merchant-center-application-kit/pull/1508) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

## 16.8.2

### Patch Changes

- [`1ace0e6`](https://github.com/commercetools/merchant-center-application-kit/commit/1ace0e65d73911751ef6dbb6e083fb2dc6ac8f29) [#1497](https://github.com/commercetools/merchant-center-application-kit/pull/1497) Thanks [@emmenko](https://github.com/emmenko)! - Allow to use `eslint@7` and `jest@26`
