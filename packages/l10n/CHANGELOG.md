# @commercetools-frontend/l10n

## 20.3.1

### Patch Changes

- [#2230](https://github.com/commercetools/merchant-center-application-kit/pull/2230) [`035ec444`](https://github.com/commercetools/merchant-center-application-kit/commit/035ec444c928d6b13f299012cfcdd0dec0e68af8) Thanks [@tdeekens](https://github.com/tdeekens)! - fix: update left behind dependencies

- Updated dependencies [[`035ec444`](https://github.com/commercetools/merchant-center-application-kit/commit/035ec444c928d6b13f299012cfcdd0dec0e68af8)]:
  - @commercetools-frontend/sentry@20.3.1

## 20.3.0

### Patch Changes

- [#2223](https://github.com/commercetools/merchant-center-application-kit/pull/2223) [`6de28034`](https://github.com/commercetools/merchant-center-application-kit/commit/6de28034f51e53b3cd1f293eaa16b8f66d9ae9e0) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

* [#2225](https://github.com/commercetools/merchant-center-application-kit/pull/2225) [`7e7b4996`](https://github.com/commercetools/merchant-center-application-kit/commit/7e7b4996abd7297650237b43b375f04b3ff10b54) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update dependency cldr to v7

* Updated dependencies [[`6de28034`](https://github.com/commercetools/merchant-center-application-kit/commit/6de28034f51e53b3cd1f293eaa16b8f66d9ae9e0), [`5961c019`](https://github.com/commercetools/merchant-center-application-kit/commit/5961c019ab908bc1a5d58acd4511e7c579976797)]:
  - @commercetools-frontend/sentry@20.3.0

## 20.2.1

### Patch Changes

- Updated dependencies [[`f8b4acc1`](https://github.com/commercetools/merchant-center-application-kit/commit/f8b4acc1acd175b8dc6a65c6aead2162771fd748)]:
  - @commercetools-frontend/sentry@20.2.1

## 20.0.1

### Patch Changes

- [#2178](https://github.com/commercetools/merchant-center-application-kit/pull/2178) [`26d4487a`](https://github.com/commercetools/merchant-center-application-kit/commit/26d4487a15dcee5c526de7b1f227e042e2711d3f) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`26d4487a`](https://github.com/commercetools/merchant-center-application-kit/commit/26d4487a15dcee5c526de7b1f227e042e2711d3f)]:
  - @commercetools-frontend/sentry@20.0.1

## 19.3.1

### Patch Changes

- [#2157](https://github.com/commercetools/merchant-center-application-kit/pull/2157) [`e757dd2b`](https://github.com/commercetools/merchant-center-application-kit/commit/e757dd2b114f0c751400eca6179700bddbb3aecc) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`e757dd2b`](https://github.com/commercetools/merchant-center-application-kit/commit/e757dd2b114f0c751400eca6179700bddbb3aecc)]:
  - @commercetools-frontend/sentry@19.3.1

## 19.1.0

### Minor Changes

- [#2148](https://github.com/commercetools/merchant-center-application-kit/pull/2148) [`18fb7648`](https://github.com/commercetools/merchant-center-application-kit/commit/18fb76483f27e17e05dc8fddeda625dadf587a0f) Thanks [@adnasa](https://github.com/adnasa)! - Add `transformLocalizedStringToLocalizedField` to `i10n`.

  Transforms [`LocalizedString`](https://docs.commercetools.com/api/types#localizedstring) to a list of `LocalizedField` (`[{ locale: string, value: string }]`)

  **Example**

  ```jsx
  import { transformLocalizedStringToLocalizedField } from '@commercetools-frontend/l10n';

  const productName = { sv: 'Kanelbulle', en: 'Cinnamon Bun' };
  console.log(transformLocalizedStringToLocalizedField(productName));
  // [{ locale: 'sv', value: 'Kanelbulle' }, { locale: 'en', value: 'Cinnamon Bun' }]
  ```

## 19.0.0

### Major Changes

- [#2041](https://github.com/commercetools/merchant-center-application-kit/pull/2041) [`a240f657`](https://github.com/commercetools/merchant-center-application-kit/commit/a240f6574a9240a2ac82febb67b0f6c814db979f) Thanks [@emmenko](https://github.com/emmenko)! - - Requires a peer dependency of `react@17`.
  - The `@types/react*` peer dependencies have been removed and included as normal dependencies with a minor range version.

* [#2041](https://github.com/commercetools/merchant-center-application-kit/pull/2041) [`a240f657`](https://github.com/commercetools/merchant-center-application-kit/commit/a240f6574a9240a2ac82febb67b0f6c814db979f) Thanks [@emmenko](https://github.com/emmenko)! - Upgrade and migrate packages to use `ui-kit@v12`

### Patch Changes

- Updated dependencies [[`a240f657`](https://github.com/commercetools/merchant-center-application-kit/commit/a240f6574a9240a2ac82febb67b0f6c814db979f), [`a240f657`](https://github.com/commercetools/merchant-center-application-kit/commit/a240f6574a9240a2ac82febb67b0f6c814db979f)]:
  - @commercetools-frontend/sentry@19.0.0

## 18.7.0

### Minor Changes

- [`263f3180`](https://github.com/commercetools/merchant-center-application-kit/commit/263f318028603daa7fadac7f6cd84c1891b2f1c0) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Update cldr dependency

### Patch Changes

- [#2110](https://github.com/commercetools/merchant-center-application-kit/pull/2110) [`c850d6dc`](https://github.com/commercetools/merchant-center-application-kit/commit/c850d6dcf8edabb5eb9390e41def4b6b52879b7a) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

## 18.6.0

### Minor Changes

- [#2105](https://github.com/commercetools/merchant-center-application-kit/pull/2105) [`f347093f`](https://github.com/commercetools/merchant-center-application-kit/commit/f347093f1705ae8214fcd556b80bd2366624205d) Thanks [@mohib0306](https://github.com/mohib0306)! - Update generate-l10n-data script to include Northern Ireland territory

### Patch Changes

- [#2099](https://github.com/commercetools/merchant-center-application-kit/pull/2099) [`d09a154b`](https://github.com/commercetools/merchant-center-application-kit/commit/d09a154b9e74bc180da033acd8e74ac8ed32fc75) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

- Updated dependencies [[`d09a154b`](https://github.com/commercetools/merchant-center-application-kit/commit/d09a154b9e74bc180da033acd8e74ac8ed32fc75)]:
  - @commercetools-frontend/sentry@18.6.0

## 18.5.6

### Patch Changes

- [`ca4ea6eb`](https://github.com/commercetools/merchant-center-application-kit/commit/ca4ea6eb17c14bf015a8448248c58881e005ac99) [#2085](https://github.com/commercetools/merchant-center-application-kit/pull/2085) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`ca4ea6eb`](https://github.com/commercetools/merchant-center-application-kit/commit/ca4ea6eb17c14bf015a8448248c58881e005ac99)]:
  - @commercetools-frontend/sentry@18.5.6

## 18.5.2

### Patch Changes

- [`7f26c54e`](https://github.com/commercetools/merchant-center-application-kit/commit/7f26c54e55eff8aeac786ec0d011d36e40b0d263) [#2066](https://github.com/commercetools/merchant-center-application-kit/pull/2066) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

- Updated dependencies [[`7f26c54e`](https://github.com/commercetools/merchant-center-application-kit/commit/7f26c54e55eff8aeac786ec0d011d36e40b0d263)]:
  - @commercetools-frontend/sentry@18.5.2

## 18.5.1

### Patch Changes

- [`bb2ceac2`](https://github.com/commercetools/merchant-center-application-kit/commit/bb2ceac229b94836482dbed57824d679a9cbd5d6) [#2062](https://github.com/commercetools/merchant-center-application-kit/pull/2062) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`bb2ceac2`](https://github.com/commercetools/merchant-center-application-kit/commit/bb2ceac229b94836482dbed57824d679a9cbd5d6)]:
  - @commercetools-frontend/sentry@18.5.1

## 18.4.1

### Patch Changes

- [`074ec33d`](https://github.com/commercetools/merchant-center-application-kit/commit/074ec33d97282fc9750fd59ccceb33ff0430da41) [#2053](https://github.com/commercetools/merchant-center-application-kit/pull/2053) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

- Updated dependencies [[`074ec33d`](https://github.com/commercetools/merchant-center-application-kit/commit/074ec33d97282fc9750fd59ccceb33ff0430da41)]:
  - @commercetools-frontend/sentry@18.4.1

## 18.4.0

### Patch Changes

- [`eb2fbb22`](https://github.com/commercetools/merchant-center-application-kit/commit/eb2fbb2279eff99048c91da352a69e1883eb54af) [#2044](https://github.com/commercetools/merchant-center-application-kit/pull/2044) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

- Updated dependencies [[`eb2fbb22`](https://github.com/commercetools/merchant-center-application-kit/commit/eb2fbb2279eff99048c91da352a69e1883eb54af)]:
  - @commercetools-frontend/sentry@18.4.0

## 18.2.2

### Patch Changes

- Updated dependencies []:
  - @commercetools-frontend/sentry@18.2.2

## 18.1.4

### Patch Changes

- Updated dependencies [[`c9589f5e`](https://github.com/commercetools/merchant-center-application-kit/commit/c9589f5e3d1fd18393c7bf501c3b23b8ec402804)]:
  - @commercetools-frontend/sentry@18.1.4

## 18.1.0

### Patch Changes

- [`3bf32993`](https://github.com/commercetools/merchant-center-application-kit/commit/3bf329935a109a73a7c33580fdf618e60fdbcc2c) [#1971](https://github.com/commercetools/merchant-center-application-kit/pull/1971) Thanks [@tdeekens](https://github.com/tdeekens)! - Add internal opt-in support for combining feature flag adapters.

- Updated dependencies [[`3bf32993`](https://github.com/commercetools/merchant-center-application-kit/commit/3bf329935a109a73a7c33580fdf618e60fdbcc2c)]:
  - @commercetools-frontend/sentry@18.1.0

## 18.0.2

### Patch Changes

- [`b38cb57f`](https://github.com/commercetools/merchant-center-application-kit/commit/b38cb57f678e79a862f1b97df2d1c753838ffbb7) [#1991](https://github.com/commercetools/merchant-center-application-kit/pull/1991) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

## 17.10.1

### Patch Changes

- [`5557c5c`](https://github.com/commercetools/merchant-center-application-kit/commit/5557c5c5744bf34a981247d04dc2f1117c15767d) [#1976](https://github.com/commercetools/merchant-center-application-kit/pull/1976) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

- Updated dependencies [[`5557c5c`](https://github.com/commercetools/merchant-center-application-kit/commit/5557c5c5744bf34a981247d04dc2f1117c15767d)]:
  - @commercetools-frontend/sentry@17.10.1

## 17.10.0

### Patch Changes

- Updated dependencies []:
  - @commercetools-frontend/sentry@17.10.0

## 17.9.1

### Patch Changes

- [`d70e533`](https://github.com/commercetools/merchant-center-application-kit/commit/d70e533e7143dcb23df7b3f80eaec2741b7db1f3) [#1967](https://github.com/commercetools/merchant-center-application-kit/pull/1967) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update dependency @testing-library/react-hooks to v4

## 17.9.0

### Patch Changes

- Updated dependencies []:
  - @commercetools-frontend/sentry@17.9.0

## 17.8.0

### Patch Changes

- [`48a9886`](https://github.com/commercetools/merchant-center-application-kit/commit/48a98861dcf4193041e02e8ac11eb2940826f5d0) [#1954](https://github.com/commercetools/merchant-center-application-kit/pull/1954) Thanks [@tdeekens](https://github.com/tdeekens)! - chore: update dependencies across packages

* [`4971a78`](https://github.com/commercetools/merchant-center-application-kit/commit/4971a78438fb4d2ca5487764192a0bb1ffc3b18e) [#1952](https://github.com/commercetools/merchant-center-application-kit/pull/1952) Thanks [@tdeekens](https://github.com/tdeekens)! - chore: add and apply fixes via manypkg for automatic mono-repo validation

* Updated dependencies [[`48a9886`](https://github.com/commercetools/merchant-center-application-kit/commit/48a98861dcf4193041e02e8ac11eb2940826f5d0), [`4971a78`](https://github.com/commercetools/merchant-center-application-kit/commit/4971a78438fb4d2ca5487764192a0bb1ffc3b18e)]:
  - @commercetools-frontend/sentry@17.8.0

## 17.7.1

### Patch Changes

- [`f6f3c5e`](https://github.com/commercetools/merchant-center-application-kit/commit/f6f3c5ebd08226fd4eca22aec5c39791cf5c5d6a) [#1935](https://github.com/commercetools/merchant-center-application-kit/pull/1935) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`f6f3c5e`](https://github.com/commercetools/merchant-center-application-kit/commit/f6f3c5ebd08226fd4eca22aec5c39791cf5c5d6a)]:
  - @commercetools-frontend/sentry@17.7.1

## 17.7.0

### Minor Changes

- [`9746f4b`](https://github.com/commercetools/merchant-center-application-kit/commit/9746f4b992dd764599ca7bc7702e92b73dde739a) [#1929](https://github.com/commercetools/merchant-center-application-kit/pull/1929) Thanks [@mohib0306](https://github.com/mohib0306)! - Add Northern Ireland country to the available countries list

### Patch Changes

- [`1ec4379`](https://github.com/commercetools/merchant-center-application-kit/commit/1ec4379938b093d4444ec9e4079524c48afd4a42) [#1923](https://github.com/commercetools/merchant-center-application-kit/pull/1923) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

## 17.6.2

### Patch Changes

- [`1a96e83`](https://github.com/commercetools/merchant-center-application-kit/commit/1a96e831c94250e10de61dee40e682a77313445f) [#1905](https://github.com/commercetools/merchant-center-application-kit/pull/1905) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`1a96e83`](https://github.com/commercetools/merchant-center-application-kit/commit/1a96e831c94250e10de61dee40e682a77313445f)]:
  - @commercetools-frontend/sentry@17.6.2

## 17.6.1

### Patch Changes

- [`1ef03e3`](https://github.com/commercetools/merchant-center-application-kit/commit/1ef03e30996e6e83c0f521ba9253fb7a93fed241) [#1904](https://github.com/commercetools/merchant-center-application-kit/pull/1904) Thanks [@adnasa](https://github.com/adnasa)! - export `transformLocalizedFieldToLocalizedString`, update `localize` to allow `locale` to be `null`

## 17.6.0

### Patch Changes

- [`2287813`](https://github.com/commercetools/merchant-center-application-kit/commit/2287813c19a54b7edb7005d417c5f6a7b34cad1f) [#1871](https://github.com/commercetools/merchant-center-application-kit/pull/1871) Thanks [@emmenko](https://github.com/emmenko)! - Compile and bundle packages using [preconstruct](https://preconstruct.tools)

- Updated dependencies [[`2287813`](https://github.com/commercetools/merchant-center-application-kit/commit/2287813c19a54b7edb7005d417c5f6a7b34cad1f)]:
  - @commercetools-frontend/sentry@17.6.0

## 17.5.0

### Minor Changes

- [`a8e2202`](https://github.com/commercetools/merchant-center-application-kit/commit/a8e2202d74bb28cc90bbf51e8c46a2128229599a) [#1885](https://github.com/commercetools/merchant-center-application-kit/pull/1885) Thanks [@adnasa](https://github.com/adnasa)! - feature: add `applyTransformedLocalizedFields` to `l10n`

## 17.4.1

### Patch Changes

- Updated dependencies [[`ec9e10f`](https://github.com/commercetools/merchant-center-application-kit/commit/ec9e10fde15351cc7cb825aaebb53cdb6e00e0d9)]:
  - @commercetools-frontend/sentry@17.4.1

## 17.3.1

### Patch Changes

- [`89c4464`](https://github.com/commercetools/merchant-center-application-kit/commit/89c4464c334dd6c3922d031872286ad3bea8cf67) [#1872](https://github.com/commercetools/merchant-center-application-kit/pull/1872) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

- Updated dependencies [[`89c4464`](https://github.com/commercetools/merchant-center-application-kit/commit/89c4464c334dd6c3922d031872286ad3bea8cf67)]:
  - @commercetools-frontend/sentry@17.3.1

## 17.3.0

### Patch Changes

- [`71c9111`](https://github.com/commercetools/merchant-center-application-kit/commit/71c9111308832009d1a27e91e4f2d2da4c53367c) [#1866](https://github.com/commercetools/merchant-center-application-kit/pull/1866) Thanks [@emmenko](https://github.com/emmenko)! - Update to uikit v10.39.8

- Updated dependencies [[`71c9111`](https://github.com/commercetools/merchant-center-application-kit/commit/71c9111308832009d1a27e91e4f2d2da4c53367c)]:
  - @commercetools-frontend/sentry@17.3.0

## 17.2.1

### Patch Changes

- [`310e98c`](https://github.com/commercetools/merchant-center-application-kit/commit/310e98c39c0b6479175b7685b3f29ea0a5baa22b) Thanks [@emmenko](https://github.com/emmenko)! - Update dependencies (https://github.com/commercetools/merchant-center-application-kit/pull/1857)

- Updated dependencies [[`310e98c`](https://github.com/commercetools/merchant-center-application-kit/commit/310e98c39c0b6479175b7685b3f29ea0a5baa22b)]:
  - @commercetools-frontend/sentry@17.2.1

## 17.2.0

### Patch Changes

- [`e0ec004`](https://github.com/commercetools/merchant-center-application-kit/commit/e0ec004d611f93b24f015120d09f6f18389b219f) [#1854](https://github.com/commercetools/merchant-center-application-kit/pull/1854) Thanks [@emmenko](https://github.com/emmenko)! - chore: update deps

- Updated dependencies [[`e0ec004`](https://github.com/commercetools/merchant-center-application-kit/commit/e0ec004d611f93b24f015120d09f6f18389b219f)]:
  - @commercetools-frontend/sentry@17.2.0

## 17.1.1

### Patch Changes

- Updated dependencies []:
  - @commercetools-frontend/sentry@17.1.1

## 17.1.0

### Patch Changes

- Updated dependencies [[`5d9d5da`](https://github.com/commercetools/merchant-center-application-kit/commit/5d9d5da44364fe5590b67be21ac3630e177326e3)]:
  - @commercetools-frontend/sentry@17.1.0

## 17.0.1

### Patch Changes

- [`71c5f78`](https://github.com/commercetools/merchant-center-application-kit/commit/71c5f7875c7476e34b65d37046d48ca47e96f12e) [#1795](https://github.com/commercetools/merchant-center-application-kit/pull/1795) Thanks [@renovate](https://github.com/apps/renovate)! - update dependencies

- Updated dependencies [[`f5125b8`](https://github.com/commercetools/merchant-center-application-kit/commit/f5125b8061cb624f950916909e4cb7b0f35594ad), [`71c5f78`](https://github.com/commercetools/merchant-center-application-kit/commit/71c5f7875c7476e34b65d37046d48ca47e96f12e)]:
  - @commercetools-frontend/sentry@17.0.1

## 17.0.0

### Patch Changes

- Updated dependencies [[`633d8c7`](https://github.com/commercetools/merchant-center-application-kit/commit/633d8c7b8ddc2f25128d8249579b7bb287a62e30)]:
  - @commercetools-frontend/sentry@17.0.0

## 16.18.0

### Patch Changes

- Updated dependencies [[`8cdb025`](https://github.com/commercetools/merchant-center-application-kit/commit/8cdb02591b718406c910a2c4128d4be3dfe24785)]:
  - @commercetools-frontend/sentry@16.18.0

## 16.17.2

### Patch Changes

- [`9752622`](https://github.com/commercetools/merchant-center-application-kit/commit/9752622b7422e821bb62d61af360a01f6994dc6b) [#1758](https://github.com/commercetools/merchant-center-application-kit/pull/1758) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

## 16.17.0

### Patch Changes

- [`1fdde03`](https://github.com/commercetools/merchant-center-application-kit/commit/1fdde039f36a0290bfc1c179002cfe6d535f35c0) [#1732](https://github.com/commercetools/merchant-center-application-kit/pull/1732) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update dependency node-fetch to v2.6.1 [security]

- Updated dependencies [[`786c697`](https://github.com/commercetools/merchant-center-application-kit/commit/786c6978c1febf927db6b45c758498b72e8e48be), [`9bc8558`](https://github.com/commercetools/merchant-center-application-kit/commit/9bc85581d336c7d75fda5dc82a1c02f32f16c1fb)]:
  - @commercetools-frontend/sentry@16.17.0

## 16.16.4

### Patch Changes

- Updated dependencies [[`4fff00c`](https://github.com/commercetools/merchant-center-application-kit/commit/4fff00c24bf74d853170400951cfb1892567f313)]:
  - @commercetools-frontend/sentry@16.16.4

## 16.16.1

### Patch Changes

- Updated dependencies [[`bc15ac2`](https://github.com/commercetools/merchant-center-application-kit/commit/bc15ac2f6d53d4c8e0d53ceb6c1a0e5ba0f5353e)]:
  - @commercetools-frontend/sentry@16.16.1

## 16.16.0

### Patch Changes

- [`f144292`](https://github.com/commercetools/merchant-center-application-kit/commit/f1442921650ca4e6c9bf61ce31bda2b63e72038a) [#1673](https://github.com/commercetools/merchant-center-application-kit/pull/1673) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

* [`4216b92`](https://github.com/commercetools/merchant-center-application-kit/commit/4216b922fbb39e74ce35f8647d1c4e9ae77909c8) [#1685](https://github.com/commercetools/merchant-center-application-kit/pull/1685) Thanks [@emmenko](https://github.com/emmenko)! - Refactor i18n package to consume compiled data from ui-kit translation messages. Furthermore, the `@commercetools-frontend/i18n` now exposes a `compiled-data` folder as well: `@commercetools-frontend/i18n/compiled-data`.
  This can be used the load pre-compiled messages and thus improving the runtime performance.

  Furthermore, the `mc-scripts extract-intl` command has been deprecated in favor of the more official message extraction with the `@formatjs/cli`: https://formatjs.io/docs/getting-started/message-extraction.

* Updated dependencies [[`f144292`](https://github.com/commercetools/merchant-center-application-kit/commit/f1442921650ca4e6c9bf61ce31bda2b63e72038a)]:
  - @commercetools-frontend/sentry@16.16.0

## 16.15.9

### Patch Changes

- Updated dependencies []:
  - @commercetools-frontend/sentry@16.15.9

## 16.15.8

### Patch Changes

- [`c62261f`](https://github.com/commercetools/merchant-center-application-kit/commit/c62261f80e17fb63467eed6328e41764d3e9a50e) [#1653](https://github.com/commercetools/merchant-center-application-kit/pull/1653) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies and regenerate l10n data based on CLDR v37

- Updated dependencies [[`c62261f`](https://github.com/commercetools/merchant-center-application-kit/commit/c62261f80e17fb63467eed6328e41764d3e9a50e)]:
  - @commercetools-frontend/sentry@16.15.8

## 16.15.3

### Patch Changes

- [`6d98245`](https://github.com/commercetools/merchant-center-application-kit/commit/6d98245615ddb83e805e5cc2cc0620920b4a71c7) [#1643](https://github.com/commercetools/merchant-center-application-kit/pull/1643) Thanks [@emmenko](https://github.com/emmenko)! - Update copyright date to 2020 in LICENSE files

- Updated dependencies [[`6d98245`](https://github.com/commercetools/merchant-center-application-kit/commit/6d98245615ddb83e805e5cc2cc0620920b4a71c7)]:
  - @commercetools-frontend/sentry@16.15.3

## 16.15.2

### Patch Changes

- [`0f3dcc3`](https://github.com/commercetools/merchant-center-application-kit/commit/0f3dcc38c81a5fb3c668faecce9a13057f66a66b) [#1638](https://github.com/commercetools/merchant-center-application-kit/pull/1638) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`0f3dcc3`](https://github.com/commercetools/merchant-center-application-kit/commit/0f3dcc38c81a5fb3c668faecce9a13057f66a66b)]:
  - @commercetools-frontend/sentry@16.15.2

## 16.15.0

### Patch Changes

- Updated dependencies [[`cc8b37b`](https://github.com/commercetools/merchant-center-application-kit/commit/cc8b37bf85d4683a605a6c3233100627e670ebe7)]:
  - @commercetools-frontend/sentry@16.15.0

## 16.14.0

### Patch Changes

- [`387cab5`](https://github.com/commercetools/merchant-center-application-kit/commit/387cab543fd607b72256f759597f90efd10b64c8) [#1614](https://github.com/commercetools/merchant-center-application-kit/pull/1614) Thanks [@emmenko](https://github.com/emmenko)! - Use non oppressive language. The `trackingEventWhitelist` option for the `<ApplicationShell>` component has been deprecated in favor of `trackingEventList`.

* [`4168061`](https://github.com/commercetools/merchant-center-application-kit/commit/41680612042d476422776e5eaa254450bf874581) [#1618](https://github.com/commercetools/merchant-center-application-kit/pull/1618) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

* Updated dependencies [[`779100b`](https://github.com/commercetools/merchant-center-application-kit/commit/779100b432ad448eefec311f31f87891f35489f6), [`387cab5`](https://github.com/commercetools/merchant-center-application-kit/commit/387cab543fd607b72256f759597f90efd10b64c8), [`4168061`](https://github.com/commercetools/merchant-center-application-kit/commit/41680612042d476422776e5eaa254450bf874581)]:
  - @commercetools-frontend/sentry@16.14.0

## 16.12.0

### Patch Changes

- [`fa6386c`](https://github.com/commercetools/merchant-center-application-kit/commit/fa6386c347df0505235c199232353bc315a47c81) [#1587](https://github.com/commercetools/merchant-center-application-kit/pull/1587) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`fa6386c`](https://github.com/commercetools/merchant-center-application-kit/commit/fa6386c347df0505235c199232353bc315a47c81)]:
  - @commercetools-frontend/sentry@16.12.0

## 16.10.0

### Patch Changes

- [`f8f8609`](https://github.com/commercetools/merchant-center-application-kit/commit/f8f86098687c8cecaaec1b13debabe290b007b58) [#1573](https://github.com/commercetools/merchant-center-application-kit/pull/1573) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

- Updated dependencies [[`f8f8609`](https://github.com/commercetools/merchant-center-application-kit/commit/f8f86098687c8cecaaec1b13debabe290b007b58)]:
  - @commercetools-frontend/sentry@16.10.0

## 16.9.1

### Patch Changes

- [`f92ec54`](https://github.com/commercetools/merchant-center-application-kit/commit/f92ec54e78edb668e8dff53342e8542e96d8c319) [#1551](https://github.com/commercetools/merchant-center-application-kit/pull/1551) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`f92ec54`](https://github.com/commercetools/merchant-center-application-kit/commit/f92ec54e78edb668e8dff53342e8542e96d8c319)]:
  - @commercetools-frontend/sentry@16.9.1

## 16.9.0

### Patch Changes

- [`ccbabfd`](https://github.com/commercetools/merchant-center-application-kit/commit/ccbabfdc75972aedcc12e833cc958b5585cb6d60) [#1549](https://github.com/commercetools/merchant-center-application-kit/pull/1549) Thanks [@tdeekens](https://github.com/tdeekens)! - chore: update deps to prepare for release

- Updated dependencies [[`ccbabfd`](https://github.com/commercetools/merchant-center-application-kit/commit/ccbabfdc75972aedcc12e833cc958b5585cb6d60)]:
  - @commercetools-frontend/sentry@16.9.0

## 16.8.8

### Patch Changes

- [`0925da6`](https://github.com/commercetools/merchant-center-application-kit/commit/0925da6f11e35cc712cc12337716f846a67c0e4c) [#1537](https://github.com/commercetools/merchant-center-application-kit/pull/1537) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`0925da6`](https://github.com/commercetools/merchant-center-application-kit/commit/0925da6f11e35cc712cc12337716f846a67c0e4c)]:
  - @commercetools-frontend/sentry@16.8.8

## 16.8.6

### Patch Changes

- [`9391762`](https://github.com/commercetools/merchant-center-application-kit/commit/939176298df3558970a267b6e6478051a355ffae) [#1530](https://github.com/commercetools/merchant-center-application-kit/pull/1530) Thanks [@emmenko](https://github.com/emmenko)! - Update `@commercetools-uikit/*` packages to `10.21.0`

- Updated dependencies [[`9391762`](https://github.com/commercetools/merchant-center-application-kit/commit/939176298df3558970a267b6e6478051a355ffae)]:
  - @commercetools-frontend/sentry@16.8.6

## 16.8.4

### Patch Changes

- [`6ffe293`](https://github.com/commercetools/merchant-center-application-kit/commit/6ffe29312433e357ac6c57ce39e98cf9cba49ba5) [#1508](https://github.com/commercetools/merchant-center-application-kit/pull/1508) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

## 16.8.3

### Patch Changes

- Updated dependencies []:
  - @commercetools-frontend/sentry@16.8.3
