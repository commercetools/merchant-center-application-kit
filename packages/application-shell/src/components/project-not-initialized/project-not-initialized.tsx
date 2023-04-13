import { useIntl, FormattedMessage } from 'react-intl';
import { MaintenancePageLayout } from '@commercetools-frontend/application-components';
import ProjectNotInitializedIllustration from '@commercetools-frontend/assets/images/hourglass.svg';
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

const ProjectNotInitialized = () => {
  const intl = useIntl();

  return (
    <MaintenancePageLayout
      imageSrc={ProjectNotInitializedIllustration}
      title={<FormattedMessage {...messages.title} />}
      label={intl.formatMessage(messages.title)}
      paragraph1={
        <FormattedMessage
          {...messages.paragraph1}
          values={{ mailto: <EmailLink email={supportEmail} /> }}
        />
      }
      bodyContent={<ServicePageProjectSwitcher />}
    />
  );
};
ProjectNotInitialized.displayName = 'ProjectNotInitialized';

export default ProjectNotInitialized;
