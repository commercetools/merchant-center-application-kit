import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './required-indicator.mod.css';

const RequiredIndicator = ({ uncolored }) => (
  <em className={classnames({ [styles.colored]: !uncolored })}>{'*'}</em>
);
RequiredIndicator.displayName = 'RequiredIndicator';
RequiredIndicator.propTypes = {
  uncolored: PropTypes.bool,
};

export default RequiredIndicator;
