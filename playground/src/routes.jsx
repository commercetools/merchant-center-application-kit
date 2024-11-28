import { useCallback } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { CustomPanelDemo } from './components/custom-views';
import EchoServer from './components/echo-server';
import FormattersDemo from './components/formatters-demo';
import NotificationsPlayground from './components/notifications-playground';
import StateMachinesDetails from './components/state-machines-details';
import StateMachinesList from './components/state-machines-list';

const ApplicationRoutes = () => {
  const navigate = useNavigate();

  const goToStateMachinesList = useCallback(() => {
    navigate('/state-machines');
  }, [navigate]);
  const goToStateMachineDetail = useCallback(
    (id) => {
      navigate(`/state-machines/${id}`);
    },
    [navigate]
  );
  return (
    <Routes>
      <Route path={`/echo-server`} element={<EchoServer />} />
      <Route path={`/notifications`} element={<NotificationsPlayground />} />
      <Route path={`/formatters`} element={<FormattersDemo />} />
      <Route path={`/custom-panel`} element={<CustomPanelDemo />} />
      <Route
        element={
          <StateMachinesList goToStateMachineDetail={goToStateMachineDetail}>
            <Route
              path={`/:id`}
              element={
                <StateMachinesDetails
                  goToStateMachinesList={goToStateMachinesList}
                />
              }
            />
          </StateMachinesList>
        }
      />
    </Routes>
  );
};
ApplicationRoutes.displayName = 'ApplicationRoutes';

export default ApplicationRoutes;
