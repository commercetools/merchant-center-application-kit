# @commercetools-frontend/application-shell

## 22.33.0

### Patch Changes

- Updated dependencies [[`87d2686`](https://github.com/commercetools/merchant-center-application-kit/commit/87d268669ed8bfd44ed10658abefefc9728583d8), [`c699f1b`](https://github.com/commercetools/merchant-center-application-kit/commit/c699f1bd797f52764944e18dc5e138f22f25a79b), [`f7fc56c`](https://github.com/commercetools/merchant-center-application-kit/commit/f7fc56cf8444602d71d4648f938752d70ae522a9)]:
  - @commercetools-frontend/i18n@22.33.0
  - @commercetools-frontend/application-config@22.33.0
  - @commercetools-frontend/application-components@22.33.0
  - @commercetools-frontend/application-shell-connectors@22.33.0
  - @commercetools-frontend/react-notifications@22.33.0
  - @commercetools-frontend/permissions@22.33.0
  - @commercetools-frontend/actions-global@22.33.0
  - @commercetools-frontend/assets@22.33.0
  - @commercetools-frontend/browser-history@22.33.0
  - @commercetools-frontend/constants@22.33.0
  - @commercetools-frontend/l10n@22.33.0
  - @commercetools-frontend/notifications@22.33.0
  - @commercetools-frontend/sdk@22.33.0
  - @commercetools-frontend/sentry@22.33.0
  - @commercetools-frontend/url-utils@22.33.0

## 22.32.2

### Patch Changes

- Updated dependencies []:
  - @commercetools-frontend/actions-global@22.32.2
  - @commercetools-frontend/application-components@22.32.2
  - @commercetools-frontend/application-config@22.32.2
  - @commercetools-frontend/application-shell-connectors@22.32.2
  - @commercetools-frontend/assets@22.32.2
  - @commercetools-frontend/browser-history@22.32.2
  - @commercetools-frontend/constants@22.32.2
  - @commercetools-frontend/i18n@22.32.2
  - @commercetools-frontend/l10n@22.32.2
  - @commercetools-frontend/notifications@22.32.2
  - @commercetools-frontend/permissions@22.32.2
  - @commercetools-frontend/react-notifications@22.32.2
  - @commercetools-frontend/sdk@22.32.2
  - @commercetools-frontend/sentry@22.32.2
  - @commercetools-frontend/url-utils@22.32.2

## 22.32.1

### Patch Changes

- [#3600](https://github.com/commercetools/merchant-center-application-kit/pull/3600) [`d50a0ae`](https://github.com/commercetools/merchant-center-application-kit/commit/d50a0aecad6aa4684fdc8bac8af36e2ac008c1ab) Thanks [@ddouglasz](https://github.com/ddouglasz)! - When the submenu has a text link that wraps to the next line, the vertical position of the submenu is adjusted, causing the submenu submenu position to be recalculated and as a result, hidden.
  This change fixes the issue by adding a 12-pixel buffer to the height calculation when determining if the submenu fits within the viewport below the menu item, this value accounts for the padding introduced on link hover.

- [#3603](https://github.com/commercetools/merchant-center-application-kit/pull/3603) [`eb756ff`](https://github.com/commercetools/merchant-center-application-kit/commit/eb756ff6a0333209ab27d01d5fa5ad335c8b892d) Thanks [@tylermorrisford](https://github.com/tylermorrisford)! - Adds the workspaces icon to the app-bar workspaces redirect button.

- [#3601](https://github.com/commercetools/merchant-center-application-kit/pull/3601) [`064635b`](https://github.com/commercetools/merchant-center-application-kit/commit/064635b0454a9b67cebae12d302c55d2da18de1c) Thanks [@mustafaasif2](https://github.com/mustafaasif2)! - Remove case transformations in browser tab titles for Merchant Center

- Updated dependencies [[`eb756ff`](https://github.com/commercetools/merchant-center-application-kit/commit/eb756ff6a0333209ab27d01d5fa5ad335c8b892d)]:
  - @commercetools-frontend/assets@22.32.1
  - @commercetools-frontend/application-components@22.32.1
  - @commercetools-frontend/application-config@22.32.1
  - @commercetools-frontend/react-notifications@22.32.1
  - @commercetools-frontend/actions-global@22.32.1
  - @commercetools-frontend/application-shell-connectors@22.32.1
  - @commercetools-frontend/browser-history@22.32.1
  - @commercetools-frontend/constants@22.32.1
  - @commercetools-frontend/i18n@22.32.1
  - @commercetools-frontend/l10n@22.32.1
  - @commercetools-frontend/notifications@22.32.1
  - @commercetools-frontend/permissions@22.32.1
  - @commercetools-frontend/sdk@22.32.1
  - @commercetools-frontend/sentry@22.32.1
  - @commercetools-frontend/url-utils@22.32.1

## 22.32.0

### Minor Changes

- [#3536](https://github.com/commercetools/merchant-center-application-kit/pull/3536) [`a452e7e`](https://github.com/commercetools/merchant-center-application-kit/commit/a452e7e1ac49f4f4fc82f07243087c4f2aefcead) Thanks [@ddouglasz](https://github.com/ddouglasz)! - Introduce the safe triangle pattern in the main navigation sub navigation to improve diagonal cursor navigation between menu items. This will help users easily navigate diagonally from the main menu item to a submenu item without the submenu closing before the cursor reaches it.

### Patch Changes

- Updated dependencies [[`6fc21a8`](https://github.com/commercetools/merchant-center-application-kit/commit/6fc21a87b45da82e820c86601ceee5374d1eb299)]:
  - @commercetools-frontend/application-components@22.32.0
  - @commercetools-frontend/assets@22.32.0
  - @commercetools-frontend/react-notifications@22.32.0
  - @commercetools-frontend/application-config@22.32.0
  - @commercetools-frontend/actions-global@22.32.0
  - @commercetools-frontend/application-shell-connectors@22.32.0
  - @commercetools-frontend/browser-history@22.32.0
  - @commercetools-frontend/constants@22.32.0
  - @commercetools-frontend/i18n@22.32.0
  - @commercetools-frontend/l10n@22.32.0
  - @commercetools-frontend/notifications@22.32.0
  - @commercetools-frontend/permissions@22.32.0
  - @commercetools-frontend/sdk@22.32.0
  - @commercetools-frontend/sentry@22.32.0
  - @commercetools-frontend/url-utils@22.32.0

## 22.31.0

### Minor Changes

- [#3586](https://github.com/commercetools/merchant-center-application-kit/pull/3586) [`d4a26cd`](https://github.com/commercetools/merchant-center-application-kit/commit/d4a26cd4daba200567486a81b580749a17d648f5) Thanks [@jaikamat](https://github.com/jaikamat)! - Adds functionality to the AppBar component for an ongoing feature effort

### Patch Changes

- [#3591](https://github.com/commercetools/merchant-center-application-kit/pull/3591) [`d0b9f57`](https://github.com/commercetools/merchant-center-application-kit/commit/d0b9f57dd93d33fbb3b8ad95ee678e058b8257c5) Thanks [@emmenko](https://github.com/emmenko)! - Export some internal components

- Updated dependencies [[`2fe2e11`](https://github.com/commercetools/merchant-center-application-kit/commit/2fe2e119982c7fa347f70ac8e203eb1f1e1743b7), [`d4a26cd`](https://github.com/commercetools/merchant-center-application-kit/commit/d4a26cd4daba200567486a81b580749a17d648f5), [`d37e74e`](https://github.com/commercetools/merchant-center-application-kit/commit/d37e74e500026766b1360c7db89798262c128898)]:
  - @commercetools-frontend/application-config@22.31.0
  - @commercetools-frontend/constants@22.31.0
  - @commercetools-frontend/application-components@22.31.0
  - @commercetools-frontend/application-shell-connectors@22.31.0
  - @commercetools-frontend/actions-global@22.31.0
  - @commercetools-frontend/react-notifications@22.31.0
  - @commercetools-frontend/sdk@22.31.0
  - @commercetools-frontend/sentry@22.31.0
  - @commercetools-frontend/permissions@22.31.0
  - @commercetools-frontend/i18n@22.31.0
  - @commercetools-frontend/l10n@22.31.0
  - @commercetools-frontend/assets@22.31.0
  - @commercetools-frontend/browser-history@22.31.0
  - @commercetools-frontend/notifications@22.31.0
  - @commercetools-frontend/url-utils@22.31.0

## 22.30.3

### Patch Changes

- [#3574](https://github.com/commercetools/merchant-center-application-kit/pull/3574) [`1f325ac`](https://github.com/commercetools/merchant-center-application-kit/commit/1f325ac5127a0fe1ff1e0304d32353f691cd097f) Thanks [@renovate](https://github.com/apps/renovate)! - Upgrade to UI Kit v19.9.0, migrate deprecated size props

- Updated dependencies [[`1f325ac`](https://github.com/commercetools/merchant-center-application-kit/commit/1f325ac5127a0fe1ff1e0304d32353f691cd097f)]:
  - @commercetools-frontend/application-components@22.30.3
  - @commercetools-frontend/react-notifications@22.30.3
  - @commercetools-frontend/i18n@22.30.3
  - @commercetools-frontend/actions-global@22.30.3
  - @commercetools-frontend/application-config@22.30.3
  - @commercetools-frontend/application-shell-connectors@22.30.3
  - @commercetools-frontend/assets@22.30.3
  - @commercetools-frontend/browser-history@22.30.3
  - @commercetools-frontend/constants@22.30.3
  - @commercetools-frontend/l10n@22.30.3
  - @commercetools-frontend/notifications@22.30.3
  - @commercetools-frontend/permissions@22.30.3
  - @commercetools-frontend/sdk@22.30.3
  - @commercetools-frontend/sentry@22.30.3
  - @commercetools-frontend/url-utils@22.30.3

## 22.30.2

### Patch Changes

- [#3578](https://github.com/commercetools/merchant-center-application-kit/pull/3578) [`839d185`](https://github.com/commercetools/merchant-center-application-kit/commit/839d185a10eb5a74d781b9b865f7c07b29e1e824) Thanks [@tdeekens](https://github.com/tdeekens)! - Remove usage of query to load menu feature toggles.

- [#3579](https://github.com/commercetools/merchant-center-application-kit/pull/3579) [`ed2158c`](https://github.com/commercetools/merchant-center-application-kit/commit/ed2158cc3b8173cdd86395fccf836b921edd4b1b) Thanks [@emmenko](https://github.com/emmenko)! - Do not fetch project extensions for navbar if user cannot access a project.

- Updated dependencies []:
  - @commercetools-frontend/actions-global@22.30.2
  - @commercetools-frontend/application-components@22.30.2
  - @commercetools-frontend/application-config@22.30.2
  - @commercetools-frontend/application-shell-connectors@22.30.2
  - @commercetools-frontend/assets@22.30.2
  - @commercetools-frontend/browser-history@22.30.2
  - @commercetools-frontend/constants@22.30.2
  - @commercetools-frontend/i18n@22.30.2
  - @commercetools-frontend/l10n@22.30.2
  - @commercetools-frontend/notifications@22.30.2
  - @commercetools-frontend/permissions@22.30.2
  - @commercetools-frontend/react-notifications@22.30.2
  - @commercetools-frontend/sdk@22.30.2
  - @commercetools-frontend/sentry@22.30.2
  - @commercetools-frontend/url-utils@22.30.2

## 22.30.1

### Patch Changes

- [#3576](https://github.com/commercetools/merchant-center-application-kit/pull/3576) [`165d15a`](https://github.com/commercetools/merchant-center-application-kit/commit/165d15aa30f3e668806569e8fc3365b33f53fd52) Thanks [@tdeekens](https://github.com/tdeekens)! - Fix to not pass feature flags for menu to not be used via LaunchDarkly.

- Updated dependencies []:
  - @commercetools-frontend/actions-global@22.30.1
  - @commercetools-frontend/application-components@22.30.1
  - @commercetools-frontend/application-config@22.30.1
  - @commercetools-frontend/application-shell-connectors@22.30.1
  - @commercetools-frontend/assets@22.30.1
  - @commercetools-frontend/browser-history@22.30.1
  - @commercetools-frontend/constants@22.30.1
  - @commercetools-frontend/i18n@22.30.1
  - @commercetools-frontend/l10n@22.30.1
  - @commercetools-frontend/notifications@22.30.1
  - @commercetools-frontend/permissions@22.30.1
  - @commercetools-frontend/react-notifications@22.30.1
  - @commercetools-frontend/sdk@22.30.1
  - @commercetools-frontend/sentry@22.30.1
  - @commercetools-frontend/url-utils@22.30.1

## 22.30.0

### Patch Changes

- Updated dependencies [[`a3a8e85`](https://github.com/commercetools/merchant-center-application-kit/commit/a3a8e85a4200e0495285cbf8befe9c407760d11b), [`113bace`](https://github.com/commercetools/merchant-center-application-kit/commit/113baceee248d4c0fbbdb68f4c525f7cfcd87522)]:
  - @commercetools-frontend/application-shell-connectors@22.30.0
  - @commercetools-frontend/application-components@22.30.0
  - @commercetools-frontend/permissions@22.30.0
  - @commercetools-frontend/react-notifications@22.30.0
  - @commercetools-frontend/actions-global@22.30.0
  - @commercetools-frontend/application-config@22.30.0
  - @commercetools-frontend/assets@22.30.0
  - @commercetools-frontend/browser-history@22.30.0
  - @commercetools-frontend/constants@22.30.0
  - @commercetools-frontend/i18n@22.30.0
  - @commercetools-frontend/l10n@22.30.0
  - @commercetools-frontend/notifications@22.30.0
  - @commercetools-frontend/sdk@22.30.0
  - @commercetools-frontend/sentry@22.30.0
  - @commercetools-frontend/url-utils@22.30.0

## 22.29.0

### Patch Changes

- [#3561](https://github.com/commercetools/merchant-center-application-kit/pull/3561) [`fcc8ce7`](https://github.com/commercetools/merchant-center-application-kit/commit/fcc8ce72bd1bed70551bf07907ca65c13ad13307) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all flopflip packages to v14.0.2

- [#3539](https://github.com/commercetools/merchant-center-application-kit/pull/3539) [`4bd0fb6`](https://github.com/commercetools/merchant-center-application-kit/commit/4bd0fb65319fde21dafdfee36b7e6c7b7c9a5a52) Thanks [@renovate](https://github.com/apps/renovate)! - Update all dependencies

- Updated dependencies [[`fcc8ce7`](https://github.com/commercetools/merchant-center-application-kit/commit/fcc8ce72bd1bed70551bf07907ca65c13ad13307), [`03ae4b2`](https://github.com/commercetools/merchant-center-application-kit/commit/03ae4b29ed78ee9d0fea6c5561125a56c5544945), [`4bd0fb6`](https://github.com/commercetools/merchant-center-application-kit/commit/4bd0fb65319fde21dafdfee36b7e6c7b7c9a5a52), [`5363548`](https://github.com/commercetools/merchant-center-application-kit/commit/53635480ff4aef9dbc3960970d8d6bc0ba3991ef), [`999014a`](https://github.com/commercetools/merchant-center-application-kit/commit/999014a8feeb9d2b4a0873f4b064a75e1fafd242)]:
  - @commercetools-frontend/application-components@22.29.0
  - @commercetools-frontend/application-shell-connectors@22.29.0
  - @commercetools-frontend/application-config@22.29.0
  - @commercetools-frontend/sentry@22.29.0
  - @commercetools-frontend/i18n@22.29.0
  - @commercetools-frontend/react-notifications@22.29.0
  - @commercetools-frontend/permissions@22.29.0
  - @commercetools-frontend/actions-global@22.29.0
  - @commercetools-frontend/l10n@22.29.0
  - @commercetools-frontend/assets@22.29.0
  - @commercetools-frontend/browser-history@22.29.0
  - @commercetools-frontend/constants@22.29.0
  - @commercetools-frontend/notifications@22.29.0
  - @commercetools-frontend/sdk@22.29.0
  - @commercetools-frontend/url-utils@22.29.0

## 22.28.0

### Patch Changes

- [#3548](https://github.com/commercetools/merchant-center-application-kit/pull/3548) [`222dd0c`](https://github.com/commercetools/merchant-center-application-kit/commit/222dd0cc55cd36d88e08ca61c92f7da872474b0e) Thanks [@tdeekens](https://github.com/tdeekens)! - Change `flopflip`'s `http-adapter` cache mode to be eager.

- [#3538](https://github.com/commercetools/merchant-center-application-kit/pull/3538) [`6eb78a4`](https://github.com/commercetools/merchant-center-application-kit/commit/6eb78a463adf848696e984bd0e999b4753676ece) Thanks [@renovate](https://github.com/apps/renovate)! - Update `ui-kit` dependencies

- Updated dependencies [[`6eb78a4`](https://github.com/commercetools/merchant-center-application-kit/commit/6eb78a463adf848696e984bd0e999b4753676ece), [`146cf67`](https://github.com/commercetools/merchant-center-application-kit/commit/146cf672eb15a7b4d858c54d6a01f92d0437a86f)]:
  - @commercetools-frontend/application-components@22.28.0
  - @commercetools-frontend/i18n@22.28.0
  - @commercetools-frontend/react-notifications@22.28.0
  - @commercetools-frontend/sentry@22.28.0
  - @commercetools-frontend/l10n@22.28.0
  - @commercetools-frontend/actions-global@22.28.0
  - @commercetools-frontend/application-shell-connectors@22.28.0
  - @commercetools-frontend/permissions@22.28.0
  - @commercetools-frontend/application-config@22.28.0
  - @commercetools-frontend/assets@22.28.0
  - @commercetools-frontend/browser-history@22.28.0
  - @commercetools-frontend/constants@22.28.0
  - @commercetools-frontend/notifications@22.28.0
  - @commercetools-frontend/sdk@22.28.0
  - @commercetools-frontend/url-utils@22.28.0

## 22.27.0

### Patch Changes

- [#3531](https://github.com/commercetools/merchant-center-application-kit/pull/3531) [`11eb32f`](https://github.com/commercetools/merchant-center-application-kit/commit/11eb32fa46461f7f68328130d881b3c8d8e0a0ee) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all flopflip packages to v14.0.1

- [#3468](https://github.com/commercetools/merchant-center-application-kit/pull/3468) [`4ab4bf6`](https://github.com/commercetools/merchant-center-application-kit/commit/4ab4bf6035d3c8b419fd439ca445c8f971ea2fc9) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

- [#3523](https://github.com/commercetools/merchant-center-application-kit/pull/3523) [`7e48e90`](https://github.com/commercetools/merchant-center-application-kit/commit/7e48e9081dfc792740604b4d22b420919d717b89) Thanks [@obulaworld](https://github.com/obulaworld)! - Add `isUserAdminOfCurrentProject` to project query, map value to project context.

- Updated dependencies [[`11eb32f`](https://github.com/commercetools/merchant-center-application-kit/commit/11eb32fa46461f7f68328130d881b3c8d8e0a0ee), [`4ab4bf6`](https://github.com/commercetools/merchant-center-application-kit/commit/4ab4bf6035d3c8b419fd439ca445c8f971ea2fc9), [`7e48e90`](https://github.com/commercetools/merchant-center-application-kit/commit/7e48e9081dfc792740604b4d22b420919d717b89), [`4f00d48`](https://github.com/commercetools/merchant-center-application-kit/commit/4f00d488be6da8689d8cb50ce060250749130013), [`78d082e`](https://github.com/commercetools/merchant-center-application-kit/commit/78d082e81298847b3c1b274040bb677104892119)]:
  - @commercetools-frontend/application-components@22.27.0
  - @commercetools-frontend/application-shell-connectors@22.27.0
  - @commercetools-frontend/application-config@22.27.0
  - @commercetools-frontend/permissions@22.27.0
  - @commercetools-frontend/sentry@22.27.0
  - @commercetools-frontend/i18n@22.27.0
  - @commercetools-frontend/constants@22.27.0
  - @commercetools-frontend/react-notifications@22.27.0
  - @commercetools-frontend/actions-global@22.27.0
  - @commercetools-frontend/l10n@22.27.0
  - @commercetools-frontend/sdk@22.27.0
  - @commercetools-frontend/assets@22.27.0
  - @commercetools-frontend/browser-history@22.27.0
  - @commercetools-frontend/notifications@22.27.0
  - @commercetools-frontend/url-utils@22.27.0

## 22.26.0

### Patch Changes

- [#3516](https://github.com/commercetools/merchant-center-application-kit/pull/3516) [`179da9a`](https://github.com/commercetools/merchant-center-application-kit/commit/179da9a4fdc73ade7717b50bc1e5c106382bf9eb) Thanks [@chloe0592](https://github.com/chloe0592)! - Removing the rebranding modal pup-up.

- Updated dependencies [[`4870607`](https://github.com/commercetools/merchant-center-application-kit/commit/48706079972a32b3489dbc9eb59b8b0459b75784), [`ec2410a`](https://github.com/commercetools/merchant-center-application-kit/commit/ec2410a5c238f4343371e246846f2bfdf5fcd720), [`179da9a`](https://github.com/commercetools/merchant-center-application-kit/commit/179da9a4fdc73ade7717b50bc1e5c106382bf9eb)]:
  - @commercetools-frontend/react-notifications@22.26.0
  - @commercetools-frontend/i18n@22.26.0
  - @commercetools-frontend/assets@22.26.0
  - @commercetools-frontend/application-components@22.26.0
  - @commercetools-frontend/application-config@22.26.0
  - @commercetools-frontend/actions-global@22.26.0
  - @commercetools-frontend/application-shell-connectors@22.26.0
  - @commercetools-frontend/browser-history@22.26.0
  - @commercetools-frontend/constants@22.26.0
  - @commercetools-frontend/l10n@22.26.0
  - @commercetools-frontend/notifications@22.26.0
  - @commercetools-frontend/permissions@22.26.0
  - @commercetools-frontend/sdk@22.26.0
  - @commercetools-frontend/sentry@22.26.0
  - @commercetools-frontend/url-utils@22.26.0

## 22.25.1

### Patch Changes

- [#3506](https://github.com/commercetools/merchant-center-application-kit/pull/3506) [`bd2ea80`](https://github.com/commercetools/merchant-center-application-kit/commit/bd2ea80dfc22befef0eb1143b798e7591b3300eb) Thanks [@emmenko](https://github.com/emmenko)! - Do not use lazy cache mode for feature flags when Cypress runs

- Updated dependencies []:
  - @commercetools-frontend/actions-global@22.25.1
  - @commercetools-frontend/application-components@22.25.1
  - @commercetools-frontend/application-config@22.25.1
  - @commercetools-frontend/application-shell-connectors@22.25.1
  - @commercetools-frontend/assets@22.25.1
  - @commercetools-frontend/browser-history@22.25.1
  - @commercetools-frontend/constants@22.25.1
  - @commercetools-frontend/i18n@22.25.1
  - @commercetools-frontend/l10n@22.25.1
  - @commercetools-frontend/notifications@22.25.1
  - @commercetools-frontend/permissions@22.25.1
  - @commercetools-frontend/react-notifications@22.25.1
  - @commercetools-frontend/sdk@22.25.1
  - @commercetools-frontend/sentry@22.25.1
  - @commercetools-frontend/url-utils@22.25.1

## 22.25.0

### Minor Changes

- [#3504](https://github.com/commercetools/merchant-center-application-kit/pull/3504) [`1be0c35`](https://github.com/commercetools/merchant-center-application-kit/commit/1be0c357e0a14fd32626c61dff804a4bdcc51499) Thanks [@YahiaElTai](https://github.com/YahiaElTai)! - chore(flopflip): increase pooling interval from 1 to 15 minutes

### Patch Changes

- [#3500](https://github.com/commercetools/merchant-center-application-kit/pull/3500) [`1985f69`](https://github.com/commercetools/merchant-center-application-kit/commit/1985f69301e4ab8eb218ed1a42425c3e27bb0a5a) Thanks [@tdeekens](https://github.com/tdeekens)! - Fix the cacheIdentifier and cacheMode being passed to each flopflip adapter.

- [#3497](https://github.com/commercetools/merchant-center-application-kit/pull/3497) [`a4cfaf1`](https://github.com/commercetools/merchant-center-application-kit/commit/a4cfaf11c700ae3634235281eacab39e325e5cc3) Thanks [@chloe0592](https://github.com/chloe0592)! - Remove the old theme from all App-Kit components and update UI-Kit dependencies to the newest version.

- Updated dependencies [[`b5e797f`](https://github.com/commercetools/merchant-center-application-kit/commit/b5e797f4c8a3552b911a16759ee8dd77416cefb2), [`b55d4e6`](https://github.com/commercetools/merchant-center-application-kit/commit/b55d4e606a07e5f5ac1522126b77213c67297a0c), [`a4cfaf1`](https://github.com/commercetools/merchant-center-application-kit/commit/a4cfaf11c700ae3634235281eacab39e325e5cc3)]:
  - @commercetools-frontend/constants@22.25.0
  - @commercetools-frontend/application-config@22.25.0
  - @commercetools-frontend/l10n@22.25.0
  - @commercetools-frontend/application-components@22.25.0
  - @commercetools-frontend/react-notifications@22.25.0
  - @commercetools-frontend/assets@22.25.0
  - @commercetools-frontend/i18n@22.25.0
  - @commercetools-frontend/actions-global@22.25.0
  - @commercetools-frontend/application-shell-connectors@22.25.0
  - @commercetools-frontend/sdk@22.25.0
  - @commercetools-frontend/sentry@22.25.0
  - @commercetools-frontend/permissions@22.25.0
  - @commercetools-frontend/browser-history@22.25.0
  - @commercetools-frontend/notifications@22.25.0
  - @commercetools-frontend/url-utils@22.25.0

## 22.24.0

### Minor Changes

- [#3482](https://github.com/commercetools/merchant-center-application-kit/pull/3482) [`3836786`](https://github.com/commercetools/merchant-center-application-kit/commit/383678613d5e58977b6316dc95c0a3c63355c839) Thanks [@ddouglasz](https://github.com/ddouglasz)! - Improve keyboard accessibility by switching between the menu items and submenu items using mainly the Tab and Enter keys.

### Patch Changes

- [#3492](https://github.com/commercetools/merchant-center-application-kit/pull/3492) [`d16ebd9`](https://github.com/commercetools/merchant-center-application-kit/commit/d16ebd98c1b99a0c0c0e0f9a9df24cc8dcc0f542) Thanks [@renovate](https://github.com/apps/renovate)! - Update all flopflip packages to v14 (major)

  In addition the the update to v14 the `merchant-center-application-kit` now uses a localStorage cache and an so called lazy `cacheMode`. This implies that `floplfip` will cause less flickering as a result of remote flags being resolved late and then applied after the application initially rendered. Instead cached flags are used and silently (lazily) updated in the background and their possibly changed value takes effect upon the next mounting of `flipflip` or upon reconfiguration.

- [#3491](https://github.com/commercetools/merchant-center-application-kit/pull/3491) [`c2bba1d`](https://github.com/commercetools/merchant-center-application-kit/commit/c2bba1d065b6fd7882e6feb9162d91538962d85d) Thanks [@emmenko](https://github.com/emmenko)! - Adjust links to new docs

- Updated dependencies [[`d16ebd9`](https://github.com/commercetools/merchant-center-application-kit/commit/d16ebd98c1b99a0c0c0e0f9a9df24cc8dcc0f542), [`b6b0003`](https://github.com/commercetools/merchant-center-application-kit/commit/b6b0003417d413fa26fb77750c75e95559af2f24), [`79e0a78`](https://github.com/commercetools/merchant-center-application-kit/commit/79e0a783190adb438b69111967523414d469d84e), [`d92d890`](https://github.com/commercetools/merchant-center-application-kit/commit/d92d8901913b29d45ae2c4df1d89f640e10bd257), [`2431917`](https://github.com/commercetools/merchant-center-application-kit/commit/2431917db9ee4297e58717924779855f556e38cb), [`c2bba1d`](https://github.com/commercetools/merchant-center-application-kit/commit/c2bba1d065b6fd7882e6feb9162d91538962d85d)]:
  - @commercetools-frontend/application-components@22.24.0
  - @commercetools-frontend/i18n@22.24.0
  - @commercetools-frontend/react-notifications@22.24.0
  - @commercetools-frontend/constants@22.24.0
  - @commercetools-frontend/application-shell-connectors@22.24.0
  - @commercetools-frontend/application-config@22.24.0
  - @commercetools-frontend/browser-history@22.24.0
  - @commercetools-frontend/actions-global@22.24.0
  - @commercetools-frontend/notifications@22.24.0
  - @commercetools-frontend/permissions@22.24.0
  - @commercetools-frontend/url-utils@22.24.0
  - @commercetools-frontend/assets@22.24.0
  - @commercetools-frontend/sentry@22.24.0
  - @commercetools-frontend/l10n@22.24.0
  - @commercetools-frontend/sdk@22.24.0

## 22.23.3

### Patch Changes

- [#3483](https://github.com/commercetools/merchant-center-application-kit/pull/3483) [`f1144f9`](https://github.com/commercetools/merchant-center-application-kit/commit/f1144f9764d4ec366802e784e82f01697c0e0a2e) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all flopflip packages to v13.6.0

- Updated dependencies [[`f1144f9`](https://github.com/commercetools/merchant-center-application-kit/commit/f1144f9764d4ec366802e784e82f01697c0e0a2e)]:
  - @commercetools-frontend/application-components@22.23.3
  - @commercetools-frontend/react-notifications@22.23.3
  - @commercetools-frontend/actions-global@22.23.3
  - @commercetools-frontend/application-config@22.23.3
  - @commercetools-frontend/application-shell-connectors@22.23.3
  - @commercetools-frontend/assets@22.23.3
  - @commercetools-frontend/browser-history@22.23.3
  - @commercetools-frontend/constants@22.23.3
  - @commercetools-frontend/i18n@22.23.3
  - @commercetools-frontend/l10n@22.23.3
  - @commercetools-frontend/notifications@22.23.3
  - @commercetools-frontend/permissions@22.23.3
  - @commercetools-frontend/sdk@22.23.3
  - @commercetools-frontend/sentry@22.23.3
  - @commercetools-frontend/url-utils@22.23.3

## 22.23.2

### Patch Changes

- Updated dependencies []:
  - @commercetools-frontend/actions-global@22.23.2
  - @commercetools-frontend/application-components@22.23.2
  - @commercetools-frontend/application-config@22.23.2
  - @commercetools-frontend/application-shell-connectors@22.23.2
  - @commercetools-frontend/assets@22.23.2
  - @commercetools-frontend/browser-history@22.23.2
  - @commercetools-frontend/constants@22.23.2
  - @commercetools-frontend/i18n@22.23.2
  - @commercetools-frontend/l10n@22.23.2
  - @commercetools-frontend/notifications@22.23.2
  - @commercetools-frontend/permissions@22.23.2
  - @commercetools-frontend/react-notifications@22.23.2
  - @commercetools-frontend/sdk@22.23.2
  - @commercetools-frontend/sentry@22.23.2
  - @commercetools-frontend/url-utils@22.23.2

## 22.23.1

### Patch Changes

- [#3476](https://github.com/commercetools/merchant-center-application-kit/pull/3476) [`f2cec38`](https://github.com/commercetools/merchant-center-application-kit/commit/f2cec3830a9e07c3fa6030b947ddd090f70a4d90) Thanks [@tdeekens](https://github.com/tdeekens)! - Update flopflip

- Updated dependencies [[`f2cec38`](https://github.com/commercetools/merchant-center-application-kit/commit/f2cec3830a9e07c3fa6030b947ddd090f70a4d90)]:
  - @commercetools-frontend/application-components@22.23.1
  - @commercetools-frontend/react-notifications@22.23.1
  - @commercetools-frontend/actions-global@22.23.1
  - @commercetools-frontend/application-config@22.23.1
  - @commercetools-frontend/application-shell-connectors@22.23.1
  - @commercetools-frontend/assets@22.23.1
  - @commercetools-frontend/browser-history@22.23.1
  - @commercetools-frontend/constants@22.23.1
  - @commercetools-frontend/i18n@22.23.1
  - @commercetools-frontend/l10n@22.23.1
  - @commercetools-frontend/notifications@22.23.1
  - @commercetools-frontend/permissions@22.23.1
  - @commercetools-frontend/sdk@22.23.1
  - @commercetools-frontend/sentry@22.23.1
  - @commercetools-frontend/url-utils@22.23.1

## 22.23.0

### Minor Changes

- [#3474](https://github.com/commercetools/merchant-center-application-kit/pull/3474) [`5fa5dd6`](https://github.com/commercetools/merchant-center-application-kit/commit/5fa5dd6d29f0974a97718f86259f6e717d5fdb5e) Thanks [@kark](https://github.com/kark)! - Use `recolouring` theme as default. Remove usage of `mcRecolouring` feature flag and delayed rendering logic.

### Patch Changes

- [#3473](https://github.com/commercetools/merchant-center-application-kit/pull/3473) [`4708993`](https://github.com/commercetools/merchant-center-application-kit/commit/4708993cf3f45addcbc0102686c92e12c9fc46bb) Thanks [@renovate](https://github.com/apps/renovate)! - Update vite dependency.

  Fixes [this vulnerability](https://github.com/vitejs/vite/security/advisories/GHSA-8jhw-289h-jh2g).

- [#3435](https://github.com/commercetools/merchant-center-application-kit/pull/3435) [`e7299e2`](https://github.com/commercetools/merchant-center-application-kit/commit/e7299e265ceb8579ed4901adddcb2fde791c62db) Thanks [@renovate](https://github.com/apps/renovate)! - Update all dependencies

- [#3464](https://github.com/commercetools/merchant-center-application-kit/pull/3464) [`aa60c8e`](https://github.com/commercetools/merchant-center-application-kit/commit/aa60c8ed4d7e873485b6c7be80cc93ed988cca07) Thanks [@emmenko](https://github.com/emmenko)! - Enable feature flag for Custom Views by default

- [#3470](https://github.com/commercetools/merchant-center-application-kit/pull/3470) [`edda23e`](https://github.com/commercetools/merchant-center-application-kit/commit/edda23e5433c72780f447c42dc7123084353eac6) Thanks [@jaikumar-tj](https://github.com/jaikumar-tj)! - Remove tenant variable related to launch darkly

- Updated dependencies [[`e7299e2`](https://github.com/commercetools/merchant-center-application-kit/commit/e7299e265ceb8579ed4901adddcb2fde791c62db), [`5fa5dd6`](https://github.com/commercetools/merchant-center-application-kit/commit/5fa5dd6d29f0974a97718f86259f6e717d5fdb5e), [`aa60c8e`](https://github.com/commercetools/merchant-center-application-kit/commit/aa60c8ed4d7e873485b6c7be80cc93ed988cca07), [`edda23e`](https://github.com/commercetools/merchant-center-application-kit/commit/edda23e5433c72780f447c42dc7123084353eac6)]:
  - @commercetools-frontend/application-shell-connectors@22.23.0
  - @commercetools-frontend/application-components@22.23.0
  - @commercetools-frontend/react-notifications@22.23.0
  - @commercetools-frontend/application-config@22.23.0
  - @commercetools-frontend/actions-global@22.23.0
  - @commercetools-frontend/permissions@22.23.0
  - @commercetools-frontend/sentry@22.23.0
  - @commercetools-frontend/i18n@22.23.0
  - @commercetools-frontend/l10n@22.23.0
  - @commercetools-frontend/sdk@22.23.0
  - @commercetools-frontend/constants@22.23.0
  - @commercetools-frontend/assets@22.23.0
  - @commercetools-frontend/browser-history@22.23.0
  - @commercetools-frontend/notifications@22.23.0
  - @commercetools-frontend/url-utils@22.23.0

## 22.22.0

### Minor Changes

- [#3455](https://github.com/commercetools/merchant-center-application-kit/pull/3455) [`a79f0684a`](https://github.com/commercetools/merchant-center-application-kit/commit/a79f0684af40c53b3d78d8d34543e95895261820) Thanks [@ddouglasz](https://github.com/ddouglasz)! - Update app-bar user settings avatar to display the new recolouring background color

### Patch Changes

- Updated dependencies [[`cf7c7bb9b`](https://github.com/commercetools/merchant-center-application-kit/commit/cf7c7bb9b1f032e621e1f6e26e61e4336aa690d8)]:
  - @commercetools-frontend/i18n@22.22.0
  - @commercetools-frontend/application-components@22.22.0
  - @commercetools-frontend/react-notifications@22.22.0
  - @commercetools-frontend/actions-global@22.22.0
  - @commercetools-frontend/application-config@22.22.0
  - @commercetools-frontend/application-shell-connectors@22.22.0
  - @commercetools-frontend/assets@22.22.0
  - @commercetools-frontend/browser-history@22.22.0
  - @commercetools-frontend/constants@22.22.0
  - @commercetools-frontend/l10n@22.22.0
  - @commercetools-frontend/notifications@22.22.0
  - @commercetools-frontend/permissions@22.22.0
  - @commercetools-frontend/sdk@22.22.0
  - @commercetools-frontend/sentry@22.22.0
  - @commercetools-frontend/url-utils@22.22.0

## 22.21.0

### Minor Changes

- [#3444](https://github.com/commercetools/merchant-center-application-kit/pull/3444) [`6632b3200`](https://github.com/commercetools/merchant-center-application-kit/commit/6632b3200886c7fd6021324fe3f223c6d5346f23) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Updated `ApplicationShell` component so it can wait for resolving remote feature flags before rendering its children.

  This behaviour can be controlled using the new `shouldWaitForRemoteFlags` property (`true` by default).

  Even when this behaviour is enabled, the `ApplicationShell` component will use a timeout threshold so if remote feature flags can't be resolved within 500ms, it will render its children anyway (using the local default values).

- [#3445](https://github.com/commercetools/merchant-center-application-kit/pull/3445) [`9c817efc4`](https://github.com/commercetools/merchant-center-application-kit/commit/9c817efc4f55000570c5b8ce44bdf463bfe112f7) Thanks [@ddouglasz](https://github.com/ddouglasz)! - Included a new temporary dialog to notify users about the new colour schema.

### Patch Changes

- [#3447](https://github.com/commercetools/merchant-center-application-kit/pull/3447) [`463a10122`](https://github.com/commercetools/merchant-center-application-kit/commit/463a101222d2a361de32a61839384b815efe2c50) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all flopflip packages to v13.4.1

- Updated dependencies [[`dc5167fd4`](https://github.com/commercetools/merchant-center-application-kit/commit/dc5167fd4e6d52d5c3dd0faab806a3da78dee4b3), [`a3c5849ae`](https://github.com/commercetools/merchant-center-application-kit/commit/a3c5849aee5a60ab8115baec1147a94edc4ffe9d), [`9e4697fff`](https://github.com/commercetools/merchant-center-application-kit/commit/9e4697fffaad77be9884ad5ba8f4e7d80177e6d7), [`463a10122`](https://github.com/commercetools/merchant-center-application-kit/commit/463a101222d2a361de32a61839384b815efe2c50), [`9c817efc4`](https://github.com/commercetools/merchant-center-application-kit/commit/9c817efc4f55000570c5b8ce44bdf463bfe112f7)]:
  - @commercetools-frontend/i18n@22.21.0
  - @commercetools-frontend/application-components@22.21.0
  - @commercetools-frontend/react-notifications@22.21.0
  - @commercetools-frontend/assets@22.21.0
  - @commercetools-frontend/application-config@22.21.0
  - @commercetools-frontend/actions-global@22.21.0
  - @commercetools-frontend/application-shell-connectors@22.21.0
  - @commercetools-frontend/browser-history@22.21.0
  - @commercetools-frontend/constants@22.21.0
  - @commercetools-frontend/l10n@22.21.0
  - @commercetools-frontend/notifications@22.21.0
  - @commercetools-frontend/permissions@22.21.0
  - @commercetools-frontend/sdk@22.21.0
  - @commercetools-frontend/sentry@22.21.0
  - @commercetools-frontend/url-utils@22.21.0

## 22.20.0

### Minor Changes

- [#3432](https://github.com/commercetools/merchant-center-application-kit/pull/3432) [`fc216dc41`](https://github.com/commercetools/merchant-center-application-kit/commit/fc216dc4139e6ab736f13ea48e85adea07024c27) Thanks [@ddouglasz](https://github.com/ddouglasz)! - Updated the "Support" navigation menu item so it also has a tooltip when the menu is collapsed (same as the rest of the menu root items).

### Patch Changes

- [#3427](https://github.com/commercetools/merchant-center-application-kit/pull/3427) [`02cd76b66`](https://github.com/commercetools/merchant-center-application-kit/commit/02cd76b66ded47cd899b3eeee8cee27bd4d6a353) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - The `apolloClient` property in the `CustomViewShell` component was not being used internally, making it impossible for consumers to user a custom Apollo client.

- [#3426](https://github.com/commercetools/merchant-center-application-kit/pull/3426) [`6f0e6f6e1`](https://github.com/commercetools/merchant-center-application-kit/commit/6f0e6f6e1c39e66f18b6cef5038fef303e9d3024) Thanks [@tdeekens](https://github.com/tdeekens)! - Fix to only send LaunchDarkly events only for variations.

- Updated dependencies [[`113d92c93`](https://github.com/commercetools/merchant-center-application-kit/commit/113d92c93ab574a34129d4b193da963bb90a16f6)]:
  - @commercetools-frontend/i18n@22.20.0
  - @commercetools-frontend/application-components@22.20.0
  - @commercetools-frontend/react-notifications@22.20.0
  - @commercetools-frontend/actions-global@22.20.0
  - @commercetools-frontend/application-config@22.20.0
  - @commercetools-frontend/application-shell-connectors@22.20.0
  - @commercetools-frontend/assets@22.20.0
  - @commercetools-frontend/browser-history@22.20.0
  - @commercetools-frontend/constants@22.20.0
  - @commercetools-frontend/l10n@22.20.0
  - @commercetools-frontend/notifications@22.20.0
  - @commercetools-frontend/permissions@22.20.0
  - @commercetools-frontend/sdk@22.20.0
  - @commercetools-frontend/sentry@22.20.0
  - @commercetools-frontend/url-utils@22.20.0

## 22.19.0

### Minor Changes

- [#3414](https://github.com/commercetools/merchant-center-application-kit/pull/3414) [`dc2b492db`](https://github.com/commercetools/merchant-center-application-kit/commit/dc2b492db5e727d263017679a6fb4c5c61c1c01f) Thanks [@kark](https://github.com/kark)! - Update all App-kit components to support the upcoming new colour scheme

- [#3421](https://github.com/commercetools/merchant-center-application-kit/pull/3421) [`325224ea5`](https://github.com/commercetools/merchant-center-application-kit/commit/325224ea5de9517065cf1c6f70cfef8e28b6eb51) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Custom Views can consume feature flags (internal usage only).

### Patch Changes

- [#3415](https://github.com/commercetools/merchant-center-application-kit/pull/3415) [`e076438da`](https://github.com/commercetools/merchant-center-application-kit/commit/e076438da68e8931b4d221ab9b5bde6fb0cdf565) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Include new illustrations with the upcoming colour schema changes

- Updated dependencies [[`e076438da`](https://github.com/commercetools/merchant-center-application-kit/commit/e076438da68e8931b4d221ab9b5bde6fb0cdf565), [`dc2b492db`](https://github.com/commercetools/merchant-center-application-kit/commit/dc2b492db5e727d263017679a6fb4c5c61c1c01f), [`325224ea5`](https://github.com/commercetools/merchant-center-application-kit/commit/325224ea5de9517065cf1c6f70cfef8e28b6eb51)]:
  - @commercetools-frontend/application-components@22.19.0
  - @commercetools-frontend/assets@22.19.0
  - @commercetools-frontend/react-notifications@22.19.0
  - @commercetools-frontend/constants@22.19.0
  - @commercetools-frontend/i18n@22.19.0
  - @commercetools-frontend/application-config@22.19.0
  - @commercetools-frontend/actions-global@22.19.0
  - @commercetools-frontend/application-shell-connectors@22.19.0
  - @commercetools-frontend/sdk@22.19.0
  - @commercetools-frontend/sentry@22.19.0
  - @commercetools-frontend/permissions@22.19.0
  - @commercetools-frontend/l10n@22.19.0
  - @commercetools-frontend/browser-history@22.19.0
  - @commercetools-frontend/notifications@22.19.0
  - @commercetools-frontend/url-utils@22.19.0

## 22.18.0

### Patch Changes

- [#3403](https://github.com/commercetools/merchant-center-application-kit/pull/3403) [`d575e8402`](https://github.com/commercetools/merchant-center-application-kit/commit/d575e8402d480b6efa513db4cb856aee9e0a1fa2) Thanks [@chloe0592](https://github.com/chloe0592)! - New UI of the App Bar selectors.

- [#3412](https://github.com/commercetools/merchant-center-application-kit/pull/3412) [`0763c6566`](https://github.com/commercetools/merchant-center-application-kit/commit/0763c6566ba6f6f363ed44d2667b5bd8e158d73d) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Fix applications icons alignment in main navigation sidebar

- Updated dependencies [[`16de26adb`](https://github.com/commercetools/merchant-center-application-kit/commit/16de26adb0c77e580e5bf64de2ff0ad805672d7c), [`9f4eb875d`](https://github.com/commercetools/merchant-center-application-kit/commit/9f4eb875d16db0bd6f9a7ef65e79d7bdb18336ff), [`d575e8402`](https://github.com/commercetools/merchant-center-application-kit/commit/d575e8402d480b6efa513db4cb856aee9e0a1fa2)]:
  - @commercetools-frontend/application-components@22.18.0
  - @commercetools-frontend/i18n@22.18.0
  - @commercetools-frontend/application-shell-connectors@22.18.0
  - @commercetools-frontend/permissions@22.18.0
  - @commercetools-frontend/actions-global@22.18.0
  - @commercetools-frontend/application-config@22.18.0
  - @commercetools-frontend/assets@22.18.0
  - @commercetools-frontend/browser-history@22.18.0
  - @commercetools-frontend/constants@22.18.0
  - @commercetools-frontend/l10n@22.18.0
  - @commercetools-frontend/notifications@22.18.0
  - @commercetools-frontend/react-notifications@22.18.0
  - @commercetools-frontend/sdk@22.18.0
  - @commercetools-frontend/sentry@22.18.0
  - @commercetools-frontend/url-utils@22.18.0

## 22.17.2

### Patch Changes

- [#3399](https://github.com/commercetools/merchant-center-application-kit/pull/3399) [`7eb6f3ad1`](https://github.com/commercetools/merchant-center-application-kit/commit/7eb6f3ad1c337ec676fa5665f3a863d1953a202f) Thanks [@kark](https://github.com/kark)! - Enhance consistency of navbar hover styles across different browsers

- [#3395](https://github.com/commercetools/merchant-center-application-kit/pull/3395) [`a487b0114`](https://github.com/commercetools/merchant-center-application-kit/commit/a487b011438d180227d99774257b10dd8aa7198f) Thanks [@kark](https://github.com/kark)! - Refactored Navbar CSS-in-JS styles by transitioning from global styles based on classnames to encapsulated component styles

- Updated dependencies [[`17c246a84`](https://github.com/commercetools/merchant-center-application-kit/commit/17c246a84e51516ecf8d157ac9b6b9235a57a5e3), [`f69913f8b`](https://github.com/commercetools/merchant-center-application-kit/commit/f69913f8ba98e5c0e09bd5cf06e3afb788752404)]:
  - @commercetools-frontend/application-components@22.17.2
  - @commercetools-frontend/application-shell-connectors@22.17.2
  - @commercetools-frontend/sdk@22.17.2
  - @commercetools-frontend/permissions@22.17.2
  - @commercetools-frontend/actions-global@22.17.2
  - @commercetools-frontend/application-config@22.17.2
  - @commercetools-frontend/assets@22.17.2
  - @commercetools-frontend/browser-history@22.17.2
  - @commercetools-frontend/constants@22.17.2
  - @commercetools-frontend/i18n@22.17.2
  - @commercetools-frontend/l10n@22.17.2
  - @commercetools-frontend/notifications@22.17.2
  - @commercetools-frontend/react-notifications@22.17.2
  - @commercetools-frontend/sentry@22.17.2
  - @commercetools-frontend/url-utils@22.17.2

## 22.17.1

### Patch Changes

- [#3348](https://github.com/commercetools/merchant-center-application-kit/pull/3348) [`973be93ea`](https://github.com/commercetools/merchant-center-application-kit/commit/973be93ea1b733a2ff7d69f239e6c1ca76d6072c) Thanks [@chloe0592](https://github.com/chloe0592)! - Simplify navbar styles implementation

- Updated dependencies [[`8ad52e2c9`](https://github.com/commercetools/merchant-center-application-kit/commit/8ad52e2c9460744d3f49af929db47562830c9639)]:
  - @commercetools-frontend/assets@22.17.1
  - @commercetools-frontend/application-components@22.17.1
  - @commercetools-frontend/application-config@22.17.1
  - @commercetools-frontend/actions-global@22.17.1
  - @commercetools-frontend/application-shell-connectors@22.17.1
  - @commercetools-frontend/browser-history@22.17.1
  - @commercetools-frontend/constants@22.17.1
  - @commercetools-frontend/i18n@22.17.1
  - @commercetools-frontend/l10n@22.17.1
  - @commercetools-frontend/notifications@22.17.1
  - @commercetools-frontend/permissions@22.17.1
  - @commercetools-frontend/react-notifications@22.17.1
  - @commercetools-frontend/sdk@22.17.1
  - @commercetools-frontend/sentry@22.17.1
  - @commercetools-frontend/url-utils@22.17.1

## 22.17.0

### Minor Changes

- [#3379](https://github.com/commercetools/merchant-center-application-kit/pull/3379) [`d2e3a2236`](https://github.com/commercetools/merchant-center-application-kit/commit/d2e3a22361140ee77b4aa7f624d7b2b71de35bab) Thanks [@tylermorrisford](https://github.com/tylermorrisford)! - Update all logos in `assets/logos/`, all logos in `assets/images/` and embedded logo in `application.html`.

### Patch Changes

- [#3390](https://github.com/commercetools/merchant-center-application-kit/pull/3390) [`bf1a7a002`](https://github.com/commercetools/merchant-center-application-kit/commit/bf1a7a002264689305a9023eb86fae3ac7630b12) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - We've fixed a bug with the login flow when working on a Custom Application locally when a user updated the [initialProjectKey](https://docs.commercetools.com/custom-applications/api-reference/application-config#envdevelopmentinitialprojectkey) configuration value but the application was still using the old.

- Updated dependencies [[`047e44e01`](https://github.com/commercetools/merchant-center-application-kit/commit/047e44e0119032707f6a1feac8846f58d4d44f28), [`d2e3a2236`](https://github.com/commercetools/merchant-center-application-kit/commit/d2e3a22361140ee77b4aa7f624d7b2b71de35bab), [`fe6314779`](https://github.com/commercetools/merchant-center-application-kit/commit/fe63147792caaea41be1c96ce17dbee57cd7209e)]:
  - @commercetools-frontend/application-config@22.17.0
  - @commercetools-frontend/application-shell-connectors@22.17.0
  - @commercetools-frontend/application-components@22.17.0
  - @commercetools-frontend/react-notifications@22.17.0
  - @commercetools-frontend/browser-history@22.17.0
  - @commercetools-frontend/actions-global@22.17.0
  - @commercetools-frontend/notifications@22.17.0
  - @commercetools-frontend/permissions@22.17.0
  - @commercetools-frontend/constants@22.17.0
  - @commercetools-frontend/url-utils@22.17.0
  - @commercetools-frontend/assets@22.17.0
  - @commercetools-frontend/sentry@22.17.0
  - @commercetools-frontend/i18n@22.17.0
  - @commercetools-frontend/l10n@22.17.0
  - @commercetools-frontend/sdk@22.17.0

## 22.16.0

### Minor Changes

- [#3376](https://github.com/commercetools/merchant-center-application-kit/pull/3376) [`4e6a89b40`](https://github.com/commercetools/merchant-center-application-kit/commit/4e6a89b40e697562abb1e15e904d400fc84930c7) Thanks [@jaikumar-tj](https://github.com/jaikumar-tj)! - Add cloud environment property for launch darkly

### Patch Changes

- [#3372](https://github.com/commercetools/merchant-center-application-kit/pull/3372) [`d7bff45b9`](https://github.com/commercetools/merchant-center-application-kit/commit/d7bff45b9ba10530139eb4ea52a7dbb8dddc86e7) Thanks [@chloe0592](https://github.com/chloe0592)! - Add `isProductionProject` to project query.

- [#3382](https://github.com/commercetools/merchant-center-application-kit/pull/3382) [`97d102879`](https://github.com/commercetools/merchant-center-application-kit/commit/97d10287980b95342f2bc06d6e172ac11097cb56) Thanks [@chloe0592](https://github.com/chloe0592)! - Update all ui-kit packages to v17.0.0

- [#3373](https://github.com/commercetools/merchant-center-application-kit/pull/3373) [`d437612a8`](https://github.com/commercetools/merchant-center-application-kit/commit/d437612a894be32eaa6c124c8e0d1b126148e049) Thanks [@chloe0592](https://github.com/chloe0592)! - Setting the `maxMenuHeight` for locale and project switchers.

- [#3353](https://github.com/commercetools/merchant-center-application-kit/pull/3353) [`05dfdefd5`](https://github.com/commercetools/merchant-center-application-kit/commit/05dfdefd5a4827621e8aa583484af43f57c8d367) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Fixes some styling issues when using Page Layout components in Custom Views.

- Updated dependencies [[`d7bff45b9`](https://github.com/commercetools/merchant-center-application-kit/commit/d7bff45b9ba10530139eb4ea52a7dbb8dddc86e7), [`4e6a89b40`](https://github.com/commercetools/merchant-center-application-kit/commit/4e6a89b40e697562abb1e15e904d400fc84930c7), [`97d102879`](https://github.com/commercetools/merchant-center-application-kit/commit/97d10287980b95342f2bc06d6e172ac11097cb56), [`05dfdefd5`](https://github.com/commercetools/merchant-center-application-kit/commit/05dfdefd5a4827621e8aa583484af43f57c8d367)]:
  - @commercetools-frontend/application-shell-connectors@22.16.0
  - @commercetools-frontend/permissions@22.16.0
  - @commercetools-frontend/application-components@22.16.0
  - @commercetools-frontend/react-notifications@22.16.0
  - @commercetools-frontend/i18n@22.16.0
  - @commercetools-frontend/actions-global@22.16.0
  - @commercetools-frontend/application-config@22.16.0
  - @commercetools-frontend/assets@22.16.0
  - @commercetools-frontend/browser-history@22.16.0
  - @commercetools-frontend/constants@22.16.0
  - @commercetools-frontend/l10n@22.16.0
  - @commercetools-frontend/notifications@22.16.0
  - @commercetools-frontend/sdk@22.16.0
  - @commercetools-frontend/sentry@22.16.0
  - @commercetools-frontend/url-utils@22.16.0

## 22.15.1

### Patch Changes

- Updated dependencies []:
  - @commercetools-frontend/actions-global@22.15.1
  - @commercetools-frontend/application-components@22.15.1
  - @commercetools-frontend/application-config@22.15.1
  - @commercetools-frontend/application-shell-connectors@22.15.1
  - @commercetools-frontend/assets@22.15.1
  - @commercetools-frontend/browser-history@22.15.1
  - @commercetools-frontend/constants@22.15.1
  - @commercetools-frontend/i18n@22.15.1
  - @commercetools-frontend/l10n@22.15.1
  - @commercetools-frontend/notifications@22.15.1
  - @commercetools-frontend/permissions@22.15.1
  - @commercetools-frontend/react-notifications@22.15.1
  - @commercetools-frontend/sdk@22.15.1
  - @commercetools-frontend/sentry@22.15.1
  - @commercetools-frontend/url-utils@22.15.1

## 22.15.0

### Minor Changes

- [#3306](https://github.com/commercetools/merchant-center-application-kit/pull/3306) [`8093695a0`](https://github.com/commercetools/merchant-center-application-kit/commit/8093695a006f30598ccab0d66d052f0a32862f3b) Thanks [@kark](https://github.com/kark)! - Improve Navbar keyboard accessibility

### Patch Changes

- [#3352](https://github.com/commercetools/merchant-center-application-kit/pull/3352) [`48f11f9dd`](https://github.com/commercetools/merchant-center-application-kit/commit/48f11f9dd17e977c628206506d2f6af0cee1c269) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Fix `Dialog` components UI when rendered within a Custom View panel.

- [#3365](https://github.com/commercetools/merchant-center-application-kit/pull/3365) [`996be773d`](https://github.com/commercetools/merchant-center-application-kit/commit/996be773de148122402f8b1ced36ec8ab10025ef) Thanks [@emmenko](https://github.com/emmenko)! - Fix login flow for local development to safely run the side effects when using React strict mode

- [#3357](https://github.com/commercetools/merchant-center-application-kit/pull/3357) [`551e64ee5`](https://github.com/commercetools/merchant-center-application-kit/commit/551e64ee540653899095120f4436ec800dc8b19e) Thanks [@chloe0592](https://github.com/chloe0592)! - Setting up the `min-width` in the Project selector

- [#3362](https://github.com/commercetools/merchant-center-application-kit/pull/3362) [`30ecac441`](https://github.com/commercetools/merchant-center-application-kit/commit/30ecac4410a8ed2ba5393fa57054653111284e4e) Thanks [@ByronDWall](https://github.com/ByronDWall)! - Avoid displaying 'unhandled error' banner and passing error to sentry for ResizeObserver loop related errors

- Updated dependencies [[`48f11f9dd`](https://github.com/commercetools/merchant-center-application-kit/commit/48f11f9dd17e977c628206506d2f6af0cee1c269), [`996be773d`](https://github.com/commercetools/merchant-center-application-kit/commit/996be773de148122402f8b1ced36ec8ab10025ef), [`48f11f9dd`](https://github.com/commercetools/merchant-center-application-kit/commit/48f11f9dd17e977c628206506d2f6af0cee1c269), [`72ae1d305`](https://github.com/commercetools/merchant-center-application-kit/commit/72ae1d305ca209d23552d0062f96324e19e40679), [`30ecac441`](https://github.com/commercetools/merchant-center-application-kit/commit/30ecac4410a8ed2ba5393fa57054653111284e4e), [`72ae1d305`](https://github.com/commercetools/merchant-center-application-kit/commit/72ae1d305ca209d23552d0062f96324e19e40679)]:
  - @commercetools-frontend/application-components@22.15.0
  - @commercetools-frontend/application-shell-connectors@22.15.0
  - @commercetools-frontend/constants@22.15.0
  - @commercetools-frontend/application-config@22.15.0
  - @commercetools-frontend/sentry@22.15.0
  - @commercetools-frontend/permissions@22.15.0
  - @commercetools-frontend/actions-global@22.15.0
  - @commercetools-frontend/react-notifications@22.15.0
  - @commercetools-frontend/sdk@22.15.0
  - @commercetools-frontend/i18n@22.15.0
  - @commercetools-frontend/l10n@22.15.0
  - @commercetools-frontend/assets@22.15.0
  - @commercetools-frontend/browser-history@22.15.0
  - @commercetools-frontend/notifications@22.15.0
  - @commercetools-frontend/url-utils@22.15.0

## 22.14.3

### Patch Changes

- [#3347](https://github.com/commercetools/merchant-center-application-kit/pull/3347) [`96a050a18`](https://github.com/commercetools/merchant-center-application-kit/commit/96a050a18818243b38866541dd2f3498d46db447) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Update Page Layout component and Custom Views styles so the former renders correctly in both Custom Applications and Custom Views.

- [#3339](https://github.com/commercetools/merchant-center-application-kit/pull/3339) [`77f3de598`](https://github.com/commercetools/merchant-center-application-kit/commit/77f3de5983ba0470034c99bea2982ef94a791856) Thanks [@kark](https://github.com/kark)! - Introduce end-to-end tests to validate custom views templates

- Updated dependencies [[`96a050a18`](https://github.com/commercetools/merchant-center-application-kit/commit/96a050a18818243b38866541dd2f3498d46db447)]:
  - @commercetools-frontend/application-components@22.14.3
  - @commercetools-frontend/actions-global@22.14.3
  - @commercetools-frontend/application-config@22.14.3
  - @commercetools-frontend/application-shell-connectors@22.14.3
  - @commercetools-frontend/assets@22.14.3
  - @commercetools-frontend/browser-history@22.14.3
  - @commercetools-frontend/constants@22.14.3
  - @commercetools-frontend/i18n@22.14.3
  - @commercetools-frontend/l10n@22.14.3
  - @commercetools-frontend/notifications@22.14.3
  - @commercetools-frontend/permissions@22.14.3
  - @commercetools-frontend/react-notifications@22.14.3
  - @commercetools-frontend/sdk@22.14.3
  - @commercetools-frontend/sentry@22.14.3
  - @commercetools-frontend/url-utils@22.14.3

## 22.14.2

### Patch Changes

- [#3343](https://github.com/commercetools/merchant-center-application-kit/pull/3343) [`e7b84b1fb`](https://github.com/commercetools/merchant-center-application-kit/commit/e7b84b1fb1eb8de233468dd045d0842d3260e438) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Fixes for Custom Views related to styling issues when using Page Layout components and inner routing.

- Updated dependencies [[`483fae792`](https://github.com/commercetools/merchant-center-application-kit/commit/483fae792f1e85a20ba7959fe937d4e9faa30efd), [`483fae792`](https://github.com/commercetools/merchant-center-application-kit/commit/483fae792f1e85a20ba7959fe937d4e9faa30efd), [`e7b84b1fb`](https://github.com/commercetools/merchant-center-application-kit/commit/e7b84b1fb1eb8de233468dd045d0842d3260e438)]:
  - @commercetools-frontend/application-components@22.14.2
  - @commercetools-frontend/constants@22.14.2
  - @commercetools-frontend/actions-global@22.14.2
  - @commercetools-frontend/application-config@22.14.2
  - @commercetools-frontend/application-shell-connectors@22.14.2
  - @commercetools-frontend/react-notifications@22.14.2
  - @commercetools-frontend/sdk@22.14.2
  - @commercetools-frontend/sentry@22.14.2
  - @commercetools-frontend/permissions@22.14.2
  - @commercetools-frontend/i18n@22.14.2
  - @commercetools-frontend/l10n@22.14.2
  - @commercetools-frontend/assets@22.14.2
  - @commercetools-frontend/browser-history@22.14.2
  - @commercetools-frontend/notifications@22.14.2
  - @commercetools-frontend/url-utils@22.14.2

## 22.14.1

### Patch Changes

- Updated dependencies [[`7e62ee10c`](https://github.com/commercetools/merchant-center-application-kit/commit/7e62ee10c1e3cb6f3e366e8d0685c720ff5efd03)]:
  - @commercetools-frontend/application-components@22.14.1
  - @commercetools-frontend/actions-global@22.14.1
  - @commercetools-frontend/application-config@22.14.1
  - @commercetools-frontend/application-shell-connectors@22.14.1
  - @commercetools-frontend/assets@22.14.1
  - @commercetools-frontend/browser-history@22.14.1
  - @commercetools-frontend/constants@22.14.1
  - @commercetools-frontend/i18n@22.14.1
  - @commercetools-frontend/l10n@22.14.1
  - @commercetools-frontend/notifications@22.14.1
  - @commercetools-frontend/permissions@22.14.1
  - @commercetools-frontend/react-notifications@22.14.1
  - @commercetools-frontend/sdk@22.14.1
  - @commercetools-frontend/sentry@22.14.1
  - @commercetools-frontend/url-utils@22.14.1

## 22.14.0

### Minor Changes

- [#3299](https://github.com/commercetools/merchant-center-application-kit/pull/3299) [`66ee37b2a`](https://github.com/commercetools/merchant-center-application-kit/commit/66ee37b2ab19a832e8ff90c4adfa0f7b07fea70d) Thanks [@kark](https://github.com/kark)! - Integrate menu groups for improved navigation in the navbar

### Patch Changes

- [#3299](https://github.com/commercetools/merchant-center-application-kit/pull/3299) [`66ee37b2a`](https://github.com/commercetools/merchant-center-application-kit/commit/66ee37b2ab19a832e8ff90c4adfa0f7b07fea70d) Thanks [@kark](https://github.com/kark)! - Update `@commercetools-test-data/*` packages to version 6.6.0

- Updated dependencies [[`66ee37b2a`](https://github.com/commercetools/merchant-center-application-kit/commit/66ee37b2ab19a832e8ff90c4adfa0f7b07fea70d), [`66ee37b2a`](https://github.com/commercetools/merchant-center-application-kit/commit/66ee37b2ab19a832e8ff90c4adfa0f7b07fea70d)]:
  - @commercetools-frontend/application-shell-connectors@22.14.0
  - @commercetools-frontend/application-components@22.14.0
  - @commercetools-frontend/permissions@22.14.0
  - @commercetools-frontend/actions-global@22.14.0
  - @commercetools-frontend/application-config@22.14.0
  - @commercetools-frontend/assets@22.14.0
  - @commercetools-frontend/browser-history@22.14.0
  - @commercetools-frontend/constants@22.14.0
  - @commercetools-frontend/i18n@22.14.0
  - @commercetools-frontend/l10n@22.14.0
  - @commercetools-frontend/notifications@22.14.0
  - @commercetools-frontend/react-notifications@22.14.0
  - @commercetools-frontend/sdk@22.14.0
  - @commercetools-frontend/sentry@22.14.0
  - @commercetools-frontend/url-utils@22.14.0

## 22.13.2

### Patch Changes

- [#3322](https://github.com/commercetools/merchant-center-application-kit/pull/3322) [`13aa6ae2f`](https://github.com/commercetools/merchant-center-application-kit/commit/13aa6ae2fc7c007d5b603d48a030597a4e323923) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Updated `@emotion/react` dependency

- Updated dependencies [[`13aa6ae2f`](https://github.com/commercetools/merchant-center-application-kit/commit/13aa6ae2fc7c007d5b603d48a030597a4e323923), [`13aa6ae2f`](https://github.com/commercetools/merchant-center-application-kit/commit/13aa6ae2fc7c007d5b603d48a030597a4e323923)]:
  - @commercetools-frontend/application-shell-connectors@22.13.2
  - @commercetools-frontend/application-components@22.13.2
  - @commercetools-frontend/react-notifications@22.13.2
  - @commercetools-frontend/permissions@22.13.2
  - @commercetools-frontend/sentry@22.13.2
  - @commercetools-frontend/i18n@22.13.2
  - @commercetools-frontend/l10n@22.13.2
  - @commercetools-frontend/sdk@22.13.2
  - @commercetools-frontend/actions-global@22.13.2
  - @commercetools-frontend/application-config@22.13.2
  - @commercetools-frontend/assets@22.13.2
  - @commercetools-frontend/browser-history@22.13.2
  - @commercetools-frontend/constants@22.13.2
  - @commercetools-frontend/notifications@22.13.2
  - @commercetools-frontend/url-utils@22.13.2

## 22.13.1

### Patch Changes

- [#3305](https://github.com/commercetools/merchant-center-application-kit/pull/3305) [`44834670b`](https://github.com/commercetools/merchant-center-application-kit/commit/44834670bd2b640644819d483bca2bc2f13677ab) Thanks [@chloe0592](https://github.com/chloe0592)! - Updating UI-Kit dependencies to the `16.11.0` version.

- [#3315](https://github.com/commercetools/merchant-center-application-kit/pull/3315) [`e68b9f876`](https://github.com/commercetools/merchant-center-application-kit/commit/e68b9f8767e81e341266bfea19ec0dda452b775d) Thanks [@chloe0592](https://github.com/chloe0592)! - Update all ui-kit packages to v16.12.0

- [#3305](https://github.com/commercetools/merchant-center-application-kit/pull/3305) [`44834670b`](https://github.com/commercetools/merchant-center-application-kit/commit/44834670bd2b640644819d483bca2bc2f13677ab) Thanks [@chloe0592](https://github.com/chloe0592)! - Implementing "Quiet" appearance for the the App bar's `SelectInputs`.

- [#3316](https://github.com/commercetools/merchant-center-application-kit/pull/3316) [`56e4fcedd`](https://github.com/commercetools/merchant-center-application-kit/commit/56e4fcedd444d7aceaeb38ff789b5bd0eaaaca0f) Thanks [@chloe0592](https://github.com/chloe0592)! - Improving the UI of the locale and project selectors in the App bar.

- Updated dependencies [[`44834670b`](https://github.com/commercetools/merchant-center-application-kit/commit/44834670bd2b640644819d483bca2bc2f13677ab), [`e68b9f876`](https://github.com/commercetools/merchant-center-application-kit/commit/e68b9f8767e81e341266bfea19ec0dda452b775d), [`a718c4869`](https://github.com/commercetools/merchant-center-application-kit/commit/a718c4869edbf174315ab1f1f0c2029a6f4bf189), [`4662db514`](https://github.com/commercetools/merchant-center-application-kit/commit/4662db514b6c5e79cee906fc9bfb364398cb5e49), [`a567e137c`](https://github.com/commercetools/merchant-center-application-kit/commit/a567e137c0e20ece0e3b5081ee954ccd9896d156), [`ceb1b741f`](https://github.com/commercetools/merchant-center-application-kit/commit/ceb1b741f592ce59ea917b98524b59024d969e4f)]:
  - @commercetools-frontend/application-components@22.13.1
  - @commercetools-frontend/react-notifications@22.13.1
  - @commercetools-frontend/i18n@22.13.1
  - @commercetools-frontend/l10n@22.13.1
  - @commercetools-frontend/actions-global@22.13.1
  - @commercetools-frontend/application-config@22.13.1
  - @commercetools-frontend/application-shell-connectors@22.13.1
  - @commercetools-frontend/assets@22.13.1
  - @commercetools-frontend/browser-history@22.13.1
  - @commercetools-frontend/constants@22.13.1
  - @commercetools-frontend/notifications@22.13.1
  - @commercetools-frontend/permissions@22.13.1
  - @commercetools-frontend/sdk@22.13.1
  - @commercetools-frontend/sentry@22.13.1
  - @commercetools-frontend/url-utils@22.13.1

## 22.13.0

### Patch Changes

- [#3300](https://github.com/commercetools/merchant-center-application-kit/pull/3300) [`bbd48e591`](https://github.com/commercetools/merchant-center-application-kit/commit/bbd48e591553fdd72505342c04db6249742a4be1) Thanks [@jaikumar-tj](https://github.com/jaikumar-tj)! - Add extra container in `top-navigation` to display staffbar limited permission stamp

- Updated dependencies [[`db6e172ce`](https://github.com/commercetools/merchant-center-application-kit/commit/db6e172ce4d679a66fc6030e4f67c4fb5661d065)]:
  - @commercetools-frontend/application-components@22.13.0
  - @commercetools-frontend/actions-global@22.13.0
  - @commercetools-frontend/application-config@22.13.0
  - @commercetools-frontend/application-shell-connectors@22.13.0
  - @commercetools-frontend/assets@22.13.0
  - @commercetools-frontend/browser-history@22.13.0
  - @commercetools-frontend/constants@22.13.0
  - @commercetools-frontend/i18n@22.13.0
  - @commercetools-frontend/l10n@22.13.0
  - @commercetools-frontend/notifications@22.13.0
  - @commercetools-frontend/permissions@22.13.0
  - @commercetools-frontend/react-notifications@22.13.0
  - @commercetools-frontend/sdk@22.13.0
  - @commercetools-frontend/sentry@22.13.0
  - @commercetools-frontend/url-utils@22.13.0

## 22.12.0

### Minor Changes

- [#3287](https://github.com/commercetools/merchant-center-application-kit/pull/3287) [`e987dbfbc`](https://github.com/commercetools/merchant-center-application-kit/commit/e987dbfbc6473b631e86f57e843e6d7267d8cd04) Thanks [@tdeekens](https://github.com/tdeekens)! - The `ApplicationShell` and `CustomViewShell` not support an optional `enableReactStrictMode` prop to render their `children` in [Strict Mode](https://react.dev/reference/react/StrictMode).

- [#3292](https://github.com/commercetools/merchant-center-application-kit/pull/3292) [`5de8c88ed`](https://github.com/commercetools/merchant-center-application-kit/commit/5de8c88ed385215a88fcf366bf013bcc725bf87a) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Extend the `renderCustomView` test utility to allow more parameters to control how Custom Views are rendered in the testing context.

- [#3291](https://github.com/commercetools/merchant-center-application-kit/pull/3291) [`d3f4c91f1`](https://github.com/commercetools/merchant-center-application-kit/commit/d3f4c91f179a0f44801370e3d807b31e352a6ca2) Thanks [@kark](https://github.com/kark)! - Enhance the functionality of the `mc-scripts config:sync` command to support custom views.

### Patch Changes

- [#3296](https://github.com/commercetools/merchant-center-application-kit/pull/3296) [`f49adc33b`](https://github.com/commercetools/merchant-center-application-kit/commit/f49adc33b83504f6498131ee41525287110f079a) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all flopflip packages

- [#3288](https://github.com/commercetools/merchant-center-application-kit/pull/3288) [`41b15c7cb`](https://github.com/commercetools/merchant-center-application-kit/commit/41b15c7cb6773f92a83a1a16f5d8462fccd09da2) Thanks [@chloe0592](https://github.com/chloe0592)! - Reposition of the App bar elements

- [#3293](https://github.com/commercetools/merchant-center-application-kit/pull/3293) [`828189d5d`](https://github.com/commercetools/merchant-center-application-kit/commit/828189d5d2cda9e7d628d2db3c9e33cd4ae57110) Thanks [@chloe0592](https://github.com/chloe0592)! - Removing the counters from locale and project switcher in the app bar.

- Updated dependencies [[`5de8c88ed`](https://github.com/commercetools/merchant-center-application-kit/commit/5de8c88ed385215a88fcf366bf013bcc725bf87a), [`f49adc33b`](https://github.com/commercetools/merchant-center-application-kit/commit/f49adc33b83504f6498131ee41525287110f079a), [`5de8c88ed`](https://github.com/commercetools/merchant-center-application-kit/commit/5de8c88ed385215a88fcf366bf013bcc725bf87a), [`41b15c7cb`](https://github.com/commercetools/merchant-center-application-kit/commit/41b15c7cb6773f92a83a1a16f5d8462fccd09da2), [`d3f4c91f1`](https://github.com/commercetools/merchant-center-application-kit/commit/d3f4c91f179a0f44801370e3d807b31e352a6ca2), [`b5dde0308`](https://github.com/commercetools/merchant-center-application-kit/commit/b5dde030825750d21d80fbdbfceb995de2f07fb2)]:
  - @commercetools-frontend/application-config@22.12.0
  - @commercetools-frontend/application-components@22.12.0
  - @commercetools-frontend/application-shell-connectors@22.12.0
  - @commercetools-frontend/constants@22.12.0
  - @commercetools-frontend/i18n@22.12.0
  - @commercetools-frontend/permissions@22.12.0
  - @commercetools-frontend/actions-global@22.12.0
  - @commercetools-frontend/react-notifications@22.12.0
  - @commercetools-frontend/sdk@22.12.0
  - @commercetools-frontend/sentry@22.12.0
  - @commercetools-frontend/l10n@22.12.0
  - @commercetools-frontend/assets@22.12.0
  - @commercetools-frontend/browser-history@22.12.0
  - @commercetools-frontend/notifications@22.12.0
  - @commercetools-frontend/url-utils@22.12.0

## 22.11.0

### Minor Changes

- [#3282](https://github.com/commercetools/merchant-center-application-kit/pull/3282) [`0375328b1`](https://github.com/commercetools/merchant-center-application-kit/commit/0375328b1c84dd6065270b5fb991db134fa53016) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Moved feature flags constants from `@commercetools-frontend/application-components` package to `@commercetools-frontend/constants` one.

### Patch Changes

- [#3277](https://github.com/commercetools/merchant-center-application-kit/pull/3277) [`3e11bae8a`](https://github.com/commercetools/merchant-center-application-kit/commit/3e11bae8a39c3f1ea47cd2fc032a04bde5077d9d) Thanks [@chloe0592](https://github.com/chloe0592)! - We've removed components supporting the old navigation menu as we've already migrated to the new one.

- Updated dependencies [[`0c4936402`](https://github.com/commercetools/merchant-center-application-kit/commit/0c493640240fde1f7300070b6c19c67d5f203e8e), [`0375328b1`](https://github.com/commercetools/merchant-center-application-kit/commit/0375328b1c84dd6065270b5fb991db134fa53016), [`0375328b1`](https://github.com/commercetools/merchant-center-application-kit/commit/0375328b1c84dd6065270b5fb991db134fa53016)]:
  - @commercetools-frontend/application-components@22.11.0
  - @commercetools-frontend/constants@22.11.0
  - @commercetools-frontend/actions-global@22.11.0
  - @commercetools-frontend/application-config@22.11.0
  - @commercetools-frontend/application-shell-connectors@22.11.0
  - @commercetools-frontend/react-notifications@22.11.0
  - @commercetools-frontend/sdk@22.11.0
  - @commercetools-frontend/sentry@22.11.0
  - @commercetools-frontend/permissions@22.11.0
  - @commercetools-frontend/i18n@22.11.0
  - @commercetools-frontend/l10n@22.11.0
  - @commercetools-frontend/assets@22.11.0
  - @commercetools-frontend/browser-history@22.11.0
  - @commercetools-frontend/notifications@22.11.0
  - @commercetools-frontend/url-utils@22.11.0

## 22.10.0

### Minor Changes

- [#3272](https://github.com/commercetools/merchant-center-application-kit/pull/3272) [`deed7bafc`](https://github.com/commercetools/merchant-center-application-kit/commit/deed7bafcb70b8ec2258d4c752f7e81b7eccf079) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - We refactored the formatter functions to transform entry points to resource access names so it uses simplified names only for Custom Views (upcoming feature).

### Patch Changes

- [#3270](https://github.com/commercetools/merchant-center-application-kit/pull/3270) [`6bef6add7`](https://github.com/commercetools/merchant-center-application-kit/commit/6bef6add77b7567de18e447b4881caf8e7b10393) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all flopflip packages to v13.1.5

- Updated dependencies [[`deed7bafc`](https://github.com/commercetools/merchant-center-application-kit/commit/deed7bafcb70b8ec2258d4c752f7e81b7eccf079), [`669a46bf7`](https://github.com/commercetools/merchant-center-application-kit/commit/669a46bf718e2d6eb50bed5813463ed8a2c8dae3), [`6398b1946`](https://github.com/commercetools/merchant-center-application-kit/commit/6398b1946f24ee89b241f3f2eb7dd6d68de6e105)]:
  - @commercetools-frontend/application-config@22.10.0
  - @commercetools-frontend/application-components@22.10.0
  - @commercetools-frontend/application-shell-connectors@22.10.0
  - @commercetools-frontend/permissions@22.10.0
  - @commercetools-frontend/actions-global@22.10.0
  - @commercetools-frontend/assets@22.10.0
  - @commercetools-frontend/browser-history@22.10.0
  - @commercetools-frontend/constants@22.10.0
  - @commercetools-frontend/i18n@22.10.0
  - @commercetools-frontend/l10n@22.10.0
  - @commercetools-frontend/notifications@22.10.0
  - @commercetools-frontend/react-notifications@22.10.0
  - @commercetools-frontend/sdk@22.10.0
  - @commercetools-frontend/sentry@22.10.0
  - @commercetools-frontend/url-utils@22.10.0

## 22.9.1

### Patch Changes

- Updated dependencies []:
  - @commercetools-frontend/actions-global@22.9.1
  - @commercetools-frontend/application-components@22.9.1
  - @commercetools-frontend/application-config@22.9.1
  - @commercetools-frontend/application-shell-connectors@22.9.1
  - @commercetools-frontend/assets@22.9.1
  - @commercetools-frontend/browser-history@22.9.1
  - @commercetools-frontend/constants@22.9.1
  - @commercetools-frontend/i18n@22.9.1
  - @commercetools-frontend/l10n@22.9.1
  - @commercetools-frontend/notifications@22.9.1
  - @commercetools-frontend/permissions@22.9.1
  - @commercetools-frontend/react-notifications@22.9.1
  - @commercetools-frontend/sdk@22.9.1
  - @commercetools-frontend/sentry@22.9.1
  - @commercetools-frontend/url-utils@22.9.1

## 22.9.0

### Patch Changes

- [#3242](https://github.com/commercetools/merchant-center-application-kit/pull/3242) [`6023ff29e`](https://github.com/commercetools/merchant-center-application-kit/commit/6023ff29eb52ab322303065657c643100ecc4fa1) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Expose HTTP utilities from `application-shell-connectors` package.

  - `buildApiUrl`
  - `createApolloClient`
  - `createApolloContextForProxyForwardTo`
  - `createHttpClientOptions`
  - `executeHttpClientRequest`
  - `getMcApiUrl`
  - `selectUserId`
  - `selectProjectKeyFromUrl`
  - `useMcQuery`
  - `useMcLazyQuery`
  - `useMcMutation`

  For backwards compatibility these are also exported from the `application-shell` package.

- Updated dependencies [[`fe0b5f7f5`](https://github.com/commercetools/merchant-center-application-kit/commit/fe0b5f7f5bedaab4850d38d0c1df29650689b96e), [`6023ff29e`](https://github.com/commercetools/merchant-center-application-kit/commit/6023ff29eb52ab322303065657c643100ecc4fa1), [`6023ff29e`](https://github.com/commercetools/merchant-center-application-kit/commit/6023ff29eb52ab322303065657c643100ecc4fa1)]:
  - @commercetools-frontend/application-components@22.9.0
  - @commercetools-frontend/constants@22.9.0
  - @commercetools-frontend/application-shell-connectors@22.9.0
  - @commercetools-frontend/actions-global@22.9.0
  - @commercetools-frontend/application-config@22.9.0
  - @commercetools-frontend/react-notifications@22.9.0
  - @commercetools-frontend/sdk@22.9.0
  - @commercetools-frontend/sentry@22.9.0
  - @commercetools-frontend/permissions@22.9.0
  - @commercetools-frontend/i18n@22.9.0
  - @commercetools-frontend/l10n@22.9.0
  - @commercetools-frontend/assets@22.9.0
  - @commercetools-frontend/browser-history@22.9.0
  - @commercetools-frontend/notifications@22.9.0
  - @commercetools-frontend/url-utils@22.9.0

## 22.8.4

### Patch Changes

- [#3256](https://github.com/commercetools/merchant-center-application-kit/pull/3256) [`a009c4281`](https://github.com/commercetools/merchant-center-application-kit/commit/a009c4281dc37df9e776ec4b1e923340fe20cd5f) Thanks [@kark](https://github.com/kark)! - Fix wrong submenu position on menu expand button click

- [#3259](https://github.com/commercetools/merchant-center-application-kit/pull/3259) [`b7414e2f7`](https://github.com/commercetools/merchant-center-application-kit/commit/b7414e2f735c1bb160ee33f22b518f55022ec0f1) Thanks [@kark](https://github.com/kark)! - Improve user experience by not showing Navbar subemnu on first render when its vertical position is evaluated to 0

- [#3258](https://github.com/commercetools/merchant-center-application-kit/pull/3258) [`f7c1da442`](https://github.com/commercetools/merchant-center-application-kit/commit/f7c1da4424c95d3c403fba3470455a6b09ef3cca) Thanks [@kark](https://github.com/kark)! - Resolve the issue of the Navbar causing Chrome tab crashes when DevTools are open

- [#3260](https://github.com/commercetools/merchant-center-application-kit/pull/3260) [`71cce1fdf`](https://github.com/commercetools/merchant-center-application-kit/commit/71cce1fdf050050cc0d92f1472a5df82b45ca5b9) Thanks [@ddouglasz](https://github.com/ddouglasz)! - fix issue with NavBar submenu having a border radius at the bottom when expander icon is hovered on, when navbar is collapsed.

- Updated dependencies []:
  - @commercetools-frontend/actions-global@22.8.4
  - @commercetools-frontend/application-components@22.8.4
  - @commercetools-frontend/application-config@22.8.4
  - @commercetools-frontend/application-shell-connectors@22.8.4
  - @commercetools-frontend/assets@22.8.4
  - @commercetools-frontend/browser-history@22.8.4
  - @commercetools-frontend/constants@22.8.4
  - @commercetools-frontend/i18n@22.8.4
  - @commercetools-frontend/l10n@22.8.4
  - @commercetools-frontend/notifications@22.8.4
  - @commercetools-frontend/permissions@22.8.4
  - @commercetools-frontend/react-notifications@22.8.4
  - @commercetools-frontend/sdk@22.8.4
  - @commercetools-frontend/sentry@22.8.4
  - @commercetools-frontend/url-utils@22.8.4

## 22.8.3

### Patch Changes

- [#3249](https://github.com/commercetools/merchant-center-application-kit/pull/3249) [`9d8b6fc04`](https://github.com/commercetools/merchant-center-application-kit/commit/9d8b6fc04d9b6cf788cb58b7dba9faa177ddf5e3) Thanks [@chloe0592](https://github.com/chloe0592)! - First level navigation menu items are clickable again even it they have submenu items.

- [#3247](https://github.com/commercetools/merchant-center-application-kit/pull/3247) [`689cc6e32`](https://github.com/commercetools/merchant-center-application-kit/commit/689cc6e3239e2f795c3525cd0202a639f632f416) Thanks [@kark](https://github.com/kark)! - Fix performance issues with the new Navbar

- Updated dependencies []:
  - @commercetools-frontend/actions-global@22.8.3
  - @commercetools-frontend/application-components@22.8.3
  - @commercetools-frontend/application-config@22.8.3
  - @commercetools-frontend/application-shell-connectors@22.8.3
  - @commercetools-frontend/assets@22.8.3
  - @commercetools-frontend/browser-history@22.8.3
  - @commercetools-frontend/constants@22.8.3
  - @commercetools-frontend/i18n@22.8.3
  - @commercetools-frontend/l10n@22.8.3
  - @commercetools-frontend/notifications@22.8.3
  - @commercetools-frontend/permissions@22.8.3
  - @commercetools-frontend/react-notifications@22.8.3
  - @commercetools-frontend/sdk@22.8.3
  - @commercetools-frontend/sentry@22.8.3
  - @commercetools-frontend/url-utils@22.8.3

## 22.8.2

### Patch Changes

- [#3218](https://github.com/commercetools/merchant-center-application-kit/pull/3218) [`b23bd6049`](https://github.com/commercetools/merchant-center-application-kit/commit/b23bd60490be8822549c418fc431825bf0058a5f) Thanks [@ddouglasz](https://github.com/ddouglasz)! - add transition to nav items on hover

- [#3241](https://github.com/commercetools/merchant-center-application-kit/pull/3241) [`2f1956868`](https://github.com/commercetools/merchant-center-application-kit/commit/2f1956868b248161fcaf77c41774f494bb2f9a90) Thanks [@emmenko](https://github.com/emmenko)! - Disable route check for `<CustomViewDevHost>`

- [#3237](https://github.com/commercetools/merchant-center-application-kit/pull/3237) [`ef6aad473`](https://github.com/commercetools/merchant-center-application-kit/commit/ef6aad47368889fe1c69d847a16f092cf591c6d0) Thanks [@ddouglasz](https://github.com/ddouglasz)! - add trantition to navbar, navbar items and submenu items

- [#3221](https://github.com/commercetools/merchant-center-application-kit/pull/3221) [`db0ae5b18`](https://github.com/commercetools/merchant-center-application-kit/commit/db0ae5b18d51fbce7f1527ff202b30832b1a05c5) Thanks [@kark](https://github.com/kark)! - Include tests for ApplicationShell that reflect the changes introduced in the new navbar

- Updated dependencies []:
  - @commercetools-frontend/actions-global@22.8.2
  - @commercetools-frontend/application-components@22.8.2
  - @commercetools-frontend/application-config@22.8.2
  - @commercetools-frontend/application-shell-connectors@22.8.2
  - @commercetools-frontend/assets@22.8.2
  - @commercetools-frontend/browser-history@22.8.2
  - @commercetools-frontend/constants@22.8.2
  - @commercetools-frontend/i18n@22.8.2
  - @commercetools-frontend/l10n@22.8.2
  - @commercetools-frontend/notifications@22.8.2
  - @commercetools-frontend/permissions@22.8.2
  - @commercetools-frontend/react-notifications@22.8.2
  - @commercetools-frontend/sdk@22.8.2
  - @commercetools-frontend/sentry@22.8.2
  - @commercetools-frontend/url-utils@22.8.2

## 22.8.1

### Patch Changes

- [#3232](https://github.com/commercetools/merchant-center-application-kit/pull/3232) [`10ade8b9b`](https://github.com/commercetools/merchant-center-application-kit/commit/10ade8b9bab48a6d08abfd7fc31c3a3e8f48f3a4) Thanks [@kark](https://github.com/kark)! - Fix clickable area of the submenu link

- Updated dependencies [[`ec2c26677`](https://github.com/commercetools/merchant-center-application-kit/commit/ec2c26677f0aa6119d9f8eff247f620720a4d8ee)]:
  - @commercetools-frontend/application-config@22.8.1
  - @commercetools-frontend/actions-global@22.8.1
  - @commercetools-frontend/application-components@22.8.1
  - @commercetools-frontend/application-shell-connectors@22.8.1
  - @commercetools-frontend/assets@22.8.1
  - @commercetools-frontend/browser-history@22.8.1
  - @commercetools-frontend/constants@22.8.1
  - @commercetools-frontend/i18n@22.8.1
  - @commercetools-frontend/l10n@22.8.1
  - @commercetools-frontend/notifications@22.8.1
  - @commercetools-frontend/permissions@22.8.1
  - @commercetools-frontend/react-notifications@22.8.1
  - @commercetools-frontend/sdk@22.8.1
  - @commercetools-frontend/sentry@22.8.1
  - @commercetools-frontend/url-utils@22.8.1

## 22.8.0

### Minor Changes

- [#3175](https://github.com/commercetools/merchant-center-application-kit/pull/3175) [`bd9df94b5`](https://github.com/commercetools/merchant-center-application-kit/commit/bd9df94b565faf308f82bd39d6ca4ebf5892ed9f) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Define context for Custom Views

- [#3175](https://github.com/commercetools/merchant-center-application-kit/pull/3175) [`bd9df94b5`](https://github.com/commercetools/merchant-center-application-kit/commit/bd9df94b565faf308f82bd39d6ca4ebf5892ed9f) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Support loading and parsing of new config for Custom Views

### Patch Changes

- [#3220](https://github.com/commercetools/merchant-center-application-kit/pull/3220) [`f30cc5ca6`](https://github.com/commercetools/merchant-center-application-kit/commit/f30cc5ca6d9f9f47836b04915ac7233ac1437976) Thanks [@chloe0592](https://github.com/chloe0592)! - small UI changes in new navigation

- [#3210](https://github.com/commercetools/merchant-center-application-kit/pull/3210) [`d5e7303fd`](https://github.com/commercetools/merchant-center-application-kit/commit/d5e7303fd9ca450fabba47c2fdccf1a275852f00) Thanks [@kark](https://github.com/kark)! - Adjust PortalsContainer offsets to accommodate the new Navbar

- [#3205](https://github.com/commercetools/merchant-center-application-kit/pull/3205) [`cf560fbd4`](https://github.com/commercetools/merchant-center-application-kit/commit/cf560fbd47d284657e06fc27af9387b342557924) Thanks [@chloe0592](https://github.com/chloe0592)! - Updating Ui-Kit dependencies to v `16.7.3`

- [#3203](https://github.com/commercetools/merchant-center-application-kit/pull/3203) [`e0a7b5150`](https://github.com/commercetools/merchant-center-application-kit/commit/e0a7b515058a389794d5040cb4b7785708d59cbb) Thanks [@chloe0592](https://github.com/chloe0592)! - Adding new styling to side navigation (colors, scrollbar, spacings)

- [#3200](https://github.com/commercetools/merchant-center-application-kit/pull/3200) [`938f79391`](https://github.com/commercetools/merchant-center-application-kit/commit/938f79391746077eb7b71a64acbf1dd73b3b3d06) Thanks [@chloe0592](https://github.com/chloe0592)! - Updating style of the navigation footer

- [#3175](https://github.com/commercetools/merchant-center-application-kit/pull/3175) [`bd9df94b5`](https://github.com/commercetools/merchant-center-application-kit/commit/bd9df94b565faf308f82bd39d6ca4ebf5892ed9f) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Move `<CustomViewLoader>` component to `application-shell` package

- [#3082](https://github.com/commercetools/merchant-center-application-kit/pull/3082) [`e29ab64b6`](https://github.com/commercetools/merchant-center-application-kit/commit/e29ab64b6032ff42bdb2254ef4e57d16291a45db) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

- [#3224](https://github.com/commercetools/merchant-center-application-kit/pull/3224) [`bef02f8ac`](https://github.com/commercetools/merchant-center-application-kit/commit/bef02f8ac0185eb293e0d295f320f753cc0eff18) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update dependency graphql to v16.8.1 [security]

- [#3204](https://github.com/commercetools/merchant-center-application-kit/pull/3204) [`3be9e8719`](https://github.com/commercetools/merchant-center-application-kit/commit/3be9e8719e80f1594490c4861a65a97f5dc403ed) Thanks [@kark](https://github.com/kark)! - Display correct Navbar submenu position

- [#3211](https://github.com/commercetools/merchant-center-application-kit/pull/3211) [`a911ae90d`](https://github.com/commercetools/merchant-center-application-kit/commit/a911ae90de00d0196390b043da51246c2198c143) Thanks [@kark](https://github.com/kark)! - Fix left navigation height when global notification is displayed

- [#3212](https://github.com/commercetools/merchant-center-application-kit/pull/3212) [`da1236982`](https://github.com/commercetools/merchant-center-application-kit/commit/da1236982646042aa13cda3962d24481ec27e546) Thanks [@chloe0592](https://github.com/chloe0592)! - Small navigation layout improvements

- [#3209](https://github.com/commercetools/merchant-center-application-kit/pull/3209) [`4703c830c`](https://github.com/commercetools/merchant-center-application-kit/commit/4703c830c14ce6a0520089eff040afdb1ae86516) Thanks [@chloe0592](https://github.com/chloe0592)! - change the menu-item click behaviour

- [#3198](https://github.com/commercetools/merchant-center-application-kit/pull/3198) [`3da2c956d`](https://github.com/commercetools/merchant-center-application-kit/commit/3da2c956d9feaad710d7445bf520c18b64a588b8) Thanks [@kark](https://github.com/kark)! - Refactor Navbar component to use a single point of feature flag evaluation

- [#3216](https://github.com/commercetools/merchant-center-application-kit/pull/3216) [`1986d18d1`](https://github.com/commercetools/merchant-center-application-kit/commit/1986d18d1b411013514df21cbb5966ffbe4b6178) Thanks [@ddouglasz](https://github.com/ddouglasz)! - Navigation header redesign.

- [#3192](https://github.com/commercetools/merchant-center-application-kit/pull/3192) [`e793cef7c`](https://github.com/commercetools/merchant-center-application-kit/commit/e793cef7cb7fa650a796c668bbfc6d0ea2ef52d6) Thanks [@kark](https://github.com/kark)! - Add tooltip to the new Navbar

- Updated dependencies [[`cf560fbd4`](https://github.com/commercetools/merchant-center-application-kit/commit/cf560fbd47d284657e06fc27af9387b342557924), [`c121508f5`](https://github.com/commercetools/merchant-center-application-kit/commit/c121508f50111c4e9d28b06158ca55af52aac1e2), [`bd9df94b5`](https://github.com/commercetools/merchant-center-application-kit/commit/bd9df94b565faf308f82bd39d6ca4ebf5892ed9f), [`bd9df94b5`](https://github.com/commercetools/merchant-center-application-kit/commit/bd9df94b565faf308f82bd39d6ca4ebf5892ed9f), [`bd9df94b5`](https://github.com/commercetools/merchant-center-application-kit/commit/bd9df94b565faf308f82bd39d6ca4ebf5892ed9f), [`e29ab64b6`](https://github.com/commercetools/merchant-center-application-kit/commit/e29ab64b6032ff42bdb2254ef4e57d16291a45db), [`bef02f8ac`](https://github.com/commercetools/merchant-center-application-kit/commit/bef02f8ac0185eb293e0d295f320f753cc0eff18), [`1986d18d1`](https://github.com/commercetools/merchant-center-application-kit/commit/1986d18d1b411013514df21cbb5966ffbe4b6178)]:
  - @commercetools-frontend/application-components@22.8.0
  - @commercetools-frontend/react-notifications@22.8.0
  - @commercetools-frontend/i18n@22.8.0
  - @commercetools-frontend/l10n@22.8.0
  - @commercetools-frontend/application-shell-connectors@22.8.0
  - @commercetools-frontend/application-config@22.8.0
  - @commercetools-frontend/permissions@22.8.0
  - @commercetools-frontend/constants@22.8.0
  - @commercetools-frontend/sdk@22.8.0
  - @commercetools-frontend/browser-history@22.8.0
  - @commercetools-frontend/actions-global@22.8.0
  - @commercetools-frontend/notifications@22.8.0
  - @commercetools-frontend/url-utils@22.8.0
  - @commercetools-frontend/sentry@22.8.0
  - @commercetools-frontend/assets@22.8.0

## 22.7.1

### Patch Changes

- [#3193](https://github.com/commercetools/merchant-center-application-kit/pull/3193) [`6db7d79b0`](https://github.com/commercetools/merchant-center-application-kit/commit/6db7d79b0a0d94d6bf0a600110a5c63fab459f7c) Thanks [@kark](https://github.com/kark)! - Fix inconsistent Navbar behavior by using the default value for isForcedMenuOpen.

- [#3185](https://github.com/commercetools/merchant-center-application-kit/pull/3185) [`f5893edb6`](https://github.com/commercetools/merchant-center-application-kit/commit/f5893edb6723e274176646926ad9e748b30030ca) Thanks [@kark](https://github.com/kark)! - Add new navigation submenus styles

- [#3194](https://github.com/commercetools/merchant-center-application-kit/pull/3194) [`51a988f4d`](https://github.com/commercetools/merchant-center-application-kit/commit/51a988f4dfa31204799c32db070b88473e4a5ffd) Thanks [@chloe0592](https://github.com/chloe0592)! - Fix the grid columns issue in new Navigation layout

- Updated dependencies []:
  - @commercetools-frontend/actions-global@22.7.1
  - @commercetools-frontend/application-components@22.7.1
  - @commercetools-frontend/application-config@22.7.1
  - @commercetools-frontend/application-shell-connectors@22.7.1
  - @commercetools-frontend/assets@22.7.1
  - @commercetools-frontend/browser-history@22.7.1
  - @commercetools-frontend/constants@22.7.1
  - @commercetools-frontend/i18n@22.7.1
  - @commercetools-frontend/l10n@22.7.1
  - @commercetools-frontend/notifications@22.7.1
  - @commercetools-frontend/permissions@22.7.1
  - @commercetools-frontend/react-notifications@22.7.1
  - @commercetools-frontend/sdk@22.7.1
  - @commercetools-frontend/sentry@22.7.1
  - @commercetools-frontend/url-utils@22.7.1

## 22.7.0

### Minor Changes

- [#3165](https://github.com/commercetools/merchant-center-application-kit/pull/3165) [`51deaa6fc`](https://github.com/commercetools/merchant-center-application-kit/commit/51deaa6fc32b3be2439853d952ce8a5ae6db93e3) Thanks [@kark](https://github.com/kark)! - Support a new `NavBar` skeleton ui based on a feature flag.

- [#3181](https://github.com/commercetools/merchant-center-application-kit/pull/3181) [`69667013c`](https://github.com/commercetools/merchant-center-application-kit/commit/69667013c73636d0d0ce7ac97da3780a004ff7b6) Thanks [@emmenko](https://github.com/emmenko)! - Support new application locale `pt-BR`

### Patch Changes

- [#3184](https://github.com/commercetools/merchant-center-application-kit/pull/3184) [`a6ebc4d1b`](https://github.com/commercetools/merchant-center-application-kit/commit/a6ebc4d1ba265bf21a1ee33f0311a3eb6fca20c0) Thanks [@kark](https://github.com/kark)! - Reverting MainPageContent style change due to breaking sticky DataTable styles.
  Fix for NavBar submenu title's `z-index`.

- [#3186](https://github.com/commercetools/merchant-center-application-kit/pull/3186) [`c3a7893c0`](https://github.com/commercetools/merchant-center-application-kit/commit/c3a7893c07bde119a7874ac56337e3e7720b1b01) Thanks [@chloe0592](https://github.com/chloe0592)! - Updating Ui-Kit dependencies to v `16.7.0`

- [#3169](https://github.com/commercetools/merchant-center-application-kit/pull/3169) [`d36fda3d0`](https://github.com/commercetools/merchant-center-application-kit/commit/d36fda3d00534c62ac87acb3c88c36e908732ca9) Thanks [@chloe0592](https://github.com/chloe0592)! - Creating scroll functionality in the new navigation.

- [#3176](https://github.com/commercetools/merchant-center-application-kit/pull/3176) [`9224192b8`](https://github.com/commercetools/merchant-center-application-kit/commit/9224192b86e3c716d4f2374e011106af35462e84) Thanks [@chloe0592](https://github.com/chloe0592)! - Update `ui-kit` dependencies to version `16.6.1`

- [#3181](https://github.com/commercetools/merchant-center-application-kit/pull/3181) [`69667013c`](https://github.com/commercetools/merchant-center-application-kit/commit/69667013c73636d0d0ce7ac97da3780a004ff7b6) Thanks [@emmenko](https://github.com/emmenko)! - Update UI Kit dependencies

- [#3188](https://github.com/commercetools/merchant-center-application-kit/pull/3188) [`0a100cb41`](https://github.com/commercetools/merchant-center-application-kit/commit/0a100cb415433209310afa014a3eb527b59c76ab) Thanks [@kark](https://github.com/kark)! - Enable unhiding Navbar's submenu by unsetting `display` value

- [#3177](https://github.com/commercetools/merchant-center-application-kit/pull/3177) [`6fa0a6adc`](https://github.com/commercetools/merchant-center-application-kit/commit/6fa0a6adc8aa53b9ef5c86e8bd88909370b92c9f) Thanks [@kark](https://github.com/kark)! - Fix issue with NavBar's `z-index` in Safari

- [#3183](https://github.com/commercetools/merchant-center-application-kit/pull/3183) [`f35a1b3ba`](https://github.com/commercetools/merchant-center-application-kit/commit/f35a1b3ba8aa5c869c2b77dd41eaeca5e975bbec) Thanks [@kark](https://github.com/kark)! - Resolve the problem of a hidden menu with multiple items overflowing the layout

- [#3172](https://github.com/commercetools/merchant-center-application-kit/pull/3172) [`0865a7051`](https://github.com/commercetools/merchant-center-application-kit/commit/0865a7051fc47ad0556b472eb8b4712477323847) Thanks [@tdeekens](https://github.com/tdeekens)! - Refactor to use `useAdapterStatus` inside navigation.

- [#3189](https://github.com/commercetools/merchant-center-application-kit/pull/3189) [`7bfc2ade4`](https://github.com/commercetools/merchant-center-application-kit/commit/7bfc2ade4d8805353f3e1196adacfe3c57d2f387) Thanks [@kark](https://github.com/kark)! - Display sublist as block when expanded

- Updated dependencies [[`a6ebc4d1b`](https://github.com/commercetools/merchant-center-application-kit/commit/a6ebc4d1ba265bf21a1ee33f0311a3eb6fca20c0), [`c3a7893c0`](https://github.com/commercetools/merchant-center-application-kit/commit/c3a7893c07bde119a7874ac56337e3e7720b1b01), [`bf2df5683`](https://github.com/commercetools/merchant-center-application-kit/commit/bf2df568398e8b7558405df954166aefd8d1f963), [`9224192b8`](https://github.com/commercetools/merchant-center-application-kit/commit/9224192b86e3c716d4f2374e011106af35462e84), [`69667013c`](https://github.com/commercetools/merchant-center-application-kit/commit/69667013c73636d0d0ce7ac97da3780a004ff7b6), [`69667013c`](https://github.com/commercetools/merchant-center-application-kit/commit/69667013c73636d0d0ce7ac97da3780a004ff7b6), [`f3a06a444`](https://github.com/commercetools/merchant-center-application-kit/commit/f3a06a44462768241d4df1cb44f60f294ab28699)]:
  - @commercetools-frontend/application-components@22.7.0
  - @commercetools-frontend/react-notifications@22.7.0
  - @commercetools-frontend/i18n@22.7.0
  - @commercetools-frontend/application-config@22.7.0
  - @commercetools-frontend/l10n@22.7.0
  - @commercetools-frontend/constants@22.7.0
  - @commercetools-frontend/sentry@22.7.0
  - @commercetools-frontend/actions-global@22.7.0
  - @commercetools-frontend/application-shell-connectors@22.7.0
  - @commercetools-frontend/sdk@22.7.0
  - @commercetools-frontend/permissions@22.7.0
  - @commercetools-frontend/assets@22.7.0
  - @commercetools-frontend/browser-history@22.7.0
  - @commercetools-frontend/notifications@22.7.0
  - @commercetools-frontend/url-utils@22.7.0

## 22.6.0

### Minor Changes

- [#3153](https://github.com/commercetools/merchant-center-application-kit/pull/3153) [`2fef66247`](https://github.com/commercetools/merchant-center-application-kit/commit/2fef66247ff08f225dfa03f75f3aaf640659f32b) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Include `X-Custom-View-Id` header in all requests if it is available.

### Patch Changes

- [#3159](https://github.com/commercetools/merchant-center-application-kit/pull/3159) [`ff9af8fc5`](https://github.com/commercetools/merchant-center-application-kit/commit/ff9af8fc51c2f71e4de09179811454fc3761e9e1) Thanks [@chloe0592](https://github.com/chloe0592)! - Render a slightly different root layout using a feature flag. The change is only used internally for now, as we are working on some design updates.

- Updated dependencies [[`2fef66247`](https://github.com/commercetools/merchant-center-application-kit/commit/2fef66247ff08f225dfa03f75f3aaf640659f32b)]:
  - @commercetools-frontend/constants@22.6.0
  - @commercetools-frontend/actions-global@22.6.0
  - @commercetools-frontend/application-components@22.6.0
  - @commercetools-frontend/application-shell-connectors@22.6.0
  - @commercetools-frontend/react-notifications@22.6.0
  - @commercetools-frontend/sdk@22.6.0
  - @commercetools-frontend/sentry@22.6.0
  - @commercetools-frontend/permissions@22.6.0
  - @commercetools-frontend/i18n@22.6.0
  - @commercetools-frontend/l10n@22.6.0
  - @commercetools-frontend/application-config@22.6.0
  - @commercetools-frontend/assets@22.6.0
  - @commercetools-frontend/browser-history@22.6.0
  - @commercetools-frontend/notifications@22.6.0
  - @commercetools-frontend/url-utils@22.6.0

## 22.5.0

### Minor Changes

- [#3142](https://github.com/commercetools/merchant-center-application-kit/pull/3142) [`91c60f154`](https://github.com/commercetools/merchant-center-application-kit/commit/91c60f154cd874755512691bb7d014acf631afb4) Thanks [@tylermorrisford](https://github.com/tylermorrisford)! - Add `sampleDataImportDataset` to project query, map value to project context.

- [#3143](https://github.com/commercetools/merchant-center-application-kit/pull/3143) [`6b6f15623`](https://github.com/commercetools/merchant-center-application-kit/commit/6b6f15623f06dc7a301bbdddee2757303dd223d9) Thanks [@kark](https://github.com/kark)! - Enable reading `applicationId` value from Custom Application config and sending it as a new `application_id` claim (when `team_id` claim is also provided)

### Patch Changes

- Updated dependencies [[`91c60f154`](https://github.com/commercetools/merchant-center-application-kit/commit/91c60f154cd874755512691bb7d014acf631afb4), [`a90891658`](https://github.com/commercetools/merchant-center-application-kit/commit/a90891658959affac8d15dfae446125e69d3ecd4), [`bcfe23393`](https://github.com/commercetools/merchant-center-application-kit/commit/bcfe23393d3c9ed26fd2e1c36d3c610c359dec2e), [`6cef91c8e`](https://github.com/commercetools/merchant-center-application-kit/commit/6cef91c8e3e18c7ea4ab55d42a7df2dbf72f5a1e), [`6b6f15623`](https://github.com/commercetools/merchant-center-application-kit/commit/6b6f15623f06dc7a301bbdddee2757303dd223d9)]:
  - @commercetools-frontend/application-shell-connectors@22.5.0
  - @commercetools-frontend/application-components@22.5.0
  - @commercetools-frontend/application-config@22.5.0
  - @commercetools-frontend/constants@22.5.0
  - @commercetools-frontend/permissions@22.5.0
  - @commercetools-frontend/actions-global@22.5.0
  - @commercetools-frontend/react-notifications@22.5.0
  - @commercetools-frontend/sdk@22.5.0
  - @commercetools-frontend/sentry@22.5.0
  - @commercetools-frontend/i18n@22.5.0
  - @commercetools-frontend/l10n@22.5.0
  - @commercetools-frontend/assets@22.5.0
  - @commercetools-frontend/browser-history@22.5.0
  - @commercetools-frontend/notifications@22.5.0
  - @commercetools-frontend/url-utils@22.5.0

## 22.4.0

### Patch Changes

- [#3140](https://github.com/commercetools/merchant-center-application-kit/pull/3140) [`d9b3283e5`](https://github.com/commercetools/merchant-center-application-kit/commit/d9b3283e533502b93068a8033f1a77c5cf1e8b00) Thanks [@kark](https://github.com/kark)! - fix: send `teamId` as GraphQL request header in Custom Application local development

- Updated dependencies [[`55e81421c`](https://github.com/commercetools/merchant-center-application-kit/commit/55e81421c10774f991ca70c849179d69c647b547)]:
  - @commercetools-frontend/l10n@22.4.0
  - @commercetools-frontend/application-components@22.4.0
  - @commercetools-frontend/actions-global@22.4.0
  - @commercetools-frontend/application-config@22.4.0
  - @commercetools-frontend/application-shell-connectors@22.4.0
  - @commercetools-frontend/assets@22.4.0
  - @commercetools-frontend/browser-history@22.4.0
  - @commercetools-frontend/constants@22.4.0
  - @commercetools-frontend/i18n@22.4.0
  - @commercetools-frontend/notifications@22.4.0
  - @commercetools-frontend/permissions@22.4.0
  - @commercetools-frontend/react-notifications@22.4.0
  - @commercetools-frontend/sdk@22.4.0
  - @commercetools-frontend/sentry@22.4.0
  - @commercetools-frontend/url-utils@22.4.0

## 22.3.4

### Patch Changes

- Updated dependencies [[`439abfe18`](https://github.com/commercetools/merchant-center-application-kit/commit/439abfe1816b87a232c0550e2bc4d91f11c58b0b)]:
  - @commercetools-frontend/application-components@22.3.4
  - @commercetools-frontend/actions-global@22.3.4
  - @commercetools-frontend/application-config@22.3.4
  - @commercetools-frontend/application-shell-connectors@22.3.4
  - @commercetools-frontend/assets@22.3.4
  - @commercetools-frontend/browser-history@22.3.4
  - @commercetools-frontend/constants@22.3.4
  - @commercetools-frontend/i18n@22.3.4
  - @commercetools-frontend/l10n@22.3.4
  - @commercetools-frontend/notifications@22.3.4
  - @commercetools-frontend/permissions@22.3.4
  - @commercetools-frontend/react-notifications@22.3.4
  - @commercetools-frontend/sdk@22.3.4
  - @commercetools-frontend/sentry@22.3.4
  - @commercetools-frontend/url-utils@22.3.4

## 22.3.3

### Patch Changes

- [#3123](https://github.com/commercetools/merchant-center-application-kit/pull/3123) [`f7fdabe8d`](https://github.com/commercetools/merchant-center-application-kit/commit/f7fdabe8d53bdb94da7b182c38da70b172346ef4) Thanks [@jaikumar-tj](https://github.com/jaikumar-tj)! - Read teamId from session storage instead of local storage

- Updated dependencies [[`0918b4620`](https://github.com/commercetools/merchant-center-application-kit/commit/0918b46208e60b36f5ed071d65879e2902900da7)]:
  - @commercetools-frontend/application-components@22.3.3
  - @commercetools-frontend/actions-global@22.3.3
  - @commercetools-frontend/application-config@22.3.3
  - @commercetools-frontend/application-shell-connectors@22.3.3
  - @commercetools-frontend/assets@22.3.3
  - @commercetools-frontend/browser-history@22.3.3
  - @commercetools-frontend/constants@22.3.3
  - @commercetools-frontend/i18n@22.3.3
  - @commercetools-frontend/l10n@22.3.3
  - @commercetools-frontend/notifications@22.3.3
  - @commercetools-frontend/permissions@22.3.3
  - @commercetools-frontend/react-notifications@22.3.3
  - @commercetools-frontend/sdk@22.3.3
  - @commercetools-frontend/sentry@22.3.3
  - @commercetools-frontend/url-utils@22.3.3

## 22.3.2

### Patch Changes

- [#3121](https://github.com/commercetools/merchant-center-application-kit/pull/3121) [`14f31aae4`](https://github.com/commercetools/merchant-center-application-kit/commit/14f31aae4aa55b30c3b46ac670ef711d13461d1e) Thanks [@chloe0592](https://github.com/chloe0592)! - Update `ui-kit` dependencies

- Updated dependencies [[`7d2221314`](https://github.com/commercetools/merchant-center-application-kit/commit/7d222131415179fb4cdda81d3841ee61f60b62f4), [`14f31aae4`](https://github.com/commercetools/merchant-center-application-kit/commit/14f31aae4aa55b30c3b46ac670ef711d13461d1e)]:
  - @commercetools-frontend/application-components@22.3.2
  - @commercetools-frontend/react-notifications@22.3.2
  - @commercetools-frontend/i18n@22.3.2
  - @commercetools-frontend/actions-global@22.3.2
  - @commercetools-frontend/application-config@22.3.2
  - @commercetools-frontend/application-shell-connectors@22.3.2
  - @commercetools-frontend/assets@22.3.2
  - @commercetools-frontend/browser-history@22.3.2
  - @commercetools-frontend/constants@22.3.2
  - @commercetools-frontend/l10n@22.3.2
  - @commercetools-frontend/notifications@22.3.2
  - @commercetools-frontend/permissions@22.3.2
  - @commercetools-frontend/sdk@22.3.2
  - @commercetools-frontend/sentry@22.3.2
  - @commercetools-frontend/url-utils@22.3.2

## 22.3.1

### Patch Changes

- [#3100](https://github.com/commercetools/merchant-center-application-kit/pull/3100) [`8e814adfb`](https://github.com/commercetools/merchant-center-application-kit/commit/8e814adfbc09daadc884dac78be4a5e5c0d5492c) Thanks [@emmenko](https://github.com/emmenko)! - Update illustrations leftovers and use correct illustrations for maintenance pages

- [#3088](https://github.com/commercetools/merchant-center-application-kit/pull/3088) [`e21250f2a`](https://github.com/commercetools/merchant-center-application-kit/commit/e21250f2ae8973a290bc12a0ddb85f077a31f11e) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Remove supporting code for look and feel migration.

- [#3106](https://github.com/commercetools/merchant-center-application-kit/pull/3106) [`b38784748`](https://github.com/commercetools/merchant-center-application-kit/commit/b387847485f79c48a1c026a23afb45f5a77877aa) Thanks [@tdeekens](https://github.com/tdeekens)! - Remove redesign announcement banner used only internally.

- [#3095](https://github.com/commercetools/merchant-center-application-kit/pull/3095) [`335bca436`](https://github.com/commercetools/merchant-center-application-kit/commit/335bca436966e420610a7c9e1c1f42da263cae14) Thanks [@emmenko](https://github.com/emmenko)! - Fix applying new design to error page when user authentication fails in local development

- Updated dependencies [[`8e814adfb`](https://github.com/commercetools/merchant-center-application-kit/commit/8e814adfbc09daadc884dac78be4a5e5c0d5492c), [`e21250f2a`](https://github.com/commercetools/merchant-center-application-kit/commit/e21250f2ae8973a290bc12a0ddb85f077a31f11e), [`b38784748`](https://github.com/commercetools/merchant-center-application-kit/commit/b387847485f79c48a1c026a23afb45f5a77877aa), [`0c391fba4`](https://github.com/commercetools/merchant-center-application-kit/commit/0c391fba458c2cf279aa6dbe50ec31386042b6e3), [`8495d95a8`](https://github.com/commercetools/merchant-center-application-kit/commit/8495d95a8e8570528ac207840f17155c4dc71af8), [`d8b48486a`](https://github.com/commercetools/merchant-center-application-kit/commit/d8b48486a46bc9638544ca88e1cac588c88e8be9)]:
  - @commercetools-frontend/application-components@22.3.1
  - @commercetools-frontend/assets@22.3.1
  - @commercetools-frontend/react-notifications@22.3.1
  - @commercetools-frontend/i18n@22.3.1
  - @commercetools-frontend/application-config@22.3.1
  - @commercetools-frontend/actions-global@22.3.1
  - @commercetools-frontend/application-shell-connectors@22.3.1
  - @commercetools-frontend/browser-history@22.3.1
  - @commercetools-frontend/constants@22.3.1
  - @commercetools-frontend/l10n@22.3.1
  - @commercetools-frontend/notifications@22.3.1
  - @commercetools-frontend/permissions@22.3.1
  - @commercetools-frontend/sdk@22.3.1
  - @commercetools-frontend/sentry@22.3.1
  - @commercetools-frontend/url-utils@22.3.1

## 22.3.0

### Minor Changes

- [#2976](https://github.com/commercetools/merchant-center-application-kit/pull/2976) [`9add8f46b`](https://github.com/commercetools/merchant-center-application-kit/commit/9add8f46b668fb95b2c966a087bfb00c807ab55e) Thanks [@emmenko](https://github.com/emmenko)! - We migrate from Yarn to Pnpm as the package manager for the App Kit repository. As a result of it there were several packages that didn't specify all the needed dependencies. This is fixed now.

### Patch Changes

- [#3076](https://github.com/commercetools/merchant-center-application-kit/pull/3076) [`a7267c306`](https://github.com/commercetools/merchant-center-application-kit/commit/a7267c306c6085ec448701490be7ec7d100cfc2a) Thanks [@emmenko](https://github.com/emmenko)! - Redesign is enabled by default

- [#3061](https://github.com/commercetools/merchant-center-application-kit/pull/3061) [`448774957`](https://github.com/commercetools/merchant-center-application-kit/commit/44877495721371ae251e11f6b7d926344cfeae0b) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies.

- [#3080](https://github.com/commercetools/merchant-center-application-kit/pull/3080) [`5c3d8268b`](https://github.com/commercetools/merchant-center-application-kit/commit/5c3d8268bf575e1ee79fd1ab6770a042101e9a96) Thanks [@Rhotimee](https://github.com/Rhotimee)! - Clean up legacy Custom Applications.

- Updated dependencies [[`448774957`](https://github.com/commercetools/merchant-center-application-kit/commit/44877495721371ae251e11f6b7d926344cfeae0b), [`9add8f46b`](https://github.com/commercetools/merchant-center-application-kit/commit/9add8f46b668fb95b2c966a087bfb00c807ab55e), [`08395905f`](https://github.com/commercetools/merchant-center-application-kit/commit/08395905f80fb908dfac1cb2c9873762a2c87f25)]:
  - @commercetools-frontend/application-shell-connectors@22.3.0
  - @commercetools-frontend/application-components@22.3.0
  - @commercetools-frontend/react-notifications@22.3.0
  - @commercetools-frontend/permissions@22.3.0
  - @commercetools-frontend/sentry@22.3.0
  - @commercetools-frontend/i18n@22.3.0
  - @commercetools-frontend/l10n@22.3.0
  - @commercetools-frontend/application-config@22.3.0
  - @commercetools-frontend/browser-history@22.3.0
  - @commercetools-frontend/actions-global@22.3.0
  - @commercetools-frontend/url-utils@22.3.0
  - @commercetools-frontend/sdk@22.3.0
  - @commercetools-frontend/assets@22.3.0
  - @commercetools-frontend/constants@22.3.0
  - @commercetools-frontend/notifications@22.3.0

## 22.2.1

### Patch Changes

- [#3071](https://github.com/commercetools/merchant-center-application-kit/pull/3071) [`75ebaaf2d`](https://github.com/commercetools/merchant-center-application-kit/commit/75ebaaf2dd02ccd609a330d99072d5d1fe0b6051) Thanks [@emmenko](https://github.com/emmenko)! - Fix regression of matching menu links for sub routes.

- Updated dependencies []:
  - @commercetools-frontend/actions-global@22.2.1
  - @commercetools-frontend/application-components@22.2.1
  - @commercetools-frontend/application-config@22.2.1
  - @commercetools-frontend/application-shell-connectors@22.2.1
  - @commercetools-frontend/assets@22.2.1
  - @commercetools-frontend/browser-history@22.2.1
  - @commercetools-frontend/constants@22.2.1
  - @commercetools-frontend/i18n@22.2.1
  - @commercetools-frontend/l10n@22.2.1
  - @commercetools-frontend/notifications@22.2.1
  - @commercetools-frontend/permissions@22.2.1
  - @commercetools-frontend/react-notifications@22.2.1
  - @commercetools-frontend/sdk@22.2.1
  - @commercetools-frontend/sentry@22.2.1
  - @commercetools-frontend/url-utils@22.2.1

## 22.2.0

### Minor Changes

- [#3066](https://github.com/commercetools/merchant-center-application-kit/pull/3066) [`bf4a45396`](https://github.com/commercetools/merchant-center-application-kit/commit/bf4a45396a7571f4926567ba7ce091a3fb103a68) Thanks [@jaikumar-tj](https://github.com/jaikumar-tj)! - Adds an empty element above the `top-navigation`.

### Patch Changes

- Updated dependencies []:
  - @commercetools-frontend/actions-global@22.2.0
  - @commercetools-frontend/application-components@22.2.0
  - @commercetools-frontend/application-config@22.2.0
  - @commercetools-frontend/application-shell-connectors@22.2.0
  - @commercetools-frontend/assets@22.2.0
  - @commercetools-frontend/browser-history@22.2.0
  - @commercetools-frontend/constants@22.2.0
  - @commercetools-frontend/i18n@22.2.0
  - @commercetools-frontend/l10n@22.2.0
  - @commercetools-frontend/notifications@22.2.0
  - @commercetools-frontend/permissions@22.2.0
  - @commercetools-frontend/react-notifications@22.2.0
  - @commercetools-frontend/sdk@22.2.0
  - @commercetools-frontend/sentry@22.2.0
  - @commercetools-frontend/url-utils@22.2.0

## 22.1.0

### Minor Changes

- [#3065](https://github.com/commercetools/merchant-center-application-kit/pull/3065) [`0df1cb8e1`](https://github.com/commercetools/merchant-center-application-kit/commit/0df1cb8e104efc7d6abd075c12d20165af9b4bc8) Thanks [@ddouglasz](https://github.com/ddouglasz)! - Users can now see a dialog on notifying them on new design release. upon closing of the information dialog notification, the message should not be seen again when the user comes back to the site.

### Patch Changes

- Updated dependencies [[`0df1cb8e1`](https://github.com/commercetools/merchant-center-application-kit/commit/0df1cb8e104efc7d6abd075c12d20165af9b4bc8)]:
  - @commercetools-frontend/assets@22.1.0
  - @commercetools-frontend/i18n@22.1.0
  - @commercetools-frontend/application-components@22.1.0
  - @commercetools-frontend/actions-global@22.1.0
  - @commercetools-frontend/application-config@22.1.0
  - @commercetools-frontend/application-shell-connectors@22.1.0
  - @commercetools-frontend/browser-history@22.1.0
  - @commercetools-frontend/constants@22.1.0
  - @commercetools-frontend/l10n@22.1.0
  - @commercetools-frontend/notifications@22.1.0
  - @commercetools-frontend/permissions@22.1.0
  - @commercetools-frontend/react-notifications@22.1.0
  - @commercetools-frontend/sdk@22.1.0
  - @commercetools-frontend/sentry@22.1.0
  - @commercetools-frontend/url-utils@22.1.0

## 22.0.1

### Patch Changes

- [#3033](https://github.com/commercetools/merchant-center-application-kit/pull/3033) [`6629d8470`](https://github.com/commercetools/merchant-center-application-kit/commit/6629d84708e94cae14df8d1ce3df1eb1f99e2023) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

- [#3052](https://github.com/commercetools/merchant-center-application-kit/pull/3052) [`a26c4d218`](https://github.com/commercetools/merchant-center-application-kit/commit/a26c4d2181cd0ce375059e71fff2c5bb53bdad16) Thanks [@kark](https://github.com/kark)! - Fix `role` of the `MenuItem` component

- Updated dependencies [[`6629d8470`](https://github.com/commercetools/merchant-center-application-kit/commit/6629d84708e94cae14df8d1ce3df1eb1f99e2023), [`6a4c6ab76`](https://github.com/commercetools/merchant-center-application-kit/commit/6a4c6ab76b481da60f25898910f8335b39ccc5bd), [`4da5fa884`](https://github.com/commercetools/merchant-center-application-kit/commit/4da5fa88475a71934f63d4133af371e34c878c2a)]:
  - @commercetools-frontend/application-shell-connectors@22.0.1
  - @commercetools-frontend/react-notifications@22.0.1
  - @commercetools-frontend/sentry@22.0.1
  - @commercetools-frontend/i18n@22.0.1
  - @commercetools-frontend/l10n@22.0.1
  - @commercetools-frontend/sdk@22.0.1
  - @commercetools-frontend/application-components@22.0.1
  - @commercetools-frontend/permissions@22.0.1
  - @commercetools-frontend/actions-global@22.0.1
  - @commercetools-frontend/application-config@22.0.1
  - @commercetools-frontend/assets@22.0.1
  - @commercetools-frontend/browser-history@22.0.1
  - @commercetools-frontend/constants@22.0.1
  - @commercetools-frontend/notifications@22.0.1
  - @commercetools-frontend/url-utils@22.0.1

## 22.0.0

### Major Changes

- [#3029](https://github.com/commercetools/merchant-center-application-kit/pull/3029) [`2426a3849`](https://github.com/commercetools/merchant-center-application-kit/commit/2426a3849ac9f3e581e0d3e06df672391c5ce56e) Thanks [@emmenko](https://github.com/emmenko)! - Upgrade `react-intl` to `v6`.

  # Migration

  The peer dependency of `react-intl` should be updated to `v6`. No other migration steps are required.

- [#3039](https://github.com/commercetools/merchant-center-application-kit/pull/3039) [`76ba54c16`](https://github.com/commercetools/merchant-center-application-kit/commit/76ba54c164dbac75ef3e3962292933b06f4843e7) Thanks [@emmenko](https://github.com/emmenko)! - Drop support for Node.js `v14`. Make sure you use Node.js `v16` or `>=v18`.

- [#3036](https://github.com/commercetools/merchant-center-application-kit/pull/3036) [`1f64ec6bd`](https://github.com/commercetools/merchant-center-application-kit/commit/1f64ec6bd4ad43a1a014b4faca2b2fc118618b84) Thanks [@YahiaElTai](https://github.com/YahiaElTai)! - Remove Google Analytics tracking.
  We no longer support tracking events to be sent to Google Analytics in case the `trackingGtm` value was provided to the `additionalEnv` object of the Custom Application config.

  - The `GtmContext` and `GtmUserLogoutTracker` exports have been removed from `@commercetools-frontend/application-shell`.
  - The `trackingEventList` prop has been removed from the `<ApplicationShell>` component.
  - The `track` object has been removed from the `onMenuItemClick` prop function signature of the `<ApplicationShell>` component.
  - The `data-track-*` attributes are not longer supported. If you have been using them please remove them from your components.

### Minor Changes

- [#3029](https://github.com/commercetools/merchant-center-application-kit/pull/3029) [`2426a3849`](https://github.com/commercetools/merchant-center-application-kit/commit/2426a3849ac9f3e581e0d3e06df672391c5ce56e) Thanks [@emmenko](https://github.com/emmenko)! - Update UI Kit dependencies to v16

### Patch Changes

- Updated dependencies [[`968c3c4d2`](https://github.com/commercetools/merchant-center-application-kit/commit/968c3c4d21e0caeb98334f5d905213dbdd9b208d), [`2426a3849`](https://github.com/commercetools/merchant-center-application-kit/commit/2426a3849ac9f3e581e0d3e06df672391c5ce56e), [`2426a3849`](https://github.com/commercetools/merchant-center-application-kit/commit/2426a3849ac9f3e581e0d3e06df672391c5ce56e), [`76ba54c16`](https://github.com/commercetools/merchant-center-application-kit/commit/76ba54c164dbac75ef3e3962292933b06f4843e7), [`1f64ec6bd`](https://github.com/commercetools/merchant-center-application-kit/commit/1f64ec6bd4ad43a1a014b4faca2b2fc118618b84)]:
  - @commercetools-frontend/application-config@22.0.0
  - @commercetools-frontend/application-components@22.0.0
  - @commercetools-frontend/react-notifications@22.0.0
  - @commercetools-frontend/i18n@22.0.0
  - @commercetools-frontend/application-shell-connectors@22.0.0
  - @commercetools-frontend/constants@22.0.0
  - @commercetools-frontend/permissions@22.0.0
  - @commercetools-frontend/actions-global@22.0.0
  - @commercetools-frontend/sdk@22.0.0
  - @commercetools-frontend/sentry@22.0.0
  - @commercetools-frontend/l10n@22.0.0
  - @commercetools-frontend/assets@22.0.0
  - @commercetools-frontend/browser-history@22.0.0
  - @commercetools-frontend/notifications@22.0.0
  - @commercetools-frontend/url-utils@22.0.0

## 21.25.2

### Patch Changes

- [#3046](https://github.com/commercetools/merchant-center-application-kit/pull/3046) [`b6dcf34c6`](https://github.com/commercetools/merchant-center-application-kit/commit/b6dcf34c6ce0cb1d19b37b5550315f08775da9b5) Thanks [@kark](https://github.com/kark)! - Revert navbar scrolling fix

- Updated dependencies []:
  - @commercetools-frontend/actions-global@21.25.2
  - @commercetools-frontend/application-components@21.25.2
  - @commercetools-frontend/application-config@21.25.2
  - @commercetools-frontend/application-shell-connectors@21.25.2
  - @commercetools-frontend/assets@21.25.2
  - @commercetools-frontend/browser-history@21.25.2
  - @commercetools-frontend/constants@21.25.2
  - @commercetools-frontend/i18n@21.25.2
  - @commercetools-frontend/l10n@21.25.2
  - @commercetools-frontend/notifications@21.25.2
  - @commercetools-frontend/permissions@21.25.2
  - @commercetools-frontend/react-notifications@21.25.2
  - @commercetools-frontend/sdk@21.25.2
  - @commercetools-frontend/sentry@21.25.2
  - @commercetools-frontend/url-utils@21.25.2

## 21.25.1

### Patch Changes

- [#3044](https://github.com/commercetools/merchant-center-application-kit/pull/3044) [`25e1410b4`](https://github.com/commercetools/merchant-center-application-kit/commit/25e1410b4e5e97fccea397f6eb098e4e991b545b) Thanks [@kark](https://github.com/kark)! - Update `ui-kit` dependencies

- Updated dependencies [[`25e1410b4`](https://github.com/commercetools/merchant-center-application-kit/commit/25e1410b4e5e97fccea397f6eb098e4e991b545b), [`abe818527`](https://github.com/commercetools/merchant-center-application-kit/commit/abe8185277e00f713ad0e8325f20bcf3bce217b1), [`bc355a5fa`](https://github.com/commercetools/merchant-center-application-kit/commit/bc355a5fa32a89f6bd48aa16b05d9b76e267d488)]:
  - @commercetools-frontend/application-components@21.25.1
  - @commercetools-frontend/react-notifications@21.25.1
  - @commercetools-frontend/i18n@21.25.1
  - @commercetools-frontend/actions-global@21.25.1
  - @commercetools-frontend/application-config@21.25.1
  - @commercetools-frontend/application-shell-connectors@21.25.1
  - @commercetools-frontend/assets@21.25.1
  - @commercetools-frontend/browser-history@21.25.1
  - @commercetools-frontend/constants@21.25.1
  - @commercetools-frontend/l10n@21.25.1
  - @commercetools-frontend/notifications@21.25.1
  - @commercetools-frontend/permissions@21.25.1
  - @commercetools-frontend/sdk@21.25.1
  - @commercetools-frontend/sentry@21.25.1
  - @commercetools-frontend/url-utils@21.25.1

## 21.25.0

### Minor Changes

- [#3019](https://github.com/commercetools/merchant-center-application-kit/pull/3019) [`1966e0756`](https://github.com/commercetools/merchant-center-application-kit/commit/1966e0756197f244d04b8c5716e7910b12d583f7) Thanks [@emmenko](https://github.com/emmenko)! - New React hook `useRoutesCreator`.

  Managing routes within an application can be tricky and error prone, for example when navigating back and forth within nested routes.

  To make it easier to manage and consume routes throughout the application, we implemented an abstraction on top of the routing functionality.

  The hook `useRoutesCreator` can be used to configure routes for your application. We recommend defining the routes in a hook `useRoutes` as following:

  ```ts
  import { useRoutesCreator } from '@commercetools-frontend/application-shell';

  const useRoutes = () => {
    const { createRoute } = useRoutesCreator();

    const routes = {
      main: createRoute(`/:projectKey/${entryPointUriPath}`),
      heros: createRoute(`/:projectKey/${entryPointUriPath}/heros`),
      heroDetail: createRoute<'id'>(
        `/:projectKey/${entryPointUriPath}/heros/:id`
      ),
    };

    return routes;
  };
  ```

  Some important things to notice here:

  - The function `createRoute` creates a route object based on the given route path.
  - Computed routes provide the following utility methods:
    - `path`: the given route path (with the param placeholders). You should use this when defining `<Route>` components.
    - `getUrl`: returns the computed URL based on the route parameters. You should use this for links or when you need the real location path.
    - `go`: navigates to the given path.

  If a route has parameters you should pass the parameter value when calling the `getUrl` or `go` methods. This is only needed in case the route your navigating to is different from the current route or doesn't already include the parameter.

  Given the following routes configuration:

  ```ts
  const routes = {
    main: createRoute(`/:projectKey/${entryPointUriPath}`),
    heros: createRoute(`/:projectKey/${entryPointUriPath}/heros`),
    heroDetail: createRoute<'id'>(
      `/:projectKey/${entryPointUriPath}/heros/:id`
    ),
    heroDetailSecondTab: createRoute<'id'>(
      `/:projectKey/${entryPointUriPath}/heros/:id/second-tab`
    ),
  };
  ```

  The following scenarios would apply:

  ```ts
  // Current location: /my-project/avengers
  routes.main.getUrl(); // => /my-project/avengers
  routes.heros.getUrl(); // => /my-project/avengers/heros
  routes.heroDetails.getUrl({ id: '123' }); // => /my-project/avengers/heros/123

  // Current location: /my-project/avengers/heros/123
  routes.main.getUrl(); // => /my-project/avengers
  routes.heros.getUrl(); // => /my-project/avengers/heros
  routes.heroDetails.getUrl(); // => /my-project/avengers/heros/123
  routes.heroDetailsSecondTab.getUrl(); // => /my-project/avengers/heros/123/second-tab
  routes.heroDetails.getUrl({ id: '456' }); // => /my-project/avengers/heros/456
  ```

  In the first scenario the current location is at `/my-project/avengers`. Navigating to the details page requires to specify the `id` parameter value.
  In the second scenario the current location is at `/my-project/avengers/heros/123`. Notice that the URL already contains the `id` parameter value. Navigating to the second tab of the details routes does not require the `id` to be specified anymore. However, it is required when navigating to a different route with a different `id`.

  Furthermore, notice that we never had to specify the `:projectKey` parameter value. For Custom Applications this value is always implied when computing the route values as long as the navigation occurs within the same project.

### Patch Changes

- [#3037](https://github.com/commercetools/merchant-center-application-kit/pull/3037) [`e7d094ef7`](https://github.com/commercetools/merchant-center-application-kit/commit/e7d094ef7ecef4d09afa2c6c211ffa0dc9afac41) Thanks [@jaikumar-tj](https://github.com/jaikumar-tj)! - Fixed navbar scroll issue in closed state

- Updated dependencies []:
  - @commercetools-frontend/actions-global@21.25.0
  - @commercetools-frontend/application-components@21.25.0
  - @commercetools-frontend/application-config@21.25.0
  - @commercetools-frontend/application-shell-connectors@21.25.0
  - @commercetools-frontend/assets@21.25.0
  - @commercetools-frontend/browser-history@21.25.0
  - @commercetools-frontend/constants@21.25.0
  - @commercetools-frontend/i18n@21.25.0
  - @commercetools-frontend/l10n@21.25.0
  - @commercetools-frontend/notifications@21.25.0
  - @commercetools-frontend/permissions@21.25.0
  - @commercetools-frontend/react-notifications@21.25.0
  - @commercetools-frontend/sdk@21.25.0
  - @commercetools-frontend/sentry@21.25.0
  - @commercetools-frontend/url-utils@21.25.0

## 21.24.3

### Patch Changes

- [#3017](https://github.com/commercetools/merchant-center-application-kit/pull/3017) [`dbacb0541`](https://github.com/commercetools/merchant-center-application-kit/commit/dbacb054178a1a27d4d3da1229560cc34fcb8eba) Thanks [@chloe0592](https://github.com/chloe0592)! - Update illustrations. Illustrations that are being depricated - `desert-fox.svg` and `icecream.svg`.

- [#3024](https://github.com/commercetools/merchant-center-application-kit/pull/3024) [`9553c6487`](https://github.com/commercetools/merchant-center-application-kit/commit/9553c648705575fb95dfd2b1dbc6e66ed777ea2f) Thanks [@emmenko](https://github.com/emmenko)! - Fix navbar menu spacing for long labels

- Updated dependencies [[`dbacb0541`](https://github.com/commercetools/merchant-center-application-kit/commit/dbacb054178a1a27d4d3da1229560cc34fcb8eba)]:
  - @commercetools-frontend/application-components@21.24.3
  - @commercetools-frontend/assets@21.24.3
  - @commercetools-frontend/actions-global@21.24.3
  - @commercetools-frontend/application-config@21.24.3
  - @commercetools-frontend/application-shell-connectors@21.24.3
  - @commercetools-frontend/browser-history@21.24.3
  - @commercetools-frontend/constants@21.24.3
  - @commercetools-frontend/i18n@21.24.3
  - @commercetools-frontend/l10n@21.24.3
  - @commercetools-frontend/notifications@21.24.3
  - @commercetools-frontend/permissions@21.24.3
  - @commercetools-frontend/react-notifications@21.24.3
  - @commercetools-frontend/sdk@21.24.3
  - @commercetools-frontend/sentry@21.24.3
  - @commercetools-frontend/url-utils@21.24.3

## 21.24.2

### Patch Changes

- [#3020](https://github.com/commercetools/merchant-center-application-kit/pull/3020) [`b509a6b36`](https://github.com/commercetools/merchant-center-application-kit/commit/b509a6b360f9f6532d9716ae7ab0f06a1147df9e) Thanks [@kark](https://github.com/kark)! - Update `ui-kit` dependencies

- Updated dependencies [[`daa5f17ee`](https://github.com/commercetools/merchant-center-application-kit/commit/daa5f17ee53fed436e489c75bc644f4ca60f3d45), [`b509a6b36`](https://github.com/commercetools/merchant-center-application-kit/commit/b509a6b360f9f6532d9716ae7ab0f06a1147df9e)]:
  - @commercetools-frontend/application-components@21.24.2
  - @commercetools-frontend/react-notifications@21.24.2
  - @commercetools-frontend/i18n@21.24.2
  - @commercetools-frontend/actions-global@21.24.2
  - @commercetools-frontend/application-config@21.24.2
  - @commercetools-frontend/application-shell-connectors@21.24.2
  - @commercetools-frontend/assets@21.24.2
  - @commercetools-frontend/browser-history@21.24.2
  - @commercetools-frontend/constants@21.24.2
  - @commercetools-frontend/l10n@21.24.2
  - @commercetools-frontend/notifications@21.24.2
  - @commercetools-frontend/permissions@21.24.2
  - @commercetools-frontend/sdk@21.24.2
  - @commercetools-frontend/sentry@21.24.2
  - @commercetools-frontend/url-utils@21.24.2

## 21.24.1

### Patch Changes

- Updated dependencies [[`ec7abe2cb`](https://github.com/commercetools/merchant-center-application-kit/commit/ec7abe2cb61b7b07b485c5e8cce102139353e4c3)]:
  - @commercetools-frontend/application-components@21.24.1
  - @commercetools-frontend/assets@21.24.1
  - @commercetools-frontend/actions-global@21.24.1
  - @commercetools-frontend/application-config@21.24.1
  - @commercetools-frontend/application-shell-connectors@21.24.1
  - @commercetools-frontend/browser-history@21.24.1
  - @commercetools-frontend/constants@21.24.1
  - @commercetools-frontend/i18n@21.24.1
  - @commercetools-frontend/l10n@21.24.1
  - @commercetools-frontend/notifications@21.24.1
  - @commercetools-frontend/permissions@21.24.1
  - @commercetools-frontend/react-notifications@21.24.1
  - @commercetools-frontend/sdk@21.24.1
  - @commercetools-frontend/sentry@21.24.1
  - @commercetools-frontend/url-utils@21.24.1

## 21.24.0

### Patch Changes

- [#2992](https://github.com/commercetools/merchant-center-application-kit/pull/2992) [`e42f8d903`](https://github.com/commercetools/merchant-center-application-kit/commit/e42f8d9037626d51abc2b5611ff5939c549cca73) Thanks [@emmenko](https://github.com/emmenko)! - Reorder imports

- [#2974](https://github.com/commercetools/merchant-center-application-kit/pull/2974) [`007cb8a04`](https://github.com/commercetools/merchant-center-application-kit/commit/007cb8a04d2d4813d6b1bd6001abd5e6b30c0de6) Thanks [@renovate](https://github.com/apps/renovate)! - Update all dependencies

- [#2989](https://github.com/commercetools/merchant-center-application-kit/pull/2989) [`b3ada0ca5`](https://github.com/commercetools/merchant-center-application-kit/commit/b3ada0ca522b8d56669e252108254a4b1be153db) Thanks [@emmenko](https://github.com/emmenko)! - Avatar size for new design

- [#2997](https://github.com/commercetools/merchant-center-application-kit/pull/2997) [`4e7962188`](https://github.com/commercetools/merchant-center-application-kit/commit/4e7962188001c1a6f6aa3a806ccd913ed567e6d2) Thanks [@emmenko](https://github.com/emmenko)! - Add more code split entry points

- [#2995](https://github.com/commercetools/merchant-center-application-kit/pull/2995) [`9b20f5c15`](https://github.com/commercetools/merchant-center-application-kit/commit/9b20f5c1520a85c2f84d700e591e414e98c427e9) Thanks [@emmenko](https://github.com/emmenko)! - Cleanup unnecessary props and types, refactor `<Route>` to always render using children.

- [#2993](https://github.com/commercetools/merchant-center-application-kit/pull/2993) [`f23cd303d`](https://github.com/commercetools/merchant-center-application-kit/commit/f23cd303d31a77aa579e5d692e532043ddbf8d29) Thanks [@emmenko](https://github.com/emmenko)! - Reskin local and project switchers

- [#3011](https://github.com/commercetools/merchant-center-application-kit/pull/3011) [`8df5dfc62`](https://github.com/commercetools/merchant-center-application-kit/commit/8df5dfc623a3579299dbba1691886ff9e60bd3c8) Thanks [@emmenko](https://github.com/emmenko)! - Fix matching of subroutes for submenu links

- Updated dependencies [[`e42f8d903`](https://github.com/commercetools/merchant-center-application-kit/commit/e42f8d9037626d51abc2b5611ff5939c549cca73), [`007cb8a04`](https://github.com/commercetools/merchant-center-application-kit/commit/007cb8a04d2d4813d6b1bd6001abd5e6b30c0de6), [`7074d035c`](https://github.com/commercetools/merchant-center-application-kit/commit/7074d035c1c540b330bd772355ed9e30d522a2c5), [`7074d035c`](https://github.com/commercetools/merchant-center-application-kit/commit/7074d035c1c540b330bd772355ed9e30d522a2c5), [`da89fae2b`](https://github.com/commercetools/merchant-center-application-kit/commit/da89fae2b86a09a1cbb004250141b9cb49ec3da7), [`a0de806d9`](https://github.com/commercetools/merchant-center-application-kit/commit/a0de806d9af6ff90948fe59d059aea3714150436), [`0cd9bf7dc`](https://github.com/commercetools/merchant-center-application-kit/commit/0cd9bf7dcb192e87a26ca4ed5b164ff3e1333b9c), [`9b20f5c15`](https://github.com/commercetools/merchant-center-application-kit/commit/9b20f5c1520a85c2f84d700e591e414e98c427e9), [`975f3f505`](https://github.com/commercetools/merchant-center-application-kit/commit/975f3f505eb686d77b05e058dd9fea9ccd7f3e5e)]:
  - @commercetools-frontend/application-shell-connectors@21.24.0
  - @commercetools-frontend/application-components@21.24.0
  - @commercetools-frontend/react-notifications@21.24.0
  - @commercetools-frontend/application-config@21.24.0
  - @commercetools-frontend/actions-global@21.24.0
  - @commercetools-frontend/notifications@21.24.0
  - @commercetools-frontend/permissions@21.24.0
  - @commercetools-frontend/sentry@21.24.0
  - @commercetools-frontend/i18n@21.24.0
  - @commercetools-frontend/l10n@21.24.0
  - @commercetools-frontend/sdk@21.24.0
  - @commercetools-frontend/assets@21.24.0
  - @commercetools-frontend/constants@21.24.0
  - @commercetools-frontend/browser-history@21.24.0
  - @commercetools-frontend/url-utils@21.24.0

## 21.23.10

### Patch Changes

- [#2988](https://github.com/commercetools/merchant-center-application-kit/pull/2988) [`60d8dce37`](https://github.com/commercetools/merchant-center-application-kit/commit/60d8dce3715d19bc15d2083f3f4a9e736627274b) Thanks [@kark](https://github.com/kark)! - Update `ui-kit` dependencies

- Updated dependencies [[`60d8dce37`](https://github.com/commercetools/merchant-center-application-kit/commit/60d8dce3715d19bc15d2083f3f4a9e736627274b), [`7f2ede7a4`](https://github.com/commercetools/merchant-center-application-kit/commit/7f2ede7a49d17299b3955fa521dcfc5bb6c90586), [`7c8754974`](https://github.com/commercetools/merchant-center-application-kit/commit/7c87549749003a6b10014962881d49fcbe0f85d3)]:
  - @commercetools-frontend/application-components@21.23.10
  - @commercetools-frontend/react-notifications@21.23.10
  - @commercetools-frontend/i18n@21.23.10
  - @commercetools-frontend/actions-global@21.23.10
  - @commercetools-frontend/application-config@21.23.10
  - @commercetools-frontend/application-shell-connectors@21.23.10
  - @commercetools-frontend/assets@21.23.10
  - @commercetools-frontend/browser-history@21.23.10
  - @commercetools-frontend/constants@21.23.10
  - @commercetools-frontend/l10n@21.23.10
  - @commercetools-frontend/notifications@21.23.10
  - @commercetools-frontend/permissions@21.23.10
  - @commercetools-frontend/sdk@21.23.10
  - @commercetools-frontend/sentry@21.23.10
  - @commercetools-frontend/url-utils@21.23.10

## 21.23.9

### Patch Changes

- [#2979](https://github.com/commercetools/merchant-center-application-kit/pull/2979) [`6dcd48525`](https://github.com/commercetools/merchant-center-application-kit/commit/6dcd48525a9943ea7348345f32ae218a5154867b) Thanks [@emmenko](https://github.com/emmenko)! - Refine engine version requirements for Nodejs to be `14.x || >=16.0.0`

- Updated dependencies [[`8a87d58d4`](https://github.com/commercetools/merchant-center-application-kit/commit/8a87d58d4d20e11630be0acf9fbe7986fd6befe0), [`6dcd48525`](https://github.com/commercetools/merchant-center-application-kit/commit/6dcd48525a9943ea7348345f32ae218a5154867b), [`2b9d36a2d`](https://github.com/commercetools/merchant-center-application-kit/commit/2b9d36a2d6b9f6f54fd03a8d7ad13f58436805b5)]:
  - @commercetools-frontend/application-components@21.23.9
  - @commercetools-frontend/application-shell-connectors@21.23.9
  - @commercetools-frontend/application-config@21.23.9
  - @commercetools-frontend/actions-global@21.23.9
  - @commercetools-frontend/browser-history@21.23.9
  - @commercetools-frontend/sentry@21.23.9
  - @commercetools-frontend/permissions@21.23.9
  - @commercetools-frontend/react-notifications@21.23.9
  - @commercetools-frontend/i18n@21.23.9
  - @commercetools-frontend/l10n@21.23.9
  - @commercetools-frontend/assets@21.23.9
  - @commercetools-frontend/constants@21.23.9
  - @commercetools-frontend/notifications@21.23.9
  - @commercetools-frontend/sdk@21.23.9
  - @commercetools-frontend/url-utils@21.23.9

## 21.23.8

### Patch Changes

- Updated dependencies [[`78c6ad44c`](https://github.com/commercetools/merchant-center-application-kit/commit/78c6ad44cd37fd6076c2c0bdfc0e6ddd59465bbc)]:
  - @commercetools-frontend/constants@21.23.8
  - @commercetools-frontend/actions-global@21.23.8
  - @commercetools-frontend/application-components@21.23.8
  - @commercetools-frontend/application-shell-connectors@21.23.8
  - @commercetools-frontend/react-notifications@21.23.8
  - @commercetools-frontend/sdk@21.23.8
  - @commercetools-frontend/sentry@21.23.8
  - @commercetools-frontend/permissions@21.23.8
  - @commercetools-frontend/i18n@21.23.8
  - @commercetools-frontend/l10n@21.23.8
  - @commercetools-frontend/application-config@21.23.8
  - @commercetools-frontend/assets@21.23.8
  - @commercetools-frontend/browser-history@21.23.8
  - @commercetools-frontend/notifications@21.23.8
  - @commercetools-frontend/url-utils@21.23.8

## 21.23.7

### Patch Changes

- [#2960](https://github.com/commercetools/merchant-center-application-kit/pull/2960) [`4377b3642`](https://github.com/commercetools/merchant-center-application-kit/commit/4377b3642c08fd9480016a287a18ada780191ad6) Thanks [@emmenko](https://github.com/emmenko)! - Update dependencies

- Updated dependencies [[`c8069d85d`](https://github.com/commercetools/merchant-center-application-kit/commit/c8069d85d8218578f1a863a531cb2c3e76551eeb), [`4377b3642`](https://github.com/commercetools/merchant-center-application-kit/commit/4377b3642c08fd9480016a287a18ada780191ad6), [`4377b3642`](https://github.com/commercetools/merchant-center-application-kit/commit/4377b3642c08fd9480016a287a18ada780191ad6)]:
  - @commercetools-frontend/l10n@21.23.7
  - @commercetools-frontend/application-shell-connectors@21.23.7
  - @commercetools-frontend/application-components@21.23.7
  - @commercetools-frontend/react-notifications@21.23.7
  - @commercetools-frontend/application-config@21.23.7
  - @commercetools-frontend/browser-history@21.23.7
  - @commercetools-frontend/actions-global@21.23.7
  - @commercetools-frontend/notifications@21.23.7
  - @commercetools-frontend/permissions@21.23.7
  - @commercetools-frontend/constants@21.23.7
  - @commercetools-frontend/url-utils@21.23.7
  - @commercetools-frontend/sentry@21.23.7
  - @commercetools-frontend/i18n@21.23.7
  - @commercetools-frontend/sdk@21.23.7
  - @commercetools-frontend/assets@21.23.7

## 21.23.6

### Patch Changes

- Updated dependencies [[`96bfb66f2`](https://github.com/commercetools/merchant-center-application-kit/commit/96bfb66f21b56bc80271ca3509114eed6e8ea742)]:
  - @commercetools-frontend/application-components@21.23.6
  - @commercetools-frontend/actions-global@21.23.6
  - @commercetools-frontend/application-config@21.23.6
  - @commercetools-frontend/application-shell-connectors@21.23.6
  - @commercetools-frontend/assets@21.23.6
  - @commercetools-frontend/browser-history@21.23.6
  - @commercetools-frontend/constants@21.23.6
  - @commercetools-frontend/i18n@21.23.6
  - @commercetools-frontend/l10n@21.23.6
  - @commercetools-frontend/notifications@21.23.6
  - @commercetools-frontend/permissions@21.23.6
  - @commercetools-frontend/react-notifications@21.23.6
  - @commercetools-frontend/sdk@21.23.6
  - @commercetools-frontend/sentry@21.23.6
  - @commercetools-frontend/url-utils@21.23.6

## 21.23.5

### Patch Changes

- Updated dependencies [[`ff5542f5d`](https://github.com/commercetools/merchant-center-application-kit/commit/ff5542f5d94c5d868b6c7a0cfae72daac362f7ee)]:
  - @commercetools-frontend/assets@21.23.5
  - @commercetools-frontend/application-components@21.23.5
  - @commercetools-frontend/actions-global@21.23.5
  - @commercetools-frontend/application-config@21.23.5
  - @commercetools-frontend/application-shell-connectors@21.23.5
  - @commercetools-frontend/browser-history@21.23.5
  - @commercetools-frontend/constants@21.23.5
  - @commercetools-frontend/i18n@21.23.5
  - @commercetools-frontend/l10n@21.23.5
  - @commercetools-frontend/notifications@21.23.5
  - @commercetools-frontend/permissions@21.23.5
  - @commercetools-frontend/react-notifications@21.23.5
  - @commercetools-frontend/sdk@21.23.5
  - @commercetools-frontend/sentry@21.23.5
  - @commercetools-frontend/url-utils@21.23.5

## 21.23.4

### Patch Changes

- [#2952](https://github.com/commercetools/merchant-center-application-kit/pull/2952) [`2e805309c`](https://github.com/commercetools/merchant-center-application-kit/commit/2e805309c526d98e4822757f062a553987d71547) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Update `ui-kit` and `react-select` dependencies

- Updated dependencies [[`b66401b22`](https://github.com/commercetools/merchant-center-application-kit/commit/b66401b22d87e5455578ab9cf1160614502e6b4b), [`2e805309c`](https://github.com/commercetools/merchant-center-application-kit/commit/2e805309c526d98e4822757f062a553987d71547)]:
  - @commercetools-frontend/react-notifications@21.23.4
  - @commercetools-frontend/application-components@21.23.4
  - @commercetools-frontend/i18n@21.23.4
  - @commercetools-frontend/actions-global@21.23.4
  - @commercetools-frontend/application-config@21.23.4
  - @commercetools-frontend/application-shell-connectors@21.23.4
  - @commercetools-frontend/assets@21.23.4
  - @commercetools-frontend/browser-history@21.23.4
  - @commercetools-frontend/constants@21.23.4
  - @commercetools-frontend/l10n@21.23.4
  - @commercetools-frontend/notifications@21.23.4
  - @commercetools-frontend/permissions@21.23.4
  - @commercetools-frontend/sdk@21.23.4
  - @commercetools-frontend/sentry@21.23.4
  - @commercetools-frontend/url-utils@21.23.4

## 21.23.3

### Patch Changes

- [#2945](https://github.com/commercetools/merchant-center-application-kit/pull/2945) [`108b12fe2`](https://github.com/commercetools/merchant-center-application-kit/commit/108b12fe2ea234d9c8dd06999e845efe278f43e7) Thanks [@emmenko](https://github.com/emmenko)! - Fix overflow issue when menu label is long

- [#2944](https://github.com/commercetools/merchant-center-application-kit/pull/2944) [`015ba24a4`](https://github.com/commercetools/merchant-center-application-kit/commit/015ba24a4e45214c189d0d4083cd2acfe7499af9) Thanks [@tylermorrisford](https://github.com/tylermorrisford)! - Update layout for OIDC callback page

- Updated dependencies [[`694f060f7`](https://github.com/commercetools/merchant-center-application-kit/commit/694f060f7e36c249d17f64ac93ef45918fca7941)]:
  - @commercetools-frontend/application-components@21.23.3
  - @commercetools-frontend/actions-global@21.23.3
  - @commercetools-frontend/application-config@21.23.3
  - @commercetools-frontend/application-shell-connectors@21.23.3
  - @commercetools-frontend/assets@21.23.3
  - @commercetools-frontend/browser-history@21.23.3
  - @commercetools-frontend/constants@21.23.3
  - @commercetools-frontend/i18n@21.23.3
  - @commercetools-frontend/l10n@21.23.3
  - @commercetools-frontend/notifications@21.23.3
  - @commercetools-frontend/permissions@21.23.3
  - @commercetools-frontend/react-notifications@21.23.3
  - @commercetools-frontend/sdk@21.23.3
  - @commercetools-frontend/sentry@21.23.3
  - @commercetools-frontend/url-utils@21.23.3

## 21.23.2

### Patch Changes

- Updated dependencies [[`3c8431579`](https://github.com/commercetools/merchant-center-application-kit/commit/3c8431579d15862dda832373a77fc56d3b425452)]:
  - @commercetools-frontend/assets@21.23.2
  - @commercetools-frontend/application-components@21.23.2
  - @commercetools-frontend/actions-global@21.23.2
  - @commercetools-frontend/application-config@21.23.2
  - @commercetools-frontend/application-shell-connectors@21.23.2
  - @commercetools-frontend/browser-history@21.23.2
  - @commercetools-frontend/constants@21.23.2
  - @commercetools-frontend/i18n@21.23.2
  - @commercetools-frontend/l10n@21.23.2
  - @commercetools-frontend/notifications@21.23.2
  - @commercetools-frontend/permissions@21.23.2
  - @commercetools-frontend/react-notifications@21.23.2
  - @commercetools-frontend/sdk@21.23.2
  - @commercetools-frontend/sentry@21.23.2
  - @commercetools-frontend/url-utils@21.23.2

## 21.23.1

### Patch Changes

- Updated dependencies [[`233c7edfc`](https://github.com/commercetools/merchant-center-application-kit/commit/233c7edfcc8d1df330cf42c7c4dd53631bb20ecf), [`695c657a0`](https://github.com/commercetools/merchant-center-application-kit/commit/695c657a0bd1b5fc58b46811e5a8e0c3ccaece2c)]:
  - @commercetools-frontend/assets@21.23.1
  - @commercetools-frontend/application-components@21.23.1
  - @commercetools-frontend/actions-global@21.23.1
  - @commercetools-frontend/application-config@21.23.1
  - @commercetools-frontend/application-shell-connectors@21.23.1
  - @commercetools-frontend/browser-history@21.23.1
  - @commercetools-frontend/constants@21.23.1
  - @commercetools-frontend/i18n@21.23.1
  - @commercetools-frontend/l10n@21.23.1
  - @commercetools-frontend/notifications@21.23.1
  - @commercetools-frontend/permissions@21.23.1
  - @commercetools-frontend/react-notifications@21.23.1
  - @commercetools-frontend/sdk@21.23.1
  - @commercetools-frontend/sentry@21.23.1
  - @commercetools-frontend/url-utils@21.23.1

## 21.23.0

### Minor Changes

- [#2933](https://github.com/commercetools/merchant-center-application-kit/pull/2933) [`a6f5df3eb`](https://github.com/commercetools/merchant-center-application-kit/commit/a6f5df3ebd2adf527ca0e359e89c81eafc91c4eb) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Revert exposing `@testing-library/user-event` methods in the test-utils.

### Patch Changes

- Updated dependencies []:
  - @commercetools-frontend/actions-global@21.23.0
  - @commercetools-frontend/application-components@21.23.0
  - @commercetools-frontend/application-config@21.23.0
  - @commercetools-frontend/application-shell-connectors@21.23.0
  - @commercetools-frontend/assets@21.23.0
  - @commercetools-frontend/browser-history@21.23.0
  - @commercetools-frontend/constants@21.23.0
  - @commercetools-frontend/i18n@21.23.0
  - @commercetools-frontend/l10n@21.23.0
  - @commercetools-frontend/notifications@21.23.0
  - @commercetools-frontend/permissions@21.23.0
  - @commercetools-frontend/react-notifications@21.23.0
  - @commercetools-frontend/sdk@21.23.0
  - @commercetools-frontend/sentry@21.23.0
  - @commercetools-frontend/url-utils@21.23.0

## 21.22.1

### Patch Changes

- Updated dependencies []:
  - @commercetools-frontend/actions-global@21.22.1
  - @commercetools-frontend/application-components@21.22.1
  - @commercetools-frontend/application-config@21.22.1
  - @commercetools-frontend/application-shell-connectors@21.22.1
  - @commercetools-frontend/assets@21.22.1
  - @commercetools-frontend/browser-history@21.22.1
  - @commercetools-frontend/constants@21.22.1
  - @commercetools-frontend/i18n@21.22.1
  - @commercetools-frontend/l10n@21.22.1
  - @commercetools-frontend/notifications@21.22.1
  - @commercetools-frontend/permissions@21.22.1
  - @commercetools-frontend/react-notifications@21.22.1
  - @commercetools-frontend/sdk@21.22.1
  - @commercetools-frontend/sentry@21.22.1
  - @commercetools-frontend/url-utils@21.22.1

## 21.22.0

### Minor Changes

- [#2852](https://github.com/commercetools/merchant-center-application-kit/pull/2852) [`af44fa835`](https://github.com/commercetools/merchant-center-application-kit/commit/af44fa8350e5d414acf083055dc853ea7e12daf2) Thanks [@antoniolodias](https://github.com/antoniolodias)! - Expose the `@testing-library/user-event` methods in the test-utils as `userEvent` object.

  ```js
  import { userEvent } from '@commercetools-frontend/application-shell/test-utils';

  userEvent.click();
  ```

### Patch Changes

- [#2926](https://github.com/commercetools/merchant-center-application-kit/pull/2926) [`8f463adbc`](https://github.com/commercetools/merchant-center-application-kit/commit/8f463adbc840bfb85736086f2ee34ea1cbb4ca14) Thanks [@stephsprinkle](https://github.com/stephsprinkle)! - feat(application-shell): fetch and expose user created date

- [#2927](https://github.com/commercetools/merchant-center-application-kit/pull/2927) [`0427a35cf`](https://github.com/commercetools/merchant-center-application-kit/commit/0427a35cfb81e71e807112c89026a885f271ace7) Thanks [@emmenko](https://github.com/emmenko)! - Fix bottom spacing to avoid faded container overlap with menu links

- [#2929](https://github.com/commercetools/merchant-center-application-kit/pull/2929) [`18449d560`](https://github.com/commercetools/merchant-center-application-kit/commit/18449d560df08cc98aba4115f21d3fd478e246fc) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Update `ui-kit` dependencies

- [#2928](https://github.com/commercetools/merchant-center-application-kit/pull/2928) [`574b53176`](https://github.com/commercetools/merchant-center-application-kit/commit/574b53176070ebcf60502b4370f27bb02072c47c) Thanks [@emmenko](https://github.com/emmenko)! - Fix colors on hover

- Updated dependencies [[`caee9e27e`](https://github.com/commercetools/merchant-center-application-kit/commit/caee9e27e76ca6bef05388d8cc11c754bfe773b9), [`8f463adbc`](https://github.com/commercetools/merchant-center-application-kit/commit/8f463adbc840bfb85736086f2ee34ea1cbb4ca14), [`18449d560`](https://github.com/commercetools/merchant-center-application-kit/commit/18449d560df08cc98aba4115f21d3fd478e246fc), [`574b53176`](https://github.com/commercetools/merchant-center-application-kit/commit/574b53176070ebcf60502b4370f27bb02072c47c)]:
  - @commercetools-frontend/assets@21.22.0
  - @commercetools-frontend/application-shell-connectors@21.22.0
  - @commercetools-frontend/permissions@21.22.0
  - @commercetools-frontend/application-components@21.22.0
  - @commercetools-frontend/i18n@21.22.0
  - @commercetools-frontend/react-notifications@21.22.0
  - @commercetools-frontend/actions-global@21.22.0
  - @commercetools-frontend/application-config@21.22.0
  - @commercetools-frontend/browser-history@21.22.0
  - @commercetools-frontend/constants@21.22.0
  - @commercetools-frontend/l10n@21.22.0
  - @commercetools-frontend/notifications@21.22.0
  - @commercetools-frontend/sdk@21.22.0
  - @commercetools-frontend/sentry@21.22.0
  - @commercetools-frontend/url-utils@21.22.0

## 21.21.2

### Patch Changes

- [#2918](https://github.com/commercetools/merchant-center-application-kit/pull/2918) [`e52e8a782`](https://github.com/commercetools/merchant-center-application-kit/commit/e52e8a78228677cad28f1649bc4b1af473308a9a) Thanks [@emmenko](https://github.com/emmenko)! - Revert using `workspace:` protocol

- Updated dependencies [[`e52e8a782`](https://github.com/commercetools/merchant-center-application-kit/commit/e52e8a78228677cad28f1649bc4b1af473308a9a)]:
  - @commercetools-frontend/actions-global@21.21.2
  - @commercetools-frontend/application-components@21.21.2
  - @commercetools-frontend/application-config@21.21.2
  - @commercetools-frontend/application-shell-connectors@21.21.2
  - @commercetools-frontend/i18n@21.21.2
  - @commercetools-frontend/l10n@21.21.2
  - @commercetools-frontend/permissions@21.21.2
  - @commercetools-frontend/react-notifications@21.21.2
  - @commercetools-frontend/sdk@21.21.2
  - @commercetools-frontend/sentry@21.21.2
  - @commercetools-frontend/assets@21.21.2
  - @commercetools-frontend/browser-history@21.21.2
  - @commercetools-frontend/constants@21.21.2
  - @commercetools-frontend/notifications@21.21.2
  - @commercetools-frontend/url-utils@21.21.2

## 21.21.1

### Patch Changes

- [#2897](https://github.com/commercetools/merchant-center-application-kit/pull/2897) [`adb731ab8`](https://github.com/commercetools/merchant-center-application-kit/commit/adb731ab85e6d0e06e813f72f4010a09c8278cc2) Thanks [@emmenko](https://github.com/emmenko)! - Define design tokens for navbar colors

- [#2917](https://github.com/commercetools/merchant-center-application-kit/pull/2917) [`fbfa2127e`](https://github.com/commercetools/merchant-center-application-kit/commit/fbfa2127e8d5de1838be4639ae23d4bbea9917b5) Thanks [@emmenko](https://github.com/emmenko)! - Apply new designs for appbar and user menu

- [#2913](https://github.com/commercetools/merchant-center-application-kit/pull/2913) [`fb4907897`](https://github.com/commercetools/merchant-center-application-kit/commit/fb4907897356c21e4b24b277db0df740609db870) Thanks [@jaikamat](https://github.com/jaikamat)! - reverted changes to stubbed verificationStatus field

- [#2881](https://github.com/commercetools/merchant-center-application-kit/pull/2881) [`e3ffe6c11`](https://github.com/commercetools/merchant-center-application-kit/commit/e3ffe6c11ff993296028219ab8c45562dc294963) Thanks [@emmenko](https://github.com/emmenko)! - Use `workspace:` version syntax for link workspace packages

- Updated dependencies [[`adb731ab8`](https://github.com/commercetools/merchant-center-application-kit/commit/adb731ab85e6d0e06e813f72f4010a09c8278cc2), [`fbfa2127e`](https://github.com/commercetools/merchant-center-application-kit/commit/fbfa2127e8d5de1838be4639ae23d4bbea9917b5), [`fb4907897`](https://github.com/commercetools/merchant-center-application-kit/commit/fb4907897356c21e4b24b277db0df740609db870), [`63dc7cd5f`](https://github.com/commercetools/merchant-center-application-kit/commit/63dc7cd5f5231a6ae28bad2d64df40a158aa5aab), [`e3ffe6c11`](https://github.com/commercetools/merchant-center-application-kit/commit/e3ffe6c11ff993296028219ab8c45562dc294963)]:
  - @commercetools-frontend/application-components@21.21.1
  - @commercetools-frontend/application-shell-connectors@21.21.1
  - @commercetools-frontend/permissions@21.21.1
  - @commercetools-frontend/application-config@21.21.1
  - @commercetools-frontend/actions-global@21.21.1
  - @commercetools-frontend/i18n@21.21.1
  - @commercetools-frontend/l10n@21.21.1
  - @commercetools-frontend/react-notifications@21.21.1
  - @commercetools-frontend/sdk@21.21.1
  - @commercetools-frontend/sentry@21.21.1
  - @commercetools-frontend/assets@21.21.1
  - @commercetools-frontend/browser-history@21.21.1
  - @commercetools-frontend/constants@21.21.1
  - @commercetools-frontend/notifications@21.21.1
  - @commercetools-frontend/url-utils@21.21.1

## 21.21.0

### Minor Changes

- [#2799](https://github.com/commercetools/merchant-center-application-kit/pull/2799) [`033d95e08`](https://github.com/commercetools/merchant-center-application-kit/commit/033d95e08143eec0ad36040f4989c744ba30302b) Thanks [@kark](https://github.com/kark)! - Enable configuring granular permissions in Custom Applications.

  Additional permissions are defined by adding permission groups in the Custom Application config. [See docs](https://docs.commercetools.com/custom-applications/concepts/oauth-scopes-and-user-permissions#permission-groups).

### Patch Changes

- Updated dependencies [[`033d95e08`](https://github.com/commercetools/merchant-center-application-kit/commit/033d95e08143eec0ad36040f4989c744ba30302b)]:
  - @commercetools-frontend/application-config@21.21.0
  - @commercetools-frontend/constants@21.21.0
  - @commercetools-frontend/actions-global@21.21.0
  - @commercetools-frontend/application-components@21.21.0
  - @commercetools-frontend/application-shell-connectors@21.21.0
  - @commercetools-frontend/react-notifications@21.21.0
  - @commercetools-frontend/sdk@21.21.0
  - @commercetools-frontend/sentry@21.21.0
  - @commercetools-frontend/permissions@21.21.0
  - @commercetools-frontend/i18n@21.21.0
  - @commercetools-frontend/l10n@21.21.0
  - @commercetools-frontend/assets@21.21.0
  - @commercetools-frontend/browser-history@21.21.0
  - @commercetools-frontend/notifications@21.21.0
  - @commercetools-frontend/url-utils@21.21.0

## 21.20.5

### Patch Changes

- [#2905](https://github.com/commercetools/merchant-center-application-kit/pull/2905) [`bba0f8437`](https://github.com/commercetools/merchant-center-application-kit/commit/bba0f8437cf25b022509a651df8a2288bcc9914b) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Refactor page layout components (`FormModalPage`, `InfoDetailPage`,...) to set them up for the upcoming new theme.

- Updated dependencies [[`bba0f8437`](https://github.com/commercetools/merchant-center-application-kit/commit/bba0f8437cf25b022509a651df8a2288bcc9914b)]:
  - @commercetools-frontend/application-components@21.20.5
  - @commercetools-frontend/i18n@21.20.5
  - @commercetools-frontend/react-notifications@21.20.5
  - @commercetools-frontend/actions-global@21.20.5
  - @commercetools-frontend/application-config@21.20.5
  - @commercetools-frontend/application-shell-connectors@21.20.5
  - @commercetools-frontend/assets@21.20.5
  - @commercetools-frontend/browser-history@21.20.5
  - @commercetools-frontend/constants@21.20.5
  - @commercetools-frontend/l10n@21.20.5
  - @commercetools-frontend/notifications@21.20.5
  - @commercetools-frontend/permissions@21.20.5
  - @commercetools-frontend/sdk@21.20.5
  - @commercetools-frontend/sentry@21.20.5
  - @commercetools-frontend/url-utils@21.20.5

## 21.20.4

### Patch Changes

- Updated dependencies [[`6cd82e332`](https://github.com/commercetools/merchant-center-application-kit/commit/6cd82e332b21efba21d5ac86399729786e8bbcc6)]:
  - @commercetools-frontend/sentry@21.20.4
  - @commercetools-frontend/actions-global@21.20.4
  - @commercetools-frontend/application-shell-connectors@21.20.4
  - @commercetools-frontend/i18n@21.20.4
  - @commercetools-frontend/l10n@21.20.4
  - @commercetools-frontend/permissions@21.20.4
  - @commercetools-frontend/react-notifications@21.20.4
  - @commercetools-frontend/application-components@21.20.4
  - @commercetools-frontend/application-config@21.20.4
  - @commercetools-frontend/assets@21.20.4
  - @commercetools-frontend/browser-history@21.20.4
  - @commercetools-frontend/constants@21.20.4
  - @commercetools-frontend/notifications@21.20.4
  - @commercetools-frontend/sdk@21.20.4
  - @commercetools-frontend/url-utils@21.20.4

## 21.20.3

### Patch Changes

- [#2898](https://github.com/commercetools/merchant-center-application-kit/pull/2898) [`0a5a49802`](https://github.com/commercetools/merchant-center-application-kit/commit/0a5a4980211ac0e7f2e5603f1fcf1c62547818f0) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Restore legacy application named icons.

- Updated dependencies []:
  - @commercetools-frontend/actions-global@21.20.3
  - @commercetools-frontend/application-components@21.20.3
  - @commercetools-frontend/application-config@21.20.3
  - @commercetools-frontend/application-shell-connectors@21.20.3
  - @commercetools-frontend/assets@21.20.3
  - @commercetools-frontend/browser-history@21.20.3
  - @commercetools-frontend/constants@21.20.3
  - @commercetools-frontend/i18n@21.20.3
  - @commercetools-frontend/l10n@21.20.3
  - @commercetools-frontend/notifications@21.20.3
  - @commercetools-frontend/permissions@21.20.3
  - @commercetools-frontend/react-notifications@21.20.3
  - @commercetools-frontend/sdk@21.20.3
  - @commercetools-frontend/sentry@21.20.3
  - @commercetools-frontend/url-utils@21.20.3

## 21.20.2

### Patch Changes

- [#2894](https://github.com/commercetools/merchant-center-application-kit/pull/2894) [`af6635868`](https://github.com/commercetools/merchant-center-application-kit/commit/af66358689730e3e85f969d1f6ab94b42fedecf6) Thanks [@emmenko](https://github.com/emmenko)! - Apply some minor design changes to the `<NavBar>` component

- [#2870](https://github.com/commercetools/merchant-center-application-kit/pull/2870) [`7e3a810c7`](https://github.com/commercetools/merchant-center-application-kit/commit/7e3a810c7faf014abf7434d4e20519f3ffbf995d) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Refactor page layout components (`FormModalPage`, `InfoDetailPage`,...) to set them up for the upcoming new theme.

  Also, the dialog components (`InfoDialog`, `CofirmationDialog` and `FormDialog`) now have new available values for the `size` property.

- Updated dependencies [[`af6635868`](https://github.com/commercetools/merchant-center-application-kit/commit/af66358689730e3e85f969d1f6ab94b42fedecf6), [`7e3a810c7`](https://github.com/commercetools/merchant-center-application-kit/commit/7e3a810c7faf014abf7434d4e20519f3ffbf995d), [`7e3a810c7`](https://github.com/commercetools/merchant-center-application-kit/commit/7e3a810c7faf014abf7434d4e20519f3ffbf995d)]:
  - @commercetools-frontend/application-components@21.20.2
  - @commercetools-frontend/i18n@21.20.2
  - @commercetools-frontend/react-notifications@21.20.2
  - @commercetools-frontend/actions-global@21.20.2
  - @commercetools-frontend/application-config@21.20.2
  - @commercetools-frontend/application-shell-connectors@21.20.2
  - @commercetools-frontend/assets@21.20.2
  - @commercetools-frontend/browser-history@21.20.2
  - @commercetools-frontend/constants@21.20.2
  - @commercetools-frontend/l10n@21.20.2
  - @commercetools-frontend/notifications@21.20.2
  - @commercetools-frontend/permissions@21.20.2
  - @commercetools-frontend/sdk@21.20.2
  - @commercetools-frontend/sentry@21.20.2
  - @commercetools-frontend/url-utils@21.20.2

## 21.20.1

### Patch Changes

- Updated dependencies []:
  - @commercetools-frontend/actions-global@21.20.1
  - @commercetools-frontend/application-components@21.20.1
  - @commercetools-frontend/application-config@21.20.1
  - @commercetools-frontend/application-shell-connectors@21.20.1
  - @commercetools-frontend/assets@21.20.1
  - @commercetools-frontend/browser-history@21.20.1
  - @commercetools-frontend/constants@21.20.1
  - @commercetools-frontend/i18n@21.20.1
  - @commercetools-frontend/l10n@21.20.1
  - @commercetools-frontend/notifications@21.20.1
  - @commercetools-frontend/permissions@21.20.1
  - @commercetools-frontend/react-notifications@21.20.1
  - @commercetools-frontend/sdk@21.20.1
  - @commercetools-frontend/sentry@21.20.1
  - @commercetools-frontend/url-utils@21.20.1

## 21.20.0

### Minor Changes

- [#2886](https://github.com/commercetools/merchant-center-application-kit/pull/2886) [`68e1998b4`](https://github.com/commercetools/merchant-center-application-kit/commit/68e1998b4021121fff23e4b549615d506b795226) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Update `ui-kit` dependencies and refactor global styles.

### Patch Changes

- [#2875](https://github.com/commercetools/merchant-center-application-kit/pull/2875) [`403e072b7`](https://github.com/commercetools/merchant-center-application-kit/commit/403e072b78e7ac63eff58b8e6372c137500fe2a5) Thanks [@emmenko](https://github.com/emmenko)! - Use Google Font v2 API to load fonts.

- [#2876](https://github.com/commercetools/merchant-center-application-kit/pull/2876) [`68593a817`](https://github.com/commercetools/merchant-center-application-kit/commit/68593a8173a297c2b95055eaca0269ffa9f53087) Thanks [@emmenko](https://github.com/emmenko)! - Render theme using a feature flag. The change is only used internally for now, as we are rolling out some design updates.

- [#2886](https://github.com/commercetools/merchant-center-application-kit/pull/2886) [`68e1998b4`](https://github.com/commercetools/merchant-center-application-kit/commit/68e1998b4021121fff23e4b549615d506b795226) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Update `ui-kit` dependencies.

- Updated dependencies [[`93bd1a37d`](https://github.com/commercetools/merchant-center-application-kit/commit/93bd1a37d6dd178ad470b8e363dd597f4d5fe2b2), [`530c97d1f`](https://github.com/commercetools/merchant-center-application-kit/commit/530c97d1f9006559cde3514ffa53165ae74d0b3a), [`68e1998b4`](https://github.com/commercetools/merchant-center-application-kit/commit/68e1998b4021121fff23e4b549615d506b795226)]:
  - @commercetools-frontend/application-components@21.20.0
  - @commercetools-frontend/sentry@21.20.0
  - @commercetools-frontend/i18n@21.20.0
  - @commercetools-frontend/react-notifications@21.20.0
  - @commercetools-frontend/actions-global@21.20.0
  - @commercetools-frontend/application-shell-connectors@21.20.0
  - @commercetools-frontend/l10n@21.20.0
  - @commercetools-frontend/permissions@21.20.0
  - @commercetools-frontend/application-config@21.20.0
  - @commercetools-frontend/assets@21.20.0
  - @commercetools-frontend/browser-history@21.20.0
  - @commercetools-frontend/constants@21.20.0
  - @commercetools-frontend/notifications@21.20.0
  - @commercetools-frontend/sdk@21.20.0
  - @commercetools-frontend/url-utils@21.20.0

## 21.19.0

### Patch Changes

- [#2877](https://github.com/commercetools/merchant-center-application-kit/pull/2877) [`671436ba3`](https://github.com/commercetools/merchant-center-application-kit/commit/671436ba322ccbbed3301f54e73c0d669d026e0b) Thanks [@tdeekens](https://github.com/tdeekens)! - Fix to allow disabling Sentry and GTM through setting environment variable to `null`.

- Updated dependencies [[`671436ba3`](https://github.com/commercetools/merchant-center-application-kit/commit/671436ba322ccbbed3301f54e73c0d669d026e0b)]:
  - @commercetools-frontend/sentry@21.19.0
  - @commercetools-frontend/actions-global@21.19.0
  - @commercetools-frontend/application-shell-connectors@21.19.0
  - @commercetools-frontend/i18n@21.19.0
  - @commercetools-frontend/l10n@21.19.0
  - @commercetools-frontend/permissions@21.19.0
  - @commercetools-frontend/react-notifications@21.19.0
  - @commercetools-frontend/application-components@21.19.0
  - @commercetools-frontend/application-config@21.19.0
  - @commercetools-frontend/assets@21.19.0
  - @commercetools-frontend/browser-history@21.19.0
  - @commercetools-frontend/constants@21.19.0
  - @commercetools-frontend/notifications@21.19.0
  - @commercetools-frontend/sdk@21.19.0
  - @commercetools-frontend/url-utils@21.19.0

## 21.18.1

### Patch Changes

- [#2868](https://github.com/commercetools/merchant-center-application-kit/pull/2868) [`33260b4f0`](https://github.com/commercetools/merchant-center-application-kit/commit/33260b4f0bba929445eda39e9207478374d984a8) Thanks [@obulaworld](https://github.com/obulaworld)! - Fix QuickAccess component to make it use the right products list URL.

- Updated dependencies []:
  - @commercetools-frontend/actions-global@21.18.1
  - @commercetools-frontend/application-components@21.18.1
  - @commercetools-frontend/application-config@21.18.1
  - @commercetools-frontend/application-shell-connectors@21.18.1
  - @commercetools-frontend/assets@21.18.1
  - @commercetools-frontend/browser-history@21.18.1
  - @commercetools-frontend/constants@21.18.1
  - @commercetools-frontend/i18n@21.18.1
  - @commercetools-frontend/l10n@21.18.1
  - @commercetools-frontend/notifications@21.18.1
  - @commercetools-frontend/permissions@21.18.1
  - @commercetools-frontend/react-notifications@21.18.1
  - @commercetools-frontend/sdk@21.18.1
  - @commercetools-frontend/sentry@21.18.1
  - @commercetools-frontend/url-utils@21.18.1

## 21.18.0

### Minor Changes

- [#2844](https://github.com/commercetools/merchant-center-application-kit/pull/2844) [`19ae7155b`](https://github.com/commercetools/merchant-center-application-kit/commit/19ae7155b3fd91ba20050434c045c47665df9504) Thanks [@jaikamat](https://github.com/jaikamat)! - Include new user-related entity information in application context

### Patch Changes

- [#2863](https://github.com/commercetools/merchant-center-application-kit/pull/2863) [`4311f1aaa`](https://github.com/commercetools/merchant-center-application-kit/commit/4311f1aaac7fb51cca204f01307583b6924cd015) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Disable development-only Redux Toolkit default [immutability middleware](https://redux-toolkit.js.org/api/immutabilityMiddleware) check

- [#2837](https://github.com/commercetools/merchant-center-application-kit/pull/2837) [`3959ed2a0`](https://github.com/commercetools/merchant-center-application-kit/commit/3959ed2a0012077b6366c3a22c749fe7d6e74784) Thanks [@renovate](https://github.com/apps/renovate)! - Update all dependencies

- Updated dependencies [[`19ae7155b`](https://github.com/commercetools/merchant-center-application-kit/commit/19ae7155b3fd91ba20050434c045c47665df9504), [`84c29cebe`](https://github.com/commercetools/merchant-center-application-kit/commit/84c29cebee389ff246fb1d48e2997c8c529a4750), [`836c86aa1`](https://github.com/commercetools/merchant-center-application-kit/commit/836c86aa187125e0670b2248619a1cbaa094bec2), [`3959ed2a0`](https://github.com/commercetools/merchant-center-application-kit/commit/3959ed2a0012077b6366c3a22c749fe7d6e74784), [`53d2c287f`](https://github.com/commercetools/merchant-center-application-kit/commit/53d2c287f7572769b3038893469cde81ef987c39), [`9649818ac`](https://github.com/commercetools/merchant-center-application-kit/commit/9649818ac924b3677203ca9df3e3a4aff6a0b080)]:
  - @commercetools-frontend/application-shell-connectors@21.18.0
  - @commercetools-frontend/permissions@21.18.0
  - @commercetools-frontend/application-config@21.18.0
  - @commercetools-frontend/application-components@21.18.0
  - @commercetools-frontend/i18n@21.18.0
  - @commercetools-frontend/react-notifications@21.18.0
  - @commercetools-frontend/sentry@21.18.0
  - @commercetools-frontend/actions-global@21.18.0
  - @commercetools-frontend/l10n@21.18.0
  - @commercetools-frontend/assets@21.18.0
  - @commercetools-frontend/browser-history@21.18.0
  - @commercetools-frontend/constants@21.18.0
  - @commercetools-frontend/notifications@21.18.0
  - @commercetools-frontend/sdk@21.18.0
  - @commercetools-frontend/url-utils@21.18.0

## 21.17.0

### Minor Changes

- [#2841](https://github.com/commercetools/merchant-center-application-kit/pull/2841) [`a5e405db4`](https://github.com/commercetools/merchant-center-application-kit/commit/a5e405db45114a5cdd4d6814968bd199e6c8a480) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Logged-in [user data](https://docs.commercetools.com/custom-applications/api-reference/commercetools-frontend-application-shell-connectors#user) that can be accessed from the [application context](https://docs.commercetools.com/custom-applications/api-reference/commercetools-frontend-application-shell-connectors#useapplicationcontext) can now optionally include new info for SSO logged-in users (Identity Provider OIDC token claims).

- [#2839](https://github.com/commercetools/merchant-center-application-kit/pull/2839) [`f5eb8d77c`](https://github.com/commercetools/merchant-center-application-kit/commit/f5eb8d77c606e624e6cfc2cfad3da1eaeff5fdd6) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - This is an internal change to restructure how use design tokens, in particular by relying on CSS variables. Consumers are not affected by any of these changes.

### Patch Changes

- Updated dependencies [[`a5e405db4`](https://github.com/commercetools/merchant-center-application-kit/commit/a5e405db45114a5cdd4d6814968bd199e6c8a480), [`f5eb8d77c`](https://github.com/commercetools/merchant-center-application-kit/commit/f5eb8d77c606e624e6cfc2cfad3da1eaeff5fdd6)]:
  - @commercetools-frontend/application-shell-connectors@21.17.0
  - @commercetools-frontend/application-components@21.17.0
  - @commercetools-frontend/i18n@21.17.0
  - @commercetools-frontend/react-notifications@21.17.0
  - @commercetools-frontend/permissions@21.17.0
  - @commercetools-frontend/actions-global@21.17.0
  - @commercetools-frontend/application-config@21.17.0
  - @commercetools-frontend/assets@21.17.0
  - @commercetools-frontend/browser-history@21.17.0
  - @commercetools-frontend/constants@21.17.0
  - @commercetools-frontend/l10n@21.17.0
  - @commercetools-frontend/notifications@21.17.0
  - @commercetools-frontend/sdk@21.17.0
  - @commercetools-frontend/sentry@21.17.0
  - @commercetools-frontend/url-utils@21.17.0

## 21.16.0

### Patch Changes

- [#2580](https://github.com/commercetools/merchant-center-application-kit/pull/2580) [`1c40c40c9`](https://github.com/commercetools/merchant-center-application-kit/commit/1c40c40c947574ba24b411c9376640bb18c489ac) Thanks [@renovate](https://github.com/apps/renovate)! - Update `@testing-library/react-hooks` package to version `8.0.0`.

- [#2826](https://github.com/commercetools/merchant-center-application-kit/pull/2826) [`11192ad4b`](https://github.com/commercetools/merchant-center-application-kit/commit/11192ad4bf186ff529255c68e95193a362308620) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

- Updated dependencies [[`1c40c40c9`](https://github.com/commercetools/merchant-center-application-kit/commit/1c40c40c947574ba24b411c9376640bb18c489ac), [`11192ad4b`](https://github.com/commercetools/merchant-center-application-kit/commit/11192ad4bf186ff529255c68e95193a362308620)]:
  - @commercetools-frontend/actions-global@21.16.0
  - @commercetools-frontend/application-components@21.16.0
  - @commercetools-frontend/application-shell-connectors@21.16.0
  - @commercetools-frontend/i18n@21.16.0
  - @commercetools-frontend/l10n@21.16.0
  - @commercetools-frontend/notifications@21.16.0
  - @commercetools-frontend/react-notifications@21.16.0
  - @commercetools-frontend/sdk@21.16.0
  - @commercetools-frontend/sentry@21.16.0
  - @commercetools-frontend/permissions@21.16.0
  - @commercetools-frontend/application-config@21.16.0
  - @commercetools-frontend/assets@21.16.0
  - @commercetools-frontend/browser-history@21.16.0
  - @commercetools-frontend/constants@21.16.0
  - @commercetools-frontend/url-utils@21.16.0

## 21.15.0

### Patch Changes

- [#2810](https://github.com/commercetools/merchant-center-application-kit/pull/2810) [`0e49a78f8`](https://github.com/commercetools/merchant-center-application-kit/commit/0e49a78f8e3b228a9b0bb3d90781aa8e940de4bc) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

- Updated dependencies [[`0e49a78f8`](https://github.com/commercetools/merchant-center-application-kit/commit/0e49a78f8e3b228a9b0bb3d90781aa8e940de4bc), [`30d8324bc`](https://github.com/commercetools/merchant-center-application-kit/commit/30d8324bce8c04cb67bbb3af97175861b663aef0)]:
  - @commercetools-frontend/sdk@21.15.0
  - @commercetools-frontend/sentry@21.15.0
  - @commercetools-frontend/actions-global@21.15.0
  - @commercetools-frontend/application-shell-connectors@21.15.0
  - @commercetools-frontend/i18n@21.15.0
  - @commercetools-frontend/l10n@21.15.0
  - @commercetools-frontend/permissions@21.15.0
  - @commercetools-frontend/react-notifications@21.15.0
  - @commercetools-frontend/application-components@21.15.0
  - @commercetools-frontend/application-config@21.15.0
  - @commercetools-frontend/assets@21.15.0
  - @commercetools-frontend/browser-history@21.15.0
  - @commercetools-frontend/constants@21.15.0
  - @commercetools-frontend/notifications@21.15.0
  - @commercetools-frontend/url-utils@21.15.0

## 21.14.3

### Patch Changes

- [#2807](https://github.com/commercetools/merchant-center-application-kit/pull/2807) [`3ab502be1`](https://github.com/commercetools/merchant-center-application-kit/commit/3ab502be18358045b25be48a557d353985ea17b3) Thanks [@emmenko](https://github.com/emmenko)! - Disable Redux serializable check

- Updated dependencies []:
  - @commercetools-frontend/actions-global@21.14.3
  - @commercetools-frontend/application-components@21.14.3
  - @commercetools-frontend/application-config@21.14.3
  - @commercetools-frontend/application-shell-connectors@21.14.3
  - @commercetools-frontend/assets@21.14.3
  - @commercetools-frontend/browser-history@21.14.3
  - @commercetools-frontend/constants@21.14.3
  - @commercetools-frontend/i18n@21.14.3
  - @commercetools-frontend/l10n@21.14.3
  - @commercetools-frontend/notifications@21.14.3
  - @commercetools-frontend/permissions@21.14.3
  - @commercetools-frontend/react-notifications@21.14.3
  - @commercetools-frontend/sdk@21.14.3
  - @commercetools-frontend/sentry@21.14.3
  - @commercetools-frontend/url-utils@21.14.3

## 21.14.2

### Patch Changes

- [#2776](https://github.com/commercetools/merchant-center-application-kit/pull/2776) [`00d9edcb4`](https://github.com/commercetools/merchant-center-application-kit/commit/00d9edcb49a144797ba3690db012e429e88a30fa) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

- Updated dependencies [[`00d9edcb4`](https://github.com/commercetools/merchant-center-application-kit/commit/00d9edcb49a144797ba3690db012e429e88a30fa)]:
  - @commercetools-frontend/actions-global@21.14.2
  - @commercetools-frontend/application-components@21.14.2
  - @commercetools-frontend/application-config@21.14.2
  - @commercetools-frontend/application-shell-connectors@21.14.2
  - @commercetools-frontend/browser-history@21.14.2
  - @commercetools-frontend/constants@21.14.2
  - @commercetools-frontend/i18n@21.14.2
  - @commercetools-frontend/l10n@21.14.2
  - @commercetools-frontend/notifications@21.14.2
  - @commercetools-frontend/permissions@21.14.2
  - @commercetools-frontend/react-notifications@21.14.2
  - @commercetools-frontend/sdk@21.14.2
  - @commercetools-frontend/sentry@21.14.2
  - @commercetools-frontend/url-utils@21.14.2
  - @commercetools-frontend/assets@21.14.2

## 21.14.1

### Patch Changes

- [#2802](https://github.com/commercetools/merchant-center-application-kit/pull/2802) [`66e4f3296`](https://github.com/commercetools/merchant-center-application-kit/commit/66e4f329679f92483bad96d2ed10184a56cdef0c) Thanks [@ddouglasz](https://github.com/ddouglasz)! - Fix issue with page title still rendering previous title even after navigating to a new location.

* [#2791](https://github.com/commercetools/merchant-center-application-kit/pull/2791) [`ea9d188bf`](https://github.com/commercetools/merchant-center-application-kit/commit/ea9d188bf301366e7738e6d18b5bc99e7783dda2) Thanks [@dependabot](https://github.com/apps/dependabot)! - Security patch of `moment-timezone`

- [#2798](https://github.com/commercetools/merchant-center-application-kit/pull/2798) [`abdb1843e`](https://github.com/commercetools/merchant-center-application-kit/commit/abdb1843ec5574903cb23ea8de288f40d9107b08) Thanks [@ddouglasz](https://github.com/ddouglasz)! - Export `<ApplicationPageTitle>` component

- Updated dependencies [[`cb327cb2e`](https://github.com/commercetools/merchant-center-application-kit/commit/cb327cb2e518b039f878e255202b6d77a5080d16), [`ea9d188bf`](https://github.com/commercetools/merchant-center-application-kit/commit/ea9d188bf301366e7738e6d18b5bc99e7783dda2), [`91c0da4f9`](https://github.com/commercetools/merchant-center-application-kit/commit/91c0da4f9afa92e44a22c8c3af38f545488d5e44)]:
  - @commercetools-frontend/application-components@21.14.1
  - @commercetools-frontend/application-shell-connectors@21.14.1
  - @commercetools-frontend/l10n@21.14.1
  - @commercetools-frontend/react-notifications@21.14.1
  - @commercetools-frontend/application-config@21.14.1
  - @commercetools-frontend/permissions@21.14.1
  - @commercetools-frontend/actions-global@21.14.1
  - @commercetools-frontend/assets@21.14.1
  - @commercetools-frontend/browser-history@21.14.1
  - @commercetools-frontend/constants@21.14.1
  - @commercetools-frontend/i18n@21.14.1
  - @commercetools-frontend/notifications@21.14.1
  - @commercetools-frontend/sdk@21.14.1
  - @commercetools-frontend/sentry@21.14.1
  - @commercetools-frontend/url-utils@21.14.1

## 21.14.0

### Minor Changes

- [#2758](https://github.com/commercetools/merchant-center-application-kit/pull/2758) [`1be3924d8`](https://github.com/commercetools/merchant-center-application-kit/commit/1be3924d8f01ad97c2448c311e0d161fe5d5dc66) Thanks [@ddouglasz](https://github.com/ddouglasz)! - Custom Applications now display a more useful page title based on the page location. The following format is used:

  ```
  <Entry-point-uri-path> - <project-key> - Merchant Center
  ```

  You can optionally add more contextual information to the default page title by rendering the `<ApplicationPageTitle>` component and passing additional values.
  The values are prepended to the default page title and concatenated with a `-` separator. If each additional value exceeds 24 characters length, it will be truncated in the middle.

  Overwriting the default page title is recommended in detail pages where there is a human-readable resource identifier, for example a product name.

  ```js
  import { ApplicationPageTitle } from '@commercetools-frontend/application-shell';

  <ApplicationPageTitle additionalParts={['T-Shirt red']} />;
  // T-Shirt red - Products - my-shop - Merchant Center
  ```

  The `<ApplicationPageTitle>` component can be rendered multiple times and the last one rendered will overwrite the other ones.

### Patch Changes

- [#2781](https://github.com/commercetools/merchant-center-application-kit/pull/2781) [`571eda725`](https://github.com/commercetools/merchant-center-application-kit/commit/571eda725b5ab44ca25bc4f75a691f7bea62d574) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Add support for requesting specific `claims` to be included in the exchange JWT sent from Merchant Center API to an external API.
  Currently we only support requesting a custom claim with logged in user's permissions.

  ```js
  // Apollo example
  const useExternalApiFetcher = () => {
    const externalApiUrl = useApplicationContext(
      (context) => context.environment.externalApiUrl
    );
    const { loading, data, error } = useMcQuery(MyQuery, {
      context: createApolloContextForProxyForwardTo({
        uri: externalApiUrl,
        includeUserPermissions: true,
      }),
    });

    return {
      loading,
      data,
      error,
    };
  };
  ```

  ```js
  // Custom HTTP client example (using `fetch`)
  const data = await executeHttpClientRequest(
    async (options) => {
      const res = await fetch(buildApiUrl('/proxy/forward-to'), {
        method: 'GET',
        ...options,
      });
      const data = await res.json();

      return {
        data,
        statusCode: res.status,
        getHeader: (key) => res.headers.get(key),
      };
    },
    {
      userAgent,
      forwardToConfig: {
        uri: 'https://my-api.com/my-endpoint',
        includeUserPermissions: true,
      },
    }
  );
  ```

* [#2778](https://github.com/commercetools/merchant-center-application-kit/pull/2778) [`02600391a`](https://github.com/commercetools/merchant-center-application-kit/commit/02600391a90c0e17f25c25826025612e186f8d50) Thanks [@tdeekens](https://github.com/tdeekens)! - Update flopflip dependencies

* Updated dependencies [[`3239eed53`](https://github.com/commercetools/merchant-center-application-kit/commit/3239eed53a84d398e8416fc83a6813867aac86ad), [`6f15c52b1`](https://github.com/commercetools/merchant-center-application-kit/commit/6f15c52b1bafccf09e94d3b62df60fec031ffe0c), [`571eda725`](https://github.com/commercetools/merchant-center-application-kit/commit/571eda725b5ab44ca25bc4f75a691f7bea62d574)]:
  - @commercetools-frontend/application-components@21.14.0
  - @commercetools-frontend/sdk@21.14.0
  - @commercetools-frontend/actions-global@21.14.0
  - @commercetools-frontend/application-config@21.14.0
  - @commercetools-frontend/application-shell-connectors@21.14.0
  - @commercetools-frontend/assets@21.14.0
  - @commercetools-frontend/browser-history@21.14.0
  - @commercetools-frontend/constants@21.14.0
  - @commercetools-frontend/i18n@21.14.0
  - @commercetools-frontend/l10n@21.14.0
  - @commercetools-frontend/notifications@21.14.0
  - @commercetools-frontend/permissions@21.14.0
  - @commercetools-frontend/react-notifications@21.14.0
  - @commercetools-frontend/sentry@21.14.0
  - @commercetools-frontend/url-utils@21.14.0

## 21.13.1

### Patch Changes

- [`482ad98ee`](https://github.com/commercetools/merchant-center-application-kit/commit/482ad98eeb4570a583d58d476a7902ffe6cc2a94) Thanks [@emmenko](https://github.com/emmenko)! - Nothing changed, the previous release `21.13.0` had an issue publishing to NPM so we're bumping versions to trigger a new release.

- Updated dependencies [[`482ad98ee`](https://github.com/commercetools/merchant-center-application-kit/commit/482ad98eeb4570a583d58d476a7902ffe6cc2a94)]:
  - @commercetools-frontend/actions-global@21.13.1
  - @commercetools-frontend/application-components@21.13.1
  - @commercetools-frontend/application-config@21.13.1
  - @commercetools-frontend/application-shell-connectors@21.13.1
  - @commercetools-frontend/assets@21.13.1
  - @commercetools-frontend/browser-history@21.13.1
  - @commercetools-frontend/constants@21.13.1
  - @commercetools-frontend/i18n@21.13.1
  - @commercetools-frontend/l10n@21.13.1
  - @commercetools-frontend/notifications@21.13.1
  - @commercetools-frontend/permissions@21.13.1
  - @commercetools-frontend/react-notifications@21.13.1
  - @commercetools-frontend/sdk@21.13.1
  - @commercetools-frontend/sentry@21.13.1
  - @commercetools-frontend/url-utils@21.13.1

## 21.13.0

### Patch Changes

- [#2772](https://github.com/commercetools/merchant-center-application-kit/pull/2772) [`f66199e79`](https://github.com/commercetools/merchant-center-application-kit/commit/f66199e793c58628ab8b6c76cef8ddd0dad46260) Thanks [@emmenko](https://github.com/emmenko)! - Validate that `forwardToConfig.uri` is defined, when using a custom HTTP client.

* [#2761](https://github.com/commercetools/merchant-center-application-kit/pull/2761) [`d012420e5`](https://github.com/commercetools/merchant-center-application-kit/commit/d012420e563b34a1678693f19905bdd79b2317e2) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Update all dependencies

- [#2767](https://github.com/commercetools/merchant-center-application-kit/pull/2767) [`5614ec9d8`](https://github.com/commercetools/merchant-center-application-kit/commit/5614ec9d8b9fc9c40c92ff1fde0beacbc3290e5e) Thanks [@emmenko](https://github.com/emmenko)! - Avoid using deprecated fields when fetching application menu links

- Updated dependencies [[`d012420e5`](https://github.com/commercetools/merchant-center-application-kit/commit/d012420e563b34a1678693f19905bdd79b2317e2), [`5614ec9d8`](https://github.com/commercetools/merchant-center-application-kit/commit/5614ec9d8b9fc9c40c92ff1fde0beacbc3290e5e), [`7d97b459e`](https://github.com/commercetools/merchant-center-application-kit/commit/7d97b459e69186cec1df9d837aa265923176e34e)]:
  - @commercetools-frontend/application-components@21.13.0
  - @commercetools-frontend/application-config@21.13.0
  - @commercetools-frontend/react-notifications@21.13.0
  - @commercetools-frontend/sentry@21.13.0
  - @commercetools-frontend/application-shell-connectors@21.13.0
  - @commercetools-frontend/actions-global@21.13.0
  - @commercetools-frontend/i18n@21.13.0
  - @commercetools-frontend/l10n@21.13.0
  - @commercetools-frontend/permissions@21.13.0
  - @commercetools-frontend/assets@21.13.0
  - @commercetools-frontend/browser-history@21.13.0
  - @commercetools-frontend/constants@21.13.0
  - @commercetools-frontend/notifications@21.13.0
  - @commercetools-frontend/sdk@21.13.0
  - @commercetools-frontend/url-utils@21.13.0

## 21.12.0

### Patch Changes

- [#2723](https://github.com/commercetools/merchant-center-application-kit/pull/2723) [`e40fcd6c`](https://github.com/commercetools/merchant-center-application-kit/commit/e40fcd6cda229fd8f7af8b33f6a5c3541f361aa0) Thanks [@emmenko](https://github.com/emmenko)! - Better reuse the `getMcApiUrl` function and do some maintenance on it.

- Updated dependencies [[`bcb5e167`](https://github.com/commercetools/merchant-center-application-kit/commit/bcb5e167bbc8dc660ba7fb11c94f7cf3918736f0), [`fbdf2a68`](https://github.com/commercetools/merchant-center-application-kit/commit/fbdf2a686061f32eb5130af9a4286b8e1ab2af32), [`e40fcd6c`](https://github.com/commercetools/merchant-center-application-kit/commit/e40fcd6cda229fd8f7af8b33f6a5c3541f361aa0)]:
  - @commercetools-frontend/sdk@21.12.0
  - @commercetools-frontend/l10n@21.12.0
  - @commercetools-frontend/application-shell-connectors@21.12.0
  - @commercetools-frontend/application-components@21.12.0
  - @commercetools-frontend/permissions@21.12.0
  - @commercetools-frontend/actions-global@21.12.0
  - @commercetools-frontend/application-config@21.12.0
  - @commercetools-frontend/assets@21.12.0
  - @commercetools-frontend/browser-history@21.12.0
  - @commercetools-frontend/constants@21.12.0
  - @commercetools-frontend/i18n@21.12.0
  - @commercetools-frontend/notifications@21.12.0
  - @commercetools-frontend/react-notifications@21.12.0
  - @commercetools-frontend/sentry@21.12.0
  - @commercetools-frontend/url-utils@21.12.0

## 21.11.0

### Minor Changes

- [#2743](https://github.com/commercetools/merchant-center-application-kit/pull/2743) [`eb056ebe`](https://github.com/commercetools/merchant-center-application-kit/commit/eb056ebec81d32284bfc39ba0757705849abc924) Thanks [@emmenko](https://github.com/emmenko)! - Extend the utility functions to configure custom HTTP clients to support the configuration for the `/proxy/forward-to` endpoint.

  ```js
  import createHttpUserAgent from '@commercetools/http-user-agent';
  import {
    buildApiUrl,
    createHttpClientOptions,
    executeHttpClientRequest,
  } from '@commercetools-frontend/application-shell';

  const userAgent = createHttpUserAgent({
    name: 'fetch-client',
    version: '2.6.0',
    libraryName: window.app.applicationName,
    contactEmail: 'support@my-company.com',
  });

  // Simple example using `fetch`.
  const data = await executeHttpClientRequest(
    async (options) => {
      const res = await fetch(buildApiUrl('/proxy/forward-to'), {
        method: 'GET',
        ...options,
      });
      const data = await res.json();

      return {
        data,
        statusCode: res.status,
        getHeader: (key) => res.headers.get(key),
      };
    },
    {
      userAgent,
      forwardToConfig: {
        uri: 'https://my-api.com/my-endpoint',
      },
    }
  );
  ```

### Patch Changes

- Updated dependencies []:
  - @commercetools-frontend/actions-global@21.11.0
  - @commercetools-frontend/application-components@21.11.0
  - @commercetools-frontend/application-config@21.11.0
  - @commercetools-frontend/application-shell-connectors@21.11.0
  - @commercetools-frontend/assets@21.11.0
  - @commercetools-frontend/browser-history@21.11.0
  - @commercetools-frontend/constants@21.11.0
  - @commercetools-frontend/i18n@21.11.0
  - @commercetools-frontend/l10n@21.11.0
  - @commercetools-frontend/notifications@21.11.0
  - @commercetools-frontend/permissions@21.11.0
  - @commercetools-frontend/react-notifications@21.11.0
  - @commercetools-frontend/sdk@21.11.0
  - @commercetools-frontend/sentry@21.11.0
  - @commercetools-frontend/url-utils@21.11.0

## 21.10.0

### Minor Changes

- [#2734](https://github.com/commercetools/merchant-center-application-kit/pull/2734) [`e10b1b75`](https://github.com/commercetools/merchant-center-application-kit/commit/e10b1b758314783d364f5b6da9b1ddc466476e1c) Thanks [@emmenko](https://github.com/emmenko)! - New utility functions to configure HTTP requests when using custom HTTP clients.

  By default Custom Applications provide [preconfigured HTTP clients](https://docs.commercetools.com/custom-applications/development/data-fetching) for GraphQL and REST API requests.

  However, you could use any other HTTP client of your choice, for example `fetch`, `axios`, `swr`, etc.

  The main problem with that is the fact that you need to configure these clients on your own, in particular regarding the HTTP headers that should be sent with every request.

  This is now possible using some dedicated utility functions. See example usage below:

  ```js
  import createHttpUserAgent from '@commercetools/http-user-agent';
  import {
    buildApiUrl,
    createHttpClientOptions,
    executeHttpClientRequest,
  } from '@commercetools-frontend/application-shell';

  const userAgent = createHttpUserAgent({
    name: 'fetch-client',
    version: '2.6.0',
    libraryName: window.app.applicationName,
    contactEmail: 'support@my-company.com',
  });

  // Simple example using `fetch`.
  const data = await executeHttpClientRequest(
    async (options) => {
      const res = await fetch(buildApiUrl('/proxy/ctp/channels'), {
        method: 'GET',
        ...options,
      });
      const data = await res.json();

      return {
        data,
        statusCode: res.status,
        getHeader: (key) => res.headers.get(key),
      };
    },
    { userAgent }
  );
  ```

  The implementation example includes all the recommended functionalities such as:

  - Defining the required/recommended HTTP headers for the Merchant Center API.
  - Automatically renewing the token.

  For more information check the [Data fetching](https://docs.commercetools.com/custom-applications/development/data-fetching) documentation.

### Patch Changes

- [#2733](https://github.com/commercetools/merchant-center-application-kit/pull/2733) [`67b0329a`](https://github.com/commercetools/merchant-center-application-kit/commit/67b0329aeccf281e6219c657a3c35f2ca34fc465) Thanks [@emmenko](https://github.com/emmenko)! - Add option to `createApolloClient` to pass the Apollo Rest Link. See [documentation](https://docs.commercetools.com/custom-applications/api-reference/commercetools-frontend-application-shell#createapolloclient) for more information.

- Updated dependencies [[`fc3fd602`](https://github.com/commercetools/merchant-center-application-kit/commit/fc3fd6022031e3fe132cf890cb2a8b71f4ae0731), [`73977f3f`](https://github.com/commercetools/merchant-center-application-kit/commit/73977f3fcc52acd6195b698c37b8a9a80547670d), [`dac14c2b`](https://github.com/commercetools/merchant-center-application-kit/commit/dac14c2bf0800eed6ddd1977d988a31b23a9c47e), [`d0e10a3f`](https://github.com/commercetools/merchant-center-application-kit/commit/d0e10a3fbc893d55e15ffff8fe16911784425930)]:
  - @commercetools-frontend/i18n@21.10.0
  - @commercetools-frontend/l10n@21.10.0
  - @commercetools-frontend/constants@21.10.0
  - @commercetools-frontend/application-components@21.10.0
  - @commercetools-frontend/actions-global@21.10.0
  - @commercetools-frontend/application-shell-connectors@21.10.0
  - @commercetools-frontend/react-notifications@21.10.0
  - @commercetools-frontend/sdk@21.10.0
  - @commercetools-frontend/sentry@21.10.0
  - @commercetools-frontend/permissions@21.10.0
  - @commercetools-frontend/application-config@21.10.0
  - @commercetools-frontend/assets@21.10.0
  - @commercetools-frontend/browser-history@21.10.0
  - @commercetools-frontend/notifications@21.10.0
  - @commercetools-frontend/url-utils@21.10.0

## 21.9.0

### Minor Changes

- [#2695](https://github.com/commercetools/merchant-center-application-kit/pull/2695) [`de0980f9`](https://github.com/commercetools/merchant-center-application-kit/commit/de0980f9d151f3f0a98ddbf06e0629aaf03f5239) Thanks [@emmenko](https://github.com/emmenko)! - Update dependency `graphql` to `v16`.

### Patch Changes

- [#2707](https://github.com/commercetools/merchant-center-application-kit/pull/2707) [`d0584935`](https://github.com/commercetools/merchant-center-application-kit/commit/d058493588821ee249333db6f11beced11594c74) Thanks [@emmenko](https://github.com/emmenko)! - Update Apollo dependency to `v3.6.9`

* [#2687](https://github.com/commercetools/merchant-center-application-kit/pull/2687) [`2f414585`](https://github.com/commercetools/merchant-center-application-kit/commit/2f414585cc324cb483b49c8d1040845d3f231ba3) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Fix loading missing `moment` locale metadata for certain user locales. Now dates are correctly formatted according to the selected locale.

- [#2705](https://github.com/commercetools/merchant-center-application-kit/pull/2705) [`abe2c475`](https://github.com/commercetools/merchant-center-application-kit/commit/abe2c475be2aff3781ac6151178aede1e0801f77) Thanks [@emmenko](https://github.com/emmenko)! - Update typescript dependencies

* [#2703](https://github.com/commercetools/merchant-center-application-kit/pull/2703) [`8cd781a6`](https://github.com/commercetools/merchant-center-application-kit/commit/8cd781a6f2d626fd564e6e1fd0be30991c27b4ea) Thanks [@emmenko](https://github.com/emmenko)! - Update Emotion dependencies to `v11.9.3`

- [#2706](https://github.com/commercetools/merchant-center-application-kit/pull/2706) [`28de0b59`](https://github.com/commercetools/merchant-center-application-kit/commit/28de0b59e8f3944eaef9000b517b384acfc4b98d) Thanks [@emmenko](https://github.com/emmenko)! - Update `msw` to `v0.44.0`

* [#2709](https://github.com/commercetools/merchant-center-application-kit/pull/2709) [`d0618b0a`](https://github.com/commercetools/merchant-center-application-kit/commit/d0618b0a61490ddb1d8f0b1aa26b5d03da7da38c) Thanks [@emmenko](https://github.com/emmenko)! - Update `moment` and `react-intl` dependencies

- [#2702](https://github.com/commercetools/merchant-center-application-kit/pull/2702) [`69a1fe13`](https://github.com/commercetools/merchant-center-application-kit/commit/69a1fe13362188977c0a9df86754634fdc81a413) Thanks [@emmenko](https://github.com/emmenko)! - Update Babel dependencies

* [#2700](https://github.com/commercetools/merchant-center-application-kit/pull/2700) [`21d98709`](https://github.com/commercetools/merchant-center-application-kit/commit/21d98709f12696f2f7bfd22d5d1c18cee40a4845) Thanks [@emmenko](https://github.com/emmenko)! - Update UI Kit dependencies to `v15.1.0`.

* Updated dependencies [[`d0584935`](https://github.com/commercetools/merchant-center-application-kit/commit/d058493588821ee249333db6f11beced11594c74), [`2f414585`](https://github.com/commercetools/merchant-center-application-kit/commit/2f414585cc324cb483b49c8d1040845d3f231ba3), [`abe2c475`](https://github.com/commercetools/merchant-center-application-kit/commit/abe2c475be2aff3781ac6151178aede1e0801f77), [`22fcb200`](https://github.com/commercetools/merchant-center-application-kit/commit/22fcb2007879bd8b10b0a5b70d02490162554e57), [`8cd781a6`](https://github.com/commercetools/merchant-center-application-kit/commit/8cd781a6f2d626fd564e6e1fd0be30991c27b4ea), [`d0618b0a`](https://github.com/commercetools/merchant-center-application-kit/commit/d0618b0a61490ddb1d8f0b1aa26b5d03da7da38c), [`69a1fe13`](https://github.com/commercetools/merchant-center-application-kit/commit/69a1fe13362188977c0a9df86754634fdc81a413), [`8ab624e5`](https://github.com/commercetools/merchant-center-application-kit/commit/8ab624e593d6f9e56efe5d1f8562788bf93a3a62), [`8367e1b7`](https://github.com/commercetools/merchant-center-application-kit/commit/8367e1b71777b29d328e037148439418a66c0a72), [`21d98709`](https://github.com/commercetools/merchant-center-application-kit/commit/21d98709f12696f2f7bfd22d5d1c18cee40a4845), [`de0980f9`](https://github.com/commercetools/merchant-center-application-kit/commit/de0980f9d151f3f0a98ddbf06e0629aaf03f5239)]:
  - @commercetools-frontend/application-shell-connectors@21.9.0
  - @commercetools-frontend/i18n@21.9.0
  - @commercetools-frontend/l10n@21.9.0
  - @commercetools-frontend/actions-global@21.9.0
  - @commercetools-frontend/application-components@21.9.0
  - @commercetools-frontend/browser-history@21.9.0
  - @commercetools-frontend/permissions@21.9.0
  - @commercetools-frontend/react-notifications@21.9.0
  - @commercetools-frontend/sdk@21.9.0
  - @commercetools-frontend/sentry@21.9.0
  - @commercetools-frontend/application-config@21.9.0
  - @commercetools-frontend/constants@21.9.0
  - @commercetools-frontend/notifications@21.9.0
  - @commercetools-frontend/url-utils@21.9.0
  - @commercetools-frontend/assets@21.9.0

## 21.8.1

### Patch Changes

- Updated dependencies []:
  - @commercetools-frontend/actions-global@21.8.1
  - @commercetools-frontend/application-components@21.8.1
  - @commercetools-frontend/application-config@21.8.1
  - @commercetools-frontend/application-shell-connectors@21.8.1
  - @commercetools-frontend/assets@21.8.1
  - @commercetools-frontend/browser-history@21.8.1
  - @commercetools-frontend/constants@21.8.1
  - @commercetools-frontend/i18n@21.8.1
  - @commercetools-frontend/l10n@21.8.1
  - @commercetools-frontend/notifications@21.8.1
  - @commercetools-frontend/permissions@21.8.1
  - @commercetools-frontend/react-notifications@21.8.1
  - @commercetools-frontend/sdk@21.8.1
  - @commercetools-frontend/sentry@21.8.1
  - @commercetools-frontend/url-utils@21.8.1

## 21.8.0

### Minor Changes

- [#2667](https://github.com/commercetools/merchant-center-application-kit/pull/2667) [`1d8c71f1`](https://github.com/commercetools/merchant-center-application-kit/commit/1d8c71f1fed656bb6dedb3379198cc6fcdb5363f) Thanks [@emmenko](https://github.com/emmenko)! - Add support for setting the `audience` policy. The policy can be used to determine how the `audience` value is exchanged between the Merchant Center API and the external API.

  Supported values are:

  - `forward-url-full-path`: This is the default policy. It sets the `audience` using the full URL (origin + pathname).
  - `forward-url-origin`: This is the alternative policy. It sets the `audience` using only the origin URL part.

  ```js
  createApolloContextForProxyForwardTo({
    audiencePolicy: 'forward-url-origin',
    // ...
  });

  // "X-Forward-To-Audience-Policy": "forward-url-origin"
  ```

### Patch Changes

- [#2661](https://github.com/commercetools/merchant-center-application-kit/pull/2661) [`43a9df21`](https://github.com/commercetools/merchant-center-application-kit/commit/43a9df2193000b49a0299c02d5218c50d71567ed) Thanks [@emmenko](https://github.com/emmenko)! - Drop the copyright year from the license files

* [#2651](https://github.com/commercetools/merchant-center-application-kit/pull/2651) [`f7ec746b`](https://github.com/commercetools/merchant-center-application-kit/commit/f7ec746bfe9742a8bae5ea513db93614cce457c9) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Fixed aria role names.

  We were using invalid role names in some of the component's elements.

  Special mention to the element wrapping the notifications as it now uses the aria-live [attribute](https://www.w3.org/TR/wai-aria/#aria-live) (with **polite** value).

- [#2665](https://github.com/commercetools/merchant-center-application-kit/pull/2665) [`a98f9fb5`](https://github.com/commercetools/merchant-center-application-kit/commit/a98f9fb56a8066d2d64f1fa0f176bf130adb5227) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Fix `ApplicationShell` header selectors a11y issues

* [#2671](https://github.com/commercetools/merchant-center-application-kit/pull/2671) [`1d63e7b6`](https://github.com/commercetools/merchant-center-application-kit/commit/1d63e7b6e0a77f5aa0af4ab38030455d6abedf12) Thanks [@emmenko](https://github.com/emmenko)! - Update Flopflip dependencies

- [#2655](https://github.com/commercetools/merchant-center-application-kit/pull/2655) [`1cc471e8`](https://github.com/commercetools/merchant-center-application-kit/commit/1cc471e8872313867afc413598b9808507dd0677) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Fix `ApplicationShell` header a11y issues in user menu dropdown

- Updated dependencies [[`78de0ec6`](https://github.com/commercetools/merchant-center-application-kit/commit/78de0ec6b569b7daa23edf4fd21cae0842857ca8), [`d6bfecf1`](https://github.com/commercetools/merchant-center-application-kit/commit/d6bfecf17c0a6a38330943cc5f195f1854248770), [`43a9df21`](https://github.com/commercetools/merchant-center-application-kit/commit/43a9df2193000b49a0299c02d5218c50d71567ed), [`d6bfecf1`](https://github.com/commercetools/merchant-center-application-kit/commit/d6bfecf17c0a6a38330943cc5f195f1854248770), [`c56498ca`](https://github.com/commercetools/merchant-center-application-kit/commit/c56498ca105272d31ca4a6197c16870f4b0e32e6), [`f3cc395d`](https://github.com/commercetools/merchant-center-application-kit/commit/f3cc395d1e29e25f694345c03a7b6376b2d88d20), [`20e648d2`](https://github.com/commercetools/merchant-center-application-kit/commit/20e648d2d69ac9b909ae90946c4fe2274cdf7332), [`405aa67b`](https://github.com/commercetools/merchant-center-application-kit/commit/405aa67bb55dd61e39f0856c120614030e9c8398), [`1d8c71f1`](https://github.com/commercetools/merchant-center-application-kit/commit/1d8c71f1fed656bb6dedb3379198cc6fcdb5363f), [`d6bfecf1`](https://github.com/commercetools/merchant-center-application-kit/commit/d6bfecf17c0a6a38330943cc5f195f1854248770)]:
  - @commercetools-frontend/application-shell-connectors@21.8.0
  - @commercetools-frontend/application-config@21.8.0
  - @commercetools-frontend/actions-global@21.8.0
  - @commercetools-frontend/assets@21.8.0
  - @commercetools-frontend/browser-history@21.8.0
  - @commercetools-frontend/constants@21.8.0
  - @commercetools-frontend/i18n@21.8.0
  - @commercetools-frontend/l10n@21.8.0
  - @commercetools-frontend/notifications@21.8.0
  - @commercetools-frontend/permissions@21.8.0
  - @commercetools-frontend/react-notifications@21.8.0
  - @commercetools-frontend/sdk@21.8.0
  - @commercetools-frontend/sentry@21.8.0
  - @commercetools-frontend/url-utils@21.8.0
  - @commercetools-frontend/application-components@21.8.0

## 21.7.0

### Patch Changes

- [#2632](https://github.com/commercetools/merchant-center-application-kit/pull/2632) [`8829ae8d`](https://github.com/commercetools/merchant-center-application-kit/commit/8829ae8dc19314bab8a6f87bc65fa48f7f5a88be) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Update the link for the main logo in the topbar (top left corner) to be a native one

- Updated dependencies [[`0b3ea758`](https://github.com/commercetools/merchant-center-application-kit/commit/0b3ea7585116df5e981609fc219491dc279b3028), [`7e343017`](https://github.com/commercetools/merchant-center-application-kit/commit/7e343017f8ebe12da3bf56a27c40541561925857)]:
  - @commercetools-frontend/application-config@21.7.0
  - @commercetools-frontend/application-components@21.7.0

## 21.6.0

### Patch Changes

- [#2555](https://github.com/commercetools/merchant-center-application-kit/pull/2555) [`0b7a3743`](https://github.com/commercetools/merchant-center-application-kit/commit/0b7a3743207172ace7f2b6893b9c7d61c351967b) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`0b7a3743`](https://github.com/commercetools/merchant-center-application-kit/commit/0b7a3743207172ace7f2b6893b9c7d61c351967b), [`7622b6f9`](https://github.com/commercetools/merchant-center-application-kit/commit/7622b6f911826d5c2cf2edec649d3a684b89ac25), [`339abbca`](https://github.com/commercetools/merchant-center-application-kit/commit/339abbca536b7fa5f7e80c1cf69d32d33cd45cec), [`d20638ef`](https://github.com/commercetools/merchant-center-application-kit/commit/d20638effe2d5ab2b4c6c851cae8ed70f8e3a080), [`5d0a461d`](https://github.com/commercetools/merchant-center-application-kit/commit/5d0a461d73d23938d4c42d48f985d28b2722019c), [`dc5b02eb`](https://github.com/commercetools/merchant-center-application-kit/commit/dc5b02eb6d18e5f8e3904ce609f67306ef5c514c)]:
  - @commercetools-frontend/actions-global@21.6.0
  - @commercetools-frontend/application-components@21.6.0
  - @commercetools-frontend/application-shell-connectors@21.6.0
  - @commercetools-frontend/i18n@21.6.0
  - @commercetools-frontend/l10n@21.6.0
  - @commercetools-frontend/notifications@21.6.0
  - @commercetools-frontend/react-notifications@21.6.0
  - @commercetools-frontend/sdk@21.6.0
  - @commercetools-frontend/sentry@21.6.0
  - @commercetools-frontend/application-config@21.6.0
  - @commercetools-frontend/permissions@21.6.0

## 21.5.1

### Patch Changes

- Updated dependencies [[`787692ac`](https://github.com/commercetools/merchant-center-application-kit/commit/787692accfed47c5dc50ef9b711e38d76ae97a87)]:
  - @commercetools-frontend/application-components@21.5.1

## 21.5.0

### Patch Changes

- Updated dependencies [[`3094da2f`](https://github.com/commercetools/merchant-center-application-kit/commit/3094da2fbe03fd8d5731836fa822d609dfccc84e), [`3180de7f`](https://github.com/commercetools/merchant-center-application-kit/commit/3180de7fc6a4da6b1925311b9e38bc8aad897e98), [`2f58b2d6`](https://github.com/commercetools/merchant-center-application-kit/commit/2f58b2d619fbc9d30e7d89604aba97f0c0ac9325)]:
  - @commercetools-frontend/application-config@21.5.0
  - @commercetools-frontend/application-components@21.5.0

## 21.4.0

### Minor Changes

- [#2572](https://github.com/commercetools/merchant-center-application-kit/pull/2572) [`5b06e97a`](https://github.com/commercetools/merchant-center-application-kit/commit/5b06e97a65b48255d45f4d66acb6d52548025cc4) Thanks [@emmenko](https://github.com/emmenko)! - Bump uikit packages to v15.

* [#2550](https://github.com/commercetools/merchant-center-application-kit/pull/2550) [`1065e661`](https://github.com/commercetools/merchant-center-application-kit/commit/1065e661f4bd7bd9b6096fdc6296c0341129f301) Thanks [@kark](https://github.com/kark)! - Add a new `<SuspendedRoute>` component.

  This component is exactly like the `<Route>` component of `react-router` but it wraps the children with `React.Suspense`, allowing the children to be dynamically loaded with `React.lazy`. This can be used for code splitting components at the route level.

  ```jsx
  import { Switch } from 'react-router-dom';
  import { lazy } from 'react';

  const LazyLoadedComponent = lazy(() => import('./lazy-loaded-component'));

  <Switch>
    <SuspendedRoute>
      <LazyLoadedComponent />
    </SuspendedRoute>
  </Switch>;
  ```

### Patch Changes

- [#2563](https://github.com/commercetools/merchant-center-application-kit/pull/2563) [`238bd34a`](https://github.com/commercetools/merchant-center-application-kit/commit/238bd34a6045fd4cda443585b714ac0689ecd335) Thanks [@kark](https://github.com/kark)! - Update `react-intl` to version `^5.25.0`

- Updated dependencies [[`238bd34a`](https://github.com/commercetools/merchant-center-application-kit/commit/238bd34a6045fd4cda443585b714ac0689ecd335), [`5b06e97a`](https://github.com/commercetools/merchant-center-application-kit/commit/5b06e97a65b48255d45f4d66acb6d52548025cc4)]:
  - @commercetools-frontend/application-components@21.4.0
  - @commercetools-frontend/i18n@21.4.0
  - @commercetools-frontend/react-notifications@21.4.0

## 21.3.5

### Patch Changes

- [#2554](https://github.com/commercetools/merchant-center-application-kit/pull/2554) [`8e170c65`](https://github.com/commercetools/merchant-center-application-kit/commit/8e170c6574e8d52738b3a00022fedc8df03ce048) Thanks [@emmenko](https://github.com/emmenko)! - Fix offset calculation for modal pages when notifications are opened.

* [#2543](https://github.com/commercetools/merchant-center-application-kit/pull/2543) [`ab3cbd23`](https://github.com/commercetools/merchant-center-application-kit/commit/ab3cbd2386fb14b6dd25556262d00da71fc78588) Thanks [@Rhotimee](https://github.com/Rhotimee)! - Add tracking for some nav menu items (Support link, expand toggle).

  Fix passing `onMenuItemClick` prop to the nav menu.

* Updated dependencies [[`8e170c65`](https://github.com/commercetools/merchant-center-application-kit/commit/8e170c6574e8d52738b3a00022fedc8df03ce048)]:
  - @commercetools-frontend/application-components@21.3.5
  - @commercetools-frontend/react-notifications@21.3.5

## 21.3.4

### Patch Changes

- [#2549](https://github.com/commercetools/merchant-center-application-kit/pull/2549) [`54018ddf`](https://github.com/commercetools/merchant-center-application-kit/commit/54018ddf8a953ff9409c82ab3fe3d63feb158500) Thanks [@emmenko](https://github.com/emmenko)! - Fix portals layout width based on left nav menu.

* [#2546](https://github.com/commercetools/merchant-center-application-kit/pull/2546) [`dc76e5a9`](https://github.com/commercetools/merchant-center-application-kit/commit/dc76e5a9a7f875dadf2ed5a11c48a1ddff7b431c) Thanks [@renovate](https://github.com/apps/renovate)! - Upgrade dependencies

* Updated dependencies [[`54018ddf`](https://github.com/commercetools/merchant-center-application-kit/commit/54018ddf8a953ff9409c82ab3fe3d63feb158500), [`dc76e5a9`](https://github.com/commercetools/merchant-center-application-kit/commit/dc76e5a9a7f875dadf2ed5a11c48a1ddff7b431c)]:
  - @commercetools-frontend/application-components@21.3.4
  - @commercetools-frontend/actions-global@21.3.4
  - @commercetools-frontend/application-config@21.3.4
  - @commercetools-frontend/application-shell-connectors@21.3.4
  - @commercetools-frontend/browser-history@21.3.4
  - @commercetools-frontend/constants@21.3.4
  - @commercetools-frontend/i18n@21.3.4
  - @commercetools-frontend/l10n@21.3.4
  - @commercetools-frontend/notifications@21.3.4
  - @commercetools-frontend/permissions@21.3.4
  - @commercetools-frontend/react-notifications@21.3.4
  - @commercetools-frontend/sdk@21.3.4
  - @commercetools-frontend/sentry@21.3.4
  - @commercetools-frontend/url-utils@21.3.4

## 21.3.3

### Patch Changes

- [#2541](https://github.com/commercetools/merchant-center-application-kit/pull/2541) [`3853d77e`](https://github.com/commercetools/merchant-center-application-kit/commit/3853d77ece84ef8be552dd79e538f66902c7ac1f) Thanks [@emmenko](https://github.com/emmenko)! - Fix layout issue with modal components when the underlying page has a scrolling position, causing the modal container position to "scroll" with the page position.

  The expected behavior is for the modal page to always be correctly positioned and visible, regardless of the scrolling position of the underlying page.

  To fix that, the `<PortalsContainer>` now uses `position: fixed` when a modal container opens.

  The component now accepts some props to allow consumers to adjust the layout accordingly. However, for Custom Applications everything is pre-configured, so there is no action required.

* [#2540](https://github.com/commercetools/merchant-center-application-kit/pull/2540) [`602822c0`](https://github.com/commercetools/merchant-center-application-kit/commit/602822c03e7ee0bbefdf1385c6120ab3069efe80) Thanks [@emmenko](https://github.com/emmenko)! - Fix computing submenu link `uriPath` when parsing local Custom Application config.

* Updated dependencies [[`3853d77e`](https://github.com/commercetools/merchant-center-application-kit/commit/3853d77ece84ef8be552dd79e538f66902c7ac1f), [`602822c0`](https://github.com/commercetools/merchant-center-application-kit/commit/602822c03e7ee0bbefdf1385c6120ab3069efe80)]:
  - @commercetools-frontend/application-components@21.3.3
  - @commercetools-frontend/application-config@21.3.3

## 21.3.2

### Patch Changes

- Updated dependencies [[`6a2c4195`](https://github.com/commercetools/merchant-center-application-kit/commit/6a2c419526672df45b9cc9c95abc010cd65a832f), [`c392de3d`](https://github.com/commercetools/merchant-center-application-kit/commit/c392de3d5b481047b4d29915a44cb7015a80f6cf)]:
  - @commercetools-frontend/application-components@21.3.2
  - @commercetools-frontend/application-config@21.3.2

## 21.3.0

### Patch Changes

- [#2522](https://github.com/commercetools/merchant-center-application-kit/pull/2522) [`bf57dc32`](https://github.com/commercetools/merchant-center-application-kit/commit/bf57dc3228438f5928e9312fdaa8250580bc6bf0) Thanks [@emmenko](https://github.com/emmenko)! - Parsing the application config now exposes a new field `data` that contains the mapped Custom Application data representation.

* [#2520](https://github.com/commercetools/merchant-center-application-kit/pull/2520) [`6f3a2083`](https://github.com/commercetools/merchant-center-application-kit/commit/6f3a2083efac387e9a2994fbaaeb18914e739aa8) Thanks [@renovate](https://github.com/apps/renovate)! - Upgrade dependencies

- [#2528](https://github.com/commercetools/merchant-center-application-kit/pull/2528) [`9235a721`](https://github.com/commercetools/merchant-center-application-kit/commit/9235a721df2be2ca5753994cd11312d577d0b293) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

- Updated dependencies [[`bf57dc32`](https://github.com/commercetools/merchant-center-application-kit/commit/bf57dc3228438f5928e9312fdaa8250580bc6bf0), [`6f3a2083`](https://github.com/commercetools/merchant-center-application-kit/commit/6f3a2083efac387e9a2994fbaaeb18914e739aa8), [`766f3df1`](https://github.com/commercetools/merchant-center-application-kit/commit/766f3df18979a1a14d9985c1c8cb6b323cc56e52), [`421cc68b`](https://github.com/commercetools/merchant-center-application-kit/commit/421cc68b834a41b070f68d03fe072f00f5ee074e), [`9511e378`](https://github.com/commercetools/merchant-center-application-kit/commit/9511e378c91a710c4ad28b8c2360a8b7552e0258), [`9235a721`](https://github.com/commercetools/merchant-center-application-kit/commit/9235a721df2be2ca5753994cd11312d577d0b293), [`ea1bee4c`](https://github.com/commercetools/merchant-center-application-kit/commit/ea1bee4c8ac0a5bba82dfc596935d4d166faa779)]:
  - @commercetools-frontend/application-config@21.3.0
  - @commercetools-frontend/actions-global@21.3.0
  - @commercetools-frontend/application-components@21.3.0
  - @commercetools-frontend/application-shell-connectors@21.3.0
  - @commercetools-frontend/browser-history@21.3.0
  - @commercetools-frontend/constants@21.3.0
  - @commercetools-frontend/i18n@21.3.0
  - @commercetools-frontend/l10n@21.3.0
  - @commercetools-frontend/notifications@21.3.0
  - @commercetools-frontend/permissions@21.3.0
  - @commercetools-frontend/react-notifications@21.3.0
  - @commercetools-frontend/sdk@21.3.0
  - @commercetools-frontend/sentry@21.3.0
  - @commercetools-frontend/url-utils@21.3.0

## 21.2.1

### Patch Changes

- [#2471](https://github.com/commercetools/merchant-center-application-kit/pull/2471) [`dc02733d`](https://github.com/commercetools/merchant-center-application-kit/commit/dc02733dfe14ce864e6efd36c6746892170ade3d) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

* [#2511](https://github.com/commercetools/merchant-center-application-kit/pull/2511) [`dd5e33ea`](https://github.com/commercetools/merchant-center-application-kit/commit/dd5e33ea58b15e32a2d9aeb1d95cb4a4aec8d069) Thanks [@emmenko](https://github.com/emmenko)! - Avoid using `useLazyQuery` to load application menu data. This allows us to update the `@apollo/client` version to `>3.5.7`, as the [issue](https://github.com/apollographql/apollo-client/issues/9375) with `useLazyQuery` and `fetchPolicy` does not seem to be fixed by Apollo any time soon.

* Updated dependencies [[`dc02733d`](https://github.com/commercetools/merchant-center-application-kit/commit/dc02733dfe14ce864e6efd36c6746892170ade3d), [`dd5e33ea`](https://github.com/commercetools/merchant-center-application-kit/commit/dd5e33ea58b15e32a2d9aeb1d95cb4a4aec8d069), [`b4907bbe`](https://github.com/commercetools/merchant-center-application-kit/commit/b4907bbee3b0a0a3015220427cfc1ffa196964ad)]:
  - @commercetools-frontend/application-components@21.2.1
  - @commercetools-frontend/application-shell-connectors@21.2.1
  - @commercetools-frontend/i18n@21.2.1
  - @commercetools-frontend/l10n@21.2.1
  - @commercetools-frontend/permissions@21.2.1
  - @commercetools-frontend/react-notifications@21.2.1
  - @commercetools-frontend/sdk@21.2.1
  - @commercetools-frontend/sentry@21.2.1
  - @commercetools-frontend/actions-global@21.2.1
  - @commercetools-frontend/notifications@21.2.1

## 21.2.0

### Minor Changes

- [#2504](https://github.com/commercetools/merchant-center-application-kit/pull/2504) [`732e846e`](https://github.com/commercetools/merchant-center-application-kit/commit/732e846eaa5a353d5aa067206d2626d1366ba79a) Thanks [@emmenko](https://github.com/emmenko)! - Update uikit packages to v14

### Patch Changes

- Updated dependencies [[`732e846e`](https://github.com/commercetools/merchant-center-application-kit/commit/732e846eaa5a353d5aa067206d2626d1366ba79a)]:
  - @commercetools-frontend/application-components@21.2.0
  - @commercetools-frontend/i18n@21.2.0
  - @commercetools-frontend/react-notifications@21.2.0

## 21.1.0

### Patch Changes

- [#2482](https://github.com/commercetools/merchant-center-application-kit/pull/2482) [`2172e53e`](https://github.com/commercetools/merchant-center-application-kit/commit/2172e53e36add3849e61977fad8f521650236bf5) Thanks [@renovate](https://github.com/apps/renovate)! - Updated ui-kit to its latest version

- Updated dependencies [[`45e0a856`](https://github.com/commercetools/merchant-center-application-kit/commit/45e0a85645e1e1741e4a9ec8cb221f19f2136f5a), [`2172e53e`](https://github.com/commercetools/merchant-center-application-kit/commit/2172e53e36add3849e61977fad8f521650236bf5)]:
  - @commercetools-frontend/sdk@21.1.0
  - @commercetools-frontend/application-components@21.1.0
  - @commercetools-frontend/i18n@21.1.0
  - @commercetools-frontend/react-notifications@21.1.0

## 21.0.0

### Major Changes

- [#2430](https://github.com/commercetools/merchant-center-application-kit/pull/2430) [`bb1f7d75`](https://github.com/commercetools/merchant-center-application-kit/commit/bb1f7d75ff54f7fef05c4d2b3328b88e400b4867) Thanks [@emmenko](https://github.com/emmenko)! - Following breaking changes were introduced:

  - New required fields in the Custom Application config.
  - Menu links structure in Custom Application config changed a bit.
  - The `ENABLE_OIDC_FOR_DEVELOPMENT` is now the default behavior.
  - The deprecated `menu.json` file and the `DEV_ONLY_` props have been removed.

  Note that if you were testing your Custom Application with Cypress, you need to use the `@commercetools-frontend/cypress` package to be able to use the `cy.loginByOidc` command.

  For more information see [Release notes v21](https://docs.commercetools.com/custom-applications/releases/2022-01-31-custom-applications-v21).

* [#2430](https://github.com/commercetools/merchant-center-application-kit/pull/2430) [`bb1f7d75`](https://github.com/commercetools/merchant-center-application-kit/commit/bb1f7d75ff54f7fef05c4d2b3328b88e400b4867) Thanks [@emmenko](https://github.com/emmenko)! - Drop Node.js `v12`. Recommended min Node.js version is `v14` or `v16`.

- [#2430](https://github.com/commercetools/merchant-center-application-kit/pull/2430) [`bb1f7d75`](https://github.com/commercetools/merchant-center-application-kit/commit/bb1f7d75ff54f7fef05c4d2b3328b88e400b4867) Thanks [@emmenko](https://github.com/emmenko)! - The peer dependencies min version for `@testing-library/react` is now `12` and for `@testing-library/react-hooks` is now `7`.

* [#2430](https://github.com/commercetools/merchant-center-application-kit/pull/2430) [`bb1f7d75`](https://github.com/commercetools/merchant-center-application-kit/commit/bb1f7d75ff54f7fef05c4d2b3328b88e400b4867) Thanks [@emmenko](https://github.com/emmenko)! - Following breaking changes were introduced in `test-utils`:

  - The deprecated `project.allAppliedMenuVisibilities` option has been removed.
  - The `disableApolloMocks` option has been removed. By default, the [Apollo mocks](https://www.apollographql.com/docs/react/development-testing/testing/) are disabled. This is to encourage mocking via [MSW](https://mswjs.io/). To opt into the usage of Apollo mocks, you only need to pass the `mocks` property with a non-empty array.
  - The `disableAutomaticEntryPointRoutes` option now defaults to `false`. This means that when rendering the `<ApplicationShell>`, you should not use the `render` function but pass the application component using `children`. See [changelog](https://github.com/commercetools/merchant-center-application-kit/blob/main/packages/application-shell/CHANGELOG.md#1790) for more information.
  - The deprecated `permissions` option has been removed. Use `project.allAppliedPermissions` instead.

    ```js
    // Before
    {
      permissions: {
        canManageProducts: true;
      }
    }

    // After
    {
      project: {
        allAppliedPermissions: [{ name: 'canManageProducts', value: true }];
      }
    }
    ```

    You can also use the helper function `mapResourceAccessToAppliedPermissions` (recommended)

    ```js
    import { mapResourceAccessToAppliedPermissions } from '@commercetools-frontend/application-shell/test-utils';

    {
      project: {
        allAppliedPermissions: mapResourceAccessToAppliedPermissions([
          PERMISSIONS.View
        ])
      },
    }
    ```

    or the `denormalizePermissions` function.

    ```js
    import { denormalizePermissions } from '@commercetools-frontend/application-shell/test-utils';

    {
      project: {
        allAppliedPermissions: denormalizePermissions({
          canManageProducts: true,
        });
      }
    }
    ```

  - The deprecated `actionRights` option has been removed. Use `project.allAppliedActionRights` instead.

    ```js
    // Before
    {
      actionRights: {
        products: {
          canEditPrices: true,
          canPublishProducts: false,
        }
      }
    }

    // After
    {
      project: {
        allAppliedActionRights: [
          { group: 'products', name: 'canEditPrices', value: true },
          { group: 'products', name: 'canPublishProducts', value: false }
        ]
      }
    }
    ```

    You can also use the helper function `denormalizeActionRights`.

    ```js
    import { denormalizeActionRights } from '@commercetools-frontend/application-shell/test-utils';

    {
      project: {
        allAppliedActionRights: denormalizeActionRights({
          products: {
            canEditPrices: true,
            canPublishProducts: false,
          },
        });
      }
    }
    ```

  - The deprecated `dataFences` option has been removed. Use `project.allAppliedDataFences` instead.

    ```js
    // Before
    {
      dataFences: {
        store: {
          orders: {
            canViewOrders: {
              values: ['store-1'],
            }
          }
        }
      }
    }

    // After
    {
      project: {
        allAppliedDataFences: [
          { type: 'store', group: 'orders', name: 'canViewOrders', value: 'store-1' }
        ]
      }
    }
    ```

    You can also use the helper function `denormalizeDataFences`.

    ```js
    import { denormalizeDataFences } from '@commercetools-frontend/application-shell/test-utils';

    {
      project: {
        allAppliedDataFences: denormalizeDataFences({
          store: {
            orders: {
              canViewOrders: {
                values: ['store-1'],
              },
            },
          },
        });
      }
    }
    ```

  For more information see [Release notes v21](https://docs.commercetools.com/custom-applications/releases/2022-01-31-custom-applications-v21).

### Minor Changes

- [#2430](https://github.com/commercetools/merchant-center-application-kit/pull/2430) [`bb1f7d75`](https://github.com/commercetools/merchant-center-application-kit/commit/bb1f7d75ff54f7fef05c4d2b3328b88e400b4867) Thanks [@emmenko](https://github.com/emmenko)! - The application `View` permission is automatically applied to the `project` object, based on the `environment.entryPointUriPath` value. You can always override the permission values by explicitly assigning `project.allAppliedPermissions`.

* [#2430](https://github.com/commercetools/merchant-center-application-kit/pull/2430) [`bb1f7d75`](https://github.com/commercetools/merchant-center-application-kit/commit/bb1f7d75ff54f7fef05c4d2b3328b88e400b4867) Thanks [@emmenko](https://github.com/emmenko)! - The `applicationId` is required.

- [#2430](https://github.com/commercetools/merchant-center-application-kit/pull/2430) [`bb1f7d75`](https://github.com/commercetools/merchant-center-application-kit/commit/bb1f7d75ff54f7fef05c4d2b3328b88e400b4867) Thanks [@emmenko](https://github.com/emmenko)! - Enforce that the Custom Application route is protected by the application "View" permission.

### Patch Changes

- [#2450](https://github.com/commercetools/merchant-center-application-kit/pull/2450) [`eb8f5b2c`](https://github.com/commercetools/merchant-center-application-kit/commit/eb8f5b2c885a4c3ffc7857a61e50508b429bf964) Thanks [@emmenko](https://github.com/emmenko)! - Update dependencies

* [#2430](https://github.com/commercetools/merchant-center-application-kit/pull/2430) [`bb1f7d75`](https://github.com/commercetools/merchant-center-application-kit/commit/bb1f7d75ff54f7fef05c4d2b3328b88e400b4867) Thanks [@emmenko](https://github.com/emmenko)! - Unset `initialProjectKey` for `account` app.

- [#2430](https://github.com/commercetools/merchant-center-application-kit/pull/2430) [`bb1f7d75`](https://github.com/commercetools/merchant-center-application-kit/commit/bb1f7d75ff54f7fef05c4d2b3328b88e400b4867) Thanks [@emmenko](https://github.com/emmenko)! - Use version range for Babel packages.

* [#2430](https://github.com/commercetools/merchant-center-application-kit/pull/2430) [`bb1f7d75`](https://github.com/commercetools/merchant-center-application-kit/commit/bb1f7d75ff54f7fef05c4d2b3328b88e400b4867) Thanks [@emmenko](https://github.com/emmenko)! - Make `onRegisterErrorListeners` optional

* Updated dependencies [[`eb8f5b2c`](https://github.com/commercetools/merchant-center-application-kit/commit/eb8f5b2c885a4c3ffc7857a61e50508b429bf964), [`bb1f7d75`](https://github.com/commercetools/merchant-center-application-kit/commit/bb1f7d75ff54f7fef05c4d2b3328b88e400b4867), [`bb1f7d75`](https://github.com/commercetools/merchant-center-application-kit/commit/bb1f7d75ff54f7fef05c4d2b3328b88e400b4867), [`bb1f7d75`](https://github.com/commercetools/merchant-center-application-kit/commit/bb1f7d75ff54f7fef05c4d2b3328b88e400b4867), [`bb1f7d75`](https://github.com/commercetools/merchant-center-application-kit/commit/bb1f7d75ff54f7fef05c4d2b3328b88e400b4867)]:
  - @commercetools-frontend/actions-global@21.0.0
  - @commercetools-frontend/application-components@21.0.0
  - @commercetools-frontend/application-shell-connectors@21.0.0
  - @commercetools-frontend/browser-history@21.0.0
  - @commercetools-frontend/constants@21.0.0
  - @commercetools-frontend/i18n@21.0.0
  - @commercetools-frontend/l10n@21.0.0
  - @commercetools-frontend/notifications@21.0.0
  - @commercetools-frontend/permissions@21.0.0
  - @commercetools-frontend/react-notifications@21.0.0
  - @commercetools-frontend/sdk@21.0.0
  - @commercetools-frontend/sentry@21.0.0
  - @commercetools-frontend/url-utils@21.0.0
  - @commercetools-frontend/assets@21.0.0

## 21.0.0-rc.8

### Major Changes

- [#2430](https://github.com/commercetools/merchant-center-application-kit/pull/2430) [`d1707b78`](https://github.com/commercetools/merchant-center-application-kit/commit/d1707b78e81d007460ddff7b2a4924b997c981e7) Thanks [@emmenko](https://github.com/emmenko)! - The peer dependencies min version for `@testing-library/react` is now `12` and for `@testing-library/react-hooks` is now `7`.

## 21.0.0-rc.6

### Minor Changes

- [#2430](https://github.com/commercetools/merchant-center-application-kit/pull/2430) [`433a2604`](https://github.com/commercetools/merchant-center-application-kit/commit/433a2604d1dfeeacfbad477c4a22896c5941a0be) Thanks [@emmenko](https://github.com/emmenko)! - The application `View` permission is automatically applied to the `project` object, based on the `environment.entryPointUriPath` value. You can always override the permission values by explicitly assigning `project.allAppliedPermissions`.

## 21.0.0-rc.5

### Patch Changes

- [#2430](https://github.com/commercetools/merchant-center-application-kit/pull/2430) [`4b1c5977`](https://github.com/commercetools/merchant-center-application-kit/commit/4b1c5977aa413732b7a484e06a825e0e6375b5d8) Thanks [@emmenko](https://github.com/emmenko)! - Make `onRegisterErrorListeners` optional

## 21.0.0-rc.4

### Patch Changes

- [#2430](https://github.com/commercetools/merchant-center-application-kit/pull/2430) [`5e3ee854`](https://github.com/commercetools/merchant-center-application-kit/commit/5e3ee854b77cb052be448afb5ecc6b2c62b0d712) Thanks [@emmenko](https://github.com/emmenko)! - Unset `initialProjectKey` for `account` app.

## 21.0.0-rc.3

### Minor Changes

- [#2430](https://github.com/commercetools/merchant-center-application-kit/pull/2430) [`e6051a9d`](https://github.com/commercetools/merchant-center-application-kit/commit/e6051a9dde8fd77a1e949fe34393b4c7a61dee55) Thanks [@emmenko](https://github.com/emmenko)! - The `applicationId` is required.

* [#2459](https://github.com/commercetools/merchant-center-application-kit/pull/2459) [`f70e3074`](https://github.com/commercetools/merchant-center-application-kit/commit/f70e30742ff4b1228ff3bdc72f4a5d893ef8081f) Thanks [@emmenko](https://github.com/emmenko)! - Enforce that the Custom Application route is protected by the application "View" permission.

### Patch Changes

- Updated dependencies [[`e6051a9d`](https://github.com/commercetools/merchant-center-application-kit/commit/e6051a9dde8fd77a1e949fe34393b4c7a61dee55)]:
  - @commercetools-frontend/constants@21.0.0-rc.3
  - @commercetools-frontend/actions-global@21.0.0-rc.3
  - @commercetools-frontend/application-components@21.0.0-rc.3
  - @commercetools-frontend/application-shell-connectors@21.0.0-rc.3
  - @commercetools-frontend/react-notifications@21.0.0-rc.3
  - @commercetools-frontend/sdk@21.0.0-rc.3
  - @commercetools-frontend/sentry@21.0.0-rc.3
  - @commercetools-frontend/permissions@21.0.0-rc.3
  - @commercetools-frontend/i18n@21.0.0-rc.3
  - @commercetools-frontend/l10n@21.0.0-rc.3

## 21.0.0-rc.1

### Patch Changes

- [#2430](https://github.com/commercetools/merchant-center-application-kit/pull/2430) [`5ea8baf1`](https://github.com/commercetools/merchant-center-application-kit/commit/5ea8baf1b2ca2661aac9a6a572d2c8e596ee0b2c) Thanks [@emmenko](https://github.com/emmenko)! - Use version range for Babel packages.

- Updated dependencies [[`5ea8baf1`](https://github.com/commercetools/merchant-center-application-kit/commit/5ea8baf1b2ca2661aac9a6a572d2c8e596ee0b2c), [`1bee4f25`](https://github.com/commercetools/merchant-center-application-kit/commit/1bee4f25043af3e6408f624fa3e632bd7e39a587)]:
  - @commercetools-frontend/actions-global@21.0.0-rc.1
  - @commercetools-frontend/application-components@21.0.0-rc.1
  - @commercetools-frontend/application-shell-connectors@21.0.0-rc.1
  - @commercetools-frontend/browser-history@21.0.0-rc.1
  - @commercetools-frontend/constants@21.0.0-rc.1
  - @commercetools-frontend/i18n@21.0.0-rc.1
  - @commercetools-frontend/l10n@21.0.0-rc.1
  - @commercetools-frontend/notifications@21.0.0-rc.1
  - @commercetools-frontend/permissions@21.0.0-rc.1
  - @commercetools-frontend/react-notifications@21.0.0-rc.1
  - @commercetools-frontend/sdk@21.0.0-rc.1
  - @commercetools-frontend/sentry@21.0.0-rc.1
  - @commercetools-frontend/url-utils@21.0.0-rc.1
  - @commercetools-frontend/assets@21.0.0-rc.1

## 21.0.0-rc.0

### Major Changes

- [#2430](https://github.com/commercetools/merchant-center-application-kit/pull/2430) [`b8fb4cbb`](https://github.com/commercetools/merchant-center-application-kit/commit/b8fb4cbbb8b78ff18af7edf8100703f7f9712187) Thanks [@emmenko](https://github.com/emmenko)! - Following breaking changes were introduced:

  - New required fields in the Custom Application config.
  - Menu links structure in Custom Application config changed a bit.
  - The `ENABLE_OIDC_FOR_DEVELOPMENT` is now the default behavior.
  - The deprecated `menu.json` file and the `DEV_ONLY_` props have been removed.

  Note that if you were testing your Custom Application with Cypress, you need to use the `@commercetools-frontend/cypress` package to be able to use the `cy.loginByOidc` command.

  For more information see [Release notes v21](https://docs.commercetools.com/custom-applications/releases/2022-01-31-custom-applications-v21).

* [#2430](https://github.com/commercetools/merchant-center-application-kit/pull/2430) [`1c363fad`](https://github.com/commercetools/merchant-center-application-kit/commit/1c363fad7ab770a739ac8080358e41ae4af42074) Thanks [@emmenko](https://github.com/emmenko)! - Drop Node.js `v12`. Recommended min Node.js version is `v14` or `v16`.

- [#2430](https://github.com/commercetools/merchant-center-application-kit/pull/2430) [`6d0e71d7`](https://github.com/commercetools/merchant-center-application-kit/commit/6d0e71d7e08222f5b6462b7c60fca80e8992cfa7) Thanks [@emmenko](https://github.com/emmenko)! - Following breaking changes were introduced in `test-utils`:

  - The deprecated `project.allAppliedMenuVisibilities` option has been removed.
  - The `disableApolloMocks` option has been removed. By default, the [Apollo mocks](https://www.apollographql.com/docs/react/development-testing/testing/) are disabled. This is to encourage mocking via [MSW](https://mswjs.io/). To opt into the usage of Apollo mocks, you only need to pass the `mocks` property with a non-empty array.
  - The `disableAutomaticEntryPointRoutes` option now defaults to `false`. This means that when rendering the `<ApplicationShell>`, you should not use the `render` function but pass the application component using `children`. See [changelog](https://github.com/commercetools/merchant-center-application-kit/blob/main/packages/application-shell/CHANGELOG.md#1790) for more information.
  - The deprecated `permissions` option has been removed. Use `project.allAppliedPermissions` instead.

    ```js
    // Before
    {
      permissions: {
        canManageProducts: true;
      }
    }

    // After
    {
      project: {
        allAppliedPermissions: [{ name: 'canManageProducts', value: true }];
      }
    }
    ```

    You can also use the helper function `mapResourceAccessToAppliedPermissions` (recommended)

    ```js
    import { mapResourceAccessToAppliedPermissions } from '@commercetools-frontend/application-shell/test-utils';

    {
      project: {
        allAppliedPermissions: mapResourceAccessToAppliedPermissions([
          PERMISSIONS.View
        ])
      },
    }
    ```

    or the `denormalizePermissions` function.

    ```js
    import { denormalizePermissions } from '@commercetools-frontend/application-shell/test-utils';

    {
      project: {
        allAppliedPermissions: denormalizePermissions({
          canManageProducts: true,
        });
      }
    }
    ```

  - The deprecated `actionRights` option has been removed. Use `project.allAppliedActionRights` instead.

    ```js
    // Before
    {
      actionRights: {
        products: {
          canEditPrices: true,
          canPublishProducts: false,
        }
      }
    }

    // After
    {
      project: {
        allAppliedActionRights: [
          { group: 'products', name: 'canEditPrices', value: true },
          { group: 'products', name: 'canPublishProducts', value: false }
        ]
      }
    }
    ```

    You can also use the helper function `denormalizeActionRights`.

    ```js
    import { denormalizeActionRights } from '@commercetools-frontend/application-shell/test-utils';

    {
      project: {
        allAppliedActionRights: denormalizeActionRights({
          products: {
            canEditPrices: true,
            canPublishProducts: false,
          },
        });
      }
    }
    ```

  - The deprecated `dataFences` option has been removed. Use `project.allAppliedDataFences` instead.

    ```js
    // Before
    {
      dataFences: {
        store: {
          orders: {
            canViewOrders: {
              values: ['store-1'],
            }
          }
        }
      }
    }

    // After
    {
      project: {
        allAppliedDataFences: [
          { type: 'store', group: 'orders', name: 'canViewOrders', value: 'store-1' }
        ]
      }
    }
    ```

    You can also use the helper function `denormalizeDataFences`.

    ```js
    import { denormalizeDataFences } from '@commercetools-frontend/application-shell/test-utils';

    {
      project: {
        allAppliedDataFences: denormalizeDataFences({
          store: {
            orders: {
              canViewOrders: {
                values: ['store-1'],
              },
            },
          },
        });
      }
    }
    ```

  For more information see [Release notes v21](https://docs.commercetools.com/custom-applications/releases/2022-01-31-custom-applications-v21).

### Patch Changes

- [#2450](https://github.com/commercetools/merchant-center-application-kit/pull/2450) [`eb8f5b2c`](https://github.com/commercetools/merchant-center-application-kit/commit/eb8f5b2c885a4c3ffc7857a61e50508b429bf964) Thanks [@emmenko](https://github.com/emmenko)! - Update dependencies

- Updated dependencies [[`eb8f5b2c`](https://github.com/commercetools/merchant-center-application-kit/commit/eb8f5b2c885a4c3ffc7857a61e50508b429bf964), [`1c363fad`](https://github.com/commercetools/merchant-center-application-kit/commit/1c363fad7ab770a739ac8080358e41ae4af42074)]:
  - @commercetools-frontend/actions-global@21.0.0-rc.0
  - @commercetools-frontend/application-components@21.0.0-rc.0
  - @commercetools-frontend/application-shell-connectors@21.0.0-rc.0
  - @commercetools-frontend/browser-history@21.0.0-rc.0
  - @commercetools-frontend/constants@21.0.0-rc.0
  - @commercetools-frontend/i18n@21.0.0-rc.0
  - @commercetools-frontend/l10n@21.0.0-rc.0
  - @commercetools-frontend/notifications@21.0.0-rc.0
  - @commercetools-frontend/permissions@21.0.0-rc.0
  - @commercetools-frontend/react-notifications@21.0.0-rc.0
  - @commercetools-frontend/sdk@21.0.0-rc.0
  - @commercetools-frontend/sentry@21.0.0-rc.0
  - @commercetools-frontend/url-utils@21.0.0-rc.0

## 20.13.0

### Patch Changes

- Updated dependencies [[`aa3b4472`](https://github.com/commercetools/merchant-center-application-kit/commit/aa3b447233d2741cf4573686a14887720ffca302)]:
  - @commercetools-frontend/i18n@20.13.0
  - @commercetools-frontend/application-components@20.13.0

## 20.12.4

### Patch Changes

- [#2440](https://github.com/commercetools/merchant-center-application-kit/pull/2440) [`a324f506`](https://github.com/commercetools/merchant-center-application-kit/commit/a324f5067fa2e6c2a1d63e2deccc6297a30b4fe9) Thanks [@emmenko](https://github.com/emmenko)! - Fix container style for locale switcher component (due to internal changes in `react-select` v5).

## 20.12.3

### Patch Changes

- [#2437](https://github.com/commercetools/merchant-center-application-kit/pull/2437) [`cc5c5f4a`](https://github.com/commercetools/merchant-center-application-kit/commit/cc5c5f4a2ee58207bbe326067c4c3eb344715b70) Thanks [@emmenko](https://github.com/emmenko)! - Expose helper function from `@commercetools-frontend/application-shell/ssr`, clean up duplicate in `@commercetools-frontend/cypress`.

* [#2433](https://github.com/commercetools/merchant-center-application-kit/pull/2433) [`d65e29e4`](https://github.com/commercetools/merchant-center-application-kit/commit/d65e29e4eea4d1809abaa8cc82cc246c681dfa27) Thanks [@emmenko](https://github.com/emmenko)! - Replace `ts-jest/utils` with `jest-mock`, for using the `mocked` function.

- [#2432](https://github.com/commercetools/merchant-center-application-kit/pull/2432) [`fe1a1bec`](https://github.com/commercetools/merchant-center-application-kit/commit/fe1a1bec55290cea5374db57f1ed0ab3f1274ce9) Thanks [@emmenko](https://github.com/emmenko)! - Expose helper functions to convert `entryPointUriPath` to resource accesses and permission keys:

  - `entryPointUriPathToResourceAccesses`: returns a view/manage pair of resource access names based on the `entryPointUriPath`.
  - `entryPointUriPathToPermissionKeys`: returns a view/manage pair of user permission keys based on the `entryPointUriPath`.

  The helpers are exported from the main bundle `@commercetools-frontend/application-shell` (for client-side usage) and from a separate entry point bundle `@commercetools-frontend/application-shell/ssr` (for node/server-side usage).

  > The helpers are only useful for the upcoming v21 release.

  ```js
  import { entryPointUriPathToPermissionKeys } from '@commercetools-frontend/application-shell/ssr';

  export const entryPointUriPath = 'avengers';
  export const PERMISSIONS =
    entryPointUriPathToPermissionKeys(entryPointUriPath);
  // PERMISSIONS === { View: 'ViewAvengers', Manage: 'ManageAvengers' }
  ```

* [#2433](https://github.com/commercetools/merchant-center-application-kit/pull/2433) [`d65e29e4`](https://github.com/commercetools/merchant-center-application-kit/commit/d65e29e4eea4d1809abaa8cc82cc246c681dfa27) Thanks [@emmenko](https://github.com/emmenko)! - Update dependencies

* Updated dependencies [[`630ee1b5`](https://github.com/commercetools/merchant-center-application-kit/commit/630ee1b5d0c70c05104eaf4712b1db662fe8f8f7), [`d65e29e4`](https://github.com/commercetools/merchant-center-application-kit/commit/d65e29e4eea4d1809abaa8cc82cc246c681dfa27), [`d65e29e4`](https://github.com/commercetools/merchant-center-application-kit/commit/d65e29e4eea4d1809abaa8cc82cc246c681dfa27)]:
  - @commercetools-frontend/assets@20.12.3
  - @commercetools-frontend/actions-global@20.12.3
  - @commercetools-frontend/application-components@20.12.3
  - @commercetools-frontend/application-shell-connectors@20.12.3
  - @commercetools-frontend/browser-history@20.12.3
  - @commercetools-frontend/constants@20.12.3
  - @commercetools-frontend/i18n@20.12.3
  - @commercetools-frontend/l10n@20.12.3
  - @commercetools-frontend/notifications@20.12.3
  - @commercetools-frontend/permissions@20.12.3
  - @commercetools-frontend/react-notifications@20.12.3
  - @commercetools-frontend/sdk@20.12.3
  - @commercetools-frontend/sentry@20.12.3
  - @commercetools-frontend/url-utils@20.12.3

## 20.12.2

### Patch Changes

- [#2425](https://github.com/commercetools/merchant-center-application-kit/pull/2425) [`3481dbb5`](https://github.com/commercetools/merchant-center-application-kit/commit/3481dbb5ce3c6d4895a5b947e550c297b1761f6f) Thanks [@tdeekens](https://github.com/tdeekens)! - Add support for long-running flags in the menu configuration of an application.

## 20.12.1

### Patch Changes

- [#2422](https://github.com/commercetools/merchant-center-application-kit/pull/2422) [`e52bed19`](https://github.com/commercetools/merchant-center-application-kit/commit/e52bed19b3541d2447b61abe60c102fa12e9f83c) Thanks [@emmenko](https://github.com/emmenko)! - Redirect to `/login` and `/logout` pages using a full origin URL.

* [#2384](https://github.com/commercetools/merchant-center-application-kit/pull/2384) [`cf914004`](https://github.com/commercetools/merchant-center-application-kit/commit/cf9140043ade6edb3ee71a7558b757f5e19bee81) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

* Updated dependencies [[`6f02335c`](https://github.com/commercetools/merchant-center-application-kit/commit/6f02335cd1fc05751e0398945b9d0fde0ef86c35), [`cf914004`](https://github.com/commercetools/merchant-center-application-kit/commit/cf9140043ade6edb3ee71a7558b757f5e19bee81)]:
  - @commercetools-frontend/assets@20.12.1
  - @commercetools-frontend/actions-global@20.12.1
  - @commercetools-frontend/application-components@20.12.1
  - @commercetools-frontend/application-shell-connectors@20.12.1
  - @commercetools-frontend/browser-history@20.12.1
  - @commercetools-frontend/constants@20.12.1
  - @commercetools-frontend/i18n@20.12.1
  - @commercetools-frontend/l10n@20.12.1
  - @commercetools-frontend/notifications@20.12.1
  - @commercetools-frontend/permissions@20.12.1
  - @commercetools-frontend/react-notifications@20.12.1
  - @commercetools-frontend/sdk@20.12.1
  - @commercetools-frontend/sentry@20.12.1
  - @commercetools-frontend/url-utils@20.12.1

## 20.12.0

### Minor Changes

- [#2416](https://github.com/commercetools/merchant-center-application-kit/pull/2416) [`f549637b`](https://github.com/commercetools/merchant-center-application-kit/commit/f549637b4a235ecc768ca77710784ddf63d1889b) Thanks [@emmenko](https://github.com/emmenko)! - Add new SVG icons for Custom Applications. Test icon colors with VRT.

### Patch Changes

- Updated dependencies [[`f549637b`](https://github.com/commercetools/merchant-center-application-kit/commit/f549637b4a235ecc768ca77710784ddf63d1889b), [`fc8a3546`](https://github.com/commercetools/merchant-center-application-kit/commit/fc8a3546eb402cb58eea8ad1ff1169f6ed697a5e)]:
  - @commercetools-frontend/assets@20.12.0
  - @commercetools-frontend/constants@20.12.0
  - @commercetools-frontend/react-notifications@20.12.0
  - @commercetools-frontend/application-components@20.12.0
  - @commercetools-frontend/actions-global@20.12.0
  - @commercetools-frontend/application-shell-connectors@20.12.0
  - @commercetools-frontend/sdk@20.12.0
  - @commercetools-frontend/sentry@20.12.0
  - @commercetools-frontend/permissions@20.12.0
  - @commercetools-frontend/i18n@20.12.0
  - @commercetools-frontend/l10n@20.12.0

## 20.11.0

### Patch Changes

- [#2398](https://github.com/commercetools/merchant-center-application-kit/pull/2398) [`22a1b35d`](https://github.com/commercetools/merchant-center-application-kit/commit/22a1b35daf802958552e66d78924676f5f93534a) Thanks [@emmenko](https://github.com/emmenko)! - Replace `.graphqlrc.yml` with `codegen.yml` config files and simplify setup. GraphQL types are also regenerated.

- Updated dependencies [[`22a1b35d`](https://github.com/commercetools/merchant-center-application-kit/commit/22a1b35daf802958552e66d78924676f5f93534a), [`fc7f62ba`](https://github.com/commercetools/merchant-center-application-kit/commit/fc7f62bad0bad3d432bb52438e3bbf0660130bf4)]:
  - @commercetools-frontend/application-shell-connectors@20.11.0
  - @commercetools-frontend/constants@20.11.0
  - @commercetools-frontend/application-components@20.11.0
  - @commercetools-frontend/permissions@20.11.0
  - @commercetools-frontend/actions-global@20.11.0
  - @commercetools-frontend/react-notifications@20.11.0
  - @commercetools-frontend/sdk@20.11.0
  - @commercetools-frontend/sentry@20.11.0
  - @commercetools-frontend/i18n@20.11.0
  - @commercetools-frontend/l10n@20.11.0

## 20.10.7

### Patch Changes

- [#2397](https://github.com/commercetools/merchant-center-application-kit/pull/2397) [`cf8b2b93`](https://github.com/commercetools/merchant-center-application-kit/commit/cf8b2b934451e754f938ae392d0abdc146e77d88) Thanks [@emmenko](https://github.com/emmenko)! - Fix passing submenu default label to navbar

## 20.10.6

### Patch Changes

- [#2386](https://github.com/commercetools/merchant-center-application-kit/pull/2386) [`d7fcf6fc`](https://github.com/commercetools/merchant-center-application-kit/commit/d7fcf6fc8495d4eae68e0a4f4c1f1b3e0e394454) Thanks [@emmenko](https://github.com/emmenko)! - Upgrade to Yarn v3

- Updated dependencies [[`d7fcf6fc`](https://github.com/commercetools/merchant-center-application-kit/commit/d7fcf6fc8495d4eae68e0a4f4c1f1b3e0e394454)]:
  - @commercetools-frontend/actions-global@20.10.6
  - @commercetools-frontend/application-components@20.10.6
  - @commercetools-frontend/application-shell-connectors@20.10.6
  - @commercetools-frontend/assets@20.10.6
  - @commercetools-frontend/browser-history@20.10.6
  - @commercetools-frontend/constants@20.10.6
  - @commercetools-frontend/i18n@20.10.6
  - @commercetools-frontend/l10n@20.10.6
  - @commercetools-frontend/notifications@20.10.6
  - @commercetools-frontend/permissions@20.10.6
  - @commercetools-frontend/react-notifications@20.10.6
  - @commercetools-frontend/sdk@20.10.6
  - @commercetools-frontend/sentry@20.10.6
  - @commercetools-frontend/url-utils@20.10.6

## 20.10.5

### Patch Changes

- Updated dependencies [[`e897317a`](https://github.com/commercetools/merchant-center-application-kit/commit/e897317a90d6179638283e9a108bf93394d67eef)]:
  - @commercetools-frontend/application-components@20.10.5

## 20.10.4

### Patch Changes

- [#2377](https://github.com/commercetools/merchant-center-application-kit/pull/2377) [`8ae002a1`](https://github.com/commercetools/merchant-center-application-kit/commit/8ae002a1b13ee41ef350876be3be4ceeea671d2a) Thanks [@Rhotimee](https://github.com/Rhotimee)! - ## Improve starter template and playground

  - use <field>AllLocales field instead of passing a data locale to the query.
  - remove code for dispatching error notifications in case a query has errors. Instead, render the error in the component itself.

* [#2380](https://github.com/commercetools/merchant-center-application-kit/pull/2380) [`7fa4d7d0`](https://github.com/commercetools/merchant-center-application-kit/commit/7fa4d7d0c560226eba69ccb73c4014879939e8da) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

* Updated dependencies [[`7fa4d7d0`](https://github.com/commercetools/merchant-center-application-kit/commit/7fa4d7d0c560226eba69ccb73c4014879939e8da)]:
  - @commercetools-frontend/actions-global@20.10.4
  - @commercetools-frontend/application-components@20.10.4
  - @commercetools-frontend/application-shell-connectors@20.10.4
  - @commercetools-frontend/i18n@20.10.4
  - @commercetools-frontend/l10n@20.10.4
  - @commercetools-frontend/permissions@20.10.4
  - @commercetools-frontend/react-notifications@20.10.4
  - @commercetools-frontend/sdk@20.10.4
  - @commercetools-frontend/sentry@20.10.4

## 20.10.3

### Patch Changes

- [#2376](https://github.com/commercetools/merchant-center-application-kit/pull/2376) [`9d879503`](https://github.com/commercetools/merchant-center-application-kit/commit/9d879503f7af467729291d66a35625b6e7cbb385) Thanks [@emmenko](https://github.com/emmenko)! - > For commercetools only.

  Allow to use OIDC login when developing against a local running MC API.

* [#2372](https://github.com/commercetools/merchant-center-application-kit/pull/2372) [`545df49f`](https://github.com/commercetools/merchant-center-application-kit/commit/545df49f85101a124f64204cf5cee10cdf31b5a2) Thanks [@Rhotimee](https://github.com/Rhotimee)! - Refactored the Playground to fetch data using GraphQL instead of REST API

- [#2362](https://github.com/commercetools/merchant-center-application-kit/pull/2362) [`f6b3ae02`](https://github.com/commercetools/merchant-center-application-kit/commit/f6b3ae02133927642976f976d2d2fd5eb675ce84) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

- Updated dependencies [[`f6b3ae02`](https://github.com/commercetools/merchant-center-application-kit/commit/f6b3ae02133927642976f976d2d2fd5eb675ce84), [`ffefdf20`](https://github.com/commercetools/merchant-center-application-kit/commit/ffefdf20da2929cd88fe3f7191b74d36909ccd54)]:
  - @commercetools-frontend/application-components@20.10.3
  - @commercetools-frontend/application-shell-connectors@20.10.3
  - @commercetools-frontend/i18n@20.10.3
  - @commercetools-frontend/l10n@20.10.3
  - @commercetools-frontend/react-notifications@20.10.3
  - @commercetools-frontend/sdk@20.10.3
  - @commercetools-frontend/sentry@20.10.3
  - @commercetools-frontend/permissions@20.10.3
  - @commercetools-frontend/actions-global@20.10.3

## 20.10.2

### Patch Changes

- [#2368](https://github.com/commercetools/merchant-center-application-kit/pull/2368) [`fffb3b36`](https://github.com/commercetools/merchant-center-application-kit/commit/fffb3b36bd9b5e4e57d15e915e2c2e5f215c8453) Thanks [@emmenko](https://github.com/emmenko)! - Apply custom headers passed to the Apollo `context`.

  > NOTE that if a headers is not allowed in the CORS rules of the Merchant Center API the request will fail.

## 20.10.1

### Patch Changes

- [#2364](https://github.com/commercetools/merchant-center-application-kit/pull/2364) [`8bd31bb3`](https://github.com/commercetools/merchant-center-application-kit/commit/8bd31bb3e0d951b594d6f6b345438ee462d26640) Thanks [@jaikumar-tj](https://github.com/jaikumar-tj)! - Page notifications (like errors) now correctly push the page content below them, even for modal pages.

* [#2348](https://github.com/commercetools/merchant-center-application-kit/pull/2348) [`3247e604`](https://github.com/commercetools/merchant-center-application-kit/commit/3247e6048533a72c9f64cd316621dd51471cd1a8) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

- [#2342](https://github.com/commercetools/merchant-center-application-kit/pull/2342) [`91ba0910`](https://github.com/commercetools/merchant-center-application-kit/commit/91ba0910ce09ab7f3552fd381983724a63d7243d) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

* [#2358](https://github.com/commercetools/merchant-center-application-kit/pull/2358) [`55aec805`](https://github.com/commercetools/merchant-center-application-kit/commit/55aec80597179f31f68ad5d727b5af57846922c1) Thanks [@ByronDWall](https://github.com/ByronDWall)! - The main menu of the Merchant Center for the active application now automatically expands when the user navigates to that application. The user then can see the submenu links of that application without having to manually expand the submenu.

- [#2356](https://github.com/commercetools/merchant-center-application-kit/pull/2356) [`e34fe076`](https://github.com/commercetools/merchant-center-application-kit/commit/e34fe076aab6681cdcc54622d84123f2c22020e6) Thanks [@ByronDWall](https://github.com/ByronDWall)! - set node version to 16.8 in nvmrc to avoid a bug in node/v8

- Updated dependencies [[`3247e604`](https://github.com/commercetools/merchant-center-application-kit/commit/3247e6048533a72c9f64cd316621dd51471cd1a8), [`91ba0910`](https://github.com/commercetools/merchant-center-application-kit/commit/91ba0910ce09ab7f3552fd381983724a63d7243d), [`e34fe076`](https://github.com/commercetools/merchant-center-application-kit/commit/e34fe076aab6681cdcc54622d84123f2c22020e6)]:
  - @commercetools-frontend/actions-global@20.10.1
  - @commercetools-frontend/application-components@20.10.1
  - @commercetools-frontend/application-shell-connectors@20.10.1
  - @commercetools-frontend/browser-history@20.10.1
  - @commercetools-frontend/constants@20.10.1
  - @commercetools-frontend/i18n@20.10.1
  - @commercetools-frontend/l10n@20.10.1
  - @commercetools-frontend/notifications@20.10.1
  - @commercetools-frontend/permissions@20.10.1
  - @commercetools-frontend/react-notifications@20.10.1
  - @commercetools-frontend/sdk@20.10.1
  - @commercetools-frontend/sentry@20.10.1
  - @commercetools-frontend/url-utils@20.10.1
  - @commercetools-frontend/assets@20.10.1

## 20.9.4

### Patch Changes

- [#2331](https://github.com/commercetools/merchant-center-application-kit/pull/2331) [`670ec977`](https://github.com/commercetools/merchant-center-application-kit/commit/670ec977ecf711b2e363da50830b831863e3a756) Thanks [@emmenko](https://github.com/emmenko)! - Upgrade to [Apollo Client v3.4](https://github.com/apollographql/apollo-client/blob/main/CHANGELOG.md#apollo-client-340).

* [#2336](https://github.com/commercetools/merchant-center-application-kit/pull/2336) [`8c6c13a7`](https://github.com/commercetools/merchant-center-application-kit/commit/8c6c13a79f91ea9476983e12c48ae834ca4640c1) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

- [#2337](https://github.com/commercetools/merchant-center-application-kit/pull/2337) [`7665f22d`](https://github.com/commercetools/merchant-center-application-kit/commit/7665f22d6df48df7d63d53c92ad3b15d32664ece) Thanks [@renovate](https://github.com/apps/renovate)! - Regenerate GraphQL types

- Updated dependencies [[`670ec977`](https://github.com/commercetools/merchant-center-application-kit/commit/670ec977ecf711b2e363da50830b831863e3a756), [`8c6c13a7`](https://github.com/commercetools/merchant-center-application-kit/commit/8c6c13a79f91ea9476983e12c48ae834ca4640c1), [`7665f22d`](https://github.com/commercetools/merchant-center-application-kit/commit/7665f22d6df48df7d63d53c92ad3b15d32664ece)]:
  - @commercetools-frontend/application-shell-connectors@20.9.4
  - @commercetools-frontend/actions-global@20.9.4
  - @commercetools-frontend/application-components@20.9.4
  - @commercetools-frontend/i18n@20.9.4
  - @commercetools-frontend/l10n@20.9.4
  - @commercetools-frontend/permissions@20.9.4
  - @commercetools-frontend/react-notifications@20.9.4
  - @commercetools-frontend/sdk@20.9.4
  - @commercetools-frontend/sentry@20.9.4

## 20.9.3

### Patch Changes

- [#2318](https://github.com/commercetools/merchant-center-application-kit/pull/2318) [`83f2add2`](https://github.com/commercetools/merchant-center-application-kit/commit/83f2add2a56ba6696c51fd930a0a1dadbf36c134) Thanks [@renovate](https://github.com/apps/renovate)! - Update all dependencies

- Updated dependencies [[`83f2add2`](https://github.com/commercetools/merchant-center-application-kit/commit/83f2add2a56ba6696c51fd930a0a1dadbf36c134)]:
  - @commercetools-frontend/actions-global@20.9.3
  - @commercetools-frontend/application-components@20.9.3
  - @commercetools-frontend/application-shell-connectors@20.9.3
  - @commercetools-frontend/browser-history@20.9.3
  - @commercetools-frontend/constants@20.9.3
  - @commercetools-frontend/i18n@20.9.3
  - @commercetools-frontend/l10n@20.9.3
  - @commercetools-frontend/notifications@20.9.3
  - @commercetools-frontend/permissions@20.9.3
  - @commercetools-frontend/react-notifications@20.9.3
  - @commercetools-frontend/sdk@20.9.3
  - @commercetools-frontend/sentry@20.9.3
  - @commercetools-frontend/url-utils@20.9.3

## 20.9.0

### Patch Changes

- Updated dependencies [[`a0e1cd72`](https://github.com/commercetools/merchant-center-application-kit/commit/a0e1cd72847cccb80f0d3436fbf44cada6d86bd0), [`a04f5d02`](https://github.com/commercetools/merchant-center-application-kit/commit/a04f5d021b8620b059cd90442f91501ff538679c)]:
  - @commercetools-frontend/actions-global@20.9.0
  - @commercetools-frontend/application-shell-connectors@20.9.0
  - @commercetools-frontend/browser-history@20.9.0
  - @commercetools-frontend/i18n@20.9.0
  - @commercetools-frontend/react-notifications@20.9.0
  - @commercetools-frontend/application-components@20.9.0
  - @commercetools-frontend/permissions@20.9.0

## 20.8.0

### Minor Changes

- [#2312](https://github.com/commercetools/merchant-center-application-kit/pull/2312) [`ca4e1441`](https://github.com/commercetools/merchant-center-application-kit/commit/ca4e14410537c2eadaccfb537431036fb8fae883) Thanks [@emmenko](https://github.com/emmenko)! - Introduce a new configuration option for defining menu links when developing a Custom Application.

  At the moment, menu links are expected to be defined in a `menu.json` file and loaded by the Custom Application using a special prop `DEV_ONLY__loadNavbarMenuConfig` passed to the `<ApplicationShell>`. Something like this:

  ```js
  <ApplicationShell
    // ...
    DEV_ONLY__loadNavbarMenuConfig={() =>
      import('../../../menu.json').then((data) => data.default || data)
    }
  />
  ```

  This poses some issues and confusion:

  - The prop `DEV_ONLY__loadNavbarMenuConfig` is confusing, and users have to explicitly load the `menu.json` with code splitting, to avoid having the content in the production bundles.
  - The content of the `menu.json` is not validated at all, relying on try-error approaches from the users.
  - The `menu.json` is not really documented.
  - Having an extra `menu.json` file besides the `custom-application-config.json` is not ideal.

  Now we support defining the menu links in the `custom-application-config.json` itself, which aims to solve all the issues mentioned before. It also comes with some additional improvements such as:

  - Less configuration fields.
  - Support for two new variable placeholders:
    - `intl`: Given that menu labels are translated, you can reference a translation using the following syntax: `${intl:<local>:<translation_key>}`, for example `${intl:en:Menu.Avengers}`.
    - `path`: Reference a file to load the its content and inline it. This is usually useful for SVG icons. The path can be relative to the application folder, for example `${path:./app.svg}`, or from a module, for example `${path:@commercetools-frontend/assets/application-icons/rocket.svg}`.

  > NOTE: This is an opt-in feature and is meant to replace the `menu.json` approach. For now it's fully backwards compatible.

  The menu links can be defined in the `custom-application-config.json` using the field `menuLinks`. You can check the JSON schema to inspect the supported fields.

  Example:

  ```json
  {
    // ...
    "menuLinks": {
      "icon": "${path:@commercetools-frontend/assets/application-icons/rocket.svg}",
      "defaultLabel": "${intl:en:Menu.StateMachines}",
      "labelAllLocales": [
        {
          "locale": "en",
          "value": "${intl:en:Menu.StateMachines}"
        },
        {
          "locale": "de",
          "value": "${intl:de:Menu.StateMachines}"
        }
      ],
      "submenuLinks": [
        {
          "uriPath": "echo-server",
          "defaultLabel": "${intl:en:Menu.EchoServer}",
          "labelAllLocales": [
            {
              "locale": "en",
              "value": "${intl:en:Menu.EchoServer}"
            },
            {
              "locale": "de",
              "value": "${intl:de:Menu.EchoServer}"
            }
          ]
        }
      ]
    }
  }
  ```

### Patch Changes

- [#2316](https://github.com/commercetools/merchant-center-application-kit/pull/2316) [`3acfa94b`](https://github.com/commercetools/merchant-center-application-kit/commit/3acfa94bb1e67de9a144237d4f32cb94c6a2f26b) Thanks [@emmenko](https://github.com/emmenko)! - Upgrade to uikit `v12.2.2`.

* [#2313](https://github.com/commercetools/merchant-center-application-kit/pull/2313) [`9826a605`](https://github.com/commercetools/merchant-center-application-kit/commit/9826a605cd7b84c433383b02c1b94985c8173cda) Thanks [@emmenko](https://github.com/emmenko)! - Use new TS compiler options `jsx: react-jsx` and `jsxImportSource: @emotion/react`. All unused React imports then have been removed or migrated to destructured named imports.

- [#2300](https://github.com/commercetools/merchant-center-application-kit/pull/2300) [`b3437eab`](https://github.com/commercetools/merchant-center-application-kit/commit/b3437eab6fd7b1529f5eac78eda658028474afa7) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

* [#2315](https://github.com/commercetools/merchant-center-application-kit/pull/2315) [`22177e58`](https://github.com/commercetools/merchant-center-application-kit/commit/22177e5885372d7821b591a4e69e2b03cc24c867) Thanks [@emmenko](https://github.com/emmenko)! - Expose `<PortalsContainer>` from `@commercetools-frontend/application-components`. In case you happen to use some of the modal components outside of a Custom Application, you need to additionally render the `<PortalsContainer>`.

  Moreover, to help managing modal components state (open/close), we now expose a state hook `useModalState`.

* Updated dependencies [[`3acfa94b`](https://github.com/commercetools/merchant-center-application-kit/commit/3acfa94bb1e67de9a144237d4f32cb94c6a2f26b), [`ca4e1441`](https://github.com/commercetools/merchant-center-application-kit/commit/ca4e14410537c2eadaccfb537431036fb8fae883), [`9826a605`](https://github.com/commercetools/merchant-center-application-kit/commit/9826a605cd7b84c433383b02c1b94985c8173cda), [`ca4e1441`](https://github.com/commercetools/merchant-center-application-kit/commit/ca4e14410537c2eadaccfb537431036fb8fae883), [`b3437eab`](https://github.com/commercetools/merchant-center-application-kit/commit/b3437eab6fd7b1529f5eac78eda658028474afa7), [`22177e58`](https://github.com/commercetools/merchant-center-application-kit/commit/22177e5885372d7821b591a4e69e2b03cc24c867)]:
  - @commercetools-frontend/application-components@20.8.0
  - @commercetools-frontend/react-notifications@20.8.0
  - @commercetools-frontend/assets@20.8.0
  - @commercetools-frontend/actions-global@20.8.0
  - @commercetools-frontend/application-shell-connectors@20.8.0
  - @commercetools-frontend/i18n@20.8.0
  - @commercetools-frontend/l10n@20.8.0
  - @commercetools-frontend/permissions@20.8.0
  - @commercetools-frontend/sdk@20.8.0
  - @commercetools-frontend/sentry@20.8.0
  - @commercetools-frontend/constants@20.8.0
  - @commercetools-frontend/browser-history@20.8.0
  - @commercetools-frontend/notifications@20.8.0
  - @commercetools-frontend/url-utils@20.8.0

## 20.7.0

### Minor Changes

- [#2292](https://github.com/commercetools/merchant-center-application-kit/pull/2292) [`cd381943`](https://github.com/commercetools/merchant-center-application-kit/commit/cd38194393e052ae2d10714c2693bb72a1bc8719) Thanks [@emmenko](https://github.com/emmenko)! - Support rendering menu icons using `<InlineSvg>` component.

### Patch Changes

- [#2293](https://github.com/commercetools/merchant-center-application-kit/pull/2293) [`c7325b0d`](https://github.com/commercetools/merchant-center-application-kit/commit/c7325b0d4e45132ff0c9a5243132537057dfa406) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

* [#2287](https://github.com/commercetools/merchant-center-application-kit/pull/2287) [`f5aa350a`](https://github.com/commercetools/merchant-center-application-kit/commit/f5aa350a29983383dd5933ac38c0beb56f0b9cf5) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

* Updated dependencies [[`c7325b0d`](https://github.com/commercetools/merchant-center-application-kit/commit/c7325b0d4e45132ff0c9a5243132537057dfa406), [`f5aa350a`](https://github.com/commercetools/merchant-center-application-kit/commit/f5aa350a29983383dd5933ac38c0beb56f0b9cf5), [`cd381943`](https://github.com/commercetools/merchant-center-application-kit/commit/cd38194393e052ae2d10714c2693bb72a1bc8719)]:
  - @commercetools-frontend/application-shell-connectors@20.7.0
  - @commercetools-frontend/browser-history@20.7.0
  - @commercetools-frontend/react-notifications@20.7.0
  - @commercetools-frontend/sdk@20.7.0
  - @commercetools-frontend/l10n@20.7.0
  - @commercetools-frontend/sentry@20.7.0
  - @commercetools-frontend/application-components@20.7.0
  - @commercetools-frontend/permissions@20.7.0
  - @commercetools-frontend/actions-global@20.7.0
  - @commercetools-frontend/i18n@20.7.0

## 20.6.1

### Patch Changes

- [#2285](https://github.com/commercetools/merchant-center-application-kit/pull/2285) [`63995aa8`](https://github.com/commercetools/merchant-center-application-kit/commit/63995aa8c204a9e31778bb5b5a9cc6b5b500fdb4) Thanks [@emmenko](https://github.com/emmenko)! - Keep custom aria `role` attributes for navbar.

## 20.6.0

### Patch Changes

- [#2281](https://github.com/commercetools/merchant-center-application-kit/pull/2281) [`e7c0ee57`](https://github.com/commercetools/merchant-center-application-kit/commit/e7c0ee5777db1b455b71cf3785bfce2185596cba) Thanks [@emmenko](https://github.com/emmenko)! - Previously when a menu item had sub-links, clicking on the item would only expand the group of sub-links, making the main menu link not usable.

  Now when the item group is collapsed, clicking on the main item the first time expands the group of sub-links. **At this point the main menu item becomes a normal link** and can be used as expected.

- Updated dependencies [[`b910aa8e`](https://github.com/commercetools/merchant-center-application-kit/commit/b910aa8e10b824d35a880bc9fda9d460d5ff0957), [`be968d34`](https://github.com/commercetools/merchant-center-application-kit/commit/be968d344261622931c6cfadde905605d5b5dfde)]:
  - @commercetools-frontend/i18n@20.6.0
  - @commercetools-frontend/application-components@20.6.0

## 20.5.2

### Patch Changes

- [#2274](https://github.com/commercetools/merchant-center-application-kit/pull/2274) [`374659f3`](https://github.com/commercetools/merchant-center-application-kit/commit/374659f3a06f61a2c9a0218d298ba5ee0de0c9c4) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update dependency @testing-library/react to v12

* [#2273](https://github.com/commercetools/merchant-center-application-kit/pull/2273) [`b96d4f3d`](https://github.com/commercetools/merchant-center-application-kit/commit/b96d4f3d6ab177da66bc8cab337172bf3a85b2c6) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

* Updated dependencies [[`b8f46017`](https://github.com/commercetools/merchant-center-application-kit/commit/b8f46017ca02c01bd606a0b27d2c7e568e6e3ed7), [`374659f3`](https://github.com/commercetools/merchant-center-application-kit/commit/374659f3a06f61a2c9a0218d298ba5ee0de0c9c4), [`b96d4f3d`](https://github.com/commercetools/merchant-center-application-kit/commit/b96d4f3d6ab177da66bc8cab337172bf3a85b2c6)]:
  - @commercetools-frontend/react-notifications@20.5.2
  - @commercetools-frontend/application-shell-connectors@20.5.2
  - @commercetools-frontend/sdk@20.5.2
  - @commercetools-frontend/actions-global@20.5.2
  - @commercetools-frontend/application-components@20.5.2
  - @commercetools-frontend/browser-history@20.5.2
  - @commercetools-frontend/constants@20.5.2
  - @commercetools-frontend/i18n@20.5.2
  - @commercetools-frontend/l10n@20.5.2
  - @commercetools-frontend/notifications@20.5.2
  - @commercetools-frontend/permissions@20.5.2
  - @commercetools-frontend/sentry@20.5.2
  - @commercetools-frontend/url-utils@20.5.2

## 20.5.1

### Patch Changes

- [#2264](https://github.com/commercetools/merchant-center-application-kit/pull/2264) [`e0ea1333`](https://github.com/commercetools/merchant-center-application-kit/commit/e0ea1333218aa7a916ff0971a52ed8175be4d697) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

* [#2268](https://github.com/commercetools/merchant-center-application-kit/pull/2268) [`c370f242`](https://github.com/commercetools/merchant-center-application-kit/commit/c370f242bb85bc0041b4825bc4ebc877eaaa61e4) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

* Updated dependencies [[`e0ea1333`](https://github.com/commercetools/merchant-center-application-kit/commit/e0ea1333218aa7a916ff0971a52ed8175be4d697), [`c370f242`](https://github.com/commercetools/merchant-center-application-kit/commit/c370f242bb85bc0041b4825bc4ebc877eaaa61e4)]:
  - @commercetools-frontend/actions-global@20.5.1
  - @commercetools-frontend/application-components@20.5.1
  - @commercetools-frontend/application-shell-connectors@20.5.1
  - @commercetools-frontend/browser-history@20.5.1
  - @commercetools-frontend/constants@20.5.1
  - @commercetools-frontend/i18n@20.5.1
  - @commercetools-frontend/l10n@20.5.1
  - @commercetools-frontend/notifications@20.5.1
  - @commercetools-frontend/permissions@20.5.1
  - @commercetools-frontend/react-notifications@20.5.1
  - @commercetools-frontend/sdk@20.5.1
  - @commercetools-frontend/sentry@20.5.1
  - @commercetools-frontend/url-utils@20.5.1

## 20.5.0

### Patch Changes

- Updated dependencies [[`b9196aa7`](https://github.com/commercetools/merchant-center-application-kit/commit/b9196aa7097dae058d46f335e6332a5ee014a9d1)]:
  - @commercetools-frontend/constants@20.5.0
  - @commercetools-frontend/actions-global@20.5.0
  - @commercetools-frontend/application-components@20.5.0
  - @commercetools-frontend/application-shell-connectors@20.5.0
  - @commercetools-frontend/react-notifications@20.5.0
  - @commercetools-frontend/sdk@20.5.0
  - @commercetools-frontend/sentry@20.5.0
  - @commercetools-frontend/permissions@20.5.0
  - @commercetools-frontend/i18n@20.5.0
  - @commercetools-frontend/l10n@20.5.0

## 20.4.0

### Patch Changes

- [#2247](https://github.com/commercetools/merchant-center-application-kit/pull/2247) [`f8f759b6`](https://github.com/commercetools/merchant-center-application-kit/commit/f8f759b6f0f6d8cc677efd90fecbd19d103c6a4f) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

* [#2233](https://github.com/commercetools/merchant-center-application-kit/pull/2233) [`e642229a`](https://github.com/commercetools/merchant-center-application-kit/commit/e642229a7be1c544ede8de831cb9e3633deb3fdd) Thanks [@tdeekens](https://github.com/tdeekens)! - Updates to `jest` v27 including `jest-each`, `pretty-format` and `ts-jest`.

  The breaking changes of `jest` are encapsulated into `jest-preset-mc-app` while a condition was added to ensure backwards compatibility of `babel-jest` and the export of `createTransformer`.

* Updated dependencies [[`f8f759b6`](https://github.com/commercetools/merchant-center-application-kit/commit/f8f759b6f0f6d8cc677efd90fecbd19d103c6a4f)]:
  - @commercetools-frontend/application-components@20.4.0
  - @commercetools-frontend/i18n@20.4.0
  - @commercetools-frontend/react-notifications@20.4.0
  - @commercetools-frontend/sentry@20.4.0
  - @commercetools-frontend/actions-global@20.4.0
  - @commercetools-frontend/application-shell-connectors@20.4.0
  - @commercetools-frontend/l10n@20.4.0
  - @commercetools-frontend/permissions@20.4.0

## 20.3.1

### Patch Changes

- [#2235](https://github.com/commercetools/merchant-center-application-kit/pull/2235) [`e5192ff1`](https://github.com/commercetools/merchant-center-application-kit/commit/e5192ff17db08f08ade15e0faf09eba28d832158) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update dependency perfume.js to v6

* [#2230](https://github.com/commercetools/merchant-center-application-kit/pull/2230) [`035ec444`](https://github.com/commercetools/merchant-center-application-kit/commit/035ec444c928d6b13f299012cfcdd0dec0e68af8) Thanks [@tdeekens](https://github.com/tdeekens)! - fix: update left behind dependencies

* Updated dependencies [[`035ec444`](https://github.com/commercetools/merchant-center-application-kit/commit/035ec444c928d6b13f299012cfcdd0dec0e68af8)]:
  - @commercetools-frontend/actions-global@20.3.1
  - @commercetools-frontend/application-components@20.3.1
  - @commercetools-frontend/application-shell-connectors@20.3.1
  - @commercetools-frontend/i18n@20.3.1
  - @commercetools-frontend/l10n@20.3.1
  - @commercetools-frontend/permissions@20.3.1
  - @commercetools-frontend/react-notifications@20.3.1
  - @commercetools-frontend/sdk@20.3.1
  - @commercetools-frontend/sentry@20.3.1

## 20.3.0

### Patch Changes

- [#2223](https://github.com/commercetools/merchant-center-application-kit/pull/2223) [`6de28034`](https://github.com/commercetools/merchant-center-application-kit/commit/6de28034f51e53b3cd1f293eaa16b8f66d9ae9e0) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

* [#2160](https://github.com/commercetools/merchant-center-application-kit/pull/2160) [`7734f69e`](https://github.com/commercetools/merchant-center-application-kit/commit/7734f69e07fdff9e5a4517f6193541ac1170dff7) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependency eslint-plugin-testing-library to v4 and use `screen` over assigning to `rendered`

- [#2212](https://github.com/commercetools/merchant-center-application-kit/pull/2212) [`5961c019`](https://github.com/commercetools/merchant-center-application-kit/commit/5961c019ab908bc1a5d58acd4511e7c579976797) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`6de28034`](https://github.com/commercetools/merchant-center-application-kit/commit/6de28034f51e53b3cd1f293eaa16b8f66d9ae9e0), [`11a6c70d`](https://github.com/commercetools/merchant-center-application-kit/commit/11a6c70d9b76f595933d399f5688d7e85c805c66), [`7e7b4996`](https://github.com/commercetools/merchant-center-application-kit/commit/7e7b4996abd7297650237b43b375f04b3ff10b54), [`7734f69e`](https://github.com/commercetools/merchant-center-application-kit/commit/7734f69e07fdff9e5a4517f6193541ac1170dff7), [`5961c019`](https://github.com/commercetools/merchant-center-application-kit/commit/5961c019ab908bc1a5d58acd4511e7c579976797)]:
  - @commercetools-frontend/application-components@20.3.0
  - @commercetools-frontend/application-shell-connectors@20.3.0
  - @commercetools-frontend/i18n@20.3.0
  - @commercetools-frontend/l10n@20.3.0
  - @commercetools-frontend/react-notifications@20.3.0
  - @commercetools-frontend/sentry@20.3.0
  - @commercetools-frontend/constants@20.3.0
  - @commercetools-frontend/sdk@20.3.0
  - @commercetools-frontend/permissions@20.3.0
  - @commercetools-frontend/actions-global@20.3.0

## 20.2.1

### Patch Changes

- Updated dependencies [[`f8b4acc1`](https://github.com/commercetools/merchant-center-application-kit/commit/f8b4acc1acd175b8dc6a65c6aead2162771fd748)]:
  - @commercetools-frontend/sentry@20.2.1
  - @commercetools-frontend/actions-global@20.2.1
  - @commercetools-frontend/application-shell-connectors@20.2.1
  - @commercetools-frontend/i18n@20.2.1
  - @commercetools-frontend/l10n@20.2.1
  - @commercetools-frontend/permissions@20.2.1
  - @commercetools-frontend/react-notifications@20.2.1
  - @commercetools-frontend/application-components@20.2.1

## 20.2.0

### Minor Changes

- [#2198](https://github.com/commercetools/merchant-center-application-kit/pull/2198) [`864ce386`](https://github.com/commercetools/merchant-center-application-kit/commit/864ce386995a417f3bff2fd0ab052b5f2f59a196) Thanks [@emmenko](https://github.com/emmenko)! - Add support for sending custom HTTP headers when using the `/proxy/forward-to` endpoint.

  See the examples below on how to configure the HTTP headers for both scenarios.

  All custom HTTP headers are sent to the Merchant Center API with a prefix `x-forward-header-`, as it allows the Merchant Center API to allow requests with those headers to be forwarded. However, the request forwarded to the external API contains the correct headers without the prefix.

  ## Usage for Apollo

  The `createApolloContextForProxyForwardTo` function now supports passing custom HTTP headers.

  ```diff
  import React from 'react';
  import {
    createApolloContextForProxyForwardTo,
    useMcQuery,
  } from '@commercetools-frontend/application-shell';
  import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';

  const Fetcher = () => {
    // Assuming that the `custom-application-config.json` contains the custom value:
    // `{ additionalEnv: { externalApiUrl: 'https://my-custom-app.com/graphql'} }`
    const externalApiUrl = useApplicationContext(
      context => context.environment.externalApiUrl
    );
    const { loading, data, error } = useMcQuery(MyQuery, {
      context: createApolloContextForProxyForwardTo({
        // The URL to your external API
        uri: externalApiUrl,
  +     headers: {
  +       'x-foo': 'bar'
  +     }
      }),
    });
    // ...
  };
  ```

  ## Usage for SDK actions

  All `forwardTo` proxy actions supports sending custom HTTP headers.

  ```diff
  actions.forwardTo.get({
    uri: 'https://my-custom-app.com/graphql',
  + headers: {
  +   'x-foo': 'bar',
  + },
  });
  ```

### Patch Changes

- Updated dependencies [[`864ce386`](https://github.com/commercetools/merchant-center-application-kit/commit/864ce386995a417f3bff2fd0ab052b5f2f59a196)]:
  - @commercetools-frontend/sdk@20.2.0

## 20.1.2

### Patch Changes

- [#2193](https://github.com/commercetools/merchant-center-application-kit/pull/2193) [`2c159ca3`](https://github.com/commercetools/merchant-center-application-kit/commit/2c159ca3a861a4321ecfb8c6ea382bea9a9cdd65) Thanks [@adnasa](https://github.com/adnasa)! - Bump to latest ui-kit

* [#2199](https://github.com/commercetools/merchant-center-application-kit/pull/2199) [`0bfa1613`](https://github.com/commercetools/merchant-center-application-kit/commit/0bfa16134450fb0699018b2210e0da904f646140) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

* Updated dependencies [[`2c159ca3`](https://github.com/commercetools/merchant-center-application-kit/commit/2c159ca3a861a4321ecfb8c6ea382bea9a9cdd65), [`0bfa1613`](https://github.com/commercetools/merchant-center-application-kit/commit/0bfa16134450fb0699018b2210e0da904f646140)]:
  - @commercetools-frontend/application-components@20.1.2
  - @commercetools-frontend/react-notifications@20.1.2
  - @commercetools-frontend/actions-global@20.1.2
  - @commercetools-frontend/application-shell-connectors@20.1.2
  - @commercetools-frontend/permissions@20.1.2

## 20.0.1

### Patch Changes

- [#2178](https://github.com/commercetools/merchant-center-application-kit/pull/2178) [`26d4487a`](https://github.com/commercetools/merchant-center-application-kit/commit/26d4487a15dcee5c526de7b1f227e042e2711d3f) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`26d4487a`](https://github.com/commercetools/merchant-center-application-kit/commit/26d4487a15dcee5c526de7b1f227e042e2711d3f)]:
  - @commercetools-frontend/actions-global@20.0.1
  - @commercetools-frontend/application-components@20.0.1
  - @commercetools-frontend/application-shell-connectors@20.0.1
  - @commercetools-frontend/browser-history@20.0.1
  - @commercetools-frontend/constants@20.0.1
  - @commercetools-frontend/i18n@20.0.1
  - @commercetools-frontend/l10n@20.0.1
  - @commercetools-frontend/notifications@20.0.1
  - @commercetools-frontend/permissions@20.0.1
  - @commercetools-frontend/react-notifications@20.0.1
  - @commercetools-frontend/sdk@20.0.1
  - @commercetools-frontend/sentry@20.0.1
  - @commercetools-frontend/url-utils@20.0.1

## 20.0.0

### Patch Changes

- Updated dependencies [[`49d253ad`](https://github.com/commercetools/merchant-center-application-kit/commit/49d253ad4aeb373389e424f8e09ecdafc15405c8)]:
  - @commercetools-frontend/sdk@20.0.0

## 19.4.1

### Patch Changes

- [#2169](https://github.com/commercetools/merchant-center-application-kit/pull/2169) [`75efb3e4`](https://github.com/commercetools/merchant-center-application-kit/commit/75efb3e4f50cf5011c5affb4a9488f3520e7a8a7) Thanks [@emmenko](https://github.com/emmenko)! - Skip `project_key` claim check when validating oidc scope. This allows project switching without having to log in again (when using OIDC flow), thanks to the `x-refreshed-session-token` header.

## 19.3.1

### Patch Changes

- [#2157](https://github.com/commercetools/merchant-center-application-kit/pull/2157) [`e757dd2b`](https://github.com/commercetools/merchant-center-application-kit/commit/e757dd2b114f0c751400eca6179700bddbb3aecc) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

* [#2163](https://github.com/commercetools/merchant-center-application-kit/pull/2163) [`de1fa715`](https://github.com/commercetools/merchant-center-application-kit/commit/de1fa7153c1baab5da116babc857fec3f0e99d51) Thanks [@emmenko](https://github.com/emmenko)! - Handle HTTP responses with header `x-refreshed-session-token`, when using OIDC workflow.

* Updated dependencies [[`e757dd2b`](https://github.com/commercetools/merchant-center-application-kit/commit/e757dd2b114f0c751400eca6179700bddbb3aecc)]:
  - @commercetools-frontend/actions-global@19.3.1
  - @commercetools-frontend/application-components@19.3.1
  - @commercetools-frontend/application-shell-connectors@19.3.1
  - @commercetools-frontend/browser-history@19.3.1
  - @commercetools-frontend/constants@19.3.1
  - @commercetools-frontend/i18n@19.3.1
  - @commercetools-frontend/l10n@19.3.1
  - @commercetools-frontend/notifications@19.3.1
  - @commercetools-frontend/permissions@19.3.1
  - @commercetools-frontend/react-notifications@19.3.1
  - @commercetools-frontend/sdk@19.3.1
  - @commercetools-frontend/sentry@19.3.1
  - @commercetools-frontend/url-utils@19.3.1

## 19.3.0

### Minor Changes

- [#2144](https://github.com/commercetools/merchant-center-application-kit/pull/2144) [`7ec6626f`](https://github.com/commercetools/merchant-center-application-kit/commit/7ec6626f7db35127b3611f546828b01151222d4c) Thanks [@pa3](https://github.com/pa3)! - The `@commercetools-frontend/application-shell/test-utils` now exports a new utility function for testing hooks: `renderHook`. This function wraps the original `renderHook` function from `@testing-library/react-hooks` but it comes pre-configured with providers for testing Custom Applications.

  The new `renderHook` function also accepts the same options as other test utils, such as `renderApp`, and returns some useful properties like `store`, `history`, etc.

  All `@testing-library/react-hooks` functionality is exported under the namespace `hooks` from the package '@commercetools-frontend/application-shell/test-utils'.

  **Usage example**

  ```jsx
  import { hooks } from '@commercetools-frontend/application-shell/test-utils';

  const { act, renderHook } = hooks;

  it('should navigate to a route', () => {
    const { result, history } = renderHook(useRoutes);
    act(() => result.current.someRoute.go());
    expect(history.location.pathname).toBe('/some-route');
  });
  ```

## 19.2.0

### Minor Changes

- [#2144](https://github.com/commercetools/merchant-center-application-kit/pull/2144) [`7ec6626f`](https://github.com/commercetools/merchant-center-application-kit/commit/7ec6626f7db35127b3611f546828b01151222d4c) Thanks [@pa3](https://github.com/pa3)! - Adds re-export of `@testing-library/react-hooks` from `test-utils` with `renderHook` functions wrapped with app-kit providers.

  The `renderHook` function is wrapped similarily to the existing `renderAppWithRedux`:

  - All `options` which can be passed to `renderAppWithRedux` can be passed to `renderHooks`
  - All additional poperties returned as a result of an `renderAppWithRedux` call (like `store` or `history`) are returend from the wrapped `renderHook` too

  All `@testing-library/react-hooks` functionality is exported under the namespace `hooks` from the package '@commercetools-frontend/application-shell/test-utils'.

  **Usage example**

  ```jsx
  import { hooks } from '@commercetools-frontend/application-shell/test-utils';

  const { act, renderHook } = hooks;

  it('should navigate to a route', () => {
    const { result, history } = renderHook(useRoutes);
    act(() => result.current.someRoute.go());
    expect(history.location.pathname).toBe('/some-route');
  });
  ```

## 19.1.0

### Patch Changes

- Updated dependencies [[`18fb7648`](https://github.com/commercetools/merchant-center-application-kit/commit/18fb76483f27e17e05dc8fddeda625dadf587a0f)]:
  - @commercetools-frontend/l10n@19.1.0
  - @commercetools-frontend/application-components@19.1.0

## 19.0.1

### Patch Changes

- [#2135](https://github.com/commercetools/merchant-center-application-kit/pull/2135) [`598d3bb5`](https://github.com/commercetools/merchant-center-application-kit/commit/598d3bb52a43b261f4ddf0393722927b76339870) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

- Updated dependencies [[`598d3bb5`](https://github.com/commercetools/merchant-center-application-kit/commit/598d3bb52a43b261f4ddf0393722927b76339870)]:
  - @commercetools-frontend/application-components@19.0.1
  - @commercetools-frontend/application-shell-connectors@19.0.1
  - @commercetools-frontend/i18n@19.0.1
  - @commercetools-frontend/react-notifications@19.0.1
  - @commercetools-frontend/sdk@19.0.1
  - @commercetools-frontend/permissions@19.0.1

## 19.0.0

### Major Changes

- [#2041](https://github.com/commercetools/merchant-center-application-kit/pull/2041) [`a240f657`](https://github.com/commercetools/merchant-center-application-kit/commit/a240f6574a9240a2ac82febb67b0f6c814db979f) Thanks [@emmenko](https://github.com/emmenko)! - - Requires a peer dependency of `react@17`, `react-dom@17`.
  - The `@types/react*` peer dependencies have been removed and included as normal dependencies with a minor range version.
  - The peer dependency `react-intl` now only requires version `>=5`.
  - The peer dependency `@testing-library/react` now only requires version `>=11`.
  - Changes required Node.js engine version to `>=12 || >=14` in `package.json`.
  - Uses `graphql@15`.

* [#2041](https://github.com/commercetools/merchant-center-application-kit/pull/2041) [`a240f657`](https://github.com/commercetools/merchant-center-application-kit/commit/a240f6574a9240a2ac82febb67b0f6c814db979f) Thanks [@emmenko](https://github.com/emmenko)! - Upgrade and migrate packages to use `ui-kit@v12`

### Patch Changes

- Updated dependencies [[`a240f657`](https://github.com/commercetools/merchant-center-application-kit/commit/a240f6574a9240a2ac82febb67b0f6c814db979f), [`a240f657`](https://github.com/commercetools/merchant-center-application-kit/commit/a240f6574a9240a2ac82febb67b0f6c814db979f), [`a240f657`](https://github.com/commercetools/merchant-center-application-kit/commit/a240f6574a9240a2ac82febb67b0f6c814db979f), [`a240f657`](https://github.com/commercetools/merchant-center-application-kit/commit/a240f6574a9240a2ac82febb67b0f6c814db979f), [`a240f657`](https://github.com/commercetools/merchant-center-application-kit/commit/a240f6574a9240a2ac82febb67b0f6c814db979f), [`a240f657`](https://github.com/commercetools/merchant-center-application-kit/commit/a240f6574a9240a2ac82febb67b0f6c814db979f), [`a240f657`](https://github.com/commercetools/merchant-center-application-kit/commit/a240f6574a9240a2ac82febb67b0f6c814db979f), [`a240f657`](https://github.com/commercetools/merchant-center-application-kit/commit/a240f6574a9240a2ac82febb67b0f6c814db979f), [`a240f657`](https://github.com/commercetools/merchant-center-application-kit/commit/a240f6574a9240a2ac82febb67b0f6c814db979f), [`a240f657`](https://github.com/commercetools/merchant-center-application-kit/commit/a240f6574a9240a2ac82febb67b0f6c814db979f)]:
  - @commercetools-frontend/application-shell-connectors@19.0.0
  - @commercetools-frontend/l10n@19.0.0
  - @commercetools-frontend/permissions@19.0.0
  - @commercetools-frontend/react-notifications@19.0.0
  - @commercetools-frontend/actions-global@19.0.0
  - @commercetools-frontend/sentry@19.0.0
  - @commercetools-frontend/sdk@19.0.0
  - @commercetools-frontend/application-components@19.0.0
  - @commercetools-frontend/i18n@19.0.0

## 18.7.0

### Patch Changes

- [#2122](https://github.com/commercetools/merchant-center-application-kit/pull/2122) [`c3ba44a6`](https://github.com/commercetools/merchant-center-application-kit/commit/c3ba44a6a124ddfbe6322436a260b93ff29ec4e9) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

* [#2110](https://github.com/commercetools/merchant-center-application-kit/pull/2110) [`c850d6dc`](https://github.com/commercetools/merchant-center-application-kit/commit/c850d6dcf8edabb5eb9390e41def4b6b52879b7a) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

* Updated dependencies [[`c3ba44a6`](https://github.com/commercetools/merchant-center-application-kit/commit/c3ba44a6a124ddfbe6322436a260b93ff29ec4e9), [`8b1e943c`](https://github.com/commercetools/merchant-center-application-kit/commit/8b1e943ca8068cfbf915a83e8498500455eabd75), [`263f3180`](https://github.com/commercetools/merchant-center-application-kit/commit/263f318028603daa7fadac7f6cd84c1891b2f1c0), [`c850d6dc`](https://github.com/commercetools/merchant-center-application-kit/commit/c850d6dcf8edabb5eb9390e41def4b6b52879b7a)]:
  - @commercetools-frontend/application-components@18.7.0
  - @commercetools-frontend/i18n@18.7.0
  - @commercetools-frontend/react-notifications@18.7.0
  - @commercetools-frontend/l10n@18.7.0
  - @commercetools-frontend/actions-global@18.7.0
  - @commercetools-frontend/application-shell-connectors@18.7.0
  - @commercetools-frontend/sdk@18.7.0
  - @commercetools-frontend/permissions@18.7.0

## 18.6.0

### Patch Changes

- [#2099](https://github.com/commercetools/merchant-center-application-kit/pull/2099) [`d09a154b`](https://github.com/commercetools/merchant-center-application-kit/commit/d09a154b9e74bc180da033acd8e74ac8ed32fc75) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

- Updated dependencies [[`f347093f`](https://github.com/commercetools/merchant-center-application-kit/commit/f347093f1705ae8214fcd556b80bd2366624205d), [`d09a154b`](https://github.com/commercetools/merchant-center-application-kit/commit/d09a154b9e74bc180da033acd8e74ac8ed32fc75)]:
  - @commercetools-frontend/l10n@18.6.0
  - @commercetools-frontend/actions-global@18.6.0
  - @commercetools-frontend/application-components@18.6.0
  - @commercetools-frontend/application-shell-connectors@18.6.0
  - @commercetools-frontend/browser-history@18.6.0
  - @commercetools-frontend/constants@18.6.0
  - @commercetools-frontend/i18n@18.6.0
  - @commercetools-frontend/notifications@18.6.0
  - @commercetools-frontend/permissions@18.6.0
  - @commercetools-frontend/react-notifications@18.6.0
  - @commercetools-frontend/sdk@18.6.0
  - @commercetools-frontend/sentry@18.6.0
  - @commercetools-frontend/url-utils@18.6.0

## 18.5.6

### Patch Changes

- [`075c770a`](https://github.com/commercetools/merchant-center-application-kit/commit/075c770a009c9f428a83a6c57f924b7683bef0fc) [#2088](https://github.com/commercetools/merchant-center-application-kit/pull/2088) Thanks [@tdeekens](https://github.com/tdeekens)! - chore: update msw

* [`ca4ea6eb`](https://github.com/commercetools/merchant-center-application-kit/commit/ca4ea6eb17c14bf015a8448248c58881e005ac99) [#2085](https://github.com/commercetools/merchant-center-application-kit/pull/2085) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- [`0592dc7d`](https://github.com/commercetools/merchant-center-application-kit/commit/0592dc7dccd77305bda07563280d4322d7996b4e) [#2091](https://github.com/commercetools/merchant-center-application-kit/pull/2091) Thanks [@tdeekens](https://github.com/tdeekens)! - chore: update typescript to 4.2.3

- Updated dependencies [[`ca4ea6eb`](https://github.com/commercetools/merchant-center-application-kit/commit/ca4ea6eb17c14bf015a8448248c58881e005ac99)]:
  - @commercetools-frontend/actions-global@18.5.6
  - @commercetools-frontend/application-components@18.5.6
  - @commercetools-frontend/application-shell-connectors@18.5.6
  - @commercetools-frontend/browser-history@18.5.6
  - @commercetools-frontend/constants@18.5.6
  - @commercetools-frontend/i18n@18.5.6
  - @commercetools-frontend/l10n@18.5.6
  - @commercetools-frontend/notifications@18.5.6
  - @commercetools-frontend/permissions@18.5.6
  - @commercetools-frontend/react-notifications@18.5.6
  - @commercetools-frontend/sdk@18.5.6
  - @commercetools-frontend/sentry@18.5.6
  - @commercetools-frontend/url-utils@18.5.6

## 18.5.5

### Patch Changes

- [`e2137ecc`](https://github.com/commercetools/merchant-center-application-kit/commit/e2137ecc786c01445e4e9009174f32b2004a8daa) [#2079](https://github.com/commercetools/merchant-center-application-kit/pull/2079) Thanks [@mohib0306](https://github.com/mohib0306)! - Add navigating to ProjectSetting->Stores to quick access command list

- Updated dependencies [[`5e7d20fb`](https://github.com/commercetools/merchant-center-application-kit/commit/5e7d20fbf908548aae8d9101bb7b36850f92aa95)]:
  - @commercetools-frontend/application-components@18.5.5

## 18.5.4

### Patch Changes

- Updated dependencies [[`d44f5b69`](https://github.com/commercetools/merchant-center-application-kit/commit/d44f5b6916c3897ce198eb06757d29d40535b8d4)]:
  - @commercetools-frontend/assets@18.5.4
  - @commercetools-frontend/application-components@18.5.4

## 18.5.2

### Patch Changes

- [`5892c888`](https://github.com/commercetools/merchant-center-application-kit/commit/5892c88879bea4b5cb11b9da39d080005da6b045) [#2067](https://github.com/commercetools/merchant-center-application-kit/pull/2067) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all ui-kit packages to v11 (major)

* [`7f26c54e`](https://github.com/commercetools/merchant-center-application-kit/commit/7f26c54e55eff8aeac786ec0d011d36e40b0d263) [#2066](https://github.com/commercetools/merchant-center-application-kit/pull/2066) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

* Updated dependencies [[`5892c888`](https://github.com/commercetools/merchant-center-application-kit/commit/5892c88879bea4b5cb11b9da39d080005da6b045), [`7f26c54e`](https://github.com/commercetools/merchant-center-application-kit/commit/7f26c54e55eff8aeac786ec0d011d36e40b0d263)]:
  - @commercetools-frontend/application-components@18.5.2
  - @commercetools-frontend/react-notifications@18.5.2
  - @commercetools-frontend/actions-global@18.5.2
  - @commercetools-frontend/application-shell-connectors@18.5.2
  - @commercetools-frontend/browser-history@18.5.2
  - @commercetools-frontend/constants@18.5.2
  - @commercetools-frontend/i18n@18.5.2
  - @commercetools-frontend/l10n@18.5.2
  - @commercetools-frontend/notifications@18.5.2
  - @commercetools-frontend/permissions@18.5.2
  - @commercetools-frontend/sdk@18.5.2
  - @commercetools-frontend/sentry@18.5.2
  - @commercetools-frontend/url-utils@18.5.2

## 18.5.1

### Patch Changes

- [`bb2ceac2`](https://github.com/commercetools/merchant-center-application-kit/commit/bb2ceac229b94836482dbed57824d679a9cbd5d6) [#2062](https://github.com/commercetools/merchant-center-application-kit/pull/2062) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`bb2ceac2`](https://github.com/commercetools/merchant-center-application-kit/commit/bb2ceac229b94836482dbed57824d679a9cbd5d6)]:
  - @commercetools-frontend/actions-global@18.5.1
  - @commercetools-frontend/application-components@18.5.1
  - @commercetools-frontend/application-shell-connectors@18.5.1
  - @commercetools-frontend/browser-history@18.5.1
  - @commercetools-frontend/constants@18.5.1
  - @commercetools-frontend/i18n@18.5.1
  - @commercetools-frontend/l10n@18.5.1
  - @commercetools-frontend/notifications@18.5.1
  - @commercetools-frontend/permissions@18.5.1
  - @commercetools-frontend/react-notifications@18.5.1
  - @commercetools-frontend/sdk@18.5.1
  - @commercetools-frontend/sentry@18.5.1
  - @commercetools-frontend/url-utils@18.5.1

## 18.5.0

### Minor Changes

- [`8cfd73f3`](https://github.com/commercetools/merchant-center-application-kit/commit/8cfd73f3bcb830a07dffc3040c9c5960f180016f) [#2052](https://github.com/commercetools/merchant-center-application-kit/pull/2052) Thanks [@torihedden](https://github.com/torihedden)! - feat(menu): add new icon option for side nav menu

### Patch Changes

- Updated dependencies [[`7c69f93d`](https://github.com/commercetools/merchant-center-application-kit/commit/7c69f93d2f0aac04badcea556ea2bc9e5e77cb13)]:
  - @commercetools-frontend/sdk@18.5.0

## 18.4.1

### Patch Changes

- [`074ec33d`](https://github.com/commercetools/merchant-center-application-kit/commit/074ec33d97282fc9750fd59ccceb33ff0430da41) [#2053](https://github.com/commercetools/merchant-center-application-kit/pull/2053) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

- Updated dependencies [[`074ec33d`](https://github.com/commercetools/merchant-center-application-kit/commit/074ec33d97282fc9750fd59ccceb33ff0430da41), [`e5743110`](https://github.com/commercetools/merchant-center-application-kit/commit/e574311090e90b6186c18a3a49747a8bcf08822b)]:
  - @commercetools-frontend/actions-global@18.4.1
  - @commercetools-frontend/application-components@18.4.1
  - @commercetools-frontend/application-shell-connectors@18.4.1
  - @commercetools-frontend/i18n@18.4.1
  - @commercetools-frontend/l10n@18.4.1
  - @commercetools-frontend/permissions@18.4.1
  - @commercetools-frontend/react-notifications@18.4.1
  - @commercetools-frontend/sdk@18.4.1
  - @commercetools-frontend/sentry@18.4.1

## 18.4.0

### Patch Changes

- [`63d9c424`](https://github.com/commercetools/merchant-center-application-kit/commit/63d9c42463be04bad32ee32be1c84535086de755) [#2049](https://github.com/commercetools/merchant-center-application-kit/pull/2049) Thanks [@emmenko](https://github.com/emmenko)! - Bump uikit versions, use `@manypkg/cli upgrade` instead of `bulk-update-versions`.

* [`eb2fbb22`](https://github.com/commercetools/merchant-center-application-kit/commit/eb2fbb2279eff99048c91da352a69e1883eb54af) [#2044](https://github.com/commercetools/merchant-center-application-kit/pull/2044) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

* Updated dependencies [[`63d9c424`](https://github.com/commercetools/merchant-center-application-kit/commit/63d9c42463be04bad32ee32be1c84535086de755), [`eb2fbb22`](https://github.com/commercetools/merchant-center-application-kit/commit/eb2fbb2279eff99048c91da352a69e1883eb54af)]:
  - @commercetools-frontend/application-components@18.4.0
  - @commercetools-frontend/i18n@18.4.0
  - @commercetools-frontend/react-notifications@18.4.0
  - @commercetools-frontend/actions-global@18.4.0
  - @commercetools-frontend/application-shell-connectors@18.4.0
  - @commercetools-frontend/browser-history@18.4.0
  - @commercetools-frontend/constants@18.4.0
  - @commercetools-frontend/l10n@18.4.0
  - @commercetools-frontend/notifications@18.4.0
  - @commercetools-frontend/permissions@18.4.0
  - @commercetools-frontend/sdk@18.4.0
  - @commercetools-frontend/sentry@18.4.0
  - @commercetools-frontend/url-utils@18.4.0

## 18.3.0

### Patch Changes

- Updated dependencies [[`71e12377`](https://github.com/commercetools/merchant-center-application-kit/commit/71e12377a4b4e623942b7f6b441bc9899b561cb3)]:
  - @commercetools-frontend/application-components@18.3.0

## 18.2.2

### Patch Changes

- [`27b6690c`](https://github.com/commercetools/merchant-center-application-kit/commit/27b6690c75c9b83bb11ffcf83251b039a6f06cf0) [#2033](https://github.com/commercetools/merchant-center-application-kit/pull/2033) Thanks [@tdeekens](https://github.com/tdeekens)! - Rename to `enableFeatureConfigurationFetching` to `enableLongLivedFeatureFlags`

- Updated dependencies [[`27b6690c`](https://github.com/commercetools/merchant-center-application-kit/commit/27b6690c75c9b83bb11ffcf83251b039a6f06cf0)]:
  - @commercetools-frontend/constants@18.2.2
  - @commercetools-frontend/actions-global@18.2.2
  - @commercetools-frontend/application-components@18.2.2
  - @commercetools-frontend/application-shell-connectors@18.2.2
  - @commercetools-frontend/react-notifications@18.2.2
  - @commercetools-frontend/sdk@18.2.2
  - @commercetools-frontend/sentry@18.2.2
  - @commercetools-frontend/permissions@18.2.2
  - @commercetools-frontend/i18n@18.2.2
  - @commercetools-frontend/l10n@18.2.2

## 18.2.1

### Patch Changes

- [`b8b11a72`](https://github.com/commercetools/merchant-center-application-kit/commit/b8b11a726f05ab2645fa18f93537a427202f2ecd) [#2030](https://github.com/commercetools/merchant-center-application-kit/pull/2030) Thanks [@adnasa](https://github.com/adnasa)! - move logic on cachedScope lookup

## 18.2.0

### Minor Changes

- [`7fbe0c71`](https://github.com/commercetools/merchant-center-application-kit/commit/7fbe0c718d43e5c940e324e282f3cdd67a46717e) [#2018](https://github.com/commercetools/merchant-center-application-kit/pull/2018) Thanks [@emmenko](https://github.com/emmenko)! - Build package using `preconstruct`. This is now possible as we don't directly load the `.css` file anymore. Instead, we use `postcss` to compile it and load the styles using a macro. This allows the code to be bundled using Babel.

## 18.1.5

### Patch Changes

- [`aa6f642a`](https://github.com/commercetools/merchant-center-application-kit/commit/aa6f642a7d28dec7f34f8e6147ed9c7fee0ebd13) [#2026](https://github.com/commercetools/merchant-center-application-kit/pull/2026) Thanks [@emmenko](https://github.com/emmenko)! - Update uikit and docs-kit dependencies to fix some underlying emotion and react-select version resolution.

- Updated dependencies [[`aa6f642a`](https://github.com/commercetools/merchant-center-application-kit/commit/aa6f642a7d28dec7f34f8e6147ed9c7fee0ebd13)]:
  - @commercetools-frontend/application-components@18.1.5
  - @commercetools-frontend/i18n@18.1.5
  - @commercetools-frontend/react-notifications@18.1.5

## 18.1.4

### Patch Changes

- [`c9589f5e`](https://github.com/commercetools/merchant-center-application-kit/commit/c9589f5e3d1fd18393c7bf501c3b23b8ec402804) [#2020](https://github.com/commercetools/merchant-center-application-kit/pull/2020) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

* [`657eb48f`](https://github.com/commercetools/merchant-center-application-kit/commit/657eb48f21c0c9c776e4ec4ad22b58318f845e14) [#2021](https://github.com/commercetools/merchant-center-application-kit/pull/2021) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update dependency @types/react-select to v4

- [`88d444fd`](https://github.com/commercetools/merchant-center-application-kit/commit/88d444fd02c6f0c561754220540391dd2abc6025) [#2019](https://github.com/commercetools/merchant-center-application-kit/pull/2019) Thanks [@tdeekens](https://github.com/tdeekens)! - chore: update flopflip

- Updated dependencies [[`c9589f5e`](https://github.com/commercetools/merchant-center-application-kit/commit/c9589f5e3d1fd18393c7bf501c3b23b8ec402804)]:
  - @commercetools-frontend/application-components@18.1.4
  - @commercetools-frontend/i18n@18.1.4
  - @commercetools-frontend/react-notifications@18.1.4
  - @commercetools-frontend/sentry@18.1.4
  - @commercetools-frontend/actions-global@18.1.4
  - @commercetools-frontend/application-shell-connectors@18.1.4
  - @commercetools-frontend/l10n@18.1.4
  - @commercetools-frontend/permissions@18.1.4

## 18.1.3

### Patch Changes

- [`94e350e2`](https://github.com/commercetools/merchant-center-application-kit/commit/94e350e2b65caed07be2dfd9a9d6d29ebc86bf73) [#2014](https://github.com/commercetools/merchant-center-application-kit/pull/2014) Thanks [@tdeekens](https://github.com/tdeekens)! - refactor(test-utils): to use flopflip test provider

  When using `@commercetools-frontend/application-shell/test-utils`, we now render a `TestProviderFlopFlip` instead of the normal `ConfigureFlopFlip` with the `memory` adapter.<br/>
  This change simplifies how feature flags are propagated during tests and should not affect the usage of the test-utils.

  > In the very unlikely case that you have been passing the `adapter` option to the test-utils, you can remove that as it's not necessary anymore.

## 18.1.0

### Patch Changes

- [`3bf32993`](https://github.com/commercetools/merchant-center-application-kit/commit/3bf329935a109a73a7c33580fdf618e60fdbcc2c) [#1971](https://github.com/commercetools/merchant-center-application-kit/pull/1971) Thanks [@tdeekens](https://github.com/tdeekens)! - Add internal opt-in support for combining feature flag adapters.

- Updated dependencies [[`3bf32993`](https://github.com/commercetools/merchant-center-application-kit/commit/3bf329935a109a73a7c33580fdf618e60fdbcc2c), [`7a53760f`](https://github.com/commercetools/merchant-center-application-kit/commit/7a53760f4a04decd02037315d8935bed953abfc8)]:
  - @commercetools-frontend/actions-global@18.1.0
  - @commercetools-frontend/application-components@18.1.0
  - @commercetools-frontend/application-shell-connectors@18.1.0
  - @commercetools-frontend/assets@18.1.0
  - @commercetools-frontend/browser-history@18.1.0
  - @commercetools-frontend/constants@18.1.0
  - @commercetools-frontend/l10n@18.1.0
  - @commercetools-frontend/notifications@18.1.0
  - @commercetools-frontend/permissions@18.1.0
  - @commercetools-frontend/react-notifications@18.1.0
  - @commercetools-frontend/sdk@18.1.0
  - @commercetools-frontend/sentry@18.1.0
  - @commercetools-frontend/i18n@18.1.0

## 18.0.3

### Patch Changes

- [`80668fd2`](https://github.com/commercetools/merchant-center-application-kit/commit/80668fd27f3b8ce35230b7d5f780612e244f9621) [#1999](https://github.com/commercetools/merchant-center-application-kit/pull/1999) Thanks [@emmenko](https://github.com/emmenko)! - Fix rendering of application with implicit routes when redirecting to `/account` route.

## 18.0.2

### Patch Changes

- [`b38cb57f`](https://github.com/commercetools/merchant-center-application-kit/commit/b38cb57f678e79a862f1b97df2d1c753838ffbb7) [#1991](https://github.com/commercetools/merchant-center-application-kit/pull/1991) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

- Updated dependencies [[`b38cb57f`](https://github.com/commercetools/merchant-center-application-kit/commit/b38cb57f678e79a862f1b97df2d1c753838ffbb7)]:
  - @commercetools-frontend/actions-global@18.0.2
  - @commercetools-frontend/application-components@18.0.2
  - @commercetools-frontend/i18n@18.0.2
  - @commercetools-frontend/l10n@18.0.2
  - @commercetools-frontend/react-notifications@18.0.2
  - @commercetools-frontend/sdk@18.0.2

## 17.10.2

### Patch Changes

- [`0ef6a6a`](https://github.com/commercetools/merchant-center-application-kit/commit/0ef6a6a3099ce7210b8db8cc5a21a5e40a050d36) [#1989](https://github.com/commercetools/merchant-center-application-kit/pull/1989) Thanks [@emmenko](https://github.com/emmenko)! - fix(app-shell): to re-export flag variation utils

* [`0ef6a6a`](https://github.com/commercetools/merchant-center-application-kit/commit/0ef6a6a3099ce7210b8db8cc5a21a5e40a050d36) [#1989](https://github.com/commercetools/merchant-center-application-kit/pull/1989) Thanks [@emmenko](https://github.com/emmenko)! - Use correct `@deprecated` annotation.

- [`0ef6a6a`](https://github.com/commercetools/merchant-center-application-kit/commit/0ef6a6a3099ce7210b8db8cc5a21a5e40a050d36) [#1989](https://github.com/commercetools/merchant-center-application-kit/pull/1989) Thanks [@emmenko](https://github.com/emmenko)! - Update uikit packages to `10.44`

- Updated dependencies [[`0ef6a6a`](https://github.com/commercetools/merchant-center-application-kit/commit/0ef6a6a3099ce7210b8db8cc5a21a5e40a050d36)]:
  - @commercetools-frontend/application-components@17.10.2
  - @commercetools-frontend/i18n@17.10.2
  - @commercetools-frontend/react-notifications@17.10.2

## 17.10.1

### Patch Changes

- [`5557c5c`](https://github.com/commercetools/merchant-center-application-kit/commit/5557c5c5744bf34a981247d04dc2f1117c15767d) [#1976](https://github.com/commercetools/merchant-center-application-kit/pull/1976) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

- Updated dependencies [[`5557c5c`](https://github.com/commercetools/merchant-center-application-kit/commit/5557c5c5744bf34a981247d04dc2f1117c15767d)]:
  - @commercetools-frontend/actions-global@17.10.1
  - @commercetools-frontend/application-components@17.10.1
  - @commercetools-frontend/application-shell-connectors@17.10.1
  - @commercetools-frontend/browser-history@17.10.1
  - @commercetools-frontend/constants@17.10.1
  - @commercetools-frontend/i18n@17.10.1
  - @commercetools-frontend/l10n@17.10.1
  - @commercetools-frontend/permissions@17.10.1
  - @commercetools-frontend/react-notifications@17.10.1
  - @commercetools-frontend/sdk@17.10.1
  - @commercetools-frontend/sentry@17.10.1

## 17.10.0

### Minor Changes

- [`d86c2e8`](https://github.com/commercetools/merchant-center-application-kit/commit/d86c2e86179aca2729d92fa18545241e2bf36fca) [#1934](https://github.com/commercetools/merchant-center-application-kit/pull/1934) Thanks [@emmenko](https://github.com/emmenko)! - Introduce a new **experimental opt-in** feature to authenticate the application for local development, using an OIDC-like workflow.

  > Disclaimer: this is an opt-in experimental feature. Use it at your own risk.
  > We want to test this feature internally first. Until then, we discourage you to try it out.

  The feature can be enabled by setting the `ENABLE_OIDC_FOR_DEVELOPMENT=true` environment variable.

  In addition to that, we have a new package `@commercetools-frontend/cypress`, to include some useful commands for testing Custom Applications.

### Patch Changes

- Updated dependencies [[`d86c2e8`](https://github.com/commercetools/merchant-center-application-kit/commit/d86c2e86179aca2729d92fa18545241e2bf36fca), [`dc7a443`](https://github.com/commercetools/merchant-center-application-kit/commit/dc7a4437f02cfe9c840ae6f22cc85f94cf6a0bc9)]:
  - @commercetools-frontend/application-components@17.10.0
  - @commercetools-frontend/application-shell-connectors@17.10.0
  - @commercetools-frontend/constants@17.10.0
  - @commercetools-frontend/sdk@17.10.0
  - @commercetools-frontend/permissions@17.10.0
  - @commercetools-frontend/actions-global@17.10.0
  - @commercetools-frontend/react-notifications@17.10.0
  - @commercetools-frontend/sentry@17.10.0
  - @commercetools-frontend/i18n@17.10.0
  - @commercetools-frontend/l10n@17.10.0

## 17.9.1

### Patch Changes

- Updated dependencies [[`d70e533`](https://github.com/commercetools/merchant-center-application-kit/commit/d70e533e7143dcb23df7b3f80eaec2741b7db1f3)]:
  - @commercetools-frontend/l10n@17.9.1
  - @commercetools-frontend/application-components@17.9.1

## 17.9.0

### Minor Changes

- [`4f7e081`](https://github.com/commercetools/merchant-center-application-kit/commit/4f7e081c001e285e8f4c7771894f5d09509daf8e) [#1948](https://github.com/commercetools/merchant-center-application-kit/pull/1948) Thanks [@emmenko](https://github.com/emmenko)! - Allow to pass the application routes as `children` of `<ApplicationShell>`, instead of using the `render` prop.
  When doing so, the application entry point routes are automatically configured according to the `entryPointUriPath` defined in the `custom-application-config.json`.

  > Note that it's still possible to use the `render` prop. However, for most of the cases it should suffice to rely on the pre-configured routes.

  ```diff
  const AsyncApplicationRoutes = React.lazy(
    () => import('../../routes' /* webpackChunkName: "starter-routes" */)
  );

  -export const ApplicationStarter = () => (
  -  <Switch>
  -    {
  -      /* For development, it's useful to redirect to the actual
  -      application routes when you open the browser at http://localhost:3001 */
  -      process.env.NODE_ENV === 'production' ? null : (
  -        <Redirect
  -          exact={true}
  -          from="/:projectKey"
  -          to="/:projectKey/examples-starter"
  -        />
  -      )
  -    }
  -    <Route
  -      path="/:projectKey/examples-starter"
  -      component={AsyncApplicationRoutes}
  -    />
  -    {/* Catch-all route */}
  -    <RouteCatchAll />
  -  </Switch>
  -);
  -ApplicationStarter.displayName = 'ApplicationStarter';

  const EntryPoint = () => (
    <ApplicationShell
      environment={window.app}
      onRegisterErrorListeners={({ dispatch }) => {
        Sdk.Get.errorHandler = (error) =>
          globalActions.handleActionError(error, 'sdk')(dispatch);
      }}
      applicationMessages={loadMessages}
      DEV_ONLY__loadNavbarMenuConfig={() =>
        import('../../../menu.json').then((data) => data.default || data)
      }
      featureFlags={FEATURE_FLAGS}
  -    render={() => <ApplicationStarter />}
  -  />
  +  >
  +    <AsyncApplicationRoutes />
  +  </ApplicationShell>
  );
  ```

  Furthermore, the `test-utils` of the `@commercetools-frontend/application-shell` have now a new option to enable this opt-in behavior of rendering the application with pre-configured routes.
  To enable this option, pass the `disableAutomaticEntryPointRoutes: false` to the `renderApp` or `renderAppWithRedux` functions.

  > Note that you also need to provide the `environment.entryPointUriPath` in order for the routes to be correctly configured.

  ```diff
  -renderApp(<ApplicationStarter />, {
  +renderApp(<AsyncApplicationRoutes />, {
    route: '/my-project/examples-starter'
  +  environment: {
  +    entryPointUriPath: 'examples-starter',
  +  },
  +  disableAutomaticEntryPointRoutes: false,
  });
  ```

### Patch Changes

- Updated dependencies [[`4f7e081`](https://github.com/commercetools/merchant-center-application-kit/commit/4f7e081c001e285e8f4c7771894f5d09509daf8e)]:
  - @commercetools-frontend/constants@17.9.0
  - @commercetools-frontend/actions-global@17.9.0
  - @commercetools-frontend/application-components@17.9.0
  - @commercetools-frontend/application-shell-connectors@17.9.0
  - @commercetools-frontend/react-notifications@17.9.0
  - @commercetools-frontend/sdk@17.9.0
  - @commercetools-frontend/sentry@17.9.0
  - @commercetools-frontend/permissions@17.9.0
  - @commercetools-frontend/i18n@17.9.0
  - @commercetools-frontend/l10n@17.9.0

## 17.8.0

### Patch Changes

- [`3198d2c`](https://github.com/commercetools/merchant-center-application-kit/commit/3198d2ce49501c1c2f996b808d8060efe7270762) [#1957](https://github.com/commercetools/merchant-center-application-kit/pull/1957) Thanks [@stephsprinkle](https://github.com/stephsprinkle)! - fix(navbar): remove title nowrap to accommodate long application names

* [`48a9886`](https://github.com/commercetools/merchant-center-application-kit/commit/48a98861dcf4193041e02e8ac11eb2940826f5d0) [#1954](https://github.com/commercetools/merchant-center-application-kit/pull/1954) Thanks [@tdeekens](https://github.com/tdeekens)! - chore: update dependencies across packages

- [`4971a78`](https://github.com/commercetools/merchant-center-application-kit/commit/4971a78438fb4d2ca5487764192a0bb1ffc3b18e) [#1952](https://github.com/commercetools/merchant-center-application-kit/pull/1952) Thanks [@tdeekens](https://github.com/tdeekens)! - chore: add and apply fixes via manypkg for automatic mono-repo validation

* [`c6a967c`](https://github.com/commercetools/merchant-center-application-kit/commit/c6a967c4dc76dc87310dec0c1960e9518901f361) [#1953](https://github.com/commercetools/merchant-center-application-kit/pull/1953) Thanks [@tdeekens](https://github.com/tdeekens)! - refactor: to update @flopflip to v12

* Updated dependencies [[`48a9886`](https://github.com/commercetools/merchant-center-application-kit/commit/48a98861dcf4193041e02e8ac11eb2940826f5d0), [`4971a78`](https://github.com/commercetools/merchant-center-application-kit/commit/4971a78438fb4d2ca5487764192a0bb1ffc3b18e)]:
  - @commercetools-frontend/actions-global@17.8.0
  - @commercetools-frontend/application-components@17.8.0
  - @commercetools-frontend/application-shell-connectors@17.8.0
  - @commercetools-frontend/browser-history@17.8.0
  - @commercetools-frontend/i18n@17.8.0
  - @commercetools-frontend/l10n@17.8.0
  - @commercetools-frontend/permissions@17.8.0
  - @commercetools-frontend/react-notifications@17.8.0
  - @commercetools-frontend/sdk@17.8.0
  - @commercetools-frontend/sentry@17.8.0

## 17.7.4

### Patch Changes

- [`5f4565e`](https://github.com/commercetools/merchant-center-application-kit/commit/5f4565e8c819cab178b8a823a3ae5a5b2ced5c9d) [#1946](https://github.com/commercetools/merchant-center-application-kit/pull/1946) Thanks [@emmenko](https://github.com/emmenko)! - Update `@flopflip` to latest pre-major version (fixes import bug)

## 17.7.3

### Patch Changes

- [`62ad638`](https://github.com/commercetools/merchant-center-application-kit/commit/62ad6380ab62e1c3e77bd63bd6c3ad4aaee473a9) [#1945](https://github.com/commercetools/merchant-center-application-kit/pull/1945) Thanks [@tdeekens](https://github.com/tdeekens)! - refactor(app-shell): remove unused `updateFlags` export for LaunchDarkly adapter.

## 17.7.1

### Patch Changes

- [`f6f3c5e`](https://github.com/commercetools/merchant-center-application-kit/commit/f6f3c5ebd08226fd4eca22aec5c39791cf5c5d6a) [#1935](https://github.com/commercetools/merchant-center-application-kit/pull/1935) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`f6f3c5e`](https://github.com/commercetools/merchant-center-application-kit/commit/f6f3c5ebd08226fd4eca22aec5c39791cf5c5d6a)]:
  - @commercetools-frontend/application-components@17.7.1
  - @commercetools-frontend/application-shell-connectors@17.7.1
  - @commercetools-frontend/i18n@17.7.1
  - @commercetools-frontend/l10n@17.7.1
  - @commercetools-frontend/permissions@17.7.1
  - @commercetools-frontend/react-notifications@17.7.1
  - @commercetools-frontend/sentry@17.7.1
  - @commercetools-frontend/actions-global@17.7.1

## 17.7.0

### Minor Changes

- [`b9fe353`](https://github.com/commercetools/merchant-center-application-kit/commit/b9fe353046fc6998c2bb43c80609db07cb88900a) [#1922](https://github.com/commercetools/merchant-center-application-kit/pull/1922) Thanks [@emmenko](https://github.com/emmenko)! - Fetch permissions for menu links using a separate query field `allPermissionsForAllApplications`.

### Patch Changes

- [`d74addd`](https://github.com/commercetools/merchant-center-application-kit/commit/d74addd32a5f39d19d6bae1ee31cbf33a35fd04e) [#1914](https://github.com/commercetools/merchant-center-application-kit/pull/1914) Thanks [@adnasa](https://github.com/adnasa)! - add experimental application-components/product-picker, generate new types in application-config, application-shell

* [`1ec4379`](https://github.com/commercetools/merchant-center-application-kit/commit/1ec4379938b093d4444ec9e4079524c48afd4a42) [#1923](https://github.com/commercetools/merchant-center-application-kit/pull/1923) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- [`36cabfc`](https://github.com/commercetools/merchant-center-application-kit/commit/36cabfc3ff0a22a3739f1eb77520814219b2dc62) [#1933](https://github.com/commercetools/merchant-center-application-kit/pull/1933) Thanks [@pa3](https://github.com/pa3)! - Improve error message when graphql target is missing.

- Updated dependencies [[`d74addd`](https://github.com/commercetools/merchant-center-application-kit/commit/d74addd32a5f39d19d6bae1ee31cbf33a35fd04e), [`1ec4379`](https://github.com/commercetools/merchant-center-application-kit/commit/1ec4379938b093d4444ec9e4079524c48afd4a42), [`9746f4b`](https://github.com/commercetools/merchant-center-application-kit/commit/9746f4b992dd764599ca7bc7702e92b73dde739a), [`b9fe353`](https://github.com/commercetools/merchant-center-application-kit/commit/b9fe353046fc6998c2bb43c80609db07cb88900a)]:
  - @commercetools-frontend/application-components@17.7.0
  - @commercetools-frontend/application-shell-connectors@17.7.0
  - @commercetools-frontend/l10n@17.7.0
  - @commercetools-frontend/sdk@17.7.0
  - @commercetools-frontend/permissions@17.7.0

## 17.6.2

### Patch Changes

- [`1a96e83`](https://github.com/commercetools/merchant-center-application-kit/commit/1a96e831c94250e10de61dee40e682a77313445f) [#1905](https://github.com/commercetools/merchant-center-application-kit/pull/1905) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`6819edc`](https://github.com/commercetools/merchant-center-application-kit/commit/6819edc25ef7f4a4d8a30c0c27db93ee4dae187a), [`1a96e83`](https://github.com/commercetools/merchant-center-application-kit/commit/1a96e831c94250e10de61dee40e682a77313445f)]:
  - @commercetools-frontend/application-components@17.6.2
  - @commercetools-frontend/react-notifications@17.6.2
  - @commercetools-frontend/application-shell-connectors@17.6.2
  - @commercetools-frontend/i18n@17.6.2
  - @commercetools-frontend/l10n@17.6.2
  - @commercetools-frontend/permissions@17.6.2
  - @commercetools-frontend/sentry@17.6.2
  - @commercetools-frontend/actions-global@17.6.2

## 17.6.1

### Patch Changes

- [`c946eca`](https://github.com/commercetools/merchant-center-application-kit/commit/c946eca9063535f0fe8ae7be99d2097557d588d9) [#1902](https://github.com/commercetools/merchant-center-application-kit/pull/1902) Thanks [@ahmehri](https://github.com/ahmehri)! - fix(test-utils): `storeState` render option of `renderAppWithRedux` is unusable

* [`947a1cf`](https://github.com/commercetools/merchant-center-application-kit/commit/947a1cfeb62d8856a6e60e16df5cc08c53b86fe3) [#1892](https://github.com/commercetools/merchant-center-application-kit/pull/1892) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update flopflip monorepo

* Updated dependencies [[`1ef03e3`](https://github.com/commercetools/merchant-center-application-kit/commit/1ef03e30996e6e83c0f521ba9253fb7a93fed241)]:
  - @commercetools-frontend/l10n@17.6.1

## 17.6.0

### Patch Changes

- [`2287813`](https://github.com/commercetools/merchant-center-application-kit/commit/2287813c19a54b7edb7005d417c5f6a7b34cad1f) [#1871](https://github.com/commercetools/merchant-center-application-kit/pull/1871) Thanks [@emmenko](https://github.com/emmenko)! - Compile and bundle packages using [preconstruct](https://preconstruct.tools)

- Updated dependencies [[`81a274c`](https://github.com/commercetools/merchant-center-application-kit/commit/81a274c6abd5f3725e7698fa37004b9647549e41), [`2287813`](https://github.com/commercetools/merchant-center-application-kit/commit/2287813c19a54b7edb7005d417c5f6a7b34cad1f)]:
  - @commercetools-frontend/application-components@17.6.0
  - @commercetools-frontend/actions-global@17.6.0
  - @commercetools-frontend/application-shell-connectors@17.6.0
  - @commercetools-frontend/browser-history@17.6.0
  - @commercetools-frontend/constants@17.6.0
  - @commercetools-frontend/i18n@17.6.0
  - @commercetools-frontend/l10n@17.6.0
  - @commercetools-frontend/notifications@17.6.0
  - @commercetools-frontend/permissions@17.6.0
  - @commercetools-frontend/react-notifications@17.6.0
  - @commercetools-frontend/sdk@17.6.0
  - @commercetools-frontend/sentry@17.6.0
  - @commercetools-frontend/url-utils@17.6.0

## 17.5.0

### Patch Changes

- [`bf5f71e`](https://github.com/commercetools/merchant-center-application-kit/commit/bf5f71e663a91d68d777d26ed3145bc96bbf2aa4) [#1896](https://github.com/commercetools/merchant-center-application-kit/pull/1896) Thanks [@emmenko](https://github.com/emmenko)! - Update docs-kit dependencies to v11, which supports emotion v11. As a result, the appkit bundles are using the correct emotion dependencies.

- Updated dependencies [[`bf5f71e`](https://github.com/commercetools/merchant-center-application-kit/commit/bf5f71e663a91d68d777d26ed3145bc96bbf2aa4), [`a8e2202`](https://github.com/commercetools/merchant-center-application-kit/commit/a8e2202d74bb28cc90bbf51e8c46a2128229599a)]:
  - @commercetools-frontend/application-components@17.5.0
  - @commercetools-frontend/react-notifications@17.5.0
  - @commercetools-frontend/l10n@17.5.0

## 17.4.1

### Patch Changes

- [`636fc45`](https://github.com/commercetools/merchant-center-application-kit/commit/636fc45c0d53544a90b0977b2212ec3a8aec8b94) [#1887](https://github.com/commercetools/merchant-center-application-kit/pull/1887) Thanks [@adnasa](https://github.com/adnasa)! - upgrade ui-kit, which includes the new [horizontal constraint changes](https://github.com/commercetools/ui-kit/pull/1632).

* [`e2d519f`](https://github.com/commercetools/merchant-center-application-kit/commit/e2d519f8669319a60d70eddb04fbaeb5649ad638) [#1695](https://github.com/commercetools/merchant-center-application-kit/pull/1695) Thanks [@renovate](https://github.com/apps/renovate)! - Migrate to Typescript v4

- [`d832bd4`](https://github.com/commercetools/merchant-center-application-kit/commit/d832bd44c354aaf2374c0c75c9050c673998ff32) [#1876](https://github.com/commercetools/merchant-center-application-kit/pull/1876) Thanks [@renovate](https://github.com/apps/renovate)! - Migrate to emotion v11. https://emotion.sh/docs/emotion-11

* [`ec9e10f`](https://github.com/commercetools/merchant-center-application-kit/commit/ec9e10fde15351cc7cb825aaebb53cdb6e00e0d9) [#1889](https://github.com/commercetools/merchant-center-application-kit/pull/1889) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

* Updated dependencies [[`636fc45`](https://github.com/commercetools/merchant-center-application-kit/commit/636fc45c0d53544a90b0977b2212ec3a8aec8b94), [`d832bd4`](https://github.com/commercetools/merchant-center-application-kit/commit/d832bd44c354aaf2374c0c75c9050c673998ff32), [`ec9e10f`](https://github.com/commercetools/merchant-center-application-kit/commit/ec9e10fde15351cc7cb825aaebb53cdb6e00e0d9)]:
  - @commercetools-frontend/application-components@17.4.1
  - @commercetools-frontend/i18n@17.4.1
  - @commercetools-frontend/react-notifications@17.4.1
  - @commercetools-frontend/application-shell-connectors@17.4.1
  - @commercetools-frontend/permissions@17.4.1
  - @commercetools-frontend/sentry@17.4.1
  - @commercetools-frontend/l10n@17.4.1

## 17.4.0

### Minor Changes

- [`b742780`](https://github.com/commercetools/merchant-center-application-kit/commit/b742780a8b0b2d165b49a30cf93aaac3047a93c8) [#1881](https://github.com/commercetools/merchant-center-application-kit/pull/1881) Thanks [@stephsprinkle](https://github.com/stephsprinkle)! - feat(navbar): add clock with arrow icon to available application icons

## 17.3.1

### Patch Changes

- [`89c4464`](https://github.com/commercetools/merchant-center-application-kit/commit/89c4464c334dd6c3922d031872286ad3bea8cf67) [#1872](https://github.com/commercetools/merchant-center-application-kit/pull/1872) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

- Updated dependencies [[`bb492fd`](https://github.com/commercetools/merchant-center-application-kit/commit/bb492fd5e79642d6ddf2501b8f62dd3e3f09a538), [`89c4464`](https://github.com/commercetools/merchant-center-application-kit/commit/89c4464c334dd6c3922d031872286ad3bea8cf67)]:
  - @commercetools-frontend/actions-global@17.3.1
  - @commercetools-frontend/application-components@17.3.1
  - @commercetools-frontend/application-shell-connectors@17.3.1
  - @commercetools-frontend/i18n@17.3.1
  - @commercetools-frontend/l10n@17.3.1
  - @commercetools-frontend/react-notifications@17.3.1
  - @commercetools-frontend/sentry@17.3.1
  - @commercetools-frontend/permissions@17.3.1

## 17.3.0

### Minor Changes

- [`cefef43`](https://github.com/commercetools/merchant-center-application-kit/commit/cefef435e646e7c91dcf41c0f8ff7b94b5a7f3c8) [#1869](https://github.com/commercetools/merchant-center-application-kit/pull/1869) Thanks [@fuchodeveloper](https://github.com/fuchodeveloper)! - add user business role custom dimension tracking

### Patch Changes

- [`71c9111`](https://github.com/commercetools/merchant-center-application-kit/commit/71c9111308832009d1a27e91e4f2d2da4c53367c) [#1866](https://github.com/commercetools/merchant-center-application-kit/pull/1866) Thanks [@emmenko](https://github.com/emmenko)! - Update to uikit v10.39.8

- Updated dependencies [[`cefef43`](https://github.com/commercetools/merchant-center-application-kit/commit/cefef435e646e7c91dcf41c0f8ff7b94b5a7f3c8), [`71c9111`](https://github.com/commercetools/merchant-center-application-kit/commit/71c9111308832009d1a27e91e4f2d2da4c53367c)]:
  - @commercetools-frontend/application-shell-connectors@17.3.0
  - @commercetools-frontend/actions-global@17.3.0
  - @commercetools-frontend/application-components@17.3.0
  - @commercetools-frontend/assets@17.3.0
  - @commercetools-frontend/browser-history@17.3.0
  - @commercetools-frontend/constants@17.3.0
  - @commercetools-frontend/i18n@17.3.0
  - @commercetools-frontend/l10n@17.3.0
  - @commercetools-frontend/notifications@17.3.0
  - @commercetools-frontend/permissions@17.3.0
  - @commercetools-frontend/react-notifications@17.3.0
  - @commercetools-frontend/sdk@17.3.0
  - @commercetools-frontend/sentry@17.3.0
  - @commercetools-frontend/url-utils@17.3.0

## 17.2.1

### Patch Changes

- [`310e98c`](https://github.com/commercetools/merchant-center-application-kit/commit/310e98c39c0b6479175b7685b3f29ea0a5baa22b) Thanks [@emmenko](https://github.com/emmenko)! - Update dependencies (https://github.com/commercetools/merchant-center-application-kit/pull/1857)

- Updated dependencies [[`310e98c`](https://github.com/commercetools/merchant-center-application-kit/commit/310e98c39c0b6479175b7685b3f29ea0a5baa22b)]:
  - @commercetools-frontend/actions-global@17.2.1
  - @commercetools-frontend/application-components@17.2.1
  - @commercetools-frontend/application-shell-connectors@17.2.1
  - @commercetools-frontend/browser-history@17.2.1
  - @commercetools-frontend/constants@17.2.1
  - @commercetools-frontend/i18n@17.2.1
  - @commercetools-frontend/l10n@17.2.1
  - @commercetools-frontend/notifications@17.2.1
  - @commercetools-frontend/permissions@17.2.1
  - @commercetools-frontend/react-notifications@17.2.1
  - @commercetools-frontend/sdk@17.2.1
  - @commercetools-frontend/sentry@17.2.1
  - @commercetools-frontend/url-utils@17.2.1

## 17.2.0

### Minor Changes

- [`5967db7`](https://github.com/commercetools/merchant-center-application-kit/commit/5967db7fe27c0b322de96067ae19de7225a9aaec) [#1850](https://github.com/commercetools/merchant-center-application-kit/pull/1850) Thanks [@adnasa](https://github.com/adnasa)! - expand `FetchProjectExtensionsNavbar` to query `installedApplications`

### Patch Changes

- [`e0ec004`](https://github.com/commercetools/merchant-center-application-kit/commit/e0ec004d611f93b24f015120d09f6f18389b219f) [#1854](https://github.com/commercetools/merchant-center-application-kit/pull/1854) Thanks [@emmenko](https://github.com/emmenko)! - chore: update deps

- Updated dependencies [[`5967db7`](https://github.com/commercetools/merchant-center-application-kit/commit/5967db7fe27c0b322de96067ae19de7225a9aaec), [`e0ec004`](https://github.com/commercetools/merchant-center-application-kit/commit/e0ec004d611f93b24f015120d09f6f18389b219f), [`e519929`](https://github.com/commercetools/merchant-center-application-kit/commit/e519929415f225ff28731f068bebb8facad868f8)]:
  - @commercetools-frontend/application-shell-connectors@17.2.0
  - @commercetools-frontend/actions-global@17.2.0
  - @commercetools-frontend/application-components@17.2.0
  - @commercetools-frontend/assets@17.2.0
  - @commercetools-frontend/browser-history@17.2.0
  - @commercetools-frontend/constants@17.2.0
  - @commercetools-frontend/i18n@17.2.0
  - @commercetools-frontend/l10n@17.2.0
  - @commercetools-frontend/notifications@17.2.0
  - @commercetools-frontend/permissions@17.2.0
  - @commercetools-frontend/react-notifications@17.2.0
  - @commercetools-frontend/sdk@17.2.0
  - @commercetools-frontend/sentry@17.2.0
  - @commercetools-frontend/url-utils@17.2.0

## 17.1.1

### Patch Changes

- [`bacc091`](https://github.com/commercetools/merchant-center-application-kit/commit/bacc091506dedb58fadaa4008fc93381a5e9b212) [#1836](https://github.com/commercetools/merchant-center-application-kit/pull/1836) Thanks [@emmenko](https://github.com/emmenko)! - Always infer MC API URL from origin when running behind the MC Proxy.

- Updated dependencies [[`bacc091`](https://github.com/commercetools/merchant-center-application-kit/commit/bacc091506dedb58fadaa4008fc93381a5e9b212)]:
  - @commercetools-frontend/application-shell-connectors@17.1.1
  - @commercetools-frontend/constants@17.1.1
  - @commercetools-frontend/sdk@17.1.1
  - @commercetools-frontend/permissions@17.1.1
  - @commercetools-frontend/actions-global@17.1.1
  - @commercetools-frontend/application-components@17.1.1
  - @commercetools-frontend/react-notifications@17.1.1
  - @commercetools-frontend/sentry@17.1.1
  - @commercetools-frontend/i18n@17.1.1
  - @commercetools-frontend/l10n@17.1.1

## 17.1.0

### Minor Changes

- [`323cf6b`](https://github.com/commercetools/merchant-center-application-kit/commit/323cf6bb0fba41510947287dd18b346cda6f0833) [#1816](https://github.com/commercetools/merchant-center-application-kit/pull/1816) Thanks [@ahmehri](https://github.com/ahmehri)! - Fix wrong navigation when using Quick Access Product commands

### Patch Changes

- [`6059b9a`](https://github.com/commercetools/merchant-center-application-kit/commit/6059b9af35fbee646d008c393578c83795f10b4f) [#1835](https://github.com/commercetools/merchant-center-application-kit/pull/1835) Thanks [@nbryant-commercetools](https://github.com/nbryant-commercetools)! - Addition of new change history GraphQL Target

- Updated dependencies [[`5d9d5da`](https://github.com/commercetools/merchant-center-application-kit/commit/5d9d5da44364fe5590b67be21ac3630e177326e3), [`6059b9a`](https://github.com/commercetools/merchant-center-application-kit/commit/6059b9af35fbee646d008c393578c83795f10b4f)]:
  - @commercetools-frontend/i18n@17.1.0
  - @commercetools-frontend/sentry@17.1.0
  - @commercetools-frontend/constants@17.1.0
  - @commercetools-frontend/application-components@17.1.0
  - @commercetools-frontend/application-shell-connectors@17.1.0
  - @commercetools-frontend/l10n@17.1.0
  - @commercetools-frontend/react-notifications@17.1.0
  - @commercetools-frontend/actions-global@17.1.0
  - @commercetools-frontend/sdk@17.1.0
  - @commercetools-frontend/permissions@17.1.0

## 17.0.1

### Patch Changes

- [`bea3005`](https://github.com/commercetools/merchant-center-application-kit/commit/bea30056b43fdb782251956acb5829abcd91e836) [#1815](https://github.com/commercetools/merchant-center-application-kit/pull/1815) Thanks [@emmenko](https://github.com/emmenko)! - In `test-utils` of the ApplicationShell, passing a custom instance of `apolloClient` now correctly passes the `cache` object to the Apollo `MockedProvider`. See https://www.apollographql.com/docs/react/development-testing/testing/#a-note-on-fragment-usage-typepolicies-and-possibletypes.

  Furthermore, the `addTypename` option is no longer available in the `test-utils`, as the value is derived by the Apollo cache object. This is important to ensure that the `addTypename` behavior is the same between the Apollo cache and the Apollo `MockedProvider`.

  If you wish to disable adding `__typename` fields to the query, you must specify `addTypename: false` to your custom instance of the Apollo client.

  ```js
  import { createApolloClient } from '@commercetools-frontend/application-shell';

  createApolloClient({
    cache: {
      addTypename: false,
    },
  });
  ```

* [`71c5f78`](https://github.com/commercetools/merchant-center-application-kit/commit/71c5f7875c7476e34b65d37046d48ca47e96f12e) [#1795](https://github.com/commercetools/merchant-center-application-kit/pull/1795) Thanks [@renovate](https://github.com/apps/renovate)! - update dependencies

- [`8111543`](https://github.com/commercetools/merchant-center-application-kit/commit/8111543a5d3e923c9c754b34290c899698910825) [#1809](https://github.com/commercetools/merchant-center-application-kit/pull/1809) Thanks [@emmenko](https://github.com/emmenko)! - Fix default cache policies for applications menu items

- Updated dependencies [[`f5125b8`](https://github.com/commercetools/merchant-center-application-kit/commit/f5125b8061cb624f950916909e4cb7b0f35594ad), [`71c5f78`](https://github.com/commercetools/merchant-center-application-kit/commit/71c5f7875c7476e34b65d37046d48ca47e96f12e)]:
  - @commercetools-frontend/sentry@17.0.1
  - @commercetools-frontend/actions-global@17.0.1
  - @commercetools-frontend/application-components@17.0.1
  - @commercetools-frontend/application-shell-connectors@17.0.1
  - @commercetools-frontend/browser-history@17.0.1
  - @commercetools-frontend/constants@17.0.1
  - @commercetools-frontend/i18n@17.0.1
  - @commercetools-frontend/l10n@17.0.1
  - @commercetools-frontend/notifications@17.0.1
  - @commercetools-frontend/permissions@17.0.1
  - @commercetools-frontend/react-notifications@17.0.1
  - @commercetools-frontend/sdk@17.0.1
  - @commercetools-frontend/url-utils@17.0.1

## 17.0.0

### Major Changes

- [`0e0efc6`](https://github.com/commercetools/merchant-center-application-kit/commit/0e0efc68e93621209f8ee84ebc920b79431c704a) [#1805](https://github.com/commercetools/merchant-center-application-kit/pull/1805) Thanks [@emmenko](https://github.com/emmenko)! - remove deprecated `compile-html` options

* [`80b7936`](https://github.com/commercetools/merchant-center-application-kit/commit/80b793610027fc6c1708f457d030354265beabca) [#1805](https://github.com/commercetools/merchant-center-application-kit/pull/1805) Thanks [@emmenko](https://github.com/emmenko)! - Remove the experimental render method `experimentalRenderAppWithRedux` from the `test-utils`.

  Instead, you should pass the `disableApolloMocks` option to the `renderApp` and `renderAppWithRedux` methods. When this option is set to `true`, the real `ApolloProvider` is rendered instead of Apollo's `MockProvider`.
  This is useful if you want to mock requests at the network level, for example when using [Mock Service Worker](https://mswjs.io/).

  Additionally, you can also pass a custom `apolloClient` instance together with the `disableApolloMocks` option. This is only useful when your Custom Application uses a custom `apolloClient`, for example for configuring the cache policies.

- [`e706232`](https://github.com/commercetools/merchant-center-application-kit/commit/e706232c152f3fed9cf44c10a0c4f25b27448a16) [#1805](https://github.com/commercetools/merchant-center-application-kit/pull/1805) Thanks [@emmenko](https://github.com/emmenko)! - Remove `mc-scripts extract-intl` command in favor of the official `@formatjs/cli` package.
  We recommend to update your script to extract Intl messages to use the `formatjs extract` command.

  See full release notes: https://docs.commercetools.com/custom-applications/releases/2020-10-14-custom-applications-v17

* [`873048b`](https://github.com/commercetools/merchant-center-application-kit/commit/873048b1c288ca85a37cf26f7d5d2b10879cfd64) [#1805](https://github.com/commercetools/merchant-center-application-kit/pull/1805) Thanks [@emmenko](https://github.com/emmenko)! - Migrate Apollo dependencies to `@apollo/client` package.

  See full release notes: https://docs.commercetools.com/custom-applications/releases/2020-10-14-custom-applications-v17

- [`65f21a1`](https://github.com/commercetools/merchant-center-application-kit/commit/65f21a158d32f5759f109035b02aa78569fcad13) [#1805](https://github.com/commercetools/merchant-center-application-kit/pull/1805) Thanks [@emmenko](https://github.com/emmenko)! - remove support for `trackingEventWhitelist`

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

- [`6e86c36`](https://github.com/commercetools/merchant-center-application-kit/commit/6e86c36a20a597cca81d121ce80cc1c47f8a961f) [#1805](https://github.com/commercetools/merchant-center-application-kit/pull/1805) Thanks [@emmenko](https://github.com/emmenko)! - remove deprecated exports `AsyncChunkLoader` and `handleApolloErrors`

### Patch Changes

- [`d883e96`](https://github.com/commercetools/merchant-center-application-kit/commit/d883e96ffd076788256d33d833e7f69ffc39f3ac) [#1802](https://github.com/commercetools/merchant-center-application-kit/pull/1802) Thanks [@tdeekens](https://github.com/tdeekens)! - refactor(app-shell): to remove disabbledMenuItems support

* [`633d8c7`](https://github.com/commercetools/merchant-center-application-kit/commit/633d8c7b8ddc2f25128d8249579b7bb287a62e30) [#1805](https://github.com/commercetools/merchant-center-application-kit/pull/1805) Thanks [@emmenko](https://github.com/emmenko)! - update deps

* Updated dependencies [[`e706232`](https://github.com/commercetools/merchant-center-application-kit/commit/e706232c152f3fed9cf44c10a0c4f25b27448a16), [`873048b`](https://github.com/commercetools/merchant-center-application-kit/commit/873048b1c288ca85a37cf26f7d5d2b10879cfd64), [`d883e96`](https://github.com/commercetools/merchant-center-application-kit/commit/d883e96ffd076788256d33d833e7f69ffc39f3ac), [`633d8c7`](https://github.com/commercetools/merchant-center-application-kit/commit/633d8c7b8ddc2f25128d8249579b7bb287a62e30), [`633d8c7`](https://github.com/commercetools/merchant-center-application-kit/commit/633d8c7b8ddc2f25128d8249579b7bb287a62e30)]:
  - @commercetools-frontend/application-shell-connectors@17.0.0
  - @commercetools-frontend/constants@17.0.0
  - @commercetools-frontend/application-components@17.0.0
  - @commercetools-frontend/i18n@17.0.0
  - @commercetools-frontend/react-notifications@17.0.0
  - @commercetools-frontend/sdk@17.0.0
  - @commercetools-frontend/sentry@17.0.0
  - @commercetools-frontend/permissions@17.0.0
  - @commercetools-frontend/actions-global@17.0.0
  - @commercetools-frontend/l10n@17.0.0

## 16.18.2

### Patch Changes

- [`3de5acc`](https://github.com/commercetools/merchant-center-application-kit/commit/3de5accab54a565a74fbfbdf5cd2a71482b3026e) [#1801](https://github.com/commercetools/merchant-center-application-kit/pull/1801) Thanks [@emmenko](https://github.com/emmenko)! - Send graphql operation name as HTTP header, for debugging purposes

## 16.18.1

### Patch Changes

- [`3fd4aa2`](https://github.com/commercetools/merchant-center-application-kit/commit/3fd4aa2e7ac935bf75daaceacaf1b77dada7afe6) [#1788](https://github.com/commercetools/merchant-center-application-kit/pull/1788) Thanks [@jonnybel](https://github.com/jonnybel)! - Improved keyboard navigation on the user settings menu.

## 16.18.0

### Minor Changes

- [`78418b9`](https://github.com/commercetools/merchant-center-application-kit/commit/78418b9db14014c7d9c03c8e754ee9d2adb7ffb7) [#1784](https://github.com/commercetools/merchant-center-application-kit/pull/1784) Thanks [@fuchodeveloper](https://github.com/fuchodeveloper)! - Expose `user.businessRole` to application context

### Patch Changes

- [`8cdb025`](https://github.com/commercetools/merchant-center-application-kit/commit/8cdb02591b718406c910a2c4128d4be3dfe24785) [#1776](https://github.com/commercetools/merchant-center-application-kit/pull/1776) Thanks [@renovate](https://github.com/apps/renovate)! - update deps

* [`290ed48`](https://github.com/commercetools/merchant-center-application-kit/commit/290ed483e9a93adf1cf7863d766ad8237735dfca) [#1777](https://github.com/commercetools/merchant-center-application-kit/pull/1777) Thanks [@renovate](https://github.com/apps/renovate)! - Remove unused dependency `jwt-decode`

* Updated dependencies [[`78418b9`](https://github.com/commercetools/merchant-center-application-kit/commit/78418b9db14014c7d9c03c8e754ee9d2adb7ffb7), [`8cdb025`](https://github.com/commercetools/merchant-center-application-kit/commit/8cdb02591b718406c910a2c4128d4be3dfe24785)]:
  - @commercetools-frontend/application-shell-connectors@16.18.0
  - @commercetools-frontend/permissions@16.18.0
  - @commercetools-frontend/application-components@16.18.0
  - @commercetools-frontend/i18n@16.18.0
  - @commercetools-frontend/react-notifications@16.18.0
  - @commercetools-frontend/sdk@16.18.0
  - @commercetools-frontend/sentry@16.18.0
  - @commercetools-frontend/l10n@16.18.0

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
