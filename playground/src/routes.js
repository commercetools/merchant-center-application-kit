import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, compose, combineReducers } from 'redux';
import { applyDefaultMiddlewares } from '@commercetools-frontend/application-shell';
import {
  RestrictedByPermissions,
  permissions,
} from '@commercetools-frontend/permissions';
import StateMachinesList from './components/state-machines-list';
import { ApplicationStoreContext } from './store';

// FIXME: import it from AppShell
const PageUnauthorized = () => <div>{'Unauthorized'}</div>;
PageUnauthorized.displayName = 'PageUnauthorized';

const reducer = combineReducers({
  foo: state => state || null,
});
const store = createStore(
  reducer,
  undefined,
  compose(applyDefaultMiddlewares())
);

const ApplicationRoutes = () => (
  <Provider store={store} context={ApplicationStoreContext}>
    <Switch>
      <Route
        render={routerProps => (
          <RestrictedByPermissions
            permissions={[permissions.ViewStates, permissions.ManageStates]}
            unauthorizedComponent={PageUnauthorized}
            shouldMatchSomePermissions={true}
          >
            <StateMachinesList
              projectKey={routerProps.match.params.projectKey}
            />
          </RestrictedByPermissions>
        )}
      />
    </Switch>
  </Provider>
);
ApplicationRoutes.displayName = 'ApplicationRoutes';
ApplicationRoutes.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      projectKey: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ApplicationRoutes;
