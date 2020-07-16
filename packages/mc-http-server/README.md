# @commercetools-frontend/mc-http-server

<p align="center">
  <a href="https://www.npmjs.com/package/@commercetools-frontend/mc-http-server"><img src="https://badgen.net/npm/v/@commercetools-frontend/mc-http-server" alt="Latest release (latest dist-tag)" /></a> <a href="https://www.npmjs.com/package/@commercetools-frontend/mc-http-server"><img src="https://badgen.net/npm/v/@commercetools-frontend/mc-http-server/next" alt="Latest release (next dist-tag)" /></a> <a href="https://bundlephobia.com/result?p=@commercetools-frontend/mc-http-server"><img src="https://badgen.net/bundlephobia/minzip/@commercetools-frontend/mc-http-server" alt="Minified + GZipped size" /></a> <a href="https://github.com/commercetools/merchant-center-application-kit/blob/master/LICENSE"><img src="https://badgen.net/github/license/commercetools/merchant-center-application-kit" alt="GitHub license" /></a>
</p>

This package contains the HTTP server to run a Custom Application in production.

> This server should **only be used for production**, for development we use `@commercetools-frontend/mc-scripts` to start a development server.

## Install

```bash
$ npm install --save @commercetools-frontend/mc-http-server
```

### Docker image

We also provide a docker image to run the server:

```bash
$ docker run -p 3001:3001 eu.gcr.io/ct-images/mc-http-server:v0.0.0 mc-http-server
```

## Why do we need an HTTP Server?

Since a Single Page Application consists of mainly JavaScript bundles and CSS, it's usually not necessary to have an actual HTTP server running.
In theory it's enough to serve a _static HTML page_, for example from a Content Delivery Network (CDN).

However, the Custom Application requires certain information and configuration which cannot be provided on build time.
This information is available at **runtime through environment variables**, which needs to be dynamically injected into the `index.html`.

For that reason, before the server starts, we process the `index.html.template` that was previously generated on build time, containing references to the JavaScript bundles.
Additionally, there are some placeholders variables that are replaced with the values from the application config. After that, the final `index.html` file is written on disk and ready to be served by the HTTP server.

> All static assets are served from the `public` folder.

## Additional responsibilities

Besides generating and serving the `index.html`, the HTTP server does additionally a couple of things:

- gathers `/metrics` for Prometheus
- provides a `/version` endpoint with the current revision hash (git SHA)
