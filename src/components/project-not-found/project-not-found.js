import React from 'react';
import { FormattedMessage } from 'react-intl';
import FailedAuthorizationSVG from '@commercetools-frontend/ui-kit/materials/images/maintenance/failed-authorization.svg';
import ServicePageResponseLayout from '../../from-core/service-page-response-layout';
import ServicePageProjectSwitcher from '../service-page-project-switcher';
import messages from './messages';

const ProjectNotFound = () => (
  <ServicePageResponseLayout
    imageSrc={FailedAuthorizationSVG}
    title={<FormattedMessage {...messages.title} />}
    paragraph1={<FormattedMessage {...messages.paragraph1} />}
    paragraph2={<FormattedMessage {...messages.paragraph2} />}
    bodyContent={<ServicePageProjectSwitcher />}
  />
);
ProjectNotFound.displayName = 'ProjectNotFound';

export default ProjectNotFound;
