import { useIntl, FormattedMessage } from 'react-intl';
import { MaintenancePageLayout } from '@commercetools-frontend/application-components';
import ProjectExpiredIllustration from '@commercetools-frontend/assets/images/hourglass.svg';
import ServicePageProjectSwitcher from '../service-page-project-switcher';
import messages from './messages';

type Props = {
  email: string;
};

const salesEmail = 'sales@commercetools.com';

const EmailLink = (props: Props) => (
  <a href={`mailto:${props.email}`}>{props.email}</a>
);
EmailLink.displayName = 'EmailLink';

const ProjectExpired = () => {
  const intl = useIntl();

  return (
    <MaintenancePageLayout
      imageSrc={ProjectExpiredIllustration}
      title={<FormattedMessage {...messages.title} />}
      label={intl.formatMessage(messages.title)}
      paragraph1={
        <FormattedMessage
          {...messages.paragraph1}
          values={{ mailto: <EmailLink email={salesEmail} /> }}
        />
      }
      bodyContent={<ServicePageProjectSwitcher />}
    />
  );
};
ProjectExpired.displayName = 'ProjectExpired';

export default ProjectExpired;
