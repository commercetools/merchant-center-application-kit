---
"@commercetools-frontend/mc-scripts": patch
---

Add support for webpack configurations with different file extensions.

Previously webpack configurations could only have the `.js` extension. In order to support ES modules we now also support the `*.cjs` extension.
