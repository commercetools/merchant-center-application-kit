---
'merchant-center-application-template-starter': patch
'@commercetools-frontend/application-shell': patch
'@commercetools-frontend/application-shell-connectors': patch
---

Avoid using `useLazyQuery` to load application menu data. This allows us to update the `@apollo/client` version to `>3.5.7`, as the issue with `useLazyQuery` and `fetchPolicy` does not seem to be fixed by Apollo any time soon.
