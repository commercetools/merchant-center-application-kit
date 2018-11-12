import React from 'react';
import styles from './butler-container.mod.css';

const ButlerContainer = React.memo(props => (
  <div
    className={styles.container}
    tabIndex="-1"
    // omit this.props of react-loadable
    {...props}
  />
));
ButlerContainer.displayName = 'ButlerContainer';

export default ButlerContainer;
