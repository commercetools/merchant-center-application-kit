import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash.omit';
import styles from './butler-container.mod.css';

const ButlerContainer = props =>
  // render no overlay in case of loding error, just show nothing then
  props.timedOut || props.error ? null : (
    <div
      className={styles.container}
      tabIndex="-1"
      // omit props of react-loadable
      {...omit(props, ['error', 'timedOut', 'pastDelay', 'isLoading', 'retry'])}
    />
  );
ButlerContainer.displayName = 'ButlerContainer';
ButlerContainer.propTypes = {
  timedOut: PropTypes.bool,
  error: PropTypes.any,
};

export default ButlerContainer;
