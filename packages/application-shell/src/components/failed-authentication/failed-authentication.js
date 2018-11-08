import React from 'react';
import { FormattedMessage } from 'react-intl';
import { FailedAuthenticationSVG } from '@commercetools-frontend/assets';
import ServicePageResponseLayout from '../../from-core/service-page-response-layout';
import messages from './messages';

const FailedAuthentication = () => (
  <ServicePageResponseLayout
    imageSrc={FailedAuthenticationSVG}
    title={<FormattedMessage {...messages.title} />}
    paragraph1={<FormattedMessage {...messages.paragraph1} />}
  />
);
FailedAuthentication.displayName = 'FailedAuthentication';

export default FailedAuthentication;
