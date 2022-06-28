---
'@commercetools-frontend/application-shell': minor
---

Add support for setting the `audience` policy. The policy can be used to determine how the `audience` value is exchanged between the Merchant Center API and the external API.

Support values are:

- `forward-url-full-path`: This is the default policy. It sets the `audience` using the full URL (origin + pathname).
- `forward-url-origin`: THis is the alternative policy. It sets the `audience` using only the origin URL part.

```js
createApolloContextForProxyForwardTo({
  audiencePolicy: 'forward-url-origin',
  // ...
});

// "X-Forward-To-Audience-Policy": "forward-url-origin"
```
