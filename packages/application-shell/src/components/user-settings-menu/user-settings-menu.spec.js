import React from 'react';
import { shallow } from 'enzyme';
import Avatar from '@commercetools-uikit/avatar';
import Text from '@commercetools-uikit/text';
import { CaretDownIcon } from '@commercetools-uikit/icons';
import { SUPPORT_PORTAL_URL } from '@commercetools-frontend/constants';
import useApplicationsMenu from '../../hooks/use-applications-menu';
import Downshift from 'downshift';
import UserSettingsMenu, {
  UserSettingsMenuBody,
  UserAvatar,
} from './user-settings-menu';

jest.mock('../../hooks/use-applications-menu');

const createTestProps = props => ({
  locale: 'en',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@doe.com',
  gravatarHash: '20c9c1b252b46ab49d6f7a4cee9c3e68',
  environment: { servedByProxy: false },
  ...props,
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
      expect(menuStateContainerRenderWrapper).toRender({
        role: 'user-menu-toggle',
      });
    });
    it('should render <UserAvatar>', () => {
      expect(menuStateContainerRenderWrapper).toRender(UserAvatar);
    });
    describe('when menu is open', () => {
      beforeEach(() => {
        downshiftProps = createDownshiftProps({ isOpen: true });
        menuStateContainerRenderWrapper = wrapper
          .find(Downshift)
          .renderProp('children')(downshiftProps);
      });
      it('should render <UserSettingsMenuBody>', () => {
        expect(menuStateContainerRenderWrapper).toRender(UserSettingsMenuBody);
      });
    });
  });

  describe('<UserSettingsMenuBody>', () => {
    beforeEach(() => {
      useApplicationsMenu.mockReturnValue({
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
      });
      props = createTestProps({
        downshiftProps: createDownshiftProps(),
        environment: { servedByProxy: false },
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
    it('should render link to support url', () => {
      expect(wrapper).toRender({
        href: SUPPORT_PORTAL_URL,
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
