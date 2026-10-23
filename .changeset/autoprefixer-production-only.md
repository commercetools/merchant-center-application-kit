---
'@commercetools-frontend/mc-scripts': patch
---

Only run Autoprefixer for production builds.

The `development` browser targets (the latest Chrome and Firefox versions) need no vendor prefixes, so Autoprefixer changed nothing there. With current browser data it also logged "Autoprefixer target browsers do not need any prefixes" in every development build. The CSS output is the same as before in both development and production.
