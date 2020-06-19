import React from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import UnexpectedErrorSVG from '@commercetools-frontend/assets/images/icecream.svg';
import { MaintenancePageLayout } from '@commercetools-frontend/application-components';
import messages from './messages';

const ErrorApologizer = () => {
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

ErrorApologizer.displayName = 'ErrorApologizer';

export default ErrorApologizer;
