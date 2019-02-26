# Component to fetch the project data

This is a data fetching component to fetch a project.
You can use this component (or the complementary HoC) to retrieve project data and use it when needed.

The data is cached within Apollo, so rendering the component multiple times won't trigger multiple requests but will load the data from the cache instead.

## `<FetchProject>`

A React component that will pass project data to a `children` function.

### Usage

```js
import FetchProject from '../fetch-project';

<FetchProject projectKey="my-project">
  {({ isLoading, project }) =>
    isLoading ? (
      <Loading />
    ) : (
      <div>
        <h1>{project.name}</h1>
        <Main />
      </div>
    )
  }
</FetchProject>;
```

### Properties

| Props        | Type     | Required | Values | Default | Description                                                                                                                                                                   |
| ------------ | -------- | :------: | ------ | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `projectKey` | `string` |    ✅    | -      | -       | The `key` of the project that you want to fetch                                                                                                                               |
| `children`   | `func`   |    ✅    | -      | -       | Render your children elements within this function. The argument is an object containing the mapped data from `mapDataToProps` or the default bject injected by `graphql` HoC |
