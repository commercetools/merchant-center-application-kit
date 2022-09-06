import ReactDOM from 'react-dom';
import { css, Global } from '@emotion/react';
import {
  designTokens,
  ThemeProvider,
} from '@commercetools-uikit/design-system';
import { PortalsContainer } from '@commercetools-frontend/application-components';
import Application from './application';

ReactDOM.render(
  <>
    <ThemeProvider />
    <Global
      styles={css`
        *,
        *::before,
        *::after {
          box-sizing: inherit;
        }

        html,
        body {
          color: ${designTokens.colorSolid};
          font-family: ${designTokens.fontFamilyDefault};
          font-size: 13px;
          margin: 0;
          padding: 0;
          height: 100vh;
        }

        html {
          box-sizing: border-box;
        }
      `}
    />
    <PortalsContainer />
    <Application />
  </>,
  document.getElementById('app')
);
