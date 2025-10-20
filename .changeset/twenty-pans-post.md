---
'@commercetools-frontend/application-shell-connectors': minor
'@commercetools-frontend/application-config': minor
'@commercetools-frontend/constants': minor
---

Add support for legacy login mode for local development of customizations.
In order to opt in, in your `custom-application-config.mjs` or `custom-view-config.mjs` file set:

```js
env: {
    development: {
        mcIdentityLoginModeOverride: 'legacy',
    }
}
```
