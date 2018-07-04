import React from 'react';
import PropTypes from 'prop-types';
import LogoSVG from '@commercetools-frontend/ui-kit/materials/images/ct-logo.svg';
import LoadingSpinner from '@commercetools-frontend/ui-kit/loading-spinner';
import styles from './application-loader.mod.css';

const ApplicationLoader = props => (
  <div className={styles.container}>
    <LoadingSpinner />
    {props.showLogo && <img src={LogoSVG} className={styles.logo} />}
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
