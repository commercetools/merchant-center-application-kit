---
'@commercetools-backend/express': patch
---

Fix issue with invalid JWT `aud` in case the request contains query string parameters. Now the constructed audience url omits the query string parameters.
