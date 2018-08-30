# Connectors for project extension `categoryRecommendationSettings`

This component exposes getters/setters to set and retrieve the `categoryRecommendationSettings` from the project extension setting.

> It uses the new React Context API, so you need to provide the `ProjectExtensionProviderForCategoryRecommendationSettings` at a point in the tree where you need the setting from there below.

Additionally it provides a HOC to inject the `categoryRecommendationSettings`.

### Usage

The provider implicitly triggers a query to fetch the project extension setting.
The consumer will receive an object with a `loading` prop and the `categoryRecommendationSettings` value.

```js
<ProjectExtensionProviderForCategoryRecommendationSettings>
  <div>
    {/* ... */}
    {/* Somewhere down the tree */}
    <GetProjectExtensionCateProjectExtensionProviderForCategoryRecommendationSettings
      render={({ loading, categoryRecommendationSettings }) => {
        if (loading) return <LoadingSpinner />;
        return (
          <div>{`Category recommendation setting: ${JSON.stringify(
            categoryRecommendationSettings
          )}`}</div>
        );
      }}
    />
  </div>
</ProjectExtensionProviderForCategoryRecommendationSettings>
```
