---
'@commercetools-frontend/create-mc-app': minor
---

Added a `--cloud-identifier` option to the `create-mc-app` CLI, allowing to specify the [cloudIdentifier](https://docs.commercetools.com/merchant-center-customizations/api-reference/custom-application-config#cloudidentifier) in the customization configuration file.

Example usage:

```bash
npx @commercetools-frontend/create-mc-app@latest \
  my-new-custom-application-project \
  --template starter \
  --cloud-identifier gcp-us
```
