---
'@commercetools-frontend/application-shell-connectors': patch
---

Remove the operation name query parameter we had introduced in the `/graphql` endpoint as it was forcing consumers to update part of their codebases.

As an alternative we recommend using any browser extension that provides customized information for GraphQL requests ([here](https://chromewebstore.google.com/detail/graphql-network-inspector/ndlbedplllcgconngcnfmkadhokfaaln)'s an example for Chromium based browsers).
