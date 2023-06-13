---
"@commercetools-frontend/jest-preset-mc-app": patch
---

Adds support for `process.env.CI` being `undefined`

This fixes an issue introduced in #3086 when `process.env.CI` is evaluated to `undefined`.
