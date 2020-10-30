# @commercetools-local/visual-testing-app

## 17.0.2

### Patch Changes

- [`5d9d5da`](https://github.com/commercetools/merchant-center-application-kit/commit/5d9d5da44364fe5590b67be21ac3630e177326e3) [#1820](https://github.com/commercetools/merchant-center-application-kit/pull/1820) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

- Updated dependencies [[`6059b9a`](https://github.com/commercetools/merchant-center-application-kit/commit/6059b9af35fbee646d008c393578c83795f10b4f)]:
  - @commercetools-frontend/constants@17.1.0
  - @commercetools-frontend/application-components@17.1.0
  - @commercetools-frontend/react-notifications@17.1.0

## 17.0.1

### Patch Changes

- [`71c5f78`](https://github.com/commercetools/merchant-center-application-kit/commit/71c5f7875c7476e34b65d37046d48ca47e96f12e) [#1795](https://github.com/commercetools/merchant-center-application-kit/pull/1795) Thanks [@renovate](https://github.com/apps/renovate)! - update dependencies

- Updated dependencies [[`71c5f78`](https://github.com/commercetools/merchant-center-application-kit/commit/71c5f7875c7476e34b65d37046d48ca47e96f12e)]:
  - @commercetools-frontend/application-components@17.0.1
  - @commercetools-frontend/constants@17.0.1
  - @commercetools-frontend/react-notifications@17.0.1

## 17.0.0

### Major Changes

- [`e706232`](https://github.com/commercetools/merchant-center-application-kit/commit/e706232c152f3fed9cf44c10a0c4f25b27448a16) [#1805](https://github.com/commercetools/merchant-center-application-kit/pull/1805) Thanks [@emmenko](https://github.com/emmenko)! - Remove `mc-scripts extract-intl` command in favor of the official `@formatjs/cli` package.
  We recommend to update your script to extract Intl messages to use the `formatjs extract` command.

  See full release notes: https://docs.commercetools.com/custom-applications/releases/2020-10-14-custom-applications-v17

* [`633d8c7`](https://github.com/commercetools/merchant-center-application-kit/commit/633d8c7b8ddc2f25128d8249579b7bb287a62e30) [#1805](https://github.com/commercetools/merchant-center-application-kit/pull/1805) Thanks [@emmenko](https://github.com/emmenko)! - Remove the CLI flag `--use-local-assets`. The default behavior of `mc-scripts compile-html` now is to compile the assets locally, which is the only reasonable thing to do.

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

- Updated dependencies [[`d883e96`](https://github.com/commercetools/merchant-center-application-kit/commit/d883e96ffd076788256d33d833e7f69ffc39f3ac), [`633d8c7`](https://github.com/commercetools/merchant-center-application-kit/commit/633d8c7b8ddc2f25128d8249579b7bb287a62e30)]:
  - @commercetools-frontend/constants@17.0.0
  - @commercetools-frontend/application-components@17.0.0
  - @commercetools-frontend/react-notifications@17.0.0

## 16.12.7

### Patch Changes

- [`8cdb025`](https://github.com/commercetools/merchant-center-application-kit/commit/8cdb02591b718406c910a2c4128d4be3dfe24785) [#1776](https://github.com/commercetools/merchant-center-application-kit/pull/1776) Thanks [@renovate](https://github.com/apps/renovate)! - update deps

- Updated dependencies [[`8cdb025`](https://github.com/commercetools/merchant-center-application-kit/commit/8cdb02591b718406c910a2c4128d4be3dfe24785)]:
  - @commercetools-frontend/application-components@16.18.0
  - @commercetools-frontend/react-notifications@16.18.0

## 16.12.6

### Patch Changes

- [`0c4d950`](https://github.com/commercetools/merchant-center-application-kit/commit/0c4d95061a09a8cb5f8b4cf7b1b0276e4cc5c50c) [#1767](https://github.com/commercetools/merchant-center-application-kit/pull/1767) Thanks [@adnasa](https://github.com/adnasa)! - update ui-kit to 10.35.1

* [`9752622`](https://github.com/commercetools/merchant-center-application-kit/commit/9752622b7422e821bb62d61af360a01f6994dc6b) [#1758](https://github.com/commercetools/merchant-center-application-kit/pull/1758) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

* Updated dependencies [[`0c4d950`](https://github.com/commercetools/merchant-center-application-kit/commit/0c4d95061a09a8cb5f8b4cf7b1b0276e4cc5c50c), [`9752622`](https://github.com/commercetools/merchant-center-application-kit/commit/9752622b7422e821bb62d61af360a01f6994dc6b)]:
  - @commercetools-frontend/application-components@16.17.2
  - @commercetools-frontend/react-notifications@16.17.2

## 16.12.5

### Patch Changes

- [`786c697`](https://github.com/commercetools/merchant-center-application-kit/commit/786c6978c1febf927db6b45c758498b72e8e48be) [#1745](https://github.com/commercetools/merchant-center-application-kit/pull/1745) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

* [`178ff31`](https://github.com/commercetools/merchant-center-application-kit/commit/178ff317426e0cfcfe1c0adf42a9eada3b134642) [#1734](https://github.com/commercetools/merchant-center-application-kit/pull/1734) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

- [`9bc8558`](https://github.com/commercetools/merchant-center-application-kit/commit/9bc85581d336c7d75fda5dc82a1c02f32f16c1fb) [#1704](https://github.com/commercetools/merchant-center-application-kit/pull/1704) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`786c697`](https://github.com/commercetools/merchant-center-application-kit/commit/786c6978c1febf927db6b45c758498b72e8e48be), [`178ff31`](https://github.com/commercetools/merchant-center-application-kit/commit/178ff317426e0cfcfe1c0adf42a9eada3b134642), [`9bc8558`](https://github.com/commercetools/merchant-center-application-kit/commit/9bc85581d336c7d75fda5dc82a1c02f32f16c1fb)]:
  - @commercetools-frontend/application-components@16.17.0
  - @commercetools-frontend/react-notifications@16.17.0

## 16.12.4

### Patch Changes

- Updated dependencies [[`3d38e5e`](https://github.com/commercetools/merchant-center-application-kit/commit/3d38e5e536b2ef410f796752b6f9926479cd7017)]:
  - @commercetools-frontend/react-notifications@16.16.5
  - @commercetools-frontend/application-components@16.16.5

## 16.12.3

### Patch Changes

- Updated dependencies [[`d8915a8`](https://github.com/commercetools/merchant-center-application-kit/commit/d8915a8b29ac940839720d5912a1ef0050b9ada5)]:
  - @commercetools-frontend/react-notifications@16.16.4
  - @commercetools-frontend/application-components@16.16.4

## 16.12.2

### Patch Changes

- Updated dependencies []:
  - @commercetools-frontend/application-components@16.16.2

## 16.12.1

### Patch Changes

- [`bc15ac2`](https://github.com/commercetools/merchant-center-application-kit/commit/bc15ac2f6d53d4c8e0d53ceb6c1a0e5ba0f5353e) [#1692](https://github.com/commercetools/merchant-center-application-kit/pull/1692) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

- Updated dependencies [[`bc15ac2`](https://github.com/commercetools/merchant-center-application-kit/commit/bc15ac2f6d53d4c8e0d53ceb6c1a0e5ba0f5353e)]:
  - @commercetools-frontend/application-components@16.16.1
  - @commercetools-frontend/react-notifications@16.16.1

## 16.12.0

### Minor Changes

- [`4216b92`](https://github.com/commercetools/merchant-center-application-kit/commit/4216b922fbb39e74ce35f8647d1c4e9ae77909c8) [#1685](https://github.com/commercetools/merchant-center-application-kit/pull/1685) Thanks [@emmenko](https://github.com/emmenko)! - Refactor i18n package to consume compiled data from ui-kit translation messages. Furthermore, the `@commercetools-frontend/i18n` now exposes a `compiled-data` folder as well: `@commercetools-frontend/i18n/compiled-data`.
  This can be used the load pre-compiled messages and thus improving the runtime performance.

  Furthermore, the `mc-scripts extract-intl` command has been deprecated in favor of the more official message extraction with the `@formatjs/cli`: https://formatjs.io/docs/getting-started/message-extraction.

### Patch Changes

- [`f144292`](https://github.com/commercetools/merchant-center-application-kit/commit/f1442921650ca4e6c9bf61ce31bda2b63e72038a) [#1673](https://github.com/commercetools/merchant-center-application-kit/pull/1673) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

* [`211ab69`](https://github.com/commercetools/merchant-center-application-kit/commit/211ab6969a78af5c592c1cc3c3e3ace3199e95cb) [#1689](https://github.com/commercetools/merchant-center-application-kit/pull/1689) Thanks [@emmenko](https://github.com/emmenko)! - Remove emotion dependencies resolutions

* Updated dependencies [[`f144292`](https://github.com/commercetools/merchant-center-application-kit/commit/f1442921650ca4e6c9bf61ce31bda2b63e72038a), [`211ab69`](https://github.com/commercetools/merchant-center-application-kit/commit/211ab6969a78af5c592c1cc3c3e3ace3199e95cb), [`4216b92`](https://github.com/commercetools/merchant-center-application-kit/commit/4216b922fbb39e74ce35f8647d1c4e9ae77909c8)]:
  - @commercetools-frontend/application-components@16.16.0
  - @commercetools-frontend/constants@16.16.0
  - @commercetools-frontend/react-notifications@16.16.0

## 16.11.4

### Patch Changes

- Updated dependencies [[`a0ae954`](https://github.com/commercetools/merchant-center-application-kit/commit/a0ae9543c139bfa4cde619153082b400d953dfa5), [`564cd91`](https://github.com/commercetools/merchant-center-application-kit/commit/564cd9186d23ea34886d1c41718486e16d3ca90e)]:
  - @commercetools-frontend/react-notifications@16.15.9
  - @commercetools-frontend/constants@16.15.9
  - @commercetools-frontend/application-components@16.15.9

## 16.11.3

### Patch Changes

- [`c62261f`](https://github.com/commercetools/merchant-center-application-kit/commit/c62261f80e17fb63467eed6328e41764d3e9a50e) [#1653](https://github.com/commercetools/merchant-center-application-kit/pull/1653) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies and regenerate l10n data based on CLDR v37

- Updated dependencies [[`c62261f`](https://github.com/commercetools/merchant-center-application-kit/commit/c62261f80e17fb63467eed6328e41764d3e9a50e)]:
  - @commercetools-frontend/application-components@16.15.8
  - @commercetools-frontend/react-notifications@16.15.8

## 16.11.2

### Patch Changes

- Updated dependencies [[`6d98245`](https://github.com/commercetools/merchant-center-application-kit/commit/6d98245615ddb83e805e5cc2cc0620920b4a71c7)]:
  - @commercetools-frontend/constants@16.15.3
  - @commercetools-frontend/react-notifications@16.15.3
  - @commercetools-frontend/application-components@16.15.3

## 16.11.1

### Patch Changes

- [`0f3dcc3`](https://github.com/commercetools/merchant-center-application-kit/commit/0f3dcc38c81a5fb3c668faecce9a13057f66a66b) [#1638](https://github.com/commercetools/merchant-center-application-kit/pull/1638) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`0f3dcc3`](https://github.com/commercetools/merchant-center-application-kit/commit/0f3dcc38c81a5fb3c668faecce9a13057f66a66b)]:
  - @commercetools-frontend/application-components@16.15.2
  - @commercetools-frontend/constants@16.15.2
  - @commercetools-frontend/react-notifications@16.15.2

## 16.11.0

### Minor Changes

- [`728024c`](https://github.com/commercetools/merchant-center-application-kit/commit/728024c57666d67e997b7342df74cceba511d182) [#1626](https://github.com/commercetools/merchant-center-application-kit/pull/1626) Thanks [@emmenko](https://github.com/emmenko)! - This release introduces the usage of a new configuration file format and marks the deprecation of the `env.json` and `headers.json` files.

  For all the necessary information about migrating to the new configuration file, please [read the release notes](https://docs.commercetools.com/custom-applications/releases/2020-07-16-introducing-a-new-and-simpler-application-config).

### Patch Changes

- [`cc8b37b`](https://github.com/commercetools/merchant-center-application-kit/commit/cc8b37bf85d4683a605a6c3233100627e670ebe7) [#1627](https://github.com/commercetools/merchant-center-application-kit/pull/1627) Thanks [@renovate](https://github.com/apps/renovate)! - chore: update dependencies

- Updated dependencies [[`cc8b37b`](https://github.com/commercetools/merchant-center-application-kit/commit/cc8b37bf85d4683a605a6c3233100627e670ebe7), [`33baf25`](https://github.com/commercetools/merchant-center-application-kit/commit/33baf25a5990d7bb292e88e4040e11bff4669b2c)]:
  - @commercetools-frontend/application-components@16.15.0
  - @commercetools-frontend/react-notifications@16.15.0
  - @commercetools-frontend/constants@16.15.0

## 16.10.2

### Patch Changes

- [`779100b`](https://github.com/commercetools/merchant-center-application-kit/commit/779100b432ad448eefec311f31f87891f35489f6) [#1608](https://github.com/commercetools/merchant-center-application-kit/pull/1608) Thanks [@renovate](https://github.com/apps/renovate)! - Update all dependencies

* [`364e711`](https://github.com/commercetools/merchant-center-application-kit/commit/364e71195f9886d30f907b29f8b03eb650df71e5) [#1621](https://github.com/commercetools/merchant-center-application-kit/pull/1621) Thanks [@renovate](https://github.com/apps/renovate)! - feat(deps: add support for react-intl v5 through peer dependencies
  fix(deps): update dependency react-intl to v5

- [`4168061`](https://github.com/commercetools/merchant-center-application-kit/commit/41680612042d476422776e5eaa254450bf874581) [#1618](https://github.com/commercetools/merchant-center-application-kit/pull/1618) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`779100b`](https://github.com/commercetools/merchant-center-application-kit/commit/779100b432ad448eefec311f31f87891f35489f6), [`364e711`](https://github.com/commercetools/merchant-center-application-kit/commit/364e71195f9886d30f907b29f8b03eb650df71e5), [`4168061`](https://github.com/commercetools/merchant-center-application-kit/commit/41680612042d476422776e5eaa254450bf874581)]:
  - @commercetools-frontend/application-components@16.14.0
  - @commercetools-frontend/react-notifications@16.14.0
  - @commercetools-frontend/constants@16.14.0

## 16.10.1

### Patch Changes

- Updated dependencies []:
  - @commercetools-frontend/application-components@16.13.2

## 16.10.0

### Minor Changes

- [`f70fed0`](https://github.com/commercetools/merchant-center-application-kit/commit/f70fed0e1332d1cc285bf832aec5e3dcbe325546) [#1595](https://github.com/commercetools/merchant-center-application-kit/pull/1595) Thanks [@Rombelirk](https://github.com/Rombelirk)! - refactor(application-components, visual-testing-app): migrate PageUnauthorized component to AppKit

### Patch Changes

- Updated dependencies [[`f70fed0`](https://github.com/commercetools/merchant-center-application-kit/commit/f70fed0e1332d1cc285bf832aec5e3dcbe325546)]:
  - @commercetools-frontend/application-components@16.13.0

## 16.9.4

### Patch Changes

- [`fa6386c`](https://github.com/commercetools/merchant-center-application-kit/commit/fa6386c347df0505235c199232353bc315a47c81) [#1587](https://github.com/commercetools/merchant-center-application-kit/pull/1587) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`053ae10`](https://github.com/commercetools/merchant-center-application-kit/commit/053ae101588c75410aaa7cf4e17848fa8e22cfef), [`fa6386c`](https://github.com/commercetools/merchant-center-application-kit/commit/fa6386c347df0505235c199232353bc315a47c81)]:
  - @commercetools-frontend/application-components@16.12.0
  - @commercetools-frontend/constants@16.12.0
  - @commercetools-frontend/react-notifications@16.12.0

## 16.9.3

### Patch Changes

- [`f8f8609`](https://github.com/commercetools/merchant-center-application-kit/commit/f8f86098687c8cecaaec1b13debabe290b007b58) [#1573](https://github.com/commercetools/merchant-center-application-kit/pull/1573) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

- Updated dependencies []:
  - @commercetools-frontend/react-notifications@16.10.0
  - @commercetools-frontend/application-components@16.10.0

## 16.9.2

### Patch Changes

- Updated dependencies []:
  - @commercetools-frontend/application-components@16.9.2

## 16.9.1

### Patch Changes

- Updated dependencies [[`f92ec54`](https://github.com/commercetools/merchant-center-application-kit/commit/f92ec54e78edb668e8dff53342e8542e96d8c319), [`92b1637`](https://github.com/commercetools/merchant-center-application-kit/commit/92b16375d22e0395ae5278bcf874e5532ad8248c)]:
  - @commercetools-frontend/application-components@16.9.1
  - @commercetools-frontend/constants@16.9.1
  - @commercetools-frontend/react-notifications@16.9.1

## 16.9.0

### Minor Changes

- [`96ab311`](https://github.com/commercetools/merchant-center-application-kit/commit/96ab3114a4c00b192763feaeedb68c1e3e804c3e) [#1533](https://github.com/commercetools/merchant-center-application-kit/pull/1533) Thanks [@emmenko](https://github.com/emmenko)! - Upgrade to `react-intl` v4. See also https://formatjs.io/docs/react-intl/upgrade-guide-4x

  We updated the peer dependency range to support both `v3` and `v4`.

### Patch Changes

- [`ccbabfd`](https://github.com/commercetools/merchant-center-application-kit/commit/ccbabfdc75972aedcc12e833cc958b5585cb6d60) [#1549](https://github.com/commercetools/merchant-center-application-kit/pull/1549) Thanks [@tdeekens](https://github.com/tdeekens)! - chore: update deps to prepare for release

- Updated dependencies [[`ccbabfd`](https://github.com/commercetools/merchant-center-application-kit/commit/ccbabfdc75972aedcc12e833cc958b5585cb6d60), [`96ab311`](https://github.com/commercetools/merchant-center-application-kit/commit/96ab3114a4c00b192763feaeedb68c1e3e804c3e)]:
  - @commercetools-frontend/application-components@16.9.0
  - @commercetools-frontend/react-notifications@16.9.0

## 16.8.5

### Patch Changes

- Updated dependencies [[`0925da6`](https://github.com/commercetools/merchant-center-application-kit/commit/0925da6f11e35cc712cc12337716f846a67c0e4c)]:
  - @commercetools-frontend/application-components@16.8.8
  - @commercetools-frontend/constants@16.8.8
  - @commercetools-frontend/react-notifications@16.8.8

## 16.8.4

### Patch Changes

- [`9391762`](https://github.com/commercetools/merchant-center-application-kit/commit/939176298df3558970a267b6e6478051a355ffae) [#1530](https://github.com/commercetools/merchant-center-application-kit/pull/1530) Thanks [@emmenko](https://github.com/emmenko)! - Update `@commercetools-uikit/*` packages to `10.21.0`

- Updated dependencies [[`9391762`](https://github.com/commercetools/merchant-center-application-kit/commit/939176298df3558970a267b6e6478051a355ffae)]:
  - @commercetools-frontend/application-components@16.8.6
  - @commercetools-frontend/constants@16.8.6
  - @commercetools-frontend/react-notifications@16.8.6

## 16.8.3

### Patch Changes

- [`a66fb1f`](https://github.com/commercetools/merchant-center-application-kit/commit/a66fb1f37a06271b0fad0b2a3f6ea41c61455f0e) [#1518](https://github.com/commercetools/merchant-center-application-kit/pull/1518) Thanks [@tdeekens](https://github.com/tdeekens)! - chore(deps): update all dependencies

- Updated dependencies [[`a66fb1f`](https://github.com/commercetools/merchant-center-application-kit/commit/a66fb1f37a06271b0fad0b2a3f6ea41c61455f0e)]:
  - @commercetools-frontend/application-components@16.8.5
  - @commercetools-frontend/react-notifications@16.8.5

## 16.8.2

### Patch Changes

- [`6ffe293`](https://github.com/commercetools/merchant-center-application-kit/commit/6ffe29312433e357ac6c57ce39e98cf9cba49ba5) [#1508](https://github.com/commercetools/merchant-center-application-kit/pull/1508) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`6ffe293`](https://github.com/commercetools/merchant-center-application-kit/commit/6ffe29312433e357ac6c57ce39e98cf9cba49ba5)]:
  - @commercetools-frontend/react-notifications@16.8.4
  - @commercetools-frontend/application-components@16.8.4

## 16.8.1

### Patch Changes

- Updated dependencies [[`10c9a89`](https://github.com/commercetools/merchant-center-application-kit/commit/10c9a89ce96c1748e84505e65266577fbea890e3)]:
  - @commercetools-frontend/constants@16.8.3
  - @commercetools-frontend/application-components@16.8.3
  - @commercetools-frontend/react-notifications@16.8.3
