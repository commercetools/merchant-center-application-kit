import React from 'react';
import { FormattedMessage } from 'react-intl';
import PageNotFoundSVG from '@commercetools-frontend/assets/images/page-not-found.svg';
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
              href={'https://support.commercetools.com'}
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
