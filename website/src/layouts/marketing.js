import React from 'react';
import PropTypes from 'prop-types';
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
  display: grid;
  grid:
    [row1-start] 'header-logo header' ${designSystem
      .dimensions.heights.header} [row1-end]
    / auto 1fr;

  @media screen and (${designSystem.dimensions.viewports.laptop}) {
    grid:
      [row1-start] 'header-logo header' ${designSystem.dimensions.heights
        .header} [row1-end]
      / ${designSystem.dimensions.widths.pageNavigationSmall} 1fr;
  }
  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    grid:
      [row1-start] 'header-logo header' ${designSystem.dimensions.heights
        .header} [row1-end]
      / ${designSystem.dimensions.widths.pageNavigation} 1fr;
  }
`;
const LogoContainer = styled.div`
  grid-area: header-logo;
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
  // State for the top menu
  const [isTopMenuOpen, setIsTopMenuOpen] = React.useState(false);
  const toggleTopMenu = React.useCallback(() => {
    setIsTopMenuOpen(prev => !prev);
  }, [setIsTopMenuOpen]);
  const closeTopMenu = React.useCallback(() => {
    setIsTopMenuOpen(false);
  }, [setIsTopMenuOpen]);

  // State for the search dialog
  const [isSearchDialogOpen, setIsSearchDialogOpen] = React.useState(false);
  const openSearchDialog = React.useCallback(() => {
    setIsSearchDialogOpen(true);
    // Additionally make sure to close the top menu
    closeTopMenu();
  }, [setIsSearchDialogOpen, closeTopMenu]);
  const closeSearchDialog = React.useCallback(() => {
    setIsSearchDialogOpen(false);
  }, [setIsSearchDialogOpen]);

  const siteData = useSiteData();
  return (
    <Container>
      <HeaderContainer>
        <LogoContainer>
          <LogoButton />
        </LogoContainer>
        <LayoutHeader
          siteTitle={siteData.siteMetadata.title}
          excludeFromSearchIndex={process.env.NODE_ENV === 'production'}
          isSearchDialogOpen={isSearchDialogOpen}
          openSearchDialog={openSearchDialog}
          closeSearchDialog={closeSearchDialog}
          isTopMenuOpen={isTopMenuOpen}
          toggleTopMenu={toggleTopMenu}
          closeTopMenu={closeTopMenu}
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
