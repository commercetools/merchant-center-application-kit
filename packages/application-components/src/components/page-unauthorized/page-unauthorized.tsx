import React from 'react';
import { FormattedMessage } from 'react-intl';
import FailedAuthorizationSVG from '@commercetools-frontend/assets/images/folder-full-locked.svg';
import MaintenancePageLayout from '../maintenance-page-layout';
import { SUPPORT_PORTAL_URL } from '@commercetools-frontend/constants';
import messages from './messages';

// eslint-disable-next-line react/display-name
const getSupportUrlLink = (msg: string) => (
  <a href={SUPPORT_PORTAL_URL} target="_blank" rel="noopener noreferrer">
    {msg}
  </a>
);

export const PageUnauthorized = () => (
  <MaintenancePageLayout
    imageSrc={FailedAuthorizationSVG}
    title={<FormattedMessage {...messages.title} />}
    paragraph1={<FormattedMessage {...messages.paragraph1} />}
    paragraph2={
      <FormattedMessage
        {...messages.paragraph2}
        values={{
          a: getSupportUrlLink,
        }}
      />
    }
  />
);

PageUnauthorized.displayName = 'PageUnauthorized';

export default PageUnauthorized;
