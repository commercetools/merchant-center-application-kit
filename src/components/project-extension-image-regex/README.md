# Connectors for project extension `imageRegex`

This component exposes getters/setters to set and retrieve the `imageRegex` from the project extension setting.

> It uses the new React Context API, so you need to provide the `ProjectExtensionProviderForImageRegex` at a point in the tree where you need the setting from there below.

Additionally it provides a HOC to inject the `imageRegex`.

### Usage

The provider implicitly triggers a query to fetch the project extension setting.
While the data is loading, the provider will contain an empty object `{}`. Therefore, accessing the value with a consumer is _safe_.

```js
<ProjectExtensionProviderForImageRegex>
  <div>
    {/* ... */}
    {/* Somewhere down the tree */}
    <GetProjectExtensionImageRegex
      render={imageRegex =>
        imageRegex && imageRegex.small
          ? <div>{`Image regex setting: ${JSON.stringify(imageRegex.small)}`}</div>
          : <LoadingSpinner>
      }
    />
  </div>
</ProjectExtensionProviderForImageRegex>
```
