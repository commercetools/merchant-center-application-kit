# `@commercetools-frontend/application-shell`

This module contains the main _React component_ `<ApplicationShell>` for
building _MC applications_.

It also provides a set of complementary components to provide additional
features to the application.

> Some of those components are **temporary** to ensure backwards compatibilities
> with the current setup.

## Usage

```js
/**
 * This is the entry point of an application.
 * See `@commercetools-frontend/application-shell` for usage.
 */
import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import ApplicationShell, {
  reduxStore,
  setupGlobalErrorListener,
} from '@commercetools-frontend/application-shell';
import { Sdk } from '@commercetools-local/sdk';
import * as globalActions from '@commercetools-frontend/actions-global';
import PageNotFound from '@commercetools-local/core/components/page-not-found';
import * as i18n from '@commercetools-local/i18n';

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

# Development

This module contains the
[folder structure](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#folder-structure)
required by _CRA_, which allows to easily start a react application using `toolbox/start.js`.

This is very useful for development to work on this module in isolation.

```bash
$ cd ./packages-shared/application-shell
$ yarn start
```

> The _exported_ package however will only contain the react components.
