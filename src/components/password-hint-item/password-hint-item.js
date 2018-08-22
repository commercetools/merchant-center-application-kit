import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  SuccessIcon,
  CloseBoldIcon,
} from '@commercetools-frontend/ui-kit/icons';
import styles from './password-hint-item.mod.css';

const PasswordHintItem = props => (
  <div className={styles['password-hint-item']}>
    <span className={styles.icon}>
      {props.fulfilled && <SuccessIcon size="medium" theme="green" />}
      {!props.fulfilled &&
        props.checkUnfulfilled && <CloseBoldIcon size="medium" theme="red" />}
    </span>
    <div
      className={classnames(styles.hint, {
        [styles.fulfilled]: props.fulfilled,
        [styles['un-fulfilled']]: !props.fulfilled && props.checkUnfulfilled,
        [styles.unchecked]: !props.fulfilled && !props.checkUnfulfilled,
      })}
    >
      {props.children}
    </div>
  </div>
);

PasswordHintItem.displayName = 'PasswordHintItem';
PasswordHintItem.propTypes = {
  children: PropTypes.node.isRequired,
  fulfilled: PropTypes.bool,
  checkUnfulfilled: PropTypes.bool,
};
export default PasswordHintItem;
