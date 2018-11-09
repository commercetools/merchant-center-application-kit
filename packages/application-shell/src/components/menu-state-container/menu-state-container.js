import React from 'react';
import PropTypes from 'prop-types';

class MenuStateContainer extends React.Component {
  static displayName = 'MenuState';
  static propTypes = {
    children: PropTypes.func.isRequired,
  };

  toggleMenu = () =>
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));

  state = {
    isOpen: false,
  };

  render() {
    return this.props.children({
      isOpen: this.state.isOpen,
      toggleMenu: this.toggleMenu,
    });
  }
}

export default MenuStateContainer;
