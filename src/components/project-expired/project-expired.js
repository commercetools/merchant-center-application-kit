import React from 'react';
import { FormattedMessage } from 'react-intl';
import ProjectExpiredSvg from '@commercetools-local/ui-kit/materials/images/maintenance/project-expired.svg';
import ServicePageResponseLayout from '../../from-core/service-page-response-layout';
import ServicePageProjectSwitcher from '../service-page-project-switcher';
import messages from './messages';

const salesEmail = 'sales@commercetools.com';
const mailto = <a href={`mailto:${salesEmail}`}>{salesEmail}</a>;

const ProjectExpired = () => (
  <ServicePageResponseLayout
    imageSrc={ProjectExpiredSvg}
    title={<FormattedMessage {...messages.title} />}
    paragraph1={
      <FormattedMessage {...messages.paragraph1} values={{ mailto }} />
    }
    bodyContent={<ServicePageProjectSwitcher />}
  />
);
ProjectExpired.displayName = 'ProjectExpired';

export default ProjectExpired;
