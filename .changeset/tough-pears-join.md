---
'@commercetools-frontend/application-config': patch
---

refactor(application-config): be more strict on deriving the prod env based on the MC_APP_ENV.

TL;DR: in case the `MC_APP_ENV` is defined, we consider that it's a production environment unless it's one of `development` or `test`. This allows to use for example the `staging` value, which from the application perspective is still considered a production environment.
