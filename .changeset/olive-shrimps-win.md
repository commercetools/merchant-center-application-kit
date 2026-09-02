---
'@commercetools-frontend/mc-scripts': minor
---

Add `ANALYZE_BUNDLE_OUTPUT=<path>` to write the bundle analysis to a JSON file
instead of opening the browser report. Setting it implies `ANALYZE_BUNDLE=true`,
so it can be used on its own. Leaving it unset keeps the existing behaviour.

Bundle sizes on the Vite build path are now reported as gzip rather than stat,
matching the webpack path, so figures are comparable across both. Numbers from
earlier `bundles:analyze` runs will not line up with new ones.
