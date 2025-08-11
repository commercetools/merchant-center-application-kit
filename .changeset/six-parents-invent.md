---
'@commercetools-frontend/cypress': minor
---

Allow to configure timeouts for the login command interactions.

```ts
cy.loginToMerchantCenter({
  // ...
  timeouts: {
    waitForPasswordInput: 10000,
  },
});
```
