# @commercetools-backend/loggers

## 16.9.1

### Patch Changes

- [`f92ec54`](https://github.com/commercetools/merchant-center-application-kit/commit/f92ec54e78edb668e8dff53342e8542e96d8c319) [#1551](https://github.com/commercetools/merchant-center-application-kit/pull/1551) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

## 16.9.0

### Patch Changes

- [`ccbabfd`](https://github.com/commercetools/merchant-center-application-kit/commit/ccbabfdc75972aedcc12e833cc958b5585cb6d60) [#1549](https://github.com/commercetools/merchant-center-application-kit/pull/1549) Thanks [@tdeekens](https://github.com/tdeekens)! - chore: update deps to prepare for release

## 16.8.6

### Patch Changes

- [`9391762`](https://github.com/commercetools/merchant-center-application-kit/commit/939176298df3558970a267b6e6478051a355ffae) [#1530](https://github.com/commercetools/merchant-center-application-kit/pull/1530) Thanks [@emmenko](https://github.com/emmenko)! - Update `@commercetools-uikit/*` packages to `10.21.0`

## 16.8.5

### Patch Changes

- [`a66fb1f`](https://github.com/commercetools/merchant-center-application-kit/commit/a66fb1f37a06271b0fad0b2a3f6ea41c61455f0e) [#1518](https://github.com/commercetools/merchant-center-application-kit/pull/1518) Thanks [@tdeekens](https://github.com/tdeekens)! - refactor: update to typescript 3.9

  The re-export of winston from the `@commercetools-backend/loggers` package has been removed.

  Given the `winston` types use an `export = winston` our package cannot re-export using `export * from`. If you relied on this re-export we suggest to install winston yourself and import it regularily.

  After running `yarn add winston` you should change the following

  ```diff
  -import { winston } from '@commercetools-backend/loggers'
  +import winston from 'winston'
  ```

  We might add `winston` as a peer dependency in a future release to ensure that both, ours and your, `winston` versions remain in sync.

## 16.8.4

### Patch Changes

- [`6ffe293`](https://github.com/commercetools/merchant-center-application-kit/commit/6ffe29312433e357ac6c57ce39e98cf9cba49ba5) [#1508](https://github.com/commercetools/merchant-center-application-kit/pull/1508) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies
