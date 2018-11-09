# Contributing

Please _read_ before contributing to Merchant Center Application Kit in order to get familiar with the guidelines for contributing to the project.

## Core Ideas

The [Merchant Center](https://mc.commercetools.com) is a _Multi Single-Page-Application_ where effectively multiple applications are running within the same domain, giving it a look and feel of being one big application. In fact, sections of the Merchant Center such as Dashboard, Orders, Products, etc are all different applications.
You can read more about the architecture here (_coming soon_).

With that in mind, developing a Merchant Center Application requires a set of tools and components that should be used across the different applications, as they share some common logic. This repository contains all the minimal packages that are necessary to do that. Some of them do not need to be used directly but are instead required by other packages. Let's have a deeper look.

## Folder Structure

This repository is managed as a monorepo, meaning it contains multiple (sub)packages located in the [`packages`](./packages) directory.

```
packages/
  actions-global/
  application-shell/
  application-shell-connectors/
  assets/
  babel-preset-mc-app/
  browser-history/
  constants/
  eslint-config-mc-app/
  i18n/
  jest-preset-mc-app/
  l10n/
  mc-html-template/
  mc-http-server/
  mc-scripts/
  notifications/
  permissions/
  react-notifications/
  sdk/
  sentry/
  storage/
  url-utils/
```

### Overview of main packages

Below a short description of the most import packages:

#### [application-shell](./packages/application-shell)

This package is the most **important** one and contains the core logic of a Merchant Center application (login, intl, base layout, etc). To develop an application, you need to render the `<ApplicationShell>` component first (_see package documentation_).
The package also initializes different things such as intl, apollo, routing, etc.

#### [application-shell-connectors](./packages/application-shell-connectors)

This package is a complementary package of the `application-shell` and contains "connector" components that use the new React Context API. The main purpose of those "connectors" is to make it easier for the consumer to access data in any place of the application.

#### [assets](./packages/assets)

This package contains static assets, such as SVG images.

#### [constants](./packages/constants)

This package contains a set of useful constant variables.

#### [eslint-config-mc-app](./packages/eslint-config-mc-app)

This package contains a set of linting rules useful to use as a preset of your `eslint` config.

#### [i18n](./packages/i18n)

This package contains React components for accessing internationalization data such as intl messages (of the application kit packages), moment locales, etc.

#### [jest-preset-mc-app](./packages/jest-preset-mc-app)

This package contains a preset configuration for Jest, focused on necessary tools and transformers for a Merchant Center application code.

#### [l10n](./packages/l10n)

This package contains React components for accessing localization data such as country, currency, language, time zone, etc.

#### [mc-http-server](./packages/mc-http-server)

This package runs a small HTTP server to serve the `index.html`, with some additional extra like CSP headers, etc. The server is meant to be used to run the application in **production** mode.

#### [mc-scripts](./packages/mc-scripts)

If you're familiar with `react-scripts`, this CLI works very similarly except that it is configured to work for developing Merchant Center Applications.

#### [permissions](./packages/permissions)

This package contains React components to apply permissions in your application code (e.g. prevent access to a view if the user does not have the correct scopes, etc).

#### [react-notifications](./packages/react-notifications)

This package contains React components to render notification (e.g. error message, success message, etc).

#### [sdk](./packages/sdk)

This package contains React components to perform requests in a declarative way. Underneath it uses our [js-sdk](https://commercetools.github.io/nodejs/sdk/) to perform the network requests.

## Getting started

1. Clone the repository
2. Run `yarn` in the root folder

Once it's done, you can run `yarn start` or `yarn test` (`yarn test:watch`) to develop the packages.

## Cutting a Release

1. Make sure that each merged PR that should be mentioned in the release changelog is labelled with one of the [labels](https://github.com/commercetools/merchant-center-application-kit/labels) named `Type: ...` to indicate what kind of change it is.
2. Create a changelog entry for the release

- Copy `.env.template` and name it `.env`
- You'll need an [access token for the GitHub API](https://help.github.com/articles/creating-an-access-token-for-command-line-use/). Save it to the environment variable: `GITHUB_AUTH`
- Run `yarn changelog`. The command will find all the labeled pull requests merged since the last release and group them by the label and affected packages, and create a change log entry with all the changes and links to PRs and their authors. Copy and paste it to `CHANGELOG.md`.
- Add a four-space indented paragraph after each non-trivial list item, explaining what changed and why. For each breaking change also write who it affects and instructions for migrating existing code.
- Maybe add some newlines here and there. Preview the result on GitHub to get a feel for it. Changelog generator output is a bit too terse for my taste, so try to make it visually pleasing and well grouped.

3. (_Optional_) Include "_Migrating from ..._" instructions for the previous release in case you deem it necessary.
4. Commit the changelog
5. Run `yarn release`: you will get promted to select the version that you would like to release (minor, major, pre-release, etc.)
6. Wait a bit until lerna bumps the versions, creates a commit and a tag and finally publishes the packages to npm.
7. After publishing, create a GitHub Release with the same text as the changelog entry. See previous Releases for inspiration.
