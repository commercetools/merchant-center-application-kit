import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { useIsAuthorized } from '@commercetools-frontend/permissions';
import LockedDiamondSVG from '@commercetools-frontend/assets/images/locked-diamond.svg';
import { MaintenancePageLayout } from '@commercetools-frontend/application-components';
import MainView from './components/main-view';
import { PERMISSIONS } from './constants';

const PageUnauthorized = () => (
  <MaintenancePageLayout
    imageSrc={LockedDiamondSVG}
    title="Not enough permissions to access this resource"
    paragraph1="We recommend to contact your project administrators for further questions."
  />
);

const ApplicationRoutes = ({ match }) => {
  const canViewProducts = useIsAuthorized({
    demandedPermissions: [PERMISSIONS.ViewProducts],
  });
  if (!canViewProducts) {
    return <PageUnauthorized />;
  }
  return (
    <Switch>
      <Route
        path={`${match.path}/some-other-route`}
        render={() => <div>{'Nothing to see'}</div>}
      />
      <Route render={(routerProps) => <MainView match={routerProps.match} />} />
    </Switch>
  );
};
ApplicationRoutes.displayName = 'ApplicationRoutes';
ApplicationRoutes.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape({
      projectKey: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ApplicationRoutes;
