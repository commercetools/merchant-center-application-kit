---
'@commercetools-frontend/mc-scripts': minor
---

fix(security): bump `terser-webpack-plugin` to `^5.5.0` and `css-minimizer-webpack-plugin` to `^8.0.0` to remove transitive `serialize-javascript@6.0.2` (GHSA-5c6j-r48x-rmvq) from the dependency graph. `terser-webpack-plugin` 5.4.0+ no longer depends on `serialize-javascript` at all, and `css-minimizer-webpack-plugin` 8 requires `serialize-javascript@^7.0.3`. Also bumps `postcss` to `^8.5.12` to satisfy the new `cssnano@7` peer dependency.

BREAKING: minimum supported Node.js is now `20.x` (was `18.x || 20.x || >=22.0.0`), to match `css-minimizer-webpack-plugin@8`'s `>= 20.9` engine requirement.
