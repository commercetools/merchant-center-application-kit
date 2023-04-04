import { useIntl, FormattedMessage } from 'react-intl';
import { MaintenancePageLayout } from '@commercetools-frontend/application-components';
import FailedAuthorizationIllustration from '@commercetools-frontend/assets/images/folder-full-locked.svg';
import ServicePageProjectSwitcher from '../service-page-project-switcher';
import messages from './messages';

const ProjectNotFound = () => {
  const intl = useIntl();

  return (
    <MaintenancePageLayout
      imageSrc={FailedAuthorizationIllustration}
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
