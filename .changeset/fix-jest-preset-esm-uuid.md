---
'@commercetools-frontend/jest-preset-mc-app': patch
---

fix: handle ESM-only dependencies (uuid v14) in jest preset

Add `transformIgnorePatterns` to the shared jest preset so that ESM-only packages like `uuid` v14 are transpiled by babel-jest. Also add `ts` and `tsx` to the base preset's `moduleFileExtensions` so JavaScript starter templates can resolve TypeScript dependencies.
