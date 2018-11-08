## Draft for 2.0.0

## BREAKING CHANGES 💣

This release introduces several breaking changes and some migration steps are required.

### Dropped some connectors and introduced a new connector for `ApplicationContext`

The package `@commercetools-frontend/application-shell-connectors` used to contain some connectors that have now been **removed**:

- **configuration**: `injectConfiguration` and `<ConfigurationConsumer>`
- **project-data-locale**: `withProjectDataLocale` and `<GetProjectDataLocale>`
- **user-permissions**: `withUserPermissions` and `<GetUserPermissions>`
- **user-time-zone**: `withUserTimeZone` and `<GetUserTimeZone>`

As a replacement, we now have a single component, `<GetApplicationContext>`, and a matching higher order component, `withApplicationContext`, that provides all the necessary "global" information about the `user`, `project`, `permissions`, `environment`, etc.

#### `user`

- `id`
- `email`
- `firstName`
- `lastName`
- `locale`
- `timeZone`

#### `project`

- `key`
- `version`
- `name`
- `countries`
- `currencies`
- `languages`

#### `permissions`

An object containing boolean flags about the permissions of the logged in user for the selected project (e.g. `{ canViewProducts: true, canManageOrders: false, ... }`)

#### `dataLocale`

The selected project **locale** (from the locale switcher in the AppBar) used to render a localized field of the project data. The available values are based on the `project.languages`

#### `environment`

This object contains application specific environment information defined in the `env.json`. The object will then be available on runtime from `window.app`. However, to avoid accessing those values globally, we inject this object into the application context.

The following are common fields defined in `env.json`. However, each application can provide more specific fields that cannot be documented.

- `frontendHost`: the host where the Merchant Center application is running (e.g. `mc.commercetools.com`)
- `mcApiUrl`: the API URL of the Merchant Center (`https://mc-api.commercetools.com` for projects in `EU` and `https://mc-api.commercetools.co` for projects in `US`)
- `location`: the location where the Merchant Center is running, usually `eu` or `us`
- `env`: the environment where the Merchant Center is running, usually `production` or `staging`
- `cdnUrl`: the URL where the static assets are stored
- `servedByProxy`: a flag to indicate if this application is running behind the Merchant Center proxy or not, usually `true` for production and `false` for local development

### Usage

```js
<GetApplicationContext
  render={({ user, project, environment }) => (
    <div>
      <h2>{`Hello ${user.firstName}`}</h2>
      <p>{`You are currently in project "${project.key}"`}</p>
    </div>
  )}
/>
```

You can also use the HOC `withApplicationContext` that will inject a `applicationContext` prop.

```js
withApplicationContext()(MyComponent);
```

...or pass a mapping function as the first argument to return custom shape of the injected props

```js
withApplicationContext(applicationContext => ({
  projectKey: applicationContext.project && applicationContext.project.key,
  userEmail: applicationContext.user && applicationContext.user.email,
}))(MyComponent);
```

### Renamed prop in `<ApplicationShell>`

The prop `configuration` of `<ApplicationShell>` has been renamed to `environment`, to make it less confusing.

### Imports

All packages now expose **named exports** and do not allow to import from paths inside the packages.

```js
// Before
import AsyncLocaleData from '@commercetools-frontend/i18n/async-locale-data';

// After
import { AsyncLocaleData } from '@commercetools-frontend/i18n';
```

> This includes also the `<ApplicationShell>`, so now it's `import { ApplicationShell } from '@commercetools-frontend/application-shell';`

### Published packages are bundled to ESM and CJS

Previously we were shipping untranspiled code, requiring consumers of the packages to instruct webpack to include those packages in the transpilation process.

```diff
const path = require('path');
const createWebpackConfigForDevelopment = require('@commercetools-frontend/mc-scripts/config/create-webpack-config-for-development');

const distPath = path.resolve(__dirname, 'dist');
const entryPoint = path.resolve(__dirname, 'src/index.js');
const sourceFolders = [
  path.resolve(__dirname, 'src'),
-  path.resolve(
-    __dirname,
-    'node_modules/@commercetools-frontend/application-shell'
-  ),
-  // ...plus remove all other `@commercetools-frontend` packages
];

createWebpackConfigForDevelopment({
  distPath,
  entryPoint,
  sourceFolders,
});
```

Now that we ship transpiled code, it's not necessary anymore to include those packages in your webpack source folders.

---

