<p align="center">
  <a href="https://commercetools.com/">
    <img alt="commercetools logo" src="https://unpkg.com/@commercetools-frontend/assets/logos/commercetools_primary-logo_horizontal_RGB.png">
  </a>
  <b>Merchant Center Playground Application.</b>
</p>

## Motivation

This application can be used as the **starting point** to **build and develop** a Merchant Center Application and shows how to set it up. Furthermore, the playground can be used to test and develop the features in the `application-kit` [packages](../packages).

> **Custom** Applications are a way to extend the functionality of the Merchant Center to match the specific business requirements of the project. These Custom Applications will be completely managed by you and, once registered, they can be accessed within the official Merchant Center environment.

## Important concepts

Before you jump into developing the application, there are some **important information and concepts** to know beforehand:

- a Merchant Center Application is a runnable React application, developed and built using the [`mc-scripts`](../packages/mc-scripts) package
  - the `mc-scripts start` command will start a webpack development server
  - the `mc-scripts build` command will bundle the production assets into the `dist` folder
- the Merchant Center itself is composed by _multiple applications_ running behind a **proxy**
  - each application serves a specific part of the overall Merchant Center (_e.g. dashboard, products, discounts, etc._)
- in order to ensure consistency across the different applications and to share the main "bootstrap" logic, we built a component called [`<ApplicationShell>`](../packages/application-shell) that **MUST** be rendered by each application within its entry points
  - the `<ApplicationShell>` contains, among other things, the `<NavBar>` component with the menu links on the left side
  - the `<NavBar>` component is shared across all the different applications, and needs to contain the main links of all the applications
  - the `<NavBar>` component by default only contains the links of the "official" applications (_e.g. dashboard, products, discounts, etc._)
  - for **custom** applications, links are stored in the Merchant Center API and loaded asynchronously for a specific project. You can configure these settings in the Merchant Center itself when you **register** a custom application (_link will follow_)
- each Merchant Center Application usually defines **ONE main route** (_e.g. in this example the application defines a `/:projectKey/channels` route_)
  - routes should always contain the `/:projectKey` because **custom** applications belong to a specific project
  - routes for **custom** applications should not conflict with the "official" routes (_e.g. `dashboard`, `products`, etc._)
  - "official" routes always take precedence, so be careful when you name your routes
  - routes can and should have sub-routes, dependening on how many levels/views the application should have (_e.g. `/:projectKey/channels/:id`, `/:projectKey/channels/new`, etc._)

## Application structure

A project for developing a Merchant Center Application usually consists of the following structure:

- `src` contains all the JS files to build the application
  - `index.js` is the application "entry point" and contains the basic imports to render the React app
  - `routes.js` contains the sub-routes and components rendered by the application (the main route is defined in the `<EntryPoint>` and is loaded asynchronously using code splitting)
- `dist` contains the production bundles (this is created once you run `yarn build`)
- `env.json` contains runtime configuration available as a global state `window.app`. The object has to be passed to the `<ApplicationShell>` as `environment` prop. The object can contain any configuration specific to the application, plus the following **required** fields:
  - `applicationName`: the name of the application (usually the same as in`package.json`)
  - `frontendHost`: the host where the Merchant Center application is running (e.g. `mc.commercetools.com`)
  - `mcApiUrl`: the API URL of the Merchant Center (`https://mc-api.commercetools.com` for projects in `EU` and `https://mc-api.commercetools.co` for projects in `US`)
  - `location`: the location where the Merchant Center is running, usually `eu` or `us`
  - `env`: the environment where the Merchant Center is running, usually `production` or `staging`
  - `cdnUrl`: the URL where the static assets are stored
  - `servedByProxy`: a flag to indicate if this application is running behind the Merchant Center proxy or not, usually `true` for production and `false` for local development
    Check the `<ApplicationContext>` in [`application-shell-connectors`](../packages/application-shell-connectors) for more information about it.
- `csp.json` contains additional directives for CSP, specific to the domain hosting the app (_more on that will come soon_)
- `webpack.config.<env>.js` contains the setup for getting the webpack configurations for dev/prod (having those files is important as they are read by `mc-scripts`)

