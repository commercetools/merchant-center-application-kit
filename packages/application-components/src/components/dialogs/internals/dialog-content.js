import React from 'react';
import PropTypes from 'prop-types';
import styles from './dialog-styles.mod.css';

const DialogContent = props => (
  <div className={styles['dialog-content']}>{props.children}</div>
);
DialogContent.displayName = 'DialogContent';
DialogContent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DialogContent;
