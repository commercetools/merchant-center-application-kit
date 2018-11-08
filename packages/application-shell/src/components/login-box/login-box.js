import React from 'react';
import PropTypes from 'prop-types';
import { LogoBWSVG } from '@commercetools-frontend/assets';
import Card from '../../from-core/card';
import styles from './login-box.mod.css';

const LoginBox = props => (
  <Card className={styles.box}>
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src={LogoBWSVG} />
      </div>
    </div>
    <div className={styles.holder} data-test="login-form">
      {props.children}
    </div>
  </Card>
);
LoginBox.displayName = 'LoginBox';
LoginBox.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoginBox;
