import { shallow } from 'enzyme';
import React from 'react';
import { ToggleFeature } from '@flopflip/react-broadcast';
import {
  RestrictedByPermissions,
  permissions,
} from '@commercetools-frontend/permissions';
import { NavLink } from 'react-router-dom';
import * as storage from '@commercetools-frontend/storage';
import { UserFilledIcon } from '@commercetools-frontend/ui-kit';
import { STORAGE_KEYS, MCSupportFormURL } from '../../constants';
import {
  NavBar,
  NavBarLayout,
  DataMenu,
  MenuItemLink,
  MenuItem,
  MenuGroup,
  MenuExpander,
  MenuItemDivider,
  ToggledWithPermissions,
  getIconTheme,
} from './navbar';
import { defaultNavigationItems } from './config';

jest.mock('@commercetools-frontend/storage');

const createTestProps = props => ({
  location: {
    pathname: '',
  },
  applicationLanguage: 'en',
  projectKey: 'test-1',
  isForcedMenuOpen: false,
  useFullRedirectsForLinks: false,

  // injectFeatureToggle
  areProjectExtensionsEnabled: false,
  ...props,
});

const createDataMenuTestProps = props => ({
  rootNode: { contains: () => true },
  ...createTestProps(),
  data: [
    {
      key: 'Customers',
      labelKey: 'NavBar.Customers.title',
      uriPath: 'customers',
      icon: 'UserFilledIcon',
      submenu: [
        {
          key: 'Add Customer',
          labelKey: 'NavBar.Customers.add',
          uriPath: 'customers/new',
        },
      ],
    },
  ],
  ...props,
});

const createProjectExtensionNavbarProps = props => ({
  key: 'Channels',
  allLocaleLabels: [
    { locale: 'en', value: 'Channels' },
    { locale: 'de', value: 'Kanäle' },
  ],
  uriPath: 'channels',
  icon: 'WorldIcon',
  submenu: [
    {
      key: 'Channels',
      allLocaleLabels: [
        { locale: 'en', value: 'Channels' },
        { locale: 'de', value: 'Kanäle' },
      ],
      uriPath: 'channels',
    },
  ],
  ...props,
});

