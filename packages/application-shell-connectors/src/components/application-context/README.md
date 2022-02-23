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
- `projects`

#### `project`

- `key`
- `version`
- `name`
- `countries`
- `currencies`
- `languages`

#### `permissions`

An object containing boolean flags about the permissions of the logged in user for the selected project (e.g. `{ canViewProducts: true, canManageOrders: false, ... }`)

#### `dataLocale`

The selected project **locale** (from the locale switcher in the AppBar) used to render a localized field of the project data. The available values are based on the `project.languages`

#### `environment`

See https://docs.commercetools.com/custom-applications/api-reference/application-config#runtime-application-environment

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
withApplicationContext((applicationContext) => ({
  projectKey: applicationContext.project && applicationContext.project.key,
  userEmail: applicationContext.user && applicationContext.user.email,
}))(MyComponent);
```
