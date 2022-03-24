---
'@commercetools-frontend/mc-scripts': minor
---

Add new CLI command `mc-script config:sync`

This command allows users to synchronize the local custom application config with the one available on the merchant center organization.

It creates a new custom application if there is no custom application with the entryPointUriPath in the local config file.

If there is a custom application with the entryPointUriPath available in the merchant center, it is updated with the local configuration upon confirmation.

It accepts a mandatory argument `organizationId`, which specifies the organization the custom application configuration is to be uploaded.
