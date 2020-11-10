# @commercetools-frontend/mc-scripts

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
