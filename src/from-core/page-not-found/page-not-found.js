import React from 'react';
import { FormattedMessage } from 'react-intl';
import PageNotFoundSVG from '@commercetools-frontend/ui-kit/materials/images/maintenance/page-not-found.svg';
import ServicePageResponseLayout from '../service-page-response-layout';
import messages from './messages';
import styles from './page-not-found.mod.css';

const link = (
  <a href={'https://support.commercetools.com'} target="_blank">
    <FormattedMessage {...messages.helpDesk} />
  </a>
);
const PageNotFound = () => (
  <div className={styles.container}>
    <ServicePageResponseLayout
      imageSrc={PageNotFoundSVG}
      title={<FormattedMessage {...messages.title} />}
      paragraph1={
        <FormattedMessage {...messages.paragraph1} values={{ link }} />
      }
    />
  </div>
);
PageNotFound.displayName = 'PageNotFound';

export default PageNotFound;
