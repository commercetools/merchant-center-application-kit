import type { ComponentProps } from 'react';
import type { RouteComponentProps } from 'react-router-dom';
import { renderApp, screen } from '../../test-utils';
import type { TNavbarMenu } from '../../types/generated/proxy';
import { ApplicationMenu } from './navbar';

type TApplicationMenuProps = ComponentProps<typeof ApplicationMenu>;

const createTestLocation = (pathname: string) =>
  ({
    pathname,
    search: '',
    hash: '',
    state: undefined,
  } as RouteComponentProps['location']);

const createTestMenu = (menu: Partial<TNavbarMenu> = {}): TNavbarMenu => ({
  key: 'products',
  uriPath: 'products',
  icon: '<svg><path fill="#000000" /></svg>',
  labelAllLocales: [{ locale: 'en', value: 'Products' }],
  permissions: [],
  submenu: [
    {
      key: 'products-new',
      uriPath: 'products/new',
      labelAllLocales: [{ locale: 'en', value: 'Add product' }],
      permissions: [],
    },
  ],
  ...menu,
});

const createTestProps = (
  props: Partial<TApplicationMenuProps> = {}
): TApplicationMenuProps => ({
  location: createTestLocation('/test-project/products'),
  menu: createTestMenu(),
  // The submenu is only rendered for the active menu item.
  isActive: true,
  isMenuOpen: true,
  shouldCloseMenuFly: jest.fn(),
  isUserAdminOfCurrentProject: true,
  projectPermissions: {
    permissions: null,
    actionRights: null,
    dataFences: null,
  },
  handleToggleItem: jest.fn(),
  applicationLocale: 'en',
  projectKey: 'test-project',
  useFullRedirectsForLinks: false,
  onMouseMove: jest.fn(),
  mousePosition: { clientX: 0, clientY: 0 },
  ...props,
});

const renderApplicationMenu = (
  props: Partial<TApplicationMenuProps> = {},
  route: string
) => {
  const testProps = createTestProps({
    location: createTestLocation(route),
    ...props,
  });
  return renderApp(<ApplicationMenu {...testProps} />, {
    disableAutomaticEntryPointRoutes: true,
    route,
  });
};

// The submenu list is only revealed on hover, so its links are not part of the
// accessibility tree and can't be queried by role.
const findSubmenuLink = (name: string) => screen.findByLabelText(name);

beforeEach(() => {
  window.IntersectionObserver = jest.fn(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  })) as unknown as typeof window.IntersectionObserver;
});

describe('when the menu item belongs to a project-scoped application', () => {
  it('should link to the routes prefixed with the project key', async () => {
    renderApplicationMenu({}, '/test-project/products');

    expect(
      await screen.findByRole('link', { name: 'Products' })
    ).toHaveAttribute('href', '/test-project/products');
    expect(await findSubmenuLink('Add product')).toHaveAttribute(
      'href',
      '/test-project/products/new'
    );
  });

  it('should mark the links of the current route as active', async () => {
    renderApplicationMenu({}, '/test-project/products/new');

    expect(
      await screen.findByRole('link', { name: 'Products' })
    ).toHaveAttribute('aria-current', 'page');
    expect(await findSubmenuLink('Add product')).toHaveAttribute(
      'aria-current',
      'page'
    );
  });
});

describe('when the menu item belongs to a project-keyless application', () => {
  const menu = createTestMenu({
    key: 'agent-sphere',
    uriPath: 'agent-sphere',
    labelAllLocales: [{ locale: 'en', value: 'Agent Sphere' }],
    submenu: [
      {
        key: 'agent-sphere-conversations',
        uriPath: 'agent-sphere/conversations',
        labelAllLocales: [{ locale: 'en', value: 'Conversations' }],
        permissions: [],
      },
    ],
  });

  it('should link to the routes without the project key', async () => {
    renderApplicationMenu({ menu }, '/agent-sphere');

    expect(
      await screen.findByRole('link', { name: 'Agent Sphere' })
    ).toHaveAttribute('href', '/agent-sphere');
    expect(await findSubmenuLink('Conversations')).toHaveAttribute(
      'href',
      '/agent-sphere/conversations'
    );
  });

  it('should mark the links of the current route as active', async () => {
    renderApplicationMenu({ menu }, '/agent-sphere/conversations');

    expect(
      await screen.findByRole('link', { name: 'Agent Sphere' })
    ).toHaveAttribute('aria-current', 'page');
    expect(await findSubmenuLink('Conversations')).toHaveAttribute(
      'aria-current',
      'page'
    );
  });
});
