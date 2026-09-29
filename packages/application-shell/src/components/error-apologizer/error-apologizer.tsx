import { useContext } from 'react';
import {
  useIntl,
  FormattedMessage,
  IntlContext,
  IntlProvider,
} from 'react-intl';
import { MaintenancePageLayout } from '@commercetools-frontend/application-components';
import UnexpectedErrorSVG from '@commercetools-frontend/assets/images/unexpected-error.svg';
import messages from './messages';

const ErrorApologizerPage = () => {
  const intl = useIntl();

  return (
    <MaintenancePageLayout
      imageSrc={UnexpectedErrorSVG}
      title={<FormattedMessage {...messages.title} />}
      label={intl.formatMessage(messages.title)}
      paragraph1={<FormattedMessage {...messages.notifiedTeam} />}
    />
  );
};

const ErrorApologizer = () => {
  const intl = useContext(IntlContext);

  if (intl) {
    return <ErrorApologizerPage />;
  }

  // The top-level error boundary sits above the application's IntlProvider.
  // Without an intl context the fallback itself would throw, so the boundary
  // would never commit and the original error would never be reported.
  // Only the default (English) messages are available here.
  return (
    <IntlProvider locale="en">
      <ErrorApologizerPage />
    </IntlProvider>
  );
};

ErrorApologizer.displayName = 'ErrorApologizer';

export default ErrorApologizer;
