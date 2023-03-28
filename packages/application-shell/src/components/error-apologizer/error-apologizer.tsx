import { useIntl, FormattedMessage } from 'react-intl';
import { MaintenancePageLayout } from '@commercetools-frontend/application-components';
import UnexpectedErrorIllustration from '@commercetools-frontend/assets/images/unexpected-error.svg';
import messages from './messages';

const ErrorApologizer = () => {
  const intl = useIntl();

  return (
    <MaintenancePageLayout
      imageSrc={UnexpectedErrorIllustration}
      title={<FormattedMessage {...messages.title} />}
      label={intl.formatMessage(messages.title)}
      paragraph1={<FormattedMessage {...messages.notifiedTeam} />}
    />
  );
};

ErrorApologizer.displayName = 'ErrorApologizer';

export default ErrorApologizer;
