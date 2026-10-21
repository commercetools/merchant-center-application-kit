---
'@commercetools-frontend/application-shell': patch
---

With `enableEarlyShellRendering` on, show an empty content area instead of the application loader spinner until the routed content renders. The spinner appeared next to the chrome's grey placeholders, which made the loading sequence inconsistent.
