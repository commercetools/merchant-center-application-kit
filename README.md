<p align="center">
  <a href="https://commercetools.com/">
    <img alt="commercetools logo" src="http://cdn.rawgit.com/commercetools/press-kit/master/PNG/72DPI/CT%20logo%20chrom%20black%20horizontal%20RGB%2072dpi.png">
  </a>
  <b>Merchant Center Starter Application.</b>
</p>

This repository contains an example application to run within a [Merchant Center](https://mc.commercetools.com) environment.

## Documentation

⏳ _coming soon_

## Development

Checkout the source code of the repository and install the dependencies:

```bash
$ npm install
```

To start the development server, run:

```bash
$ npm start
```

A webpack server will start building the source codes and will open up a page in the browser. At this point you can start developing the app and webpack will reload the page whenever you make some changes.

> The `.env` file contains necessary ENV variables to run the application on localhost.

### Running in production

To run the application in production mode, you need to take a couple of steps:

1.  build the production bundles

```bash
$ npm run build
```

This will output a `dist` folder containing the JS bundles in the `dist/assets` subfolder. There is also a `index.html.template` which will be used to generate the final `index.html` with the bundle references.

2.  start the HTTP server (as Nodejs process)

The HTTP server comes shipped with the `@commercetools-frontend/mc-http-server` package and provides a binary to start the server (`mc-http-server`).

To start the server, you need to provide the ENV variables either as a `.env` file or as inline ENV variables. You can look at the `.env.production` to get an idea.

In case you host the JS bundles on an external CDN, you need to point the CDN URL in the ENV variables. However, if you keep the assets within the server itself, you need to pass different arguments to the command:

```bash
# Using an external CDN. In the `.env` you should pass the URL pointing to the folder where
# the assets are stored.
$ CDN_URL=https://my.cdn.com/path/to/folder/ mc-http-server

# Not using an external CDN.
$ CDN_URL=/assets/ mc-http-server --use-local-assets
```

3.  start the HTTP server (as Docker image)

⏳ _coming soon_

## Important notice

The application is not meant to be run as a standalone application, instead it should run behind a proxy within the MC environment (_more info on that will follow soon_).

Furthermore, the MC API used by the application has some **strict CORS rules** about the domains, which means that running the app as standalone from an random domain won't work.
