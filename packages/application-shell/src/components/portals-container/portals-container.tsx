import { css } from '@emotion/react';
import { PORTALS_CONTAINER_ID } from '@commercetools-frontend/constants';

// This is used so we can render all overlays inside here
// Otherwise (if appended to <body>), notifications will overlap it
const PortalsContainer = () => (
  <div
    id={PORTALS_CONTAINER_ID}
    // The container needs a height in order to be tabbable: https://reactjs/react-modal#774
    css={css`
      display: flex;
      height: 1px;
      margin-top: -1px;
    `}
  />
);
PortalsContainer.displayName = 'PortalsContainer';

export default PortalsContainer;
