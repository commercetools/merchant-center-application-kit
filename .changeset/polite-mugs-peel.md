---
"@commercetools-frontend/application-shell": patch
---

You can now specify a `fallback` component on `ProtectedRoute` which defaults to `<PageUnauthorized />`.

```tsx
<ProtectedRoute condition={canManageProjectSettings} fallback={<MyOwnComponent />} />
```

**⚠️ Change in `ProtectedSuspendedRoute`'s `fallback` prop**

There is change to `ProtectedSuspendedRoute` if you used the `fallback` property as it is now renamed to `loader`. 

If you specified a custom `fallback` component on `ProtectedSuspendedRoute` then rename this property to `loader`. 

This allows the `ProtectedSuspendedRoute` to have both a `fallback` (similar to `ProtectedRoute`) and `loader` property. 
