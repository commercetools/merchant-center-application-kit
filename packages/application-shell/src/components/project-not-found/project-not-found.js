import React from 'react';
import { FormattedMessage } from 'react-intl';
import FailedAuthorizationSVG from '@commercetools-frontend/assets/images/failed-authorization.svg';
import { ServicePageResponseLayout } from '@commercetools-frontend/application-components';
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
