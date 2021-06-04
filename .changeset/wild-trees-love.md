---
"@commercetools-frontend/application-config": patch
"@commercetools-frontend/mc-html-template": patch
---

Allow configuration of `Strict-Transport-Security` header through custom application config.

Similar to the `Feature-Policies` header use the `strictTransportSecurity` property of the custom application config to add to the defaults. 

```js
headers: {
  strictTransportSecurity: ['includeSubDomains']
}
```
