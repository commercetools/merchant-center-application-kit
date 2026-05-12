---
'@commercetools-frontend/mc-scripts': patch
---

Use relative URLs for assets referenced from CSS files.

If a package has a CSS file that references a URL, we need to make sure it can resolve it correctly as does not inject the `runtime: "window.__toCdnUrl()"` part.
