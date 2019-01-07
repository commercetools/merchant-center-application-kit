<p align="center">
  <a href="https://commercetools.com/">
    <img alt="commercetools logo" src="http://cdn.rawgit.com/commercetools/press-kit/master/PNG/72DPI/CT%20logo%20chrom%20black%20horizontal%20RGB%2072dpi.png">
  </a>
  <b>Merchant Center starter application</b>
</p>

This application gives you the minimum setup to develop and launch a working Merchant Center application.

## Installation

```bash
$ npm install --global @commercetools-frontend/create-mc-app
$ create-mc-app my-new-custom-application-project --template starter

# or

$ npx @commercetools-frontend/create-mc-app my-new-custom-application-project --template starter
```

## Start the development server

Run the following command to start the development server and launch the application:

```bash
$ yarn start
```

## Run tests

Run the following command to run the tests:

```bash
$ yarn test
$ yarn test:watch
```

## Build the production bundles

Run the following command to build the production bundles with webpack:

```bash
$ yarn build
```

## Linting, formatting, and so on

We only provide the minimal scripts and tooling to _start_, _test_ and _build_ the application. If you want to add more development tooling such as **linters**, **prettier**, etc. you need to provide those on your own.

You can have a look at our setup in the [`merchant-center-application-kit`](https://github.com/commercetools/merchant-center-application-kit) repository to help you getting set up.
