---
'@commercetools-frontend/application-shell': minor
---

New React hook `useRoutesCreator`.

Managing routes within an application can be tricky and error prone, for example when navigating back and forth within nested routes.

To make it easier to manage and consume routes throughout the application, we implemented an abstraction on top of the routing functionality.

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

If a route has parameters you should pass the parameter value when calling the `getUrl` or `go` methods. This is only needed in case the route your navigating to is different from the current route or doesn't already include the parameter.

Given the following routes configuration:

```ts
const routes = {
  main: createRoute(`/:projectKey/${entryPointUriPath}`),
  heros: createRoute(`/:projectKey/${entryPointUriPath}/heros`),
  heroDetail: createRoute<'id'>(`/:projectKey/${entryPointUriPath}/heros/:id`),
  heroDetailSecondTab: createRoute<'id'>(
    `/:projectKey/${entryPointUriPath}/heros/:id/second-tab`
  ),
};
```

The following scenarios would apply:

```ts
// Current location: /my-project/avengers
routes.main.getUrl(); // => /my-project/avengers
routes.heros.getUrl(); // => /my-project/avengers/heros
routes.heroDetails.getUrl({ id: '123' }); // => /my-project/avengers/heros/123

// Current location: /my-project/avengers/heros/123
routes.main.getUrl(); // => /my-project/avengers
routes.heros.getUrl(); // => /my-project/avengers/heros
routes.heroDetails.getUrl(); // => /my-project/avengers/heros/123
routes.heroDetailsSecondTab.getUrl(); // => /my-project/avengers/heros/123/second-tab
routes.heroDetails.getUrl({ id: '456' }); // => /my-project/avengers/heros/456
```

In the first scenario the current location is at `/my-project/avengers`. Navigating to the details page requires to specify the `id` parameter value.
In the second scenario the current location is at `/my-project/avengers/heros/123`. Notice that the URL already contains the `id` parameter value. Navigating to the second tab of the details routes does not require the `id` to be specified anymore. However, it is required when navigating to a different route with a different `id`.

Furthermore, notice that we never had to specify the `:projectKey` parameter value. For Custom Applications this value is always implied when computing the route values as long as the navigation occurs within the same project.
