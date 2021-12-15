---
'merchant-center-application-template-starter': major
'@commercetools-frontend/create-mc-app': major
'@commercetools-frontend/cypress': major
'playground': major
---

Following breaking changes were introduced:

- The starter template has been updated to use the new Org-level Custom Application features.
- The Custom Application config of the starter template has been converted from `.json` to `.mjs`, to allow importing and referencing constants.
- When installing the starter template using the `create-mc-app` CLI, the Custom Application config is updated with some of the user inputs, like `entryPointUriPath`.
  - If no `entryPointUriPath` is provided, a random one is assigned.

For more information see [Release notes v21](https://docs.commercetools.com/custom-applications/releases/2022-01-25-custom-applications-v21).
