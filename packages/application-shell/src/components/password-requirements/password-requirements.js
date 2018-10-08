import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import requiredIf from 'react-required-if';
import styles from './password-requirements.mod.css';

const PasswordRequirements = props => (
  <div
    className={classnames(styles['password-requirements'], {
      [styles.expanded]: props.isExpanded,
    })}
  >
    {React.Children.map(props.children, child =>
      React.cloneElement(child, {
        shouldShowUnfulfilledAsError: props.shouldShowUnfulfilledAsError,
      })
    )}
  </div>
);

PasswordRequirements.displayName = 'PasswordRequirements';
PasswordRequirements.propTypes = {
  children: PropTypes.node.isRequired,
  isExpanded: requiredIf(
    PropTypes.bool,
    props => props.shouldShowUnfulfilledAsError
  ),
  shouldShowUnfulfilledAsError: PropTypes.bool,
};
export default PasswordRequirements;
