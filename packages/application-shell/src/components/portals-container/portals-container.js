import React from 'react';
import { PORTALS_CONTAINER_ID } from '@commercetools-frontend/constants';
import styles from './portals-container.mod.css';

// This is used so we can render all overlays inside here
// Otherwise (if appended to <body>), notifications will overlap it
const PortalsContainer = () => (
  <div id={PORTALS_CONTAINER_ID} className={styles.portals} />
);
PortalsContainer.displayName = 'PortalsContainer';

export default PortalsContainer;
