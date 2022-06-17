import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import {
  TabularDetailPage,
  TabHeader,
} from '@commercetools-frontend/application-components';

const DetailPage = () => {
  const match = useRouteMatch();
  const history = useHistory();

  return (
    <TabularDetailPage
      title="Detail page"
      onPreviousPathClick={() => history.push('/starting-page')}
      previousPathLabel="Go back"
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
    </TabularDetailPage>
  );
};
