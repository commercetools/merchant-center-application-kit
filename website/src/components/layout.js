import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import { css, Global } from '@emotion/core';
import { customProperties } from '@commercetools-frontend/ui-kit';
import Header from './header';
import Navbar from './navbar';
import Pagination from './pagination';
import Footer from './footer';

const Layout = props => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <React.Fragment>
      <Global
        styles={css`
          html,
          body {
            padding: 0;
            margin: 0;
            height: 100vh;
            font-family: ${customProperties.fontFamilyDefault};
          }
        `}
      />

      <div
        css={css`
          height: 100vh;
          display: grid;
          grid-template-rows: 96px 1fr;
          grid-template-columns: auto 1fr;
        `}
      >
        <Header
          css={css`
            grid-row: 1;
            grid-column: 1/3;
            height: 96px;
          `}
          siteTitle={data.site.siteMetadata.title}
        />
        {props.showSidebar && (
          <aside
            css={css`
              position: relative;
              grid-row: 2;
              display: flex;
              flex-direction: column;
              width: 256px;
              border-right: 1px solid ${customProperties.colorGray};
              background-color: ${customProperties.colorNavy95};
            `}
          >
            <Navbar />
          </aside>
        )}
        <div
          role="main"
          css={css`
            grid-column: 2;
            grid-row: 2;

            /*
                Allow this flex child to grow smaller than its smallest content.
                This is needed when there is a really wide text inside that would stretch
                this node to be wider than the parent.
              */
            min-width: 0;
            overflow-x: hidden;
            overflow-y: scroll;

            /*
                layout the children. There will always be the page and side notification
                about the actual content. The content should stretch to fill the rest of
                the page.
              */
            display: flex;
            flex-direction: column;

            /*
                set position to relative to layout notifications and modals
              */
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
            <Pagination />
            <Footer />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
Layout.displayName = 'Layout';
Layout.propTypes = {
  showSidebar: PropTypes.bool,
  children: PropTypes.node.isRequired,
};
Layout.defaultProps = {
  showSidebar: true,
};

export default Layout;
