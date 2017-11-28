import React from 'react';
import PropTypes from 'prop-types';
import PortalsContainer from '@commercetools-local/core/components/portals-container';
import styles from './public-page-container.mod.css';

const year = new Date().getUTCFullYear();

const PublicPageContainer = props => (
  <div className={styles.container}>
    <PortalsContainer />
    {props.children}
    <p className={styles.copyright}>{`${year} © commercetools`}</p>
  </div>
);
PublicPageContainer.displayName = 'PublicPageContainer';
PublicPageContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PublicPageContainer;
