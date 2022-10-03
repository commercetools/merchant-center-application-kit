import { Global, css } from '@emotion/react';
import { customProperties } from '@commercetools-uikit/design-system';

const appStyles = css`
  #app {
    height: 100%;
  }
`;

const gridStyles = css`
.row
  clear: both;
  float: left;
  width: 100%;
}

.col-3 {
  float: left;
  width: 25%;
}

.col-4 {
  float: left;
  width: 33.333%;
}

.col-5 {
  float: left;
  width: 41.666%;
}

.col-6 {
  float: left;
  width: 50%;
}

.col-7 {
  float: left;
  width: 58.333%;
}

.col-8 {
  float: left;
  width: 66.666%;
}

.col-12 {
  float: left;
  width: 100%;
}
`;

const resetStyles = css`
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

const GlobalStyles = () => (
  <>
    <Global styles={appStyles} />
    <Global styles={gridStyles} />
    <Global styles={resetStyles} />
  </>
);

export default GlobalStyles;
