import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {
  LayoutHeader,
  Footer,
  useSiteData,
} from '@commercetools-docs/gatsby-theme-docs';
import { designSystem } from '@commercetools-docs/ui-kit';
import LandingPageBackground from '../images/landing-page-background.png';

const Container = styled.div`
  height: 100vh;
  display: grid;
  grid:
    [row1-start] 'header' ${designSystem.dimensions.heights.header} [row1-end]
    [row2-start] 'main' 1fr [row2-end]
    [row3-start] 'footer' auto [row3-end]
    / 1fr;
`;
const Main = styled.div`
  grid-area: main;
  display: flex;
  flex-direction: column;
  overflow: hidden auto;
`;
const Content = styled.div`
  box-shadow: ${designSystem.tokens.shadow1};
  background: url('${LandingPageBackground}');
  background-repeat: repeat-x;
  background-position-x: center;
  background-position-y: -25rem;
  padding: ${designSystem.dimensions.spacings.xl} ${designSystem.dimensions.spacings.m};
  flex: 1;
  z-index: 1;

  > * + * {
    margin-top: ${designSystem.dimensions.spacings.xl} !important;
  }

  @media screen and (${designSystem.dimensions.viewports.largeTablet}) {
    background-position-y: -40rem;
    padding: ${designSystem.dimensions.spacings.xl};
  }
`;
const LayoutFooter = styled.div`
  grid-area: footer;
  width: 100%;
  background-color: ${designSystem.colors.light.surfaceSecondary2};
`;
const FooterConstraint = styled.div`
  max-width: ${designSystem.dimensions.widths.marketingContent};
  margin: 0 auto;
`;

const LayoutMarketing = props => {
  const siteData = useSiteData();
  return (
    <Container>
      <LayoutHeader
        siteTitle={siteData.siteMetadata.title}
        constraintWidth={designSystem.dimensions.widths.marketingContent}
      />
      <Main>
        <Content>{props.children}</Content>
        <LayoutFooter>
          <FooterConstraint>
            <Footer />
          </FooterConstraint>
        </LayoutFooter>
      </Main>
    </Container>
  );
};
LayoutMarketing.displayName = 'LayoutMarketing';
LayoutMarketing.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutMarketing;
