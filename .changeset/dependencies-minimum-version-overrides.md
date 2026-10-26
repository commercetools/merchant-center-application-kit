---
'@commercetools-frontend/mc-html-template': patch
---

Update dependency `serialize-javascript` from `7.1.2` to `^7.1.3`. This includes the fix for [GHSA-m5mm-p8h7-m29v](https://github.com/advisories/GHSA-m5mm-p8h7-m29v) (XSS through an unescaped `</script` at the end of a serialized function body). The dependency is now declared as a minimum-version range, so consumers can pick up later 7.x patch releases.
