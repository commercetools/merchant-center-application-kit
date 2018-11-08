import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ProjectExpiredSVG } from '@commercetools-frontend/assets';
import ServicePageResponseLayout from '../../from-core/service-page-response-layout';
import ServicePageProjectSwitcher from '../service-page-project-switcher';
import messages from './messages';

const salesEmail = 'sales@commercetools.com';

const EmailLink = () => <a href={`mailto:${salesEmail}`}>{salesEmail}</a>;
EmailLink.displayName = 'EmailLink';

const ProjectExpired = () => (
  <ServicePageResponseLayout
    imageSrc={ProjectExpiredSVG}
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
