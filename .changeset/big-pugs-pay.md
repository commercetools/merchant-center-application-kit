---
'@commercetools-frontend/application-shell': patch
---

In `test-utils` of the ApplicationShell, passing a custom instance of `apolloClient` now correctly passes the `cache` to the Apollo `MockedProvider`. See https://www.apollographql.com/docs/react/development-testing/testing/#a-note-on-fragment-usage-typepolicies-and-possibletypes.
