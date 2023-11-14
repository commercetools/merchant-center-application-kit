import PropTypes from 'prop-types';
import { Route, useRouteMatch, useHistory } from 'react-router-dom';
import { useShowNotification } from '@commercetools-frontend/actions-global';
import {
  InfoModalPage,
  InfoDialog,
  useModalState,
  Drawer,
} from '@commercetools-frontend/application-components';
import FlatButton from '@commercetools-uikit/flat-button';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import Spacings from '@commercetools-uikit/spacings';

const NotificationsTriggers = () => {
  const showNotification = useShowNotification();

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
    </Spacings.Stack>
  );
};

const NotificationsPlayground = (props) => {
  const dialogState = useModalState();
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
          Drawer content here
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
