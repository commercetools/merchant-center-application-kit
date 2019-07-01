import React from 'react';
import { useTransition, animated } from 'react-spring';
import { Link } from 'gatsby';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import {
  customProperties,
  Grid,
  Spacings,
} from '@commercetools-frontend/ui-kit';
import { stripIndent } from 'common-tags';
import pkg from '../../package.json';
import * as colors from '../colors';
import DevelopItSvg from '../images/develop-it.svg';
import DeployItSvg from '../images/deploy-it.svg';
import RegisterItSvg from '../images/register-it.svg';
import { TextHighlight, SEO } from '../components';
import { LayoutMarketing } from '../layouts';
import CodeSnippetNpmInstall from './code-snippets/getting-started-npm-install.mdx';
import CodeSnippetNpxInstall from './code-snippets/getting-started-npx-install.mdx';

const SectionTitle = styled.div`
  font-size: 1.5rem;
`;
const PageContainer = styled.div`
  width: 90%;
  margin: 48px auto;
`;
const ButtonLink = styled(Link)`
  border: 3px solid ${colors.light.primary};
  padding: ${customProperties.spacingM};
  text-decoration: none;
  font-size: 1.5rem;
  color: ${colors.light.text};
  background-color: ${colors.light.cards};

  :hover {
    color: ${colors.light.primary};
    background-color: ${colors.light.surface};
  }
`;
const Code = styled.code`
  background-color: ${colors.light.cards};
  color: ${colors.light.primary};
  padding: 2px 4px;
  font-size: 1rem;
`;

const heroSlides = [
  { id: 0, component: DevelopItSvg },
  { id: 1, component: DeployItSvg },
  { id: 2, component: RegisterItSvg },
];

const IndexPage = () => {
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
            </div>
          </Grid.Item>
          <Grid.Item>
            <Spacings.Stack scale="m">
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
                  margin-top: ${customProperties.spacingL};
                  display: flex;
                  justify-content: flex-start;
                `}
              >
                <ButtonLink to="/getting-started">
                  {'Get started 🙌'}
                </ButtonLink>
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
      <PageContainer
        css={css`
          max-width: 864px;
        `}
      >
        <Spacings.Stack>
          <SectionTitle>{'Quick Start'}</SectionTitle>
          <p
            css={css`
              font-size: 0.8rem;
            `}
          >
            {
              'We provide starter templates that you can install and run right away:'
            }
          </p>
          <CodeSnippetNpmInstall />
          <p
            css={css`
              font-size: 0.8rem;
            `}
          >
            {'Or using '}
            <Code>{'npx'}</Code>
          </p>
          <CodeSnippetNpxInstall />
        </Spacings.Stack>
      </PageContainer>
    </LayoutMarketing>
  );
};
IndexPage.displayName = 'IndexPage';

export default IndexPage;
