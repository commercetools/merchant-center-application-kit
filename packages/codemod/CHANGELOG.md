# @commercetools-frontend/codemod

## 0.2.0

### Minor Changes

- [#2597](https://github.com/commercetools/merchant-center-application-kit/pull/2597) [`8d3fe74b`](https://github.com/commercetools/merchant-center-application-kit/commit/8d3fe74b7987dd62c535e367a9a76bf3d7816c1a) Thanks [@emmenko](https://github.com/emmenko)! - Add transform `remove-deprecated-modal-level-props` for migrating deprecated props of modal pages (see [Staking Layer System](https://github.com/commercetools/merchant-center-application-kit/pull/2581)).

  ```
  $ npx @commercetools-frontend/codemod remove-deprecated-modal-level-props 'src/**/*.js'
  ```

### Patch Changes

- [#2555](https://github.com/commercetools/merchant-center-application-kit/pull/2555) [`0b7a3743`](https://github.com/commercetools/merchant-center-application-kit/commit/0b7a3743207172ace7f2b6893b9c7d61c351967b) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

## 0.1.0

### Minor Changes

- [#2565](https://github.com/commercetools/merchant-center-application-kit/pull/2565) [`41e6e62b`](https://github.com/commercetools/merchant-center-application-kit/commit/41e6e62bad61665b135ee1081580df928f3a3d70) Thanks [@emmenko](https://github.com/emmenko)! - Add new Codemod package. The first transform is `rename-js-to-jsx`, which helps renaming JS files using React (JSX) to `.jsx` extension.

  ```
  npx @commercetools-frontend/codemod rename-js-to-jsx 'src/**/*.js'
  ```
