<p align="center">
  <a href="https://commercetools.com/">
    <img alt="commercetools logo" src="https://unpkg.com/@commercetools-frontend/assets/logos/commercetools_primary-logo_horizontal_RGB.png">
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

## Adjust the configuration

Rename the file `.env.template` to `.env`. It contains some environment variables used in the `env.json` and `headers.json` file.

By default the GCP EU environment is configured. If you plan to run the Custom Application in another environment, change the hostname accordingly.

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
