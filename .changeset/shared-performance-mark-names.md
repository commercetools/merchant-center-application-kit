---
'@commercetools-frontend/constants': minor
'@commercetools-frontend/application-shell': patch
'@commercetools-frontend/sentry': patch
---

Export `PERFORMANCE_MARKS`, `PERFORMANCE_MARK_PREFIX` and `PERFORMANCE_MEASURE_SUFFIX` from `@commercetools-frontend/constants`, so `application-shell` and `sentry` share one definition of the `mc:*` loading performance marks. The inline loading-screen script in `mc-html-template` cannot import and keeps its own copy of the skeleton mark, pinned to these constants by its spec. `application-shell` still exports `PERFORMANCE_MARKS` and `TPerformanceMark`, now re-exported from `constants`.
