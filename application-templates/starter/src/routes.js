import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
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

const ApplicationRoutes = () => {
  const match = useRouteMatch();
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

export default ApplicationRoutes;
