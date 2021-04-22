---
'@commercetools-frontend/application-shell': minor
---

The `@commercetools-frontend/application-shell/test-utils` now exports a new utility function for testing hooks: `renderHook`. This function wraps the original `renderHook` function from `@testing-library/react-hooks` but it comes pre-configured with providers for testing Custom Applications.

The new `renderHook` function also accepts the same options as other test utils, such as `renderApp`, and returns some useful properties like `store`, `history`, etc.

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
