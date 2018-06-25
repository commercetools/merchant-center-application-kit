import React from 'react';
import { shallow } from 'enzyme';
import { CaretDownIcon } from '@commercetools-frontend/ui-kit/icons';
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

  it('should render <Downshift> wrapper', () => {
    expect(wrapper).toRender('Downshift');
  });

  describe('menu', () => {
    let downshiftProps;
    let dowshiftRenderWrapper;
    beforeEach(() => {
      downshiftProps = { isOpen: false, toggleMenu: jest.fn() };
      dowshiftRenderWrapper = shallow(
        wrapper.find('Downshift').prop('render')(downshiftProps)
      );
    });
    it('should render div with click handler', () => {
      expect(dowshiftRenderWrapper.find('.settings-container')).toHaveProp(
        'onClick',
        downshiftProps.toggleMenu
      );
    });
    it('should render WithMouseOverState(UserAvatar)', () => {
      expect(dowshiftRenderWrapper).toRender('WithMouseOverState(UserAvatar)');
    });
    describe('when menu is open', () => {
      beforeEach(() => {
        downshiftProps = { isOpen: true, toggleMenu: jest.fn() };
        dowshiftRenderWrapper = shallow(
          wrapper.find('Downshift').prop('render')(downshiftProps)
        );
      });
      it('should render matching tree', () => {
        expect(dowshiftRenderWrapper).toMatchSnapshot();
      });
      it('should render link to "/account/profile"', () => {
        expect(dowshiftRenderWrapper).toRender({ to: '/account/profile' });
      });
      it('should render link to "/logout"', () => {
        expect(dowshiftRenderWrapper).toRender({ href: '/logout?reason=user' });
      });
      it('should render link to "MCSupportFormURL', () => {
        expect(dowshiftRenderWrapper).toRender({ href: MCSupportFormURL });
      });
    });
    describe('when menu is closed', () => {
      beforeEach(() => {
        downshiftProps = { isOpen: false, toggleMenu: jest.fn() };
        dowshiftRenderWrapper = shallow(
          wrapper.find('Downshift').prop('render')(downshiftProps)
        );
      });
      it('should not render <Card>', () => {
        expect(dowshiftRenderWrapper).not.toRender('Card');
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
