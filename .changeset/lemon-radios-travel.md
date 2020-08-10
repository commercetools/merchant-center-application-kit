---
'merchant-center-application-template-starter': major
'@commercetools-frontend/application-shell': major
'@commercetools-frontend/application-shell-connectors': major
'@commercetools-website/custom-applications': major
---

Migrate Apollo dependencies to `@apollo/client` package.

Apollo released a version `3.0` that includes a single package `@apollo/client`: https://www.apollographql.com/docs/react/migrating/apollo-client-3-migration/

For Custom Applications this means that the peer dependencies `apollo-client` and `react-apollo` are now replaced with the new peer dependency of `@apollo/client`.
This is all you need to do in order to migrate to the latest version, including of course [updating the Apollo imports](https://www.apollographql.com/docs/react/migrating/apollo-client-3-migration/#updating-imports).
