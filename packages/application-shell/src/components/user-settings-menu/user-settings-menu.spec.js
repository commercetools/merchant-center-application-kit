import React from 'react';
import { shallow } from 'enzyme';
import { CaretDownIcon } from '@commercetools-frontend/ui-kit';
import MenuStateContainer from '../menu-state-container';
import { MCSupportFormURL } from '../../constants';
import UserSettingsMenu, { UserAvatar } from './user-settings-menu';

const createTestProps = props => ({
  firstName: 'John Test',
  lastName: 'Doe',
  gravatarHash: '20c9c1b252b46ab49d6f7a4cee9c3e68',
  ...props,
});

describe('rendering', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    props = createTestProps();
    wrapper = shallow(<UserSettingsMenu {...props} />);
  });

  it('should render <MenuStateContainer> wrapper', () => {
    expect(wrapper).toRender(MenuStateContainer);
  });

  describe('menu', () => {
    let menuStateContainerProps;
    let menuStateContainerRenderWrapper;
    beforeEach(() => {
      menuStateContainerProps = { isOpen: false, toggleMenu: jest.fn() };
      menuStateContainerRenderWrapper = shallow(
        wrapper.find(MenuStateContainer).prop('children')(
          menuStateContainerProps
        )
      );
    });
    it('should render div with click handler', () => {
      expect(
        menuStateContainerRenderWrapper.find('.settings-container')
      ).toHaveProp('onClick', menuStateContainerProps.toggleMenu);
    });
    it('should render WithMouseOverState(UserAvatar)', () => {
      expect(menuStateContainerRenderWrapper).toRender(
        'WithMouseOverState(UserAvatar)'
      );
    });
    describe('when menu is open', () => {
      beforeEach(() => {
        menuStateContainerProps = { isOpen: true, toggleMenu: jest.fn() };
        menuStateContainerRenderWrapper = shallow(
          wrapper.find(MenuStateContainer).prop('children')(
            menuStateContainerProps
          )
        );
      });
      it('should render matching tree', () => {
        expect(menuStateContainerRenderWrapper).toMatchSnapshot();
      });
      it('should render link to "/account/profile"', () => {
        expect(menuStateContainerRenderWrapper).toRender({
          to: '/account/profile',
        });
      });
      it('should render link to "/logout"', () => {
        expect(menuStateContainerRenderWrapper).toRender({
          href: '/logout?reason=user',
        });
      });
      it('should render link to "MCSupportFormURL', () => {
        expect(menuStateContainerRenderWrapper).toRender({
          href: MCSupportFormURL,
        });
      });
    });
    describe('when menu is closed', () => {
      beforeEach(() => {
        menuStateContainerProps = { isOpen: false, toggleMenu: jest.fn() };
        menuStateContainerRenderWrapper = shallow(
          wrapper.find(MenuStateContainer).prop('children')(
            menuStateContainerProps
          )
        );
      });
      it('should not render <Card>', () => {
        expect(menuStateContainerRenderWrapper).not.toRender('Card');
      });
    });
  });

  describe('<UserAvatar>', () => {
    const createUserAvatarProps = custom => ({
      ...createTestProps(),
      handleMouseOver: jest.fn(),
      handleMouseOut: jest.fn(),
      isMouseOver: false,
      ...custom,
    });
    beforeEach(() => {
      props = createUserAvatarProps();
      wrapper = shallow(<UserAvatar {...props} />);
    });

    it('should render `CaretDownIcon`', () => {
      expect(wrapper).toRender(CaretDownIcon);
    });

    it('should render `Avatar` component', () => {
      expect(wrapper).toRender('Avatar');
    });

    it('should pass prop firstName to `Avatar` component', () => {
      expect(wrapper.find('Avatar')).toHaveProp('firstName', 'John Test');
    });

    it('should pass prop lastName to `Avatar` component', () => {
      expect(wrapper.find('Avatar')).toHaveProp('lastName', 'Doe');
    });

    it('should pass prop `gravatarHash` to `Avatar` component', () => {
      expect(wrapper.find('Avatar')).toHaveProp(
        'gravatarHash',
        '20c9c1b252b46ab49d6f7a4cee9c3e68'
      );
    });
  });
});
