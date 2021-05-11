# merchant-center-application-template-starter

## 18.1.3

### Patch Changes

- Updated dependencies []:
  - @commercetools-frontend/actions-global@20.2.1
  - @commercetools-frontend/application-shell@20.2.1
  - @commercetools-frontend/i18n@20.2.1
  - @commercetools-frontend/permissions@20.2.1
  - @commercetools-frontend/application-components@20.2.1

## 18.1.2

### Patch Changes

- Updated dependencies [[`864ce386`](https://github.com/commercetools/merchant-center-application-kit/commit/864ce386995a417f3bff2fd0ab052b5f2f59a196)]:
  - @commercetools-frontend/application-shell@20.2.0

## 18.1.1

### Patch Changes

- [#2193](https://github.com/commercetools/merchant-center-application-kit/pull/2193) [`2c159ca3`](https://github.com/commercetools/merchant-center-application-kit/commit/2c159ca3a861a4321ecfb8c6ea382bea9a9cdd65) Thanks [@adnasa](https://github.com/adnasa)! - Bump to latest ui-kit

* [#2199](https://github.com/commercetools/merchant-center-application-kit/pull/2199) [`0bfa1613`](https://github.com/commercetools/merchant-center-application-kit/commit/0bfa16134450fb0699018b2210e0da904f646140) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

* Updated dependencies [[`2c159ca3`](https://github.com/commercetools/merchant-center-application-kit/commit/2c159ca3a861a4321ecfb8c6ea382bea9a9cdd65), [`0bfa1613`](https://github.com/commercetools/merchant-center-application-kit/commit/0bfa16134450fb0699018b2210e0da904f646140)]:
  - @commercetools-frontend/application-components@20.1.2
  - @commercetools-frontend/application-shell@20.1.2
  - @commercetools-frontend/actions-global@20.1.2
  - @commercetools-frontend/permissions@20.1.2

## 18.1.0

### Minor Changes

- [#2191](https://github.com/commercetools/merchant-center-application-kit/pull/2191) [`b5058130`](https://github.com/commercetools/merchant-center-application-kit/commit/b505813030c2783228e8e0ddf77f4b65a3b5e4d3) Thanks [@emmenko](https://github.com/emmenko)! - New CLI options! 🎉

  ## Loading dotenv files

  The `mc-script` CLI now supports loading environment variables from [dotenv files](https://www.npmjs.com/package/dotenv).

  Previously, we recommended to use `dotenv-cli` to load environment variables before executing the `mc-scripts` command. For example:

  ```
  dotenv -c development -- mc-scripts start

  NODE_ENV=production dotenv -- mc-scripts compile-html

  NODE_ENV=production dotenv -e .env.gcp-production-eu -- mc-scripts compile-html
  ```

  Now the `mc-scripts` CLI has the dotenv features built-in, so you don't need to install and use `dotenv-cli` anymore.

  By default, the following dotenv files are loaded according to the current environment values specified on each command: `process.MC_APP_ENV` or `process.NODE_ENV`. The priority of how the files are merged and overwritten goes from top to bottom (highest defined variable overrides lower).

  - `.env.development.local`, `.env.test.local`, `.env.production.local`: Local overrides of environment-specific settings.
  - `.env.development`, `.env.test`, `.env.production`: Environment-specific settings.
  - `.env.local`: Local overrides. **This file is loaded for all environments except test.**
  - `.env`

  Please refer to the [dotenv documentation](https://github.com/motdotla/dotenv) for more details.

  Furthermore, you can pass additional dotenv files by using the following option:

  - `--env <path>`: Parses the file path as a dotenv file and adds the variables to the environment. Multiple flags are allowed.

  These files will take higher priority over the standard environment dotenv files.

  The example above can then be refactored as following:

  ```diff
  -dotenv -c development -- mc-scripts start
  +mc-scripts start

  -NODE_ENV=production dotenv -- mc-scripts compile-html
  +NODE_ENV=production mc-scripts compile-html

  -NODE_ENV=production dotenv -e .env.gcp-production-eu -- mc-scripts compile-html
  +NODE_ENV=production mc-scripts --env .env.gcp-production-eu compile-html
  ```

  ## Prompt for selecting an application to start

  If you are developing multiple Custom Applications in the same repository, chances are that you use a mono-repository setup.

  If that's the case, you can now run the `mc-scripts start` command from the workspace root folder and pass the option `--match <glob>`. The option will attempt to gather a list of packages in the repository that match the glob pattern and show it as a prompt. You can then select the application that you want to start from that list.

  We hope you find it useful.

## 18.0.8

### Patch Changes

- [#2178](https://github.com/commercetools/merchant-center-application-kit/pull/2178) [`26d4487a`](https://github.com/commercetools/merchant-center-application-kit/commit/26d4487a15dcee5c526de7b1f227e042e2711d3f) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`26d4487a`](https://github.com/commercetools/merchant-center-application-kit/commit/26d4487a15dcee5c526de7b1f227e042e2711d3f)]:
  - @commercetools-frontend/actions-global@20.0.1
  - @commercetools-frontend/application-components@20.0.1
  - @commercetools-frontend/application-shell@20.0.1
  - @commercetools-frontend/i18n@20.0.1
  - @commercetools-frontend/permissions@20.0.1

## 18.0.7

### Patch Changes

- [#2175](https://github.com/commercetools/merchant-center-application-kit/pull/2175) [`49d253ad`](https://github.com/commercetools/merchant-center-application-kit/commit/49d253ad4aeb373389e424f8e09ecdafc15405c8) Thanks [@emmenko](https://github.com/emmenko)! - Remove `enzyme` from tests and dependencies.

- Updated dependencies []:
  - @commercetools-frontend/application-shell@20.0.0

## 18.0.6

### Patch Changes

- Updated dependencies [[`75efb3e4`](https://github.com/commercetools/merchant-center-application-kit/commit/75efb3e4f50cf5011c5affb4a9488f3520e7a8a7)]:
  - @commercetools-frontend/application-shell@19.4.1

## 18.0.5

### Patch Changes

- [#2157](https://github.com/commercetools/merchant-center-application-kit/pull/2157) [`e757dd2b`](https://github.com/commercetools/merchant-center-application-kit/commit/e757dd2b114f0c751400eca6179700bddbb3aecc) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`e757dd2b`](https://github.com/commercetools/merchant-center-application-kit/commit/e757dd2b114f0c751400eca6179700bddbb3aecc), [`de1fa715`](https://github.com/commercetools/merchant-center-application-kit/commit/de1fa7153c1baab5da116babc857fec3f0e99d51)]:
  - @commercetools-frontend/actions-global@19.3.1
  - @commercetools-frontend/application-components@19.3.1
  - @commercetools-frontend/application-shell@19.3.1
  - @commercetools-frontend/i18n@19.3.1
  - @commercetools-frontend/permissions@19.3.1

## 18.0.4

### Patch Changes

- Updated dependencies [[`7ec6626f`](https://github.com/commercetools/merchant-center-application-kit/commit/7ec6626f7db35127b3611f546828b01151222d4c)]:
  - @commercetools-frontend/application-shell@19.3.0

## 18.0.3

### Patch Changes

- Updated dependencies [[`7ec6626f`](https://github.com/commercetools/merchant-center-application-kit/commit/7ec6626f7db35127b3611f546828b01151222d4c)]:
  - @commercetools-frontend/application-shell@19.2.0

## 18.0.2

### Patch Changes

- Updated dependencies []:
  - @commercetools-frontend/application-components@19.1.0
  - @commercetools-frontend/application-shell@19.1.0

## 18.0.1

### Patch Changes

- [#2135](https://github.com/commercetools/merchant-center-application-kit/pull/2135) [`598d3bb5`](https://github.com/commercetools/merchant-center-application-kit/commit/598d3bb52a43b261f4ddf0393722927b76339870) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

- Updated dependencies [[`598d3bb5`](https://github.com/commercetools/merchant-center-application-kit/commit/598d3bb52a43b261f4ddf0393722927b76339870)]:
  - @commercetools-frontend/application-components@19.0.1
  - @commercetools-frontend/application-shell@19.0.1
  - @commercetools-frontend/i18n@19.0.1
  - @commercetools-frontend/permissions@19.0.1

## 18.0.0

### Major Changes

- [#2041](https://github.com/commercetools/merchant-center-application-kit/pull/2041) [`a240f657`](https://github.com/commercetools/merchant-center-application-kit/commit/a240f6574a9240a2ac82febb67b0f6c814db979f) Thanks [@emmenko](https://github.com/emmenko)! - Upgrade and migrate packages to use `ui-kit@v12`

### Minor Changes

- [#2041](https://github.com/commercetools/merchant-center-application-kit/pull/2041) [`a240f657`](https://github.com/commercetools/merchant-center-application-kit/commit/a240f6574a9240a2ac82febb67b0f6c814db979f) Thanks [@emmenko](https://github.com/emmenko)! - - Uses `react@17`, `react-dom@17`.

### Patch Changes

- [#2119](https://github.com/commercetools/merchant-center-application-kit/pull/2119) [`c295c09c`](https://github.com/commercetools/merchant-center-application-kit/commit/c295c09c568aaeaa265498e6e13065ebe510936f) Thanks [@renovate](https://github.com/apps/renovate)! - upgrade @formatjs/cli to v4.2.6

- Updated dependencies [[`a240f657`](https://github.com/commercetools/merchant-center-application-kit/commit/a240f6574a9240a2ac82febb67b0f6c814db979f), [`a240f657`](https://github.com/commercetools/merchant-center-application-kit/commit/a240f6574a9240a2ac82febb67b0f6c814db979f), [`a240f657`](https://github.com/commercetools/merchant-center-application-kit/commit/a240f6574a9240a2ac82febb67b0f6c814db979f), [`a240f657`](https://github.com/commercetools/merchant-center-application-kit/commit/a240f6574a9240a2ac82febb67b0f6c814db979f), [`a240f657`](https://github.com/commercetools/merchant-center-application-kit/commit/a240f6574a9240a2ac82febb67b0f6c814db979f), [`a240f657`](https://github.com/commercetools/merchant-center-application-kit/commit/a240f6574a9240a2ac82febb67b0f6c814db979f)]:
  - @commercetools-frontend/permissions@19.0.0
  - @commercetools-frontend/actions-global@19.0.0
  - @commercetools-frontend/application-shell@19.0.0
  - @commercetools-frontend/application-components@19.0.0
  - @commercetools-frontend/i18n@19.0.0

## 17.2.25

### Patch Changes

- [#2122](https://github.com/commercetools/merchant-center-application-kit/pull/2122) [`c3ba44a6`](https://github.com/commercetools/merchant-center-application-kit/commit/c3ba44a6a124ddfbe6322436a260b93ff29ec4e9) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

* [#2110](https://github.com/commercetools/merchant-center-application-kit/pull/2110) [`c850d6dc`](https://github.com/commercetools/merchant-center-application-kit/commit/c850d6dcf8edabb5eb9390e41def4b6b52879b7a) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

* Updated dependencies [[`c3ba44a6`](https://github.com/commercetools/merchant-center-application-kit/commit/c3ba44a6a124ddfbe6322436a260b93ff29ec4e9), [`8b1e943c`](https://github.com/commercetools/merchant-center-application-kit/commit/8b1e943ca8068cfbf915a83e8498500455eabd75), [`c850d6dc`](https://github.com/commercetools/merchant-center-application-kit/commit/c850d6dcf8edabb5eb9390e41def4b6b52879b7a)]:
  - @commercetools-frontend/application-components@18.7.0
  - @commercetools-frontend/application-shell@18.7.0
  - @commercetools-frontend/i18n@18.7.0
  - @commercetools-frontend/actions-global@18.7.0
  - @commercetools-frontend/permissions@18.7.0

## 17.2.24

### Patch Changes

- [#2099](https://github.com/commercetools/merchant-center-application-kit/pull/2099) [`d09a154b`](https://github.com/commercetools/merchant-center-application-kit/commit/d09a154b9e74bc180da033acd8e74ac8ed32fc75) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

- Updated dependencies [[`d09a154b`](https://github.com/commercetools/merchant-center-application-kit/commit/d09a154b9e74bc180da033acd8e74ac8ed32fc75)]:
  - @commercetools-frontend/actions-global@18.6.0
  - @commercetools-frontend/application-components@18.6.0
  - @commercetools-frontend/application-shell@18.6.0
  - @commercetools-frontend/i18n@18.6.0
  - @commercetools-frontend/permissions@18.6.0

## 17.2.23

### Patch Changes

- [`ca4ea6eb`](https://github.com/commercetools/merchant-center-application-kit/commit/ca4ea6eb17c14bf015a8448248c58881e005ac99) [#2085](https://github.com/commercetools/merchant-center-application-kit/pull/2085) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`075c770a`](https://github.com/commercetools/merchant-center-application-kit/commit/075c770a009c9f428a83a6c57f924b7683bef0fc), [`ca4ea6eb`](https://github.com/commercetools/merchant-center-application-kit/commit/ca4ea6eb17c14bf015a8448248c58881e005ac99), [`0592dc7d`](https://github.com/commercetools/merchant-center-application-kit/commit/0592dc7dccd77305bda07563280d4322d7996b4e)]:
  - @commercetools-frontend/application-shell@18.5.6
  - @commercetools-frontend/actions-global@18.5.6
  - @commercetools-frontend/application-components@18.5.6
  - @commercetools-frontend/i18n@18.5.6
  - @commercetools-frontend/permissions@18.5.6

## 17.2.22

### Patch Changes

- Updated dependencies [[`5e7d20fb`](https://github.com/commercetools/merchant-center-application-kit/commit/5e7d20fbf908548aae8d9101bb7b36850f92aa95), [`e2137ecc`](https://github.com/commercetools/merchant-center-application-kit/commit/e2137ecc786c01445e4e9009174f32b2004a8daa)]:
  - @commercetools-frontend/application-components@18.5.5
  - @commercetools-frontend/application-shell@18.5.5

## 17.2.21

### Patch Changes

- Updated dependencies [[`d44f5b69`](https://github.com/commercetools/merchant-center-application-kit/commit/d44f5b6916c3897ce198eb06757d29d40535b8d4)]:
  - @commercetools-frontend/assets@18.5.4
  - @commercetools-frontend/application-components@18.5.4
  - @commercetools-frontend/application-shell@18.5.4

## 17.2.20

### Patch Changes

- [`5892c888`](https://github.com/commercetools/merchant-center-application-kit/commit/5892c88879bea4b5cb11b9da39d080005da6b045) [#2067](https://github.com/commercetools/merchant-center-application-kit/pull/2067) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all ui-kit packages to v11 (major)

* [`7f26c54e`](https://github.com/commercetools/merchant-center-application-kit/commit/7f26c54e55eff8aeac786ec0d011d36e40b0d263) [#2066](https://github.com/commercetools/merchant-center-application-kit/pull/2066) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

* Updated dependencies [[`5892c888`](https://github.com/commercetools/merchant-center-application-kit/commit/5892c88879bea4b5cb11b9da39d080005da6b045), [`7f26c54e`](https://github.com/commercetools/merchant-center-application-kit/commit/7f26c54e55eff8aeac786ec0d011d36e40b0d263)]:
  - @commercetools-frontend/application-components@18.5.2
  - @commercetools-frontend/application-shell@18.5.2
  - @commercetools-frontend/actions-global@18.5.2
  - @commercetools-frontend/i18n@18.5.2
  - @commercetools-frontend/permissions@18.5.2

## 17.2.19

### Patch Changes

- [`bb2ceac2`](https://github.com/commercetools/merchant-center-application-kit/commit/bb2ceac229b94836482dbed57824d679a9cbd5d6) [#2062](https://github.com/commercetools/merchant-center-application-kit/pull/2062) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`bb2ceac2`](https://github.com/commercetools/merchant-center-application-kit/commit/bb2ceac229b94836482dbed57824d679a9cbd5d6)]:
  - @commercetools-frontend/actions-global@18.5.1
  - @commercetools-frontend/application-components@18.5.1
  - @commercetools-frontend/application-shell@18.5.1
  - @commercetools-frontend/i18n@18.5.1
  - @commercetools-frontend/permissions@18.5.1

## 17.2.18

### Patch Changes

- Updated dependencies [[`8cfd73f3`](https://github.com/commercetools/merchant-center-application-kit/commit/8cfd73f3bcb830a07dffc3040c9c5960f180016f)]:
  - @commercetools-frontend/application-shell@18.5.0

## 17.2.17

### Patch Changes

- [`074ec33d`](https://github.com/commercetools/merchant-center-application-kit/commit/074ec33d97282fc9750fd59ccceb33ff0430da41) [#2053](https://github.com/commercetools/merchant-center-application-kit/pull/2053) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

- Updated dependencies [[`074ec33d`](https://github.com/commercetools/merchant-center-application-kit/commit/074ec33d97282fc9750fd59ccceb33ff0430da41), [`e5743110`](https://github.com/commercetools/merchant-center-application-kit/commit/e574311090e90b6186c18a3a49747a8bcf08822b)]:
  - @commercetools-frontend/actions-global@18.4.1
  - @commercetools-frontend/application-components@18.4.1
  - @commercetools-frontend/application-shell@18.4.1
  - @commercetools-frontend/i18n@18.4.1
  - @commercetools-frontend/permissions@18.4.1

## 17.2.16

### Patch Changes

- [`63d9c424`](https://github.com/commercetools/merchant-center-application-kit/commit/63d9c42463be04bad32ee32be1c84535086de755) [#2049](https://github.com/commercetools/merchant-center-application-kit/pull/2049) Thanks [@emmenko](https://github.com/emmenko)! - Bump uikit versions, use `@manypkg/cli upgrade` instead of `bulk-update-versions`.

* [`eb2fbb22`](https://github.com/commercetools/merchant-center-application-kit/commit/eb2fbb2279eff99048c91da352a69e1883eb54af) [#2044](https://github.com/commercetools/merchant-center-application-kit/pull/2044) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

* Updated dependencies [[`63d9c424`](https://github.com/commercetools/merchant-center-application-kit/commit/63d9c42463be04bad32ee32be1c84535086de755), [`eb2fbb22`](https://github.com/commercetools/merchant-center-application-kit/commit/eb2fbb2279eff99048c91da352a69e1883eb54af)]:
  - @commercetools-frontend/application-components@18.4.0
  - @commercetools-frontend/application-shell@18.4.0
  - @commercetools-frontend/i18n@18.4.0
  - @commercetools-frontend/actions-global@18.4.0
  - @commercetools-frontend/permissions@18.4.0

## 17.2.15

### Patch Changes

- Updated dependencies [[`71e12377`](https://github.com/commercetools/merchant-center-application-kit/commit/71e12377a4b4e623942b7f6b441bc9899b561cb3)]:
  - @commercetools-frontend/application-components@18.3.0
  - @commercetools-frontend/application-shell@18.3.0

## 17.2.14

### Patch Changes

- [`e5c77399`](https://github.com/commercetools/merchant-center-application-kit/commit/e5c77399f90ebc0a199a7620d0a8500ca53229f0) [#2036](https://github.com/commercetools/merchant-center-application-kit/pull/2036) Thanks [@tdeekens](https://github.com/tdeekens)! - Release to pull from main branch by default

## 17.2.13

### Patch Changes

- Updated dependencies [[`27b6690c`](https://github.com/commercetools/merchant-center-application-kit/commit/27b6690c75c9b83bb11ffcf83251b039a6f06cf0)]:
  - @commercetools-frontend/application-shell@18.2.2
  - @commercetools-frontend/actions-global@18.2.2
  - @commercetools-frontend/application-components@18.2.2
  - @commercetools-frontend/permissions@18.2.2
  - @commercetools-frontend/i18n@18.2.2

## 17.2.12

### Patch Changes

- Updated dependencies [[`b8b11a72`](https://github.com/commercetools/merchant-center-application-kit/commit/b8b11a726f05ab2645fa18f93537a427202f2ecd)]:
  - @commercetools-frontend/application-shell@18.2.1

## 17.2.11

### Patch Changes

- Updated dependencies [[`7fbe0c71`](https://github.com/commercetools/merchant-center-application-kit/commit/7fbe0c718d43e5c940e324e282f3cdd67a46717e)]:
  - @commercetools-frontend/application-shell@18.2.0

## 17.2.10

### Patch Changes

- [`aa6f642a`](https://github.com/commercetools/merchant-center-application-kit/commit/aa6f642a7d28dec7f34f8e6147ed9c7fee0ebd13) [#2026](https://github.com/commercetools/merchant-center-application-kit/pull/2026) Thanks [@emmenko](https://github.com/emmenko)! - Update uikit and docs-kit dependencies to fix some underlying emotion and react-select version resolution.

- Updated dependencies [[`aa6f642a`](https://github.com/commercetools/merchant-center-application-kit/commit/aa6f642a7d28dec7f34f8e6147ed9c7fee0ebd13)]:
  - @commercetools-frontend/application-components@18.1.5
  - @commercetools-frontend/application-shell@18.1.5
  - @commercetools-frontend/i18n@18.1.5

## 17.2.9

### Patch Changes

- [`c9589f5e`](https://github.com/commercetools/merchant-center-application-kit/commit/c9589f5e3d1fd18393c7bf501c3b23b8ec402804) [#2020](https://github.com/commercetools/merchant-center-application-kit/pull/2020) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

- Updated dependencies [[`c9589f5e`](https://github.com/commercetools/merchant-center-application-kit/commit/c9589f5e3d1fd18393c7bf501c3b23b8ec402804), [`657eb48f`](https://github.com/commercetools/merchant-center-application-kit/commit/657eb48f21c0c9c776e4ec4ad22b58318f845e14), [`88d444fd`](https://github.com/commercetools/merchant-center-application-kit/commit/88d444fd02c6f0c561754220540391dd2abc6025)]:
  - @commercetools-frontend/application-components@18.1.4
  - @commercetools-frontend/application-shell@18.1.4
  - @commercetools-frontend/i18n@18.1.4
  - @commercetools-frontend/actions-global@18.1.4
  - @commercetools-frontend/permissions@18.1.4

## 17.2.8

### Patch Changes

- Updated dependencies [[`94e350e2`](https://github.com/commercetools/merchant-center-application-kit/commit/94e350e2b65caed07be2dfd9a9d6d29ebc86bf73)]:
  - @commercetools-frontend/application-shell@18.1.3

## 17.2.7

### Patch Changes

- Updated dependencies [[`3bf32993`](https://github.com/commercetools/merchant-center-application-kit/commit/3bf329935a109a73a7c33580fdf618e60fdbcc2c), [`7a53760f`](https://github.com/commercetools/merchant-center-application-kit/commit/7a53760f4a04decd02037315d8935bed953abfc8)]:
  - @commercetools-frontend/actions-global@18.1.0
  - @commercetools-frontend/application-components@18.1.0
  - @commercetools-frontend/application-shell@18.1.0
  - @commercetools-frontend/assets@18.1.0
  - @commercetools-frontend/permissions@18.1.0
  - @commercetools-frontend/i18n@18.1.0

## 17.2.6

### Patch Changes

- Updated dependencies [[`80668fd2`](https://github.com/commercetools/merchant-center-application-kit/commit/80668fd27f3b8ce35230b7d5f780612e244f9621)]:
  - @commercetools-frontend/application-shell@18.0.3

## 17.2.5

### Patch Changes

- [`b38cb57f`](https://github.com/commercetools/merchant-center-application-kit/commit/b38cb57f678e79a862f1b97df2d1c753838ffbb7) [#1991](https://github.com/commercetools/merchant-center-application-kit/pull/1991) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

- Updated dependencies [[`b38cb57f`](https://github.com/commercetools/merchant-center-application-kit/commit/b38cb57f678e79a862f1b97df2d1c753838ffbb7)]:
  - @commercetools-frontend/actions-global@18.0.2
  - @commercetools-frontend/application-components@18.0.2
  - @commercetools-frontend/application-shell@18.0.2
  - @commercetools-frontend/i18n@18.0.2

## 17.2.4

### Patch Changes

- [`0ef6a6a`](https://github.com/commercetools/merchant-center-application-kit/commit/0ef6a6a3099ce7210b8db8cc5a21a5e40a050d36) [#1989](https://github.com/commercetools/merchant-center-application-kit/pull/1989) Thanks [@emmenko](https://github.com/emmenko)! - Update uikit packages to `10.44`

- Updated dependencies [[`0ef6a6a`](https://github.com/commercetools/merchant-center-application-kit/commit/0ef6a6a3099ce7210b8db8cc5a21a5e40a050d36), [`0ef6a6a`](https://github.com/commercetools/merchant-center-application-kit/commit/0ef6a6a3099ce7210b8db8cc5a21a5e40a050d36), [`0ef6a6a`](https://github.com/commercetools/merchant-center-application-kit/commit/0ef6a6a3099ce7210b8db8cc5a21a5e40a050d36)]:
  - @commercetools-frontend/application-shell@17.10.2
  - @commercetools-frontend/application-components@17.10.2
  - @commercetools-frontend/i18n@17.10.2

## 17.2.3

### Patch Changes

- [`5557c5c`](https://github.com/commercetools/merchant-center-application-kit/commit/5557c5c5744bf34a981247d04dc2f1117c15767d) [#1976](https://github.com/commercetools/merchant-center-application-kit/pull/1976) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

- Updated dependencies [[`5557c5c`](https://github.com/commercetools/merchant-center-application-kit/commit/5557c5c5744bf34a981247d04dc2f1117c15767d)]:
  - @commercetools-frontend/actions-global@17.10.1
  - @commercetools-frontend/application-components@17.10.1
  - @commercetools-frontend/application-shell@17.10.1
  - @commercetools-frontend/i18n@17.10.1
  - @commercetools-frontend/permissions@17.10.1

## 17.2.2

### Patch Changes

- Updated dependencies [[`d86c2e8`](https://github.com/commercetools/merchant-center-application-kit/commit/d86c2e86179aca2729d92fa18545241e2bf36fca), [`dc7a443`](https://github.com/commercetools/merchant-center-application-kit/commit/dc7a4437f02cfe9c840ae6f22cc85f94cf6a0bc9)]:
  - @commercetools-frontend/application-components@17.10.0
  - @commercetools-frontend/application-shell@17.10.0
  - @commercetools-frontend/permissions@17.10.0
  - @commercetools-frontend/actions-global@17.10.0
  - @commercetools-frontend/i18n@17.10.0

## 17.2.1

### Patch Changes

- [`87c35d8`](https://github.com/commercetools/merchant-center-application-kit/commit/87c35d8677d74150efbc8f318e0bd9ebc8794006) [#1966](https://github.com/commercetools/merchant-center-application-kit/pull/1966) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update dependency @formatjs/cli to v3

- Updated dependencies []:
  - @commercetools-frontend/application-components@17.9.1
  - @commercetools-frontend/application-shell@17.9.1

## 17.2.0

### Minor Changes

- [`4f7e081`](https://github.com/commercetools/merchant-center-application-kit/commit/4f7e081c001e285e8f4c7771894f5d09509daf8e) [#1948](https://github.com/commercetools/merchant-center-application-kit/pull/1948) Thanks [@emmenko](https://github.com/emmenko)! - Allow to pass the application routes as `children` of `<ApplicationShell>`, instead of using the `render` prop.
  When doing so, the application entry point routes are automatically configured according to the `entryPointUriPath` defined in the `custom-application-config.json`.

  > Note that it's still possible to use the `render` prop. However, for most of the cases it should suffice to rely on the pre-configured routes.

  ```diff
  const AsyncApplicationRoutes = React.lazy(
    () => import('../../routes' /* webpackChunkName: "starter-routes" */)
  );

  -export const ApplicationStarter = () => (
  -  <Switch>
  -    {
  -      /* For development, it's useful to redirect to the actual
  -      application routes when you open the browser at http://localhost:3001 */
  -      process.env.NODE_ENV === 'production' ? null : (
  -        <Redirect
  -          exact={true}
  -          from="/:projectKey"
  -          to="/:projectKey/examples-starter"
  -        />
  -      )
  -    }
  -    <Route
  -      path="/:projectKey/examples-starter"
  -      component={AsyncApplicationRoutes}
  -    />
  -    {/* Catch-all route */}
  -    <RouteCatchAll />
  -  </Switch>
  -);
  -ApplicationStarter.displayName = 'ApplicationStarter';

  const EntryPoint = () => (
    <ApplicationShell
      environment={window.app}
      onRegisterErrorListeners={({ dispatch }) => {
        Sdk.Get.errorHandler = (error) =>
          globalActions.handleActionError(error, 'sdk')(dispatch);
      }}
      applicationMessages={loadMessages}
      DEV_ONLY__loadNavbarMenuConfig={() =>
        import('../../../menu.json').then((data) => data.default || data)
      }
      featureFlags={FEATURE_FLAGS}
  -    render={() => <ApplicationStarter />}
  -  />
  +  >
  +    <AsyncApplicationRoutes />
  +  </ApplicationShell>
  );
  ```

  Furthermore, the `test-utils` of the `@commercetools-frontend/application-shell` have now a new option to enable this opt-in behavior of rendering the application with pre-configured routes.
  To enable this option, pass the `disableAutomaticEntryPointRoutes: false` to the `renderApp` or `renderAppWithRedux` functions.

  > Note that you also need to provide the `environment.entryPointUriPath` in order for the routes to be correctly configured.

  ```diff
  -renderApp(<ApplicationStarter />, {
  +renderApp(<ApplicationRoutes />, {
    route: '/my-project/examples-starter'
  +  environment: {
  +    entryPointUriPath: 'examples-starter',
  +  },
  +  disableAutomaticEntryPointRoutes: false,
  });
  ```

### Patch Changes

- Updated dependencies [[`4f7e081`](https://github.com/commercetools/merchant-center-application-kit/commit/4f7e081c001e285e8f4c7771894f5d09509daf8e)]:
  - @commercetools-frontend/application-shell@17.9.0
  - @commercetools-frontend/actions-global@17.9.0
  - @commercetools-frontend/application-components@17.9.0
  - @commercetools-frontend/permissions@17.9.0
  - @commercetools-frontend/i18n@17.9.0

## 17.1.0

### Minor Changes

- [`bb65fa1`](https://github.com/commercetools/merchant-center-application-kit/commit/bb65fa149d3d056ae0e0f35d89bd0e5b1ba08694) [#1949](https://github.com/commercetools/merchant-center-application-kit/pull/1949) Thanks [@emmenko](https://github.com/emmenko)! - The `webpack.config.dev.js` and `webpack.config.prod.js` files are not required anymore to be defined in the application folder and can be removed. The default behavior is now implicitly implemented in case the config file is not found. The default behavior requires the following paths to exist:

  - `<application_folder>/dist`
  - `<application_folder>/src`
  - `<application_folder>/src/index.js`

  > You can still use the config files if you need to configure more specific behaviors.

### Patch Changes

- [`48a9886`](https://github.com/commercetools/merchant-center-application-kit/commit/48a98861dcf4193041e02e8ac11eb2940826f5d0) [#1954](https://github.com/commercetools/merchant-center-application-kit/pull/1954) Thanks [@tdeekens](https://github.com/tdeekens)! - chore: update dependencies across packages

* [`4971a78`](https://github.com/commercetools/merchant-center-application-kit/commit/4971a78438fb4d2ca5487764192a0bb1ffc3b18e) [#1952](https://github.com/commercetools/merchant-center-application-kit/pull/1952) Thanks [@tdeekens](https://github.com/tdeekens)! - chore: add and apply fixes via manypkg for automatic mono-repo validation

* Updated dependencies [[`3198d2c`](https://github.com/commercetools/merchant-center-application-kit/commit/3198d2ce49501c1c2f996b808d8060efe7270762), [`48a9886`](https://github.com/commercetools/merchant-center-application-kit/commit/48a98861dcf4193041e02e8ac11eb2940826f5d0), [`4971a78`](https://github.com/commercetools/merchant-center-application-kit/commit/4971a78438fb4d2ca5487764192a0bb1ffc3b18e), [`c6a967c`](https://github.com/commercetools/merchant-center-application-kit/commit/c6a967c4dc76dc87310dec0c1960e9518901f361)]:
  - @commercetools-frontend/application-shell@17.8.0
  - @commercetools-frontend/actions-global@17.8.0
  - @commercetools-frontend/application-components@17.8.0
  - @commercetools-frontend/i18n@17.8.0
  - @commercetools-frontend/permissions@17.8.0

## 17.0.17

### Patch Changes

- Updated dependencies [[`5f4565e`](https://github.com/commercetools/merchant-center-application-kit/commit/5f4565e8c819cab178b8a823a3ae5a5b2ced5c9d)]:
  - @commercetools-frontend/application-shell@17.7.4

## 17.0.16

### Patch Changes

- Updated dependencies [[`62ad638`](https://github.com/commercetools/merchant-center-application-kit/commit/62ad6380ab62e1c3e77bd63bd6c3ad4aaee473a9)]:
  - @commercetools-frontend/application-shell@17.7.3

## 17.0.15

### Patch Changes

- [`f6f3c5e`](https://github.com/commercetools/merchant-center-application-kit/commit/f6f3c5ebd08226fd4eca22aec5c39791cf5c5d6a) [#1935](https://github.com/commercetools/merchant-center-application-kit/pull/1935) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`f6f3c5e`](https://github.com/commercetools/merchant-center-application-kit/commit/f6f3c5ebd08226fd4eca22aec5c39791cf5c5d6a)]:
  - @commercetools-frontend/application-components@17.7.1
  - @commercetools-frontend/application-shell@17.7.1
  - @commercetools-frontend/i18n@17.7.1
  - @commercetools-frontend/permissions@17.7.1
  - @commercetools-frontend/actions-global@17.7.1

## 17.0.14

### Patch Changes

- [`1ec4379`](https://github.com/commercetools/merchant-center-application-kit/commit/1ec4379938b093d4444ec9e4079524c48afd4a42) [#1923](https://github.com/commercetools/merchant-center-application-kit/pull/1923) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`d74addd`](https://github.com/commercetools/merchant-center-application-kit/commit/d74addd32a5f39d19d6bae1ee31cbf33a35fd04e), [`1ec4379`](https://github.com/commercetools/merchant-center-application-kit/commit/1ec4379938b093d4444ec9e4079524c48afd4a42), [`36cabfc`](https://github.com/commercetools/merchant-center-application-kit/commit/36cabfc3ff0a22a3739f1eb77520814219b2dc62), [`b9fe353`](https://github.com/commercetools/merchant-center-application-kit/commit/b9fe353046fc6998c2bb43c80609db07cb88900a)]:
  - @commercetools-frontend/application-components@17.7.0
  - @commercetools-frontend/application-shell@17.7.0
  - @commercetools-frontend/permissions@17.7.0

## 17.0.13

### Patch Changes

- [`1a96e83`](https://github.com/commercetools/merchant-center-application-kit/commit/1a96e831c94250e10de61dee40e682a77313445f) [#1905](https://github.com/commercetools/merchant-center-application-kit/pull/1905) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`6819edc`](https://github.com/commercetools/merchant-center-application-kit/commit/6819edc25ef7f4a4d8a30c0c27db93ee4dae187a), [`1a96e83`](https://github.com/commercetools/merchant-center-application-kit/commit/1a96e831c94250e10de61dee40e682a77313445f)]:
  - @commercetools-frontend/application-components@17.6.2
  - @commercetools-frontend/application-shell@17.6.2
  - @commercetools-frontend/i18n@17.6.2
  - @commercetools-frontend/permissions@17.6.2
  - @commercetools-frontend/actions-global@17.6.2

## 17.0.12

### Patch Changes

- Updated dependencies [[`c946eca`](https://github.com/commercetools/merchant-center-application-kit/commit/c946eca9063535f0fe8ae7be99d2097557d588d9), [`947a1cf`](https://github.com/commercetools/merchant-center-application-kit/commit/947a1cfeb62d8856a6e60e16df5cc08c53b86fe3)]:
  - @commercetools-frontend/application-shell@17.6.1

## 17.0.11

### Patch Changes

- Updated dependencies [[`81a274c`](https://github.com/commercetools/merchant-center-application-kit/commit/81a274c6abd5f3725e7698fa37004b9647549e41), [`2287813`](https://github.com/commercetools/merchant-center-application-kit/commit/2287813c19a54b7edb7005d417c5f6a7b34cad1f)]:
  - @commercetools-frontend/application-components@17.6.0
  - @commercetools-frontend/actions-global@17.6.0
  - @commercetools-frontend/application-shell@17.6.0
  - @commercetools-frontend/i18n@17.6.0
  - @commercetools-frontend/permissions@17.6.0

## 17.0.10

### Patch Changes

- Updated dependencies [[`bf5f71e`](https://github.com/commercetools/merchant-center-application-kit/commit/bf5f71e663a91d68d777d26ed3145bc96bbf2aa4)]:
  - @commercetools-frontend/application-components@17.5.0
  - @commercetools-frontend/application-shell@17.5.0

## 17.0.9

### Patch Changes

- [`636fc45`](https://github.com/commercetools/merchant-center-application-kit/commit/636fc45c0d53544a90b0977b2212ec3a8aec8b94) [#1887](https://github.com/commercetools/merchant-center-application-kit/pull/1887) Thanks [@adnasa](https://github.com/adnasa)! - upgrade ui-kit, which includes the new [horizontal constraint changes](https://github.com/commercetools/ui-kit/pull/1632).

* [`ec9e10f`](https://github.com/commercetools/merchant-center-application-kit/commit/ec9e10fde15351cc7cb825aaebb53cdb6e00e0d9) [#1889](https://github.com/commercetools/merchant-center-application-kit/pull/1889) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

* Updated dependencies [[`636fc45`](https://github.com/commercetools/merchant-center-application-kit/commit/636fc45c0d53544a90b0977b2212ec3a8aec8b94), [`e2d519f`](https://github.com/commercetools/merchant-center-application-kit/commit/e2d519f8669319a60d70eddb04fbaeb5649ad638), [`d832bd4`](https://github.com/commercetools/merchant-center-application-kit/commit/d832bd44c354aaf2374c0c75c9050c673998ff32), [`ec9e10f`](https://github.com/commercetools/merchant-center-application-kit/commit/ec9e10fde15351cc7cb825aaebb53cdb6e00e0d9)]:
  - @commercetools-frontend/application-components@17.4.1
  - @commercetools-frontend/application-shell@17.4.1
  - @commercetools-frontend/i18n@17.4.1
  - @commercetools-frontend/permissions@17.4.1

## 17.0.8

### Patch Changes

- Updated dependencies [[`b742780`](https://github.com/commercetools/merchant-center-application-kit/commit/b742780a8b0b2d165b49a30cf93aaac3047a93c8)]:
  - @commercetools-frontend/application-shell@17.4.0

## 17.0.7

### Patch Changes

- [`89c4464`](https://github.com/commercetools/merchant-center-application-kit/commit/89c4464c334dd6c3922d031872286ad3bea8cf67) [#1872](https://github.com/commercetools/merchant-center-application-kit/pull/1872) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

- Updated dependencies [[`bb492fd`](https://github.com/commercetools/merchant-center-application-kit/commit/bb492fd5e79642d6ddf2501b8f62dd3e3f09a538), [`89c4464`](https://github.com/commercetools/merchant-center-application-kit/commit/89c4464c334dd6c3922d031872286ad3bea8cf67)]:
  - @commercetools-frontend/actions-global@17.3.1
  - @commercetools-frontend/application-components@17.3.1
  - @commercetools-frontend/application-shell@17.3.1
  - @commercetools-frontend/i18n@17.3.1
  - @commercetools-frontend/permissions@17.3.1

## 17.0.6

### Patch Changes

- [`71c9111`](https://github.com/commercetools/merchant-center-application-kit/commit/71c9111308832009d1a27e91e4f2d2da4c53367c) [#1866](https://github.com/commercetools/merchant-center-application-kit/pull/1866) Thanks [@emmenko](https://github.com/emmenko)! - Update to uikit v10.39.8

- Updated dependencies [[`cefef43`](https://github.com/commercetools/merchant-center-application-kit/commit/cefef435e646e7c91dcf41c0f8ff7b94b5a7f3c8), [`71c9111`](https://github.com/commercetools/merchant-center-application-kit/commit/71c9111308832009d1a27e91e4f2d2da4c53367c)]:
  - @commercetools-frontend/application-shell@17.3.0
  - @commercetools-frontend/actions-global@17.3.0
  - @commercetools-frontend/application-components@17.3.0
  - @commercetools-frontend/assets@17.3.0
  - @commercetools-frontend/i18n@17.3.0
  - @commercetools-frontend/permissions@17.3.0

## 17.0.5

### Patch Changes

- [`310e98c`](https://github.com/commercetools/merchant-center-application-kit/commit/310e98c39c0b6479175b7685b3f29ea0a5baa22b) Thanks [@emmenko](https://github.com/emmenko)! - Update dependencies (https://github.com/commercetools/merchant-center-application-kit/pull/1857)

- Updated dependencies [[`310e98c`](https://github.com/commercetools/merchant-center-application-kit/commit/310e98c39c0b6479175b7685b3f29ea0a5baa22b)]:
  - @commercetools-frontend/actions-global@17.2.1
  - @commercetools-frontend/application-components@17.2.1
  - @commercetools-frontend/application-shell@17.2.1
  - @commercetools-frontend/i18n@17.2.1
  - @commercetools-frontend/permissions@17.2.1

## 17.0.4

### Patch Changes

- [`e0ec004`](https://github.com/commercetools/merchant-center-application-kit/commit/e0ec004d611f93b24f015120d09f6f18389b219f) [#1854](https://github.com/commercetools/merchant-center-application-kit/pull/1854) Thanks [@emmenko](https://github.com/emmenko)! - chore: update deps

- Updated dependencies [[`5967db7`](https://github.com/commercetools/merchant-center-application-kit/commit/5967db7fe27c0b322de96067ae19de7225a9aaec), [`e0ec004`](https://github.com/commercetools/merchant-center-application-kit/commit/e0ec004d611f93b24f015120d09f6f18389b219f)]:
  - @commercetools-frontend/application-shell@17.2.0
  - @commercetools-frontend/actions-global@17.2.0
  - @commercetools-frontend/application-components@17.2.0
  - @commercetools-frontend/assets@17.2.0
  - @commercetools-frontend/i18n@17.2.0
  - @commercetools-frontend/permissions@17.2.0

## 17.0.3

### Patch Changes

- Updated dependencies [[`bacc091`](https://github.com/commercetools/merchant-center-application-kit/commit/bacc091506dedb58fadaa4008fc93381a5e9b212)]:
  - @commercetools-frontend/application-shell@17.1.1
  - @commercetools-frontend/permissions@17.1.1
  - @commercetools-frontend/actions-global@17.1.1
  - @commercetools-frontend/application-components@17.1.1
  - @commercetools-frontend/i18n@17.1.1

## 17.0.2

### Patch Changes

- [`5d9d5da`](https://github.com/commercetools/merchant-center-application-kit/commit/5d9d5da44364fe5590b67be21ac3630e177326e3) [#1820](https://github.com/commercetools/merchant-center-application-kit/pull/1820) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

- Updated dependencies [[`5d9d5da`](https://github.com/commercetools/merchant-center-application-kit/commit/5d9d5da44364fe5590b67be21ac3630e177326e3), [`323cf6b`](https://github.com/commercetools/merchant-center-application-kit/commit/323cf6bb0fba41510947287dd18b346cda6f0833), [`6059b9a`](https://github.com/commercetools/merchant-center-application-kit/commit/6059b9af35fbee646d008c393578c83795f10b4f)]:
  - @commercetools-frontend/i18n@17.1.0
  - @commercetools-frontend/application-shell@17.1.0
  - @commercetools-frontend/application-components@17.1.0
  - @commercetools-frontend/actions-global@17.1.0
  - @commercetools-frontend/permissions@17.1.0

## 17.0.1

### Patch Changes

- [`71c5f78`](https://github.com/commercetools/merchant-center-application-kit/commit/71c5f7875c7476e34b65d37046d48ca47e96f12e) [#1795](https://github.com/commercetools/merchant-center-application-kit/pull/1795) Thanks [@renovate](https://github.com/apps/renovate)! - update dependencies

- Updated dependencies [[`bea3005`](https://github.com/commercetools/merchant-center-application-kit/commit/bea30056b43fdb782251956acb5829abcd91e836), [`71c5f78`](https://github.com/commercetools/merchant-center-application-kit/commit/71c5f7875c7476e34b65d37046d48ca47e96f12e), [`8111543`](https://github.com/commercetools/merchant-center-application-kit/commit/8111543a5d3e923c9c754b34290c899698910825)]:
  - @commercetools-frontend/application-shell@17.0.1
  - @commercetools-frontend/actions-global@17.0.1
  - @commercetools-frontend/application-components@17.0.1
  - @commercetools-frontend/i18n@17.0.1
  - @commercetools-frontend/permissions@17.0.1

## 17.0.0

### Major Changes

- [`e706232`](https://github.com/commercetools/merchant-center-application-kit/commit/e706232c152f3fed9cf44c10a0c4f25b27448a16) [#1805](https://github.com/commercetools/merchant-center-application-kit/pull/1805) Thanks [@emmenko](https://github.com/emmenko)! - Remove `mc-scripts extract-intl` command in favor of the official `@formatjs/cli` package.
  We recommend to update your script to extract Intl messages to use the `formatjs extract` command.

  See full release notes: https://docs.commercetools.com/custom-applications/releases/2020-10-14-custom-applications-v17

* [`873048b`](https://github.com/commercetools/merchant-center-application-kit/commit/873048b1c288ca85a37cf26f7d5d2b10879cfd64) [#1805](https://github.com/commercetools/merchant-center-application-kit/pull/1805) Thanks [@emmenko](https://github.com/emmenko)! - Migrate Apollo dependencies to `@apollo/client` package.

  See full release notes: https://docs.commercetools.com/custom-applications/releases/2020-10-14-custom-applications-v17

- [`633d8c7`](https://github.com/commercetools/merchant-center-application-kit/commit/633d8c7b8ddc2f25128d8249579b7bb287a62e30) [#1805](https://github.com/commercetools/merchant-center-application-kit/pull/1805) Thanks [@emmenko](https://github.com/emmenko)! - Remove the CLI flag `--use-local-assets`. The default behavior of `mc-scripts compile-html` now is to compile the assets locally, which is the only reasonable thing to do.

  Furthermore, the `@commercetools-frontend/mc-http-server` package has been deprecated and won't be published anymore.
  With the `compile-html` command there is no need to have a pre-configured HTTP server anymore.

  When running the `mc-scripts compile-html` command, the `index.html` is compiled for production usage and it lives in the `public` folder, together with the other static assets. This is all you need to deploy your application.
  You can decide to [deploy the Custom Application statically to one of the popular cloud providers](https://docs.commercetools.com/custom-applications/deployment/compiling-a-custom-application#deployment), or serve the files on your own using a static server.

  For example, to run locally the Custom Application using the production bundles:

  ```console
  NODE_ENV=production MC_APP_ENV=development dotenv -- \
    mc-scripts compile-html \
    --transformer @commercetools-frontend/mc-dev-authentication/transformer-local.js

  mc-scripts serve
  ```

### Patch Changes

- [`633d8c7`](https://github.com/commercetools/merchant-center-application-kit/commit/633d8c7b8ddc2f25128d8249579b7bb287a62e30) [#1805](https://github.com/commercetools/merchant-center-application-kit/pull/1805) Thanks [@emmenko](https://github.com/emmenko)! - update deps

- Updated dependencies [[`0e0efc6`](https://github.com/commercetools/merchant-center-application-kit/commit/0e0efc68e93621209f8ee84ebc920b79431c704a), [`80b7936`](https://github.com/commercetools/merchant-center-application-kit/commit/80b793610027fc6c1708f457d030354265beabca), [`e706232`](https://github.com/commercetools/merchant-center-application-kit/commit/e706232c152f3fed9cf44c10a0c4f25b27448a16), [`873048b`](https://github.com/commercetools/merchant-center-application-kit/commit/873048b1c288ca85a37cf26f7d5d2b10879cfd64), [`65f21a1`](https://github.com/commercetools/merchant-center-application-kit/commit/65f21a158d32f5759f109035b02aa78569fcad13), [`d883e96`](https://github.com/commercetools/merchant-center-application-kit/commit/d883e96ffd076788256d33d833e7f69ffc39f3ac), [`633d8c7`](https://github.com/commercetools/merchant-center-application-kit/commit/633d8c7b8ddc2f25128d8249579b7bb287a62e30), [`6e86c36`](https://github.com/commercetools/merchant-center-application-kit/commit/6e86c36a20a597cca81d121ce80cc1c47f8a961f), [`633d8c7`](https://github.com/commercetools/merchant-center-application-kit/commit/633d8c7b8ddc2f25128d8249579b7bb287a62e30)]:
  - @commercetools-frontend/application-shell@17.0.0
  - @commercetools-frontend/application-components@17.0.0
  - @commercetools-frontend/i18n@17.0.0
  - @commercetools-frontend/permissions@17.0.0
  - @commercetools-frontend/actions-global@17.0.0

## 16.11.13

### Patch Changes

- Updated dependencies [[`3de5acc`](https://github.com/commercetools/merchant-center-application-kit/commit/3de5accab54a565a74fbfbdf5cd2a71482b3026e)]:
  - @commercetools-frontend/application-shell@16.18.2

## 16.11.12

### Patch Changes

- Updated dependencies [[`3fd4aa2`](https://github.com/commercetools/merchant-center-application-kit/commit/3fd4aa2e7ac935bf75daaceacaf1b77dada7afe6)]:
  - @commercetools-frontend/application-shell@16.18.1

## 16.11.11

### Patch Changes

- [`8cdb025`](https://github.com/commercetools/merchant-center-application-kit/commit/8cdb02591b718406c910a2c4128d4be3dfe24785) [#1776](https://github.com/commercetools/merchant-center-application-kit/pull/1776) Thanks [@renovate](https://github.com/apps/renovate)! - update deps

- Updated dependencies [[`78418b9`](https://github.com/commercetools/merchant-center-application-kit/commit/78418b9db14014c7d9c03c8e754ee9d2adb7ffb7), [`8cdb025`](https://github.com/commercetools/merchant-center-application-kit/commit/8cdb02591b718406c910a2c4128d4be3dfe24785), [`290ed48`](https://github.com/commercetools/merchant-center-application-kit/commit/290ed483e9a93adf1cf7863d766ad8237735dfca)]:
  - @commercetools-frontend/application-shell@16.18.0
  - @commercetools-frontend/permissions@16.18.0
  - @commercetools-frontend/application-components@16.18.0
  - @commercetools-frontend/i18n@16.18.0
  - @commercetools-frontend/mc-http-server@16.18.0

## 16.11.10

### Patch Changes

- [`08f79ff`](https://github.com/commercetools/merchant-center-application-kit/commit/08f79ffbd8c1be30c18dabda62d73a0756661a71) [#1772](https://github.com/commercetools/merchant-center-application-kit/pull/1772) Thanks [@adnasa](https://github.com/adnasa)! - remove use of `enzyme`

- Updated dependencies []:
  - @commercetools-frontend/mc-http-server@16.17.4

## 16.11.9

### Patch Changes

- Updated dependencies [[`9c957e7`](https://github.com/commercetools/merchant-center-application-kit/commit/9c957e797ef55786c8d8c678a663338be58b694a)]:
  - @commercetools-frontend/application-shell@16.17.3

## 16.11.8

### Patch Changes

- [`0c4d950`](https://github.com/commercetools/merchant-center-application-kit/commit/0c4d95061a09a8cb5f8b4cf7b1b0276e4cc5c50c) [#1767](https://github.com/commercetools/merchant-center-application-kit/pull/1767) Thanks [@adnasa](https://github.com/adnasa)! - update ui-kit to 10.35.1

* [`9752622`](https://github.com/commercetools/merchant-center-application-kit/commit/9752622b7422e821bb62d61af360a01f6994dc6b) [#1758](https://github.com/commercetools/merchant-center-application-kit/pull/1758) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

* Updated dependencies [[`9e4870f`](https://github.com/commercetools/merchant-center-application-kit/commit/9e4870fe0c3f53c372036374e10a51bee7835f95), [`0c4d950`](https://github.com/commercetools/merchant-center-application-kit/commit/0c4d95061a09a8cb5f8b4cf7b1b0276e4cc5c50c), [`9752622`](https://github.com/commercetools/merchant-center-application-kit/commit/9752622b7422e821bb62d61af360a01f6994dc6b)]:
  - @commercetools-frontend/application-shell@16.17.2
  - @commercetools-frontend/application-components@16.17.2

## 16.11.7

### Patch Changes

- Updated dependencies [[`0c4cc95`](https://github.com/commercetools/merchant-center-application-kit/commit/0c4cc9524747fe43ec4768fdaebe1acc4959f1a8)]:
  - @commercetools-frontend/application-shell@16.17.1

## 16.11.6

### Patch Changes

- [`8eb85a0`](https://github.com/commercetools/merchant-center-application-kit/commit/8eb85a0c79774d3ae1eea73460233c1fcb36c855) [#1736](https://github.com/commercetools/merchant-center-application-kit/pull/1736) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update dependency dotenv-cli to v4

* [`786c697`](https://github.com/commercetools/merchant-center-application-kit/commit/786c6978c1febf927db6b45c758498b72e8e48be) [#1745](https://github.com/commercetools/merchant-center-application-kit/pull/1745) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

- [`178ff31`](https://github.com/commercetools/merchant-center-application-kit/commit/178ff317426e0cfcfe1c0adf42a9eada3b134642) [#1734](https://github.com/commercetools/merchant-center-application-kit/pull/1734) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

* [`9bc8558`](https://github.com/commercetools/merchant-center-application-kit/commit/9bc85581d336c7d75fda5dc82a1c02f32f16c1fb) [#1704](https://github.com/commercetools/merchant-center-application-kit/pull/1704) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

* Updated dependencies [[`2c0bd66`](https://github.com/commercetools/merchant-center-application-kit/commit/2c0bd66c90fe64ad15397029e05146c0a04ef331), [`786c697`](https://github.com/commercetools/merchant-center-application-kit/commit/786c6978c1febf927db6b45c758498b72e8e48be), [`ebb2441`](https://github.com/commercetools/merchant-center-application-kit/commit/ebb2441cfb5ee126a1be0ea0add017ec53aefbba), [`178ff31`](https://github.com/commercetools/merchant-center-application-kit/commit/178ff317426e0cfcfe1c0adf42a9eada3b134642), [`9bc8558`](https://github.com/commercetools/merchant-center-application-kit/commit/9bc85581d336c7d75fda5dc82a1c02f32f16c1fb)]:
  - @commercetools-frontend/application-shell@16.17.0
  - @commercetools-frontend/application-components@16.17.0
  - @commercetools-frontend/i18n@16.17.0
  - @commercetools-frontend/mc-http-server@16.17.0
  - @commercetools-frontend/permissions@16.17.0

## 16.11.5

### Patch Changes

- Updated dependencies [[`4c54f6d`](https://github.com/commercetools/merchant-center-application-kit/commit/4c54f6d88bc7a9107d721afd1e38d66a3eb4577d)]:
  - @commercetools-frontend/i18n@16.16.5
  - @commercetools-frontend/application-components@16.16.5
  - @commercetools-frontend/application-shell@16.16.5

## 16.11.4

### Patch Changes

- [`d8915a8`](https://github.com/commercetools/merchant-center-application-kit/commit/d8915a8b29ac940839720d5912a1ef0050b9ada5) [#1713](https://github.com/commercetools/merchant-center-application-kit/pull/1713) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update dependency @testing-library/react to v11

  Added support for both @testing-library/react to v11 and v10.

- Updated dependencies [[`d8915a8`](https://github.com/commercetools/merchant-center-application-kit/commit/d8915a8b29ac940839720d5912a1ef0050b9ada5), [`4fff00c`](https://github.com/commercetools/merchant-center-application-kit/commit/4fff00c24bf74d853170400951cfb1892567f313)]:
  - @commercetools-frontend/application-shell@16.16.4
  - @commercetools-frontend/permissions@16.16.4
  - @commercetools-frontend/i18n@16.16.4
  - @commercetools-frontend/application-components@16.16.4

## 16.11.3

### Patch Changes

- Updated dependencies [[`67e5e2c`](https://github.com/commercetools/merchant-center-application-kit/commit/67e5e2ccbddfc3df5fe2cea23f02c83d2bdcc73b)]:
  - @commercetools-frontend/application-shell@16.16.3

## 16.11.2

### Patch Changes

- Updated dependencies [[`4290f63`](https://github.com/commercetools/merchant-center-application-kit/commit/4290f63f89e0d394176ed36c9bb436ac7228d66d), [`b4f2bfd`](https://github.com/commercetools/merchant-center-application-kit/commit/b4f2bfd34579f7a24615171aeedb47afd6fbc16f)]:
  - @commercetools-frontend/i18n@16.16.2
  - @commercetools-frontend/application-shell@16.16.2
  - @commercetools-frontend/application-components@16.16.2

## 16.11.1

### Patch Changes

- [`bc15ac2`](https://github.com/commercetools/merchant-center-application-kit/commit/bc15ac2f6d53d4c8e0d53ceb6c1a0e5ba0f5353e) [#1692](https://github.com/commercetools/merchant-center-application-kit/pull/1692) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

- Updated dependencies [[`bc15ac2`](https://github.com/commercetools/merchant-center-application-kit/commit/bc15ac2f6d53d4c8e0d53ceb6c1a0e5ba0f5353e), [`f23655a`](https://github.com/commercetools/merchant-center-application-kit/commit/f23655a681fd54fca9757e0b62727c38aaa813ad)]:
  - @commercetools-frontend/application-components@16.16.1
  - @commercetools-frontend/application-shell@16.16.1
  - @commercetools-frontend/permissions@16.16.1
  - @commercetools-frontend/i18n@16.16.1
  - @commercetools-frontend/mc-http-server@16.16.1

## 16.11.0

### Minor Changes

- [`4216b92`](https://github.com/commercetools/merchant-center-application-kit/commit/4216b922fbb39e74ce35f8647d1c4e9ae77909c8) [#1685](https://github.com/commercetools/merchant-center-application-kit/pull/1685) Thanks [@emmenko](https://github.com/emmenko)! - Refactor i18n package to consume compiled data from ui-kit translation messages. Furthermore, the `@commercetools-frontend/i18n` now exposes a `compiled-data` folder as well: `@commercetools-frontend/i18n/compiled-data`.
  This can be used the load pre-compiled messages and thus improving the runtime performance.

  Furthermore, the `mc-scripts extract-intl` command has been deprecated in favor of the more official message extraction with the `@formatjs/cli`: https://formatjs.io/docs/getting-started/message-extraction.

### Patch Changes

- [`f144292`](https://github.com/commercetools/merchant-center-application-kit/commit/f1442921650ca4e6c9bf61ce31bda2b63e72038a) [#1673](https://github.com/commercetools/merchant-center-application-kit/pull/1673) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

- Updated dependencies [[`f144292`](https://github.com/commercetools/merchant-center-application-kit/commit/f1442921650ca4e6c9bf61ce31bda2b63e72038a), [`211ab69`](https://github.com/commercetools/merchant-center-application-kit/commit/211ab6969a78af5c592c1cc3c3e3ace3199e95cb), [`74d43d2`](https://github.com/commercetools/merchant-center-application-kit/commit/74d43d2abe7efa085780692d8a364de4aaad7278), [`4216b92`](https://github.com/commercetools/merchant-center-application-kit/commit/4216b922fbb39e74ce35f8647d1c4e9ae77909c8)]:
  - @commercetools-frontend/actions-global@16.16.0
  - @commercetools-frontend/application-components@16.16.0
  - @commercetools-frontend/application-shell@16.16.0
  - @commercetools-frontend/i18n@16.16.0
  - @commercetools-frontend/permissions@16.16.0
  - @commercetools-frontend/mc-http-server@16.16.0

## 16.10.9

### Patch Changes

- Updated dependencies [[`a0ae954`](https://github.com/commercetools/merchant-center-application-kit/commit/a0ae9543c139bfa4cde619153082b400d953dfa5), [`564cd91`](https://github.com/commercetools/merchant-center-application-kit/commit/564cd9186d23ea34886d1c41718486e16d3ca90e), [`9f861cd`](https://github.com/commercetools/merchant-center-application-kit/commit/9f861cdf31017d394f7738c80aa377d977a5460f)]:
  - @commercetools-frontend/i18n@16.15.9
  - @commercetools-frontend/application-shell@16.15.9
  - @commercetools-frontend/application-components@16.15.9
  - @commercetools-frontend/actions-global@16.15.9
  - @commercetools-frontend/permissions@16.15.9

## 16.10.8

### Patch Changes

- [`c62261f`](https://github.com/commercetools/merchant-center-application-kit/commit/c62261f80e17fb63467eed6328e41764d3e9a50e) [#1653](https://github.com/commercetools/merchant-center-application-kit/pull/1653) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies and regenerate l10n data based on CLDR v37

- Updated dependencies [[`c62261f`](https://github.com/commercetools/merchant-center-application-kit/commit/c62261f80e17fb63467eed6328e41764d3e9a50e)]:
  - @commercetools-frontend/actions-global@16.15.8
  - @commercetools-frontend/application-components@16.15.8
  - @commercetools-frontend/application-shell@16.15.8
  - @commercetools-frontend/i18n@16.15.8
  - @commercetools-frontend/permissions@16.15.8
  - @commercetools-frontend/mc-http-server@16.15.8

## 16.10.7

### Patch Changes

- Updated dependencies [[`302e0b8`](https://github.com/commercetools/merchant-center-application-kit/commit/302e0b87ae2e496f23d231ad572c60914699ff85), [`7638609`](https://github.com/commercetools/merchant-center-application-kit/commit/76386095d2097b738b395ec54bb363426002bbff)]:
  - @commercetools-frontend/application-shell@16.15.7

## 16.10.6

### Patch Changes

- Updated dependencies [[`2f6ef4a`](https://github.com/commercetools/merchant-center-application-kit/commit/2f6ef4ae637d9e1de78d8358322be5dd2f87868b)]:
  - @commercetools-frontend/application-shell@16.15.6

## 16.10.5

### Patch Changes

- Updated dependencies [[`9800911`](https://github.com/commercetools/merchant-center-application-kit/commit/9800911fe0523a2a02271950490c4ed15b2c2765), [`cd800cd`](https://github.com/commercetools/merchant-center-application-kit/commit/cd800cd4b88729f087ebcb0a13ce32c2ddbbc58b)]:
  - @commercetools-frontend/application-shell@16.15.5

## 16.10.4

### Patch Changes

- Updated dependencies []:
  - @commercetools-frontend/mc-http-server@16.15.4

## 16.10.3

### Patch Changes

- Updated dependencies [[`6d98245`](https://github.com/commercetools/merchant-center-application-kit/commit/6d98245615ddb83e805e5cc2cc0620920b4a71c7)]:
  - @commercetools-frontend/actions-global@16.15.3
  - @commercetools-frontend/application-shell@16.15.3
  - @commercetools-frontend/assets@16.15.3
  - @commercetools-frontend/i18n@16.15.3
  - @commercetools-frontend/mc-http-server@16.15.3
  - @commercetools-frontend/permissions@16.15.3
  - @commercetools-frontend/application-components@16.15.3

## 16.10.2

### Patch Changes

- [`0f3dcc3`](https://github.com/commercetools/merchant-center-application-kit/commit/0f3dcc38c81a5fb3c668faecce9a13057f66a66b) [#1638](https://github.com/commercetools/merchant-center-application-kit/pull/1638) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`0f3dcc3`](https://github.com/commercetools/merchant-center-application-kit/commit/0f3dcc38c81a5fb3c668faecce9a13057f66a66b), [`77eb38a`](https://github.com/commercetools/merchant-center-application-kit/commit/77eb38ace68e7f519dea9deda487ed4c612091a5)]:
  - @commercetools-frontend/actions-global@16.15.2
  - @commercetools-frontend/application-components@16.15.2
  - @commercetools-frontend/application-shell@16.15.2
  - @commercetools-frontend/i18n@16.15.2
  - @commercetools-frontend/mc-http-server@16.15.2
  - @commercetools-frontend/permissions@16.15.2

## 16.10.1

### Patch Changes

- Updated dependencies []:
  - @commercetools-frontend/mc-http-server@16.15.1

## 16.10.0

### Minor Changes

- [`728024c`](https://github.com/commercetools/merchant-center-application-kit/commit/728024c57666d67e997b7342df74cceba511d182) [#1626](https://github.com/commercetools/merchant-center-application-kit/pull/1626) Thanks [@emmenko](https://github.com/emmenko)! - This release introduces the usage of a new configuration file format and marks the deprecation of the `env.json` and `headers.json` files.

  For all the necessary information about migrating to the new configuration file, please [read the release notes](https://docs.commercetools.com/custom-applications/releases/2020-07-16-introducing-a-new-and-simpler-application-config).

### Patch Changes

- [`cc8b37b`](https://github.com/commercetools/merchant-center-application-kit/commit/cc8b37bf85d4683a605a6c3233100627e670ebe7) [#1627](https://github.com/commercetools/merchant-center-application-kit/pull/1627) Thanks [@renovate](https://github.com/apps/renovate)! - chore: update dependencies

- Updated dependencies [[`cc8b37b`](https://github.com/commercetools/merchant-center-application-kit/commit/cc8b37bf85d4683a605a6c3233100627e670ebe7), [`728024c`](https://github.com/commercetools/merchant-center-application-kit/commit/728024c57666d67e997b7342df74cceba511d182)]:
  - @commercetools-frontend/actions-global@16.15.0
  - @commercetools-frontend/application-components@16.15.0
  - @commercetools-frontend/application-shell@16.15.0
  - @commercetools-frontend/permissions@16.15.0
  - @commercetools-frontend/mc-http-server@16.15.0
  - @commercetools-frontend/i18n@16.15.0

## 16.9.9

### Patch Changes

- Updated dependencies [[`e154dcc`](https://github.com/commercetools/merchant-center-application-kit/commit/e154dcc18ebeb43a63b9dbb5ce54daca25f9f7d1)]:
  - @commercetools-frontend/application-shell@16.14.1

## 16.9.8

### Patch Changes

- [`779100b`](https://github.com/commercetools/merchant-center-application-kit/commit/779100b432ad448eefec311f31f87891f35489f6) [#1608](https://github.com/commercetools/merchant-center-application-kit/pull/1608) Thanks [@renovate](https://github.com/apps/renovate)! - Update all dependencies

* [`364e711`](https://github.com/commercetools/merchant-center-application-kit/commit/364e71195f9886d30f907b29f8b03eb650df71e5) [#1621](https://github.com/commercetools/merchant-center-application-kit/pull/1621) Thanks [@renovate](https://github.com/apps/renovate)! - feat(deps: add support for react-intl v5 through peer dependencies
  fix(deps): update dependency react-intl to v5

- [`4168061`](https://github.com/commercetools/merchant-center-application-kit/commit/41680612042d476422776e5eaa254450bf874581) [#1618](https://github.com/commercetools/merchant-center-application-kit/pull/1618) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`779100b`](https://github.com/commercetools/merchant-center-application-kit/commit/779100b432ad448eefec311f31f87891f35489f6), [`364e711`](https://github.com/commercetools/merchant-center-application-kit/commit/364e71195f9886d30f907b29f8b03eb650df71e5), [`387cab5`](https://github.com/commercetools/merchant-center-application-kit/commit/387cab543fd607b72256f759597f90efd10b64c8), [`4168061`](https://github.com/commercetools/merchant-center-application-kit/commit/41680612042d476422776e5eaa254450bf874581)]:
  - @commercetools-frontend/application-components@16.14.0
  - @commercetools-frontend/application-shell@16.14.0
  - @commercetools-frontend/actions-global@16.14.0
  - @commercetools-frontend/i18n@16.14.0
  - @commercetools-frontend/permissions@16.14.0
  - @commercetools-frontend/mc-http-server@16.14.0

## 16.9.7

### Patch Changes

- Updated dependencies [[`7fbb076`](https://github.com/commercetools/merchant-center-application-kit/commit/7fbb0760a6573396d9038d5e2109ad25632c0392), [`faf980d`](https://github.com/commercetools/merchant-center-application-kit/commit/faf980ddb23827baba79faa4fb4e4f004922edd2)]:
  - @commercetools-frontend/i18n@16.13.2
  - @commercetools-frontend/application-components@16.13.2
  - @commercetools-frontend/application-shell@16.13.2

## 16.9.6

### Patch Changes

- Updated dependencies [[`0e85200`](https://github.com/commercetools/merchant-center-application-kit/commit/0e8520074143508e0078f8eeb1311bc1e2b6033d)]:
  - @commercetools-frontend/application-shell@16.13.1

## 16.9.5

### Patch Changes

- [`023c0bb`](https://github.com/commercetools/merchant-center-application-kit/commit/023c0bb222cf16d4e1b8eac9135112c9b7a694eb) [#1599](https://github.com/commercetools/merchant-center-application-kit/pull/1599) Thanks [@tdeekens](https://github.com/tdeekens)! - feat(template/starter): to add version update script for app-kit and ui-kit

- Updated dependencies [[`f70fed0`](https://github.com/commercetools/merchant-center-application-kit/commit/f70fed0e1332d1cc285bf832aec5e3dcbe325546)]:
  - @commercetools-frontend/application-components@16.13.0
  - @commercetools-frontend/application-shell@16.13.0

## 16.9.4

### Patch Changes

- [`fa6386c`](https://github.com/commercetools/merchant-center-application-kit/commit/fa6386c347df0505235c199232353bc315a47c81) [#1587](https://github.com/commercetools/merchant-center-application-kit/pull/1587) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`053ae10`](https://github.com/commercetools/merchant-center-application-kit/commit/053ae101588c75410aaa7cf4e17848fa8e22cfef), [`fa6386c`](https://github.com/commercetools/merchant-center-application-kit/commit/fa6386c347df0505235c199232353bc315a47c81)]:
  - @commercetools-frontend/application-components@16.12.0
  - @commercetools-frontend/application-shell@16.12.0
  - @commercetools-frontend/actions-global@16.12.0
  - @commercetools-frontend/i18n@16.12.0
  - @commercetools-frontend/permissions@16.12.0
  - @commercetools-frontend/mc-http-server@16.12.0

## 16.9.3

### Patch Changes

- [`f8f8609`](https://github.com/commercetools/merchant-center-application-kit/commit/f8f86098687c8cecaaec1b13debabe290b007b58) [#1573](https://github.com/commercetools/merchant-center-application-kit/pull/1573) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

- Updated dependencies [[`f8f8609`](https://github.com/commercetools/merchant-center-application-kit/commit/f8f86098687c8cecaaec1b13debabe290b007b58), [`352cc92`](https://github.com/commercetools/merchant-center-application-kit/commit/352cc92eeb1981e6f024fb6d6065cd5a800408f2), [`ab6f011`](https://github.com/commercetools/merchant-center-application-kit/commit/ab6f011d2988d25364269f737aa91a3b9c920f00)]:
  - @commercetools-frontend/application-shell@16.10.0
  - @commercetools-frontend/i18n@16.10.0
  - @commercetools-frontend/mc-http-server@16.10.0
  - @commercetools-frontend/application-components@16.10.0
  - @commercetools-frontend/permissions@16.10.0

## 16.9.2

### Patch Changes

- [`c1ed93e`](https://github.com/commercetools/merchant-center-application-kit/commit/c1ed93e5ec3c1227a9e74a1b21ba033354db1b70) [#1562](https://github.com/commercetools/merchant-center-application-kit/pull/1562) Thanks [@emmenko](https://github.com/emmenko)! - Ship it with `headers.json` and environment variable placeholders, to use the new hostname

- Updated dependencies [[`fcdf604`](https://github.com/commercetools/merchant-center-application-kit/commit/fcdf604b1daba48e0617c0db321572206ba79afe), [`5992613`](https://github.com/commercetools/merchant-center-application-kit/commit/5992613e512853501581c8757b25642433f8aedd), [`77c06ea`](https://github.com/commercetools/merchant-center-application-kit/commit/77c06ea17a56e2bd48793f5e1b0bba95b0dc3d27), [`a21276e`](https://github.com/commercetools/merchant-center-application-kit/commit/a21276e8ce45ce74a15873fe7853d499bcd2a348)]:
  - @commercetools-frontend/i18n@16.9.2
  - @commercetools-frontend/application-shell@16.9.2
  - @commercetools-frontend/application-components@16.9.2

## 16.9.1

### Patch Changes

- Updated dependencies [[`f92ec54`](https://github.com/commercetools/merchant-center-application-kit/commit/f92ec54e78edb668e8dff53342e8542e96d8c319), [`92b1637`](https://github.com/commercetools/merchant-center-application-kit/commit/92b16375d22e0395ae5278bcf874e5532ad8248c)]:
  - @commercetools-frontend/actions-global@16.9.1
  - @commercetools-frontend/application-components@16.9.1
  - @commercetools-frontend/application-shell@16.9.1
  - @commercetools-frontend/assets@16.9.1
  - @commercetools-frontend/i18n@16.9.1
  - @commercetools-frontend/mc-http-server@16.9.1
  - @commercetools-frontend/permissions@16.9.1

## 16.9.0

### Minor Changes

- [`96ab311`](https://github.com/commercetools/merchant-center-application-kit/commit/96ab3114a4c00b192763feaeedb68c1e3e804c3e) [#1533](https://github.com/commercetools/merchant-center-application-kit/pull/1533) Thanks [@emmenko](https://github.com/emmenko)! - Upgrade to `react-intl` v4. See also https://formatjs.io/docs/react-intl/upgrade-guide-4x

  We updated the peer dependency range to support both `v3` and `v4`.

### Patch Changes

- [`ccbabfd`](https://github.com/commercetools/merchant-center-application-kit/commit/ccbabfdc75972aedcc12e833cc958b5585cb6d60) [#1549](https://github.com/commercetools/merchant-center-application-kit/pull/1549) Thanks [@tdeekens](https://github.com/tdeekens)! - chore: update deps to prepare for release

- Updated dependencies [[`b01419d`](https://github.com/commercetools/merchant-center-application-kit/commit/b01419d37881a8d5234ed977364e01c29b92e74b), [`ccbabfd`](https://github.com/commercetools/merchant-center-application-kit/commit/ccbabfdc75972aedcc12e833cc958b5585cb6d60), [`2f6f7ba`](https://github.com/commercetools/merchant-center-application-kit/commit/2f6f7bad4970a6b38b39df58fe6fedb98cb62873), [`96ab311`](https://github.com/commercetools/merchant-center-application-kit/commit/96ab3114a4c00b192763feaeedb68c1e3e804c3e)]:
  - @commercetools-frontend/application-shell@16.9.0
  - @commercetools-frontend/permissions@16.9.0
  - @commercetools-frontend/actions-global@16.9.0
  - @commercetools-frontend/application-components@16.9.0
  - @commercetools-frontend/i18n@16.9.0

## 16.8.9

### Patch Changes

- Updated dependencies [[`db62c5e`](https://github.com/commercetools/merchant-center-application-kit/commit/db62c5e315532a9090c21e7e390596e1dbd95f4c)]:
  - @commercetools-frontend/mc-http-server@16.8.9

## 16.8.8

### Patch Changes

- Updated dependencies [[`0925da6`](https://github.com/commercetools/merchant-center-application-kit/commit/0925da6f11e35cc712cc12337716f846a67c0e4c)]:
  - @commercetools-frontend/actions-global@16.8.8
  - @commercetools-frontend/application-components@16.8.8
  - @commercetools-frontend/application-shell@16.8.8
  - @commercetools-frontend/i18n@16.8.8
  - @commercetools-frontend/permissions@16.8.8
  - @commercetools-frontend/mc-http-server@16.8.8

## 16.8.7

### Patch Changes

- Updated dependencies [[`7730f42`](https://github.com/commercetools/merchant-center-application-kit/commit/7730f42f62a10425a73e098e46d11b250fc2ed15), [`96e411a`](https://github.com/commercetools/merchant-center-application-kit/commit/96e411a95eb07a65aab3648afb79299f0767d36a)]:
  - @commercetools-frontend/mc-http-server@16.8.7
  - @commercetools-frontend/application-shell@16.8.7

## 16.8.6

### Patch Changes

- [`9391762`](https://github.com/commercetools/merchant-center-application-kit/commit/939176298df3558970a267b6e6478051a355ffae) [#1530](https://github.com/commercetools/merchant-center-application-kit/pull/1530) Thanks [@emmenko](https://github.com/emmenko)! - Update `@commercetools-uikit/*` packages to `10.21.0`

- Updated dependencies [[`9391762`](https://github.com/commercetools/merchant-center-application-kit/commit/939176298df3558970a267b6e6478051a355ffae)]:
  - @commercetools-frontend/actions-global@16.8.6
  - @commercetools-frontend/application-components@16.8.6
  - @commercetools-frontend/application-shell@16.8.6
  - @commercetools-frontend/assets@16.8.6
  - @commercetools-frontend/i18n@16.8.6
  - @commercetools-frontend/mc-http-server@16.8.6
  - @commercetools-frontend/permissions@16.8.6

## 16.8.5

### Patch Changes

- Updated dependencies [[`a66fb1f`](https://github.com/commercetools/merchant-center-application-kit/commit/a66fb1f37a06271b0fad0b2a3f6ea41c61455f0e), [`a66fb1f`](https://github.com/commercetools/merchant-center-application-kit/commit/a66fb1f37a06271b0fad0b2a3f6ea41c61455f0e), [`a66fb1f`](https://github.com/commercetools/merchant-center-application-kit/commit/a66fb1f37a06271b0fad0b2a3f6ea41c61455f0e)]:
  - @commercetools-frontend/application-shell@16.8.5
  - @commercetools-frontend/actions-global@16.8.5
  - @commercetools-frontend/application-components@16.8.5
  - @commercetools-frontend/permissions@16.8.5

## 16.8.4

### Patch Changes

- [`6ffe293`](https://github.com/commercetools/merchant-center-application-kit/commit/6ffe29312433e357ac6c57ce39e98cf9cba49ba5) [#1508](https://github.com/commercetools/merchant-center-application-kit/pull/1508) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`6ffe293`](https://github.com/commercetools/merchant-center-application-kit/commit/6ffe29312433e357ac6c57ce39e98cf9cba49ba5), [`6ffe293`](https://github.com/commercetools/merchant-center-application-kit/commit/6ffe29312433e357ac6c57ce39e98cf9cba49ba5)]:
  - @commercetools-frontend/i18n@16.8.4
  - @commercetools-frontend/application-shell@16.8.4
  - @commercetools-frontend/mc-http-server@16.8.4
  - @commercetools-frontend/application-components@16.8.4
  - @commercetools-frontend/permissions@16.8.4

## 16.8.3

### Patch Changes

- Updated dependencies [[`10c9a89`](https://github.com/commercetools/merchant-center-application-kit/commit/10c9a89ce96c1748e84505e65266577fbea890e3)]:
  - @commercetools-frontend/application-shell@16.8.3
  - @commercetools-frontend/actions-global@16.8.3
  - @commercetools-frontend/application-components@16.8.3
  - @commercetools-frontend/permissions@16.8.3
  - @commercetools-frontend/i18n@16.8.3

## 16.8.2

### Patch Changes

- [`a19adb0`](https://github.com/commercetools/merchant-center-application-kit/commit/a19adb05f7c0e2494bac80124feb59c35763ade4) [#1495](https://github.com/commercetools/merchant-center-application-kit/pull/1495) Thanks [@tdeekens](https://github.com/tdeekens)! - Add apollo-client as dependency as it is peer dependency of react-apollo.

## 16.8.1

### Patch Changes

- Updated dependencies []:
  - @commercetools-frontend/mc-http-server@16.8.1
