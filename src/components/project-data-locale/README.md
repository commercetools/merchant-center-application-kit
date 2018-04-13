# Connectors for `projectDataLocale`

This component exposes getters/setters to set and retrieve the `projectDataLocale`.

> It uses the new React Context API, so you need to provide the `AppShellProviderForProjectDataLocale` up in the tree. This is done within the AppShell!

Additionally it provides a HOC to inject the `projectDataLocale`.

### Usage

```js
/* In the AppShell */
<AppShellProviderForProjectDataLocale locale="de">
  <div>
    {/* ... */}
    {/* In the application specific code */}
    <GetProjectDataLocale
      render={locale => <div>{`Selected project data locale: ${locale}`}</div>}
    />
  </div>
</AppShellProviderForProjectDataLocale>
```
