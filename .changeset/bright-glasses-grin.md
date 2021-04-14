---
"@commercetools-frontend/application-config": minor
"@commercetools-frontend/mc-html-template": minor
"@commercetools-frontend/mc-scripts": minor
"@commercetools-website/custom-applications": minor
---

Adds support for specifying the `Permissions-Policy` header supported in Chrome 90.

Similar to the `Feature-Policies` header an application config now support a `permissionsPolicies` field.

```js
headers: {
  permissionPolicies: {
     mircophone: '()'
  }
}
```

More information about supported permission policies can be found [here](https://github.com/w3c/webappsec-permissions-policy/blob/main/permissions-policy-explainer.md).
