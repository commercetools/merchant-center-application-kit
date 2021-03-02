# @commercetools-local/visual-testing-app

## 17.2.4

### Patch Changes

- Updated dependencies []:
  - @commercetools-frontend/application-components@18.5.4

## 17.2.3

### Patch Changes

- [`5892c888`](https://github.com/commercetools/merchant-center-application-kit/commit/5892c88879bea4b5cb11b9da39d080005da6b045) [#2067](https://github.com/commercetools/merchant-center-application-kit/pull/2067) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all ui-kit packages to v11 (major)

* [`7f26c54e`](https://github.com/commercetools/merchant-center-application-kit/commit/7f26c54e55eff8aeac786ec0d011d36e40b0d263) [#2066](https://github.com/commercetools/merchant-center-application-kit/pull/2066) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

* Updated dependencies [[`5892c888`](https://github.com/commercetools/merchant-center-application-kit/commit/5892c88879bea4b5cb11b9da39d080005da6b045), [`7f26c54e`](https://github.com/commercetools/merchant-center-application-kit/commit/7f26c54e55eff8aeac786ec0d011d36e40b0d263)]:
  - @commercetools-frontend/application-components@18.5.2
  - @commercetools-frontend/react-notifications@18.5.2
  - @commercetools-frontend/constants@18.5.2

## 17.2.2

### Patch Changes

- [`bb2ceac2`](https://github.com/commercetools/merchant-center-application-kit/commit/bb2ceac229b94836482dbed57824d679a9cbd5d6) [#2062](https://github.com/commercetools/merchant-center-application-kit/pull/2062) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`bb2ceac2`](https://github.com/commercetools/merchant-center-application-kit/commit/bb2ceac229b94836482dbed57824d679a9cbd5d6)]:
  - @commercetools-frontend/application-components@18.5.1
  - @commercetools-frontend/constants@18.5.1
  - @commercetools-frontend/react-notifications@18.5.1

## 17.2.1

### Patch Changes

- [`074ec33d`](https://github.com/commercetools/merchant-center-application-kit/commit/074ec33d97282fc9750fd59ccceb33ff0430da41) [#2053](https://github.com/commercetools/merchant-center-application-kit/pull/2053) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

- Updated dependencies [[`074ec33d`](https://github.com/commercetools/merchant-center-application-kit/commit/074ec33d97282fc9750fd59ccceb33ff0430da41), [`e5743110`](https://github.com/commercetools/merchant-center-application-kit/commit/e574311090e90b6186c18a3a49747a8bcf08822b)]:
  - @commercetools-frontend/application-components@18.4.1
  - @commercetools-frontend/react-notifications@18.4.1

## 17.2.0

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

- [`63d9c424`](https://github.com/commercetools/merchant-center-application-kit/commit/63d9c42463be04bad32ee32be1c84535086de755) [#2049](https://github.com/commercetools/merchant-center-application-kit/pull/2049) Thanks [@emmenko](https://github.com/emmenko)! - Bump uikit versions, use `@manypkg/cli upgrade` instead of `bulk-update-versions`.

* [`eb2fbb22`](https://github.com/commercetools/merchant-center-application-kit/commit/eb2fbb2279eff99048c91da352a69e1883eb54af) [#2044](https://github.com/commercetools/merchant-center-application-kit/pull/2044) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

* Updated dependencies [[`63d9c424`](https://github.com/commercetools/merchant-center-application-kit/commit/63d9c42463be04bad32ee32be1c84535086de755), [`eb2fbb22`](https://github.com/commercetools/merchant-center-application-kit/commit/eb2fbb2279eff99048c91da352a69e1883eb54af)]:
  - @commercetools-frontend/application-components@18.4.0
  - @commercetools-frontend/react-notifications@18.4.0
  - @commercetools-frontend/constants@18.4.0

## 17.1.8

### Patch Changes

- Updated dependencies [[`71e12377`](https://github.com/commercetools/merchant-center-application-kit/commit/71e12377a4b4e623942b7f6b441bc9899b561cb3)]:
  - @commercetools-frontend/application-components@18.3.0

## 17.1.7

### Patch Changes

- Updated dependencies [[`27b6690c`](https://github.com/commercetools/merchant-center-application-kit/commit/27b6690c75c9b83bb11ffcf83251b039a6f06cf0)]:
  - @commercetools-frontend/constants@18.2.2
  - @commercetools-frontend/application-components@18.2.2
  - @commercetools-frontend/react-notifications@18.2.2

## 17.1.6

### Patch Changes

- [`aa6f642a`](https://github.com/commercetools/merchant-center-application-kit/commit/aa6f642a7d28dec7f34f8e6147ed9c7fee0ebd13) [#2026](https://github.com/commercetools/merchant-center-application-kit/pull/2026) Thanks [@emmenko](https://github.com/emmenko)! - Update uikit and docs-kit dependencies to fix some underlying emotion and react-select version resolution.

- Updated dependencies [[`aa6f642a`](https://github.com/commercetools/merchant-center-application-kit/commit/aa6f642a7d28dec7f34f8e6147ed9c7fee0ebd13)]:
  - @commercetools-frontend/application-components@18.1.5
  - @commercetools-frontend/react-notifications@18.1.5

## 17.1.5

### Patch Changes

- [`c9589f5e`](https://github.com/commercetools/merchant-center-application-kit/commit/c9589f5e3d1fd18393c7bf501c3b23b8ec402804) [#2020](https://github.com/commercetools/merchant-center-application-kit/pull/2020) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

- Updated dependencies [[`c9589f5e`](https://github.com/commercetools/merchant-center-application-kit/commit/c9589f5e3d1fd18393c7bf501c3b23b8ec402804)]:
  - @commercetools-frontend/application-components@18.1.4
  - @commercetools-frontend/react-notifications@18.1.4

## 17.1.4

### Patch Changes

- Updated dependencies [[`3bf32993`](https://github.com/commercetools/merchant-center-application-kit/commit/3bf329935a109a73a7c33580fdf618e60fdbcc2c), [`7a53760f`](https://github.com/commercetools/merchant-center-application-kit/commit/7a53760f4a04decd02037315d8935bed953abfc8)]:
  - @commercetools-frontend/application-components@18.1.0
  - @commercetools-frontend/constants@18.1.0
  - @commercetools-frontend/react-notifications@18.1.0

## 17.1.3

### Patch Changes

- [`b38cb57f`](https://github.com/commercetools/merchant-center-application-kit/commit/b38cb57f678e79a862f1b97df2d1c753838ffbb7) [#1991](https://github.com/commercetools/merchant-center-application-kit/pull/1991) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

- Updated dependencies [[`b38cb57f`](https://github.com/commercetools/merchant-center-application-kit/commit/b38cb57f678e79a862f1b97df2d1c753838ffbb7)]:
  - @commercetools-frontend/application-components@18.0.2
  - @commercetools-frontend/react-notifications@18.0.2

## 17.1.2

### Patch Changes

- [`0ef6a6a`](https://github.com/commercetools/merchant-center-application-kit/commit/0ef6a6a3099ce7210b8db8cc5a21a5e40a050d36) [#1989](https://github.com/commercetools/merchant-center-application-kit/pull/1989) Thanks [@emmenko](https://github.com/emmenko)! - Update uikit packages to `10.44`

- Updated dependencies [[`0ef6a6a`](https://github.com/commercetools/merchant-center-application-kit/commit/0ef6a6a3099ce7210b8db8cc5a21a5e40a050d36)]:
  - @commercetools-frontend/application-components@17.10.2
  - @commercetools-frontend/react-notifications@17.10.2

## 17.1.1

### Patch Changes

- [`5557c5c`](https://github.com/commercetools/merchant-center-application-kit/commit/5557c5c5744bf34a981247d04dc2f1117c15767d) [#1976](https://github.com/commercetools/merchant-center-application-kit/pull/1976) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

- Updated dependencies [[`5557c5c`](https://github.com/commercetools/merchant-center-application-kit/commit/5557c5c5744bf34a981247d04dc2f1117c15767d)]:
  - @commercetools-frontend/application-components@17.10.1
  - @commercetools-frontend/constants@17.10.1
  - @commercetools-frontend/react-notifications@17.10.1

## 17.1.0

### Minor Changes

- [`d86c2e8`](https://github.com/commercetools/merchant-center-application-kit/commit/d86c2e86179aca2729d92fa18545241e2bf36fca) [#1934](https://github.com/commercetools/merchant-center-application-kit/pull/1934) Thanks [@emmenko](https://github.com/emmenko)! - Introduce a new **experimental opt-in** feature to authenticate the application for local development, using an OIDC-like workflow.

  > Disclaimer: this is an opt-in experimental feature. Use it at your own risk.
  > We want to test this feature internally first. Until then, we discourage you to try it out.

  The feature can be enabled by setting the `ENABLE_OIDC_FOR_DEVELOPMENT=true` environment variable.

  In addition to that, we have a new package `@commercetools-frontend/cypress`, to include some useful commands for testing Custom Applications.

### Patch Changes

- Updated dependencies [[`d86c2e8`](https://github.com/commercetools/merchant-center-application-kit/commit/d86c2e86179aca2729d92fa18545241e2bf36fca), [`dc7a443`](https://github.com/commercetools/merchant-center-application-kit/commit/dc7a4437f02cfe9c840ae6f22cc85f94cf6a0bc9)]:
  - @commercetools-frontend/application-components@17.10.0
  - @commercetools-frontend/constants@17.10.0
  - @commercetools-frontend/react-notifications@17.10.0

## 17.0.16

### Patch Changes

- Updated dependencies []:
  - @commercetools-frontend/application-components@17.9.1

## 17.0.15

### Patch Changes

- Updated dependencies [[`4f7e081`](https://github.com/commercetools/merchant-center-application-kit/commit/4f7e081c001e285e8f4c7771894f5d09509daf8e)]:
  - @commercetools-frontend/constants@17.9.0
  - @commercetools-frontend/application-components@17.9.0
  - @commercetools-frontend/react-notifications@17.9.0

## 17.0.14

### Patch Changes

- [`48a9886`](https://github.com/commercetools/merchant-center-application-kit/commit/48a98861dcf4193041e02e8ac11eb2940826f5d0) [#1954](https://github.com/commercetools/merchant-center-application-kit/pull/1954) Thanks [@tdeekens](https://github.com/tdeekens)! - chore: update dependencies across packages

* [`4971a78`](https://github.com/commercetools/merchant-center-application-kit/commit/4971a78438fb4d2ca5487764192a0bb1ffc3b18e) [#1952](https://github.com/commercetools/merchant-center-application-kit/pull/1952) Thanks [@tdeekens](https://github.com/tdeekens)! - chore: add and apply fixes via manypkg for automatic mono-repo validation

* Updated dependencies [[`48a9886`](https://github.com/commercetools/merchant-center-application-kit/commit/48a98861dcf4193041e02e8ac11eb2940826f5d0), [`4971a78`](https://github.com/commercetools/merchant-center-application-kit/commit/4971a78438fb4d2ca5487764192a0bb1ffc3b18e)]:
  - @commercetools-frontend/application-components@17.8.0
  - @commercetools-frontend/react-notifications@17.8.0

## 17.0.13

### Patch Changes

- [`f6f3c5e`](https://github.com/commercetools/merchant-center-application-kit/commit/f6f3c5ebd08226fd4eca22aec5c39791cf5c5d6a) [#1935](https://github.com/commercetools/merchant-center-application-kit/pull/1935) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`f6f3c5e`](https://github.com/commercetools/merchant-center-application-kit/commit/f6f3c5ebd08226fd4eca22aec5c39791cf5c5d6a)]:
  - @commercetools-frontend/application-components@17.7.1
  - @commercetools-frontend/react-notifications@17.7.1

## 17.0.12

### Patch Changes

- [`1ec4379`](https://github.com/commercetools/merchant-center-application-kit/commit/1ec4379938b093d4444ec9e4079524c48afd4a42) [#1923](https://github.com/commercetools/merchant-center-application-kit/pull/1923) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`d74addd`](https://github.com/commercetools/merchant-center-application-kit/commit/d74addd32a5f39d19d6bae1ee31cbf33a35fd04e)]:
  - @commercetools-frontend/application-components@17.7.0

## 17.0.11

### Patch Changes

- [`1a96e83`](https://github.com/commercetools/merchant-center-application-kit/commit/1a96e831c94250e10de61dee40e682a77313445f) [#1905](https://github.com/commercetools/merchant-center-application-kit/pull/1905) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`6819edc`](https://github.com/commercetools/merchant-center-application-kit/commit/6819edc25ef7f4a4d8a30c0c27db93ee4dae187a), [`1a96e83`](https://github.com/commercetools/merchant-center-application-kit/commit/1a96e831c94250e10de61dee40e682a77313445f)]:
  - @commercetools-frontend/application-components@17.6.2
  - @commercetools-frontend/react-notifications@17.6.2

## 17.0.10

### Patch Changes

- Updated dependencies [[`81a274c`](https://github.com/commercetools/merchant-center-application-kit/commit/81a274c6abd5f3725e7698fa37004b9647549e41), [`2287813`](https://github.com/commercetools/merchant-center-application-kit/commit/2287813c19a54b7edb7005d417c5f6a7b34cad1f)]:
  - @commercetools-frontend/application-components@17.6.0
  - @commercetools-frontend/constants@17.6.0
  - @commercetools-frontend/react-notifications@17.6.0

## 17.0.9

### Patch Changes

- [`bf5f71e`](https://github.com/commercetools/merchant-center-application-kit/commit/bf5f71e663a91d68d777d26ed3145bc96bbf2aa4) [#1896](https://github.com/commercetools/merchant-center-application-kit/pull/1896) Thanks [@emmenko](https://github.com/emmenko)! - Update docs-kit dependencies to v11, which supports emotion v11. As a result, the appkit bundles are using the correct emotion dependencies.

- Updated dependencies [[`bf5f71e`](https://github.com/commercetools/merchant-center-application-kit/commit/bf5f71e663a91d68d777d26ed3145bc96bbf2aa4)]:
  - @commercetools-frontend/application-components@17.5.0
  - @commercetools-frontend/react-notifications@17.5.0

## 17.0.8

### Patch Changes

- [`636fc45`](https://github.com/commercetools/merchant-center-application-kit/commit/636fc45c0d53544a90b0977b2212ec3a8aec8b94) [#1887](https://github.com/commercetools/merchant-center-application-kit/pull/1887) Thanks [@adnasa](https://github.com/adnasa)! - upgrade ui-kit, which includes the new [horizontal constraint changes](https://github.com/commercetools/ui-kit/pull/1632).

* [`ec9e10f`](https://github.com/commercetools/merchant-center-application-kit/commit/ec9e10fde15351cc7cb825aaebb53cdb6e00e0d9) [#1889](https://github.com/commercetools/merchant-center-application-kit/pull/1889) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

* Updated dependencies [[`636fc45`](https://github.com/commercetools/merchant-center-application-kit/commit/636fc45c0d53544a90b0977b2212ec3a8aec8b94), [`d832bd4`](https://github.com/commercetools/merchant-center-application-kit/commit/d832bd44c354aaf2374c0c75c9050c673998ff32), [`ec9e10f`](https://github.com/commercetools/merchant-center-application-kit/commit/ec9e10fde15351cc7cb825aaebb53cdb6e00e0d9)]:
  - @commercetools-frontend/application-components@17.4.1
  - @commercetools-frontend/react-notifications@17.4.1

## 17.0.7

### Patch Changes

- [`89c4464`](https://github.com/commercetools/merchant-center-application-kit/commit/89c4464c334dd6c3922d031872286ad3bea8cf67) [#1872](https://github.com/commercetools/merchant-center-application-kit/pull/1872) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

- Updated dependencies [[`89c4464`](https://github.com/commercetools/merchant-center-application-kit/commit/89c4464c334dd6c3922d031872286ad3bea8cf67)]:
  - @commercetools-frontend/application-components@17.3.1
  - @commercetools-frontend/react-notifications@17.3.1

## 17.0.6

### Patch Changes

- [`71c9111`](https://github.com/commercetools/merchant-center-application-kit/commit/71c9111308832009d1a27e91e4f2d2da4c53367c) [#1866](https://github.com/commercetools/merchant-center-application-kit/pull/1866) Thanks [@emmenko](https://github.com/emmenko)! - Update to uikit v10.39.8

- Updated dependencies [[`71c9111`](https://github.com/commercetools/merchant-center-application-kit/commit/71c9111308832009d1a27e91e4f2d2da4c53367c)]:
  - @commercetools-frontend/application-components@17.3.0
  - @commercetools-frontend/constants@17.3.0
  - @commercetools-frontend/react-notifications@17.3.0

## 17.0.5

### Patch Changes

- [`310e98c`](https://github.com/commercetools/merchant-center-application-kit/commit/310e98c39c0b6479175b7685b3f29ea0a5baa22b) Thanks [@emmenko](https://github.com/emmenko)! - Update dependencies (https://github.com/commercetools/merchant-center-application-kit/pull/1857)

- Updated dependencies [[`310e98c`](https://github.com/commercetools/merchant-center-application-kit/commit/310e98c39c0b6479175b7685b3f29ea0a5baa22b)]:
  - @commercetools-frontend/application-components@17.2.1
  - @commercetools-frontend/constants@17.2.1
  - @commercetools-frontend/react-notifications@17.2.1

## 17.0.4

### Patch Changes

- Updated dependencies [[`e0ec004`](https://github.com/commercetools/merchant-center-application-kit/commit/e0ec004d611f93b24f015120d09f6f18389b219f), [`e519929`](https://github.com/commercetools/merchant-center-application-kit/commit/e519929415f225ff28731f068bebb8facad868f8)]:
  - @commercetools-frontend/application-components@17.2.0
  - @commercetools-frontend/constants@17.2.0
  - @commercetools-frontend/react-notifications@17.2.0

## 17.0.3

### Patch Changes

- Updated dependencies [[`bacc091`](https://github.com/commercetools/merchant-center-application-kit/commit/bacc091506dedb58fadaa4008fc93381a5e9b212)]:
  - @commercetools-frontend/constants@17.1.1
  - @commercetools-frontend/application-components@17.1.1
  - @commercetools-frontend/react-notifications@17.1.1

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
