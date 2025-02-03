import type { ReactNode } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import FailedAuthorizationSVG from '@commercetools-frontend/assets/images/doors-closed.svg';
import { SUPPORT_PORTAL_URL } from '@commercetools-frontend/constants';
import MaintenancePageLayout from '../maintenance-page-layout';
import messages from './messages';

const getSupportUrlLink = (msg: string) => (
  <a
    key="support-portal-url"
    href={SUPPORT_PORTAL_URL}
    target="_blank"
    rel="noopener noreferrer"
  >
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
            a: getSupportUrlLink as unknown as ReactNode,
          }}
        />
      }
    />
  );
};

PageUnauthorized.displayName = 'PageUnauthorized';

export default PageUnauthorized;
