---
'@commercetools-frontend/application-config': patch
'@commercetools-frontend/mc-scripts': patch
---

Sanitize SVG icon only when comparing diffs, as the icon is sanitized in the API. Expose the `sanitizeSvg` logic from the `@commercetools-frontend/application-config/ssr` entry point.
