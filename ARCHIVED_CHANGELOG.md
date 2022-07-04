## [16.8.0](https://github.com/commercetools/merchant-center-application-kit/compare/v16.7.1...v16.8.0) (2020-05-06)

This release introduces a new package to provide some pre-configured loggers to be used in an HTTP server.

```
npm install --save @commercetools-backend/loggers

# or

yarn add @commercetools-backend/loggers
```

You can find out more about it in the package [Documentation](https://www.npmjs.com/package/@commercetools-backend/loggers).

#### 🐛 Type: Bug

- [#1477](https://github.com/commercetools/merchant-center-application-kit/pull/1477) fix(loggers): silent option ([@emmenko](https://github.com/emmenko))

#### 🚀 Type: New Feature

- [#1472](https://github.com/commercetools/merchant-center-application-kit/pull/1472) feat: add loggers package ([@emmenko](https://github.com/emmenko))

#### ⛑ Type: Refactoring

- [#1480](https://github.com/commercetools/merchant-center-application-kit/pull/1480) refactor(loggers): remove generic type, as it doesn't really work as expected ([@emmenko](https://github.com/emmenko))

* [#1478](https://github.com/commercetools/merchant-center-application-kit/pull/1478) refactor(loggers): refine types ([@emmenko](https://github.com/emmenko))

#### 🤖 Type: Dependencies

- `actions-global`, `application-components`, `application-shell-connectors`, `application-shell`, `babel-preset-mc-app`, `browser-history`, `constants`, `i18n`, `jest-preset-mc-app`, `jest-stylelint-runner`, `l10n`, `mc-html-template`, `mc-http-server`, `mc-scripts`, `notifications`, `permissions`, `react-notifications`, `sdk`, `sentry`, `url-utils`
  - [#1475](https://github.com/commercetools/merchant-center-application-kit/pull/1475) chore(deps): update all dependencies (major) ([@renovate[bot]](https://github.com/apps/renovate))
- `actions-global`, `application-components`, `application-shell-connectors`, `application-shell`, `babel-preset-mc-app`, `browser-history`, `constants`, `i18n`, `l10n`, `notifications`, `permissions`, `react-notifications`, `sdk`, `sentry`, `url-utils`
  - [#1471](https://github.com/commercetools/merchant-center-application-kit/pull/1471) refactor: to use official rollup plugins ([@tdeekens](https://github.com/tdeekens))

## [16.7.1](https://github.com/commercetools/merchant-center-application-kit/compare/v16.7.0...v16.7.1) (2020-04-28)

#### 💅 Type: Enhancement

- `application-shell-connectors`, `permissions`
  - [#1463](https://github.com/commercetools/merchant-center-application-kit/pull/1463) refactor(permissions): use Record for dataFences ([@adnasa](https://github.com/adnasa))

#### ⛑ Type: Refactoring

- `actions-global`, `application-components`, `application-shell-connectors`, `application-shell`, `browser-history`, `i18n`, `l10n`, `notifications`, `react-notifications`, `sdk`, `sentry`
  - [#1443](https://github.com/commercetools/merchant-center-application-kit/pull/1443) refactor: use TS "import type" ([@emmenko](https://github.com/emmenko))
- `create-mc-app`, `jest-preset-mc-app`, `mc-html-template`, `mc-scripts`
  - [#1470](https://github.com/commercetools/merchant-center-application-kit/pull/1470) refactor(mc-html-template): compile it through babel, to support node 10 ([@emmenko](https://github.com/emmenko))
- `mc-scripts`
  - [#1468](https://github.com/commercetools/merchant-center-application-kit/pull/1468) refactor(mc-script): compile it through babel, to support node 10 ([@emmenko](https://github.com/emmenko))

#### 🤖 Type: Dependencies

- `application-shell`, `l10n`
  - [#1448](https://github.com/commercetools/merchant-center-application-kit/pull/1448) chore(deps): update all dependencies (major) ([@renovate[bot]](https://github.com/apps/renovate))

## [16.7.0](https://github.com/commercetools/merchant-center-application-kit/compare/v16.6.1...v16.7.0) (2020-04-24)

This release introduces a new package to help working and developing an external API for Custom Applications.

> Please make sure to read the updated documentation about [Proxing to an external API](https://docs.commercetools.com/custom-applications/main-concepts/proxy-to-external-api).

```
npm install --save @commercetools-backend/express

# or

yarn add @commercetools-backend/express
```

The package currently includes an Express.js middleware to verify requests sent via the `/proxy/forward-to` endpoint of the Merchant Center API Gateway.

```js
const {
  createSessionMiddleware,
  CLOUD_IDENTIFIERS,
} = require('@commercetools-backend/express');

app.use(
  createSessionMiddleware({
    audience: 'https://my-api-server.com',
    issuer: CLOUD_IDENTIFIERS.GCP_EU,
  })
);
app.use((request, response, next) => {
  // `request.session` contains the useful information
});
```

> We strongly recommend to use this package to secure your API server, as well as to make it easier to setup your server.

We plan to further develop the package to include other useful components to work with the Merchant Center and commercetools APIs. If you are interested in these functionalities and you would like to have certain features included in the packae, let us know and open a [support issue](https://github.com/commercetools/merchant-center-application-kit/issues/new/choose).

The middleware also works for Serverless functions. Below is an example for Google Cloud Functions:

```js
const {
  createSessionAuthVerifier,
  CLOUD_IDENTIFIERS,
} = require('@commercetools-backend/express');

const sessionAuthVerifier = createSessionAuthVerifier({
  audience: 'https://my-api-server.com',
  issuer: CLOUD_IDENTIFIERS.GCP_EU,
});

exports.handler = async function (request, response) {
  try {
    await sessionAuthVerifier(request, response);
  } catch (error) {
    response.status(401).send(JSON.stringify({ message: 'Unauthorized' }));
    return;
  }

  // `request.session` contains the useful information
};
```

**Support forwardTo request config for Apollo and SDK actions**

Connecting to your external API requires you to use the `/proxy/forward-to` endpoint of the Merchant Center API Gateway.

To facilitate the usage of the built-in Apollo client and the SDK actions, we provide some utility helpers to abstract away the request configuration for the `/proxy/forward-to` endpoint.

- Usage for Apollo

We can leverage the `context` option for Apollo queries to change a bit how the request is configured. The `@commercetools-frontend/application-shell` package now exposes an utility function to configure the Apollo context for the `/proxy/forward-to` usage.

```js
import { useQuery } from '@apollo/client/react';
import { createApolloContextForProxyForwardTo } from '@commercetools-frontend/application-shell';

const Fetcher = () => {
  const { loading, data, error } = useQuery(MyQuery, {
    context: createApolloContextForProxyForwardTo({
      uri: 'https://my-custom-app.com/graphql',
    }),
  });
};
```

- Usage for SDK

By default, all requests with the SDK are configured to be sent to the MC API.
To make it easier to make requests to the proxy endpoint using the SDK, there is a new action creator wrapper that comes with built-in configuration options.

The exported action creators have a new export `forwardTo`, which is an object containing wrappers around the normal action creators.

```js
actions.forwardTo.get({ uri: 'https://my-custom-app.com/graphql' });
actions.forwardTo.del(options);
actions.forwardTo.head(options);
actions.forwardTo.post(options);
```

#### 🐛 Type: Bug

- Other
  - [#1459](https://github.com/commercetools/merchant-center-application-kit/pull/1459) fix(express): do not append trailing slash to audience if request path is "/" ([@emmenko](https://github.com/emmenko))
- `application-shell-connectors`, `application-shell`, `sdk`
  - [#1455](https://github.com/commercetools/merchant-center-application-kit/pull/1455) fix: typings ref for test utils, treat crypto as an external module ([@emmenko](https://github.com/emmenko))

#### 🔮 Type: Chore

- [#1451](https://github.com/commercetools/merchant-center-application-kit/pull/1451) refactor(ci): to not use cypress github action ([@emmenko](https://github.com/emmenko))

#### 🚀 Type: New Feature

- `application-shell`, `sdk`
  - [#1457](https://github.com/commercetools/merchant-center-application-kit/pull/1457) feat: support forwardTo request config for apollo and sdk ([@emmenko](https://github.com/emmenko))
- `mc-html-template`
  - [#1456](https://github.com/commercetools/merchant-center-application-kit/pull/1456) feat(headers.json): add support for env variable placeholders ([@emmenko](https://github.com/emmenko))
- Other
  - [#1447](https://github.com/commercetools/merchant-center-application-kit/pull/1447) feat: introduce new package @commercetools-backend/express with utilities for working with Custom Applications ([@emmenko](https://github.com/emmenko))

#### ⛑ Type: Refactoring

- `mc-http-server`
  - [#1462](https://github.com/commercetools/merchant-center-application-kit/pull/1462) refactor: to update to node v13 ([@tdeekens](https://github.com/tdeekens))
- Other
  - [#1453](https://github.com/commercetools/merchant-center-application-kit/pull/1453) refactor(express): support backwards compatibility for v1 ([@emmenko](https://github.com/emmenko))
  - [#1452](https://github.com/commercetools/merchant-center-application-kit/pull/1452) refactor(express): support request handler for serverless functions ([@emmenko](https://github.com/emmenko))

#### 🖥 Type: Website

- [#1461](https://github.com/commercetools/merchant-center-application-kit/pull/1461) docs(website): rewrite docs for proxing to external API ([@emmenko](https://github.com/emmenko))
- [#1450](https://github.com/commercetools/merchant-center-application-kit/pull/1450) fix(website): update to docs-kit 2.5.1-canary.2 to fix MDX issues ([@emmenko](https://github.com/emmenko))
- [#1446](https://github.com/commercetools/merchant-center-application-kit/pull/1446) fix(website): rendering of UI component pages ([@emmenko](https://github.com/emmenko))

#### 🤖 Type: Dependencies

- `actions-global`, `application-components`, `application-shell-connectors`, `application-shell`, `babel-preset-mc-app`, `create-mc-app`, `jest-preset-mc-app`, `l10n`, `mc-scripts`, `permissions`, `react-notifications`
  - [#1438](https://github.com/commercetools/merchant-center-application-kit/pull/1438) chore(deps): lock file maintenance all dependencies ([@renovate[bot]](https://github.com/apps/renovate))

## [16.6.1](https://github.com/commercetools/merchant-center-application-kit/compare/v16.6.0...v16.6.1) (2020-04-15)

#### 🐛 Type: Bug

- `application-shell`
  - [#1433](https://github.com/commercetools/merchant-center-application-kit/pull/1433) fix(app-shell): apply cached menu state synchronously as a layout effect, to avoid flickering ([@adnasa](https://github.com/adnasa))
  - [#1436](https://github.com/commercetools/merchant-center-application-kit/pull/1436) fix(app-shell/test-utils): to defer adapter initialization without flags ([@tdeekens](https://github.com/tdeekens))

#### 🖥 Type: Website

- [#1432](https://github.com/commercetools/merchant-center-application-kit/pull/1432) chore(website): update to theme 2.4.1-canary.7 ([@emmenko](https://github.com/emmenko))

## [16.6.0](https://github.com/commercetools/merchant-center-application-kit/compare/v16.5.3...v16.6.0) (2020-04-08)

#### 🐛 Type: Bug

- `actions-global`, `application-components`, `application-shell-connectors`, `application-shell`, `i18n`, `l10n`, `permissions`, `react-notifications`, `sdk`, `sentry`
  - [#1424](https://github.com/commercetools/merchant-center-application-kit/pull/1424) fix(l18n): react to only be peer dependency ([@tdeekens](https://github.com/tdeekens))

#### 🚀 Type: New Feature

- `jest-preset-mc-app`
  - [#1423](https://github.com/commercetools/merchant-center-application-kit/pull/1423) feat(jest-preset): allow to configure jest preset ([@emmenko](https://github.com/emmenko))

#### 🖥 Type: Website

- `mc-dev-authentication`
  - [#1422](https://github.com/commercetools/merchant-center-application-kit/pull/1422) docs(website): mention that dev login with SSO is currently not supported ([@emmenko](https://github.com/emmenko))
- Other
  - [#1418](https://github.com/commercetools/merchant-center-application-kit/pull/1418) docs(website): mention limitations of forward-to proxy endpoint ([@emmenko](https://github.com/emmenko))

#### 🤖 Type: Dependencies

- `application-components`, `application-shell-connectors`, `application-shell`, `constants`, `create-mc-app`, `mc-scripts`, `react-notifications`, `sdk`
  - [#1430](https://github.com/commercetools/merchant-center-application-kit/pull/1430) chore: update deps (among flopflip) ([@tdeekens](https://github.com/tdeekens))
- `application-components`, `application-shell-connectors`, `application-shell`, `babel-preset-mc-app`, `constants`, `create-mc-app`, `jest-preset-mc-app`, `mc-http-server`, `mc-scripts`, `react-notifications`, `sdk`, `sentry`
  - [#1428](https://github.com/commercetools/merchant-center-application-kit/pull/1428) chore: update rollup among other deps ([@tdeekens](https://github.com/tdeekens))
- Other
  - [#1425](https://github.com/commercetools/merchant-center-application-kit/pull/1425) chore(website): update to theme 2.4.0 ([@emmenko](https://github.com/emmenko))
- `application-shell-connectors`, `application-shell`, `i18n`, `jest-preset-mc-app`, `react-notifications`
  - [#1399](https://github.com/commercetools/merchant-center-application-kit/pull/1399) chore: update testing-library/react to v10 ([@tdeekens](https://github.com/tdeekens))
- `application-components`, `application-shell-connectors`, `application-shell`, `mc-scripts`, `permissions`, `react-notifications`
  - [#1419](https://github.com/commercetools/merchant-center-application-kit/pull/1419) chore(deps): update all dependencies (major) ([@renovate[bot]](https://github.com/apps/renovate))

## [16.5.3](https://github.com/commercetools/merchant-center-application-kit/compare/v16.5.2...v16.5.3) (2020-03-27)

#### 🐛 Type: Bug

- `sentry`
  - [#1416](https://github.com/commercetools/merchant-center-application-kit/pull/1416) Properly report unhandled rejections and ErrorEvents to Sentry ([@pa3](https://github.com/pa3))

#### ⛑ Type: Refactoring

- `permissions`
  - [#1415](https://github.com/commercetools/merchant-center-application-kit/pull/1415) refactor: hasDemandeDataFences -> hasDemandedDataFences ([@adnasa](https://github.com/adnasa))

#### 🤖 Type: Dependencies

- `application-components`, `application-shell-connectors`, `application-shell`, `create-mc-app`, `i18n`, `jest-preset-mc-app`, `jest-stylelint-runner`, `l10n`, `mc-html-template`, `mc-http-server`, `mc-scripts`, `notifications`, `permissions`, `react-notifications`, `sdk`, `sentry`, `url-utils`
  - [#1409](https://github.com/commercetools/merchant-center-application-kit/pull/1409) chore(deps): update all dependencies (major) ([@renovate[bot]](https://github.com/apps/renovate))

## [16.5.2](https://github.com/commercetools/merchant-center-application-kit/compare/v16.5.1...v16.5.2) (2020-03-23)

#### 🐛 Type: Bug

- `application-shell`
  - [#1394](https://github.com/commercetools/merchant-center-application-kit/pull/1394) fix(apollo-caching): simplify id from object logic ([@islam3zzat](https://github.com/islam3zzat))
  - [#1411](https://github.com/commercetools/merchant-center-application-kit/pull/1411) fix: proper invocation of window.location.replace ([@pa3](https://github.com/pa3))

## [16.5.1](https://github.com/commercetools/merchant-center-application-kit/compare/v16.5.0...v16.5.1) (2020-03-20)

#### 🐛 Type: Bug

- `application-shell`, `i18n`
  - [#1407](https://github.com/commercetools/merchant-center-application-kit/pull/1407) fix: revert "fix: remove old product list from quick access" ([@tdeekens](https://github.com/tdeekens))

#### 🖥 Type: Website

- `babel-preset-mc-app`
  - [#1405](https://github.com/commercetools/merchant-center-application-kit/pull/1405) docs: add 'Help Needed' page ([@emmenko](https://github.com/emmenko))

#### 🤖 Type: Dependencies

- `jest-preset-mc-app`
  - [#1406](https://github.com/commercetools/merchant-center-application-kit/pull/1406) fix(jest-preset-mc-app): add mutation-observer-shim ([@tdeekens](https://github.com/tdeekens))

## [16.5.0](https://github.com/commercetools/merchant-center-application-kit/compare/v16.4.0...v16.5.0) (2020-03-18)

#### 🚀 Type: New Feature

- `jest-preset-mc-app`
  - [#1401](https://github.com/commercetools/merchant-center-application-kit/pull/1401) feat(jest-preset): add preset for jsdom sixteen ([@tdeekens](https://github.com/tdeekens))

#### 🐛 Type: Bug

- `application-shell`, `i18n`
  - [#1403](https://github.com/commercetools/merchant-center-application-kit/pull/1403) fix(quick-access): link to pim search list ([@vidurar](https://github.com/vidurar))
- `application-shell`
  - [#1395](https://github.com/commercetools/merchant-center-application-kit/pull/1395) PCM-1600: routes to product varitns from quick access ([@vidurar](https://github.com/vidurar))

#### ✍️ Type: Documentation

- `mc-html-template`
  - [#1386](https://github.com/commercetools/merchant-center-application-kit/pull/1386) docs(mc-html-template): add docs for placeholders ([@tdeekens](https://github.com/tdeekens))

#### ⛑ Type: Refactoring

- `application-shell`
  - [#1400](https://github.com/commercetools/merchant-center-application-kit/pull/1400) fix(quick-access): to not use global.replace under test ([@tdeekens](https://github.com/tdeekens))
- `application-shell-connectors`, `application-shell`, `jest-preset-mc-app`, `react-notifications`
  - [#1398](https://github.com/commercetools/merchant-center-application-kit/pull/1398) refactor: to use location module ([@tdeekens](https://github.com/tdeekens))
- `application-components`, `application-shell`, `i18n`, `react-notifications`
  - [#1397](https://github.com/commercetools/merchant-center-application-kit/pull/1397) refactor: to use waitFor and waitForElementToBeRemoved ([@tdeekens](https://github.com/tdeekens))
- `application-shell-connectors`, `application-shell`, `permissions`, `react-notifications`
  - [#1396](https://github.com/commercetools/merchant-center-application-kit/pull/1396) refactor: to not use wait-for-element ([@tdeekens](https://github.com/tdeekens))

#### 🤖 Type: Dependencies

- `application-shell`, `jest-preset-mc-app`
  - [#1392](https://github.com/commercetools/merchant-center-application-kit/pull/1392) fix(deps): update all dependencies (major) ([@renovate[bot]](https://github.com/apps/renovate))
- `application-shell`
  - [#1387](https://github.com/commercetools/merchant-center-application-kit/pull/1387) chore: update flopflip ([@tdeekens](https://github.com/tdeekens))
- `mc-scripts`
  - [#1383](https://github.com/commercetools/merchant-center-application-kit/pull/1383) chore(deps): update all dependencies (major) ([@renovate[bot]](https://github.com/apps/renovate))
- `sdk`
  - [#1382](https://github.com/commercetools/merchant-center-application-kit/pull/1382) chore(deps): pin dependencies ([@renovate[bot]](https://github.com/apps/renovate))

## [16.4.0](https://github.com/commercetools/merchant-center-application-kit/compare/v16.3.3...v16.4.0) (2020-03-06)

#### 🚀 Type: New Feature

- `mc-html-template`
  - [#1380](https://github.com/commercetools/merchant-center-application-kit/pull/1380) feat(mc-html-template): add support env variable placeholders ([@tdeekens](https://github.com/tdeekens))

#### 🐛 Type: Bug

- `application-shell`
  - [#1379](https://github.com/commercetools/merchant-center-application-kit/pull/1379) fix(app-shell): regression to render menu divider ([@emmenko](https://github.com/emmenko))
- `mc-dev-authentication`
  - [#1378](https://github.com/commercetools/merchant-center-application-kit/pull/1378) fix(dev authentication): replace trailing slash in mcApiUrl ([@nbryant-commercetools](https://github.com/nbryant-commercetools))
- `permissions`
  - [#1375](https://github.com/commercetools/merchant-center-application-kit/pull/1375) fix(permissions): to warn only once for condition and message ([@tdeekens](https://github.com/tdeekens))

#### 🤖 Type: Dependencies

- `application-shell`, `mc-http-server`, `sdk`
  - [#1370](https://github.com/commercetools/merchant-center-application-kit/pull/1370) fix(deps): update all dependencies (major) ([@renovate[bot]](https://github.com/apps/renovate))

## [16.3.3](https://github.com/commercetools/merchant-center-application-kit/compare/v16.3.2...v16.3.3) (2020-03-02)

#### 🐛 Type: Bug

- `application-shell-connectors`, `constants`
  - [#1368](https://github.com/commercetools/merchant-center-application-kit/pull/1368) bug(app-shell-connectors): path mcApiUrl on context env ([@tdeekens](https://github.com/tdeekens))
- `sdk`
  - [#1365](https://github.com/commercetools/merchant-center-application-kit/pull/1365) fix(sdk/test-utils): serialize `undefined` as `undefined` ([@pa3](https://github.com/pa3))

#### 🖥 Type: Website

- [#1364](https://github.com/commercetools/merchant-center-application-kit/pull/1364) chore(website): update MC architecture diagrams ([@emmenko](https://github.com/emmenko))

#### 🤖 Type: Dependencies

- `actions-global`, `application-components`, `application-shell-connectors`, `application-shell`, `babel-preset-mc-app`, `i18n`, `jest-preset-mc-app`, `l10n`, `mc-scripts`, `permissions`, `react-notifications`, `sdk`, `sentry`
  - [#1372](https://github.com/commercetools/merchant-center-application-kit/pull/1372) chore(deps): lock file maintenance all dependencies ([@renovate[bot]](https://github.com/apps/renovate))
- `application-shell`, `mc-http-server`
  - [#1366](https://github.com/commercetools/merchant-center-application-kit/pull/1366) chore: update flopflip and promster ([@tdeekens](https://github.com/tdeekens))
- `actions-global`, `application-shell-connectors`, `application-shell`, `jest-preset-mc-app`, `jest-stylelint-runner`, `l10n`, `mc-scripts`, `react-notifications`, `sdk`, `sentry`
  - [#1360](https://github.com/commercetools/merchant-center-application-kit/pull/1360) chore(deps): lock file maintenance all dependencies ([@renovate[bot]](https://github.com/apps/renovate))

## [16.3.2](https://github.com/commercetools/merchant-center-application-kit/compare/v16.3.1...v16.3.2) (2020-02-24)

#### 🐛 Type: Bug

- `mc-scripts`
  - [#1362](https://github.com/commercetools/merchant-center-application-kit/pull/1362) fix(mc-scripts): remove noop service worker middleware from webpack dev server ([@emmenko](https://github.com/emmenko))

#### 🖥 Type: Website

- [#1357](https://github.com/commercetools/merchant-center-application-kit/pull/1357) chore(website): update to theme 1.8.1 ([@emmenko](https://github.com/emmenko))

## [16.3.1](https://github.com/commercetools/merchant-center-application-kit/compare/v16.3.0...v16.3.1) (2020-02-21)

#### 🐛 Type: Bug

- `application-shell`
  - [#1355](https://github.com/commercetools/merchant-center-application-kit/pull/1355) fix(app-shell): token refetch triggerd by requests from settings service ([@tdeekens](https://github.com/tdeekens))

#### 🖥 Type: Website

- `application-shell-connectors`, `jest-preset-mc-app`, `mc-scripts`
  - [#1349](https://github.com/commercetools/merchant-center-application-kit/pull/1349) docs: add deployment example for ZEIT Now v2, restructure other examples. ([@emmenko](https://github.com/emmenko))

## [16.3.0](https://github.com/commercetools/merchant-center-application-kit/compare/v16.2.2...v16.3.0) (2020-02-20)

#### 🐛 Type: Bug

- `create-mc-app`
  - [#1353](https://github.com/commercetools/merchant-center-application-kit/pull/1353) fix(create-mc-app): yarn binary check to not throw ([@emmenko](https://github.com/emmenko))
- `actions-global`
  - [#1335](https://github.com/commercetools/merchant-center-application-kit/pull/1335) fix(actions-global): method signature of useOnActionError ([@pa3](https://github.com/pa3))

#### 🚀 Type: New Feature

- `mc-html-template`
  - [#1348](https://github.com/commercetools/merchant-center-application-kit/pull/1348) feat(headers/csp): whitelist bucket for asia cloud region ([@adnasa](https://github.com/adnasa))

#### 🖥 Type: Website

- [#1351](https://github.com/commercetools/merchant-center-application-kit/pull/1351) docs(website): list legacy hostnames ([@emmenko](https://github.com/emmenko))
- [#1346](https://github.com/commercetools/merchant-center-application-kit/pull/1346) docs(website): improve docs around csp and cloud regions ([@emmenko](https://github.com/emmenko))
- [#1350](https://github.com/commercetools/merchant-center-application-kit/pull/1350) chore(website): update to theme 1.8.0 ([@emmenko](https://github.com/emmenko))
- [#1344](https://github.com/commercetools/merchant-center-application-kit/pull/1344) chore(website): update to theme 1.7.7 ([@emmenko](https://github.com/emmenko))

#### 🤖 Type: Dependencies

- `application-shell`, `mc-html-template`
  - [#1341](https://github.com/commercetools/merchant-center-application-kit/pull/1341) fix(deps): update all dependencies (major) ([@renovate[bot]](https://github.com/apps/renovate))
- `application-shell-connectors`, `application-shell`, `jest-preset-mc-app`, `mc-scripts`
  - [#1342](https://github.com/commercetools/merchant-center-application-kit/pull/1342) chore(deps): lock file maintenance all dependencies ([@renovate[bot]](https://github.com/apps/renovate))

## [16.2.2](https://github.com/commercetools/merchant-center-application-kit/compare/v16.2.1...v16.2.2) (2020-02-13)

#### ✍️ Type: Documentation

- [#1333](https://github.com/commercetools/merchant-center-application-kit/pull/1333) docs: testing.mdx ([@rudavko](https://github.com/rudavko))

#### 🤖 Type: Dependencies

- `application-shell-connectors`, `application-shell`, `create-mc-app`, `mc-scripts`
  - [#1337](https://github.com/commercetools/merchant-center-application-kit/pull/1337) chore: update lockfile (update minor things) ([@tdeekens](https://github.com/tdeekens))
- `application-shell`, `mc-http-server`
  - [#1332](https://github.com/commercetools/merchant-center-application-kit/pull/1332) chore: update flopflip and promster ([@tdeekens](https://github.com/tdeekens))

## [16.2.1](https://github.com/commercetools/merchant-center-application-kit/compare/v16.1.0...v16.2.1) (2020-02-11)

#### 🐛 Type: Bug

- `application-shell`
  - [#1323](https://github.com/commercetools/merchant-center-application-kit/pull/1323) fix(tracking): infinite loop in getHierarchy ([@ahmehri](https://github.com/ahmehri))

#### 🔮 Type: Chore

- `application-shell`, `sdk`
  - [#1322](https://github.com/commercetools/merchant-center-application-kit/pull/1322) refactor(app-shell): sdk and apollo to fallback to build `mcApiUrl` from origin ([@tdeekens](https://github.com/tdeekens))
- Other
  - [#1321](https://github.com/commercetools/merchant-center-application-kit/pull/1321) fix(actions): check out with depth 50 to allow proper canary versions on master branch ([@emmenko](https://github.com/emmenko))
  - [#1319](https://github.com/commercetools/merchant-center-application-kit/pull/1319) fix: publish canary only if lerna detects that packages changed ([@emmenko](https://github.com/emmenko))
  - [#1318](https://github.com/commercetools/merchant-center-application-kit/pull/1318) chore(actions): skip workflow if CHANGELOG file changed ([@emmenko](https://github.com/emmenko))

#### 💅 Type: Enhancement

- `application-shell`, `sdk`
  - [#1327](https://github.com/commercetools/merchant-center-application-kit/pull/1327) chore: add skipping of mc api url inferring process ([@tdeekens](https://github.com/tdeekens))

#### 🖥 Type: Website

- [#1317](https://github.com/commercetools/merchant-center-application-kit/pull/1317) chore: update docs-kit to 1.7.6 ([@emmenko](https://github.com/emmenko))

#### 🤖 Type: Dependencies

- `application-shell`
  - [#1328](https://github.com/commercetools/merchant-center-application-kit/pull/1328) chore: update flopflip ([@tdeekens](https://github.com/tdeekens))
- `actions-global`, `application-components`, `application-shell-connectors`, `application-shell`, `babel-preset-mc-app`, `browser-history`, `create-mc-app`, `i18n`, `jest-preset-mc-app`, `l10n`, `mc-http-server`, `mc-scripts`, `notifications`, `permissions`, `react-notifications`, `sentry`, `url-utils`
  - [#1324](https://github.com/commercetools/merchant-center-application-kit/pull/1324) chore: update deps 💣 ([@tdeekens](https://github.com/tdeekens))
- Other
  - [#1325](https://github.com/commercetools/merchant-center-application-kit/pull/1325) chore: update cypress to v4 ([@tdeekens](https://github.com/tdeekens))

## 16.2.0 (2020-02-11)

Please refer to `16.2.1` for this release. We ran into publishing issues with NPM during the release of `16.2.0`.

## [16.1.0](https://github.com/commercetools/merchant-center-application-kit/compare/v16.0.2...v16.1.0) (2020-02-06)

#### 🐛 Type: Bug

- `application-shell`
  - [#1314](https://github.com/commercetools/merchant-center-application-kit/pull/1314) fix(application-menu): pass `useFullRedirectsForLinks` to ApplicationMenu ([@islam3zzat](https://github.com/islam3zzat))

#### ✍️ Type: Documentation

- [#1292](https://github.com/commercetools/merchant-center-application-kit/pull/1292) docs(website): add first draft of user permissions ([@tdeekens](https://github.com/tdeekens))

#### 💅 Type: Enhancement

- `create-mc-app`
  - [#1312](https://github.com/commercetools/merchant-center-application-kit/pull/1312) refactor(create-mc-app): to run tasks using listr output ([@emmenko](https://github.com/emmenko))

## [16.0.2](https://github.com/commercetools/merchant-center-application-kit/compare/v16.0.1...v16.0.2) (2020-02-04)

#### 🐛 Type: Bug

- `application-components`, `application-shell`, `react-notifications`
  - [#1306](https://github.com/commercetools/merchant-center-application-kit/pull/1306) [#1308](https://github.com/commercetools/merchant-center-application-kit/pull/1308) fix: use ui-kit packages as dependency with ranged version ([@emmenko](https://github.com/emmenko))
- `create-mc-app`
  - [#1305](https://github.com/commercetools/merchant-center-application-kit/pull/1305) fix(create-mc-app): escape white spaces in project path ([@emmenko](https://github.com/emmenko))
- `application-shell`
  - [#1300](https://github.com/commercetools/merchant-center-application-kit/pull/1300) fix(app-shell): to read project key from url again when location changes ([@emmenko](https://github.com/emmenko))
- `application-shell`, `permissions`
  - [#1294](https://github.com/commercetools/merchant-center-application-kit/pull/1294) fix(permissions): to match inferred data fence (view when manage) ([@tdeekens](https://github.com/tdeekens))

#### 🖥 Type: Website

- [#1302](https://github.com/commercetools/merchant-center-application-kit/pull/1302) docs(website): improve documentation around data fetching ([@emmenko](https://github.com/emmenko))
- [#1301](https://github.com/commercetools/merchant-center-application-kit/pull/1301) docs(website): fix title case, add basic info about ui-kit ([@emmenko](https://github.com/emmenko))
- [#1299](https://github.com/commercetools/merchant-center-application-kit/pull/1299) chore(website): update to theme 1.7.5 ([@emmenko](https://github.com/emmenko))
- [#1296](https://github.com/commercetools/merchant-center-application-kit/pull/1296) feat(website): enable search ([@emmenko](https://github.com/emmenko))

## [16.0.1](https://github.com/commercetools/merchant-center-application-kit/compare/v16.0.0...v16.0.1) (2020-01-31)

#### 🐛 Type: Bug

- `application-components`
  - [#1293](https://github.com/commercetools/merchant-center-application-kit/pull/1293) fix(components): explicitly define intl message type, to generate correct prop-types ([@emmenko](https://github.com/emmenko))

## [16.0.0](https://github.com/commercetools/merchant-center-application-kit/compare/v15.9.0...v16.0.0) (2020-01-31)

This release introduces some small **breaking changes**, as documented below.

### Changes in modal page components

The API of the `<FormModalPage>` component changed a bit: the prop `customControls` has been removed in favor of a new component `<CustomFormModalPage>`. This component has a prop `formControls`, which can be used to pass any React component to be rendered as the form controls. Under the hood, the `<FormModalPage>` uses the `<CustomFormModalPage>` with pre-defined form controls: a primary and a secondary button. Those pre-configured buttons are also exposed as static exports from the `<CustomFormModalPage>` component, to be able to reuse them when customizing the form controls.

```js
// previously
<FormModalPage
  // other props
  customControls={<SomeCustomFormControls />}
/>
```

```js
// after
<CustomFormModalPage
  // other props
  formControls={<SomeCustomFormControls />}
/>
```

Additionally, a new prop `hideControls` can be used to hide/show the form controls. This can be useful for example when the form controls only need to be visible based on certain user permissions.

### Changes in `env.json`

The field `applicationName` is now a **required** field.

### Other changes

- The exported component `MeasureFirstPaint` from the `@commercetools-frontend/application-shell` has been removed.

#### 💥 Type: Breaking Change

- `application-shell`
  - [#1280](https://github.com/commercetools/merchant-center-application-kit/pull/1280) refactor: remove MeasureFirstPaint export ([@emmenko](https://github.com/emmenko))
- `application-shell`, `constants`, `mc-html-template`, `sdk`
  - [#1279](https://github.com/commercetools/merchant-center-application-kit/pull/1279) refactor: make applicationName a required field ([@emmenko](https://github.com/emmenko))
- `application-components`
  - [#1269](https://github.com/commercetools/merchant-center-application-kit/pull/1269) feat(components): rework ModalPages to have more controls customization ([@jonnybel](https://github.com/jonnybel))

#### 🔮 Type: Chore

- `actions-global`, `application-components`, `application-shell-connectors`, `application-shell`, `browser-history`, `i18n`, `l10n`, `permissions`, `react-notifications`, `sdk`, `sentry`
  - [#1290](https://github.com/commercetools/merchant-center-application-kit/pull/1290) chore: define needed type declaration deps in each package.json ([@emmenko](https://github.com/emmenko))

#### ✍️ Type: Documentation

- `actions-global`, `application-components`, `application-shell-connectors`, `application-shell`, `assets`, `babel-preset-mc-app`, `browser-history`, `constants`, `create-mc-app`, `eslint-config-mc-app`, `i18n`, `jest-preset-mc-app`, `jest-stylelint-runner`, `l10n`, `mc-dev-authentication`, `mc-html-template`, `mc-http-server`, `mc-scripts`, `notifications`, `permissions`, `react-notifications`, `sdk`, `sentry`, `url-utils`
  - [#1291](https://github.com/commercetools/merchant-center-application-kit/pull/1291) chore: add homepage link and directory to each package.json ([@emmenko](https://github.com/emmenko))
- `application-components`
  - [#1283](https://github.com/commercetools/merchant-center-application-kit/pull/1283) docs(components): improve documentation of static Intl exports ([@emmenko](https://github.com/emmenko))

#### ⛑ Type: Refactoring

- `actions-global`, `application-components`, `application-shell-connectors`, `application-shell`, `browser-history`, `constants`, `i18n`, `permissions`, `react-notifications`, `sdk`, `sentry`
  - [#1069](https://github.com/commercetools/merchant-center-application-kit/pull/1069) refactor(app-shell): migrate to TS ([@emmenko](https://github.com/emmenko))

#### 🖥 Type: Website

- `application-shell`
  - [#1287](https://github.com/commercetools/merchant-center-application-kit/pull/1287) docs(website): document missing things, link READMEs to docs ([@emmenko](https://github.com/emmenko))
- Other
  - [#1288](https://github.com/commercetools/merchant-center-application-kit/pull/1288) refactor(website): pull latest and next releases from repo ([@emmenko](https://github.com/emmenko))
  - [#1285](https://github.com/commercetools/merchant-center-application-kit/pull/1285) fix(website): use noUnderline prop to configure link styles ([@emmenko](https://github.com/emmenko))
- `application-components`
  - [#1278](https://github.com/commercetools/merchant-center-application-kit/pull/1278) docs(website): content wording improvements ([@emmenko](https://github.com/emmenko))

## [15.9.0](https://github.com/commercetools/merchant-center-application-kit/compare/v15.9.0...v15.8.0) (2020-01-23)

#### 🚀 Type: New Feature

- `application-shell`
  - [#1249](https://github.com/commercetools/merchant-center-application-kit/pull/1249) feat: send performance timing values to GTM ([@emmenko](https://github.com/emmenko))

#### 🐛 Type: Bug

- `permissions`

  - [#1259](https://github.com/commercetools/merchant-center-application-kit/pull/1259) fix(permissions): data fences to be overwritten by manage resource permission ([@tdeekens](https://github.com/tdeekens))

Note that in this release we have added log statements whenever we encounter an what we consider an not recommended use of our permission components. The permission components include `RestrictedByPermissions`, `injectAuthorized` and `useIsAuthorized`.

1. We recommend that with any of those components one general permission at a time is evaluated
2. We also recommend not evaluating more than one action right at a time
3. We recommend not to use `shouldMatchSomePermissions` but instead use e.g. `useIsAuthorized` twice and composing the boolean value
4. Implied permission do not need to be passed. For instance `ViewOrders` is implied by `ManageOrders` so only passing `ViewOrders` is sufficient

Examples of non recommended usages are:

```js
const canManageOrViewDiscountCodes = useIsAuthorized({
  demandedPermissions: ['ManageDiscountCodes', 'ViewDiscountCodes'],
});
const canManageOrdersAndCustomers = useIsAuthorized({
  demandedPermissions: ['ManageOrders', 'ManageCustomers'],
});
const canPublishProductsAndEditPrices = useIsAuthorized({
  demandedPermissions: ['ManageOrders', 'ManageProducts'],
  demandedActionRights: [
    {
      group: 'products',
      name: 'PublishProducts',
    },
    {
      group: 'orders',
      name: 'EditPrices',
    },
  ],
});
```

Instead we recommend composing resulting values yourself to keep things clearer

```js
const canManageOrViewDiscountCodes = useIsAuthorized({
  demandedPermissions: ['ViewDiscountCodes'], // -> Removing the implied permission
});
// Splitting these two
const canManageOrders = useIsAuthorized({
  demandedPermissions: ['ManageOrders'],
});
const canManageCustomers = useIsAuthorized({
  demandedPermissions: ['ManageCustomers'],
});
const canPublishProducts = useIsAuthorized({
  demandedPermissions: ['ManageProducts'],
  demandedActionRights: [
    {
      group: 'products',
      name: 'PublishProducts',
    },
  ],
});
const canEditPrices = useIsAuthorized({
  demandedPermissions: ['ManageOrders'],
  demandedActionRights: [
    {
      group: 'orders',
      name: 'EditPrices',
    },
  ],
});

const canManageOrdersAndCustomers = canManageOrders || canManageCustomers;
const canPublishProductsAndEditPrices = canPublishProducts && canEditPrices;
```

#### ⛑ Type: Refactoring

- `application-components`, `application-shell`, `permissions`
  - [#1260](https://github.com/commercetools/merchant-center-application-kit/pull/1260) refactor(app-shell): deprecate MeasureFirstPaint ([@emmenko](https://github.com/emmenko))

#### ✍️ Type: Documentation

- [#1205](https://github.com/commercetools/merchant-center-application-kit/pull/1205) docs(website): support policy ([@emmenko](https://github.com/emmenko))

#### 🔮 Type: Chore

- `babel-preset-mc-app`, `jest-preset-mc-app`, `permissions`
  - [#1261](https://github.com/commercetools/merchant-center-application-kit/pull/1261) chore(permissions): add warnings to propose improvements ([@tdeekens](https://github.com/tdeekens))
- `application-shell`, `permissions`, `sdk`
  - [#1267](https://github.com/commercetools/merchant-center-application-kit/pull/1267) refactor: fix and improve docs and usage of permissions ([@tdeekens](https://github.com/tdeekens))
- Other
  - [#1262](https://github.com/commercetools/merchant-center-application-kit/pull/1262) chore: ignore .vscode/settings.json, add recommended.code-workspace ([@emmenko](https://github.com/emmenko))

#### 🤖 Type: Dependencies

- `sdk`
  - [#1274](https://github.com/commercetools/merchant-center-application-kit/pull/1274) fix(deps): update all dependencies ([@renovate[bot]](https://github.com/apps/renovate))
- `jest-preset-mc-app`
  - [#1275](https://github.com/commercetools/merchant-center-application-kit/pull/1275) chore(deps): update all dependencies (major) ([@renovate[bot]](https://github.com/apps/renovate))
- `jest-preset-mc-app`, `mc-scripts`, `sdk`
  - [#1263](https://github.com/commercetools/merchant-center-application-kit/pull/1263) chore: update jest ([@tdeekens](https://github.com/tdeekens))

#### 🖥 Type: Website

- [#1270](https://github.com/commercetools/merchant-center-application-kit/pull/1270) feat(website): to use new top menu and footer ([@emmenko](https://github.com/emmenko))
- [#1205](https://github.com/commercetools/merchant-center-application-kit/pull/1205) docs(website): support policy ([@emmenko](https://github.com/emmenko))

## [15.8.0](https://github.com/commercetools/merchant-center-application-kit/compare/v15.7.0...v15.8.0) (2020-01-21)

#### 🔮 Type: Chore

- `babel-preset-mc-app`
  - [#1254](https://github.com/commercetools/merchant-center-application-kit/pull/1254) fix(babel-preset-mc-app): remove uncalled-for plugins ([@tdeekens](https://github.com/tdeekens))

#### 💅 Type: Enhancement

- `application-shell-connectors`, `application-shell`, `permissions`
  - [#1241](https://github.com/commercetools/merchant-center-application-kit/pull/1241) feat(app-shell): add launchdarkly tracking subgroup ([@tdeekens](https://github.com/tdeekens))

#### 🚀 Type: New Feature

- `sdk`
  - [#1250](https://github.com/commercetools/merchant-center-application-kit/pull/1250) feat(sdk): add useAsyncDispatch for resolving async sdk actions (static types) ([@emmenko](https://github.com/emmenko))

#### 🖥 Type: Website

- [#1245](https://github.com/commercetools/merchant-center-application-kit/pull/1245) refactor(website): improve landing page ([@emmenko](https://github.com/emmenko))
- [#1244](https://github.com/commercetools/merchant-center-application-kit/pull/1244) refactor(website): layout for landing page to latest designs ([@emmenko](https://github.com/emmenko))

#### 🤖 Type: Dependencies

- `jest-preset-mc-app`, `mc-http-server`
  - [#1252](https://github.com/commercetools/merchant-center-application-kit/pull/1252) fix(deps): update all dependencies (major) ([@renovate[bot]](https://github.com/apps/renovate))
- Other
  - [#1253](https://github.com/commercetools/merchant-center-application-kit/pull/1253) chore(deps): lock file maintenance ([@renovate[bot]](https://github.com/apps/renovate))
- `actions-global`, `application-components`, `application-shell-connectors`, `application-shell`, `babel-preset-mc-app`, `browser-history`, `i18n`, `jest-preset-mc-app`, `l10n`, `mc-http-server`, `mc-scripts`, `notifications`, `permissions`, `react-notifications`, `sdk`, `sentry`, `url-utils`
  - [#1251](https://github.com/commercetools/merchant-center-application-kit/pull/1251) fix(deps): update all dependencies ([@renovate[bot]](https://github.com/apps/renovate))

## [15.7.0](https://github.com/commercetools/merchant-center-application-kit/compare/v15.6.2...v15.7.0) (2020-01-15)

#### 💅 Type: Enhancement

- `actions-global`
  - [#1240](https://github.com/commercetools/merchant-center-application-kit/pull/1240) feat(actions-global): to add use-on-action-error ([@tdeekens](https://github.com/tdeekens))
  - [#1238](https://github.com/commercetools/merchant-center-application-kit/pull/1238) feat(actions-global): add use-hide-all-page-notifications ([@tdeekens](https://github.com/tdeekens))
- `mc-scripts`
  - [#1232](https://github.com/commercetools/merchant-center-application-kit/pull/1232) refactor(mc-scripts): sync with latest react-scripts ([@emmenko](https://github.com/emmenko))

#### ⛑ Type: Refactoring

- `mc-scripts`
  - [#1242](https://github.com/commercetools/merchant-center-application-kit/pull/1242) fix(mc-scripts): allowing to opt-out of parallel builds ([@tdeekens](https://github.com/tdeekens))

#### 🤖 Type: Dependencies

- Other
  - [#1236](https://github.com/commercetools/merchant-center-application-kit/pull/1236) chore(deps): update dependency stylelint to v13 ([@renovate[bot]](https://github.com/apps/renovate))
  - [#1237](https://github.com/commercetools/merchant-center-application-kit/pull/1237) chore(deps): lock file maintenance ([@renovate[bot]](https://github.com/apps/renovate))
- `actions-global`, `application-components`, `application-shell-connectors`, `application-shell`, `babel-preset-mc-app`, `browser-history`, `i18n`, `jest-preset-mc-app`, `l10n`, `mc-scripts`, `notifications`, `permissions`, `react-notifications`, `sdk`, `sentry`, `url-utils`
  - [#1235](https://github.com/commercetools/merchant-center-application-kit/pull/1235) fix(deps): update all dependencies ([@renovate[bot]](https://github.com/apps/renovate))

## [15.6.2](https://github.com/commercetools/merchant-center-application-kit/compare/v15.6.1...v15.6.2) (2020-01-09)

#### 🐛 Type: Bug

- `application-shell`
  - [#1228](https://github.com/commercetools/merchant-center-application-kit/pull/1228) fix(app-shell): denormalization of action rights ([@tdeekens](https://github.com/tdeekens))

#### ✍️ Type: Documentation

- `l10n`
  - [#1223](https://github.com/commercetools/merchant-center-application-kit/pull/1223) chore: update docs ([@ahmehri](https://github.com/ahmehri))

#### ⛑ Type: Refactoring

- `application-shell`
  - [#1222](https://github.com/commercetools/merchant-center-application-kit/pull/1222) refactor(app-shell): rewrite tests for ProjectDataLocale, use functional components ([@emmenko](https://github.com/emmenko))

#### 🤖 Type: Dependencies

- Other
  - [#1224](https://github.com/commercetools/merchant-center-application-kit/pull/1224) chore(deps): update cypress/base docker tag to v10.18.0 ([@renovate[bot]](https://github.com/apps/renovate))
  - [#1227](https://github.com/commercetools/merchant-center-application-kit/pull/1227) chore(deps): lock file maintenance ([@renovate[bot]](https://github.com/apps/renovate))
- `application-shell`
  - [#1226](https://github.com/commercetools/merchant-center-application-kit/pull/1226) fix(deps): update all dependencies (major) ([@renovate[bot]](https://github.com/apps/renovate))
- `babel-preset-mc-app`, `jest-preset-mc-app`, `jest-stylelint-runner`, `mc-scripts`
  - [#1225](https://github.com/commercetools/merchant-center-application-kit/pull/1225) fix(deps): update all dependencies ([@renovate[bot]](https://github.com/apps/renovate))

## [15.6.1](https://github.com/commercetools/merchant-center-application-kit/compare/v15.6.0...v15.6.1) (2020-01-02)

#### 🐛 Type: Bug

- `application-shell`
  - [#1220](https://github.com/commercetools/merchant-center-application-kit/pull/1220) fix(app-shell): null check ([@emmenko](https://github.com/emmenko))

## [15.6.0](https://github.com/commercetools/merchant-center-application-kit/compare/v15.5.0...v15.6.0) (2020-01-02)

Happy New Year! 🎉

#### 🐛 Type: Bug

- `actions-global`, `application-components`, `application-shell-connectors`, `browser-history`, `constants`, `i18n`, `l10n`, `notifications`, `permissions`, `react-notifications`, `sdk`, `sentry`, `url-utils`
  - [#1215](https://github.com/commercetools/merchant-center-application-kit/pull/1215) fix: building type declarations ([@emmenko](https://github.com/emmenko))
- `application-shell`
  - [#1214](https://github.com/commercetools/merchant-center-application-kit/pull/1214) fix(app-shell): retry unauthenticated requests for graphql errors ([@emmenko](https://github.com/emmenko))
- `mc-dev-authentication`
  - [#1213](https://github.com/commercetools/merchant-center-application-kit/pull/1213) fix(dev-auth): parsing of error responses ([@emmenko](https://github.com/emmenko))
- `application-components`, `application-shell`, `babel-preset-mc-app`, `react-notifications`
  - [#1202](https://github.com/commercetools/merchant-center-application-kit/pull/1202) fix: babel macros with react-intl ([@tdeekens](https://github.com/tdeekens))

#### 🔮 Type: Chore

- [#1198](https://github.com/commercetools/merchant-center-application-kit/pull/1198) chore: check npm authentication on prerelease ([@jonnybel](https://github.com/jonnybel))

#### 🖥 Type: Website

- [#1197](https://github.com/commercetools/merchant-center-application-kit/pull/1197) docs(website): document what a custom app is ([@emmenko](https://github.com/emmenko))

#### 🤖 Type: Dependencies

- `mc-scripts`
  - [#1211](https://github.com/commercetools/merchant-center-application-kit/pull/1211) fix(deps): update all dependencies ([@renovate[bot]](https://github.com/apps/renovate))
  - [#1203](https://github.com/commercetools/merchant-center-application-kit/pull/1203) chore: update yarn and missing deps ([@tdeekens](https://github.com/tdeekens))
- Other
  - [#1212](https://github.com/commercetools/merchant-center-application-kit/pull/1212) chore(deps): lock file maintenance ([@renovate[bot]](https://github.com/apps/renovate))
  - [#1209](https://github.com/commercetools/merchant-center-application-kit/pull/1209) chore(deps): lock file maintenance ([@renovate[bot]](https://github.com/apps/renovate))
  - [#1201](https://github.com/commercetools/merchant-center-application-kit/pull/1201) chore(deps): lock file maintenance ([@renovate[bot]](https://github.com/apps/renovate))
- `application-shell`
  - [#1210](https://github.com/commercetools/merchant-center-application-kit/pull/1210) chore: update flopflip to latest ([@emmenko](https://github.com/emmenko))
- `application-shell`, `mc-scripts`
  - [#1208](https://github.com/commercetools/merchant-center-application-kit/pull/1208) fix(deps): update all dependencies (major) ([@renovate[bot]](https://github.com/apps/renovate))
- `actions-global`, `application-components`, `application-shell-connectors`, `application-shell`, `babel-preset-mc-app`, `browser-history`, `create-mc-app`, `i18n`, `jest-preset-mc-app`, `jest-stylelint-runner`, `l10n`, `mc-scripts`, `notifications`, `permissions`, `react-notifications`, `sdk`, `sentry`, `url-utils`
  - [#1207](https://github.com/commercetools/merchant-center-application-kit/pull/1207) fix(deps): update all dependencies ([@renovate[bot]](https://github.com/apps/renovate))
- `create-mc-app`, `mc-scripts`
  - [#1200](https://github.com/commercetools/merchant-center-application-kit/pull/1200) fix(deps): update all dependencies (major) ([@renovate[bot]](https://github.com/apps/renovate))
- `actions-global`, `application-components`, `application-shell-connectors`, `application-shell`, `babel-preset-mc-app`, `browser-history`, `i18n`, `jest-preset-mc-app`, `jest-stylelint-runner`, `l10n`, `mc-html-template`, `mc-scripts`, `notifications`, `permissions`, `react-notifications`, `sdk`, `sentry`, `url-utils`
  - [#1199](https://github.com/commercetools/merchant-center-application-kit/pull/1199) fix(deps): update all dependencies ([@renovate[bot]](https://github.com/apps/renovate))

## [15.5.0](https://github.com/commercetools/merchant-center-application-kit/compare/v15.4.2...v15.5.0) (2019-12-09)

#### ⛑ Type: Refactoring

- `application-components`, `application-shell`, `i18n`, `jest-stylelint-runner`, `mc-scripts`, `react-notifications`

  - [#1193](https://github.com/commercetools/merchant-center-application-kit/pull/1193) refactor: use uikit single packages ([@emmenko](https://github.com/emmenko))

  Packages that previously required `@commercetools-frontend/ui-kit` as a peer dependency now require peer dependencies of specific uikit packages.

  > If you keep using `@commercetools-frontend/ui-kit` you don't need to change anything. If you start using specific uikit packages though, you need to make sure you have the proper peer dependencies in place. To make it easier to install the required peer dependencies of a package, you can use the [`install-peerdeps`](https://www.npmjs.com/package/install-peerdeps).

  - `application-components`
    - `@commercetools-uikit/design-system`
    - `@commercetools-uikit/constraints`
    - `@commercetools-uikit/primary-button`
    - `@commercetools-uikit/secondary-button`
    - `@commercetools-uikit/secondary-icon-button`
    - `@commercetools-uikit/spacings`
    - `@commercetools-uikit/text`
  - `application-shell`
    - `@commercetools-uikit/avatar`
    - `@commercetools-uikit/design-system`
    - `@commercetools-uikit/flat-button`
    - `@commercetools-uikit/icons`
    - `@commercetools-uikit/loading-spinner`
    - `@commercetools-uikit/select-input`
    - `@commercetools-uikit/spacings`
    - `@commercetools-uikit/text`
  - `i18n`
    - `@commercetools-uikit/i18n`
  - `react-notifications`
    - `@commercetools-uikit/icon-button`
    - `@commercetools-uikit/icons`
    - `@commercetools-uikit/spacings`

#### 🖥 Type: Website

- Other
  - [#1196](https://github.com/commercetools/merchant-center-application-kit/pull/1196) chore(website): update to theme 1.0.0 ([@emmenko](https://github.com/emmenko))
- `application-components`
  - [#1186](https://github.com/commercetools/merchant-center-application-kit/pull/1186) chore: update docs theme canary.60 ([@emmenko](https://github.com/emmenko))

#### 🤖 Type: Dependencies

- `mc-html-template`
  - [#1194](https://github.com/commercetools/merchant-center-application-kit/pull/1194) fix(deps): update dependency serialize-javascript to v2.1.1 [security](<[@renovate[bot]](https://github.com/apps/renovate)>)
- Other
  - [#1191](https://github.com/commercetools/merchant-center-application-kit/pull/1191) chore: update lockfile ([@tdeekens](https://github.com/tdeekens))
- `application-components`, `application-shell`, `babel-preset-mc-app`, `i18n`, `mc-scripts`, `react-notifications`
  - [#1187](https://github.com/commercetools/merchant-center-application-kit/pull/1187) fix(deps): update all dependencies ([@renovate[bot]](https://github.com/apps/renovate))
- `mc-scripts`
  - [#1188](https://github.com/commercetools/merchant-center-application-kit/pull/1188) fix(deps): update all dependencies (major) ([@renovate[bot]](https://github.com/apps/renovate))

## [15.4.2](https://github.com/commercetools/merchant-center-application-kit/compare/v15.4.1...v15.4.2) (2019-11-27)

This release publishes all packages due to an issue with npm during the prior `15.4.1` release.

## [15.4.1](https://github.com/commercetools/merchant-center-application-kit/compare/v15.4.0...v15.4.1) (2019-11-27)

> We recommend using the `15.4.2` release as not all packages within this release managed to be published.

#### 🐛 Type: Bug

- `application-shell`
  - [#1183](https://github.com/commercetools/merchant-center-application-kit/pull/1183) fix(app-shell): portal container height to fix tabbing in modals ([@jonnybel](https://github.com/jonnybel))

#### 🖥 Type: Website

- [#1181](https://github.com/commercetools/merchant-center-application-kit/pull/1181) chore(website): update docs theme to canary.42 ([@emmenko](https://github.com/emmenko))

#### 🤖 Type: Dependencies

- `actions-global`, `application-components`, `application-shell-connectors`, `application-shell`, `babel-preset-mc-app`, `browser-history`, `i18n`, `jest-preset-mc-app`, `jest-stylelint-runner`, `l10n`, `mc-scripts`, `notifications`, `permissions`, `react-notifications`, `sentry`, `url-utils`
  - [#1178](https://github.com/commercetools/merchant-center-application-kit/pull/1178) fix(deps): update all dependencies ([@renovate[bot]](https://github.com/apps/renovate))
- `application-shell`
  - [#1179](https://github.com/commercetools/merchant-center-application-kit/pull/1179) chore(deps): update all dependencies (major) ([@renovate[bot]](https://github.com/apps/renovate))
- Other
  - [#1180](https://github.com/commercetools/merchant-center-application-kit/pull/1180) chore(deps): lock file maintenance ([@renovate[bot]](https://github.com/apps/renovate))

## [15.4.0](https://github.com/commercetools/merchant-center-application-kit/compare/v15.3.9...v15.4.0) (2019-11-22)

#### 🚀 Type: New Feature

- `application-components`, `application-shell`, `i18n`, `l10n`, `mc-scripts`, `react-notifications`
  - [#1176](https://github.com/commercetools/merchant-center-application-kit/pull/1176) feat(i18n): add Japanese (ja) locale support ([@amine-benselim](https://github.com/amine-benselim))

## [15.3.9](https://github.com/commercetools/merchant-center-application-kit/compare/v15.3.8...v15.3.9) (2019-11-20)

#### 💅 Type: Enhancement

- `permissions`
  - [#1173](https://github.com/commercetools/merchant-center-application-kit/pull/1173) refactor: only some subset of demanded DF values should belong to actual DF values ([@amine-benselim](https://github.com/amine-benselim))

## [15.3.8](https://github.com/commercetools/merchant-center-application-kit/compare/v15.3.7...v15.3.8) (2019-11-15)

#### 🐛 Type: Bug

- `application-shell`
  - [#1165](https://github.com/commercetools/merchant-center-application-kit/pull/1165) fix: cannot use rerender with app-kit custom render functions ([@ahmehri](https://github.com/ahmehri))

#### 🖥 Type: Website

- [#1169](https://github.com/commercetools/merchant-center-application-kit/pull/1169) refactor(website): upgrade to theme 1.0.0-canary.28 ([@emmenko](https://github.com/emmenko))

#### 🤖 Type: Dependencies

- `actions-global`, `application-components`, `application-shell-connectors`, `application-shell`, `babel-preset-mc-app`, `i18n`, `jest-preset-mc-app`, `l10n`, `mc-http-server`, `mc-scripts`, `permissions`, `react-notifications`, `sdk`, `sentry`
  - [#1171](https://github.com/commercetools/merchant-center-application-kit/pull/1171) chore: update deps ([@tdeekens](https://github.com/tdeekens))
- Other
  - [#1168](https://github.com/commercetools/merchant-center-application-kit/pull/1168) chore: replace deprecated rollup deps ([@emmenko](https://github.com/emmenko))

## [15.3.7](https://github.com/commercetools/merchant-center-application-kit/compare/v15.3.6...v15.3.7) (2019-11-15)

#### 🐛 Type: Bug

- `permissions`
  - [#1163](https://github.com/commercetools/merchant-center-application-kit/pull/1163) fix the logic of isAuthorized and Authorized ([@amine-benselim](https://github.com/amine-benselim))

#### 🖥 Type: Website

- [#1160](https://github.com/commercetools/merchant-center-application-kit/pull/1160) Update description in cloudfront example ([@torihedden](https://github.com/torihedden))

#### 🌏 Type: Translations

- `i18n`
  - [#1164](https://github.com/commercetools/merchant-center-application-kit/pull/1164) chore(i18n): add missing translation ([@emmenko](https://github.com/emmenko))

## [15.3.6](https://github.com/commercetools/merchant-center-application-kit/compare/v15.3.5...v15.3.6) (2019-11-13)

#### 🖥 Type: Website

- `application-components`
  - [#1138](https://github.com/commercetools/merchant-center-application-kit/pull/1138) New documentation website designs ([@emmenko](https://github.com/emmenko))

#### 🐛 Type: Bug

- `application-shell`
  - [#1161](https://github.com/commercetools/merchant-center-application-kit/pull/1161) fix(app-shell): passing of flag config ([@tdeekens]

## [15.3.5](https://github.com/commercetools/merchant-center-application-kit/compare/v15.3.4...v15.3.5) (2019-11-11)

#### 🐛 Type: Bug

- `application-shell`
  - [#1159](https://github.com/commercetools/merchant-center-application-kit/pull/1157) fix(app-shell): return object with default values ([@tdeekens]

## [15.3.4](https://github.com/commercetools/merchant-center-application-kit/compare/v15.3.3...v15.3.4) (2019-11-11)

#### 🐛 Type: Bug

- `application-shell`
  - [#1157](https://github.com/commercetools/merchant-center-application-kit/pull/1157) fix(app-shell): falling back to default ([@tdeekens](https://github.com/tdeekens))
  - [#1153](https://github.com/commercetools/merchant-center-application-kit/pull/1153) feat(app-shell): to use all feature toggles query ([@tdeekens](https://github.com/tdeekens))

#### 🔮 Type: Chore

- `jest-preset-mc-app`
  - [#1149](https://github.com/commercetools/merchant-center-application-kit/pull/1149) test(setup-tests): ignore CellMeasurerCach warning ([@ahmehri](https://github.com/ahmehri))
- Other
  - [#1150](https://github.com/commercetools/merchant-center-application-kit/pull/1150) chore: bump to node 12 ([@tdeekens](https://github.com/tdeekens))

#### 🤖 Type: Dependencies

- `actions-global`, `application-components`, `application-shell-connectors`, `application-shell`, `babel-preset-mc-app`, `browser-history`, `constants`, `i18n`, `jest-preset-mc-app`, `l10n`, `mc-http-server`, `mc-scripts`, `notifications`, `permissions`, `react-notifications`, `sdk`, `sentry`, `url-utils`
  - [#1154](https://github.com/commercetools/merchant-center-application-kit/pull/1154) fix(deps): update all dependencies ([@renovate[bot]](https://github.com/apps/renovate))
- `l10n`
  - [#1155](https://github.com/commercetools/merchant-center-application-kit/pull/1155) chore(deps): update all dependencies (major) ([@renovate[bot]](https://github.com/apps/renovate))

## [15.3.3](https://github.com/commercetools/merchant-center-application-kit/compare/v15.3.2...v15.3.3) (2019-11-05)

#### 🐛 Type: Bug

- `application-shell`
  - [#1147](https://github.com/commercetools/merchant-center-application-kit/pull/1147) fix(app-shell): to merge internal feature flags with provided ones ([@emmenko](https://github.com/emmenko))

#### 🤖 Type: Dependencies

- `application-components`, `application-shell`, `mc-scripts`
  - [#1143](https://github.com/commercetools/merchant-center-application-kit/pull/1143) fix(deps): update all dependencies (major) ([@renovate[bot]](https://github.com/apps/renovate))
- `application-components`, `application-shell-connectors`, `application-shell`, `i18n`, `jest-preset-mc-app`, `mc-http-server`, `mc-scripts`, `react-notifications`
  - [#1142](https://github.com/commercetools/merchant-center-application-kit/pull/1142) fix(deps): update all dependencies ([@renovate[bot]](https://github.com/apps/renovate))

## [15.3.2](https://github.com/commercetools/merchant-center-application-kit/compare/v15.3.1...v15.3.2) (2019-11-01)

#### 🔮 Type: Chore

- `application-shell`
  - [#1139](https://github.com/commercetools/merchant-center-application-kit/pull/1139) chore(app-shell): add logging to tracking ([@tdeekens](https://github.com/tdeekens))

#### 🤖 Type: Dependencies

- `application-components`, `application-shell-connectors`, `application-shell`, `babel-preset-mc-app`, `jest-preset-mc-app`, `mc-http-server`, `mc-scripts`, `react-notifications`
  - [#1140](https://github.com/commercetools/merchant-center-application-kit/pull/1140) chore: update deps ([@tdeekens](https://github.com/tdeekens))

## [15.3.1](https://github.com/commercetools/merchant-center-application-kit/compare/v15.3.0...v15.3.1) (2019-10-30)

#### 🐛 Type: Bug

- `application-shell`
  - [#1136](https://github.com/commercetools/merchant-center-application-kit/pull/1136) fix(app-shell): how metric is read ([@tdeekens](https://github.com/tdeekens))

## [15.3.0](https://github.com/commercetools/merchant-center-application-kit/compare/v15.2.3...v15.3.0) (2019-10-30)

#### 🐛 Type: Bug

- `application-shell`
  - [#1134](https://github.com/commercetools/merchant-center-application-kit/pull/1134) fix: remove first input delay ([@tdeekens](https://github.com/tdeekens))

#### 💅 Type: Enhancement

- `i18n`
  - [#1124](https://github.com/commercetools/merchant-center-application-kit/pull/1124) PCM-1473: add revert message to Form Modal button messages ([@vidurar](https://github.com/vidurar))

#### ⛑ Type: Refactoring

- `application-components`, `i18n`
  - [#1130](https://github.com/commercetools/merchant-center-application-kit/pull/1130) refactor(components): use common messages from i18n package ([@emmenko](https://github.com/emmenko))

#### 🤖 Type: Dependencies

- `application-shell`, `eslint-config-mc-app`, `sentry`
  - [#1121](https://github.com/commercetools/merchant-center-application-kit/pull/1121) chore(deps): update all dependencies (major) ([@renovate[bot]](https://github.com/apps/renovate))
- `application-components`, `application-shell`, `babel-preset-mc-app`, `i18n`, `jest-preset-mc-app`, `jest-stylelint-runner`, `l10n`, `mc-scripts`, `react-notifications`, `sentry`
  - [#1120](https://github.com/commercetools/merchant-center-application-kit/pull/1120) chore(deps): update all dependencies ([@renovate[bot]](https://github.com/apps/renovate))

## [15.2.3](https://github.com/commercetools/merchant-center-application-kit/compare/v15.2.2...v15.2.3) (2019-10-28)

#### 🔮 Type: Chore

- `mc-http-server`
  - [#1119](https://github.com/commercetools/merchant-center-application-kit/pull/1119) chore(mc-http-server): remove duplicate prom metric ([@tdeekens](https://github.com/tdeekens))

## [15.2.2](https://github.com/commercetools/merchant-center-application-kit/compare/v15.2.1...v15.2.2) (2019-10-24)

#### 🔮 Type: Chore

- `mc-http-server`
  - [#1116](https://github.com/commercetools/merchant-center-application-kit/pull/1116) chore(mc-http-server): to expose prefixed metric ([@tdeekens](https://github.com/tdeekens))

#### ⛑ Type: Refactoring

- `mc-http-server`
  - [#1117](https://github.com/commercetools/merchant-center-application-kit/pull/1117) refactor(mc-http-server): startup logic ([@tdeekens](https://github.com/tdeekens))

## [15.2.1](https://github.com/commercetools/merchant-center-application-kit/compare/v15.2.0...v15.2.1) (2019-10-23)

#### 🤖 Type: Dependencies

- `actions-global`, `application-components`, `application-shell-connectors`, `application-shell`, `babel-preset-mc-app`, `i18n`, `l10n`, `mc-http-server`, `mc-scripts`, `permissions`, `react-notifications`, `sdk`, `sentry`
  - [#1114](https://github.com/commercetools/merchant-center-application-kit/pull/1114) chore: update deps ([@tdeekens](https://github.com/tdeekens))
- `application-shell`
  - [#1113](https://github.com/commercetools/merchant-center-application-kit/pull/1113) chore: update flopflip ([@tdeekens](https://github.com/tdeekens))

## [15.2.0](https://github.com/commercetools/merchant-center-application-kit/compare/v15.1.8...v15.2.0) (2019-10-22)

#### 🚀 Type: New Feature

- `application-shell-connectors`
  - [#1108](https://github.com/commercetools/merchant-center-application-kit/pull/1108) feat(app-connectors): expose mock functions for image-regex settings as test-utils ([@emmenko](https://github.com/emmenko))

In case your are testing a part of the UI that utilises the `project-extension-image-regex` connector, you might need to mock the GraphQL request with Apollo. To facilitate this, we expose some `test-utils` from the `@commercetools-frontend/application-shell-connectors` package.

Below is an example of how to use them:

```jsx
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import {
  createFetchProjectExtensionImageRegexMock,
  createGraphqlResponseForProjectExtensionImageRegexQuery,
} from '@commercetools-frontend/application-shell-connectors/test-utils';
import { renderApp } from '@commercetools-frontend/application-shell/test-utils';

describe('rendering', () => {
  it('should render view with images', async () => {
    const rendered = renderApp(<App />, {
      mocks: [
        createFetchProjectExtensionImageRegexMock(),
        // ...other mocks
      ],
    });
    await waitForElement(() => rendered.getByText('...'));
    // ...
  });
  it('should render view without images', async () => {
    const rendered = renderApp(<App />, {
      mocks: [
        createFetchProjectExtensionImageRegexMock({
          result: {
            data: createGraphqlResponseForProjectExtensionImageRegexQuery({
              projectExtension: {
                __typename: 'ProjectExtension',
                id: 'project-extension-id',
                imageRegex: undefined,
              },
            }),
          },
        }),
        // ...other mocks
      ],
    });
    await waitForElement(() => rendered.getByText('...'));
    // ...
  });
});
```

## [15.1.8](https://github.com/commercetools/merchant-center-application-kit/compare/v15.1.7...v15.1.8) (2019-10-22)

#### 🐛 Type: Bug

- `permissions`
  - [#1109](https://github.com/commercetools/merchant-center-application-kit/pull/1109) fix(permissions/has-permissions): use `hasExactPermission` in `hasAppliedDataFences` ([@adnasa](https://github.com/adnasa))

#### 🔮 Type: Chore

- `i18n`
  - [#1093](https://github.com/commercetools/merchant-center-application-kit/pull/1093) Translate '/packages/i18n/data/core.json' in 'fr_FR' ([@transifex-integration[bot]](https://github.com/apps/transifex-integration))
  - [#1094](https://github.com/commercetools/merchant-center-application-kit/pull/1094) Translate '/packages/i18n/data/core.json' in 'de' ([@transifex-integration[bot]](https://github.com/apps/transifex-integration))

#### 🚀 Type: New Feature

- `permissions`
  - [#1102](https://github.com/commercetools/merchant-center-application-kit/pull/1102) feat(permissions): allow appliedPermission with Manage to bypass dataFence ([@adnasa](https://github.com/adnasa))
- `i18n`
  - [#1097](https://github.com/commercetools/merchant-center-application-kit/pull/1097) feat(i18n): expose some common messages ([@emmenko](https://github.com/emmenko))

#### ⛑ Type: Refactoring

- `application-shell-connectors`
  - [#1084](https://github.com/commercetools/merchant-center-application-kit/pull/1084) refactor(app-context): restructure tests to RTL ([@emmenko](https://github.com/emmenko))
- `application-shell`
  - [#1091](https://github.com/commercetools/merchant-center-application-kit/pull/1091) fix(app-shell): use first input delay ([@tdeekens](https://github.com/tdeekens))

#### 🤖 Type: Dependencies

- `application-shell`, `jest-preset-mc-app`, `l10n`
  - [#1105](https://github.com/commercetools/merchant-center-application-kit/pull/1105) chore(deps): update all dependencies (major) ([@renovate[bot]](https://github.com/apps/renovate))
- Other
  - [#1106](https://github.com/commercetools/merchant-center-application-kit/pull/1106) chore(deps): lock file maintenance ([@renovate[bot]](https://github.com/apps/renovate))
  - [#1090](https://github.com/commercetools/merchant-center-application-kit/pull/1090) chore(deps): lock file maintenance ([@renovate[bot]](https://github.com/apps/renovate))
- `application-components`, `application-shell-connectors`, `application-shell`, `babel-preset-mc-app`, `i18n`, `jest-preset-mc-app`, `l10n`, `mc-http-server`, `mc-scripts`, `react-notifications`, `sdk`, `sentry`
  - [#1104](https://github.com/commercetools/merchant-center-application-kit/pull/1104) chore(deps): update all dependencies ([@renovate[bot]](https://github.com/apps/renovate))
- `application-shell`
  - [#1107](https://github.com/commercetools/merchant-center-application-kit/pull/1107) chore(app-shell): update flopflip to allow passing `featureFlags` ([@tdeekens](https://github.com/tdeekens))
- `application-components`, `react-notifications`, `sdk`
  - [#1089](https://github.com/commercetools/merchant-center-application-kit/pull/1089) fix(deps): update all dependencies (major) ([@renovate[bot]](https://github.com/apps/renovate))
- `eslint-plugin-testing-library-react`
  - [#1098](https://github.com/commercetools/merchant-center-application-kit/pull/1098) refactor: drop custom eslint plugin for rtl ([@emmenko](https://github.com/emmenko))
- `application-components`, `application-shell`, `babel-preset-mc-app`, `i18n`, `mc-scripts`, `react-notifications`, `sdk`
  - [#1088](https://github.com/commercetools/merchant-center-application-kit/pull/1088) fix(deps): update all dependencies ([@renovate[bot]](https://github.com/apps/renovate))

## [15.1.7](https://github.com/commercetools/merchant-center-application-kit/compare/v15.1.6...v15.1.7) (2019-10-11)

#### 🐛 Type: Bug

- `application-shell`
  - [#1080](https://github.com/commercetools/merchant-center-application-kit/pull/1080) data locale should be one of the project languages ([@amine-benselim](https://github.com/amine-benselim))
- `application-components`
  - [#1079](https://github.com/commercetools/merchant-center-application-kit/pull/1079) fix: modal page header title spacing ([@jonnybel](https://github.com/jonnybel))

#### 🤖 Type: Dependencies

- `actions-global`, `application-components`, `application-shell-connectors`, `application-shell`, `babel-preset-mc-app`, `browser-history`, `create-mc-app`, `eslint-plugin-testing-library-react`, `i18n`, `jest-preset-mc-app`, `l10n`, `mc-html-template`, `mc-scripts`, `notifications`, `permissions`, `react-notifications`, `sentry`, `url-utils`
  - [#1085](https://github.com/commercetools/merchant-center-application-kit/pull/1085) chore: update deps ([@tdeekens](https://github.com/tdeekens))
- Other
  - [#1083](https://github.com/commercetools/merchant-center-application-kit/pull/1083) chore: regenerate lockfile ([@tdeekens](https://github.com/tdeekens))
- `application-shell`, `eslint-plugin-testing-library-react`, `sentry`
  - [#1054](https://github.com/commercetools/merchant-center-application-kit/pull/1054) chore(deps): update all dependencies (major) ([@renovate[bot]](https://github.com/apps/renovate))
- `actions-global`, `application-components`, `application-shell-connectors`, `application-shell`, `i18n`, `jest-preset-mc-app`, `l10n`, `mc-scripts`, `permissions`, `react-notifications`, `sdk`, `sentry`
  - [#1077](https://github.com/commercetools/merchant-center-application-kit/pull/1077) chore(deps): update all dependencies ([@renovate[bot]](https://github.com/apps/renovate))

## [15.1.6](https://github.com/commercetools/merchant-center-application-kit/compare/v15.1.5...v15.1.6) (2019-09-24)

#### 🐛 Type: Bug

- `mc-scripts`
  - [#1066](https://github.com/commercetools/merchant-center-application-kit/pull/1066) fix(mc-scripts): to read headers path ([@emmenko](https://github.com/emmenko))
- `application-shell`
  - [#1063](https://github.com/commercetools/merchant-center-application-kit/pull/1063) fix(app-shell): apollo header link to omit empty headers ([@tdeekens](https://github.com/tdeekens))

#### 🔮 Type: Chore

- `application-shell-connectors`, `application-shell`
  - [#1062](https://github.com/commercetools/merchant-center-application-kit/pull/1062) feat: generate TS types for graphql schemas ([@emmenko](https://github.com/emmenko))

#### ⛑ Type: Refactoring

- `application-shell-connectors`, `application-shell`, `permissions`
  - [#1064](https://github.com/commercetools/merchant-center-application-kit/pull/1064) refactor(app-context): to derive provider types from generated query types ([@emmenko](https://github.com/emmenko))

#### 🖥 Type: Website

- [#1067](https://github.com/commercetools/merchant-center-application-kit/pull/1067) docs(website): fix malformed hyphens ([@emmenko](https://github.com/emmenko))

#### 🤖 Type: Dependencies

- `actions-global`, `application-components`, `application-shell-connectors`, `application-shell`, `babel-preset-mc-app`, `browser-history`, `eslint-plugin-testing-library-react`, `i18n`, `jest-preset-mc-app`, `l10n`, `mc-scripts`, `notifications`, `permissions`, `react-notifications`, `sentry`, `url-utils`
  - [#1070](https://github.com/commercetools/merchant-center-application-kit/pull/1070) chore(deps): update all dependencies ([@renovate[bot]](https://github.com/apps/renovate))

## [15.1.5](https://github.com/commercetools/merchant-center-application-kit/compare/v15.1.4...v15.1.5) (2019-09-17)

#### 🐛 Type: Bug

- `application-shell`
  - [#1057](https://github.com/commercetools/merchant-center-application-kit/pull/1057) fix(app-shell): sanitize correlation id parts ([@pa3](https://github.com/pa3))

#### 🤖 Type: Dependencies

- `application-components`, `application-shell-connectors`, `application-shell`, `browser-history`, `i18n`, `jest-preset-mc-app`, `mc-scripts`, `react-notifications`, `sdk`
  - [#1053](https://github.com/commercetools/merchant-center-application-kit/pull/1053) chore(deps): update all dependencies ([@renovate[bot]](https://github.com/apps/renovate))
- Other
  - [#1058](https://github.com/commercetools/merchant-center-application-kit/pull/1058) fix: exclude package names causing issues ([@tdeekens](https://github.com/tdeekens))
  - [#1055](https://github.com/commercetools/merchant-center-application-kit/pull/1055) chore(deps): lock file maintenance ([@renovate[bot]](https://github.com/apps/renovate))

## [15.1.4](https://github.com/commercetools/merchant-center-application-kit/compare/v15.1.3...v15.1.4) (2019-09-11)

#### 🐛 Type: Bug

- `application-shell-connectors`, `permissions`
  - [#1049](https://github.com/commercetools/merchant-center-application-kit/pull/1049) fix: to avoid using Mapped Types as babel plugin does not properly generate prop-types ([@emmenko](https://github.com/emmenko))
- `mc-html-template`
  - [#1045](https://github.com/commercetools/merchant-center-application-kit/pull/1045) fix(csp): to whitelist sentry.io in connect-src ([@emmenko](https://github.com/emmenko))

#### 🔮 Type: Chore

- `i18n`, `permissions`
  - [#1047](https://github.com/commercetools/merchant-center-application-kit/pull/1047) chore: improve ts setup for discovering types ([@emmenko](https://github.com/emmenko))

#### 💅 Type: Enhancement

- `application-shell-connectors`, `application-shell`
  - [#1048](https://github.com/commercetools/merchant-center-application-kit/pull/1048) feat: validate graphql files using eslint and schema introspection ([@emmenko](https://github.com/emmenko))

#### ⛑ Type: Refactoring

- `application-shell`
  - [#1038](https://github.com/commercetools/merchant-center-application-kit/pull/1038) refactor(app-shell): do not fetch unused fields for project query ([@emmenko](https://github.com/emmenko))

#### 🤖 Type: Dependencies

- `eslint-config-mc-app`, `jest-preset-mc-app`, `mc-html-template`, `mc-scripts`, `sentry`
  - [#1040](https://github.com/commercetools/merchant-center-application-kit/pull/1040) chore(deps): update all dependencies (major) ([@renovate[bot]](https://github.com/apps/renovate))
- `actions-global`, `application-components`, `application-shell-connectors`, `application-shell`, `babel-preset-mc-app`, `browser-history`, `eslint-plugin-testing-library-react`, `i18n`, `jest-preset-mc-app`, `jest-stylelint-runner`, `l10n`, `mc-html-template`, `mc-scripts`, `notifications`, `permissions`, `react-notifications`, `sentry`, `url-utils`
  - [#1039](https://github.com/commercetools/merchant-center-application-kit/pull/1039) fix(deps): update all dependencies ([@renovate[bot]](https://github.com/apps/renovate))
- `application-components`, `application-shell`, `i18n`, `jest-preset-mc-app`, `mc-scripts`, `permissions`, `react-notifications`
  - [#1034](https://github.com/commercetools/merchant-center-application-kit/pull/1034) chore: update ts-eslint to v2 ([@emmenko](https://github.com/emmenko))

## [15.1.3](https://github.com/commercetools/merchant-center-application-kit/compare/v15.1.2...v15.1.3) (2019-09-05)

#### 🐛 Type: Bug

- `application-shell`
  - [#1036](https://github.com/commercetools/merchant-center-application-kit/pull/1036) fix(app-shell): fetch policy on AmILoggedIn ([@tdeekens](https://github.com/tdeekens))
- `l10n`
  - [#1033](https://github.com/commercetools/merchant-center-application-kit/pull/1033) Remove unsupported countries ([@islam3zzat](https://github.com/islam3zzat))

#### 🖥 Type: Website

- [#1035](https://github.com/commercetools/merchant-center-application-kit/pull/1035) Try to improve Netlify build time for website ([@emmenko](https://github.com/emmenko))

## [15.1.2](https://github.com/commercetools/merchant-center-application-kit/compare/v15.1.1...v15.1.2) (2019-09-03)

#### 🐛 Type: Bug

- `application-shell`
  - [#1031](https://github.com/commercetools/merchant-center-application-kit/pull/1031) fix(app-shell): use default cache-first fetch policy for user account menu ([@emmenko](https://github.com/emmenko))

## [15.1.1](https://github.com/commercetools/merchant-center-application-kit/compare/v15.1.0...v15.1.1) (2019-09-03)

#### 🐛 Type: Bug

- `mc-html-template`
  - [#1029](https://github.com/commercetools/merchant-center-application-kit/pull/1029) fix(mc-html-template): to load headers not from csp ([@tdeekens](https://github.com/tdeekens))

## [15.1.0](https://github.com/commercetools/merchant-center-application-kit/compare/v15.0.0...v15.1.0) (2019-09-02)

#### 🐛 Type: Bug

- `application-shell`
  - [#1028](https://github.com/commercetools/merchant-center-application-kit/pull/1028) fix(app-shell): null check for dataFences in navbar component ([@emmenko](https://github.com/emmenko))

#### 🚀 Type: New Feature

- `mc-html-template`, `mc-http-server`, `mc-scripts`
  - [#1016](https://github.com/commercetools/merchant-center-application-kit/pull/1016) feat: add ability to specify feature policies ([@tdeekens](https://github.com/tdeekens))

## [15.0.0](https://github.com/commercetools/merchant-center-application-kit/compare/v14.6.1...v15.0.0) (2019-09-02)

This release introduces some **breaking changes** related to minimal dependency versions.

In [v14.0.0](https://github.com/commercetools/merchant-center-application-kit/releases/tag/v14.0.0) we introduced full support for React Hooks, as well as other improvements.
In this release we iterate on that and mostly update some of the React dependencies that ship with their Hooks support.

- `react v16.9` [blog post](https://reactjs.org/blog/2019/08/08/react-v16.9.0.html)
- `react-dom v16.9`
- `@testing-library v9` [release notes](https://github.com/testing-library/react-testing-library/releases/tag/v9.0.0)
- `react-apollo v3` [blog post](https://blog.apollographql.com/apollo-client-now-with-react-hooks-676d116eeae2)
- `eslint v6`
- `eslint-config-airbnb v14`

React `v16.9`, together with `@testing-library` `v9`, fixes `act()` by supporting **async** `act()` for testing, among other things. This means that React won't throw any more warnings about updating state asynchronously inside Hooks 🎉

> NOTE: if you're getting some errors about possible multiple copies of React installed, you can add a `resolutions` field in your `package.json` (_only supported by `yarn`_) that resolves the following dependencies:

```json
{
  "resolutions": {
    "react": "16.9.0",
    "**/react": "16.9.0",
    "react-test-renderer": "16.9.0",
    "**/react-test-renderer": "16.9.0"
  }
}
```

Another important change is the support for `react-apollo` `v3`, which ships with React Hooks support.
This means that you can now start using React Hooks to write queries and mutations.

For example, the `FetchUser` query can be rewritten as following:

```jsx
const FetchUser = () => (
  <Query
    query={LoggedInUserQuery}
    variables={{ target: GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND }}
    onError={reportErrorToSentry}
  >
    {({ data, loading, error }) =>
      this.props.children({
        isLoading: loading,
        user: data && data.user,
        error,
      })
    }
  </Query>
);

const FetchUser = (props) => {
  const { loading, data, error } = useQuery(LoggedInUserQuery, {
    onError: reportErrorToSentry,
    variables: { target: GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND },
  });
  return (
    <>
      {props.children({ isLoading: loading, user: data && data.user, error })}
    </>
  );
};
```

#### 🚀 Type: New Feature

- `application-components`, `application-shell`, `eslint-plugin-testing-library-react`
  - [#1014](https://github.com/commercetools/merchant-center-application-kit/pull/1014) feat: add eslint plugin for react testing library 🔥 ([@emmenko](https://github.com/emmenko))

#### ⛑ Type: Refactoring

- [#801](https://github.com/commercetools/merchant-center-application-kit/pull/801) refactor(app-shell): use react-apollo v3 ([@emmenko](https://github.com/emmenko))

#### 🤖 Type: Dependencies

- [#911](https://github.com/commercetools/merchant-center-application-kit/pull/911) chore: update eslint to v6 ([@emmenko](https://github.com/emmenko))
- [#966](https://github.com/commercetools/merchant-center-application-kit/pull/966) chore: update react to v16.9 ([@tdeekens](https://github.com/tdeekens))
- [#956](https://github.com/commercetools/merchant-center-application-kit/pull/956) chore: update @testing-library/reaact to v9 ([@emmenko](https://github.com/emmenko))

* Other
  - [#1025](https://github.com/commercetools/merchant-center-application-kit/pull/1025) chore: update deps ([@tdeekens](https://github.com/tdeekens))
* `application-shell`
  - [#1013](https://github.com/commercetools/merchant-center-application-kit/pull/1013) chore: update flopflip ([@tdeekens](https://github.com/tdeekens))

#### 🚨 Type: Security

- `mc-html-template`, `mc-http-server`
  - [#1015](https://github.com/commercetools/merchant-center-application-kit/pull/1015) fix(mc-http-server): to add referrer policy ([@tdeekens](https://github.com/tdeekens))

## [14.6.1](https://github.com/commercetools/merchant-center-application-kit/compare/v14.6.0...v14.6.1) (2019-08-29)

#### 🐛 Type: Bug

- `application-shell`, `permissions`
  - [#1009](https://github.com/commercetools/merchant-center-application-kit/pull/1009) fix: properly pass dataFences from menu to `Authorized.js` ([@amine-benselim](https://github.com/amine-benselim))

## [14.6.0](https://github.com/commercetools/merchant-center-application-kit/compare/v14.5.0...v14.6.0) (2019-08-27)

#### 🐛 Type: Bug

- `application-components`
  - [#994](https://github.com/commercetools/merchant-center-application-kit/pull/994) fix(dialogs): onClose prop is optional ([@emmenko](https://github.com/emmenko))
- `actions-global`, `application-shell-connectors`, `constants`, `i18n`, `permissions`, `sdk`, `sentry`
  - [#992](https://github.com/commercetools/merchant-center-application-kit/pull/992) fix: tsconfig to correctly include custom type definitions and check test files ([@emmenko](https://github.com/emmenko))

#### 💅 Type: Enhancement

- `i18n`
  - [#1003](https://github.com/commercetools/merchant-center-application-kit/pull/1003) Translate '/packages/i18n/data/core.json' in 'zh_CN' ([@transifex-integration[bot]](https://github.com/apps/transifex-integration))
  - [#998](https://github.com/commercetools/merchant-center-application-kit/pull/998) Translate '/packages/i18n/data/core.json' in 'fr_FR' ([@transifex-integration[bot]](https://github.com/apps/transifex-integration))
  - [#997](https://github.com/commercetools/merchant-center-application-kit/pull/997) Translate '/packages/i18n/data/core.json' in 'es' ([@transifex-integration[bot]](https://github.com/apps/transifex-integration))
  - [#996](https://github.com/commercetools/merchant-center-application-kit/pull/996) Translate '/packages/i18n/data/core.json' in 'de' ([@transifex-integration[bot]](https://github.com/apps/transifex-integration))
  - [#995](https://github.com/commercetools/merchant-center-application-kit/pull/995) Translate '/packages/i18n/data/core.json' in 'en' ([@transifex-integration[bot]](https://github.com/apps/transifex-integration))

#### 🚀 Type: New Feature

- `application-shell`
  - [#991](https://github.com/commercetools/merchant-center-application-kit/pull/991) feat(application-shell/navbar): add demandedDataFences and return dataFenceValues given to the user ([@adnasa](https://github.com/adnasa))

#### 🤖 Type: Dependencies

- `actions-global`, `application-components`, `application-shell`, `babel-preset-mc-app`, `jest-preset-mc-app`, `l10n`, `mc-html-template`, `mc-http-server`, `mc-scripts`, `react-notifications`, `sdk`, `sentry`
  - [#1006](https://github.com/commercetools/merchant-center-application-kit/pull/1006) chore: update deps ([@tdeekens](https://github.com/tdeekens))

## [14.5.0](https://github.com/commercetools/merchant-center-application-kit/compare/v14.4.1...v14.5.0) (2019-08-20)

#### 🚀 Type: New Feature

- `application-shell`, `constants`, `sdk`
  - [#986](https://github.com/commercetools/merchant-center-application-kit/pull/986) feat(sdk): allow to pass a mcApiProxyTarget, to the SDK action ([@emmenko](https://github.com/emmenko))

#### ⛑ Type: Refactoring

- `permissions`
  - [#990](https://github.com/commercetools/merchant-center-application-kit/pull/990) refactor(permissions/has-permissions): pass `actualDataFenceValues` into `selectDataFenceData` ([@adnasa](https://github.com/adnasa))
- `application-shell`, `constants`, `sdk`
  - [#985](https://github.com/commercetools/merchant-center-application-kit/pull/985) refactor(sdk): to convert to TS ([@emmenko](https://github.com/emmenko))

#### 🤖 Type: Dependencies

- `application-components`, `application-shell`, `l10n`, `react-notifications`
  - [#988](https://github.com/commercetools/merchant-center-application-kit/pull/988) chore: update deps ([@emmenko](https://github.com/emmenko))

## [14.4.1](https://github.com/commercetools/merchant-center-application-kit/compare/v14.4.0...v14.4.1) (2019-08-14)

#### 🐛 Type: Bug

- `actions-global`
  - [#976](https://github.com/commercetools/merchant-center-application-kit/pull/976) fix(actions-global): distinguish unknown/api errors based on presence of body field ([@pa3](https://github.com/pa3))

#### ⛑ Type: Refactoring

- `application-shell`, `permissions`, `react-notifications`
  - [#975](https://github.com/commercetools/merchant-center-application-kit/pull/975) refactor: remove reselect ([@tdeekens](https://github.com/tdeekens))

## [14.4.0](https://github.com/commercetools/merchant-center-application-kit/compare/v14.3.5...v14.4.0) (2019-08-14)

#### 🚀 Type: New Feature

- `application-shell`, `permissions`
  - [#894](https://github.com/commercetools/merchant-center-application-kit/pull/941) feat(app-shell): add support for dataFences ([@adnasa](https://github.com/adnasa))

#### 🐛 Type: Bug

- `application-shell-connectors`, `application-shell`, `permissions`
  - [#973](https://github.com/commercetools/merchant-center-application-kit/pull/973) fix: prop-types for dataFences optional field ([@emmenko](https://github.com/emmenko))

#### 🔮 Type: Chore

- `application-shell`
  - [#972](https://github.com/commercetools/merchant-center-application-kit/pull/972) feat(app-shell): load actionRights from gql for menu ([@tdeekens](https://github.com/tdeekens))

#### ⛑ Type: Refactoring

- `constants`
  - [#971](https://github.com/commercetools/merchant-center-application-kit/pull/971) refactor(constants): use const assertion ([@emmenko](https://github.com/emmenko))

#### 🖥 Type: Website

- [#970](https://github.com/commercetools/merchant-center-application-kit/pull/970) fix: percy snapshots for website ([@emmenko](https://github.com/emmenko))

## [14.3.5](https://github.com/commercetools/merchant-center-application-kit/compare/v14.3.4...v14.3.5) (2019-08-12)

#### 🤖 Type: Dependencies

- `application-components`, `application-shell-connectors`, `application-shell`, `babel-preset-mc-app`, `jest-preset-mc-app`, `mc-scripts`, `react-notifications`, `sentry`
  - [#963](https://github.com/commercetools/merchant-center-application-kit/pull/963) chore: update deps ([@tdeekens](https://github.com/tdeekens))
- Other
  - [#961](https://github.com/commercetools/merchant-center-application-kit/pull/961) chore: update deps ([@tdeekens](https://github.com/tdeekens))

## [14.3.4](https://github.com/commercetools/merchant-center-application-kit/compare/v14.3.3...v14.3.4) (2019-08-09)

#### 🐛 Type: Bug

- `application-components`
  - [#953](https://github.com/commercetools/merchant-center-application-kit/pull/953) fix(application-components): prop is optional ([@emmenko](https://github.com/emmenko))

## [14.3.3](https://github.com/commercetools/merchant-center-application-kit/compare/v14.3.2...v14.3.3) (2019-08-08)

#### 🐛 Type: Bug

- `react-notifications`
  - [#951](https://github.com/commercetools/merchant-center-application-kit/pull/951) fix(react-notifications): onCloseClick is optional ([@emmenko](https://github.com/emmenko))

## [14.3.2](https://github.com/commercetools/merchant-center-application-kit/compare/v14.3.1...v14.3.2) (2019-08-08)

#### 🐛 Type: Bug

- `jest-preset-mc-app`
  - [#948](https://github.com/commercetools/merchant-center-application-kit/pull/948) fix(jest): use cjs syntax ([@emmenko](https://github.com/emmenko))

#### 🔮 Type: Chore

- `application-components`, `application-shell`, `i18n`, `react-notifications`
  - [#938](https://github.com/commercetools/merchant-center-application-kit/pull/938) chore: update ui-kit ([@montezume](https://github.com/montezume))

#### ⛑ Type: Refactoring

- `application-components`
  - [#949](https://github.com/commercetools/merchant-center-application-kit/pull/949) fix(application-components): rewrite conditional props logic, to account prop-types transformer ([@emmenko](https://github.com/emmenko))

#### 🖥 Type: Website

- `application-components`
  - [#946](https://github.com/commercetools/merchant-center-application-kit/pull/946) fix(website): syntax highlighting and font-family for UI components ([@emmenko](https://github.com/emmenko))

## [14.3.1](https://github.com/commercetools/merchant-center-application-kit/compare/v14.3.0...v14.3.1) (2019-08-08)

#### 🐛 Type: Bug

- `application-shell`, `permissions`
  - [#945](https://github.com/commercetools/merchant-center-application-kit/pull/945) fix(test-utils): to set default required dataFences option ([@emmenko](https://github.com/emmenko))

#### 🖥 Type: Website

- [#944](https://github.com/commercetools/merchant-center-application-kit/pull/944) refactor(website): use only one font, several other improvements ([@emmenko](https://github.com/emmenko))

## [14.3.0](https://github.com/commercetools/merchant-center-application-kit/compare/v14.2.0...v14.3.0) (2019-08-08)

#### 🚀 Type: New Feature

- `application-shell`
  - [#942](https://github.com/commercetools/merchant-center-application-kit/pull/942) feat(app-shell/navbar): add ability to hide menu by action rights ([@tdeekens](https://github.com/tdeekens))
- `application-shell-connectors`, `application-shell`
  - [#918](https://github.com/commercetools/merchant-center-application-kit/pull/918) feat(application-shell/project-query): add `allAppliedDataFences` ([@adnasa](https://github.com/adnasa))
- `jest-preset-mc-app`, `react-notifications`
  - [#924](https://github.com/commercetools/merchant-center-application-kit/pull/924) chore(types/ui-kit): add more type declarations ([@emmenko](https://github.com/emmenko))

#### 🐛 Type: Bug

- `application-components`
  - [#939](https://github.com/commercetools/merchant-center-application-kit/pull/939) fix: Modal Pages custom controls ([@jonnybel](https://github.com/jonnybel))

#### ⛑ Type: Refactoring

- `application-components`, `assets`
  - [#921](https://github.com/commercetools/merchant-center-application-kit/pull/921) refactor(application-components): to convert to TS ([@emmenko](https://github.com/emmenko))
- `application-shell`, `react-notifications`
  - [#917](https://github.com/commercetools/merchant-center-application-kit/pull/917) refactor: to use emotion styles ([@emmenko](https://github.com/emmenko))
  - [#914](https://github.com/commercetools/merchant-center-application-kit/pull/914) chore: enable eslint rules for react hooks ([@emmenko](https://github.com/emmenko))
- `permissions`, `react-notifications`
  - [#916](https://github.com/commercetools/merchant-center-application-kit/pull/916) refactor: default props type declarations ([@emmenko](https://github.com/emmenko))
- `actions-global`, `application-shell-connectors`, `browser-history`, `constants`, `i18n`, `jest-preset-mc-app`, `l10n`, `notifications`, `permissions`, `react-notifications`, `sentry`, `url-utils`
  - [#896](https://github.com/commercetools/merchant-center-application-kit/pull/896) refactor(react-notifications): to convert to TS ([@emmenko](https://github.com/emmenko))

#### 🔮 Type: Chore

- `mc-http-server`
  - [#915](https://github.com/commercetools/merchant-center-application-kit/pull/915) chore(mc-http-server): update to node v12 ([@tdeekens](https://github.com/tdeekens))

#### 🤖 Type: Dependencies

- `application-components`, `application-shell`, `mc-scripts`, `react-notifications`
  - [#937](https://github.com/commercetools/merchant-center-application-kit/pull/937) chore: update to stable react-intl v3 ([@emmenko](https://github.com/emmenko))
- `application-components`, `application-shell`, `react-notifications`
  - [#923](https://github.com/commercetools/merchant-center-application-kit/pull/923) chore: update react-intl to 3.0.0-beta.23 ([@emmenko](https://github.com/emmenko))

#### 🖥 Type: Website

- [#940](https://github.com/commercetools/merchant-center-application-kit/pull/940) fix(website): use default font-family of ui-kit for playground container ([@emmenko](https://github.com/emmenko))
- [#934](https://github.com/commercetools/merchant-center-application-kit/pull/934) feat(circleci): snapshot testing for documentation website ([@emmenko](https://github.com/emmenko))
- [#933](https://github.com/commercetools/merchant-center-application-kit/pull/933) chore(website): update to gatsby-plugin-mdx, workaround for remark images bug ([@emmenko](https://github.com/emmenko))

## [14.2.0](https://github.com/commercetools/merchant-center-application-kit/compare/v14.1.1...v14.2.0) (2019-07-29)

#### 🚀 Type: New Feature

- `application-shell`, `i18n`
  - [#894](https://github.com/commercetools/merchant-center-application-kit/pull/894) feat(app-shell): add api clients to quick access ([@tdeekens](https://github.com/tdeekens))

#### 🐛 Type: Bug

- `mc-scripts`
  - [#905](https://github.com/commercetools/merchant-center-application-kit/pull/905) fix(mc-scripts): to use paths to package directory instead of entry points ([@emmenko](https://github.com/emmenko))

#### ⛑ Type: Refactoring

- `jest-preset-mc-app`
  - [#902](https://github.com/commercetools/merchant-center-application-kit/pull/902) refactor(jest-preset): to split typescript config from default preset ([@emmenko](https://github.com/emmenko))

#### 🔮 Type: Chore

- `storage`
  - [#904](https://github.com/commercetools/merchant-center-application-kit/pull/904) chore: remove (deprecated) storage package ([@emmenko](https://github.com/emmenko))
- Other
  - [#903](https://github.com/commercetools/merchant-center-application-kit/pull/903) chore: use recent version 5.4.3 of intl-messageformat ([@tdeekens](https://github.com/tdeekens))
- `mc-scripts`
  - [#899](https://github.com/commercetools/merchant-center-application-kit/pull/899) chore: remove regenerator-runtime ([@tdeekens](https://github.com/tdeekens))

#### 🤖 Type: Dependencies

- `application-components`, `application-shell`, `react-notifications`
  - [#901](https://github.com/commercetools/merchant-center-application-kit/pull/901) chore: update react-intl to 3.0.0-beta.20 ([@emmenko](https://github.com/emmenko))
- `application-components`, `application-shell`, `i18n`, `jest-preset-mc-app`, `mc-scripts`, `react-notifications`
  - [#897](https://github.com/commercetools/merchant-center-application-kit/pull/897) chore: update react-intl to 3.0.0-beta.19 ([@emmenko](https://github.com/emmenko))
- `application-components`, `application-shell`, `jest-preset-mc-app`, `mc-http-server`, `react-notifications`
  - [#912](https://github.com/commercetools/merchant-center-application-kit/pull/912) chore: update deps ([@tdeekens](https://github.com/tdeekens))
- `actions-global`, `application-components`, `application-shell-connectors`, `application-shell`, `babel-preset-mc-app`, `browser-history`, `create-mc-app`, `i18n`, `jest-preset-mc-app`, `jest-stylelint-runner`, `l10n`, `mc-http-server`, `mc-scripts`, `notifications`, `permissions`, `react-notifications`, `sdk`, `sentry`, `url-utils`
  - [#898](https://github.com/commercetools/merchant-center-application-kit/pull/898) chore: update deps ([@tdeekens](https://github.com/tdeekens))

## [14.1.1](https://github.com/commercetools/merchant-center-application-kit/compare/v14.1.0...v14.1.1) (2019-07-25)

#### 🐛 Type: Bug

- `permissions`
  - [#891](https://github.com/commercetools/merchant-center-application-kit/pull/891) fix(permissions): to drill props ([@tdeekens](https://github.com/tdeekens))

#### ⛑ Type: Refactoring

- `actions-global`, `constants`, `notifications`, `react-notifications`, `sentry`
  - [#888](https://github.com/commercetools/merchant-center-application-kit/pull/888) refactor(actions-global): to convert to TS ([@emmenko](https://github.com/emmenko))

## [14.1.0](https://github.com/commercetools/merchant-center-application-kit/compare/v14.0.0...v14.1.0) (2019-07-24)

#### 🚀 Type: New Feature

- `application-shell-connectors`, `application-shell`, `permissions`
  - [#883](https://github.com/commercetools/merchant-center-application-kit/pull/883) feat: add support for action rights through `allAppliedActionRights` query ([@tdeekens](https://github.com/tdeekens))

#### ⛑ Type: Refactoring

- `notifications`
  - [#884](https://github.com/commercetools/merchant-center-application-kit/pull/884) refactor(notifications): to convert to TS ([@emmenko](https://github.com/emmenko))
- `browser-history`
  - [#885](https://github.com/commercetools/merchant-center-application-kit/pull/885) refactor(browser-history): to convert to TS ([@emmenko](https://github.com/emmenko))

## [14.0.0](https://github.com/commercetools/merchant-center-application-kit/compare/v13.13.3...v14.0.0) (2019-07-18)

This release introduces several **breaking changes**, as documented below, mostly around React Hooks and our own permission functionality.

> You can read the v14 announcement and release tracker here: https://github.com/commercetools/merchant-center-application-kit/issues/748

### Full support for React Hooks

In order to support Hooks the following peer dependencies have to be updated:

- `react >=16.8`
- `react-dom >=16.8`
- `react-intl >=3` (_currently still in beta_)
- `react-redux >=7`

> If you need more information about React Hooks, we recommend to have a look at the following resources. Hooks are another way to write components as they come with many benefits:
>
> - https://reactjs.org/docs/hooks-intro.html
> - https://egghead.io/courses/simplify-react-apps-with-react-hooks
> - https://usehooks.com/
>
> TL;DR; with Hooks code can become more readable, easier to test while often improving performance and reducing bundlesize.

Some of the AppKit packages now export different Hooks (_more might come in the future_). Here is a quick overview of existing and new Hooks:

- `actions-global`: provides Hooks to dispatch notifications. Previously we had to _bind_ the action creators using `connect` from `react-redux`. Now the binding is done within the Hooks.
  - `useShowNotification`
  - `useShowApiErrorNotification`
  - `useShowUnexpectedErrorNotification`

```js
const showSuccessNotification = useShowNotification({
  kind: 'success',
  domain: DOMAINS.SIDE,
});
showSuccessNotification({ text: 'All good!' });

const showApiErrorNotification = useShowApiErrorNotification();
showApiErrorNotification({ errors });

const showUnexpectedErrorNotification = useShowUnexpectedErrorNotification();
showUnexpectedErrorNotification({ error });
```

- `application-shell-connectors`: provides Hooks to connect to the application context.
  - `useApplicationContext`

```js
const projectName = useApplicationContext((context) => context.project.name);
const projectDataLocale = useApplicationContext(
  (context) => context.dataLocale
);
const user = useApplicationContext((context) => context.user);
// ...
```

- `l10n`: provides Hooks to get l10n data.
  - `useCountries`
  - `useCurrencies`
  - `useLanguages`
  - `useTimeZones`

```js
import {
  useCountries,
  useCurrencies,
  useLanguages,
  useTimeZones,
} from '@commercetools-frontend/l10n';

const countriesData = useCountries('en');
const currenciesData = useCurrencies('en');
const languagesData = useLanguages('en');
const timeZonesData = useTimeZones('en');

// each `xxxData` value has the following shape:
// {
//   isLoading: bool,
//   data: Object,
//   error: Error
// }
```

- `permissions`: provides a Hook to check if the user is authorized to access the given project permissions.
  - `useIsAuthorized`

```js
const canViewProducts = useIsAuthorized({
  demandedPermissions: ['ViewProducts'],
});
```

Other than that, we also recommend to use Hooks from other libraries:

- `react`: https://reactjs.org/docs/hooks-reference.html
- `react-intl`: https://github.com/formatjs/react-intl/blob/master/docs/Upgrade-Guide.md#new-useintl-hook-as-an-alternative-of-injectintl-hoc
- `react-redux`: https://react-redux.js.org/next/api/hooks

### Permissions

On July 18, 2019 we migrated the commercetools organizations to our new permissions system ([read the announcement](https://docs.commercetools.com/merchant-center/releases/permissions-upgrade-on-july-18-2019.html)).
From a technical perspective the following things changed:

- `ManageProject` permission does not exist anymore. If your code relies on this, you need to change it to one or more of the available resource permissions:

```
ManageProducts
ViewProducts
ManageCategories
ViewCategories
ManageCustomers
ViewCustomers
ManageCustomerGroups
ViewCustomerGroups
ManageOrders
ViewOrders
ManageProductDiscounts
ViewProductDiscounts
ManageCartDiscounts
ViewCartDiscounts
ManageDiscountCodes
ViewDiscountCodes
ManageProjectSettings
ViewProjectSettings
ManageProductTypes
ViewProductTypes
ManageDeveloperSettings
ViewDeveloperSettings
```

This change also implies a change in the `@commercetools-frontend/application-shell/test-utils` as the `permissions` property is now empty. This means that **you need to explicitly pass the expected permissions that your application deals with**, otherwise tests will fail.

```js
import { renderApp } from '@commercetools-frontend/application-shell/test-utils';

// Before
// Here we don't specify any permission, which will probably cause the test to throw errors
it('should render the app', async () => {
  const rendered = renderApp(<MyApplication />);
});

// After
// Here we explicitly specify the permission of the application
it('should render the app', async () => {
  const rendered = renderApp(<MyApplication />, {
    permissions: {
      canManageProducts: true,
      canViewProducts: true,
      // ...
    },
  });
});
```

- the `@commercetools-frontend/permissions` package does not expose the constants `permissions` anymore, as we don't want to keep things coupled between the package and the API. Instead, we recommend to simply list the permissions that your application uses in a `constants.js` file:

```js
// constants.js
export const PERMISSIONS = {
  ViewProducts: 'ViewProducts',
  ManageProducts: 'ManageProducts',
  ViewOrders: 'ViewOrders',
  ManageProductTypes: 'ManageProductTypes',
  ViewProductTypes: 'ViewProductTypes',
  // ...
};
```

- the `@commercetools-frontend/permissions` package does not expose the `hasPermission` function anymore. Instead we recommend to use `hasSomePermissions` or `hasEveryPermissions`, which accept a list of permissions (_you probably weren't using this function anyway_).

Other than that, things should work as before.

### UIKit migration to v10

This release also bumps the peer dependency of `@commercetools-frontend/ui-kit >=10`. We recommend to follow the [release notes](https://github.com/commercetools/ui-kit/releases/tag/v10.0.0) in the UIKit repository.

### Other dependencies upgrades

Apart from the bumped dependency versions documented above, we also bumped other dependencies:

- `@testing-library/react`: previously this was named `react-testing-library`. We removed the `react-testing-library` peer dependency and defined `@testing-library/react >=8` instead.

  > NOTE that upgrading to the latest RTL library might cause some tests to break, depending on how you were querying elements. More info [here](https://github.com/testing-library/dom-testing-library/releases/tag/v4.0.0).

- `@commercetools/enzyme-extensions`: if you write enzyme tests, and use the `renderProp` method (_available when using our `@commercetools-frontend/jest-preset-mc-app` setup_), the signature of the API changed now.

```js
// before
wrapper.renderProp('children', { loading: true, data: undefined });

// after
wrapper.renderProp('children')({ loading: true, data: undefined });
```

### Things renamed

We took the chance to also rename different things:

- `assets`: we renamed the SVG files to have more generic names that reflect the actual image content.
  [#834](https://github.com/commercetools/merchant-center-application-kit/pull/834)

| Before                                                             | After                                                         |
| ------------------------------------------------------------------ | ------------------------------------------------------------- |
| @commercetools-frontend/assets/images/failed-authentication.svg    | @commercetools-frontend/assets/images/locked-diamond.svg      |
| @commercetools-frontend/assets/images/failed-authorization.svg     | @commercetools-frontend/assets/images/folder-full-locked.svg  |
| @commercetools-frontend/assets/images/image\_\_broken.svg          | @commercetools-frontend/assets/images/camera-crossed.svg      |
| @commercetools-frontend/assets/images/image\_\_missing_image.svg   | @commercetools-frontend/assets/images/diagonal-line.svg       |
| @commercetools-frontend/assets/images/image\_\_no_image.svg        | @commercetools-frontend/assets/images/camera.svg              |
| @commercetools-frontend/assets/images/link-external\_\_broken.svg  | @commercetools-frontend/assets/images/camera-chain-broken.svg |
| @commercetools-frontend/assets/images/link-external\_\_working.svg | @commercetools-frontend/assets/images/camera-chain.svg        |
| @commercetools-frontend/assets/images/page-not-found.svg           | @commercetools-frontend/assets/images/desert-fox.svg          |
| @commercetools-frontend/assets/images/project-expired.svg          | @commercetools-frontend/assets/images/hourglass.svg           |
| @commercetools-frontend/assets/images/project-not-initialized.svg  | @commercetools-frontend/assets/images/hourglass.svg           |
| @commercetools-frontend/assets/images/project-suspended.svg        | @commercetools-frontend/assets/images/doors-closed.svg        |
| @commercetools-frontend/assets/images/unexpected-error.svg         | @commercetools-frontend/assets/images/icecream.svg            |

### Things removed

We removed some exports that are not necessary anymore:

- `application-components`:
  - `ServicePageResponseLayout` (was _deprecated_)
- `permissions`:
  - `hasPermission`
  - `permissions`
- `react-notifications`:
  - `GetCustomNotificationComponent`

### Dropped support for IE 11

We decided to drop support for IE 11 as we want to reduce the maintenance costs due to transpilation and polyfills. As a result, we dropped those things from our tooling.

### Deprecated packages

The `@commercetools-frontend/storage` package has been deprecated and won't be maintained anymore. We recommend to use `window.localStorage` directly.
For tests, we use the package `jest-localstorage-mock`, which provides mocks for the `localStorage` API. It's included in the `@commercetools-frontend/jest-preset-mc-app`.

```js
beforeEach(() => {
  window.localStorage.setItem.mockClear();
  window.localStorage.getItem.mockClear();
  window.localStorage.removeItem.mockClear();

  window.localStorage.getItem.mockReturnValue('foo');
});

expect(window.localStorage.setItem).toHaveBeenCalledWith('bar');
```

## [13.13.3](https://github.com/commercetools/merchant-center-application-kit/compare/v13.13.2...v13.13.3) (2019-07-15)

#### ⛑ Type: Refactoring

- `application-shell`
  - [#842](https://github.com/commercetools/merchant-center-application-kit/pull/842) refactor(app-shell/quick-acess): to use new permissions ([@tdeekens](https://github.com/tdeekens))

#### 🤖 Type: Dependencies

- Other
  - [#849](https://github.com/commercetools/merchant-center-application-kit/pull/849) chore: update deps ([@emmenko](https://github.com/emmenko))
- `actions-global`, `application-shell-connectors`, `application-shell`, `permissions`, `react-notifications`
  - [#840](https://github.com/commercetools/merchant-center-application-kit/pull/840) chore: update dependencies ([@emmenko](https://github.com/emmenko))

## [13.13.2](https://github.com/commercetools/merchant-center-application-kit/compare/v13.13.1...v13.13.2) (2019-07-11)

#### ⛑ Type: Refactoring

- `permissions`
  - [#838](https://github.com/commercetools/merchant-center-application-kit/pull/838) refactor(permissions): to use sentry for error reporting ([@tdeekens](https://github.com/tdeekens))

## [13.13.1](https://github.com/commercetools/merchant-center-application-kit/compare/v13.13.0...v13.13.1) (2019-07-11)

#### 🐛 Type: Bug

- `mc-html-template`, `mc-scripts`
  - [#832](https://github.com/commercetools/merchant-center-application-kit/pull/832) fix(html-template/compile-html): to use correct option for useLocalAssets ([@emmenko](https://github.com/emmenko))

#### 🔮 Type: Chore

- `jest-preset-mc-app`
  - [#818](https://github.com/commercetools/merchant-center-application-kit/pull/818) fix(jest/setup): to show actual error logs on CI when something is logged to console ([@emmenko](https://github.com/emmenko))

## [13.13.0](https://github.com/commercetools/merchant-center-application-kit/compare/v13.12.3...v13.13.0) (2019-07-04)

#### 🚀 Type: New Feature

- `application-shell`
  - [#814](https://github.com/commercetools/merchant-center-application-kit/pull/814) feat(app-shell): allow to disable menu items per env ([@tdeekens](https://github.com/tdeekens))

#### ⛑ Type: Refactoring

- `application-shell`
  - [#813](https://github.com/commercetools/merchant-center-application-kit/pull/813) refactor(app-shell): to remove team count ([@tdeekens](https://github.com/tdeekens))

## [13.12.3](https://github.com/commercetools/merchant-center-application-kit/compare/v13.12.2...v13.12.3) (2019-07-01)

#### 🖥 Type: Website

- [#810](https://github.com/commercetools/merchant-center-application-kit/pull/810) refactor(website): to use syntax highlighting plugin for vscode themes ([@emmenko](https://github.com/emmenko))

#### 🤖 Type: Dependencies

- `jest-stylelint-runner`, `mc-scripts`
  - [#809](https://github.com/commercetools/merchant-center-application-kit/pull/809) chore: update webpack loaders ([@tdeekens](https://github.com/tdeekens))
- `application-components`, `create-mc-app`, `mc-http-server`, `mc-scripts`
  - [#808](https://github.com/commercetools/merchant-center-application-kit/pull/808) chore: update deps ([@tdeekens](https://github.com/tdeekens))

## [13.12.2](https://github.com/commercetools/merchant-center-application-kit/compare/v13.12.1...v13.12.2) (2019-06-28)

This release does not contain any changes compared to `v13.12.1`. However, the `v13.12.0` release contained a [babel plugin that broke the builds](#791) and therefore we had to bundle and bump the version of all packages again to fix it.

## [13.12.1](https://github.com/commercetools/merchant-center-application-kit/compare/v13.12.0...v13.12.1) (2019-06-27)

#### 🐛 Type: Bug

- `babel-preset-mc-app`
  - [#797](https://github.com/commercetools/merchant-center-application-kit/pull/797) fix(babel-preset): to remove plugin-transform-react-constant-elements ([@tdeekens](https://github.com/tdeekens))

## [13.12.0](https://github.com/commercetools/merchant-center-application-kit/compare/v13.11.0...v13.12.0) (2019-06-27)

#### 💅 Type: Enhancement

- `application-components`

  - [#766](https://github.com/commercetools/merchant-center-application-kit/pull/766) feat(modal-pages): add delay before calling onClose to let animations finish ([@jonnybel](https://github.com/jonnybel))

- `jest-stylelint-runner` [Readme](https://github.com/commercetools/merchant-center-application-kit/blob/main/packages/jest-stylelint-runner/README.md)
  - [#789](https://github.com/commercetools/merchant-center-application-kit/pull/789) fix(jest-stylelint-runner): include run file ([@montezume](https://github.com/montezume))

#### 🐛 Type: Bug

- `application-components`, `application-shell`, `constants`
  - [#769](https://github.com/commercetools/merchant-center-application-kit/pull/769) fix: support link url ([@emmenko](https://github.com/emmenko))

#### 🔮 Type: Chore

- `application-components`, `application-shell-connectors`, `application-shell`, `babel-preset-mc-app`
  - [#793](https://github.com/commercetools/merchant-center-application-kit/pull/793) chore: update deps ([@tdeekens](https://github.com/tdeekens))
- `application-shell`
  - [#792](https://github.com/commercetools/merchant-center-application-kit/pull/792) fix(app-shell): to support admin service target ([@tdeekens](https://github.com/tdeekens))
  - [#775](https://github.com/commercetools/merchant-center-application-kit/pull/775) chore: move with-mouse-over-state internal ([@montezume](https://github.com/montezume))
  - [#776](https://github.com/commercetools/merchant-center-application-kit/pull/776) chore(application-shell): remove usage of deprecated custom property ([@montezume](https://github.com/montezume))
- `babel-preset-mc-app`
  - [#791](https://github.com/commercetools/merchant-center-application-kit/pull/791) chore: add babel plugin transform react constant ([@montezume](https://github.com/montezume))
- Other
  - [#786](https://github.com/commercetools/merchant-center-application-kit/pull/786) refactor(circleci): to try improving CI workflow run time, additionally clean things up ([@emmenko](https://github.com/emmenko))

#### ⛑ Type: Refactoring

- `actions-global`, `application-components`, `application-shell-connectors`, `application-shell`, `browser-history`, `constants`, `i18n`, `l10n`, `permissions`, `sentry`
  - [#774](https://github.com/commercetools/merchant-center-application-kit/pull/774) refactor(i18n): convert to TS ([@emmenko](https://github.com/emmenko))

#### 🖥 Type: Website

- [#777](https://github.com/commercetools/merchant-center-application-kit/pull/777) fix(website): to use better font sizes scale, fix menu grid row for small screen ([@emmenko](https://github.com/emmenko))
- [#768](https://github.com/commercetools/merchant-center-application-kit/pull/768) refactor(website): restructure pages and navigation ([@emmenko](https://github.com/emmenko))

## [13.11.0](https://github.com/commercetools/merchant-center-application-kit/compare/v13.10.0...v13.11.0) (2019-06-18)

#### 💅 Type: Enhancement

- `application-shell`, `constants`
  - [#764](https://github.com/commercetools/merchant-center-application-kit/pull/764) feat(app-shell): add user deleted logout reason ([@tdeekens](https://github.com/tdeekens))
- `i18n`
  - [#761](https://github.com/commercetools/merchant-center-application-kit/pull/761) Translate '/packages/i18n/data/core.json' in 'en' ([@transifex-integration[bot]](https://github.com/apps/transifex-integration))
- `application-shell`, `permissions`, `storage`, `url-utils`
  - [#739](https://github.com/commercetools/merchant-center-application-kit/pull/739) feat(permissions): add ts-typings ([@tdeekens](https://github.com/tdeekens))

#### 🐛 Type: Bug

- `i18n`
  - [#762](https://github.com/commercetools/merchant-center-application-kit/pull/762) fix(i18n): fix naming bug for french and chinese translations ([@montezume](https://github.com/montezume))

#### 🔮 Type: Chore

- `application-shell`
  - [#760](https://github.com/commercetools/merchant-center-application-kit/pull/760) chore(app-shell): remove org list toggle ([@tdeekens](https://github.com/tdeekens))
- `application-components`
  - [#749](https://github.com/commercetools/merchant-center-application-kit/pull/749) chore: remove storybook ([@emmenko](https://github.com/emmenko))
- `actions-global`, `application-components`, `application-shell-connectors`, `browser-history`, `constants`, `permissions`
  - [#746](https://github.com/commercetools/merchant-center-application-kit/pull/746) chore: keep rollup command simple and consistent ([@emmenko](https://github.com/emmenko))

## [13.10.0](https://github.com/commercetools/merchant-center-application-kit/compare/v13.9.1...v13.10.0) (2019-06-14)

In this new release, we have a few highlights:

- we started migrating some of the packages to TypeScript, so future releases will include type declarations
- we have new _Modal Pages_ components in the `@commercetools-frontend/application-components` package
- we have a new command `mc-scripts compile-html ...` to help deploying Merchant Center applications as static apps (check out the playground app to see how we can use it to deploy the app to Zeit Now, _more in-depth documentation will follow soon_)

#### 🐛 Type: Bug

- `application-components`
  - [#735](https://github.com/commercetools/merchant-center-application-kit/pull/735) fix(website): tooltip z-index fix ([@montezume](https://github.com/montezume))

#### 🔮 Type: Chore

- `application-components`
  - [#731](https://github.com/commercetools/merchant-center-application-kit/pull/731) revert(storybook): contexts addon, since it's missing the core-js dependency ([@emmenko](https://github.com/emmenko))
  * [#741](https://github.com/commercetools/merchant-center-application-kit/pull/741) chore: unrevert contexts for app-components storybook. ([@montezume](https://github.com/montezume))
  * [#744](https://github.com/commercetools/merchant-center-application-kit/pull/744) feat(website): add intl controller for playground mode ([@emmenko](https://github.com/emmenko))

* `application-components`, `application-shell-connectors`, `application-shell`, `create-mc-app`, `jest-preset-mc-app`, `l10n`, `mc-scripts`, `permissions`, `react-notifications`, `sdk`
  - [#728](https://github.com/commercetools/merchant-center-application-kit/pull/728) chore: update deps ([@tdeekens](https://github.com/tdeekens))

#### ✍️ Type: Documentation

- `sdk`
  - [#743](https://github.com/commercetools/merchant-center-application-kit/pull/743) docs(sdk): fix example code ([@TimonRey](https://github.com/TimonRey))

#### 💅 Type: Enhancement

- `i18n`
  - [#729](https://github.com/commercetools/merchant-center-application-kit/pull/729) Translate '/packages/i18n/data/core.json' in 'zh_CN' ([@transifex-integration[bot]](https://github.com/apps/transifex-integration))

#### 🚀 Type: New Feature

- `application-components`
  - [#642](https://github.com/commercetools/merchant-center-application-kit/pull/642) feat(components): new Modal Page design ([@jonnybel](https://github.com/jonnybel))
- `mc-html-template`, `mc-http-server`, `mc-scripts`
  - [#670](https://github.com/commercetools/merchant-center-application-kit/pull/670) feat(mc-scripts): add static command to compile final index.html file (and security headers) ([@emmenko](https://github.com/emmenko))

#### ⛑ Type: Refactoring

- `application-shell-connectors`, `application-shell`, `constants`, `jest-preset-mc-app`, `l10n`, `permissions`, `react-notifications`, `sentry`
  - [#737](https://github.com/commercetools/merchant-center-application-kit/pull/737) refactor: migrate application-shell-connectors to TypeScript ([@emmenko](https://github.com/emmenko))
  - [#740](https://github.com/commercetools/merchant-center-application-kit/pull/740) fix(app-shell-connectors): to cast context type to not be empty, use function overloading for useApplicationContext ([@emmenko](https://github.com/emmenko))
- `mc-scripts`
  - [#736](https://github.com/commercetools/merchant-center-application-kit/pull/736) fix(build): use `overrideBrowsersList` to comply with new autoprefixer API ([@adnasa](https://github.com/adnasa))
- `l10n`, `sentry`
  - [#718](https://github.com/commercetools/merchant-center-application-kit/pull/718) feat(l10n): use typescript ([@montezume](https://github.com/montezume))
- `url-utils`
  - [#717](https://github.com/commercetools/merchant-center-application-kit/pull/717) refactor(url-utils): use typescript ([@montezume](https://github.com/montezume))
- `sentry`, `storage`
  - [#715](https://github.com/commercetools/merchant-center-application-kit/pull/715) feat(storage): use typescript ([@montezume](https://github.com/montezume))

## [13.9.1](https://github.com/commercetools/merchant-center-application-kit/compare/v13.9.0...v13.9.1) (2019-06-07)

#### 🐛 Type: Bug

- `application-shell`
  - [#710](https://github.com/commercetools/merchant-center-application-kit/pull/710) fix(app-shell): do not re-export the version field from flopflip ([@emmenko](https://github.com/emmenko))

## [13.9.0](https://github.com/commercetools/merchant-center-application-kit/compare/v13.8.1...v13.9.0) (2019-06-07)

With this release, each package (besides the tooling related packages) exports a `version` field, which can be used to see and track the version of the package being used.
We also introduced a new field `applicationName` for the `env.json` config file. This field is used to track the version used of e.g. application-shell package, which will help us to monitor and mitigate how we introduce future breaking changes.

> In the next major version of app-kit, we will make the field `applicationName` required.

Additionally, we decided to introduce TypeScript to our repository. We will start migrating the packages to use TypeScript and expose type declarations. The `sentry` package has already been migrated as a starting point.

#### 🔮 Type: Chore

- `application-components`, `application-shell`, `babel-preset-mc-app`, `create-mc-app`, `jest-preset-mc-app`, `mc-http-server`, `mc-scripts`, `react-notifications`, `sdk`, `sentry`
  - [#699](https://github.com/commercetools/merchant-center-application-kit/pull/699) chore: update deps ([@tdeekens](https://github.com/tdeekens))
- `application-shell`, `sdk`
  - [#696](https://github.com/commercetools/merchant-center-application-kit/pull/696) fix: setup of custom user agent ([@emmenko](https://github.com/emmenko))
- `application-shell-connectors`, `application-shell`, `jest-preset-mc-app`, `mc-html-template`, `permissions`, `sdk`
  - [#694](https://github.com/commercetools/merchant-center-application-kit/pull/694) refactor: for the http clients to send a x-user-agent with the package versions ([@emmenko](https://github.com/emmenko))

#### 💅 Type: Enhancement

- `application-shell`
  - [#697](https://github.com/commercetools/merchant-center-application-kit/pull/697) feat(app-shell): add reporting react version ([@tdeekens](https://github.com/tdeekens))
  - [#695](https://github.com/commercetools/merchant-center-application-kit/pull/695) feat(app-shell): add version tracker ([@tdeekens](https://github.com/tdeekens))

## [13.8.1](https://github.com/commercetools/merchant-center-application-kit/compare/v13.8.0...v13.8.1) (2019-06-04)

#### 🐛 Type: Bug

- `mc-scripts`
  - [#686](https://github.com/commercetools/merchant-center-application-kit/pull/686) fix(mc-scripts): do not assume that the application entry point is at src/index.js ([@emmenko](https://github.com/emmenko))

## [13.8.0](https://github.com/commercetools/merchant-center-application-kit/compare/v13.7.1...v13.8.0) (2019-06-04)

#### 🔮 Type: Chore

- Other
  - [#679](https://github.com/commercetools/merchant-center-application-kit/pull/679) chore: remove note and usage of dev mode in webpack for vrt app ([@montezume](https://github.com/montezume))
  - [#678](https://github.com/commercetools/merchant-center-application-kit/pull/678) chore: update deps ([@emmenko](https://github.com/emmenko))
- `mc-scripts`
  - [#669](https://github.com/commercetools/merchant-center-application-kit/pull/669) chore(mc-scripts): update with upstream react-scripts for (relevant) latest changes ([@emmenko](https://github.com/emmenko))
- `jest-preset-mc-app`, `mc-http-server`, `mc-scripts`
  - [#664](https://github.com/commercetools/merchant-center-application-kit/pull/664) chore: update deps ([@montezume](https://github.com/montezume))

#### ✍️ Type: Documentation

- [#681](https://github.com/commercetools/merchant-center-application-kit/pull/681) docs(website): fix issuer and audience example ([@emmenko](https://github.com/emmenko))

#### 🚀 Type: New Feature

- `application-components`, `assets`
  - [#683](https://github.com/commercetools/merchant-center-application-kit/pull/683) feat(assets): add ct logos ([@emmenko](https://github.com/emmenko))

#### ⛑ Type: Refactoring

- `mc-http-server`
  - [#682](https://github.com/commercetools/merchant-center-application-kit/pull/682) refactor(http-server): to unset cookie only for local development ([@emmenko](https://github.com/emmenko))

## [13.7.1](https://github.com/commercetools/merchant-center-application-kit/compare/v13.7.0...v13.7.1) (2019-05-24)

#### 🐛 Type: Bug

- `application-shell`
  - [#656](https://github.com/commercetools/merchant-center-application-kit/pull/656) fix(app-shell): quick access env not always set ([@tdeekens](https://github.com/tdeekens))

## [13.7.0](https://github.com/commercetools/merchant-center-application-kit/compare/v13.7.0...v13.6.0) (2019-05-23)

#### 🐛 Type: Bug

- `application-shell`
  - [#652](https://github.com/commercetools/merchant-center-application-kit/pull/652) fix(app-shell): Switcher counter not properly centered ([@jonnybel](https://github.com/jonnybel))

#### 🔮 Type: Chore

- `application-shell-connectors`, `application-shell`, `babel-preset-mc-app`, `create-mc-app`, `jest-preset-mc-app`, `mc-scripts`, `sdk`, `sentry`
  - [#654](https://github.com/commercetools/merchant-center-application-kit/pull/654) chore: update deps ([@tdeekens](https://github.com/tdeekens))
- `application-components`, `application-shell`, `babel-preset-mc-app`, `jest-preset-mc-app`, `l10n`, `mc-scripts`, `permissions`
  - [#650](https://github.com/commercetools/merchant-center-application-kit/pull/650) chore: update deps ([@montezume](https://github.com/montezume))
- `application-shell`
  - [#643](https://github.com/commercetools/merchant-center-application-kit/pull/643) chore: update flopflip ([@tdeekens](https://github.com/tdeekens))

#### 💅 Type: Enhancement

- `application-shell`, `i18n`
  - [#640](https://github.com/commercetools/merchant-center-application-kit/pull/640) feat(app-shell): add manage organizations ([@tdeekens](https://github.com/tdeekens))

## [13.6.0](https://github.com/commercetools/merchant-center-application-kit/compare/v13.6.0...v13.5.1) (2019-05-17)

#### 🔮 Type: Chore

- `application-components`, `application-shell`, `i18n`, `l10n`, `mc-http-server`, `mc-scripts`, `react-notifications`, `sentry`
  - [#638](https://github.com/commercetools/merchant-center-application-kit/pull/638) chore: update deps ([@tdeekens](https://github.com/tdeekens))

#### 🚀 Type: New Feature

- `application-shell`
  - [#637](https://github.com/commercetools/merchant-center-application-kit/pull/637) feat(app-shell): add menuVisibility to menu query ([@tdeekens](https://github.com/tdeekens))
- `application-components`
  - [#636](https://github.com/commercetools/merchant-center-application-kit/pull/636) feat(components): add ModalPage component ([@jonnybel](https://github.com/jonnybel))

## [13.5.1](https://github.com/commercetools/merchant-center-application-kit/compare/v13.5.1...v13.5.0) (2019-05-13)

#### 🔮 Type: Chore

- `application-components`, `application-shell`, `jest-preset-mc-app`, `mc-scripts`, `sentry`
  - [#634](https://github.com/commercetools/merchant-center-application-kit/pull/634) chore: update deps ([@tdeekens](https://github.com/tdeekens))
- `application-shell`
  - [#627](https://github.com/commercetools/merchant-center-application-kit/pull/627) fix(app-shell): to default to menu if no submenus are defined ([@tdeekens](https://github.com/tdeekens))

## [13.5.0](https://github.com/commercetools/merchant-center-application-kit/compare/v13.4.2...v13.5.0) (2019-05-09)

#### 🐛 Type: Bug

- `application-shell`, `react-notifications`
  - [#625](https://github.com/commercetools/merchant-center-application-kit/pull/625) fix(application-shell, react-notifications): fix invalid shadow ([@montezume](https://github.com/montezume))
- `application-components`
  - [#619](https://github.com/commercetools/merchant-center-application-kit/pull/619) fix(application-components): ui-kit peer dep ([@montezume](https://github.com/montezume))

#### 🚀 Type: New Feature

- `application-shell-connectors`, `permissions`
  - [#624](https://github.com/commercetools/merchant-center-application-kit/pull/624) feat(permissions): add use-is-authorized hook ([@tdeekens](https://github.com/tdeekens))

#### ⛑ Type: Refactoring

- `application-shell`
  - [#623](https://github.com/commercetools/merchant-center-application-kit/pull/623) refactor: remove projects list toggle ([@tdeekens](https://github.com/tdeekens))

## [13.4.2](https://github.com/commercetools/merchant-center-application-kit/compare/v13.4.1...v13.4.2) (2019-05-09)

Now `application-components` is relying on version `9.2.0` or newer of `@commeretools-frontend/ui-kit`. If you are using an older version, please update that as well.

Also, now that `application-shell` no longer uses `react-select` version 1, you can remove the CSS import in your app entry point. If your application doesn't explicity use `react-select` version 1, you should remove this import.

```js
// remove this next line
import 'react-select/dist/react-select.css';
import React from 'react';
// etc
```

#### 🔮 Type: Chore

- `application-shell`
  - [#621](https://github.com/commercetools/merchant-center-application-kit/pull/621) chore: remove react-select v1 ([@montezume](https://github.com/montezume))
  - [#606](https://github.com/commercetools/merchant-center-application-kit/pull/606) 👯‍♀️ chore: update flopflip 👯‍♀️ ([@tdeekens](https://github.com/tdeekens))
- `application-shell`, `react-notifications`
  - [#616](https://github.com/commercetools/merchant-center-application-kit/pull/616) chore: move deprecated custom prop internal ([@montezume](https://github.com/montezume))

#### ⛑ Type: Refactoring

- `application-shell`
  - [#617](https://github.com/commercetools/merchant-center-application-kit/pull/617) refactor(application-shell): use ui kit select input for locale switcher ([@montezume](https://github.com/montezume))
  - [#618](https://github.com/commercetools/merchant-center-application-kit/pull/618) refactor(project-switcher): refactor to use ui kit select input ([@montezume](https://github.com/montezume))
- `application-components`
  - [#615](https://github.com/commercetools/merchant-center-application-kit/pull/615) refactor: use non deprecated custom props ([@montezume](https://github.com/montezume))

## [13.4.1](https://github.com/commercetools/merchant-center-application-kit/compare/v13.4.0...v13.4.1) (2019-05-03)

#### 🐛 Type: Chore

- `application-shell`
  - [#602](https://github.com/commercetools/merchant-center-application-kit/pull/602) refactor(app-shell): remove old feature flags ([@tdeekens](https://github.com/tdeekens))

## [13.4.0](https://github.com/commercetools/merchant-center-application-kit/compare/v13.3.9...v13.4.0) (2019-05-03)

#### 🔮 Type: Chore

- `i18n`
  - [#600](https://github.com/commercetools/merchant-center-application-kit/pull/600) Translate '/packages/i18n/data/core.json' in 'de' ([@transifex-integration[bot]](https://github.com/apps/transifex-integration))
- `application-components`, `application-shell`, `jest-preset-mc-app`, `l10n`, `mc-http-server`, `mc-scripts`, `sdk`, `sentry`
  - [#598](https://github.com/commercetools/merchant-center-application-kit/pull/598) chore: update deps ([@tdeekens](https://github.com/tdeekens))

#### 💅 Type: Enhancement

- `application-shell`, `i18n`
  - [#599](https://github.com/commercetools/merchant-center-application-kit/pull/599) feat(app-shell): add "Manage Projects" to Quick Access ([@tdeekens](https://github.com/tdeekens))

## [13.3.9](https://github.com/commercetools/merchant-center-application-kit/compare/v13.3.8...v13.3.9) (2019-05-02)

#### 🐛 Type: Bug

- `application-shell`
  - [#590](https://github.com/commercetools/merchant-center-application-kit/pull/594) fix(app-shell): back to project peforming full page reload ([@tdeekens](https://github.com/tdeekens))

## [13.3.8](https://github.com/commercetools/merchant-center-application-kit/compare/v13.3.7...v13.3.8) (2019-04-30)

#### 🐛 Type: Bug

- `application-shell`
  - [#590](https://github.com/commercetools/merchant-center-application-kit/pull/590) refactor(app-shell): to have redirect-to-project-create component ([@tdeekens](https://github.com/tdeekens))

#### 🔮 Type: Chore

- `application-shell`
  - [#592](https://github.com/commercetools/merchant-center-application-kit/pull/592) chore(app-shell): to not fetch project without key ([@tdeekens](https://github.com/tdeekens))

## [13.3.7](https://github.com/commercetools/merchant-center-application-kit/compare/v13.3.6...v13.3.7) (2019-04-29)

#### 🐛 Type: Bug

- `application-shell`
  - [#584](https://github.com/commercetools/merchant-center-application-kit/pull/584) fix(app-shell): project key being set to null ([@tdeekens](https://github.com/tdeekens))

## [13.3.6](https://github.com/commercetools/merchant-center-application-kit/compare/v13.3.5...v13.3.6) (2019-04-29)

#### 🐛 Type: Bug

- `application-shell`
  - [#582](https://github.com/commercetools/merchant-center-application-kit/pull/582) fix(app-shell): routing to project without key ([@tdeekens](https://github.com/tdeekens))

#### 🔮 Type: Chore

- `application-components`, `babel-preset-mc-app`
  - [#574](https://github.com/commercetools/merchant-center-application-kit/pull/574) refactor(components): to use emotion styles ([@emmenko](https://github.com/emmenko))
- `application-components`, `application-shell-connectors`, `application-shell`, `babel-preset-mc-app`, `jest-preset-mc-app`, `l10n`, `mc-http-server`, `mc-scripts`, `permissions`, `react-notifications`, `sdk`, `sentry`
  - [#581](https://github.com/commercetools/merchant-center-application-kit/pull/581) chore: update dependencies ([@tdeekens](https://github.com/tdeekens))

#### ⛑ Type: Refactoring

- `application-components`, `babel-preset-mc-app`
  - [#574](https://github.com/commercetools/merchant-center-application-kit/pull/574) refactor(components): to use emotion styles ([@emmenko](https://github.com/emmenko))

## [13.3.5](https://github.com/commercetools/merchant-center-application-kit/compare/v13.3.4...v13.3.5) (2019-04-26)

#### 🐛 Type: Bug

- `mc-scripts`
  - [#571](https://github.com/commercetools/merchant-center-application-kit/pull/571) fix(mc-scripts): do not use ip address as socket host. Closes [#569](https://github.com/commercetools/merchant-center-application-kit/issues/569) ([@emmenko](https://github.com/emmenko))

## [13.3.4](https://github.com/commercetools/merchant-center-application-kit/compare/v13.3.3...v13.3.4) (2019-04-23)

#### 🐛 Type: Bug

- `application-shell`
  - [#567](https://github.com/commercetools/merchant-center-application-kit/pull/567) fix(app-shell): back to project link colour ([@tdeekens](https://github.com/tdeekens))

## [13.3.3](https://github.com/commercetools/merchant-center-application-kit/compare/v13.3.2...v13.3.3) (2019-04-23)

#### 🔮 Type: Chore

- `application-components`, `application-shell`, `l10n`, `react-notifications`, `sentry`
  - [#564](https://github.com/commercetools/merchant-center-application-kit/pull/564) chore: update deps ([@emmenko](https://github.com/emmenko))

#### ⛑ Type: Refactoring

- `sentry`
  - [#563](https://github.com/commercetools/merchant-center-application-kit/pull/563) refactor(sentry): to also pass location to sentry environment, enable sentry based on tracking value ([@emmenko](https://github.com/emmenko))

## [13.3.2](https://github.com/commercetools/merchant-center-application-kit/compare/v13.3.1...v13.3.2) (2019-04-18)

#### ⛑ Type: Refactoring

- `application-shell`
  - [#555](https://github.com/commercetools/merchant-center-application-kit/pull/555) fix(app-shell): add env variable for enabling sign up ([@tdeekens](https://github.com/tdeekens))

## [13.3.1](https://github.com/commercetools/merchant-center-application-kit/compare/v13.3.0...v13.3.1) (2019-04-17)

#### 🔮 Type: Chore

- `application-shell`
  - [#550](https://github.com/commercetools/merchant-center-application-kit/pull/550) refactor: to pass intl message to Text components ([@emmenko](https://github.com/emmenko))
- `application-components`, `application-shell`, `mc-html-template`, `mc-http-server`, `mc-scripts`, `react-notifications`, `sdk`, `sentry`
  - [#551](https://github.com/commercetools/merchant-center-application-kit/pull/551) fix: update deps ([@tdeekens](https://github.com/tdeekens))

## [13.3.0](https://github.com/commercetools/merchant-center-application-kit/compare/v13.2.0...v13.3.0) (2019-04-17)

#### 🚀 Type: New Feature

- `application-components`, `application-shell`, `i18n`, `react-notifications`
  - [#519](https://github.com/commercetools/merchant-center-application-kit/pull/519) refactor(i18n): to load the i18n messages async ([@emmenko](https://github.com/emmenko))
- `application-shell`, `assets`, `i18n`
  - [#545](https://github.com/commercetools/merchant-center-application-kit/pull/545) feat: add project not initialized screen ([@tdeekens](https://github.com/tdeekens))

#### 🐛 Type: Bug

- `application-components`
  - [#542](https://github.com/commercetools/merchant-center-application-kit/pull/542) fix(dialogs): content overflow. Refs #534 ([@emmenko](https://github.com/emmenko))
- `jest-preset-mc-app`
  - [#535](https://github.com/commercetools/merchant-center-application-kit/pull/535) fix: replace deprecated and broken package jest-plugin-filename with jest-watch-typeahead ([@M1r1k](https://github.com/M1r1k))

#### 🔮 Type: Chore

- `i18n`
  - [#547](https://github.com/commercetools/merchant-center-application-kit/pull/547) chore: fix formatting ([@tdeekens](https://github.com/tdeekens))
- `application-shell`, `i18n`, `l10n`
  - [#544](https://github.com/commercetools/merchant-center-application-kit/pull/544) chore: update deps ([@gnerkus](https://github.com/gnerkus))
- `application-components`, `application-shell`, `react-notifications`
  - [#543](https://github.com/commercetools/merchant-center-application-kit/pull/543) chore: use non deprecated custom properties ([@montezume](https://github.com/montezume))

## [13.2.0](https://github.com/commercetools/merchant-center-application-kit/compare/v13.1.0...v13.2.0) (2019-04-09)

#### 💅 Type: Enhancement

- `application-shell`
  - [#531](https://github.com/commercetools/merchant-center-application-kit/pull/531) feat(configure-apollo): add special mapping for Store entity ([@qmateub](https://github.com/qmateub))

## [13.1.0](https://github.com/commercetools/merchant-center-application-kit/compare/v13.0.2...v13.1.0) (2019-04-08)

#### 🚀 Type: New Feature

- `application-shell`
  - [#528](https://github.com/commercetools/merchant-center-application-kit/pull/528) feat(app-shell): add allowing to pass ldTrackingTenant alone ([@tdeekens](https://github.com/tdeekens))

#### ⛑ Type: Refactoring

- `application-components`, `application-shell-connectors`, `application-shell`, `babel-preset-mc-app`, `create-mc-app`, `i18n`, `jest-preset-mc-app`, `l10n`, `mc-scripts`, `permissions`, `react-notifications`, `sdk`, `sentry`
  - [#526](https://github.com/commercetools/merchant-center-application-kit/pull/526) chore: update deps ([@tdeekens](https://github.com/tdeekens))

## [13.0.2](https://github.com/commercetools/merchant-center-application-kit/compare/v13.0.1...v13.0.2) (2019-04-05)

#### 🐛 Type: Bug

- `application-shell`
  - [#517](https://github.com/commercetools/merchant-center-application-kit/pull/517) fix(app-shell): redirect to logout when catching unauthorized error ([@tdeekens](https://github.com/tdeekens))

## [13.0.1](https://github.com/commercetools/merchant-center-application-kit/compare/v13.0.0...v13.0.1) (2019-04-04)

#### 🐛 Type: Bug

- `application-shell`
  - [#515](https://github.com/commercetools/merchant-center-application-kit/pull/515) fix(app-shell): to unset previously set cached value ([@tdeekens](https://github.com/tdeekens))

## [13.0.0](https://github.com/commercetools/merchant-center-application-kit/compare/v12.2.2...v13.0.0) (2019-04-04)

This release introduces a **breaking change** which however will not entail any **migration steps** as it only affects internal packages. However, we want to follow strict semver and therefore we should mark it as a major version bump.

In short:

1. A new package called `mc-dev-authentication` now contains routes and views for login and logout shared by both the `webpack-dev-server` and `mc-http-server`
2. All routes and components around login and logout have been removed from the `@commercetools-frontend/application-shell` and have been migrated into an internal Merchant Center application
3. Redirects upon creating an account are not pointing to the account application, where the user can create the first organization + project

For commercetools developers there is more in-depth documentation in our internal repositories. Do not hestitate to reach out for further questions.

#### 💥 Type: Breaking Change

- `application-shell-connectors`, `application-shell`, `constants`, `i18n`, `mc-dev-authentication`, `mc-http-server`, `mc-scripts`
  - [#444](https://github.com/commercetools/merchant-center-application-kit/pull/444) Remove login/logout components and redirect to urls ([@tdeekens](https://github.com/tdeekens))

#### 🚀 Type: New Feature

- `application-components`, `application-shell`, `i18n`, `l10n`, `mc-scripts`
  - [#511](https://github.com/commercetools/merchant-center-application-kit/pull/511) feat(i18n): support new locales fr-FR and zh-CN ([@emmenko](https://github.com/emmenko))

## [12.2.2](https://github.com/commercetools/merchant-center-application-kit/compare/v12.2.1...v12.2.2) (2019-04-03)

#### 🐛 Type: Bug

- `application-shell`
  - [#509](https://github.com/commercetools/merchant-center-application-kit/pull/509) fix(app-shell): prevent main content to be scrollable when modals are open ([@emmenko](https://github.com/emmenko))
  - [#506](https://github.com/commercetools/merchant-center-application-kit/pull/506) fix(app-shell): css height for app container ([@emmenko](https://github.com/emmenko))
- Other
  - [#508](https://github.com/commercetools/merchant-center-application-kit/pull/508) fix: store cypress artifacts ([@tdeekens](https://github.com/tdeekens))

#### 🔮 Type: Chore

- `application-components`, `application-shell`, `jest-preset-mc-app`, `l10n`, `permissions`, `react-notifications`, `sentry`
  - [#507](https://github.com/commercetools/merchant-center-application-kit/pull/507) Update dependencies ([@emmenko](https://github.com/emmenko))

## [12.2.1](https://github.com/commercetools/merchant-center-application-kit/compare/v12.2.0...v12.2.1) (2019-04-01)

#### 🐛 Type: Bug

- `assets`
  - [#503](https://github.com/commercetools/merchant-center-application-kit/pull/503) fix(assets): publish all files and folders ([@emmenko](https://github.com/emmenko))

## [12.2.0](https://github.com/commercetools/merchant-center-application-kit/compare/v12.1.0...v12.2.0) (2019-04-01)

#### 💅 Type: Refactoring

- [#492](https://github.com/commercetools/merchant-center-application-kit/pull/492) Decoupled html template from Webpack ([@emmenko](https://github.com/emmenko))

## [12.1.0](https://github.com/commercetools/merchant-center-application-kit/compare/v12.0.0...v12.1.0) (2019-03-29)

#### 💅 Type: Enhancement

- `application-shell`
  - [#487](https://github.com/commercetools/merchant-center-application-kit/pull/487) feat(app-shell): Add prop do defer adapter config on flop flip provider setup ([@jonnybel](https://github.com/jonnybel))

#### ⛑ Type: Refactoring

- [#486](https://github.com/commercetools/merchant-center-application-kit/pull/486) refactor(ci): migrate to CircleCI ([@tdeekens](https://github.com/tdeekens))

#### 🔮 Type: Chore

- `application-shell`
  - [#493](https://github.com/commercetools/merchant-center-application-kit/pull/493) chore: update launchdarkly-adapter and flopflip ([@tdeekens](https://github.com/tdeekens))

## [12.0.0](https://github.com/commercetools/merchant-center-application-kit/compare/v11.4.0...v12.0.0) (2019-03-26)

This release introduces a **breaking change** on the `test-utils` which requires some **migration steps**. We'll go through them now:

#### 💥 Type: Breaking Change

- `application-shell`
  - [#482](https://github.com/commercetools/merchant-center-application-kit/pull/482) refactor(test-utils): to avoid conflicting named exports with rtl render function ([@emmenko](https://github.com/emmenko))

The `@commercetools-frontend/application-shell/test-utils` render functions have been renamed to avoid naming conflicts with the re-exported properties of `react-testing-library` (e.g. `render`).

| Before               | After                            |
| -------------------- | -------------------------------- |
| `render`             | `renderApp`                      |
| `renderWithRedux`    | `renderAppWithRedux`             |
| `experimentalRender` | `experimentalRenderAppWithRedux` |

#### 🐛 Type: Bug

- `application-shell`
  - [#481](https://github.com/commercetools/merchant-center-application-kit/pull/481) chore: update omit-empty-es to v1.0.3 ([@emmenko](https://github.com/emmenko))

## [11.4.0](https://github.com/commercetools/merchant-center-application-kit/compare/v11.3.0...v11.4.0) (2019-03-26)

#### 🔮 Type: Chore

- `mc-html-template`
  - [#478](https://github.com/commercetools/merchant-center-application-kit/pull/478) chore: remove csp report-uri ([@emmenko](https://github.com/emmenko))
- `application-shell`, `babel-preset-mc-app`, `i18n`, `jest-preset-mc-app`, `mc-scripts`
  - [#477](https://github.com/commercetools/merchant-center-application-kit/pull/477) chore: upgrade to babel 7.4 ([@emmenko](https://github.com/emmenko))

#### ⛑ Type: Refactoring

- `application-shell`, `sentry`
  - [#476](https://github.com/commercetools/merchant-center-application-kit/pull/476) refactor(sentry): to use newest sdk over deprecated raven client ([@emmenko](https://github.com/emmenko))
- `application-components`
  - [#466](https://github.com/commercetools/merchant-center-application-kit/pull/466) fix: update storybook to v5 ([@tdeekens](https://github.com/tdeekens))

## [11.3.0](https://github.com/commercetools/merchant-center-application-kit/compare/v11.2.0...v11.3.0) (2019-03-21)

#### 💅 Type: Enhancement

- `application-shell`
  - [#462](https://github.com/commercetools/merchant-center-application-kit/pull/462) feat(app-shell): quick-access to have noresults message ([@tdeekens](https://github.com/tdeekens))
- `application-shell`
  - [#463](https://github.com/commercetools/merchant-center-application-kit/pull/463) feat(app-shell): quick access to have loading indicator ([@tdeekens](https://github.com/tdeekens))

#### ⛑ Type: Refactoring

- `application-shell`, `react-notifications`
  - [#460](https://github.com/commercetools/merchant-center-application-kit/pull/460) fix: update react-router to v5 ([@tdeekens](https://github.com/tdeekens))

## [11.2.0](https://github.com/commercetools/merchant-center-application-kit/compare/v11.1.0...v11.2.0) (2019-03-18)

#### 🔮 Type: Chore

- `mc-scripts`
  - [#458](https://github.com/commercetools/merchant-center-application-kit/pull/458) fix(mc-scripts): use terser as minifier ([@tdeekens](https://github.com/tdeekens))
- `application-shell`, `browser-history`, `react-notifications`
  - [#449](https://github.com/commercetools/merchant-center-application-kit/pull/449) React Router v4.4.0 ([@emmenko](https://github.com/emmenko))

#### 💅 Type: Enhancement

- `application-shell`
  - [#457](https://github.com/commercetools/merchant-center-application-kit/pull/457) feat(app-shell): add re-export of gtm logout and flopflip ([@tdeekens](https://github.com/tdeekens))

## [11.1.0](https://github.com/commercetools/merchant-center-application-kit/compare/v11.0.2...v11.1.0) (2019-03-14)

#### 🚀 Type: New Feature

- `sdk`
  - [#446](https://github.com/commercetools/merchant-center-application-kit/pull/446) Support HEAD-requests ([@pa3](https://github.com/pa3))

## [11.0.2](https://github.com/commercetools/merchant-center-application-kit/compare/v11.0.1...v11.0.2) (2019-03-11)

#### 🔮 Type: Chore

- `application-shell`
  - [#436](https://github.com/commercetools/merchant-center-application-kit/pull/436) chore: update privacy link ([@emmenko](https://github.com/emmenko))

## [11.0.1](https://github.com/commercetools/merchant-center-application-kit/compare/v11.0.0...v11.0.1) (2019-03-06)

#### 🐛 Type: Bug

- `application-shell`
  - [#426](https://github.com/commercetools/merchant-center-application-kit/pull/426) fix(apps-menu): to trigger remote query based on servedByProxy value ([@emmenko](https://github.com/emmenko))
- `application-shell`, `react-notifications`
  - [#425](https://github.com/commercetools/merchant-center-application-kit/pull/425) fix: pin react-router to 4.4.0-beta.6 ([@emmenko](https://github.com/emmenko))

## [11.0.0](https://github.com/commercetools/merchant-center-application-kit/compare/v10.0.0...v11.0.0) (2019-02-28)

> NOTE: the breaking change only affects our internal discount application. However, we want to follow strict semver and therefore we should mark it as a major version bump.

#### 🐛 Type: Bug

- `application-components`
  - [#408](https://github.com/commercetools/merchant-center-application-kit/pull/408) fix(components/dialog): to pass title for modal aria-label ([@emmenko](https://github.com/emmenko))
- `application-shell`, `browser-history`
  - [#413](https://github.com/commercetools/merchant-center-application-kit/pull/413) fix(test-utils): create default memory history with the enhanced location ([@emmenko](https://github.com/emmenko))

#### 💥 Type: Breaking Change

- `jest-preset-mc-app`, `mc-scripts`
  - [#402](https://github.com/commercetools/merchant-center-application-kit/pull/402) feat: remove pegjs loader from webpack config ([@montezume](https://github.com/montezume))

#### 🔮 Type: Chore

- `application-shell-connectors`, `application-shell`
  - [#423](https://github.com/commercetools/merchant-center-application-kit/pull/423) chore: upgrade deps ([@emmenko](https://github.com/emmenko))
- `application-shell`, `react-notifications`
  - [#415](https://github.com/commercetools/merchant-center-application-kit/pull/415) chore: upgrade to react-router v4.4.0-beta.7 ([@emmenko](https://github.com/emmenko))
- `permissions`
  - [#414](https://github.com/commercetools/merchant-center-application-kit/pull/414) chore: consistently use lodash-es import ([@emmenko](https://github.com/emmenko))
- `application-components`
  - [#375](https://github.com/commercetools/merchant-center-application-kit/pull/375) Add Percy VRT tests ([@montezume](https://github.com/montezume))
- `i18n`
  - [#405](https://github.com/commercetools/merchant-center-application-kit/pull/405) chore: pull translations [skip ci](<[@emmenko](https://github.com/emmenko)>)

#### ✍️ Type: Documentation

- `actions-global`, `application-components`, `application-shell-connectors`, `application-shell`, `assets`, `babel-preset-mc-app`, `browser-history`, `constants`, `create-mc-app`, `eslint-config-mc-app`, `i18n`, `jest-preset-mc-app`, `l10n`, `mc-html-template`, `mc-http-server`, `mc-scripts`, `notifications`, `permissions`, `react-notifications`, `sdk`, `sentry`, `storage`, `url-utils`
  - [#416](https://github.com/commercetools/merchant-center-application-kit/pull/416) docs(readme): update badges [skip ci](<[@emmenko](https://github.com/emmenko)>)

#### 💅 Type: Enhancement

- `application-components`
  - [#412](https://github.com/commercetools/merchant-center-application-kit/pull/412) Dialog layout fixes, add VRT tests 💅 ([@emmenko](https://github.com/emmenko))

#### ⛑ Type: Refactoring

- `application-components`
  - [#411](https://github.com/commercetools/merchant-center-application-kit/pull/411) fix(components/dialog): to have bottom padding for content container ([@emmenko](https://github.com/emmenko))

## [10.0.0](https://github.com/commercetools/merchant-center-application-kit/compare/v9.0.1...v10.0.0) (2019-02-26)

This release introduces a **breaking change** which may entail some **migration steps**. We'll go through them now:

#### 💥 Type: Breaking Change

- `mc-scripts`
  - [#397](https://github.com/commercetools/merchant-center-application-kit/pull/397) Update uglify plugin / stop shipping es6 code to ie ([@montezume](https://github.com/montezume))

Previously building an application in `production` mode would succeeds, even if you imported vendors that shipped untranspiled code. However, **now they will fail**, as our uglify plugin does not support es6 code. If you get an error building your `production` build, you should pass a list of vendor packages that need to be transpiled to the `create-webpack-config-for-production` like below:

```js
const path = require('path');
const createWebpackConfigForProduction = require('@commercetools-frontend/mc-scripts/config/create-webpack-config-for-production');

const distPath = path.resolve(__dirname, 'dist');
const entryPoint = path.resolve(__dirname, 'src/index.js');
// For example, `omit-empty` should be transpiled
const vendorsToTranspile = [/node_modules\/omit-empty/];

const sourceFolders = [path.resolve(__dirname, 'src')];

module.exports = createWebpackConfigForProduction({
  distPath,
  entryPoint,
  sourceFolders,
  vendorsToTranspile,
});
```

#### 🚀 Type: New Feature

- `application-components`
  - [#399](https://github.com/commercetools/merchant-center-application-kit/pull/399) feat(components/dialogs): add FormDialog ([@emmenko](https://github.com/emmenko))

#### 🔮 Type: Chore

- [#395](https://github.com/commercetools/merchant-center-application-kit/pull/395) chore: update deps ([@montezume](https://github.com/montezume))
- [#400](https://github.com/commercetools/merchant-center-application-kit/pull/400) drop recompose ([@emmenko](https://github.com/emmenko))

## [9.0.1](https://github.com/commercetools/merchant-center-application-kit/compare/v9.0.0...v9.0.1) (2019-02-22)

#### 🐛 Type: Bug

- `application-shell`
  - [#387](https://github.com/commercetools/merchant-center-application-kit/pull/387) fix(app-shell): to not open in new tab ([@tdeekens](https://github.com/tdeekens))

## [9.0.0](https://github.com/commercetools/merchant-center-application-kit/compare/v8.0.0...v9.0.0) (2019-02-22)

## BREAKING CHANGES 💣

The `ui-kit` peer dependency has been bumped to `v9.x`.

#### 🐛 Type: Bug

- `application-shell`
  - [#381](https://github.com/commercetools/merchant-center-application-kit/pull/381) fix(app-shell): quick-access to support full reloads ([@tdeekens](https://github.com/tdeekens))

#### 🚀 Type: New Feature

- `application-shell`, `i18n`
  - [#385](https://github.com/commercetools/merchant-center-application-kit/pull/385) chore(app-shell): expose ApplicationShellProvider ([@emmenko](https://github.com/emmenko))
- `application-components`
  - [#377](https://github.com/commercetools/merchant-center-application-kit/pull/377) feat: add <ConfirmationDialog> ([@emmenko](https://github.com/emmenko))
- `application-components`, `application-shell`
  - [#367](https://github.com/commercetools/merchant-center-application-kit/pull/367) feat: add <InfoDialog> ([@emmenko](https://github.com/emmenko))

## [8.0.0](https://github.com/commercetools/merchant-center-application-kit/compare/v7.3.4...v8.0.0) (2019-02-18)

## BREAKING CHANGES 💣

This release introduces a **breaking change** which may entail some **migration steps**. We'll go through them now:

#### 💥 Type: Breaking Change

- `application-shell`
  - [#354](https://github.com/commercetools/merchant-center-application-kit/pull/354) fix(application-shell): redirect to welcome by default ([@tdeekens](https://github.com/tdeekens))

Previously the `<ApplicationShell>` had an internal redirect from `/:projectKey` to `/:projectKey/dashboard`. This redirect is now removed and it's done by our internal proxy router as we are rolling out a new landing page called **Welcome screen** (`/:projectKey/welcome`). However, for **development**, you need to adjust the redirect as illustrated below:

If you for instance had a:

```jsx
<Switch>
  {process.env.NODE_ENV === 'production' ? null : (
    <Redirect from="/:projectKey/dashboard" to="/:projectKey/welcome" />
  )}
</Switch>
```

or any other redirect assuming the dashboard route could have been rendered inadvertently, please change it to:

```jsx
<Switch>
  {process.env.NODE_ENV === 'production' ? null : (
    <Redirect exact={true} from="/:projectKey" to="/:projectKey/welcome" />
  )}
</Switch>
```

In short a diff of the change required to the `<Redirect />` would be:

```diff
<Redirect
+  exact={true}
-  from="/:projectKey/dashboard"
+  from="/:projectKey"
  to="/:projectKey/xxx"
/>
```

Given during development you intended to not end up on `/<projectKey>` by default.

#### 🔮 Type: Chore

- `application-components`, `application-shell`, `mc-scripts`
  - [#366](https://github.com/commercetools/merchant-center-application-kit/pull/366) Add Storybook for developing application components ([@emmenko](https://github.com/emmenko))
- `application-components`, `application-shell-connectors`, `application-shell`, `babel-preset-mc-app`, `i18n`, `jest-preset-mc-app`, `l10n`, `mc-scripts`, `permissions`, `react-notifications`, `sdk`, `sentry`
  - [#362](https://github.com/commercetools/merchant-center-application-kit/pull/362) chore: update deps ([@tdeekens](https://github.com/tdeekens))

#### ⛑ Type: Refactoring

- `application-components`, `application-shell`, `mc-scripts`
  - [#366](https://github.com/commercetools/merchant-center-application-kit/pull/366) Add Storybook for developing application components ([@emmenko](https://github.com/emmenko))

## [7.3.4](https://github.com/commercetools/merchant-center-application-kit/compare/v7.3.3...v7.3.4) (2019-02-08)

#### 🐛 Type: Bug

- `browser-history`
  - [#355](https://github.com/commercetools/merchant-center-application-kit/pull/355) fix(browser-history): to omit the question mark ([@tdeekens](https://github.com/tdeekens))

## [7.3.3](https://github.com/commercetools/merchant-center-application-kit/compare/v7.3.2...v7.3.3) (2019-02-07)

#### 🐛 Type: Bug

- `application-shell`
  - [#352](https://github.com/commercetools/merchant-center-application-kit/pull/352) Fix fetching custom application menu only when feature is enabled ([@tdeekens](https://github.com/tdeekens))

#### ⛑ Type: Refactoring

- `application-shell`, `browser-history`, `sdk`
  - [#348](https://github.com/commercetools/merchant-center-application-kit/pull/348) Replace `query-string` with `qss` ([@tdeekens](https://github.com/tdeekens))

## [7.3.2](https://github.com/commercetools/merchant-center-application-kit/compare/v7.3.1...v7.3.2) (2019-02-06)

#### 🔮 Type: Chore

- `notifications`
  - [#345](https://github.com/commercetools/merchant-center-application-kit/pull/345) chore: drop unnecessary deep-freeze dependency ([@emmenko](https://github.com/emmenko))

#### ⛑ Type: Refactoring

- `application-shell`, `babel-preset-mc-app`, `jest-preset-mc-app`, `mc-scripts`
  - [#346](https://github.com/commercetools/merchant-center-application-kit/pull/346) refactor: to not setupTestFramework for jest (so we can update) ([@tdeekens](https://github.com/tdeekens))

## [7.3.1](https://github.com/commercetools/merchant-center-application-kit/compare/v7.3.0...v7.3.1) (2019-02-04)

#### 🐛 Type: Bug

- `application-shell`
  - [#341](https://github.com/commercetools/merchant-center-application-kit/pull/341) fix(apollo-cache): to use \_\_typename + key for whitelisted types only if the id is not present ([@emmenko](https://github.com/emmenko))

#### 🚀 Type: New Feature

- `application-shell`, `i18n`
  - [#342](https://github.com/commercetools/merchant-center-application-kit/pull/342) Add placeholder to quick-access input ([@tdeekens](https://github.com/tdeekens))

## [7.3.0](https://github.com/commercetools/merchant-center-application-kit/compare/v7.2.1...v7.3.0) (2019-02-01)

#### 🔮 Type: Chore

- `jest-preset-mc-app`
  - [#331](https://github.com/commercetools/merchant-center-application-kit/pull/331) chore: add setupFilesAfterEnv (for jest@24) ([@tdeekens](https://github.com/tdeekens))

#### 💅 Type: Enhancement

- `mc-http-server`
  - [#332](https://github.com/commercetools/merchant-center-application-kit/pull/332) Add graceful shutdown and isolated Prometheus metrics server to mc-http-server ([@tdeekens](https://github.com/tdeekens))

## [7.2.1](https://github.com/commercetools/merchant-center-application-kit/compare/v7.2.0...v7.2.1) (2019-01-31)

#### 🐛 Type: Bug

- `application-components`
  - [#329](https://github.com/commercetools/merchant-center-application-kit/pull/329) fix(application-components): media-queries.css publish file path ([@emmenko](https://github.com/emmenko))

## [7.2.0](https://github.com/commercetools/merchant-center-application-kit/compare/v7.1.3...v7.2.0) (2019-01-29)

#### 🔮 Type: Chore

- `application-components`, `application-shell`, `mc-scripts`, `react-notifications`
  - [#325](https://github.com/commercetools/merchant-center-application-kit/pull/325) chore: update ui-kit deps to 8.0.0 ([@emmenko](https://github.com/emmenko))
- `application-shell-connectors`, `application-shell`
  - [#326](https://github.com/commercetools/merchant-center-application-kit/pull/326) chore: update reps ([@emmenko](https://github.com/emmenko))

## [7.1.3](https://github.com/commercetools/merchant-center-application-kit/compare/v7.1.2...v7.1.3) (2019-01-25)

#### 🐛 Type: Bug

- [#313](https://github.com/commercetools/merchant-center-application-kit/pull/313) fix(template/starter): add missing react-select css import [skip ci](<[@emmenko](https://github.com/emmenko)>)

#### ⛑ Type: Refactoring

- `application-shell`
  - [#314](https://github.com/commercetools/merchant-center-application-kit/pull/314) Refactor to not `ReconfigureFlopflip` but pass `projectKey` from url ([@tdeekens](https://github.com/tdeekens))

## [7.1.2](https://github.com/commercetools/merchant-center-application-kit/compare/v7.1.1...v7.1.2) (2019-01-24)

#### 🐛 Type: Bug

- `application-shell`
  - [#310](https://github.com/commercetools/merchant-center-application-kit/pull/310) fix(app-shell): to be specific about cache key generation ([@tdeekens](https://github.com/tdeekens))

## [7.1.1](https://github.com/commercetools/merchant-center-application-kit/compare/v7.1.0...v7.1.1) (2019-01-23)

#### 🐛 Type: Bug

- `application-shell`
  - [#308](https://github.com/commercetools/merchant-center-application-kit/pull/308) fix(app-shell): to pick menu label based on user locale language tag only ([@emmenko](https://github.com/emmenko))

## [7.1.0](https://github.com/commercetools/merchant-center-application-kit/compare/v7.0.0...v7.1.0) (2019-01-22)

#### 🔮 Type: Chore

- `application-shell`, `react-notifications`
  - [#305](https://github.com/commercetools/merchant-center-application-kit/pull/305) chore: update ui-kit to v7 ([@montezume](https://github.com/montezume))

The `ui-kit` peer dependency now requires to use version `7.x`.

## [7.0.0](https://github.com/commercetools/merchant-center-application-kit/compare/v6.0.1...v7.0.0) (2019-01-18)

## BREAKING CHANGES (local development only) 💣

> This release contains mostly internal changes that **do not affect production environments**.

Starting from version `7.0.0`, applications will load the navigation menu items on runtime (_the links in the left side navigation in the Merchant Center_). This change has the benefit of keeping the navigation items consistent and up-to-date for all running applications, as it's not hardcoded anymore in the ApplicationShell package.

\*\*We recommend to upgrade your applications to this version as soon as possible".

> Custom applications will still configure their navigation menu items within the Merchant Center.

### Development setup

When developing locally, you usually work on one application which has its own navigation menu items. It does not make sense to show all other possible navigation links because they don't work.
Therefore, in `NODE_ENV=development` mode the navigation menu items are not being fetched (including the custom applications menu items). Instead, you should specify a `menu.json` file that will be loaded by the `<ApplicationShell>` instead of making the network request.

```js
<ApplicationShell
  // ...
  DEV_ONLY__loadNavbarMenuConfig={() =>
    import('../../../menu.json').then((data) => data.default || data)
  }
  render={() => {}}
/>
```

This function is only executed in `NODE_ENV=development`. We recommend to use `import` so that bundlers can create a split point and the `menu.json` won't end up in the main bundle in production.

The `menu.json` has the following structure:

```json
{
  "key": "state-machines",
  "uriPath": "state-machines",
  "icon": "RocketIcon",
  "permissions": ["ViewStates", "ManageStates"],
  "featureToggle": null,
  "labelAllLocales": [
    {
      "locale": "en",
      "value": "State Machines"
    },
    {
      "locale": "de",
      "value": "Zustandsmaschinen"
    },
    {
      "locale": "es",
      "value": "Máquinas de estado"
    }
  ],
  "submenu": [
    {
      "key": "state-machines-new",
      "uriPath": "state-machines/new",
      "permissions": ["ManageStates"],
      "featureToggle": null,
      "labelAllLocales": [
        {
          "locale": "en",
          "value": "Add State Machine"
        },
        {
          "locale": "de",
          "value": "Zustandsmaschine hinzufügen"
        },
        {
          "locale": "es",
          "value": "Agregar máquina de estado"
        }
      ]
    }
  ]
}
```

This is the GraphQL representation of the JSON shape:

```graphql
type NavbarMenu {
  shouldRenderDivider: Boolean!
  key: String!
  uriPath: String!
  icon: String!
  labelAllLocales: [LocalizedField!]!
  featureToggle: String
  permissions: [String!]!
  submenu: [BaseMenu!]!
}

type BaseMenu {
  key: String!
  uriPath: String!
  labelAllLocales: [LocalizedField!]!
  featureToggle: String
  permissions: [String!]!
}

type LocalizedField {
  locale: String!
  value: String!
}
```

#### 🐛 Type: Bug

- `l10n`
  - [#290](https://github.com/commercetools/merchant-center-application-kit/pull/290) fix(l10n): return correct localized information ([@montezume](https://github.com/montezume))

#### ✍️ Type: Documentation

- [#294](https://github.com/commercetools/merchant-center-application-kit/pull/294) docs(readme): update getting started and local development sections ([@emmenko](https://github.com/emmenko))

#### 💅 Type: Enhancement

- `application-shell`, `i18n`, `mc-scripts`
  - [#289](https://github.com/commercetools/merchant-center-application-kit/pull/289) External menu configurations ([@emmenko](https://github.com/emmenko))
- `application-shell`, `babel-preset-mc-app`, `mc-scripts`, `sdk`
  - [#286](https://github.com/commercetools/merchant-center-application-kit/pull/286) refactor: disable loggers based on runtime configuration ([@emmenko](https://github.com/emmenko))

#### 🚀 Type: New Feature

- `application-shell`
  - [#297](https://github.com/commercetools/merchant-center-application-kit/pull/297) feat(test-utils): allow to pass a mapNotificationToComponent function ([@emmenko](https://github.com/emmenko))

## [6.0.1](https://github.com/commercetools/merchant-center-application-kit/compare/v6.0.0...v6.0.1) (2019-01-14)

#### 💅 Type: Enhancement

- `application-shell`, `babel-preset-mc-app`, `mc-scripts`, `sdk`
  - [#286](https://github.com/commercetools/merchant-center-application-kit/pull/286) refactor: disable loggers based on runtime configuration ([@emmenko](https://github.com/emmenko))

#### ⛑ Type: Refactoring

- `application-shell`, `babel-preset-mc-app`, `mc-scripts`, `sdk`
  - [#286](https://github.com/commercetools/merchant-center-application-kit/pull/286) refactor: disable loggers based on runtime configuration ([@emmenko](https://github.com/emmenko))

#### 🐛 Type: Bug

- `l10n`
- [#290](https://github.com/commercetools/merchant-center-application-kit/pull/290) fix(l10n): use correct translated data ([@montezume](https://github.com/montezume))

## [6.0.0](https://github.com/commercetools/merchant-center-application-kit/compare/v5.1.1...v6.0.0) (2019-01-13)

## BREAKING CHANGES 💣

ESLint is now a peer dependency in [#277](https://github.com/commercetools/merchant-center-application-kit/pull/277). Please make sure that ESLint and all required plugins are installed in your project. You can always check for the required list of plugins in the [package.json](https://github.com/commercetools/merchant-center-application-kit/blob/main/packages/eslint-config-mc-app/package.json) of `eslint-config-mc-app`. In order to install all peer dependencies with a single command run:

```bash
$ npx install-peerdeps --dev @commercetools-frontend/eslint-config-mc-app
```

#### 💥 Type: Breaking Change

- `application-shell-connectors`, `application-shell`, `eslint-config-mc-app`, `i18n`, `jest-preset-mc-app`, `permissions`, `react-notifications`, `sdk`, `sentry`
  - [#277](https://github.com/commercetools/merchant-center-application-kit/pull/277) chore(eslint-config-mc-app): use only peer deps ([@emmenko](https://github.com/emmenko))

#### ⛑ Type: Refactoring

- `application-shell`, `jest-preset-mc-app`, `mc-scripts`, `sdk`
  - [#278](https://github.com/commercetools/merchant-center-application-kit/pull/278) fix(mc-scripts): use unfetch as polyfill ([@tdeekens](https://github.com/tdeekens))

## [5.1.1](https://github.com/commercetools/merchant-center-application-kit/compare/v5.1.0...v5.1.1) (2019-01-12)

#### 🐛 Type: Bug

- `mc-scripts`
  - [#275](https://github.com/commercetools/merchant-center-application-kit/pull/275) fix(mc-scripts): add dynamic import plugin to fix vendor optimizations ([@tdeekens](https://github.com/tdeekens))

## [5.1.0](https://github.com/commercetools/merchant-center-application-kit/compare/v5.0.3...v5.1.0) (2019-01-10)

#### 🐛 Type: Bug

- `application-shell`, `react-notifications`
  - [#271](https://github.com/commercetools/merchant-center-application-kit/pull/271) chore: update ui-kit and make login submit on enter ([@montezume](https://github.com/montezume))

#### 🔮 Type: Chore

- `application-shell`

  - [#274](https://github.com/commercetools/merchant-center-application-kit/pull/274) chore(app-shell): remove unused components 🚮 ([@emmenko](https://github.com/emmenko))

- `application-shell`, `react-notifications`
  - [#269](https://github.com/commercetools/merchant-center-application-kit/pull/269) chore: update ui-kit to v6 ([@montezume](https://github.com/montezume))
- `application-shell`, `babel-preset-mc-app`, `create-mc-app`, `eslint-config-mc-app`, `jest-preset-mc-app`, `l10n`, `mc-html-template`, `mc-scripts`, `sdk`
  - [#267](https://github.com/commercetools/merchant-center-application-kit/pull/267) chore: update deps ([@tdeekens](https://github.com/tdeekens))
- `mc-scripts`
  - [#255](https://github.com/commercetools/merchant-center-application-kit/pull/255) fix(deps): update dependency webpack-dev-server to v3.1.14

#### 🚀 Type: New Feature

- `babel-preset-mc-app`, `mc-scripts`
  - [#272](https://github.com/commercetools/merchant-center-application-kit/pull/272) feat: allow to enable vendor optimizations in production webpack config ([@tdeekens](https://github.com/tdeekens))
- `application-shell-connectors`, `application-shell`
  - [#251](https://github.com/commercetools/merchant-center-application-kit/pull/251) Add `menuVisibilities` and `allAppliedMenuVisibilities` ([@tdeekens](https://github.com/tdeekens))

#### ⛑ Type: Refactoring

- `create-mc-app`
  - [#265](https://github.com/commercetools/merchant-center-application-kit/pull/265) refactor(create-mc-app): to download template from github repository ([@emmenko](https://github.com/emmenko))

## [5.0.3](https://github.com/commercetools/merchant-center-application-kit/compare/v5.0.2...v5.0.3) (2019-01-04)

#### 🐛 Type: Bug

- `application-shell`
  - [#252](https://github.com/commercetools/merchant-center-application-kit/pull/252) fix(app-shell): do not render GtmContext.Provider, so default value is used ([@emmenko](https://github.com/emmenko))

## [5.0.2](https://github.com/commercetools/merchant-center-application-kit/compare/v5.0.1...v5.0.2) (2019-01-04)

#### 🐛 Type: Bug

- [#247](https://github.com/commercetools/merchant-center-application-kit/pull/247) fix(rollup): rename lodash import to lodash-es only for es bundle ([@emmenko](https://github.com/emmenko))

## [5.0.1](https://github.com/commercetools/merchant-center-application-kit/compare/v5.0.0...v5.0.1) (2019-01-03)

#### 🐛 Type: Bug

- `create-mc-app`
  - [#244](https://github.com/commercetools/merchant-center-application-kit/pull/244) chore: include create-mc-app templates in yarn workspaces, to define correct versions of dependencies ([@emmenko](https://github.com/emmenko))

#### ⛑ Type: Refactoring

- `application-shell`
  - [#245](https://github.com/commercetools/merchant-center-application-kit/pull/245) refactor(application-shell): permission prop-type form navbar ([@tdeekens](https://github.com/tdeekens))

## [5.0.0](https://github.com/commercetools/merchant-center-application-kit/compare/v4.4.0...v5.0.0) (2019-01-03)

## BREAKING CHANGES 💣

We dropped some legacy stuff related to Redux. Please refer to the PR [#197](https://github.com/commercetools/merchant-center-application-kit/pull/197) to get more detailed info and to follow the upgrade migration guide.

Furthermore, we dropped support to the following deprecated things:

- format of permissions as objects (`[{ mode: 'manage', resource: 'products' }]`) from the `@commercetools-frontend/permissions` package
- components to access user and project data `<FetchUser>` and `<FetchProject>` from the `@commercetools-frontend/application-shell` package

#### 🐛 Type: Bug

- `application-shell`
  - [#216](https://github.com/commercetools/merchant-center-application-kit/pull/216) Fix test utils and quick access ([@dferber90](https://github.com/dferber90))
- `application-shell`
  - [#211](https://github.com/commercetools/merchant-center-application-kit/pull/211) fix(login): reset password dialog redirect, refactor to use formik ([@emmenko](https://github.com/emmenko))

#### 💥 Type: Breaking Change

- `application-shell`, `permissions`, `sdk`
  - [#242](https://github.com/commercetools/merchant-center-application-kit/pull/242) chore: drop deprecated components ([@emmenko](https://github.com/emmenko))
- `actions-global`, `application-shell-connectors`, `application-shell`, `create-mc-app`, `notifications`, `permissions`, `react-notifications`, `sdk`
  - [#197](https://github.com/commercetools/merchant-center-application-kit/pull/197) Upgrade to react-redux v6, drop legacy plugin stuff 🔥 ([@emmenko](https://github.com/emmenko))

#### 🔮 Type: Chore

- `actions-global`, `application-shell-connectors`, `application-shell`, `permissions`, `react-notifications`
  - [#197](https://github.com/commercetools/merchant-center-application-kit/pull/197) Use lodash-es for ESM builds for better tree-shaking support ([@emmenko](https://github.com/emmenko))

#### 🚀 Type: New Feature

- `create-mc-app`
  - [#226](https://github.com/commercetools/merchant-center-application-kit/pull/226) feat(create-mc-app): add new package create-mc-app to bootstrap applications ([@emmenko](https://github.com/emmenko))

You can now install a starter template with one command:

```bash
$ npm install --global @commercetools-frontend/create-mc-app
$ create-mc-app my-new-custom-application-project --template starter

# or

$ npx @commercetools-frontend/create-mc-app@latest my-new-custom-application-project --template starter
```

#### ⛑ Type: Refactoring

- `application-shell`, `i18n`
  - [#211](https://github.com/commercetools/merchant-center-application-kit/pull/211) Migrate login pages to formik and ui-kit form components ([@emmenko](https://github.com/emmenko))
- `application-shell`, `sdk`
  - [#227](https://github.com/commercetools/merchant-center-application-kit/pull/227) Move sdk mocks into sdk/test-utils ([@emmenko](https://github.com/emmenko))
- `application-shell-connectors`, `application-shell`
  - [#213](https://github.com/commercetools/merchant-center-application-kit/pull/213) Add `allAppliedPermissions` and remove `permissions` ([@tdeekens](https://github.com/tdeekens))
- `application-shell`, `permissions`
  - [#217](https://github.com/commercetools/merchant-center-application-kit/pull/217) Refactor `Authorized` in permissions pkg to not rely on constants ([@tdeekens](https://github.com/tdeekens))

When using the `@commercetools-frontend/permissions` package, you need to pass a list of permissions as **String** (e.g. `['ViewProducts']`) to the `demandedPermissions` prop instead of using the **constants** (e.g. `[permissions.ViewProducts]`). With that, we can keep the list more flexible and we can avoid doing a release each time we add/remove permissions.

## [4.4.0](https://github.com/commercetools/merchant-center-application-kit/compare/v4.3.0...v4.4.0) (2018-12-17)

#### 💅 Type: Enhancement

- `actions-global`
  - [#198](https://github.com/commercetools/merchant-center-application-kit/pull/198) Add array wrapping to showApiErrorNotification (through .isArray) ([@tdeekens](https://github.com/tdeekens))

#### 🔮 Type: Chore

- `application-shell-connectors`, `application-shell`, `babel-preset-mc-app`, `eslint-config-mc-app`, `i18n`, `jest-preset-mc-app`, `l10n`, `mc-scripts`, `react-notifications`, `sdk`
  - [#207](https://github.com/commercetools/merchant-center-application-kit/pull/207) chore: update deps ([@tdeekens](https://github.com/tdeekens))

## [4.3.0](https://github.com/commercetools/merchant-center-application-kit/compare/v4.2.0...v4.3.0) (2018-12-12)

#### 🔮 Type: Chore

- `application-shell`, `babel-preset-mc-app`, `eslint-config-mc-app`, `i18n`, `jest-preset-mc-app`, `mc-scripts`
  - [#192](https://github.com/commercetools/merchant-center-application-kit/pull/192) Update dependencies across all packages ([@tdeekens](https://github.com/tdeekens))

#### 💅 Type: Enhancement

- `constants`
  - [#195](https://github.com/commercetools/merchant-center-application-kit/pull/195) Add administration GraphQL target to constants ([@tdeekens](https://github.com/tdeekens))

## [4.2.0](https://github.com/commercetools/merchant-center-application-kit/compare/v4.1.0...v4.2.0) (2018-12-04)

#### 🐛 Type: Bug

- `application-shell`
  - [#175](https://github.com/commercetools/merchant-center-application-kit/pull/175) fix(test-utils): improve test setup ([@emmenko](https://github.com/emmenko))

#### 💅 Type: Enhancement

- `application-shell`, `i18n`
  - [#183](https://github.com/commercetools/merchant-center-application-kit/pull/183) MCD-1523 : Refactor CT logo to be 🏠button ([@qmateub](https://github.com/qmateub))
- `application-shell`
  - [#175](https://github.com/commercetools/merchant-center-application-kit/pull/175) fix(test-utils): improve test setup ([@emmenko](https://github.com/emmenko))
  - [#181](https://github.com/commercetools/merchant-center-application-kit/pull/181) refactor(login): validate same origin for redirect target url after login ([@emmenko](https://github.com/emmenko))

#### ⛑ Type: Refactoring

- `application-shell`, `i18n`
  - [#182](https://github.com/commercetools/merchant-center-application-kit/pull/182) MCD-1509(user-settings-menu): address UX review ([@qmateub](https://github.com/qmateub))

## [4.1.0](https://github.com/commercetools/merchant-center-application-kit/compare/v4.0.1...v4.1.0) (2018-12-04)

#### 🔮 Type: Chore

- `playground`
  - [#177](https://github.com/commercetools/merchant-center-application-kit/pull/177) chore: remove ui-kit materials transpilation ([@montezume](https://github.com/montezume))
- `application-shell-connectors`, `application-shell`, `jest-preset-mc-app`, `sdk`
  - [#178](https://github.com/commercetools/merchant-center-application-kit/pull/178) chore: update deps ([@montezume](https://github.com/montezume))

#### ⛑ Type: Refactoring

- `application-shell`
  - [#151](https://github.com/commercetools/merchant-center-application-kit/pull/151) [MCD-1509] Refactor dropdown user settings menu ([@qmateub](https://github.com/qmateub))

## [4.0.1](https://github.com/commercetools/merchant-center-application-kit/compare/v4.0.0...v4.0.1) (2018-12-01)

#### 🐛 Type: Bug

- `i18n`, `l10n`
  - [#166](https://github.com/commercetools/merchant-center-application-kit/pull/166) fix(l10n): prefer loading default, fall back to normal import (esm vs cjs) ([@emmenko](https://github.com/emmenko))
- `application-shell`
  - [#165](https://github.com/commercetools/merchant-center-application-kit/pull/165) fix(navbar): keep WorldIcon for backwards compatibility ([@emmenko](https://github.com/emmenko))

## [4.0.0](https://github.com/commercetools/merchant-center-application-kit/compare/v3.1.0...v4.0.0) (2018-11-30)

#### 💥 Type: Breaking Change

- `application-shell`
  - [#153](https://github.com/commercetools/merchant-center-application-kit/pull/153) Remove `Avatar` from `application-shell` ([@montezume](https://github.com/montezume))

#### 🐛 Type: Bug

- `application-shell`
  - [#162](https://github.com/commercetools/merchant-center-application-kit/pull/162) Improve permission names ([@tdeekens](https://github.com/tdeekens))
- `l10n`
  - [#154](https://github.com/commercetools/merchant-center-application-kit/pull/154) Make locale data work with CJS bundle ([@montezume](https://github.com/montezume))

#### 🔮 Type: Chore

- `mc-html-template`, `mc-http-server`
  - [#159](https://github.com/commercetools/merchant-center-application-kit/pull/159) chore(http-server): update favicon images for different resolutions ([@emmenko](https://github.com/emmenko))

#### 💅 Type: Enhancement

- `application-shell`
  - [#155](https://github.com/commercetools/merchant-center-application-kit/pull/155) feat(test-utils): wrap rendered component with React.Suspense, include modals container, document renderWithRedux ([@emmenko](https://github.com/emmenko))
  - [#158](https://github.com/commercetools/merchant-center-application-kit/pull/158) Add new permissions to project query of app-shell ([@tdeekens](https://github.com/tdeekens))

## [3.1.0](https://github.com/commercetools/merchant-center-application-kit/compare/v3.0.1...v3.1.0) (2018-11-28)

#### 🐛 Type: Bug

- `mc-scripts`
  - [#150](https://github.com/commercetools/merchant-center-application-kit/pull/150) fix(mc-scripts/extract-intl): do not overwrite existing core messages by default ([@emmenko](https://github.com/emmenko))

#### 💅 Type: Enhancement

- `mc-scripts`
  - [#150](https://github.com/commercetools/merchant-center-application-kit/pull/150) fix(mc-scripts/extract-intl): do not overwrite existing core messages by default ([@emmenko](https://github.com/emmenko))

* `application-shell`
  - [#143](https://github.com/commercetools/merchant-center-application-kit/pull/143) feat(test-utils): run tests agains actual ApolloProvider ([@pa3](https://github.com/pa3))
  - [#144](https://github.com/commercetools/merchant-center-application-kit/pull/144) Fix double dependency bundling ([@tdeekens](https://github.com/tdeekens))

#### ⛑ Type: Refactoring

- `application-shell`
  - [#149](https://github.com/commercetools/merchant-center-application-kit/pull/149) refactor(navbar): use IconSwitcher to statically render icons based on icon names ([@emmenko](https://github.com/emmenko))

## [3.0.1](https://github.com/commercetools/merchant-center-application-kit/compare/v3.0.0...v3.0.1) (2018-11-27)

#### 🐛 Type: Bug

- `mc-scripts`
  - [#141](https://github.com/commercetools/merchant-center-application-kit/pull/141) fix(mc-scripts): re-arrange postcss plugins to fix color mode with css custom properties ([@montezume](https://github.com/montezume))

## [3.0.0](https://github.com/commercetools/merchant-center-application-kit/compare/v2.4.0...v3.0.0) (2018-11-27)

## BREAKING CHANGES 💣

This release updates UI-Kit to version 4, which includes several **breaking changes** which require some **migration steps**. This [PR](https://github.com/commercetools/merchant-center-application-kit/pull/139) can be treated as a migration guide. As well as the migration steps are listed in the Ui-Kit [release section](https://github.com/commercetools/ui-kit/releases).

#### 🔮 Type: Chore

- `application-shell`, `react-notifications`, `mc-scripts`, `playground`
  - [#139](https://github.com/commercetools/merchant-center-application-kit/pull/139) chore: update ui-kit to v4.0.0 ([@montezume](https://github.com/montezume))

## [2.4.0](https://github.com/commercetools/merchant-center-application-kit/compare/v2.3.2...v2.4.0) (2018-11-26)

#### 🔮 Type: Chore

- Other
  - [#137](https://github.com/commercetools/merchant-center-application-kit/pull/137) chore: publish to next dist-tag by default, add command to move to latest ([@emmenko](https://github.com/emmenko))
- `application-shell`, `jest-preset-mc-app`
  - [#136](https://github.com/commercetools/merchant-center-application-kit/pull/136) chore: update deps ([@emmenko](https://github.com/emmenko))
- `i18n`
  - [#124](https://github.com/commercetools/merchant-center-application-kit/pull/124) chore: sync en.json -> core.json after pulling messages from tx ([@emmenko](https://github.com/emmenko))
  - [#125](https://github.com/commercetools/merchant-center-application-kit/pull/125) chore(i18n): pull translations from transifex ([@adnasa](https://github.com/adnasa))

#### ✍️ Type: Documentation

- `actions-global`, `application-shell-connectors`, `application-shell`, `assets`, `babel-preset-mc-app`, `browser-history`, `constants`, `eslint-config-mc-app`, `i18n`, `jest-preset-mc-app`, `l10n`, `mc-html-template`, `mc-http-server`, `mc-scripts`, `notifications`, `permissions`, `react-notifications`, `sdk`, `sentry`, `storage`, `url-utils`
  - [#128](https://github.com/commercetools/merchant-center-application-kit/pull/128) feat: add badges. ([@montezume](https://github.com/montezume))
- Other
  - [#123](https://github.com/commercetools/merchant-center-application-kit/pull/123) docs(playground): update and improve README about developing custom applications ([@emmenko](https://github.com/emmenko))

#### ⛑ Type: Refactoring

- `application-shell`, `react-notifications`
  - [#89](https://github.com/commercetools/merchant-center-application-kit/pull/89) refactor: use React.lazy and React.Suspense within the AppShell ([@emmenko](https://github.com/emmenko))

## [2.3.2](https://github.com/commercetools/merchant-center-application-kit/compare/v2.3.1...v2.3.2) (2018-11-22)

#### 🐛 Type: Bug

- `application-shell`, `permissions`
  - [#121](https://github.com/commercetools/merchant-center-application-kit/pull/121) fix: app crashing when project is not found ([@emmenko](https://github.com/emmenko))

#### 🔮 Type: Chore

- `application-shell`
  - [#122](https://github.com/commercetools/merchant-center-application-kit/pull/122) chore(app-shell): change navbar shadow ([@tdeekens](https://github.com/tdeekens))

## [2.3.1](https://github.com/commercetools/merchant-center-application-kit/compare/v2.3.0...v2.3.1) (2018-11-22)

#### 🐛 Type: Bug

- `i18n`
  - [#117](https://github.com/commercetools/merchant-center-application-kit/pull/117) feat(i18n): fix code splitting for mc-app-kit messages ([@montezume](https://github.com/montezume))
- `application-shell`
  - [#118](https://github.com/commercetools/merchant-center-application-kit/pull/118) fix(app-shell): add back-to-project data test target ([@tdeekens](https://github.com/tdeekens))

#### ⛑ Type: Refactoring

- `application-shell`
  - [#119](https://github.com/commercetools/merchant-center-application-kit/pull/119) fix(app-shell): update support link ([@tdeekens](https://github.com/tdeekens))

## [2.3.0](https://github.com/commercetools/merchant-center-application-kit/compare/v2.2.0...v2.3.0) (2018-11-21)

#### 🚀 Type: New Feature

- `application-shell`, `i18n`
  - [#115](https://github.com/commercetools/merchant-center-application-kit/pull/116) Add backwards compatible async messages ([@montezume](https://github.com/montezume))

## [2.2.0](https://github.com/commercetools/merchant-center-application-kit/compare/v2.1.1...v2.2.0) (2018-11-21)

#### 🚀 Type: New Feature

- `application-shell`, `i18n`
  - [#115](https://github.com/commercetools/merchant-center-application-kit/pull/115) Replace ProjectSwitcher with a "Back to project" link in AppBar ([@tdeekens](https://github.com/tdeekens))

## [2.1.2](https://github.com/commercetools/merchant-center-application-kit/compare/v2.1.1...v2.1.2) (2018-11-21)

#### 🔮 Type: Chore

- `application-shell`
  - [#114](https://github.com/commercetools/merchant-center-application-kit/pull/114) chore: update @flopflip version ([@pa3](https://github.com/pa3))

#### ⛑ Type: Refactoring

- `application-shell`, `permissions`
  - [#102](https://github.com/commercetools/merchant-center-application-kit/pull/102) refactor(quick-access): correctly apply permissions to all commands and queries ([@emmenko](https://github.com/emmenko))

## [2.1.1](https://github.com/commercetools/merchant-center-application-kit/compare/v2.1.0...v2.1.1) (2018-11-18)

#### 🔮 Type: Chore

- `application-shell-connectors`, `application-shell`, `babel-preset-mc-app`, `eslint-config-mc-app`, `jest-preset-mc-app`, `l10n`, `mc-http-server`, `mc-scripts`, `permissions`, `react-notifications`, `sdk`, `sentry`
  - [#109](https://github.com/commercetools/merchant-center-application-kit/pull/109) Update dependencies (incl. and importantly flopflip) ([@tdeekens](https://github.com/tdeekens))

## [2.1.0](https://github.com/commercetools/merchant-center-application-kit/compare/v2.0.7...v2.1.0) (2018-11-17)

#### 💅 Type: Enhancement

- `application-shell-connectors`, `application-shell`
  - [#107](https://github.com/commercetools/merchant-center-application-kit/pull/107) feat(application-shell-connectors): expose ownerId ([@montezume](https://github.com/montezume))

The `project` object in the `<ApplicationContext>` now contains the `ownerId`, which is the `id` of the **organization** where the project belongs to.

#### ⛑ Type: Refactoring

- `application-shell`
  - [#104](https://github.com/commercetools/merchant-center-application-kit/pull/104) refactor(login-sso): use new /tokens/sso endpoint ([@emmenko](https://github.com/emmenko))

This is just an internal refactoring of the login pages, which are part of the `<ApplicationShell>`.

## [2.0.7](https://github.com/commercetools/merchant-center-application-kit/compare/v2.0.6...v2.0.7) (2018-11-16)

#### 🐛 Type: Bug

- `l10n`
  - [#105](https://github.com/commercetools/merchant-center-application-kit/pull/105) Fix selection of language chunk ([@tdeekens](https://github.com/tdeekens))

#### Committers: 1

- suǝʞǝǝpʇ ([@tdeekens](https://github.com/tdeekens))

## [2.0.6](https://github.com/commercetools/merchant-center-application-kit/compare/v2.0.5...v2.0.6) (2018-11-15)

#### 🐛 Type: Bug

- `i18n`
  - [#103](https://github.com/commercetools/merchant-center-application-kit/pull/103) fix(i18n): exports to not include default key ([@emmenko](https://github.com/emmenko))

## [2.0.5](https://github.com/commercetools/merchant-center-application-kit/compare/v2.0.4...v2.0.5) (2018-11-14)

#### 🐛 Type: Bug

- `application-shell`
  - [#101](https://github.com/commercetools/merchant-center-application-kit/pull/101) fix(login-sso): objects saved in storage need to be serialized/deserialized ([@emmenko](https://github.com/emmenko))

## [2.0.4](https://github.com/commercetools/merchant-center-application-kit/compare/v2.0.3...v2.0.4) (2018-11-14)

#### ⛑ Type: Refactoring

- `application-shell`
  - [#98](https://github.com/commercetools/merchant-center-application-kit/pull/98) refactor(login-sso): avoid query params in authorize url, use session storage and state nonce ([@emmenko](https://github.com/emmenko))

## [2.0.3](https://github.com/commercetools/merchant-center-application-kit/compare/v2.0.2...v2.0.3) (2018-11-13)

#### 🐛 Type: Bug

- `application-shell`

  - [#96](https://github.com/commercetools/merchant-center-application-kit/pull/96) fix(application-shell): expose test-utils as cjs instead of es ([@montezume](https://github.com/montezume))

- `mc-scripts`

  - [#95](https://github.com/commercetools/merchant-center-application-kit/pull/95) fix(mc-scripts): downgrade uglifyjs-webpack-plugin for pegjs fix ([@montezume](https://github.com/montezume))

## [2.0.2](https://github.com/commercetools/merchant-center-application-kit/compare/v2.0.1...v2.0.2) (2018-11-13)

#### 🐛 Type: Bug

- `application-shell`

  - [#91](https://github.com/commercetools/merchant-center-application-kit/pull/93) fix(application-shell): expose test-utils ([@dferber90](https://github.com/dferber90))

## [2.0.1](https://github.com/commercetools/merchant-center-application-kit/compare/v2.0.0...v2.0.1) (2018-11-13)

#### 🐛 Type: Bug

- `application-shell`

  - [#90](https://github.com/commercetools/merchant-center-application-kit/pull/90) fix: deprecatedWithProject is now passed the correct parameters ([@montezume](https://github.com/montezume))

- `jest-preset-mc-app`
  - [#88](https://github.com/commercetools/merchant-center-application-kit/pull/88) fix(jest-preset-mc-app): to look up root dir ([@tdeekens](https://github.com/tdeekens))

## [2.0.0](https://github.com/commercetools/merchant-center-application-kit/compare/v1.0.0-rc.3...v2.0.0) (2018-11-09)

## BREAKING CHANGES 💣

This release introduces several **breaking changes** which require some **migration steps**. We'll go through the list of those now:

### Replaced connectors with `ApplicationContext`

The package `@commercetools-frontend/application-shell-connectors` used to contain connectors that have now been **removed**:

- **configuration**: `injectConfiguration` and `<ConfigurationConsumer>`
- **project-data-locale**: `withProjectDataLocale` and `<GetProjectDataLocale>`
- **user-permissions**: `withUserPermissions` and `<GetUserPermissions>`
- **user-time-zone**: `withUserTimeZone` and `<GetUserTimeZone>`

As a **replacement**, we now have a single component, `<ApplicationContext>`, and a matching higher order component, `withApplicationContext`, that provides all the necessary "global" information about the `user`, `project`, `permissions`, `environment`, etc.

> For the bravers, we also expose a [Hook](http://reactjs.org/hooks) `useApplicationContext`.

You can find out more on how to access this information in the [`ApplicationContext` documentation](https://github.com/commercetools/merchant-center-application-kit/blob/v2.0.0/packages/application-shell-connectors/src/components/application-context/README.md).

#### Usage of `<ApplicationContext>`

```js
<ApplicationContext
  render={(applicationContext) => (
    <div>
      <h2>{`Hello ${applicationContext.user.firstName}`}</h2>
      <p>{`You are currently in project "${applicationContext.project.key}"`}</p>
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
withApplicationContext((applicationContext) => ({
  projectKey: applicationContext.project && applicationContext.project.key,
  userEmail: applicationContext.user && applicationContext.user.email,
}))(MyComponent);
```

##### `applicationContext.user`

- `id`
- `email`
- `firstName`
- `lastName`
- `locale`
- `timeZone`

##### `applicationContext.project`

- `key`
- `version`
- `name`
- `countries`
- `currencies`
- `languages`

##### `applicationContext.permissions`

An object containing boolean flags about the permissions of the logged in user for the selected project (e.g. `{ canViewProducts: true, canManageOrders: false, ... }`)

##### `applicationContext.dataLocale`

The selected project **locale** (from the locale switcher in the AppBar) used to render a localized field of the project data. The available values are based on the `project.languages`

##### `applicationContext.environment`

This object contains application specific environment information defined in the `env.json`. The object will then be available on runtime from `window.app`. However, to avoid accessing those values globally, we inject this object into the application context.

The following are common fields defined in `env.json`. However, each application can provide more specific fields that cannot be documented.

- `frontendHost`: the host where the Merchant Center application is running (e.g. `mc.commercetools.com`)
- `mcApiUrl`: the API URL of the Merchant Center (`https://mc-api.commercetools.com` for projects in `EU` and `https://mc-api.commercetools.co` for projects in `US`)
- `location`: the location where the Merchant Center is running, usually `eu` or `us`
- `env`: the environment where the Merchant Center is running, usually `production` or `staging`
- `cdnUrl`: the URL where the static assets are stored
- `servedByProxy`: a flag to indicate if this application is running behind the Merchant Center proxy or not, usually `true` for production and `false` for local development

### Renamed `configuration` prop of `<ApplicationShell>`

The prop `configuration` of `<ApplicationShell>` has been renamed to `environment`, to make it less confusing.

### Imports

All packages now expose **named exports** and **no longer support imports from paths inside the packages**.

```js
// Before
import AsyncLocaleData from '@commercetools-frontend/i18n/async-locale-data';

// After
import { AsyncLocaleData } from '@commercetools-frontend/i18n';
```

> This also includes the `<ApplicationShell>`. You now need to `import { ApplicationShell } from '@commercetools-frontend/application-shell';`

### Published packages are now bundled to ESM and CJS

Previously we were shipping _untranspiled_ code, requiring consumers of the packages to instruct webpack to include those packages in the transpilation process. Now that we **ship transpiled code**, it's not necessary to include those packages in your webpack source folders anymore:

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

---

#### 🚀 Type: New Feature

- `application-shell`

  We now expose some **test utils** from the `application-shell` package to be able to write component tests using `react-testing-library`. More info in [#60](https://github.com/commercetools/merchant-center-application-kit/pull/60).

- `assets`

  A new package has been added, `@commercetools-frontend/assets`, that contains static image assets that can be accessed directly from it's `image` folder. More information can be found in it's [README](https://github.com/commercetools/merchant-center-application-kit/blob/v2.0.0/packages/assets/README.md)

  If you are currently accessing these image assets from `ui-kit`, then you can switch over to using them from `@commercetools-frontend/assets`, as **they will be removed from `ui-kit` in a future release**.

#### ⛑ Type: Refactoring

- `application-shell`
  - [#76](https://github.com/commercetools/merchant-center-application-kit/pull/76) refactor: drop downshift ([@montezume](https://github.com/montezume))

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
