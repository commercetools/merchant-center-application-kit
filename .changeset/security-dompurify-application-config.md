---
'@commercetools-frontend/application-config': patch
---

Raise the minimum version of dependency `dompurify` from `^3.0.0` to `^3.4.17`, so that installs no longer resolve a version affected by the DOMPurify security advisories fixed up to 3.4.17. The newest of them ([GHSA-55q2-fjhq-7xh7](https://github.com/advisories/GHSA-55q2-fjhq-7xh7), [GHSA-6688-9rhm-gjv2](https://github.com/advisories/GHSA-6688-9rhm-gjv2), [GHSA-mrv2-3pqr-j5jr](https://github.com/advisories/GHSA-mrv2-3pqr-j5jr), [GHSA-c6gr-qvv4-5v3f](https://github.com/advisories/GHSA-c6gr-qvv4-5v3f)) concern the `IN_PLACE` mode, hooks, and the `application/xhtml+xml` parser type, which the SVG sanitizer of `application-config` does not use.
