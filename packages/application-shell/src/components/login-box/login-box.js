import React from 'react';
import PropTypes from 'prop-types';
import LogoBWWhiteSVG from '@commercetools-frontend/assets/images/ct_logo_bw_white.svg';
import { Card } from '@commercetools-frontend/ui-kit';
import styles from './login-box.mod.css';

const LoginBox = props => (
  <div className={styles.container}>
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src={LogoBWWhiteSVG} />
      </div>
    </div>
    <Card className={styles.card} data-test="login-form">
      {props.children}
    </Card>
  </div>
);
LoginBox.displayName = 'LoginBox';
LoginBox.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoginBox;
