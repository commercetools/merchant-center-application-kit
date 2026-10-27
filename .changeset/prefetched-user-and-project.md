---
'@commercetools-frontend/application-shell': minor
---

`FetchUser` and `FetchProject` now use the user and project data prefetched by the Merchant Center proxy, if the page has a `<link rel="preload">` tag for it (`/__prefetch/user`, `/__prefetch/project`). The data is written to the Apollo cache, so the queries are served without a network request. If there is no preload tag, or the prefetched response is incomplete or failed, the queries run as before.
