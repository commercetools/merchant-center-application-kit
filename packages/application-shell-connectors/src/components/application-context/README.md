# Connectors for `applicationContext`

This component exposes getters/setters to set and retrieve the `applicationContext`.

> It uses the new React Context API, so it needs the `ApplicationContextProvider` up in the tree. This is done within the AppShell.

Additionally it provides a HOC to inject the `applicationContext`.

Use this component to access information about `user`, `project` and `environment`.

#### `user`

- `id`
- `email`
- `firstName`
- `lastName`
- `locale`
- `timeZone`

#### `project`

- `key`
- `version`
- `name`
- `countries`
- `currencies`
- `languages`

#### `permissions`

An object containing boolean flags about the permissions of the logged in user for the selected project (e.g. `{ canViewProducts: true, canManageOrders: false, ... }`)

#### `visibilityOverwrites`

An object containing boolean flags for visibility overwrites of the logged in user for the selected project (e.g. `{ hideDashboard: true, hideAddOrder: true, ... }`)

#### `dataLocale`

The selected project **locale** (from the locale switcher in the AppBar) used to render a localized field of the project data. The available values are based on the `project.languages`

#### `environment`

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
<ApplicationContextProvider {{ /* props */ }}>
  <div>
    {/* ... */}
    {/* In the application specific code */}
    <ApplicationContext
      render={({ user, project, environment }) => (
        <div>
          <h2>{`Hello ${user.firstName}`}</h2>
          <p>{`You are currently in project "${project.key}"`}</p>
        </div>
      )}
    />
  </div>
</ApplicationContextProvider>
```

You can also use the HOC `withApplicationContext` that will inject a `applicationContext` prop.

```js
withApplicationContext()(MyComponent);
```

...or pass a mapping function as the first argument to return custom shape of the injected props

```js
withApplicationContext(applicationContext => ({
  projectKey: applicationContext.project && applicationContext.project.key,
  userEmail: applicationContext.user && applicationContext.user.email,
}))(MyComponent);
```
