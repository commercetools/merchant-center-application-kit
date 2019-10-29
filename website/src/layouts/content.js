import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { useStaticQuery, graphql } from 'gatsby';
import { customProperties } from '@commercetools-frontend/ui-kit';
import {
  ContentPagination,
  NotificationInfo,
  Markdown,
  ExternalLink,
  Spacings,
} from '../components';
import { dimensions } from '../design-system';
import GitHubSvg from '../images/icons/github.svg';
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
  box-shadow: ${customProperties.shadow1};
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
const RepositoryLinks = () => {
  const data = useStaticQuery(graphql`
    query GetCurrentVersion {
      site {
        siteMetadata {
          currentVersion
          repositoryUrl
        }
      }
    }
  `);
  return (
    <div
      css={css`
        padding: ${dimensions.spacings.m};
      `}
    >
      <Spacings.Inline scale="l" alignItems="center" justifyContent="flex-end">
        <ExternalLink
          href={`${data.site.siteMetadata.repositoryUrl}/releases/tag/v${data.site.siteMetadata.currentVersion}`}
        >
          {`v${data.site.siteMetadata.currentVersion}`}
        </ExternalLink>
        <ExternalLink href={data.site.siteMetadata.repositoryUrl}>
          <GitHubSvg />
        </ExternalLink>
      </Spacings.Inline>
    </div>
  );
};

const LayoutContent = props => {
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  return (
    <React.Fragment>
      <Globals />
      <LayoutApplication isMenuOpen={isMenuOpen}>
        <LayoutHeader />
        <LayoutSidebar
          isMenuOpen={isMenuOpen}
          setMenuOpen={setMenuOpen}
          permalink={props.pageData.frontmatter.permalink}
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
                {props.pageData.frontmatter.beta && (
                  <NotificationInfo flag="beta" />
                )}
                <Markdown.H1>{props.pageData.frontmatter.title}</Markdown.H1>
              </LayoutPageHeader>
              <LayoutPageHeaderSide>
                <RepositoryLinks />
              </LayoutPageHeaderSide>
              <LayoutPageContent>
                {props.children}
                <ContentPagination
                  permalink={props.pageData.frontmatter.permalink}
                />
              </LayoutPageContent>
              <LayoutPageNavigation
                pageTitle={props.pageData.frontmatter.title}
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
  pageData: PropTypes.shape({
    frontmatter: PropTypes.shape({
      title: PropTypes.string,
      permalink: PropTypes.string,
      beta: PropTypes.bool,
    }).isRequired,
    tableOfContents: PropTypes.object.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

export default LayoutContent;
