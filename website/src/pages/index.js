import React from 'react';
import { useStaticQuery, graphql, withPrefix } from 'gatsby';
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
import MessageBasedOnDesignSystem from './fragments/based-on-design-system.mdx';
import MessageBuiltOnModernTechnologies from './fragments/built-on-modern-technologies.mdx';
import MessageZeroConfigDevelopmentTools from './fragments/zero-config-development-tools.mdx';

const SectionTitle = styled.div`
  color: ${designSystem.colors.light.primary};
  font-size: ${designSystem.typography.fontSizes.body};
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
  position: relative;
  background-color: ${designSystem.colors.light.surfaceCode};
  background-image: url('${withPrefix('/Liquid-Cheese.svg')}');
  background-attachment: fixed;
  background-size: cover;

  @media screen and (${designSystem.dimensions.viewports.tablet}) {
    background-size: auto;
  }
  @media screen and (${designSystem.dimensions.viewports.largeDesktop}) {
    background-size: cover;
  }

  /* License with attribution of the background by SVGBackgrounds.com */
`;
const MainBannerConstraint = styled.div`
  width: calc(100% - ${designSystem.dimensions.spacings.m} * 2);
  max-width: ${designSystem.dimensions.widths.pageContent};
  padding: ${designSystem.dimensions.spacings.big}
    ${designSystem.dimensions.spacings.m};

  > * + * {
    margin: ${designSystem.dimensions.spacings.l} 0 0;
  }

  @media screen and (${designSystem.dimensions.viewports.tablet}) {
    width: calc(100% - ${designSystem.dimensions.spacings.large} * 2);
    padding: ${designSystem.dimensions.spacings.big}
      ${designSystem.dimensions.spacings.large};
  }
`;
const SectionContainer = styled.div`
  box-shadow: ${designSystem.tokens.shadowForPageContent};
  z-index: 1;
  width: 100%;
`;
const Section = styled.div`
  width: calc(100% - ${designSystem.dimensions.spacings.m} * 2);
  max-width: calc(
    ${designSystem.dimensions.widths.marketingContent} -
      ${designSystem.dimensions.spacings.m} * 2
  );
  padding: ${designSystem.dimensions.spacings.big}
    ${designSystem.dimensions.spacings.m};

  > * + * {
    margin: ${designSystem.dimensions.spacings.l} 0 0;
  }

  @media screen and (${designSystem.dimensions.viewports.tablet}) {
    width: calc(100% - ${designSystem.dimensions.spacings.large} * 2);
    max-width: calc(
      ${designSystem.dimensions.widths.marketingContent} -
        ${designSystem.dimensions.spacings.large} * 2
    );
    padding: ${designSystem.dimensions.spacings.big}
      ${designSystem.dimensions.spacings.large};
  }
  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    width: calc(100% - ${designSystem.dimensions.spacings.large} * 2);
    max-width: calc(
      ${designSystem.dimensions.widths.marketingContent} -
        ${designSystem.dimensions.spacings.large} * 2
    );
    padding: ${designSystem.dimensions.spacings.big}
      ${designSystem.dimensions.spacings.large};
  }
`;
const ButtonLink = styled(Link)`
  display: inline-block;
  padding: ${designSystem.dimensions.spacings.s}
    ${designSystem.dimensions.spacings.m};
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

  @media screen and (${designSystem.dimensions.viewports.tablet}) {
    grid-auto-columns: 1fr;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
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
            <ButtonLink
              href="/getting-started/what-is-a-custom-application"
              noUnderline={true}
            >
              {'Learn about Custom Applications'}
            </ButtonLink>
          </div>
        </MainBannerConstraint>
      </MainBanner>
      <SectionContainer>
        <Section>
          <GridContainer>
            <Card>
              <SpacingsStack scale="m">
                <SpacingsStack scale="s">
                  <ScreenCogIcon />
                  <SectionTitle>{'Built on modern technologies'}</SectionTitle>
                </SpacingsStack>
                <SectionBody>
                  <MessageBuiltOnModernTechnologies />
                </SectionBody>
              </SpacingsStack>
            </Card>
            <Card>
              <SpacingsStack scale="m">
                <SpacingsStack scale="s">
                  <ScreenDesignToolIcon />
                  <SectionTitle>
                    {'Based on a solid Design System'}
                  </SectionTitle>
                </SpacingsStack>
                <SectionBody>
                  <MessageBasedOnDesignSystem />
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
                  <MessageZeroConfigDevelopmentTools />
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
                title: 'Application Kit',
                links: [
                  {
                    to: `${siteData.siteMetadata.repositoryUrl}/releases/latest`,
                    label: `Latest: ${siteData.siteMetadata.publishedVersions.latest}`,
                  },
                  {
                    to: `${siteData.siteMetadata.repositoryUrl}/releases/tag/${siteData.siteMetadata.publishedVersions.next}`,
                    label: `Next: ${siteData.siteMetadata.publishedVersions.next}`,
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
        </Section>
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
        excludeFromSearchIndex={false}
      />
      <PageMarketingContent />
    </LayoutMarketing>
  </ThemeProvider>
);

export default PageMarketingTemplate;
