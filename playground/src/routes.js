import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { RestrictedByPermissions } from '@commercetools-frontend/permissions';
import ChannelsList from './components/channels-list';

// FIXME: import it from AppShell
const PageUnauthorized = () => <div>{'Unauthorized'}</div>;
PageUnauthorized.displayName = 'PageUnauthorized';

const ApplicationChannelRoutes = () => (
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
