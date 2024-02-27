import { useIntl, FormattedMessage } from 'react-intl';
import { MaintenancePageLayout } from '@commercetools-frontend/application-components';
import UnexpectedErrorSVGRebranding from '@commercetools-frontend/assets/images/unexpected-error-rebranding.svg';
import UnexpectedErrorSVG from '@commercetools-frontend/assets/images/unexpected-error.svg';
import { useTheme } from '@commercetools-uikit/design-system';
import messages from './messages';

const ErrorApologizer = () => {
  const intl = useIntl();
  const { themedValue } = useTheme();

  return (
    <MaintenancePageLayout
      imageSrc={themedValue(UnexpectedErrorSVG, UnexpectedErrorSVGRebranding)}
      title={<FormattedMessage {...messages.title} />}
      label={intl.formatMessage(messages.title)}
      paragraph1={<FormattedMessage {...messages.notifiedTeam} />}
    />
  );
};

ErrorApologizer.displayName = 'ErrorApologizer';

export default ErrorApologizer;
