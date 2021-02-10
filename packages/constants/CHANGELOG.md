# @commercetools-frontend/constants

## 18.4.0

### Patch Changes

- [`eb2fbb22`](https://github.com/commercetools/merchant-center-application-kit/commit/eb2fbb2279eff99048c91da352a69e1883eb54af) [#2044](https://github.com/commercetools/merchant-center-application-kit/pull/2044) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

## 18.2.2

### Patch Changes

- [`27b6690c`](https://github.com/commercetools/merchant-center-application-kit/commit/27b6690c75c9b83bb11ffcf83251b039a6f06cf0) [#2033](https://github.com/commercetools/merchant-center-application-kit/pull/2033) Thanks [@tdeekens](https://github.com/tdeekens)! - Rename to `enableFeatureConfigurationFetching` to `enableLongLivedFeatureFlags`

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

* [`e519929`](https://github.com/commercetools/merchant-center-application-kit/commit/e519929415f225ff28731f068bebb8facad868f8) [#1853](https://github.com/commercetools/merchant-center-application-kit/pull/1853) Thanks [@tdeekens](https://github.com/tdeekens)! - chore: add import api target

## 17.1.1

### Patch Changes

- [`bacc091`](https://github.com/commercetools/merchant-center-application-kit/commit/bacc091506dedb58fadaa4008fc93381a5e9b212) [#1836](https://github.com/commercetools/merchant-center-application-kit/pull/1836) Thanks [@emmenko](https://github.com/emmenko)! - Always infer MC API URL from origin when running behind the MC Proxy.

## 17.1.0

### Patch Changes

- [`6059b9a`](https://github.com/commercetools/merchant-center-application-kit/commit/6059b9af35fbee646d008c393578c83795f10b4f) [#1835](https://github.com/commercetools/merchant-center-application-kit/pull/1835) Thanks [@nbryant-commercetools](https://github.com/nbryant-commercetools)! - Addition of new change history GraphQL Target

## 17.0.1

### Patch Changes

- [`71c5f78`](https://github.com/commercetools/merchant-center-application-kit/commit/71c5f7875c7476e34b65d37046d48ca47e96f12e) [#1795](https://github.com/commercetools/merchant-center-application-kit/pull/1795) Thanks [@renovate](https://github.com/apps/renovate)! - update dependencies

## 17.0.0

### Patch Changes

- [`d883e96`](https://github.com/commercetools/merchant-center-application-kit/commit/d883e96ffd076788256d33d833e7f69ffc39f3ac) [#1802](https://github.com/commercetools/merchant-center-application-kit/pull/1802) Thanks [@tdeekens](https://github.com/tdeekens)! - refactor(app-shell): to remove disabbledMenuItems support

## 16.16.0

### Patch Changes

- [`f144292`](https://github.com/commercetools/merchant-center-application-kit/commit/f1442921650ca4e6c9bf61ce31bda2b63e72038a) [#1673](https://github.com/commercetools/merchant-center-application-kit/pull/1673) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

## 16.15.9

### Patch Changes

- [`564cd91`](https://github.com/commercetools/merchant-center-application-kit/commit/564cd9186d23ea34886d1c41718486e16d3ca90e) [#1671](https://github.com/commercetools/merchant-center-application-kit/pull/1671) Thanks [@emmenko](https://github.com/emmenko)! - Allow to overwrite LD client ID via application config.

  > This is mostly useful for internal usage on our staging environments.

## 16.15.3

### Patch Changes

- [`6d98245`](https://github.com/commercetools/merchant-center-application-kit/commit/6d98245615ddb83e805e5cc2cc0620920b4a71c7) [#1643](https://github.com/commercetools/merchant-center-application-kit/pull/1643) Thanks [@emmenko](https://github.com/emmenko)! - Update copyright date to 2020 in LICENSE files

## 16.15.2

### Patch Changes

- [`0f3dcc3`](https://github.com/commercetools/merchant-center-application-kit/commit/0f3dcc38c81a5fb3c668faecce9a13057f66a66b) [#1638](https://github.com/commercetools/merchant-center-application-kit/pull/1638) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

## 16.15.0

### Patch Changes

- [`33baf25`](https://github.com/commercetools/merchant-center-application-kit/commit/33baf25a5990d7bb292e88e4040e11bff4669b2c) [#1634](https://github.com/commercetools/merchant-center-application-kit/pull/1634) Thanks [@emmenko](https://github.com/emmenko)! - Update description of schema properties of the application config

## 16.14.0

### Patch Changes

- [`4168061`](https://github.com/commercetools/merchant-center-application-kit/commit/41680612042d476422776e5eaa254450bf874581) [#1618](https://github.com/commercetools/merchant-center-application-kit/pull/1618) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

## 16.12.0

### Patch Changes

- [`fa6386c`](https://github.com/commercetools/merchant-center-application-kit/commit/fa6386c347df0505235c199232353bc315a47c81) [#1587](https://github.com/commercetools/merchant-center-application-kit/pull/1587) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

## 16.9.1

### Patch Changes

- [`f92ec54`](https://github.com/commercetools/merchant-center-application-kit/commit/f92ec54e78edb668e8dff53342e8542e96d8c319) [#1551](https://github.com/commercetools/merchant-center-application-kit/pull/1551) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

## 16.8.8

### Patch Changes

- [`0925da6`](https://github.com/commercetools/merchant-center-application-kit/commit/0925da6f11e35cc712cc12337716f846a67c0e4c) [#1537](https://github.com/commercetools/merchant-center-application-kit/pull/1537) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

## 16.8.6

### Patch Changes

- [`9391762`](https://github.com/commercetools/merchant-center-application-kit/commit/939176298df3558970a267b6e6478051a355ffae) [#1530](https://github.com/commercetools/merchant-center-application-kit/pull/1530) Thanks [@emmenko](https://github.com/emmenko)! - Update `@commercetools-uikit/*` packages to `10.21.0`

## 16.8.3

### Patch Changes

- [`10c9a89`](https://github.com/commercetools/merchant-center-application-kit/commit/10c9a89ce96c1748e84505e65266577fbea890e3) [#1503](https://github.com/commercetools/merchant-center-application-kit/pull/1503) Thanks [@emmenko](https://github.com/emmenko)! - Support experimental HTTP header `X-Application-Id`
