import { useIntl, FormattedMessage } from 'react-intl';
import FailedAuthorizationSVG from '@commercetools-frontend/assets/images/doors-closed.svg';
import { SUPPORT_PORTAL_URL } from '@commercetools-frontend/constants';
import MaintenancePageLayout from '../maintenance-page-layout';
import messages from './messages';

// eslint-disable-next-line react/display-name
const getSupportUrlLink = (msg: string) => (
  <a href={SUPPORT_PORTAL_URL} target="_blank" rel="noopener noreferrer">
    {msg}
  </a>
);

export const PageUnauthorized = () => {
  const intl = useIntl();

  return (
    <MaintenancePageLayout
      imageSrc={FailedAuthorizationSVG}
      title={<FormattedMessage {...messages.title} />}
      label={intl.formatMessage(messages.title)}
      paragraph1={<FormattedMessage {...messages.paragraph1} />}
      paragraph2={
        <FormattedMessage
          {...messages.paragraph2}
          values={{
            a: getSupportUrlLink,
          }}
        />
      }
    />
  );
};

PageUnauthorized.displayName = 'PageUnauthorized';

export default PageUnauthorized;
