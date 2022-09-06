import '@fontsource/open-sans/latin-300.css';
import '@fontsource/open-sans/latin-400.css';
import '@fontsource/open-sans/latin-600.css';
import '@fontsource/open-sans/latin-700.css';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { css, Global } from '@emotion/react';
import {
  designTokens,
  ThemeProvider,
} from '@commercetools-uikit/design-system';
import useWindowHeight from '../hooks/use-window-height';

const LayoutApp = (props) => {
  const height = useWindowHeight();
  useEffect(() => {
    window.parent.postMessage(['playground-height', height], '*');
  }, [height]);
  return (
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
            padding: 0;
            margin: 0;
            height: auto;
            color: ${designTokens.colorSolid};
            font-family: 'Open Sans', sans-serif;
            font-size: 13px;
          }
        `}
      />
      {props.children}
    </>
  );
};
LayoutApp.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutApp;
