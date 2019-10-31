import React from 'react';
import PropTypes from 'prop-types';
import { css, keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import { Spacings } from '../../components';
import StackedLinesIndentedIcon from '../../images/icons/stacked-lines-indented-icon.svg';
import { colors, dimensions, typography, tokens } from '../../design-system';
import PageNavigation from './page-navigation';

const slideInAnimation = keyframes`
  from { margin-right: -100%; }
  to { margin-right: 0; }
`;
const ContainerOverlay = styled.div`
  ${props => {
    if (props.isMenuOpen) {
      return css`
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 20;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        justify-content: flex-end;
      `;
    }
    return css``;
  }}

  display: ${props => (props.isMenuOpen ? 'flex' : 'none')};
  overflow: auto;

  @media screen and (${dimensions.viewports.largeTablet}) {
    display: none;
  }
`;
const SlidingContainer = styled.div`
  background-color: ${colors.light.surfacePrimary};
  animation: ${slideInAnimation} 0.5s ease-out alternate;
  width: ${dimensions.widths.pageNavigation};
  height: 100%;
  overflow: auto;
`;
const GridContainer = styled.div`
  border-left: 1px solid ${colors.light.borderPrimary};
  width: ${dimensions.widths.pageNavigation};
  display: none;

  @media screen and (${dimensions.viewports.largeTablet}) {
    display: block;
    grid-row: 2;
    grid-column: 2;
  }
`;
const StickyContainer = styled.div`
  position: sticky;
  top: ${dimensions.spacings.xxl};
`;
const PageTitleLink = styled.a`
  color: ${colors.light.textSecondary};
  font-size: ${typography.fontSizes.extraSmall};
  padding: ${dimensions.spacings.s} ${dimensions.spacings.m} 0;
  border-left: 1px solid transparent;
  text-decoration: none;
  :hover {
    color: ${colors.light.linkNavigation};
    svg {
      * {
        fill: ${colors.light.linkNavigation};
      }
    }
  }
  :hover,
  :active {
    outline-width: 0;
  }
`;
const RoundButton = styled.button`
  display: flex;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.5);
  border: 1px solid ${colors.light.borderPrimary};
  border-radius: ${dimensions.spacings.m};
  box-shadow: ${tokens.shadow1};
  width: ${dimensions.spacings.xl};
  height: ${dimensions.spacings.xl};
  position: fixed;
  top: calc(${dimensions.heights.header} + ${dimensions.spacings.m});
  right: ${dimensions.spacings.m};
  cursor: pointer;

  > svg {
    height: ${dimensions.spacings.m};
    width: ${dimensions.spacings.m};
  }

  :hover {
    box-shadow: ${tokens.shadow8};
  }

  @media screen and (${dimensions.viewports.largeTablet}) {
    display: none;
  }
`;

const LayoutPageNavigation = props => {
  const [isMenuOpen, setMenuOpen] = React.useState(false);

  if (!props.tableOfContents) return null;
  if (
    !props.tableOfContents.items ||
    (props.tableOfContents.items && props.tableOfContents.items.length === 0)
  )
    return null;

  const navigationContainer = (
    <Spacings.Stack scale="m">
      <PageTitleLink href="#anchor-page-top">
        <Spacings.Inline scale="s" alignItems="center">
          <div>{props.pageTitle}</div>
          <StackedLinesIndentedIcon />
        </Spacings.Inline>
      </PageTitleLink>
      <PageNavigation tableOfContents={props.tableOfContents} />
    </Spacings.Stack>
  );
  return (
    <>
      <RoundButton
        onClick={() => {
          setMenuOpen(true);
        }}
      >
        <StackedLinesIndentedIcon />
      </RoundButton>
      <ContainerOverlay
        isMenuOpen={isMenuOpen}
        onClick={() => {
          setMenuOpen(false);
        }}
      >
        <SlidingContainer>{navigationContainer}</SlidingContainer>
      </ContainerOverlay>

      <GridContainer>
        <StickyContainer>{navigationContainer}</StickyContainer>
      </GridContainer>
    </>
  );
};
LayoutPageNavigation.displayName = 'LayoutPageNavigation';
LayoutPageNavigation.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  tableOfContents: PropTypes.shape({
    items: PropTypes.array,
  }),
};

export default LayoutPageNavigation;
