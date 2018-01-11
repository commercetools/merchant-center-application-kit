# `<RequestsInFlightLoader>`

> This is a component to ensure backwards compatibility with the current setup.

This component will _connect_ to the store and check if there are **requests in
flight**.

A **requests in flight** is created whenever an action `SHOW_LOADING` is
dispatched (e.g. on network requests using the SDK).

If there are **requests in flight**, a loading spinner will be shown in the
`<AppBar>` through a [portal](https://reactjs.org/docs/portals.html).

### Usage

> Using this component requires that the **redux `store`** is defined in the
> React context (`<Provider>`).

```js
import { createStore, combineReducers } from 'redux';
import { Provider as StoreProvider } from 'react-redux';
import {
  RequestsInFlightLoader,
  requestsInFlightReducer,
} from '@commercetools-local/application-shell';

const store = createStore(
  combineReducers({ requestsInFlight: requestsInFlightReducer })
);

<StoreProvider store={store}>
  <RequestsInFlightLoader />
</StoreProvider>;
```
