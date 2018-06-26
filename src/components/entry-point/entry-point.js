import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import Loadable from 'react-loadable';
import LoadingSpinner from '@commercetools-frontend/ui-kit/loading-spinner';
import ApplicationShell, {
  reduxStore,
  setupGlobalErrorListener,
  RouteCatchAll,
} from '@commercetools-frontend/application-shell';
import { Sdk } from '@commercetools-frontend/sdk';
import * as globalActions from '@commercetools-frontend/actions-global';
import { Route, Switch } from 'react-router-dom';
import * as i18n from '@commercetools-frontend/i18n';

// Here we split up the main (app) bundle with the actual application business logic.
// Splitting by route is usually recommended and you can potentially have a splitting
// point for each route. More info at https://reactjs.org/docs/code-splitting.html
const AsyncChannels = Loadable({
  loader: () => import('../../routes' /* webpackChunkName: "channels" */),
  loading: LoadingSpinner,
});

// Ensure to setup the global error listener before any React component renders
// in order to catch possible errors on rendering/mounting.
setupGlobalErrorListener(reduxStore.dispatch);

class EntryPoint extends React.Component {
  static displayName = 'EntryPoint';
  render() {
    return (
      <StoreProvider store={reduxStore}>
        <ApplicationShell
          i18n={i18n}
          configuration={window.app}
          onRegisterErrorListeners={() => {
            Sdk.Get.errorHandler = error =>
              globalActions.handleActionError(error, 'sdk')(
                reduxStore.dispatch
              );
          }}
          render={() => (
            <Switch>
              <Route path="/:projectKey/channels" component={AsyncChannels} />
              {/* Catch-all route */}
              <RouteCatchAll />
            </Switch>
          )}
        />
      </StoreProvider>
    );
  }
}

export default EntryPoint;
