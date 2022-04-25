---
'@commercetools-frontend/application-shell': minor
---

Add a new `<SuspendedRoute>` component.

This component is exactly like the `<Route>` component of `react-router` but it wraps the children with `React.Suspense`, allowing the children to be dynamically loaded with `React.lazy`. This can be used for code splitting components at the route level.

```jsx
import { Switch } from 'react-router-dom';
import { lazy } from 'react';

const LazyLoadedComponent = lazy(() => import('./lazy-loaded-component'));

<Switch>
  <SuspendedRoute>
    <LazyLoadedComponent />
  </SuspendedRoute>
</Switch>;
```
