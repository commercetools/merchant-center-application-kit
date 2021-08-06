import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { useIsAuthorized } from '@commercetools-frontend/permissions';
import { PageUnauthorized } from '@commercetools-frontend/application-components';
import Spacings from '@commercetools-uikit/spacings';
import Channels from './components/channels';
import Welcome from './components/welcome';
import { PERMISSIONS } from './constants/permissions';

const ApplicationRoutes = () => {
  const match = useRouteMatch();

  // We can evaluate the user permissions and use the information to restrict
  // certain parts of the application.
  // For example, we can show an unauthorized page if the user does not have
  // the permission to `view` products.
  const canViewChannels = useIsAuthorized({
    demandedPermissions: [PERMISSIONS.ViewProducts],
  });

  return (
    <Spacings.Inset scale="l">
      <Switch>
        <Route path={`${match.path}/channels`}>
          {canViewChannels ? (
            <Channels linkToWelcome={match.url} />
          ) : (
            <PageUnauthorized />
          )}
        </Route>
        <Route>
          <Welcome />
        </Route>
      </Switch>
    </Spacings.Inset>
  );
};
ApplicationRoutes.displayName = 'ApplicationRoutes';

export default ApplicationRoutes;
