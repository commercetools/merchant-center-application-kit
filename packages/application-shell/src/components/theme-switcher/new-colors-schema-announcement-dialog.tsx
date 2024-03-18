import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { InfoDialog } from '@commercetools-frontend/application-components';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import mcRebrandingAnnouncementSVG from '@commercetools-frontend/assets/images/mc-rebranding-announcement.svg';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import { STORAGE_KEYS } from '../../constants';
import messages from './messages';

type TAdditionalEnvironmentValues = { enableRebrandingAnnouncement: boolean };
type TSelectedEnvironmentValues = boolean | undefined;

function useEnablebrandingAnnouncement() {
  const enableRebrandingAnnouncement = useApplicationContext<
    TSelectedEnvironmentValues,
    TAdditionalEnvironmentValues
  >((context) => context.environment.enableRebrandingAnnouncement);

  return Boolean(enableRebrandingAnnouncement);
}

const NewColoursSchemaAnnouncementDialog = () => {
  const intl = useIntl();

  const [
    hasUserSeenNewDesignNotificationDialog,
    setHasUserSeenNewDesignNotificationDialog,
  ] = useState(
    window.localStorage.getItem(
      STORAGE_KEYS.IS_NEW_DESIGN_NOTIFICATION_CLOSED
    ) === 'true'
  );

  const handleCloseDialog = () => {
    window.localStorage.setItem(
      STORAGE_KEYS.IS_NEW_DESIGN_NOTIFICATION_CLOSED,
      'true'
    );
    setHasUserSeenNewDesignNotificationDialog(true);
  };

  return !hasUserSeenNewDesignNotificationDialog ? (
    <InfoDialog
      title={intl.formatMessage(messages.title)}
      isOpen={true}
      onClose={handleCloseDialog}
      size="l"
    >
      <Spacings.Stack scale="xl">
        <img
          style={{ height: '300px', padding: '16px 16px 0' }}
          src={mcRebrandingAnnouncementSVG}
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