Additionally, we now include **test utils** to be able to write integration tests using `react-testing-library`. More info in the PR [#60](https://github.com/commercetools/merchant-center-application-kit/pull/60).

#### ⛑ Type: Refactoring

- `application-shell`

  - [#69](https://github.com/commercetools/merchant-center-application-kit/pull/69) refactor(assets): move image assets to assets package ([@montezume](https://github.com/montezume))

  A new package has been added, `assets`, that contains static image assets that can be accessed either via named exports, or directly from it's `image` folder. More information can be found in it's [README](https://github.com/commercetools/merchant-center-application-kit/tree/master/packages/assets)

  If you are currently accessing these image assets from `ui-kit`, then you can switch over to using them from `@commercetools-frontend/assets`, as they will be removed from `ui-kit` in a future release.

## [1.0.0-rc.3](https://github.com/commercetools/merchant-center-application-kit/compare/v1.0.0-rc.2...v1.0.0-rc.3) (2018-11-05)

#### 🐛 Type: Bug

- `mc-http-server`
  - [#27](https://github.com/commercetools/merchant-center-application-kit/pull/27) refactor(http-server): configure cloudbuilder to wait for 30s before building the docker image ([@emmenko](https://github.com/emmenko))
- `react-notifications`
  - [#48](https://github.com/commercetools/merchant-center-application-kit/pull/48) fix(components/notification-kinds): do not report error to sentry for `invalid_scope` ([@adnasa](https://github.com/adnasa))

#### 🔮 Type: Chore

- `application-shell-connectors`, `permissions`, `react-notifications`, `sdk`, `sentry`
  - [#34](https://github.com/commercetools/merchant-center-application-kit/pull/34) chore: define peer deps for other packages, ref #20 ([@emmenko](https://github.com/emmenko))

## [1.0.0-rc.2](https://github.com/commercetools/merchant-center-application-kit/compare/v1.0.0-rc.1...v1.0.0-rc.2) (2018-10-26)

#### ⛑ Type: Refactoring

- `application-shell`
  - [#25](https://github.com/commercetools/merchant-center-application-kit/pull/25) refactor(navbar): fetch only active applications from project extension ([@emmenko](https://github.com/emmenko))

## [1.0.0-rc.1](https://github.com/commercetools/merchant-center-application-kit/compare/v1.0.0-rc.0...v1.0.0-rc.1) (2018-10-23)

#### 🐛 Type: Bug

- `application-shell`
  - [#18](https://github.com/commercetools/merchant-center-application-kit/pull/18) feat(quick-access): support opening quick access when link has focus ([@dferber90](https://github.com/dferber90))
  - [#24](https://github.com/commercetools/merchant-center-application-kit/pull/24) fix(application-shell): to use expiry not expired in project list ([@tdeekens](https://github.com/tdeekens))
  - [#15](https://github.com/commercetools/merchant-center-application-kit/pull/15) fix(nav-bar): widen expanded navbar to fit spanish support text ([@montezume](https://github.com/montezume))

#### 🔮 Type: Chore

- `application-shell`, `react-notifications`
  - [#16](https://github.com/commercetools/merchant-center-application-kit/pull/16) chore: upgrade ui-kit and commitlint ([@dferber90](https://github.com/dferber90))

#### 🚀 Type: New Feature

- `application-shell`
  - [#22](https://github.com/commercetools/merchant-center-application-kit/pull/22) [application-shell]: Allow passing project key as variable on operation ([@tdeekens](https://github.com/tdeekens))

## [1.0.0-rc.0](https://github.com/commercetools/merchant-center-application-kit/compare/v1.0.0-beta.35...v1.0.0-rc.0) (2018-10-16)

#### 💥 Type: Breaking Change

- `application-shell`
  - [#12](https://github.com/commercetools/merchant-center-application-kit/pull/4) split i18n translations ([@emmenko](https://github.com/emmenko))

The `<ApplicationShell>` now requires a prop named `applicationMessages`, which is an object containing `intl` messages (e.g. `{ en: {}, de: {} }`).
Each Merchant Center application should now extract its own `i18n` messages and pass them to the `<ApplicationShell>`.
To extract the `intl` messages, use the `mc-scripts extract-intl` command:

```bash
$ mc-scripts extract-intl --output-path=$(pwd)/i18n/data 'src/**/!(*.spec).js'
```

#### 💅 Type: Enhancement

- `application-shell`
  - [#12](https://github.com/commercetools/merchant-center-application-kit/pull/12) fix(navbar): adds Scrollable and FixedMenu ([@lufego](https://github.com/lufego))

## [1.0.0-beta.36](https://github.com/commercetools/merchant-center-application-kit/compare/v1.0.0-beta.35...v1.0.0-beta.36) (2018-10-15)

#### 🐛 Type: Bug

- `application-shell`
  - [#8](https://github.com/commercetools/merchant-center-application-kit/pull/8) fix(quick-access): fix cart-discount-list route ([@dferber90](https://github.com/dferber90))
  - [#1](https://github.com/commercetools/merchant-center-application-kit/pull/1) fix(app-shell/quick-access): missing dep, log if component cannot be loaded ([@emmenko](https://github.com/emmenko))

#### 🔮 Type: Chore

- `application-shell`
  - [#2](https://github.com/commercetools/merchant-center-application-kit/pull/2) chore(navbar/feature-toggles): remove PRODUCT_TYPE_ADMINISTRATION ([@adnasa](https://github.com/adnasa))
- `i18n`
  - [#13](https://github.com/commercetools/merchant-center-application-kit/pull/13) Update translations for quick filters ([@tdeekens](https://github.com/tdeekens))
- `mc-scripts`
  - [#6](https://github.com/commercetools/merchant-center-application-kit/pull/6) refactor(create-webpack-config-for-\*): correct naming of color-mod, change order of execution ([@adnasa](https://github.com/adnasa))

## [1.0.0-beta.35](https://github.com/commercetools/merchant-center-application-kit/compare/v1.0.0-beta.34...v1.0.0-beta.35) (2018-10-10)

#### 🔮 Type: Chore

- `application-shell`
  - [#2](https://github.com/commercetools/merchant-center-application-kit/pull/2) chore(navbar/feature-toggles): remove PRODUCT_TYPE_ADMINISTRATION ([@adnasa](https://github.com/adnasa))

# [1.0.0-beta.34](https://github.com/commercetools/merchant-center-application-kit/tree/v1.0.0-beta.34) (2018-10-09)

_This is the first release after the code has been moved to this public repository. From now we will update the changelog on every new release._

> There isn't an official changelog prior to this version.
