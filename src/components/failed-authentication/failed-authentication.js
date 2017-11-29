import React from 'react';
import { FormattedMessage } from 'react-intl';
import FailedAuthenticationSvg from '@commercetools-local/ui-kit/materials/images/maintenance/failed-authentication.svg';
import ServicePageResponseLayout from '@commercetools-local/core/components/service-page-response-layout';
import messages from './messages';

const FailedAuthentication = () => (
  <ServicePageResponseLayout
    imageSrc={FailedAuthenticationSvg}
    title={<FormattedMessage {...messages.title} />}
    paragraph1={<FormattedMessage {...messages.paragraph1} />}
  />
);
FailedAuthentication.displayName = 'FailedAuthentication';

export default FailedAuthentication;
