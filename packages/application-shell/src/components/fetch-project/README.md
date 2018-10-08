# Component to fetch the project data

This is a data fetching component to fetch a project.
You can use this component (or the complementary HoC) to retrieve project data and use it when needed.

The data is cached within Apollo, so rendering the component multiple times won't trigger multiple requests but will load the data from the cache instead.

## `<FetchProject>`

A React component that will pass project data to a `children` function.

> This is the declarative version of the `withProject` HoC.

### Usage

```js
import { FetchProject } from '@commercetools-frontend/application-shell'

<FetchProject projectKey="my-project">
  {({ isLoading, project }) =>
    isLoading
      ? <Loading />
      : (
        <div>
          <h1>{project.name}</h1>
          <Main />
        </div>
      )
  }
</FetchProject>
```

### Properties

| Props        | Type     | Required | Values | Default | Description                                                                                                                                                                   |
| ------------ | -------- | :------: | ------ | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `projectKey` | `string` |    ✅    | -      | -       | The `key` of the project that you want to fetch                                                                                                                               |
| `children`   | `func`   |    ✅    | -      | -       | Render your children elements within this function. The argument is an object containing the mapped data from `mapDataToProps` or the default bject injected by `graphql` HoC |

## `withProject(getProjectKey, mapDataToProps)`

A HoC component that will inject project data as prop.

> This is the HoC version of the `FetchProject` component.

### Usage

```js
import { withProject } from '@commercetools-frontend/application-shell';

const ProjectTitle = props => <div>{props.projectName}</div>;
withProject(
  ownProps => ownProps.match.params.projectKey,
  projectData => ({
    projectName: projectData.project && projectData.project.name,
  })
)(ProjectTitle);
```

### Arguments

- `getProjectKey(ownProps): String`: a function that receives props coming from the parent component and returns the project key
- `mapDataToProps(projectData): Object`: map the props that will be injected to the composed component. Use this as a chance to compute some values within the data and pass it as a specific prop.
