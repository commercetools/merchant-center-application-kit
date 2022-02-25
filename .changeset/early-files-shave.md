---
'@commercetools-backend/express': patch
'@commercetools-website/custom-applications': patch
---

Allow to map a `request` URL (URI path + query string) using the `getRequestUrl` function in case the `request` object does not contain either an `originalUrl` or `url` properties.

More info at https://docs.commercetools.com/custom-applications/concepts/integrate-with-your-own-api#validating-the-json-web-token.
