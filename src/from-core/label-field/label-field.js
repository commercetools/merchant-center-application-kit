import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import RequiredIndicator from '../required-indicator';
import styles from './label-field.mod.css';

export const LabelField = ({ title, subtitle, isRequired, className }) => (
  <div>
    <label className={classnames(className, styles['label-wrapper'])}>
      <span className={styles.label}>
        <span>{title}</span>
        {isRequired ? <RequiredIndicator /> : null}
      </span>
    </label>
    {subtitle && (
      <div className={styles.description}>
        <span className={styles.text}>{subtitle}</span>
      </div>
    )}
  </div>
);
LabelField.displayName = 'LabelField';
LabelField.defaultProps = {
  isRequired: false,
};
LabelField.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  isRequired: PropTypes.bool,

  // for custom styles
  className: PropTypes.string,
};

export default LabelField;
