# Contributing

Please _read_ before contributing to Merchant Center Application Kit in order to get familiar with the guidelines for contributing to the project.

## Core Ideas

The [Merchant Center](https://docs.commercetools.com/merchant-center/) is a _Multi Single-Page-Application_ where effectively multiple applications are running within the same domain, giving it a look and feel of being one big application. In fact, sections of the Merchant Center such as Dashboard, Orders, Products, etc are all different applications.
You can read more about the architecture [here](https://docs.commercetools.com/merchant-center-customizations/concepts/merchant-center-proxy-router).

With that in mind, developing a customization for the Merchant Center requires a set of tools and components that should be used across the different applications, as they share some common logic. This repository contains all the minimal packages that are necessary to do that. Some of them do not need to be used directly but are instead required by other packages. Let's have a deeper look.

If you are developing a Merchant Center customization please make sure refer to the documentation: https://docs.commercetools.com/merchant-center-customizations.

## Submitting a Pull Request

Good pull requests, such as patches, improvements, and new features, are a fantastic help. They should remain focused in scope and avoid containing unrelated commits.

If possible, please try to provide a related issue first, where the topic is discussed and agreed upon before starting to work on that. This is helpful for both you and the maintainers to be familiar with the changes beforehand.

## Folder Structure

This repository is managed as a monorepo, meaning it contains multiple (sub)packages located in the [`packages`](./packages) directory.

### Overview of main packages

Below a short description of the most import packages:

#### [application-components](./packages/application-components)

This package contains React components for developing Merchant Center applications, similarly to what the [UiKit](https://github.com/commercetools/ui-kit) implements.

#### [application-config](./packages/application-config)

This package contains utilities for configuring Custom Applications and Custom Views. It also defines the JSON schema for the Custom Application and Custom View configuration file.

#### [application-shell](./packages/application-shell)

This package is the most **important** one and contains the core logic of a Merchant Center application (login, intl, base layout, etc). To develop an application, you need to render the `<ApplicationShell>` component first (_see package documentation_).
The package also initializes different things such as intl, Apollo, routing, etc.

#### [application-shell-connectors](./packages/application-shell-connectors)

This package is a complementary package of the `application-shell` and contains "connector" components that use the new React Context API. The main purpose of those "connectors" is to make it easier for the consumer to access data in any place of the application.

#### [assets](./packages/assets)

This package contains static assets, such as SVG images.

#### [constants](./packages/constants)

This package contains a set of useful constant variables.

#### [create-mc-app](./packages/create-mc-app)

This package contains a CLI to bootstrap a starter application based on a predefined template.

#### [eslint-config-mc-app](./packages/eslint-config-mc-app)

This package contains a set of linting rules useful to use as a preset of your `eslint` config.

#### [i18n](./packages/i18n)

This package contains React components for accessing internationalization data such as intl messages (of the application kit packages), moment locales, etc.

#### [jest-preset-mc-app](./packages/jest-preset-mc-app)

This package contains a preset configuration for Jest, focused on necessary tools and transformers for a Merchant Center application code.

#### [l10n](./packages/l10n)

This package contains React components for accessing localization data such as country, currency, language, time zone, etc.

#### [mc-scripts](./packages/mc-scripts)

If you're familiar with `react-scripts`, this CLI works very similarly except that it is configured to work for developing Merchant Center Applications.

#### [permissions](./packages/permissions)

This package contains React components to apply permissions in your application code (for example to prevent access to a view if the user does not have the correct scopes, etc).

#### [react-notifications](./packages/react-notifications)

This package contains React components to render notification (for example to error message, success message, etc).

#### [sdk](./packages/sdk)

This package contains React components to perform requests in a declarative way. Underneath it uses our [js-sdk](https://commercetools.github.io/nodejs/sdk/) to perform the network requests.

## Setting up a local copy

1. Clone the repository
2. Run `pnpm install` in the root folder

Once it's done, you can run `pnpm run test` (`pnpm run test --watch`) to test your changes.

## Developing locally

To develop locally, you can use the `playground` application to test the changes in some of the packages. Make sure to `pnpm build` the packages before starting the `playground` app because the app consumes the packages as normal "transpiled" dependencies.

You can also run the build in watch mode `pnpm build:bundles:watch` alongside with `pnpm playground:start` to re-bundle and rebuild the application on each change.

### Test Debugging

Tests written with `react-testing-library` can give great confidence when refactoring. However, they can be hard to debug when failing. This is mainly rooted in not having good visibility into what is being rendered and part of the DOM when testing at a specific moment in time.

This is where [jest-preview](https://www.jest-preview.com) can help. You can see your test output directly in the browser as you would see the app you are working on. Write test and watch rendered output changes accordingly.

To use `jest-preview` you need two terminal processes running. One for a `jest-preview` server and the other for your test.

1. Run `pnpm test:jest-preview` to start the server and open `http://localhost:3336`
2. Run the test your intend to debug ideally in watch mode using `pnpm test:watch test-suite-file.spec.js`
3. Add `jest-preview` to the test you intend to debug by importing the library and debugging with `jest-preview` where you intend to see the HTML rendered

Therefore, your test could look like this:

```js
import { debug } from 'jest-preview';
import { screen } from '@commercetools-frontend/application-shell/test-utils';

it('should render a button', () => {
  render();

  debug();

  expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
});
```

When running the above test, open your browser in [http://localhost:3336](http://localhost:3336) and it should update and show the HTML of what has been rendered at the time of calling `debug`.

Bear in mind we're using we are using [Automatic Mode](https://www.jest-preview.com/docs/getting-started/installation#6-optional--recommended-opt-in-to-automatic-mode), so if you're running the server, any failing test will update the browser view automatically.

## Adding changesets

commercetools application-kit uses [changesets](https://github.com/atlassian/changesets) to do versioning and creating changelogs.

As a contributor you need to add a changeset by running `pnpm changeset`.
The command will prompt to select the packages that should be bumped, their associated semver bump types and some markdown which will be inserted into the changelogs.

When opening a Pull Request, a `changeset-bot` checks that the Pull Request contains a changeset. A changeset is **NOT required**, as things like documentation or other changes in the repository itself generally don't need a changeset.

## Releasing packages

commercetools application-kit uses [changesets](https://github.com/atlassian/changesets) to do versioning and publishing a release.

A [Changesets release GitHub Action](https://github.com/changesets/action) opens a `Version Packages` Pull Request whenever there are some changesets that have not been released yet.

When the `Version Packages` Pull Request gets merged, the Changesets release GitHub Action will automatically trigger the release.

## Canary releases

On `main` branch, we automatically publish **canary** releases from CI to the `canary` distribution channel, _after_ the build runs successfully.

Canary releases are useful to test early changes that should not be released yet to `next` or `latest`. They are automatically triggered and released after a Pull Request merged into `main`.

Note that canary releases **will not create git tags and version bump commits**.

## GraphQL files and linting

To be able to validate GraphQL queries and mutations, defined as `.graphql` files, we use the [eslint-plugin-graphql](https://github.com/apollographql/eslint-plugin-graphql), which requires **introspection schemas** from the different GraphQL APIs being used.

To download the remote schemas run `pnpm generate-types`. The configuration of each schema is defined in the `codegen.*.yml` files, in the root directory. Running this script will download the schemas in the `schemas/*.json` files.

> Note that you need your user `mcAccessToken` to be defined as an environment variable `MC_ACCESS_TOKEN` in `.env` file. This will be used by the introspection queries to be able to download the schemas from the Merchant Center API. Additionally, you also need to specify one of your `CTP_PROJECT_KEY` where you have access to.

Since the Merchant Center uses multiple GraphQL APIs, we need to differentiate which queries use which schema. To do so, prefix the file extension with one of the GraphQL targets:

- **mc**: instead of `.graphql` use `*.mc.graphql` (_graphql target: `mc`_)
- **settings**: instead of `.graphql` use `*.settings.graphql` (_graphql target: `settings`_)
- **ctp**: instead of `.graphql` use `*.ctp.graphql` (_graphql target: `ctp`_)
- **proxy**: instead of `.graphql` use `*.proxy.graphql` (_API in the MC frontend apps_)

## Visual Studio Code recommended workspace

The file `recommended.code-workspace` contains a pre-defined VSCode configuration that is optimized for working in this repository.
It also contains the extension recommendations to effectively work with MDX, the writing style linter and more.

When opening the project folder, VSCode detects that there is a workspace configuration available and prompts the option to open it.
When VSCode loads the workspace configuration, it asks to automatically install all recommended extensions.

If you wish to keep your own `settings.json` config, you might consider to pick the configuration that you need from the recommended config.
