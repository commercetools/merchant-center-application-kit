import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  SuccessIcon,
  CloseBoldIcon,
} from '@commercetools-frontend/ui-kit/icons';
import styles from './password-requirement.mod.css';

const PasswordRequirement = props => {
  const showUnfulfilledError =
    !props.fulfilled && props.shouldShowUnfulfilledAsError;
  return (
    <div className={styles['password-requirement']}>
      <span className={styles.icon}>
        {props.fulfilled && <SuccessIcon size="medium" theme="green" />}
        {showUnfulfilledError && <CloseBoldIcon size="medium" theme="red" />}
      </span>
      <div
        className={classnames(styles.requirement, {
          [styles.fulfilled]: props.fulfilled,
          [styles.unfulfilled]: showUnfulfilledError,
        })}
      >
        {props.children}
      </div>
    </div>
  );
};

PasswordRequirement.displayName = 'PasswordRequirement';
PasswordRequirement.propTypes = {
  children: PropTypes.node.isRequired,
  fulfilled: PropTypes.bool,
  shouldShowUnfulfilledAsError: PropTypes.bool,
};
export default PasswordRequirement;
