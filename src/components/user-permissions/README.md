# Connectors for user `permissions`

This component exposes getters/setters to set and retrieve the user `permissions` on the active project.

> It uses the new React Context API, so you need to provide the `AppShellProviderForUserPermissions` up in the tree. This is done within the AppShell!

Additionally it provides a HOC to inject the `userPermissions`.

> This component should most likely be used to implement other components (`@commercetools-frontend/permissions`) and it's very unlikely that you would need to use this directly.

### Usage

```js
/* In the AppShell */
<AppShellProviderForUserPermissions permissions={project.permissions}>
  <div>
    {/* ... */}
    {/* In the application specific code */}
    <GetUserPermissions
      render={userPermissions => (
        <div>{...}</div>
      )}
    />
  </div>
</AppShellProviderForUserPermissions>
```
