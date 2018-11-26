import React from 'react';
import PropTypes from 'prop-types';
import styles from './butler-container.mod.css';

const ButlerContainer = props => (
  <div className={styles.container} tabIndex={-1} {...props}>
    {props.children}
  </div>
);
ButlerContainer.displayName = 'ButlerContainer';
ButlerContainer.propTypes = {
  children: PropTypes.node,
};

export default ButlerContainer;
