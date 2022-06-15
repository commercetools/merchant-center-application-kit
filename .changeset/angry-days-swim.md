---
'@commercetools-frontend/application-shell-connectors': patch
---

There is a new React hook which you can use to access the Project Images rewrite configuration [see documentation](https://docs.commercetools.com/custom-applications/api-reference/commercetools-frontend-application-shell-connectors#project-image-settings).

You would use it like this:

```js
function MyComponent() {
  const { isLoading, imageRegex } = useProjectExtensionImageRegex();

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h1>Project images regex: {imageRegex}</h1>
    </div>
  );
}

function MyApp() {
  return (
    <ProjectExtensionProviderForImageRegex>
      <MyComponent />
    </ProjectExtensionProviderForImageRegex>
  );
}
```

Both `GetProjectExtensionImageRegex` component and `withProjectExtensionImageRegex` still exists for backwards compatibility but have been marked as deprecated.
