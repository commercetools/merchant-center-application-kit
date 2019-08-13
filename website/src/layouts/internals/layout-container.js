import React from 'react';
import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming';
import * as colors from '../../colors';

const LayoutContainer = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 50px ${props => (props.isMenuOpen ? 'auto 1fr' : '1fr')};
  grid-template-columns: auto 1fr auto;
  font-size: 1.3rem;

  @media only percy {
    /* Unset the 100vh to make view scrollable in order to take full page snapshots */
    height: auto;
  }
`;

// eslint-disable-next-line react/display-name
export default props => (
  <ThemeProvider
    theme={{ fontFamilyDefault: 'Barlow', colorSolid: colors.light.text }}
  >
    <LayoutContainer {...props} />
  </ThemeProvider>
);
