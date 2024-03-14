import { FormattedMessage, useIntl } from 'react-intl';
import { InfoDialog } from '@commercetools-frontend/application-components';
import mcRebrandingAnnouncementSVG from '@commercetools-frontend/assets/images/mc-rebranding-announcement.svg';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import messages from './messages';

type TNewDesignReleaseInfoModal = {
  onClose: () => void;
};

const NewColoursSchemaAnnouncementModal = (
  props: TNewDesignReleaseInfoModal
) => {
  const intl = useIntl();
  return (
    <InfoDialog
      title={intl.formatMessage(messages.title)}
      isOpen={true}
      onClose={props.onClose}
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
  );
};

export default NewColoursSchemaAnnouncementModal;
