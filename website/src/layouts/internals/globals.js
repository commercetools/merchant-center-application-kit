import React from 'react';
import { css, Global } from '@emotion/core';
import { colors, dimensions, typography } from '../../design-system';

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
        font-size: ${typography.rootFontSize};
      }

      iframe {
        border: 0;
        outline: 0;
        padding: 0;
        margin: 0;
      }

      .section-h4 {
        padding: 0 0 0 ${dimensions.spacings.l};
      }
    `}
  />
);
export default Globals;
