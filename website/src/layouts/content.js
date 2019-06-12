import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import LayoutContainer from './internals/layout-container';
import LayoutHeader from './internals/layout-header';
import LayoutSidebar from './internals/layout-sidebar';
import LayoutTOC from './internals/layout-toc';
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
          css={css`
            grid-column: auto;
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
        <LayoutTOC tableOfContents={props.pageData.tableOfContents} />
      </LayoutContainer>
    </React.Fragment>
  );
};
LayoutContent.displayName = 'LayoutContent';
LayoutContent.propTypes = {
  pageData: PropTypes.shape({
    tableOfContents: PropTypes.object.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

export default LayoutContent;
