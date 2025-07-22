import { useIntl, FormattedMessage } from 'react-intl';
import { MaintenancePageLayout } from '@commercetools-frontend/application-components';
import UnexpectedErrorSVG from '@commercetools-frontend/assets/images/unexpected-error.svg';
import messages from './messages';

// const ErrorApologizer = () => {
//   const intl = useIntl();

//   return (
//     <MaintenancePageLayout
//       imageSrc={UnexpectedErrorSVG}
//       title={<FormattedMessage {...messages.title} />}
//       label={intl.formatMessage(messages.title)}
//       paragraph1={<FormattedMessage {...messages.notifiedTeam} />}
//     />
//   );
// };

const ErrorApologizer = () => {
  return (
    <MaintenancePageLayout
      imageSrc={UnexpectedErrorSVG}
      title={messages.title.defaultMessage}
      label={messages.title.defaultMessage}
      paragraph1={messages.notifiedTeam.defaultMessage}
    />
  );
};

ErrorApologizer.displayName = 'ErrorApologizer';

export default ErrorApologizer;
