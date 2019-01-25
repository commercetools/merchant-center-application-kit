import React from 'react';
import { FormattedMessage } from 'react-intl';
import PageNotFoundSVG from '@commercetools-frontend/assets/images/page-not-found.svg';
import ServicePageResponseLayout from '../service-page-response-layout';
import messages from './messages';
import styles from './page-not-found.mod.css';

const Link = () => (
  <a href={'https://support.commercetools.com'} target="_blank">
    <FormattedMessage {...messages.helpDesk} />
  </a>
);

Link.displayName = 'Link';

const PageNotFound = () => (
  <div className={styles.container}>
    <ServicePageResponseLayout
      imageSrc={PageNotFoundSVG}
      title={<FormattedMessage {...messages.title} />}
      paragraph1={
        <FormattedMessage
          {...messages.paragraph1}
          values={{ link: <Link /> }}
        />
      }
    />
  </div>
);
PageNotFound.displayName = 'PageNotFound';

export default PageNotFound;
