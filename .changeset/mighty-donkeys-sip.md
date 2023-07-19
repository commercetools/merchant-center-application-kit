---
"@commercetools-backend/loggers": minor
---

Add support to optionally preserve the original field when rewriting log fields with `rewriteFieldsFormatter`.

When rewriting a field you can use the `preserveFromField` option and set it to `true`. For example:

```js
{
  from: 'meta.req.statusCode',
  to: 'meta.req.status_code',
  preserveFromField: true,
}
```

Would add a field `meta.req.status_code` while keeping the original `meta.req.statusCode`. This can be helpful when gracefully migrating fields.