describe('rendering', () => {
  let props;
  let wrapper;
  describe('<NavBar>', () => {
    beforeEach(() => {
      props = createTestProps();
      wrapper = shallow(<NavBar {...props} />);
    });
    it('should render <NavBarLayout> element', () => {
      expect(wrapper).toRender(NavBarLayout);
    });
    it('should render DataMenu component', () => {
      expect(wrapper).toRender('DataMenu');
    });
    describe('<DataMenu>', () => {
      it('should pass rootNode as prop', () => {
        expect(wrapper.find(DataMenu)).toHaveProp('rootNode');
      });
      it('should pass data as prop', () => {
        expect(wrapper.find(DataMenu)).toHaveProp(
          'data',
          defaultNavigationItems
        );
      });
      it('should pass applicationLanguage as prop', () => {
        expect(wrapper.find(DataMenu)).toHaveProp(
          'applicationLanguage',
          props.applicationLanguage
        );
      });
      it('should pass projectKey as prop', () => {
        expect(wrapper.find(DataMenu)).toHaveProp(
          'projectKey',
          props.projectKey
        );
      });
      it('should pass isForcedMenuOpen as prop', () => {
        expect(wrapper.find(DataMenu)).toHaveProp(
          'isForcedMenuOpen',
          props.isForcedMenuOpen
        );
      });
      it('should pass location as prop', () => {
        expect(wrapper.find(DataMenu)).toHaveProp('location', props.location);
      });
      describe('when there are project extensions', () => {
        let extendedMenuItem;
        beforeEach(() => {
          extendedMenuItem = createProjectExtensionNavbarProps();
          props = createTestProps({
            projectExtensionsQuery: {
              projectExtension: {
                id: 'pe1',
                applications: [
                  {
                    id: 'pe1a1',
                    navbarMenu: extendedMenuItem,
                  },
                ],
              },
            },
          });
          wrapper = shallow(<NavBar {...props} />);
        });
        it('should pass data with extended menu items as prop', () => {
          expect(wrapper.find(DataMenu)).toHaveProp(
            'data',
            defaultNavigationItems.concat(extendedMenuItem)
          );
        });
      });
    });
  });
  describe('<DataMenu>', () => {
    beforeEach(() => {
      props = createDataMenuTestProps();
      wrapper = shallow(<DataMenu {...props} />);
    });
    it('should render <MenuGroup> level 1', () => {
      expect(wrapper.find(MenuGroup).at(0)).toHaveProp('level', 1);
    });
    it('should render <ToggledWithPermissions>', () => {
      expect(wrapper.find(MenuGroup).at(0)).toRender(ToggledWithPermissions);
    });
    describe('when rendering the settings menu', () => {
      beforeEach(() => {
        props = createDataMenuTestProps({
          data: [
            {
              key: 'Settings',
              labelKey: 'NavBar.Settings.title',
              uriPath: 'settings',
              icon: 'UserFilledIcon',
              permissions: [permissions.ManageProject],
              featureToggle: 'projectSettings',
            },
          ],
        });
        wrapper = shallow(<DataMenu {...props} />);
      });
      it('should render a MenuItemDivider', () => {
        expect(wrapper.find(MenuGroup).first()).toRender(MenuItemDivider);
      });
    });
    describe('when rendering any other menu', () => {
      beforeEach(() => {
        props = createDataMenuTestProps({
          data: [
            {
              key: 'Customers',
              labelKey: 'NavBar.Customers.title',
              uriPath: 'customers',
              icon: 'UserFilledIcon',
              permissions: [permissions.ViewCustomers],
              featureToggle: 'customerList',
            },
          ],
        });
        wrapper = shallow(<DataMenu {...props} />);
      });
      it('should not render a MenuItemDivider', () => {
        expect(wrapper.find(MenuGroup).first()).not.toRender(MenuItemDivider);
      });
      describe('<ToggledWithPermissions>', () => {
        it('should pass featureToggle as prop', () => {
          expect(
            wrapper
              .find(MenuGroup)
              .at(0)
              .find(ToggledWithPermissions)
          ).toHaveProp('featureToggle', 'customerList');
        });
        it('should pass permissions as prop', () => {
          expect(
            wrapper
              .find(MenuGroup)
              .at(0)
              .find(ToggledWithPermissions)
          ).toHaveProp('permissions', [permissions.ViewCustomers]);
        });
      });
    });
    describe('<MenuItem>', () => {
      it('should pass hasSubmenu as prop', () => {
        expect(wrapper.find(MenuItem)).toHaveProp('hasSubmenu', true);
      });
      it('should pass isActive as prop', () => {
        expect(wrapper.find(MenuItem)).toHaveProp('isActive', false);
      });
      it('should pass isMenuOpen as prop', () => {
        expect(wrapper.find(MenuItem)).toHaveProp('isMenuOpen', false);
      });
      it('should pass onClick as prop', () => {
        expect(wrapper.find(MenuItem)).toHaveProp(
          'onClick',
          expect.any(Function)
        );
      });
      it('should pass onMouseEnter as prop', () => {
        expect(wrapper.find(MenuItem)).toHaveProp(
          'onMouseEnter',
          expect.any(Function)
        );
      });
      it('should pass onMouseLeave as prop', () => {
        expect(wrapper.find(MenuItem)).toHaveProp(
          'onMouseLeave',
          expect.any(Function)
        );
      });
      describe('<MenuItemLink>', () => {
        it('should render menu labelKey', () => {
          expect(wrapper.find(MenuItemLink).at(0)).toRender({
            id: 'NavBar.Customers.title',
          });
        });
        describe('when menu is not open', () => {
          beforeEach(() => {
            wrapper.setState({ isMenuOpen: false });
          });
          it('should pass linkTo as prop', () => {
            expect(wrapper.find(MenuItemLink).at(0)).toHaveProp(
              'linkTo',
              '/test-1/customers'
            );
          });
        });
        describe('when `externalLink` is passed', () => {
          beforeEach(() => {
            props = createDataMenuTestProps({
              data: defaultNavigationItems.filter(
                item => item.key === 'Support'
              ),
            });
            wrapper = shallow(<DataMenu {...props} />);
          });
          it('should pass externalLink as prop', () => {
            expect(wrapper.find(MenuItemLink).at(0)).toHaveProp(
              'externalLink',
              MCSupportFormURL
            );
          });
        });
        describe('when menu is open but there is no submenu', () => {
          beforeEach(() => {
            props = createDataMenuTestProps({
              data: [
                {
                  key: 'Customers',
                  labelKey: 'NavBar.Customers.title',
                  uriPath: 'customers',
                  icon: 'UserFilledIcon',
                },
              ],
            });
            wrapper = shallow(<DataMenu {...props} />);
            wrapper.setState({ isMenuOpen: true });
          });
          it('should pass linkTo as prop', () => {
            expect(wrapper.find(MenuItemLink).at(0)).toHaveProp(
              'linkTo',
              '/test-1/customers'
            );
          });
        });
        describe('when menu is open but there is no submenu (empty list)', () => {
          beforeEach(() => {
            props = createDataMenuTestProps({
              data: [
                {
                  key: 'Customers',
                  labelKey: 'NavBar.Customers.title',
                  uriPath: 'customers',
                  icon: 'UserFilledIcon',
                  submenu: [],
                },
              ],
            });
            wrapper = shallow(<DataMenu {...props} />);
            wrapper.setState({ isMenuOpen: true });
          });
          it('should pass linkTo as prop', () => {
            expect(wrapper.find(MenuItemLink).at(0)).toHaveProp(
              'linkTo',
              '/test-1/customers'
            );
          });
        });
        describe('when menu is open and there is a submenu', () => {
          beforeEach(() => {
            wrapper.setState({ isMenuOpen: true });
          });
          it('should pass linkTo as prop', () => {
            expect(wrapper.find(MenuItemLink).at(0)).toHaveProp('linkTo', null);
          });
        });
        describe('when item is active', () => {
          beforeEach(() => {
            wrapper.setState({ activeItemIndex: 'scrollable-0' });
          });
          it('should render active icon', () => {
            expect(wrapper.find(UserFilledIcon)).toHaveProp(
              'theme',
              'green-light'
            );
          });
        });
        describe('when item is not active but the route is active', () => {
          beforeEach(() => {
            wrapper = shallow(
              <DataMenu
                {...props}
                location={{ pathname: '/foo/customers' }}
                projectKey="foo"
              />
            );
            wrapper.setState({ activeItemIndex: null });
          });
          it('should render active icon', () => {
            expect(wrapper.find(UserFilledIcon)).toHaveProp(
              'theme',
              'green-light'
            );
          });
        });
        describe('when item and router are not active', () => {
          beforeEach(() => {
            wrapper = shallow(
              <DataMenu
                {...props}
                location={{ pathname: '/foo/bar' }}
                projectKey="foo"
              />
            );
            wrapper.setState({ activeItemIndex: null });
          });
          it('should render default icon', () => {
            expect(wrapper.find(UserFilledIcon)).toHaveProp('theme', 'white');
          });
        });
      });
      describe('<MenuGroup> level 2', () => {
        it('should pass level as prop', () => {
          expect(wrapper.find(MenuGroup).at(1)).toHaveProp('level', 2);
        });
        it('should render', () => {
          expect(wrapper.find(MenuGroup).at(1)).toRender(
            ToggledWithPermissions
          );
        });
        describe('<ToggledWithPermissions>', () => {
          beforeEach(() => {
            props = createDataMenuTestProps({
              data: [
                {
                  key: 'Customers',
                  labelKey: 'NavBar.Customers.title',
                  uriPath: 'customers',
                  icon: 'UserFilledIcon',
                  submenu: [
                    {
                      key: 'Add Customer',
                      labelKey: 'NavBar.Customers.add',
                      uriPath: 'customers/new',
                      permissions: [permissions.ManageCustomers],
                      featureToggle: 'customerAdd',
                    },
                  ],
                },
              ],
            });
            wrapper = shallow(<DataMenu {...props} />);
          });
          it('should pass featureToggle as prop', () => {
            expect(
              wrapper
                .find(MenuGroup)
                .at(1)
                .find(ToggledWithPermissions)
            ).toHaveProp('featureToggle', 'customerAdd');
          });
          it('should pass permissions as prop', () => {
            expect(
              wrapper
                .find(MenuGroup)
                .at(1)
                .find(ToggledWithPermissions)
            ).toHaveProp('permissions', [permissions.ManageCustomers]);
          });
        });
        describe('when item is active', () => {
          beforeEach(() => {
            wrapper.setState({ activeItemIndex: 'scrollable-0' });
          });
          it('should pass isActive as prop', () => {
            expect(wrapper.find(MenuGroup).at(1)).toHaveProp('isActive', true);
          });
        });
        describe('when item is not active', () => {
          beforeEach(() => {
            wrapper.setState({ activeItemIndex: null });
          });
          it('should pass isActive as prop', () => {
            expect(wrapper.find(MenuGroup).at(1)).toHaveProp('isActive', false);
          });
        });
        describe('when menu is open', () => {
          beforeEach(() => {
            wrapper.setState({ isMenuOpen: true });
          });
          it('should pass isExpanded as prop', () => {
            expect(wrapper.find(MenuGroup).at(1)).toHaveProp(
              'isExpanded',
              true
            );
          });
        });
        describe('when menu is not open', () => {
          beforeEach(() => {
            wrapper.setState({ isMenuOpen: false });
          });
          it('should pass isExpanded as prop', () => {
            expect(wrapper.find(MenuGroup).at(1)).toHaveProp(
              'isExpanded',
              false
            );
          });
        });
        describe('when there is a submenu', () => {
          it('should render <MenuItemLink>', () => {
            expect(wrapper.find({ level: 2 })).toRender(MenuItemLink);
          });
          describe('<MenuItemLink>', () => {
            it('should pass linkTo as prop', () => {
              expect(wrapper.find(MenuItemLink).at(1)).toHaveProp(
                'linkTo',
                '/test-1/customers/new'
              );
            });
            it('should pass "useFullRedirectsForLinks" as prop', () => {
              expect(wrapper.find(MenuItemLink).at(1)).toHaveProp(
                'useFullRedirectsForLinks',
                props.useFullRedirectsForLinks
              );
            });
            it('should render submenu labelKey', () => {
              expect(wrapper.find(MenuItemLink).at(1)).toRender({
                id: 'NavBar.Customers.add',
              });
            });
          });
        });
        describe('when there is not a submenu', () => {
          beforeEach(() => {
            props = createDataMenuTestProps({
              data: [
                {
                  key: 'Customers',
                  labelKey: 'NavBar.Customers.title',
                  uriPath: 'customers',
                  icon: 'UserFilledIcon',
                },
              ],
            });
            wrapper = shallow(<DataMenu {...props} />);
          });
          it('should not render <MenuItemLink>', () => {
            expect(wrapper.find({ level: 2 })).not.toRender(MenuItemLink);
          });
        });
      });
    });
    describe('<MenuExpander>', () => {
      describe('when expander is visible', () => {
        beforeEach(() => {
          wrapper.setState({ isExpanderVisible: true });
        });
        it('should pass isVisible as prop', () => {
          expect(wrapper.find(MenuExpander)).toHaveProp('isVisible', true);
        });
      });
      describe('when expander is not visible', () => {
        beforeEach(() => {
          wrapper.setState({ isExpanderVisible: false });
        });
        it('should pass isVisible as prop', () => {
          expect(wrapper.find(MenuExpander)).toHaveProp('isVisible', false);
        });
      });
      it('should pass onClick as prop', () => {
        expect(wrapper.find(MenuExpander)).toHaveProp(
          'onClick',
          expect.any(Function)
        );
      });
    });
  });
  describe('<ToggledWithPermissions>', () => {
    const ItemChild = () => <span>{'foo'}</span>;
    describe('<ToggleFeature>', () => {
      describe('when featureToggle is defined', () => {
        describe('with empty permissions', () => {
          beforeEach(() => {
            props = {
              featureToggle: 'myFeature',
              permissions: [],
              actualPermissions: {},
            };
            wrapper = shallow(
              <ToggledWithPermissions {...props}>
                <ItemChild />
              </ToggledWithPermissions>
            );
          });
          it('should render <ToggleFeature>', () => {
            expect(wrapper).toRender(ToggleFeature);
          });
          it('should pass "flag" as prop to <ToggleFeature>', () => {
            expect(wrapper.find(ToggleFeature)).toHaveProp('flag', 'myFeature');
          });
          it('should not render <RestrictedByPermissions>', () => {
            expect(wrapper).not.toRender(RestrictedByPermissions);
          });
        });
        describe('with defined permissions', () => {
          beforeEach(() => {
            props = {
              featureToggle: 'myFeature',
              permissions: [permissions.ManageOrders],
              actualPermissions: {},
            };
            wrapper = shallow(
              <ToggledWithPermissions {...props}>
                <ItemChild />
              </ToggledWithPermissions>
            );
          });
          it('should render <ToggleFeature>', () => {
            expect(wrapper).toRender(ToggleFeature);
          });
          it('should pass "flag" as prop to <ToggleFeature>', () => {
            expect(wrapper.find(ToggleFeature)).toHaveProp('flag', 'myFeature');
          });
          it('should render <RestrictedByPermissions>', () => {
            expect(wrapper).toRender(RestrictedByPermissions);
          });
          it('should pass "permissions" as prop to <RestrictedByPermissions>', () => {
            expect(wrapper.find(RestrictedByPermissions)).toHaveProp(
              'permissions',
              props.permissions
            );
          });
          it('should pass "shouldMatchSomePermissions" as prop to <RestrictedByPermissions>', () => {
            expect(wrapper.find(RestrictedByPermissions)).toHaveProp(
              'shouldMatchSomePermissions',
              true
            );
          });
        });
      });
      describe('when featureToggle is not defined', () => {
        describe('with empty permissions', () => {
          beforeEach(() => {
            props = {
              featureToggle: undefined,
              permissions: [],
              actualPermissions: {},
            };
            wrapper = shallow(
              <ToggledWithPermissions {...props}>
                <ItemChild />
              </ToggledWithPermissions>
            );
          });
          it('should not render <ToggleFeature>', () => {
            expect(wrapper).not.toRender(ToggleFeature);
          });
          it('should not render <RestrictedByPermissions>', () => {
            expect(wrapper).not.toRender(RestrictedByPermissions);
          });
        });
        describe('with defined permissions', () => {
          beforeEach(() => {
            props = {
              featureToggle: undefined,
              permissions: [permissions.ManageOrders],
              actualPermissions: {},
            };
            wrapper = shallow(
              <ToggledWithPermissions {...props}>
                <ItemChild />
              </ToggledWithPermissions>
            );
          });
          it('should not render <ToggleFeature>', () => {
            expect(wrapper).not.toRender(ToggleFeature);
          });
          it('should render <RestrictedByPermissions>', () => {
            expect(wrapper).toRender(RestrictedByPermissions);
          });
          it('should pass "permissions" as prop to <RestrictedByPermissions>', () => {
            expect(wrapper.find(RestrictedByPermissions)).toHaveProp(
              'permissions',
              props.permissions
            );
          });
          it('should pass "shouldMatchSomePermissions" as prop to <RestrictedByPermissions>', () => {
            expect(wrapper.find(RestrictedByPermissions)).toHaveProp(
              'shouldMatchSomePermissions',
              true
            );
          });
        });
      });
    });
    describe('<RestrictedByPermissions>', () => {
      it('should render <RestrictedByPermissions>', () => {
        expect(wrapper).toRender(RestrictedByPermissions);
      });
      describe('when permissions are defined', () => {
        beforeEach(() => {
          props = {
            permissions: [permissions.ViewProducts],
          };
          wrapper = shallow(
            <ToggledWithPermissions {...props}>
              <ItemChild />
            </ToggledWithPermissions>
          );
        });
        it('should match snapshot', () => {
          expect(wrapper).toMatchSnapshot();
        });
        it('should pass permissions as prop', () => {
          expect(wrapper.find(RestrictedByPermissions)).toHaveProp(
            'permissions',
            [permissions.ViewProducts]
          );
        });
        it('should pass shouldMatchSomePermissions as prop (true)', () => {
          expect(wrapper.find(RestrictedByPermissions)).toHaveProp(
            'shouldMatchSomePermissions',
            true
          );
        });
      });
    });
  });
  describe('<MenuItemLink>', () => {
    const LinkLabel = () => <span>{'Customers'}</span>;
    describe('when externalLink is defined', () => {
      beforeEach(() => {
        props = {
          externalLink: '//www.externalLink.com',
          exactMatch: true,
          useFullRedirectsForLinks: false,
          tracking: {
            'data-track-component': 'Support-links',
            'data-track-event': 'click',
            'data-track-label': 'support_icon',
          },
        };
        wrapper = shallow(
          <MenuItemLink {...props}>
            <LinkLabel />
          </MenuItemLink>
        );
      });
      it('should render <a> with provided href', () => {
        expect(wrapper.find('a')).toHaveProp('href', props.externalLink);
      });
      it('should pass tracking props', () => {
        expect(wrapper).toHaveProp('data-track-component', 'Support-links');
        expect(wrapper).toHaveProp('data-track-event', 'click');
        expect(wrapper).toHaveProp('data-track-label', 'support_icon');
      });
    });
    describe('when linkTo is defined', () => {
      beforeEach(() => {
        props = {
          linkTo: '/test-1/customers',
          exactMatch: true,
          useFullRedirectsForLinks: false,
        };
        wrapper = shallow(
          <MenuItemLink {...props}>
            <LinkLabel />
          </MenuItemLink>
        );
      });
      it('should render <NavLink>', () => {
        expect(wrapper).toRender(NavLink);
      });
      it('should pass to as prop', () => {
        expect(wrapper.find(NavLink)).toHaveProp('to', '/test-1/customers');
      });
      it('should pass exact as prop', () => {
        expect(wrapper.find(NavLink)).toHaveProp('exact', true);
      });
      it('should pass activeClassName as prop', () => {
        expect(wrapper.find(NavLink)).toHaveProp(
          'activeClassName',
          'highlighted'
        );
      });
      it('should render children', () => {
        expect(wrapper).toRender(LinkLabel);
      });
      describe('when onClick is called', () => {
        let mockedEvent;
        describe('if useFullRedirectsForLinks is true', () => {
          beforeEach(() => {
            mockedEvent = { preventDefault: jest.fn() };
            wrapper = shallow(
              <MenuItemLink {...props} useFullRedirectsForLinks={true}>
                <LinkLabel />
              </MenuItemLink>
            );
            wrapper.instance().redirectTo = jest.fn();
            wrapper.find(NavLink).prop('onClick')(mockedEvent);
          });
          it('should call preventDefault on the event', () => {
            expect(mockedEvent.preventDefault).toHaveBeenCalled();
          });
          it('should call redirectTo', () => {
            expect(wrapper.instance().redirectTo).toHaveBeenCalledWith(
              props.linkTo
            );
          });
        });
        describe('if useFullRedirectsForLinks is false', () => {
          beforeEach(() => {
            mockedEvent = { preventDefault: jest.fn() };
            wrapper = shallow(
              <MenuItemLink {...props} useFullRedirectsForLinks={false}>
                <LinkLabel />
              </MenuItemLink>
            );
            wrapper.instance().redirectTo = jest.fn();
            wrapper.find(NavLink).prop('onClick')(mockedEvent);
          });
          it('should not call preventDefault on the event', () => {
            expect(mockedEvent.preventDefault).not.toHaveBeenCalled();
          });
          it('should not call redirectTo', () => {
            expect(wrapper.instance().redirectTo).not.toHaveBeenCalled();
          });
        });
      });
    });
    describe('when linkTo is not defined', () => {
      beforeEach(() => {
        wrapper = shallow(
          <MenuItemLink useFullRedirectsForLinks={false}>
            <LinkLabel />
          </MenuItemLink>
        );
      });
      it('should not render <Link>', () => {
        expect(wrapper).not.toRender('Link');
      });
      it('should render children', () => {
        expect(wrapper).toRender(LinkLabel);
      });
    });
  });
  describe('<MenuItem>', () => {
    const ItemChild = () => <span>{'foo'}</span>;
    const createProps = custom => ({
      hasSubmenu: false,
      isActive: false,
      isMenuOpen: false,
      onClick: jest.fn(),
      onMouseEnter: jest.fn(),
      onMouseLeave: jest.fn(),
      ...custom,
    });
    beforeEach(() => {
      props = createProps();
      wrapper = shallow(
        <MenuItem {...props}>
          <ItemChild />
        </MenuItem>
      );
    });
    it('should render children', () => {
      expect(wrapper).toRender(ItemChild);
    });
    describe('when is active', () => {
      beforeEach(() => {
        props = createProps({ isActive: true });
        wrapper = shallow(
          <MenuItem {...props}>
            <ItemChild />
          </MenuItem>
        );
      });
      it('should render item__active class', () => {
        expect(wrapper.find('li')).toHaveClassName('item__active');
      });
    });
    describe('when menu is not open', () => {
      beforeEach(() => {
        props = createProps({ isMenuOpen: false });
        wrapper = shallow(
          <MenuItem {...props}>
            <ItemChild />
          </MenuItem>
        );
      });
      it('should render item_menu-collapsed class', () => {
        expect(wrapper.find('li')).toHaveClassName('item_menu-collapsed');
      });
    });
    describe('when item has no submenu', () => {
      beforeEach(() => {
        props = createProps({ hasSubmenu: false });
        wrapper = shallow(
          <MenuItem {...props}>
            <ItemChild />
          </MenuItem>
        );
      });
      it('should render item__no-submenu class', () => {
        expect(wrapper.find('li')).toHaveClassName('item__no-submenu');
      });
    });
  });
  describe('<MenuGroup>', () => {
    const ItemChild = () => <span>{'foo'}</span>;
    const createProps = custom => ({
      level: 1,
      isActive: false,
      isExpanded: false,
      ...custom,
    });
    beforeEach(() => {
      props = createProps();
      wrapper = shallow(
        <MenuGroup {...props}>
          <ItemChild />
        </MenuGroup>
      );
    });
    it('should render children', () => {
      expect(wrapper).toRender(ItemChild);
    });
    describe('when level is 1', () => {
      beforeEach(() => {
        props = createProps({ level: 1 });
        wrapper = shallow(
          <MenuGroup {...props}>
            <ItemChild />
          </MenuGroup>
        );
      });
      it('should render list class', () => {
        expect(wrapper.find('ul')).toHaveClassName('list');
      });
    });
    describe('when level is 2', () => {
      beforeEach(() => {
        props = createProps({ level: 2 });
        wrapper = shallow(
          <MenuGroup {...props}>
            <ItemChild />
          </MenuGroup>
        );
      });
      it('should render sublist class', () => {
        expect(wrapper.find('ul')).toHaveClassName('sublist');
      });
    });
    describe('when level is 2 and is active and is expanded', () => {
      beforeEach(() => {
        props = createProps({ level: 2, isActive: true, isExpanded: true });
        wrapper = shallow(
          <MenuGroup {...props}>
            <ItemChild />
          </MenuGroup>
        );
      });
      it('should render sublist-expanded__active class', () => {
        expect(wrapper.find('ul')).toHaveClassName('sublist-expanded__active');
      });
    });
    describe('when level is 2 and is active and is not expanded', () => {
      beforeEach(() => {
        props = createProps({ level: 2, isActive: true, isExpanded: false });
        wrapper = shallow(
          <MenuGroup {...props}>
            <ItemChild />
          </MenuGroup>
        );
      });
      it('should render sublist-collapsed__active class', () => {
        expect(wrapper.find('ul')).toHaveClassName('sublist-collapsed__active');
      });
    });
  });
  describe('<MenuExpander>', () => {
    describe('when is visible', () => {
      beforeEach(() => {
        wrapper = shallow(
          <MenuExpander isVisible={true} onClick={() => null} />
        );
      });
      it('should not render hidden class', () => {
        expect(wrapper.find('li')).not.toHaveClassName('hidden');
      });
    });
    describe('when is not visible', () => {
      beforeEach(() => {
        wrapper = shallow(
          <MenuExpander isVisible={false} onClick={() => null} />
        );
      });
      it('should render hidden class', () => {
        expect(wrapper.find('li')).toHaveClassName('hidden');
      });
    });
  });
  describe('<MenuItemDivider>', () => {
    beforeEach(() => {
      wrapper = shallow(<MenuItemDivider />);
    });
    it('should render a div with className `divider-first-item`', () => {
      expect(wrapper).toRender({ className: 'divider-first-item' });
    });
    it('should render a div with className `divider-second-item`', () => {
      expect(wrapper).toRender({ className: 'divider-second-item' });
    });
  });
});

