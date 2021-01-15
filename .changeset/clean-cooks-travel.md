---
'@commercetools-frontend/application-config': minor
'@commercetools-frontend/application-shell': minor
'@commercetools-frontend/application-shell-connectors': minor
'@commercetools-frontend/constants': minor
'@commercetools-frontend/cypress': minor
'@commercetools-frontend/mc-scripts': minor
'@commercetools-frontend/sdk': minor
'playground': minor
---

Introduce a new **experimental opt-in** feature to authenticate the application for local development, using an OIDC-like workflow.

> Disclaimer: this is an opt-in experimental feature. Use it at your own risk.
> We want to test this feature internally first. Until then, we discourage you to try it out.

The feature can be enabled by setting the `ENABLE_OIDC_FOR_DEVELOPMENT=true` environment variable.

In addition to that, we have a new package `@commercetools-frontend/cypress`, to include some useful commands for testing Custom Applications.
