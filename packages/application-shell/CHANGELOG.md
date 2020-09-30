# @commercetools-frontend/application-shell

## 16.17.3

### Patch Changes

- [`9c957e7`](https://github.com/commercetools/merchant-center-application-kit/commit/9c957e797ef55786c8d8c678a663338be58b694a) [#1771](https://github.com/commercetools/merchant-center-application-kit/pull/1771) Thanks [@stephsprinkle](https://github.com/stephsprinkle)! - fix(navbar): timing of updating menu open local storage to eliminate navbar state change during window resize

## 16.17.2

### Patch Changes

- [`9e4870f`](https://github.com/commercetools/merchant-center-application-kit/commit/9e4870fe0c3f53c372036374e10a51bee7835f95) [#1764](https://github.com/commercetools/merchant-center-application-kit/pull/1764) Thanks [@tdeekens](https://github.com/tdeekens)! - fix(app-shell): to handle errors without extentions property

* [`0c4d950`](https://github.com/commercetools/merchant-center-application-kit/commit/0c4d95061a09a8cb5f8b4cf7b1b0276e4cc5c50c) [#1767](https://github.com/commercetools/merchant-center-application-kit/pull/1767) Thanks [@adnasa](https://github.com/adnasa)! - update ui-kit to 10.35.1

- [`9752622`](https://github.com/commercetools/merchant-center-application-kit/commit/9752622b7422e821bb62d61af360a01f6994dc6b) [#1758](https://github.com/commercetools/merchant-center-application-kit/pull/1758) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`0c4d950`](https://github.com/commercetools/merchant-center-application-kit/commit/0c4d95061a09a8cb5f8b4cf7b1b0276e4cc5c50c), [`9752622`](https://github.com/commercetools/merchant-center-application-kit/commit/9752622b7422e821bb62d61af360a01f6994dc6b)]:
  - @commercetools-frontend/application-components@16.17.2
  - @commercetools-frontend/react-notifications@16.17.2
  - @commercetools-frontend/l10n@16.17.2

## 16.17.1

### Patch Changes

- [`0c4cc95`](https://github.com/commercetools/merchant-center-application-kit/commit/0c4cc9524747fe43ec4768fdaebe1acc4959f1a8) [#1756](https://github.com/commercetools/merchant-center-application-kit/pull/1756) Thanks [@tdeekens](https://github.com/tdeekens)! - fix(app-shell): error link to support opting out of token retry

## 16.17.0

### Minor Changes

- [`2c0bd66`](https://github.com/commercetools/merchant-center-application-kit/commit/2c0bd66c90fe64ad15397029e05146c0a04ef331) [#1755](https://github.com/commercetools/merchant-center-application-kit/pull/1755) Thanks [@tdeekens](https://github.com/tdeekens)! - feat(app-shell): add ability to `skipTokenRetry` for Apollo queries.

  The Merchant Center API Gateway assigns a commercetools platform API token in order to access the commercetools HTTP APIs. The access token eventually expires, causing requests to fail with HTTP `401`.
  A Custom Application comes with a built-in mechanism to automatically retries unauthorized requests by forcing the Merchant Center API Gateway to assign a new valid API token. This retry mechanism is configured for Apollo queries for certain GraphQL APIs.

  However, it is useful for some requests to disable this mechanism to avoid uncalled-for network requests. This is done by specifying a `skipTokenRetry` property on the Apollo query `context` object.

  You can skip the process of token refetching as follows:

  ```js
  const query = useQuery(MyGraphQLQuery, {
    context: { skipTokenRetry: true },
  });
  ```

### Patch Changes

- [`786c697`](https://github.com/commercetools/merchant-center-application-kit/commit/786c6978c1febf927db6b45c758498b72e8e48be) [#1745](https://github.com/commercetools/merchant-center-application-kit/pull/1745) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

* [`ebb2441`](https://github.com/commercetools/merchant-center-application-kit/commit/ebb2441cfb5ee126a1be0ea0add017ec53aefbba) [#1754](https://github.com/commercetools/merchant-center-application-kit/pull/1754) Thanks [@tdeekens](https://github.com/tdeekens)! - fix(application-shell): to support token retry on mc backend graphql …

- [`178ff31`](https://github.com/commercetools/merchant-center-application-kit/commit/178ff317426e0cfcfe1c0adf42a9eada3b134642) [#1734](https://github.com/commercetools/merchant-center-application-kit/pull/1734) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

* [`9bc8558`](https://github.com/commercetools/merchant-center-application-kit/commit/9bc85581d336c7d75fda5dc82a1c02f32f16c1fb) [#1704](https://github.com/commercetools/merchant-center-application-kit/pull/1704) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

* Updated dependencies [[`786c697`](https://github.com/commercetools/merchant-center-application-kit/commit/786c6978c1febf927db6b45c758498b72e8e48be), [`178ff31`](https://github.com/commercetools/merchant-center-application-kit/commit/178ff317426e0cfcfe1c0adf42a9eada3b134642), [`9bc8558`](https://github.com/commercetools/merchant-center-application-kit/commit/9bc85581d336c7d75fda5dc82a1c02f32f16c1fb), [`1fdde03`](https://github.com/commercetools/merchant-center-application-kit/commit/1fdde039f36a0290bfc1c179002cfe6d535f35c0)]:
  - @commercetools-frontend/application-components@16.17.0
  - @commercetools-frontend/i18n@16.17.0
  - @commercetools-frontend/react-notifications@16.17.0
  - @commercetools-frontend/sentry@16.17.0
  - @commercetools-frontend/application-shell-connectors@16.17.0
  - @commercetools-frontend/l10n@16.17.0
  - @commercetools-frontend/permissions@16.17.0

## 16.16.5

### Patch Changes

- Updated dependencies [[`4c54f6d`](https://github.com/commercetools/merchant-center-application-kit/commit/4c54f6d88bc7a9107d721afd1e38d66a3eb4577d), [`3d38e5e`](https://github.com/commercetools/merchant-center-application-kit/commit/3d38e5e536b2ef410f796752b6f9926479cd7017)]:
  - @commercetools-frontend/i18n@16.16.5
  - @commercetools-frontend/react-notifications@16.16.5
  - @commercetools-frontend/application-components@16.16.5

## 16.16.4

### Patch Changes

- [`d8915a8`](https://github.com/commercetools/merchant-center-application-kit/commit/d8915a8b29ac940839720d5912a1ef0050b9ada5) [#1713](https://github.com/commercetools/merchant-center-application-kit/pull/1713) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update dependency @testing-library/react to v11

  Added support for both @testing-library/react to v11 and v10.

* [`4fff00c`](https://github.com/commercetools/merchant-center-application-kit/commit/4fff00c24bf74d853170400951cfb1892567f313) [#1717](https://github.com/commercetools/merchant-center-application-kit/pull/1717) Thanks [@emmenko](https://github.com/emmenko)! - Update Sentry packages and fix wrong configuration option (`allowUrls` instead of `denyUrls`)

* Updated dependencies [[`d8915a8`](https://github.com/commercetools/merchant-center-application-kit/commit/d8915a8b29ac940839720d5912a1ef0050b9ada5), [`4fff00c`](https://github.com/commercetools/merchant-center-application-kit/commit/4fff00c24bf74d853170400951cfb1892567f313)]:
  - @commercetools-frontend/application-shell-connectors@16.16.4
  - @commercetools-frontend/react-notifications@16.16.4
  - @commercetools-frontend/sentry@16.16.4
  - @commercetools-frontend/permissions@16.16.4
  - @commercetools-frontend/i18n@16.16.4
  - @commercetools-frontend/l10n@16.16.4
  - @commercetools-frontend/application-components@16.16.4

## 16.16.3

### Patch Changes

- [`67e5e2c`](https://github.com/commercetools/merchant-center-application-kit/commit/67e5e2ccbddfc3df5fe2cea23f02c83d2bdcc73b) [#1698](https://github.com/commercetools/merchant-center-application-kit/pull/1698) Thanks [@emmenko](https://github.com/emmenko)! - test(app-shell): migrate tests to use msw, instead of custom graphql mock server

## 16.16.2

### Patch Changes

- [`b4f2bfd`](https://github.com/commercetools/merchant-center-application-kit/commit/b4f2bfd34579f7a24615171aeedb47afd6fbc16f) [#1699](https://github.com/commercetools/merchant-center-application-kit/pull/1699) Thanks [@tdeekens](https://github.com/tdeekens)! - chore: update flopflip adapters

- Updated dependencies [[`4290f63`](https://github.com/commercetools/merchant-center-application-kit/commit/4290f63f89e0d394176ed36c9bb436ac7228d66d)]:
  - @commercetools-frontend/i18n@16.16.2
  - @commercetools-frontend/application-components@16.16.2

## 16.16.1

### Patch Changes

- [`bc15ac2`](https://github.com/commercetools/merchant-center-application-kit/commit/bc15ac2f6d53d4c8e0d53ceb6c1a0e5ba0f5353e) [#1692](https://github.com/commercetools/merchant-center-application-kit/pull/1692) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

* [`f23655a`](https://github.com/commercetools/merchant-center-application-kit/commit/f23655a681fd54fca9757e0b62727c38aaa813ad) [#1552](https://github.com/commercetools/merchant-center-application-kit/pull/1552) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update dependency graphql-cli to v4

* Updated dependencies [[`bc15ac2`](https://github.com/commercetools/merchant-center-application-kit/commit/bc15ac2f6d53d4c8e0d53ceb6c1a0e5ba0f5353e), [`f23655a`](https://github.com/commercetools/merchant-center-application-kit/commit/f23655a681fd54fca9757e0b62727c38aaa813ad)]:
  - @commercetools-frontend/application-components@16.16.1
  - @commercetools-frontend/application-shell-connectors@16.16.1
  - @commercetools-frontend/react-notifications@16.16.1
  - @commercetools-frontend/sdk@16.16.1
  - @commercetools-frontend/sentry@16.16.1
  - @commercetools-frontend/permissions@16.16.1
  - @commercetools-frontend/i18n@16.16.1
  - @commercetools-frontend/l10n@16.16.1

## 16.16.0

### Minor Changes

- [`4216b92`](https://github.com/commercetools/merchant-center-application-kit/commit/4216b922fbb39e74ce35f8647d1c4e9ae77909c8) [#1685](https://github.com/commercetools/merchant-center-application-kit/pull/1685) Thanks [@emmenko](https://github.com/emmenko)! - Refactor i18n package to consume compiled data from ui-kit translation messages. Furthermore, the `@commercetools-frontend/i18n` now exposes a `compiled-data` folder as well: `@commercetools-frontend/i18n/compiled-data`.
  This can be used the load pre-compiled messages and thus improving the runtime performance.

  Furthermore, the `mc-scripts extract-intl` command has been deprecated in favor of the more official message extraction with the `@formatjs/cli`: https://formatjs.io/docs/getting-started/message-extraction.

### Patch Changes

- [`f144292`](https://github.com/commercetools/merchant-center-application-kit/commit/f1442921650ca4e6c9bf61ce31bda2b63e72038a) [#1673](https://github.com/commercetools/merchant-center-application-kit/pull/1673) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

* [`211ab69`](https://github.com/commercetools/merchant-center-application-kit/commit/211ab6969a78af5c592c1cc3c3e3ace3199e95cb) [#1689](https://github.com/commercetools/merchant-center-application-kit/pull/1689) Thanks [@emmenko](https://github.com/emmenko)! - Remove emotion dependencies resolutions

- [`74d43d2`](https://github.com/commercetools/merchant-center-application-kit/commit/74d43d2abe7efa085780692d8a364de4aaad7278) [#1690](https://github.com/commercetools/merchant-center-application-kit/pull/1690) Thanks [@tdeekens](https://github.com/tdeekens)! - fix: to re-export the launchdarkly adapter

- Updated dependencies [[`f144292`](https://github.com/commercetools/merchant-center-application-kit/commit/f1442921650ca4e6c9bf61ce31bda2b63e72038a), [`211ab69`](https://github.com/commercetools/merchant-center-application-kit/commit/211ab6969a78af5c592c1cc3c3e3ace3199e95cb), [`4216b92`](https://github.com/commercetools/merchant-center-application-kit/commit/4216b922fbb39e74ce35f8647d1c4e9ae77909c8)]:
  - @commercetools-frontend/actions-global@16.16.0
  - @commercetools-frontend/application-components@16.16.0
  - @commercetools-frontend/application-shell-connectors@16.16.0
  - @commercetools-frontend/browser-history@16.16.0
  - @commercetools-frontend/constants@16.16.0
  - @commercetools-frontend/i18n@16.16.0
  - @commercetools-frontend/l10n@16.16.0
  - @commercetools-frontend/notifications@16.16.0
  - @commercetools-frontend/permissions@16.16.0
  - @commercetools-frontend/react-notifications@16.16.0
  - @commercetools-frontend/sdk@16.16.0
  - @commercetools-frontend/sentry@16.16.0
  - @commercetools-frontend/url-utils@16.16.0

## 16.15.9

### Patch Changes

- [`564cd91`](https://github.com/commercetools/merchant-center-application-kit/commit/564cd9186d23ea34886d1c41718486e16d3ca90e) [#1671](https://github.com/commercetools/merchant-center-application-kit/pull/1671) Thanks [@emmenko](https://github.com/emmenko)! - Allow to overwrite LD client ID via application config.

  > This is mostly useful for internal usage on our staging environments.

* [`9f861cd`](https://github.com/commercetools/merchant-center-application-kit/commit/9f861cdf31017d394f7738c80aa377d977a5460f) [#1667](https://github.com/commercetools/merchant-center-application-kit/pull/1667) Thanks [@emmenko](https://github.com/emmenko)! - Import types using 'import type' syntax

* Updated dependencies [[`a0ae954`](https://github.com/commercetools/merchant-center-application-kit/commit/a0ae9543c139bfa4cde619153082b400d953dfa5), [`564cd91`](https://github.com/commercetools/merchant-center-application-kit/commit/564cd9186d23ea34886d1c41718486e16d3ca90e)]:
  - @commercetools-frontend/i18n@16.15.9
  - @commercetools-frontend/react-notifications@16.15.9
  - @commercetools-frontend/constants@16.15.9
  - @commercetools-frontend/application-components@16.15.9
  - @commercetools-frontend/actions-global@16.15.9
  - @commercetools-frontend/application-shell-connectors@16.15.9
  - @commercetools-frontend/sdk@16.15.9
  - @commercetools-frontend/sentry@16.15.9
  - @commercetools-frontend/permissions@16.15.9
  - @commercetools-frontend/l10n@16.15.9

## 16.15.8

### Patch Changes

- [`c62261f`](https://github.com/commercetools/merchant-center-application-kit/commit/c62261f80e17fb63467eed6328e41764d3e9a50e) [#1653](https://github.com/commercetools/merchant-center-application-kit/pull/1653) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies and regenerate l10n data based on CLDR v37

- Updated dependencies [[`c62261f`](https://github.com/commercetools/merchant-center-application-kit/commit/c62261f80e17fb63467eed6328e41764d3e9a50e), [`bb95246`](https://github.com/commercetools/merchant-center-application-kit/commit/bb95246be446aa0431b3b7d3e48979159e5cbd5c)]:
  - @commercetools-frontend/actions-global@16.15.8
  - @commercetools-frontend/application-components@16.15.8
  - @commercetools-frontend/l10n@16.15.8
  - @commercetools-frontend/react-notifications@16.15.8
  - @commercetools-frontend/sdk@16.15.8
  - @commercetools-frontend/sentry@16.15.8
  - @commercetools-frontend/application-shell-connectors@16.15.8
  - @commercetools-frontend/i18n@16.15.8
  - @commercetools-frontend/permissions@16.15.8

## 16.15.7

### Patch Changes

- [`302e0b8`](https://github.com/commercetools/merchant-center-application-kit/commit/302e0b87ae2e496f23d231ad572c60914699ff85) [#1660](https://github.com/commercetools/merchant-center-application-kit/pull/1660) Thanks [@emmenko](https://github.com/emmenko)! - When using the `<ApplicationShellProvider>` (for **internal usage**, you probably only need the `<ApplicationShell>`), the `environment` prop is not being coerced, when passing it as `environment={window.app}`, causing possible values to be strings (for example `"false"`).

* [`7638609`](https://github.com/commercetools/merchant-center-application-kit/commit/76386095d2097b738b395ec54bb363426002bbff) [#1656](https://github.com/commercetools/merchant-center-application-kit/pull/1656) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update dependency downshift to v6

## 16.15.6

### Patch Changes

- [`2f6ef4a`](https://github.com/commercetools/merchant-center-application-kit/commit/2f6ef4ae637d9e1de78d8358322be5dd2f87868b) [#1651](https://github.com/commercetools/merchant-center-application-kit/pull/1651) Thanks [@emmenko](https://github.com/emmenko)! - Remove unused feature toggle for fetching project extensions.

## 16.15.5

### Patch Changes

- [`9800911`](https://github.com/commercetools/merchant-center-application-kit/commit/9800911fe0523a2a02271950490c4ed15b2c2765) [#1650](https://github.com/commercetools/merchant-center-application-kit/pull/1650) Thanks [@emmenko](https://github.com/emmenko)! - Make coercing environment values a React hook, bail out if the value is not a string.

* [`cd800cd`](https://github.com/commercetools/merchant-center-application-kit/commit/cd800cd4b88729f087ebcb0a13ce32c2ddbbc58b) [#1648](https://github.com/commercetools/merchant-center-application-kit/pull/1648) Thanks [@emmenko](https://github.com/emmenko)! - fix(app-shell): coercing values for stringified array with double escaped quotes

## 16.15.3

### Patch Changes

- [`6d98245`](https://github.com/commercetools/merchant-center-application-kit/commit/6d98245615ddb83e805e5cc2cc0620920b4a71c7) [#1643](https://github.com/commercetools/merchant-center-application-kit/pull/1643) Thanks [@emmenko](https://github.com/emmenko)! - Update copyright date to 2020 in LICENSE files

- Updated dependencies [[`6d98245`](https://github.com/commercetools/merchant-center-application-kit/commit/6d98245615ddb83e805e5cc2cc0620920b4a71c7)]:
  - @commercetools-frontend/actions-global@16.15.3
  - @commercetools-frontend/application-shell-connectors@16.15.3
  - @commercetools-frontend/assets@16.15.3
  - @commercetools-frontend/browser-history@16.15.3
  - @commercetools-frontend/constants@16.15.3
  - @commercetools-frontend/i18n@16.15.3
  - @commercetools-frontend/l10n@16.15.3
  - @commercetools-frontend/notifications@16.15.3
  - @commercetools-frontend/permissions@16.15.3
  - @commercetools-frontend/react-notifications@16.15.3
  - @commercetools-frontend/sdk@16.15.3
  - @commercetools-frontend/sentry@16.15.3
  - @commercetools-frontend/url-utils@16.15.3
  - @commercetools-frontend/application-components@16.15.3

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
