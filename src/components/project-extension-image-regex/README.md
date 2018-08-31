# Connectors for project extension `imageRegex`

This component exposes getters/setters to set and retrieve the `imageRegex` from the project extension setting.

> It uses the new React Context API, so you need to provide the `ProjectExtensionProviderForImageRegex` at a point in the tree where you need the setting from there below.

Additionally it provides a HOC to inject the `imageRegexData`.

### Usage

The provider implicitly triggers a query to fetch the project extension setting.
The consumer will receive an object with a `loading` prop and the `imageRegex` value.

```js
<ProjectExtensionProviderForImageRegex>
  <div>
    {/* ... */}
    {/* Somewhere down the tree */}
    <GetProjectExtensionImageRegex
      render={({ loading, imageRegex }) => {
        if (loading) return <LoadingSpinner />;
        return (
          <div>{`Image regex setting: ${JSON.stringify(
            imageRegex.small
          )}`}</div>
        );
      }}
    />
  </div>
</ProjectExtensionProviderForImageRegex>
```
