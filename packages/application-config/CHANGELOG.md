# @commercetools-frontend/application-config

## 19.0.1

### Patch Changes

- [#2135](https://github.com/commercetools/merchant-center-application-kit/pull/2135) [`598d3bb5`](https://github.com/commercetools/merchant-center-application-kit/commit/598d3bb52a43b261f4ddf0393722927b76339870) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

## 19.0.0

### Major Changes

- [#2041](https://github.com/commercetools/merchant-center-application-kit/pull/2041) [`a240f657`](https://github.com/commercetools/merchant-center-application-kit/commit/a240f6574a9240a2ac82febb67b0f6c814db979f) Thanks [@emmenko](https://github.com/emmenko)! - Upgrade and migrate packages to use `ui-kit@v12`

* [#2041](https://github.com/commercetools/merchant-center-application-kit/pull/2041) [`a240f657`](https://github.com/commercetools/merchant-center-application-kit/commit/a240f6574a9240a2ac82febb67b0f6c814db979f) Thanks [@emmenko](https://github.com/emmenko)! - - Changes required Node.js engine version to `>=12 || >=14` in `package.json`.

## 18.7.0

### Patch Changes

- [#2125](https://github.com/commercetools/merchant-center-application-kit/pull/2125) [`8eed86e9`](https://github.com/commercetools/merchant-center-application-kit/commit/8eed86e977320aa00397b93e94c0cd29331d8c01) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update dependency ajv to v8

* [#2110](https://github.com/commercetools/merchant-center-application-kit/pull/2110) [`c850d6dc`](https://github.com/commercetools/merchant-center-application-kit/commit/c850d6dcf8edabb5eb9390e41def4b6b52879b7a) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

## 18.6.0

### Patch Changes

- [#2099](https://github.com/commercetools/merchant-center-application-kit/pull/2099) [`d09a154b`](https://github.com/commercetools/merchant-center-application-kit/commit/d09a154b9e74bc180da033acd8e74ac8ed32fc75) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

## 18.5.6

### Patch Changes

- [`ca4ea6eb`](https://github.com/commercetools/merchant-center-application-kit/commit/ca4ea6eb17c14bf015a8448248c58881e005ac99) [#2085](https://github.com/commercetools/merchant-center-application-kit/pull/2085) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

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

## 17.10.1

### Patch Changes

- [`5557c5c`](https://github.com/commercetools/merchant-center-application-kit/commit/5557c5c5744bf34a981247d04dc2f1117c15767d) [#1976](https://github.com/commercetools/merchant-center-application-kit/pull/1976) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

## 17.10.0

### Minor Changes

- [`d86c2e8`](https://github.com/commercetools/merchant-center-application-kit/commit/d86c2e86179aca2729d92fa18545241e2bf36fca) [#1934](https://github.com/commercetools/merchant-center-application-kit/pull/1934) Thanks [@emmenko](https://github.com/emmenko)! - Introduce a new **experimental opt-in** feature to authenticate the application for local development, using an OIDC-like workflow.

  > Disclaimer: this is an opt-in experimental feature. Use it at your own risk.
  > We want to test this feature internally first. Until then, we discourage you to try it out.

  The feature can be enabled by setting the `ENABLE_OIDC_FOR_DEVELOPMENT=true` environment variable.

  In addition to that, we have a new package `@commercetools-frontend/cypress`, to include some useful commands for testing Custom Applications.

### Patch Changes

- [`2d6dbaa`](https://github.com/commercetools/merchant-center-application-kit/commit/2d6dbaa5b5d1b0f29dcb5c88222a2a6fc9161cec) [#1980](https://github.com/commercetools/merchant-center-application-kit/pull/1980) Thanks [@emmenko](https://github.com/emmenko)! - Use `MC_API_URL` env variable and allow passing empty strings to the application config.

## 17.9.0

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
  +renderApp(<AsyncApplicationRoutes />, {
    route: '/my-project/examples-starter'
  +  environment: {
  +    entryPointUriPath: 'examples-starter',
  +  },
  +  disableAutomaticEntryPointRoutes: false,
  });
  ```

## 17.8.0

### Patch Changes

- [`48a9886`](https://github.com/commercetools/merchant-center-application-kit/commit/48a98861dcf4193041e02e8ac11eb2940826f5d0) [#1954](https://github.com/commercetools/merchant-center-application-kit/pull/1954) Thanks [@tdeekens](https://github.com/tdeekens)! - chore: update dependencies across packages

## 17.7.3

### Patch Changes

- [`9cbebcf`](https://github.com/commercetools/merchant-center-application-kit/commit/9cbebcf2fa5efd87451032b1e1fd4d86add6209d) [#1937](https://github.com/commercetools/merchant-center-application-kit/pull/1937) Thanks [@renovate](https://github.com/apps/renovate)! - Update `avj` dependency to v7

## 17.7.1

### Patch Changes

- [`f6f3c5e`](https://github.com/commercetools/merchant-center-application-kit/commit/f6f3c5ebd08226fd4eca22aec5c39791cf5c5d6a) [#1935](https://github.com/commercetools/merchant-center-application-kit/pull/1935) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

## 17.7.0

### Minor Changes

- [`d74addd`](https://github.com/commercetools/merchant-center-application-kit/commit/d74addd32a5f39d19d6bae1ee31cbf33a35fd04e) [#1914](https://github.com/commercetools/merchant-center-application-kit/pull/1914) Thanks [@adnasa](https://github.com/adnasa)! - add experimental application-components/product-picker, generate new types in application-config, application-shell

### Patch Changes

- [`1ec4379`](https://github.com/commercetools/merchant-center-application-kit/commit/1ec4379938b093d4444ec9e4079524c48afd4a42) [#1923](https://github.com/commercetools/merchant-center-application-kit/pull/1923) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

## 17.6.2

### Patch Changes

- [`1a96e83`](https://github.com/commercetools/merchant-center-application-kit/commit/1a96e831c94250e10de61dee40e682a77313445f) [#1905](https://github.com/commercetools/merchant-center-application-kit/pull/1905) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

* [`c7b321a`](https://github.com/commercetools/merchant-center-application-kit/commit/c7b321aa3eaae6aae803590999179b95b3da2b9a) [#1907](https://github.com/commercetools/merchant-center-application-kit/pull/1907) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update dependency json-schema-to-typescript to v10

## 17.6.0

### Patch Changes

- [`2287813`](https://github.com/commercetools/merchant-center-application-kit/commit/2287813c19a54b7edb7005d417c5f6a7b34cad1f) [#1871](https://github.com/commercetools/merchant-center-application-kit/pull/1871) Thanks [@emmenko](https://github.com/emmenko)! - Compile and bundle packages using [preconstruct](https://preconstruct.tools)

## 17.4.1

### Patch Changes

- [`ec9e10f`](https://github.com/commercetools/merchant-center-application-kit/commit/ec9e10fde15351cc7cb825aaebb53cdb6e00e0d9) [#1889](https://github.com/commercetools/merchant-center-application-kit/pull/1889) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

## 17.4.0

### Patch Changes

- [`09cc4b4`](https://github.com/commercetools/merchant-center-application-kit/commit/09cc4b410916f755be751533e566215d8df0e1cf) [#1880](https://github.com/commercetools/merchant-center-application-kit/pull/1880) Thanks [@emmenko](https://github.com/emmenko)! - Make the `applicationId` a combination of the Custom Application `id` and `entryPointUriPath`.

## 17.3.0

### Patch Changes

- [`71c9111`](https://github.com/commercetools/merchant-center-application-kit/commit/71c9111308832009d1a27e91e4f2d2da4c53367c) [#1866](https://github.com/commercetools/merchant-center-application-kit/pull/1866) Thanks [@emmenko](https://github.com/emmenko)! - Update to uikit v10.39.8

## 17.2.1

### Patch Changes

- [`310e98c`](https://github.com/commercetools/merchant-center-application-kit/commit/310e98c39c0b6479175b7685b3f29ea0a5baa22b) Thanks [@emmenko](https://github.com/emmenko)! - Update dependencies (https://github.com/commercetools/merchant-center-application-kit/pull/1857)

## 17.2.0

### Patch Changes

- [`e0ec004`](https://github.com/commercetools/merchant-center-application-kit/commit/e0ec004d611f93b24f015120d09f6f18389b219f) [#1854](https://github.com/commercetools/merchant-center-application-kit/pull/1854) Thanks [@emmenko](https://github.com/emmenko)! - chore: update deps

## 17.0.1

### Patch Changes

- [`71c5f78`](https://github.com/commercetools/merchant-center-application-kit/commit/71c5f7875c7476e34b65d37046d48ca47e96f12e) [#1795](https://github.com/commercetools/merchant-center-application-kit/pull/1795) Thanks [@renovate](https://github.com/apps/renovate)! - update dependencies

## 17.0.0

### Major Changes

- [`0e0efc6`](https://github.com/commercetools/merchant-center-application-kit/commit/0e0efc68e93621209f8ee84ebc920b79431c704a) [#1805](https://github.com/commercetools/merchant-center-application-kit/pull/1805) Thanks [@emmenko](https://github.com/emmenko)! - remove deprecated `compile-html` options

* [`e706232`](https://github.com/commercetools/merchant-center-application-kit/commit/e706232c152f3fed9cf44c10a0c4f25b27448a16) [#1805](https://github.com/commercetools/merchant-center-application-kit/pull/1805) Thanks [@emmenko](https://github.com/emmenko)! - Remove `mc-scripts extract-intl` command in favor of the official `@formatjs/cli` package.
  We recommend to update your script to extract Intl messages to use the `formatjs extract` command.

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

## 16.17.0

### Patch Changes

- [`178ff31`](https://github.com/commercetools/merchant-center-application-kit/commit/178ff317426e0cfcfe1c0adf42a9eada3b134642) [#1734](https://github.com/commercetools/merchant-center-application-kit/pull/1734) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

* [`9bc8558`](https://github.com/commercetools/merchant-center-application-kit/commit/9bc85581d336c7d75fda5dc82a1c02f32f16c1fb) [#1704](https://github.com/commercetools/merchant-center-application-kit/pull/1704) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

## 16.16.1

### Patch Changes

- [`bc15ac2`](https://github.com/commercetools/merchant-center-application-kit/commit/bc15ac2f6d53d4c8e0d53ceb6c1a0e5ba0f5353e) [#1692](https://github.com/commercetools/merchant-center-application-kit/pull/1692) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

## 16.16.0

### Patch Changes

- [`f144292`](https://github.com/commercetools/merchant-center-application-kit/commit/f1442921650ca4e6c9bf61ce31bda2b63e72038a) [#1673](https://github.com/commercetools/merchant-center-application-kit/pull/1673) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

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
