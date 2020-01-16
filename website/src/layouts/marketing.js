import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import styled from '@emotion/styled';
import {
  LayoutHeader,
  Footer,
  useSiteData,
} from '@commercetools-docs/gatsby-theme-docs';
import { designSystem, LogoButton } from '@commercetools-docs/ui-kit';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
const LogoContainer = styled.div`
  display: none;

  @media screen and (${designSystem.dimensions.viewports.laptop}) {
    height: ${designSystem.dimensions.heights.header};
    width: ${designSystem.dimensions.widths.pageNavigationSmall};
    background-color: ${designSystem.colors.light.surfacePrimary};
    border-bottom: 1px solid ${designSystem.colors.light.borderPrimary};
    display: flex;
    justify-content: flex-end;
  }
  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    width: ${designSystem.dimensions.widths.pageNavigation};
  }
`;
const Main = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const LayoutFooter = styled.div`
  grid-area: footer;
  width: 100%;
  background-color: ${designSystem.colors.light.surfaceSecondary2};
`;
const FooterConstraint = styled.div`
  max-width: ${designSystem.dimensions.widths.pageContent};
  margin: 0 auto;
`;

const LayoutMarketing = props => {
  const [isSearchDialogOpen, setIsSearchDialogOpen] = React.useState(false);
  const openSearchDialog = React.useCallback(() => {
    setIsSearchDialogOpen(true);
  }, [setIsSearchDialogOpen]);
  const closeSearchDialog = () => {
    setIsSearchDialogOpen(false);
  };
  const siteData = useSiteData();
  const data = useStaticQuery(graphql`
    query GetSitePageContext {
      sitePage {
        context {
          excludeFromSearchIndex
        }
      }
    }
  `);
  return (
    <Container>
      <HeaderContainer>
        <LogoContainer>
          <LogoButton />
        </LogoContainer>
        <LayoutHeader
          siteTitle={siteData.siteMetadata.title}
          excludeFromSearchIndex={data.sitePage.context.excludeFromSearchIndex}
          isSearchDialogOpen={isSearchDialogOpen}
          openSearchDialog={openSearchDialog}
          closeSearchDialog={closeSearchDialog}
        />
      </HeaderContainer>
      <Main>{props.children}</Main>
      <LayoutFooter>
        <FooterConstraint>
          <Footer />
        </FooterConstraint>
      </LayoutFooter>
    </Container>
  );
};
LayoutMarketing.displayName = 'LayoutMarketing';
LayoutMarketing.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutMarketing;
