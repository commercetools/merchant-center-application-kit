# @commercetools-frontend/permissions

<p align="center">
  <a href="https://www.npmjs.com/package/@commercetools-frontend/permissions"><img src="https://badgen.net/npm/v/@commercetools-frontend/permissions" alt="Latest release (latest dist-tag)" /></a> <a href="https://www.npmjs.com/package/@commercetools-frontend/permissions"><img src="https://badgen.net/npm/v/@commercetools-frontend/permissions/next" alt="Latest release (next dist-tag)" /></a> <a href="https://bundlephobia.com/result?p=@commercetools-frontend/permissions"><img src="https://badgen.net/bundlephobia/minzip/@commercetools-frontend/permissions" alt="Minified + GZipped size" /></a> <a href="https://github.com/commercetools/merchant-center-application-kit/blob/master/LICENSE"><img src="https://badgen.net/github/license/commercetools/merchant-center-application-kit" alt="GitHub license" /></a>
</p>

React components to declaratively handle MC permissions.

- `useIsAuthorized()`
- `injectAuthorized()`
- `<RestrictedByPermissions>`
- `branchOnPermissions()`

## Install

```bash
$ npm install --save @commercetools-frontend/permissions
```

## Available permissions

A `Permission` is represented as a `String` with a prefix of `View` or `Manage`, followed by one of the following resource names:

- `Products`
- `Categories`
- `Customers`
- `CustomerGroups`
- `Orders`
- `ProductDiscounts`
- `CartDiscounts`
- `DiscountCodes`
- `ProjectSettings`
- `ProductTypes`
- `DeveloperSettings`

We recommend to put the permissions used by your application into a `constants.js` file.

```js
// constants.js
export const PERMISSIONS = {
  ViewProducts: 'ViewProducts',
  ManageProducts: 'ManageProducts',
  ViewOrders: 'ViewOrders',
  ManageProductTypes: 'ManageProductTypes',
  ViewProductTypes: 'ViewProductTypes',
};
```

## Available action rights

An `ActionRight` is represented as an object with the shape `{ group: string, name: string }`. The `group` relates to the permission while the `name` is the action right itself. Currently the following action rights for the `group: 'products'` exist:

- `PublishProducts`
- `UnpublishProducts`
- `AddPrices`
- `EditPrices`
- `DeletePrices`
- `DeleteProducts`
- `AddProducts`

We recommend to put the action rights used by your application into a `constants.js` file.

```js
export const ACTION_RIGHTS = {
  PublishProducts: { group: 'products', name: 'PublishProducts' },
  UnpublishProducts: { group: 'products', name: 'UnpublishProducts' },
  AddPrices: { group: 'products', name: 'AddPrices' },
  EditPrices: { group: 'products', name: 'EditPrices' },
  DeletePrices: { group: 'products', name: 'DeletePrices' },
  DeleteProducts: { group: 'products', name: 'DeleteProducts' },
  AddProducts: { group: 'products', name: 'AddProducts' },
};
```

## Available dataFences

