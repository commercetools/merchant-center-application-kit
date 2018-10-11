<p align="center">
  <a href="https://commercetools.com/">
    <img alt="commercetools logo" src="http://cdn.rawgit.com/commercetools/press-kit/master/PNG/72DPI/CT%20logo%20chrom%20black%20horizontal%20RGB%2072dpi.png">
  </a>
  <b>Merchant Center Starter Application.</b>
</p>

This repository contains an example application to run within a [Merchant Center](https://mc.commercetools.com) environment.

## Documentation

⏳ _coming soon_

> NOTE: until there is a proper documentation we recommend to look into the npm packages of `@commercetools-frontend` to check their READMEs and understand what you can use to build the application. In particular, we recommend looking at the [`@commercetools-frontend/ui-kit`](https://github.com/commercetools/ui-kit) package as well as `@commercetools-frontend/sdk`, `@commercetools-frontend/application-shell`, `@commercetools-frontend/application-shell-connectors`. Look also at the example implementation to see how to combine the main elements.

### Getting started

Before you jump into developing the application, there are some important information to know beforehand:

- the project demonstrate how to set up and develop a Merchant Center Application
- a Merchant Center Application is a runnable React application, developed and built using the `mc-scripts` package provided by commercetools (_if you're familiar with `react-scripts`, it works very similarly to that_)
  - the `mc-scripts start` command will start a webpack development server
  - the `mc-scripts build` command will bundle the production assets into the `dist` folder
- the Merchant Center itself is composed by multiple applications running behind a proxy, each one of those serving a specific part of the overall Merchant Center (_e.g. dashboard, products, discounts_)
- building a "custom" Merchant Center Application, means building a new part of the overall Merchant Center, where eventually this "custom" app will be hosted by you and served from the proxy within the commercetools systems (_more on that will come soon_)
- in order to have the same main structure and "bootstrap" logic across the different applications, we built a component called `ApplicationShell` that MUST be rendered by each application within their entry points
  - the `ApplicationShell` contains among other things the `NavBar` component, where you see the "links" on the left-side menu
  - the `NavBar` component is shared across all the different applications, and needs to contain the main links of all the applications
  - the `NavBar` component by default only contains the links of the "official" applications (_e.g. dashboard, products, discounts_)
  - for custom applications, links are stored in the Merchant Center API and loaded asynchronously for a specific project. This means that you can't "manually" add links to the `NavBar` but instead you need to configure them with the settings (_more on that will come soon_)
- each Merchant Center Application usually defines ONE main route (_e.g. in this example the application defines a `/:projectKey/channels` route_)
  - routes should always contain the `/:projectKey`, as those "custom" application belong to a certain project
  - routes for "custom" applications should not conflict with the "official" routes (_e.g. `dashboard`, `products`, etc_), as "official" routes always take precedence
  - routes can and should have sub-routes, dependening on how many levels/views the application should have (_e.g. `/:projectKey/channels/:id`, `/:projectKey/channels/new`, etc_)

### Project structure

If you are trying to find yourself around the files and folders, here are some useful information where find what:

- `src` contains all the JS files to build the application
  - `index.js` is the application "entry point" and contains the basic imports to render the React app
  - `routes.js` contains the sub-routes and components rendered by the application (the main route is defined in the `<EntryPoint>` and is loaded asynchronously using code splitting)
- `dist` contains the production bundles
- `env.json` contains the development config used by the webpack dev server (_more on that will come soon_)
- `env.prod.json` is an example of the config used by running the application in production mode (see below [Running in production](#running-in-production))
- `csp.json` contains additional directives for CSP, specific to the domain hosting the app (_more on that will come soon_)
- `webpack.config.<env>.js` contains the setup for getting the webpack configurations for dev/prod (having those files is important as they are read by `mc-scripts`)
- `jest[...].js` contains configuration for the different runners (testing, linting, etc)

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

> The `env.json` file contains necessary config to run the application on localhost.

### API domains

The MC runs on 2 different data centers: one in `EU` and one in `US`. Depending on which one you would like to target your application, you need to adjust a couple of fields in the `env.json` file.

The MC API is available at the following domains:

- for `EU`: `https://mc-api.commercetools.com`
- for `US`: `https://mc-api.commercetools.co`

### Running in production

To run the application in production mode, you need to take a couple of steps:

1.  build the production bundles

```bash
$ npm run build
```

This will output a `dist` folder containing the JS bundles in the `dist/assets` subfolder. There is also a `index.html.template` which will be used to generate the final `index.html` with the bundle references.

2.  start the HTTP server (as Nodejs process)

The HTTP server comes shipped with the `@commercetools-frontend/mc-http-server` package and provides a binary to start the server (`mc-http-server`).

To start the server, you need to provide the path to the config `--config=$(pwd)/env.json` file. The `env.prod.json` is for production usage.

In case you host the JS bundles on an external CDN, you need to point the `cdnUrl` in the `env.json` config to the URL serving the assets. However, if you keep the assets within the server itself, you need to pass different arguments to the command:

```js
// Using an external CDN. In the `env.json` you should pass the URL pointing to the folder where
// the assets are stored.
{
  "cdnUrl": "https://my.cdn.com/path/to/folder/"
}
```

```bash
$ mc-http-server --config=$(pwd)/env.prod.json
```

In case assets are served from the same server, it's recommended to define the path to the server itself (including the host name)

```js
// Not using an external CDN
{
  // this is the default, all assets are served from the root folder
  "cdnUrl": "https://localhost:3001",
  // this is the default, all assets are served from the root folder
  "cdnUrl": "https://localhost:3001"
}
```

```bash
$ mc-http-server --config=$(pwd)/env.prod.json --use-local-assets
```

3.  start the HTTP server (as Docker image)

⏳ _coming soon_

## Important notice

The application is not meant to be run as a standalone application, instead it should run behind a proxy within the MC environment (_more info on that will follow soon_).

Furthermore, the MC API used by the application has some **strict CORS rules** about the domains, which means that running the app as standalone from an random domain won't work.
