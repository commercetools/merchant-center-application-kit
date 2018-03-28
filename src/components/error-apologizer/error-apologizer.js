import React from 'react';
import { FormattedMessage } from 'react-intl';
import FailedAuthorizationSVG from '@commercetools-local/ui-kit/materials/images/maintenance/failed-authorization.svg';
import ServicePageResponseLayout from '@commercetools-local/core/components/service-page-response-layout';
import messages from './messages';

const ErrorApologizer = () => (
  <ServicePageResponseLayout
    // TODO: use a proper image
    imageSrc={FailedAuthorizationSVG}
    title={<FormattedMessage {...messages.title} />}
    paragraph1={<FormattedMessage {...messages.notifiedTeam} />}
  />
);

ErrorApologizer.displayName = 'ErrorApologizer';

export default ErrorApologizer;
