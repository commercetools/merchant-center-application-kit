---
'@commercetools-frontend/application-shell': minor
---

Re-export `@testing-library/react-hooks` from `test-utils` with `renderHook` functions wrapped in all the app-kit providers.

`renderHooks` is wrapped the same way the existing `renderAppWithRedux` helper is:

- all the `options` which can be passed to `renderAppWithRedux`can be passed to `renderHooks` as well
- all the additional poperties returned as a result of `renderAppWithRedux` invokation (like `store` or `history`) is returend from the wrapped `renderHooks` too.

All the `@testing-library/react-hooks` content is exported under the namespace `hooks` from the package '@commercetools-frontend/application-shell/test-utils'.

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
