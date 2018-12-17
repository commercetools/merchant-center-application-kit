# Component to fetch the logged in user

This is a data fetching component to fetch the logged in user.
You can use this component (or the complementary HoC) to retrieve user data and use it when needed.

The data is cached within Apollo, so rendering the component multiple times won't trigger multiple requests but will load the data from the cache instead.

## `<FetchUser>`

A React component that will pass user data to a `children` function.

> This is the declarative version of the `withUser` HoC.

### Usage

```js
import { FetchUser } from '@commercetools-frontend/application-shell';

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

## `withUser(mapDataToProps)`

A HoC component that will inject user data as prop.

> This is the HoC version of the `FetchUser` component.

### Usage

```js
import { withUser } from '@commercetools-frontend/application-shell';

const Profile = props => <div>{props.firstName}</div>;
withUser(userData => ({ firstName: userData.me && userData.me.firstName }))(
  Profile
);
```

### Arguments

- `mapDataToProps(userData): Object`: map the props that will be injected to the composed component. Use this as a chance to compute some values within the data and pass it s a specific prop.
