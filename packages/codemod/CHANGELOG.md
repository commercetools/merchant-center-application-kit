# @commercetools-frontend/codemod

## 21.14.0

## 21.13.1

### Patch Changes

- [`482ad98ee`](https://github.com/commercetools/merchant-center-application-kit/commit/482ad98eeb4570a583d58d476a7902ffe6cc2a94) Thanks [@emmenko](https://github.com/emmenko)! - Nothing changed, the previous release `21.13.0` had an issue publishing to NPM so we're bumping versions to trigger a new release.

## 21.13.0

### Patch Changes

- [#2761](https://github.com/commercetools/merchant-center-application-kit/pull/2761) [`d012420e5`](https://github.com/commercetools/merchant-center-application-kit/commit/d012420e563b34a1678693f19905bdd79b2317e2) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Update all dependencies

## 0.3.0

### Minor Changes

- [#2693](https://github.com/commercetools/merchant-center-application-kit/pull/2693) [`6a01bda7`](https://github.com/commercetools/merchant-center-application-kit/commit/6a01bda7129d786f439fd01fdbb654761de71a70) Thanks [@emmenko](https://github.com/emmenko)! - Add new codemod `rename-mod-css-to-module-css` to migrate `.mod.css` to `.module.css` files.

  ```
  $ npx @commercetools-frontend/codemod@latest rename-mod-css-to-module-css 'src/**/*.{js,jsx,ts,tsx}'
  ```

### Patch Changes

- [#2705](https://github.com/commercetools/merchant-center-application-kit/pull/2705) [`abe2c475`](https://github.com/commercetools/merchant-center-application-kit/commit/abe2c475be2aff3781ac6151178aede1e0801f77) Thanks [@emmenko](https://github.com/emmenko)! - Update typescript dependencies

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
