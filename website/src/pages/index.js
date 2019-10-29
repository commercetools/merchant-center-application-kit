import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Grid } from '@commercetools-frontend/ui-kit';
import pkg from '../../package.json';
import { colors, dimensions, typography, tokens } from '../design-system';
import { Card, SEO, LinksCard, Spacings } from '../components';
import { LayoutMarketing } from '../layouts';
import LandingPageRocket from '../images/icons/landing-page-rocket.svg';
import ScreenCogIcon from '../images/icons/screen-cog-icon.svg';
import ScreenDesignToolIcon from '../images/icons/screen-design-tool-icon.svg';
import ScreenBulbIcon from '../images/icons/screen-bulb-icon.svg';

const SectionTitle = styled.div`
  color: ${colors.light.primary};
  font-size: ${typography.fontSizes.h4};
`;
const SectionBody = styled.div`
  color: ${colors.light.textPrimary};
  font-size: ${typography.fontSizes.small};
  line-height: 1.5;
`;
const PageContainer = styled.div`
  width: 100%;
  max-width: ${dimensions.widths.marketingContent};
  margin: 0 auto;
`;
const ButtonLink = styled(Link)`
  display: inline-block;
  padding: ${dimensions.spacings.m} ${dimensions.spacings.l};
  text-decoration: none;
  font-size: ${typography.fontSizes.body};
  color: ${colors.light.textPrimary};
  background-color: ${colors.light.surfacePrimary};
  border: 1px solid ${colors.light.surfacePrimary};
  border-radius: ${tokens.borderRadius6};
`;

const MarketingLandingPage = () => {
  const data = useStaticQuery(graphql`
    query GetMainResourcesLinks {
      site {
        siteMetadata {
          currentVersion
          repositoryUrl
        }
      }
      allSideNavigationYaml {
        edges {
          node {
            label
            groupKey
          }
        }
      }
    }
  `);
  return (
    <LayoutMarketing>
      <SEO
        title="Develop applications for the Merchant Center"
        keywords={pkg.keywords}
      />
      <PageContainer>
        <div
          css={css`
            padding: 0;

            @media screen and (${dimensions.viewports.largeTablet}) {
              padding: calc(${dimensions.spacings.xl} * 2);
            }
          `}
        >
          <div
            css={css`
              display: grid;
              grid-gap: ${dimensions.spacings.xl};
              grid-template-rows: auto;
              grid-template-columns: 1fr;

              @media screen and (${dimensions.viewports.largeTablet}) {
                grid-template-columns: 2fr 1fr;
              }
            `}
          >
            <div
              css={css`
                > * + * {
                  margin: ${dimensions.spacings.xl} 0 0;
                }
              `}
            >
              <div
                css={css`
                  font-size: ${typography.fontSizes.h1};
                  color: white;
                `}
              >
                {'Develop applications for the Merchant Center'}
              </div>
              <div>
                <ButtonLink to="getting-started">{'Get started'}</ButtonLink>
              </div>
            </div>
            <div
              css={css`
                justify-self: center;
              `}
            >
              <LandingPageRocket />
            </div>
          </div>
        </div>
      </PageContainer>
      <PageContainer>
        <Card
          css={css`
            > div {
              padding: ${dimensions.spacings.xl} ${dimensions.spacings.l};

              @media screen and (${dimensions.viewports.tablet}) {
                padding: calc(${dimensions.spacings.l} * 2)
                  calc(${dimensions.spacings.xl} * 2);
              }
            }
          `}
        >
          <Grid
            gridGap={dimensions.spacings.l}
            gridAutoColumns="1fr"
            gridTemplateColumns={`repeat(auto-fit, minmax(${dimensions.widths.pageNavigation}, 1fr))`}
          >
            <Grid.Item>
              <Spacings.Stack scale="m">
                <Spacings.Stack scale="s">
                  <ScreenCogIcon />
                  <SectionTitle>{'Built on modern technologies'}</SectionTitle>
                </Spacings.Stack>
                <SectionBody>
                  {
                    'Develop JavaScript applications with React, GraphQL, Webpack and other modern technologies.'
                  }
                </SectionBody>
              </Spacings.Stack>
            </Grid.Item>
            <Grid.Item>
              <Spacings.Stack scale="m">
                <Spacings.Stack scale="s">
                  <ScreenDesignToolIcon />
                  <SectionTitle>
                    {'Based on a solid Design System'}
                  </SectionTitle>
                </Spacings.Stack>
                <SectionBody>
                  {
                    'Merchant Center applications are built and designed according to our Design System, which provides rules, patterns and best practices to ease development and focus on the business logic.'
                  }
                </SectionBody>
              </Spacings.Stack>
            </Grid.Item>
            <Grid.Item>
              <Spacings.Stack scale="m">
                <Spacings.Stack scale="s">
                  <ScreenBulbIcon />
                  <SectionTitle>{'Zero config development tools'}</SectionTitle>
                </Spacings.Stack>
                <SectionBody>
                  {
                    'Focus more on implementing the right features instead of configuration. Our packages provide all the necessary tools to get started seamlessly.'
                  }
                </SectionBody>
              </Spacings.Stack>
            </Grid.Item>
          </Grid>
        </Card>
      </PageContainer>
      <PageContainer>
        <LinksCard
          linksData={[
            {
              title: 'Documentation',
              links: data.allSideNavigationYaml.edges.map(edge => ({
                to: `/${edge.node.groupKey}`,
                label: edge.node.label,
              })),
            },
            {
              title: 'Resources',
              links: [
                {
                  to: data.site.siteMetadata.repositoryUrl,
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
                  to: `${data.site.siteMetadata.repositoryUrl}/releases/tag/v${data.site.siteMetadata.currentVersion}`,
                  label: `v${data.site.siteMetadata.currentVersion}`,
                },
                {
                  to: `${data.site.siteMetadata.repositoryUrl}/blob/master/CONTRIBUTING.md`,
                  label: 'Contributing',
                },
                {
                  to: `${data.site.siteMetadata.repositoryUrl}/blob/master/LICENSE`,
                  label: 'MIT license',
                },
              ],
            },
          ]}
        />
      </PageContainer>
    </LayoutMarketing>
  );
};
MarketingLandingPage.displayName = 'MarketingLandingPage';

export default MarketingLandingPage;
