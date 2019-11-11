import React from 'react';
import PropTypes from 'prop-types';
import { css, Global } from '@emotion/core';
import { customProperties } from '@commercetools-frontend/ui-kit';

const LayoutApp = props => (
  <>
    <Global
      styles={css`
        html,
        body {
          padding: 0;
          margin: 0;
          height: 100vh;
          color: ${customProperties.colorSolid};
          font-family: 'Open Sans', sans-serif;
          font-size: 13px;
        }
      `}
    />
    {props.children}
  </>
);
LayoutApp.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutApp;
