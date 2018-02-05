# sdk

Tools for declarative fetching.

## Declarative Fetching

There are two sides to declarative fetching:

* describing the data we need to fetch declaratively
* fetching by rendering a component instead of triggering the fetch imperatively

This module aims to provide the necessary parts for both.

## Declaring the fetch using a component

> **⚠️ Deprecated** This component will likely not get developed any further. Use regular redux-style action creators for now. In the future we plan to use Apollo to replace this completely.

The provided `Sdk.Get` component can be rendered to fetch data. It uses the
middleware behind the scenes but adds some features on top. See
[components/sdk-fetch/README.md](./components/sdk-fetch/README.md) for details.

## Describing data declaratively

The provided middleware takes an object which describes what data should be
fetched. The middleware transforms that description into a promise and resolves
the promise. It passes the response back to the callee.

## Usage

The middleware is a thin wrapper around [`sdk-client`](https://commercetools.github.io/nodejs/sdk/api/sdkClient.html). It offers a way to declaratively describe the data requirements.

A Redux action using one of the action creators below needs to be dispatched. It contains the description of what to get/post/delete. The `sdk` middleware then turns the declarative description into imperative API calls on `sdk-client`. The dispatched action resolves with the result of `sdk-client`.

### Action creators

The action creators can be imported as

```js
import * as sdkActions from '@commercetools-local/sdk/actions';
```

#### Methods

There are three action creators which all have the same behavior and API. The only difference is the resulting HTTP method:

* `sdkActions.get(description)`: `GET`
* `sdkActions.post(description)`: `POST`
* `sdkActions.del(description)`: `DELETE`

#### Specifying an endpoint

There are two ways to describe an endpoint:

* direct: `description.uri` is used as-is
* combined: `description.service` and `description.options` are combined to form a `uri`

A `payload` can be provided in either case. It is only used by the `sdkActions.post` action creator. It contains the request payload.

##### Usage with `uri`

```js
{
  uri: String,
  payload: Object | String
}
```

* `uri` can be relative or absolute. It gets passed to [`sdk-client`](https://commercetools.github.io/nodejs/sdk/api/sdkClient.html) as-is

This approach must be used when querying something other than the CTP API. In case the CTP API is queried it is recommended to use `service` and `options` since that is easier to test. It is totally valid to provide `uri` only as well though.

When both, `uri` and `options` (or `service`) are present, the `uri` takes precedence.

##### Usage with `service` and `options`

```js
{
  service: String,
  options: Object,
  payload: Object | String
}
```

Before using the `sdk-client` the `sdk` middleware combines `service` and `options` using `api-request-builder`'s `parse` method to form a `uri`. It then makes the exact same request as when specifying `uri` directly.

The supported `options` can be found in the `api-request-builder`'s documentation under the [Declarative Usage](https://commercetools.github.io/nodejs/sdk/api/apiRequestBuilder.html#declarative-usage) section.

### Example

```js
import * as sdkActions from '@commercetools-local/sdk/actions';

const fetchProductById = productId =>
  sdkActions.get({
    service: 'products',
    options: { id: productId },
  });
```

```js
class Foo extends React.Component {
  state = { product: null };
  componentDidMount() {
    this.props.fetchProductById(this.props.productId).then(product => {
      this.setState({ product });
    });
  }
  render() {
    if (!this.state.product) return <LoadingSpinner />;

    return <div>{JSON.stringify(this.state.product)}</div>;
  }
}

// and finally we need to pass the bound action creator to the component using plain old redux
export default connect(null, {
  fetchProductById: productsActions.fetchProductById,
});
```
