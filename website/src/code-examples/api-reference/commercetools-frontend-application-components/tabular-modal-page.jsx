import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom';
import {
  TabularModalPage,
  useModalState,
  TabHeader,
} from '@commercetools-frontend/application-components';

const AccountPage = () => {
  const match = useRouteMatch();
  const tabsModalState = useModalState();

  return (
    <Router>
      <TabularModalPage
        title="Manage your account"
        isOpen={tabsModalState.isModalOpen}
        onClose={tabsModalState.closeModal}
        tabControls={
          <>
            <TabHeader to="/tab-one" label="Tab One" />
            <TabHeader to="/tab-two" label="Tab Two" />
          </>
        }
      >
        <Switch>
          <Route path={`${match.path}/tab-one`}>
            <Tab1 />
          </Route>
          <Route path={`${match.path}/tab-two`}>
            <Tab2 />
          </Route>
        </Switch>
      </TabularModalPage>
    </Router>
  );
};
