# @commercetools-frontend/codemod

## 24.2.1

## 24.2.0

## 24.1.0

## 24.0.0

### Major Changes

- [#3687](https://github.com/commercetools/merchant-center-application-kit/pull/3687) [`552de5e`](https://github.com/commercetools/merchant-center-application-kit/commit/552de5e6d40bd9d7f1b5d51ea4892ad1a2a448ae) Thanks [@kark](https://github.com/kark)! - Upgrade UI Kit to React 19.

  From this version onwards, this is the minimum version an application using this library should be depending on.

## 23.4.0

## 23.3.0

## 23.2.3

### Patch Changes

- [#3754](https://github.com/commercetools/merchant-center-application-kit/pull/3754) [`9888b5e`](https://github.com/commercetools/merchant-center-application-kit/commit/9888b5e485fad03416cd346261baa4bb19fa4a39) Thanks [@emmenko](https://github.com/emmenko)! - Use `moduleResolution: bundler` to be compatible with ESM packages.

## 23.2.2

## 23.2.1

### Patch Changes

- [#3739](https://github.com/commercetools/merchant-center-application-kit/pull/3739) [`9dba306`](https://github.com/commercetools/merchant-center-application-kit/commit/9dba306fd920a53a027e1a4ded112c1a09eaefc3) Thanks [@emmenko](https://github.com/emmenko)! - Migrate CLI program to `commander`.

## 23.2.0

## 23.1.0

## 23.0.0

### Major Changes

- [#3530](https://github.com/commercetools/merchant-center-application-kit/pull/3530) [`18ace8a`](https://github.com/commercetools/merchant-center-application-kit/commit/18ace8a93b90efe4c47ac18c6cc9b424372f6d65) Thanks [@emmenko](https://github.com/emmenko)! - Drop support for Node.js `v16`, which reached EOL. The minimal required version is `v18` but we recommend to use `v20` or `v22` if possible, as `v18` will also reach EOL mid of 2025.

- [#3530](https://github.com/commercetools/merchant-center-application-kit/pull/3530) [`18ace8a`](https://github.com/commercetools/merchant-center-application-kit/commit/18ace8a93b90efe4c47ac18c6cc9b424372f6d65) Thanks [@emmenko](https://github.com/emmenko)! - Migrate to Vite `v6`. If you have Vite enabled via `ENABLE_EXPERIMENTAL_VITE_BUNDLER` and you are using `vite` as a dependency, make sure you upgrade to `v6` (see [Migration from v4](https://v5.vite.dev/guide/migration.html) and [Migration from v5](https://vite.dev/guide/migration.html)).

## 22.42.1

## 22.42.0

### Minor Changes

- [#3722](https://github.com/commercetools/merchant-center-application-kit/pull/3722) [`f4607a3`](https://github.com/commercetools/merchant-center-application-kit/commit/f4607a38465855904d59f4ef5c03796b78c3a669) Thanks [@emmenko](https://github.com/emmenko)! - Packages are built using the `bundler` option for TypeScript's `moduleResolution`.
  This is the recommended option for libraries to have more optimized bundles and have better compatibility.

  This also helps solving a compatibility issue with Emotion's version `11.14.0`.

## 22.41.0

## 22.40.0

## 22.39.1

## 22.39.0

## 22.38.3

## 22.38.2

## 22.38.1

## 22.38.0

### Minor Changes

- [#3681](https://github.com/commercetools/merchant-center-application-kit/pull/3681) [`1e9e84a`](https://github.com/commercetools/merchant-center-application-kit/commit/1e9e84aab2a3c0e7979e78343157182c5fea6020) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Introduces a new codemod which helps migrating away from React's `defaultProps` to `prop` destructuring.

  This is how the change looks like:

  ```ts
  // BEFORE
  type TMyComponentProps = {
    message: string;
    size: string;
  }

  function MyComponent(props: TMyComponentProps) {
   ...
  }

  MyComponent.defaultProps = {
    size: 'big'
  }


  // AFTER
  type TMyComponentProps = {
    message: string;
    size?: string; // <--- Note this property is now defined as optional
  }

  function MyComponent({ size = 'big', ...props }: TMyComponentProps) {
   ...
  }
  ```

  And here is how the new codemod can be run:

  ```
  $ npx @commercetools-frontend/codemod@latest react-default-props-migration 'src/**/*.{jsx,tsx}'
  ```

### Patch Changes

- [#3684](https://github.com/commercetools/merchant-center-application-kit/pull/3684) [`455cccf`](https://github.com/commercetools/merchant-center-application-kit/commit/455cccfdbac803fd7f821c6127635c1b2e593f27) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

## 22.37.0

## 22.36.0

## 22.35.1

## 22.35.0

## 22.34.0

## 22.33.0

## 22.32.2

## 22.32.1

## 22.32.0

## 22.31.0

## 22.30.3

## 22.30.2

## 22.30.1

## 22.30.0

## 22.29.0

## 22.28.0

### Patch Changes

- [#3533](https://github.com/commercetools/merchant-center-application-kit/pull/3533) [`146cf67`](https://github.com/commercetools/merchant-center-application-kit/commit/146cf672eb15a7b4d858c54d6a01f92d0437a86f) Thanks [@renovate](https://github.com/apps/renovate)! - Update all dependencies

## 22.27.0

### Patch Changes

- [#3468](https://github.com/commercetools/merchant-center-application-kit/pull/3468) [`4ab4bf6`](https://github.com/commercetools/merchant-center-application-kit/commit/4ab4bf6035d3c8b419fd439ca445c8f971ea2fc9) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

## 22.26.0

## 22.25.1

## 22.25.0

### Patch Changes

- [#3502](https://github.com/commercetools/merchant-center-application-kit/pull/3502) [`b55d4e6`](https://github.com/commercetools/merchant-center-application-kit/commit/b55d4e606a07e5f5ac1522126b77213c67297a0c) Thanks [@Rombelirk](https://github.com/Rombelirk)! - Replace fs.exists with fs.access

## 22.24.0

### Patch Changes

- [#3491](https://github.com/commercetools/merchant-center-application-kit/pull/3491) [`c2bba1d`](https://github.com/commercetools/merchant-center-application-kit/commit/c2bba1d065b6fd7882e6feb9162d91538962d85d) Thanks [@emmenko](https://github.com/emmenko)! - Adjust links to new docs

## 22.23.3

## 22.23.2

## 22.23.1

## 22.23.0

### Patch Changes

- [#3435](https://github.com/commercetools/merchant-center-application-kit/pull/3435) [`e7299e2`](https://github.com/commercetools/merchant-center-application-kit/commit/e7299e265ceb8579ed4901adddcb2fde791c62db) Thanks [@renovate](https://github.com/apps/renovate)! - Update all dependencies

## 22.22.0

## 22.21.0

## 22.20.0

## 22.19.0

## 22.18.0

## 22.17.2

## 22.17.1

## 22.17.0

### Minor Changes

- [#3379](https://github.com/commercetools/merchant-center-application-kit/pull/3379) [`d2e3a2236`](https://github.com/commercetools/merchant-center-application-kit/commit/d2e3a22361140ee77b4aa7f624d7b2b71de35bab) Thanks [@tylermorrisford](https://github.com/tylermorrisford)! - Update all logos in `assets/logos/`, all logos in `assets/images/` and embedded logo in `application.html`.

## 22.16.0

## 22.15.1

## 22.15.0

## 22.14.3

## 22.14.2

## 22.14.1

## 22.14.0

## 22.13.2

### Patch Changes

- [#3322](https://github.com/commercetools/merchant-center-application-kit/pull/3322) [`13aa6ae2f`](https://github.com/commercetools/merchant-center-application-kit/commit/13aa6ae2fc7c007d5b603d48a030597a4e323923) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Updated `@emotion/react` dependency

## 22.13.1

## 22.13.0

## 22.12.0

## 22.11.0

## 22.10.0

## 22.9.1

## 22.9.0

## 22.8.4

## 22.8.3

## 22.8.2

## 22.8.1

## 22.8.0

### Patch Changes

- [#3082](https://github.com/commercetools/merchant-center-application-kit/pull/3082) [`e29ab64b6`](https://github.com/commercetools/merchant-center-application-kit/commit/e29ab64b6032ff42bdb2254ef4e57d16291a45db) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

## 22.7.1

## 22.7.0

## 22.6.0

## 22.5.0

### Patch Changes

- [#3135](https://github.com/commercetools/merchant-center-application-kit/pull/3135) [`6c4094e0e`](https://github.com/commercetools/merchant-center-application-kit/commit/6c4094e0e99461b860e3a2eda7b47094858ea329) Thanks [@renovate](https://github.com/apps/renovate)! - Update `@tsconfig/node16` dependency.

## 22.4.0

### Minor Changes

- [#3102](https://github.com/commercetools/merchant-center-application-kit/pull/3102) [`55e81421c`](https://github.com/commercetools/merchant-center-application-kit/commit/55e81421c10774f991ca70c849179d69c647b547) Thanks [@renovate](https://github.com/apps/renovate)! - Update `rimraf` dependency.

## 22.3.4

## 22.3.3

## 22.3.2

## 22.3.1

## 22.3.0

### Minor Changes

- [#2976](https://github.com/commercetools/merchant-center-application-kit/pull/2976) [`9add8f46b`](https://github.com/commercetools/merchant-center-application-kit/commit/9add8f46b668fb95b2c966a087bfb00c807ab55e) Thanks [@emmenko](https://github.com/emmenko)! - We migrate from Yarn to Pnpm as the package manager for the App Kit repository. As a result of it there were several packages that didn't specify all the needed dependencies. This is fixed now.

### Patch Changes

- [#3061](https://github.com/commercetools/merchant-center-application-kit/pull/3061) [`448774957`](https://github.com/commercetools/merchant-center-application-kit/commit/44877495721371ae251e11f6b7d926344cfeae0b) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies.

## 22.2.1

## 22.2.0

## 22.1.0

## 22.0.1

### Patch Changes

- [#3033](https://github.com/commercetools/merchant-center-application-kit/pull/3033) [`6629d8470`](https://github.com/commercetools/merchant-center-application-kit/commit/6629d84708e94cae14df8d1ce3df1eb1f99e2023) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

## 22.0.0

### Major Changes

- [#3039](https://github.com/commercetools/merchant-center-application-kit/pull/3039) [`76ba54c16`](https://github.com/commercetools/merchant-center-application-kit/commit/76ba54c164dbac75ef3e3962292933b06f4843e7) Thanks [@emmenko](https://github.com/emmenko)! - Drop support for Node.js `v14`. Make sure you use Node.js `v16` or `>=v18`.

## 21.25.2

## 21.25.1

### Patch Changes

- [#3041](https://github.com/commercetools/merchant-center-application-kit/pull/3041) [`abe818527`](https://github.com/commercetools/merchant-center-application-kit/commit/abe8185277e00f713ad0e8325f20bcf3bce217b1) Thanks [@emmenko](https://github.com/emmenko)! - Use TypeScript to v5

## 21.25.0

## 21.24.3

## 21.24.2

## 21.24.1

## 21.24.0

### Patch Changes

- [#2992](https://github.com/commercetools/merchant-center-application-kit/pull/2992) [`e42f8d903`](https://github.com/commercetools/merchant-center-application-kit/commit/e42f8d9037626d51abc2b5611ff5939c549cca73) Thanks [@emmenko](https://github.com/emmenko)! - Reorder imports

## 21.23.10

## 21.23.9

### Patch Changes

- [#2979](https://github.com/commercetools/merchant-center-application-kit/pull/2979) [`6dcd48525`](https://github.com/commercetools/merchant-center-application-kit/commit/6dcd48525a9943ea7348345f32ae218a5154867b) Thanks [@emmenko](https://github.com/emmenko)! - Refine engine version requirements for Nodejs to be `14.x || >=16.0.0`

## 21.23.8

## 21.23.7

### Patch Changes

- [#2960](https://github.com/commercetools/merchant-center-application-kit/pull/2960) [`4377b3642`](https://github.com/commercetools/merchant-center-application-kit/commit/4377b3642c08fd9480016a287a18ada780191ad6) Thanks [@emmenko](https://github.com/emmenko)! - Update dependencies

## 21.23.6

## 21.23.5

## 21.23.4

## 21.23.3

## 21.23.2

## 21.23.1

## 21.23.0

## 21.22.1

## 21.22.0

## 21.21.2

## 21.21.1

## 21.21.0

## 21.20.5

## 21.20.4

## 21.20.3

## 21.20.2

## 21.20.1

## 21.20.0

## 21.19.0

## 21.18.1

## 21.18.0

### Patch Changes

- [#2837](https://github.com/commercetools/merchant-center-application-kit/pull/2837) [`3959ed2a0`](https://github.com/commercetools/merchant-center-application-kit/commit/3959ed2a0012077b6366c3a22c749fe7d6e74784) Thanks [@renovate](https://github.com/apps/renovate)! - Update all dependencies

## 21.17.0

## 21.16.0

### Patch Changes

- [#2580](https://github.com/commercetools/merchant-center-application-kit/pull/2580) [`1c40c40c9`](https://github.com/commercetools/merchant-center-application-kit/commit/1c40c40c947574ba24b411c9376640bb18c489ac) Thanks [@renovate](https://github.com/apps/renovate)! - Update `@testing-library/react-hooks` package to version `8.0.0`.

- [#2826](https://github.com/commercetools/merchant-center-application-kit/pull/2826) [`11192ad4b`](https://github.com/commercetools/merchant-center-application-kit/commit/11192ad4bf186ff529255c68e95193a362308620) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

## 21.15.0

## 21.14.3

## 21.14.2

### Patch Changes

- [#2776](https://github.com/commercetools/merchant-center-application-kit/pull/2776) [`00d9edcb4`](https://github.com/commercetools/merchant-center-application-kit/commit/00d9edcb49a144797ba3690db012e429e88a30fa) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

## 21.14.1

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
