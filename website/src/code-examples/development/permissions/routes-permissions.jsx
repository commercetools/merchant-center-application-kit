import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { useIsAuthorized } from '@commercetools-frontend/permissions';
import { PageUnauthorized } from '@commercetools-frontend/application-components';
import { PERMISSIONS } from './constants';
import ChannelsCreate from './components/channels-create';
import ChannelsList from './components/channels-list';

const ApplicationRoutes = () => {
  const match = useRouteMatch();
  const canManage = useIsAuthorized({
    demandedPermissions: [PERMISSIONS.Manage],
  });

  return (
    <Switch>
      <Route path={`${match.path}/new`}>
        {canManage ? <ChannelsCreate /> : <PageUnauthorized />}
      </Route>
      <Route>
        <ChannelsList />
      </Route>
    </Switch>
  );
};

ApplicationRoutes.displayName = 'ApplicationRoutes';

export default ApplicationRoutes;
