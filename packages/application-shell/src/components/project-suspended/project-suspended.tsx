import { useIntl, FormattedMessage, MessageDescriptor } from 'react-intl';
import { MaintenancePageLayout } from '@commercetools-frontend/application-components';
import ProjectSuspendedSVGRebranding from '@commercetools-frontend/assets/images/locked-diamond-rebranding.svg';
import ProjectSuspendedSVG from '@commercetools-frontend/assets/images/locked-diamond.svg';
import { useTheme } from '@commercetools-uikit/design-system';
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
  const { themedValue } = useTheme();
  const titleMessage = getTitleMessage(props);

  return (
    <MaintenancePageLayout
      imageSrc={themedValue(ProjectSuspendedSVG, ProjectSuspendedSVGRebranding)}
      title={<FormattedMessage {...titleMessage} />}
      label={intl.formatMessage(titleMessage)}
      paragraph1={<FormattedMessage {...messages.paragraph1} />}
      bodyContent={<ServicePageProjectSwitcher />}
    />
  );
};
ProjectSuspended.displayName = 'ProjectSuspended';

export default ProjectSuspended;
