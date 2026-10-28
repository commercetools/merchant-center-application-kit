---
'@commercetools-frontend/mc-html-template': patch
---

Update dependency `serialize-javascript` from `7.1.2` to `^7.1.3`. Version 7.1.3 fixes [GHSA-m5mm-p8h7-m29v](https://github.com/advisories/GHSA-m5mm-p8h7-m29v) (XSS through an unescaped `</script` at the end of a serialized function body). `mc-html-template` was not affected: it calls `serialize()` with `isJSON: true`, which never serializes functions. This update makes sure that security scanners no longer report the advisory for this package.

The dependency is now declared as a minimum-version range, so consumers can get later 7.x releases without a new release of this package.
