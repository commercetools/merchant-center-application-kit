---
'@commercetools-frontend/application-shell': patch
---

Expose helper functions to convert `entryPointUriPath` to resource accesses and permission keys:

- `entryPointUriPathToResourceAccesses`: returns a view/manage pair of resource access names based on the `entryPointUriPath`.
- `entryPointUriPathToPermissionKeys`: returns a view/manage pair of user permission keys based on the `entryPointUriPath`.

The helpers are exported from the main bundle `@commercetools-frontend/application-shell` (for client-side usage) and from a separate entry point bundle `@commercetools-frontend/application-shell/ssr` (for node/server-side usage).

> The helpers are only useful for the upcoming v21 release.

```js
import { entryPointUriPathToPermissionKeys } from '@commercetools-frontend/application-shell/ssr';

export const entryPointUriPath = 'avengers';
export const PERMISSIONS = entryPointUriPathToPermissionKeys(entryPointUriPath);
// PERMISSIONS === { View: 'ViewAvengers', Manage: 'ManageAvengers' }
```
