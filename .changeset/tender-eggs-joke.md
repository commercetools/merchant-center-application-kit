---
'@commercetools-frontend/babel-preset-mc-app': minor
---

Do not use `core-js` in test environment.

After upgrading `jest` to v27 we found out that some of `core-js` polyfills conflict with new underlying implementation of `jest`'s fake timers. Turned out it's just safe not to use it in tests all together.
