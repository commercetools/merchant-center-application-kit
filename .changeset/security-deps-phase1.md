---
'@commercetools-frontend/mc-scripts': patch
'@commercetools-frontend/application-shell': patch
---

Security and dependency maintenance pass (Phase 1).

Patched several medium-severity CVEs: `postcss`, `vite`, `@babel/core`, `yaml`, `js-yaml`, `qs`, `sharp`, and `webpack-dev-server`. Upgraded `webpack-dev-server` from v4 to v5, which required removing the deprecated `https: false` option (HTTP is the v5 default) and updating the shutdown handler from the removed `close()` to `stop()`. Also updated `@commercetools-uikit/*` to `^20.6.7` and replaced `@tsconfig/node22` with `@tsconfig/node24`.
