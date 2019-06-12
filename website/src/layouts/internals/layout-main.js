import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

const LayoutMain = props => (
  <div
    role="main"
    className={props.className}
    css={css`
      grid-row: 2;
      min-width: 0;
      overflow-x: hidden;
      overflow-y: scroll; /* has to be scroll, not auto */
      -webkit-overflow-scrolling: touch; /* enables "momentum" style scrolling */
      display: flex;
      flex-direction: column;
      position: relative;
    `}
  >
    <div
      css={css`
        flex-grow: 1;
        display: flex;
        flex-direction: column;
      `}
    >
      {props.children}
    </div>
  </div>
);
LayoutMain.displayName = 'LayoutMain';
LayoutMain.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default LayoutMain;
