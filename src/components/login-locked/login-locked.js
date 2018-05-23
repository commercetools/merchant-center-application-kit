import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { injectConfiguration } from '@commercetools-local/application-shell-connectors';
import ProjectSuspended from '@commercetools-local/ui-kit/materials/images/maintenance/project-suspended.svg';
import ServicePageResponseLayout from '@commercetools-local/core/components/service-page-response-layout';
import Text from '@commercetools-local/ui-kit/typography/text';
import messages from './messages';

const year = new Date().getUTCFullYear();

export const HelpDeskLink = () => (
  <a href={'https://support.commercetools.com'} target="_blank">
    <FormattedMessage {...messages.helpDeskLink} />
  </a>
);
HelpDeskLink.displayName = 'HelpDeskLink';

export const ResetPasswordLink = props => (
  <a href={`${props.adminCenterUrl}/reset-password`} target="_blank">
    <FormattedMessage {...messages.resetPasswordLink} />
  </a>
);
ResetPasswordLink.displayName = 'ResetPasswordLink';
ResetPasswordLink.propTypes = {
  adminCenterUrl: PropTypes.string.isRequired,
};
const ConnectedResetPasswordLink = injectConfiguration(
  ['adminCenterUrl'],
  'adminCenterUrl'
)(ResetPasswordLink);

const LoginLocked = () => (
  <ServicePageResponseLayout
    imageSrc={ProjectSuspended}
    title={<FormattedMessage {...messages.title} />}
    paragraph1={
      <FormattedMessage
        {...messages.paragraph1}
        values={{
          resetPasswordLink: <ConnectedResetPasswordLink />,
          helpDeskLink: <HelpDeskLink />,
        }}
      />
    }
    paragraph2={<Text.Detail>{`${year} © commercetools`}</Text.Detail>}
  />
);
LoginLocked.displayName = 'LoginLocked';

export default LoginLocked;
