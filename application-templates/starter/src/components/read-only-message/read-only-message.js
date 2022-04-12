import { FormattedMessage } from 'react-intl';
import { WarningIcon } from '@commercetools-uikit/icons';
import Spacings from '@commercetools-uikit/spacings';
import styles from './read-only-message.mod.css';
import messages from './messages';

const ReadOnlyMessage = () => (
  <Spacings.Inline alignItems="flex-end" scale="xs">
    <WarningIcon color="warning" />
    <span className={styles['read-only-text']}>
      <FormattedMessage {...messages.readOnly} />
    </span>
  </Spacings.Inline>
);
ReadOnlyMessage.displayName = 'ReadOnlyMessage';

export default ReadOnlyMessage;
