import React from 'react';
import { css } from '@emotion/core';
import { PORTALS_CONTAINER_ID } from '@commercetools-frontend/constants';

// This is used so we can render all overlays inside here
// Otherwise (if appended to <body>), notifications will overlap it
const PortalsContainer = () => (
  <div
    id={PORTALS_CONTAINER_ID}
    css={css`
      display: flex;
      height: 1px;
      margin-top: -1px;
    `}
  />
);
PortalsContainer.displayName = 'PortalsContainer';

export default PortalsContainer;