## Development

> In this repository the dependencies are installed from the _root_ package, using `yarn` worskpaces.

Make sure to `yarn build` the packages before starting the `playground` app because the app consumes the packages as normal "transpiled" dependencies.

You can also run the build in watch mode `yarn build:es:watch` alongside with `yarn playground:start` to rebundle and rebuild the application on each change.

To start the development server, run:

```bash
$ yarn start
```

A webpack server will start building the source codes and will open up a page in the browser. At this point you can start developing the app and webpack will reload the page whenever you make some changes.

## Merchant Center API

The Merchant Center runs on 2 different _data centers_: one in `EU` and one in `US`. Depending on which one you would like to target for your application, you need to adjust a couple of fields in the `env.json` file.

The **Merchant Center API** is available at the following domains:

- for `EU`: `https://mc-api.commercetools.com`
- for `US`: `https://mc-api.commercetools.co`

The Merchant Center API mostly works as an **API Gateway** and exposes several entry points, like:

- `/tokens` is used to log a user in with _username/password_. The API will create an access token and put it into a **cookie** in the response.
- `/graphql` this is a _special_ GraphQL endpoint that requires a header `X-Graphql-Target` one of the values available in the variable `GRAPHQL_TARGETS` in the [`constants`](../packages/constants) package. The header is used to proxy the graphql request to the specific graphql server. We recommend to do an instrospection query with a [graphql IDE](https://github.com/prisma/graphql-playground) to inspect the different schemas.
- `/proxy/ctp/<CTP_API_URL>` is used to proxy requests to the [CTP API](https://docs.commercetools.com/http-api.html). Requests should be exactly the same as you would make to the CTP API directly, only prefixed with `/proxy/ctp` so that the Merchant Center API can authorize the request and proxy it to the CTP API.

## Running in production

To run the application in production mode, you need to take a couple of steps:

1.  build the production bundles

```bash
$ yarn build
```

This will output a `dist` folder containing the JS bundles in the `dist/assets` subfolder. In the `assets` folder there is a `index.html.template` which will be used to generate the final `index.html` with the bundle references (_see below_).

2.  start the NodeJS HTTP server

The HTTP server comes shipped with the [`mc-http-server`](../packages/mc-http-server) package and provides a binary to start the server (`mc-http-server`). The server will make sure to serve a valid `index.html` and it provides additional tools like _security headers, etc._.

To start the server, you need to provide the path to the environment file `--config=$(pwd)/env.json` and the Content Security Policy file `--csp=$(pwd)/csp.json`. We recommend to have a separate `env.prod.json` for production usage.

In case you host the JS bundles on an **external CDN**, you need to point the `cdnUrl` in the `env.json` config to the URL serving the assets. However, if you keep the assets within the server itself, you need to pass `--use-local-assets` to the command and point the `cdnUrl` to the root folder:

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

We also provide a [docker image](../packages/mc-http-server/Dockerfile) from `eu.gcr.io/ct-images/mc-http-server`. The version is the same as the [last release](https://github.com/commercetools/merchant-center-application-kit/releases).

### Deployment example for `now`

You can find an example setup for hosting the application on [Zeit Now](https://zeit.co/).
The setup is a bit "unique" due to the nature of the project structure and because we target 2 deployments (`eu` and `us`).

However, deploying with `now` is pretty straight forward and can be done by using a [nodejs](https://zeit.co/docs/v1/deployment-types/node) or [docker](https://zeit.co/docs/v1/deployment-types/docker) deployment types.

> NOTE that the setup currently works for `now` version `1`. The version `2` has deprecated those deployment types and is based on **Lambda** functions (or static files) to run the application. _If requested, we will look into it and provide a tutorial for setting it up._

## Important notice

The application is not meant to be run as a standalone application, instead it should run behind a proxy within the MC environment (_more info on that will follow soon_).

Furthermore, the MC API used by the application has some **strict CORS rules** about the domains, which means that running the app as standalone from an _random_ domain won't work.
