# Connectors for `projectDataLocale`

This component exposes getters/setters to set and retrieve the `projectDataLocale`.

> It uses the new React Context API, so you need to provide the `SetProjectDataLocale` up in the tree. This is done within the AppShell, so you should only need to use the getters.

Additionally it provides a HOC to inject the `projectDataLocale`.

### Usage

```js
<SetProjectDataLocale locale="de">
  <GetProjectDataLocale
    render={locale => <div>{`Selected project data locale: ${locale}`}</div>}
  />
</SetProjectDataLocale>
```
