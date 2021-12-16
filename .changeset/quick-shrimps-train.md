---
'@commercetools-frontend/application-config': patch
---

Expose helper functions to convert `entryPointUriPath` to resource accesses and permission keys:

- `entryPointUriPathToResourceAccesses`: returns a view/manage pair of resource access names based on the `entryPointUriPath`.
- `entryPointUriPathToPermissionKeys`: returns a view/manage pair of user permission keys based on the `entryPointUriPath`.
