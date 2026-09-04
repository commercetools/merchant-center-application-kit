---
'@commercetools-frontend/application-shell': minor
---

Emit canonical `mc:*` performance marks for the application loading sequence, and export
`PERFORMANCE_MARKS` along with the `TPerformanceMark` type so consumers can read the mark names
rather than hardcoding them.

Five marks are emitted: `mc:shell-chrome-mounted`, `mc:intl-ready`, `mc:content-rendered`,
`mc:hydration-user`, and `mc:hydration-project`. Each also produces a `<name>:from-nav` measure
from the navigation origin. `mc:skeleton-visible` is listed in `PERFORMANCE_MARKS` as the canonical
name but is emitted separately from `mc-html-template`, because that file is untranspiled ES5 with
no module system.

Marks are recorded only once per name, and the first write wins. This matters because the shell
subtree mounts twice on a cold load: the Suspense fallback for the lazily loaded splitter renders
the same children, so a naive mount effect would record chunk-load latency instead of when the
chrome actually appeared.
