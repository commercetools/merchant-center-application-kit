---
'@commercetools-frontend/application-shell': patch
---

Adds Suspense boundary when rendering IconSwitcher to avoid blocking the whole app loading. Minimizes LCP increase after React 19 upgrade due to https://github.com/facebook/react/issues/31819