> This is a **beta** feature and should be used with caution. For more information, please [open an issue](https://github.com/commercetools/merchant-center-application-kit/issues/new/choose).

A `DataFence` is represented as an object with the shape `{ group: string, name: string, type: string }`, where:
- `type`: is one of `['store']`
- `name`: is the `Permission` value
- `group`: is one of the resource types (e.g. `orders`)

- `ViewOrders`
- `ManageOrders`

We recommend to put the dataFences used by your application into a `constants.js` file.

```js
export const DATA_FENCES = {
  ViewOrders: {
    type: 'store',
    group: 'orders',
    name: 'ViewOrders',
  },
  ManageOrders: {
    type: 'store',
    group: 'orders',
    name: 'ManageOrders',
  },
};
```

## `useIsAuthorized(options)`

```js
useIsAutorized(options: HookOptions): boolean
```

### Named arguments

- `demandedPermissions`: an array of `Permission`, requested for the child component to
  be allowed to render
- `demandedAtionRights`: (_optional_) an array of action rights (mentioned above)
- `demandedDataFences`: (_optional_) an array of `DataFence` (mentioned above)
- `getSelectDataFenceDataByType`: (_optional_) if `dataFences` option is specified, `getSelectDataFenceDataByType` will be called with the component's `ownProps`. The result is a mapper function which we can use to pick the necessary data to compare with depending on the `type` of the dataFence.
- `shouldMatchSomePermissions`: (_optional_) determines if _some_ or _every_ requested permission should match (default `false`)

### Example

```js
const Test = () => {
  const canAccessProducts = useIsAuthorized({
    demandedPermissions: ['ManageProducts'],
  });
  if (canAccessProducts) {
    return <span>{'Authorized'}</span>;
  }
  return <span>{'Not authorized'}</span>;
};
```

## `injectAuthorized(permissions, [options])`

Like `branchOnPermissions`, but without the `FallbackComponent`.

> This is meant to be used in cases where only the `isAuthorized` prop is needed
> to be injected.

```js
injectAuthorized(
  permissions: [Permissions.ManageOrders],
  options: ?Object
): HoC
```

### Arguments

- `permissions`: an array of `Permission`, requested for the child component to
  be allowed to render
- `options` (_optional_)
  - `shouldMatchSomePermissions`: (_optional_) determines if _some_ or _every_ requested permission should match
    (default `false`)
  - `actionRights`: (_optional_) an array of action rights (mentioned above)
  - `dataFences`: (_optional_) an array of `DataFence` (mentioned above)
  - `getSelectDataFenceDataByType`: (_optional_ unless `dataFences` is specified) the function is called with the component `props` and must return a new function that will be called on each specified `dataFence` and should return the mapped value specific to the data fence. The returned function usually contains a switch-case logic based on the data fence `type`, with the return value based on the `props`. For example, with `type: 'order'`, the return value would be something like `ownProps.order.storeRef.key`.

### Example

```js
const InputField = props => (
  <Input
    //...
    disabled={!props.isAuthorized}
  />
);

injectAuthorized([Permissions.ViewProducts, Permissions.ViewOrders])(InputField);
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
- `actionRights`: (_optional_) an array of `ActionRight`, requested by the component
- `dataFences`: (_optional_) an array of `DataFence`, requested by the component
- `selectDataFenceDataByType`: (_optional_) a mapper function which we can use to pick the necessary data to compare with depending on the `type` of the dataFence when `dataFences` option is specified
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
      permissions={['ViewProducts']}
      unauthorizedComponent={Unauthorized}
    >
      <TopFiveProducts />
    </RestrictedByPermissions>
    <RestrictedByPermissions
      permissions={['ViewProducts', 'ViewOrders']}
      shouldMatchSomePermissions={true}
    >
      {({ isAuthorized }) => <RevenueChart isDisabled={!isAuthorized} />}
    </RestrictedByPermissions>
  </div>
);
```

## `branchOnPermissions(permissions, [FallbackComponent], [options])`

A HoC that will render a fallback component if the requested permissions don't
match with the user permissions.

```js
branchOnPermissions(
  permissions: [Permission],
  unauthorizedComponent: ?UnauthorizedComponent,
  options?: {
    shouldMatchSomePermissions: boolean,
    actionRights?: [ActionRight],
    dataFences?: [DataFence],
    getSelectDataFenceDataByType?: ownProps => func
  }
): HoC
```

### Arguments

- `permissions`: an array of `Permission`, requested by the component
- `UnauthorizedComponent`: (_optional_) a reference to a React component to be
  rendered in case the permissions don't match
- `options` (_optional_)
  - `shouldMatchSomePermissions`: determines if _some_ or _every_ requested permission should match
    (default `false`)
  - `actionRights`: an array of `ActionRight` (mentioned above)
  - `dataFences`: an array of `DataFence` (mentioned above)
  - `getSelectDataFenceDataByType`: if `dataFences` option is specified, `getSelectDataFenceDataByType` will be called with the component's `ownProps`. The result is a mapper function which we can use to pick the necessary data to compare with depending on the `type` of the dataFence.

### Example

```js
// Only render a component when the user has the requested permissions
const TopFiveProducts = () =>
  // ...

  branchOnPermissions(['ViewProducts', 'ViewOrders'])(TopFiveProducts);
```

```js
// Only render a component when the user has the the requested dataFence
const LastOrder = ({ order : { store: "Germany" }}) =>
  // ...

  branchOnPermissions([], options: {
    dataFences: [
      {
        name: 'ManageOrders',
        group: 'orders',
        type: 'store'
      }
    ],
    getSelectDataFenceDataByType: ownProps => ({ type }) => {
      switch (type) {
        case 'store':
          return [ownProps.order.store];
        default:
          return null
      }
    }
  })(LastOrder);
```

```js
// Render a different component when the user doesn't have the requested permissions
const ReadOnlyInput = () => // ...
const Input = () => // ...

branchOnPermissions(['ViewProducts'], ReadOnlyInput)(Input)
```
