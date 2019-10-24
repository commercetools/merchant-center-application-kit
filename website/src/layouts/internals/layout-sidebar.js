import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { colors, dimensions } from '../../design-system';
import { BurgerIcon } from '../../components';
import Sidebar from './sidebar';

const Container = styled.aside`
  position: relative;
  overflow: auto;
  grid-row: 2;
  flex-direction: column;
  background-color: ${colors.light.surfaceSecondary1};
  border-right: 1px solid ${colors.light.borderPrimary};

  display: ${props => (props.isMenuOpen ? 'flex' : 'none')};
  grid-column: 1/3;

  @media screen and (${dimensions.viewports.tablet}) {
    display: flex;
    width: ${dimensions.widths.pageNavigation};
    grid-column: 1;
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

  @media screen and (${dimensions.viewports.tablet}) {
    display: none;
  }
`;

const LayoutSidebar = props => {
  const [portalNode, setPortalNode] = React.useState();
  React.useEffect(() => {
    setPortalNode(document.getElementById('sidebar-menu-toggle'));
  }, []);
  return (
    <Container isMenuOpen={props.isMenuOpen}>
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
  );
};
LayoutSidebar.displayName = 'LayoutSidebar';
LayoutSidebar.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
  setMenuOpen: PropTypes.func.isRequired,
  permalink: PropTypes.string.isRequired,
};

export default LayoutSidebar;
