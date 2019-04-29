import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import { css, Global } from '@emotion/core';
import * as colors from '../colors';
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

  const [isMenuOpen, setMenuOpen] = React.useState(false);

  return (
    <React.Fragment>
      <Global
        styles={css`
          html,
          body {
            padding: 0;
            margin: 0;
            height: 100vh;
            font-family: 'roboto mono';
            color: ${colors.light.text};
          }
        `}
      />

      <div
        css={css`
          height: 100vh;
          display: grid;
          grid-template-rows: 50px 1fr;
          grid-template-columns: auto 1fr;
        `}
      >
        <Header
          css={css`
            grid-row: 1;
            grid-column: 1/3;
            height: 50px;
            width: 90%;
            margin: 0 auto;
          `}
          siteTitle={data.site.siteMetadata.title}
          isMenuOpen={isMenuOpen}
          toggleMenu={() => {
            setMenuOpen(!isMenuOpen);
          }}
        />
        {props.showSidebar && (
          <aside
            css={css`
              position: relative;
              grid-row: 2;
              flex-direction: column;
              border-right: 1px solid ${colors.light.cards};

              display: ${isMenuOpen ? 'flex' : 'none'};
              grid-column: 1/3;

              @media screen and (min-width: 40em) {
                display: flex;
                width: 256px;
                grid-column: 1;
              }
            `}
          >
            <Navbar
              onLinkClick={() => {
                setMenuOpen(false);
              }}
            />
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

            grid-column: 1/3;
            grid-row: ${isMenuOpen ? '3' : '2'};

            @media screen and (min-width: 40em) {
              grid-column: 2;
              grid-row: 2;
            }
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
            {props.showSidebar && <Pagination />}
            {props.showFooter && <Footer />}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
Layout.displayName = 'Layout';
Layout.propTypes = {
  showSidebar: PropTypes.bool,
  showFooter: PropTypes.bool,
  children: PropTypes.node.isRequired,
};
Layout.defaultProps = {
  showSidebar: true,
  showFooter: true,
};

export default Layout;
