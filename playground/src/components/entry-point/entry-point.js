import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import {
  ApplicationShell,
  setupGlobalErrorListener,
  RouteCatchAll,
} from '@commercetools-frontend/application-shell';
import { Sdk } from '@commercetools-frontend/sdk';
import * as globalActions from '@commercetools-frontend/actions-global';
import loadMessages from '../../messages';

// Here we split up the main (app) bundle with the actual application business logic.
// Splitting by route is usually recommended and you can potentially have a splitting
// point for each route. More info at https://reactjs.org/docs/code-splitting.html
const AsyncStateMachines = React.lazy(() =>
  import('../../routes' /* webpackChunkName: "state-machines" */)
);

export const ApplicationStateMachines = () => (
  <Switch>
    {/* For development, it's useful to redirect to the actual
      application routes when you open the browser at http://localhost:3001 */
    process.env.NODE_ENV === 'production' ? null : (
      <Redirect
        exact={true}
        from="/:projectKey"
        to="/:projectKey/state-machines"
      />
    )}
    <Route path="/:projectKey/state-machines" component={AsyncStateMachines} />
    {/* Catch-all route */}
    <RouteCatchAll />
  </Switch>
);
ApplicationStateMachines.displayName = 'ApplicationStateMachines';

// Ensure to setup the global error listener before any React component renders
// in order to catch possible errors on rendering/mounting.
setupGlobalErrorListener();

class EntryPoint extends React.Component {
  static displayName = 'EntryPoint';
  render() {
    return (
      <ApplicationShell
        environment={window.app}
        onRegisterErrorListeners={({ dispatch }) => {
          Sdk.Get.errorHandler = error =>
            globalActions.handleActionError(error, 'sdk')(dispatch);
        }}
        applicationMessages={loadMessages}
        DEV_ONLY__loadNavbarMenuConfig={() =>
          import('../../../menu.json').then(data => data.default || data)
        }
        render={() => <ApplicationStateMachines />}
      />
    );
  }
}

export default EntryPoint;
