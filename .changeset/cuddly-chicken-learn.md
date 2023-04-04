---
'@commercetools-applications/merchant-center-template-starter-typescript': major
'@commercetools-backend/eslint-config-node': major
'@commercetools-applications/merchant-center-template-starter': major
'@commercetools-frontend/eslint-config-mc-app': major
'@commercetools-frontend/application-config': major
'@commercetools-frontend/jest-preset-mc-app': major
---

Upgrade following dependencies to major versions:

- `jest` to `v29.x`.
- `jsdom` to `v21.x`.
- `eslint-plugin-jest` to `v27.x`.

# Migration

The package `@commercetools-frontend/jest-preset-mc-app` contains most of the updates and migration changes.

We don't expect any specific migration effort besides updating all Jest dependencies to their latest version (including possible Jest plugins being used).

However, there are a couple of possible necessary updates to consider:

- [Jest snapshots format changed a bit](https://jestjs.io/docs/upgrading-to-jest29#snapshot-format). You might need to update your snapshots by passing the option `-u` to the Jest command.
- The ESLint plugin for Jest might yield some new errors due to its breaking changes. See [changelog](https://github.com/jest-community/eslint-plugin-jest/blob/main/CHANGELOG.md#2700-2022-08-28).

For more detailed information about upgrading Jest, please refer to the official guides:

- [From v27 to v28](https://jestjs.io/docs/28.x/upgrading-to-jest28)
- [From v28 to v29](https://jestjs.io/docs/upgrading-to-jest29)
