---
'@commercetools-frontend/application-config': patch
---

Allow to extend the environment types of the `ApplicationRuntimeConfig`.
This is useful if you want to have the `additionalEnv` properties typed.

For example, given the following config:

```json
{
  "additionalEnv": {
    "trackingSentry": "https://000@sentry.io/000"
  }
}
```

You can extend the type as following:

```ts
import type { ApplicationRuntimeConfig } from '@commercetools-frontend/application-config';

type TMyApplicationRuntimeConfig = ApplicationRuntimeConfig<{
  trackingSentry: string;
}>;
```
