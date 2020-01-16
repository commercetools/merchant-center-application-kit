import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from '@emotion/styled';
import pkg from '../../package.json';
import {
  SEO,
  Link,
  ThemeProvider,
  useSiteData,
} from '@commercetools-docs/gatsby-theme-docs';
import { designSystem } from '@commercetools-docs/ui-kit';
import { customProperties } from '@commercetools-uikit/design-system';
import Card from '@commercetools-uikit/card';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import LayoutMarketing from '../layouts/marketing';
import LinksCard from '../components/links-card';
import ScreenCogIcon from '../icons/screen-cog-icon.svg';
import ScreenDesignToolIcon from '../icons/screen-design-tool-icon.svg';
import ScreenBulbIcon from '../icons/screen-bulb-icon.svg';

const SectionTitle = styled.div`
  color: ${designSystem.colors.light.primary};
  font-size: ${designSystem.typography.fontSizes.h4};
  letter-spacing: 3px;
`;
const SectionBody = styled.div`
  color: ${designSystem.colors.light.textPrimary};
  font-size: ${designSystem.typography.fontSizes.small};
  line-height: 1.5;
`;
const PageTitle = styled.h1`
  font-size: ${designSystem.typography.fontSizes.h1};
  font-weight: ${designSystem.typography.fontWeights.regular};
  color: ${designSystem.colors.light.textInverted};
`;
const MainBanner = styled.div`
  width: 100%;
  background-color: ${designSystem.colors.light.surfaceCode};
`;
const MainBannerConstraint = styled.div`
  width: 100%;
  max-width: ${designSystem.dimensions.widths.marketingContent};
  padding: ${designSystem.dimensions.spacings.m};

  > * + * {
    margin: ${designSystem.dimensions.spacings.l} 0 0;
  }

  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    padding: ${designSystem.dimensions.spacings.xl};
  }
`;
const SectionContainer = styled.div`
  width: calc(100% - ${designSystem.dimensions.spacings.m} * 2);
  max-width: calc(
    ${designSystem.dimensions.widths.marketingContent} -
      ${designSystem.dimensions.spacings.m} * 2
  );
  padding: ${designSystem.dimensions.spacings.l}
    ${designSystem.dimensions.spacings.m};

  > * + * {
    margin: ${designSystem.dimensions.spacings.l} 0 0;
  }

  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    width: calc(100% - ${designSystem.dimensions.spacings.xl} * 2);
    max-width: calc(
      ${designSystem.dimensions.widths.marketingContent} -
        ${designSystem.dimensions.spacings.xl} * 2
    );
    padding: ${designSystem.dimensions.spacings.l}
      ${designSystem.dimensions.spacings.xl};
  }
`;
const ButtonLink = styled(Link)`
  display: inline-block;
  padding: ${designSystem.dimensions.spacings.m}
    ${designSystem.dimensions.spacings.l};
  text-decoration: none !important;
  font-size: ${designSystem.typography.fontSizes.body};
  color: ${designSystem.colors.light.textPrimary} !important;
  background-color: ${designSystem.colors.light.surfacePrimary};
  border: 1px solid ${designSystem.colors.light.surfacePrimary};
  border-radius: ${customProperties.borderRadius6};

  :hover {
    background-color: ${designSystem.colors.light.surfaceQuote};
    color: ${designSystem.colors.light.linkNavigation} !important;
  }
`;
const GridContainer = styled.div`
  width: 100%;
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
      <MainBanner>
        <MainBannerConstraint>
          <PageTitle>
            {'Develop applications for the Merchant Center'}
          </PageTitle>
          <div>
            <ButtonLink href="/getting-started/what-is-a-custom-application">
              {'Learn about custom applications'}
            </ButtonLink>
          </div>
        </MainBannerConstraint>
      </MainBanner>
      <SectionContainer>
        <GridContainer>
          <Card>
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
          </Card>
          <Card>
            <SpacingsStack scale="m">
              <SpacingsStack scale="s">
                <ScreenDesignToolIcon />
                <SectionTitle>{'Based on a solid Design System'}</SectionTitle>
              </SpacingsStack>
              <SectionBody>
                {
                  'Merchant Center custom applications are built and designed according to our Design System. It provides rules, patterns and best practices to ease development and focus on the business logic.'
                }
              </SectionBody>
            </SpacingsStack>
          </Card>
          <Card>
            <SpacingsStack scale="m">
              <SpacingsStack scale="s">
                <ScreenBulbIcon />
                <SectionTitle>{'Zero config development tools'}</SectionTitle>
              </SpacingsStack>
              <SectionBody>
                {
                  'Focus more on implementing the right features instead of configuration. Our open source packages provide all the necessary tools and components to get started seamlessly.'
                }
              </SectionBody>
            </SpacingsStack>
          </Card>
        </GridContainer>
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
                  label: 'App-Kit',
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
      </SectionContainer>
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
