# Component to fetch the logged in user

This is a data fetching component to fetch the logged in user.
You can use this component (or the complementary HoC) to retrieve user data and use it when needed.

The data is cached within Apollo, so rendering the component multiple times won't trigger multiple requests but will load the data from the cache instead.

## `<FetchUser>`

A React component that will pass user data to a `children` function.

### Usage

```js
import FetchUser from '../fetch-user';

<FetchUser>
  {({ isLoading, user }) =>
    isLoading ? (
      <Loading />
    ) : (
      <div>
        <Profile firstName={user.firstName} />
      </div>
    )
  }
</FetchUser>;
```

### Properties

| Props      | Type   | Required | Values | Default | Description                                                                                                                                                                    |
| ---------- | ------ | :------: | ------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `children` | `func` |    ✅    | -      | -       | Render your children elements within this function. The argument is an object containing the mapped data from `mapDataToProps` or the default object injected by `graphql` HoC |
