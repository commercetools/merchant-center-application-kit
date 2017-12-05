# InjectReducer

This component is built for injecting a reducer into the redux store from
asynchronously loaded code. It takes a reducer function and adds it as a top
level reducer to the store using the `name` prop as the key.

> Using this component requires that the **redux `store`** is defined up the
> context tree (`<Provider>`).

## To be deprecated behavior

At the moment this component also handles registering your plugin and wrapping
your plugin code in a `LocalProvider` component so that your plugin store only
sees the reducer you passed to the component. As a side effect of this you
should only use this component once as the entry point to your plugin.

This behvior is convenient for now since it allows us to upgrade the Merchant
Center to `react-router` 4 without breaking the plugin system. However, since we
will deprecate the plugin system in favor of having multiple applications, we
will also remove this code again once we make that switch.

## Usage

```jsx
import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { InjectReducer } from '@commercetools-local/application-shell';
import Dashboard from './components/dashboard';
import reducer from './reducer';

const AsyncDashboard = props => (
  <StoreProvider store={store}>
    <InjectReducer name="mcng-dashboard" reducer={reducer}>
      <Dashboard {...props} />
    </InjectReducer>
  </StoreProvider>
);
AsyncDashboard.displayName = 'AsyncDashboard';

export default AsyncDashboard;
```

## Props

| Props     | Type     | Required | Values | Default | Description                                                                                                                                            |
| --------- | -------- | :------: | ------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `name`    | `string` |    ✅    | -      | -       | The key at which the reducer should added to the store in the top level. This will be your plugin's name until we migrate to multiple applications.    |
| `reducer` | `func`   |    ✅    | -      | -       | The reducer function that should be injected to the store at the top level. This will be your plugin reducer until we migrate to multiple applications |

## Disclaimer ⚠️

This component does not yet work since the corresponding reducer injection
function in the store is missing. This is how the store's `injectReducer`
function should look like to make this component work:

```js
import createPluginReducer from './utils/plugins/create-reducer';

// const store = createStore(..)

store.injectedReducers = {};
store.injectReducer = ({ name, reducer }) => {
  store.injectedReducers[name] = reducer;
  store.replaceReducer(
    createPluginReducer(store.injectedReducers, applicationReducer)
  );
};
```

## Prior art

This component is inspired by React Boilerplate. Specifically
[this HoC](https://github.com/react-boilerplate/react-boilerplate/blob/e39f8bdca29a35edbd7480968c9fe0b2c9438860/app/utils/reducerInjectors.js).
