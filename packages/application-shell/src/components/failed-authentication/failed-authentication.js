import React from 'react';
import { FormattedMessage } from 'react-intl';
import FailedAuthenticationSVG from '@commercetools-frontend/assets/images/failed-authentication.svg';
import { ServicePageResponseLayout } from '@commercetools-frontend/application-components';
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
