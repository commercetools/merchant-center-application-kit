import PropTypes from 'prop-types';
import { useShowNotification } from '@commercetools-frontend/actions-global';
import {
  InfoModalPage,
  useModalState,
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
  const modalState = useModalState();

  return (
    <Spacings.Inset>
      <Spacings.Stack>
        <NotificationsTriggers />
        <FlatButton
          label={`Open modal ${props.level}`}
          onClick={modalState.openModal}
        />

        <InfoModalPage
          isOpen={modalState.isModalOpen}
          title={`Modal page ${props.level}`}
          onClose={modalState.closeModal}
          level={props.level}
        >
          <NotificationsPlayground level={props.level + 1} />
        </InfoModalPage>
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
