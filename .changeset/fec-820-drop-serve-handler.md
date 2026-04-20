---
'@commercetools-frontend/mc-scripts': patch
---

Drop the `serve-handler` dependency from `mc-scripts serve` to close the CVE-2026-26996 ReDoS in `minimatch@3.x` (pulled in transitively, no upstream fix available). Replaced with `sirv`. No change to the command's observable behavior.
