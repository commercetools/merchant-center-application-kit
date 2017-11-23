# `WithUser`

This is a data fetching component to fetch the logged in user.
You can use this component (or the complementary HoC) to retrieve user data and use it when needed.

The data is cached within Apollo, so rendering the component multiple times won't trigger multiple requests but will load the data from the cache instead.

## `<WithUser>`

A React component that will pass user data to a `render` function.

> This is the React version of the `withUser` HoC.

### Usage

```js
import { WithUser } from '@commercetools-local/application-shell'

<WithUser
  mapDataToProps={userData => userData}
  render={({ loading, me }) => (
    <div />
  )}
/>
```

### Properties

| Props | Type | Required | Values | Default  | Description |
| --- | --- | :---: | --- | --- | --- |
| `mapDataToProps` | `func` | - | - | - | Map the props that will be passed to the `render` function. Use this as a chance to compute some values within the data and pass it as a specific prop. |
| `render` | `func` | ✅ | - | - | Render your children elements within this function. The argument is an object containing the mapped data from `mapDataToProps` or the default object injected by `graphql` HoC |

## `withUser`

A React component that will pass user data to a `render` function.

> This is the React version of the `withUser` HoC.

### Usage

```js
import { withUser } from '@commercetools-local/application-shell'

const Profile = props => (
  <div>{props.firstName}</div>
)
withUser(
  userData => ({ firstName: userData.me && userData.me.firstName })
)(Profile)
```
