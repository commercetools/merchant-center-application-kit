import React from 'react';
import { css, Global } from '@emotion/core';
import { colors, typography } from '../../design-system';

// eslint-disable-next-line react/display-name
const Globals = () => (
  <Global
    styles={css`
      html,
      body {
        padding: 0;
        margin: 0;
        height: 100vh;
        color: ${colors.light.textPrimary};
        font-family: ${typography.fontFamilies.primary};
        font-size: 16px;
      }

      iframe {
        border: 0;
        outline: 0;
        padding: 0;
        margin: 0;
      }
    `}
  />
);
export default Globals;
