import type { ReactNode } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import PageNotFoundSVG from '@commercetools-frontend/assets/images/page-not-found.svg';
import { SUPPORT_PORTAL_URL } from '@commercetools-frontend/constants';
import MaintenancePageLayout from '../maintenance-page-layout';
import messages from './messages';

const getLink = (msg: ReactNode) => (
  <a
    key="support-portal-url"
    href={SUPPORT_PORTAL_URL}
    target="_blank"
    rel="noopener noreferrer"
  >
    {msg}
  </a>
);
const PageNotFound = () => {
  const intl = useIntl();

  return (
    <MaintenancePageLayout
      imageSrc={PageNotFoundSVG}
      title={<FormattedMessage {...messages.title} />}
      label={intl.formatMessage(messages.title)}
      paragraph1={
        <FormattedMessage
          {...messages.paragraph1}
          values={{
            a: getLink,
          }}
        />
      }
    />
  );
};
PageNotFound.displayName = 'PageNotFound';

export default PageNotFound;
