---
'@commercetools-frontend/mc-scripts': minor
---

Add `ANALYZE_BUNDLE_OUTPUT=<path>` to write the bundle analysis to a JSON file
instead of opening the browser report. Setting it implies `ANALYZE_BUNDLE=true`,
so it can be used on its own. Leaving it unset keeps the existing behaviour.
