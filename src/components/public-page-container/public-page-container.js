import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Spacings from '@commercetools-frontend/ui-kit/materials/spacings';
import Text from '@commercetools-frontend/ui-kit/typography/text';
import PortalsContainer from '../portals-container';
import styles from './public-page-container.mod.css';
import messages from './messages';

const year = new Date().getUTCFullYear();

const PublicPageContainer = props => (
  <div className={styles.container}>
    <div className={styles.login}>
      <Spacings.Stack scale="m">
        <PortalsContainer />
        {props.children}
        <div className={styles.footer}>
          <a href={`https://commercetools.com/privacy`} target="_blank">
            <Text.Detail tone="positive">
              <FormattedMessage {...messages.privacyPolicy} />
            </Text.Detail>
          </a>
          <Text.Detail>{`${year} © commercetools`}</Text.Detail>
        </div>
      </Spacings.Stack>
    </div>
  </div>
);
PublicPageContainer.displayName = 'PublicPageContainer';
PublicPageContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PublicPageContainer;
