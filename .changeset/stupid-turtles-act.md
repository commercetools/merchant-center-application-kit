---
'@commercetools-frontend/application-shell': minor
---

Build package using `preconstruct`. This is now possible as we don't directly load the `.css` file anymore. Instead, we use `postcss` to compile it and load the styles using a macro. This allows the code to be bundled using Babel.
