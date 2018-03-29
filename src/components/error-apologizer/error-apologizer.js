import React from 'react';
import { FormattedMessage } from 'react-intl';
import PageNotFoundSVG from '@commercetools-local/ui-kit/materials/images/maintenance/page-not-found.svg';
import ServicePageResponseLayout from '@commercetools-local/core/components/service-page-response-layout';
import messages from './messages';

const ErrorApologizer = () => (
  <ServicePageResponseLayout
    // TODO: use a proper image
    imageSrc={PageNotFoundSVG}
    title={<FormattedMessage {...messages.title} />}
    paragraph1={<FormattedMessage {...messages.notifiedTeam} />}
  />
);

ErrorApologizer.displayName = 'ErrorApologizer';

export default ErrorApologizer;
