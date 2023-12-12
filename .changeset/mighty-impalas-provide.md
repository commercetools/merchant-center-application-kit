---
'@commercetools-frontend/mc-scripts': patch
---

Avoid implementing 2 separate ID's for ID's that are declared and consumed in the same SVG file in webpack's SVGR loader and Vite SVGR plugin.

More information about the approach can be found [here](https://github.com/svg/svgo/issues/913#issuecomment-369373572).
