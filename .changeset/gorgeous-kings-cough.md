---
'@commercetools-backend/express': patch
---

Now that users can request the Merchant Center API to include logged in user's permissions in the exchange JWT included in proxied requests, our _auth_ middleware will check for that information in the token and will make it available in the `request.session` object under a new property named **userPermissions**.
