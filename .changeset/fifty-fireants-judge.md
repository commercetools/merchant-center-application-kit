---
'@commercetools-frontend/application-shell': minor
---

Add a new `<SuspendedRoute>` component.

This component should be used to render a lazy loaded component.

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
