# @commercetools-backend/express

## 21.23.1

## 21.23.0

## 21.22.1

### Patch Changes

- [#2931](https://github.com/commercetools/merchant-center-application-kit/pull/2931) [`08dcbbdfd`](https://github.com/commercetools/merchant-center-application-kit/commit/08dcbbdfd5cab60e081143e0259879d4d27f088a) Thanks [@kark](https://github.com/kark)! - Update `express-jwt` dependency

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

## 21.15.0

### Patch Changes

- [#2810](https://github.com/commercetools/merchant-center-application-kit/pull/2810) [`0e49a78f8`](https://github.com/commercetools/merchant-center-application-kit/commit/0e49a78f8e3b228a9b0bb3d90781aa8e940de4bc) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

## 21.14.3

## 21.14.2

### Patch Changes

- [#2776](https://github.com/commercetools/merchant-center-application-kit/pull/2776) [`00d9edcb4`](https://github.com/commercetools/merchant-center-application-kit/commit/00d9edcb49a144797ba3690db012e429e88a30fa) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

## 21.14.1

## 21.14.0

### Patch Changes

- [#2782](https://github.com/commercetools/merchant-center-application-kit/pull/2782) [`670230add`](https://github.com/commercetools/merchant-center-application-kit/commit/670230adde7929842821028554ddc7d136fd50c5) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Now that users can request the Merchant Center API to include logged in user's permissions in the exchange JWT included in proxied requests, our _auth_ middleware will check for that information in the token and will make it available in the `request.session` object under a new property named **userPermissions** (reference [documentation](https://docs.commercetools.com/custom-applications/concepts/integrate-with-your-own-api#validating-the-json-web-token)).

## 21.13.1

### Patch Changes

- [`482ad98ee`](https://github.com/commercetools/merchant-center-application-kit/commit/482ad98eeb4570a583d58d476a7902ffe6cc2a94) Thanks [@emmenko](https://github.com/emmenko)! - Nothing changed, the previous release `21.13.0` had an issue publishing to NPM so we're bumping versions to trigger a new release.

## 21.13.0

### Patch Changes

- [#2761](https://github.com/commercetools/merchant-center-application-kit/pull/2761) [`d012420e5`](https://github.com/commercetools/merchant-center-application-kit/commit/d012420e563b34a1678693f19905bdd79b2317e2) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Update all dependencies

## 21.12.0

## 21.11.0

## 21.10.0

## 21.9.0

### Patch Changes

- [#2705](https://github.com/commercetools/merchant-center-application-kit/pull/2705) [`abe2c475`](https://github.com/commercetools/merchant-center-application-kit/commit/abe2c475be2aff3781ac6151178aede1e0801f77) Thanks [@emmenko](https://github.com/emmenko)! - Update typescript dependencies

* [#2706](https://github.com/commercetools/merchant-center-application-kit/pull/2706) [`28de0b59`](https://github.com/commercetools/merchant-center-application-kit/commit/28de0b59e8f3944eaef9000b517b384acfc4b98d) Thanks [@emmenko](https://github.com/emmenko)! - Update `msw` to `v0.44.0`

- [#2702](https://github.com/commercetools/merchant-center-application-kit/pull/2702) [`69a1fe13`](https://github.com/commercetools/merchant-center-application-kit/commit/69a1fe13362188977c0a9df86754634fdc81a413) Thanks [@emmenko](https://github.com/emmenko)! - Update Babel dependencies

## 21.8.1

### Patch Changes

- [#2678](https://github.com/commercetools/merchant-center-application-kit/pull/2678) [`54b4ce3e`](https://github.com/commercetools/merchant-center-application-kit/commit/54b4ce3ee1d05f12c8926a2e6288a94c6b90e95c) Thanks [@emmenko](https://github.com/emmenko)! - Improve validation check for using `getRequestUrl` and clarify Lambda v2 usage.

## 21.8.0

### Minor Changes

- [#2667](https://github.com/commercetools/merchant-center-application-kit/pull/2667) [`1d8c71f1`](https://github.com/commercetools/merchant-center-application-kit/commit/1d8c71f1fed656bb6dedb3379198cc6fcdb5363f) Thanks [@emmenko](https://github.com/emmenko)! - Add support for setting the `audience` policy. The policy can be used to determine how the `audience` value is exchanged between the Merchant Center API and the external API.

  Supported values are:

  - `forward-url-full-path`: This is the default policy. It sets the `audience` using the full URL (origin + pathname).
  - `forward-url-origin`: This is the alternative policy. It sets the `audience` using only the origin URL part.

  ```js
  createSessionAuthVerifier({
    audiencePolicy: 'forward-url-origin',
    // ...
  });

  createSessionMiddleware({
    audiencePolicy: 'forward-url-origin',
    // ...
  });
  ```

### Patch Changes

- [#2661](https://github.com/commercetools/merchant-center-application-kit/pull/2661) [`43a9df21`](https://github.com/commercetools/merchant-center-application-kit/commit/43a9df2193000b49a0299c02d5218c50d71567ed) Thanks [@emmenko](https://github.com/emmenko)! - Drop the copyright year from the license files

* [#2675](https://github.com/commercetools/merchant-center-application-kit/pull/2675) [`cb608529`](https://github.com/commercetools/merchant-center-application-kit/commit/cb608529de2373be6926b0317a0376690c339148) Thanks [@emmenko](https://github.com/emmenko)! - Fix reading and validating case sensitive `X-MC-API-*` headers

## 21.6.0

### Patch Changes

- [#2555](https://github.com/commercetools/merchant-center-application-kit/pull/2555) [`0b7a3743`](https://github.com/commercetools/merchant-center-application-kit/commit/0b7a3743207172ace7f2b6893b9c7d61c351967b) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

* [#2598](https://github.com/commercetools/merchant-center-application-kit/pull/2598) [`b1515054`](https://github.com/commercetools/merchant-center-application-kit/commit/b15150542ee221a921f15896b7eda2267628ea57) Thanks [@emmenko](https://github.com/emmenko)! - Update `express` and `express-jwt` packages

## 21.3.4

### Patch Changes

- [#2546](https://github.com/commercetools/merchant-center-application-kit/pull/2546) [`dc76e5a9`](https://github.com/commercetools/merchant-center-application-kit/commit/dc76e5a9a7f875dadf2ed5a11c48a1ddff7b431c) Thanks [@renovate](https://github.com/apps/renovate)! - Upgrade dependencies

## 21.3.0

### Patch Changes

- [#2520](https://github.com/commercetools/merchant-center-application-kit/pull/2520) [`6f3a2083`](https://github.com/commercetools/merchant-center-application-kit/commit/6f3a2083efac387e9a2994fbaaeb18914e739aa8) Thanks [@renovate](https://github.com/apps/renovate)! - Upgrade dependencies

## 21.2.1

### Patch Changes

- [#2471](https://github.com/commercetools/merchant-center-application-kit/pull/2471) [`dc02733d`](https://github.com/commercetools/merchant-center-application-kit/commit/dc02733dfe14ce864e6efd36c6746892170ade3d) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

## 21.1.1

### Patch Changes

- [#2494](https://github.com/commercetools/merchant-center-application-kit/pull/2494) [`0ea616f8`](https://github.com/commercetools/merchant-center-application-kit/commit/0ea616f8263499328f8e3724d6fd2840727fcde6) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Allow to map a `request` URL (URI path + query string) using the `getRequestUrl` function in case the `request` object does not contain either an `originalUrl` or `url` properties.

  More info at https://docs.commercetools.com/custom-applications/concepts/integrate-with-your-own-api#validating-the-json-web-token.

## 21.0.0

### Patch Changes

- [#2450](https://github.com/commercetools/merchant-center-application-kit/pull/2450) [`eb8f5b2c`](https://github.com/commercetools/merchant-center-application-kit/commit/eb8f5b2c885a4c3ffc7857a61e50508b429bf964) Thanks [@emmenko](https://github.com/emmenko)! - Update dependencies

* [#2430](https://github.com/commercetools/merchant-center-application-kit/pull/2430) [`bb1f7d75`](https://github.com/commercetools/merchant-center-application-kit/commit/bb1f7d75ff54f7fef05c4d2b3328b88e400b4867) Thanks [@emmenko](https://github.com/emmenko)! - Use version range for Babel packages.

## 21.0.0-rc.1

### Patch Changes

- [#2430](https://github.com/commercetools/merchant-center-application-kit/pull/2430) [`5ea8baf1`](https://github.com/commercetools/merchant-center-application-kit/commit/5ea8baf1b2ca2661aac9a6a572d2c8e596ee0b2c) Thanks [@emmenko](https://github.com/emmenko)! - Use version range for Babel packages.

## 21.0.0-rc.0

### Patch Changes

- [#2450](https://github.com/commercetools/merchant-center-application-kit/pull/2450) [`eb8f5b2c`](https://github.com/commercetools/merchant-center-application-kit/commit/eb8f5b2c885a4c3ffc7857a61e50508b429bf964) Thanks [@emmenko](https://github.com/emmenko)! - Update dependencies

## 20.12.3

### Patch Changes

- [#2433](https://github.com/commercetools/merchant-center-application-kit/pull/2433) [`d65e29e4`](https://github.com/commercetools/merchant-center-application-kit/commit/d65e29e4eea4d1809abaa8cc82cc246c681dfa27) Thanks [@emmenko](https://github.com/emmenko)! - Replace `ts-jest/utils` with `jest-mock`, for using the `mocked` function.

* [#2433](https://github.com/commercetools/merchant-center-application-kit/pull/2433) [`d65e29e4`](https://github.com/commercetools/merchant-center-application-kit/commit/d65e29e4eea4d1809abaa8cc82cc246c681dfa27) Thanks [@emmenko](https://github.com/emmenko)! - Update dependencies

## 20.12.1

### Patch Changes

- [#2384](https://github.com/commercetools/merchant-center-application-kit/pull/2384) [`cf914004`](https://github.com/commercetools/merchant-center-application-kit/commit/cf9140043ade6edb3ee71a7558b757f5e19bee81) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

## 20.12.0

### Patch Changes

- [#2389](https://github.com/commercetools/merchant-center-application-kit/pull/2389) [`f70131b2`](https://github.com/commercetools/merchant-center-application-kit/commit/f70131b2b74e95071bbc80f865900f5e1c95d8ef) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update dependency @types/node to v16

## 20.10.6

### Patch Changes

- [#2386](https://github.com/commercetools/merchant-center-application-kit/pull/2386) [`d7fcf6fc`](https://github.com/commercetools/merchant-center-application-kit/commit/d7fcf6fc8495d4eae68e0a4f4c1f1b3e0e394454) Thanks [@emmenko](https://github.com/emmenko)! - Upgrade to Yarn v3

## 20.10.4

### Patch Changes

- [#2380](https://github.com/commercetools/merchant-center-application-kit/pull/2380) [`7fa4d7d0`](https://github.com/commercetools/merchant-center-application-kit/commit/7fa4d7d0c560226eba69ccb73c4014879939e8da) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

## 20.10.1

### Patch Changes

- [#2348](https://github.com/commercetools/merchant-center-application-kit/pull/2348) [`3247e604`](https://github.com/commercetools/merchant-center-application-kit/commit/3247e6048533a72c9f64cd316621dd51471cd1a8) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

* [#2342](https://github.com/commercetools/merchant-center-application-kit/pull/2342) [`91ba0910`](https://github.com/commercetools/merchant-center-application-kit/commit/91ba0910ce09ab7f3552fd381983724a63d7243d) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- [#2356](https://github.com/commercetools/merchant-center-application-kit/pull/2356) [`e34fe076`](https://github.com/commercetools/merchant-center-application-kit/commit/e34fe076aab6681cdcc54622d84123f2c22020e6) Thanks [@ByronDWall](https://github.com/ByronDWall)! - set node version to 16.8 in nvmrc to avoid a bug in node/v8

## 20.9.4

### Patch Changes

- [#2336](https://github.com/commercetools/merchant-center-application-kit/pull/2336) [`8c6c13a7`](https://github.com/commercetools/merchant-center-application-kit/commit/8c6c13a79f91ea9476983e12c48ae834ca4640c1) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

## 20.9.3

### Patch Changes

- [#2318](https://github.com/commercetools/merchant-center-application-kit/pull/2318) [`83f2add2`](https://github.com/commercetools/merchant-center-application-kit/commit/83f2add2a56ba6696c51fd930a0a1dadbf36c134) Thanks [@renovate](https://github.com/apps/renovate)! - Update all dependencies

## 20.8.0

### Patch Changes

- [#2300](https://github.com/commercetools/merchant-center-application-kit/pull/2300) [`b3437eab`](https://github.com/commercetools/merchant-center-application-kit/commit/b3437eab6fd7b1529f5eac78eda658028474afa7) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

## 20.7.0

### Patch Changes

- [#2293](https://github.com/commercetools/merchant-center-application-kit/pull/2293) [`c7325b0d`](https://github.com/commercetools/merchant-center-application-kit/commit/c7325b0d4e45132ff0c9a5243132537057dfa406) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

* [#2287](https://github.com/commercetools/merchant-center-application-kit/pull/2287) [`f5aa350a`](https://github.com/commercetools/merchant-center-application-kit/commit/f5aa350a29983383dd5933ac38c0beb56f0b9cf5) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

## 20.5.2

### Patch Changes

- [#2273](https://github.com/commercetools/merchant-center-application-kit/pull/2273) [`b96d4f3d`](https://github.com/commercetools/merchant-center-application-kit/commit/b96d4f3d6ab177da66bc8cab337172bf3a85b2c6) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

## 20.5.1

### Patch Changes

- [#2264](https://github.com/commercetools/merchant-center-application-kit/pull/2264) [`e0ea1333`](https://github.com/commercetools/merchant-center-application-kit/commit/e0ea1333218aa7a916ff0971a52ed8175be4d697) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

* [#2268](https://github.com/commercetools/merchant-center-application-kit/pull/2268) [`c370f242`](https://github.com/commercetools/merchant-center-application-kit/commit/c370f242bb85bc0041b4825bc4ebc877eaaa61e4) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

## 20.3.0

### Patch Changes

- [#2223](https://github.com/commercetools/merchant-center-application-kit/pull/2223) [`6de28034`](https://github.com/commercetools/merchant-center-application-kit/commit/6de28034f51e53b3cd1f293eaa16b8f66d9ae9e0) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

* [#2212](https://github.com/commercetools/merchant-center-application-kit/pull/2212) [`5961c019`](https://github.com/commercetools/merchant-center-application-kit/commit/5961c019ab908bc1a5d58acd4511e7c579976797) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

## 20.1.2

### Patch Changes

- [#2199](https://github.com/commercetools/merchant-center-application-kit/pull/2199) [`0bfa1613`](https://github.com/commercetools/merchant-center-application-kit/commit/0bfa16134450fb0699018b2210e0da904f646140) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

## 20.0.1

### Patch Changes

- [#2178](https://github.com/commercetools/merchant-center-application-kit/pull/2178) [`26d4487a`](https://github.com/commercetools/merchant-center-application-kit/commit/26d4487a15dcee5c526de7b1f227e042e2711d3f) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

## 19.3.1

### Patch Changes

- [#2157](https://github.com/commercetools/merchant-center-application-kit/pull/2157) [`e757dd2b`](https://github.com/commercetools/merchant-center-application-kit/commit/e757dd2b114f0c751400eca6179700bddbb3aecc) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

## 19.0.1

### Patch Changes

- [#2135](https://github.com/commercetools/merchant-center-application-kit/pull/2135) [`598d3bb5`](https://github.com/commercetools/merchant-center-application-kit/commit/598d3bb52a43b261f4ddf0393722927b76339870) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

## 18.7.0

### Patch Changes

- [#2111](https://github.com/commercetools/merchant-center-application-kit/pull/2111) [`b20e2dab`](https://github.com/commercetools/merchant-center-application-kit/commit/b20e2dab8b60e21463302d72724cbb65c78033fa) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update dependency jwks-rsa to v2

* [#2110](https://github.com/commercetools/merchant-center-application-kit/pull/2110) [`c850d6dc`](https://github.com/commercetools/merchant-center-application-kit/commit/c850d6dcf8edabb5eb9390e41def4b6b52879b7a) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

## 18.6.1

### Patch Changes

- [#2118](https://github.com/commercetools/merchant-center-application-kit/pull/2118) [`ae1f9d16`](https://github.com/commercetools/merchant-center-application-kit/commit/ae1f9d167933827070c2d9c5dcd704fee4a56886) Thanks [@adnasa](https://github.com/adnasa)! - Fix issue with invalid JWT `aud` in case the request contains query string parameters. Now the constructed audience url omits the query string parameters.

## 18.6.0

### Patch Changes

- [#2099](https://github.com/commercetools/merchant-center-application-kit/pull/2099) [`d09a154b`](https://github.com/commercetools/merchant-center-application-kit/commit/d09a154b9e74bc180da033acd8e74ac8ed32fc75) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

## 18.5.6

### Patch Changes

- [`075c770a`](https://github.com/commercetools/merchant-center-application-kit/commit/075c770a009c9f428a83a6c57f924b7683bef0fc) [#2088](https://github.com/commercetools/merchant-center-application-kit/pull/2088) Thanks [@tdeekens](https://github.com/tdeekens)! - chore: update msw

* [`ca4ea6eb`](https://github.com/commercetools/merchant-center-application-kit/commit/ca4ea6eb17c14bf015a8448248c58881e005ac99) [#2085](https://github.com/commercetools/merchant-center-application-kit/pull/2085) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- [`0592dc7d`](https://github.com/commercetools/merchant-center-application-kit/commit/0592dc7dccd77305bda07563280d4322d7996b4e) [#2091](https://github.com/commercetools/merchant-center-application-kit/pull/2091) Thanks [@tdeekens](https://github.com/tdeekens)! - chore: update typescript to 4.2.3

## 18.5.4

### Patch Changes

- [`d44f5b69`](https://github.com/commercetools/merchant-center-application-kit/commit/d44f5b6916c3897ce198eb06757d29d40535b8d4) [#2076](https://github.com/commercetools/merchant-center-application-kit/pull/2076) Thanks [@tdeekens](https://github.com/tdeekens)! - refactor: to remove lerna and only use many-pkg

## 18.5.2

### Patch Changes

- [`7f26c54e`](https://github.com/commercetools/merchant-center-application-kit/commit/7f26c54e55eff8aeac786ec0d011d36e40b0d263) [#2066](https://github.com/commercetools/merchant-center-application-kit/pull/2066) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

## 18.5.1

### Patch Changes

- [`bb2ceac2`](https://github.com/commercetools/merchant-center-application-kit/commit/bb2ceac229b94836482dbed57824d679a9cbd5d6) [#2062](https://github.com/commercetools/merchant-center-application-kit/pull/2062) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

## 18.4.1

### Patch Changes

- [`074ec33d`](https://github.com/commercetools/merchant-center-application-kit/commit/074ec33d97282fc9750fd59ccceb33ff0430da41) [#2053](https://github.com/commercetools/merchant-center-application-kit/pull/2053) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

## 18.4.0

### Patch Changes

- [`eb2fbb22`](https://github.com/commercetools/merchant-center-application-kit/commit/eb2fbb2279eff99048c91da352a69e1883eb54af) [#2044](https://github.com/commercetools/merchant-center-application-kit/pull/2044) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

## 18.1.4

### Patch Changes

- [`c9589f5e`](https://github.com/commercetools/merchant-center-application-kit/commit/c9589f5e3d1fd18393c7bf501c3b23b8ec402804) [#2020](https://github.com/commercetools/merchant-center-application-kit/pull/2020) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

## 18.1.0

### Patch Changes

- [`3bf32993`](https://github.com/commercetools/merchant-center-application-kit/commit/3bf329935a109a73a7c33580fdf618e60fdbcc2c) [#1971](https://github.com/commercetools/merchant-center-application-kit/pull/1971) Thanks [@tdeekens](https://github.com/tdeekens)! - Add internal opt-in support for combining feature flag adapters.

## 18.0.2

### Patch Changes

- [`b38cb57f`](https://github.com/commercetools/merchant-center-application-kit/commit/b38cb57f678e79a862f1b97df2d1c753838ffbb7) [#1991](https://github.com/commercetools/merchant-center-application-kit/pull/1991) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

## 17.10.1

### Patch Changes

- [`5557c5c`](https://github.com/commercetools/merchant-center-application-kit/commit/5557c5c5744bf34a981247d04dc2f1117c15767d) [#1976](https://github.com/commercetools/merchant-center-application-kit/pull/1976) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

## 17.8.0

### Patch Changes

- [`48a9886`](https://github.com/commercetools/merchant-center-application-kit/commit/48a98861dcf4193041e02e8ac11eb2940826f5d0) [#1954](https://github.com/commercetools/merchant-center-application-kit/pull/1954) Thanks [@tdeekens](https://github.com/tdeekens)! - chore: update dependencies across packages

## 17.7.1

### Patch Changes

- [`f6f3c5e`](https://github.com/commercetools/merchant-center-application-kit/commit/f6f3c5ebd08226fd4eca22aec5c39791cf5c5d6a) [#1935](https://github.com/commercetools/merchant-center-application-kit/pull/1935) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

## 17.7.0

### Patch Changes

- [`1ec4379`](https://github.com/commercetools/merchant-center-application-kit/commit/1ec4379938b093d4444ec9e4079524c48afd4a42) [#1923](https://github.com/commercetools/merchant-center-application-kit/pull/1923) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

## 17.6.2

### Patch Changes

- [`1a96e83`](https://github.com/commercetools/merchant-center-application-kit/commit/1a96e831c94250e10de61dee40e682a77313445f) [#1905](https://github.com/commercetools/merchant-center-application-kit/pull/1905) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

## 17.6.0

### Patch Changes

- [`2287813`](https://github.com/commercetools/merchant-center-application-kit/commit/2287813c19a54b7edb7005d417c5f6a7b34cad1f) [#1871](https://github.com/commercetools/merchant-center-application-kit/pull/1871) Thanks [@emmenko](https://github.com/emmenko)! - Compile and bundle packages using [preconstruct](https://preconstruct.tools)

## 17.4.1

### Patch Changes

- [`e2d519f`](https://github.com/commercetools/merchant-center-application-kit/commit/e2d519f8669319a60d70eddb04fbaeb5649ad638) [#1695](https://github.com/commercetools/merchant-center-application-kit/pull/1695) Thanks [@renovate](https://github.com/apps/renovate)! - Migrate to Typescript v4

* [`ec9e10f`](https://github.com/commercetools/merchant-center-application-kit/commit/ec9e10fde15351cc7cb825aaebb53cdb6e00e0d9) [#1889](https://github.com/commercetools/merchant-center-application-kit/pull/1889) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

## 17.3.1

### Patch Changes

- [`89c4464`](https://github.com/commercetools/merchant-center-application-kit/commit/89c4464c334dd6c3922d031872286ad3bea8cf67) [#1872](https://github.com/commercetools/merchant-center-application-kit/pull/1872) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

## 17.3.0

### Patch Changes

- [`71c9111`](https://github.com/commercetools/merchant-center-application-kit/commit/71c9111308832009d1a27e91e4f2d2da4c53367c) [#1866](https://github.com/commercetools/merchant-center-application-kit/pull/1866) Thanks [@emmenko](https://github.com/emmenko)! - Update to uikit v10.39.8

## 17.2.1

### Patch Changes

- [`310e98c`](https://github.com/commercetools/merchant-center-application-kit/commit/310e98c39c0b6479175b7685b3f29ea0a5baa22b) Thanks [@emmenko](https://github.com/emmenko)! - Update dependencies (https://github.com/commercetools/merchant-center-application-kit/pull/1857)

## 17.2.0

### Patch Changes

- [`e0ec004`](https://github.com/commercetools/merchant-center-application-kit/commit/e0ec004d611f93b24f015120d09f6f18389b219f) [#1854](https://github.com/commercetools/merchant-center-application-kit/pull/1854) Thanks [@emmenko](https://github.com/emmenko)! - chore: update deps

## 17.1.0

### Patch Changes

- [`5d9d5da`](https://github.com/commercetools/merchant-center-application-kit/commit/5d9d5da44364fe5590b67be21ac3630e177326e3) [#1820](https://github.com/commercetools/merchant-center-application-kit/pull/1820) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

## 17.0.1

### Patch Changes

- [`71c5f78`](https://github.com/commercetools/merchant-center-application-kit/commit/71c5f7875c7476e34b65d37046d48ca47e96f12e) [#1795](https://github.com/commercetools/merchant-center-application-kit/pull/1795) Thanks [@renovate](https://github.com/apps/renovate)! - update dependencies

## 16.17.2

### Patch Changes

- [`9752622`](https://github.com/commercetools/merchant-center-application-kit/commit/9752622b7422e821bb62d61af360a01f6994dc6b) [#1758](https://github.com/commercetools/merchant-center-application-kit/pull/1758) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

## 16.17.0

### Patch Changes

- [`786c697`](https://github.com/commercetools/merchant-center-application-kit/commit/786c6978c1febf927db6b45c758498b72e8e48be) [#1745](https://github.com/commercetools/merchant-center-application-kit/pull/1745) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

* [`178ff31`](https://github.com/commercetools/merchant-center-application-kit/commit/178ff317426e0cfcfe1c0adf42a9eada3b134642) [#1734](https://github.com/commercetools/merchant-center-application-kit/pull/1734) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

- [`9bc8558`](https://github.com/commercetools/merchant-center-application-kit/commit/9bc85581d336c7d75fda5dc82a1c02f32f16c1fb) [#1704](https://github.com/commercetools/merchant-center-application-kit/pull/1704) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

## 16.16.1

### Patch Changes

- [`bc15ac2`](https://github.com/commercetools/merchant-center-application-kit/commit/bc15ac2f6d53d4c8e0d53ceb6c1a0e5ba0f5353e) [#1692](https://github.com/commercetools/merchant-center-application-kit/pull/1692) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

## 16.16.0

### Patch Changes

- [`f144292`](https://github.com/commercetools/merchant-center-application-kit/commit/f1442921650ca4e6c9bf61ce31bda2b63e72038a) [#1673](https://github.com/commercetools/merchant-center-application-kit/pull/1673) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

## 16.15.8

### Patch Changes

- [`c62261f`](https://github.com/commercetools/merchant-center-application-kit/commit/c62261f80e17fb63467eed6328e41764d3e9a50e) [#1653](https://github.com/commercetools/merchant-center-application-kit/pull/1653) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies and regenerate l10n data based on CLDR v37

## 16.15.0

### Patch Changes

- [`cc8b37b`](https://github.com/commercetools/merchant-center-application-kit/commit/cc8b37bf85d4683a605a6c3233100627e670ebe7) [#1627](https://github.com/commercetools/merchant-center-application-kit/pull/1627) Thanks [@renovate](https://github.com/apps/renovate)! - chore: update dependencies

## 16.14.0

### Patch Changes

- [`779100b`](https://github.com/commercetools/merchant-center-application-kit/commit/779100b432ad448eefec311f31f87891f35489f6) [#1608](https://github.com/commercetools/merchant-center-application-kit/pull/1608) Thanks [@renovate](https://github.com/apps/renovate)! - Update all dependencies

* [`4168061`](https://github.com/commercetools/merchant-center-application-kit/commit/41680612042d476422776e5eaa254450bf874581) [#1618](https://github.com/commercetools/merchant-center-application-kit/pull/1618) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- [`cfd8e5c`](https://github.com/commercetools/merchant-center-application-kit/commit/cfd8e5c60ba470fb4fc473b0287adf7b177ddd6a) [#1620](https://github.com/commercetools/merchant-center-application-kit/pull/1620) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update dependency express-jwt to v6

## 16.12.0

### Patch Changes

- [`fa6386c`](https://github.com/commercetools/merchant-center-application-kit/commit/fa6386c347df0505235c199232353bc315a47c81) [#1587](https://github.com/commercetools/merchant-center-application-kit/pull/1587) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

## 16.10.0

### Patch Changes

- [`f8f8609`](https://github.com/commercetools/merchant-center-application-kit/commit/f8f86098687c8cecaaec1b13debabe290b007b58) [#1573](https://github.com/commercetools/merchant-center-application-kit/pull/1573) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

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

- [`a66fb1f`](https://github.com/commercetools/merchant-center-application-kit/commit/a66fb1f37a06271b0fad0b2a3f6ea41c61455f0e) [#1518](https://github.com/commercetools/merchant-center-application-kit/pull/1518) Thanks [@tdeekens](https://github.com/tdeekens)! - chore(deps): update all dependencies

## 16.8.4

### Patch Changes

- [`6ffe293`](https://github.com/commercetools/merchant-center-application-kit/commit/6ffe29312433e357ac6c57ce39e98cf9cba49ba5) [#1508](https://github.com/commercetools/merchant-center-application-kit/pull/1508) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies
