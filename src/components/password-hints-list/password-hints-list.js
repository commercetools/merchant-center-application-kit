import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './password-hints-list.mod.css';

const PasswordHintsList = props => (
  <div
    className={classnames(styles['password-hints-list'], {
      [styles.expanded]: props.isExpanded,
    })}
  >
    {React.Children.map(props.children, child =>
      React.cloneElement(child, {
        checkUnfulfilled: props.checkUnfulfilled,
      })
    )}
  </div>
);

PasswordHintsList.displayName = 'PasswordHintsList';
PasswordHintsList.propTypes = {
  children: PropTypes.node.isRequired,
  isExpanded: PropTypes.bool,
  checkUnfulfilled: PropTypes.bool,
};
export default PasswordHintsList;
