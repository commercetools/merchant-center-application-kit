import ReactDOM from 'react-dom';
import { css, Global } from '@emotion/react';
import Application from './application';

ReactDOM.render(
  <>
    <Global
      styles={css`
        *,
        *::before,
        *::after {
          box-sizing: inherit;
        }

        html,
        body {
          color: var(--color-solid);
          font-family: 'Open Sans', sans-serif;
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
    <Application />
  </>,
  document.getElementById('app')
);
