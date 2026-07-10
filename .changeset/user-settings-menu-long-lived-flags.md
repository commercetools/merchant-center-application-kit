---
'@commercetools-frontend/application-shell': patch
---

Fix user-settings menu items gated by long-lived feature flags
(`{ value: boolean, reason?: string }`) never rendering. The
`OptionalFeatureToggle` component now uses `useFlagVariation` instead of
flopflip's `ToggleFeature`, matching the pattern already used by the
navbar's `RestrictedMenuItem`.
