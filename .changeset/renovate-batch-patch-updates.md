---
'@commercetools-frontend/application-shell': patch
'@commercetools-frontend/application-components': patch
'@commercetools-frontend/mc-scripts': patch
'@commercetools-frontend/cypress': patch
'@commercetools-frontend/application-shell-connectors': patch
'@commercetools-frontend/jest-preset-mc-app': patch
'@commercetools-frontend/react-notifications': patch
'@commercetools-frontend/eslint-config-mc-app': patch
'@commercetools-frontend/create-mc-app': patch
'@commercetools-frontend/sdk': patch
'@commercetools-frontend/i18n': patch
'@commercetools-frontend/sentry': patch
'@commercetools-frontend/mc-html-template': patch
'@commercetools-frontend/application-config': patch
'@commercetools-backend/loggers': patch
'@commercetools-backend/eslint-config-node': patch
---

Batch-consolidated patch/minor Renovate dependency updates (rate-limited dashboard backlog, ~116 items reviewed).

The `@flopflip/*` 15.1.7 → 15.1.11 bump pulls in `@launchdarkly/js-client-sdk` v4 as a
transitive dependency, replacing the unscoped `launchdarkly-js-client-sdk` v3. This is a
breaking change for `SetupFlopFlipProvider` in `application-shell`:

- The LaunchDarkly user context type now requires either a `key` or `anonymous: true`,
  never an optional `key`. `getUserContextForLaunchDarklyAdapter` now returns an
  anonymous context when there's no authenticated user, instead of a context with an
  undefined `key`.
- `sdk.clientOptions.sendEventsOnlyForVariation` was removed; the new SDK's `allFlags`
  no longer sends analytics events by default, which was the entire point of that option.

Bumped the following, each a real `dependencies` entry (not `devDependencies`) of the listed package(s), so each gets a version bump here:

- `@flopflip/*` (combine-adapters, http-adapter, launchdarkly-adapter, memory-adapter, react-broadcast, types) 15.1.7 → 15.1.11 — `application-shell` (all six), `application-components` (`react-broadcast`)
- `@pmmmwh/react-refresh-webpack-plugin` 0.6.1 → 0.6.2 — `mc-scripts`
- `@radix-ui/react-dialog` 1.1.14 → 1.1.23, `@types/react-dom` ^19.0.2 → ^19.2.4 — `application-components`
- `semver` 7.7.2 → 7.8.5, `uuid` 14.0.0 → 14.0.1 — `cypress`
- `@rollup/pluginutils` 5.2.0 → 5.4.0, `graphql` 16.11.0 → 16.14.2, `html-webpack-plugin` 5.6.3 → 5.6.8, `mini-css-extract-plugin` 2.9.4 → 2.10.2, `postcss` 8.5.23 → 8.5.26, `react-refresh` 0.17.0 → 0.18.0 — `mc-scripts` (`webpack` 5.105.1 → 5.109.2 was reverted; see below)
- `graphql` 16.11.0 → 16.14.2, `uuid` 14.0.0 → 14.0.1 — `application-shell-connectors`
- `cosmiconfig` 9.0.0 → 9.0.2, `graphql` 16.11.0 → 16.14.2 — `jest-preset-mc-app` (the `jest`/`babel-jest`/`babel-preset-jest`/`jest-environment-jsdom`/`jest-mock` bump was reverted; see the pnpm-regression/typecheck fix commits on this branch for why)
- `@types/react-dom` ^19.0.2 → ^19.2.4 — `react-notifications`, `application-shell` (also `@reduxjs/toolkit` 2.9.0 → 2.12.0, `graphql` 16.11.0 → 16.14.2, `uuid` 14.0.0 → 14.0.1)
- `typescript` 5.9.2 → 5.9.3 — `eslint-config-mc-app`, `eslint-config-node`
- `semver` 7.7.2 → 7.8.5 — `create-mc-app`
- `uuid` 14.0.0 → 14.0.1 — `sdk`
- `@formatjs/icu-messageformat-parser` 2.11.2 → 2.11.4 — `i18n`
- `@sentry/browser`, `@sentry/react`, `@sentry/types` 8.55.0 → 8.55.2 — `sentry`
- `serialize-javascript` 7.0.5 → 7.0.7 — `mc-html-template`
- `ajv` 8.18.0 → 8.20.0, `cosmiconfig` 9.0.0 → 9.0.2, `cosmiconfig-typescript-loader` 6.1.0 → 6.3.0 — `application-config`
- `winston` 3.17.0 → 3.19.0 — `loggers`

Other updates in this batch (`@testing-library/*`, `@manypkg/cli`, `@percy/cypress`, `@percy/puppeteer`, `@preconstruct/cli`, `@apollo/client`, `jest`, `jest-each`, `react`, `react-dom`, `react-redux`, `@commercetools/nimbus`, `@commercetools/composable-commerce-test-data`, `@percy/cli`, `@percy/core`, `@changesets/*`, `rimraf`, `sentry-testkit`, `start-server-and-test`, `fflate`, `formik`, `qs`, `node`, `pnpm`, and GitHub Actions digest/version pins) only touch devDependencies, `peerDependencies`, root-level repo tooling, CI configuration, or private template/playground packages, so they don't require a version bump here.

`webpack` 5.105.1 → 5.109.2 was reverted: webpack's `ProgressPlugin` now defers option-schema validation from the constructor to a `compiler.hooks.validate` tap, reading `this.options` at that later point instead of validating the raw constructor args immediately. `webpackbar@5.0.2` (unmaintained, used by `mc-scripts`'s dev config via `new WebpackBar()`) calls `super({ activeModules: true })` and then immediately overwrites `this.options` with its own `name`/`color`/`reporters`/`reporter` keys — none of which are in `ProgressPlugin`'s schema. With eager validation this was masked; with the new deferred validation it fails every `mc-scripts start`/dev build with "Invalid options object. Progress Plugin has been initialized using an options object that does not match the API schema." Held back at 5.105.1 until `webpackbar` is fixed/replaced or dropped in favor of webpack's now-built-in progress bar.
