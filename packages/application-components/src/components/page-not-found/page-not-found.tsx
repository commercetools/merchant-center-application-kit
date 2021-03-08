/* eslint-disable react/display-name */
import React from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import PageNotFoundSVG from '@commercetools-frontend/assets/images/desert-fox.svg';
import { SUPPORT_PORTAL_URL } from '@commercetools-frontend/constants';
import MaintenancePageLayout from '../maintenance-page-layout';
import messages from './messages';

// eslint-disable-next-line react/display-name
const getLink = (msg: React.ReactChildren) => (
  <a href={SUPPORT_PORTAL_URL} target="_blank" rel="noopener noreferrer">
    {msg}
  </a>
);
const PageNotFound = () => {
  const intl = useIntl();
  const paragraph1Message = intl.formatMessage(messages.paragraph1, {
    a: getLink,
  });

  return (
    <MaintenancePageLayout
      imageSrc={PageNotFoundSVG}
      title={<FormattedMessage {...messages.title} />}
      label={intl.formatMessage(messages.title)}
      paragraph1={paragraph1Message}
    />
  );
};
PageNotFound.displayName = 'PageNotFound';

export default PageNotFound;
