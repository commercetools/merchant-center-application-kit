import React from 'react';
import { FormattedMessage } from 'react-intl';
import ProjectSuspendedSvg from '@commercetools-local/ui-kit/materials/images/maintenance/project-suspended.svg';
import ServicePageResponseLayout from '../../from-core/service-page-response-layout';
import ServicePageProjectSwitcher from '../service-page-project-switcher';
import messages from './messages';

const ProjectSuspended = () => (
  <ServicePageResponseLayout
    imageSrc={ProjectSuspendedSvg}
    title={<FormattedMessage {...messages.title} />}
    paragraph1={<FormattedMessage {...messages.paragraph1} />}
    bodyContent={<ServicePageProjectSwitcher />}
  />
);
ProjectSuspended.displayName = 'ProjectSuspended';

export default ProjectSuspended;
