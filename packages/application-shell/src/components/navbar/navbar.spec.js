import React from 'react';
import { shallow } from 'enzyme';
import { ToggleFeature } from '@flopflip/react-broadcast';
import { NavLink } from 'react-router-dom';
import upperFirst from 'lodash/upperFirst';
import {
  RestrictedByPermissions,
  permissions,
} from '@commercetools-frontend/permissions';
import { localStorage } from '@commercetools-frontend/storage';
import { STORAGE_KEYS } from '../../constants';
import {
  NavBar,
  NavBarLayout,
  DataMenu,
  MenuItemLink,
  MenuItem,
  MenuGroup,
  MenuExpander,
  MenuItemDivider,
  RestrictedMenuItem,
  getIconTheme,
  IconSwitcher,
} from './navbar';

jest.mock('@commercetools-frontend/storage');

const createTestMenuConfig = (key, props) => ({
  key,
  labelAllLocales: [{ locale: 'en', value: upperFirst(key) }],
  uriPath: key,
  icon: 'UserFilledIcon',
  permissions: [],
  submenu: [
    {
      key: `${key}-new`,
      labelAllLocales: [{ locale: 'en', value: `${upperFirst(key)} new` }],
      uriPath: `${key}/new`,
      permissions: [],
    },
  ],
  ...props,
});

