import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import {
  ApplicationShell,
  reduxStore,
  setupGlobalErrorListener,
  RouteCatchAll,
} from '@commercetools-frontend/application-shell';
import { Sdk } from '@commercetools-frontend/sdk';
import * as globalActions from '@commercetools-frontend/actions-global';
import { Redirect, Route, Switch } from 'react-router-dom';

const loadApplicationMessagesForLanguage = lang =>
  new Promise((resolve, reject) =>
    import(`../../i18n/data/${lang}.json` /* webpackChunkName: "application-messages-[request]" */).then(
      response => {
        resolve(response.default);
      },
      error => {
        reject(error);
      }
    )
  );

// Here we split up the main (app) bundle with the actual application business logic.
// Splitting by route is usually recommended and you can potentially have a splitting
// point for each route. More info at https://reactjs.org/docs/code-splitting.html
const AsyncChannels = React.lazy(() =>
  import('../../routes' /* webpackChunkName: "channels" */)
);

// Ensure to setup the global error listener before any React component renders
// in order to catch possible errors on rendering/mounting.
setupGlobalErrorListener(reduxStore.dispatch);

class EntryPoint extends React.Component {
  static displayName = 'EntryPoint';
  render() {
    return (
      <StoreProvider store={reduxStore}>
        <ApplicationShell
          environment={window.app}
          onRegisterErrorListeners={() => {
            Sdk.Get.errorHandler = error =>
              globalActions.handleActionError(error, 'sdk')(
                reduxStore.dispatch
              );
          }}
          applicationMessages={loadApplicationMessagesForLanguage}
          render={() => (
            <Switch>
              {/* For development, it's useful to redirect to the actual
              application routes when you open the browser at http://localhost:3001 */
              process.env.NODE_ENV === 'production' ? null : (
                <Redirect
                  from="/:projectKey/dashboard"
                  to="/:projectKey/channels"
                />
              )}
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
