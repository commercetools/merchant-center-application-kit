---
'@commercetools-frontend/jest-preset-mc-app': patch
---

Do not fail on console when not on CI.

This is in order to restore the old behavior when running tests locally. Adding debug `console.log` statements should not fail the tests and clutter the output with false-positive "Expected test not to call console.log()" errors.
