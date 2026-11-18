---
'@commercetools-frontend/mc-scripts': patch
---

Fix production and development builds failing with webpack 5.110.0 or later when `@commercetools/nimbus` is not installed (`export 'Splitter' (imported as 'Splitter') was not found in '@commercetools/nimbus'`). The Nimbus stub no longer exports an object literal, which webpack now analyzes statically.
