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

- `jest-stylelint-runner` [Readme](https://github.com/commercetools/merchant-center-application-kit/blob/master/packages/jest-stylelint-runner/README.md)
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
    import('../../../menu.json').then(data => data.default || data)
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

ESLint is now a peer dependency in [#277](https://github.com/commercetools/merchant-center-application-kit/pull/277). Please make sure that ESLint and all required plugins are installed in your project. You can always check for the required list of plugins in the [package.json](https://github.com/commercetools/merchant-center-application-kit/blob/master/packages/eslint-config-mc-app/package.json) of `eslint-config-mc-app`. In order to install all peer dependencies with a single command run:

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

$ npx @commercetools-frontend/create-mc-app my-new-custom-application-project --template starter
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
  render={applicationContext => (
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
withApplicationContext(applicationContext => ({
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
