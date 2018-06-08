import React from 'react';
import { FormattedMessage } from 'react-intl';
import UnexpectedErrorSVG from '@commercetools-local/ui-kit/materials/images/maintenance/unexpected-error.svg';
import ServicePageResponseLayout from '../../from-core/service-page-response-layout';
import messages from './messages';

const ErrorApologizer = () => (
  <ServicePageResponseLayout
    imageSrc={UnexpectedErrorSVG}
    title={<FormattedMessage {...messages.title} />}
    paragraph1={<FormattedMessage {...messages.notifiedTeam} />}
  />
);

ErrorApologizer.displayName = 'ErrorApologizer';

export default ErrorApologizer;
