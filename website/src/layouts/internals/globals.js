import React from 'react';
import { css, Global } from '@emotion/core';
import * as colors from '../../colors';

// eslint-disable-next-line react/display-name
const Globals = () => (
  <Global
    styles={css`
      html,
      body {
        padding: 0;
        margin: 0;
        height: 100vh;
        font-family: 'roboto mono', sans-serif;
        color: ${colors.light.text};
      }
    `}
  />
);
export default Globals;
