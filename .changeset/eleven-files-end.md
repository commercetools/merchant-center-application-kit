---
"@commercetools-frontend/jest-preset-mc-app": patch
---

test(setupFilesAfterEnv): support undefined use case

Changes in #3086 are not working when `process.env.CI` is evaluated to `undefined`.
