import React from 'react';
import LogoSVG from '@commercetools-local/ui-kit/materials/images/ct-logo.svg';
import LoadingSpinner from '@commercetools-local/ui-kit/loading-spinner';
import styles from './application-loader.mod.css';

const ApplicationLoader = () => (
  <div className={styles.container}>
    <LoadingSpinner />
    <img src={LogoSVG} className={styles.logo} />
  </div>
);
ApplicationLoader.displayName = 'ApplicationLoader';

export default ApplicationLoader;
