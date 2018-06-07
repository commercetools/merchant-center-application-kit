# Connectors for `timeZone`

This component exposes getters/setters to set and retrieve the `timeZone`.

The timeZone information will be used to format dates (date, datetime, time) in the frontend taking into account
the one that the user has selected in the its profile.

> It uses the new React Context API, so you need to provide the `AppShellProviderForUserTimeZone` up in the tree. This is done within the AppShell!

Additionally it provides a HOC to inject the `timeZone`.

### Usage

```js
/* In the AppShell */
<AppShellProviderForUserTimeZone timeZone="Europe/Madrid">
  <div>
    {/* ... */}
    {/* In the application specific code */}
    <GetUserTimeZone
      render={timeZone => (
        <div>{`Selected timeZone by the user: ${timeZone}`}</div>
      )}
    />
  </div>
</AppShellProviderForUserTimeZone>
```
