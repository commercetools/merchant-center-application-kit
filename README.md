<h2 align="center">commercetools UI Application Kit 💅</h2>
<p align="center">
  <i>✨ Monorepository with tools and components for developing Merchant Center Applications 🛠</i>
</p>
<p align="center">
  <a href="https://travis-ci.org/commercetools/merchant-center-application-kit"><img src="https://badgen.net/github/status/commercetools/merchant-center-application-kit" alt="CI status" /></a> <a href="https://github.com/commercetools/merchant-center-application-kit/releases"><img src="https://badgen.net/github/release/commercetools/merchant-center-application-kit" alt="Latest release" /></a> <a href="https://github.com/commercetools/merchant-center-application-kit/blob/master/LICENSE"><img src="https://badgen.net/github/license/commercetools/merchant-center-application-kit" alt="GitHub license" /></a>
</p>

> To help you developing Merchant Center Applications, be sure to check out our [ui-kit](https://github.com/commercetools/ui-kit) components library.

## Getting started

If you are developing a Merchant Center application, you can start by installing one of our [templates](./application-templates) using the `create-mc-app` CLI.

```bash
$ npm install --global @commercetools-frontend/create-mc-app
$ create-mc-app my-new-custom-application-project --template starter

# or

$ npx @commercetools-frontend/create-mc-app my-new-custom-application-project --template starter
```

## Developing application-kit packages

Install the dependencies (uses yarn workspaces):

```bash
$ yarn
```

To run the tests:

```bash
$ yarn test

# or
$ yarn test:watch
```

Build the application bundles

```bash
$ yarn build

# or
$ yarn build:es:watch
```

Start the [playground application](./playground):

> NOTE: the playground application consumes the app-kit dependencies's es modules, which means you need to bundle the packages first. We recommend to bundle the packages in watch mode in one terminal process and start the playground app in another terminal process.

```bash
// Terminal process 1
$ yarn build:es:watch

// Terminal process 2
$ yarn playground:start
```

## Documentation

Please look at the single packages in [`packages` folder](./packages) for documentation specific of each package.

_Documentation website coming soon_

## Contributing

Contributions are welcomed. Please have a read at our [contribution guidelines](CONTRIBUTING.md).
