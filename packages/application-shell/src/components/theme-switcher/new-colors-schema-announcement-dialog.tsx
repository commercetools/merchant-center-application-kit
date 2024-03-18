import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { InfoDialog } from '@commercetools-frontend/application-components';
import mcRecolouringAnnouncementSVG from '@commercetools-frontend/assets/images/mc-recolouring-announcement.svg';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import { STORAGE_KEYS } from '../../constants';
import messages from './messages';

const NewColoursSchemaAnnouncementDialog = () => {
  const intl = useIntl();

  const [
    hasUserSeenRecolouringNotificationDialog,
    setHasUserSeenRecolouringNotificationDialog,
  ] = useState(
    window.localStorage.getItem(
      STORAGE_KEYS.IS_RECOLOURING_NOTIFICATION_CLOSED
    ) === 'true'
  );

  const handleCloseDialog = () => {
    window.localStorage.setItem(
      STORAGE_KEYS.IS_RECOLOURING_NOTIFICATION_CLOSED,
      'true'
    );
    setHasUserSeenRecolouringNotificationDialog(true);
  };

  return !hasUserSeenRecolouringNotificationDialog ? (
    <InfoDialog
      title={intl.formatMessage(messages.title)}
      isOpen={true}
      onClose={handleCloseDialog}
      size="l"
    >
      <Spacings.Stack scale="xl">
        <img
          style={{ height: '300px', padding: '16px 16px 0' }}
          src={mcRecolouringAnnouncementSVG}
          alt="merchant center redesign announcement"
        />
        <Text.Body>
          <FormattedMessage {...messages.content} />
        </Text.Body>
      </Spacings.Stack>
    </InfoDialog>
  ) : null;
};

export default NewColoursSchemaAnnouncementDialog;
