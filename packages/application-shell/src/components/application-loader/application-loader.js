import React from 'react';
import PropTypes from 'prop-types';
import { LoadingSpinner } from '@commercetools-frontend/ui-kit';
import CTLogoSVG from '@commercetools-frontend/assets/images/ct-logo.svg';
import styles from './application-loader.mod.css';

const ApplicationLoader = props => (
  <div className={styles.container}>
    <LoadingSpinner />
    {props.showLogo && <img src={CTLogoSVG} className={styles.logo} />}
  </div>
);
ApplicationLoader.displayName = 'ApplicationLoader';
ApplicationLoader.propTypes = {
  showLogo: PropTypes.bool,
};
ApplicationLoader.defaultProps = {
  showLogo: false,
};

export default ApplicationLoader;
