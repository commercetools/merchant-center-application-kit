import '@commercetools-uikit/design-system/materials/resets.css';
import { Global, css } from '@emotion/react';

const styles = css`
  html,
  body {
    font-size: var(--font-size-for-body);
    height: 100vh;
  }

  #app {
    height: 100%;
  }
`;

const GlobalStyles = () => <Global styles={styles} />;

export default GlobalStyles;
