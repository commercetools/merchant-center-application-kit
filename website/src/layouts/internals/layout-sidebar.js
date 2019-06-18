import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import * as colors from '../../colors';
import { BurgerIcon } from '../../components';
import Navbar from './navbar';

const Container = styled.aside`
  position: relative;
  overflow: auto;
  grid-row: 2;
  flex-direction: column;
  border-right: 1px solid ${colors.light.cards};

  display: ${props => (props.isMenuOpen ? 'flex' : 'none')};
  grid-column: auto;

  @media screen and (min-width: 40em) {
    display: flex;
    width: 256px;
    grid-column: 1;
  }
`;

const MenuButton = styled.button`
  appearance: none;
  border: 0;
  color: inherit;
  padding: 2px;
  background-color: transparent;
  border-radius: 4px;

  :focus {
    outline: 1px solid ${colors.light.cards};
  }

  @media screen and (min-width: 40em) {
    display: none;
  }
`;

const LayoutSidebar = props => {
  const [portalNode, setPortalNode] = React.useState();
  React.useEffect(() => {
    setPortalNode(document.getElementById('sidebar-menu-toggle'));
  });
  return (
    <Container isMenuOpen={props.isMenuOpen}>
      <Navbar
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
