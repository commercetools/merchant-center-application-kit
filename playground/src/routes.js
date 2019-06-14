import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { InjectReducers } from '@commercetools-frontend/application-shell';
import {
  RestrictedByPermissions,
  permissions,
} from '@commercetools-frontend/permissions';
import StateMachinesList from './components/state-machines-list';
import StateMachinesDetails from './components/state-machines-details';
import reducers from './reducers';

// FIXME: import it from AppShell
const PageUnauthorized = () => <div>{'Unauthorized'}</div>;
PageUnauthorized.displayName = 'PageUnauthorized';

const ApplicationRoutes = props => (
  <InjectReducers id="state-machines" reducers={reducers}>
    <Switch>
      <Route
        path={`${props.match.path}/:id`}
        render={routerProps => (
          <RestrictedByPermissions
            permissions={[permissions.ViewStates, permissions.ManageStates]}
            unauthorizedComponent={PageUnauthorized}
            shouldMatchSomePermissions={true}
          >
            <StateMachinesDetails
              id={routerProps.match.params.id}
              projectKey={routerProps.match.params.projectKey}
              backToListPath={props.match.url}
            />
          </RestrictedByPermissions>
        )}
      />
      <Route
        render={routerProps => (
          <RestrictedByPermissions
            permissions={[permissions.ViewStates, permissions.ManageStates]}
            unauthorizedComponent={PageUnauthorized}
            shouldMatchSomePermissions={true}
          >
            <StateMachinesList
              projectKey={routerProps.match.params.projectKey}
              history={routerProps.history}
              listPath={props.match.url}
            />
          </RestrictedByPermissions>
        )}
      />
    </Switch>
  </InjectReducers>
);
ApplicationRoutes.displayName = 'ApplicationRoutes';
ApplicationRoutes.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    params: PropTypes.shape({
      projectKey: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ApplicationRoutes;
