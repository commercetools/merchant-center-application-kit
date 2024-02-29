import { useIntl, FormattedMessage } from 'react-intl';
import { MaintenancePageLayout } from '@commercetools-frontend/application-components';
import ProjectNotFoundSVGRebranding from '@commercetools-frontend/assets/images/folder-full-locked-rebranding.svg';
import ProjectNotFoundSVG from '@commercetools-frontend/assets/images/folder-full-locked.svg';
import { useTheme } from '@commercetools-uikit/design-system';
import ServicePageProjectSwitcher from '../service-page-project-switcher';
import messages from './messages';

const ProjectNotFound = () => {
  const intl = useIntl();
  const { themedValue } = useTheme();

  return (
    <MaintenancePageLayout
      imageSrc={themedValue(ProjectNotFoundSVG, ProjectNotFoundSVGRebranding)}
      title={<FormattedMessage {...messages.title} />}
      label={intl.formatMessage(messages.title)}
      paragraph1={<FormattedMessage {...messages.paragraph1} />}
      paragraph2={<FormattedMessage {...messages.paragraph2} />}
      bodyContent={<ServicePageProjectSwitcher />}
    />
  );
};
ProjectNotFound.displayName = 'ProjectNotFound';

export default ProjectNotFound;
