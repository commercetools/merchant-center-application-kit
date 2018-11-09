# `@commercetools-frontend/application-shell`

This module contains the main _React component_ `<ApplicationShell>` for
building _MC applications_.

It also provides a set of complementary components to provide additional
features to the application.

## Install

```bash
$ npm install --save @commercetools-frontend/application-shell
```

## Usage

```js
/**
 * This is the entry point of an application.
 * See `@commercetools-frontend/application-shell` for usage.
 */
import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import {
  ApplicationShell,
  reduxStore,
  setupGlobalErrorListener,
} from '@commercetools-frontend/application-shell';
import { Sdk } from '@commercetools-frontend/sdk';
import * as globalActions from '@commercetools-frontend/actions-global';
import PageNotFound from '@commercetools-local/core/components/page-not-found';
import * as i18n from '@commercetools-frontend/i18n';

import trackingEventWhitelist from './tracking-whitelist';

// Ensure to setup the global error listener before any React component renders
// in order to catch possible errors on rendering/mounting.
setupGlobalErrorListener(reduxStore.dispatch);

const EntryPoint = () => (
  <StoreProvider store={reduxStore}>
    <ApplicationShell
      i18n={i18n}
      configuration={window.app}
      trackingEventWhitelist={trackingEventWhitelist}
      onRegisterErrorListeners={() => {
        Sdk.Get.errorHandler = error =>
          handleActionError(error, 'sdk')(reduxStore.dispatch);
      }}
      render={() => (
        <Switch>
          <Route path="/:projectKey/dashboard" component={AsyncDashboard} />
          <Route path="/:projectKey/products" component={AsyncProducts} />
          {/* Define a catch-all route */}
          <Route component={PageNotFound} />
        </Switch>
      )}
    />
  </StoreProvider>
);
EntryPoint.displayName = 'EntryPoint';

ReactDOM.render(<EntryPoint />, document.getElementById('root'));
```

## Props

| Props                      | Type     | Required | Default | Description                                                                                                                                   |
| -------------------------- | -------- | :------: | ------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `i18n`                     | `object` |    ✅    | -       | An object containing all the translated messages per locale (`{ "en": { "Welcome": "Welcome" }, "de": { "Welcome": "Wilkommen" }}`).          |
| `configuration`            | `object` |    ✅    | -       | The current `window.app`.                                                                                                                     |
| `render`                   | `func`   |    ✅    | -       | The function to render the application specific part. This function is executed only when the application specific part needs to be rendered. |
| `trackingEventWhitelist`   | `object` |    ✅    | -       | An object containing a map of tracking events (_this mapping is required for backwards compatibility, it might be removed in the future_)     |
| `onRegisterErrorListeners` | `func`   |    ✅    | -       | A callback function to setup global event listeners, called when the `ApplicationShell` is mounted                                            |

## Testing

This package contains test-utils which enable you to test your components as if they were rendered inside `ApplicationShell`'s `render` prop using [`react-testing-library`](https://github.com/kentcdodds/react-testing-library). It can simulate the user, project, permissions, feature flags, routing and more. Check out [test-utils/README.md](./test-utils/README.md).
