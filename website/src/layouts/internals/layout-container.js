import React from 'react';
import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming';
import * as colors from '../../colors';

const LayoutContainer = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 50px 1fr;
  grid-template-columns: auto 1fr auto;
`;

// eslint-disable-next-line react/display-name
export default props => (
  <ThemeProvider
    theme={{ fontFamilyDefault: 'roboto mono', colorSolid: colors.light.text }}
  >
    <LayoutContainer {...props} />
  </ThemeProvider>
);