describe('lifecycle', () => {
  let props;
  let wrapper;
  describe('<DataMenu>', () => {
    beforeEach(() => {
      props = createDataMenuTestProps();
      wrapper = shallow(<DataMenu {...props} />);
    });
    describe('initial state', () => {
      it('should have activeItemIndex as null', () => {
        expect(wrapper).toHaveState('activeItemIndex', null);
      });
      it('should have isExpanderVisible as true', () => {
        expect(wrapper).toHaveState('isExpanderVisible', true);
      });
      it('should have isMenuOpen as false', () => {
        expect(wrapper).toHaveState('isMenuOpen', false);
      });
    });
  });
});

describe('instance methods', () => {
  let props;
  let wrapper;
  describe('<DataMenu>', () => {
    beforeEach(() => {
      props = createDataMenuTestProps();
      wrapper = shallow(<DataMenu {...props} />);
    });
    describe('checkSize', () => {
      describe('if menu cannot be expanded', () => {
        beforeEach(() => {
          window.innerWidth = 918;
        });
        describe('if menu is open', () => {
          beforeEach(() => {
            wrapper.setState({ isMenuOpen: true });
            wrapper.instance().checkSize();
          });
          it('should set isMenuOpen to false', () => {
            expect(wrapper).toHaveState('isMenuOpen', false);
          });
          it('should set isExpanderVisible to false', () => {
            expect(wrapper).toHaveState('isExpanderVisible', false);
          });
          it('should reset activeItemIndex', () => {
            expect(wrapper).toHaveState('activeItemIndex', null);
          });
        });
        describe('if menu is not open && expander is visible', () => {
          beforeEach(() => {
            window.innerWidth = 900;
            wrapper.setState({ isMenuOpen: false, isExpanderVisible: true });
            wrapper.instance().checkSize();
          });
          it('should set isMenuOpen to false', () => {
            expect(wrapper).toHaveState('isMenuOpen', false);
          });
          it('should set isExpanderVisible to false', () => {
            expect(wrapper).toHaveState('isExpanderVisible', false);
          });
          it('should reset activeItemIndex', () => {
            expect(wrapper).toHaveState('activeItemIndex', null);
          });
        });
      });
      describe('if menu can be expanded', () => {
        beforeEach(() => {
          window.innerWidth = 919;
        });
        describe('if expander is not visible', () => {
          beforeEach(() => {
            wrapper.setState({ isExpanderVisible: false });
            wrapper.instance().checkSize();
          });
          it('should set isExpanderVisible to true', () => {
            expect(wrapper).toHaveState('isExpanderVisible', true);
          });
        });
        describe('if isForcedMenuOpen is not set', () => {
          beforeEach(() => {
            wrapper.setProps({ isForcedMenuOpen: null });
          });
          describe('if menu is not open but it should be open', () => {
            beforeEach(() => {
              window.innerWidth = 1025;
              wrapper.setState({ isMenuOpen: false });
              wrapper.instance().checkSize();
            });
            it('should set isMenuOpen to true', () => {
              expect(wrapper).toHaveState('isMenuOpen', true);
            });
            it('should set isExpanderVisible to true', () => {
              expect(wrapper).toHaveState('isExpanderVisible', true);
            });
          });
          describe('if menu is open but it should not be open', () => {
            beforeEach(() => {
              window.innerWidth = 1024;
              wrapper.setState({ isMenuOpen: true });
              wrapper.instance().checkSize();
            });
            it('should set isMenuOpen to false', () => {
              expect(wrapper).toHaveState('isMenuOpen', false);
            });
            it('should set isExpanderVisible to true', () => {
              expect(wrapper).toHaveState('isExpanderVisible', true);
            });
          });
        });
        describe('if isForcedMenuOpen is set', () => {
          describe('if menu is open but isForcedMenuOpen is false', () => {
            beforeEach(() => {
              wrapper.setProps({ isForcedMenuOpen: false });
              wrapper.setState({ isMenuOpen: true });
              wrapper.instance().checkSize();
            });
            it('should set isMenuOpen to false', () => {
              expect(wrapper).toHaveState('isMenuOpen', false);
            });
            it('should set isExpanderVisible to true', () => {
              expect(wrapper).toHaveState('isExpanderVisible', true);
            });
          });
          describe('if menu is not open but isForcedMenuOpen is true', () => {
            beforeEach(() => {
              wrapper.setProps({ isForcedMenuOpen: true });
              wrapper.setState({ isMenuOpen: false });
              wrapper.instance().checkSize();
            });
            it('should set isMenuOpen to true', () => {
              expect(wrapper).toHaveState('isMenuOpen', true);
            });
            it('should set isExpanderVisible to true', () => {
              expect(wrapper).toHaveState('isExpanderVisible', true);
            });
          });
        });
      });
    });
    describe('handleToggleItem', () => {
      describe('if activeItemIndex is not the same as the given index', () => {
        beforeEach(() => {
          wrapper.setState({ activeItemIndex: 'fixed-1' });
          wrapper.instance().handleToggleItem('fixed', 0);
        });
        it('should update activeItemIndex with the new index', () => {
          expect(wrapper).toHaveState('activeItemIndex', 'fixed-0');
        });
      });
    });
    describe('shouldCloseMenuFly', () => {
      describe('if node does not contain event target and menu is not open', () => {
        beforeEach(() => {
          wrapper.setProps({ rootNode: { contains: () => false } });
          wrapper.setState({ isMenuOpen: false });
          wrapper
            .instance()
            .shouldCloseMenuFly({ target: 'foo', type: 'mouseleave' });
        });
        it('should unset activeItemIndex', () => {
          expect(wrapper).toHaveState('activeItemIndex', null);
        });
      });
      describe('if menu is open and event is a mouseleave', () => {
        beforeEach(() => {
          wrapper.setProps({ rootNode: { contains: () => true } });
          wrapper
            .instance()
            .shouldCloseMenuFly({ target: 'foo', type: 'mouseleave' });
        });
        it('should unset activeItemIndex', () => {
          expect(wrapper).toHaveState('activeItemIndex', null);
        });
      });
    });
    describe('handleToggleMenu', () => {
      describe('if menu is open and activeItemIndex is not null', () => {
        beforeEach(() => {
          wrapper.setState({ isMenuOpen: true, activeItemIndex: 'fixed-0' });
          wrapper.instance().handleToggleMenu();
        });
        it('should unset activeItemIndex', () => {
          expect(wrapper).toHaveState('activeItemIndex', null);
        });
      });
      describe('if menu is open', () => {
        beforeEach(() => {
          wrapper.setState({ isMenuOpen: true });
          wrapper.instance().handleToggleMenu();
        });
        it('should update isForcedMenuOpen to false', () => {
          expect(storage.put).toHaveBeenCalledWith(
            STORAGE_KEYS.IS_FORCED_MENU_OPEN,
            false
          );
        });
      });
      describe('if menu is not open', () => {
        beforeEach(() => {
          wrapper.setState({ isMenuOpen: false });
          wrapper.instance().handleToggleMenu();
        });
        it('should update isForcedMenuOpen to true', () => {
          expect(storage.put).toHaveBeenCalledWith(
            STORAGE_KEYS.IS_FORCED_MENU_OPEN,
            true
          );
        });
      });
    });
  });
});

