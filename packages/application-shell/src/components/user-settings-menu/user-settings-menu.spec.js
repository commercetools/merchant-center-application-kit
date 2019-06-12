import React from 'react';
import { shallow } from 'enzyme';
import { CaretDownIcon, Avatar, Text } from '@commercetools-frontend/ui-kit';
import Downshift from 'downshift';
import { MCSupportFormURL } from '../../constants';
import UserSettingsMenu, {
  UserSettingsMenuBody,
  ConnectedUserSettingsMenuBody,
  UserAvatar,
  UserAvatarWithHoverState,
} from './user-settings-menu';

const createTestProps = props => ({
  locale: 'en',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@doe.com',
  gravatarHash: '20c9c1b252b46ab49d6f7a4cee9c3e68',
  ...props,
});

const createTestMenuConfig = props => ({
  applicationsMenuQuery: {
    applicationsMenu: {
      appBar: [
        {
          key: 'profile',
          labelAllLocales: [{ locale: 'en', value: 'Profile' }],
          uriPath: 'profile',
        },
        {
          key: 'organizations',
          labelAllLocales: [{ locale: 'en', value: 'Organizations' }],
          uriPath: 'organizations',
        },
      ],
      ...props,
    },
  },
});

const createDownshiftProps = props => ({
  isOpen: false,
  toggleMenu: jest.fn(),
  getToggleButtonProps: jest.fn(),
  getMenuProps: jest.fn(),
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
      menuStateContainerRenderWrapper = wrapper
        .find(Downshift)
        .renderProp('children')(downshiftProps);
    });
    it('should render button', () => {
      expect(menuStateContainerRenderWrapper).toRender('button');
    });
    it('should render <UserAvatarWithHoverState>', () => {
      expect(menuStateContainerRenderWrapper).toRender(
        UserAvatarWithHoverState
      );
    });
    describe('when menu is open', () => {
      beforeEach(() => {
        downshiftProps = createDownshiftProps({ isOpen: true });
        menuStateContainerRenderWrapper = wrapper
          .find(Downshift)
          .renderProp('children')(downshiftProps);
      });
      it('should render <ConnectedUserSettingsMenuBody>', () => {
        expect(menuStateContainerRenderWrapper).toRender(
          ConnectedUserSettingsMenuBody
        );
      });
    });
  });

  describe('<UserSettingsMenuBody>', () => {
    beforeEach(() => {
      props = createTestProps({
        downshiftProps: createDownshiftProps(),
        ...createTestMenuConfig(),
      });
      wrapper = shallow(<UserSettingsMenuBody {...props} />);
    });
    it('should render <Avatar>', () => {
      expect(wrapper).toRender(Avatar);
    });
    it('should render full name', () => {
      expect(wrapper).toContainReact(
        <Text.Body isBold>{'John Doe'}</Text.Body>
      );
    });
    it('should render email', () => {
      expect(wrapper).toContainReact(
        <Text.Body truncate>{'john@doe.com'}</Text.Body>
      );
    });
    it('should render link to "/account/profile"', () => {
      expect(wrapper).toRender({
        to: '/account/profile',
      });
    });
    it('should render link to "/account/organizations"', () => {
      expect(wrapper).toRender({
        to: '/account/organizations',
      });
    });
    it('should render link to "/logout"', () => {
      expect(wrapper).toRender({
        href: '/logout?reason=user',
      });
    });
    it('should render link to "MCSupportFormURL', () => {
      expect(wrapper).toRender({
        href: MCSupportFormURL,
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
      expect(wrapper.find(Avatar)).toHaveProp('firstName', 'John');
    });

    it('should pass prop lastName to `Avatar` component', () => {
      expect(wrapper.find(Avatar)).toHaveProp('lastName', 'Doe');
    });

    it('should pass prop `gravatarHash` to `Avatar` component', () => {
      expect(wrapper.find(Avatar)).toHaveProp(
        'gravatarHash',
        '20c9c1b252b46ab49d6f7a4cee9c3e68'
      );
    });
  });
});
