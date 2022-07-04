# merchant-center-application-template-starter-typescript

## 0.2.1

### Patch Changes

- Updated dependencies [[`3c15d48c`](https://github.com/commercetools/merchant-center-application-kit/commit/3c15d48cbda9e92e50e91bafa34045c652a20550)]:
  - @commercetools-frontend/mc-scripts@21.8.1
  - @commercetools-frontend/actions-global@21.8.1
  - @commercetools-frontend/application-components@21.8.1
  - @commercetools-frontend/application-config@21.8.1
  - @commercetools-frontend/application-shell@21.8.1
  - @commercetools-frontend/application-shell-connectors@21.8.1
  - @commercetools-frontend/assets@21.8.1
  - @commercetools-frontend/constants@21.8.1
  - @commercetools-frontend/eslint-config-mc-app@21.8.1
  - @commercetools-frontend/i18n@21.8.1
  - @commercetools-frontend/jest-preset-mc-app@21.8.1
  - @commercetools-frontend/mc-dev-authentication@21.8.1
  - @commercetools-frontend/permissions@21.8.1

## 0.2.0

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

- Updated dependencies [[`1d8c71f1`](https://github.com/commercetools/merchant-center-application-kit/commit/1d8c71f1fed656bb6dedb3379198cc6fcdb5363f), [`78de0ec6`](https://github.com/commercetools/merchant-center-application-kit/commit/78de0ec6b569b7daa23edf4fd21cae0842857ca8), [`d6bfecf1`](https://github.com/commercetools/merchant-center-application-kit/commit/d6bfecf17c0a6a38330943cc5f195f1854248770), [`43a9df21`](https://github.com/commercetools/merchant-center-application-kit/commit/43a9df2193000b49a0299c02d5218c50d71567ed), [`f3cc395d`](https://github.com/commercetools/merchant-center-application-kit/commit/f3cc395d1e29e25f694345c03a7b6376b2d88d20), [`20e648d2`](https://github.com/commercetools/merchant-center-application-kit/commit/20e648d2d69ac9b909ae90946c4fe2274cdf7332), [`f7ec746b`](https://github.com/commercetools/merchant-center-application-kit/commit/f7ec746bfe9742a8bae5ea513db93614cce457c9), [`20e648d2`](https://github.com/commercetools/merchant-center-application-kit/commit/20e648d2d69ac9b909ae90946c4fe2274cdf7332), [`a98f9fb5`](https://github.com/commercetools/merchant-center-application-kit/commit/a98f9fb56a8066d2d64f1fa0f176bf130adb5227), [`405aa67b`](https://github.com/commercetools/merchant-center-application-kit/commit/405aa67bb55dd61e39f0856c120614030e9c8398), [`1d63e7b6`](https://github.com/commercetools/merchant-center-application-kit/commit/1d63e7b6e0a77f5aa0af4ab38030455d6abedf12), [`1cc471e8`](https://github.com/commercetools/merchant-center-application-kit/commit/1cc471e8872313867afc413598b9808507dd0677), [`d6bfecf1`](https://github.com/commercetools/merchant-center-application-kit/commit/d6bfecf17c0a6a38330943cc5f195f1854248770)]:
  - @commercetools-frontend/application-shell@21.8.0
  - @commercetools-frontend/application-shell-connectors@21.8.0
  - @commercetools-frontend/application-config@21.8.0
  - @commercetools-frontend/actions-global@21.8.0
  - @commercetools-frontend/assets@21.8.0
  - @commercetools-frontend/constants@21.8.0
  - @commercetools-frontend/eslint-config-mc-app@21.8.0
  - @commercetools-frontend/i18n@21.8.0
  - @commercetools-frontend/jest-preset-mc-app@21.8.0
  - @commercetools-frontend/mc-scripts@21.8.0
  - @commercetools-frontend/permissions@21.8.0
  - @commercetools-frontend/application-components@21.8.0
  - @commercetools-frontend/mc-dev-authentication@21.8.0
