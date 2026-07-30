# Architecture of the Merchant Center Frontends

Source. Fetch for full detail and diagrams:
https://commercetools.atlassian.net/wiki/spaces/MC/pages/1543241861/Architecture+of+our+Frontends

## Components

The Merchant Center is many Single Page Applications combined into one.

- The `merchant-center-frontend` repo hosts many apps. `application-account`,
  `application-authentication`, `application-categories`, `application-customers`,
  `application-dashboard`, `application-discounts`, `application-fallback`,
  `application-orders`, `application-products`, `application-project-settings`.
- Other repos host a single app each. `merchant-center-operations`, `audit-log`,
  `merchant-center-prices`.
- Each app deploys independently. A fix can ship for one app at a time. So a
  rollback can target one app.

## How apps are tied together

`merchant-center-proxy` routes each request to an app entry point
(`application.html`) by URL. `/products` goes to `application-products`. The URL
to app mapping is static config in the proxy Helm chart in
`merchant-center-services` (`k8s/merchant-center-proxy/values.yaml`).

When routing is not handled inside an SPA a full page refresh sends the request
back to the proxy so another app can handle it. If no app or Custom Application
matches then `application-fallback` shows a not found page.

## Frontend hosting

Static assets live in buckets. AWS environments use S3. GCP environments use
Google Storage. The proxy Helm chart tells each environment which bucket to use.

GCP buckets:

- `merchant-center-asia`
- `merchant-center-north-america`
- `merchant-center-europe`
- `merchant-center-previews` for staging and branch previews

Layout inside a bucket. `application-<name>/<environment>/` holds
`application.html`, CSS, JavaScript, source maps, and favicons. Files are not
edited by hand.

## The menu

Each app defines `mainMenuLink` and `subMenuLink` in `custom-application-config.mjs`.
The build compiles a `menu.json` per app and uploads it to that app's bucket. The
proxy combines them and exposes the result through a GraphQL query
`FetchApplicationsMenu`. The `ApplicationShell` from `merchant-center-application-kit`
loads it and renders the menu.

## Build and deploy

- `mc-scripts` compiles `application.html` and builds static assets with Webpack
  or Vite.
- `application-cli` runs `compile-deployments` from each app's storage bucket
  config. It produces a `deployments/<environment>/` folder plus upload scripts.
- CircleCI runs the upload scripts. They use `gsutil` or the AWS CLI to push
  assets to the buckets. See [[deployment-pipelines]].

## Shared libraries

- **UI Kit** is the component library and design system. Tokens, inputs, fields,
  layout. Browse at uikit.commercetools.com.
- **Merchant Center Application Kit** is the shared frontend infrastructure. Build
  tooling, Babel and Jest presets, the application shell with user and project and
  permission context, and application components for pages and forms.

## Useful during an incident

- App will not load or shows not found. Check proxy routing config in the Helm
  chart, the bucket assets for that app and environment, and `application-fallback`.
- One app broken and others fine. Apps deploy independently. Roll back just that
  app. See the frontend rollback runbook.
- Menu missing or wrong. Inspect the `FetchApplicationsMenu` query on the proxy
  and the `menu.json` files in the buckets.
- The proxy is the frontend delivery path. It is not the API. See [[glossary]].
