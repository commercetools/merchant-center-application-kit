---
'@commercetools-frontend/application-shell': minor
---

Updated `ApplicationShell` component so it can wait for resolving remote feature flags before rendering its children.

This behaviour can be controlled using the new `shouldWaitForRemoteFlags` property (`true` by default).

Even when this behaviour is enabled, the `ApplicationShell` component will use a timeout threshold so if remote feature flags can't be resolved within 500ms, it will render its children anyway (using the local default values).
