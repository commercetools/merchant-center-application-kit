# Connectors for `applicationState`

This component exposes getters/setters to set and retrieve the `applicationState`.

> It uses the new React Context API, so it needs the `ApplicationStateProvider` up in the tree. This is done within the AppShell.

Additionally it provides a HOC to inject the `applicationState`.

Use this component to access information about the `user`, `project` and application `environment`.

#### `user` fields

- `id`
- `email`
- `firstName`
- `lastName`
- `locale`
- `timeZone`

#### `project` fields

- `key`
- `version`
- `name`
- `countries`
- `currencies`
- `languages`
- `permissions`: an object containing boolean flags about the permissions of the logged in user for the selected project (e.g. `{ canViewProducts: true, canManageOrders: false, ... }`)
- `dataLocale`: the selected project **locale** (from the locale switcher in the AppBar) used to render a localized field of the project data. The available values are based on the `project.languages`

#### `environment` fields

This object contains application specific environment information defined in the `env.json`. The object will then be available on runtime from `window.app`. However, to avoid accessing those values globally, we inject this object into the application context.

The following are common fields defined in `env.json`. However, each application can provide more specific fields that cannot be documented.

- `frontendHost`: the host where the Merchant Center application is running (e.g. `mc.commercetools.com`)
- `mcApiUrl`: the API URL of the Merchant Center (`https://mc-api.commercetools.com` for projects in `EU` and `https://mc-api.commercetools.co` for projects in `US`)
- `location`: the location where the Merchant Center is running, usually `eu` or `us`
- `env`: the environment where the Merchant Center is running, usually `production` or `staging`
- `cdnUrl`: the URL where the static assets are stored
- `servedByProxy`: a flag to indicate if this application is running behind the Merchant Center proxy or not, usually `true` for production and `false` for local development

### Usage

```js
/* In the AppShell */
<ApplicationStateProvider {{ /* props */ }}>
  <div>
    {/* ... */}
    {/* In the application specific code */}
    <GetApplicationState
      render={({ user, project, environment }) => (
        <div>{...}</div>
      )}
    />
  </div>
</ApplicationStateProvider>
```

You can also use the HOC `withApplicationState` that will inject a `applicationState` prop.

```js
withApplicationState()(MyComponent);
```

...or pass a mapping function as the first argument to return custom shape of the injected props

```js
withApplicationState(applicationState => ({
  projectKey: applicationState.project && applicationState.project.key,
  userEmail: applicationState.user && applicationState.user.email,
}))(MyComponent);
```
