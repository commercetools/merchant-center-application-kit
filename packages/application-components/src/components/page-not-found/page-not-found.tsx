import { useIntl, FormattedMessage } from 'react-intl';
import PageNotFoundIllustration from '@commercetools-frontend/assets/images/page-application-disabled.svg';
import { SUPPORT_PORTAL_URL } from '@commercetools-frontend/constants';
import MaintenancePageLayout from '../maintenance-page-layout';
import messages from './messages';

// eslint-disable-next-line react/display-name
const getLink = (msg: string) => (
  <a href={SUPPORT_PORTAL_URL} target="_blank" rel="noopener noreferrer">
    {msg}
  </a>
);
const PageNotFound = () => {
  const intl = useIntl();

  return (
    <MaintenancePageLayout
      imageSrc={PageNotFoundIllustration}
      title={<FormattedMessage {...messages.title} />}
      label={intl.formatMessage(messages.title)}
      paragraph1={
        <FormattedMessage
          {...messages.paragraph1}
          values={{
            a: getLink,
          }}
        />
      }
    />
  );
};
PageNotFound.displayName = 'PageNotFound';

export default PageNotFound;
