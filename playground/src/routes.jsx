import { useCallback } from 'react';
import {
  Route,
  Routes,
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
    <Routes>
      <Route path={`${basePath}/echo-server`} element={<EchoServer />} />
      <Route
        path={`${basePath}/notifications/*`}
        element={<NotificationsPlayground />}
      />
      <Route path={`${basePath}/formatters`} element={<FormattersDemo />} />
      <Route path={`${basePath}/custom-panel`} element={<CustomPanelDemo />} />
      <Route
        path={`${basePath}`}
        element={
          <StateMachinesList goToStateMachineDetail={goToStateMachineDetail} />
        }
      >
        <Route
          path={`:id`}
          element={
            <StateMachinesDetails
              goToStateMachinesList={goToStateMachinesList}
            />
          }
        />
      </Route>
    </Routes>
  );
};
ApplicationRoutes.displayName = 'ApplicationRoutes';

export default ApplicationRoutes;
