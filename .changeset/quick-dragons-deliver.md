---
'merchant-center-application-template-starter': minor
'@commercetools-frontend/application-config': minor
'@commercetools-frontend/application-shell': minor
'@commercetools-frontend/constants': minor
'playground': minor
---

Allow to pass the application routes as `children` of `<ApplicationShell>`, instead of using the `render` prop.
When doing so, the application entry point routes are automatically configured according to the `entryPointUriPath` defined in the `custom-application-config.json`.

> Note that it's still possible to use the `render` prop. However, for most of the cases it should suffice to rely on the pre-configured routes.

```diff
const AsyncApplicationRoutes = React.lazy(
  () => import('../../routes' /* webpackChunkName: "starter-routes" */)
);

-export const ApplicationStarter = () => (
-  <Switch>
-    {
-      /* For development, it's useful to redirect to the actual
-      application routes when you open the browser at http://localhost:3001 */
-      process.env.NODE_ENV === 'production' ? null : (
-        <Redirect
-          exact={true}
-          from="/:projectKey"
-          to="/:projectKey/examples-starter"
-        />
-      )
-    }
-    <Route
-      path="/:projectKey/examples-starter"
-      component={AsyncApplicationRoutes}
-    />
-    {/* Catch-all route */}
-    <RouteCatchAll />
-  </Switch>
-);
-ApplicationStarter.displayName = 'ApplicationStarter';

const EntryPoint = () => (
  <ApplicationShell
    environment={window.app}
    onRegisterErrorListeners={({ dispatch }) => {
      Sdk.Get.errorHandler = (error) =>
        globalActions.handleActionError(error, 'sdk')(dispatch);
    }}
    applicationMessages={loadMessages}
    DEV_ONLY__loadNavbarMenuConfig={() =>
      import('../../../menu.json').then((data) => data.default || data)
    }
    featureFlags={FEATURE_FLAGS}
-    render={() => <ApplicationStarter />}
-  />
+  >
+    <AsyncApplicationRoutes />
+  </ApplicationShell>
);
```
