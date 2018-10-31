# Connectors for `applicationState`

This component exposes getters/setters to set and retrieve the `applicationState`.

> It uses the new React Context API, so you need to provide the `ApplicationStateProvider` up in the tree. This is done within the AppShell!

Additionally it provides a HOC to inject the `applicationState`.

Use this component to access about the `user`, `project` and application `environment`.

### Usage

```js
/* In the AppShell */
<ApplicationStateProvider
  user={{...}}
  project={{...}}
  projectDataLocale="en"
  environment={{...}}
>
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