const createTestProps = props => ({
  // From parent
  applicationLanguage: 'en',
  projectKey: 'test-1',
  useFullRedirectsForLinks: false,
  menuVisibilities: { hideOrdersList: true },
  // Injected
  location: { pathname: '' },
  isForcedMenuOpen: false,
  applicationsMenuQuery: {
    applicationsMenu: {
      navBar: [
        createTestMenuConfig('orders'),
        createTestMenuConfig('products'),
      ],
    },
  },
  projectExtensionsQuery: {
    projectExtension: {
      id: 'p1',
      applications: [
        { id: 'p1-a1', navbarMenu: createTestMenuConfig('channels') },
      ],
    },
  },
  ...props,
});
const createDataMenuTestProps = props => {
  const navbarProps = createTestProps(props);
  const {
    applicationsMenuQuery,
    projectExtensionsQuery,
    ...passThroughProps
  } = navbarProps;
  return {
    ...passThroughProps,
    data: [
      createTestMenuConfig('orders'),
      createTestMenuConfig('products'),
      createTestMenuConfig('channels'),
    ],
    ...props,
  };
};

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
      it('should merge internal apps with custom apps config', () => {
        expect(wrapper.find(DataMenu)).toHaveProp(
          'data',
          expect.arrayContaining([
            expect.objectContaining({ key: 'orders' }),
            expect.objectContaining({ key: 'products' }),
            expect.objectContaining({ key: 'channels' }),
          ])
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
    it('should render <RestrictedMenuItem>', () => {
      expect(wrapper.find(MenuGroup).at(0)).toRender(RestrictedMenuItem);
    });
    describe('when menu item has "shouldRenderDivider" set to "true"', () => {
      beforeEach(() => {
        props = createDataMenuTestProps({
          data: [
            createTestMenuConfig('orders'),
            createTestMenuConfig('settings', { shouldRenderDivider: true }),
          ],
        });
        wrapper = shallow(<DataMenu {...props} />);
      });
      it('should render a MenuItemDivider', () => {
        expect(wrapper.find(MenuGroup).first()).toRender(MenuItemDivider);
      });
    });

    describe('<RestrictedMenuItem> for submenu', () => {
      let restrictedMenuItem;
      beforeEach(() => {
        const ordersMenu = createTestMenuConfig('orders');
        props = createDataMenuTestProps({
          data: [
            createTestMenuConfig('orders', {
              ...ordersMenu,
              submenu: [
                {
                  ...ordersMenu.submenu[0],
                  featureToggle: 'ordersList',
                  permissions: [permissions.ViewOrders],
                  menuVisibility: 'hideAddOrder',
                },
              ],
            }),
          ],
        });
        wrapper = shallow(<DataMenu {...props} />);
        restrictedMenuItem = wrapper
          .find({ level: 2 })
          .find(RestrictedMenuItem);
      });
      it('should pass featureToggle as prop', () => {
        expect(restrictedMenuItem).toHaveProp('featureToggle', 'ordersList');
      });
      it('should pass permissions as prop', () => {
        expect(restrictedMenuItem).toHaveProp('permissions', [
          permissions.ViewOrders,
        ]);
      });
      it('should pass names of menu visibilities of submenus as prop', () => {
        expect(restrictedMenuItem).toHaveProp('namesOfMenuVisibilities', [
          'hideAddOrder',
        ]);
      });
    });
    describe('<MenuItem>', () => {
      let menuItem;
      beforeEach(() => {
        menuItem = wrapper
          .find(RestrictedMenuItem)
          .first()
          .find(MenuItem);
      });
      it('should pass hasSubmenu as prop', () => {
        expect(menuItem).toHaveProp('hasSubmenu', true);
      });
      it('should pass isActive as prop', () => {
        expect(menuItem).toHaveProp('isActive', false);
      });
      it('should pass isMenuOpen as prop', () => {
        expect(menuItem).toHaveProp('isMenuOpen', false);
      });
      it('should pass onClick as prop', () => {
        expect(menuItem).toHaveProp('onClick', expect.any(Function));
      });
      it('should pass onMouseEnter as prop', () => {
        expect(menuItem).toHaveProp('onMouseEnter', expect.any(Function));
      });
      it('should pass onMouseLeave as prop', () => {
        expect(menuItem).toHaveProp('onMouseLeave', expect.any(Function));
      });
      describe('<MenuItemLink>', () => {
        let menuItemLink;
        beforeEach(() => {
          menuItemLink = menuItem.find(MenuItemLink).first();
        });
        it('should render menu label', () => {
          expect(menuItemLink).toContainReact(
            <div className="title">Orders</div>
          );
        });
        describe('when menu is not open', () => {
          beforeEach(() => {
            wrapper.setState({ isMenuOpen: false });
            menuItemLink = menuItem.find(MenuItemLink).first();
          });
          it('should pass linkTo as prop', () => {
            expect(menuItemLink).toHaveProp('linkTo', '/test-1/orders');
          });
        });
        describe('when menu is open but there is no submenu', () => {
          beforeEach(() => {
            props = createDataMenuTestProps({
              data: [createTestMenuConfig('orders', { submenu: [] })],
            });
            wrapper = shallow(<DataMenu {...props} />);
            wrapper.setState({ isMenuOpen: true });
            menuItemLink = wrapper
              .find(RestrictedMenuItem)
              .first()
              .find(MenuItem)
              .find(MenuItemLink)
              .first();
          });
          it('should pass linkTo as prop', () => {
            expect(menuItemLink).toHaveProp('linkTo', '/test-1/orders');
          });
        });
        describe('when item is active', () => {
          let icon;
          beforeEach(() => {
            wrapper.setState({ activeItemIndex: 'scrollable-0' });
            icon = wrapper
              .find(RestrictedMenuItem)
              .first()
              .find(MenuItem)
              .find(MenuItemLink)
              .first()
              .find(IconSwitcher);
          });
          it('should pass iconName to IconSwitcher', () => {
            expect(icon).toHaveProp('iconName', 'UserFilledIcon');
          });
          it('should render active icon', () => {
            expect(icon).toHaveProp('theme', 'green-light');
          });
        });
        describe('when item is not active but the route is active', () => {
          let icon;
          beforeEach(() => {
            props = createDataMenuTestProps({
              location: { pathname: '/test-1/orders' },
            });
            wrapper = shallow(<DataMenu {...props} />);
            wrapper.setState({ activeItemIndex: null });
            icon = wrapper
              .find(RestrictedMenuItem)
              .first()
              .find(MenuItem)
              .find(MenuItemLink)
              .first()
              .find(IconSwitcher);
          });
          it('should pass iconName to IconSwitcher', () => {
            expect(icon).toHaveProp('iconName', 'UserFilledIcon');
          });
          it('should render active icon', () => {
            expect(icon).toHaveProp('theme', 'green-light');
          });
        });
        describe('when item and router are not active', () => {
          let icon;
          beforeEach(() => {
            props = createDataMenuTestProps({
              location: { pathname: '/test-1/somethig-else' },
            });
            wrapper = shallow(<DataMenu {...props} />);
            wrapper.setState({ activeItemIndex: null });
            icon = wrapper
              .find(RestrictedMenuItem)
              .first()
              .find(MenuItem)
              .find(MenuItemLink)
              .first()
              .find(IconSwitcher);
          });
          it('should render default icon', () => {
            expect(icon).toHaveProp('theme', 'white');
          });
        });
      });
      describe('<MenuGroup> level 2', () => {
        let menuLevel2;
        beforeEach(() => {
          const ordersMenu = createTestMenuConfig('orders');
          props = createDataMenuTestProps({
            data: [
              createTestMenuConfig('orders', {
                ...ordersMenu,
                submenu: [
                  {
                    ...ordersMenu.submenu[0],
                    featureToggle: 'ordersList',
                    permissions: [permissions.ViewOrders],
                    menuVisibility: 'hideAddOrder',
                  },
                ],
              }),
            ],
          });
          wrapper = shallow(<DataMenu {...props} />);
          menuLevel2 = wrapper.find({ level: 2 });
        });
        describe('<RestrictedMenuItem>', () => {
          let restrictedMenuItemWrapper;
          beforeEach(() => {
            restrictedMenuItemWrapper = menuLevel2
              .find(RestrictedMenuItem)
              .first();
          });
          it('should pass featureToggle as prop', () => {
            expect(restrictedMenuItemWrapper).toHaveProp(
              'featureToggle',
              'ordersList'
            );
          });
          it('should pass permissions as prop', () => {
            expect(restrictedMenuItemWrapper).toHaveProp('permissions', [
              permissions.ViewOrders,
            ]);
          });
          it('should pass menu visibilities as prop', () => {
            expect(restrictedMenuItemWrapper).toHaveProp(
              'namesOfMenuVisibilities',
              ['hideAddOrder']
            );
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
  describe('<RestrictedMenuItem>', () => {
    const ItemChild = () => <span>{'foo'}</span>;
    describe('<ToggleFeature>', () => {
      describe('when featureToggle is defined', () => {
        describe('with empty permissions', () => {
          beforeEach(() => {
            props = {
              featureToggle: 'myFeature',
              permissions: [],
              actualPermissions: {},
              menuVisibilities: {},
            };
            wrapper = shallow(
              <RestrictedMenuItem {...props}>
                <ItemChild />
              </RestrictedMenuItem>
            );
          });
          it('should match snapshot', () => {
            expect(wrapper).toMatchSnapshot();
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
              menuVisibilities: {},
            };
            wrapper = shallow(
              <RestrictedMenuItem {...props}>
                <ItemChild />
              </RestrictedMenuItem>
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
              menuVisibilities: {},
            };
            wrapper = shallow(
              <RestrictedMenuItem {...props}>
                <ItemChild />
              </RestrictedMenuItem>
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
              menuVisibilities: {},
            };
            wrapper = shallow(
              <RestrictedMenuItem {...props}>
                <ItemChild />
              </RestrictedMenuItem>
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
            menuVisibilities: {},
          };
          wrapper = shallow(
            <RestrictedMenuItem {...props}>
              <ItemChild />
            </RestrictedMenuItem>
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
    describe('menu visibility', () => {
      describe('when passed and all are `true`', () => {
        beforeEach(() => {
          props = {
            namesOfMenuVisibilities: ['hideOrders'],
            menuVisibilities: {
              hideOrders: true,
            },
          };
          wrapper = shallow(
            <RestrictedMenuItem {...props}>
              <ItemChild />
            </RestrictedMenuItem>
          );
        });
        it('should not render <ToggleFeature>', () => {
          expect(wrapper).not.toRender(ToggleFeature);
        });
        it('should not render <RestrictedByPermissions>', () => {
          expect(wrapper).not.toRender(RestrictedByPermissions);
        });
      });
      describe('when passed and some are `false`', () => {
        beforeEach(() => {
          props = {
            namesOfMenuVisibilities: ['hideOrders', 'hideDashboard'],
            menuVisibilities: {
              hideOrders: true,
              hideDashboard: false,
            },
            permissions: [permissions.ViewProducts],
          };
          wrapper = shallow(
            <RestrictedMenuItem {...props}>
              <ItemChild />
            </RestrictedMenuItem>
          );
        });
        it('should match snapshot', () => {
          expect(wrapper).toMatchSnapshot();
        });
        it('should render <RestrictedByPermissions>', () => {
          expect(wrapper).toRender(RestrictedByPermissions);
        });
      });
    });
  });
  describe('<MenuItemLink>', () => {
    const LinkLabel = () => <span>{'Customers'}</span>;
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
          expect(localStorage.put).toHaveBeenCalledWith(
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
          expect(localStorage.put).toHaveBeenCalledWith(
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
    let iconTheme;
    describe('when isActive is true', () => {
      beforeEach(() => {
        const isActive = true;
        const isAlternativeTheme = false;
        iconTheme = getIconTheme(isActive, isAlternativeTheme);
      });
      it('should get green theme', () => {
        expect(iconTheme).toBe('green-light');
      });
    });
    describe('when isActive is false', () => {
      describe('when alternative theme is true', () => {
        beforeEach(() => {
          const isActive = false;
          const isAlternativeTheme = true;
          iconTheme = getIconTheme(isActive, isAlternativeTheme);
        });
        it('should get grey theme', () => {
          expect(iconTheme).toBe('grey');
        });
      });
      describe('when alternative theme is false', () => {
        beforeEach(() => {
          const isActive = false;
          const isAlternativeTheme = false;
          iconTheme = getIconTheme(isActive, isAlternativeTheme);
        });
        it('should get white theme', () => {
          expect(iconTheme).toBe('white');
        });
      });
    });
  });
});
