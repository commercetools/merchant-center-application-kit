import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { InjectReducers } from '@commercetools-frontend/application-shell';
import {
  RestrictedByPermissions,
  permissions,
} from '@commercetools-frontend/permissions';
import StateMachinesList from './components/state-machines-list';
import reducers from './reducers';

// FIXME: import it from AppShell
const PageUnauthorized = () => <div>{'Unauthorized'}</div>;
PageUnauthorized.displayName = 'PageUnauthorized';

const ApplicationRoutes = () => (
  <InjectReducers id="state-machines" reducers={reducers}>
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
  </InjectReducers>
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
