import { Switch, Route, useRouteMatch } from 'react-router-dom';
import {
  TabularMainPage,
  TabHeader,
} from '@commercetools-frontend/application-components';

const MainPage = () => {
  const match = useRouteMatch();

  return (
    <TabularMainPage
      title="Main page"
      tabControls={
        <>
          <TabHeader to={`${match.url}/tab-one`} label="Tab One" />
          <TabHeader to={`${match.url}/tab-two`} label="Tab Two" />
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
    </TabularMainPage>
  );
};
