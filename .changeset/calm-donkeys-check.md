---
'@commercetools-frontend/mc-html-template': patch
'@commercetools-frontend/mc-scripts': patch
---

Add experimental flag `--inline-csp` to `compile-html` command. If defined, the `Content-Security-Policy` header is injected in the `index.html` as a meta tag.
