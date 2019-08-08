import React from 'react';
import { useTransition, animated } from 'react-spring';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import {
  customProperties,
  Grid,
  Spacings,
} from '@commercetools-frontend/ui-kit';
import pkg from '../../package.json';
import * as colors from '../colors';
import DevelopItSvg from '../images/develop-it.svg';
import DeployItSvg from '../images/deploy-it.svg';
import RegisterItSvg from '../images/register-it.svg';
import { TextHighlight, SEO } from '../components';
import { LayoutMarketing } from '../layouts';

const SectionTitle = styled.div`
  font-size: 2rem;
`;
const PageContainer = styled.div`
  width: 90%;
  max-width: 1024px;
  margin: 72px auto;
`;
const ButtonLink = styled(Link)`
  padding: ${customProperties.spacingM} ${customProperties.spacingXl};
  text-decoration: none;
  font-size: 1.5rem;
  color: ${colors.light.text};
  background-color: ${colors.light.primarySoft};
  border: 1px solid ${colors.light.primary};
  border-bottom: 3px solid ${colors.light.primary};
  border-radius: ${customProperties.borderRadius6};
`;

const heroSlides = [
  { id: 0, component: DevelopItSvg },
  { id: 1, component: DeployItSvg },
  { id: 2, component: RegisterItSvg },
];

const AnimatedHeroSlides = () => {
  const [slideIndex, nextSlide] = React.useState(0);
  const transitions = useTransition(slideIndex, i => i, {
    from: { opacity: 0, transform: 'translate3d(0, 100%,0)' },
    enter: { opacity: 1, transform: 'translate3d(0,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(0, -50%,0)' },
  });
  React.useEffect(() => {
    setInterval(() => nextSlide(state => (state + 1) % 3), 3000);
  }, []);
  return (
    <>
      {transitions.map(({ item, props, key }) => {
        const Image = heroSlides[item].component;
        return (
          <animated.div
            key={key}
            style={{
              ...props,
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}
          >
            <Image width="100%" height="100%" />
          </animated.div>
        );
      })}
    </>
  );
};

const IndexPage = () => {
  const siteConfig = useStaticQuery(graphql`
    query GetAnimationsStatus {
      site {
        siteMetadata {
          disableAnimations
        }
      }
    }
  `);

  return (
    <LayoutMarketing>
      <SEO title="Home" keywords={pkg.keywords} />
      <PageContainer>
        <Grid
          gridGap={customProperties.spacingL}
          gridAutoColumns="1fr"
          gridTemplateColumns="repeat(auto-fit, minmax(350px, 1fr))"
        >
          <Grid.Item>
            <div
              css={css`
                width: 100%;
                height: 250px;
                position: relative;
              `}
            >
              {siteConfig.site.siteMetadata.disableAnimations ===
              true ? null : (
                <AnimatedHeroSlides />
              )}
            </div>
          </Grid.Item>
          <Grid.Item>
            <Spacings.Stack scale="xl">
              <div
                css={css`
                  flex-grow: 1;
                  font-size: 3rem;
                `}
              >
                <TextHighlight>
                  {'Develop applications for the Merchant Center'}
                </TextHighlight>
              </div>
              <div
                css={css`
                  display: flex;
                  justify-content: flex-start;
                `}
              >
                <ButtonLink to="/getting-started">{'Get started'}</ButtonLink>
              </div>
            </Spacings.Stack>
          </Grid.Item>
        </Grid>
      </PageContainer>
      <PageContainer>
        <Grid
          gridGap={customProperties.spacingL}
          gridAutoColumns="1fr"
          gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
        >
          <Grid.Item>
            <SectionTitle>
              {'🚀 '}
              <TextHighlight>{'Built on modern technologies'}</TextHighlight>
            </SectionTitle>
            <p>
              {
                'Develop JavaScript applications with React, GraphQL, Webpack and other modern technologies.'
              }
            </p>
          </Grid.Item>
          <Grid.Item>
            <SectionTitle>
              {'🎨 '}
              <TextHighlight>{'Based on a solid Design System'}</TextHighlight>
            </SectionTitle>
            <p>
              {
                'Merchant Center applications are built and designed according to our Design System, which provides rules, patterns and best practices to ease development and focus on the business logic.'
              }
            </p>
          </Grid.Item>
          <Grid.Item>
            <SectionTitle>
              {'📦 '}
              <TextHighlight>{'Zero config development tools'}</TextHighlight>
            </SectionTitle>
            <p>
              {
                'Focus more on implementing the right features instead of configuration. Our packages provide all the necessary tools to get started seamlessly.'
              }
            </p>
          </Grid.Item>
        </Grid>
      </PageContainer>
    </LayoutMarketing>
  );
};
IndexPage.displayName = 'IndexPage';

export default IndexPage;
