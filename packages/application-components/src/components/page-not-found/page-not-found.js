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
      <FormattedMessage
        {...messages.paragraph1}
        values={{
          link: (
            <a
              href={SUPPORT_PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FormattedMessage {...messages.helpDesk} />
            </a>
          ),
        }}
      />
    }
  />
);
PageNotFound.displayName = 'PageNotFound';

export default PageNotFound;
