import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Spacings, Text } from '@commercetools-frontend/ui-kit';
import PortalsContainer from '../portals-container';
import styles from './public-page-container.mod.css';
import messages from './messages';

const year = new Date().getUTCFullYear();

const PublicPageContainer = props => (
  <React.Fragment>
    <PortalsContainer />
    <div className={styles.container}>
      <Spacings.Stack scale="m">
        {props.children}
        <Spacings.Inline justifyContent="space-between">
          <a
            href={`https://commercetools.com/privacy#suppliers`}
            target="_blank"
          >
            <Text.Detail>
              <FormattedMessage {...messages.privacyPolicy} />
            </Text.Detail>
          </a>
          <Text.Detail>{`${year} © commercetools`}</Text.Detail>
        </Spacings.Inline>
      </Spacings.Stack>
    </div>
  </React.Fragment>
);
PublicPageContainer.displayName = 'PublicPageContainer';
PublicPageContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PublicPageContainer;
