# @commercetools-frontend/permissions

<p align="center">
  <a href="https://www.npmjs.com/package/@commercetools-frontend/permissions"><img src="https://img.shields.io/npm/v/@commercetools-frontend/permissions.svg"></a>
</p>

React components to declaratively handle MC permissions.

- `branchOnPermissions()`
- `<RestrictedByPermissions>`
- `injectAuthorized()`

A requested permission has the following shape:

```js
enum Permission {
  ManageProject
  ManageCustomers
  ManageOrders
  ManageProducts
  ViewCustomers
  ViewOrders
  ViewProducts
}

// ⚠️ This is deprecated 👇
type Permission {
  mode: view|manage;
  resource: String; // one of `products`, `orders`, ...
}
```

## Install

```bash
$ npm install --save @commercetools-frontend/permissions
```

## `branchOnPermissions(permissions, [FallbackComponent], [options])`

A HoC that will render a fallback component if the requested permissions don't
match with the user permissions.

```js
branchOnPermissions(
  permissions: [Permission],
  unauthorizedComponent: ?UnauthorizedComponent,
  options: ?Object
): HoC
```

### Arguments

- `permissions`: an array of `Permission`, requested by the component
- `UnauthorizedComponent`: (_optional_) a reference to a React component to be
  rendered in case the permissions don't match
- `options` (_optional_)
  - `some`: determines if _some_ or _every_ requested permission should match
    (default `false`)

### Example

```js
// Only render a component when the user has the requested permissions
const TopFiveProducts = () =>
  // ...

  branchOnPermissions([ViewProducts, ViewOrders])(TopFiveProducts);
```

```js
// Render a different component when the user doesn't have the requested permissions
const ReadOnlyInput = () => // ...
const Input = () => // ...

branchOnPermissions([ViewProducts], ReadOnlyInput)(Input)
```

## `<RestrictedByPermissions>`

A React component that will render its children if the requested permissions
match, otherwise a fallback component.

> This is the React version of the `branchOnPermissions` HoC.

```js
<RestrictedByPermissions
  permissions={[]}
  unauthorizedComponent={Unauthorized}
  shouldMatchSomePermissions={true}
>
  <MyAuthorizedComponent />
</RestrictedByPermissions>
```

### Props

- `permissions`: an array of `Permission`, requested by the component
- `unauthorizedComponent`: (_optional_) a function return an React element to be
  rendered in case the permissions don't match
- `render`: (_optional_) a function returning an React element or a node to be
  rendered in case the permissions match
  - Note: when a function is passed it will get an invoked with an object
    containing `isAuthorized` e.g. `({ isAuthorized }) => <div />`
- `children`: (_optional_) a function returning an React element or a node to be
  rendered in case the permissions match
  - Note: when a function is passed it will get an invoked with an object
    containing `isAuthorized` e.g. `({ isAuthorized }) => <div />`
- `shouldMatchSomePermissions`: (_optional_) determines if _some_ or _every_
  requested permission should match (default `false`)

### Examples

```js
const Unauthorized = () => <p>{'No permissions to see this'}</p>;
const Dashboard = () => (
  <div>
    <RestrictedByPermissions
      permissions={[ViewProducts]}
      unauthorizedComponent={Unauthorized}
    >
      <TopFiveProducts />
    </RestrictedByPermissions>
    <RestrictedByPermissions
      permissions={[ViewProducts, ViewOrders]}
      shouldMatchSomePermissions={true}
    >
      {({ isAuthorized }) => <RevenueChart isDisabled={!isAuthorized} />}
    </RestrictedByPermissions>
  </div>
);
```

## `injectAuthorized(permissions, [options])`

Like `branchOnPermissions`, but without the `FallbackComponent`.

> This is meant to be used in cases where only the `isAuthorized` prop is needed
> to be injected.

```js
injectAuthorized(
  permissions: [Permission],
  options: ?Object
): HoC
```

### Arguments

- `permissions`: an array of `Permission`, requested for the child component to
  be allowed to render
- `options` (_optional_)
  - `some`: determines if _some_ or _every_ requested permission should match
    (default `false`)

### Example

```js
const InputField = props => (
  <Input
    //...
    disabled={!props.isAuthorized}
  />
);

injectAuthorized([ViewProducts, ViewOrders])(InputField);
```
