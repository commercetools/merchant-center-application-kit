# @commercetools-frontend/sdk

<p align="center">
  <a href="https://www.npmjs.com/package/@commercetools-frontend/sdk"><img src="https://badgen.net/npm/v/@commercetools-frontend/sdk" alt="Latest release (latest dist-tag)" /></a> <a href="https://www.npmjs.com/package/@commercetools-frontend/sdk"><img src="https://badgen.net/npm/v/@commercetools-frontend/sdk/next" alt="Latest release (next dist-tag)" /></a> <a href="https://bundlephobia.com/result?p=@commercetools-frontend/sdk"><img src="https://badgen.net/bundlephobia/minzip/@commercetools-frontend/sdk" alt="Minified + GZipped size" /></a> <a href="https://github.com/commercetools/merchant-center-application-kit/blob/main/LICENSE"><img src="https://badgen.net/github/license/commercetools/merchant-center-application-kit" alt="GitHub license" /></a>
</p>

Tools for declarative fetching.

# Install

```bash
$ npm install --save @commercetools-frontend/sdk
```

# Declarative Fetching

There are two sides to declarative fetching:

- describing the data we need to fetch declaratively
- fetching by rendering a component instead of triggering the fetch imperatively

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

# Usage

The middleware is a thin wrapper around [`sdk-client`](https://commercetools.github.io/nodejs/sdk/api/sdkClient.html). It offers a way to declaratively describe the data requirements.

A Redux action using one of the action creators below needs to be dispatched. It contains the description of what to get/post/delete. The `sdk` middleware then turns the declarative description into imperative API calls on `sdk-client`. The dispatched action resolves with the result of `sdk-client`.

## Action creators

The action creators can be imported as

```js
import { actions as sdkActions } from '@commercetools-frontend/sdk';
```

### Methods

The supported action creators are:

- `sdkActions.get(config)`: sends a HTTP `GET`
- `sdkActions.post(config)`: sends a HTTP `POST`
- `sdkActions.del(config)`: sends a HTTP `DELETE`
- `sdkActions.head(config)`: sends a HTTP `HEAD`

### Specifying an endpoint

There are two ways to describe an endpoint:

- by `uri`: pass the URI as string
- by `service`: uses the `@commercetools/api-request-builder` to build the URI. You can pass `config.options` to supply the necessary request parameters

The `post` action creator additionally requires a `config.payload` object or string, containing the request payload.

> The `mcApiProxyTarget` values are exposed from the `@commercetools-frontend/constants` package, as `MC_API_PROXY_TARGETS`. The value will be used to build a prefix to the `uri` as `/proxy/<mcApiProxyTarget>/<uri>`.

**Usage with `uri`**

```js
{
  uri: String,
  mcApiProxyTarget?: ApiProxyTarget,
  payload?: Object | String
}
```

- `uri` can be relative or absolute. It gets passed to [`sdk-client`](https://commercetools.github.io/nodejs/sdk/api/sdkClient.html) as-is

This approach must be used when querying something other than the CTP API. In case the CTP API is queried it is recommended to use `service` and `options` since that is easier to test. It is totally valid to provide `uri` only as well though.

When both, `uri` and `options` (or `service`) are present, the `uri` takes precedence.

**Usage with `service` and `options`**

```js
{
  service: String,
  options: Object,
  mcApiProxyTarget?: ApiProxyTarget,
  payload?: Object | String
}
```

Before using the `sdk-client` the `sdk` middleware combines `service` and `options` using `api-request-builder`'s `parse` method to form a `uri`. It then makes the exact same request as when specifying `uri` directly.

The supported `options` can be found in the `api-request-builder`'s documentation under the [Declarative Usage](https://commercetools.github.io/nodejs/sdk/api/apiRequestBuilder.html#declarative-usage) section.

## Action creators for external API usage

By default, all requests with the SDK are configured to be sent to the MC API.
However, Custom Applications using the [Proxy to external API](https://docs.commercetools.com/merchant-center-customizations/concepts/integrate-with-your-own-api) need to configure the request a bit differently, and send additional headers.

To make it easier to make requests to the proxy endpoint using the SDK, there is a new action creator wrapper that comes with built-in configuration options.

The exported action creators have a new export `forwardTo`, which is an object containing wrappers around the normal action creators.

```js
actions.forwardTo.get(options);
actions.forwardTo.del(options);
actions.forwardTo.head(options);
actions.forwardTo.post(options);
```

The options for the action creators are the same as the **Usage with `uri`**, except that the `uri` value needs to be the URL to the external API (see `X-Forward-To` header).

The `forwardTo` action creators additionally set the following headers:

- `Accept-version`
- `X-Forward-To`
- `X-Forward-To-Audience-Policy`

For more information, check the [Proxy to external API](https://docs.commercetools.com/merchant-center-customizations/concepts/integrate-with-your-own-api) documentation.

## Error handling

Failed requests will result in a rejected promise. The `sdk-client`'s error handling applies, so network errors and CTP API errors on the content itself result in a rejected promise.

The `sdk` package does not provide any error handling out of the box. It's the application's responsibility to handle errors (e.g. show a notification, track the error).

The Merchant Center has a `handleActionError` function which is what we currently use for error handling. It logs the error to the tracking tool (Sentry) and shows a notification to the client. This should be used whenever a more special error handling is not necessary.

## Example

```js
import { actions as sdkActions } from '@commercetools-frontend/sdk';

const fetchProductById = (productId) =>
  sdkActions.get({
    service: 'products',
    options: { id: productId },
  });
```

```js
import * as globalActions from '@commercetools-frontend/actions-global';

class ProductPage extends React.Component {
  state = { product: null };
  componentDidMount() {
    this.props.fetchProductById(this.props.productId).then(
      (product) => {
        this.setState({ product });
      },
      (error) => {
        this.props.onActionError(error, 'ProductPage/fetchProductById');
      }
    );
  }
  render() {
    if (!this.state.product) return <LoadingSpinner />;

    return <div>{JSON.stringify(this.state.product)}</div>;
  }
}

// and finally we need to pass the bound action creator to the component using plain old redux
export default connect(null, {
  fetchProductById: productsActions.fetchProductById,
  onActionError: globalActions.handleActionError,
})(ProductPage);
```
