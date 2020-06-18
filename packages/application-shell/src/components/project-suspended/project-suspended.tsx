import React from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import ProjectSuspendedSVG from '@commercetools-frontend/assets/images/doors-closed.svg';
import { MaintenancePageLayout } from '@commercetools-frontend/application-components';
import ServicePageProjectSwitcher from '../service-page-project-switcher';
import messages from './messages';

type Props = {
  isTemporary?: boolean;
};

const ProjectSuspended = (props: Props) => {
  const intl = useIntl();

  <MaintenancePageLayout
    imageSrc={ProjectSuspendedSVG}
    title={(() => {
      /* NOTE: Other suspension reasons are `Payment` and `Other` which are not handled yet */
      if (props.isTemporary === true)
        return (
          <FormattedMessage
            {...messages.temporaryMaintenanceSuspensionMessage}
          />
        );
      return <FormattedMessage {...messages.defaultSuspensionMessage} />;
    })()}
    label={intl.formatMessage(messages.title)}
    paragraph1={<FormattedMessage {...messages.paragraph1} />}
    bodyContent={<ServicePageProjectSwitcher />}
  />;
};
ProjectSuspended.displayName = 'ProjectSuspended';

export default ProjectSuspended;
