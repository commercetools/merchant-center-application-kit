# `WithProject`

This is a data fetching component to fetch a project.
You can use this component (or the complementary HoC) to retrieve project data and use it when needed.

The data is cached within Apollo, so rendering the component multiple times won't trigger multiple requests but will load the data from the cache instead.

## `<WithProject>`

A React component that will pass project data to a `render` function.

> This is the React version of the `withProject` HoC.

### Usage

```js
import { WithProject } from '@commercetools-local/application-shell'

<WithProject
  projectKey="my-project"
  mapDataToProps={userData => userData}
  render={({ projectData: { loading, project }, ...rest }) =>
    loading
      ? <Loading />
      : (
        <div>
          <h1>{project.name}</h1>
          <Main {...rest} />
        </div>
      )
  }
/>
```

### Properties

| Props | Type | Required | Values | Default  | Description |
| --- | --- | :---: | --- | --- | --- |
| `projectKey` | `string` | ✅ | - | - | The `key` of the project that you want to fetch |
| `mapDataToProps` | `func` | - | - | - | Map the props that will be passed to the `render` function. Use this as a chance to compute some values within the data and pass it s a specific prop. |
| `render` | `func` | ✅ | - | - | Render your children elements within this function. The argument is an object containing the mapped data from `mapDataToProps` or the default bject injected by `graphql` HoC |

## `withProject(getProjectKey, mapDataToProps)`

A HoC component that will inject project data as prop.

> This is the HoC version of the `WithProject` component.

### Usage

```js
import { withProject } from '@commercetools-local/application-shell'

const ProjectTitle = props => (
  <div>{props.projectName}</div>
)
withProject(
  ownProps => ownProps.match.params.projectKey,
  projectData => ({ projectName: projectData.project && projectData.project.name })
)(ProjectTitle)
```

### Arguments

* `getProjectKey(ownProps): String`: a function that receives props coming from the parent component and returns the project key
* `mapDataToProps(projectData): Object`: map the props that will be injected to the composed component. Use this as a chance to compute some values within the data and pass it as a specific prop.
