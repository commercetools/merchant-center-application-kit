---
'@commercetools-backend/loggers': minor
---

In the access logger the option `ignoreUrls` supports both strings and regular expressions.

For strings, the value is matched as-is. You can now use the regular expression to match a certain path structure, for example to ignore requests to load assets.

```ts
const access = createAccessLoggerMiddleware({
  level: 'info',
  json: true,
  ignoreUrls: ['/', '/health', /^\/static\/(.*)/],
});
```
