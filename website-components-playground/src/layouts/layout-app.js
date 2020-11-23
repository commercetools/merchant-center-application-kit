import 'fontsource-open-sans/latin-300.css';
import 'fontsource-open-sans/latin-400.css';
import 'fontsource-open-sans/latin-600.css';
import 'fontsource-open-sans/latin-700.css';
import React from 'react';
import PropTypes from 'prop-types';
import { css, Global } from '@emotion/react';
import { customProperties } from '@commercetools-uikit/design-system';
import useWindowHeight from '../hooks/use-window-height';

const LayoutApp = (props) => {
  const height = useWindowHeight();
  React.useEffect(() => {
    window.parent.postMessage(['playground-height', height], '*');
  }, [height]);
  return (
    <>
      <Global
        styles={css`
          html,
          body {
            padding: 0;
            margin: 0;
            height: auto;
            color: ${customProperties.colorSolid};
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
