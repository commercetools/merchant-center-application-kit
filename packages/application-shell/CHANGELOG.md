# @commercetools-frontend/application-shell

## 16.15.2

### Patch Changes

- [`0f3dcc3`](https://github.com/commercetools/merchant-center-application-kit/commit/0f3dcc38c81a5fb3c668faecce9a13057f66a66b) [#1638](https://github.com/commercetools/merchant-center-application-kit/pull/1638) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`0f3dcc3`](https://github.com/commercetools/merchant-center-application-kit/commit/0f3dcc38c81a5fb3c668faecce9a13057f66a66b)]:
  - @commercetools-frontend/actions-global@16.15.2
  - @commercetools-frontend/application-components@16.15.2
  - @commercetools-frontend/application-shell-connectors@16.15.2
  - @commercetools-frontend/browser-history@16.15.2
  - @commercetools-frontend/constants@16.15.2
  - @commercetools-frontend/i18n@16.15.2
  - @commercetools-frontend/l10n@16.15.2
  - @commercetools-frontend/notifications@16.15.2
  - @commercetools-frontend/permissions@16.15.2
  - @commercetools-frontend/react-notifications@16.15.2
  - @commercetools-frontend/sdk@16.15.2
  - @commercetools-frontend/sentry@16.15.2
  - @commercetools-frontend/url-utils@16.15.2

## 16.15.0

### Minor Changes

- [`728024c`](https://github.com/commercetools/merchant-center-application-kit/commit/728024c57666d67e997b7342df74cceba511d182) [#1626](https://github.com/commercetools/merchant-center-application-kit/pull/1626) Thanks [@emmenko](https://github.com/emmenko)! - This release introduces the usage of a new configuration file format and marks the deprecation of the `env.json` and `headers.json` files.

  For all the necessary information about migrating to the new configuration file, please [read the release notes](https://docs.commercetools.com/custom-applications/releases/2020-07-16-introducing-a-new-and-simpler-application-config).

### Patch Changes

- [`cc8b37b`](https://github.com/commercetools/merchant-center-application-kit/commit/cc8b37bf85d4683a605a6c3233100627e670ebe7) [#1627](https://github.com/commercetools/merchant-center-application-kit/pull/1627) Thanks [@renovate](https://github.com/apps/renovate)! - chore: update dependencies

- Updated dependencies [[`cc8b37b`](https://github.com/commercetools/merchant-center-application-kit/commit/cc8b37bf85d4683a605a6c3233100627e670ebe7), [`33baf25`](https://github.com/commercetools/merchant-center-application-kit/commit/33baf25a5990d7bb292e88e4040e11bff4669b2c)]:
  - @commercetools-frontend/actions-global@16.15.0
  - @commercetools-frontend/application-components@16.15.0
  - @commercetools-frontend/application-shell-connectors@16.15.0
  - @commercetools-frontend/permissions@16.15.0
  - @commercetools-frontend/react-notifications@16.15.0
  - @commercetools-frontend/sentry@16.15.0
  - @commercetools-frontend/constants@16.15.0
  - @commercetools-frontend/i18n@16.15.0
  - @commercetools-frontend/l10n@16.15.0
  - @commercetools-frontend/sdk@16.15.0

## 16.14.1

### Patch Changes

- [`e154dcc`](https://github.com/commercetools/merchant-center-application-kit/commit/e154dcc18ebeb43a63b9dbb5ce54daca25f9f7d1) [#1624](https://github.com/commercetools/merchant-center-application-kit/pull/1624) Thanks [@emmenko](https://github.com/emmenko)! - Fixes an issue when using the `forward-to` feature with the Apollo Client, where the additional headers pre-configured in `createApolloContextForProxyForwardTo` have been ignored by the Apollo Link.

## 16.14.0

### Minor Changes

- [`364e711`](https://github.com/commercetools/merchant-center-application-kit/commit/364e71195f9886d30f907b29f8b03eb650df71e5) [#1621](https://github.com/commercetools/merchant-center-application-kit/pull/1621) Thanks [@renovate](https://github.com/apps/renovate)! - feat(deps: add support for react-intl v5 through peer dependencies
  fix(deps): update dependency react-intl to v5

### Patch Changes

- [`779100b`](https://github.com/commercetools/merchant-center-application-kit/commit/779100b432ad448eefec311f31f87891f35489f6) [#1608](https://github.com/commercetools/merchant-center-application-kit/pull/1608) Thanks [@renovate](https://github.com/apps/renovate)! - Update all dependencies

* [`387cab5`](https://github.com/commercetools/merchant-center-application-kit/commit/387cab543fd607b72256f759597f90efd10b64c8) [#1614](https://github.com/commercetools/merchant-center-application-kit/pull/1614) Thanks [@emmenko](https://github.com/emmenko)! - Use non oppressive language. The `trackingEventWhitelist` option for the `<ApplicationShell>` component has been deprecated in favor of `trackingEventList`.

- [`4168061`](https://github.com/commercetools/merchant-center-application-kit/commit/41680612042d476422776e5eaa254450bf874581) [#1618](https://github.com/commercetools/merchant-center-application-kit/pull/1618) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`779100b`](https://github.com/commercetools/merchant-center-application-kit/commit/779100b432ad448eefec311f31f87891f35489f6), [`364e711`](https://github.com/commercetools/merchant-center-application-kit/commit/364e71195f9886d30f907b29f8b03eb650df71e5), [`387cab5`](https://github.com/commercetools/merchant-center-application-kit/commit/387cab543fd607b72256f759597f90efd10b64c8), [`4168061`](https://github.com/commercetools/merchant-center-application-kit/commit/41680612042d476422776e5eaa254450bf874581)]:
  - @commercetools-frontend/application-components@16.14.0
  - @commercetools-frontend/application-shell-connectors@16.14.0
  - @commercetools-frontend/react-notifications@16.14.0
  - @commercetools-frontend/sdk@16.14.0
  - @commercetools-frontend/sentry@16.14.0
  - @commercetools-frontend/l10n@16.14.0
  - @commercetools-frontend/actions-global@16.14.0
  - @commercetools-frontend/browser-history@16.14.0
  - @commercetools-frontend/constants@16.14.0
  - @commercetools-frontend/i18n@16.14.0
  - @commercetools-frontend/notifications@16.14.0
  - @commercetools-frontend/permissions@16.14.0
  - @commercetools-frontend/url-utils@16.14.0

## 16.13.2

### Patch Changes

- Updated dependencies [[`7fbb076`](https://github.com/commercetools/merchant-center-application-kit/commit/7fbb0760a6573396d9038d5e2109ad25632c0392), [`faf980d`](https://github.com/commercetools/merchant-center-application-kit/commit/faf980ddb23827baba79faa4fb4e4f004922edd2)]:
  - @commercetools-frontend/i18n@16.13.2
  - @commercetools-frontend/application-components@16.13.2

## 16.13.1

### Patch Changes

- [`0e85200`](https://github.com/commercetools/merchant-center-application-kit/commit/0e8520074143508e0078f8eeb1311bc1e2b6033d) [#1600](https://github.com/commercetools/merchant-center-application-kit/pull/1600) Thanks [@tdeekens](https://github.com/tdeekens)! - feat(app-shell): to allow passing `featureFlag` as variable

## 16.13.0

### Patch Changes

- Updated dependencies [[`f70fed0`](https://github.com/commercetools/merchant-center-application-kit/commit/f70fed0e1332d1cc285bf832aec5e3dcbe325546)]:
  - @commercetools-frontend/application-components@16.13.0

## 16.12.0

### Minor Changes

- [`053ae10`](https://github.com/commercetools/merchant-center-application-kit/commit/053ae101588c75410aaa7cf4e17848fa8e22cfef) [#1583](https://github.com/commercetools/merchant-center-application-kit/pull/1583) Thanks [@tdeekens](https://github.com/tdeekens)! - feat(app-shell): to add label to maintenance page layouts

### Patch Changes

- [`fa6386c`](https://github.com/commercetools/merchant-center-application-kit/commit/fa6386c347df0505235c199232353bc315a47c81) [#1587](https://github.com/commercetools/merchant-center-application-kit/pull/1587) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`053ae10`](https://github.com/commercetools/merchant-center-application-kit/commit/053ae101588c75410aaa7cf4e17848fa8e22cfef), [`fa6386c`](https://github.com/commercetools/merchant-center-application-kit/commit/fa6386c347df0505235c199232353bc315a47c81)]:
  - @commercetools-frontend/application-components@16.12.0
  - @commercetools-frontend/actions-global@16.12.0
  - @commercetools-frontend/application-shell-connectors@16.12.0
  - @commercetools-frontend/browser-history@16.12.0
  - @commercetools-frontend/constants@16.12.0
  - @commercetools-frontend/i18n@16.12.0
  - @commercetools-frontend/l10n@16.12.0
  - @commercetools-frontend/notifications@16.12.0
  - @commercetools-frontend/permissions@16.12.0
  - @commercetools-frontend/react-notifications@16.12.0
  - @commercetools-frontend/sdk@16.12.0
  - @commercetools-frontend/sentry@16.12.0
  - @commercetools-frontend/url-utils@16.12.0

## 16.10.0

### Patch Changes

- [`f8f8609`](https://github.com/commercetools/merchant-center-application-kit/commit/f8f86098687c8cecaaec1b13debabe290b007b58) [#1573](https://github.com/commercetools/merchant-center-application-kit/pull/1573) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

* [`352cc92`](https://github.com/commercetools/merchant-center-application-kit/commit/352cc92eeb1981e6f024fb6d6065cd5a800408f2) [#1571](https://github.com/commercetools/merchant-center-application-kit/pull/1571) Thanks [@tdeekens](https://github.com/tdeekens)! - fix(app-shell): user settings menu link width for testing

- [`ab6f011`](https://github.com/commercetools/merchant-center-application-kit/commit/ab6f011d2988d25364269f737aa91a3b9c920f00) [#1572](https://github.com/commercetools/merchant-center-application-kit/pull/1572) Thanks [@tdeekens](https://github.com/tdeekens)! - fix(app-shell): user settings menu labels for opening and closing menu

- Updated dependencies [[`f8f8609`](https://github.com/commercetools/merchant-center-application-kit/commit/f8f86098687c8cecaaec1b13debabe290b007b58), [`ab6f011`](https://github.com/commercetools/merchant-center-application-kit/commit/ab6f011d2988d25364269f737aa91a3b9c920f00)]:
  - @commercetools-frontend/l10n@16.10.0
  - @commercetools-frontend/sentry@16.10.0
  - @commercetools-frontend/i18n@16.10.0
  - @commercetools-frontend/application-shell-connectors@16.10.0
  - @commercetools-frontend/react-notifications@16.10.0
  - @commercetools-frontend/application-components@16.10.0
  - @commercetools-frontend/permissions@16.10.0

## 16.9.2

### Patch Changes

- [`5992613`](https://github.com/commercetools/merchant-center-application-kit/commit/5992613e512853501581c8757b25642433f8aedd) [#1565](https://github.com/commercetools/merchant-center-application-kit/pull/1565) Thanks [@emmenko](https://github.com/emmenko)! - Ignore certain errors from being reported to Sentry

* [`a21276e`](https://github.com/commercetools/merchant-center-application-kit/commit/a21276e8ce45ce74a15873fe7853d499bcd2a348) [#1559](https://github.com/commercetools/merchant-center-application-kit/pull/1559) Thanks [@emmenko](https://github.com/emmenko)! - Use new hostname scheme in test utils for the default `mcApiUrl` environment value.

* Updated dependencies [[`fcdf604`](https://github.com/commercetools/merchant-center-application-kit/commit/fcdf604b1daba48e0617c0db321572206ba79afe), [`77c06ea`](https://github.com/commercetools/merchant-center-application-kit/commit/77c06ea17a56e2bd48793f5e1b0bba95b0dc3d27)]:
  - @commercetools-frontend/i18n@16.9.2
  - @commercetools-frontend/application-components@16.9.2

## 16.9.1

### Patch Changes

- [`f92ec54`](https://github.com/commercetools/merchant-center-application-kit/commit/f92ec54e78edb668e8dff53342e8542e96d8c319) [#1551](https://github.com/commercetools/merchant-center-application-kit/pull/1551) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

* [`92b1637`](https://github.com/commercetools/merchant-center-application-kit/commit/92b16375d22e0395ae5278bcf874e5532ad8248c) [#1555](https://github.com/commercetools/merchant-center-application-kit/pull/1555) Thanks [@renovate](https://github.com/apps/renovate)! - Remove unnecessary `@types/moment-timezone` package.

* Updated dependencies [[`f92ec54`](https://github.com/commercetools/merchant-center-application-kit/commit/f92ec54e78edb668e8dff53342e8542e96d8c319), [`92b1637`](https://github.com/commercetools/merchant-center-application-kit/commit/92b16375d22e0395ae5278bcf874e5532ad8248c)]:
  - @commercetools-frontend/actions-global@16.9.1
  - @commercetools-frontend/application-components@16.9.1
  - @commercetools-frontend/application-shell-connectors@16.9.1
  - @commercetools-frontend/assets@16.9.1
  - @commercetools-frontend/browser-history@16.9.1
  - @commercetools-frontend/constants@16.9.1
  - @commercetools-frontend/i18n@16.9.1
  - @commercetools-frontend/l10n@16.9.1
  - @commercetools-frontend/notifications@16.9.1
  - @commercetools-frontend/permissions@16.9.1
  - @commercetools-frontend/react-notifications@16.9.1
  - @commercetools-frontend/sdk@16.9.1
  - @commercetools-frontend/sentry@16.9.1
  - @commercetools-frontend/url-utils@16.9.1

## 16.9.0

### Minor Changes

- [`96ab311`](https://github.com/commercetools/merchant-center-application-kit/commit/96ab3114a4c00b192763feaeedb68c1e3e804c3e) [#1533](https://github.com/commercetools/merchant-center-application-kit/pull/1533) Thanks [@emmenko](https://github.com/emmenko)! - Upgrade to `react-intl` v4. See also https://formatjs.io/docs/react-intl/upgrade-guide-4x

  We updated the peer dependency range to support both `v3` and `v4`.

### Patch Changes

- [`b01419d`](https://github.com/commercetools/merchant-center-application-kit/commit/b01419d37881a8d5234ed977364e01c29b92e74b) [#1547](https://github.com/commercetools/merchant-center-application-kit/pull/1547) Thanks [@tdeekens](https://github.com/tdeekens)! - feat(app-shell): fetch organization name with owner

* [`ccbabfd`](https://github.com/commercetools/merchant-center-application-kit/commit/ccbabfdc75972aedcc12e833cc958b5585cb6d60) [#1549](https://github.com/commercetools/merchant-center-application-kit/pull/1549) Thanks [@tdeekens](https://github.com/tdeekens)! - chore: update deps to prepare for release

* Updated dependencies [[`b01419d`](https://github.com/commercetools/merchant-center-application-kit/commit/b01419d37881a8d5234ed977364e01c29b92e74b), [`ccbabfd`](https://github.com/commercetools/merchant-center-application-kit/commit/ccbabfdc75972aedcc12e833cc958b5585cb6d60), [`2f6f7ba`](https://github.com/commercetools/merchant-center-application-kit/commit/2f6f7bad4970a6b38b39df58fe6fedb98cb62873), [`96ab311`](https://github.com/commercetools/merchant-center-application-kit/commit/96ab3114a4c00b192763feaeedb68c1e3e804c3e)]:
  - @commercetools-frontend/application-shell-connectors@16.9.0
  - @commercetools-frontend/permissions@16.9.0
  - @commercetools-frontend/actions-global@16.9.0
  - @commercetools-frontend/application-components@16.9.0
  - @commercetools-frontend/l10n@16.9.0
  - @commercetools-frontend/react-notifications@16.9.0
  - @commercetools-frontend/sdk@16.9.0
  - @commercetools-frontend/sentry@16.9.0
  - @commercetools-frontend/i18n@16.9.0

## 16.8.8

### Patch Changes

- [`0925da6`](https://github.com/commercetools/merchant-center-application-kit/commit/0925da6f11e35cc712cc12337716f846a67c0e4c) [#1537](https://github.com/commercetools/merchant-center-application-kit/pull/1537) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`0925da6`](https://github.com/commercetools/merchant-center-application-kit/commit/0925da6f11e35cc712cc12337716f846a67c0e4c)]:
  - @commercetools-frontend/actions-global@16.8.8
  - @commercetools-frontend/application-components@16.8.8
  - @commercetools-frontend/application-shell-connectors@16.8.8
  - @commercetools-frontend/browser-history@16.8.8
  - @commercetools-frontend/constants@16.8.8
  - @commercetools-frontend/i18n@16.8.8
  - @commercetools-frontend/l10n@16.8.8
  - @commercetools-frontend/notifications@16.8.8
  - @commercetools-frontend/permissions@16.8.8
  - @commercetools-frontend/react-notifications@16.8.8
  - @commercetools-frontend/sdk@16.8.8
  - @commercetools-frontend/sentry@16.8.8
  - @commercetools-frontend/url-utils@16.8.8

## 16.8.7

### Patch Changes

- [`96e411a`](https://github.com/commercetools/merchant-center-application-kit/commit/96e411a95eb07a65aab3648afb79299f0767d36a) [#1524](https://github.com/commercetools/merchant-center-application-kit/pull/1524) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update dependency perfume.js to v5

## 16.8.6

### Patch Changes

- [`9391762`](https://github.com/commercetools/merchant-center-application-kit/commit/939176298df3558970a267b6e6478051a355ffae) [#1530](https://github.com/commercetools/merchant-center-application-kit/pull/1530) Thanks [@emmenko](https://github.com/emmenko)! - Update `@commercetools-uikit/*` packages to `10.21.0`

- Updated dependencies [[`9391762`](https://github.com/commercetools/merchant-center-application-kit/commit/939176298df3558970a267b6e6478051a355ffae)]:
  - @commercetools-frontend/actions-global@16.8.6
  - @commercetools-frontend/application-components@16.8.6
  - @commercetools-frontend/application-shell-connectors@16.8.6
  - @commercetools-frontend/assets@16.8.6
  - @commercetools-frontend/browser-history@16.8.6
  - @commercetools-frontend/constants@16.8.6
  - @commercetools-frontend/i18n@16.8.6
  - @commercetools-frontend/l10n@16.8.6
  - @commercetools-frontend/notifications@16.8.6
  - @commercetools-frontend/permissions@16.8.6
  - @commercetools-frontend/react-notifications@16.8.6
  - @commercetools-frontend/sdk@16.8.6
  - @commercetools-frontend/sentry@16.8.6
  - @commercetools-frontend/url-utils@16.8.6

## 16.8.5

### Patch Changes

- [`a66fb1f`](https://github.com/commercetools/merchant-center-application-kit/commit/a66fb1f37a06271b0fad0b2a3f6ea41c61455f0e) [#1518](https://github.com/commercetools/merchant-center-application-kit/pull/1518) Thanks [@tdeekens](https://github.com/tdeekens)! - chore(deps): update all dependencies

* [`a66fb1f`](https://github.com/commercetools/merchant-center-application-kit/commit/a66fb1f37a06271b0fad0b2a3f6ea41c61455f0e) [#1518](https://github.com/commercetools/merchant-center-application-kit/pull/1518) Thanks [@tdeekens](https://github.com/tdeekens)! - fix(deps): update dependency fuse.js to v6

- [`a66fb1f`](https://github.com/commercetools/merchant-center-application-kit/commit/a66fb1f37a06271b0fad0b2a3f6ea41c61455f0e) [#1518](https://github.com/commercetools/merchant-center-application-kit/pull/1518) Thanks [@tdeekens](https://github.com/tdeekens)! - Update remaining dependencies

- Updated dependencies [[`a66fb1f`](https://github.com/commercetools/merchant-center-application-kit/commit/a66fb1f37a06271b0fad0b2a3f6ea41c61455f0e), [`a66fb1f`](https://github.com/commercetools/merchant-center-application-kit/commit/a66fb1f37a06271b0fad0b2a3f6ea41c61455f0e)]:
  - @commercetools-frontend/sdk@16.8.5
  - @commercetools-frontend/actions-global@16.8.5
  - @commercetools-frontend/application-components@16.8.5
  - @commercetools-frontend/application-shell-connectors@16.8.5
  - @commercetools-frontend/browser-history@16.8.5
  - @commercetools-frontend/permissions@16.8.5
  - @commercetools-frontend/react-notifications@16.8.5

## 16.8.4

### Patch Changes

- [`6ffe293`](https://github.com/commercetools/merchant-center-application-kit/commit/6ffe29312433e357ac6c57ce39e98cf9cba49ba5) [#1508](https://github.com/commercetools/merchant-center-application-kit/pull/1508) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`6ffe293`](https://github.com/commercetools/merchant-center-application-kit/commit/6ffe29312433e357ac6c57ce39e98cf9cba49ba5), [`6ffe293`](https://github.com/commercetools/merchant-center-application-kit/commit/6ffe29312433e357ac6c57ce39e98cf9cba49ba5)]:
  - @commercetools-frontend/i18n@16.8.4
  - @commercetools-frontend/application-shell-connectors@16.8.4
  - @commercetools-frontend/l10n@16.8.4
  - @commercetools-frontend/react-notifications@16.8.4
  - @commercetools-frontend/sdk@16.8.4
  - @commercetools-frontend/application-components@16.8.4
  - @commercetools-frontend/permissions@16.8.4

## 16.8.3

### Patch Changes

- [`10c9a89`](https://github.com/commercetools/merchant-center-application-kit/commit/10c9a89ce96c1748e84505e65266577fbea890e3) [#1503](https://github.com/commercetools/merchant-center-application-kit/pull/1503) Thanks [@emmenko](https://github.com/emmenko)! - Support experimental HTTP header `X-Application-Id`

- Updated dependencies [[`10c9a89`](https://github.com/commercetools/merchant-center-application-kit/commit/10c9a89ce96c1748e84505e65266577fbea890e3)]:
  - @commercetools-frontend/constants@16.8.3
  - @commercetools-frontend/sdk@16.8.3
  - @commercetools-frontend/actions-global@16.8.3
  - @commercetools-frontend/application-components@16.8.3
  - @commercetools-frontend/application-shell-connectors@16.8.3
  - @commercetools-frontend/react-notifications@16.8.3
  - @commercetools-frontend/sentry@16.8.3
  - @commercetools-frontend/permissions@16.8.3
  - @commercetools-frontend/i18n@16.8.3
  - @commercetools-frontend/l10n@16.8.3
