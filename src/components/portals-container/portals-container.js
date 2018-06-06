import React from 'react';
import styles from './portals-container.mod.css';

// This is used so we can render all overlays inside here
// Otherwise (if appended to <body>), notifications will overlap it
export const portalsContainerId = 'portals-container';

const PortalsContainer = () => (
  <div id={portalsContainerId} className={styles.portals} />
);
PortalsContainer.displayName = 'PortalsContainer';

export default PortalsContainer;
