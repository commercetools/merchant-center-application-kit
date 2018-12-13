import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, compose, combineReducers } from 'redux';
import { applyDefaultMiddlewares } from '@commercetools-frontend/application-shell';
import { RestrictedByPermissions } from '@commercetools-frontend/permissions';
import ChannelsList from './components/channels-list';
import { ApplicationStoreContext } from './store';

// FIXME: import it from AppShell
const PageUnauthorized = () => <div>{'Unauthorized'}</div>;
PageUnauthorized.displayName = 'PageUnauthorized';

const reducer = combineReducers({
  foo: state => state,
});
const store = () =>
  createStore(reducer, null, compose(applyDefaultMiddlewares()));

const ApplicationChannelRoutes = () => (
  <Provider store={store} context={ApplicationStoreContext}>
    <Switch>
      <Route
        render={routerProps => (
          <RestrictedByPermissions
            permissions={[
              { mode: 'manage', resource: 'products' },
              { mode: 'view', resource: 'products' },
            ]}
            unauthorizedComponent={PageUnauthorized}
            shouldMatchSomePermissions={true}
          >
            <ChannelsList projectKey={routerProps.match.params.projectKey} />
          </RestrictedByPermissions>
        )}
      />
    </Switch>
  </Provider>
);
ApplicationChannelRoutes.displayName = 'ApplicationChannelRoutes';
ApplicationChannelRoutes.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      projectKey: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ApplicationChannelRoutes;
