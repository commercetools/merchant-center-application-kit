import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { css, keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import { colors, dimensions } from '../../design-system';
import { BurgerIcon } from '../../components';
import Sidebar from './sidebar';

const slideInAnimation = keyframes`
  from { margin-left: -100%; }
  to { margin-left: 0; }
`;
const ContainerOverlay = styled.div`
  ${props => {
    if (props.isMenuOpen) {
      return css`
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1;
        position: fixed;
        top: ${dimensions.heights.header};
        left: 0;
        right: 0;
        bottom: 0;
      `;
    }
    return css`
      position: relative;
      grid-row: 2;
      grid-column: 1/3;
    `;
  }}

  display: ${props => (props.isMenuOpen ? 'flex' : 'none')};
  overflow: auto;

  @media screen and (${dimensions.viewports.desktop}) {
    display: flex;
    grid-column: 1;

    background: unset;
    z-index: unset;
    position: unset;
    top: unset;
    left: unset;
    right: unset;
    bottom: unset;
  }
`;
const Container = styled.aside`
  position: relative;
  overflow: auto;
  background-color: ${colors.light.surfaceSecondary1};
  border-right: 1px solid ${colors.light.borderPrimary};
  width: ${dimensions.widths.pageNavigation};
  height: 100%;
  z-index: 2;

  animation: ${slideInAnimation} 0.5s ease-out alternate;
  @media screen and (${dimensions.viewports.desktop}) {
    animation: unset;
  }
`;
const MenuButton = styled.button`
  appearance: none;
  border: 0;
  color: inherit;
  cursor: pointer;
  padding: ${dimensions.spacings.s} ${dimensions.spacings.m};
  background-color: ${colors.light.surfaceSecondary1};
  transition: background-color 0.5s;

  > svg {
    stroke: ${colors.light.surfaceSecondary3};
    transition: stroke 0.5s;
  }

  :focus {
    outline: 1px solid ${colors.light.surfaceSecondary3};
  }
  :hover {
    background-color: ${colors.light.surfaceSecondary3};
    > svg {
      stroke: ${colors.light.surfaceSecondary1};
    }
  }

  @media screen and (${dimensions.viewports.desktop}) {
    display: none;
  }
`;

const LayoutSidebar = props => {
  const [portalNode, setPortalNode] = React.useState();
  React.useEffect(() => {
    setPortalNode(document.getElementById('sidebar-menu-toggle'));
  }, []);
  return (
    <ContainerOverlay
      isMenuOpen={props.isMenuOpen}
      onClick={() => {
        props.setMenuOpen(false);
      }}
    >
      <Container
        isMenuOpen={props.isMenuOpen}
        onClick={event => {
          event.stopPropagation();
        }}
      >
        <Sidebar
          onLinkClick={() => {
            props.setMenuOpen(false);
          }}
          permalink={props.permalink}
        />
        {portalNode &&
          ReactDOM.createPortal(
            <MenuButton
              onClick={() => {
                props.setMenuOpen(!props.isMenuOpen);
              }}
            >
              <BurgerIcon isActive={props.isMenuOpen} />
            </MenuButton>,
            portalNode
          )}
      </Container>
    </ContainerOverlay>
  );
};
LayoutSidebar.displayName = 'LayoutSidebar';
LayoutSidebar.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
  setMenuOpen: PropTypes.func.isRequired,
  permalink: PropTypes.string.isRequired,
};

export default LayoutSidebar;
