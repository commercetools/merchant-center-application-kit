---
"@commercetools-backend/loggers": minor
---

Support to not unset the original field when rewriting logs.

When rewriting a field you can use the `unsetFromField` option and set it to `false`. For example:

```js
{
  from: 'meta.req.statusCode',
  to: 'meta.req.status_code',
  unsetFromField: false,
}
```

Would add a field `meta.req.status_code` while keeping the original `meta.req.statusCode`. This can be helpful when gracefully migrating fields.
