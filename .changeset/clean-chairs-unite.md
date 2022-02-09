---
'@commercetools-frontend/sdk': minor
---

The SDK request payload (body) now allows to pass something other than a `string` or `Json` objects.

One use case for that is when using `FormData`, for example for uploading a file.
In this case, we recommend to explicitly unset the `Content-Type` HTTP header, and leave it for the browser to set it correctly.

To unset the `Content-Type`, pass the `null` value.

```js
{
  'Content-Type': null
}
```
