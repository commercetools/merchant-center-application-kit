import PropTypes from 'prop-types';
import React from 'react';
import styles from './loading-placeholder.mod.css';

const LoadingPlaceholder = props => (
  <div className={styles[`${props.shape}-${props.size}`]} />
);
LoadingPlaceholder.displayName = 'LoadingPlaceholder';
LoadingPlaceholder.propTypes = {
  shape: PropTypes.oneOf(['dot', 'rect', 'square']).isRequired,
  size: PropTypes.oneOf(['s', 'm', 'l', 'xl']).isRequired,
};

export default LoadingPlaceholder;
