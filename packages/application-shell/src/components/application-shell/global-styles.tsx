import { Global, css } from '@emotion/react';
import { customProperties } from '@commercetools-uikit/design-system';

const styles = css`
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  html,
  body {
    color: ${customProperties.colorSolid};
    font-family: 'Open Sans', sans-serif;
    font-size: 13px;
    margin: 0;
    padding: 0;
    height: 100vh;
  }

  html {
    box-sizing: border-box;
  }

  #app {
    height: 100%;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }

  button {
    cursor: pointer;
  }

  a {
    color: ${customProperties.colorPrimary};
    cursor: pointer;
    text-decoration: none;
    transition: color 0.2s ease-in;
  }

  p {
    color: ${customProperties.colorSolid};
    margin: 0;
  }
`;

const GlobalStyles = () => <Global styles={styles} />;

export default GlobalStyles;
