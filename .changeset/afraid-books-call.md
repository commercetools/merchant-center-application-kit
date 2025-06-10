---
"@commercetools-frontend/application-shell": minor
---

Adds two components in `SuspendedProtectedRoute` and `ProtectedRoute`.

These components add to the already existing `SuspendedRoute` why easing working with conditional routing such as permission based routes.

Using them you can more convienently built use cases such as:

```jsx
<SuspendedProtectedRoute
  path="/my-route/"
  condition={canViewDiscountGroups}
>
  <LazilyLoadedComponent />
</SuspendedProtectedRoute>
```

or just:

```jsx
<ProtectedRoute
  path="/my-route/"
  condition={canViewDiscountGroups}
>
  <Component />
</ProtectedRoute>
```

instead of:

```jsx
{condition && <Route
  path="/my-route/"
>
  <Suspense fallback={<LoadingSpinner />}>
    <LazilyLoadedComponent />
  </Suspense>
</Route> }
```
