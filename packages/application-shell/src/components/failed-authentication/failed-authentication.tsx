import { useIntl, FormattedMessage } from 'react-intl';
import { MaintenancePageLayout } from '@commercetools-frontend/application-components';
import FailedAuthenticationSVGRebranding from '@commercetools-frontend/assets/images/doors-closed-rebranding.svg';
import FailedAuthenticationSVG from '@commercetools-frontend/assets/images/doors-closed.svg';
import { useTheme } from '@commercetools-uikit/design-system';
import messages from './messages';

const FailedAuthentication = () => {
  const intl = useIntl();
  const { themedValue } = useTheme();

  return (
    <MaintenancePageLayout
      imageSrc={themedValue(
        FailedAuthenticationSVG,
        FailedAuthenticationSVGRebranding
      )}
      title={<FormattedMessage {...messages.title} />}
      label={intl.formatMessage(messages.title)}
      paragraph1={<FormattedMessage {...messages.paragraph1} />}
    />
  );
};
FailedAuthentication.displayName = 'FailedAuthentication';

export default FailedAuthentication;
