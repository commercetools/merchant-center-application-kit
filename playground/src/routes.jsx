import { useCallback } from 'react';
import { Switch } from 'react-router-dom';
import {
  CompatRoute as Route,
  useMatch,
  useNavigate,
} from 'react-router-dom-v5-compat';
import { CustomPanelDemo } from './components/custom-views';
import EchoServer from './components/echo-server';
import FormattersDemo from './components/formatters-demo';
import NotificationsPlayground from './components/notifications-playground';
import StateMachinesDetails from './components/state-machines-details';
import StateMachinesList from './components/state-machines-list';

const ApplicationRoutes = () => {
  const match = useMatch('/:projectKey/app-kit-playground/*');
  const navigate = useNavigate();
  const basePath = match.pathnameBase;

  const goToStateMachinesList = useCallback(() => {
    navigate(basePath);
  }, [navigate, basePath]);
  const goToStateMachineDetail = useCallback(
    (id) => {
      navigate(`${basePath}/${id}`);
    },
    [navigate, basePath]
  );

  return (
    <Switch>
      <Route path={`${basePath}/echo-server`}>
        <EchoServer />
      </Route>
      <Route path={`${basePath}/notifications`}>
        <NotificationsPlayground />
      </Route>
      <Route path={`${basePath}/formatters`}>
        <FormattersDemo />
      </Route>
      <Route path={`${basePath}/custom-panel`}>
        <CustomPanelDemo />
      </Route>
      <Route path={`${basePath}`}>
        <StateMachinesList goToStateMachineDetail={goToStateMachineDetail}>
          <Switch>
            <Route path={`/:id`}>
              <StateMachinesDetails
                goToStateMachinesList={goToStateMachinesList}
              />
            </Route>
          </Switch>
        </StateMachinesList>
      </Route>
    </Switch>
  );
};
ApplicationRoutes.displayName = 'ApplicationRoutes';

export default ApplicationRoutes;
