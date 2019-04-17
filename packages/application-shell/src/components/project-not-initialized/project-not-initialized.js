import React from 'react';
import { FormattedMessage } from 'react-intl';
import ProjectNotInitializedSVG from '@commercetools-frontend/assets/images/project-not-initialized.svg';
import { MaintenancePageLayout } from '@commercetools-frontend/application-components';
import ServicePageProjectSwitcher from '../service-page-project-switcher';
import messages from './messages';

const supportEmail = 'support@commercetools.com';

const EmailLink = () => <a href={`mailto:${supportEmail}`}>{supportEmail}</a>;
EmailLink.displayName = 'EmailLink';

const ProjectNotInitialized = () => (
  <MaintenancePageLayout
    imageSrc={ProjectNotInitializedSVG}
    title={<FormattedMessage {...messages.title} />}
    paragraph1={
      <FormattedMessage
        {...messages.paragraph1}
        values={{ mailto: <EmailLink /> }}
      />
    }
    bodyContent={<ServicePageProjectSwitcher />}
  />
);
ProjectNotInitialized.displayName = 'ProjectNotInitialized';

export default ProjectNotInitialized;
