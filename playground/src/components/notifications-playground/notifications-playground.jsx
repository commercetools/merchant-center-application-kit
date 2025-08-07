import PropTypes from 'prop-types';
import { Routes, Route, useNavigate } from 'react-router-dom-v5-compat';
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

const NotificationsPlayground = ({ level = 1 }) => {
  const dialogState = useModalState();
  const dialogStateInDrawer = useModalState();
  const drawerState = useModalState();
  const navigate = useNavigate();

  return (
    <Spacings.Inset>
      <Spacings.Stack>
        <NotificationsTriggers />
        <FlatButton
          label={`Open modal ${level}`}
          onClick={() => {
            navigate(`${level}`, { relative: 'path' });
          }}
        />
        <FlatButton
          label={`Open dialog ${level}`}
          onClick={dialogState.openModal}
        />
        <FlatButton
          label={`Open drawer ${level}`}
          onClick={drawerState.openModal}
        />

        <InfoDialog
          isOpen={dialogState.isModalOpen}
          title={`Dialog ${level}`}
          onClose={dialogState.closeModal}
        >
          Hello
        </InfoDialog>

        <Drawer
          isOpen={drawerState.isModalOpen}
          title={`Drawer ${level}`}
          onClose={drawerState.closeModal}
        >
          <p>Drawer content here</p>
          <FlatButton
            label={`Open dialog ${level}`}
            onClick={dialogStateInDrawer.openModal}
          />
          <InfoDialog
            isOpen={dialogStateInDrawer.isModalOpen}
            title={`Dialog ${level}`}
            onClose={dialogStateInDrawer.closeModal}
          >
            Hello
          </InfoDialog>
        </Drawer>

        <Routes>
          <Route
            path={`:level/*`}
            element={
              <InfoModalPage
                isOpen
                title={`Modal page ${level}`}
                customViewLocatorCode="products.product_details.general"
                onClose={() => {
                  navigate(-1);
                }}
              >
                <NotificationsPlayground level={level + 1} />
              </InfoModalPage>
            }
          />
        </Routes>
      </Spacings.Stack>
    </Spacings.Inset>
  );
};
NotificationsPlayground.propTypes = {
  level: PropTypes.number,
};

export default NotificationsPlayground;
