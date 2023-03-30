---
'@commercetools-frontend/application-shell': minor
---

New React hook `useRoutesCreator`.

Managing routes within an application can be tricky and error prone, for example when navigating back and forth within nested routes.

To make is easier to manage and consume routes throughout the application, we implemented an abstraction on top of the routing functionality.

The hook `useRoutesCreator` can be used to configure routes for your application. We recommend defining the routes in a hook `useRoutes` as following:

```ts
import { useRoutesCreator } from '@commercetools-frontend/application-shell';

const useRoutes = () => {
  const { createRoute } = useRoutesCreator();

  const routes = {
    main: createRoute(`/:projectKey/${entryPointUriPath}`),
    heros: createRoute(`/:projectKey/${entryPointUriPath}/heros`),
    heroDetail: createRoute<'id'>(
      `/:projectKey/${entryPointUriPath}/heros/:id`
    ),
  };

  return routes;
};
```

Some important things to notice here:

- The function `createRoute` creates a route object based on the given route path.
- Computed routes provide the following utility methods:
  - `path`: the given route path (with the param placeholders). You should use this when defining `<Route>` components.
  - `getUrl`: returns the computed URL based on the route parameters. You should use this for links or when you need the real location path.
  - `go`: navigates to the given path.

If a route has parameters you should pass the parameter value when calling the `getUrl` or `go` methods.

```ts
routes.heroDetail.go({ id: '123' });
```

In a Custom Application the `projectKey` value is always implied and does not need to be provided when calling `getUrl` or `go`. However, it must be specified when configuring the route path.

Examples:

```ts
// Current location: /my-project/avengers
routes.main.getUrl(); // => /my-project/avengers
routes.heros.getUrl(); // => /my-project/avengers/heros
routes.heroDetails.getUrl({ id: '123' }); // => /my-project/avengers/heros/123

// Current location: /my-project/avengers/heros/123
routes.main.getUrl(); // => /my-project/avengers
routes.heros.getUrl(); // => /my-project/avengers/heros
routes.heroDetails.getUrl(); // => /my-project/avengers/heros/123
```
