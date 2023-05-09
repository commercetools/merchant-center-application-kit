# @commercetools-frontend/application-components

## 22.2.1

### Patch Changes

- Updated dependencies []:
  - @commercetools-frontend/application-shell-connectors@22.2.1
  - @commercetools-frontend/assets@22.2.1
  - @commercetools-frontend/constants@22.2.1
  - @commercetools-frontend/i18n@22.2.1
  - @commercetools-frontend/l10n@22.2.1

## 22.2.0

### Patch Changes

- Updated dependencies []:
  - @commercetools-frontend/application-shell-connectors@22.2.0
  - @commercetools-frontend/assets@22.2.0
  - @commercetools-frontend/constants@22.2.0
  - @commercetools-frontend/i18n@22.2.0
  - @commercetools-frontend/l10n@22.2.0

## 22.1.0

### Patch Changes

- Updated dependencies [[`0df1cb8e1`](https://github.com/commercetools/merchant-center-application-kit/commit/0df1cb8e104efc7d6abd075c12d20165af9b4bc8)]:
  - @commercetools-frontend/assets@22.1.0
  - @commercetools-frontend/i18n@22.1.0
  - @commercetools-frontend/application-shell-connectors@22.1.0
  - @commercetools-frontend/constants@22.1.0
  - @commercetools-frontend/l10n@22.1.0

## 22.0.1

### Patch Changes

- [#3058](https://github.com/commercetools/merchant-center-application-kit/pull/3058) [`4da5fa884`](https://github.com/commercetools/merchant-center-application-kit/commit/4da5fa88475a71934f63d4133af371e34c878c2a) Thanks [@emmenko](https://github.com/emmenko)! - Use mutation observer hook from uikit

- Updated dependencies [[`6629d8470`](https://github.com/commercetools/merchant-center-application-kit/commit/6629d84708e94cae14df8d1ce3df1eb1f99e2023)]:
  - @commercetools-frontend/application-shell-connectors@22.0.1
  - @commercetools-frontend/i18n@22.0.1
  - @commercetools-frontend/l10n@22.0.1
  - @commercetools-frontend/assets@22.0.1
  - @commercetools-frontend/constants@22.0.1

## 22.0.0

### Major Changes

- [#3029](https://github.com/commercetools/merchant-center-application-kit/pull/3029) [`2426a3849`](https://github.com/commercetools/merchant-center-application-kit/commit/2426a3849ac9f3e581e0d3e06df672391c5ce56e) Thanks [@emmenko](https://github.com/emmenko)! - Upgrade `react-intl` to `v6`.

  # Migration

  The peer dependency of `react-intl` should be updated to `v6`. No other migration steps are required.

- [#3036](https://github.com/commercetools/merchant-center-application-kit/pull/3036) [`1f64ec6bd`](https://github.com/commercetools/merchant-center-application-kit/commit/1f64ec6bd4ad43a1a014b4faca2b2fc118618b84) Thanks [@YahiaElTai](https://github.com/YahiaElTai)! - Remove Google Analytics tracking.
  We no longer support tracking events to be sent to Google Analytics in case the `trackingGtm` value was provided to the `additionalEnv` object of the Custom Application config.

  - The `GtmContext` and `GtmUserLogoutTracker` exports have been removed from `@commercetools-frontend/application-shell`.
  - The `trackingEventList` prop has been removed from the `<ApplicationShell>` component.
  - The `track` object has been removed from the `onMenuItemClick` prop function signature of the `<ApplicationShell>` component.
  - The `data-track-*` attributes are not longer supported. If you have been using them please remove them from your components.

### Minor Changes

- [#3029](https://github.com/commercetools/merchant-center-application-kit/pull/3029) [`2426a3849`](https://github.com/commercetools/merchant-center-application-kit/commit/2426a3849ac9f3e581e0d3e06df672391c5ce56e) Thanks [@emmenko](https://github.com/emmenko)! - Update UI Kit dependencies to v16

### Patch Changes

- Updated dependencies [[`2426a3849`](https://github.com/commercetools/merchant-center-application-kit/commit/2426a3849ac9f3e581e0d3e06df672391c5ce56e), [`2426a3849`](https://github.com/commercetools/merchant-center-application-kit/commit/2426a3849ac9f3e581e0d3e06df672391c5ce56e), [`76ba54c16`](https://github.com/commercetools/merchant-center-application-kit/commit/76ba54c164dbac75ef3e3962292933b06f4843e7), [`1f64ec6bd`](https://github.com/commercetools/merchant-center-application-kit/commit/1f64ec6bd4ad43a1a014b4faca2b2fc118618b84)]:
  - @commercetools-frontend/i18n@22.0.0
  - @commercetools-frontend/application-shell-connectors@22.0.0
  - @commercetools-frontend/constants@22.0.0
  - @commercetools-frontend/l10n@22.0.0
  - @commercetools-frontend/assets@22.0.0

## 21.25.2

### Patch Changes

- Updated dependencies []:
  - @commercetools-frontend/application-shell-connectors@21.25.2
  - @commercetools-frontend/assets@21.25.2
  - @commercetools-frontend/constants@21.25.2
  - @commercetools-frontend/i18n@21.25.2
  - @commercetools-frontend/l10n@21.25.2

## 21.25.1

### Patch Changes

- [#3044](https://github.com/commercetools/merchant-center-application-kit/pull/3044) [`25e1410b4`](https://github.com/commercetools/merchant-center-application-kit/commit/25e1410b4e5e97fccea397f6eb098e4e991b545b) Thanks [@kark](https://github.com/kark)! - Update `ui-kit` dependencies

- [#3041](https://github.com/commercetools/merchant-center-application-kit/pull/3041) [`abe818527`](https://github.com/commercetools/merchant-center-application-kit/commit/abe8185277e00f713ad0e8325f20bcf3bce217b1) Thanks [@emmenko](https://github.com/emmenko)! - Use TypeScript to v5

- [#3038](https://github.com/commercetools/merchant-center-application-kit/pull/3038) [`bc355a5fa`](https://github.com/commercetools/merchant-center-application-kit/commit/bc355a5fa32a89f6bd48aa16b05d9b76e267d488) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Better usage of theming helpers.

- Updated dependencies [[`25e1410b4`](https://github.com/commercetools/merchant-center-application-kit/commit/25e1410b4e5e97fccea397f6eb098e4e991b545b)]:
  - @commercetools-frontend/i18n@21.25.1
  - @commercetools-frontend/application-shell-connectors@21.25.1
  - @commercetools-frontend/assets@21.25.1
  - @commercetools-frontend/constants@21.25.1
  - @commercetools-frontend/l10n@21.25.1

## 21.25.0

### Patch Changes

- Updated dependencies []:
  - @commercetools-frontend/application-shell-connectors@21.25.0
  - @commercetools-frontend/assets@21.25.0
  - @commercetools-frontend/constants@21.25.0
  - @commercetools-frontend/i18n@21.25.0
  - @commercetools-frontend/l10n@21.25.0

## 21.24.3

### Patch Changes

- [#3017](https://github.com/commercetools/merchant-center-application-kit/pull/3017) [`dbacb0541`](https://github.com/commercetools/merchant-center-application-kit/commit/dbacb054178a1a27d4d3da1229560cc34fcb8eba) Thanks [@chloe0592](https://github.com/chloe0592)! - Update illustrations. Illustrations that are being depricated - `desert-fox.svg` and `icecream.svg`.

- Updated dependencies [[`dbacb0541`](https://github.com/commercetools/merchant-center-application-kit/commit/dbacb054178a1a27d4d3da1229560cc34fcb8eba)]:
  - @commercetools-frontend/assets@21.24.3
  - @commercetools-frontend/application-shell-connectors@21.24.3
  - @commercetools-frontend/constants@21.24.3
  - @commercetools-frontend/i18n@21.24.3
  - @commercetools-frontend/l10n@21.24.3

## 21.24.2

### Patch Changes

- [#3021](https://github.com/commercetools/merchant-center-application-kit/pull/3021) [`daa5f17ee`](https://github.com/commercetools/merchant-center-application-kit/commit/daa5f17ee53fed436e489c75bc644f4ca60f3d45) Thanks [@jaikamat](https://github.com/jaikamat)! - Use Text.Detail for PublicPageLayout footer

- [#3020](https://github.com/commercetools/merchant-center-application-kit/pull/3020) [`b509a6b36`](https://github.com/commercetools/merchant-center-application-kit/commit/b509a6b360f9f6532d9716ae7ab0f06a1147df9e) Thanks [@kark](https://github.com/kark)! - Update `ui-kit` dependencies

- Updated dependencies [[`b509a6b36`](https://github.com/commercetools/merchant-center-application-kit/commit/b509a6b360f9f6532d9716ae7ab0f06a1147df9e)]:
  - @commercetools-frontend/i18n@21.24.2
  - @commercetools-frontend/application-shell-connectors@21.24.2
  - @commercetools-frontend/assets@21.24.2
  - @commercetools-frontend/constants@21.24.2
  - @commercetools-frontend/l10n@21.24.2

## 21.24.1

### Patch Changes

- [#3015](https://github.com/commercetools/merchant-center-application-kit/pull/3015) [`ec7abe2cb`](https://github.com/commercetools/merchant-center-application-kit/commit/ec7abe2cb61b7b07b485c5e8cce102139353e4c3) Thanks [@jaikamat](https://github.com/jaikamat)! - Include new logo asset and design tweaks to PublicPageLayout

- Updated dependencies [[`ec7abe2cb`](https://github.com/commercetools/merchant-center-application-kit/commit/ec7abe2cb61b7b07b485c5e8cce102139353e4c3)]:
  - @commercetools-frontend/assets@21.24.1
  - @commercetools-frontend/application-shell-connectors@21.24.1
  - @commercetools-frontend/constants@21.24.1
  - @commercetools-frontend/i18n@21.24.1
  - @commercetools-frontend/l10n@21.24.1

## 21.24.0

### Patch Changes

- [#2992](https://github.com/commercetools/merchant-center-application-kit/pull/2992) [`e42f8d903`](https://github.com/commercetools/merchant-center-application-kit/commit/e42f8d9037626d51abc2b5611ff5939c549cca73) Thanks [@emmenko](https://github.com/emmenko)! - Reorder imports

- [#2974](https://github.com/commercetools/merchant-center-application-kit/pull/2974) [`007cb8a04`](https://github.com/commercetools/merchant-center-application-kit/commit/007cb8a04d2d4813d6b1bd6001abd5e6b30c0de6) Thanks [@renovate](https://github.com/apps/renovate)! - Update all dependencies

- [#2994](https://github.com/commercetools/merchant-center-application-kit/pull/2994) [`da89fae2b`](https://github.com/commercetools/merchant-center-application-kit/commit/da89fae2b86a09a1cbb004250141b9cb49ec3da7) Thanks [@emmenko](https://github.com/emmenko)! - Load background png for public pages from assets

- Updated dependencies [[`e42f8d903`](https://github.com/commercetools/merchant-center-application-kit/commit/e42f8d9037626d51abc2b5611ff5939c549cca73), [`007cb8a04`](https://github.com/commercetools/merchant-center-application-kit/commit/007cb8a04d2d4813d6b1bd6001abd5e6b30c0de6), [`7074d035c`](https://github.com/commercetools/merchant-center-application-kit/commit/7074d035c1c540b330bd772355ed9e30d522a2c5), [`da89fae2b`](https://github.com/commercetools/merchant-center-application-kit/commit/da89fae2b86a09a1cbb004250141b9cb49ec3da7), [`a0de806d9`](https://github.com/commercetools/merchant-center-application-kit/commit/a0de806d9af6ff90948fe59d059aea3714150436), [`0cd9bf7dc`](https://github.com/commercetools/merchant-center-application-kit/commit/0cd9bf7dcb192e87a26ca4ed5b164ff3e1333b9c), [`9b20f5c15`](https://github.com/commercetools/merchant-center-application-kit/commit/9b20f5c1520a85c2f84d700e591e414e98c427e9)]:
  - @commercetools-frontend/application-shell-connectors@21.24.0
  - @commercetools-frontend/i18n@21.24.0
  - @commercetools-frontend/l10n@21.24.0
  - @commercetools-frontend/assets@21.24.0
  - @commercetools-frontend/constants@21.24.0

## 21.23.10

### Patch Changes

- [#2988](https://github.com/commercetools/merchant-center-application-kit/pull/2988) [`60d8dce37`](https://github.com/commercetools/merchant-center-application-kit/commit/60d8dce3715d19bc15d2083f3f4a9e736627274b) Thanks [@kark](https://github.com/kark)! - Update `ui-kit` dependencies

- [#2987](https://github.com/commercetools/merchant-center-application-kit/pull/2987) [`7f2ede7a4`](https://github.com/commercetools/merchant-center-application-kit/commit/7f2ede7a49d17299b3955fa521dcfc5bb6c90586) Thanks [@kark](https://github.com/kark)! - Add `themeParentSelector` prop to `PageContentWide`

- [#2985](https://github.com/commercetools/merchant-center-application-kit/pull/2985) [`7c8754974`](https://github.com/commercetools/merchant-center-application-kit/commit/7c87549749003a6b10014962881d49fcbe0f85d3) Thanks [@tdeekens](https://github.com/tdeekens)! - Refactor to change spacing on `PublicPageContentLayout` enabled only in new design.

- Updated dependencies [[`60d8dce37`](https://github.com/commercetools/merchant-center-application-kit/commit/60d8dce3715d19bc15d2083f3f4a9e736627274b)]:
  - @commercetools-frontend/i18n@21.23.10
  - @commercetools-frontend/application-shell-connectors@21.23.10
  - @commercetools-frontend/assets@21.23.10
  - @commercetools-frontend/constants@21.23.10
  - @commercetools-frontend/l10n@21.23.10

## 21.23.9

### Patch Changes

- [#2967](https://github.com/commercetools/merchant-center-application-kit/pull/2967) [`8a87d58d4`](https://github.com/commercetools/merchant-center-application-kit/commit/8a87d58d4d20e11630be0acf9fbe7986fd6befe0) Thanks [@ddouglasz](https://github.com/ddouglasz)! - Updated default gap value in `PageContentWide` component from '10' (`32px`) to '20' (`64px`).
  Also, when used in single columns mode, it will only render its first children and log a warning if more than one child is provided.
- Updated dependencies [[`6dcd48525`](https://github.com/commercetools/merchant-center-application-kit/commit/6dcd48525a9943ea7348345f32ae218a5154867b)]:
  - @commercetools-frontend/application-shell-connectors@21.23.9
  - @commercetools-frontend/i18n@21.23.9
  - @commercetools-frontend/l10n@21.23.9
  - @commercetools-frontend/assets@21.23.9
  - @commercetools-frontend/constants@21.23.9

## 21.23.8

### Patch Changes

- Updated dependencies [[`78c6ad44c`](https://github.com/commercetools/merchant-center-application-kit/commit/78c6ad44cd37fd6076c2c0bdfc0e6ddd59465bbc)]:
  - @commercetools-frontend/constants@21.23.8
  - @commercetools-frontend/application-shell-connectors@21.23.8
  - @commercetools-frontend/i18n@21.23.8
  - @commercetools-frontend/l10n@21.23.8
  - @commercetools-frontend/assets@21.23.8

## 21.23.7

### Patch Changes

- [#2960](https://github.com/commercetools/merchant-center-application-kit/pull/2960) [`4377b3642`](https://github.com/commercetools/merchant-center-application-kit/commit/4377b3642c08fd9480016a287a18ada780191ad6) Thanks [@emmenko](https://github.com/emmenko)! - Update dependencies

- Updated dependencies [[`c8069d85d`](https://github.com/commercetools/merchant-center-application-kit/commit/c8069d85d8218578f1a863a531cb2c3e76551eeb), [`4377b3642`](https://github.com/commercetools/merchant-center-application-kit/commit/4377b3642c08fd9480016a287a18ada780191ad6), [`4377b3642`](https://github.com/commercetools/merchant-center-application-kit/commit/4377b3642c08fd9480016a287a18ada780191ad6)]:
  - @commercetools-frontend/l10n@21.23.7
  - @commercetools-frontend/application-shell-connectors@21.23.7
  - @commercetools-frontend/constants@21.23.7
  - @commercetools-frontend/i18n@21.23.7
  - @commercetools-frontend/assets@21.23.7

## 21.23.6

### Patch Changes

- [#2956](https://github.com/commercetools/merchant-center-application-kit/pull/2956) [`96bfb66f2`](https://github.com/commercetools/merchant-center-application-kit/commit/96bfb66f21b56bc80271ca3509114eed6e8ea742) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Changed `PageContentWide` component to render all its children when using single-column mode.

- Updated dependencies []:
  - @commercetools-frontend/application-shell-connectors@21.23.6
  - @commercetools-frontend/assets@21.23.6
  - @commercetools-frontend/constants@21.23.6
  - @commercetools-frontend/i18n@21.23.6
  - @commercetools-frontend/l10n@21.23.6

## 21.23.5

### Patch Changes

- Updated dependencies [[`ff5542f5d`](https://github.com/commercetools/merchant-center-application-kit/commit/ff5542f5d94c5d868b6c7a0cfae72daac362f7ee)]:
  - @commercetools-frontend/assets@21.23.5
  - @commercetools-frontend/application-shell-connectors@21.23.5
  - @commercetools-frontend/constants@21.23.5
  - @commercetools-frontend/i18n@21.23.5
  - @commercetools-frontend/l10n@21.23.5

## 21.23.4

### Patch Changes

- [#2952](https://github.com/commercetools/merchant-center-application-kit/pull/2952) [`2e805309c`](https://github.com/commercetools/merchant-center-application-kit/commit/2e805309c526d98e4822757f062a553987d71547) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Update `ui-kit` and `react-select` dependencies

- Updated dependencies [[`2e805309c`](https://github.com/commercetools/merchant-center-application-kit/commit/2e805309c526d98e4822757f062a553987d71547)]:
  - @commercetools-frontend/i18n@21.23.4
  - @commercetools-frontend/application-shell-connectors@21.23.4
  - @commercetools-frontend/assets@21.23.4
  - @commercetools-frontend/constants@21.23.4
  - @commercetools-frontend/l10n@21.23.4

## 21.23.3

### Patch Changes

- [#2941](https://github.com/commercetools/merchant-center-application-kit/pull/2941) [`694f060f7`](https://github.com/commercetools/merchant-center-application-kit/commit/694f060f7e36c249d17f64ac93ef45918fca7941) Thanks [@tylermorrisford](https://github.com/tylermorrisford)! - Add bottom padding for `PublicPageLayout`

- Updated dependencies []:
  - @commercetools-frontend/application-shell-connectors@21.23.3
  - @commercetools-frontend/assets@21.23.3
  - @commercetools-frontend/constants@21.23.3
  - @commercetools-frontend/i18n@21.23.3
  - @commercetools-frontend/l10n@21.23.3

## 21.23.2

### Patch Changes

- Updated dependencies [[`3c8431579`](https://github.com/commercetools/merchant-center-application-kit/commit/3c8431579d15862dda832373a77fc56d3b425452)]:
  - @commercetools-frontend/assets@21.23.2
  - @commercetools-frontend/application-shell-connectors@21.23.2
  - @commercetools-frontend/constants@21.23.2
  - @commercetools-frontend/i18n@21.23.2
  - @commercetools-frontend/l10n@21.23.2

## 21.23.1

### Patch Changes

- [#2937](https://github.com/commercetools/merchant-center-application-kit/pull/2937) [`695c657a0`](https://github.com/commercetools/merchant-center-application-kit/commit/695c657a0bd1b5fc58b46811e5a8e0c3ccaece2c) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Update `PageContentNarrow` component max width style.

- Updated dependencies [[`233c7edfc`](https://github.com/commercetools/merchant-center-application-kit/commit/233c7edfcc8d1df330cf42c7c4dd53631bb20ecf)]:
  - @commercetools-frontend/assets@21.23.1
  - @commercetools-frontend/application-shell-connectors@21.23.1
  - @commercetools-frontend/constants@21.23.1
  - @commercetools-frontend/i18n@21.23.1
  - @commercetools-frontend/l10n@21.23.1

## 21.23.0

### Patch Changes

- Updated dependencies []:
  - @commercetools-frontend/application-shell-connectors@21.23.0
  - @commercetools-frontend/assets@21.23.0
  - @commercetools-frontend/constants@21.23.0
  - @commercetools-frontend/i18n@21.23.0
  - @commercetools-frontend/l10n@21.23.0

## 21.22.1

### Patch Changes

- Updated dependencies []:
  - @commercetools-frontend/application-shell-connectors@21.22.1
  - @commercetools-frontend/assets@21.22.1
  - @commercetools-frontend/constants@21.22.1
  - @commercetools-frontend/i18n@21.22.1
  - @commercetools-frontend/l10n@21.22.1

## 21.22.0

### Patch Changes

- [#2929](https://github.com/commercetools/merchant-center-application-kit/pull/2929) [`18449d560`](https://github.com/commercetools/merchant-center-application-kit/commit/18449d560df08cc98aba4115f21d3fd478e246fc) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Update `ui-kit` dependencies

- [#2928](https://github.com/commercetools/merchant-center-application-kit/pull/2928) [`574b53176`](https://github.com/commercetools/merchant-center-application-kit/commit/574b53176070ebcf60502b4370f27bb02072c47c) Thanks [@emmenko](https://github.com/emmenko)! - Fix colors on hover

- Updated dependencies [[`caee9e27e`](https://github.com/commercetools/merchant-center-application-kit/commit/caee9e27e76ca6bef05388d8cc11c754bfe773b9), [`8f463adbc`](https://github.com/commercetools/merchant-center-application-kit/commit/8f463adbc840bfb85736086f2ee34ea1cbb4ca14), [`18449d560`](https://github.com/commercetools/merchant-center-application-kit/commit/18449d560df08cc98aba4115f21d3fd478e246fc)]:
  - @commercetools-frontend/assets@21.22.0
  - @commercetools-frontend/application-shell-connectors@21.22.0
  - @commercetools-frontend/i18n@21.22.0
  - @commercetools-frontend/constants@21.22.0
  - @commercetools-frontend/l10n@21.22.0

## 21.21.2

### Patch Changes

- [#2918](https://github.com/commercetools/merchant-center-application-kit/pull/2918) [`e52e8a782`](https://github.com/commercetools/merchant-center-application-kit/commit/e52e8a78228677cad28f1649bc4b1af473308a9a) Thanks [@emmenko](https://github.com/emmenko)! - Revert using `workspace:` protocol

- Updated dependencies [[`e52e8a782`](https://github.com/commercetools/merchant-center-application-kit/commit/e52e8a78228677cad28f1649bc4b1af473308a9a)]:
  - @commercetools-frontend/application-shell-connectors@21.21.2
  - @commercetools-frontend/i18n@21.21.2
  - @commercetools-frontend/l10n@21.21.2
  - @commercetools-frontend/assets@21.21.2
  - @commercetools-frontend/constants@21.21.2

## 21.21.1

### Patch Changes

- [#2897](https://github.com/commercetools/merchant-center-application-kit/pull/2897) [`adb731ab8`](https://github.com/commercetools/merchant-center-application-kit/commit/adb731ab85e6d0e06e813f72f4010a09c8278cc2) Thanks [@emmenko](https://github.com/emmenko)! - Define design tokens for navbar colors

- [#2917](https://github.com/commercetools/merchant-center-application-kit/pull/2917) [`fbfa2127e`](https://github.com/commercetools/merchant-center-application-kit/commit/fbfa2127e8d5de1838be4639ae23d4bbea9917b5) Thanks [@emmenko](https://github.com/emmenko)! - Apply new designs for appbar and user menu

- [#2881](https://github.com/commercetools/merchant-center-application-kit/pull/2881) [`e3ffe6c11`](https://github.com/commercetools/merchant-center-application-kit/commit/e3ffe6c11ff993296028219ab8c45562dc294963) Thanks [@emmenko](https://github.com/emmenko)! - Use `workspace:` version syntax for link workspace packages

- Updated dependencies [[`fb4907897`](https://github.com/commercetools/merchant-center-application-kit/commit/fb4907897356c21e4b24b277db0df740609db870), [`e3ffe6c11`](https://github.com/commercetools/merchant-center-application-kit/commit/e3ffe6c11ff993296028219ab8c45562dc294963)]:
  - @commercetools-frontend/application-shell-connectors@21.21.1
  - @commercetools-frontend/i18n@21.21.1
  - @commercetools-frontend/l10n@21.21.1
  - @commercetools-frontend/assets@21.21.1
  - @commercetools-frontend/constants@21.21.1

## 21.21.0

### Patch Changes

- Updated dependencies [[`033d95e08`](https://github.com/commercetools/merchant-center-application-kit/commit/033d95e08143eec0ad36040f4989c744ba30302b)]:
  - @commercetools-frontend/constants@21.21.0
  - @commercetools-frontend/application-shell-connectors@21.21.0
  - @commercetools-frontend/i18n@21.21.0
  - @commercetools-frontend/l10n@21.21.0
  - @commercetools-frontend/assets@21.21.0

## 21.20.5

### Patch Changes

- [#2905](https://github.com/commercetools/merchant-center-application-kit/pull/2905) [`bba0f8437`](https://github.com/commercetools/merchant-center-application-kit/commit/bba0f8437cf25b022509a651df8a2288bcc9914b) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Refactor page layout components (`FormModalPage`, `InfoDetailPage`,...) to set them up for the upcoming new theme.

- Updated dependencies [[`bba0f8437`](https://github.com/commercetools/merchant-center-application-kit/commit/bba0f8437cf25b022509a651df8a2288bcc9914b)]:
  - @commercetools-frontend/i18n@21.20.5
  - @commercetools-frontend/application-shell-connectors@21.20.5
  - @commercetools-frontend/assets@21.20.5
  - @commercetools-frontend/constants@21.20.5
  - @commercetools-frontend/l10n@21.20.5

## 21.20.4

### Patch Changes

- Updated dependencies []:
  - @commercetools-frontend/application-shell-connectors@21.20.4
  - @commercetools-frontend/i18n@21.20.4
  - @commercetools-frontend/l10n@21.20.4
  - @commercetools-frontend/assets@21.20.4
  - @commercetools-frontend/constants@21.20.4

## 21.20.3

### Patch Changes

- Updated dependencies []:
  - @commercetools-frontend/application-shell-connectors@21.20.3
  - @commercetools-frontend/assets@21.20.3
  - @commercetools-frontend/constants@21.20.3
  - @commercetools-frontend/i18n@21.20.3
  - @commercetools-frontend/l10n@21.20.3

## 21.20.2

### Patch Changes

- [#2894](https://github.com/commercetools/merchant-center-application-kit/pull/2894) [`af6635868`](https://github.com/commercetools/merchant-center-application-kit/commit/af66358689730e3e85f969d1f6ab94b42fedecf6) Thanks [@emmenko](https://github.com/emmenko)! - Apply some minor design changes to the `<NavBar>` component

- [#2870](https://github.com/commercetools/merchant-center-application-kit/pull/2870) [`7e3a810c7`](https://github.com/commercetools/merchant-center-application-kit/commit/7e3a810c7faf014abf7434d4e20519f3ffbf995d) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Refactor page layout components (`FormModalPage`, `InfoDetailPage`,...) to set them up for the upcoming new theme.

  Also, the dialog components (`InfoDialog`, `CofirmationDialog` and `FormDialog`) now have new available values for the `size` property.

- Updated dependencies [[`7e3a810c7`](https://github.com/commercetools/merchant-center-application-kit/commit/7e3a810c7faf014abf7434d4e20519f3ffbf995d)]:
  - @commercetools-frontend/i18n@21.20.2
  - @commercetools-frontend/application-shell-connectors@21.20.2
  - @commercetools-frontend/assets@21.20.2
  - @commercetools-frontend/constants@21.20.2
  - @commercetools-frontend/l10n@21.20.2

## 21.20.1

### Patch Changes

- Updated dependencies []:
  - @commercetools-frontend/application-shell-connectors@21.20.1
  - @commercetools-frontend/assets@21.20.1
  - @commercetools-frontend/constants@21.20.1
  - @commercetools-frontend/i18n@21.20.1
  - @commercetools-frontend/l10n@21.20.1

## 21.20.0

### Minor Changes

- [#2886](https://github.com/commercetools/merchant-center-application-kit/pull/2886) [`68e1998b4`](https://github.com/commercetools/merchant-center-application-kit/commit/68e1998b4021121fff23e4b549615d506b795226) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Update `ui-kit` dependencies.

### Patch Changes

- [#2879](https://github.com/commercetools/merchant-center-application-kit/pull/2879) [`93bd1a37d`](https://github.com/commercetools/merchant-center-application-kit/commit/93bd1a37d6dd178ad470b8e363dd597f4d5fe2b2) Thanks [@emmenko](https://github.com/emmenko)! - Code split `<PublicPageLayout>` component

- Updated dependencies [[`68e1998b4`](https://github.com/commercetools/merchant-center-application-kit/commit/68e1998b4021121fff23e4b549615d506b795226)]:
  - @commercetools-frontend/i18n@21.20.0
  - @commercetools-frontend/application-shell-connectors@21.20.0
  - @commercetools-frontend/l10n@21.20.0
  - @commercetools-frontend/assets@21.20.0
  - @commercetools-frontend/constants@21.20.0

## 21.19.0

### Patch Changes

- Updated dependencies []:
  - @commercetools-frontend/application-shell-connectors@21.19.0
  - @commercetools-frontend/i18n@21.19.0
  - @commercetools-frontend/l10n@21.19.0
  - @commercetools-frontend/assets@21.19.0
  - @commercetools-frontend/constants@21.19.0

## 21.18.1

### Patch Changes

- Updated dependencies []:
  - @commercetools-frontend/application-shell-connectors@21.18.1
  - @commercetools-frontend/assets@21.18.1
  - @commercetools-frontend/constants@21.18.1
  - @commercetools-frontend/i18n@21.18.1
  - @commercetools-frontend/l10n@21.18.1

## 21.18.0

### Patch Changes

- [#2837](https://github.com/commercetools/merchant-center-application-kit/pull/2837) [`3959ed2a0`](https://github.com/commercetools/merchant-center-application-kit/commit/3959ed2a0012077b6366c3a22c749fe7d6e74784) Thanks [@renovate](https://github.com/apps/renovate)! - Update all dependencies

- Updated dependencies [[`19ae7155b`](https://github.com/commercetools/merchant-center-application-kit/commit/19ae7155b3fd91ba20050434c045c47665df9504), [`3959ed2a0`](https://github.com/commercetools/merchant-center-application-kit/commit/3959ed2a0012077b6366c3a22c749fe7d6e74784), [`9649818ac`](https://github.com/commercetools/merchant-center-application-kit/commit/9649818ac924b3677203ca9df3e3a4aff6a0b080)]:
  - @commercetools-frontend/application-shell-connectors@21.18.0
  - @commercetools-frontend/i18n@21.18.0
  - @commercetools-frontend/l10n@21.18.0
  - @commercetools-frontend/assets@21.18.0
  - @commercetools-frontend/constants@21.18.0

## 21.17.0

### Patch Changes

- [#2839](https://github.com/commercetools/merchant-center-application-kit/pull/2839) [`f5eb8d77c`](https://github.com/commercetools/merchant-center-application-kit/commit/f5eb8d77c606e624e6cfc2cfad3da1eaeff5fdd6) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Update `ui-kit` dependencies

- Updated dependencies [[`a5e405db4`](https://github.com/commercetools/merchant-center-application-kit/commit/a5e405db45114a5cdd4d6814968bd199e6c8a480), [`f5eb8d77c`](https://github.com/commercetools/merchant-center-application-kit/commit/f5eb8d77c606e624e6cfc2cfad3da1eaeff5fdd6)]:
  - @commercetools-frontend/application-shell-connectors@21.17.0
  - @commercetools-frontend/i18n@21.17.0
  - @commercetools-frontend/assets@21.17.0
  - @commercetools-frontend/constants@21.17.0
  - @commercetools-frontend/l10n@21.17.0

## 21.16.0

### Patch Changes

- [#2580](https://github.com/commercetools/merchant-center-application-kit/pull/2580) [`1c40c40c9`](https://github.com/commercetools/merchant-center-application-kit/commit/1c40c40c947574ba24b411c9376640bb18c489ac) Thanks [@renovate](https://github.com/apps/renovate)! - Update `@testing-library/react-hooks` package to version `8.0.0`.

- Updated dependencies [[`1c40c40c9`](https://github.com/commercetools/merchant-center-application-kit/commit/1c40c40c947574ba24b411c9376640bb18c489ac), [`11192ad4b`](https://github.com/commercetools/merchant-center-application-kit/commit/11192ad4bf186ff529255c68e95193a362308620)]:
  - @commercetools-frontend/application-shell-connectors@21.16.0
  - @commercetools-frontend/i18n@21.16.0
  - @commercetools-frontend/l10n@21.16.0
  - @commercetools-frontend/assets@21.16.0
  - @commercetools-frontend/constants@21.16.0

## 21.15.0

### Patch Changes

- Updated dependencies []:
  - @commercetools-frontend/application-shell-connectors@21.15.0
  - @commercetools-frontend/i18n@21.15.0
  - @commercetools-frontend/l10n@21.15.0
  - @commercetools-frontend/assets@21.15.0
  - @commercetools-frontend/constants@21.15.0

## 21.14.3

### Patch Changes

- Updated dependencies []:
  - @commercetools-frontend/application-shell-connectors@21.14.3
  - @commercetools-frontend/assets@21.14.3
  - @commercetools-frontend/constants@21.14.3
  - @commercetools-frontend/i18n@21.14.3
  - @commercetools-frontend/l10n@21.14.3

## 21.14.2

### Patch Changes

- [#2776](https://github.com/commercetools/merchant-center-application-kit/pull/2776) [`00d9edcb4`](https://github.com/commercetools/merchant-center-application-kit/commit/00d9edcb49a144797ba3690db012e429e88a30fa) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

- Updated dependencies [[`00d9edcb4`](https://github.com/commercetools/merchant-center-application-kit/commit/00d9edcb49a144797ba3690db012e429e88a30fa)]:
  - @commercetools-frontend/application-shell-connectors@21.14.2
  - @commercetools-frontend/constants@21.14.2
  - @commercetools-frontend/i18n@21.14.2
  - @commercetools-frontend/l10n@21.14.2
  - @commercetools-frontend/assets@21.14.2

## 21.14.1

### Patch Changes

- [#2800](https://github.com/commercetools/merchant-center-application-kit/pull/2800) [`cb327cb2e`](https://github.com/commercetools/merchant-center-application-kit/commit/cb327cb2e518b039f878e255202b6d77a5080d16) Thanks [@Rhotimee](https://github.com/Rhotimee)! - Fix main page components to use available height space.

- Updated dependencies [[`ea9d188bf`](https://github.com/commercetools/merchant-center-application-kit/commit/ea9d188bf301366e7738e6d18b5bc99e7783dda2)]:
  - @commercetools-frontend/application-shell-connectors@21.14.1
  - @commercetools-frontend/l10n@21.14.1
  - @commercetools-frontend/assets@21.14.1
  - @commercetools-frontend/constants@21.14.1
  - @commercetools-frontend/i18n@21.14.1

## 21.14.0

### Minor Changes

- [#2745](https://github.com/commercetools/merchant-center-application-kit/pull/2745) [`3239eed53`](https://github.com/commercetools/merchant-center-application-kit/commit/3239eed53a84d398e8416fc83a6813867aac86ad) Thanks [@Rhotimee](https://github.com/Rhotimee)! - Add new components for Main Page Layout.

  - `<InfoMainPage>`
  - `<FormMainPage>`
  - `<CustomFormMainPage>`

  ## InfoMainPage

  The `<InfoMainPage>` is a controlled component used to render a page to show more information about a particular feature.

  ```jsx
  import { InfoMainPage } from '@commercetools-frontend/application-components';
  import Text from '@commercetools-uikit/text';

  const MainPage = () => {
    return (
      <InfoMainPage title="Main page">
        <Text.Body>{'Lorem ipsum ...'}</Text.Body>
      </InfoMainPage>
    );
  };
  ```

  ## FormMainPage

  `<FormMainPage>` is a controlled component used to render a page with a form or something that requires user input.

  ```jsx
  import { useFormik } from 'formik';
  import TextField from '@commercetools-uikit/text-field';
  import TextInput from '@commercetools-uikit/text-input';
  import { FormMainPage } from '@commercetools-frontend/application-components';

  const MainPage = () => {
    const formik = useFormik({
      initialValues: {
        email: '',
      },
      validate: (formikValues) => {
        if (TextInput.isEmpty(formikValues.email)) {
          return { email: { missing: true } };
        }
        return {};
      },
      onSubmit: async (formikValues) => {
        alert(`email: ${formikValues.email}`);
        // Do something async
      },
    });

    return (
      <FormMainPage
        title="Manage your account"
        isPrimaryButtonDisabled={formik.isSubmitting}
        onSecondaryButtonClick={formik.handleReset}
        onPrimaryButtonClick={formik.handleSubmit}
      >
        <TextField
          name="email"
          title="Email"
          isRequired={true}
          value={formik.values.email}
          errors={formik.errors.email}
          touched={formik.touched.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </FormMainPage>
    );
  };
  ```

  ## CustomFormMainPage

  `<CustomFormMainPage>` is a variation of the <FormMainPage> that allow passing custom control elements via formControls. This is useful in case the main page needs different control elements than the default ones (primary and secondary button).

  ```jsx
  import { useFormik } from 'formik';
  import TextField from '@commercetools-uikit/text-field';
  import TextInput from '@commercetools-uikit/text-input';
  import { CustomFormMainPage } from '@commercetools-frontend/application-components';

  const AccountPage = () => {
    const formik = useFormik({
      initialValues: {
        email: '',
      },
      validate: (formikValues) => {
        if (TextInput.isEmpty(formikValues.email)) {
          return { email: { missing: true } };
        }
        return {};
      },
      onSubmit: async (formikValues) => {
        alert(`email: ${formikValues.email}`);
        // Do something async
      },
    });

    return (
      <CustomFormMainPage
        title="Manage your account"
        formControls={
          <>
            <CustomFormMainPage.FormSecondaryButton
              onClick={formik.handleReset}
            />
            <CustomFormMainPage.FormPrimaryButton
              onClick={formik.handleSubmit}
            />
            <CustomFormMainPage.FormDeleteButton onClick={handleDelete} />
          </>
        }
      >
        <TextField
          name="email"
          title="Email"
          isRequired={true}
          value={formik.values.email}
          errors={formik.errors.email}
          touched={formik.touched.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </CustomFormMainPage>
    );
  };
  ```

### Patch Changes

- [#2792](https://github.com/commercetools/merchant-center-application-kit/pull/2792) [`6f15c52b1`](https://github.com/commercetools/merchant-center-application-kit/commit/6f15c52b1bafccf09e94d3b62df60fec031ffe0c) Thanks [@Rhotimee](https://github.com/Rhotimee)! - Rename labelSecondaryButtonIcon prop in Form pages to iconLeftSecondaryButton

- Updated dependencies []:
  - @commercetools-frontend/application-shell-connectors@21.14.0
  - @commercetools-frontend/assets@21.14.0
  - @commercetools-frontend/constants@21.14.0
  - @commercetools-frontend/i18n@21.14.0
  - @commercetools-frontend/l10n@21.14.0

## 21.13.1

### Patch Changes

- [`482ad98ee`](https://github.com/commercetools/merchant-center-application-kit/commit/482ad98eeb4570a583d58d476a7902ffe6cc2a94) Thanks [@emmenko](https://github.com/emmenko)! - Nothing changed, the previous release `21.13.0` had an issue publishing to NPM so we're bumping versions to trigger a new release.

- Updated dependencies [[`482ad98ee`](https://github.com/commercetools/merchant-center-application-kit/commit/482ad98eeb4570a583d58d476a7902ffe6cc2a94)]:
  - @commercetools-frontend/application-shell-connectors@21.13.1
  - @commercetools-frontend/assets@21.13.1
  - @commercetools-frontend/constants@21.13.1
  - @commercetools-frontend/i18n@21.13.1
  - @commercetools-frontend/l10n@21.13.1

## 21.13.0

### Patch Changes

- [#2761](https://github.com/commercetools/merchant-center-application-kit/pull/2761) [`d012420e5`](https://github.com/commercetools/merchant-center-application-kit/commit/d012420e563b34a1678693f19905bdd79b2317e2) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Update all dependencies

- Updated dependencies [[`5614ec9d8`](https://github.com/commercetools/merchant-center-application-kit/commit/5614ec9d8b9fc9c40c92ff1fde0beacbc3290e5e)]:
  - @commercetools-frontend/application-shell-connectors@21.13.0
  - @commercetools-frontend/i18n@21.13.0
  - @commercetools-frontend/l10n@21.13.0
  - @commercetools-frontend/assets@21.13.0
  - @commercetools-frontend/constants@21.13.0

## 21.12.0

### Patch Changes

- Updated dependencies [[`fbdf2a68`](https://github.com/commercetools/merchant-center-application-kit/commit/fbdf2a686061f32eb5130af9a4286b8e1ab2af32), [`e40fcd6c`](https://github.com/commercetools/merchant-center-application-kit/commit/e40fcd6cda229fd8f7af8b33f6a5c3541f361aa0)]:
  - @commercetools-frontend/l10n@21.12.0
  - @commercetools-frontend/application-shell-connectors@21.12.0
  - @commercetools-frontend/assets@21.12.0
  - @commercetools-frontend/constants@21.12.0
  - @commercetools-frontend/i18n@21.12.0

## 21.11.0

### Patch Changes

- Updated dependencies []:
  - @commercetools-frontend/application-shell-connectors@21.11.0
  - @commercetools-frontend/assets@21.11.0
  - @commercetools-frontend/constants@21.11.0
  - @commercetools-frontend/i18n@21.11.0
  - @commercetools-frontend/l10n@21.11.0

## 21.10.0

### Patch Changes

- Updated dependencies [[`fc3fd602`](https://github.com/commercetools/merchant-center-application-kit/commit/fc3fd6022031e3fe132cf890cb2a8b71f4ae0731), [`73977f3f`](https://github.com/commercetools/merchant-center-application-kit/commit/73977f3fcc52acd6195b698c37b8a9a80547670d), [`dac14c2b`](https://github.com/commercetools/merchant-center-application-kit/commit/dac14c2bf0800eed6ddd1977d988a31b23a9c47e), [`d0e10a3f`](https://github.com/commercetools/merchant-center-application-kit/commit/d0e10a3fbc893d55e15ffff8fe16911784425930)]:
  - @commercetools-frontend/i18n@21.10.0
  - @commercetools-frontend/l10n@21.10.0
  - @commercetools-frontend/constants@21.10.0
  - @commercetools-frontend/application-shell-connectors@21.10.0
  - @commercetools-frontend/assets@21.10.0

## 21.9.0

### Patch Changes

- [#2705](https://github.com/commercetools/merchant-center-application-kit/pull/2705) [`abe2c475`](https://github.com/commercetools/merchant-center-application-kit/commit/abe2c475be2aff3781ac6151178aede1e0801f77) Thanks [@emmenko](https://github.com/emmenko)! - Update typescript dependencies

* [#2703](https://github.com/commercetools/merchant-center-application-kit/pull/2703) [`8cd781a6`](https://github.com/commercetools/merchant-center-application-kit/commit/8cd781a6f2d626fd564e6e1fd0be30991c27b4ea) Thanks [@emmenko](https://github.com/emmenko)! - Update Emotion dependencies to `v11.9.3`

- [#2709](https://github.com/commercetools/merchant-center-application-kit/pull/2709) [`d0618b0a`](https://github.com/commercetools/merchant-center-application-kit/commit/d0618b0a61490ddb1d8f0b1aa26b5d03da7da38c) Thanks [@emmenko](https://github.com/emmenko)! - Update `moment` and `react-intl` dependencies

* [#2702](https://github.com/commercetools/merchant-center-application-kit/pull/2702) [`69a1fe13`](https://github.com/commercetools/merchant-center-application-kit/commit/69a1fe13362188977c0a9df86754634fdc81a413) Thanks [@emmenko](https://github.com/emmenko)! - Update Babel dependencies

- [#2700](https://github.com/commercetools/merchant-center-application-kit/pull/2700) [`21d98709`](https://github.com/commercetools/merchant-center-application-kit/commit/21d98709f12696f2f7bfd22d5d1c18cee40a4845) Thanks [@emmenko](https://github.com/emmenko)! - Update UI Kit dependencies to `v15.1.0`.

- Updated dependencies [[`d0584935`](https://github.com/commercetools/merchant-center-application-kit/commit/d058493588821ee249333db6f11beced11594c74), [`2f414585`](https://github.com/commercetools/merchant-center-application-kit/commit/2f414585cc324cb483b49c8d1040845d3f231ba3), [`abe2c475`](https://github.com/commercetools/merchant-center-application-kit/commit/abe2c475be2aff3781ac6151178aede1e0801f77), [`8cd781a6`](https://github.com/commercetools/merchant-center-application-kit/commit/8cd781a6f2d626fd564e6e1fd0be30991c27b4ea), [`d0618b0a`](https://github.com/commercetools/merchant-center-application-kit/commit/d0618b0a61490ddb1d8f0b1aa26b5d03da7da38c), [`69a1fe13`](https://github.com/commercetools/merchant-center-application-kit/commit/69a1fe13362188977c0a9df86754634fdc81a413), [`21d98709`](https://github.com/commercetools/merchant-center-application-kit/commit/21d98709f12696f2f7bfd22d5d1c18cee40a4845), [`de0980f9`](https://github.com/commercetools/merchant-center-application-kit/commit/de0980f9d151f3f0a98ddbf06e0629aaf03f5239)]:
  - @commercetools-frontend/application-shell-connectors@21.9.0
  - @commercetools-frontend/i18n@21.9.0
  - @commercetools-frontend/l10n@21.9.0
  - @commercetools-frontend/constants@21.9.0
  - @commercetools-frontend/assets@21.9.0

## 21.8.1

### Patch Changes

- Updated dependencies []:
  - @commercetools-frontend/application-shell-connectors@21.8.1
  - @commercetools-frontend/assets@21.8.1
  - @commercetools-frontend/constants@21.8.1
  - @commercetools-frontend/i18n@21.8.1
  - @commercetools-frontend/l10n@21.8.1

## 21.8.0

### Patch Changes

- [#2654](https://github.com/commercetools/merchant-center-application-kit/pull/2654) [`f3cc395d`](https://github.com/commercetools/merchant-center-application-kit/commit/f3cc395d1e29e25f694345c03a7b6376b2d88d20) Thanks [@kark](https://github.com/kark)! - Accessibility improvements of the `<TabHeader>` component.

- Updated dependencies [[`78de0ec6`](https://github.com/commercetools/merchant-center-application-kit/commit/78de0ec6b569b7daa23edf4fd21cae0842857ca8), [`43a9df21`](https://github.com/commercetools/merchant-center-application-kit/commit/43a9df2193000b49a0299c02d5218c50d71567ed), [`c56498ca`](https://github.com/commercetools/merchant-center-application-kit/commit/c56498ca105272d31ca4a6197c16870f4b0e32e6), [`20e648d2`](https://github.com/commercetools/merchant-center-application-kit/commit/20e648d2d69ac9b909ae90946c4fe2274cdf7332), [`405aa67b`](https://github.com/commercetools/merchant-center-application-kit/commit/405aa67bb55dd61e39f0856c120614030e9c8398), [`d6bfecf1`](https://github.com/commercetools/merchant-center-application-kit/commit/d6bfecf17c0a6a38330943cc5f195f1854248770)]:
  - @commercetools-frontend/application-shell-connectors@21.8.0
  - @commercetools-frontend/assets@21.8.0
  - @commercetools-frontend/constants@21.8.0
  - @commercetools-frontend/i18n@21.8.0
  - @commercetools-frontend/l10n@21.8.0

## 21.7.0

### Patch Changes

- [#2633](https://github.com/commercetools/merchant-center-application-kit/pull/2633) [`7e343017`](https://github.com/commercetools/merchant-center-application-kit/commit/7e343017f8ebe12da3bf56a27c40541561925857) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Fix alignment of public page footer element.

## 21.6.0

### Minor Changes

- [#2581](https://github.com/commercetools/merchant-center-application-kit/pull/2581) [`339abbca`](https://github.com/commercetools/merchant-center-application-kit/commit/339abbca536b7fa5f7e80c1cf69d32d33cd45cec) Thanks [@emmenko](https://github.com/emmenko)! - Introducing the **Stacking Layer System**.

  # Background

  Components such as modal pages, dialogs, etc. are rendered using a "modal" container. These containers are then rendered within a special container called `portals-container`.

  Up until now, rendering these components required to define things like `zIndex` or `level` props, to imperatively determine how the component will be visible.
  This was required as the modal containers are positioned `absolute` and finding the correct `z-index` value is important.

  However, it's the responsibility of the developer to "pick" the correct values which is error prone. In fact, choosing a wrong `z-index` results in the modal to not be visible and thus leading to UI bugs.

  A better and more reliable approach would be for the Custom Application to automatically determine the correct `z-index` values for every modal container rendered on the page.

  # Stacking Layer System

  To solve this issue, a Custom Application now implements a **Stacking Layer System** to automatically determine and apply the correct `z-index` values for every modal container.

  Therefore, it is not necessary anymore to explicitly provide the `zIndex` and `level` props to the modal pages or dialog components. The following props have been deprecated: `level` and `baseZIndex` (modal pages).

  To remove the deprecated props you can run the codemod `remove-deprecated-modal-level-props`:

  ```
  $ npx @commercetools-frontend/codemod remove-deprecated-modal-level-props 'src/**/*.js'
  ```

  For backwards compatibility, the `zIndex` prop is still supported and, if defined, it will overwrite the `z-index` value using `!important`. Therefore we recommend to only define it if absolutely necessary, otherwise it's safe to remove it.

* [#2594](https://github.com/commercetools/merchant-center-application-kit/pull/2594) [`d20638ef`](https://github.com/commercetools/merchant-center-application-kit/commit/d20638effe2d5ab2b4c6c851cae8ed70f8e3a080) Thanks [@kark](https://github.com/kark)! - Adds three new layout components: `<InfoDetailPage>`, `<FormDetailPage>` and `<CustomFormDetailPage>`.

  These components are similar to the `<InfoModalPage>`, `<FormModalPage>` and `<CustomFormModalPage>` respectively but they are not rendered as modals.

  # Usage

  The detail pages are supposed to be used as a direct child of one of the main pages.
  The layout of those pages can be recognized by the gray background header and the white content background. A back link in the header section of each of the pages is required.

  ## InfoDetailPage

  Info Detail pages are controlled components used to render a page with detailed data.

  ```jsx
  import { useHistory } from 'react-router-dom';
  import { InfoDetailPage } from '@commercetools-frontend/application-components';
  import Text from '@commercetools-uikit/text';
  const DetailPage = () => {
    const history = useHistory();
    return (
      <InfoDetailPage
        title="Detail page"
        onPreviousPathClick={() => history.push('/starting-page')}
        previousPathLabel="Go back"
      >
        <Text.Body>{'Lorem ipsum ...'}</Text.Body>
      </InfoDetailPage>
    );
  };
  ```

  ## FormDetailPage

  Form Detail pages are controlled components used to render a form with predefined control elements (primary and secondary button).

  ```jsx
  import { useHistory } from 'react-router-dom';
  import { useFormik } from 'formik';
  import TextField from '@commercetools-uikit/text-field';
  import TextInput from '@commercetools-uikit/text-input';
  import { FormDetailPage } from '@commercetools-frontend/application-components';

  const AccountPage = () => {
    const history = useHistory();
    const formik = useFormik({
      initialValues: {
        email: '',
      },
      validate: (formikValues) => {
        if (TextInput.isEmpty(formikValues.email)) {
          return { email: { missing: true } };
        }
        return {};
      },
      onSubmit: async (formikValues) => {
        alert(`email: ${formikValues.email}`);
        // Do something async
      },
    });
    return (
      <FormDetailPage
        title="Manage your account"
        onPreviousPathClick={() => history.push('/starting-page')}
        isPrimaryButtonDisabled={formik.isSubmitting}
        onSecondaryButtonClick={formik.handleReset}
        onPrimaryButtonClick={formik.handleSubmit}
      >
        <TextField
          name="email"
          title="Email"
          isRequired={true}
          value={formik.values.email}
          errors={formik.errors.email}
          touched={formik.touched.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </FormDetailPage>
    );
  };
  ```

  # CustomFormDetailPage

  Custom Form Detail pages are a variation of the `<FormDetailPage>` that allow passing custom control elements via `formControls`.
  This is useful in case the detail page needs different control elements than the default ones (primary and secondary button).

  ```jsx
  import { useHistory } from 'react-router-dom';
  import { useFormik } from 'formik';
  import TextField from '@commercetools-uikit/text-field';
  import TextInput from '@commercetools-uikit/text-input';
  import { CustomFormDetailPage } from '@commercetools-frontend/application-components';

  const AccountPage = () => {
    const history = useHistory();
    const formik = useFormik({
      initialValues: {
        email: '',
      },
      validate: (formikValues) => {
        if (TextInput.isEmpty(formikValues.email)) {
          return { email: { missing: true } };
        }
        return {};
      },
      onSubmit: async (formikValues) => {
        alert(`email: ${formikValues.email}`);
        // Do something async
      },
    });
    return (
      <CustomFormDetailPage
        title="Manage your account"
        onPreviousPathClick={() => history.push('/starting-page')}
        formControls={
          <>
            <CustomFormDetailPage.FormSecondaryButton
              onClick={formik.handleReset}
            />
            <CustomFormDetailPage.FormPrimaryButton
              onClick={formik.handleSubmit}
            />
            <CustomFormDetailPage.FormDeleteButton onClick={handleDelete} />
          </>
        }
      >
        <TextField
          name="email"
          title="Email"
          isRequired={true}
          value={formik.values.email}
          errors={formik.errors.email}
          touched={formik.touched.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </CustomFormDetailPage>
    );
  };
  ```

### Patch Changes

- [#2555](https://github.com/commercetools/merchant-center-application-kit/pull/2555) [`0b7a3743`](https://github.com/commercetools/merchant-center-application-kit/commit/0b7a3743207172ace7f2b6893b9c7d61c351967b) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`0b7a3743`](https://github.com/commercetools/merchant-center-application-kit/commit/0b7a3743207172ace7f2b6893b9c7d61c351967b), [`7622b6f9`](https://github.com/commercetools/merchant-center-application-kit/commit/7622b6f911826d5c2cf2edec649d3a684b89ac25)]:
  - @commercetools-frontend/application-shell-connectors@21.6.0
  - @commercetools-frontend/i18n@21.6.0
  - @commercetools-frontend/l10n@21.6.0

## 21.5.1

### Patch Changes

- [#2588](https://github.com/commercetools/merchant-center-application-kit/pull/2588) [`787692ac`](https://github.com/commercetools/merchant-center-application-kit/commit/787692accfed47c5dc50ef9b711e38d76ae97a87) Thanks [@emmenko](https://github.com/emmenko)! - Leftover of https://github.com/commercetools/merchant-center-application-kit/pull/2586

## 21.5.0

### Patch Changes

- [#2586](https://github.com/commercetools/merchant-center-application-kit/pull/2586) [`2f58b2d6`](https://github.com/commercetools/merchant-center-application-kit/commit/2f58b2d619fbc9d30e7d89604aba97f0c0ac9325) Thanks [@emmenko](https://github.com/emmenko)! - Fix type declarations for `<PortalsContainer>` as `defaultProps` and `forwardRef` do not work well together.

## 21.4.0

### Minor Changes

- [#2572](https://github.com/commercetools/merchant-center-application-kit/pull/2572) [`5b06e97a`](https://github.com/commercetools/merchant-center-application-kit/commit/5b06e97a65b48255d45f4d66acb6d52548025cc4) Thanks [@emmenko](https://github.com/emmenko)! - Bump uikit packages to v15.

### Patch Changes

- [#2563](https://github.com/commercetools/merchant-center-application-kit/pull/2563) [`238bd34a`](https://github.com/commercetools/merchant-center-application-kit/commit/238bd34a6045fd4cda443585b714ac0689ecd335) Thanks [@kark](https://github.com/kark)! - Update `react-intl` to version `^5.25.0`

- Updated dependencies [[`238bd34a`](https://github.com/commercetools/merchant-center-application-kit/commit/238bd34a6045fd4cda443585b714ac0689ecd335), [`5b06e97a`](https://github.com/commercetools/merchant-center-application-kit/commit/5b06e97a65b48255d45f4d66acb6d52548025cc4)]:
  - @commercetools-frontend/i18n@21.4.0

## 21.3.5

### Patch Changes

- [#2554](https://github.com/commercetools/merchant-center-application-kit/pull/2554) [`8e170c65`](https://github.com/commercetools/merchant-center-application-kit/commit/8e170c6574e8d52738b3a00022fedc8df03ce048) Thanks [@emmenko](https://github.com/emmenko)! - Fix offset calculation for modal pages when notifications are opened.

## 21.3.4

### Patch Changes

- [#2549](https://github.com/commercetools/merchant-center-application-kit/pull/2549) [`54018ddf`](https://github.com/commercetools/merchant-center-application-kit/commit/54018ddf8a953ff9409c82ab3fe3d63feb158500) Thanks [@emmenko](https://github.com/emmenko)! - Fix portals layout width based on left nav menu.

* [#2546](https://github.com/commercetools/merchant-center-application-kit/pull/2546) [`dc76e5a9`](https://github.com/commercetools/merchant-center-application-kit/commit/dc76e5a9a7f875dadf2ed5a11c48a1ddff7b431c) Thanks [@renovate](https://github.com/apps/renovate)! - Upgrade dependencies

* Updated dependencies [[`dc76e5a9`](https://github.com/commercetools/merchant-center-application-kit/commit/dc76e5a9a7f875dadf2ed5a11c48a1ddff7b431c)]:
  - @commercetools-frontend/application-shell-connectors@21.3.4
  - @commercetools-frontend/constants@21.3.4
  - @commercetools-frontend/i18n@21.3.4
  - @commercetools-frontend/l10n@21.3.4

## 21.3.3

### Patch Changes

- [#2541](https://github.com/commercetools/merchant-center-application-kit/pull/2541) [`3853d77e`](https://github.com/commercetools/merchant-center-application-kit/commit/3853d77ece84ef8be552dd79e538f66902c7ac1f) Thanks [@emmenko](https://github.com/emmenko)! - Fix layout issue with modal components when the underlying page has a scrolling position, causing the modal container position to "scroll" with the page position.

  The expected behavior is for the modal page to always be correctly positioned and visible, regardless of the scrolling position of the underlying page.

  To fix that, the `<PortalsContainer>` now uses `position: fixed` when a modal container opens.

  The component now accepts some props to allow consumers to adjust the layout accordingly. However, for Custom Applications everything is pre-configured, so there is no action required.

## 21.3.2

### Patch Changes

- [#2536](https://github.com/commercetools/merchant-center-application-kit/pull/2536) [`6a2c4195`](https://github.com/commercetools/merchant-center-application-kit/commit/6a2c419526672df45b9cc9c95abc010cd65a832f) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Make the `title` prop optional for the components `<TabularMainPage>` and `<TabularDetailPage>`.

  A warning will be logged if neither the `title` or the `customTitleRow` props are provided.

* [#2537](https://github.com/commercetools/merchant-center-application-kit/pull/2537) [`c392de3d`](https://github.com/commercetools/merchant-center-application-kit/commit/c392de3d5b481047b4d29915a44cb7015a80f6cf) Thanks [@emmenko](https://github.com/emmenko)! - Page components with tabs should only let the content be scrollable

## 21.3.0

### Minor Changes

- [#2503](https://github.com/commercetools/merchant-center-application-kit/pull/2503) [`421cc68b`](https://github.com/commercetools/merchant-center-application-kit/commit/421cc68b834a41b070f68d03fe072f00f5ee074e) Thanks [@kark](https://github.com/kark)! - Add a new `<TabHeader>` component.

  This component should be used to render tab elements within the tabular components, for example `<TabularModalPage>`.
  A `<TabHeader>` is rendered as a link and it assumes the "tab content" is controlled and rendered using `<Route>` components.

  ```jsx
  import {
    TabularModalPage,
    TabHeader,
  } from '@commercetools-frontend/application-components';

  <TabularModalPage
    tabControls={
      <>
        <TabHeader to="/tab-one" label="Tab One" />
        <TabHeader to="/tab-two" label="Tab Two" />
      </>
    }
    // ...
  />;
  ```

* [#2517](https://github.com/commercetools/merchant-center-application-kit/pull/2517) [`9511e378`](https://github.com/commercetools/merchant-center-application-kit/commit/9511e378c91a710c4ad28b8c2360a8b7552e0258) Thanks [@kark](https://github.com/kark)! - Add two new layout components: `<TabularMainPage>` and `<TabularDetailPage>`.

  These components are similar to the `<TabularModalPage>` but they are not rendered as a modal. However, the layout itself is very similar between all the tabular components.

  Tabs must be rendered using the `<TabHeader>` component via the `tabControls` prop. A `<TabHeader>` is rendered as a link and it assumes the "tab content" is controlled and rendered using `<Route>` components.

  # Usage

  As the name implies, these components are meant to be used in different places.

  The `<TabularMainPage>` is supposed to be used in one of the main application landing pages, as the top level component page. From a hierarchy point of view, there should be no parent pages.
  The layout of this page can be recognized by the white background header and the gray content background.

  Example:

  ```jsx
  import {
    TabularMainPage,
    TabHeader,
  } from '@commercetools-frontend/application-components';

  <TabularMainPage
    title="Main page"
    tabControls={
      <>
        <TabHeader to="/tab-one" label="Tab One" />
        <TabHeader to="/tab-two" label="Tab Two" />
      </>
    }
  >
    <Switch>
      <Route path={`/tab-one`}>
        <Tab1 />
      </Route>
      <Route path={`/tab-two`}>
        <Tab2 />
      </Route>
    </Switch>
  </TabularMainPage>;
  ```

  The `<TabularDetailPage>` is supposed to be used as a direct child of one of the main pages. Typically it's used as a detail page with multiple sub-pages (tabs).
  The layout of this page can be recognized by the gray background header and the white content background. A back link in the header section is also required.

  Example:

  ```jsx
  import {
    TabularDetailPage,
    TabHeader,
  } from '@commercetools-frontend/application-components';

  <TabularDetailPage
    title="Detail page"
    onPreviousPathClick={() => history.push('/main')}
    previousPathLabel="Go back"
    tabControls={
      <>
        <TabHeader to="/detail/tab-one" label="Tab One" />
        <TabHeader to="/detail/tab-two" label="Tab Two" />
      </>
    }
  >
    <Switch>
      <Route path={`/detail/tab-one`}>
        <Tab1 />
      </Route>
      <Route path={`/detail/tab-two`}>
        <Tab2 />
      </Route>
    </Switch>
  </TabularDetailPage>;
  ```

### Patch Changes

- [#2520](https://github.com/commercetools/merchant-center-application-kit/pull/2520) [`6f3a2083`](https://github.com/commercetools/merchant-center-application-kit/commit/6f3a2083efac387e9a2994fbaaeb18914e739aa8) Thanks [@renovate](https://github.com/apps/renovate)! - Upgrade dependencies

* [#2528](https://github.com/commercetools/merchant-center-application-kit/pull/2528) [`9235a721`](https://github.com/commercetools/merchant-center-application-kit/commit/9235a721df2be2ca5753994cd11312d577d0b293) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

* Updated dependencies [[`6f3a2083`](https://github.com/commercetools/merchant-center-application-kit/commit/6f3a2083efac387e9a2994fbaaeb18914e739aa8), [`9235a721`](https://github.com/commercetools/merchant-center-application-kit/commit/9235a721df2be2ca5753994cd11312d577d0b293)]:
  - @commercetools-frontend/application-shell-connectors@21.3.0
  - @commercetools-frontend/constants@21.3.0
  - @commercetools-frontend/i18n@21.3.0
  - @commercetools-frontend/l10n@21.3.0

## 21.2.1

### Patch Changes

- [#2471](https://github.com/commercetools/merchant-center-application-kit/pull/2471) [`dc02733d`](https://github.com/commercetools/merchant-center-application-kit/commit/dc02733dfe14ce864e6efd36c6746892170ade3d) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

- Updated dependencies [[`dc02733d`](https://github.com/commercetools/merchant-center-application-kit/commit/dc02733dfe14ce864e6efd36c6746892170ade3d), [`dd5e33ea`](https://github.com/commercetools/merchant-center-application-kit/commit/dd5e33ea58b15e32a2d9aeb1d95cb4a4aec8d069)]:
  - @commercetools-frontend/application-shell-connectors@21.2.1
  - @commercetools-frontend/i18n@21.2.1
  - @commercetools-frontend/l10n@21.2.1

## 21.2.0

### Minor Changes

- [#2504](https://github.com/commercetools/merchant-center-application-kit/pull/2504) [`732e846e`](https://github.com/commercetools/merchant-center-application-kit/commit/732e846eaa5a353d5aa067206d2626d1366ba79a) Thanks [@emmenko](https://github.com/emmenko)! - Update uikit packages to v14

### Patch Changes

- Updated dependencies [[`732e846e`](https://github.com/commercetools/merchant-center-application-kit/commit/732e846eaa5a353d5aa067206d2626d1366ba79a)]:
  - @commercetools-frontend/i18n@21.2.0

## 21.1.0

### Patch Changes

- [#2482](https://github.com/commercetools/merchant-center-application-kit/pull/2482) [`2172e53e`](https://github.com/commercetools/merchant-center-application-kit/commit/2172e53e36add3849e61977fad8f521650236bf5) Thanks [@renovate](https://github.com/apps/renovate)! - Updated ui-kit to its latest version

- Updated dependencies [[`2172e53e`](https://github.com/commercetools/merchant-center-application-kit/commit/2172e53e36add3849e61977fad8f521650236bf5)]:
  - @commercetools-frontend/i18n@21.1.0

## 21.0.0

### Patch Changes

- [#2450](https://github.com/commercetools/merchant-center-application-kit/pull/2450) [`eb8f5b2c`](https://github.com/commercetools/merchant-center-application-kit/commit/eb8f5b2c885a4c3ffc7857a61e50508b429bf964) Thanks [@emmenko](https://github.com/emmenko)! - Update dependencies

* [#2430](https://github.com/commercetools/merchant-center-application-kit/pull/2430) [`bb1f7d75`](https://github.com/commercetools/merchant-center-application-kit/commit/bb1f7d75ff54f7fef05c4d2b3328b88e400b4867) Thanks [@emmenko](https://github.com/emmenko)! - Use version range for Babel packages.

* Updated dependencies [[`eb8f5b2c`](https://github.com/commercetools/merchant-center-application-kit/commit/eb8f5b2c885a4c3ffc7857a61e50508b429bf964), [`bb1f7d75`](https://github.com/commercetools/merchant-center-application-kit/commit/bb1f7d75ff54f7fef05c4d2b3328b88e400b4867), [`bb1f7d75`](https://github.com/commercetools/merchant-center-application-kit/commit/bb1f7d75ff54f7fef05c4d2b3328b88e400b4867), [`bb1f7d75`](https://github.com/commercetools/merchant-center-application-kit/commit/bb1f7d75ff54f7fef05c4d2b3328b88e400b4867), [`bb1f7d75`](https://github.com/commercetools/merchant-center-application-kit/commit/bb1f7d75ff54f7fef05c4d2b3328b88e400b4867)]:
  - @commercetools-frontend/application-shell-connectors@21.0.0
  - @commercetools-frontend/constants@21.0.0
  - @commercetools-frontend/i18n@21.0.0
  - @commercetools-frontend/l10n@21.0.0
  - @commercetools-frontend/assets@21.0.0

## 21.0.0-rc.3

### Patch Changes

- Updated dependencies [[`e6051a9d`](https://github.com/commercetools/merchant-center-application-kit/commit/e6051a9dde8fd77a1e949fe34393b4c7a61dee55)]:
  - @commercetools-frontend/constants@21.0.0-rc.3
  - @commercetools-frontend/application-shell-connectors@21.0.0-rc.3
  - @commercetools-frontend/i18n@21.0.0-rc.3
  - @commercetools-frontend/l10n@21.0.0-rc.3

## 21.0.0-rc.1

### Patch Changes

- [#2430](https://github.com/commercetools/merchant-center-application-kit/pull/2430) [`5ea8baf1`](https://github.com/commercetools/merchant-center-application-kit/commit/5ea8baf1b2ca2661aac9a6a572d2c8e596ee0b2c) Thanks [@emmenko](https://github.com/emmenko)! - Use version range for Babel packages.

- Updated dependencies [[`5ea8baf1`](https://github.com/commercetools/merchant-center-application-kit/commit/5ea8baf1b2ca2661aac9a6a572d2c8e596ee0b2c), [`1bee4f25`](https://github.com/commercetools/merchant-center-application-kit/commit/1bee4f25043af3e6408f624fa3e632bd7e39a587)]:
  - @commercetools-frontend/application-shell-connectors@21.0.0-rc.1
  - @commercetools-frontend/constants@21.0.0-rc.1
  - @commercetools-frontend/i18n@21.0.0-rc.1
  - @commercetools-frontend/l10n@21.0.0-rc.1
  - @commercetools-frontend/assets@21.0.0-rc.1

## 21.0.0-rc.0

### Patch Changes

- [#2450](https://github.com/commercetools/merchant-center-application-kit/pull/2450) [`eb8f5b2c`](https://github.com/commercetools/merchant-center-application-kit/commit/eb8f5b2c885a4c3ffc7857a61e50508b429bf964) Thanks [@emmenko](https://github.com/emmenko)! - Update dependencies

- Updated dependencies [[`eb8f5b2c`](https://github.com/commercetools/merchant-center-application-kit/commit/eb8f5b2c885a4c3ffc7857a61e50508b429bf964), [`1c363fad`](https://github.com/commercetools/merchant-center-application-kit/commit/1c363fad7ab770a739ac8080358e41ae4af42074)]:
  - @commercetools-frontend/application-shell-connectors@21.0.0-rc.0
  - @commercetools-frontend/constants@21.0.0-rc.0
  - @commercetools-frontend/i18n@21.0.0-rc.0
  - @commercetools-frontend/l10n@21.0.0-rc.0

## 20.13.0

### Patch Changes

- Updated dependencies [[`aa3b4472`](https://github.com/commercetools/merchant-center-application-kit/commit/aa3b447233d2741cf4573686a14887720ffca302)]:
  - @commercetools-frontend/i18n@20.13.0

## 20.12.3

### Patch Changes

- [#2433](https://github.com/commercetools/merchant-center-application-kit/pull/2433) [`d65e29e4`](https://github.com/commercetools/merchant-center-application-kit/commit/d65e29e4eea4d1809abaa8cc82cc246c681dfa27) Thanks [@emmenko](https://github.com/emmenko)! - Replace `ts-jest/utils` with `jest-mock`, for using the `mocked` function.

* [#2433](https://github.com/commercetools/merchant-center-application-kit/pull/2433) [`d65e29e4`](https://github.com/commercetools/merchant-center-application-kit/commit/d65e29e4eea4d1809abaa8cc82cc246c681dfa27) Thanks [@emmenko](https://github.com/emmenko)! - Update dependencies

* Updated dependencies [[`630ee1b5`](https://github.com/commercetools/merchant-center-application-kit/commit/630ee1b5d0c70c05104eaf4712b1db662fe8f8f7), [`d65e29e4`](https://github.com/commercetools/merchant-center-application-kit/commit/d65e29e4eea4d1809abaa8cc82cc246c681dfa27), [`d65e29e4`](https://github.com/commercetools/merchant-center-application-kit/commit/d65e29e4eea4d1809abaa8cc82cc246c681dfa27)]:
  - @commercetools-frontend/assets@20.12.3
  - @commercetools-frontend/application-shell-connectors@20.12.3
  - @commercetools-frontend/constants@20.12.3
  - @commercetools-frontend/i18n@20.12.3
  - @commercetools-frontend/l10n@20.12.3

## 20.12.1

### Patch Changes

- [#2384](https://github.com/commercetools/merchant-center-application-kit/pull/2384) [`cf914004`](https://github.com/commercetools/merchant-center-application-kit/commit/cf9140043ade6edb3ee71a7558b757f5e19bee81) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

- Updated dependencies [[`6f02335c`](https://github.com/commercetools/merchant-center-application-kit/commit/6f02335cd1fc05751e0398945b9d0fde0ef86c35), [`cf914004`](https://github.com/commercetools/merchant-center-application-kit/commit/cf9140043ade6edb3ee71a7558b757f5e19bee81)]:
  - @commercetools-frontend/assets@20.12.1
  - @commercetools-frontend/application-shell-connectors@20.12.1
  - @commercetools-frontend/constants@20.12.1
  - @commercetools-frontend/i18n@20.12.1
  - @commercetools-frontend/l10n@20.12.1

## 20.12.0

### Patch Changes

- Updated dependencies [[`f549637b`](https://github.com/commercetools/merchant-center-application-kit/commit/f549637b4a235ecc768ca77710784ddf63d1889b), [`fc8a3546`](https://github.com/commercetools/merchant-center-application-kit/commit/fc8a3546eb402cb58eea8ad1ff1169f6ed697a5e)]:
  - @commercetools-frontend/assets@20.12.0
  - @commercetools-frontend/constants@20.12.0
  - @commercetools-frontend/application-shell-connectors@20.12.0
  - @commercetools-frontend/i18n@20.12.0
  - @commercetools-frontend/l10n@20.12.0

## 20.11.0

### Patch Changes

- Updated dependencies [[`22a1b35d`](https://github.com/commercetools/merchant-center-application-kit/commit/22a1b35daf802958552e66d78924676f5f93534a), [`fc7f62ba`](https://github.com/commercetools/merchant-center-application-kit/commit/fc7f62bad0bad3d432bb52438e3bbf0660130bf4)]:
  - @commercetools-frontend/application-shell-connectors@20.11.0
  - @commercetools-frontend/constants@20.11.0
  - @commercetools-frontend/i18n@20.11.0
  - @commercetools-frontend/l10n@20.11.0

## 20.10.6

### Patch Changes

- [#2386](https://github.com/commercetools/merchant-center-application-kit/pull/2386) [`d7fcf6fc`](https://github.com/commercetools/merchant-center-application-kit/commit/d7fcf6fc8495d4eae68e0a4f4c1f1b3e0e394454) Thanks [@emmenko](https://github.com/emmenko)! - Upgrade to Yarn v3

- Updated dependencies [[`d7fcf6fc`](https://github.com/commercetools/merchant-center-application-kit/commit/d7fcf6fc8495d4eae68e0a4f4c1f1b3e0e394454)]:
  - @commercetools-frontend/application-shell-connectors@20.10.6
  - @commercetools-frontend/assets@20.10.6
  - @commercetools-frontend/constants@20.10.6
  - @commercetools-frontend/i18n@20.10.6
  - @commercetools-frontend/l10n@20.10.6

## 20.10.5

### Patch Changes

- [#2387](https://github.com/commercetools/merchant-center-application-kit/pull/2387) [`e897317a`](https://github.com/commercetools/merchant-center-application-kit/commit/e897317a90d6179638283e9a108bf93394d67eef) Thanks [@fuchodeveloper](https://github.com/fuchodeveloper)! - The `<*ModalPage>` components now accept a prop `afterOpenStyles` to overwrite the default styles. You can pass a "class name" or a CSS-in-JS style object.
  This should be used only in cases the default styles are causing some layout issues.

## 20.10.4

### Patch Changes

- [#2380](https://github.com/commercetools/merchant-center-application-kit/pull/2380) [`7fa4d7d0`](https://github.com/commercetools/merchant-center-application-kit/commit/7fa4d7d0c560226eba69ccb73c4014879939e8da) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

- Updated dependencies [[`7fa4d7d0`](https://github.com/commercetools/merchant-center-application-kit/commit/7fa4d7d0c560226eba69ccb73c4014879939e8da)]:
  - @commercetools-frontend/application-shell-connectors@20.10.4
  - @commercetools-frontend/i18n@20.10.4
  - @commercetools-frontend/l10n@20.10.4

## 20.10.3

### Patch Changes

- [#2362](https://github.com/commercetools/merchant-center-application-kit/pull/2362) [`f6b3ae02`](https://github.com/commercetools/merchant-center-application-kit/commit/f6b3ae02133927642976f976d2d2fd5eb675ce84) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

- Updated dependencies [[`f6b3ae02`](https://github.com/commercetools/merchant-center-application-kit/commit/f6b3ae02133927642976f976d2d2fd5eb675ce84), [`ffefdf20`](https://github.com/commercetools/merchant-center-application-kit/commit/ffefdf20da2929cd88fe3f7191b74d36909ccd54)]:
  - @commercetools-frontend/application-shell-connectors@20.10.3
  - @commercetools-frontend/i18n@20.10.3
  - @commercetools-frontend/l10n@20.10.3

## 20.10.1

### Patch Changes

- [#2348](https://github.com/commercetools/merchant-center-application-kit/pull/2348) [`3247e604`](https://github.com/commercetools/merchant-center-application-kit/commit/3247e6048533a72c9f64cd316621dd51471cd1a8) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

* [#2342](https://github.com/commercetools/merchant-center-application-kit/pull/2342) [`91ba0910`](https://github.com/commercetools/merchant-center-application-kit/commit/91ba0910ce09ab7f3552fd381983724a63d7243d) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- [#2356](https://github.com/commercetools/merchant-center-application-kit/pull/2356) [`e34fe076`](https://github.com/commercetools/merchant-center-application-kit/commit/e34fe076aab6681cdcc54622d84123f2c22020e6) Thanks [@ByronDWall](https://github.com/ByronDWall)! - set node version to 16.8 in nvmrc to avoid a bug in node/v8

- Updated dependencies [[`3247e604`](https://github.com/commercetools/merchant-center-application-kit/commit/3247e6048533a72c9f64cd316621dd51471cd1a8), [`91ba0910`](https://github.com/commercetools/merchant-center-application-kit/commit/91ba0910ce09ab7f3552fd381983724a63d7243d), [`e34fe076`](https://github.com/commercetools/merchant-center-application-kit/commit/e34fe076aab6681cdcc54622d84123f2c22020e6)]:
  - @commercetools-frontend/application-shell-connectors@20.10.1
  - @commercetools-frontend/constants@20.10.1
  - @commercetools-frontend/i18n@20.10.1
  - @commercetools-frontend/l10n@20.10.1
  - @commercetools-frontend/assets@20.10.1

## 20.9.4

### Patch Changes

- [#2336](https://github.com/commercetools/merchant-center-application-kit/pull/2336) [`8c6c13a7`](https://github.com/commercetools/merchant-center-application-kit/commit/8c6c13a79f91ea9476983e12c48ae834ca4640c1) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

- Updated dependencies [[`670ec977`](https://github.com/commercetools/merchant-center-application-kit/commit/670ec977ecf711b2e363da50830b831863e3a756), [`8c6c13a7`](https://github.com/commercetools/merchant-center-application-kit/commit/8c6c13a79f91ea9476983e12c48ae834ca4640c1), [`7665f22d`](https://github.com/commercetools/merchant-center-application-kit/commit/7665f22d6df48df7d63d53c92ad3b15d32664ece)]:
  - @commercetools-frontend/application-shell-connectors@20.9.4
  - @commercetools-frontend/i18n@20.9.4
  - @commercetools-frontend/l10n@20.9.4

## 20.9.3

### Patch Changes

- [#2318](https://github.com/commercetools/merchant-center-application-kit/pull/2318) [`83f2add2`](https://github.com/commercetools/merchant-center-application-kit/commit/83f2add2a56ba6696c51fd930a0a1dadbf36c134) Thanks [@renovate](https://github.com/apps/renovate)! - Update all dependencies

- Updated dependencies [[`83f2add2`](https://github.com/commercetools/merchant-center-application-kit/commit/83f2add2a56ba6696c51fd930a0a1dadbf36c134)]:
  - @commercetools-frontend/application-shell-connectors@20.9.3
  - @commercetools-frontend/constants@20.9.3
  - @commercetools-frontend/i18n@20.9.3
  - @commercetools-frontend/l10n@20.9.3

## 20.9.0

### Patch Changes

- Updated dependencies [[`a0e1cd72`](https://github.com/commercetools/merchant-center-application-kit/commit/a0e1cd72847cccb80f0d3436fbf44cada6d86bd0)]:
  - @commercetools-frontend/application-shell-connectors@20.9.0
  - @commercetools-frontend/i18n@20.9.0

## 20.8.0

### Minor Changes

- [#2315](https://github.com/commercetools/merchant-center-application-kit/pull/2315) [`22177e58`](https://github.com/commercetools/merchant-center-application-kit/commit/22177e5885372d7821b591a4e69e2b03cc24c867) Thanks [@emmenko](https://github.com/emmenko)! - Expose `<PortalsContainer>` from `@commercetools-frontend/application-components`. In case you happen to use some of the modal components outside of a Custom Application, you need to additionally render the `<PortalsContainer>`.

  Moreover, to help managing modal components state (open/close), we now expose a state hook `useModalState`.

### Patch Changes

- [#2316](https://github.com/commercetools/merchant-center-application-kit/pull/2316) [`3acfa94b`](https://github.com/commercetools/merchant-center-application-kit/commit/3acfa94bb1e67de9a144237d4f32cb94c6a2f26b) Thanks [@emmenko](https://github.com/emmenko)! - Upgrade to uikit `v12.2.2`.

* [#2313](https://github.com/commercetools/merchant-center-application-kit/pull/2313) [`9826a605`](https://github.com/commercetools/merchant-center-application-kit/commit/9826a605cd7b84c433383b02c1b94985c8173cda) Thanks [@emmenko](https://github.com/emmenko)! - Use new TS compiler options `jsx: react-jsx` and `jsxImportSource: @emotion/react`. All unused React imports then have been removed or migrated to destructured named imports.

- [#2300](https://github.com/commercetools/merchant-center-application-kit/pull/2300) [`b3437eab`](https://github.com/commercetools/merchant-center-application-kit/commit/b3437eab6fd7b1529f5eac78eda658028474afa7) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

- Updated dependencies [[`ca4e1441`](https://github.com/commercetools/merchant-center-application-kit/commit/ca4e14410537c2eadaccfb537431036fb8fae883), [`9826a605`](https://github.com/commercetools/merchant-center-application-kit/commit/9826a605cd7b84c433383b02c1b94985c8173cda), [`ca4e1441`](https://github.com/commercetools/merchant-center-application-kit/commit/ca4e14410537c2eadaccfb537431036fb8fae883), [`b3437eab`](https://github.com/commercetools/merchant-center-application-kit/commit/b3437eab6fd7b1529f5eac78eda658028474afa7)]:
  - @commercetools-frontend/assets@20.8.0
  - @commercetools-frontend/application-shell-connectors@20.8.0
  - @commercetools-frontend/i18n@20.8.0
  - @commercetools-frontend/l10n@20.8.0
  - @commercetools-frontend/constants@20.8.0

## 20.7.0

### Minor Changes

- [#2292](https://github.com/commercetools/merchant-center-application-kit/pull/2292) [`cd381943`](https://github.com/commercetools/merchant-center-application-kit/commit/cd38194393e052ae2d10714c2693bb72a1bc8719) Thanks [@emmenko](https://github.com/emmenko)! - Support rendering menu icons using `<InlineSvg>` component.

### Patch Changes

- Updated dependencies [[`c7325b0d`](https://github.com/commercetools/merchant-center-application-kit/commit/c7325b0d4e45132ff0c9a5243132537057dfa406), [`f5aa350a`](https://github.com/commercetools/merchant-center-application-kit/commit/f5aa350a29983383dd5933ac38c0beb56f0b9cf5), [`cd381943`](https://github.com/commercetools/merchant-center-application-kit/commit/cd38194393e052ae2d10714c2693bb72a1bc8719)]:
  - @commercetools-frontend/application-shell-connectors@20.7.0
  - @commercetools-frontend/l10n@20.7.0
  - @commercetools-frontend/i18n@20.7.0

## 20.6.0

### Patch Changes

- Updated dependencies [[`b910aa8e`](https://github.com/commercetools/merchant-center-application-kit/commit/b910aa8e10b824d35a880bc9fda9d460d5ff0957), [`be968d34`](https://github.com/commercetools/merchant-center-application-kit/commit/be968d344261622931c6cfadde905605d5b5dfde)]:
  - @commercetools-frontend/i18n@20.6.0

## 20.5.2

### Patch Changes

- [#2273](https://github.com/commercetools/merchant-center-application-kit/pull/2273) [`b96d4f3d`](https://github.com/commercetools/merchant-center-application-kit/commit/b96d4f3d6ab177da66bc8cab337172bf3a85b2c6) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

- Updated dependencies [[`374659f3`](https://github.com/commercetools/merchant-center-application-kit/commit/374659f3a06f61a2c9a0218d298ba5ee0de0c9c4), [`b96d4f3d`](https://github.com/commercetools/merchant-center-application-kit/commit/b96d4f3d6ab177da66bc8cab337172bf3a85b2c6)]:
  - @commercetools-frontend/application-shell-connectors@20.5.2
  - @commercetools-frontend/constants@20.5.2
  - @commercetools-frontend/i18n@20.5.2
  - @commercetools-frontend/l10n@20.5.2

## 20.5.1

### Patch Changes

- [#2264](https://github.com/commercetools/merchant-center-application-kit/pull/2264) [`e0ea1333`](https://github.com/commercetools/merchant-center-application-kit/commit/e0ea1333218aa7a916ff0971a52ed8175be4d697) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

* [#2268](https://github.com/commercetools/merchant-center-application-kit/pull/2268) [`c370f242`](https://github.com/commercetools/merchant-center-application-kit/commit/c370f242bb85bc0041b4825bc4ebc877eaaa61e4) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

* Updated dependencies [[`e0ea1333`](https://github.com/commercetools/merchant-center-application-kit/commit/e0ea1333218aa7a916ff0971a52ed8175be4d697), [`c370f242`](https://github.com/commercetools/merchant-center-application-kit/commit/c370f242bb85bc0041b4825bc4ebc877eaaa61e4)]:
  - @commercetools-frontend/application-shell-connectors@20.5.1
  - @commercetools-frontend/constants@20.5.1
  - @commercetools-frontend/i18n@20.5.1
  - @commercetools-frontend/l10n@20.5.1

## 20.5.0

### Patch Changes

- Updated dependencies [[`b9196aa7`](https://github.com/commercetools/merchant-center-application-kit/commit/b9196aa7097dae058d46f335e6332a5ee014a9d1)]:
  - @commercetools-frontend/constants@20.5.0
  - @commercetools-frontend/application-shell-connectors@20.5.0
  - @commercetools-frontend/i18n@20.5.0
  - @commercetools-frontend/l10n@20.5.0

## 20.4.0

### Patch Changes

- [#2247](https://github.com/commercetools/merchant-center-application-kit/pull/2247) [`f8f759b6`](https://github.com/commercetools/merchant-center-application-kit/commit/f8f759b6f0f6d8cc677efd90fecbd19d103c6a4f) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

- Updated dependencies [[`f8f759b6`](https://github.com/commercetools/merchant-center-application-kit/commit/f8f759b6f0f6d8cc677efd90fecbd19d103c6a4f)]:
  - @commercetools-frontend/i18n@20.4.0
  - @commercetools-frontend/application-shell-connectors@20.4.0
  - @commercetools-frontend/l10n@20.4.0

## 20.3.1

### Patch Changes

- [#2230](https://github.com/commercetools/merchant-center-application-kit/pull/2230) [`035ec444`](https://github.com/commercetools/merchant-center-application-kit/commit/035ec444c928d6b13f299012cfcdd0dec0e68af8) Thanks [@tdeekens](https://github.com/tdeekens)! - fix: update left behind dependencies

- Updated dependencies [[`035ec444`](https://github.com/commercetools/merchant-center-application-kit/commit/035ec444c928d6b13f299012cfcdd0dec0e68af8)]:
  - @commercetools-frontend/application-shell-connectors@20.3.1
  - @commercetools-frontend/i18n@20.3.1
  - @commercetools-frontend/l10n@20.3.1

## 20.3.0

### Patch Changes

- [#2223](https://github.com/commercetools/merchant-center-application-kit/pull/2223) [`6de28034`](https://github.com/commercetools/merchant-center-application-kit/commit/6de28034f51e53b3cd1f293eaa16b8f66d9ae9e0) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

* [#2160](https://github.com/commercetools/merchant-center-application-kit/pull/2160) [`7734f69e`](https://github.com/commercetools/merchant-center-application-kit/commit/7734f69e07fdff9e5a4517f6193541ac1170dff7) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependency eslint-plugin-testing-library to v4 and use `screen` over assigning to `rendered`

- [#2212](https://github.com/commercetools/merchant-center-application-kit/pull/2212) [`5961c019`](https://github.com/commercetools/merchant-center-application-kit/commit/5961c019ab908bc1a5d58acd4511e7c579976797) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`6de28034`](https://github.com/commercetools/merchant-center-application-kit/commit/6de28034f51e53b3cd1f293eaa16b8f66d9ae9e0), [`11a6c70d`](https://github.com/commercetools/merchant-center-application-kit/commit/11a6c70d9b76f595933d399f5688d7e85c805c66), [`7e7b4996`](https://github.com/commercetools/merchant-center-application-kit/commit/7e7b4996abd7297650237b43b375f04b3ff10b54), [`7734f69e`](https://github.com/commercetools/merchant-center-application-kit/commit/7734f69e07fdff9e5a4517f6193541ac1170dff7), [`5961c019`](https://github.com/commercetools/merchant-center-application-kit/commit/5961c019ab908bc1a5d58acd4511e7c579976797)]:
  - @commercetools-frontend/application-shell-connectors@20.3.0
  - @commercetools-frontend/i18n@20.3.0
  - @commercetools-frontend/l10n@20.3.0
  - @commercetools-frontend/constants@20.3.0

## 20.2.1

### Patch Changes

- Updated dependencies []:
  - @commercetools-frontend/application-shell-connectors@20.2.1
  - @commercetools-frontend/i18n@20.2.1
  - @commercetools-frontend/l10n@20.2.1

## 20.1.2

### Patch Changes

- [#2193](https://github.com/commercetools/merchant-center-application-kit/pull/2193) [`2c159ca3`](https://github.com/commercetools/merchant-center-application-kit/commit/2c159ca3a861a4321ecfb8c6ea382bea9a9cdd65) Thanks [@adnasa](https://github.com/adnasa)! - Bump to latest ui-kit

* [#2199](https://github.com/commercetools/merchant-center-application-kit/pull/2199) [`0bfa1613`](https://github.com/commercetools/merchant-center-application-kit/commit/0bfa16134450fb0699018b2210e0da904f646140) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

* Updated dependencies [[`0bfa1613`](https://github.com/commercetools/merchant-center-application-kit/commit/0bfa16134450fb0699018b2210e0da904f646140)]:
  - @commercetools-frontend/application-shell-connectors@20.1.2

## 20.0.1

### Patch Changes

- [#2178](https://github.com/commercetools/merchant-center-application-kit/pull/2178) [`26d4487a`](https://github.com/commercetools/merchant-center-application-kit/commit/26d4487a15dcee5c526de7b1f227e042e2711d3f) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`26d4487a`](https://github.com/commercetools/merchant-center-application-kit/commit/26d4487a15dcee5c526de7b1f227e042e2711d3f)]:
  - @commercetools-frontend/application-shell-connectors@20.0.1
  - @commercetools-frontend/constants@20.0.1
  - @commercetools-frontend/i18n@20.0.1
  - @commercetools-frontend/l10n@20.0.1

## 19.3.1

### Patch Changes

- [#2157](https://github.com/commercetools/merchant-center-application-kit/pull/2157) [`e757dd2b`](https://github.com/commercetools/merchant-center-application-kit/commit/e757dd2b114f0c751400eca6179700bddbb3aecc) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`e757dd2b`](https://github.com/commercetools/merchant-center-application-kit/commit/e757dd2b114f0c751400eca6179700bddbb3aecc)]:
  - @commercetools-frontend/application-shell-connectors@19.3.1
  - @commercetools-frontend/constants@19.3.1
  - @commercetools-frontend/i18n@19.3.1
  - @commercetools-frontend/l10n@19.3.1

## 19.1.0

### Patch Changes

- Updated dependencies [[`18fb7648`](https://github.com/commercetools/merchant-center-application-kit/commit/18fb76483f27e17e05dc8fddeda625dadf587a0f)]:
  - @commercetools-frontend/l10n@19.1.0

## 19.0.1

### Patch Changes

- [#2135](https://github.com/commercetools/merchant-center-application-kit/pull/2135) [`598d3bb5`](https://github.com/commercetools/merchant-center-application-kit/commit/598d3bb52a43b261f4ddf0393722927b76339870) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

- Updated dependencies [[`598d3bb5`](https://github.com/commercetools/merchant-center-application-kit/commit/598d3bb52a43b261f4ddf0393722927b76339870)]:
  - @commercetools-frontend/application-shell-connectors@19.0.1
  - @commercetools-frontend/i18n@19.0.1

## 19.0.0

### Major Changes

- [#2041](https://github.com/commercetools/merchant-center-application-kit/pull/2041) [`a240f657`](https://github.com/commercetools/merchant-center-application-kit/commit/a240f6574a9240a2ac82febb67b0f6c814db979f) Thanks [@emmenko](https://github.com/emmenko)! - - Requires a peer dependency of `react@17`, `react-dom@17`.
  - The `@types/react*` peer dependencies have been removed and included as normal dependencies with a minor range version.
  - The peer dependency `react-intl` now only requires version `>=5`.
  - The peer dependency `@commercetools-frontend/ui-kit` has been removed.

* [#2041](https://github.com/commercetools/merchant-center-application-kit/pull/2041) [`a240f657`](https://github.com/commercetools/merchant-center-application-kit/commit/a240f6574a9240a2ac82febb67b0f6c814db979f) Thanks [@emmenko](https://github.com/emmenko)! - Upgrade and migrate packages to use `ui-kit@v12`

### Patch Changes

- Updated dependencies [[`a240f657`](https://github.com/commercetools/merchant-center-application-kit/commit/a240f6574a9240a2ac82febb67b0f6c814db979f), [`a240f657`](https://github.com/commercetools/merchant-center-application-kit/commit/a240f6574a9240a2ac82febb67b0f6c814db979f), [`a240f657`](https://github.com/commercetools/merchant-center-application-kit/commit/a240f6574a9240a2ac82febb67b0f6c814db979f), [`a240f657`](https://github.com/commercetools/merchant-center-application-kit/commit/a240f6574a9240a2ac82febb67b0f6c814db979f)]:
  - @commercetools-frontend/application-shell-connectors@19.0.0
  - @commercetools-frontend/l10n@19.0.0
  - @commercetools-frontend/i18n@19.0.0

## 18.7.0

### Patch Changes

- [#2122](https://github.com/commercetools/merchant-center-application-kit/pull/2122) [`c3ba44a6`](https://github.com/commercetools/merchant-center-application-kit/commit/c3ba44a6a124ddfbe6322436a260b93ff29ec4e9) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

* [#2110](https://github.com/commercetools/merchant-center-application-kit/pull/2110) [`c850d6dc`](https://github.com/commercetools/merchant-center-application-kit/commit/c850d6dcf8edabb5eb9390e41def4b6b52879b7a) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

* Updated dependencies [[`c3ba44a6`](https://github.com/commercetools/merchant-center-application-kit/commit/c3ba44a6a124ddfbe6322436a260b93ff29ec4e9), [`8b1e943c`](https://github.com/commercetools/merchant-center-application-kit/commit/8b1e943ca8068cfbf915a83e8498500455eabd75), [`263f3180`](https://github.com/commercetools/merchant-center-application-kit/commit/263f318028603daa7fadac7f6cd84c1891b2f1c0), [`c850d6dc`](https://github.com/commercetools/merchant-center-application-kit/commit/c850d6dcf8edabb5eb9390e41def4b6b52879b7a)]:
  - @commercetools-frontend/i18n@18.7.0
  - @commercetools-frontend/l10n@18.7.0
  - @commercetools-frontend/application-shell-connectors@18.7.0

## 18.6.0

### Patch Changes

- [#2099](https://github.com/commercetools/merchant-center-application-kit/pull/2099) [`d09a154b`](https://github.com/commercetools/merchant-center-application-kit/commit/d09a154b9e74bc180da033acd8e74ac8ed32fc75) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

- Updated dependencies [[`f347093f`](https://github.com/commercetools/merchant-center-application-kit/commit/f347093f1705ae8214fcd556b80bd2366624205d), [`d09a154b`](https://github.com/commercetools/merchant-center-application-kit/commit/d09a154b9e74bc180da033acd8e74ac8ed32fc75)]:
  - @commercetools-frontend/l10n@18.6.0
  - @commercetools-frontend/application-shell-connectors@18.6.0
  - @commercetools-frontend/constants@18.6.0
  - @commercetools-frontend/i18n@18.6.0

## 18.5.6

### Patch Changes

- [`ca4ea6eb`](https://github.com/commercetools/merchant-center-application-kit/commit/ca4ea6eb17c14bf015a8448248c58881e005ac99) [#2085](https://github.com/commercetools/merchant-center-application-kit/pull/2085) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`ca4ea6eb`](https://github.com/commercetools/merchant-center-application-kit/commit/ca4ea6eb17c14bf015a8448248c58881e005ac99)]:
  - @commercetools-frontend/application-shell-connectors@18.5.6
  - @commercetools-frontend/constants@18.5.6
  - @commercetools-frontend/i18n@18.5.6
  - @commercetools-frontend/l10n@18.5.6

## 18.5.5

### Patch Changes

- [`5e7d20fb`](https://github.com/commercetools/merchant-center-application-kit/commit/5e7d20fbf908548aae8d9101bb7b36850f92aa95) [#2078](https://github.com/commercetools/merchant-center-application-kit/pull/2078) Thanks [@adnasa](https://github.com/adnasa)! - Remove generated types config

## 18.5.4

### Patch Changes

- Updated dependencies [[`d44f5b69`](https://github.com/commercetools/merchant-center-application-kit/commit/d44f5b6916c3897ce198eb06757d29d40535b8d4)]:
  - @commercetools-frontend/assets@18.5.4

## 18.5.2

### Patch Changes

- [`5892c888`](https://github.com/commercetools/merchant-center-application-kit/commit/5892c88879bea4b5cb11b9da39d080005da6b045) [#2067](https://github.com/commercetools/merchant-center-application-kit/pull/2067) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all ui-kit packages to v11 (major)

* [`7f26c54e`](https://github.com/commercetools/merchant-center-application-kit/commit/7f26c54e55eff8aeac786ec0d011d36e40b0d263) [#2066](https://github.com/commercetools/merchant-center-application-kit/pull/2066) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

* Updated dependencies [[`7f26c54e`](https://github.com/commercetools/merchant-center-application-kit/commit/7f26c54e55eff8aeac786ec0d011d36e40b0d263)]:
  - @commercetools-frontend/application-shell-connectors@18.5.2
  - @commercetools-frontend/constants@18.5.2
  - @commercetools-frontend/i18n@18.5.2
  - @commercetools-frontend/l10n@18.5.2

## 18.5.1

### Patch Changes

- [`bb2ceac2`](https://github.com/commercetools/merchant-center-application-kit/commit/bb2ceac229b94836482dbed57824d679a9cbd5d6) [#2062](https://github.com/commercetools/merchant-center-application-kit/pull/2062) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`bb2ceac2`](https://github.com/commercetools/merchant-center-application-kit/commit/bb2ceac229b94836482dbed57824d679a9cbd5d6)]:
  - @commercetools-frontend/application-shell-connectors@18.5.1
  - @commercetools-frontend/constants@18.5.1
  - @commercetools-frontend/i18n@18.5.1
  - @commercetools-frontend/l10n@18.5.1

## 18.4.1

### Patch Changes

- [`074ec33d`](https://github.com/commercetools/merchant-center-application-kit/commit/074ec33d97282fc9750fd59ccceb33ff0430da41) [#2053](https://github.com/commercetools/merchant-center-application-kit/pull/2053) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

* [`e5743110`](https://github.com/commercetools/merchant-center-application-kit/commit/e574311090e90b6186c18a3a49747a8bcf08822b) [#2056](https://github.com/commercetools/merchant-center-application-kit/pull/2056) Thanks [@emmenko](https://github.com/emmenko)! - Remove unused `@apollo/client` dependency (leftover from removing the experimental package)

* Updated dependencies [[`074ec33d`](https://github.com/commercetools/merchant-center-application-kit/commit/074ec33d97282fc9750fd59ccceb33ff0430da41)]:
  - @commercetools-frontend/application-shell-connectors@18.4.1
  - @commercetools-frontend/i18n@18.4.1
  - @commercetools-frontend/l10n@18.4.1

## 18.4.0

### Patch Changes

- [`63d9c424`](https://github.com/commercetools/merchant-center-application-kit/commit/63d9c42463be04bad32ee32be1c84535086de755) [#2049](https://github.com/commercetools/merchant-center-application-kit/pull/2049) Thanks [@emmenko](https://github.com/emmenko)! - Bump uikit versions, use `@manypkg/cli upgrade` instead of `bulk-update-versions`.

* [`eb2fbb22`](https://github.com/commercetools/merchant-center-application-kit/commit/eb2fbb2279eff99048c91da352a69e1883eb54af) [#2044](https://github.com/commercetools/merchant-center-application-kit/pull/2044) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

* Updated dependencies [[`63d9c424`](https://github.com/commercetools/merchant-center-application-kit/commit/63d9c42463be04bad32ee32be1c84535086de755), [`eb2fbb22`](https://github.com/commercetools/merchant-center-application-kit/commit/eb2fbb2279eff99048c91da352a69e1883eb54af)]:
  - @commercetools-frontend/i18n@18.4.0
  - @commercetools-frontend/application-shell-connectors@18.4.0
  - @commercetools-frontend/constants@18.4.0
  - @commercetools-frontend/l10n@18.4.0

## 18.3.0

### Minor Changes

- [`71e12377`](https://github.com/commercetools/merchant-center-application-kit/commit/71e12377a4b4e623942b7f6b441bc9899b561cb3) [#2017](https://github.com/commercetools/merchant-center-application-kit/pull/2017) Thanks [@adnasa](https://github.com/adnasa)! - remove product-picker-input

## 18.2.2

### Patch Changes

- Updated dependencies [[`27b6690c`](https://github.com/commercetools/merchant-center-application-kit/commit/27b6690c75c9b83bb11ffcf83251b039a6f06cf0)]:
  - @commercetools-frontend/constants@18.2.2
  - @commercetools-frontend/application-shell-connectors@18.2.2
  - @commercetools-frontend/i18n@18.2.2
  - @commercetools-frontend/l10n@18.2.2

## 18.1.5

### Patch Changes

- [`aa6f642a`](https://github.com/commercetools/merchant-center-application-kit/commit/aa6f642a7d28dec7f34f8e6147ed9c7fee0ebd13) [#2026](https://github.com/commercetools/merchant-center-application-kit/pull/2026) Thanks [@emmenko](https://github.com/emmenko)! - Update uikit and docs-kit dependencies to fix some underlying emotion and react-select version resolution.

- Updated dependencies [[`aa6f642a`](https://github.com/commercetools/merchant-center-application-kit/commit/aa6f642a7d28dec7f34f8e6147ed9c7fee0ebd13)]:
  - @commercetools-frontend/i18n@18.1.5

## 18.1.4

### Patch Changes

- [`c9589f5e`](https://github.com/commercetools/merchant-center-application-kit/commit/c9589f5e3d1fd18393c7bf501c3b23b8ec402804) [#2020](https://github.com/commercetools/merchant-center-application-kit/pull/2020) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

- Updated dependencies [[`c9589f5e`](https://github.com/commercetools/merchant-center-application-kit/commit/c9589f5e3d1fd18393c7bf501c3b23b8ec402804)]:
  - @commercetools-frontend/i18n@18.1.4
  - @commercetools-frontend/application-shell-connectors@18.1.4
  - @commercetools-frontend/l10n@18.1.4

## 18.1.0

### Patch Changes

- [`3bf32993`](https://github.com/commercetools/merchant-center-application-kit/commit/3bf329935a109a73a7c33580fdf618e60fdbcc2c) [#1971](https://github.com/commercetools/merchant-center-application-kit/pull/1971) Thanks [@tdeekens](https://github.com/tdeekens)! - Add internal opt-in support for combining feature flag adapters.

* [`7a53760f`](https://github.com/commercetools/merchant-center-application-kit/commit/7a53760f4a04decd02037315d8935bed953abfc8) [#2003](https://github.com/commercetools/merchant-center-application-kit/pull/2003) Thanks [@dogayuksel](https://github.com/dogayuksel)! - Allow `PublicPageLayout` container to flex beyond 100vh.

* Updated dependencies [[`3bf32993`](https://github.com/commercetools/merchant-center-application-kit/commit/3bf329935a109a73a7c33580fdf618e60fdbcc2c)]:
  - @commercetools-frontend/application-shell-connectors@18.1.0
  - @commercetools-frontend/assets@18.1.0
  - @commercetools-frontend/constants@18.1.0
  - @commercetools-frontend/l10n@18.1.0
  - @commercetools-frontend/i18n@18.1.0

## 18.0.2

### Patch Changes

- [`b38cb57f`](https://github.com/commercetools/merchant-center-application-kit/commit/b38cb57f678e79a862f1b97df2d1c753838ffbb7) [#1991](https://github.com/commercetools/merchant-center-application-kit/pull/1991) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

- Updated dependencies [[`b38cb57f`](https://github.com/commercetools/merchant-center-application-kit/commit/b38cb57f678e79a862f1b97df2d1c753838ffbb7)]:
  - @commercetools-frontend/i18n@18.0.2
  - @commercetools-frontend/l10n@18.0.2

## 17.10.2

### Patch Changes

- [`0ef6a6a`](https://github.com/commercetools/merchant-center-application-kit/commit/0ef6a6a3099ce7210b8db8cc5a21a5e40a050d36) [#1989](https://github.com/commercetools/merchant-center-application-kit/pull/1989) Thanks [@emmenko](https://github.com/emmenko)! - Update uikit packages to `10.44`

- Updated dependencies [[`0ef6a6a`](https://github.com/commercetools/merchant-center-application-kit/commit/0ef6a6a3099ce7210b8db8cc5a21a5e40a050d36)]:
  - @commercetools-frontend/i18n@17.10.2

## 17.10.1

### Patch Changes

- [`5557c5c`](https://github.com/commercetools/merchant-center-application-kit/commit/5557c5c5744bf34a981247d04dc2f1117c15767d) [#1976](https://github.com/commercetools/merchant-center-application-kit/pull/1976) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

- Updated dependencies [[`5557c5c`](https://github.com/commercetools/merchant-center-application-kit/commit/5557c5c5744bf34a981247d04dc2f1117c15767d)]:
  - @commercetools-frontend/application-shell-connectors@17.10.1
  - @commercetools-frontend/constants@17.10.1
  - @commercetools-frontend/i18n@17.10.1
  - @commercetools-frontend/l10n@17.10.1

## 17.10.0

### Minor Changes

- [`d86c2e8`](https://github.com/commercetools/merchant-center-application-kit/commit/d86c2e86179aca2729d92fa18545241e2bf36fca) [#1934](https://github.com/commercetools/merchant-center-application-kit/pull/1934) Thanks [@emmenko](https://github.com/emmenko)! - Introduce a new **experimental opt-in** feature to authenticate the application for local development, using an OIDC-like workflow.

  > Disclaimer: this is an opt-in experimental feature. Use it at your own risk.
  > We want to test this feature internally first. Until then, we discourage you to try it out.

  The feature can be enabled by setting the `ENABLE_OIDC_FOR_DEVELOPMENT=true` environment variable.

  In addition to that, we have a new package `@commercetools-frontend/cypress`, to include some useful commands for testing Custom Applications.

* [`dc7a443`](https://github.com/commercetools/merchant-center-application-kit/commit/dc7a4437f02cfe9c840ae6f22cc85f94cf6a0bc9) [#1974](https://github.com/commercetools/merchant-center-application-kit/pull/1974) Thanks [@emmenko](https://github.com/emmenko)! - Add `PublicPageLayout` component.

### Patch Changes

- Updated dependencies [[`d86c2e8`](https://github.com/commercetools/merchant-center-application-kit/commit/d86c2e86179aca2729d92fa18545241e2bf36fca)]:
  - @commercetools-frontend/application-shell-connectors@17.10.0
  - @commercetools-frontend/constants@17.10.0
  - @commercetools-frontend/i18n@17.10.0
  - @commercetools-frontend/l10n@17.10.0

## 17.9.1

### Patch Changes

- Updated dependencies [[`d70e533`](https://github.com/commercetools/merchant-center-application-kit/commit/d70e533e7143dcb23df7b3f80eaec2741b7db1f3)]:
  - @commercetools-frontend/l10n@17.9.1

## 17.9.0

### Patch Changes

- Updated dependencies [[`4f7e081`](https://github.com/commercetools/merchant-center-application-kit/commit/4f7e081c001e285e8f4c7771894f5d09509daf8e)]:
  - @commercetools-frontend/constants@17.9.0
  - @commercetools-frontend/application-shell-connectors@17.9.0
  - @commercetools-frontend/i18n@17.9.0
  - @commercetools-frontend/l10n@17.9.0

## 17.8.0

### Patch Changes

- [`48a9886`](https://github.com/commercetools/merchant-center-application-kit/commit/48a98861dcf4193041e02e8ac11eb2940826f5d0) [#1954](https://github.com/commercetools/merchant-center-application-kit/pull/1954) Thanks [@tdeekens](https://github.com/tdeekens)! - chore: update dependencies across packages

* [`4971a78`](https://github.com/commercetools/merchant-center-application-kit/commit/4971a78438fb4d2ca5487764192a0bb1ffc3b18e) [#1952](https://github.com/commercetools/merchant-center-application-kit/pull/1952) Thanks [@tdeekens](https://github.com/tdeekens)! - chore: add and apply fixes via manypkg for automatic mono-repo validation

* Updated dependencies [[`48a9886`](https://github.com/commercetools/merchant-center-application-kit/commit/48a98861dcf4193041e02e8ac11eb2940826f5d0), [`4971a78`](https://github.com/commercetools/merchant-center-application-kit/commit/4971a78438fb4d2ca5487764192a0bb1ffc3b18e)]:
  - @commercetools-frontend/application-shell-connectors@17.8.0
  - @commercetools-frontend/i18n@17.8.0
  - @commercetools-frontend/l10n@17.8.0

## 17.7.1

### Patch Changes

- [`f6f3c5e`](https://github.com/commercetools/merchant-center-application-kit/commit/f6f3c5ebd08226fd4eca22aec5c39791cf5c5d6a) [#1935](https://github.com/commercetools/merchant-center-application-kit/pull/1935) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`f6f3c5e`](https://github.com/commercetools/merchant-center-application-kit/commit/f6f3c5ebd08226fd4eca22aec5c39791cf5c5d6a)]:
  - @commercetools-frontend/application-shell-connectors@17.7.1
  - @commercetools-frontend/i18n@17.7.1
  - @commercetools-frontend/l10n@17.7.1

## 17.7.0

### Patch Changes

- [`d74addd`](https://github.com/commercetools/merchant-center-application-kit/commit/d74addd32a5f39d19d6bae1ee31cbf33a35fd04e) [#1914](https://github.com/commercetools/merchant-center-application-kit/pull/1914) Thanks [@adnasa](https://github.com/adnasa)! - add experimental application-components/product-picker, generate new types in application-config, application-shell

- Updated dependencies [[`1ec4379`](https://github.com/commercetools/merchant-center-application-kit/commit/1ec4379938b093d4444ec9e4079524c48afd4a42), [`9746f4b`](https://github.com/commercetools/merchant-center-application-kit/commit/9746f4b992dd764599ca7bc7702e92b73dde739a), [`b9fe353`](https://github.com/commercetools/merchant-center-application-kit/commit/b9fe353046fc6998c2bb43c80609db07cb88900a)]:
  - @commercetools-frontend/application-shell-connectors@17.7.0
  - @commercetools-frontend/l10n@17.7.0

## 17.6.2

### Patch Changes

- [`6819edc`](https://github.com/commercetools/merchant-center-application-kit/commit/6819edc25ef7f4a4d8a30c0c27db93ee4dae187a) [#1915](https://github.com/commercetools/merchant-center-application-kit/pull/1915) Thanks [@emmenko](https://github.com/emmenko)! - Fix prop-types removal regression from production bundles.

* [`1a96e83`](https://github.com/commercetools/merchant-center-application-kit/commit/1a96e831c94250e10de61dee40e682a77313445f) [#1905](https://github.com/commercetools/merchant-center-application-kit/pull/1905) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

* Updated dependencies [[`1a96e83`](https://github.com/commercetools/merchant-center-application-kit/commit/1a96e831c94250e10de61dee40e682a77313445f)]:
  - @commercetools-frontend/i18n@17.6.2

## 17.6.0

### Minor Changes

- [`81a274c`](https://github.com/commercetools/merchant-center-application-kit/commit/81a274c6abd5f3725e7698fa37004b9647549e41) [#1897](https://github.com/commercetools/merchant-center-application-kit/pull/1897) Thanks [@jonnybel](https://github.com/jonnybel)! - Add support for the new horizontal constraint options from UI-Kit to the `size` prop of `<ConfirmationDialog>`, `<FormDialog>`, and `<InfoDialog>` components.

### Patch Changes

- [`2287813`](https://github.com/commercetools/merchant-center-application-kit/commit/2287813c19a54b7edb7005d417c5f6a7b34cad1f) [#1871](https://github.com/commercetools/merchant-center-application-kit/pull/1871) Thanks [@emmenko](https://github.com/emmenko)! - Compile and bundle packages using [preconstruct](https://preconstruct.tools)

- Updated dependencies [[`2287813`](https://github.com/commercetools/merchant-center-application-kit/commit/2287813c19a54b7edb7005d417c5f6a7b34cad1f)]:
  - @commercetools-frontend/constants@17.6.0
  - @commercetools-frontend/i18n@17.6.0

## 17.5.0

### Patch Changes

- [`bf5f71e`](https://github.com/commercetools/merchant-center-application-kit/commit/bf5f71e663a91d68d777d26ed3145bc96bbf2aa4) [#1896](https://github.com/commercetools/merchant-center-application-kit/pull/1896) Thanks [@emmenko](https://github.com/emmenko)! - Update docs-kit dependencies to v11, which supports emotion v11. As a result, the appkit bundles are using the correct emotion dependencies.

## 17.4.1

### Patch Changes

- [`636fc45`](https://github.com/commercetools/merchant-center-application-kit/commit/636fc45c0d53544a90b0977b2212ec3a8aec8b94) [#1887](https://github.com/commercetools/merchant-center-application-kit/pull/1887) Thanks [@adnasa](https://github.com/adnasa)! - upgrade ui-kit, which includes the new [horizontal constraint changes](https://github.com/commercetools/ui-kit/pull/1632).

* [`d832bd4`](https://github.com/commercetools/merchant-center-application-kit/commit/d832bd44c354aaf2374c0c75c9050c673998ff32) [#1876](https://github.com/commercetools/merchant-center-application-kit/pull/1876) Thanks [@renovate](https://github.com/apps/renovate)! - Migrate to emotion v11. https://emotion.sh/docs/emotion-11

- [`ec9e10f`](https://github.com/commercetools/merchant-center-application-kit/commit/ec9e10fde15351cc7cb825aaebb53cdb6e00e0d9) [#1889](https://github.com/commercetools/merchant-center-application-kit/pull/1889) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

- Updated dependencies [[`636fc45`](https://github.com/commercetools/merchant-center-application-kit/commit/636fc45c0d53544a90b0977b2212ec3a8aec8b94), [`ec9e10f`](https://github.com/commercetools/merchant-center-application-kit/commit/ec9e10fde15351cc7cb825aaebb53cdb6e00e0d9)]:
  - @commercetools-frontend/i18n@17.4.1

## 17.3.1

### Patch Changes

- [`89c4464`](https://github.com/commercetools/merchant-center-application-kit/commit/89c4464c334dd6c3922d031872286ad3bea8cf67) [#1872](https://github.com/commercetools/merchant-center-application-kit/pull/1872) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

- Updated dependencies [[`89c4464`](https://github.com/commercetools/merchant-center-application-kit/commit/89c4464c334dd6c3922d031872286ad3bea8cf67)]:
  - @commercetools-frontend/i18n@17.3.1

## 17.3.0

### Patch Changes

- [`71c9111`](https://github.com/commercetools/merchant-center-application-kit/commit/71c9111308832009d1a27e91e4f2d2da4c53367c) [#1866](https://github.com/commercetools/merchant-center-application-kit/pull/1866) Thanks [@emmenko](https://github.com/emmenko)! - Update to uikit v10.39.8

- Updated dependencies [[`71c9111`](https://github.com/commercetools/merchant-center-application-kit/commit/71c9111308832009d1a27e91e4f2d2da4c53367c)]:
  - @commercetools-frontend/assets@17.3.0
  - @commercetools-frontend/constants@17.3.0
  - @commercetools-frontend/i18n@17.3.0

## 17.2.1

### Patch Changes

- [`310e98c`](https://github.com/commercetools/merchant-center-application-kit/commit/310e98c39c0b6479175b7685b3f29ea0a5baa22b) Thanks [@emmenko](https://github.com/emmenko)! - Update dependencies (https://github.com/commercetools/merchant-center-application-kit/pull/1857)

- Updated dependencies [[`310e98c`](https://github.com/commercetools/merchant-center-application-kit/commit/310e98c39c0b6479175b7685b3f29ea0a5baa22b)]:
  - @commercetools-frontend/constants@17.2.1
  - @commercetools-frontend/i18n@17.2.1

## 17.2.0

### Patch Changes

- [`e0ec004`](https://github.com/commercetools/merchant-center-application-kit/commit/e0ec004d611f93b24f015120d09f6f18389b219f) [#1854](https://github.com/commercetools/merchant-center-application-kit/pull/1854) Thanks [@emmenko](https://github.com/emmenko)! - chore: update deps

- Updated dependencies [[`e0ec004`](https://github.com/commercetools/merchant-center-application-kit/commit/e0ec004d611f93b24f015120d09f6f18389b219f), [`e519929`](https://github.com/commercetools/merchant-center-application-kit/commit/e519929415f225ff28731f068bebb8facad868f8)]:
  - @commercetools-frontend/assets@17.2.0
  - @commercetools-frontend/constants@17.2.0
  - @commercetools-frontend/i18n@17.2.0

## 17.1.1

### Patch Changes

- Updated dependencies [[`bacc091`](https://github.com/commercetools/merchant-center-application-kit/commit/bacc091506dedb58fadaa4008fc93381a5e9b212)]:
  - @commercetools-frontend/constants@17.1.1
  - @commercetools-frontend/i18n@17.1.1

## 17.1.0

### Patch Changes

- Updated dependencies [[`5d9d5da`](https://github.com/commercetools/merchant-center-application-kit/commit/5d9d5da44364fe5590b67be21ac3630e177326e3), [`6059b9a`](https://github.com/commercetools/merchant-center-application-kit/commit/6059b9af35fbee646d008c393578c83795f10b4f)]:
  - @commercetools-frontend/i18n@17.1.0
  - @commercetools-frontend/constants@17.1.0

## 17.0.1

### Patch Changes

- [`71c5f78`](https://github.com/commercetools/merchant-center-application-kit/commit/71c5f7875c7476e34b65d37046d48ca47e96f12e) [#1795](https://github.com/commercetools/merchant-center-application-kit/pull/1795) Thanks [@renovate](https://github.com/apps/renovate)! - update dependencies

- Updated dependencies [[`71c5f78`](https://github.com/commercetools/merchant-center-application-kit/commit/71c5f7875c7476e34b65d37046d48ca47e96f12e)]:
  - @commercetools-frontend/constants@17.0.1
  - @commercetools-frontend/i18n@17.0.1

## 17.0.0

### Patch Changes

- [`633d8c7`](https://github.com/commercetools/merchant-center-application-kit/commit/633d8c7b8ddc2f25128d8249579b7bb287a62e30) [#1805](https://github.com/commercetools/merchant-center-application-kit/pull/1805) Thanks [@emmenko](https://github.com/emmenko)! - update deps

- Updated dependencies [[`d883e96`](https://github.com/commercetools/merchant-center-application-kit/commit/d883e96ffd076788256d33d833e7f69ffc39f3ac), [`633d8c7`](https://github.com/commercetools/merchant-center-application-kit/commit/633d8c7b8ddc2f25128d8249579b7bb287a62e30)]:
  - @commercetools-frontend/constants@17.0.0
  - @commercetools-frontend/i18n@17.0.0

## 16.18.0

### Patch Changes

- [`8cdb025`](https://github.com/commercetools/merchant-center-application-kit/commit/8cdb02591b718406c910a2c4128d4be3dfe24785) [#1776](https://github.com/commercetools/merchant-center-application-kit/pull/1776) Thanks [@renovate](https://github.com/apps/renovate)! - update deps

- Updated dependencies [[`8cdb025`](https://github.com/commercetools/merchant-center-application-kit/commit/8cdb02591b718406c910a2c4128d4be3dfe24785)]:
  - @commercetools-frontend/i18n@16.18.0

## 16.17.2

### Patch Changes

- [`0c4d950`](https://github.com/commercetools/merchant-center-application-kit/commit/0c4d95061a09a8cb5f8b4cf7b1b0276e4cc5c50c) [#1767](https://github.com/commercetools/merchant-center-application-kit/pull/1767) Thanks [@adnasa](https://github.com/adnasa)! - update ui-kit to 10.35.1

* [`9752622`](https://github.com/commercetools/merchant-center-application-kit/commit/9752622b7422e821bb62d61af360a01f6994dc6b) [#1758](https://github.com/commercetools/merchant-center-application-kit/pull/1758) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

## 16.17.0

### Patch Changes

- [`786c697`](https://github.com/commercetools/merchant-center-application-kit/commit/786c6978c1febf927db6b45c758498b72e8e48be) [#1745](https://github.com/commercetools/merchant-center-application-kit/pull/1745) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

* [`9bc8558`](https://github.com/commercetools/merchant-center-application-kit/commit/9bc85581d336c7d75fda5dc82a1c02f32f16c1fb) [#1704](https://github.com/commercetools/merchant-center-application-kit/pull/1704) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

* Updated dependencies [[`786c697`](https://github.com/commercetools/merchant-center-application-kit/commit/786c6978c1febf927db6b45c758498b72e8e48be), [`9bc8558`](https://github.com/commercetools/merchant-center-application-kit/commit/9bc85581d336c7d75fda5dc82a1c02f32f16c1fb)]:
  - @commercetools-frontend/i18n@16.17.0

## 16.16.5

### Patch Changes

- Updated dependencies [[`4c54f6d`](https://github.com/commercetools/merchant-center-application-kit/commit/4c54f6d88bc7a9107d721afd1e38d66a3eb4577d)]:
  - @commercetools-frontend/i18n@16.16.5

## 16.16.4

### Patch Changes

- Updated dependencies []:
  - @commercetools-frontend/i18n@16.16.4

## 16.16.2

### Patch Changes

- Updated dependencies [[`4290f63`](https://github.com/commercetools/merchant-center-application-kit/commit/4290f63f89e0d394176ed36c9bb436ac7228d66d)]:
  - @commercetools-frontend/i18n@16.16.2

## 16.16.1

### Patch Changes

- [`bc15ac2`](https://github.com/commercetools/merchant-center-application-kit/commit/bc15ac2f6d53d4c8e0d53ceb6c1a0e5ba0f5353e) [#1692](https://github.com/commercetools/merchant-center-application-kit/pull/1692) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

- Updated dependencies []:
  - @commercetools-frontend/i18n@16.16.1

## 16.16.0

### Minor Changes

- [`4216b92`](https://github.com/commercetools/merchant-center-application-kit/commit/4216b922fbb39e74ce35f8647d1c4e9ae77909c8) [#1685](https://github.com/commercetools/merchant-center-application-kit/pull/1685) Thanks [@emmenko](https://github.com/emmenko)! - Refactor i18n package to consume compiled data from ui-kit translation messages. Furthermore, the `@commercetools-frontend/i18n` now exposes a `compiled-data` folder as well: `@commercetools-frontend/i18n/compiled-data`.
  This can be used the load pre-compiled messages and thus improving the runtime performance.

  Furthermore, the `mc-scripts extract-intl` command has been deprecated in favor of the more official message extraction with the `@formatjs/cli`: https://formatjs.io/docs/getting-started/message-extraction.

### Patch Changes

- [`f144292`](https://github.com/commercetools/merchant-center-application-kit/commit/f1442921650ca4e6c9bf61ce31bda2b63e72038a) [#1673](https://github.com/commercetools/merchant-center-application-kit/pull/1673) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

* [`211ab69`](https://github.com/commercetools/merchant-center-application-kit/commit/211ab6969a78af5c592c1cc3c3e3ace3199e95cb) [#1689](https://github.com/commercetools/merchant-center-application-kit/pull/1689) Thanks [@emmenko](https://github.com/emmenko)! - Remove emotion dependencies resolutions

* Updated dependencies [[`f144292`](https://github.com/commercetools/merchant-center-application-kit/commit/f1442921650ca4e6c9bf61ce31bda2b63e72038a), [`4216b92`](https://github.com/commercetools/merchant-center-application-kit/commit/4216b922fbb39e74ce35f8647d1c4e9ae77909c8)]:
  - @commercetools-frontend/constants@16.16.0
  - @commercetools-frontend/i18n@16.16.0

## 16.15.9

### Patch Changes

- Updated dependencies [[`a0ae954`](https://github.com/commercetools/merchant-center-application-kit/commit/a0ae9543c139bfa4cde619153082b400d953dfa5), [`564cd91`](https://github.com/commercetools/merchant-center-application-kit/commit/564cd9186d23ea34886d1c41718486e16d3ca90e)]:
  - @commercetools-frontend/i18n@16.15.9
  - @commercetools-frontend/constants@16.15.9

## 16.15.8

### Patch Changes

- [`c62261f`](https://github.com/commercetools/merchant-center-application-kit/commit/c62261f80e17fb63467eed6328e41764d3e9a50e) [#1653](https://github.com/commercetools/merchant-center-application-kit/pull/1653) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies and regenerate l10n data based on CLDR v37

- Updated dependencies []:
  - @commercetools-frontend/i18n@16.15.8

## 16.15.3

### Patch Changes

- Updated dependencies [[`6d98245`](https://github.com/commercetools/merchant-center-application-kit/commit/6d98245615ddb83e805e5cc2cc0620920b4a71c7)]:
  - @commercetools-frontend/assets@16.15.3
  - @commercetools-frontend/constants@16.15.3
  - @commercetools-frontend/i18n@16.15.3

## 16.15.2

### Patch Changes

- [`0f3dcc3`](https://github.com/commercetools/merchant-center-application-kit/commit/0f3dcc38c81a5fb3c668faecce9a13057f66a66b) [#1638](https://github.com/commercetools/merchant-center-application-kit/pull/1638) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`0f3dcc3`](https://github.com/commercetools/merchant-center-application-kit/commit/0f3dcc38c81a5fb3c668faecce9a13057f66a66b)]:
  - @commercetools-frontend/constants@16.15.2
  - @commercetools-frontend/i18n@16.15.2

## 16.15.0

### Patch Changes

- [`cc8b37b`](https://github.com/commercetools/merchant-center-application-kit/commit/cc8b37bf85d4683a605a6c3233100627e670ebe7) [#1627](https://github.com/commercetools/merchant-center-application-kit/pull/1627) Thanks [@renovate](https://github.com/apps/renovate)! - chore: update dependencies

- Updated dependencies [[`33baf25`](https://github.com/commercetools/merchant-center-application-kit/commit/33baf25a5990d7bb292e88e4040e11bff4669b2c)]:
  - @commercetools-frontend/constants@16.15.0
  - @commercetools-frontend/i18n@16.15.0

## 16.14.0

### Minor Changes

- [`364e711`](https://github.com/commercetools/merchant-center-application-kit/commit/364e71195f9886d30f907b29f8b03eb650df71e5) [#1621](https://github.com/commercetools/merchant-center-application-kit/pull/1621) Thanks [@renovate](https://github.com/apps/renovate)! - feat(deps: add support for react-intl v5 through peer dependencies
  fix(deps): update dependency react-intl to v5

### Patch Changes

- [`779100b`](https://github.com/commercetools/merchant-center-application-kit/commit/779100b432ad448eefec311f31f87891f35489f6) [#1608](https://github.com/commercetools/merchant-center-application-kit/pull/1608) Thanks [@renovate](https://github.com/apps/renovate)! - Update all dependencies

* [`4168061`](https://github.com/commercetools/merchant-center-application-kit/commit/41680612042d476422776e5eaa254450bf874581) [#1618](https://github.com/commercetools/merchant-center-application-kit/pull/1618) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

* Updated dependencies [[`4168061`](https://github.com/commercetools/merchant-center-application-kit/commit/41680612042d476422776e5eaa254450bf874581)]:
  - @commercetools-frontend/constants@16.14.0
  - @commercetools-frontend/i18n@16.14.0

## 16.13.2

### Patch Changes

- Updated dependencies [[`7fbb076`](https://github.com/commercetools/merchant-center-application-kit/commit/7fbb0760a6573396d9038d5e2109ad25632c0392), [`faf980d`](https://github.com/commercetools/merchant-center-application-kit/commit/faf980ddb23827baba79faa4fb4e4f004922edd2)]:
  - @commercetools-frontend/i18n@16.13.2

## 16.13.0

### Minor Changes

- [`f70fed0`](https://github.com/commercetools/merchant-center-application-kit/commit/f70fed0e1332d1cc285bf832aec5e3dcbe325546) [#1595](https://github.com/commercetools/merchant-center-application-kit/pull/1595) Thanks [@Rombelirk](https://github.com/Rombelirk)! - refactor(application-components, visual-testing-app): migrate PageUnauthorized component to AppKit

## 16.12.0

### Minor Changes

- [`053ae10`](https://github.com/commercetools/merchant-center-application-kit/commit/053ae101588c75410aaa7cf4e17848fa8e22cfef) [#1583](https://github.com/commercetools/merchant-center-application-kit/pull/1583) Thanks [@tdeekens](https://github.com/tdeekens)! - feat(app-shell): to add label to maintenance page layouts

### Patch Changes

- [`fa6386c`](https://github.com/commercetools/merchant-center-application-kit/commit/fa6386c347df0505235c199232353bc315a47c81) [#1587](https://github.com/commercetools/merchant-center-application-kit/pull/1587) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`fa6386c`](https://github.com/commercetools/merchant-center-application-kit/commit/fa6386c347df0505235c199232353bc315a47c81)]:
  - @commercetools-frontend/constants@16.12.0
  - @commercetools-frontend/i18n@16.12.0

## 16.10.0

### Patch Changes

- Updated dependencies [[`ab6f011`](https://github.com/commercetools/merchant-center-application-kit/commit/ab6f011d2988d25364269f737aa91a3b9c920f00)]:
  - @commercetools-frontend/i18n@16.10.0

## 16.9.2

### Patch Changes

- Updated dependencies [[`fcdf604`](https://github.com/commercetools/merchant-center-application-kit/commit/fcdf604b1daba48e0617c0db321572206ba79afe), [`77c06ea`](https://github.com/commercetools/merchant-center-application-kit/commit/77c06ea17a56e2bd48793f5e1b0bba95b0dc3d27)]:
  - @commercetools-frontend/i18n@16.9.2

## 16.9.1

### Patch Changes

- [`f92ec54`](https://github.com/commercetools/merchant-center-application-kit/commit/f92ec54e78edb668e8dff53342e8542e96d8c319) [#1551](https://github.com/commercetools/merchant-center-application-kit/pull/1551) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`f92ec54`](https://github.com/commercetools/merchant-center-application-kit/commit/f92ec54e78edb668e8dff53342e8542e96d8c319)]:
  - @commercetools-frontend/assets@16.9.1
  - @commercetools-frontend/constants@16.9.1
  - @commercetools-frontend/i18n@16.9.1

## 16.9.0

### Minor Changes

- [`96ab311`](https://github.com/commercetools/merchant-center-application-kit/commit/96ab3114a4c00b192763feaeedb68c1e3e804c3e) [#1533](https://github.com/commercetools/merchant-center-application-kit/pull/1533) Thanks [@emmenko](https://github.com/emmenko)! - Upgrade to `react-intl` v4. See also https://formatjs.io/docs/react-intl/upgrade-guide-4x

  We updated the peer dependency range to support both `v3` and `v4`.

### Patch Changes

- [`ccbabfd`](https://github.com/commercetools/merchant-center-application-kit/commit/ccbabfdc75972aedcc12e833cc958b5585cb6d60) [#1549](https://github.com/commercetools/merchant-center-application-kit/pull/1549) Thanks [@tdeekens](https://github.com/tdeekens)! - chore: update deps to prepare for release

- Updated dependencies [[`2f6f7ba`](https://github.com/commercetools/merchant-center-application-kit/commit/2f6f7bad4970a6b38b39df58fe6fedb98cb62873)]:
  - @commercetools-frontend/i18n@16.9.0

## 16.8.8

### Patch Changes

- [`0925da6`](https://github.com/commercetools/merchant-center-application-kit/commit/0925da6f11e35cc712cc12337716f846a67c0e4c) [#1537](https://github.com/commercetools/merchant-center-application-kit/pull/1537) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`0925da6`](https://github.com/commercetools/merchant-center-application-kit/commit/0925da6f11e35cc712cc12337716f846a67c0e4c)]:
  - @commercetools-frontend/constants@16.8.8
  - @commercetools-frontend/i18n@16.8.8

## 16.8.6

### Patch Changes

- [`9391762`](https://github.com/commercetools/merchant-center-application-kit/commit/939176298df3558970a267b6e6478051a355ffae) [#1530](https://github.com/commercetools/merchant-center-application-kit/pull/1530) Thanks [@emmenko](https://github.com/emmenko)! - Update `@commercetools-uikit/*` packages to `10.21.0`

- Updated dependencies [[`9391762`](https://github.com/commercetools/merchant-center-application-kit/commit/939176298df3558970a267b6e6478051a355ffae)]:
  - @commercetools-frontend/assets@16.8.6
  - @commercetools-frontend/constants@16.8.6
  - @commercetools-frontend/i18n@16.8.6

## 16.8.5

### Patch Changes

- [`a66fb1f`](https://github.com/commercetools/merchant-center-application-kit/commit/a66fb1f37a06271b0fad0b2a3f6ea41c61455f0e) [#1518](https://github.com/commercetools/merchant-center-application-kit/pull/1518) Thanks [@tdeekens](https://github.com/tdeekens)! - Update remaining dependencies

## 16.8.4

### Patch Changes

- Updated dependencies [[`6ffe293`](https://github.com/commercetools/merchant-center-application-kit/commit/6ffe29312433e357ac6c57ce39e98cf9cba49ba5)]:
  - @commercetools-frontend/i18n@16.8.4

## 16.8.3

### Patch Changes

- Updated dependencies [[`10c9a89`](https://github.com/commercetools/merchant-center-application-kit/commit/10c9a89ce96c1748e84505e65266577fbea890e3)]:
  - @commercetools-frontend/constants@16.8.3
  - @commercetools-frontend/i18n@16.8.3
