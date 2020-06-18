import React from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import FailedAuthenticationSVG from '@commercetools-frontend/assets/images/locked-diamond.svg';
import { MaintenancePageLayout } from '@commercetools-frontend/application-components';
import messages from './messages';

const FailedAuthentication = () => {
  const intl = useIntl();

  return (
    <MaintenancePageLayout
      imageSrc={FailedAuthenticationSVG}
      title={<FormattedMessage {...messages.title} />}
      label={intl.formatMessage(messages.title)}
      paragraph1={<FormattedMessage {...messages.paragraph1} />}
    />
  );
};
FailedAuthentication.displayName = 'FailedAuthentication';

export default FailedAuthentication;
