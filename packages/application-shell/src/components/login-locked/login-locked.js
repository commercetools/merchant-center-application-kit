import React from 'react';
import { FormattedMessage } from 'react-intl';
import { GetApplicationState } from '@commercetools-frontend/application-shell-connectors';
import { Text } from '@commercetools-frontend/ui-kit';
import { ProjectSuspendedSVG } from '@commercetools-frontend/assets';
import ServicePageResponseLayout from '../../from-core/service-page-response-layout';
import messages from './messages';

const year = new Date().getUTCFullYear();

export const HelpDeskLink = () => (
  <a href={'https://support.commercetools.com'} target="_blank">
    <FormattedMessage {...messages.helpDeskLink} />
  </a>
);
HelpDeskLink.displayName = 'HelpDeskLink';

export const ResetPasswordLink = () => (
  <GetApplicationState
    render={({ environment }) => (
      <a href={`${environment.adminCenterUrl}/reset-password`} target="_blank">
        <FormattedMessage {...messages.resetPasswordLink} />
      </a>
    )}
  />
);
ResetPasswordLink.displayName = 'ResetPasswordLink';

const LoginLocked = () => (
  <ServicePageResponseLayout
    imageSrc={ProjectSuspendedSVG}
    title={<FormattedMessage {...messages.title} />}
    paragraph1={
      <FormattedMessage
        {...messages.paragraph1}
        values={{
          resetPasswordLink: <ResetPasswordLink />,
          helpDeskLink: <HelpDeskLink />,
        }}
      />
    }
    paragraph2={<Text.Detail>{`${year} © commercetools`}</Text.Detail>}
  />
);
LoginLocked.displayName = 'LoginLocked';

export default LoginLocked;
