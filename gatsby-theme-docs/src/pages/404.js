import React from 'react';
import { css } from '@emotion/core';
import Globals from '../layouts/internals/globals';
import LayoutApplication from '../layouts/internals/layout-application';
import LayoutHeader from '../layouts/internals/layout-header';
import LayoutFooter from '../layouts/internals/layout-footer';
import LayoutMain from '../layouts/internals/layout-main';

const PageNotFound = () => (
  <React.Fragment>
    <Globals />
    <LayoutApplication>
      <LayoutHeader />
      <LayoutMain
        css={css`
          grid-column: 1/4;
        `}
      >
        <div>{'Page not found'}</div>
        <LayoutFooter />
      </LayoutMain>
    </LayoutApplication>
  </React.Fragment>
);

export default PageNotFound;
