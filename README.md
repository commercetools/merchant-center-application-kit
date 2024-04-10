<h2 align="center">commercetools UI Application Kit 💅</h2>
<p align="center">
  <i>✨ Mono-repository with tools and components for developing Merchant Center customizations 🛠</i>
</p>
<p align="center">
  <a href="https://github.com/commercetools/merchant-center-application-kit/releases"><img src="https://badgen.net/github/release/commercetools/merchant-center-application-kit" alt="Latest release" /></a> <a href="https://github.com/commercetools/merchant-center-application-kit/blob/main/LICENSE"><img src="https://badgen.net/github/license/commercetools/merchant-center-application-kit" alt="GitHub license" /></a>
</p>

> To help you developing Merchant Center customizations, be sure to check out our [ui-kit](https://github.com/commercetools/ui-kit) components library.

## Getting started

If you are developing a Merchant Center Custom Application, follow the [Custom Applications getting started guide](https://docs.commercetools.com/merchant-center-customizations/custom-applications).

If you are developing a Merchant Center Custom View, follow the [Custom Views getting started guide](https://docs.commercetools.com/merchant-center-customizations/custom-views).

## Developing application-kit packages

Install the dependencies (uses [pnpm workspaces](https://pnpm.io/workspaces)):

```bash
$ pnpm install
```

To run the tests:

```bash
$ pnpm run test

# or
$ pnpm run test --watch
```

Build the application bundles

```bash
$ pnpm build

# or
$ pnpm build:bundles:watch
```

Start the [playground application](./playground):

> Note that the playground application consumes the app-kit dependencies ES modules, which means you need to bundle the packages first. We recommend to bundle the packages in watch mode in one terminal process and start the playground app in another terminal process.

```bash
// Terminal process 1
$ pnpm build:watch

// Terminal process 2
$ pnpm playground:start
```

## Documentation

Please look at the single packages in [`packages` folder](./packages) for documentation specific of each package.

## Contributing

Contributions are welcomed. Please have a read at our [contribution guidelines](CONTRIBUTING.md).
