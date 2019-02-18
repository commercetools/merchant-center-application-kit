import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import ProjectSuspendedSVG from '@commercetools-frontend/assets/images/project-suspended.svg';
import { MaintenancePageLayout } from '@commercetools-frontend/application-components';
import ServicePageProjectSwitcher from '../service-page-project-switcher';
import messages from './messages';

const ProjectSuspended = props => (
  <MaintenancePageLayout
    imageSrc={ProjectSuspendedSVG}
    title={(() => {
      /* NOTE: Other suspension reasons are `Payment` and `Other` which are not handled yet */
      if (props.isTemporary)
        return (
          <FormattedMessage
            {...messages.temporaryMaintenanceSuspensionMessage}
          />
        );
      return <FormattedMessage {...messages.defaultSuspensionMessage} />;
    })()}
    paragraph1={<FormattedMessage {...messages.paragraph1} />}
    bodyContent={<ServicePageProjectSwitcher />}
  />
);
ProjectSuspended.displayName = 'ProjectSuspended';
ProjectSuspended.propTypes = {
  isTemporary: PropTypes.bool,
};
ProjectSuspended.defaultProps = {
  isTemporary: false,
};

export default ProjectSuspended;
