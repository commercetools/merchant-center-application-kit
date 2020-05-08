---
'@commercetools-frontend/mc-html-template': patch
'@commercetools-frontend/mc-scripts': patch
---

Missing `@babel/runtime-corejs3` dependency, causing the docker image of the `mc-http-server` to fail.
