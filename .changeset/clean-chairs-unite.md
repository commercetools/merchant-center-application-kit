---
'@commercetools-frontend/sdk': minor
---

The SDK request payload (body) now allows to pass something other than a `string` or JSON objects.

One use case for that is when using `FormData`, for example for uploading a file.
In this case, we recommend to explicitly unset the `Content-Type` HTTP header, and let the browser correctly infer it.

To unset the `Content-Type`, pass the `null` value.

```js
{
  'Content-Type': null
}
```
