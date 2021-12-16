---
'@commercetools-frontend/application-shell': patch
---

Expose helper functions to convert `entryPointUriPath` to resource accesses and permission keys:

- `entryPointUriPathToResourceAccesses`: returns a view/manage pair of resource access names based on the `entryPointUriPath`.
- `entryPointUriPathToPermissionKeys`: returns a view/manage pair of user permission keys based on the `entryPointUriPath`.

Examples:

```js
import { entryPointUriPathToPermissionKeys } from '@commercetools-frontend/application-shell';

export const entryPointUriPath = 'avengers';
export const PERMISSIONS = entryPointUriPathToPermissionKeys(entryPointUriPath);
// PERMISSIONS === { View: 'ViewAvengers', Manage: 'ManageAvengers' }
```
