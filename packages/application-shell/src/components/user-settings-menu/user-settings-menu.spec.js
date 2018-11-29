import React from 'react';
import { shallow } from 'enzyme';
import { CaretDownIcon } from '@commercetools-frontend/ui-kit';
import Downshift from 'downshift';
import { MCSupportFormURL } from '../../constants';
import { UserSettingsMenu, UserAvatar } from './user-settings-menu';

const createTestProps = props => ({
  firstName: 'John Test',
  lastName: 'Doe',
  email: 'john@doe.com',
  location: {
    pathname: '/test-1/products',
  },
  gravatarHash: '20c9c1b252b46ab49d6f7a4cee9c3e68',
  ...props,
});

const createDownshiftProps = props => ({
  isOpen: false,
  toggleMenu: jest.fn(),
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
    expect(wrapper).toRender(Downshift);
  });

  describe('menu', () => {
    let downshiftProps;
    let menuStateContainerRenderWrapper;
    beforeEach(() => {
      downshiftProps = createDownshiftProps();
      menuStateContainerRenderWrapper = shallow(
        wrapper.find(Downshift).prop('children')(downshiftProps)
      );
    });
    it('should render div with click handler', () => {
      expect(
        menuStateContainerRenderWrapper.find('.settings-container')
      ).toHaveProp('onClick', downshiftProps.toggleMenu);
    });
    it('should render WithMouseOverState(UserAvatar)', () => {
      expect(menuStateContainerRenderWrapper).toRender(
        'WithMouseOverState(UserAvatar)'
      );
    });
    describe('when menu is open', () => {
      beforeEach(() => {
        downshiftProps = createDownshiftProps({ isOpen: true });
        menuStateContainerRenderWrapper = shallow(
          wrapper.find(Downshift).prop('children')(downshiftProps)
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
      describe('when is in the account section', () => {
        beforeEach(() => {
          props = createTestProps({
            location: { pathname: '/account/organizations' },
          });
          wrapper = shallow(<UserSettingsMenu {...props} />);
          downshiftProps = createDownshiftProps({ isOpen: true });
          menuStateContainerRenderWrapper = shallow(
            wrapper.find(Downshift).prop('children')(downshiftProps)
          );
        });
        it('should not render link to "/account/profile"', () => {
          expect(menuStateContainerRenderWrapper).not.toRender({
            to: '/account/profile',
          });
        });
        it('should not render link to "/account/organizations"', () => {
          expect(menuStateContainerRenderWrapper).not.toRender({
            to: '/account/organizations',
          });
        });
        it('should not render link to "/account/projects"', () => {
          expect(menuStateContainerRenderWrapper).not.toRender({
            to: '/account/projects',
          });
        });
      });
    });
    describe('when menu is closed', () => {
      beforeEach(() => {
        downshiftProps = createDownshiftProps();
        menuStateContainerRenderWrapper = shallow(
          wrapper.find(Downshift).prop('children')(downshiftProps)
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
      expect(wrapper).toRender(Avatar);
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
