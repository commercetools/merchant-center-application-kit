---
'@commercetools-frontend/babel-preset-mc-app': minor
---

Removes usage of `core-js` when `process.env` is test. The update of `jest` to v27 comes with changes to how timers and timer mocks work. Some of `core-js` polyfills conflict or interfere with the new implementation of `jest`'s fake timers

As test environments do not require `core-js` it can be removed. This allows `jest` to work as expected and removed bloat from the test environment. 
