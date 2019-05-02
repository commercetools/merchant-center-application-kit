import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import LayoutContainer from './internals/layout-container';
import LayoutHeader from './internals/layout-header';
import LayoutSidebar from './internals/layout-sidebar';
import LayoutFooter from './internals/layout-footer';
import LayoutMain from './internals/layout-main';
import Globals from './internals/globals';
import ContentPagination from './internals/content-pagination';

const LayoutContent = props => {
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  return (
    <React.Fragment>
      <Globals />
      <LayoutContainer>
        <LayoutHeader />
        <LayoutSidebar isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} />
        <LayoutMain
          columns={3}
          css={css`
            grid-column: 1/3;
            grid-row: ${isMenuOpen ? '3' : '2'};

            @media screen and (min-width: 40em) {
              grid-column: 2;
              grid-row: 2;
            }
          `}
        >
          {props.children}
          <ContentPagination />
          <LayoutFooter />
        </LayoutMain>
      </LayoutContainer>
    </React.Fragment>
  );
};
LayoutContent.displayName = 'LayoutContent';
LayoutContent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutContent;
