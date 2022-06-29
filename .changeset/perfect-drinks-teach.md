---
'@commercetools-backend/express': minor
---

Add support for setting the `audience` policy. The policy can be used to determine how the `audience` value is exchanged between the Merchant Center API and the external API.

Supported values are:

- `forward-url-full-path`: This is the default policy. It sets the `audience` using the full URL (origin + pathname).
- `forward-url-origin`: This is the alternative policy. It sets the `audience` using only the origin URL part.

```js
createSessionAuthVerifier({
  audiencePolicy: 'forward-url-origin',
  // ...
});

createSessionMiddleware({
  audiencePolicy: 'forward-url-origin',
  // ...
});

```
