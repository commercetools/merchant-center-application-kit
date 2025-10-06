# @commercetools-applications/merchant-center-custom-view-template-starter-typescript

## 24.8.0

### Minor Changes

- [#3851](https://github.com/commercetools/merchant-center-application-kit/pull/3851) [`ac4943c`](https://github.com/commercetools/merchant-center-application-kit/commit/ac4943cc0c5fb3c690f9d8a939a80c94391cd87c) Thanks [@ByronDWall](https://github.com/ByronDWall)! - Update UI Kit versions to `^20.2.3`. Update MSW to `1.3.5`.

### Patch Changes

- [#3857](https://github.com/commercetools/merchant-center-application-kit/pull/3857) [`f457ed3`](https://github.com/commercetools/merchant-center-application-kit/commit/f457ed3609e82d73ddf2f07d16360d4b8ff7e7f6) Thanks [@jaikamat](https://github.com/jaikamat)! - Migrate from deprecated `eslint-plugin-graphql` to `@graphql-eslint/eslint-plugin` for graphql@16 compatibility. This change provides functional parity with the previous linting behavior while supporting modern GraphQL tooling.

  **For consumers using graphql@16:** This change enables compatibility with graphql@16 and resolves peer dependency conflicts. The new plugin provides equivalent validation of GraphQL queries against schemas.

  **Migration not required:** Existing consumer projects can continue using their current ESLint configuration. Migration is only needed if encountering graphql peer dependency conflicts (e.g., when adopting Redux 5.x or graphql@16 for other reasons).

- [#3639](https://github.com/commercetools/merchant-center-application-kit/pull/3639) [`f2d1596`](https://github.com/commercetools/merchant-center-application-kit/commit/f2d1596c3b8d88105b543e8c2a7c76062549f74a) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies to latest minor versions, see https://github.com/commercetools/merchant-center-application-kit/pull/3639 for details

- Updated dependencies [[`4e2364d`](https://github.com/commercetools/merchant-center-application-kit/commit/4e2364d85ce294a799d83f47c67c8eb40b8aa234), [`ac4943c`](https://github.com/commercetools/merchant-center-application-kit/commit/ac4943cc0c5fb3c690f9d8a939a80c94391cd87c), [`f2d1596`](https://github.com/commercetools/merchant-center-application-kit/commit/f2d1596c3b8d88105b543e8c2a7c76062549f74a), [`4309403`](https://github.com/commercetools/merchant-center-application-kit/commit/430940370f709eadb6e202683772ddb1467bf212)]:
  - @commercetools-frontend/mc-scripts@24.8.0
  - @commercetools-frontend/application-shell-connectors@24.8.0
  - @commercetools-frontend/application-components@24.8.0
  - @commercetools-frontend/application-shell@24.8.0
  - @commercetools-frontend/i18n@24.8.0
  - @commercetools-frontend/eslint-config-mc-app@24.8.0
  - @commercetools-frontend/application-config@24.8.0
  - @commercetools-frontend/jest-preset-mc-app@24.8.0
  - @commercetools-frontend/l10n@24.8.0
  - @commercetools-frontend/actions-global@24.8.0
  - @commercetools-frontend/permissions@24.8.0
  - @commercetools-frontend/mc-dev-authentication@24.8.0
  - @commercetools-frontend/assets@24.8.0
  - @commercetools-frontend/babel-preset-mc-app@24.8.0
  - @commercetools-frontend/constants@24.8.0

## 24.7.2

### Patch Changes

- Updated dependencies [[`d81f5d5`](https://github.com/commercetools/merchant-center-application-kit/commit/d81f5d5bf0fd51f9454571066b556fdfa7e31145)]:
  - @commercetools-frontend/mc-dev-authentication@24.7.2
  - @commercetools-frontend/mc-scripts@24.7.2
  - @commercetools-frontend/actions-global@24.7.2
  - @commercetools-frontend/application-components@24.7.2
  - @commercetools-frontend/application-config@24.7.2
  - @commercetools-frontend/application-shell@24.7.2
  - @commercetools-frontend/application-shell-connectors@24.7.2
  - @commercetools-frontend/assets@24.7.2
  - @commercetools-frontend/babel-preset-mc-app@24.7.2
  - @commercetools-frontend/constants@24.7.2
  - @commercetools-frontend/eslint-config-mc-app@24.7.2
  - @commercetools-frontend/i18n@24.7.2
  - @commercetools-frontend/jest-preset-mc-app@24.7.2
  - @commercetools-frontend/l10n@24.7.2
  - @commercetools-frontend/permissions@24.7.2

## 24.7.1

### Patch Changes

- Updated dependencies [[`bc07e1c`](https://github.com/commercetools/merchant-center-application-kit/commit/bc07e1cd4eb389251f12f3d77a8030fac02dd96a)]:
  - @commercetools-frontend/application-config@24.7.1
  - @commercetools-frontend/application-components@24.7.1
  - @commercetools-frontend/application-shell@24.7.1
  - @commercetools-frontend/application-shell-connectors@24.7.1
  - @commercetools-frontend/mc-dev-authentication@24.7.1
  - @commercetools-frontend/mc-scripts@24.7.1
  - @commercetools-frontend/permissions@24.7.1
  - @commercetools-frontend/actions-global@24.7.1
  - @commercetools-frontend/assets@24.7.1
  - @commercetools-frontend/babel-preset-mc-app@24.7.1
  - @commercetools-frontend/constants@24.7.1
  - @commercetools-frontend/eslint-config-mc-app@24.7.1
  - @commercetools-frontend/i18n@24.7.1
  - @commercetools-frontend/jest-preset-mc-app@24.7.1
  - @commercetools-frontend/l10n@24.7.1

## 24.7.0

### Patch Changes

- Updated dependencies [[`3250152`](https://github.com/commercetools/merchant-center-application-kit/commit/3250152cb59557f45973cfc4b04f806550e7e8d5), [`a9068f6`](https://github.com/commercetools/merchant-center-application-kit/commit/a9068f69d8feae5226bc10697a5c9c544c1e35ba), [`48beb10`](https://github.com/commercetools/merchant-center-application-kit/commit/48beb10a050ad667a1b72d00919bcd089e0a9b28)]:
  - @commercetools-frontend/mc-scripts@24.7.0
  - @commercetools-frontend/actions-global@24.7.0
  - @commercetools-frontend/application-components@24.7.0
  - @commercetools-frontend/application-config@24.7.0
  - @commercetools-frontend/application-shell@24.7.0
  - @commercetools-frontend/application-shell-connectors@24.7.0
  - @commercetools-frontend/assets@24.7.0
  - @commercetools-frontend/babel-preset-mc-app@24.7.0
  - @commercetools-frontend/constants@24.7.0
  - @commercetools-frontend/eslint-config-mc-app@24.7.0
  - @commercetools-frontend/i18n@24.7.0
  - @commercetools-frontend/jest-preset-mc-app@24.7.0
  - @commercetools-frontend/l10n@24.7.0
  - @commercetools-frontend/mc-dev-authentication@24.7.0
  - @commercetools-frontend/permissions@24.7.0

## 24.6.0

### Patch Changes

- Updated dependencies [[`8b1d8fc`](https://github.com/commercetools/merchant-center-application-kit/commit/8b1d8fcc95c1b6e5503ab4fafbfd80c06645e50a)]:
  - @commercetools-frontend/mc-scripts@24.6.0
  - @commercetools-frontend/actions-global@24.6.0
  - @commercetools-frontend/application-components@24.6.0
  - @commercetools-frontend/application-config@24.6.0
  - @commercetools-frontend/application-shell@24.6.0
  - @commercetools-frontend/application-shell-connectors@24.6.0
  - @commercetools-frontend/assets@24.6.0
  - @commercetools-frontend/babel-preset-mc-app@24.6.0
  - @commercetools-frontend/constants@24.6.0
  - @commercetools-frontend/eslint-config-mc-app@24.6.0
  - @commercetools-frontend/i18n@24.6.0
  - @commercetools-frontend/jest-preset-mc-app@24.6.0
  - @commercetools-frontend/l10n@24.6.0
  - @commercetools-frontend/mc-dev-authentication@24.6.0
  - @commercetools-frontend/permissions@24.6.0

## 24.5.0

### Patch Changes

- Updated dependencies []:
  - @commercetools-frontend/actions-global@24.5.0
  - @commercetools-frontend/application-components@24.5.0
  - @commercetools-frontend/application-config@24.5.0
  - @commercetools-frontend/application-shell@24.5.0
  - @commercetools-frontend/application-shell-connectors@24.5.0
  - @commercetools-frontend/assets@24.5.0
  - @commercetools-frontend/babel-preset-mc-app@24.5.0
  - @commercetools-frontend/constants@24.5.0
  - @commercetools-frontend/eslint-config-mc-app@24.5.0
  - @commercetools-frontend/i18n@24.5.0
  - @commercetools-frontend/jest-preset-mc-app@24.5.0
  - @commercetools-frontend/l10n@24.5.0
  - @commercetools-frontend/mc-dev-authentication@24.5.0
  - @commercetools-frontend/mc-scripts@24.5.0
  - @commercetools-frontend/permissions@24.5.0

## 24.4.0

### Patch Changes

- Updated dependencies [[`c3a39e4`](https://github.com/commercetools/merchant-center-application-kit/commit/c3a39e48a295f962744361b0e2edc4ce64101036)]:
  - @commercetools-frontend/application-shell@24.4.0
  - @commercetools-frontend/actions-global@24.4.0
  - @commercetools-frontend/application-components@24.4.0
  - @commercetools-frontend/application-config@24.4.0
  - @commercetools-frontend/application-shell-connectors@24.4.0
  - @commercetools-frontend/assets@24.4.0
  - @commercetools-frontend/babel-preset-mc-app@24.4.0
  - @commercetools-frontend/constants@24.4.0
  - @commercetools-frontend/eslint-config-mc-app@24.4.0
  - @commercetools-frontend/i18n@24.4.0
  - @commercetools-frontend/jest-preset-mc-app@24.4.0
  - @commercetools-frontend/l10n@24.4.0
  - @commercetools-frontend/mc-dev-authentication@24.4.0
  - @commercetools-frontend/mc-scripts@24.4.0
  - @commercetools-frontend/permissions@24.4.0

## 24.3.0

### Patch Changes

- Updated dependencies [[`81978c4`](https://github.com/commercetools/merchant-center-application-kit/commit/81978c43382bfa016166f0b53559aff0edc17b86), [`81e9331`](https://github.com/commercetools/merchant-center-application-kit/commit/81e93311e89d898d881ceb82726d850faae931e9), [`bfafe16`](https://github.com/commercetools/merchant-center-application-kit/commit/bfafe1627b2faf24d274699a978e4f7ac2224b9b), [`77f85fc`](https://github.com/commercetools/merchant-center-application-kit/commit/77f85fced3ef6f7c95d505fa84f98d3f10a41b0e)]:
  - @commercetools-frontend/application-components@24.3.0
  - @commercetools-frontend/application-shell-connectors@24.3.0
  - @commercetools-frontend/constants@24.3.0
  - @commercetools-frontend/application-shell@24.3.0
  - @commercetools-frontend/i18n@24.3.0
  - @commercetools-frontend/mc-scripts@24.3.0
  - @commercetools-frontend/permissions@24.3.0
  - @commercetools-frontend/actions-global@24.3.0
  - @commercetools-frontend/application-config@24.3.0
  - @commercetools-frontend/mc-dev-authentication@24.3.0
  - @commercetools-frontend/l10n@24.3.0
  - @commercetools-frontend/assets@24.3.0
  - @commercetools-frontend/babel-preset-mc-app@24.3.0
  - @commercetools-frontend/eslint-config-mc-app@24.3.0
  - @commercetools-frontend/jest-preset-mc-app@24.3.0

## 24.2.1

### Patch Changes

- Updated dependencies [[`ef412d3`](https://github.com/commercetools/merchant-center-application-kit/commit/ef412d32566babaf33450eed2064cc21af75fc0d), [`ac88e0d`](https://github.com/commercetools/merchant-center-application-kit/commit/ac88e0d161356443986a5d39708f8c9a546cd3ad), [`3441474`](https://github.com/commercetools/merchant-center-application-kit/commit/34414749f50e82cf70cf68b6e00552e57c4a8094)]:
  - @commercetools-frontend/application-shell@24.2.1
  - @commercetools-frontend/i18n@24.2.1
  - @commercetools-frontend/application-components@24.2.1
  - @commercetools-frontend/mc-scripts@24.2.1
  - @commercetools-frontend/actions-global@24.2.1
  - @commercetools-frontend/application-config@24.2.1
  - @commercetools-frontend/application-shell-connectors@24.2.1
  - @commercetools-frontend/assets@24.2.1
  - @commercetools-frontend/babel-preset-mc-app@24.2.1
  - @commercetools-frontend/constants@24.2.1
  - @commercetools-frontend/eslint-config-mc-app@24.2.1
  - @commercetools-frontend/jest-preset-mc-app@24.2.1
  - @commercetools-frontend/l10n@24.2.1
  - @commercetools-frontend/mc-dev-authentication@24.2.1
  - @commercetools-frontend/permissions@24.2.1

## 24.2.0

### Patch Changes

- Updated dependencies [[`b860435`](https://github.com/commercetools/merchant-center-application-kit/commit/b860435b2a1a0c91fe9b2c0360ef00df652e8613), [`8e81d6c`](https://github.com/commercetools/merchant-center-application-kit/commit/8e81d6cf007dafb9538f4264203d44b1814837dd), [`dabb5fe`](https://github.com/commercetools/merchant-center-application-kit/commit/dabb5febfb445425d146d646a59c83a360294362)]:
  - @commercetools-frontend/application-shell@24.2.0
  - @commercetools-frontend/application-components@24.2.0
  - @commercetools-frontend/mc-scripts@24.2.0
  - @commercetools-frontend/actions-global@24.2.0
  - @commercetools-frontend/application-config@24.2.0
  - @commercetools-frontend/application-shell-connectors@24.2.0
  - @commercetools-frontend/assets@24.2.0
  - @commercetools-frontend/babel-preset-mc-app@24.2.0
  - @commercetools-frontend/constants@24.2.0
  - @commercetools-frontend/eslint-config-mc-app@24.2.0
  - @commercetools-frontend/i18n@24.2.0
  - @commercetools-frontend/jest-preset-mc-app@24.2.0
  - @commercetools-frontend/l10n@24.2.0
  - @commercetools-frontend/mc-dev-authentication@24.2.0
  - @commercetools-frontend/permissions@24.2.0

## 24.1.0

### Patch Changes

- Updated dependencies [[`1d2f3b8`](https://github.com/commercetools/merchant-center-application-kit/commit/1d2f3b827784e12806aba40d974314eedf33d644)]:
  - @commercetools-frontend/application-shell@24.1.0
  - @commercetools-frontend/actions-global@24.1.0
  - @commercetools-frontend/application-components@24.1.0
  - @commercetools-frontend/application-config@24.1.0
  - @commercetools-frontend/application-shell-connectors@24.1.0
  - @commercetools-frontend/assets@24.1.0
  - @commercetools-frontend/babel-preset-mc-app@24.1.0
  - @commercetools-frontend/constants@24.1.0
  - @commercetools-frontend/eslint-config-mc-app@24.1.0
  - @commercetools-frontend/i18n@24.1.0
  - @commercetools-frontend/jest-preset-mc-app@24.1.0
  - @commercetools-frontend/l10n@24.1.0
  - @commercetools-frontend/mc-dev-authentication@24.1.0
  - @commercetools-frontend/mc-scripts@24.1.0
  - @commercetools-frontend/permissions@24.1.0

## 24.0.0

### Major Changes

- [#3687](https://github.com/commercetools/merchant-center-application-kit/pull/3687) [`552de5e`](https://github.com/commercetools/merchant-center-application-kit/commit/552de5e6d40bd9d7f1b5d51ea4892ad1a2a448ae) Thanks [@kark](https://github.com/kark)! - Upgrade UI Kit to React 19.

  From this version onwards, this is the minimum version an application using this library should be depending on.

### Patch Changes

- Updated dependencies [[`552de5e`](https://github.com/commercetools/merchant-center-application-kit/commit/552de5e6d40bd9d7f1b5d51ea4892ad1a2a448ae)]:
  - @commercetools-frontend/application-shell-connectors@24.0.0
  - @commercetools-frontend/application-components@24.0.0
  - @commercetools-frontend/application-config@24.0.0
  - @commercetools-frontend/jest-preset-mc-app@24.0.0
  - @commercetools-frontend/application-shell@24.0.0
  - @commercetools-frontend/actions-global@24.0.0
  - @commercetools-frontend/permissions@24.0.0
  - @commercetools-frontend/i18n@24.0.0
  - @commercetools-frontend/l10n@24.0.0
  - @commercetools-frontend/assets@24.0.0
  - @commercetools-frontend/babel-preset-mc-app@24.0.0
  - @commercetools-frontend/constants@24.0.0
  - @commercetools-frontend/eslint-config-mc-app@24.0.0
  - @commercetools-frontend/mc-dev-authentication@24.0.0
  - @commercetools-frontend/mc-scripts@24.0.0

## 23.4.0

### Minor Changes

- [#3772](https://github.com/commercetools/merchant-center-application-kit/pull/3772) [`e5401d8`](https://github.com/commercetools/merchant-center-application-kit/commit/e5401d82ce6d20828dbd99f1156b54538d4ab86f) Thanks [@emmenko](https://github.com/emmenko)! - Updates to the starter templates: migrate test data packages `@commercetools-test-data/*` to new standalone package `@commercetools/composable-commerce-test-data`.

  The packages `@commercetools-test-data/*` are considered deprecated and won't be published anymore.
  We now have a single package `@commercetools/composable-commerce-test-data` that contains all the test data models.

  The package is configured to be consumed using named entry points to be compatible with the previous individual packages and to help keeping the bundle size for consumers to a minimum.

  For example:

  ```ts
  // Before
  import { ChannelGraphql } from '@commercetools-test-data/channel';

  // After
  import { ChannelGraphql } from '@commercetools/composable-commerce-test-data/channel';
  ```

  To facilitate the migration, we provide a codemod script [transform-imports.mjs](https://github.com/commercetools/test-data/blob/main/scripts/transform-imports.mjs) to be executed in your repository that you need to migrate.

  You can use the following command:

  ```
  curl -sSL https://raw.githubusercontent.com/commercetools/test-data/main/scripts/transform-imports.mjs | node -
  ```

  Alternatively, copy the script content and create a new script file in your repository. Then execute the script with `node`.
  See JSDoc inside the script for more information.

### Patch Changes

- Updated dependencies [[`c5ef4aa`](https://github.com/commercetools/merchant-center-application-kit/commit/c5ef4aa09143e45b5499afcd1a1863e18ace5619), [`96c7db1`](https://github.com/commercetools/merchant-center-application-kit/commit/96c7db1c8bf57adc1042efc7aacc696dfb102d0d), [`57ba68c`](https://github.com/commercetools/merchant-center-application-kit/commit/57ba68c0f7a63b40f11ad41023d1fc207072a1f4), [`57ba68c`](https://github.com/commercetools/merchant-center-application-kit/commit/57ba68c0f7a63b40f11ad41023d1fc207072a1f4), [`7991432`](https://github.com/commercetools/merchant-center-application-kit/commit/79914322945d3af16d48bffcd65f3d68ef6d5686), [`e5401d8`](https://github.com/commercetools/merchant-center-application-kit/commit/e5401d82ce6d20828dbd99f1156b54538d4ab86f)]:
  - @commercetools-frontend/mc-scripts@23.4.0
  - @commercetools-frontend/constants@23.4.0
  - @commercetools-frontend/application-shell-connectors@23.4.0
  - @commercetools-frontend/application-shell@23.4.0
  - @commercetools-frontend/actions-global@23.4.0
  - @commercetools-frontend/application-components@23.4.0
  - @commercetools-frontend/application-config@23.4.0
  - @commercetools-frontend/permissions@23.4.0
  - @commercetools-frontend/mc-dev-authentication@23.4.0
  - @commercetools-frontend/i18n@23.4.0
  - @commercetools-frontend/l10n@23.4.0
  - @commercetools-frontend/assets@23.4.0
  - @commercetools-frontend/babel-preset-mc-app@23.4.0
  - @commercetools-frontend/eslint-config-mc-app@23.4.0
  - @commercetools-frontend/jest-preset-mc-app@23.4.0

## 23.3.0

### Patch Changes

- [#3765](https://github.com/commercetools/merchant-center-application-kit/pull/3765) [`6aedb11`](https://github.com/commercetools/merchant-center-application-kit/commit/6aedb11f59232070c5709a0d126895c7a32bb847) Thanks [@emmenko](https://github.com/emmenko)! - Upgrade UI Kit versions to `^19.24.0`

- Updated dependencies [[`16afb7a`](https://github.com/commercetools/merchant-center-application-kit/commit/16afb7a1aae90cd264126cf0d8f85dfe74509926), [`6aedb11`](https://github.com/commercetools/merchant-center-application-kit/commit/6aedb11f59232070c5709a0d126895c7a32bb847)]:
  - @commercetools-frontend/i18n@23.3.0
  - @commercetools-frontend/application-components@23.3.0
  - @commercetools-frontend/application-shell@23.3.0
  - @commercetools-frontend/mc-scripts@23.3.0
  - @commercetools-frontend/actions-global@23.3.0
  - @commercetools-frontend/application-config@23.3.0
  - @commercetools-frontend/application-shell-connectors@23.3.0
  - @commercetools-frontend/assets@23.3.0
  - @commercetools-frontend/babel-preset-mc-app@23.3.0
  - @commercetools-frontend/constants@23.3.0
  - @commercetools-frontend/eslint-config-mc-app@23.3.0
  - @commercetools-frontend/jest-preset-mc-app@23.3.0
  - @commercetools-frontend/l10n@23.3.0
  - @commercetools-frontend/mc-dev-authentication@23.3.0
  - @commercetools-frontend/permissions@23.3.0

## 23.2.3

### Patch Changes

- Updated dependencies [[`9888b5e`](https://github.com/commercetools/merchant-center-application-kit/commit/9888b5e485fad03416cd346261baa4bb19fa4a39), [`6e1fb48`](https://github.com/commercetools/merchant-center-application-kit/commit/6e1fb48d22eb84463cc0698b76b4ec7a9e1a59a8), [`122126a`](https://github.com/commercetools/merchant-center-application-kit/commit/122126a294187519027961e02631afe9e736e81a)]:
  - @commercetools-frontend/mc-scripts@23.2.3
  - @commercetools-frontend/actions-global@23.2.3
  - @commercetools-frontend/application-components@23.2.3
  - @commercetools-frontend/application-shell@23.2.3
  - @commercetools-frontend/application-shell-connectors@23.2.3
  - @commercetools-frontend/i18n@23.2.3
  - @commercetools-frontend/l10n@23.2.3
  - @commercetools-frontend/permissions@23.2.3
  - @commercetools-frontend/application-config@23.2.3
  - @commercetools-frontend/assets@23.2.3
  - @commercetools-frontend/babel-preset-mc-app@23.2.3
  - @commercetools-frontend/constants@23.2.3
  - @commercetools-frontend/eslint-config-mc-app@23.2.3
  - @commercetools-frontend/jest-preset-mc-app@23.2.3
  - @commercetools-frontend/mc-dev-authentication@23.2.3

## 23.2.2

### Patch Changes

- Updated dependencies [[`e9cd323`](https://github.com/commercetools/merchant-center-application-kit/commit/e9cd3235c235304809bf3cfe336c3e3e3ab85468)]:
  - @commercetools-frontend/mc-scripts@23.2.2
  - @commercetools-frontend/actions-global@23.2.2
  - @commercetools-frontend/application-components@23.2.2
  - @commercetools-frontend/application-config@23.2.2
  - @commercetools-frontend/application-shell@23.2.2
  - @commercetools-frontend/application-shell-connectors@23.2.2
  - @commercetools-frontend/assets@23.2.2
  - @commercetools-frontend/babel-preset-mc-app@23.2.2
  - @commercetools-frontend/constants@23.2.2
  - @commercetools-frontend/eslint-config-mc-app@23.2.2
  - @commercetools-frontend/i18n@23.2.2
  - @commercetools-frontend/jest-preset-mc-app@23.2.2
  - @commercetools-frontend/l10n@23.2.2
  - @commercetools-frontend/mc-dev-authentication@23.2.2
  - @commercetools-frontend/permissions@23.2.2

## 23.2.1

### Patch Changes

- Updated dependencies [[`02298bc`](https://github.com/commercetools/merchant-center-application-kit/commit/02298bc6f6585b9ee4bede20a1e543ac8e30f2de), [`7bd5904`](https://github.com/commercetools/merchant-center-application-kit/commit/7bd5904b8b23e8cdf7fa5f864c2ef563893fd7d1), [`9dba306`](https://github.com/commercetools/merchant-center-application-kit/commit/9dba306fd920a53a027e1a4ded112c1a09eaefc3)]:
  - @commercetools-frontend/application-shell@23.2.1
  - @commercetools-frontend/mc-scripts@23.2.1
  - @commercetools-frontend/actions-global@23.2.1
  - @commercetools-frontend/application-components@23.2.1
  - @commercetools-frontend/application-config@23.2.1
  - @commercetools-frontend/application-shell-connectors@23.2.1
  - @commercetools-frontend/assets@23.2.1
  - @commercetools-frontend/babel-preset-mc-app@23.2.1
  - @commercetools-frontend/constants@23.2.1
  - @commercetools-frontend/eslint-config-mc-app@23.2.1
  - @commercetools-frontend/i18n@23.2.1
  - @commercetools-frontend/jest-preset-mc-app@23.2.1
  - @commercetools-frontend/l10n@23.2.1
  - @commercetools-frontend/mc-dev-authentication@23.2.1
  - @commercetools-frontend/permissions@23.2.1

## 23.2.0

### Patch Changes

- Updated dependencies [[`55bf796`](https://github.com/commercetools/merchant-center-application-kit/commit/55bf7965c817f43f3536cb87724d5600fda3fccf), [`e3c226a`](https://github.com/commercetools/merchant-center-application-kit/commit/e3c226ad1e0fb42c4f0e4df4ab5df5b06073f8f7), [`20362f8`](https://github.com/commercetools/merchant-center-application-kit/commit/20362f877dc616da9ce0dd84dda55ef0e4995673), [`53d1e33`](https://github.com/commercetools/merchant-center-application-kit/commit/53d1e3305a0c53f672b8d6666abb7f7a175719d6)]:
  - @commercetools-frontend/application-config@23.2.0
  - @commercetools-frontend/mc-dev-authentication@23.2.0
  - @commercetools-frontend/mc-scripts@23.2.0
  - @commercetools-frontend/jest-preset-mc-app@23.2.0
  - @commercetools-frontend/actions-global@23.2.0
  - @commercetools-frontend/application-components@23.2.0
  - @commercetools-frontend/application-shell@23.2.0
  - @commercetools-frontend/application-shell-connectors@23.2.0
  - @commercetools-frontend/i18n@23.2.0
  - @commercetools-frontend/l10n@23.2.0
  - @commercetools-frontend/permissions@23.2.0
  - @commercetools-frontend/assets@23.2.0
  - @commercetools-frontend/babel-preset-mc-app@23.2.0
  - @commercetools-frontend/constants@23.2.0
  - @commercetools-frontend/eslint-config-mc-app@23.2.0

## 23.1.0

### Patch Changes

- Updated dependencies [[`b05672c`](https://github.com/commercetools/merchant-center-application-kit/commit/b05672c4990768d70a94b315ac27d27d80ef2844)]:
  - @commercetools-frontend/application-components@23.1.0
  - @commercetools-frontend/application-shell@23.1.0
  - @commercetools-frontend/mc-scripts@23.1.0
  - @commercetools-frontend/actions-global@23.1.0
  - @commercetools-frontend/application-config@23.1.0
  - @commercetools-frontend/application-shell-connectors@23.1.0
  - @commercetools-frontend/assets@23.1.0
  - @commercetools-frontend/babel-preset-mc-app@23.1.0
  - @commercetools-frontend/constants@23.1.0
  - @commercetools-frontend/eslint-config-mc-app@23.1.0
  - @commercetools-frontend/i18n@23.1.0
  - @commercetools-frontend/jest-preset-mc-app@23.1.0
  - @commercetools-frontend/l10n@23.1.0
  - @commercetools-frontend/mc-dev-authentication@23.1.0
  - @commercetools-frontend/permissions@23.1.0

## 23.0.0

### Patch Changes

- Updated dependencies [[`18ace8a`](https://github.com/commercetools/merchant-center-application-kit/commit/18ace8a93b90efe4c47ac18c6cc9b424372f6d65), [`18ace8a`](https://github.com/commercetools/merchant-center-application-kit/commit/18ace8a93b90efe4c47ac18c6cc9b424372f6d65)]:
  - @commercetools-frontend/application-shell-connectors@23.0.0
  - @commercetools-frontend/mc-dev-authentication@23.0.0
  - @commercetools-frontend/eslint-config-mc-app@23.0.0
  - @commercetools-frontend/babel-preset-mc-app@23.0.0
  - @commercetools-frontend/application-config@23.0.0
  - @commercetools-frontend/application-shell@23.0.0
  - @commercetools-frontend/mc-scripts@23.0.0
  - @commercetools-frontend/application-components@23.0.0
  - @commercetools-frontend/permissions@23.0.0
  - @commercetools-frontend/jest-preset-mc-app@23.0.0
  - @commercetools-frontend/actions-global@23.0.0
  - @commercetools-frontend/assets@23.0.0
  - @commercetools-frontend/constants@23.0.0
  - @commercetools-frontend/i18n@23.0.0
  - @commercetools-frontend/l10n@23.0.0

## 22.42.1

### Patch Changes

- Updated dependencies [[`adc828f`](https://github.com/commercetools/merchant-center-application-kit/commit/adc828f6459387590de415f00fd43b053d8d9e94)]:
  - @commercetools-frontend/application-components@22.42.1
  - @commercetools-frontend/application-shell@22.42.1
  - @commercetools-frontend/mc-scripts@22.42.1
  - @commercetools-frontend/actions-global@22.42.1
  - @commercetools-frontend/application-config@22.42.1
  - @commercetools-frontend/application-shell-connectors@22.42.1
  - @commercetools-frontend/assets@22.42.1
  - @commercetools-frontend/babel-preset-mc-app@22.42.1
  - @commercetools-frontend/constants@22.42.1
  - @commercetools-frontend/eslint-config-mc-app@22.42.1
  - @commercetools-frontend/i18n@22.42.1
  - @commercetools-frontend/jest-preset-mc-app@22.42.1
  - @commercetools-frontend/l10n@22.42.1
  - @commercetools-frontend/mc-dev-authentication@22.42.1
  - @commercetools-frontend/permissions@22.42.1

## 22.42.0

### Minor Changes

- [#3722](https://github.com/commercetools/merchant-center-application-kit/pull/3722) [`f4607a3`](https://github.com/commercetools/merchant-center-application-kit/commit/f4607a38465855904d59f4ef5c03796b78c3a669) Thanks [@emmenko](https://github.com/emmenko)! - Packages are built using the `bundler` option for TypeScript's `moduleResolution`.
  This is the recommended option for libraries to have more optimized bundles and have better compatibility.

  This also helps solving a compatibility issue with Emotion's version `11.14.0`.

### Patch Changes

- Updated dependencies [[`f4607a3`](https://github.com/commercetools/merchant-center-application-kit/commit/f4607a38465855904d59f4ef5c03796b78c3a669)]:
  - @commercetools-frontend/application-shell-connectors@22.42.0
  - @commercetools-frontend/application-components@22.42.0
  - @commercetools-frontend/babel-preset-mc-app@22.42.0
  - @commercetools-frontend/application-config@22.42.0
  - @commercetools-frontend/application-shell@22.42.0
  - @commercetools-frontend/permissions@22.42.0
  - @commercetools-frontend/mc-scripts@22.42.0
  - @commercetools-frontend/i18n@22.42.0
  - @commercetools-frontend/l10n@22.42.0
  - @commercetools-frontend/jest-preset-mc-app@22.42.0
  - @commercetools-frontend/mc-dev-authentication@22.42.0
  - @commercetools-frontend/actions-global@22.42.0
  - @commercetools-frontend/assets@22.42.0
  - @commercetools-frontend/constants@22.42.0
  - @commercetools-frontend/eslint-config-mc-app@22.42.0

## 22.41.0

### Patch Changes

- Updated dependencies [[`aca9b2f`](https://github.com/commercetools/merchant-center-application-kit/commit/aca9b2fea8957b0de7b06d791416a0d3cde1ef02), [`fa5488a`](https://github.com/commercetools/merchant-center-application-kit/commit/fa5488ab8f187c85690db122858a3f55e8f355ba)]:
  - @commercetools-frontend/jest-preset-mc-app@22.41.0
  - @commercetools-frontend/application-components@22.41.0
  - @commercetools-frontend/application-shell@22.41.0
  - @commercetools-frontend/mc-scripts@22.41.0
  - @commercetools-frontend/actions-global@22.41.0
  - @commercetools-frontend/application-config@22.41.0
  - @commercetools-frontend/application-shell-connectors@22.41.0
  - @commercetools-frontend/assets@22.41.0
  - @commercetools-frontend/babel-preset-mc-app@22.41.0
  - @commercetools-frontend/constants@22.41.0
  - @commercetools-frontend/eslint-config-mc-app@22.41.0
  - @commercetools-frontend/i18n@22.41.0
  - @commercetools-frontend/l10n@22.41.0
  - @commercetools-frontend/mc-dev-authentication@22.41.0
  - @commercetools-frontend/permissions@22.41.0

## 22.40.0

### Patch Changes

- Updated dependencies [[`14e7ba3`](https://github.com/commercetools/merchant-center-application-kit/commit/14e7ba3cf3ddd088e4caea54b4a7fb015bd01f24)]:
  - @commercetools-frontend/application-components@22.40.0
  - @commercetools-frontend/application-shell@22.40.0
  - @commercetools-frontend/mc-scripts@22.40.0
  - @commercetools-frontend/actions-global@22.40.0
  - @commercetools-frontend/application-config@22.40.0
  - @commercetools-frontend/application-shell-connectors@22.40.0
  - @commercetools-frontend/assets@22.40.0
  - @commercetools-frontend/babel-preset-mc-app@22.40.0
  - @commercetools-frontend/constants@22.40.0
  - @commercetools-frontend/eslint-config-mc-app@22.40.0
  - @commercetools-frontend/i18n@22.40.0
  - @commercetools-frontend/jest-preset-mc-app@22.40.0
  - @commercetools-frontend/l10n@22.40.0
  - @commercetools-frontend/mc-dev-authentication@22.40.0
  - @commercetools-frontend/permissions@22.40.0

## 22.39.1

### Patch Changes

- Updated dependencies [[`c8ee91a`](https://github.com/commercetools/merchant-center-application-kit/commit/c8ee91a31600a76455912479cad6d448984fd7f3), [`09a4e2a`](https://github.com/commercetools/merchant-center-application-kit/commit/09a4e2a461dbe08c042394d4ca006b188d889f2d)]:
  - @commercetools-frontend/application-shell-connectors@22.39.1
  - @commercetools-frontend/babel-preset-mc-app@22.39.1
  - @commercetools-frontend/mc-scripts@22.39.1
  - @commercetools-frontend/application-components@22.39.1
  - @commercetools-frontend/application-shell@22.39.1
  - @commercetools-frontend/permissions@22.39.1
  - @commercetools-frontend/jest-preset-mc-app@22.39.1
  - @commercetools-frontend/actions-global@22.39.1
  - @commercetools-frontend/application-config@22.39.1
  - @commercetools-frontend/assets@22.39.1
  - @commercetools-frontend/constants@22.39.1
  - @commercetools-frontend/eslint-config-mc-app@22.39.1
  - @commercetools-frontend/i18n@22.39.1
  - @commercetools-frontend/l10n@22.39.1
  - @commercetools-frontend/mc-dev-authentication@22.39.1

## 22.39.0

### Patch Changes

- Updated dependencies [[`f6827aa`](https://github.com/commercetools/merchant-center-application-kit/commit/f6827aa49d6849ece358f17f1b0525fe78c4cbcf), [`8678e5e`](https://github.com/commercetools/merchant-center-application-kit/commit/8678e5e340d59e6b2983a5248720467e1669a36f)]:
  - @commercetools-frontend/mc-scripts@22.39.0
  - @commercetools-frontend/actions-global@22.39.0
  - @commercetools-frontend/application-components@22.39.0
  - @commercetools-frontend/application-config@22.39.0
  - @commercetools-frontend/application-shell@22.39.0
  - @commercetools-frontend/application-shell-connectors@22.39.0
  - @commercetools-frontend/assets@22.39.0
  - @commercetools-frontend/babel-preset-mc-app@22.39.0
  - @commercetools-frontend/constants@22.39.0
  - @commercetools-frontend/eslint-config-mc-app@22.39.0
  - @commercetools-frontend/i18n@22.39.0
  - @commercetools-frontend/jest-preset-mc-app@22.39.0
  - @commercetools-frontend/l10n@22.39.0
  - @commercetools-frontend/mc-dev-authentication@22.39.0
  - @commercetools-frontend/permissions@22.39.0

## 22.38.3

### Patch Changes

- Updated dependencies []:
  - @commercetools-frontend/application-shell@22.38.3
  - @commercetools-frontend/actions-global@22.38.3
  - @commercetools-frontend/application-components@22.38.3
  - @commercetools-frontend/application-config@22.38.3
  - @commercetools-frontend/application-shell-connectors@22.38.3
  - @commercetools-frontend/assets@22.38.3
  - @commercetools-frontend/babel-preset-mc-app@22.38.3
  - @commercetools-frontend/constants@22.38.3
  - @commercetools-frontend/eslint-config-mc-app@22.38.3
  - @commercetools-frontend/i18n@22.38.3
  - @commercetools-frontend/jest-preset-mc-app@22.38.3
  - @commercetools-frontend/l10n@22.38.3
  - @commercetools-frontend/mc-dev-authentication@22.38.3
  - @commercetools-frontend/mc-scripts@22.38.3
  - @commercetools-frontend/permissions@22.38.3

## 22.38.2

### Patch Changes

- Updated dependencies [[`f158094`](https://github.com/commercetools/merchant-center-application-kit/commit/f15809419de1cc278484ab07b542eacd99dbf499), [`f158094`](https://github.com/commercetools/merchant-center-application-kit/commit/f15809419de1cc278484ab07b542eacd99dbf499)]:
  - @commercetools-frontend/constants@22.38.2
  - @commercetools-frontend/mc-scripts@22.38.2
  - @commercetools-frontend/actions-global@22.38.2
  - @commercetools-frontend/application-components@22.38.2
  - @commercetools-frontend/application-config@22.38.2
  - @commercetools-frontend/application-shell@22.38.2
  - @commercetools-frontend/application-shell-connectors@22.38.2
  - @commercetools-frontend/mc-dev-authentication@22.38.2
  - @commercetools-frontend/permissions@22.38.2
  - @commercetools-frontend/i18n@22.38.2
  - @commercetools-frontend/l10n@22.38.2
  - @commercetools-frontend/assets@22.38.2
  - @commercetools-frontend/babel-preset-mc-app@22.38.2
  - @commercetools-frontend/eslint-config-mc-app@22.38.2
  - @commercetools-frontend/jest-preset-mc-app@22.38.2

## 22.38.1

### Patch Changes

- Updated dependencies [[`198f30c`](https://github.com/commercetools/merchant-center-application-kit/commit/198f30c30a7c293d08e512070bf1450971100f12), [`2fec608`](https://github.com/commercetools/merchant-center-application-kit/commit/2fec608c3f47de05c83eb7806f89246b6bdc5ae7)]:
  - @commercetools-frontend/application-components@22.38.1
  - @commercetools-frontend/application-shell-connectors@22.38.1
  - @commercetools-frontend/application-shell@22.38.1
  - @commercetools-frontend/mc-scripts@22.38.1
  - @commercetools-frontend/permissions@22.38.1
  - @commercetools-frontend/actions-global@22.38.1
  - @commercetools-frontend/application-config@22.38.1
  - @commercetools-frontend/assets@22.38.1
  - @commercetools-frontend/babel-preset-mc-app@22.38.1
  - @commercetools-frontend/constants@22.38.1
  - @commercetools-frontend/eslint-config-mc-app@22.38.1
  - @commercetools-frontend/i18n@22.38.1
  - @commercetools-frontend/jest-preset-mc-app@22.38.1
  - @commercetools-frontend/l10n@22.38.1
  - @commercetools-frontend/mc-dev-authentication@22.38.1

## 22.38.0

### Patch Changes

- [#3671](https://github.com/commercetools/merchant-center-application-kit/pull/3671) [`a435e7f`](https://github.com/commercetools/merchant-center-application-kit/commit/a435e7fda60f05557b740b27f8c14d3c5ce1060e) Thanks [@renovate](https://github.com/apps/renovate)! - Update UI Kit dependencies to v19.20.1

- Updated dependencies [[`3bcdba5`](https://github.com/commercetools/merchant-center-application-kit/commit/3bcdba5452b8b7b7940b3e8570dbfd6837e4788b), [`455cccf`](https://github.com/commercetools/merchant-center-application-kit/commit/455cccfdbac803fd7f821c6127635c1b2e593f27), [`9504631`](https://github.com/commercetools/merchant-center-application-kit/commit/9504631da837e78cf66c84286d5e7e98c2009148), [`9fde2af`](https://github.com/commercetools/merchant-center-application-kit/commit/9fde2afe40616d728cef32d34d39f682a1bf4e31), [`a435e7f`](https://github.com/commercetools/merchant-center-application-kit/commit/a435e7fda60f05557b740b27f8c14d3c5ce1060e), [`5c33a40`](https://github.com/commercetools/merchant-center-application-kit/commit/5c33a40910d1f46d3d28080f666150fe1d002757), [`9fde2af`](https://github.com/commercetools/merchant-center-application-kit/commit/9fde2afe40616d728cef32d34d39f682a1bf4e31)]:
  - @commercetools-frontend/application-shell-connectors@22.38.0
  - @commercetools-frontend/application-config@22.38.0
  - @commercetools-frontend/mc-scripts@22.38.0
  - @commercetools-frontend/l10n@22.38.0
  - @commercetools-frontend/application-components@22.38.0
  - @commercetools-frontend/application-shell@22.38.0
  - @commercetools-frontend/permissions@22.38.0
  - @commercetools-frontend/constants@22.38.0
  - @commercetools-frontend/actions-global@22.38.0
  - @commercetools-frontend/i18n@22.38.0
  - @commercetools-frontend/babel-preset-mc-app@22.38.0
  - @commercetools-frontend/mc-dev-authentication@22.38.0
  - @commercetools-frontend/jest-preset-mc-app@22.38.0
  - @commercetools-frontend/assets@22.38.0
  - @commercetools-frontend/eslint-config-mc-app@22.38.0

## 22.37.0

### Patch Changes

- Updated dependencies [[`5583f0c`](https://github.com/commercetools/merchant-center-application-kit/commit/5583f0cbd9b09e7382a81c57df33dac80420cceb), [`7044f96`](https://github.com/commercetools/merchant-center-application-kit/commit/7044f9651e45c6005dc1138592e8fe3ed8280f36)]:
  - @commercetools-frontend/application-config@22.37.0
  - @commercetools-frontend/jest-preset-mc-app@22.37.0
  - @commercetools-frontend/mc-scripts@22.37.0
  - @commercetools-frontend/application-shell@22.37.0
  - @commercetools-frontend/application-components@22.37.0
  - @commercetools-frontend/application-shell-connectors@22.37.0
  - @commercetools-frontend/mc-dev-authentication@22.37.0
  - @commercetools-frontend/permissions@22.37.0
  - @commercetools-frontend/actions-global@22.37.0
  - @commercetools-frontend/assets@22.37.0
  - @commercetools-frontend/babel-preset-mc-app@22.37.0
  - @commercetools-frontend/constants@22.37.0
  - @commercetools-frontend/eslint-config-mc-app@22.37.0
  - @commercetools-frontend/i18n@22.37.0
  - @commercetools-frontend/l10n@22.37.0

## 22.36.0

### Patch Changes

- [#3627](https://github.com/commercetools/merchant-center-application-kit/pull/3627) [`d8e72de`](https://github.com/commercetools/merchant-center-application-kit/commit/d8e72de9dd28b1006a5078361bac6b3f4fe5eafc) Thanks [@renovate](https://github.com/apps/renovate)! - Update UI Kit dependencies to `v19.17`

- Updated dependencies [[`57ef01b`](https://github.com/commercetools/merchant-center-application-kit/commit/57ef01b81e27f1ae5e5a1f2c18ed27f1eb9cb1be), [`d8e72de`](https://github.com/commercetools/merchant-center-application-kit/commit/d8e72de9dd28b1006a5078361bac6b3f4fe5eafc), [`1f67b19`](https://github.com/commercetools/merchant-center-application-kit/commit/1f67b1976ff0cb36409a4303523bae95c35e850f), [`6e0d117`](https://github.com/commercetools/merchant-center-application-kit/commit/6e0d1174357a7bcdfa768c24ad5aaa595f42d3a7)]:
  - @commercetools-frontend/application-config@22.36.0
  - @commercetools-frontend/application-components@22.36.0
  - @commercetools-frontend/application-shell@22.36.0
  - @commercetools-frontend/i18n@22.36.0
  - @commercetools-frontend/l10n@22.36.0
  - @commercetools-frontend/application-shell-connectors@22.36.0
  - @commercetools-frontend/mc-dev-authentication@22.36.0
  - @commercetools-frontend/mc-scripts@22.36.0
  - @commercetools-frontend/permissions@22.36.0
  - @commercetools-frontend/actions-global@22.36.0
  - @commercetools-frontend/assets@22.36.0
  - @commercetools-frontend/babel-preset-mc-app@22.36.0
  - @commercetools-frontend/constants@22.36.0
  - @commercetools-frontend/eslint-config-mc-app@22.36.0
  - @commercetools-frontend/jest-preset-mc-app@22.36.0

## 22.35.1

### Patch Changes

- Updated dependencies [[`26a31c9`](https://github.com/commercetools/merchant-center-application-kit/commit/26a31c93eea4d3c16801268838395c73d73d9e2d), [`2f19edf`](https://github.com/commercetools/merchant-center-application-kit/commit/2f19edf66c24decae363d8931e8befb489ed3c6e)]:
  - @commercetools-frontend/application-components@22.35.1
  - @commercetools-frontend/application-shell@22.35.1
  - @commercetools-frontend/mc-scripts@22.35.1
  - @commercetools-frontend/actions-global@22.35.1
  - @commercetools-frontend/application-config@22.35.1
  - @commercetools-frontend/application-shell-connectors@22.35.1
  - @commercetools-frontend/assets@22.35.1
  - @commercetools-frontend/babel-preset-mc-app@22.35.1
  - @commercetools-frontend/constants@22.35.1
  - @commercetools-frontend/eslint-config-mc-app@22.35.1
  - @commercetools-frontend/i18n@22.35.1
  - @commercetools-frontend/jest-preset-mc-app@22.35.1
  - @commercetools-frontend/l10n@22.35.1
  - @commercetools-frontend/mc-dev-authentication@22.35.1
  - @commercetools-frontend/permissions@22.35.1

## 22.35.0

### Patch Changes

- Updated dependencies [[`f234d49`](https://github.com/commercetools/merchant-center-application-kit/commit/f234d49f64274bfd9c71a6863f70b58a0f0f5613), [`be08ecc`](https://github.com/commercetools/merchant-center-application-kit/commit/be08ecc1607ef0a2eecb5d8272fc634d2c297a21), [`8e5b0cf`](https://github.com/commercetools/merchant-center-application-kit/commit/8e5b0cf6584b9205df39977745f29db0fdb13c44)]:
  - @commercetools-frontend/mc-scripts@22.35.0
  - @commercetools-frontend/application-components@22.35.0
  - @commercetools-frontend/application-shell@22.35.0
  - @commercetools-frontend/constants@22.35.0
  - @commercetools-frontend/application-config@22.35.0
  - @commercetools-frontend/actions-global@22.35.0
  - @commercetools-frontend/application-shell-connectors@22.35.0
  - @commercetools-frontend/i18n@22.35.0
  - @commercetools-frontend/l10n@22.35.0
  - @commercetools-frontend/permissions@22.35.0
  - @commercetools-frontend/mc-dev-authentication@22.35.0
  - @commercetools-frontend/assets@22.35.0
  - @commercetools-frontend/babel-preset-mc-app@22.35.0
  - @commercetools-frontend/eslint-config-mc-app@22.35.0
  - @commercetools-frontend/jest-preset-mc-app@22.35.0

## 22.34.0

### Patch Changes

- Updated dependencies [[`e27a447`](https://github.com/commercetools/merchant-center-application-kit/commit/e27a447ba610aa54290224e9a504d47a34149ea0), [`5d55a50`](https://github.com/commercetools/merchant-center-application-kit/commit/5d55a5033e01ca86da879ad58701b4737439bc45), [`850c917`](https://github.com/commercetools/merchant-center-application-kit/commit/850c917fa981ff7dd0d77146a9bb0be8d4a6b811)]:
  - @commercetools-frontend/application-shell@22.34.0
  - @commercetools-frontend/constants@22.34.0
  - @commercetools-frontend/mc-scripts@22.34.0
  - @commercetools-frontend/l10n@22.34.0
  - @commercetools-frontend/actions-global@22.34.0
  - @commercetools-frontend/application-components@22.34.0
  - @commercetools-frontend/application-config@22.34.0
  - @commercetools-frontend/application-shell-connectors@22.34.0
  - @commercetools-frontend/i18n@22.34.0
  - @commercetools-frontend/permissions@22.34.0
  - @commercetools-frontend/mc-dev-authentication@22.34.0
  - @commercetools-frontend/assets@22.34.0
  - @commercetools-frontend/babel-preset-mc-app@22.34.0
  - @commercetools-frontend/eslint-config-mc-app@22.34.0
  - @commercetools-frontend/jest-preset-mc-app@22.34.0

## 22.33.0

### Patch Changes

- Updated dependencies [[`87d2686`](https://github.com/commercetools/merchant-center-application-kit/commit/87d268669ed8bfd44ed10658abefefc9728583d8), [`c699f1b`](https://github.com/commercetools/merchant-center-application-kit/commit/c699f1bd797f52764944e18dc5e138f22f25a79b), [`f7fc56c`](https://github.com/commercetools/merchant-center-application-kit/commit/f7fc56cf8444602d71d4648f938752d70ae522a9)]:
  - @commercetools-frontend/i18n@22.33.0
  - @commercetools-frontend/application-config@22.33.0
  - @commercetools-frontend/application-components@22.33.0
  - @commercetools-frontend/application-shell@22.33.0
  - @commercetools-frontend/application-shell-connectors@22.33.0
  - @commercetools-frontend/mc-dev-authentication@22.33.0
  - @commercetools-frontend/mc-scripts@22.33.0
  - @commercetools-frontend/permissions@22.33.0
  - @commercetools-frontend/actions-global@22.33.0
  - @commercetools-frontend/assets@22.33.0
  - @commercetools-frontend/babel-preset-mc-app@22.33.0
  - @commercetools-frontend/constants@22.33.0
  - @commercetools-frontend/eslint-config-mc-app@22.33.0
  - @commercetools-frontend/jest-preset-mc-app@22.33.0
  - @commercetools-frontend/l10n@22.33.0

## 22.32.2

### Patch Changes

- Updated dependencies [[`c9d0d03`](https://github.com/commercetools/merchant-center-application-kit/commit/c9d0d03b4b83eca89221f0922cd448a7b1d9442f)]:
  - @commercetools-frontend/mc-scripts@22.32.2
  - @commercetools-frontend/actions-global@22.32.2
  - @commercetools-frontend/application-components@22.32.2
  - @commercetools-frontend/application-config@22.32.2
  - @commercetools-frontend/application-shell@22.32.2
  - @commercetools-frontend/application-shell-connectors@22.32.2
  - @commercetools-frontend/assets@22.32.2
  - @commercetools-frontend/babel-preset-mc-app@22.32.2
  - @commercetools-frontend/constants@22.32.2
  - @commercetools-frontend/eslint-config-mc-app@22.32.2
  - @commercetools-frontend/i18n@22.32.2
  - @commercetools-frontend/jest-preset-mc-app@22.32.2
  - @commercetools-frontend/l10n@22.32.2
  - @commercetools-frontend/mc-dev-authentication@22.32.2
  - @commercetools-frontend/permissions@22.32.2

## 22.32.1

### Patch Changes

- Updated dependencies [[`d50a0ae`](https://github.com/commercetools/merchant-center-application-kit/commit/d50a0aecad6aa4684fdc8bac8af36e2ac008c1ab), [`eb756ff`](https://github.com/commercetools/merchant-center-application-kit/commit/eb756ff6a0333209ab27d01d5fa5ad335c8b892d), [`064635b`](https://github.com/commercetools/merchant-center-application-kit/commit/064635b0454a9b67cebae12d302c55d2da18de1c)]:
  - @commercetools-frontend/application-shell@22.32.1
  - @commercetools-frontend/assets@22.32.1
  - @commercetools-frontend/application-components@22.32.1
  - @commercetools-frontend/application-config@22.32.1
  - @commercetools-frontend/mc-scripts@22.32.1
  - @commercetools-frontend/actions-global@22.32.1
  - @commercetools-frontend/application-shell-connectors@22.32.1
  - @commercetools-frontend/babel-preset-mc-app@22.32.1
  - @commercetools-frontend/constants@22.32.1
  - @commercetools-frontend/eslint-config-mc-app@22.32.1
  - @commercetools-frontend/i18n@22.32.1
  - @commercetools-frontend/jest-preset-mc-app@22.32.1
  - @commercetools-frontend/l10n@22.32.1
  - @commercetools-frontend/mc-dev-authentication@22.32.1
  - @commercetools-frontend/permissions@22.32.1

## 22.32.0

### Patch Changes

- Updated dependencies [[`6fc21a8`](https://github.com/commercetools/merchant-center-application-kit/commit/6fc21a87b45da82e820c86601ceee5374d1eb299), [`a452e7e`](https://github.com/commercetools/merchant-center-application-kit/commit/a452e7e1ac49f4f4fc82f07243087c4f2aefcead)]:
  - @commercetools-frontend/application-components@22.32.0
  - @commercetools-frontend/assets@22.32.0
  - @commercetools-frontend/application-shell@22.32.0
  - @commercetools-frontend/mc-scripts@22.32.0
  - @commercetools-frontend/application-config@22.32.0
  - @commercetools-frontend/actions-global@22.32.0
  - @commercetools-frontend/application-shell-connectors@22.32.0
  - @commercetools-frontend/babel-preset-mc-app@22.32.0
  - @commercetools-frontend/constants@22.32.0
  - @commercetools-frontend/eslint-config-mc-app@22.32.0
  - @commercetools-frontend/i18n@22.32.0
  - @commercetools-frontend/jest-preset-mc-app@22.32.0
  - @commercetools-frontend/l10n@22.32.0
  - @commercetools-frontend/mc-dev-authentication@22.32.0
  - @commercetools-frontend/permissions@22.32.0

## 22.31.0

### Patch Changes

- Updated dependencies [[`2fe2e11`](https://github.com/commercetools/merchant-center-application-kit/commit/2fe2e119982c7fa347f70ac8e203eb1f1e1743b7), [`d4a26cd`](https://github.com/commercetools/merchant-center-application-kit/commit/d4a26cd4daba200567486a81b580749a17d648f5), [`d37e74e`](https://github.com/commercetools/merchant-center-application-kit/commit/d37e74e500026766b1360c7db89798262c128898), [`d0b9f57`](https://github.com/commercetools/merchant-center-application-kit/commit/d0b9f57dd93d33fbb3b8ad95ee678e058b8257c5)]:
  - @commercetools-frontend/application-config@22.31.0
  - @commercetools-frontend/application-shell@22.31.0
  - @commercetools-frontend/constants@22.31.0
  - @commercetools-frontend/application-components@22.31.0
  - @commercetools-frontend/application-shell-connectors@22.31.0
  - @commercetools-frontend/mc-dev-authentication@22.31.0
  - @commercetools-frontend/mc-scripts@22.31.0
  - @commercetools-frontend/actions-global@22.31.0
  - @commercetools-frontend/permissions@22.31.0
  - @commercetools-frontend/i18n@22.31.0
  - @commercetools-frontend/l10n@22.31.0
  - @commercetools-frontend/assets@22.31.0
  - @commercetools-frontend/babel-preset-mc-app@22.31.0
  - @commercetools-frontend/eslint-config-mc-app@22.31.0
  - @commercetools-frontend/jest-preset-mc-app@22.31.0

## 22.30.3

### Patch Changes

- [#3574](https://github.com/commercetools/merchant-center-application-kit/pull/3574) [`1f325ac`](https://github.com/commercetools/merchant-center-application-kit/commit/1f325ac5127a0fe1ff1e0304d32353f691cd097f) Thanks [@renovate](https://github.com/apps/renovate)! - Upgrade to UI Kit v19.9.0, migrate deprecated size props

- Updated dependencies [[`1f325ac`](https://github.com/commercetools/merchant-center-application-kit/commit/1f325ac5127a0fe1ff1e0304d32353f691cd097f)]:
  - @commercetools-frontend/application-components@22.30.3
  - @commercetools-frontend/application-shell@22.30.3
  - @commercetools-frontend/i18n@22.30.3
  - @commercetools-frontend/mc-scripts@22.30.3
  - @commercetools-frontend/actions-global@22.30.3
  - @commercetools-frontend/application-config@22.30.3
  - @commercetools-frontend/application-shell-connectors@22.30.3
  - @commercetools-frontend/assets@22.30.3
  - @commercetools-frontend/babel-preset-mc-app@22.30.3
  - @commercetools-frontend/constants@22.30.3
  - @commercetools-frontend/eslint-config-mc-app@22.30.3
  - @commercetools-frontend/jest-preset-mc-app@22.30.3
  - @commercetools-frontend/l10n@22.30.3
  - @commercetools-frontend/mc-dev-authentication@22.30.3
  - @commercetools-frontend/permissions@22.30.3

## 22.30.2

### Patch Changes

- Updated dependencies [[`839d185`](https://github.com/commercetools/merchant-center-application-kit/commit/839d185a10eb5a74d781b9b865f7c07b29e1e824), [`ed2158c`](https://github.com/commercetools/merchant-center-application-kit/commit/ed2158cc3b8173cdd86395fccf836b921edd4b1b)]:
  - @commercetools-frontend/application-shell@22.30.2
  - @commercetools-frontend/actions-global@22.30.2
  - @commercetools-frontend/application-components@22.30.2
  - @commercetools-frontend/application-config@22.30.2
  - @commercetools-frontend/application-shell-connectors@22.30.2
  - @commercetools-frontend/assets@22.30.2
  - @commercetools-frontend/babel-preset-mc-app@22.30.2
  - @commercetools-frontend/constants@22.30.2
  - @commercetools-frontend/eslint-config-mc-app@22.30.2
  - @commercetools-frontend/i18n@22.30.2
  - @commercetools-frontend/jest-preset-mc-app@22.30.2
  - @commercetools-frontend/l10n@22.30.2
  - @commercetools-frontend/mc-dev-authentication@22.30.2
  - @commercetools-frontend/mc-scripts@22.30.2
  - @commercetools-frontend/permissions@22.30.2

## 22.30.1

### Patch Changes

- Updated dependencies [[`165d15a`](https://github.com/commercetools/merchant-center-application-kit/commit/165d15aa30f3e668806569e8fc3365b33f53fd52)]:
  - @commercetools-frontend/application-shell@22.30.1
  - @commercetools-frontend/actions-global@22.30.1
  - @commercetools-frontend/application-components@22.30.1
  - @commercetools-frontend/application-config@22.30.1
  - @commercetools-frontend/application-shell-connectors@22.30.1
  - @commercetools-frontend/assets@22.30.1
  - @commercetools-frontend/babel-preset-mc-app@22.30.1
  - @commercetools-frontend/constants@22.30.1
  - @commercetools-frontend/eslint-config-mc-app@22.30.1
  - @commercetools-frontend/i18n@22.30.1
  - @commercetools-frontend/jest-preset-mc-app@22.30.1
  - @commercetools-frontend/l10n@22.30.1
  - @commercetools-frontend/mc-dev-authentication@22.30.1
  - @commercetools-frontend/mc-scripts@22.30.1
  - @commercetools-frontend/permissions@22.30.1

## 22.30.0

### Patch Changes

- Updated dependencies [[`a3a8e85`](https://github.com/commercetools/merchant-center-application-kit/commit/a3a8e85a4200e0495285cbf8befe9c407760d11b), [`113bace`](https://github.com/commercetools/merchant-center-application-kit/commit/113baceee248d4c0fbbdb68f4c525f7cfcd87522)]:
  - @commercetools-frontend/application-shell-connectors@22.30.0
  - @commercetools-frontend/application-components@22.30.0
  - @commercetools-frontend/application-shell@22.30.0
  - @commercetools-frontend/permissions@22.30.0
  - @commercetools-frontend/mc-scripts@22.30.0
  - @commercetools-frontend/actions-global@22.30.0
  - @commercetools-frontend/application-config@22.30.0
  - @commercetools-frontend/assets@22.30.0
  - @commercetools-frontend/babel-preset-mc-app@22.30.0
  - @commercetools-frontend/constants@22.30.0
  - @commercetools-frontend/eslint-config-mc-app@22.30.0
  - @commercetools-frontend/i18n@22.30.0
  - @commercetools-frontend/jest-preset-mc-app@22.30.0
  - @commercetools-frontend/l10n@22.30.0
  - @commercetools-frontend/mc-dev-authentication@22.30.0

## 22.29.0

### Patch Changes

- [#3552](https://github.com/commercetools/merchant-center-application-kit/pull/3552) [`ec43ee7`](https://github.com/commercetools/merchant-center-application-kit/commit/ec43ee72ab95c0245f6e4441930da641cae2a31f) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all test-data packages to v8.5.0

- [#3551](https://github.com/commercetools/merchant-center-application-kit/pull/3551) [`8c10dd8`](https://github.com/commercetools/merchant-center-application-kit/commit/8c10dd837ffb27b20b40c1596707c64a96c7d41b) Thanks [@kark](https://github.com/kark)! - Ensure compatibility with yarn v3 by explicitly adding `@commercetools-frontend/babel-preset-mc-app` dependency for customization templates

- Updated dependencies [[`fcc8ce7`](https://github.com/commercetools/merchant-center-application-kit/commit/fcc8ce72bd1bed70551bf07907ca65c13ad13307), [`03ae4b2`](https://github.com/commercetools/merchant-center-application-kit/commit/03ae4b29ed78ee9d0fea6c5561125a56c5544945), [`4bd0fb6`](https://github.com/commercetools/merchant-center-application-kit/commit/4bd0fb65319fde21dafdfee36b7e6c7b7c9a5a52), [`df253eb`](https://github.com/commercetools/merchant-center-application-kit/commit/df253eb721fa33ba82eec939f05b7e3a6c491644), [`5363548`](https://github.com/commercetools/merchant-center-application-kit/commit/53635480ff4aef9dbc3960970d8d6bc0ba3991ef), [`999014a`](https://github.com/commercetools/merchant-center-application-kit/commit/999014a8feeb9d2b4a0873f4b064a75e1fafd242), [`c63fd6a`](https://github.com/commercetools/merchant-center-application-kit/commit/c63fd6ae02e4818267f0f133136bd823c5bb51d1)]:
  - @commercetools-frontend/application-components@22.29.0
  - @commercetools-frontend/application-shell@22.29.0
  - @commercetools-frontend/application-shell-connectors@22.29.0
  - @commercetools-frontend/application-config@22.29.0
  - @commercetools-frontend/jest-preset-mc-app@22.29.0
  - @commercetools-frontend/mc-scripts@22.29.0
  - @commercetools-frontend/i18n@22.29.0
  - @commercetools-frontend/permissions@22.29.0
  - @commercetools-frontend/mc-dev-authentication@22.29.0
  - @commercetools-frontend/actions-global@22.29.0
  - @commercetools-frontend/l10n@22.29.0
  - @commercetools-frontend/assets@22.29.0
  - @commercetools-frontend/babel-preset-mc-app@22.29.0
  - @commercetools-frontend/constants@22.29.0
  - @commercetools-frontend/eslint-config-mc-app@22.29.0

## 22.28.0

### Patch Changes

- [#3533](https://github.com/commercetools/merchant-center-application-kit/pull/3533) [`146cf67`](https://github.com/commercetools/merchant-center-application-kit/commit/146cf672eb15a7b4d858c54d6a01f92d0437a86f) Thanks [@renovate](https://github.com/apps/renovate)! - Update all dependencies

- Updated dependencies [[`222dd0c`](https://github.com/commercetools/merchant-center-application-kit/commit/222dd0cc55cd36d88e08ca61c92f7da872474b0e), [`6eb78a4`](https://github.com/commercetools/merchant-center-application-kit/commit/6eb78a463adf848696e984bd0e999b4753676ece), [`67cdb03`](https://github.com/commercetools/merchant-center-application-kit/commit/67cdb03ff30cff307bef496a2c5b8484b09c004c), [`146cf67`](https://github.com/commercetools/merchant-center-application-kit/commit/146cf672eb15a7b4d858c54d6a01f92d0437a86f)]:
  - @commercetools-frontend/application-shell@22.28.0
  - @commercetools-frontend/application-components@22.28.0
  - @commercetools-frontend/i18n@22.28.0
  - @commercetools-frontend/mc-scripts@22.28.0
  - @commercetools-frontend/jest-preset-mc-app@22.28.0
  - @commercetools-frontend/l10n@22.28.0
  - @commercetools-frontend/actions-global@22.28.0
  - @commercetools-frontend/application-shell-connectors@22.28.0
  - @commercetools-frontend/permissions@22.28.0
  - @commercetools-frontend/application-config@22.28.0
  - @commercetools-frontend/assets@22.28.0
  - @commercetools-frontend/constants@22.28.0
  - @commercetools-frontend/eslint-config-mc-app@22.28.0
  - @commercetools-frontend/mc-dev-authentication@22.28.0

## 22.27.0

### Patch Changes

- [#3468](https://github.com/commercetools/merchant-center-application-kit/pull/3468) [`4ab4bf6`](https://github.com/commercetools/merchant-center-application-kit/commit/4ab4bf6035d3c8b419fd439ca445c8f971ea2fc9) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

- Updated dependencies [[`bcdd553`](https://github.com/commercetools/merchant-center-application-kit/commit/bcdd5532992f61d95e05755d41b438fffcc6020a), [`11eb32f`](https://github.com/commercetools/merchant-center-application-kit/commit/11eb32fa46461f7f68328130d881b3c8d8e0a0ee), [`4ab4bf6`](https://github.com/commercetools/merchant-center-application-kit/commit/4ab4bf6035d3c8b419fd439ca445c8f971ea2fc9), [`7e48e90`](https://github.com/commercetools/merchant-center-application-kit/commit/7e48e9081dfc792740604b4d22b420919d717b89), [`4f00d48`](https://github.com/commercetools/merchant-center-application-kit/commit/4f00d488be6da8689d8cb50ce060250749130013), [`78d082e`](https://github.com/commercetools/merchant-center-application-kit/commit/78d082e81298847b3c1b274040bb677104892119)]:
  - @commercetools-frontend/mc-scripts@22.27.0
  - @commercetools-frontend/application-components@22.27.0
  - @commercetools-frontend/application-shell@22.27.0
  - @commercetools-frontend/application-shell-connectors@22.27.0
  - @commercetools-frontend/application-config@22.27.0
  - @commercetools-frontend/permissions@22.27.0
  - @commercetools-frontend/i18n@22.27.0
  - @commercetools-frontend/constants@22.27.0
  - @commercetools-frontend/mc-dev-authentication@22.27.0
  - @commercetools-frontend/actions-global@22.27.0
  - @commercetools-frontend/l10n@22.27.0
  - @commercetools-frontend/assets@22.27.0
  - @commercetools-frontend/eslint-config-mc-app@22.27.0
  - @commercetools-frontend/jest-preset-mc-app@22.27.0

## 22.26.0

### Patch Changes

- Updated dependencies [[`ec2410a`](https://github.com/commercetools/merchant-center-application-kit/commit/ec2410a5c238f4343371e246846f2bfdf5fcd720), [`179da9a`](https://github.com/commercetools/merchant-center-application-kit/commit/179da9a4fdc73ade7717b50bc1e5c106382bf9eb)]:
  - @commercetools-frontend/i18n@22.26.0
  - @commercetools-frontend/application-shell@22.26.0
  - @commercetools-frontend/assets@22.26.0
  - @commercetools-frontend/application-components@22.26.0
  - @commercetools-frontend/application-config@22.26.0
  - @commercetools-frontend/mc-scripts@22.26.0
  - @commercetools-frontend/actions-global@22.26.0
  - @commercetools-frontend/application-shell-connectors@22.26.0
  - @commercetools-frontend/constants@22.26.0
  - @commercetools-frontend/eslint-config-mc-app@22.26.0
  - @commercetools-frontend/jest-preset-mc-app@22.26.0
  - @commercetools-frontend/l10n@22.26.0
  - @commercetools-frontend/mc-dev-authentication@22.26.0
  - @commercetools-frontend/permissions@22.26.0

## 22.25.1

### Patch Changes

- Updated dependencies [[`bd2ea80`](https://github.com/commercetools/merchant-center-application-kit/commit/bd2ea80dfc22befef0eb1143b798e7591b3300eb)]:
  - @commercetools-frontend/application-shell@22.25.1
  - @commercetools-frontend/actions-global@22.25.1
  - @commercetools-frontend/application-components@22.25.1
  - @commercetools-frontend/application-config@22.25.1
  - @commercetools-frontend/application-shell-connectors@22.25.1
  - @commercetools-frontend/assets@22.25.1
  - @commercetools-frontend/constants@22.25.1
  - @commercetools-frontend/eslint-config-mc-app@22.25.1
  - @commercetools-frontend/i18n@22.25.1
  - @commercetools-frontend/jest-preset-mc-app@22.25.1
  - @commercetools-frontend/l10n@22.25.1
  - @commercetools-frontend/mc-dev-authentication@22.25.1
  - @commercetools-frontend/mc-scripts@22.25.1
  - @commercetools-frontend/permissions@22.25.1

## 22.25.0

### Patch Changes

- [#3497](https://github.com/commercetools/merchant-center-application-kit/pull/3497) [`a4cfaf1`](https://github.com/commercetools/merchant-center-application-kit/commit/a4cfaf11c700ae3634235281eacab39e325e5cc3) Thanks [@chloe0592](https://github.com/chloe0592)! - Remove the old theme from all App-Kit components and update UI-Kit dependencies to the newest version.

- Updated dependencies [[`b5e797f`](https://github.com/commercetools/merchant-center-application-kit/commit/b5e797f4c8a3552b911a16759ee8dd77416cefb2), [`b55d4e6`](https://github.com/commercetools/merchant-center-application-kit/commit/b55d4e606a07e5f5ac1522126b77213c67297a0c), [`1985f69`](https://github.com/commercetools/merchant-center-application-kit/commit/1985f69301e4ab8eb218ed1a42425c3e27bb0a5a), [`4b5b680`](https://github.com/commercetools/merchant-center-application-kit/commit/4b5b6806b3e710ad2aa71c499d22216210ae1e49), [`1be0c35`](https://github.com/commercetools/merchant-center-application-kit/commit/1be0c357e0a14fd32626c61dff804a4bdcc51499), [`a4cfaf1`](https://github.com/commercetools/merchant-center-application-kit/commit/a4cfaf11c700ae3634235281eacab39e325e5cc3)]:
  - @commercetools-frontend/constants@22.25.0
  - @commercetools-frontend/application-config@22.25.0
  - @commercetools-frontend/l10n@22.25.0
  - @commercetools-frontend/mc-scripts@22.25.0
  - @commercetools-frontend/application-shell@22.25.0
  - @commercetools-frontend/application-components@22.25.0
  - @commercetools-frontend/assets@22.25.0
  - @commercetools-frontend/i18n@22.25.0
  - @commercetools-frontend/actions-global@22.25.0
  - @commercetools-frontend/application-shell-connectors@22.25.0
  - @commercetools-frontend/mc-dev-authentication@22.25.0
  - @commercetools-frontend/permissions@22.25.0
  - @commercetools-frontend/eslint-config-mc-app@22.25.0
  - @commercetools-frontend/jest-preset-mc-app@22.25.0

## 22.24.0

### Patch Changes

- [#3491](https://github.com/commercetools/merchant-center-application-kit/pull/3491) [`c2bba1d`](https://github.com/commercetools/merchant-center-application-kit/commit/c2bba1d065b6fd7882e6feb9162d91538962d85d) Thanks [@emmenko](https://github.com/emmenko)! - Adjust links to new docs

- Updated dependencies [[`d16ebd9`](https://github.com/commercetools/merchant-center-application-kit/commit/d16ebd98c1b99a0c0c0e0f9a9df24cc8dcc0f542), [`b6b0003`](https://github.com/commercetools/merchant-center-application-kit/commit/b6b0003417d413fa26fb77750c75e95559af2f24), [`d92d890`](https://github.com/commercetools/merchant-center-application-kit/commit/d92d8901913b29d45ae2c4df1d89f640e10bd257), [`3836786`](https://github.com/commercetools/merchant-center-application-kit/commit/383678613d5e58977b6316dc95c0a3c63355c839), [`2431917`](https://github.com/commercetools/merchant-center-application-kit/commit/2431917db9ee4297e58717924779855f556e38cb), [`c2bba1d`](https://github.com/commercetools/merchant-center-application-kit/commit/c2bba1d065b6fd7882e6feb9162d91538962d85d)]:
  - @commercetools-frontend/application-components@22.24.0
  - @commercetools-frontend/application-shell@22.24.0
  - @commercetools-frontend/i18n@22.24.0
  - @commercetools-frontend/constants@22.24.0
  - @commercetools-frontend/application-shell-connectors@22.24.0
  - @commercetools-frontend/mc-dev-authentication@22.24.0
  - @commercetools-frontend/eslint-config-mc-app@22.24.0
  - @commercetools-frontend/application-config@22.24.0
  - @commercetools-frontend/jest-preset-mc-app@22.24.0
  - @commercetools-frontend/actions-global@22.24.0
  - @commercetools-frontend/permissions@22.24.0
  - @commercetools-frontend/mc-scripts@22.24.0
  - @commercetools-frontend/assets@22.24.0
  - @commercetools-frontend/l10n@22.24.0

## 22.23.3

### Patch Changes

- Updated dependencies [[`f1144f9`](https://github.com/commercetools/merchant-center-application-kit/commit/f1144f9764d4ec366802e784e82f01697c0e0a2e)]:
  - @commercetools-frontend/application-components@22.23.3
  - @commercetools-frontend/application-shell@22.23.3
  - @commercetools-frontend/mc-scripts@22.23.3
  - @commercetools-frontend/actions-global@22.23.3
  - @commercetools-frontend/application-config@22.23.3
  - @commercetools-frontend/application-shell-connectors@22.23.3
  - @commercetools-frontend/assets@22.23.3
  - @commercetools-frontend/constants@22.23.3
  - @commercetools-frontend/eslint-config-mc-app@22.23.3
  - @commercetools-frontend/i18n@22.23.3
  - @commercetools-frontend/jest-preset-mc-app@22.23.3
  - @commercetools-frontend/l10n@22.23.3
  - @commercetools-frontend/mc-dev-authentication@22.23.3
  - @commercetools-frontend/permissions@22.23.3

## 22.23.2

### Patch Changes

- Updated dependencies []:
  - @commercetools-frontend/actions-global@22.23.2
  - @commercetools-frontend/application-components@22.23.2
  - @commercetools-frontend/application-config@22.23.2
  - @commercetools-frontend/application-shell@22.23.2
  - @commercetools-frontend/application-shell-connectors@22.23.2
  - @commercetools-frontend/assets@22.23.2
  - @commercetools-frontend/constants@22.23.2
  - @commercetools-frontend/eslint-config-mc-app@22.23.2
  - @commercetools-frontend/i18n@22.23.2
  - @commercetools-frontend/jest-preset-mc-app@22.23.2
  - @commercetools-frontend/l10n@22.23.2
  - @commercetools-frontend/mc-dev-authentication@22.23.2
  - @commercetools-frontend/mc-scripts@22.23.2
  - @commercetools-frontend/permissions@22.23.2

## 22.23.1

### Patch Changes

- Updated dependencies [[`f2cec38`](https://github.com/commercetools/merchant-center-application-kit/commit/f2cec3830a9e07c3fa6030b947ddd090f70a4d90)]:
  - @commercetools-frontend/application-components@22.23.1
  - @commercetools-frontend/application-shell@22.23.1
  - @commercetools-frontend/mc-scripts@22.23.1
  - @commercetools-frontend/actions-global@22.23.1
  - @commercetools-frontend/application-config@22.23.1
  - @commercetools-frontend/application-shell-connectors@22.23.1
  - @commercetools-frontend/assets@22.23.1
  - @commercetools-frontend/constants@22.23.1
  - @commercetools-frontend/eslint-config-mc-app@22.23.1
  - @commercetools-frontend/i18n@22.23.1
  - @commercetools-frontend/jest-preset-mc-app@22.23.1
  - @commercetools-frontend/l10n@22.23.1
  - @commercetools-frontend/mc-dev-authentication@22.23.1
  - @commercetools-frontend/permissions@22.23.1

## 22.23.0

### Patch Changes

- [#3435](https://github.com/commercetools/merchant-center-application-kit/pull/3435) [`e7299e2`](https://github.com/commercetools/merchant-center-application-kit/commit/e7299e265ceb8579ed4901adddcb2fde791c62db) Thanks [@renovate](https://github.com/apps/renovate)! - Update all dependencies

- Updated dependencies [[`4708993`](https://github.com/commercetools/merchant-center-application-kit/commit/4708993cf3f45addcbc0102686c92e12c9fc46bb), [`e7299e2`](https://github.com/commercetools/merchant-center-application-kit/commit/e7299e265ceb8579ed4901adddcb2fde791c62db), [`5fa5dd6`](https://github.com/commercetools/merchant-center-application-kit/commit/5fa5dd6d29f0974a97718f86259f6e717d5fdb5e), [`aa60c8e`](https://github.com/commercetools/merchant-center-application-kit/commit/aa60c8ed4d7e873485b6c7be80cc93ed988cca07), [`edda23e`](https://github.com/commercetools/merchant-center-application-kit/commit/edda23e5433c72780f447c42dc7123084353eac6)]:
  - @commercetools-frontend/application-shell@22.23.0
  - @commercetools-frontend/mc-scripts@22.23.0
  - @commercetools-frontend/application-shell-connectors@22.23.0
  - @commercetools-frontend/application-components@22.23.0
  - @commercetools-frontend/eslint-config-mc-app@22.23.0
  - @commercetools-frontend/application-config@22.23.0
  - @commercetools-frontend/jest-preset-mc-app@22.23.0
  - @commercetools-frontend/actions-global@22.23.0
  - @commercetools-frontend/permissions@22.23.0
  - @commercetools-frontend/i18n@22.23.0
  - @commercetools-frontend/l10n@22.23.0
  - @commercetools-frontend/constants@22.23.0
  - @commercetools-frontend/mc-dev-authentication@22.23.0
  - @commercetools-frontend/assets@22.23.0

## 22.22.0

### Patch Changes

- Updated dependencies [[`a79f0684a`](https://github.com/commercetools/merchant-center-application-kit/commit/a79f0684af40c53b3d78d8d34543e95895261820), [`cf7c7bb9b`](https://github.com/commercetools/merchant-center-application-kit/commit/cf7c7bb9b1f032e621e1f6e26e61e4336aa690d8)]:
  - @commercetools-frontend/application-shell@22.22.0
  - @commercetools-frontend/i18n@22.22.0
  - @commercetools-frontend/application-components@22.22.0
  - @commercetools-frontend/mc-scripts@22.22.0
  - @commercetools-frontend/actions-global@22.22.0
  - @commercetools-frontend/application-config@22.22.0
  - @commercetools-frontend/application-shell-connectors@22.22.0
  - @commercetools-frontend/assets@22.22.0
  - @commercetools-frontend/constants@22.22.0
  - @commercetools-frontend/eslint-config-mc-app@22.22.0
  - @commercetools-frontend/jest-preset-mc-app@22.22.0
  - @commercetools-frontend/l10n@22.22.0
  - @commercetools-frontend/mc-dev-authentication@22.22.0
  - @commercetools-frontend/permissions@22.22.0

## 22.21.0

### Patch Changes

- Updated dependencies [[`dc5167fd4`](https://github.com/commercetools/merchant-center-application-kit/commit/dc5167fd4e6d52d5c3dd0faab806a3da78dee4b3), [`a3c5849ae`](https://github.com/commercetools/merchant-center-application-kit/commit/a3c5849aee5a60ab8115baec1147a94edc4ffe9d), [`9e4697fff`](https://github.com/commercetools/merchant-center-application-kit/commit/9e4697fffaad77be9884ad5ba8f4e7d80177e6d7), [`463a10122`](https://github.com/commercetools/merchant-center-application-kit/commit/463a101222d2a361de32a61839384b815efe2c50), [`6632b3200`](https://github.com/commercetools/merchant-center-application-kit/commit/6632b3200886c7fd6021324fe3f223c6d5346f23), [`9c817efc4`](https://github.com/commercetools/merchant-center-application-kit/commit/9c817efc4f55000570c5b8ce44bdf463bfe112f7)]:
  - @commercetools-frontend/i18n@22.21.0
  - @commercetools-frontend/application-components@22.21.0
  - @commercetools-frontend/application-shell@22.21.0
  - @commercetools-frontend/assets@22.21.0
  - @commercetools-frontend/mc-scripts@22.21.0
  - @commercetools-frontend/application-config@22.21.0
  - @commercetools-frontend/actions-global@22.21.0
  - @commercetools-frontend/application-shell-connectors@22.21.0
  - @commercetools-frontend/constants@22.21.0
  - @commercetools-frontend/eslint-config-mc-app@22.21.0
  - @commercetools-frontend/jest-preset-mc-app@22.21.0
  - @commercetools-frontend/l10n@22.21.0
  - @commercetools-frontend/mc-dev-authentication@22.21.0
  - @commercetools-frontend/permissions@22.21.0

## 22.20.0

### Patch Changes

- Updated dependencies [[`02cd76b66`](https://github.com/commercetools/merchant-center-application-kit/commit/02cd76b66ded47cd899b3eeee8cee27bd4d6a353), [`6f0e6f6e1`](https://github.com/commercetools/merchant-center-application-kit/commit/6f0e6f6e1c39e66f18b6cef5038fef303e9d3024), [`113d92c93`](https://github.com/commercetools/merchant-center-application-kit/commit/113d92c93ab574a34129d4b193da963bb90a16f6), [`fc216dc41`](https://github.com/commercetools/merchant-center-application-kit/commit/fc216dc4139e6ab736f13ea48e85adea07024c27)]:
  - @commercetools-frontend/application-shell@22.20.0
  - @commercetools-frontend/i18n@22.20.0
  - @commercetools-frontend/application-components@22.20.0
  - @commercetools-frontend/mc-scripts@22.20.0
  - @commercetools-frontend/actions-global@22.20.0
  - @commercetools-frontend/application-config@22.20.0
  - @commercetools-frontend/application-shell-connectors@22.20.0
  - @commercetools-frontend/assets@22.20.0
  - @commercetools-frontend/constants@22.20.0
  - @commercetools-frontend/eslint-config-mc-app@22.20.0
  - @commercetools-frontend/jest-preset-mc-app@22.20.0
  - @commercetools-frontend/l10n@22.20.0
  - @commercetools-frontend/mc-dev-authentication@22.20.0
  - @commercetools-frontend/permissions@22.20.0

## 22.19.0

### Minor Changes

- [#3414](https://github.com/commercetools/merchant-center-application-kit/pull/3414) [`dc2b492db`](https://github.com/commercetools/merchant-center-application-kit/commit/dc2b492db5e727d263017679a6fb4c5c61c1c01f) Thanks [@kark](https://github.com/kark)! - Update all App-kit components to support the upcoming new colour scheme

### Patch Changes

- Updated dependencies [[`e076438da`](https://github.com/commercetools/merchant-center-application-kit/commit/e076438da68e8931b4d221ab9b5bde6fb0cdf565), [`dc2b492db`](https://github.com/commercetools/merchant-center-application-kit/commit/dc2b492db5e727d263017679a6fb4c5c61c1c01f), [`325224ea5`](https://github.com/commercetools/merchant-center-application-kit/commit/325224ea5de9517065cf1c6f70cfef8e28b6eb51)]:
  - @commercetools-frontend/application-components@22.19.0
  - @commercetools-frontend/application-shell@22.19.0
  - @commercetools-frontend/assets@22.19.0
  - @commercetools-frontend/constants@22.19.0
  - @commercetools-frontend/i18n@22.19.0
  - @commercetools-frontend/mc-scripts@22.19.0
  - @commercetools-frontend/application-config@22.19.0
  - @commercetools-frontend/actions-global@22.19.0
  - @commercetools-frontend/application-shell-connectors@22.19.0
  - @commercetools-frontend/mc-dev-authentication@22.19.0
  - @commercetools-frontend/permissions@22.19.0
  - @commercetools-frontend/l10n@22.19.0
  - @commercetools-frontend/eslint-config-mc-app@22.19.0
  - @commercetools-frontend/jest-preset-mc-app@22.19.0

## 22.18.0

### Patch Changes

- Updated dependencies [[`16de26adb`](https://github.com/commercetools/merchant-center-application-kit/commit/16de26adb0c77e580e5bf64de2ff0ad805672d7c), [`9f4eb875d`](https://github.com/commercetools/merchant-center-application-kit/commit/9f4eb875d16db0bd6f9a7ef65e79d7bdb18336ff), [`d575e8402`](https://github.com/commercetools/merchant-center-application-kit/commit/d575e8402d480b6efa513db4cb856aee9e0a1fa2), [`0763c6566`](https://github.com/commercetools/merchant-center-application-kit/commit/0763c6566ba6f6f363ed44d2667b5bd8e158d73d)]:
  - @commercetools-frontend/application-components@22.18.0
  - @commercetools-frontend/i18n@22.18.0
  - @commercetools-frontend/application-shell-connectors@22.18.0
  - @commercetools-frontend/application-shell@22.18.0
  - @commercetools-frontend/permissions@22.18.0
  - @commercetools-frontend/mc-scripts@22.18.0
  - @commercetools-frontend/actions-global@22.18.0
  - @commercetools-frontend/application-config@22.18.0
  - @commercetools-frontend/assets@22.18.0
  - @commercetools-frontend/constants@22.18.0
  - @commercetools-frontend/eslint-config-mc-app@22.18.0
  - @commercetools-frontend/jest-preset-mc-app@22.18.0
  - @commercetools-frontend/l10n@22.18.0
  - @commercetools-frontend/mc-dev-authentication@22.18.0

## 22.17.2

### Patch Changes

- Updated dependencies [[`17c246a84`](https://github.com/commercetools/merchant-center-application-kit/commit/17c246a84e51516ecf8d157ac9b6b9235a57a5e3), [`f69913f8b`](https://github.com/commercetools/merchant-center-application-kit/commit/f69913f8ba98e5c0e09bd5cf06e3afb788752404), [`7eb6f3ad1`](https://github.com/commercetools/merchant-center-application-kit/commit/7eb6f3ad1c337ec676fa5665f3a863d1953a202f), [`a487b0114`](https://github.com/commercetools/merchant-center-application-kit/commit/a487b011438d180227d99774257b10dd8aa7198f)]:
  - @commercetools-frontend/application-components@22.17.2
  - @commercetools-frontend/application-shell-connectors@22.17.2
  - @commercetools-frontend/application-shell@22.17.2
  - @commercetools-frontend/mc-scripts@22.17.2
  - @commercetools-frontend/permissions@22.17.2
  - @commercetools-frontend/actions-global@22.17.2
  - @commercetools-frontend/application-config@22.17.2
  - @commercetools-frontend/assets@22.17.2
  - @commercetools-frontend/constants@22.17.2
  - @commercetools-frontend/eslint-config-mc-app@22.17.2
  - @commercetools-frontend/i18n@22.17.2
  - @commercetools-frontend/jest-preset-mc-app@22.17.2
  - @commercetools-frontend/l10n@22.17.2
  - @commercetools-frontend/mc-dev-authentication@22.17.2

## 22.17.1

### Patch Changes

- [#3355](https://github.com/commercetools/merchant-center-application-kit/pull/3355) [`c8e51adb7`](https://github.com/commercetools/merchant-center-application-kit/commit/c8e51adb759786a9db8be17ea3b985caa4e0890a) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all test-data packages to v6.11.0

- Updated dependencies [[`8ad52e2c9`](https://github.com/commercetools/merchant-center-application-kit/commit/8ad52e2c9460744d3f49af929db47562830c9639), [`973be93ea`](https://github.com/commercetools/merchant-center-application-kit/commit/973be93ea1b733a2ff7d69f239e6c1ca76d6072c)]:
  - @commercetools-frontend/assets@22.17.1
  - @commercetools-frontend/application-shell@22.17.1
  - @commercetools-frontend/application-components@22.17.1
  - @commercetools-frontend/application-config@22.17.1
  - @commercetools-frontend/mc-scripts@22.17.1
  - @commercetools-frontend/actions-global@22.17.1
  - @commercetools-frontend/application-shell-connectors@22.17.1
  - @commercetools-frontend/constants@22.17.1
  - @commercetools-frontend/eslint-config-mc-app@22.17.1
  - @commercetools-frontend/i18n@22.17.1
  - @commercetools-frontend/jest-preset-mc-app@22.17.1
  - @commercetools-frontend/l10n@22.17.1
  - @commercetools-frontend/mc-dev-authentication@22.17.1
  - @commercetools-frontend/permissions@22.17.1

## 22.17.0

### Minor Changes

- [#3379](https://github.com/commercetools/merchant-center-application-kit/pull/3379) [`d2e3a2236`](https://github.com/commercetools/merchant-center-application-kit/commit/d2e3a22361140ee77b4aa7f624d7b2b71de35bab) Thanks [@tylermorrisford](https://github.com/tylermorrisford)! - Update all logos in `assets/logos/`, all logos in `assets/images/` and embedded logo in `application.html`.

### Patch Changes

- Updated dependencies [[`628b81086`](https://github.com/commercetools/merchant-center-application-kit/commit/628b810867520022c719abb0133953d4a24c1fc3), [`bf1a7a002`](https://github.com/commercetools/merchant-center-application-kit/commit/bf1a7a002264689305a9023eb86fae3ac7630b12), [`047e44e01`](https://github.com/commercetools/merchant-center-application-kit/commit/047e44e0119032707f6a1feac8846f58d4d44f28), [`d2e3a2236`](https://github.com/commercetools/merchant-center-application-kit/commit/d2e3a22361140ee77b4aa7f624d7b2b71de35bab), [`fe6314779`](https://github.com/commercetools/merchant-center-application-kit/commit/fe63147792caaea41be1c96ce17dbee57cd7209e)]:
  - @commercetools-frontend/mc-scripts@22.17.0
  - @commercetools-frontend/application-shell@22.17.0
  - @commercetools-frontend/application-config@22.17.0
  - @commercetools-frontend/application-shell-connectors@22.17.0
  - @commercetools-frontend/application-components@22.17.0
  - @commercetools-frontend/mc-dev-authentication@22.17.0
  - @commercetools-frontend/eslint-config-mc-app@22.17.0
  - @commercetools-frontend/jest-preset-mc-app@22.17.0
  - @commercetools-frontend/actions-global@22.17.0
  - @commercetools-frontend/permissions@22.17.0
  - @commercetools-frontend/constants@22.17.0
  - @commercetools-frontend/assets@22.17.0
  - @commercetools-frontend/i18n@22.17.0
  - @commercetools-frontend/l10n@22.17.0

## 22.16.0

### Patch Changes

- [#3382](https://github.com/commercetools/merchant-center-application-kit/pull/3382) [`97d102879`](https://github.com/commercetools/merchant-center-application-kit/commit/97d10287980b95342f2bc06d6e172ac11097cb56) Thanks [@chloe0592](https://github.com/chloe0592)! - Update all ui-kit packages to v17.0.0

- Updated dependencies [[`d7bff45b9`](https://github.com/commercetools/merchant-center-application-kit/commit/d7bff45b9ba10530139eb4ea52a7dbb8dddc86e7), [`4e6a89b40`](https://github.com/commercetools/merchant-center-application-kit/commit/4e6a89b40e697562abb1e15e904d400fc84930c7), [`97d102879`](https://github.com/commercetools/merchant-center-application-kit/commit/97d10287980b95342f2bc06d6e172ac11097cb56), [`d437612a8`](https://github.com/commercetools/merchant-center-application-kit/commit/d437612a894be32eaa6c124c8e0d1b126148e049), [`05dfdefd5`](https://github.com/commercetools/merchant-center-application-kit/commit/05dfdefd5a4827621e8aa583484af43f57c8d367)]:
  - @commercetools-frontend/application-shell-connectors@22.16.0
  - @commercetools-frontend/application-shell@22.16.0
  - @commercetools-frontend/permissions@22.16.0
  - @commercetools-frontend/application-components@22.16.0
  - @commercetools-frontend/i18n@22.16.0
  - @commercetools-frontend/mc-scripts@22.16.0
  - @commercetools-frontend/actions-global@22.16.0
  - @commercetools-frontend/application-config@22.16.0
  - @commercetools-frontend/assets@22.16.0
  - @commercetools-frontend/constants@22.16.0
  - @commercetools-frontend/eslint-config-mc-app@22.16.0
  - @commercetools-frontend/jest-preset-mc-app@22.16.0
  - @commercetools-frontend/l10n@22.16.0
  - @commercetools-frontend/mc-dev-authentication@22.16.0

## 22.15.1

### Patch Changes

- [#3369](https://github.com/commercetools/merchant-center-application-kit/pull/3369) [`a4f1d8814`](https://github.com/commercetools/merchant-center-application-kit/commit/a4f1d88146a82173afeb34bda5f7c5936b63c872) Thanks [@tdeekens](https://github.com/tdeekens)! - Update eslint to 8.56.0.

- Updated dependencies [[`a4f1d8814`](https://github.com/commercetools/merchant-center-application-kit/commit/a4f1d88146a82173afeb34bda5f7c5936b63c872)]:
  - @commercetools-frontend/eslint-config-mc-app@22.15.1
  - @commercetools-frontend/actions-global@22.15.1
  - @commercetools-frontend/application-components@22.15.1
  - @commercetools-frontend/application-config@22.15.1
  - @commercetools-frontend/application-shell@22.15.1
  - @commercetools-frontend/application-shell-connectors@22.15.1
  - @commercetools-frontend/assets@22.15.1
  - @commercetools-frontend/constants@22.15.1
  - @commercetools-frontend/i18n@22.15.1
  - @commercetools-frontend/jest-preset-mc-app@22.15.1
  - @commercetools-frontend/l10n@22.15.1
  - @commercetools-frontend/mc-dev-authentication@22.15.1
  - @commercetools-frontend/mc-scripts@22.15.1
  - @commercetools-frontend/permissions@22.15.1

## 22.15.0

### Minor Changes

- [#3365](https://github.com/commercetools/merchant-center-application-kit/pull/3365) [`996be773d`](https://github.com/commercetools/merchant-center-application-kit/commit/996be773de148122402f8b1ced36ec8ab10025ef) Thanks [@emmenko](https://github.com/emmenko)! - Enable React strict mode by default

### Patch Changes

- [#3367](https://github.com/commercetools/merchant-center-application-kit/pull/3367) [`71414b4b2`](https://github.com/commercetools/merchant-center-application-kit/commit/71414b4b277c1d03bcbdc7d79483eec1d5814720) Thanks [@emmenko](https://github.com/emmenko)! - Align dependency versions with other templates

- Updated dependencies [[`8093695a0`](https://github.com/commercetools/merchant-center-application-kit/commit/8093695a006f30598ccab0d66d052f0a32862f3b), [`71414b4b2`](https://github.com/commercetools/merchant-center-application-kit/commit/71414b4b277c1d03bcbdc7d79483eec1d5814720), [`48f11f9dd`](https://github.com/commercetools/merchant-center-application-kit/commit/48f11f9dd17e977c628206506d2f6af0cee1c269), [`996be773d`](https://github.com/commercetools/merchant-center-application-kit/commit/996be773de148122402f8b1ced36ec8ab10025ef), [`48f11f9dd`](https://github.com/commercetools/merchant-center-application-kit/commit/48f11f9dd17e977c628206506d2f6af0cee1c269), [`72ae1d305`](https://github.com/commercetools/merchant-center-application-kit/commit/72ae1d305ca209d23552d0062f96324e19e40679), [`551e64ee5`](https://github.com/commercetools/merchant-center-application-kit/commit/551e64ee540653899095120f4436ec800dc8b19e), [`30ecac441`](https://github.com/commercetools/merchant-center-application-kit/commit/30ecac4410a8ed2ba5393fa57054653111284e4e), [`72ae1d305`](https://github.com/commercetools/merchant-center-application-kit/commit/72ae1d305ca209d23552d0062f96324e19e40679)]:
  - @commercetools-frontend/application-shell@22.15.0
  - @commercetools-frontend/jest-preset-mc-app@22.15.0
  - @commercetools-frontend/application-components@22.15.0
  - @commercetools-frontend/application-shell-connectors@22.15.0
  - @commercetools-frontend/constants@22.15.0
  - @commercetools-frontend/application-config@22.15.0
  - @commercetools-frontend/mc-scripts@22.15.0
  - @commercetools-frontend/permissions@22.15.0
  - @commercetools-frontend/actions-global@22.15.0
  - @commercetools-frontend/mc-dev-authentication@22.15.0
  - @commercetools-frontend/i18n@22.15.0
  - @commercetools-frontend/l10n@22.15.0
  - @commercetools-frontend/assets@22.15.0
  - @commercetools-frontend/eslint-config-mc-app@22.15.0

## 22.14.3

### Patch Changes

- Updated dependencies [[`96a050a18`](https://github.com/commercetools/merchant-center-application-kit/commit/96a050a18818243b38866541dd2f3498d46db447), [`77f3de598`](https://github.com/commercetools/merchant-center-application-kit/commit/77f3de5983ba0470034c99bea2982ef94a791856)]:
  - @commercetools-frontend/application-components@22.14.3
  - @commercetools-frontend/application-shell@22.14.3
  - @commercetools-frontend/mc-scripts@22.14.3
  - @commercetools-frontend/actions-global@22.14.3
  - @commercetools-frontend/application-config@22.14.3
  - @commercetools-frontend/application-shell-connectors@22.14.3
  - @commercetools-frontend/assets@22.14.3
  - @commercetools-frontend/constants@22.14.3
  - @commercetools-frontend/eslint-config-mc-app@22.14.3
  - @commercetools-frontend/i18n@22.14.3
  - @commercetools-frontend/jest-preset-mc-app@22.14.3
  - @commercetools-frontend/l10n@22.14.3
  - @commercetools-frontend/mc-dev-authentication@22.14.3
  - @commercetools-frontend/permissions@22.14.3

## 22.14.2

### Patch Changes

- Updated dependencies [[`483fae792`](https://github.com/commercetools/merchant-center-application-kit/commit/483fae792f1e85a20ba7959fe937d4e9faa30efd), [`483fae792`](https://github.com/commercetools/merchant-center-application-kit/commit/483fae792f1e85a20ba7959fe937d4e9faa30efd), [`5314f169e`](https://github.com/commercetools/merchant-center-application-kit/commit/5314f169e8af0ffcc820b57b818ac5495b92c45a), [`e7b84b1fb`](https://github.com/commercetools/merchant-center-application-kit/commit/e7b84b1fb1eb8de233468dd045d0842d3260e438)]:
  - @commercetools-frontend/application-components@22.14.2
  - @commercetools-frontend/constants@22.14.2
  - @commercetools-frontend/mc-scripts@22.14.2
  - @commercetools-frontend/application-shell@22.14.2
  - @commercetools-frontend/actions-global@22.14.2
  - @commercetools-frontend/application-config@22.14.2
  - @commercetools-frontend/application-shell-connectors@22.14.2
  - @commercetools-frontend/mc-dev-authentication@22.14.2
  - @commercetools-frontend/permissions@22.14.2
  - @commercetools-frontend/i18n@22.14.2
  - @commercetools-frontend/l10n@22.14.2
  - @commercetools-frontend/assets@22.14.2
  - @commercetools-frontend/eslint-config-mc-app@22.14.2
  - @commercetools-frontend/jest-preset-mc-app@22.14.2

## 22.14.1

### Patch Changes

- Updated dependencies [[`225c110b4`](https://github.com/commercetools/merchant-center-application-kit/commit/225c110b46208519b4cd7c4bb26320ba32d8baf4), [`0d0b5330d`](https://github.com/commercetools/merchant-center-application-kit/commit/0d0b5330d2ebe86b5e10166d138db89735a78574), [`7e62ee10c`](https://github.com/commercetools/merchant-center-application-kit/commit/7e62ee10c1e3cb6f3e366e8d0685c720ff5efd03)]:
  - @commercetools-frontend/mc-scripts@22.14.1
  - @commercetools-frontend/application-components@22.14.1
  - @commercetools-frontend/application-shell@22.14.1
  - @commercetools-frontend/actions-global@22.14.1
  - @commercetools-frontend/application-config@22.14.1
  - @commercetools-frontend/application-shell-connectors@22.14.1
  - @commercetools-frontend/assets@22.14.1
  - @commercetools-frontend/constants@22.14.1
  - @commercetools-frontend/eslint-config-mc-app@22.14.1
  - @commercetools-frontend/i18n@22.14.1
  - @commercetools-frontend/jest-preset-mc-app@22.14.1
  - @commercetools-frontend/l10n@22.14.1
  - @commercetools-frontend/mc-dev-authentication@22.14.1
  - @commercetools-frontend/permissions@22.14.1

## 22.14.0

### Patch Changes

- [#3299](https://github.com/commercetools/merchant-center-application-kit/pull/3299) [`66ee37b2a`](https://github.com/commercetools/merchant-center-application-kit/commit/66ee37b2ab19a832e8ff90c4adfa0f7b07fea70d) Thanks [@kark](https://github.com/kark)! - Update `@commercetools-test-data/*` packages to version 6.6.0

- Updated dependencies [[`66ee37b2a`](https://github.com/commercetools/merchant-center-application-kit/commit/66ee37b2ab19a832e8ff90c4adfa0f7b07fea70d), [`66ee37b2a`](https://github.com/commercetools/merchant-center-application-kit/commit/66ee37b2ab19a832e8ff90c4adfa0f7b07fea70d)]:
  - @commercetools-frontend/application-shell-connectors@22.14.0
  - @commercetools-frontend/application-shell@22.14.0
  - @commercetools-frontend/application-components@22.14.0
  - @commercetools-frontend/permissions@22.14.0
  - @commercetools-frontend/mc-scripts@22.14.0
  - @commercetools-frontend/actions-global@22.14.0
  - @commercetools-frontend/application-config@22.14.0
  - @commercetools-frontend/assets@22.14.0
  - @commercetools-frontend/constants@22.14.0
  - @commercetools-frontend/eslint-config-mc-app@22.14.0
  - @commercetools-frontend/i18n@22.14.0
  - @commercetools-frontend/jest-preset-mc-app@22.14.0
  - @commercetools-frontend/l10n@22.14.0
  - @commercetools-frontend/mc-dev-authentication@22.14.0

## 22.13.2

### Patch Changes

- [#3322](https://github.com/commercetools/merchant-center-application-kit/pull/3322) [`13aa6ae2f`](https://github.com/commercetools/merchant-center-application-kit/commit/13aa6ae2fc7c007d5b603d48a030597a4e323923) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Updated `@emotion/react` dependency

- Updated dependencies [[`13aa6ae2f`](https://github.com/commercetools/merchant-center-application-kit/commit/13aa6ae2fc7c007d5b603d48a030597a4e323923), [`13aa6ae2f`](https://github.com/commercetools/merchant-center-application-kit/commit/13aa6ae2fc7c007d5b603d48a030597a4e323923)]:
  - @commercetools-frontend/application-shell-connectors@22.13.2
  - @commercetools-frontend/application-components@22.13.2
  - @commercetools-frontend/application-shell@22.13.2
  - @commercetools-frontend/permissions@22.13.2
  - @commercetools-frontend/i18n@22.13.2
  - @commercetools-frontend/l10n@22.13.2
  - @commercetools-frontend/mc-scripts@22.13.2
  - @commercetools-frontend/actions-global@22.13.2
  - @commercetools-frontend/application-config@22.13.2
  - @commercetools-frontend/assets@22.13.2
  - @commercetools-frontend/constants@22.13.2
  - @commercetools-frontend/eslint-config-mc-app@22.13.2
  - @commercetools-frontend/jest-preset-mc-app@22.13.2
  - @commercetools-frontend/mc-dev-authentication@22.13.2

## 22.13.1

### Patch Changes

- [#3305](https://github.com/commercetools/merchant-center-application-kit/pull/3305) [`44834670b`](https://github.com/commercetools/merchant-center-application-kit/commit/44834670bd2b640644819d483bca2bc2f13677ab) Thanks [@chloe0592](https://github.com/chloe0592)! - Updating UI-Kit dependencies to the `16.11.0` version.

- [#3315](https://github.com/commercetools/merchant-center-application-kit/pull/3315) [`e68b9f876`](https://github.com/commercetools/merchant-center-application-kit/commit/e68b9f8767e81e341266bfea19ec0dda452b775d) Thanks [@chloe0592](https://github.com/chloe0592)! - Update all ui-kit packages to v16.12.0

- Updated dependencies [[`44834670b`](https://github.com/commercetools/merchant-center-application-kit/commit/44834670bd2b640644819d483bca2bc2f13677ab), [`e68b9f876`](https://github.com/commercetools/merchant-center-application-kit/commit/e68b9f8767e81e341266bfea19ec0dda452b775d), [`a718c4869`](https://github.com/commercetools/merchant-center-application-kit/commit/a718c4869edbf174315ab1f1f0c2029a6f4bf189), [`44834670b`](https://github.com/commercetools/merchant-center-application-kit/commit/44834670bd2b640644819d483bca2bc2f13677ab), [`4662db514`](https://github.com/commercetools/merchant-center-application-kit/commit/4662db514b6c5e79cee906fc9bfb364398cb5e49), [`a567e137c`](https://github.com/commercetools/merchant-center-application-kit/commit/a567e137c0e20ece0e3b5081ee954ccd9896d156), [`ceb1b741f`](https://github.com/commercetools/merchant-center-application-kit/commit/ceb1b741f592ce59ea917b98524b59024d969e4f), [`56e4fcedd`](https://github.com/commercetools/merchant-center-application-kit/commit/56e4fcedd444d7aceaeb38ff789b5bd0eaaaca0f)]:
  - @commercetools-frontend/application-components@22.13.1
  - @commercetools-frontend/application-shell@22.13.1
  - @commercetools-frontend/i18n@22.13.1
  - @commercetools-frontend/l10n@22.13.1
  - @commercetools-frontend/mc-scripts@22.13.1
  - @commercetools-frontend/actions-global@22.13.1
  - @commercetools-frontend/application-config@22.13.1
  - @commercetools-frontend/application-shell-connectors@22.13.1
  - @commercetools-frontend/assets@22.13.1
  - @commercetools-frontend/constants@22.13.1
  - @commercetools-frontend/eslint-config-mc-app@22.13.1
  - @commercetools-frontend/jest-preset-mc-app@22.13.1
  - @commercetools-frontend/mc-dev-authentication@22.13.1
  - @commercetools-frontend/permissions@22.13.1

## 22.13.0

### Patch Changes

- Updated dependencies [[`bbd48e591`](https://github.com/commercetools/merchant-center-application-kit/commit/bbd48e591553fdd72505342c04db6249742a4be1), [`db6e172ce`](https://github.com/commercetools/merchant-center-application-kit/commit/db6e172ce4d679a66fc6030e4f67c4fb5661d065)]:
  - @commercetools-frontend/application-shell@22.13.0
  - @commercetools-frontend/application-components@22.13.0
  - @commercetools-frontend/mc-scripts@22.13.0
  - @commercetools-frontend/actions-global@22.13.0
  - @commercetools-frontend/application-config@22.13.0
  - @commercetools-frontend/application-shell-connectors@22.13.0
  - @commercetools-frontend/assets@22.13.0
  - @commercetools-frontend/constants@22.13.0
  - @commercetools-frontend/eslint-config-mc-app@22.13.0
  - @commercetools-frontend/i18n@22.13.0
  - @commercetools-frontend/jest-preset-mc-app@22.13.0
  - @commercetools-frontend/l10n@22.13.0
  - @commercetools-frontend/mc-dev-authentication@22.13.0
  - @commercetools-frontend/permissions@22.13.0

## 22.12.0

### Minor Changes

- [#3292](https://github.com/commercetools/merchant-center-application-kit/pull/3292) [`5de8c88ed`](https://github.com/commercetools/merchant-center-application-kit/commit/5de8c88ed385215a88fcf366bf013bcc725bf87a) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Use the `useCustomViewContext` hook to fetch context data in the channels view example.

### Patch Changes

- Updated dependencies [[`5de8c88ed`](https://github.com/commercetools/merchant-center-application-kit/commit/5de8c88ed385215a88fcf366bf013bcc725bf87a), [`f49adc33b`](https://github.com/commercetools/merchant-center-application-kit/commit/f49adc33b83504f6498131ee41525287110f079a), [`e987dbfbc`](https://github.com/commercetools/merchant-center-application-kit/commit/e987dbfbc6473b631e86f57e843e6d7267d8cd04), [`5de8c88ed`](https://github.com/commercetools/merchant-center-application-kit/commit/5de8c88ed385215a88fcf366bf013bcc725bf87a), [`5de8c88ed`](https://github.com/commercetools/merchant-center-application-kit/commit/5de8c88ed385215a88fcf366bf013bcc725bf87a), [`41b15c7cb`](https://github.com/commercetools/merchant-center-application-kit/commit/41b15c7cb6773f92a83a1a16f5d8462fccd09da2), [`828189d5d`](https://github.com/commercetools/merchant-center-application-kit/commit/828189d5d2cda9e7d628d2db3c9e33cd4ae57110), [`d3f4c91f1`](https://github.com/commercetools/merchant-center-application-kit/commit/d3f4c91f179a0f44801370e3d807b31e352a6ca2), [`b5dde0308`](https://github.com/commercetools/merchant-center-application-kit/commit/b5dde030825750d21d80fbdbfceb995de2f07fb2)]:
  - @commercetools-frontend/application-config@22.12.0
  - @commercetools-frontend/application-components@22.12.0
  - @commercetools-frontend/application-shell@22.12.0
  - @commercetools-frontend/application-shell-connectors@22.12.0
  - @commercetools-frontend/mc-scripts@22.12.0
  - @commercetools-frontend/constants@22.12.0
  - @commercetools-frontend/i18n@22.12.0
  - @commercetools-frontend/mc-dev-authentication@22.12.0
  - @commercetools-frontend/permissions@22.12.0
  - @commercetools-frontend/actions-global@22.12.0
  - @commercetools-frontend/l10n@22.12.0
  - @commercetools-frontend/assets@22.12.0
  - @commercetools-frontend/eslint-config-mc-app@22.12.0
  - @commercetools-frontend/jest-preset-mc-app@22.12.0

## 22.11.0

### Patch Changes

- Updated dependencies [[`0c4936402`](https://github.com/commercetools/merchant-center-application-kit/commit/0c493640240fde1f7300070b6c19c67d5f203e8e), [`3e11bae8a`](https://github.com/commercetools/merchant-center-application-kit/commit/3e11bae8a39c3f1ea47cd2fc032a04bde5077d9d), [`0375328b1`](https://github.com/commercetools/merchant-center-application-kit/commit/0375328b1c84dd6065270b5fb991db134fa53016), [`0375328b1`](https://github.com/commercetools/merchant-center-application-kit/commit/0375328b1c84dd6065270b5fb991db134fa53016)]:
  - @commercetools-frontend/application-components@22.11.0
  - @commercetools-frontend/application-shell@22.11.0
  - @commercetools-frontend/constants@22.11.0
  - @commercetools-frontend/mc-scripts@22.11.0
  - @commercetools-frontend/actions-global@22.11.0
  - @commercetools-frontend/application-config@22.11.0
  - @commercetools-frontend/application-shell-connectors@22.11.0
  - @commercetools-frontend/mc-dev-authentication@22.11.0
  - @commercetools-frontend/permissions@22.11.0
  - @commercetools-frontend/i18n@22.11.0
  - @commercetools-frontend/l10n@22.11.0
  - @commercetools-frontend/assets@22.11.0
  - @commercetools-frontend/eslint-config-mc-app@22.11.0
  - @commercetools-frontend/jest-preset-mc-app@22.11.0

## 22.10.0

### Patch Changes

- Updated dependencies [[`deed7bafc`](https://github.com/commercetools/merchant-center-application-kit/commit/deed7bafcb70b8ec2258d4c752f7e81b7eccf079), [`669a46bf7`](https://github.com/commercetools/merchant-center-application-kit/commit/669a46bf718e2d6eb50bed5813463ed8a2c8dae3), [`6bef6add7`](https://github.com/commercetools/merchant-center-application-kit/commit/6bef6add77b7567de18e447b4881caf8e7b10393), [`6398b1946`](https://github.com/commercetools/merchant-center-application-kit/commit/6398b1946f24ee89b241f3f2eb7dd6d68de6e105)]:
  - @commercetools-frontend/application-config@22.10.0
  - @commercetools-frontend/application-shell@22.10.0
  - @commercetools-frontend/application-components@22.10.0
  - @commercetools-frontend/application-shell-connectors@22.10.0
  - @commercetools-frontend/mc-dev-authentication@22.10.0
  - @commercetools-frontend/mc-scripts@22.10.0
  - @commercetools-frontend/permissions@22.10.0
  - @commercetools-frontend/actions-global@22.10.0
  - @commercetools-frontend/assets@22.10.0
  - @commercetools-frontend/constants@22.10.0
  - @commercetools-frontend/eslint-config-mc-app@22.10.0
  - @commercetools-frontend/i18n@22.10.0
  - @commercetools-frontend/jest-preset-mc-app@22.10.0
  - @commercetools-frontend/l10n@22.10.0

## 22.9.1

### Patch Changes

- Updated dependencies [[`d4765a2bb`](https://github.com/commercetools/merchant-center-application-kit/commit/d4765a2bb9be81220b22601178104886da86b8dc)]:
  - @commercetools-frontend/jest-preset-mc-app@22.9.1
  - @commercetools-frontend/actions-global@22.9.1
  - @commercetools-frontend/application-components@22.9.1
  - @commercetools-frontend/application-config@22.9.1
  - @commercetools-frontend/application-shell@22.9.1
  - @commercetools-frontend/application-shell-connectors@22.9.1
  - @commercetools-frontend/assets@22.9.1
  - @commercetools-frontend/constants@22.9.1
  - @commercetools-frontend/eslint-config-mc-app@22.9.1
  - @commercetools-frontend/i18n@22.9.1
  - @commercetools-frontend/l10n@22.9.1
  - @commercetools-frontend/mc-dev-authentication@22.9.1
  - @commercetools-frontend/mc-scripts@22.9.1
  - @commercetools-frontend/permissions@22.9.1

## 22.9.0

### Patch Changes

- Updated dependencies [[`fe0b5f7f5`](https://github.com/commercetools/merchant-center-application-kit/commit/fe0b5f7f5bedaab4850d38d0c1df29650689b96e), [`6023ff29e`](https://github.com/commercetools/merchant-center-application-kit/commit/6023ff29eb52ab322303065657c643100ecc4fa1), [`6023ff29e`](https://github.com/commercetools/merchant-center-application-kit/commit/6023ff29eb52ab322303065657c643100ecc4fa1)]:
  - @commercetools-frontend/application-components@22.9.0
  - @commercetools-frontend/constants@22.9.0
  - @commercetools-frontend/application-shell-connectors@22.9.0
  - @commercetools-frontend/application-shell@22.9.0
  - @commercetools-frontend/mc-scripts@22.9.0
  - @commercetools-frontend/actions-global@22.9.0
  - @commercetools-frontend/application-config@22.9.0
  - @commercetools-frontend/permissions@22.9.0
  - @commercetools-frontend/mc-dev-authentication@22.9.0
  - @commercetools-frontend/i18n@22.9.0
  - @commercetools-frontend/l10n@22.9.0
  - @commercetools-frontend/assets@22.9.0
  - @commercetools-frontend/eslint-config-mc-app@22.9.0
  - @commercetools-frontend/jest-preset-mc-app@22.9.0

## 22.8.4

### Patch Changes

- Updated dependencies [[`a009c4281`](https://github.com/commercetools/merchant-center-application-kit/commit/a009c4281dc37df9e776ec4b1e923340fe20cd5f), [`b7414e2f7`](https://github.com/commercetools/merchant-center-application-kit/commit/b7414e2f735c1bb160ee33f22b518f55022ec0f1), [`3a0e42017`](https://github.com/commercetools/merchant-center-application-kit/commit/3a0e42017c01ec063215c0f9051a778a0a6f92a5), [`f7c1da442`](https://github.com/commercetools/merchant-center-application-kit/commit/f7c1da4424c95d3c403fba3470455a6b09ef3cca), [`71cce1fdf`](https://github.com/commercetools/merchant-center-application-kit/commit/71cce1fdf050050cc0d92f1472a5df82b45ca5b9)]:
  - @commercetools-frontend/application-shell@22.8.4
  - @commercetools-frontend/mc-scripts@22.8.4
  - @commercetools-frontend/actions-global@22.8.4
  - @commercetools-frontend/application-components@22.8.4
  - @commercetools-frontend/application-config@22.8.4
  - @commercetools-frontend/application-shell-connectors@22.8.4
  - @commercetools-frontend/assets@22.8.4
  - @commercetools-frontend/constants@22.8.4
  - @commercetools-frontend/eslint-config-mc-app@22.8.4
  - @commercetools-frontend/i18n@22.8.4
  - @commercetools-frontend/jest-preset-mc-app@22.8.4
  - @commercetools-frontend/l10n@22.8.4
  - @commercetools-frontend/mc-dev-authentication@22.8.4
  - @commercetools-frontend/permissions@22.8.4

## 22.8.3

### Patch Changes

- Updated dependencies [[`9d8b6fc04`](https://github.com/commercetools/merchant-center-application-kit/commit/9d8b6fc04d9b6cf788cb58b7dba9faa177ddf5e3), [`689cc6e32`](https://github.com/commercetools/merchant-center-application-kit/commit/689cc6e3239e2f795c3525cd0202a639f632f416)]:
  - @commercetools-frontend/application-shell@22.8.3
  - @commercetools-frontend/actions-global@22.8.3
  - @commercetools-frontend/application-components@22.8.3
  - @commercetools-frontend/application-config@22.8.3
  - @commercetools-frontend/application-shell-connectors@22.8.3
  - @commercetools-frontend/assets@22.8.3
  - @commercetools-frontend/constants@22.8.3
  - @commercetools-frontend/eslint-config-mc-app@22.8.3
  - @commercetools-frontend/i18n@22.8.3
  - @commercetools-frontend/jest-preset-mc-app@22.8.3
  - @commercetools-frontend/l10n@22.8.3
  - @commercetools-frontend/mc-dev-authentication@22.8.3
  - @commercetools-frontend/mc-scripts@22.8.3
  - @commercetools-frontend/permissions@22.8.3

## 22.8.2

### Patch Changes

- Updated dependencies [[`b23bd6049`](https://github.com/commercetools/merchant-center-application-kit/commit/b23bd60490be8822549c418fc431825bf0058a5f), [`2f1956868`](https://github.com/commercetools/merchant-center-application-kit/commit/2f1956868b248161fcaf77c41774f494bb2f9a90), [`ef6aad473`](https://github.com/commercetools/merchant-center-application-kit/commit/ef6aad47368889fe1c69d847a16f092cf591c6d0), [`11a7cdecd`](https://github.com/commercetools/merchant-center-application-kit/commit/11a7cdecde958096c46cde8f53102784e5831044), [`db0ae5b18`](https://github.com/commercetools/merchant-center-application-kit/commit/db0ae5b18d51fbce7f1527ff202b30832b1a05c5)]:
  - @commercetools-frontend/application-shell@22.8.2
  - @commercetools-frontend/mc-scripts@22.8.2
  - @commercetools-frontend/actions-global@22.8.2
  - @commercetools-frontend/application-components@22.8.2
  - @commercetools-frontend/application-config@22.8.2
  - @commercetools-frontend/application-shell-connectors@22.8.2
  - @commercetools-frontend/assets@22.8.2
  - @commercetools-frontend/constants@22.8.2
  - @commercetools-frontend/eslint-config-mc-app@22.8.2
  - @commercetools-frontend/i18n@22.8.2
  - @commercetools-frontend/jest-preset-mc-app@22.8.2
  - @commercetools-frontend/l10n@22.8.2
  - @commercetools-frontend/mc-dev-authentication@22.8.2
  - @commercetools-frontend/permissions@22.8.2

## 22.8.1

### Patch Changes

- Updated dependencies [[`ec2c26677`](https://github.com/commercetools/merchant-center-application-kit/commit/ec2c26677f0aa6119d9f8eff247f620720a4d8ee), [`10ade8b9b`](https://github.com/commercetools/merchant-center-application-kit/commit/10ade8b9bab48a6d08abfd7fc31c3a3e8f48f3a4)]:
  - @commercetools-frontend/application-config@22.8.1
  - @commercetools-frontend/application-shell@22.8.1
  - @commercetools-frontend/mc-dev-authentication@22.8.1
  - @commercetools-frontend/mc-scripts@22.8.1
  - @commercetools-frontend/actions-global@22.8.1
  - @commercetools-frontend/application-components@22.8.1
  - @commercetools-frontend/application-shell-connectors@22.8.1
  - @commercetools-frontend/assets@22.8.1
  - @commercetools-frontend/constants@22.8.1
  - @commercetools-frontend/eslint-config-mc-app@22.8.1
  - @commercetools-frontend/i18n@22.8.1
  - @commercetools-frontend/jest-preset-mc-app@22.8.1
  - @commercetools-frontend/l10n@22.8.1
  - @commercetools-frontend/permissions@22.8.1

## 22.8.0

### Minor Changes

- [#3175](https://github.com/commercetools/merchant-center-application-kit/pull/3175) [`bd9df94b5`](https://github.com/commercetools/merchant-center-application-kit/commit/bd9df94b565faf308f82bd39d6ca4ebf5892ed9f) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - New template for developing a Custom View. Please do not use yet, the feature is not production ready.

### Patch Changes

- Updated dependencies [[`f30cc5ca6`](https://github.com/commercetools/merchant-center-application-kit/commit/f30cc5ca6d9f9f47836b04915ac7233ac1437976), [`d5e7303fd`](https://github.com/commercetools/merchant-center-application-kit/commit/d5e7303fd9ca450fabba47c2fdccf1a275852f00), [`cf560fbd4`](https://github.com/commercetools/merchant-center-application-kit/commit/cf560fbd47d284657e06fc27af9387b342557924), [`e0a7b5150`](https://github.com/commercetools/merchant-center-application-kit/commit/e0a7b515058a389794d5040cb4b7785708d59cbb), [`c121508f5`](https://github.com/commercetools/merchant-center-application-kit/commit/c121508f50111c4e9d28b06158ca55af52aac1e2), [`938f79391`](https://github.com/commercetools/merchant-center-application-kit/commit/938f79391746077eb7b71a64acbf1dd73b3b3d06), [`bd9df94b5`](https://github.com/commercetools/merchant-center-application-kit/commit/bd9df94b565faf308f82bd39d6ca4ebf5892ed9f), [`bd9df94b5`](https://github.com/commercetools/merchant-center-application-kit/commit/bd9df94b565faf308f82bd39d6ca4ebf5892ed9f), [`e29ab64b6`](https://github.com/commercetools/merchant-center-application-kit/commit/e29ab64b6032ff42bdb2254ef4e57d16291a45db), [`b920f424c`](https://github.com/commercetools/merchant-center-application-kit/commit/b920f424c109a906cf8db7012fd65d4ec3a8e113), [`bd9df94b5`](https://github.com/commercetools/merchant-center-application-kit/commit/bd9df94b565faf308f82bd39d6ca4ebf5892ed9f), [`e29ab64b6`](https://github.com/commercetools/merchant-center-application-kit/commit/e29ab64b6032ff42bdb2254ef4e57d16291a45db), [`bef02f8ac`](https://github.com/commercetools/merchant-center-application-kit/commit/bef02f8ac0185eb293e0d295f320f753cc0eff18), [`3be9e8719`](https://github.com/commercetools/merchant-center-application-kit/commit/3be9e8719e80f1594490c4861a65a97f5dc403ed), [`a911ae90d`](https://github.com/commercetools/merchant-center-application-kit/commit/a911ae90de00d0196390b043da51246c2198c143), [`da1236982`](https://github.com/commercetools/merchant-center-application-kit/commit/da1236982646042aa13cda3962d24481ec27e546), [`4703c830c`](https://github.com/commercetools/merchant-center-application-kit/commit/4703c830c14ce6a0520089eff040afdb1ae86516), [`3da2c956d`](https://github.com/commercetools/merchant-center-application-kit/commit/3da2c956d9feaad710d7445bf520c18b64a588b8), [`1986d18d1`](https://github.com/commercetools/merchant-center-application-kit/commit/1986d18d1b411013514df21cbb5966ffbe4b6178), [`e793cef7c`](https://github.com/commercetools/merchant-center-application-kit/commit/e793cef7cb7fa650a796c668bbfc6d0ea2ef52d6)]:
  - @commercetools-frontend/application-shell@22.8.0
  - @commercetools-frontend/application-components@22.8.0
  - @commercetools-frontend/i18n@22.8.0
  - @commercetools-frontend/l10n@22.8.0
  - @commercetools-frontend/application-shell-connectors@22.8.0
  - @commercetools-frontend/application-config@22.8.0
  - @commercetools-frontend/permissions@22.8.0
  - @commercetools-frontend/mc-scripts@22.8.0
  - @commercetools-frontend/constants@22.8.0
  - @commercetools-frontend/eslint-config-mc-app@22.8.0
  - @commercetools-frontend/mc-dev-authentication@22.8.0
  - @commercetools-frontend/jest-preset-mc-app@22.8.0
  - @commercetools-frontend/actions-global@22.8.0
  - @commercetools-frontend/assets@22.8.0

## 22.8.0

### Minor Changes

- [#3175](https://github.com/commercetools/merchant-center-application-kit/pull/3175) [`bd9df94b5`](https://github.com/commercetools/merchant-center-application-kit/commit/bd9df94b565faf308f82bd39d6ca4ebf5892ed9f) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - New template for developing a Custom View. Please do not use yet, the feature is not production ready.

### Patch Changes

- Updated dependencies [[`f30cc5ca6`](https://github.com/commercetools/merchant-center-application-kit/commit/f30cc5ca6d9f9f47836b04915ac7233ac1437976), [`d5e7303fd`](https://github.com/commercetools/merchant-center-application-kit/commit/d5e7303fd9ca450fabba47c2fdccf1a275852f00), [`cf560fbd4`](https://github.com/commercetools/merchant-center-application-kit/commit/cf560fbd47d284657e06fc27af9387b342557924), [`e0a7b5150`](https://github.com/commercetools/merchant-center-application-kit/commit/e0a7b515058a389794d5040cb4b7785708d59cbb), [`c121508f5`](https://github.com/commercetools/merchant-center-application-kit/commit/c121508f50111c4e9d28b06158ca55af52aac1e2), [`938f79391`](https://github.com/commercetools/merchant-center-application-kit/commit/938f79391746077eb7b71a64acbf1dd73b3b3d06), [`bd9df94b5`](https://github.com/commercetools/merchant-center-application-kit/commit/bd9df94b565faf308f82bd39d6ca4ebf5892ed9f), [`bd9df94b5`](https://github.com/commercetools/merchant-center-application-kit/commit/bd9df94b565faf308f82bd39d6ca4ebf5892ed9f), [`e29ab64b6`](https://github.com/commercetools/merchant-center-application-kit/commit/e29ab64b6032ff42bdb2254ef4e57d16291a45db), [`b920f424c`](https://github.com/commercetools/merchant-center-application-kit/commit/b920f424c109a906cf8db7012fd65d4ec3a8e113), [`bd9df94b5`](https://github.com/commercetools/merchant-center-application-kit/commit/bd9df94b565faf308f82bd39d6ca4ebf5892ed9f), [`e29ab64b6`](https://github.com/commercetools/merchant-center-application-kit/commit/e29ab64b6032ff42bdb2254ef4e57d16291a45db), [`bef02f8ac`](https://github.com/commercetools/merchant-center-application-kit/commit/bef02f8ac0185eb293e0d295f320f753cc0eff18), [`3be9e8719`](https://github.com/commercetools/merchant-center-application-kit/commit/3be9e8719e80f1594490c4861a65a97f5dc403ed), [`a911ae90d`](https://github.com/commercetools/merchant-center-application-kit/commit/a911ae90de00d0196390b043da51246c2198c143), [`da1236982`](https://github.com/commercetools/merchant-center-application-kit/commit/da1236982646042aa13cda3962d24481ec27e546), [`4703c830c`](https://github.com/commercetools/merchant-center-application-kit/commit/4703c830c14ce6a0520089eff040afdb1ae86516), [`3da2c956d`](https://github.com/commercetools/merchant-center-application-kit/commit/3da2c956d9feaad710d7445bf520c18b64a588b8), [`1986d18d1`](https://github.com/commercetools/merchant-center-application-kit/commit/1986d18d1b411013514df21cbb5966ffbe4b6178), [`e793cef7c`](https://github.com/commercetools/merchant-center-application-kit/commit/e793cef7cb7fa650a796c668bbfc6d0ea2ef52d6)]:
  - @commercetools-frontend/application-shell@22.8.0
  - @commercetools-frontend/application-components@22.8.0
  - @commercetools-frontend/i18n@22.8.0
  - @commercetools-frontend/l10n@22.8.0
  - @commercetools-frontend/application-shell-connectors@22.8.0
  - @commercetools-frontend/application-config@22.8.0
  - @commercetools-frontend/permissions@22.8.0
  - @commercetools-frontend/mc-scripts@22.8.0
  - @commercetools-frontend/constants@22.8.0
  - @commercetools-frontend/eslint-config-mc-app@22.8.0
  - @commercetools-frontend/mc-dev-authentication@22.8.0
  - @commercetools-frontend/jest-preset-mc-app@22.8.0
  - @commercetools-frontend/actions-global@22.8.0
  - @commercetools-frontend/assets@22.8.0
