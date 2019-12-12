import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import pkg from '../../package.json';
import {
  SEO,
  Markdown,
  ThemeProvider,
  designSystem,
  useSiteData,
} from '@commercetools-docs/gatsby-theme-docs';
import Card from '@commercetools-uikit/card';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import LayoutMarketing from '../layouts/marketing';
import LinksCard from '../components/links-card';
import LandingPageRocket from '../icons/landing-page-rocket.svg';
import ScreenCogIcon from '../icons/screen-cog-icon.svg';
import ScreenDesignToolIcon from '../icons/screen-design-tool-icon.svg';
import ScreenBulbIcon from '../icons/screen-bulb-icon.svg';

const SectionTitle = styled.div`
  color: ${designSystem.colors.light.primary};
  font-size: ${designSystem.typography.fontSizes.h4};
`;
const SectionBody = styled.div`
  color: ${designSystem.colors.light.textPrimary};
  font-size: ${designSystem.typography.fontSizes.small};
  line-height: 1.5;
`;
const PageContainer = styled.div`
  width: 100%;
  max-width: ${designSystem.dimensions.widths.marketingContent};
  margin: 0 auto;
`;
const ButtonLink = styled(Markdown.Link)`
  display: inline-block;
  padding: ${designSystem.dimensions.spacings.m}
    ${designSystem.dimensions.spacings.l};
  text-decoration: none;
  font-size: ${designSystem.typography.fontSizes.body};
  color: ${designSystem.colors.light.textPrimary};
  background-color: ${designSystem.colors.light.surfacePrimary};
  border: 1px solid ${designSystem.colors.light.surfacePrimary};
  border-radius: ${designSystem.tokens.borderRadius6};

  :hover {
    background-color: ${designSystem.colors.light.surfaceQuote};
    color: ${designSystem.colors.light.linkNavigation};
  }
`;
const GridContainer = styled.div`
  display: grid;
  grid-gap: ${designSystem.dimensions.spacings.l};
  grid-auto-columns: 1fr;
  grid-template-columns: repeat(
    auto-fit,
    minmax(${designSystem.dimensions.widths.pageNavigation}, 1fr)
  );
`;

const PageMarketingContent = () => {
  const siteData = useSiteData();
  const data = useStaticQuery(graphql`
    query GetMainResourcesLinks {
      allNavigationYaml {
        nodes {
          chapterTitle
          pages {
            path
          }
        }
      }
    }
  `);
  return (
    <>
      <PageContainer>
        <div
          css={css`
            padding: 0;

            @media screen and (${designSystem.dimensions.viewports
                .largeTablet}) {
              padding: calc(${designSystem.dimensions.spacings.xl} * 2);
            }
          `}
        >
          <div
            css={css`
              display: grid;
              grid-gap: ${designSystem.dimensions.spacings.xl};
              grid-template-rows: auto;
              grid-template-columns: 1fr;

              @media screen and (${designSystem.dimensions.viewports
                  .largeTablet}) {
                grid-template-columns: 2fr 1fr;
              }
            `}
          >
            <div
              css={css`
                > * + * {
                  margin: ${designSystem.dimensions.spacings.xl} 0 0;
                }
              `}
            >
              <div
                css={css`
                  font-size: ${designSystem.typography.fontSizes.h1};
                  color: ${designSystem.colors.light.textInverted};
                `}
              >
                {'Develop applications for the Merchant Center'}
              </div>
              <div>
                <ButtonLink href="/getting-started/what-is-a-custom-application">
                  {'Get started'}
                </ButtonLink>
              </div>
            </div>
            <div
              css={css`
                justify-self: center;
              `}
            >
              <LandingPageRocket height={300} />
            </div>
          </div>
        </div>
      </PageContainer>
      <PageContainer>
        <Card
          css={css`
            > div {
              padding: ${designSystem.dimensions.spacings.xl}
                ${designSystem.dimensions.spacings.l};

              @media screen and (${designSystem.dimensions.viewports.tablet}) {
                padding: calc(${designSystem.dimensions.spacings.l} * 2)
                  calc(${designSystem.dimensions.spacings.xl} * 2);
              }
            }
          `}
        >
          <GridContainer>
            <SpacingsStack scale="m">
              <SpacingsStack scale="s">
                <ScreenCogIcon />
                <SectionTitle>{'Built on modern technologies'}</SectionTitle>
              </SpacingsStack>
              <SectionBody>
                {
                  'Develop JavaScript applications with React, GraphQL, Webpack and other modern technologies.'
                }
              </SectionBody>
            </SpacingsStack>
            <SpacingsStack scale="m">
              <SpacingsStack scale="s">
                <ScreenDesignToolIcon />
                <SectionTitle>{'Based on a solid Design System'}</SectionTitle>
              </SpacingsStack>
              <SectionBody>
                {
                  'Merchant Center applications are built and designed according to our Design System, which provides rules, patterns and best practices to ease development and focus on the business logic.'
                }
              </SectionBody>
            </SpacingsStack>
            <SpacingsStack scale="m">
              <SpacingsStack scale="s">
                <ScreenBulbIcon />
                <SectionTitle>{'Zero config development tools'}</SectionTitle>
              </SpacingsStack>
              <SectionBody>
                {
                  'Focus more on implementing the right features instead of configuration. Our packages provide all the necessary tools to get started seamlessly.'
                }
              </SectionBody>
            </SpacingsStack>
          </GridContainer>
        </Card>
      </PageContainer>
      <PageContainer>
        <LinksCard
          linksData={[
            {
              title: 'Documentation',
              links: data.allNavigationYaml.nodes
                .filter(node => node.pages && node.pages.length > 0)
                .map(node => {
                  const firstChapterPage = node.pages[0];
                  return {
                    to: firstChapterPage.path,
                    label: node.chapterTitle,
                  };
                }),
            },
            {
              title: 'Resources',
              links: [
                {
                  to: siteData.siteMetadata.repositoryUrl,
                  label: 'GitHub',
                },
                {
                  to: 'https://github.com/commercetools/ui-kit',
                  label: 'UI-Kit',
                },
                {
                  to: 'https://docs.commercetools.com',
                  label: 'commercetools platform',
                },
              ],
            },
            {
              title: 'Releases',
              links: [
                {
                  to: `${siteData.siteMetadata.repositoryUrl}/releases/tag/v${siteData.siteMetadata.currentVersion}`,
                  label: `v${siteData.siteMetadata.currentVersion}`,
                },
                {
                  to: `${siteData.siteMetadata.repositoryUrl}/blob/master/CONTRIBUTING.md`,
                  label: 'Contributing',
                },
                {
                  to: `${siteData.siteMetadata.repositoryUrl}/blob/master/LICENSE`,
                  label: 'MIT license',
                },
              ],
            },
          ]}
        />
      </PageContainer>
    </>
  );
};
PageMarketingContent.displayName = 'PageMarketingContent';

const PageMarketingTemplate = () => (
  <ThemeProvider>
    <LayoutMarketing>
      <SEO
        title="Develop applications for the Merchant Center"
        keywords={pkg.keywords}
        excludeFromSearchIndex={true}
      />
      <PageMarketingContent />
    </LayoutMarketing>
  </ThemeProvider>
);

export default PageMarketingTemplate;
