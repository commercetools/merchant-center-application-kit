import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Spacings } from '../../components';
import { colors, dimensions, typography, tokens } from '../../design-system';
import LogoSvg from '../../icons/logo.svg';

const MenuLogoContainer = styled.div`
  width: auto;
  height: 100%;
  display: flex;

  @media screen and (${dimensions.viewports.desktop}) {
    width: ${dimensions.widths.pageNavigation};
  }
`;
const LogoContainer = styled.div`
  padding: 0 ${dimensions.spacings.m};
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
// This is a normal HTML link as we need to force a redirect to the root domain
const LogoLink = styled.a`
  color: ${colors.light.textPrimary};
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  display: block;
`;
const LogoTitle = styled.div`
  display: none;
  font-size: ${typography.fontSizes.h4};

  @media screen and (${dimensions.viewports.desktop}) {
    display: block;
  }
`;
const DocumentationSwitcherContainer = styled.div`
  border-left: 1px solid ${colors.light.borderPrimary};
  color: ${colors.light.textSecondary};
  font-size: ${typography.fontSizes.body};
  padding: 0 0 0 1rem;
  margin: 0;
  height: calc(100% - 16px);
  display: flex;
  align-items: center;
`;

const LayoutHeader = props => (
  <header
    css={css`
      display: flex;
      align-items: center;
      flex: 1;
      grid-row: 1;
      grid-column: 1/4;
      height: ${dimensions.heights.header};
      width: 100%;
      padding: 0;
      margin: 0 auto;
      box-shadow: ${tokens.shadow1};
      z-index: 10;

      > * + * {
        margin: 0 0 0 ${dimensions.spacings.m};
      }

      @media screen and (${dimensions.viewports.desktop}) {
        > * + * {
          margin: 0 0 0 ${dimensions.spacings.xl};
        }
      }
    `}
  >
    <MenuLogoContainer>
      {/* Injected by React portal */}
      <div
        id="sidebar-menu-toggle"
        css={css`
          display: flex;
        `}
      />
      <LogoLink href="/">
        <LogoContainer>
          <Spacings.Inline scale="m" alignItems="center">
            <LogoSvg height={32} />
            <LogoTitle>{'Documentation'}</LogoTitle>
          </Spacings.Inline>
        </LogoContainer>
      </LogoLink>
    </MenuLogoContainer>
    <DocumentationSwitcherContainer>
      {props.siteTitle}
    </DocumentationSwitcherContainer>
  </header>
);
LayoutHeader.propTypes = {
  siteTitle: PropTypes.string.isRequired,
};

export default LayoutHeader;
