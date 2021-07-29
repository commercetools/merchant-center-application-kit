import { useIntl, FormattedMessage, MessageDescriptor } from 'react-intl';
import ProjectSuspendedSVG from '@commercetools-frontend/assets/images/doors-closed.svg';
import { MaintenancePageLayout } from '@commercetools-frontend/application-components';
import ServicePageProjectSwitcher from '../service-page-project-switcher';
import messages from './messages';

type Props = {
  isTemporary?: boolean;
};

const getTitleMessage = (props: Props): MessageDescriptor => {
  /* NOTE: Other suspension reasons are `Payment` and `Other` which are not handled yet */
  if (props.isTemporary === true)
    return messages.temporaryMaintenanceSuspensionMessage;

  return messages.defaultSuspensionMessage;
};

const ProjectSuspended = (props: Props) => {
  const intl = useIntl();
  const titleMessage = getTitleMessage(props);

  return (
    <MaintenancePageLayout
      imageSrc={ProjectSuspendedSVG}
      title={<FormattedMessage {...titleMessage} />}
      label={intl.formatMessage(titleMessage)}
      paragraph1={<FormattedMessage {...messages.paragraph1} />}
      bodyContent={<ServicePageProjectSwitcher />}
    />
  );
};
ProjectSuspended.displayName = 'ProjectSuspended';

export default ProjectSuspended;
