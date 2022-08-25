---
'@commercetools-frontend/sdk': patch
---

Add support for requesting specific `claims` to be included in the exchange JWT sent from Merchant Center API to an external API.
Currently we only support requesting a custom claim with logged in user's permissions.

```js
actions.forwardTo.get({
  includeUserPermissions: true,
  // ...
});
// "X-Forward-To-Claims": "permissions"
```
