# @commercetools-frontend/mc-http-server

This package contains the HTTP server to run a MC application in production.

> This server should **only be used for production**, for development we use `@commercetools-frontend/mc-scripts` to start a development server.

## Install

```bash
$ npm install --save @commercetools-frontend/mc-http-server
```

## Why do we need an HTTP Server?

Since a SPA consists of mainly JS bundles and CSS, it's usually not necessary to have an actual HTTP server running.
In theory it's enough to serve a _static HTML page_ from e.g. a CDN.

However our MC SPA requires certain information and configuration which cannot be provided on compile time ([\*][#inject-variables-at-compile-time]).
This information is available at **runtime through environment variables**, which needs to by dynamically injected into the `index.html`.

For that reason, before the server starts, we pull the `index.html.template` generated on build time (containing references to the JS bundles and placeholders for runtime variables to be injected) and generate the final `index.html`.

> All static assets are served from the `public` folder.

## Additional responsibilities

Besides generating and serving the `index.html`, the HTTP server does additionally a couple of things:

- gathers `/metrics` for Prometheus
- provides a `/version` endpoint with the current revision hash (git SHA)
- intercepts `/logout` redirects to clear the HTTP cookie for the access token
