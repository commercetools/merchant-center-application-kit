import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import {
  RestrictedByPermissions,
  permissions,
} from '@commercetools-frontend/permissions';
import MainView from './components/main-view';

const PageUnauthorized = () => <div>{'Unauthorized'}</div>;
PageUnauthorized.displayName = 'PageUnauthorized';

const ApplicationRoutes = ({ match }) => (
  <RestrictedByPermissions
    permissions={[permissions.ManageProducts, permissions.ViewProducts]}
    unauthorizedComponent={PageUnauthorized}
    shouldMatchSomePermissions={true}
  >
    <Switch>
      <Route
        path={`${match.path}/some-other-route`}
        render={() => <div>{'Nothing to see'}</div>}
      />
      <Route render={routerProps => <MainView match={routerProps.match} />} />
    </Switch>
  </RestrictedByPermissions>
);
ApplicationRoutes.displayName = 'ApplicationRoutes';
ApplicationRoutes.propTypes = {
  match: PropTypes.shape({
    path: PropTyeps.string,
    params: PropTypes.shape({
      projectKey: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ApplicationRoutes;
