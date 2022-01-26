# @commercetools-frontend/mc-scripts

## 21.0.0-rc.2

### Patch Changes

- [#2430](https://github.com/commercetools/merchant-center-application-kit/pull/2430) [`8fbae1d9`](https://github.com/commercetools/merchant-center-application-kit/commit/8fbae1d92a34e1ddbd5bfbae4ef6a0bb234847d6) Thanks [@emmenko](https://github.com/emmenko)! - Upgrade `react-dev-utils` to `v12`

* [#2430](https://github.com/commercetools/merchant-center-application-kit/pull/2430) [`d8e36891`](https://github.com/commercetools/merchant-center-application-kit/commit/d8e36891b3a78c5475818f96d068e4cdd1ab1a3e) Thanks [@emmenko](https://github.com/emmenko)! - Include fallback polyfills in Webpack config for `url` and `querystring`.

## 21.0.0-rc.1

### Patch Changes

- [#2430](https://github.com/commercetools/merchant-center-application-kit/pull/2430) [`5ea8baf1`](https://github.com/commercetools/merchant-center-application-kit/commit/5ea8baf1b2ca2661aac9a6a572d2c8e596ee0b2c) Thanks [@emmenko](https://github.com/emmenko)! - Use version range for Babel packages.

- Updated dependencies [[`5ea8baf1`](https://github.com/commercetools/merchant-center-application-kit/commit/5ea8baf1b2ca2661aac9a6a572d2c8e596ee0b2c), [`1bee4f25`](https://github.com/commercetools/merchant-center-application-kit/commit/1bee4f25043af3e6408f624fa3e632bd7e39a587)]:
  - @commercetools-frontend/application-config@21.0.0-rc.1
  - @commercetools-frontend/babel-preset-mc-app@21.0.0-rc.1
  - @commercetools-frontend/mc-dev-authentication@21.0.0-rc.1
  - @commercetools-frontend/mc-html-template@21.0.0-rc.1
  - @commercetools-frontend/assets@21.0.0-rc.1

## 21.0.0-rc.0

### Major Changes

- [#2430](https://github.com/commercetools/merchant-center-application-kit/pull/2430) [`1c363fad`](https://github.com/commercetools/merchant-center-application-kit/commit/1c363fad7ab770a739ac8080358e41ae4af42074) Thanks [@emmenko](https://github.com/emmenko)! - Drop Node.js `v12`. Recommended min Node.js version is `v14` or `v16`.

* [#2430](https://github.com/commercetools/merchant-center-application-kit/pull/2430) [`07f5b00f`](https://github.com/commercetools/merchant-center-application-kit/commit/07f5b00f3045a3e30462a1150e6ba85fcecc9098) Thanks [@emmenko](https://github.com/emmenko)! - Following breaking changes were introduced:

  - In `mc-scripts`, the `build` command additionally compiles the `index.html` by default.
  - Running the `compile-html` command by default should not be necessary anymore. However, you can pass `--build-only` to the `build` command to opt-out of the compilation step, in case you want to run it separately, for example to use the `--transformer`.
  - Running the `compile-html` command by default does not print to `stdout` the JSON string with the security headers. You can opt into the old behavior by passing the `--print-security-headers` option.
  - The `--inline-csp` of `compile-html` has been dropped, as it's now the built-in behavior.
  - The `dist` folder created by the `build` command has been removed. Instead, the `build` command writes the production bundles directly into the `public` folder.

  For more information see [Release notes v21](https://docs.commercetools.com/custom-applications/releases/2022-01-31-custom-applications-v21).

### Patch Changes

- [#2450](https://github.com/commercetools/merchant-center-application-kit/pull/2450) [`eb8f5b2c`](https://github.com/commercetools/merchant-center-application-kit/commit/eb8f5b2c885a4c3ffc7857a61e50508b429bf964) Thanks [@emmenko](https://github.com/emmenko)! - Update dependencies

- Updated dependencies [[`eb8f5b2c`](https://github.com/commercetools/merchant-center-application-kit/commit/eb8f5b2c885a4c3ffc7857a61e50508b429bf964), [`b8fb4cbb`](https://github.com/commercetools/merchant-center-application-kit/commit/b8fb4cbbb8b78ff18af7edf8100703f7f9712187), [`1c363fad`](https://github.com/commercetools/merchant-center-application-kit/commit/1c363fad7ab770a739ac8080358e41ae4af42074), [`07f5b00f`](https://github.com/commercetools/merchant-center-application-kit/commit/07f5b00f3045a3e30462a1150e6ba85fcecc9098)]:
  - @commercetools-frontend/application-config@21.0.0-rc.0
  - @commercetools-frontend/babel-preset-mc-app@21.0.0-rc.0
  - @commercetools-frontend/mc-html-template@21.0.0-rc.0
  - @commercetools-frontend/mc-dev-authentication@21.0.0-rc.0

## 20.13.0

### Patch Changes

- [#2420](https://github.com/commercetools/merchant-center-application-kit/pull/2420) [`02b00565`](https://github.com/commercetools/merchant-center-application-kit/commit/02b00565c25e34c2dadea4e060e665e4ff39639f) Thanks [@renovate](https://github.com/apps/renovate)! - Upgrade SVGR packages to v6

* [#2445](https://github.com/commercetools/merchant-center-application-kit/pull/2445) [`62e4fc87`](https://github.com/commercetools/merchant-center-application-kit/commit/62e4fc87792a815c743acf88d359f8256cc54cb6) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update dependency shelljs to v0.8.5 [security]

## 20.12.3

### Patch Changes

- [#2433](https://github.com/commercetools/merchant-center-application-kit/pull/2433) [`d65e29e4`](https://github.com/commercetools/merchant-center-application-kit/commit/d65e29e4eea4d1809abaa8cc82cc246c681dfa27) Thanks [@emmenko](https://github.com/emmenko)! - Replace `ts-jest/utils` with `jest-mock`, for using the `mocked` function.

* [#2433](https://github.com/commercetools/merchant-center-application-kit/pull/2433) [`d65e29e4`](https://github.com/commercetools/merchant-center-application-kit/commit/d65e29e4eea4d1809abaa8cc82cc246c681dfa27) Thanks [@emmenko](https://github.com/emmenko)! - Update dependencies

* Updated dependencies [[`630ee1b5`](https://github.com/commercetools/merchant-center-application-kit/commit/630ee1b5d0c70c05104eaf4712b1db662fe8f8f7), [`d65e29e4`](https://github.com/commercetools/merchant-center-application-kit/commit/d65e29e4eea4d1809abaa8cc82cc246c681dfa27), [`d65e29e4`](https://github.com/commercetools/merchant-center-application-kit/commit/d65e29e4eea4d1809abaa8cc82cc246c681dfa27)]:
  - @commercetools-frontend/application-config@20.12.3
  - @commercetools-frontend/assets@20.12.3
  - @commercetools-frontend/babel-preset-mc-app@20.12.3
  - @commercetools-frontend/mc-html-template@20.12.3

## 20.12.1

### Patch Changes

- [#2384](https://github.com/commercetools/merchant-center-application-kit/pull/2384) [`cf914004`](https://github.com/commercetools/merchant-center-application-kit/commit/cf9140043ade6edb3ee71a7558b757f5e19bee81) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

- Updated dependencies [[`6f02335c`](https://github.com/commercetools/merchant-center-application-kit/commit/6f02335cd1fc05751e0398945b9d0fde0ef86c35), [`cf914004`](https://github.com/commercetools/merchant-center-application-kit/commit/cf9140043ade6edb3ee71a7558b757f5e19bee81)]:
  - @commercetools-frontend/assets@20.12.1
  - @commercetools-frontend/application-config@20.12.1
  - @commercetools-frontend/babel-preset-mc-app@20.12.1
  - @commercetools-frontend/mc-html-template@20.12.1

## 20.12.0

### Patch Changes

- Updated dependencies [[`f549637b`](https://github.com/commercetools/merchant-center-application-kit/commit/f549637b4a235ecc768ca77710784ddf63d1889b)]:
  - @commercetools-frontend/application-config@20.12.0
  - @commercetools-frontend/assets@20.12.0
  - @commercetools-frontend/mc-html-template@20.12.0

## 20.11.0

### Patch Changes

- [#2400](https://github.com/commercetools/merchant-center-application-kit/pull/2400) [`fc7f62ba`](https://github.com/commercetools/merchant-center-application-kit/commit/fc7f62bad0bad3d432bb52438e3bbf0660130bf4) Thanks [@emmenko](https://github.com/emmenko)! - Add experimental flag `--inline-csp` to `compile-html` command. If defined, the `Content-Security-Policy` header is injected in the `index.html` as a meta tag.

- Updated dependencies [[`fc7f62ba`](https://github.com/commercetools/merchant-center-application-kit/commit/fc7f62bad0bad3d432bb52438e3bbf0660130bf4), [`59b72adf`](https://github.com/commercetools/merchant-center-application-kit/commit/59b72adff45d631d751a32541fa23d2d5d795b3f), [`fc7f62ba`](https://github.com/commercetools/merchant-center-application-kit/commit/fc7f62bad0bad3d432bb52438e3bbf0660130bf4)]:
  - @commercetools-frontend/mc-html-template@20.11.0
  - @commercetools-frontend/application-config@20.11.0

## 20.10.6

### Patch Changes

- [#2386](https://github.com/commercetools/merchant-center-application-kit/pull/2386) [`d7fcf6fc`](https://github.com/commercetools/merchant-center-application-kit/commit/d7fcf6fc8495d4eae68e0a4f4c1f1b3e0e394454) Thanks [@emmenko](https://github.com/emmenko)! - Upgrade to Yarn v3

* [#2386](https://github.com/commercetools/merchant-center-application-kit/pull/2386) [`d7fcf6fc`](https://github.com/commercetools/merchant-center-application-kit/commit/d7fcf6fc8495d4eae68e0a4f4c1f1b3e0e394454) Thanks [@emmenko](https://github.com/emmenko)! - Allow to pass a relative path for transformer option

* Updated dependencies [[`d7fcf6fc`](https://github.com/commercetools/merchant-center-application-kit/commit/d7fcf6fc8495d4eae68e0a4f4c1f1b3e0e394454)]:
  - @commercetools-frontend/application-config@20.10.6
  - @commercetools-frontend/assets@20.10.6
  - @commercetools-frontend/babel-preset-mc-app@20.10.6
  - @commercetools-frontend/mc-dev-authentication@20.10.6
  - @commercetools-frontend/mc-html-template@20.10.6

## 20.10.4

### Patch Changes

- [#2383](https://github.com/commercetools/merchant-center-application-kit/pull/2383) [`21a115ee`](https://github.com/commercetools/merchant-center-application-kit/commit/21a115eead26af1390cd3cbd60bfcf198afe2812) Thanks [@emmenko](https://github.com/emmenko)! - Fix property access for optional object.

* [#2380](https://github.com/commercetools/merchant-center-application-kit/pull/2380) [`7fa4d7d0`](https://github.com/commercetools/merchant-center-application-kit/commit/7fa4d7d0c560226eba69ccb73c4014879939e8da) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

* Updated dependencies [[`7fa4d7d0`](https://github.com/commercetools/merchant-center-application-kit/commit/7fa4d7d0c560226eba69ccb73c4014879939e8da)]:
  - @commercetools-frontend/application-config@20.10.4
  - @commercetools-frontend/babel-preset-mc-app@20.10.4
  - @commercetools-frontend/mc-html-template@20.10.4

## 20.10.3

### Patch Changes

- [#2376](https://github.com/commercetools/merchant-center-application-kit/pull/2376) [`9d879503`](https://github.com/commercetools/merchant-center-application-kit/commit/9d879503f7af467729291d66a35625b6e7cbb385) Thanks [@emmenko](https://github.com/emmenko)! - > For commercetools only.

  Allow to use OIDC login when developing against a local running MC API.

* [#2362](https://github.com/commercetools/merchant-center-application-kit/pull/2362) [`f6b3ae02`](https://github.com/commercetools/merchant-center-application-kit/commit/f6b3ae02133927642976f976d2d2fd5eb675ce84) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

* Updated dependencies [[`9d879503`](https://github.com/commercetools/merchant-center-application-kit/commit/9d879503f7af467729291d66a35625b6e7cbb385), [`f6b3ae02`](https://github.com/commercetools/merchant-center-application-kit/commit/f6b3ae02133927642976f976d2d2fd5eb675ce84)]:
  - @commercetools-frontend/application-config@20.10.3
  - @commercetools-frontend/mc-dev-authentication@20.10.3
  - @commercetools-frontend/babel-preset-mc-app@20.10.3
  - @commercetools-frontend/mc-html-template@20.10.3

## 20.10.1

### Patch Changes

- [#2348](https://github.com/commercetools/merchant-center-application-kit/pull/2348) [`3247e604`](https://github.com/commercetools/merchant-center-application-kit/commit/3247e6048533a72c9f64cd316621dd51471cd1a8) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

* [#2342](https://github.com/commercetools/merchant-center-application-kit/pull/2342) [`91ba0910`](https://github.com/commercetools/merchant-center-application-kit/commit/91ba0910ce09ab7f3552fd381983724a63d7243d) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- [#2356](https://github.com/commercetools/merchant-center-application-kit/pull/2356) [`e34fe076`](https://github.com/commercetools/merchant-center-application-kit/commit/e34fe076aab6681cdcc54622d84123f2c22020e6) Thanks [@ByronDWall](https://github.com/ByronDWall)! - set node version to 16.8 in nvmrc to avoid a bug in node/v8

- Updated dependencies [[`3247e604`](https://github.com/commercetools/merchant-center-application-kit/commit/3247e6048533a72c9f64cd316621dd51471cd1a8), [`91ba0910`](https://github.com/commercetools/merchant-center-application-kit/commit/91ba0910ce09ab7f3552fd381983724a63d7243d), [`e34fe076`](https://github.com/commercetools/merchant-center-application-kit/commit/e34fe076aab6681cdcc54622d84123f2c22020e6)]:
  - @commercetools-frontend/application-config@20.10.1
  - @commercetools-frontend/babel-preset-mc-app@20.10.1
  - @commercetools-frontend/mc-html-template@20.10.1
  - @commercetools-frontend/assets@20.10.1
  - @commercetools-frontend/mc-dev-authentication@20.10.1

## 20.9.4

### Patch Changes

- [#2331](https://github.com/commercetools/merchant-center-application-kit/pull/2331) [`670ec977`](https://github.com/commercetools/merchant-center-application-kit/commit/670ec977ecf711b2e363da50830b831863e3a756) Thanks [@emmenko](https://github.com/emmenko)! - Upgrade to [Apollo Client v3.4](https://github.com/apollographql/apollo-client/blob/main/CHANGELOG.md#apollo-client-340).

* [#2336](https://github.com/commercetools/merchant-center-application-kit/pull/2336) [`8c6c13a7`](https://github.com/commercetools/merchant-center-application-kit/commit/8c6c13a79f91ea9476983e12c48ae834ca4640c1) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

* Updated dependencies [[`d7b712e4`](https://github.com/commercetools/merchant-center-application-kit/commit/d7b712e44e0dbd7c3d477f08493e3e0004817d79), [`8c6c13a7`](https://github.com/commercetools/merchant-center-application-kit/commit/8c6c13a79f91ea9476983e12c48ae834ca4640c1)]:
  - @commercetools-frontend/application-config@20.9.4
  - @commercetools-frontend/babel-preset-mc-app@20.9.4
  - @commercetools-frontend/mc-html-template@20.9.4

## 20.9.3

### Patch Changes

- [#2318](https://github.com/commercetools/merchant-center-application-kit/pull/2318) [`83f2add2`](https://github.com/commercetools/merchant-center-application-kit/commit/83f2add2a56ba6696c51fd930a0a1dadbf36c134) Thanks [@renovate](https://github.com/apps/renovate)! - Update all dependencies

* [#2334](https://github.com/commercetools/merchant-center-application-kit/pull/2334) [`869a3b6d`](https://github.com/commercetools/merchant-center-application-kit/commit/869a3b6d960dad25f57228b6122bbb80a2c9ad55) Thanks [@emmenko](https://github.com/emmenko)! - Fix web socket configuration to make HMR work.

* Updated dependencies [[`83f2add2`](https://github.com/commercetools/merchant-center-application-kit/commit/83f2add2a56ba6696c51fd930a0a1dadbf36c134)]:
  - @commercetools-frontend/application-config@20.9.3
  - @commercetools-frontend/babel-preset-mc-app@20.9.3
  - @commercetools-frontend/mc-html-template@20.9.3

## 20.9.2

### Patch Changes

- Updated dependencies [[`9e6e31f4`](https://github.com/commercetools/merchant-center-application-kit/commit/9e6e31f4deddbbd1bb8a6cb67346af40fb6acbdd)]:
  - @commercetools-frontend/application-config@20.9.2
  - @commercetools-frontend/mc-html-template@20.9.2

## 20.9.1

### Patch Changes

- Updated dependencies [[`b2d58de3`](https://github.com/commercetools/merchant-center-application-kit/commit/b2d58de3febf627296f7aa85e17dd7b74fc88174)]:
  - @commercetools-frontend/application-config@20.9.1
  - @commercetools-frontend/mc-html-template@20.9.1

## 20.9.0

### Patch Changes

- Updated dependencies [[`487fcca6`](https://github.com/commercetools/merchant-center-application-kit/commit/487fcca6bcc03a4df59830e5204ca89cc5395df4)]:
  - @commercetools-frontend/application-config@20.9.0
  - @commercetools-frontend/babel-preset-mc-app@20.9.0
  - @commercetools-frontend/mc-html-template@20.9.0

## 20.8.0

### Patch Changes

- [#2296](https://github.com/commercetools/merchant-center-application-kit/pull/2296) [`85608163`](https://github.com/commercetools/merchant-center-application-kit/commit/85608163b25d3f7ddb2e747e1f3609d213b0d4ca) Thanks [@emmenko](https://github.com/emmenko)! - Update `@pmmmwh/react-refresh-webpack-plugin` to `0.5.0-rc.2`

* [#2314](https://github.com/commercetools/merchant-center-application-kit/pull/2314) [`13cc96d8`](https://github.com/commercetools/merchant-center-application-kit/commit/13cc96d8105232f55aecf9481b70b002dfcc948a) Thanks [@emmenko](https://github.com/emmenko)! - Migrate `webpack-dev-server` options to `v4.0.0-rc.0`

- [#2300](https://github.com/commercetools/merchant-center-application-kit/pull/2300) [`b3437eab`](https://github.com/commercetools/merchant-center-application-kit/commit/b3437eab6fd7b1529f5eac78eda658028474afa7) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

- Updated dependencies [[`ca4e1441`](https://github.com/commercetools/merchant-center-application-kit/commit/ca4e14410537c2eadaccfb537431036fb8fae883), [`ca4e1441`](https://github.com/commercetools/merchant-center-application-kit/commit/ca4e14410537c2eadaccfb537431036fb8fae883), [`ca4e1441`](https://github.com/commercetools/merchant-center-application-kit/commit/ca4e14410537c2eadaccfb537431036fb8fae883), [`b3437eab`](https://github.com/commercetools/merchant-center-application-kit/commit/b3437eab6fd7b1529f5eac78eda658028474afa7)]:
  - @commercetools-frontend/mc-html-template@20.8.0
  - @commercetools-frontend/assets@20.8.0
  - @commercetools-frontend/application-config@20.8.0
  - @commercetools-frontend/babel-preset-mc-app@20.8.0

## 20.7.0

### Patch Changes

- [#2293](https://github.com/commercetools/merchant-center-application-kit/pull/2293) [`c7325b0d`](https://github.com/commercetools/merchant-center-application-kit/commit/c7325b0d4e45132ff0c9a5243132537057dfa406) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

* [#2287](https://github.com/commercetools/merchant-center-application-kit/pull/2287) [`f5aa350a`](https://github.com/commercetools/merchant-center-application-kit/commit/f5aa350a29983383dd5933ac38c0beb56f0b9cf5) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- [#2289](https://github.com/commercetools/merchant-center-application-kit/pull/2289) [`af5d6c3d`](https://github.com/commercetools/merchant-center-application-kit/commit/af5d6c3d9997e0cec57914d82020a978a6f35421) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update dependency mini-css-extract-plugin to v2

- Updated dependencies [[`f5aa350a`](https://github.com/commercetools/merchant-center-application-kit/commit/f5aa350a29983383dd5933ac38c0beb56f0b9cf5)]:
  - @commercetools-frontend/application-config@20.7.0
  - @commercetools-frontend/babel-preset-mc-app@20.7.0
  - @commercetools-frontend/mc-html-template@20.7.0

## 20.5.2

### Patch Changes

- [#2273](https://github.com/commercetools/merchant-center-application-kit/pull/2273) [`b96d4f3d`](https://github.com/commercetools/merchant-center-application-kit/commit/b96d4f3d6ab177da66bc8cab337172bf3a85b2c6) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

- Updated dependencies [[`bdc1330f`](https://github.com/commercetools/merchant-center-application-kit/commit/bdc1330fc12d72118a6fa45ed44d0064413d0713), [`b96d4f3d`](https://github.com/commercetools/merchant-center-application-kit/commit/b96d4f3d6ab177da66bc8cab337172bf3a85b2c6)]:
  - @commercetools-frontend/mc-html-template@20.5.2
  - @commercetools-frontend/application-config@20.5.2
  - @commercetools-frontend/babel-preset-mc-app@20.5.2

## 20.5.1

### Patch Changes

- [#2265](https://github.com/commercetools/merchant-center-application-kit/pull/2265) [`1a2e3258`](https://github.com/commercetools/merchant-center-application-kit/commit/1a2e32585546f8af6dc819b71c7d2fed043e15f7) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update dependency postcss-loader to v6

* [#2264](https://github.com/commercetools/merchant-center-application-kit/pull/2264) [`e0ea1333`](https://github.com/commercetools/merchant-center-application-kit/commit/e0ea1333218aa7a916ff0971a52ed8175be4d697) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- [#2268](https://github.com/commercetools/merchant-center-application-kit/pull/2268) [`c370f242`](https://github.com/commercetools/merchant-center-application-kit/commit/c370f242bb85bc0041b4825bc4ebc877eaaa61e4) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

- Updated dependencies [[`e0ea1333`](https://github.com/commercetools/merchant-center-application-kit/commit/e0ea1333218aa7a916ff0971a52ed8175be4d697), [`c370f242`](https://github.com/commercetools/merchant-center-application-kit/commit/c370f242bb85bc0041b4825bc4ebc877eaaa61e4)]:
  - @commercetools-frontend/application-config@20.5.1
  - @commercetools-frontend/babel-preset-mc-app@20.5.1
  - @commercetools-frontend/mc-html-template@20.5.1

## 20.5.0

### Minor Changes

- [#2261](https://github.com/commercetools/merchant-center-application-kit/pull/2261) [`481fb8f8`](https://github.com/commercetools/merchant-center-application-kit/commit/481fb8f8ace9502e48d89eb81b58ebf70a5724ba) Thanks [@tdeekens](https://github.com/tdeekens)! - Adds the ability to explicitly disable core-js for `mc-scripts` and the webpack configs

  Some environments or build targets might not require core-js. In order to opt-out of it you can specify a `disableCoreJs` option.

### Patch Changes

- Updated dependencies [[`481fb8f8`](https://github.com/commercetools/merchant-center-application-kit/commit/481fb8f8ace9502e48d89eb81b58ebf70a5724ba), [`9aba0c49`](https://github.com/commercetools/merchant-center-application-kit/commit/9aba0c49d9ce643f66c58031c69b25ded9eb4859)]:
  - @commercetools-frontend/babel-preset-mc-app@20.5.0

## 20.4.0

### Patch Changes

- [#2247](https://github.com/commercetools/merchant-center-application-kit/pull/2247) [`f8f759b6`](https://github.com/commercetools/merchant-center-application-kit/commit/f8f759b6f0f6d8cc677efd90fecbd19d103c6a4f) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

- Updated dependencies [[`f8f759b6`](https://github.com/commercetools/merchant-center-application-kit/commit/f8f759b6f0f6d8cc677efd90fecbd19d103c6a4f)]:
  - @commercetools-frontend/application-config@20.4.0
  - @commercetools-frontend/babel-preset-mc-app@20.4.0
  - @commercetools-frontend/mc-html-template@20.4.0

## 20.3.3

### Patch Changes

- Updated dependencies [[`dc994692`](https://github.com/commercetools/merchant-center-application-kit/commit/dc99469254e8f7611479ab8c64663e2e04e16662), [`118efedd`](https://github.com/commercetools/merchant-center-application-kit/commit/118efeddf0c1349f18bc27a974bf88612a637004)]:
  - @commercetools-frontend/mc-html-template@20.3.3
  - @commercetools-frontend/application-config@20.3.3

## 20.3.1

### Patch Changes

- [#2230](https://github.com/commercetools/merchant-center-application-kit/pull/2230) [`035ec444`](https://github.com/commercetools/merchant-center-application-kit/commit/035ec444c928d6b13f299012cfcdd0dec0e68af8) Thanks [@tdeekens](https://github.com/tdeekens)! - fix: update left behind dependencies

* [#2234](https://github.com/commercetools/merchant-center-application-kit/pull/2234) [`4dd3398a`](https://github.com/commercetools/merchant-center-application-kit/commit/4dd3398a6cd951a29237e6e468f8accc8632981e) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

* Updated dependencies [[`4dd3398a`](https://github.com/commercetools/merchant-center-application-kit/commit/4dd3398a6cd951a29237e6e468f8accc8632981e)]:
  - @commercetools-frontend/application-config@20.3.1
  - @commercetools-frontend/babel-preset-mc-app@20.3.1
  - @commercetools-frontend/mc-html-template@20.3.1

## 20.3.0

### Patch Changes

- [#2223](https://github.com/commercetools/merchant-center-application-kit/pull/2223) [`6de28034`](https://github.com/commercetools/merchant-center-application-kit/commit/6de28034f51e53b3cd1f293eaa16b8f66d9ae9e0) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

* [#2226](https://github.com/commercetools/merchant-center-application-kit/pull/2226) [`2ceba5c8`](https://github.com/commercetools/merchant-center-application-kit/commit/2ceba5c8ba654b04e99ece62a3d71b692031b7f0) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update dependency dotenv to v10

- [#2212](https://github.com/commercetools/merchant-center-application-kit/pull/2212) [`5961c019`](https://github.com/commercetools/merchant-center-application-kit/commit/5961c019ab908bc1a5d58acd4511e7c579976797) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

* [#2213](https://github.com/commercetools/merchant-center-application-kit/pull/2213) [`665961f8`](https://github.com/commercetools/merchant-center-application-kit/commit/665961f8b17dcd718f201fb407e7f06287a4e478) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update dependency css-minimizer-webpack-plugin to v3

* Updated dependencies [[`6de28034`](https://github.com/commercetools/merchant-center-application-kit/commit/6de28034f51e53b3cd1f293eaa16b8f66d9ae9e0), [`5961c019`](https://github.com/commercetools/merchant-center-application-kit/commit/5961c019ab908bc1a5d58acd4511e7c579976797)]:
  - @commercetools-frontend/application-config@20.3.0
  - @commercetools-frontend/babel-preset-mc-app@20.3.0
  - @commercetools-frontend/mc-html-template@20.3.0

## 20.2.1

### Patch Changes

- [#2210](https://github.com/commercetools/merchant-center-application-kit/pull/2210) [`0090f451`](https://github.com/commercetools/merchant-center-application-kit/commit/0090f45183003f6da26cc68809a80cb8f88d3f73) Thanks [@emmenko](https://github.com/emmenko)! - Fix regression when updating `webpack-dev-server` to `v4.0.0-beta.3`

## 20.1.2

### Patch Changes

- [#2200](https://github.com/commercetools/merchant-center-application-kit/pull/2200) [`9b9cf924`](https://github.com/commercetools/merchant-center-application-kit/commit/9b9cf924d96b0ee9b292a62199503626a48a8b59) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update dependency dotenv to v9

- Updated dependencies [[`0bfa1613`](https://github.com/commercetools/merchant-center-application-kit/commit/0bfa16134450fb0699018b2210e0da904f646140), [`99ea52d3`](https://github.com/commercetools/merchant-center-application-kit/commit/99ea52d354a9ad61187388553e1490964347550f)]:
  - @commercetools-frontend/application-config@20.1.2
  - @commercetools-frontend/babel-preset-mc-app@20.1.2
  - @commercetools-frontend/mc-html-template@20.1.2

## 20.1.1

### Patch Changes

- [#2196](https://github.com/commercetools/merchant-center-application-kit/pull/2196) [`a2f6732c`](https://github.com/commercetools/merchant-center-application-kit/commit/a2f6732c655f5f1fef2bd7511a5d35a9b5f24617) Thanks [@emmenko](https://github.com/emmenko)! - Resolve path to dotenv file before checking for its existence.

* [#2196](https://github.com/commercetools/merchant-center-application-kit/pull/2196) [`a2f6732c`](https://github.com/commercetools/merchant-center-application-kit/commit/a2f6732c655f5f1fef2bd7511a5d35a9b5f24617) Thanks [@emmenko](https://github.com/emmenko)! - Remove experimental `--match` option.

## 20.1.0

### Minor Changes

- [#2191](https://github.com/commercetools/merchant-center-application-kit/pull/2191) [`b5058130`](https://github.com/commercetools/merchant-center-application-kit/commit/b505813030c2783228e8e0ddf77f4b65a3b5e4d3) Thanks [@emmenko](https://github.com/emmenko)! - New CLI options! 🎉

  ## Loading dotenv files

  The `mc-script` CLI now supports loading environment variables from [dotenv files](https://www.npmjs.com/package/dotenv).

  Previously, we recommended to use `dotenv-cli` to load environment variables before executing the `mc-scripts` command. For example:

  ```
  dotenv -c development -- mc-scripts start

  NODE_ENV=production dotenv -- mc-scripts compile-html

  NODE_ENV=production dotenv -e .env.gcp-production-eu -- mc-scripts compile-html
  ```

  Now the `mc-scripts` CLI has the dotenv features built-in, so you don't need to install and use `dotenv-cli` anymore.

  By default, the following dotenv files are loaded according to the current environment values specified on each command: `process.MC_APP_ENV` or `process.NODE_ENV`. The priority of how the files are merged and overwritten goes from top to bottom (highest defined variable overrides lower).

  - `.env.development.local`, `.env.test.local`, `.env.production.local`: Local overrides of environment-specific settings.
  - `.env.development`, `.env.test`, `.env.production`: Environment-specific settings.
  - `.env.local`: Local overrides. **This file is loaded for all environments except test.**
  - `.env`

  Please refer to the [dotenv documentation](https://github.com/motdotla/dotenv) for more details.

  Furthermore, you can pass additional dotenv files by using the following option:

  - `--env <path>`: Parses the file path as a dotenv file and adds the variables to the environment. Multiple flags are allowed.

  These files will take higher priority over the standard environment dotenv files.

  The example above can then be refactored as following:

  ```diff
  -dotenv -c development -- mc-scripts start
  +mc-scripts start

  -NODE_ENV=production dotenv -- mc-scripts compile-html
  +NODE_ENV=production mc-scripts compile-html

  -NODE_ENV=production dotenv -e .env.gcp-production-eu -- mc-scripts compile-html
  +NODE_ENV=production mc-scripts --env .env.gcp-production-eu compile-html
  ```

  ## Prompt for selecting an application to start

  If you are developing multiple Custom Applications in the same repository, chances are that you use a mono-repository setup.

  If that's the case, you can now run the `mc-scripts start` command from the workspace root folder and pass the option `--match <glob>`. The option will attempt to gather a list of packages in the repository that match the glob pattern and show it as a prompt. You can then select the application that you want to start from that list.

  We hope you find it useful.

### Patch Changes

- [#2195](https://github.com/commercetools/merchant-center-application-kit/pull/2195) [`28588f4c`](https://github.com/commercetools/merchant-center-application-kit/commit/28588f4ca8db5efa85788c2473e9ab8f4c3f31a0) Thanks [@emmenko](https://github.com/emmenko)! - Fix loading and evaluation of custom dotenv files

## 20.0.3

### Patch Changes

- [#2189](https://github.com/commercetools/merchant-center-application-kit/pull/2189) [`b8cc7c9f`](https://github.com/commercetools/merchant-center-application-kit/commit/b8cc7c9fdb0eb207db81f4430be9bfc101814089) Thanks [@dgoemans](https://github.com/dgoemans)! - Temporary fix for parsing Webpack error messages until `react-dev-utils` supports Webpack v5.

## 20.0.2

### Patch Changes

- Updated dependencies [[`6c951d70`](https://github.com/commercetools/merchant-center-application-kit/commit/6c951d70819c75ee87a50983f039e5a2e785bfca)]:
  - @commercetools-frontend/mc-html-template@20.0.2

## 20.0.1

### Patch Changes

- [#2178](https://github.com/commercetools/merchant-center-application-kit/pull/2178) [`26d4487a`](https://github.com/commercetools/merchant-center-application-kit/commit/26d4487a15dcee5c526de7b1f227e042e2711d3f) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`149af138`](https://github.com/commercetools/merchant-center-application-kit/commit/149af138030dccd1b3ae6df0e46d7b31e25b7325), [`26d4487a`](https://github.com/commercetools/merchant-center-application-kit/commit/26d4487a15dcee5c526de7b1f227e042e2711d3f)]:
  - @commercetools-frontend/mc-html-template@20.0.1
  - @commercetools-frontend/application-config@20.0.1
  - @commercetools-frontend/babel-preset-mc-app@20.0.1

## 19.4.1

### Patch Changes

- Updated dependencies [[`4d4b1f9f`](https://github.com/commercetools/merchant-center-application-kit/commit/4d4b1f9f6834bd2a928491368333bf4ea5670dd3)]:
  - @commercetools-frontend/mc-html-template@19.4.1

## 19.4.0

### Minor Changes

- [#2165](https://github.com/commercetools/merchant-center-application-kit/pull/2165) [`d019bc54`](https://github.com/commercetools/merchant-center-application-kit/commit/d019bc54c59ec52a49006f88366dd4bc7212c2aa) Thanks [@tdeekens](https://github.com/tdeekens)! - Adds support for the `*.mjs` and `*.cjs` JavaScript file extensions.

  Updates the webpack configurations, Jest and ESLint presets to support the `*.mjs` and `*.cjs` extensions. This allows better integration with packages using ES modules.

## 19.3.1

### Patch Changes

- [#2159](https://github.com/commercetools/merchant-center-application-kit/pull/2159) [`a73c31ad`](https://github.com/commercetools/merchant-center-application-kit/commit/a73c31ada3919b0141e9c78fd2a13b2689883434) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update dependency css-minimizer-webpack-plugin to v2

* [#2157](https://github.com/commercetools/merchant-center-application-kit/pull/2157) [`e757dd2b`](https://github.com/commercetools/merchant-center-application-kit/commit/e757dd2b114f0c751400eca6179700bddbb3aecc) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

* Updated dependencies [[`e757dd2b`](https://github.com/commercetools/merchant-center-application-kit/commit/e757dd2b114f0c751400eca6179700bddbb3aecc)]:
  - @commercetools-frontend/application-config@19.3.1
  - @commercetools-frontend/babel-preset-mc-app@19.3.1
  - @commercetools-frontend/mc-html-template@19.3.1

## 19.1.0

### Minor Changes

- [#2143](https://github.com/commercetools/merchant-center-application-kit/pull/2143) [`53b27b0b`](https://github.com/commercetools/merchant-center-application-kit/commit/53b27b0b318b3d84f8f6828368b7c6a94008dcd3) Thanks [@tdeekens](https://github.com/tdeekens)! - Adds support for specifying the `Permissions-Policy` header supported in Chrome 90.

  Similar to the `Feature-Policies` header an application config now support a `permissionsPolicies` field.

  ```js
  headers: {
    permissionPolicies: {
      mircophone: '()';
    }
  }
  ```

  More information about supported permission policies can be found [here](https://github.com/w3c/webappsec-permissions-policy/blob/main/permissions-policy-explainer.md).

### Patch Changes

- Updated dependencies [[`53b27b0b`](https://github.com/commercetools/merchant-center-application-kit/commit/53b27b0b318b3d84f8f6828368b7c6a94008dcd3)]:
  - @commercetools-frontend/application-config@19.1.0
  - @commercetools-frontend/mc-html-template@19.1.0

## 19.0.1

### Patch Changes

- [#2135](https://github.com/commercetools/merchant-center-application-kit/pull/2135) [`598d3bb5`](https://github.com/commercetools/merchant-center-application-kit/commit/598d3bb52a43b261f4ddf0393722927b76339870) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

- Updated dependencies [[`598d3bb5`](https://github.com/commercetools/merchant-center-application-kit/commit/598d3bb52a43b261f4ddf0393722927b76339870)]:
  - @commercetools-frontend/application-config@19.0.1
  - @commercetools-frontend/babel-preset-mc-app@19.0.1
  - @commercetools-frontend/mc-html-template@19.0.1

## 19.0.0

### Major Changes

- [#2041](https://github.com/commercetools/merchant-center-application-kit/pull/2041) [`a240f657`](https://github.com/commercetools/merchant-center-application-kit/commit/a240f6574a9240a2ac82febb67b0f6c814db979f) Thanks [@emmenko](https://github.com/emmenko)! - Upgrade and migrate packages to use `ui-kit@v12`

* [#2041](https://github.com/commercetools/merchant-center-application-kit/pull/2041) [`a240f657`](https://github.com/commercetools/merchant-center-application-kit/commit/a240f6574a9240a2ac82febb67b0f6c814db979f) Thanks [@emmenko](https://github.com/emmenko)! - - Changes required Node.js engine version to `>=12 || >=14` in `package.json`.
  - Uses `webpack@5`.

### Patch Changes

- Updated dependencies [[`a240f657`](https://github.com/commercetools/merchant-center-application-kit/commit/a240f6574a9240a2ac82febb67b0f6c814db979f), [`a240f657`](https://github.com/commercetools/merchant-center-application-kit/commit/a240f6574a9240a2ac82febb67b0f6c814db979f), [`a240f657`](https://github.com/commercetools/merchant-center-application-kit/commit/a240f6574a9240a2ac82febb67b0f6c814db979f), [`a240f657`](https://github.com/commercetools/merchant-center-application-kit/commit/a240f6574a9240a2ac82febb67b0f6c814db979f)]:
  - @commercetools-frontend/mc-html-template@19.0.0
  - @commercetools-frontend/mc-dev-authentication@19.0.0
  - @commercetools-frontend/application-config@19.0.0

## 18.7.0

### Patch Changes

- [#2110](https://github.com/commercetools/merchant-center-application-kit/pull/2110) [`c850d6dc`](https://github.com/commercetools/merchant-center-application-kit/commit/c850d6dcf8edabb5eb9390e41def4b6b52879b7a) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`8eed86e9`](https://github.com/commercetools/merchant-center-application-kit/commit/8eed86e977320aa00397b93e94c0cd29331d8c01), [`c850d6dc`](https://github.com/commercetools/merchant-center-application-kit/commit/c850d6dcf8edabb5eb9390e41def4b6b52879b7a)]:
  - @commercetools-frontend/application-config@18.7.0
  - @commercetools-frontend/babel-preset-mc-app@18.7.0
  - @commercetools-frontend/mc-html-template@18.7.0

## 18.6.0

### Patch Changes

- [#2099](https://github.com/commercetools/merchant-center-application-kit/pull/2099) [`d09a154b`](https://github.com/commercetools/merchant-center-application-kit/commit/d09a154b9e74bc180da033acd8e74ac8ed32fc75) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

- Updated dependencies [[`d09a154b`](https://github.com/commercetools/merchant-center-application-kit/commit/d09a154b9e74bc180da033acd8e74ac8ed32fc75)]:
  - @commercetools-frontend/application-config@18.6.0
  - @commercetools-frontend/babel-preset-mc-app@18.6.0
  - @commercetools-frontend/mc-html-template@18.6.0

## 18.5.8

### Patch Changes

- Updated dependencies [[`88e2b817`](https://github.com/commercetools/merchant-center-application-kit/commit/88e2b817575de4b43b6830638a0bd08c9b40a7d3)]:
  - @commercetools-frontend/mc-html-template@18.5.8

## 18.5.7

### Patch Changes

- [`b48e11d8`](https://github.com/commercetools/merchant-center-application-kit/commit/b48e11d80d8966515983981398d36fdf605ef882) [#2094](https://github.com/commercetools/merchant-center-application-kit/pull/2094) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update dependency react-dev-utils to v11.0.4 [security]

## 18.5.6

### Patch Changes

- [`ca4ea6eb`](https://github.com/commercetools/merchant-center-application-kit/commit/ca4ea6eb17c14bf015a8448248c58881e005ac99) [#2085](https://github.com/commercetools/merchant-center-application-kit/pull/2085) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`ca4ea6eb`](https://github.com/commercetools/merchant-center-application-kit/commit/ca4ea6eb17c14bf015a8448248c58881e005ac99)]:
  - @commercetools-frontend/application-config@18.5.6
  - @commercetools-frontend/babel-preset-mc-app@18.5.6
  - @commercetools-frontend/mc-html-template@18.5.6

## 18.5.4

### Patch Changes

- Updated dependencies [[`d44f5b69`](https://github.com/commercetools/merchant-center-application-kit/commit/d44f5b6916c3897ce198eb06757d29d40535b8d4)]:
  - @commercetools-frontend/assets@18.5.4
  - @commercetools-frontend/babel-preset-mc-app@18.5.4
  - @commercetools-frontend/mc-dev-authentication@18.5.4

## 18.5.3

### Patch Changes

- [`3ab46239`](https://github.com/commercetools/merchant-center-application-kit/commit/3ab4623970dea734a7e20a674aa0e626fba521a7) [#2074](https://github.com/commercetools/merchant-center-application-kit/pull/2074) Thanks [@tdeekens](https://github.com/tdeekens)! - fix(webpack): options passing to thread-loader

## 18.5.2

### Patch Changes

- [`7f26c54e`](https://github.com/commercetools/merchant-center-application-kit/commit/7f26c54e55eff8aeac786ec0d011d36e40b0d263) [#2066](https://github.com/commercetools/merchant-center-application-kit/pull/2066) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

* [`7514a4f3`](https://github.com/commercetools/merchant-center-application-kit/commit/7514a4f3cd567b620f20875a6b13338223ca5fdd) [#2072](https://github.com/commercetools/merchant-center-application-kit/pull/2072) Thanks [@tdeekens](https://github.com/tdeekens)! - fix(webpack): to pass parallelism to thread-loader

* Updated dependencies [[`7f26c54e`](https://github.com/commercetools/merchant-center-application-kit/commit/7f26c54e55eff8aeac786ec0d011d36e40b0d263)]:
  - @commercetools-frontend/application-config@18.5.2
  - @commercetools-frontend/babel-preset-mc-app@18.5.2
  - @commercetools-frontend/mc-dev-authentication@18.5.2
  - @commercetools-frontend/mc-html-template@18.5.2

## 18.5.1

### Patch Changes

- [`bb2ceac2`](https://github.com/commercetools/merchant-center-application-kit/commit/bb2ceac229b94836482dbed57824d679a9cbd5d6) [#2062](https://github.com/commercetools/merchant-center-application-kit/pull/2062) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`bb2ceac2`](https://github.com/commercetools/merchant-center-application-kit/commit/bb2ceac229b94836482dbed57824d679a9cbd5d6)]:
  - @commercetools-frontend/application-config@18.5.1
  - @commercetools-frontend/babel-preset-mc-app@18.5.1
  - @commercetools-frontend/mc-html-template@18.5.1

## 18.4.1

### Patch Changes

- [`074ec33d`](https://github.com/commercetools/merchant-center-application-kit/commit/074ec33d97282fc9750fd59ccceb33ff0430da41) [#2053](https://github.com/commercetools/merchant-center-application-kit/pull/2053) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

- Updated dependencies [[`074ec33d`](https://github.com/commercetools/merchant-center-application-kit/commit/074ec33d97282fc9750fd59ccceb33ff0430da41)]:
  - @commercetools-frontend/application-config@18.4.1
  - @commercetools-frontend/babel-preset-mc-app@18.4.1
  - @commercetools-frontend/mc-html-template@18.4.1

## 18.4.0

### Minor Changes

- [`f940273d`](https://github.com/commercetools/merchant-center-application-kit/commit/f940273de92222e3660e44f3c3c77abaaf5b6e42) [#2042](https://github.com/commercetools/merchant-center-application-kit/pull/2042) Thanks [@emmenko](https://github.com/emmenko)! - Improve the Webpack configuration of `mc-scripts`.

  If you are using the `createWebpackConfigForDevelopment` and `createWebpackConfigForProduction` functions, the following options are now optional:

  - `distPath`: it defaults to the `./dist` folder.
  - `entryPoint`: it defaults to the file`./src/index`, with the file extension being one of `js | jsx | ts | tsx`.
  - `sourceFolders`: it defaults to the folders `[./src]`.

  > All paths are relative to the Custom Application folder.

  Additionally, there is a new option that can be used to enhance the Postcss configuration:

  - `postcssOptions`
  - `postcssOptions.postcssImportPaths`: a list of paths where to look for files used by the `@import` statements.
  - `postcssOptions.postcssCustomMediaPaths`: a list of paths where to look for files with custom media queries.
  - `postcssOptions.postcssCustomPropertiesPaths`: a list of paths where to look for files with custom properties.
  - `postcssOptions.postcssColorModPaths`: a list of paths where to look for files with color-mod properties.

  Furthermore, the `postcss.config.js` file that was shipped with the `mc-scripts` package has been removed in favor of the factory function `createPostcssConfig`, which accepts the same `postcssOptions` described above.

  In case you have your own `postcss.config.js` file in the root of your repository, you can use the `createPostcssConfig` function to have a pre-configured setup.

  ```diff
  # postcss.config.js

  -const postcssConfig = require('@commercetools-frontend/mc-scripts/postcss.config.js');
  +const { createPostcssConfig } = require('@commercetools-frontend/mc-scripts');

  -module.exports = postcssConfig;
  +module.exports = createPostcssConfig();
  ```

### Patch Changes

- [`eb2fbb22`](https://github.com/commercetools/merchant-center-application-kit/commit/eb2fbb2279eff99048c91da352a69e1883eb54af) [#2044](https://github.com/commercetools/merchant-center-application-kit/pull/2044) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

- Updated dependencies [[`eb2fbb22`](https://github.com/commercetools/merchant-center-application-kit/commit/eb2fbb2279eff99048c91da352a69e1883eb54af)]:
  - @commercetools-frontend/application-config@18.4.0
  - @commercetools-frontend/babel-preset-mc-app@18.4.0
  - @commercetools-frontend/mc-html-template@18.4.0

## 18.2.0

### Patch Changes

- [`7fbe0c71`](https://github.com/commercetools/merchant-center-application-kit/commit/7fbe0c718d43e5c940e324e282f3cdd67a46717e) [#2018](https://github.com/commercetools/merchant-center-application-kit/pull/2018) Thanks [@emmenko](https://github.com/emmenko)! - Include a `postcss.config.js`, which is used by the `postcss-loader` Webpack plugin.

## 18.1.4

### Patch Changes

- [`af28d649`](https://github.com/commercetools/merchant-center-application-kit/commit/af28d6492856960f59637fac6ee279eaf4d24410) [#2023](https://github.com/commercetools/merchant-center-application-kit/pull/2023) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update dependency postcss-custom-properties to v11

* [`c9589f5e`](https://github.com/commercetools/merchant-center-application-kit/commit/c9589f5e3d1fd18393c7bf501c3b23b8ec402804) [#2020](https://github.com/commercetools/merchant-center-application-kit/pull/2020) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

* Updated dependencies [[`c9589f5e`](https://github.com/commercetools/merchant-center-application-kit/commit/c9589f5e3d1fd18393c7bf501c3b23b8ec402804)]:
  - @commercetools-frontend/application-config@18.1.4
  - @commercetools-frontend/mc-html-template@18.1.4

## 18.1.0

### Patch Changes

- [`3bf32993`](https://github.com/commercetools/merchant-center-application-kit/commit/3bf329935a109a73a7c33580fdf618e60fdbcc2c) [#1971](https://github.com/commercetools/merchant-center-application-kit/pull/1971) Thanks [@tdeekens](https://github.com/tdeekens)! - Add internal opt-in support for combining feature flag adapters.

- Updated dependencies [[`3bf32993`](https://github.com/commercetools/merchant-center-application-kit/commit/3bf329935a109a73a7c33580fdf618e60fdbcc2c)]:
  - @commercetools-frontend/application-config@18.1.0
  - @commercetools-frontend/assets@18.1.0
  - @commercetools-frontend/babel-preset-mc-app@18.1.0
  - @commercetools-frontend/mc-dev-authentication@18.1.0
  - @commercetools-frontend/mc-html-template@18.1.0

## 18.0.2

### Patch Changes

- [`b38cb57f`](https://github.com/commercetools/merchant-center-application-kit/commit/b38cb57f678e79a862f1b97df2d1c753838ffbb7) [#1991](https://github.com/commercetools/merchant-center-application-kit/pull/1991) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

- Updated dependencies [[`fa151b6a`](https://github.com/commercetools/merchant-center-application-kit/commit/fa151b6a4ae2971c243cac0b94bbe0c77947dcd2)]:
  - @commercetools-frontend/mc-html-template@18.0.2

## 18.0.1

### Patch Changes

- Updated dependencies [[`83c5cf37`](https://github.com/commercetools/merchant-center-application-kit/commit/83c5cf37f98a3461cef70ac7bd80a6bbf1a6d4cd), [`2869d6c1`](https://github.com/commercetools/merchant-center-application-kit/commit/2869d6c146b679227af9f39e76d1e3f90af7adde)]:
  - @commercetools-frontend/mc-html-template@18.0.1

## 18.0.0

### Patch Changes

- Updated dependencies [[`7f8b219`](https://github.com/commercetools/merchant-center-application-kit/commit/7f8b219b46c6d1935fdc2757346e195aae08afc6)]:
  - @commercetools-frontend/mc-html-template@18.0.0

## 17.10.1

### Patch Changes

- [`5557c5c`](https://github.com/commercetools/merchant-center-application-kit/commit/5557c5c5744bf34a981247d04dc2f1117c15767d) [#1976](https://github.com/commercetools/merchant-center-application-kit/pull/1976) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

- Updated dependencies [[`5557c5c`](https://github.com/commercetools/merchant-center-application-kit/commit/5557c5c5744bf34a981247d04dc2f1117c15767d)]:
  - @commercetools-frontend/application-config@17.10.1
  - @commercetools-frontend/babel-preset-mc-app@17.10.1
  - @commercetools-frontend/mc-html-template@17.10.1

## 17.10.0

### Minor Changes

- [`d86c2e8`](https://github.com/commercetools/merchant-center-application-kit/commit/d86c2e86179aca2729d92fa18545241e2bf36fca) [#1934](https://github.com/commercetools/merchant-center-application-kit/pull/1934) Thanks [@emmenko](https://github.com/emmenko)! - Introduce a new **experimental opt-in** feature to authenticate the application for local development, using an OIDC-like workflow.

  > Disclaimer: this is an opt-in experimental feature. Use it at your own risk.
  > We want to test this feature internally first. Until then, we discourage you to try it out.

  The feature can be enabled by setting the `ENABLE_OIDC_FOR_DEVELOPMENT=true` environment variable.

  In addition to that, we have a new package `@commercetools-frontend/cypress`, to include some useful commands for testing Custom Applications.

### Patch Changes

- Updated dependencies [[`d86c2e8`](https://github.com/commercetools/merchant-center-application-kit/commit/d86c2e86179aca2729d92fa18545241e2bf36fca), [`2d6dbaa`](https://github.com/commercetools/merchant-center-application-kit/commit/2d6dbaa5b5d1b0f29dcb5c88222a2a6fc9161cec), [`dc7a443`](https://github.com/commercetools/merchant-center-application-kit/commit/dc7a4437f02cfe9c840ae6f22cc85f94cf6a0bc9)]:
  - @commercetools-frontend/application-config@17.10.0
  - @commercetools-frontend/babel-preset-mc-app@17.10.0
  - @commercetools-frontend/mc-html-template@17.10.0

## 17.9.0

### Patch Changes

- Updated dependencies [[`4f7e081`](https://github.com/commercetools/merchant-center-application-kit/commit/4f7e081c001e285e8f4c7771894f5d09509daf8e)]:
  - @commercetools-frontend/application-config@17.9.0
  - @commercetools-frontend/mc-html-template@17.9.0

## 17.8.0

### Minor Changes

- [`bb65fa1`](https://github.com/commercetools/merchant-center-application-kit/commit/bb65fa149d3d056ae0e0f35d89bd0e5b1ba08694) [#1949](https://github.com/commercetools/merchant-center-application-kit/pull/1949) Thanks [@emmenko](https://github.com/emmenko)! - The `webpack.config.dev.js` and `webpack.config.prod.js` files are not required anymore to be defined in the application folder and can be removed. The default behavior is now implicitly implemented in case the config file is not found. The default behavior requires the following paths to exist:

  - `<application_folder>/dist`
  - `<application_folder>/src`
  - `<application_folder>/src/index.js`

  > You can still use the config files if you need to configure more specific behaviors.

### Patch Changes

- [`48a9886`](https://github.com/commercetools/merchant-center-application-kit/commit/48a98861dcf4193041e02e8ac11eb2940826f5d0) [#1954](https://github.com/commercetools/merchant-center-application-kit/pull/1954) Thanks [@tdeekens](https://github.com/tdeekens)! - chore: update dependencies across packages

* [`4971a78`](https://github.com/commercetools/merchant-center-application-kit/commit/4971a78438fb4d2ca5487764192a0bb1ffc3b18e) [#1952](https://github.com/commercetools/merchant-center-application-kit/pull/1952) Thanks [@tdeekens](https://github.com/tdeekens)! - chore: add and apply fixes via manypkg for automatic mono-repo validation

* Updated dependencies [[`48a9886`](https://github.com/commercetools/merchant-center-application-kit/commit/48a98861dcf4193041e02e8ac11eb2940826f5d0), [`4971a78`](https://github.com/commercetools/merchant-center-application-kit/commit/4971a78438fb4d2ca5487764192a0bb1ffc3b18e)]:
  - @commercetools-frontend/application-config@17.8.0
  - @commercetools-frontend/babel-preset-mc-app@17.8.0
  - @commercetools-frontend/mc-html-template@17.8.0

## 17.7.3

### Patch Changes

- Updated dependencies [[`9cbebcf`](https://github.com/commercetools/merchant-center-application-kit/commit/9cbebcf2fa5efd87451032b1e1fd4d86add6209d)]:
  - @commercetools-frontend/application-config@17.7.3
  - @commercetools-frontend/mc-html-template@17.7.3

## 17.7.2

### Patch Changes

- Updated dependencies [[`fab682b`](https://github.com/commercetools/merchant-center-application-kit/commit/fab682b6598006a44c530b9f2fb7d8f450110f97)]:
  - @commercetools-frontend/babel-preset-mc-app@17.7.2

## 17.7.1

### Patch Changes

- [`ee03593`](https://github.com/commercetools/merchant-center-application-kit/commit/ee0359335cbd88c5c31c2f43a29dd669edbd1173) [#1938](https://github.com/commercetools/merchant-center-application-kit/pull/1938) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update dependency postcss-import to v14

* [`f6f3c5e`](https://github.com/commercetools/merchant-center-application-kit/commit/f6f3c5ebd08226fd4eca22aec5c39791cf5c5d6a) [#1935](https://github.com/commercetools/merchant-center-application-kit/pull/1935) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

* Updated dependencies [[`99558e7`](https://github.com/commercetools/merchant-center-application-kit/commit/99558e74cc0b0c747cfa7ab43bed51490dc5194e), [`f6f3c5e`](https://github.com/commercetools/merchant-center-application-kit/commit/f6f3c5ebd08226fd4eca22aec5c39791cf5c5d6a)]:
  - @commercetools-frontend/babel-preset-mc-app@17.7.1
  - @commercetools-frontend/application-config@17.7.1
  - @commercetools-frontend/mc-html-template@17.7.1

## 17.7.0

### Patch Changes

- [`1ec4379`](https://github.com/commercetools/merchant-center-application-kit/commit/1ec4379938b093d4444ec9e4079524c48afd4a42) [#1923](https://github.com/commercetools/merchant-center-application-kit/pull/1923) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`d74addd`](https://github.com/commercetools/merchant-center-application-kit/commit/d74addd32a5f39d19d6bae1ee31cbf33a35fd04e), [`1ec4379`](https://github.com/commercetools/merchant-center-application-kit/commit/1ec4379938b093d4444ec9e4079524c48afd4a42)]:
  - @commercetools-frontend/application-config@17.7.0
  - @commercetools-frontend/babel-preset-mc-app@17.7.0
  - @commercetools-frontend/mc-html-template@17.7.0

## 17.6.2

### Patch Changes

- [`672faa8`](https://github.com/commercetools/merchant-center-application-kit/commit/672faa8ec14a05bf83a6bd4d8a67383fe9c079b7) [#1779](https://github.com/commercetools/merchant-center-application-kit/pull/1779) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update dependency postcss-reporter to v7

* [`1a96e83`](https://github.com/commercetools/merchant-center-application-kit/commit/1a96e831c94250e10de61dee40e682a77313445f) [#1905](https://github.com/commercetools/merchant-center-application-kit/pull/1905) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- [`63440c4`](https://github.com/commercetools/merchant-center-application-kit/commit/63440c4120c3417c946b8d9c8c13dfbd2f4504a3) [#1825](https://github.com/commercetools/merchant-center-application-kit/pull/1825) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update dependency postcss-import to v13

- Updated dependencies [[`1a96e83`](https://github.com/commercetools/merchant-center-application-kit/commit/1a96e831c94250e10de61dee40e682a77313445f), [`e4dc8f8`](https://github.com/commercetools/merchant-center-application-kit/commit/e4dc8f88c1d101f846655e92a69505db6ba2acfd), [`c7b321a`](https://github.com/commercetools/merchant-center-application-kit/commit/c7b321aa3eaae6aae803590999179b95b3da2b9a)]:
  - @commercetools-frontend/application-config@17.6.2
  - @commercetools-frontend/babel-preset-mc-app@17.6.2
  - @commercetools-frontend/mc-html-template@17.6.2

## 17.6.1

### Patch Changes

- [`15ecd9f`](https://github.com/commercetools/merchant-center-application-kit/commit/15ecd9fa08713a1f132f953b316540d72d3d7a40) [#1912](https://github.com/commercetools/merchant-center-application-kit/pull/1912) Thanks [@emmenko](https://github.com/emmenko)! - Remove `react-intl` from the list of vendors to be transpiled

* [`63a0b9e`](https://github.com/commercetools/merchant-center-application-kit/commit/63a0b9e927e7019074a6603356de874f144cb6e3) [#1909](https://github.com/commercetools/merchant-center-application-kit/pull/1909) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update dependency svg-url-loader to v7

## 17.6.0

### Patch Changes

- [`2287813`](https://github.com/commercetools/merchant-center-application-kit/commit/2287813c19a54b7edb7005d417c5f6a7b34cad1f) [#1871](https://github.com/commercetools/merchant-center-application-kit/pull/1871) Thanks [@emmenko](https://github.com/emmenko)! - Compile and bundle packages using [preconstruct](https://preconstruct.tools)

- Updated dependencies [[`2287813`](https://github.com/commercetools/merchant-center-application-kit/commit/2287813c19a54b7edb7005d417c5f6a7b34cad1f)]:
  - @commercetools-frontend/application-config@17.6.0
  - @commercetools-frontend/babel-preset-mc-app@17.6.0
  - @commercetools-frontend/mc-html-template@17.6.0

## 17.4.1

### Patch Changes

- [`ec9e10f`](https://github.com/commercetools/merchant-center-application-kit/commit/ec9e10fde15351cc7cb825aaebb53cdb6e00e0d9) [#1889](https://github.com/commercetools/merchant-center-application-kit/pull/1889) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

- Updated dependencies [[`d832bd4`](https://github.com/commercetools/merchant-center-application-kit/commit/d832bd44c354aaf2374c0c75c9050c673998ff32), [`ec9e10f`](https://github.com/commercetools/merchant-center-application-kit/commit/ec9e10fde15351cc7cb825aaebb53cdb6e00e0d9)]:
  - @commercetools-frontend/babel-preset-mc-app@17.4.1
  - @commercetools-frontend/application-config@17.4.1
  - @commercetools-frontend/mc-html-template@17.4.1

## 17.4.0

### Patch Changes

- Updated dependencies [[`09cc4b4`](https://github.com/commercetools/merchant-center-application-kit/commit/09cc4b410916f755be751533e566215d8df0e1cf)]:
  - @commercetools-frontend/application-config@17.4.0
  - @commercetools-frontend/mc-html-template@17.4.0

## 17.3.1

### Patch Changes

- [`88ec5dc`](https://github.com/commercetools/merchant-center-application-kit/commit/88ec5dcf64892674ff9d8de83636673e67bc685a) [#1875](https://github.com/commercetools/merchant-center-application-kit/pull/1875) Thanks [@renovate](https://github.com/apps/renovate)! - upgrade `webpack-bundle-analyzer` to v4.1.0

* [`89c4464`](https://github.com/commercetools/merchant-center-application-kit/commit/89c4464c334dd6c3922d031872286ad3bea8cf67) [#1872](https://github.com/commercetools/merchant-center-application-kit/pull/1872) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

* Updated dependencies [[`89c4464`](https://github.com/commercetools/merchant-center-application-kit/commit/89c4464c334dd6c3922d031872286ad3bea8cf67)]:
  - @commercetools-frontend/babel-preset-mc-app@17.3.1

## 17.3.0

### Patch Changes

- [`71c9111`](https://github.com/commercetools/merchant-center-application-kit/commit/71c9111308832009d1a27e91e4f2d2da4c53367c) [#1866](https://github.com/commercetools/merchant-center-application-kit/pull/1866) Thanks [@emmenko](https://github.com/emmenko)! - Update to uikit v10.39.8

- Updated dependencies [[`71c9111`](https://github.com/commercetools/merchant-center-application-kit/commit/71c9111308832009d1a27e91e4f2d2da4c53367c)]:
  - @commercetools-frontend/application-config@17.3.0
  - @commercetools-frontend/assets@17.3.0
  - @commercetools-frontend/babel-preset-mc-app@17.3.0
  - @commercetools-frontend/mc-dev-authentication@17.3.0
  - @commercetools-frontend/mc-html-template@17.3.0

## 17.2.1

### Patch Changes

- [`310e98c`](https://github.com/commercetools/merchant-center-application-kit/commit/310e98c39c0b6479175b7685b3f29ea0a5baa22b) Thanks [@emmenko](https://github.com/emmenko)! - Update dependencies (https://github.com/commercetools/merchant-center-application-kit/pull/1857)

- Updated dependencies [[`310e98c`](https://github.com/commercetools/merchant-center-application-kit/commit/310e98c39c0b6479175b7685b3f29ea0a5baa22b), [`9003354`](https://github.com/commercetools/merchant-center-application-kit/commit/9003354080a08f8423e9689cdf49657dca4edaf0)]:
  - @commercetools-frontend/application-config@17.2.1
  - @commercetools-frontend/babel-preset-mc-app@17.2.1
  - @commercetools-frontend/mc-html-template@17.2.1

## 17.2.0

### Patch Changes

- [`f4f4a8a`](https://github.com/commercetools/merchant-center-application-kit/commit/f4f4a8ad58d0e61ab6750740ae038723ea6e5e17) [#1860](https://github.com/commercetools/merchant-center-application-kit/pull/1860) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update dependency thread-loader to v3

* [`4503f9a`](https://github.com/commercetools/merchant-center-application-kit/commit/4503f9a31fe7eedfebced20ac968e35c74d2ccee) [#1858](https://github.com/commercetools/merchant-center-application-kit/pull/1858) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update dependency style-loader to v2

- [`e0ec004`](https://github.com/commercetools/merchant-center-application-kit/commit/e0ec004d611f93b24f015120d09f6f18389b219f) [#1854](https://github.com/commercetools/merchant-center-application-kit/pull/1854) Thanks [@emmenko](https://github.com/emmenko)! - chore: update deps

- Updated dependencies [[`e0ec004`](https://github.com/commercetools/merchant-center-application-kit/commit/e0ec004d611f93b24f015120d09f6f18389b219f)]:
  - @commercetools-frontend/application-config@17.2.0
  - @commercetools-frontend/assets@17.2.0
  - @commercetools-frontend/babel-preset-mc-app@17.2.0
  - @commercetools-frontend/mc-dev-authentication@17.2.0
  - @commercetools-frontend/mc-html-template@17.2.0

## 17.1.4

### Patch Changes

- Updated dependencies [[`56d4361`](https://github.com/commercetools/merchant-center-application-kit/commit/56d43616ca78623530a89b912bc5501f47faa54e)]:
  - @commercetools-frontend/babel-preset-mc-app@17.1.4

## 17.1.3

### Patch Changes

- [`f6df7d8`](https://github.com/commercetools/merchant-center-application-kit/commit/f6df7d8a53855e4b2093080a6187e54426553262) [#1842](https://github.com/commercetools/merchant-center-application-kit/pull/1842) Thanks [@tdeekens](https://github.com/tdeekens)! - fix(mc-scripts): to add jsx runtime for js files not only svg

## 17.1.2

### Patch Changes

- [`fe1df5f`](https://github.com/commercetools/merchant-center-application-kit/commit/fe1df5f5427406330591581c4f74e0aed259c4af) [#1839](https://github.com/commercetools/merchant-center-application-kit/pull/1839) Thanks [@emmenko](https://github.com/emmenko)! - Fix `FAST_REFRESH` variable evaluation

* [`909a410`](https://github.com/commercetools/merchant-center-application-kit/commit/909a410d8e9c00dff390551818e88b76664cdce0) [#1838](https://github.com/commercetools/merchant-center-application-kit/pull/1838) Thanks [@emmenko](https://github.com/emmenko)! - Fix babel preset syntax

* Updated dependencies [[`016f84c`](https://github.com/commercetools/merchant-center-application-kit/commit/016f84c6d368b58e05b7c018f2d8b723814d06b4)]:
  - @commercetools-frontend/mc-html-template@17.1.2

## 17.1.0

### Minor Changes

- [`eb545e0`](https://github.com/commercetools/merchant-center-application-kit/commit/eb545e088af38af86611a2c0b7b69a16a5318b4b) [#1819](https://github.com/commercetools/merchant-center-application-kit/pull/1819) Thanks [@tdeekens](https://github.com/tdeekens)! - feat: adds the ability to opt into the new `automatic` JSX runtime

  Recent React versions support a new JSX runtime. Read more about it [here](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html).

  You may opt into the new runtime in `automatic` mode by setting the `ENABLE_NEW_JSX_TRANSFORM` environment variable to `true`. Please note you need at least React v17 or v16.14 in your application.
  Opting into the new JSX transform automatically also changes the Babel, Jest and ESLint configurations. As a consequence ESLint will warn whenever it discovers React being in scope by importing it as `import React from 'react`'. You have to remove those imports using the respective codemod by running `npx react-codemod update-react-imports`.

  Lastly, all code of the Merchant Center Application Kit will continue to be bundled in `classic` mode to support older versions of React.

* [`da0b4aa`](https://github.com/commercetools/merchant-center-application-kit/commit/da0b4aab95ea40d5f8492097cb88e3ae79a71d78) [#1818](https://github.com/commercetools/merchant-center-application-kit/pull/1818) Thanks [@emmenko](https://github.com/emmenko)! - Add support for experimental Fast Refresh for React. To enable it, set the enviornment variable `FAST_REFRESH=true`. More info [here](https://github.com/facebook/create-react-app/pull/8582).

### Patch Changes

- [`5d9d5da`](https://github.com/commercetools/merchant-center-application-kit/commit/5d9d5da44364fe5590b67be21ac3630e177326e3) [#1820](https://github.com/commercetools/merchant-center-application-kit/pull/1820) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

* [`e824e89`](https://github.com/commercetools/merchant-center-application-kit/commit/e824e891e1dabf9913e768037d12cedc3f943b80) [#1797](https://github.com/commercetools/merchant-center-application-kit/pull/1797) Thanks [@renovate](https://github.com/apps/renovate)! - update dependency mini-css-extract-plugin to v1

- [`e824e89`](https://github.com/commercetools/merchant-center-application-kit/commit/e824e891e1dabf9913e768037d12cedc3f943b80) [#1797](https://github.com/commercetools/merchant-center-application-kit/pull/1797) Thanks [@renovate](https://github.com/apps/renovate)! - update dependency postcss-safe-parser to v5

- Updated dependencies [[`05672a2`](https://github.com/commercetools/merchant-center-application-kit/commit/05672a244f86b5db3aeab610c10f1747501b695a), [`eb545e0`](https://github.com/commercetools/merchant-center-application-kit/commit/eb545e088af38af86611a2c0b7b69a16a5318b4b)]:
  - @commercetools-frontend/mc-html-template@17.1.0
  - @commercetools-frontend/babel-preset-mc-app@17.1.0

## 17.0.1

### Patch Changes

- [`71c5f78`](https://github.com/commercetools/merchant-center-application-kit/commit/71c5f7875c7476e34b65d37046d48ca47e96f12e) [#1795](https://github.com/commercetools/merchant-center-application-kit/pull/1795) Thanks [@renovate](https://github.com/apps/renovate)! - update dependencies

- Updated dependencies [[`71c5f78`](https://github.com/commercetools/merchant-center-application-kit/commit/71c5f7875c7476e34b65d37046d48ca47e96f12e)]:
  - @commercetools-frontend/application-config@17.0.1
  - @commercetools-frontend/babel-preset-mc-app@17.0.1
  - @commercetools-frontend/mc-html-template@17.0.1

## 17.0.0

### Major Changes

- [`0e0efc6`](https://github.com/commercetools/merchant-center-application-kit/commit/0e0efc68e93621209f8ee84ebc920b79431c704a) [#1805](https://github.com/commercetools/merchant-center-application-kit/pull/1805) Thanks [@emmenko](https://github.com/emmenko)! - remove deprecated `compile-html` options

* [`e706232`](https://github.com/commercetools/merchant-center-application-kit/commit/e706232c152f3fed9cf44c10a0c4f25b27448a16) [#1805](https://github.com/commercetools/merchant-center-application-kit/pull/1805) Thanks [@emmenko](https://github.com/emmenko)! - Remove `mc-scripts extract-intl` command in favor of the official `@formatjs/cli` package.
  We recommend to update your script to extract Intl messages to use the `formatjs extract` command.

  See full release notes: https://docs.commercetools.com/custom-applications/releases/2020-10-14-custom-applications-v17

- [`633d8c7`](https://github.com/commercetools/merchant-center-application-kit/commit/633d8c7b8ddc2f25128d8249579b7bb287a62e30) [#1805](https://github.com/commercetools/merchant-center-application-kit/pull/1805) Thanks [@emmenko](https://github.com/emmenko)! - Remove the CLI flag `--use-local-assets`. The default behavior of `mc-scripts compile-html` now is to compile the assets locally, which is the only reasonable thing to do.

  Furthermore, the `@commercetools-frontend/mc-http-server` package has been deprecated and won't be published anymore.
  With the `compile-html` command there is no need to have a pre-configured HTTP server anymore.

  When running the `mc-scripts compile-html` command, the `index.html` is compiled for production usage and it lives in the `public` folder, together with the other static assets. This is all you need to deploy your application.
  You can decide to [deploy the Custom Application statically to one of the popular cloud providers](https://docs.commercetools.com/custom-applications/deployment/compiling-a-custom-application#deployment), or serve the files on your own using a static server.

  For example, to run locally the Custom Application using the production bundles:

  ```console
  NODE_ENV=production MC_APP_ENV=development dotenv -- \
    mc-scripts compile-html \
    --transformer @commercetools-frontend/mc-dev-authentication/transformer-local.js

  mc-scripts serve
  ```

### Patch Changes

- [`633d8c7`](https://github.com/commercetools/merchant-center-application-kit/commit/633d8c7b8ddc2f25128d8249579b7bb287a62e30) [#1805](https://github.com/commercetools/merchant-center-application-kit/pull/1805) Thanks [@emmenko](https://github.com/emmenko)! - update deps

- Updated dependencies [[`0e0efc6`](https://github.com/commercetools/merchant-center-application-kit/commit/0e0efc68e93621209f8ee84ebc920b79431c704a), [`e706232`](https://github.com/commercetools/merchant-center-application-kit/commit/e706232c152f3fed9cf44c10a0c4f25b27448a16), [`633d8c7`](https://github.com/commercetools/merchant-center-application-kit/commit/633d8c7b8ddc2f25128d8249579b7bb287a62e30)]:
  - @commercetools-frontend/application-config@17.0.0
  - @commercetools-frontend/mc-html-template@17.0.0
  - @commercetools-frontend/mc-dev-authentication@17.0.0

## 16.18.0

### Patch Changes

- [`8cdb025`](https://github.com/commercetools/merchant-center-application-kit/commit/8cdb02591b718406c910a2c4128d4be3dfe24785) [#1776](https://github.com/commercetools/merchant-center-application-kit/pull/1776) Thanks [@renovate](https://github.com/apps/renovate)! - update deps

## 16.17.4

### Patch Changes

- Updated dependencies [[`57be02b`](https://github.com/commercetools/merchant-center-application-kit/commit/57be02b331ad44c72678eebbb65c64c73f031e18)]:
  - @commercetools-frontend/mc-html-template@16.17.4

## 16.17.2

### Patch Changes

- [`9752622`](https://github.com/commercetools/merchant-center-application-kit/commit/9752622b7422e821bb62d61af360a01f6994dc6b) [#1758](https://github.com/commercetools/merchant-center-application-kit/pull/1758) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

## 16.17.0

### Patch Changes

- [`786c697`](https://github.com/commercetools/merchant-center-application-kit/commit/786c6978c1febf927db6b45c758498b72e8e48be) [#1745](https://github.com/commercetools/merchant-center-application-kit/pull/1745) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

* [`81dda84`](https://github.com/commercetools/merchant-center-application-kit/commit/81dda8482323ec2f2154c33ba32dc8627bb5a984) [#1748](https://github.com/commercetools/merchant-center-application-kit/pull/1748) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update dependency postcss-custom-properties to v10

- [`178ff31`](https://github.com/commercetools/merchant-center-application-kit/commit/178ff317426e0cfcfe1c0adf42a9eada3b134642) [#1734](https://github.com/commercetools/merchant-center-application-kit/pull/1734) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

* [`9bc8558`](https://github.com/commercetools/merchant-center-application-kit/commit/9bc85581d336c7d75fda5dc82a1c02f32f16c1fb) [#1704](https://github.com/commercetools/merchant-center-application-kit/pull/1704) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

* Updated dependencies [[`178ff31`](https://github.com/commercetools/merchant-center-application-kit/commit/178ff317426e0cfcfe1c0adf42a9eada3b134642), [`9bc8558`](https://github.com/commercetools/merchant-center-application-kit/commit/9bc85581d336c7d75fda5dc82a1c02f32f16c1fb), [`1fdde03`](https://github.com/commercetools/merchant-center-application-kit/commit/1fdde039f36a0290bfc1c179002cfe6d535f35c0)]:
  - @commercetools-frontend/application-config@16.17.0
  - @commercetools-frontend/babel-preset-mc-app@16.17.0
  - @commercetools-frontend/mc-html-template@16.17.0

## 16.16.4

### Patch Changes

- [`a907746`](https://github.com/commercetools/merchant-center-application-kit/commit/a907746f1cf20e86bb4481f810d1296778906fd9) [#1706](https://github.com/commercetools/merchant-center-application-kit/pull/1706) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update dependency terser-webpack-plugin to v4

## 16.16.3

### Patch Changes

- [`9d62b85`](https://github.com/commercetools/merchant-center-application-kit/commit/9d62b856c9c642b7993ecf266bc33bca696de7a7) [#1703](https://github.com/commercetools/merchant-center-application-kit/pull/1703) Thanks [@mohib0306](https://github.com/mohib0306)! - Fix console warning. Replaced `console.warning` with `console.warn`

## 16.16.1

### Patch Changes

- [`f23655a`](https://github.com/commercetools/merchant-center-application-kit/commit/f23655a681fd54fca9757e0b62727c38aaa813ad) [#1552](https://github.com/commercetools/merchant-center-application-kit/pull/1552) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update dependency graphql-cli to v4

- Updated dependencies [[`bc15ac2`](https://github.com/commercetools/merchant-center-application-kit/commit/bc15ac2f6d53d4c8e0d53ceb6c1a0e5ba0f5353e)]:
  - @commercetools-frontend/application-config@16.16.1
  - @commercetools-frontend/babel-preset-mc-app@16.16.1
  - @commercetools-frontend/mc-html-template@16.16.1

## 16.16.0

### Minor Changes

- [`4216b92`](https://github.com/commercetools/merchant-center-application-kit/commit/4216b922fbb39e74ce35f8647d1c4e9ae77909c8) [#1685](https://github.com/commercetools/merchant-center-application-kit/pull/1685) Thanks [@emmenko](https://github.com/emmenko)! - Refactor i18n package to consume compiled data from ui-kit translation messages. Furthermore, the `@commercetools-frontend/i18n` now exposes a `compiled-data` folder as well: `@commercetools-frontend/i18n/compiled-data`.
  This can be used the load pre-compiled messages and thus improving the runtime performance.

  Furthermore, the `mc-scripts extract-intl` command has been deprecated in favor of the more official message extraction with the `@formatjs/cli`: https://formatjs.io/docs/getting-started/message-extraction.

### Patch Changes

- [`f144292`](https://github.com/commercetools/merchant-center-application-kit/commit/f1442921650ca4e6c9bf61ce31bda2b63e72038a) [#1673](https://github.com/commercetools/merchant-center-application-kit/pull/1673) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

- Updated dependencies [[`879b4d6`](https://github.com/commercetools/merchant-center-application-kit/commit/879b4d618569659335945cab4a5ad28c0d19f5c8), [`f144292`](https://github.com/commercetools/merchant-center-application-kit/commit/f1442921650ca4e6c9bf61ce31bda2b63e72038a)]:
  - @commercetools-frontend/mc-html-template@16.16.0
  - @commercetools-frontend/application-config@16.16.0
  - @commercetools-frontend/babel-preset-mc-app@16.16.0

## 16.15.8

### Patch Changes

- [`c62261f`](https://github.com/commercetools/merchant-center-application-kit/commit/c62261f80e17fb63467eed6328e41764d3e9a50e) [#1653](https://github.com/commercetools/merchant-center-application-kit/pull/1653) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies and regenerate l10n data based on CLDR v37

- Updated dependencies [[`43fdb3d`](https://github.com/commercetools/merchant-center-application-kit/commit/43fdb3d6465911c99a3abcfedd8e96ea54b4941c)]:
  - @commercetools-frontend/application-config@16.15.8
  - @commercetools-frontend/mc-html-template@16.15.8

## 16.15.7

### Patch Changes

- [`ba30472`](https://github.com/commercetools/merchant-center-application-kit/commit/ba3047236e481af3f62864b24b33175de33757ad) [#1655](https://github.com/commercetools/merchant-center-application-kit/pull/1655) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update dependency css-loader to v4

## 16.15.4

### Patch Changes

- Updated dependencies [[`0182cd3`](https://github.com/commercetools/merchant-center-application-kit/commit/0182cd32f12a6ca8d1966bfaf260f4db256beca0)]:
  - @commercetools-frontend/application-config@16.15.4
  - @commercetools-frontend/mc-html-template@16.15.4

## 16.15.3

### Patch Changes

- [`6d98245`](https://github.com/commercetools/merchant-center-application-kit/commit/6d98245615ddb83e805e5cc2cc0620920b4a71c7) [#1643](https://github.com/commercetools/merchant-center-application-kit/pull/1643) Thanks [@emmenko](https://github.com/emmenko)! - Update copyright date to 2020 in LICENSE files

- Updated dependencies [[`6d98245`](https://github.com/commercetools/merchant-center-application-kit/commit/6d98245615ddb83e805e5cc2cc0620920b4a71c7)]:
  - @commercetools-frontend/assets@16.15.3
  - @commercetools-frontend/babel-preset-mc-app@16.15.3
  - @commercetools-frontend/mc-html-template@16.15.3

## 16.15.2

### Patch Changes

- [`0f3dcc3`](https://github.com/commercetools/merchant-center-application-kit/commit/0f3dcc38c81a5fb3c668faecce9a13057f66a66b) [#1638](https://github.com/commercetools/merchant-center-application-kit/pull/1638) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

* [`77eb38a`](https://github.com/commercetools/merchant-center-application-kit/commit/77eb38ace68e7f519dea9deda487ed4c612091a5) [#1641](https://github.com/commercetools/merchant-center-application-kit/pull/1641) Thanks [@emmenko](https://github.com/emmenko)! - Unify login/logout dev routes for http servers

* Updated dependencies [[`0f3dcc3`](https://github.com/commercetools/merchant-center-application-kit/commit/0f3dcc38c81a5fb3c668faecce9a13057f66a66b), [`77eb38a`](https://github.com/commercetools/merchant-center-application-kit/commit/77eb38ace68e7f519dea9deda487ed4c612091a5)]:
  - @commercetools-frontend/application-config@16.15.2
  - @commercetools-frontend/babel-preset-mc-app@16.15.2
  - @commercetools-frontend/mc-html-template@16.15.2
  - @commercetools-frontend/mc-dev-authentication@16.15.2

## 16.15.1

### Patch Changes

- Updated dependencies [[`96b3af7`](https://github.com/commercetools/merchant-center-application-kit/commit/96b3af7c3e8276e7a136e48c3d313fe6d504099d)]:
  - @commercetools-frontend/application-config@16.15.1
  - @commercetools-frontend/mc-html-template@16.15.1

## 16.15.0

### Minor Changes

- [`728024c`](https://github.com/commercetools/merchant-center-application-kit/commit/728024c57666d67e997b7342df74cceba511d182) [#1626](https://github.com/commercetools/merchant-center-application-kit/pull/1626) Thanks [@emmenko](https://github.com/emmenko)! - This release introduces the usage of a new configuration file format and marks the deprecation of the `env.json` and `headers.json` files.

  For all the necessary information about migrating to the new configuration file, please [read the release notes](https://docs.commercetools.com/custom-applications/releases/2020-07-16-introducing-a-new-and-simpler-application-config).

### Patch Changes

- [`cc8b37b`](https://github.com/commercetools/merchant-center-application-kit/commit/cc8b37bf85d4683a605a6c3233100627e670ebe7) [#1627](https://github.com/commercetools/merchant-center-application-kit/pull/1627) Thanks [@renovate](https://github.com/apps/renovate)! - chore: update dependencies

- Updated dependencies [[`72c42f4`](https://github.com/commercetools/merchant-center-application-kit/commit/72c42f4eb05f690914372281f2361630e2184687), [`33baf25`](https://github.com/commercetools/merchant-center-application-kit/commit/33baf25a5990d7bb292e88e4040e11bff4669b2c), [`394380d`](https://github.com/commercetools/merchant-center-application-kit/commit/394380dd25321c2f8f1e6b1e60b998620f2c1e02), [`728024c`](https://github.com/commercetools/merchant-center-application-kit/commit/728024c57666d67e997b7342df74cceba511d182)]:
  - @commercetools-frontend/babel-preset-mc-app@16.15.0
  - @commercetools-frontend/application-config@16.15.0
  - @commercetools-frontend/mc-html-template@16.15.0

## 16.14.0

### Patch Changes

- [`779100b`](https://github.com/commercetools/merchant-center-application-kit/commit/779100b432ad448eefec311f31f87891f35489f6) [#1608](https://github.com/commercetools/merchant-center-application-kit/pull/1608) Thanks [@renovate](https://github.com/apps/renovate)! - Update all dependencies

* [`4168061`](https://github.com/commercetools/merchant-center-application-kit/commit/41680612042d476422776e5eaa254450bf874581) [#1618](https://github.com/commercetools/merchant-center-application-kit/pull/1618) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

* Updated dependencies [[`4168061`](https://github.com/commercetools/merchant-center-application-kit/commit/41680612042d476422776e5eaa254450bf874581)]:
  - @commercetools-frontend/babel-preset-mc-app@16.14.0
  - @commercetools-frontend/mc-html-template@16.14.0

## 16.12.0

### Patch Changes

- [`fa6386c`](https://github.com/commercetools/merchant-center-application-kit/commit/fa6386c347df0505235c199232353bc315a47c81) [#1587](https://github.com/commercetools/merchant-center-application-kit/pull/1587) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`fa6386c`](https://github.com/commercetools/merchant-center-application-kit/commit/fa6386c347df0505235c199232353bc315a47c81)]:
  - @commercetools-frontend/babel-preset-mc-app@16.12.0
  - @commercetools-frontend/mc-html-template@16.12.0

## 16.10.0

### Patch Changes

- [`f8f8609`](https://github.com/commercetools/merchant-center-application-kit/commit/f8f86098687c8cecaaec1b13debabe290b007b58) [#1573](https://github.com/commercetools/merchant-center-application-kit/pull/1573) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

- Updated dependencies [[`58b1b26`](https://github.com/commercetools/merchant-center-application-kit/commit/58b1b26fd6897732d5f80a6e12aeb55ae7bdc7bc)]:
  - @commercetools-frontend/mc-html-template@16.10.0

## 16.9.1

### Patch Changes

- [`f92ec54`](https://github.com/commercetools/merchant-center-application-kit/commit/f92ec54e78edb668e8dff53342e8542e96d8c319) [#1551](https://github.com/commercetools/merchant-center-application-kit/pull/1551) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`f92ec54`](https://github.com/commercetools/merchant-center-application-kit/commit/f92ec54e78edb668e8dff53342e8542e96d8c319)]:
  - @commercetools-frontend/assets@16.9.1
  - @commercetools-frontend/babel-preset-mc-app@16.9.1
  - @commercetools-frontend/mc-dev-authentication@16.9.1
  - @commercetools-frontend/mc-html-template@16.9.1

## 16.9.0

### Minor Changes

- [`96ab311`](https://github.com/commercetools/merchant-center-application-kit/commit/96ab3114a4c00b192763feaeedb68c1e3e804c3e) [#1533](https://github.com/commercetools/merchant-center-application-kit/pull/1533) Thanks [@emmenko](https://github.com/emmenko)! - Upgrade to `react-intl` v4. See also https://formatjs.io/docs/react-intl/upgrade-guide-4x

  We updated the peer dependency range to support both `v3` and `v4`.

### Patch Changes

- [`ccbabfd`](https://github.com/commercetools/merchant-center-application-kit/commit/ccbabfdc75972aedcc12e833cc958b5585cb6d60) [#1549](https://github.com/commercetools/merchant-center-application-kit/pull/1549) Thanks [@tdeekens](https://github.com/tdeekens)! - chore: update deps to prepare for release

## 16.8.8

### Patch Changes

- [`0925da6`](https://github.com/commercetools/merchant-center-application-kit/commit/0925da6f11e35cc712cc12337716f846a67c0e4c) [#1537](https://github.com/commercetools/merchant-center-application-kit/pull/1537) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`0925da6`](https://github.com/commercetools/merchant-center-application-kit/commit/0925da6f11e35cc712cc12337716f846a67c0e4c), [`8600676`](https://github.com/commercetools/merchant-center-application-kit/commit/86006764f9fb75d82ffb01bcc7f14c912c61b698)]:
  - @commercetools-frontend/babel-preset-mc-app@16.8.8
  - @commercetools-frontend/mc-html-template@16.8.8
  - @commercetools-frontend/mc-dev-authentication@16.8.8

## 16.8.6

### Patch Changes

- [`9391762`](https://github.com/commercetools/merchant-center-application-kit/commit/939176298df3558970a267b6e6478051a355ffae) [#1530](https://github.com/commercetools/merchant-center-application-kit/pull/1530) Thanks [@emmenko](https://github.com/emmenko)! - Update `@commercetools-uikit/*` packages to `10.21.0`

- Updated dependencies [[`9391762`](https://github.com/commercetools/merchant-center-application-kit/commit/939176298df3558970a267b6e6478051a355ffae)]:
  - @commercetools-frontend/assets@16.8.6
  - @commercetools-frontend/babel-preset-mc-app@16.8.6
  - @commercetools-frontend/mc-dev-authentication@16.8.6
  - @commercetools-frontend/mc-html-template@16.8.6

## 16.8.5

### Patch Changes

- [`a66fb1f`](https://github.com/commercetools/merchant-center-application-kit/commit/a66fb1f37a06271b0fad0b2a3f6ea41c61455f0e) [#1518](https://github.com/commercetools/merchant-center-application-kit/pull/1518) Thanks [@tdeekens](https://github.com/tdeekens)! - chore(deps): update all dependencies

* [`a66fb1f`](https://github.com/commercetools/merchant-center-application-kit/commit/a66fb1f37a06271b0fad0b2a3f6ea41c61455f0e) [#1518](https://github.com/commercetools/merchant-center-application-kit/pull/1518) Thanks [@tdeekens](https://github.com/tdeekens)! - Update remaining dependencies

## 16.8.4

### Patch Changes

- [`6ffe293`](https://github.com/commercetools/merchant-center-application-kit/commit/6ffe29312433e357ac6c57ce39e98cf9cba49ba5) [#1508](https://github.com/commercetools/merchant-center-application-kit/pull/1508) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

## 16.8.1

### Patch Changes

- [`b96aa31`](https://github.com/commercetools/merchant-center-application-kit/commit/b96aa31f04f8e989242cd02f62ed0595d2d5472b) [#1485](https://github.com/commercetools/merchant-center-application-kit/pull/1485) Thanks [@emmenko](https://github.com/emmenko)! - Missing `@babel/runtime-corejs3` dependency, causing the docker image of the `mc-http-server` to fail.

- Updated dependencies [[`4c15deb`](https://github.com/commercetools/merchant-center-application-kit/commit/4c15deb750a652291bd0eeb30866198c7ab040ec), [`b96aa31`](https://github.com/commercetools/merchant-center-application-kit/commit/b96aa31f04f8e989242cd02f62ed0595d2d5472b)]:
  - @commercetools-frontend/mc-dev-authentication@16.8.1
  - @commercetools-frontend/mc-html-template@16.8.1
