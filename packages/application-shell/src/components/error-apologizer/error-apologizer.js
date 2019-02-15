import React from 'react';
import { FormattedMessage } from 'react-intl';
import UnexpectedErrorSVG from '@commercetools-frontend/assets/images/unexpected-error.svg';
import { MaintenancePageLayout } from '@commercetools-frontend/application-components';
import messages from './messages';

const ErrorApologizer = () => (
  <MaintenancePageLayout
    imageSrc={UnexpectedErrorSVG}
    title={<FormattedMessage {...messages.title} />}
    paragraph1={<FormattedMessage {...messages.notifiedTeam} />}
  />
);

ErrorApologizer.displayName = 'ErrorApologizer';

export default ErrorApologizer;
