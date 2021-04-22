---
'@commercetools-frontend/application-shell': minor
---

Adds re-export of `@testing-library/react-hooks` from `test-utils` with `renderHook` functions wrapped with app-kit providers.

The `renderHook` function is wrapped similarily to the existing `renderAppWithRedux`:

- All `options` which can be passed to `renderAppWithRedux` can be passed to `renderHooks`
- All additional poperties returned as a result of an `renderAppWithRedux` call (like `store` or `history`) are returend from the wrapped `renderHook` too

All `@testing-library/react-hooks` functionality is exported under the namespace `hooks` from the package '@commercetools-frontend/application-shell/test-utils'.

**Usage example**

```jsx
import { hooks } from '@commercetools-frontend/application-shell/test-utils';

const { act, renderHook } = hooks;

it('should navigate to a route', () => {
  const { result, history } = renderHook(useRoutes);
  act(() => result.current.someRoute.go());
  expect(history.location.pathname).toBe('/some-route');
});
```
