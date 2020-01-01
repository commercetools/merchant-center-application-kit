import React from 'react';
import { FormattedMessage } from 'react-intl';
import ProjectNotInitializedSVG from '@commercetools-frontend/assets/images/hourglass.svg';
import { MaintenancePageLayout } from '@commercetools-frontend/application-components';
import ServicePageProjectSwitcher from '../service-page-project-switcher';
import messages from './messages';

type Props = {
  email: string;
};

const supportEmail = 'support@commercetools.com';

const EmailLink = (props: Props) => (
  <a href={`mailto:${props.email}`}>{props.email}</a>
);
EmailLink.displayName = 'EmailLink';

const ProjectNotInitialized = () => (
  <MaintenancePageLayout
    imageSrc={ProjectNotInitializedSVG}
    title={<FormattedMessage {...messages.title} />}
    paragraph1={
      <FormattedMessage
        {...messages.paragraph1}
        values={{ mailto: <EmailLink email={supportEmail} /> }}
      />
    }
    bodyContent={<ServicePageProjectSwitcher />}
  />
);
ProjectNotInitialized.displayName = 'ProjectNotInitialized';

export default ProjectNotInitialized;
