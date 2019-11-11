import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { ContentPagination, NotificationInfo, Markdown } from '../components';
import { dimensions, tokens } from '../design-system';
import PlaceholderPageHeaderSide from '../overrides/page-header-side';
import LayoutApplication from './internals/layout-application';
import LayoutHeader from './internals/layout-header';
import LayoutSidebar from './internals/layout-sidebar';
import LayoutMain from './internals/layout-main';
import LayoutFooter from './internals/layout-footer';
import Globals from './internals/globals';
import LayoutPageHeader from './internals/layout-page-header';
import LayoutPageHeaderSide from './internals/layout-page-header-side';
import LayoutPageNavigation from './internals/layout-page-navigation';
import LayoutPageContent from './internals/layout-page-content';

const GridArea = styled.div`
  grid-area: ${props => props.name};
`;
const ResizableGrid = styled.div`
  box-shadow: ${tokens.shadow1};
  position: relative;
  display: block;
  width: 100vw;

  @media screen and (${dimensions.viewports.desktop}) {
    display: grid;
    grid:
      [row1-start] 'left center right' auto [row1-end]
      / minmax(0, 100%) 1fr minmax(0, 100%);
    width: auto;
  }
`;

const LayoutContent = props => {
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const data = useStaticQuery(graphql`
    query GetTitle {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  return (
    <React.Fragment>
      <Globals />
      <LayoutApplication isMenuOpen={isMenuOpen}>
        <LayoutHeader siteTitle={data.site.siteMetadata.title} />
        <LayoutSidebar
          isMenuOpen={isMenuOpen}
          setMenuOpen={setMenuOpen}
          slug={props.pageContext.slug}
          siteTitle={data.site.siteMetadata.title}
        />
        <LayoutMain
          css={css`
            grid-column: 2;
            grid-row: 2;

            @media screen and (${dimensions.viewports.mobile}) {
              grid-column: 1/3;
              grid-row: ${isMenuOpen ? '3' : '2'};
            }
          `}
        >
          <ResizableGrid>
            <GridArea name="left" />
            <GridArea name="right" />
            <GridArea
              id="anchor-page-top"
              name="center"
              css={css`
                display: block;

                @media screen and (${dimensions.viewports.tablet}) {
                  display: grid;
                  grid-template-columns:
                    calc(
                      ${dimensions.widths.pageContent} +
                        ${dimensions.spacings.xl} * 2
                    )
                    0;
                  grid-template-rows: auto 1fr;
                }
                @media screen and (${dimensions.viewports.largeTablet}) {
                  grid-template-columns:
                    calc(
                      ${dimensions.widths.pageContent} +
                        ${dimensions.spacings.xl} * 2
                    )
                    ${dimensions.widths.pageNavigation};
                }
              `}
            >
              <LayoutPageHeader>
                <Markdown.H1>{props.pageData.frontmatter.title}</Markdown.H1>
              </LayoutPageHeader>
              <LayoutPageHeaderSide>
                <PlaceholderPageHeaderSide />
              </LayoutPageHeaderSide>
              <LayoutPageContent>
                {props.pageData.frontmatter.beta && (
                  <NotificationInfo flag="beta" />
                )}
                {props.children}
                <ContentPagination slug={props.pageContext.slug} />
              </LayoutPageContent>
              <LayoutPageNavigation
                pageTitle={
                  props.pageContext.shortTitle ||
                  props.pageData.frontmatter.title
                }
                tableOfContents={props.pageData.tableOfContents}
              />
            </GridArea>
          </ResizableGrid>
          <LayoutFooter />
        </LayoutMain>
      </LayoutApplication>
    </React.Fragment>
  );
};
LayoutContent.displayName = 'LayoutContent';
LayoutContent.propTypes = {
  pageContext: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    shortTitle: PropTypes.string,
  }).isRequired,
  pageData: PropTypes.shape({
    frontmatter: PropTypes.shape({
      title: PropTypes.string.isRequired,
      beta: PropTypes.bool,
    }).isRequired,
    tableOfContents: PropTypes.object.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

export default LayoutContent;
