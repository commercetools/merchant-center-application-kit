import { useCallback } from 'react';
import { Route, Switch, useRouteMatch, useHistory } from 'react-router-dom';
import StateMachinesList from './components/state-machines-list';
import StateMachinesDetails from './components/state-machines-details';
import NotificationsPlayground from './components/notifications-playground';
import EchoServer from './components/echo-server';
import FormattersDemo from './components/formatters-demo';

const ApplicationRoutes = () => {
  const match = useRouteMatch();
  const history = useHistory();

  const goToStateMachinesList = useCallback(() => {
    history.push(match.url);
  }, [history, match.url]);
  const goToStateMachineDetail = useCallback(
    (id) => {
      history.push(`${match.url}/${id}`);
    },
    [history, match.url]
  );
  return (
    <Switch>
      <Route path={`${match.path}/echo-server`}>
        <EchoServer />
      </Route>
      <Route path={`${match.path}/notifications`}>
        <NotificationsPlayground />
      </Route>
      <Route path={`${match.path}/formatters`}>
        <FormattersDemo />
      </Route>
      <Route>
        <StateMachinesList goToStateMachineDetail={goToStateMachineDetail}>
          <Route path={`${match.path}/:id`}>
            <StateMachinesDetails
              goToStateMachinesList={goToStateMachinesList}
            />
          </Route>
        </StateMachinesList>
      </Route>
    </Switch>
  );
};
ApplicationRoutes.displayName = 'ApplicationRoutes';

export default ApplicationRoutes;
