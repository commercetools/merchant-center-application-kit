---
'@commercetools-frontend/sentry': minor
---

Attach the `mc:*` loading performance marks to sampled `pageload` transactions as Sentry
measurements, via a `beforeSendTransaction` hook. Measurement keys are the mark names with colons
replaced by dots (`mc.intl-ready`), since Sentry does not allow colons in measurement names; the
raw mark names and durations are also mirrored onto the trace data. Navigation transactions are
left untouched, and the sample rate is unchanged at 5%.
