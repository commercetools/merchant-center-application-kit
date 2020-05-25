---
"@commercetools-backend/loggers": patch
---

refactor: update to typescript 3.9

The re-export of winston from the `@commercetools-backend/loggers` package has been removed. 

Given the `winston` types use an `export = winston` our package cannot re-export using `export * from`. If you relied on this re-export we suggest to install winston yourself and import it regularily.

After running `yarn add winston` you should change the following

```diff
-import { winston } from '@commercetools-backend/loggers'
+import winston from 'winston'
```

We might add `winston` as a peer dependency in a future release to ensure that both, ours and your, `winston` versions remain in sync.
