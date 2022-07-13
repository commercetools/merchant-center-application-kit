import {
  GetProjectExtensionImageRegex,
  ProjectExtensionProviderForImageRegex,
} from '@commercetools-frontend/application-shell-connectors';

function MyComponent() {
  return (
    <GetProjectExtensionImageRegex
      render={({ isLoading, imageRegex }) => {
        if (isLoading) return <LoadingSpinner />;

        return (
          <div>
            <h1>Project images regex: {imageRegex}</h1>
          </div>
        );
      }}
    />
  );
}

function MyApp() {
  return (
    <ProjectExtensionProviderForImageRegex>
      <MyComponent />
    </ProjectExtensionProviderForImageRegex>
  );
}
