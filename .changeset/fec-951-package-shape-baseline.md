---
---

Add CI gate that runs `publint` and `@arethetypeswrong/cli` against the packed
tarball of every `@commercetools-frontend/*` and `@commercetools-backend/*`
package on each PR. Findings are reported but do not gate merges
(`REPORT_ONLY = true`); the flip to blocking happens in the metadata cleanup
sibling once the baseline reaches zero. No published-package source changes —
no version bump required.
