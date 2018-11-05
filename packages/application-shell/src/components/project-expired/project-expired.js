import React from 'react';
import { FormattedMessage } from 'react-intl';
import ProjectExpiredSvg from '@commercetools-frontend/ui-kit/images/maintenance/project-expired.svg';
import ServicePageResponseLayout from '../../from-core/service-page-response-layout';
import ServicePageProjectSwitcher from '../service-page-project-switcher';
import messages from './messages';

const salesEmail = 'sales@commercetools.com';

const EmailLink = () => <a href={`mailto:${salesEmail}`}>{salesEmail}</a>;
EmailLink.displayName = 'EmailLink';

const ProjectExpired = () => (
  <ServicePageResponseLayout
    imageSrc={ProjectExpiredSvg}
    title={<FormattedMessage {...messages.title} />}
    paragraph1={
      <FormattedMessage
        {...messages.paragraph1}
        values={{ mailto: <EmailLink email={salesEmail} /> }}
      />
    }
    bodyContent={<ServicePageProjectSwitcher />}
  />
);
ProjectExpired.displayName = 'ProjectExpired';

export default ProjectExpired;
