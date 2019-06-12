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
        color: ${colors.light.text};
        font-family: 'roboto mono', sans-serif;

        /* Keep it to 13px, so that the component examples have the "correct" size
        that we use in the MC. The content font size can be adjusted separately in
        the templates/markdown.js file. */
        font-size: 13px;
      }
    `}
  />
);
export default Globals;
