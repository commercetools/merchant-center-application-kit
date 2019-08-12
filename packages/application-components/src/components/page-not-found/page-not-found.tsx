/* eslint-disable react/display-name */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import PageNotFoundSVG from '@commercetools-frontend/assets/images/desert-fox.svg';
import { SUPPORT_PORTAL_URL } from '@commercetools-frontend/constants';
import MaintenancePageLayout from '../maintenance-page-layout';
import messages from './messages';

const PageNotFound = () => (
  <MaintenancePageLayout
    imageSrc={PageNotFoundSVG}
    title={<FormattedMessage {...messages.title} />}
    paragraph1={
      <FormattedMessage<
        Record<string, (msg: React.ReactNodeArray) => JSX.Element>
      >
        {...messages.paragraph1}
        values={{
          a: (msg: React.ReactNodeArray) => (
            <a
              href={SUPPORT_PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {msg}
            </a>
          ),
        }}
      />
    }
  />
);
PageNotFound.displayName = 'PageNotFound';

export default PageNotFound;
