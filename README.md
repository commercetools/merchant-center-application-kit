# HTTP Server

This package contains the HTTP server to run the MC SPA.

> The server is **only used for production**, for development we use [our custom version of `react-scripts` and `webpack-dev-server`](../README.md).

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

### Release process

We use Google Cloud Container Registry to build and store the Docker image, using a Build trigger connected to our GitHub repo.

- the trigger is configured to be executed based on the git tag matching the regex `http-server-[0-9].[0-9].[0-9]`
  - the reason is to avoid triggering the build on every push/commit on e.g. `master`, instead we need to explicitly "tag a release"
  - whenever we push some changes for the dockerfile, we should create a new tag `git tag -m "Http server: 2.0.0" http-server-2.0.0 && git push --tags`, obviously using a proper semver
- remember to bump the version in the following places:
  - `package.json`
  - `_PKG_VERSION` in `cloudbuild.yaml`
  - `image.tag` in the `values.yaml` of the related K8s chart
- the Google Cloud project used for the registry is called `ct-images`
