# @commercetools-frontend/application-config

## 16.15.8

### Patch Changes

- [`43fdb3d`](https://github.com/commercetools/merchant-center-application-kit/commit/43fdb3d6465911c99a3abcfedd8e96ea54b4941c) [#1663](https://github.com/commercetools/merchant-center-application-kit/pull/1663) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update dependency cosmiconfig to v7

## 16.15.4

### Patch Changes

- [`0182cd3`](https://github.com/commercetools/merchant-center-application-kit/commit/0182cd32f12a6ca8d1966bfaf260f4db256beca0) [#1645](https://github.com/commercetools/merchant-center-application-kit/pull/1645) Thanks [@emmenko](https://github.com/emmenko)! - refactor(application-config): be more strict on deriving the prod env based on the MC_APP_ENV.

  TL;DR: in case the `MC_APP_ENV` is defined, we consider that it's a production environment unless it's one of `development` or `test`. This allows to use for example the `staging` value, which from the application perspective is still considered a production environment.

## 16.15.2

### Patch Changes

- [`0f3dcc3`](https://github.com/commercetools/merchant-center-application-kit/commit/0f3dcc38c81a5fb3c668faecce9a13057f66a66b) [#1638](https://github.com/commercetools/merchant-center-application-kit/pull/1638) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

## 16.15.1

### Patch Changes

- [`96b3af7`](https://github.com/commercetools/merchant-center-application-kit/commit/96b3af7c3e8276e7a136e48c3d313fe6d504099d) [#1636](https://github.com/commercetools/merchant-center-application-kit/pull/1636) Thanks [@emmenko](https://github.com/emmenko)! - Fix parsing of application config to preserve full URLs when inferring CSP directives.
  Furthermore, every environment variable referenced within the application config that has an empty value will be parsed as-is and it will not be rejected. Additionally, the fields passed to the `additionalEnv` object that are empty will be removed from the resulting environment and `window.app`.

## 16.15.0

### Minor Changes

- [`728024c`](https://github.com/commercetools/merchant-center-application-kit/commit/728024c57666d67e997b7342df74cceba511d182) [#1626](https://github.com/commercetools/merchant-center-application-kit/pull/1626) Thanks [@emmenko](https://github.com/emmenko)! - This release introduces the usage of a new configuration file format and marks the deprecation of the `env.json` and `headers.json` files.

  For all the necessary information about migrating to the new configuration file, please [read the release notes](https://docs.commercetools.com/custom-applications/releases/2020-07-16-introducing-a-new-and-simpler-application-config).

### Patch Changes

- [`33baf25`](https://github.com/commercetools/merchant-center-application-kit/commit/33baf25a5990d7bb292e88e4040e11bff4669b2c) [#1634](https://github.com/commercetools/merchant-center-application-kit/pull/1634) Thanks [@emmenko](https://github.com/emmenko)! - Update description of schema properties of the application config

* [`394380d`](https://github.com/commercetools/merchant-center-application-kit/commit/394380dd25321c2f8f1e6b1e60b998620f2c1e02) [#1635](https://github.com/commercetools/merchant-center-application-kit/pull/1635) Thanks [@emmenko](https://github.com/emmenko)! - Get JSON schema from docs website URL
