# @commercetools-frontend/create-mc-app

## 21.8.0

### Minor Changes

- [#2615](https://github.com/commercetools/merchant-center-application-kit/pull/2615) [`d6bfecf1`](https://github.com/commercetools/merchant-center-application-kit/commit/d6bfecf17c0a6a38330943cc5f195f1854248770) Thanks [@kark](https://github.com/kark)! - There is a new starter template to develop Custom Applications in TypeScript!

  To install it via the `@commercetools-frontend/create-mc-app` CLI:

  ```bash
  $ npx @commercetools-frontend/create-mc-app@latest <folder_name> \
    --template starter-typescript
  ```

  The TypeScript starter template is the same as the standard JS starter template in terms of functionality
  but it includes the additional TypeScript setup.

  If you already have a Custom Application in TypeScript or are planning to migrate an existing one to it
  we recommend to take a look at the tooling setup of the TypeScript starter template, in particular:

  - `.prettierrc` for using the `typescript` parser.
  - `jest.*.config.js` to include the file extensions `.ts` and `.tsx`.
  - `tsconfig.json`

### Patch Changes

- [#2661](https://github.com/commercetools/merchant-center-application-kit/pull/2661) [`43a9df21`](https://github.com/commercetools/merchant-center-application-kit/commit/43a9df2193000b49a0299c02d5218c50d71567ed) Thanks [@emmenko](https://github.com/emmenko)! - Drop the copyright year from the license files

* [#2676](https://github.com/commercetools/merchant-center-application-kit/pull/2676) [`d691e60a`](https://github.com/commercetools/merchant-center-application-kit/commit/d691e60a0b884a4b0f9b7b7cf3f019b025583577) Thanks [@emmenko](https://github.com/emmenko)! - Fix file formatting when patching constants file

## 21.6.0

### Patch Changes

- [#2555](https://github.com/commercetools/merchant-center-application-kit/pull/2555) [`0b7a3743`](https://github.com/commercetools/merchant-center-application-kit/commit/0b7a3743207172ace7f2b6893b9c7d61c351967b) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

## 21.3.4

### Patch Changes

- [#2546](https://github.com/commercetools/merchant-center-application-kit/pull/2546) [`dc76e5a9`](https://github.com/commercetools/merchant-center-application-kit/commit/dc76e5a9a7f875dadf2ed5a11c48a1ddff7b431c) Thanks [@renovate](https://github.com/apps/renovate)! - Upgrade dependencies

## 21.3.0

### Patch Changes

- [#2520](https://github.com/commercetools/merchant-center-application-kit/pull/2520) [`6f3a2083`](https://github.com/commercetools/merchant-center-application-kit/commit/6f3a2083efac387e9a2994fbaaeb18914e739aa8) Thanks [@renovate](https://github.com/apps/renovate)! - Upgrade dependencies

* [#2528](https://github.com/commercetools/merchant-center-application-kit/pull/2528) [`9235a721`](https://github.com/commercetools/merchant-center-application-kit/commit/9235a721df2be2ca5753994cd11312d577d0b293) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

## 21.1.0

### Patch Changes

- [#2491](https://github.com/commercetools/merchant-center-application-kit/pull/2491) [`ede1624c`](https://github.com/commercetools/merchant-center-application-kit/commit/ede1624cdd1034a343940ff0a6dd2f4d5ccb9b84) Thanks [@kark](https://github.com/kark)! - Fix compatibility with Node `< v14.18` for reading user input.

* [#2490](https://github.com/commercetools/merchant-center-application-kit/pull/2490) [`99e2a570`](https://github.com/commercetools/merchant-center-application-kit/commit/99e2a57075db6eef67f774aa1e602f87e7c773ac) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Update `engines.node` attribute in `package.json` to explicitly state supported versions (not 15)

## 21.0.0

### Major Changes

- [#2430](https://github.com/commercetools/merchant-center-application-kit/pull/2430) [`bb1f7d75`](https://github.com/commercetools/merchant-center-application-kit/commit/bb1f7d75ff54f7fef05c4d2b3328b88e400b4867) Thanks [@emmenko](https://github.com/emmenko)! - Drop Node.js `v12`. Recommended min Node.js version is `v14` or `v16`.

* [#2430](https://github.com/commercetools/merchant-center-application-kit/pull/2430) [`bb1f7d75`](https://github.com/commercetools/merchant-center-application-kit/commit/bb1f7d75ff54f7fef05c4d2b3328b88e400b4867) Thanks [@emmenko](https://github.com/emmenko)! - Following breaking changes were introduced:

  - The starter template has been updated to use the new Org-level Custom Application features.
  - The Custom Application config of the starter template has been converted from `.json` to `.mjs`, to allow importing and referencing constants.
  - When installing the starter template using the `create-mc-app` CLI, the Custom Application config is updated with some of the user inputs, like `entryPointUriPath`.
    - If no `entryPointUriPath` is provided, a random one is assigned.

  For more information see [Release notes v21](https://docs.commercetools.com/custom-applications/releases/2022-01-31-custom-applications-v21).

### Patch Changes

- [#2430](https://github.com/commercetools/merchant-center-application-kit/pull/2430) [`bb1f7d75`](https://github.com/commercetools/merchant-center-application-kit/commit/bb1f7d75ff54f7fef05c4d2b3328b88e400b4867) Thanks [@emmenko](https://github.com/emmenko)! - Use version range for Babel packages.

## 21.0.0-rc.1

### Patch Changes

- [#2430](https://github.com/commercetools/merchant-center-application-kit/pull/2430) [`5ea8baf1`](https://github.com/commercetools/merchant-center-application-kit/commit/5ea8baf1b2ca2661aac9a6a572d2c8e596ee0b2c) Thanks [@emmenko](https://github.com/emmenko)! - Use version range for Babel packages.

## 21.0.0-rc.0

### Major Changes

- [#2430](https://github.com/commercetools/merchant-center-application-kit/pull/2430) [`1c363fad`](https://github.com/commercetools/merchant-center-application-kit/commit/1c363fad7ab770a739ac8080358e41ae4af42074) Thanks [@emmenko](https://github.com/emmenko)! - Drop Node.js `v12`. Recommended min Node.js version is `v14` or `v16`.

* [#2430](https://github.com/commercetools/merchant-center-application-kit/pull/2430) [`e079fdcb`](https://github.com/commercetools/merchant-center-application-kit/commit/e079fdcb21ae7dddf14e554be1bd6e36f7346417) Thanks [@emmenko](https://github.com/emmenko)! - Following breaking changes were introduced:

  - The starter template has been updated to use the new Org-level Custom Application features.
  - The Custom Application config of the starter template has been converted from `.json` to `.mjs`, to allow importing and referencing constants.
  - When installing the starter template using the `create-mc-app` CLI, the Custom Application config is updated with some of the user inputs, like `entryPointUriPath`.
    - If no `entryPointUriPath` is provided, a random one is assigned.

  For more information see [Release notes v21](https://docs.commercetools.com/custom-applications/releases/2022-01-31-custom-applications-v21).

## 20.10.6

### Patch Changes

- [#2386](https://github.com/commercetools/merchant-center-application-kit/pull/2386) [`d7fcf6fc`](https://github.com/commercetools/merchant-center-application-kit/commit/d7fcf6fc8495d4eae68e0a4f4c1f1b3e0e394454) Thanks [@emmenko](https://github.com/emmenko)! - Upgrade to Yarn v3

## 20.10.1

### Patch Changes

- [#2348](https://github.com/commercetools/merchant-center-application-kit/pull/2348) [`3247e604`](https://github.com/commercetools/merchant-center-application-kit/commit/3247e6048533a72c9f64cd316621dd51471cd1a8) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

* [#2356](https://github.com/commercetools/merchant-center-application-kit/pull/2356) [`e34fe076`](https://github.com/commercetools/merchant-center-application-kit/commit/e34fe076aab6681cdcc54622d84123f2c22020e6) Thanks [@ByronDWall](https://github.com/ByronDWall)! - set node version to 16.8 in nvmrc to avoid a bug in node/v8

## 20.10.0

### Minor Changes

- [#2335](https://github.com/commercetools/merchant-center-application-kit/pull/2335) [`f8f9d5c7`](https://github.com/commercetools/merchant-center-application-kit/commit/f8f9d5c79f86b31fffdc68f034b5c0bb3c4a32ed) Thanks [@emmenko](https://github.com/emmenko)! - Derives the `entryPointUriPath` from the folder name, then replaces it in the template in the custom app config and in the constants file.

## 20.4.0

### Patch Changes

- [#2247](https://github.com/commercetools/merchant-center-application-kit/pull/2247) [`f8f759b6`](https://github.com/commercetools/merchant-center-application-kit/commit/f8f759b6f0f6d8cc677efd90fecbd19d103c6a4f) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

## 20.3.1

### Patch Changes

- [#2234](https://github.com/commercetools/merchant-center-application-kit/pull/2234) [`4dd3398a`](https://github.com/commercetools/merchant-center-application-kit/commit/4dd3398a6cd951a29237e6e468f8accc8632981e) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

## 19.4.2

### Patch Changes

- [#2173](https://github.com/commercetools/merchant-center-application-kit/pull/2173) [`fec92125`](https://github.com/commercetools/merchant-center-application-kit/commit/fec92125a2a0e5678c1b42ad78a2c0d46669ae32) Thanks [@emmenko](https://github.com/emmenko)! - Fix windows support when installing the template

## 19.0.2

### Patch Changes

- [#2140](https://github.com/commercetools/merchant-center-application-kit/pull/2140) [`6496e66c`](https://github.com/commercetools/merchant-center-application-kit/commit/6496e66c4c5572267a40df9d108783083a33aa13) Thanks [@emmenko](https://github.com/emmenko)! - Only check for `latest` version for outdated version hint.

## 19.0.0

### Major Changes

- [#2041](https://github.com/commercetools/merchant-center-application-kit/pull/2041) [`a240f657`](https://github.com/commercetools/merchant-center-application-kit/commit/a240f6574a9240a2ac82febb67b0f6c814db979f) Thanks [@emmenko](https://github.com/emmenko)! - - Changes required Node.js engine version to `>=12 || >=14` in `package.json`.

* [#2041](https://github.com/commercetools/merchant-center-application-kit/pull/2041) [`a240f657`](https://github.com/commercetools/merchant-center-application-kit/commit/a240f6574a9240a2ac82febb67b0f6c814db979f) Thanks [@emmenko](https://github.com/emmenko)! - Upgrade and migrate packages to use `ui-kit@v12`

## 18.7.0

### Patch Changes

- [#2110](https://github.com/commercetools/merchant-center-application-kit/pull/2110) [`c850d6dc`](https://github.com/commercetools/merchant-center-application-kit/commit/c850d6dcf8edabb5eb9390e41def4b6b52879b7a) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

## 18.5.4

### Patch Changes

- [`d44f5b69`](https://github.com/commercetools/merchant-center-application-kit/commit/d44f5b6916c3897ce198eb06757d29d40535b8d4) [#2076](https://github.com/commercetools/merchant-center-application-kit/pull/2076) Thanks [@tdeekens](https://github.com/tdeekens)! - refactor: to remove lerna and only use many-pkg

## 18.2.3

### Patch Changes

- [`e5c77399`](https://github.com/commercetools/merchant-center-application-kit/commit/e5c77399f90ebc0a199a7620d0a8500ca53229f0) [#2036](https://github.com/commercetools/merchant-center-application-kit/pull/2036) Thanks [@tdeekens](https://github.com/tdeekens)! - Release to pull from main branch by default

## 18.1.0

### Patch Changes

- [`3bf32993`](https://github.com/commercetools/merchant-center-application-kit/commit/3bf329935a109a73a7c33580fdf618e60fdbcc2c) [#1971](https://github.com/commercetools/merchant-center-application-kit/pull/1971) Thanks [@tdeekens](https://github.com/tdeekens)! - Add internal opt-in support for combining feature flag adapters.

## 17.6.2

### Patch Changes

- [`1a96e83`](https://github.com/commercetools/merchant-center-application-kit/commit/1a96e831c94250e10de61dee40e682a77313445f) [#1905](https://github.com/commercetools/merchant-center-application-kit/pull/1905) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

* [`5b7ab6b`](https://github.com/commercetools/merchant-center-application-kit/commit/5b7ab6bcbcf5bf827e6e0f294cc8ccb4a8f8e45c) [#1920](https://github.com/commercetools/merchant-center-application-kit/pull/1920) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update dependency execa to v5

## 17.6.0

### Patch Changes

- [`2287813`](https://github.com/commercetools/merchant-center-application-kit/commit/2287813c19a54b7edb7005d417c5f6a7b34cad1f) [#1871](https://github.com/commercetools/merchant-center-application-kit/pull/1871) Thanks [@emmenko](https://github.com/emmenko)! - Compile and bundle packages using [preconstruct](https://preconstruct.tools)

## 17.3.0

### Patch Changes

- [`71c9111`](https://github.com/commercetools/merchant-center-application-kit/commit/71c9111308832009d1a27e91e4f2d2da4c53367c) [#1866](https://github.com/commercetools/merchant-center-application-kit/pull/1866) Thanks [@emmenko](https://github.com/emmenko)! - Update to uikit v10.39.8

## 17.2.1

### Patch Changes

- [`310e98c`](https://github.com/commercetools/merchant-center-application-kit/commit/310e98c39c0b6479175b7685b3f29ea0a5baa22b) Thanks [@emmenko](https://github.com/emmenko)! - Update dependencies (https://github.com/commercetools/merchant-center-application-kit/pull/1857)

## 17.2.0

### Patch Changes

- [`e0ec004`](https://github.com/commercetools/merchant-center-application-kit/commit/e0ec004d611f93b24f015120d09f6f18389b219f) [#1854](https://github.com/commercetools/merchant-center-application-kit/pull/1854) Thanks [@emmenko](https://github.com/emmenko)! - chore: update deps

## 16.15.3

### Patch Changes

- [`6d98245`](https://github.com/commercetools/merchant-center-application-kit/commit/6d98245615ddb83e805e5cc2cc0620920b4a71c7) [#1643](https://github.com/commercetools/merchant-center-application-kit/pull/1643) Thanks [@emmenko](https://github.com/emmenko)! - Update copyright date to 2020 in LICENSE files

## 16.15.2

### Patch Changes

- [`0f3dcc3`](https://github.com/commercetools/merchant-center-application-kit/commit/0f3dcc38c81a5fb3c668faecce9a13057f66a66b) [#1638](https://github.com/commercetools/merchant-center-application-kit/pull/1638) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

## 16.15.0

### Patch Changes

- [`cc8b37b`](https://github.com/commercetools/merchant-center-application-kit/commit/cc8b37bf85d4683a605a6c3233100627e670ebe7) [#1627](https://github.com/commercetools/merchant-center-application-kit/pull/1627) Thanks [@renovate](https://github.com/apps/renovate)! - chore: update dependencies

## 16.9.1

### Patch Changes

- [`f92ec54`](https://github.com/commercetools/merchant-center-application-kit/commit/f92ec54e78edb668e8dff53342e8542e96d8c319) [#1551](https://github.com/commercetools/merchant-center-application-kit/pull/1551) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

## 16.8.6

### Patch Changes

- [`9391762`](https://github.com/commercetools/merchant-center-application-kit/commit/939176298df3558970a267b6e6478051a355ffae) [#1530](https://github.com/commercetools/merchant-center-application-kit/pull/1530) Thanks [@emmenko](https://github.com/emmenko)! - Update `@commercetools-uikit/*` packages to `10.21.0`

## 16.8.5

### Patch Changes

- [`a66fb1f`](https://github.com/commercetools/merchant-center-application-kit/commit/a66fb1f37a06271b0fad0b2a3f6ea41c61455f0e) [#1518](https://github.com/commercetools/merchant-center-application-kit/pull/1518) Thanks [@tdeekens](https://github.com/tdeekens)! - chore(deps): update all dependencies

## 16.8.4

### Patch Changes

- [`6ffe293`](https://github.com/commercetools/merchant-center-application-kit/commit/6ffe29312433e357ac6c57ce39e98cf9cba49ba5) [#1508](https://github.com/commercetools/merchant-center-application-kit/pull/1508) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies
