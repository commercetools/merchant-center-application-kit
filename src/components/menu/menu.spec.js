import { shallow } from 'enzyme';
import React from 'react';
import { FeatureToggled } from '@flopflip/react-broadcast';
import { UnconnectedRestrictedByPermissions } from '@commercetools-local/core/components/with-permissions';
import * as storage from '@commercetools-local/utils/storage';
import { STORAGE_KEYS as CORE_STORAGE_KEYS } from '@commercetools-local/constants';
import {
  Menu,
  DataMenu,
  MenuItemLink,
  MenuItem,
  MenuGroup,
  MenuExpander,
  ToggledWithPermissions,
} from './menu';

jest.mock('@commercetools-local/utils/storage');

const createTestProps = props => ({
  location: {
    pathname: '',
  },
  menuItems: [],
  projectKey: 'test-1',
  projectPermissions: {
    canManageCustomers: false,
    canManageOrders: false,
    canManageOrganization: true,
    canManagePayments: false,
    canManageProducts: false,
    canManageProject: true,
    canManageShippingLists: false,
    canManageTypes: false,
    canViewCustomers: false,
    canViewOrders: false,
    canViewPayments: false,
    canViewProducts: false,
    canViewProjectSettings: false,
    canViewShippingLists: false,
    canViewTypes: false,
  },
  isForcedMenuOpen: false,
  ...props,
});

const createDataMenuTestProps = props => ({
  rootNode: { contains: () => true },
  ...createTestProps(),
  data: [
    {
      name: 'mcng-customers',
      menu: {
        name: 'Customers',
        label: 'Menu.Customers.title',
        link: 'customers',
        icon: 'CustomerFilledIcon',
        submenu: [
          {
            name: 'Add Customer',
            label: 'Menu.Customers.add',
            link: 'customers/new',
          },
        ],
      },
    },
  ],
  ...props,
});

describe('rendering', () => {
  let props;
  let wrapper;
  describe('<Menu>', () => {
    beforeEach(() => {
      props = createTestProps();
      wrapper = shallow(<Menu {...props} />);
    });
    it('should render <nav> element', () => {
      expect(wrapper).toRender('nav');
    });
    it('should render DataMenu component', () => {
      expect(wrapper).toRender('DataMenu');
    });
    describe('<DataMenu>', () => {
      it('should pass rootNode as prop', () => {
        expect(wrapper.find('DataMenu')).toHaveProp('rootNode');
      });
      it('should pass data as prop', () => {
        expect(wrapper.find('DataMenu')).toHaveProp('data', props.menuItems);
      });
      it('should pass projectKey as prop', () => {
        expect(wrapper.find('DataMenu')).toHaveProp(
          'projectKey',
          props.projectKey
        );
      });
      it('should pass projectPermissions as prop', () => {
        expect(wrapper.find('DataMenu')).toHaveProp(
          'projectPermissions',
          props.projectPermissions
        );
      });
      it('should pass isForcedMenuOpen as prop', () => {
        expect(wrapper.find('DataMenu')).toHaveProp(
          'isForcedMenuOpen',
          props.isForcedMenuOpen
        );
      });
      it('should pass location as prop', () => {
        expect(wrapper.find('DataMenu')).toHaveProp('location', props.location);
      });
    });
  });
  describe('<DataMenu>', () => {
    beforeEach(() => {
      props = createDataMenuTestProps();
      wrapper = shallow(<DataMenu {...props} />);
    });
    it('should render <MenuGroup> level 1', () => {
      expect(wrapper.find('MenuGroup').at(0)).toHaveProp('level', 1);
    });
    it('should render <ToggledWithPermissions>', () => {
      expect(wrapper.find('MenuGroup').at(0)).toRender(ToggledWithPermissions);
    });
    describe('<ToggledWithPermissions>', () => {
      beforeEach(() => {
        props = createDataMenuTestProps({
          data: [
            {
              name: 'mcng-customers',
              menu: {
                name: 'Customers',
                label: 'Menu.Customers.title',
                link: 'customers',
                icon: 'CustomerFilledIcon',
                permissions: [{ mode: 'view', resource: 'customers' }],
                featureToggle: 'customerList',
              },
            },
          ],
        });
        wrapper = shallow(<DataMenu {...props} />);
      });
      it('should pass featureToggle as prop', () => {
        expect(
          wrapper
            .find('MenuGroup')
            .at(0)
            .find(ToggledWithPermissions)
        ).toHaveProp('featureToggle', 'customerList');
      });
      it('should pass permissions as prop', () => {
        expect(
          wrapper
            .find('MenuGroup')
            .at(0)
            .find(ToggledWithPermissions)
        ).toHaveProp('permissions', [{ mode: 'view', resource: 'customers' }]);
      });
    });
    describe('<MenuItem>', () => {
      it('should pass hasSubmenu as prop', () => {
        expect(wrapper.find('MenuItem')).toHaveProp('hasSubmenu', true);
      });
      it('should pass isActive as prop', () => {
        expect(wrapper.find('MenuItem')).toHaveProp('isActive', false);
      });
      it('should pass isMenuOpen as prop', () => {
        expect(wrapper.find('MenuItem')).toHaveProp('isMenuOpen', false);
      });
      it('should pass onClick as prop', () => {
        expect(wrapper.find('MenuItem')).toHaveProp(
          'onClick',
          expect.any(Function)
        );
      });
      it('should pass onMouseEnter as prop', () => {
        expect(wrapper.find('MenuItem')).toHaveProp(
          'onMouseEnter',
          expect.any(Function)
        );
      });
      it('should pass onMouseLeave as prop', () => {
        expect(wrapper.find('MenuItem')).toHaveProp(
          'onMouseLeave',
          expect.any(Function)
        );
      });
      describe('<MenuItemLink>', () => {
        it('should render menu label', () => {
          expect(wrapper.find('MenuItemLink').at(0)).toRender({
            id: 'Menu.Customers.title',
          });
        });
        describe('when menu is not open', () => {
          beforeEach(() => {
            wrapper.setState({ isMenuOpen: false });
          });
          it('should pass linkTo as prop', () => {
            expect(wrapper.find('MenuItemLink').at(0)).toHaveProp(
              'linkTo',
              '/test-1/customers'
            );
          });
        });
        describe('when menu is open but there is no submenu', () => {
          beforeEach(() => {
            props = createDataMenuTestProps({
              data: [
                {
                  name: 'mcng-customers',
                  menu: {
                    name: 'Customers',
                    label: 'Menu.Customers.title',
                    link: 'customers',
                    icon: 'CustomerFilledIcon',
                  },
                },
              ],
            });
            wrapper = shallow(<DataMenu {...props} />);
            wrapper.setState({ isMenuOpen: true });
          });
          it('should pass linkTo as prop', () => {
            expect(wrapper.find('MenuItemLink').at(0)).toHaveProp(
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
            expect(wrapper.find('MenuItemLink').at(0)).toHaveProp(
              'linkTo',
              null
            );
          });
        });
        describe('when item is active', () => {
          beforeEach(() => {
            wrapper.setState({ activeItemIndex: 0 });
          });
          it('should render active icon', () => {
            expect(wrapper.find('CustomerFilledIcon')).toHaveProp(
              'theme',
              'green'
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
            expect(wrapper.find('CustomerFilledIcon')).toHaveProp(
              'theme',
              'green'
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
            expect(wrapper.find('CustomerFilledIcon')).toHaveProp(
              'theme',
              'white'
            );
          });
        });
      });
      describe('<MenuGroup> level 2', () => {
        it('should pass level as prop', () => {
          expect(wrapper.find('MenuGroup').at(1)).toHaveProp('level', 2);
        });
        it('should render', () => {
          expect(wrapper.find('MenuGroup').at(1)).toRender(
            ToggledWithPermissions
          );
        });
        describe('<ToggledWithPermissions>', () => {
          beforeEach(() => {
            props = createDataMenuTestProps({
              data: [
                {
                  name: 'mcng-customers',
                  menu: {
                    name: 'Customers',
                    label: 'Menu.Customers.title',
                    link: 'customers',
                    icon: 'CustomerFilledIcon',
                    submenu: [
                      {
                        name: 'Add Customer',
                        label: 'Menu.Customers.add',
                        link: 'customers/new',
                        permissions: [
                          { mode: 'manage', resource: 'customers' },
                        ],
                        featureToggle: 'customerAdd',
                      },
                    ],
                  },
                },
              ],
            });
            wrapper = shallow(<DataMenu {...props} />);
          });
          it('should pass featureToggle as prop', () => {
            expect(
              wrapper
                .find('MenuGroup')
                .at(1)
                .find(ToggledWithPermissions)
            ).toHaveProp('featureToggle', 'customerAdd');
          });
          it('should pass permissions as prop', () => {
            expect(
              wrapper
                .find('MenuGroup')
                .at(1)
                .find(ToggledWithPermissions)
            ).toHaveProp('permissions', [
              { mode: 'manage', resource: 'customers' },
            ]);
          });
        });
        describe('when item is active', () => {
          beforeEach(() => {
            wrapper.setState({ activeItemIndex: 0 });
          });
          it('should pass isActive as prop', () => {
            expect(wrapper.find('MenuGroup').at(1)).toHaveProp(
              'isActive',
              true
            );
          });
        });
        describe('when item is not active', () => {
          beforeEach(() => {
            wrapper.setState({ activeItemIndex: null });
          });
          it('should pass isActive as prop', () => {
            expect(wrapper.find('MenuGroup').at(1)).toHaveProp(
              'isActive',
              false
            );
          });
        });
        describe('when menu is open', () => {
          beforeEach(() => {
            wrapper.setState({ isMenuOpen: true });
          });
          it('should pass isExpanded as prop', () => {
            expect(wrapper.find('MenuGroup').at(1)).toHaveProp(
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
            expect(wrapper.find('MenuGroup').at(1)).toHaveProp(
              'isExpanded',
              false
            );
          });
        });
        describe('when there is a submenu', () => {
          it('should render <MenuItemLink>', () => {
            expect(wrapper.find({ level: 2 })).toRender('MenuItemLink');
          });
          describe('<MenuItemLink>', () => {
            it('should pass linkTo as prop', () => {
              expect(wrapper.find('MenuItemLink').at(1)).toHaveProp(
                'linkTo',
                '/test-1/customers/new'
              );
            });
            it('should render submenu label', () => {
              expect(wrapper.find('MenuItemLink').at(1)).toRender({
                id: 'Menu.Customers.add',
              });
            });
          });
        });
        describe('when there is not a submenu', () => {
          beforeEach(() => {
            props = createDataMenuTestProps({
              data: [
                {
                  name: 'mcng-customers',
                  menu: {
                    name: 'Customers',
                    label: 'Menu.Customers.title',
                    link: 'customers',
                    icon: 'CustomerFilledIcon',
                  },
                },
              ],
            });
            wrapper = shallow(<DataMenu {...props} />);
          });
          it('should not render <MenuItemLink>', () => {
            expect(wrapper.find({ level: 2 })).not.toRender('MenuItemLink');
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
          expect(wrapper.find('MenuExpander')).toHaveProp('isVisible', true);
        });
      });
      describe('when expander is not visible', () => {
        beforeEach(() => {
          wrapper.setState({ isExpanderVisible: false });
        });
        it('should pass isVisible as prop', () => {
          expect(wrapper.find('MenuExpander')).toHaveProp('isVisible', false);
        });
      });
      it('should pass onClick as prop', () => {
        expect(wrapper.find('MenuExpander')).toHaveProp(
          'onClick',
          expect.any(Function)
        );
      });
    });
  });
  describe('<ToggledWithPermissions>', () => {
    const ItemChild = () => <span>{'foo'}</span>;
    describe('<FeatureToggled>', () => {
      describe('when featureToggle is defined', () => {
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
        it('should render <FeatureToggled>', () => {
          expect(wrapper).toRender(FeatureToggled);
        });
        it('should pass flag as prop', () => {
          expect(wrapper.find(FeatureToggled)).toHaveProp('flag', 'myFeature');
        });
      });
      describe('when featureToggle is not defined', () => {
        beforeEach(() => {
          wrapper = shallow(
            <ToggledWithPermissions actualPermissions={{}}>
              <ItemChild />
            </ToggledWithPermissions>
          );
        });
        it('should render <FeatureToggled>', () => {
          expect(wrapper).not.toRender('FeatureToggled');
        });
      });
    });
    describe('<UnconnectedRestrictedByPermissions>', () => {
      it('should render <UnconnectedRestrictedByPermissions>', () => {
        expect(wrapper).toRender(UnconnectedRestrictedByPermissions);
      });
      describe('when permissions are defined', () => {
        beforeEach(() => {
          props = {
            permissions: [{ mode: 'view', resource: 'products' }],
            actualPermissions: { canViewProducts: true },
          };
          wrapper = shallow(
            <ToggledWithPermissions {...props}>
              <ItemChild />
            </ToggledWithPermissions>
          );
        });
        it('should pass permissions as prop', () => {
          expect(wrapper.find(UnconnectedRestrictedByPermissions)).toHaveProp(
            'permissions',
            [{ mode: 'view', resource: 'products' }]
          );
        });
        it('should pass isAuthorized as prop (true)', () => {
          expect(wrapper.find(UnconnectedRestrictedByPermissions)).toHaveProp(
            'isAuthorized',
            true
          );
        });
      });
      describe('when permissions are not defined', () => {
        beforeEach(() => {
          props = {
            permissions: undefined,
            actualPermissions: {},
          };
          wrapper = shallow(
            <ToggledWithPermissions {...props}>
              <ItemChild />
            </ToggledWithPermissions>
          );
        });
        it('should pass permissions as prop', () => {
          expect(wrapper.find(UnconnectedRestrictedByPermissions)).toHaveProp(
            'permissions',
            []
          );
        });
        it('should pass isAuthorized as prop', () => {
          expect(wrapper.find(UnconnectedRestrictedByPermissions)).toHaveProp(
            'isAuthorized',
            true
          );
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
        };
        wrapper = shallow(
          <MenuItemLink {...props}>
            <LinkLabel />
          </MenuItemLink>
        );
      });
      it('should render <NavLink>', () => {
        expect(wrapper).toRender('NavLink');
      });
      it('should pass to as prop', () => {
        expect(wrapper.find('NavLink')).toHaveProp('to', '/test-1/customers');
      });
      it('should pass exact as prop', () => {
        expect(wrapper.find('NavLink')).toHaveProp('exact', true);
      });
      it('should pass activeClassName as prop', () => {
        expect(wrapper.find('NavLink')).toHaveProp(
          'activeClassName',
          'highlighted'
        );
      });
      it('should render children', () => {
        expect(wrapper).toRender(LinkLabel);
      });
    });
    describe('when linkTo is not defined', () => {
      beforeEach(() => {
        wrapper = shallow(
          <MenuItemLink>
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
    describe('componentWillReceiveProps', () => {
      describe('when isForcedMenuOpen changes', () => {
        beforeEach(() => {
          wrapper.setState({ isMenuOpen: false });
          wrapper
            .instance()
            .componentWillReceiveProps({ isForcedMenuOpen: true });
        });
        it('should update isMenuOpen', () => {
          expect(wrapper).toHaveState('isMenuOpen', true);
        });
      });
      describe('when isForcedMenuOpen does not change', () => {
        beforeEach(() => {
          wrapper.setState({ isMenuOpen: false });
          wrapper
            .instance()
            .componentWillReceiveProps({ isForcedMenuOpen: false });
        });
        it('should not update isMenuOpen', () => {
          expect(wrapper).toHaveState('isMenuOpen', false);
        });
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
          wrapper.setState({ activeItemIndex: 1 });
          wrapper
            .instance()
            .handleToggleItem({ target: { dataset: { target: 'toggle' } } }, 0);
        });
        it('should update activeItemIndex with the new index', () => {
          expect(wrapper).toHaveState('activeItemIndex', 0);
        });
      });
      describe('if activeItemIndex is the same as the given index and the event is the same as the target', () => {
        beforeEach(() => {
          wrapper.setState({ activeItemIndex: 0 });
          wrapper
            .instance()
            .handleToggleItem({ target: { dataset: { target: 'toggle' } } }, 0);
        });
        it('should unset activeItemIndex', () => {
          expect(wrapper).toHaveState('activeItemIndex', null);
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
          wrapper.setState({ isMenuOpen: true, activeItemIndex: 0 });
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
          expect(storage.get(CORE_STORAGE_KEYS.IS_FORCED_MENU_OPEN)).toBe(
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
          expect(storage.get(CORE_STORAGE_KEYS.IS_FORCED_MENU_OPEN)).toBe(true);
        });
      });
    });
  });
});
