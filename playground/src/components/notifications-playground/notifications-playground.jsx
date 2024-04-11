import PropTypes from 'prop-types';
import {
  Route,
  useRouteMatch,
  useHistory,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import { useShowNotification } from '@commercetools-frontend/actions-global';
import {
  InfoModalPage,
  InfoDialog,
  useModalState,
  Drawer,
  TabularModalPage,
  TabHeader,
} from '@commercetools-frontend/application-components';
import FlatButton from '@commercetools-uikit/flat-button';
import PrimaryButton from '@commercetools-uikit/primary-button';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import Spacings from '@commercetools-uikit/spacings';

const Tab1 = () => <div>Tab 1</div>;
const Tab2 = () => <div>Tab 2</div>;

const NotificationsTriggers = () => {
  const showNotification = useShowNotification();
  const match = useRouteMatch();
  const tabsModalState = useModalState();
  return (
    <Spacings.Stack scale="s">
      <Spacings.Inline>
        <SecondaryButton
          label="Global notification"
          onClick={() => {
            showNotification({
              domain: 'global',
              kind: 'info',
              text: 'hello',
            });
          }}
        />
      </Spacings.Inline>
      <Spacings.Inline>
        <SecondaryButton
          label="Page notification"
          onClick={() => {
            showNotification({
              domain: 'page',
              kind: 'error',
              text: 'oops',
            });
          }}
        />
      </Spacings.Inline>
      <Spacings.Inline>
        <SecondaryButton
          label="Side notification"
          onClick={() => {
            showNotification(
              {
                domain: 'side',
                kind: 'success',
                text: 'ok',
              },
              {
                dismissAfter: 0,
              }
            );
          }}
        />
      </Spacings.Inline>
      <PrimaryButton
        label="Open modal"
        onClick={() => tabsModalState.openModal()}
      />
      {tabsModalState.isModalOpen && (
        <Router>
          <TabularModalPage
            title="Manage your account"
            isOpen={tabsModalState.isModalOpen}
            onClose={tabsModalState.closeModal}
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
          </TabularModalPage>
        </Router>
      )}
    </Spacings.Stack>
  );
};

const NotificationsPlayground = (props) => {
  const dialogState = useModalState();
  const dialogStateInDrawer = useModalState();
  const drawerState = useModalState();
  const route = useRouteMatch();
  const history = useHistory();

  return (
    <Spacings.Inset>
      <Spacings.Stack>
        <NotificationsTriggers />
        <FlatButton
          label={`Open modal ${props.level}`}
          onClick={() => {
            history.push(`${route.url}/${props.level}`);
          }}
        />
        <FlatButton
          label={`Open dialog ${props.level}`}
          onClick={dialogState.openModal}
        />
        <FlatButton
          label={`Open drawer ${props.level}`}
          onClick={drawerState.openModal}
        />

        <Route path={`${route.path}/${props.level}`}>
          <InfoModalPage
            isOpen
            title={`Modal page ${props.level}`}
            customViewLocatorCode="products.product_details.general"
            onClose={() => {
              history.push(route.url);
            }}
          >
            <NotificationsPlayground level={props.level + 1} />
          </InfoModalPage>
        </Route>
        <InfoDialog
          isOpen={dialogState.isModalOpen}
          title={`Dialog ${props.level}`}
          onClose={dialogState.closeModal}
        >
          Hello
        </InfoDialog>

        <Drawer
          isOpen={drawerState.isModalOpen}
          title={`Drawer ${props.level}`}
          onClose={drawerState.closeModal}
        >
          <p>Drawer content here</p>
          <FlatButton
            label={`Open dialog ${props.level}`}
            onClick={dialogStateInDrawer.openModal}
          />
          <InfoDialog
            isOpen={dialogStateInDrawer.isModalOpen}
            title={`Dialog ${props.level}`}
            onClose={dialogStateInDrawer.closeModal}
          >
            Hello
          </InfoDialog>
        </Drawer>
      </Spacings.Stack>
    </Spacings.Inset>
  );
};
NotificationsPlayground.propTypes = {
  level: PropTypes.number.isRequired,
};
NotificationsPlayground.defaultProps = {
  level: 1,
};

export default NotificationsPlayground;