describe('helpers', () => {
  describe('getIconTheme', () => {
    describe('when isActive is true', () => {
      let iconTheme;
      let menu;
      beforeEach(() => {
        menu = {
          key: 'menu',
        };
        iconTheme = getIconTheme(menu, true);
      });
      it('should get green theme', () => {
        expect(iconTheme).toBe('green-light');
      });
      describe('when menu is settings', () => {
        beforeEach(() => {
          menu = {
            key: 'Settings',
          };
          iconTheme = getIconTheme(menu, true);
        });
        it('should get green theme', () => {
          expect(iconTheme).toBe('green-light');
        });
      });
      describe('when menu is Support', () => {
        beforeEach(() => {
          menu = {
            key: 'Support',
          };
          iconTheme = getIconTheme(menu, true);
        });
        it('should get green theme', () => {
          expect(iconTheme).toBe('green-light');
        });
      });
    });
    describe('when isActive is false', () => {
      let iconTheme;
      let menu;
      beforeEach(() => {
        menu = {
          key: 'menu',
        };
        iconTheme = getIconTheme(menu, false);
      });
      it('should get white theme', () => {
        expect(iconTheme).toBe('white');
      });

      describe('when menu is settings', () => {
        beforeEach(() => {
          menu = {
            key: 'Settings',
          };
          iconTheme = getIconTheme(menu, false);
        });
        it('should get grey theme', () => {
          expect(iconTheme).toBe('grey');
        });
      });
      describe('when menu is Support', () => {
        beforeEach(() => {
          menu = {
            key: 'Support',
          };
          iconTheme = getIconTheme(menu, false);
        });
        it('should get grey theme', () => {
          expect(iconTheme).toBe('grey');
        });
      });
    });
  });
});
