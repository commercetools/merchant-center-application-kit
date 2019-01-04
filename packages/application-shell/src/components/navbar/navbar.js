import React from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';
import { FormattedMessage } from 'react-intl';
import { NavLink, matchPath, withRouter } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { ToggleFeature, injectFeatureToggle } from '@flopflip/react-broadcast';
import { compose, withProps } from 'recompose';
import classnames from 'classnames';
import { oneLineTrim } from 'common-tags';
import {
  BackIcon,
  TreeStructureIcon,
  UserFilledIcon,
  SpeedometerIcon,
  TagMultiIcon,
  CartIcon,
  BoxIcon,
  GearIcon,
  SupportIcon,
  WorldIcon,
  HeartIcon,
  PaperclipIcon,
  PluginIcon,
  RocketIcon,
  StarIcon,
  ConnectedSquareIcon,
} from '@commercetools-frontend/ui-kit';
import MissingImageSvg from '@commercetools-frontend/assets/images/image__missing_image.svg';
import * as storage from '@commercetools-frontend/storage';
import {
  GRAPHQL_TARGETS,
  NO_VALUE_FALLBACK,
} from '@commercetools-frontend/constants';
import { RestrictedByPermissions } from '@commercetools-frontend/permissions';
import { STORAGE_KEYS } from '../../constants';
import { PROJECT_EXTENSIONS } from './feature-toggles';
import LoadingPlaceholder from '../loading-placeholder';
import FetchProjectExtensionsNavbar from './fetch-project-extensions-navbar.graphql';
import styles from './navbar.mod.css';
import { defaultNavigationItems } from './config';
import messages from './messages';

/*
<DataMenu data={[]}>
  <MenuGroup>
    <MenuItem>
      <MenuItemLink linkTo="/foo">(icon) Products</MenuItemLink>
      <MenuGroup>
        <MenuItemLink linkTo="/foo/new">Add product</MenuItemLink>
      </MenuGroup>
    </MenuItem>
  </MenuGroup>
  <MenuExpander/>
</DataMenu>
*/

// This component receives the icon name as a string
// and statically maps it to the related icon component.
// We need to do this to avoid importing ALL icons and pick
// the icon dynamically.
// https://github.com/commercetools/ui-kit/pull/270
// TODO: find a better solution once we implement
// https://github.com/commercetools/merchant-center-application-kit/issues/37
// which moves the static navbar config out of the AppShell,
// in which case we don't have a clue on the icons used.
// A possible solution to that would be to import the SVG using
// a `<img src>`, given that the SVG are available from a public URL.
export const IconSwitcher = ({ iconName, ...iconProps }) => {
  switch (iconName) {
    // Application icons
    case 'TreeStructureIcon':
      return <TreeStructureIcon {...iconProps} />;
    case 'UserFilledIcon':
      return <UserFilledIcon {...iconProps} />;
    case 'SpeedometerIcon':
      return <SpeedometerIcon {...iconProps} />;
    case 'TagMultiIcon':
      return <TagMultiIcon {...iconProps} />;
    case 'CartIcon':
      return <CartIcon {...iconProps} />;
    case 'BoxIcon':
      return <BoxIcon {...iconProps} />;
    case 'GearIcon':
      return <GearIcon {...iconProps} />;
    case 'SupportIcon':
      return <SupportIcon {...iconProps} />;
    // Custom application icons set
    case 'HeartIcon':
      return <HeartIcon {...iconProps} />;
    case 'PaperclipIcon':
      return <PaperclipIcon {...iconProps} />;
    case 'PluginIcon':
      return <PluginIcon {...iconProps} />;
    case 'RocketIcon':
      return <RocketIcon {...iconProps} />;
    case 'StarIcon':
      return <StarIcon {...iconProps} />;
    case 'ConnectedSquareIcon':
      return <ConnectedSquareIcon {...iconProps} />;
    // For backwards compatibility
    case 'WorldIcon':
      return <WorldIcon {...iconProps} />;
    default:
      return <img src={MissingImageSvg} />;
  }
};
IconSwitcher.displayName = 'IconSwitcher';
IconSwitcher.propTypes = { iconName: PropTypes.string.isRequired };

export const MenuExpander = props => (
  <li
    key="expander"
    className={classnames(styles['list-item'], styles.expander, {
      [styles.hidden]: !props.isVisible,
    })}
  >
    <div onClick={props.onClick} className={styles['expand-icon']}>
      {/*
        FIXME: define hover effect.
        https://github.com/commercetools/merchant-center-frontend/issues/2216
      */}
      <BackIcon theme="white" size="big" />
    </div>
  </li>
);
MenuExpander.displayName = 'MenuExpander';
MenuExpander.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export const MenuGroup = props => (
  <ul
    className={classnames(
      { [styles.list]: props.level === 1 },
      { [styles.sublist]: props.level === 2 },
      {
        [styles['sublist-no-children']]: props.level === 2 && !props.children,
      },
      {
        [styles['sublist-expanded__active']]:
          props.level === 2 && props.isActive && props.isExpanded,
      },
      props.level === 2 && props.isActive && !props.isExpanded
        ? styles['sublist-collapsed__active']
        : styles.sublist__inactive
    )}
  >
    {props.children}
  </ul>
);
MenuGroup.displayName = 'MenuGroup';
MenuGroup.propTypes = {
  level: PropTypes.oneOf([1, 2]).isRequired,
  isActive: PropTypes.bool,
  isExpanded: PropTypes.bool,
  children: PropTypes.node,
};

export const MenuItem = props => (
  <li
    className={classnames(styles['list-item'], {
      [styles.item__active]: props.isActive,
      [styles['item_menu-collapsed']]: !props.isMenuOpen,
      [styles['item__no-submenu']]: !props.hasSubmenu,
    })}
    onClick={props.onClick}
    onMouseEnter={props.onMouseEnter}
    onMouseLeave={props.onMouseLeave}
  >
    <div className={styles['item-link']}>{props.children}</div>
  </li>
);
MenuItem.displayName = 'MenuItem';
MenuItem.propTypes = {
  hasSubmenu: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
  isMenuOpen: PropTypes.bool.isRequired,
  isBottomItem: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export class MenuItemLink extends React.PureComponent {
  static displayName = 'MenuItemLink';
  static propTypes = {
    linkTo: PropTypes.string,
    exactMatch: PropTypes.bool,
    externalLink: PropTypes.string,
    tracking: PropTypes.shape({
      'data-track-component': PropTypes.string,
      'data-track-event': PropTypes.string,
      'data-track-label': PropTypes.string,
    }),
    children: PropTypes.node.isRequired,
    useFullRedirectsForLinks: PropTypes.bool.isRequired,
  };
  static defaultProps = {
    exactMatch: false,
    tracking: {},
  };
  redirectTo = targetUrl => window.location.replace(targetUrl);
  render() {
    if (this.props.externalLink) {
      return (
        <a
          href={this.props.externalLink}
          rel="noopener noreferrer"
          target="_blank"
          {...this.props.tracking}
        >
          {this.props.children}
        </a>
      );
    }
    return this.props.linkTo ? (
      <NavLink
        to={this.props.linkTo}
        exact={this.props.exactMatch}
        activeClassName={styles.highlighted}
        className={styles['text-link']}
        onClick={event => {
          if (this.props.useFullRedirectsForLinks) {
            event.preventDefault();
            this.redirectTo(this.props.linkTo);
          }
        }}
      >
        {this.props.children}
      </NavLink>
    ) : (
      this.props.children
    );
  }
}

// This component just render two divs with borders in order to differentiate
// the settings plugin from the other ones
export const MenuItemDivider = () => (
  <div className={styles['divider-first-item']}>
    <div className={styles['divider-second-item']} />
  </div>
);

MenuItemDivider.displayName = 'MenuItemDivider';

// This component wraps `<RestrictedByPermissions>`
// and the `<ToggleFeature>` components. However, it's necessary to have it as
// the `<ToggleFeature>` wrapper should be rendered only if the `featureToggle`
// prop is defined. This is because `<ToggleFeature>` will not render any
// children if the flag is missing/not found.
export const RestrictedMenuItem = props => {
  // NOTE: Custom application are activated/deactivated while their
  // visibility is not controlled via a visibiility overwrite.
  if (
    props.namesOfMenuVisibilities &&
    props.namesOfMenuVisibilities.every(
      nameOfMenuVisibility =>
        props.menuVisibilities[nameOfMenuVisibility] === true
    )
  )
    return null;

  const permissionsWrapper =
    props.permissions.length > 0 ? (
      <RestrictedByPermissions
        permissions={props.permissions}
        // Always check that some of the given permissions match.
        shouldMatchSomePermissions={true}
      >
        {props.children}
      </RestrictedByPermissions>
    ) : (
      props.children
    );

  return props.featureToggle ? (
    <ToggleFeature flag={props.featureToggle}>
      {permissionsWrapper}
    </ToggleFeature>
  ) : (
    permissionsWrapper
  );
};
RestrictedMenuItem.displayName = 'RestrictedMenuItem';
RestrictedMenuItem.propTypes = {
  featureToggle: PropTypes.string,
  namesOfMenuVisibilities: PropTypes.arrayOf(PropTypes.string),
  menuVisibilities: PropTypes.object.isRequired,
  permissions: PropTypes.arrayOf(PropTypes.string.isRequired),
  children: PropTypes.element.isRequired,
};
RestrictedMenuItem.defaultProps = {
  permissions: [],
};
export const getIconTheme = (menu, isActive) => {
  const baseIconTheme =
    menu.key === 'Settings' || menu.key === 'Support' ? 'grey' : 'white';
  if (isActive) return 'green-light';
  return baseIconTheme;
};
export class DataMenu extends React.PureComponent {
  static displayName = 'DataMenu';
  static propTypes = {
    rootNode: PropTypes.any,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        labelKey: PropTypes.string,
        labelAllLocales: PropTypes.arrayOf(
          PropTypes.shape({
            locale: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
          }).isRequired
        ),
        uriPath: PropTypes.string,
        externalLink: PropTypes.string,
        tracking: PropTypes.object,
        icon: PropTypes.string.isRequired,
        featureToggle: PropTypes.string,
        permissions: PropTypes.arrayOf(PropTypes.string.isRequired),
        submenu: PropTypes.arrayOf(
          PropTypes.shape({
            key: PropTypes.string.isRequired,
            labelKey: PropTypes.string,
            labelAllLocales: PropTypes.arrayOf(
              PropTypes.shape({
                locale: PropTypes.string.isRequired,
                value: PropTypes.string.isRequired,
              }).isRequired
            ),
            uriPath: PropTypes.string.isRequired,
            featureToggle: PropTypes.string,
            permissions: PropTypes.arrayOf(PropTypes.string.isRequired),
            nameOfMenuVisibility: PropTypes.string,
          })
        ),
      })
    ),
    applicationLanguage: PropTypes.string.isRequired,
    projectKey: PropTypes.string.isRequired,
    isForcedMenuOpen: PropTypes.bool,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    useFullRedirectsForLinks: PropTypes.bool.isRequired,
  };
  state = {
    activeItemIndex: null,
    isExpanderVisible: true,
    isMenuOpen: false,
  };

  bottomMenuItems = ['Support'];

  componentDidMount() {
    window.addEventListener('click', this.shouldCloseMenuFly, true);
    window.addEventListener('resize', this.checkSize);

    this.checkSize();
  }

  componentDidUpdate() {
    if (this.state.isMenuOpen) document.body.classList.add('body__menu-open');
    if (!this.state.isMenuOpen)
      document.body.classList.remove('body__menu-open');
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.checkSize);
    window.removeEventListener('click', this.shouldCloseMenuFly, true);
  }

  checkSize = () => {
    const shouldOpen = window.innerWidth > 1024;
    const canExpandMenu = window.innerWidth > 918;

    // If the screen is small, we should always keep the menu closed,
    // no matter the settings.
    if (!canExpandMenu) {
      if (this.state.isMenuOpen || this.state.isExpanderVisible)
        this.setState({
          // and resets the state to avoid conflicts
          isMenuOpen: false,
          isExpanderVisible: false,
          activeItemIndex: null,
        });
    } else if (canExpandMenu && this.state.isExpanderVisible !== true)
      this.setState({ isExpanderVisible: true });
    else if (
      isNil(this.props.isForcedMenuOpen) &&
      this.state.isMenuOpen !== shouldOpen
    )
      // User has no settings yet (this.props.isForcedMenuOpen === null)
      // We check the viewport size and:
      // - if screen is big, we open the menu
      // - if screen is small we close it
      this.setState({ isMenuOpen: shouldOpen, isExpanderVisible: true });
    else if (
      !isNil(this.props.isForcedMenuOpen) &&
      this.state.isMenuOpen !== this.props.isForcedMenuOpen
    )
      // User has setting, we should use that and ignore the screen size.
      // Note: if viewport size is small, we should ignore the user settings.
      this.setState({
        isMenuOpen: this.props.isForcedMenuOpen,
        isExpanderVisible: true,
      });
  };

  isMainMenuRouteActive = link => {
    const match = matchPath(this.props.location.pathname, {
      path: `/${this.props.projectKey}/${link}`,
      exact: false,
      strict: false,
    });
    return Boolean(match);
  };

  handleToggleItem = (menuType, index) => {
    const activeItem = `${menuType}-${index}`;
    if (this.state.activeItemIndex !== activeItem)
      this.setState({ activeItemIndex: activeItem });
  };

  shouldCloseMenuFly = event => {
    if (
      this.props.rootNode &&
      !this.props.rootNode.contains(event.target) &&
      !this.state.isMenuOpen
    )
      this.setState({ activeItemIndex: null });
    else if (event.type === 'mouseleave')
      this.setState({ activeItemIndex: null });
  };

  handleToggleMenu = () => {
    if (this.state.isMenuOpen && this.state.activeItemIndex !== null)
      this.setState({ activeItemIndex: null });

    this.setState(prevState => {
      const nextIsMenuOpen = !prevState.isMenuOpen;
      storage.put(STORAGE_KEYS.IS_FORCED_MENU_OPEN, nextIsMenuOpen);
      return { isMenuOpen: nextIsMenuOpen };
    });
  };

  renderLabel = menu => {
    if (menu.labelKey) return <FormattedMessage {...messages[menu.labelKey]} />;
    const localizedLabel = menu.labelAllLocales.find(
      loc => loc.locale === this.props.applicationLanguage
    );
    if (localizedLabel) return localizedLabel.value;
    return NO_VALUE_FALLBACK;
  };

  renderMenu = (menu, menuType, index) => {
    const isActive = this.state.activeItemIndex === `${menuType}-${index}`;
    const hasSubmenu = Boolean(menu.submenu) && menu.submenu.length > 0;
    const namesOfMenuVisibilitiesOfAllSubmenus = hasSubmenu
      ? menu.submenu.map(submenu => submenu.menuVisibility).filter(Boolean)
      : [];

    return (
      <RestrictedMenuItem
        key={menu.key}
        featureToggle={menu.featureToggle}
        permissions={menu.permissions}
        namesOfMenuVisibilities={namesOfMenuVisibilitiesOfAllSubmenus}
        menuVisibilities={this.props.menuVisibilities}
      >
        <React.Fragment>
          {menu.key === 'Settings' && <MenuItemDivider />}
          <MenuItem
            hasSubmenu={hasSubmenu}
            isActive={isActive}
            isMenuOpen={this.state.isMenuOpen}
            onClick={() => {
              this.handleToggleItem(menuType, index);
            }}
            onMouseEnter={
              this.state.isMenuOpen
                ? null
                : () => this.handleToggleItem(menuType, index)
            }
            onMouseLeave={
              this.state.isMenuOpen ? null : this.shouldCloseMenuFly
            }
          >
            <MenuItemLink
              externalLink={menu.externalLink}
              tracking={menu.tracking}
              linkTo={
                !this.state.isMenuOpen || !hasSubmenu
                  ? `/${this.props.projectKey}/${menu.uriPath}`
                  : null
              }
              useFullRedirectsForLinks={this.props.useFullRedirectsForLinks}
            >
              <div className={styles['item-icon-text']}>
                <div className={styles.icon}>
                  <IconSwitcher
                    iconName={menu.icon}
                    size="scale"
                    theme={getIconTheme(
                      menu,
                      isActive || this.isMainMenuRouteActive(menu.uriPath)
                    )}
                  />
                </div>
                <div className={styles.title}>{this.renderLabel(menu)}</div>
              </div>
            </MenuItemLink>
            <MenuGroup
              level={2}
              isActive={isActive}
              isExpanded={this.state.isMenuOpen}
            >
              {hasSubmenu
                ? menu.submenu.map(submenu => (
                    <RestrictedMenuItem
                      key={`${menu.key}-submenu-${submenu.key}`}
                      featureToggle={submenu.featureToggle}
                      permissions={submenu.permissions}
                      namesOfMenuVisibilities={[submenu.menuVisibility]}
                      menuVisibilities={this.props.menuVisibilities}
                    >
                      <li className={styles['sublist-item']}>
                        <div className={styles.text}>
                          <MenuItemLink
                            linkTo={oneLineTrim`
                              /${this.props.projectKey}
                              /${submenu.uriPath}
                            `}
                            exactMatch={true}
                            useFullRedirectsForLinks={
                              this.props.useFullRedirectsForLinks
                            }
                          >
                            {this.renderLabel(submenu)}
                          </MenuItemLink>
                        </div>
                      </li>
                    </RestrictedMenuItem>
                  ))
                : null}
            </MenuGroup>
          </MenuItem>
        </React.Fragment>
      </RestrictedMenuItem>
    );
  };

  render() {
    return (
      <MenuGroup level={1}>
        <ScrollableMenu>
          {this.props.data
            .filter(menu => this.bottomMenuItems.indexOf(menu.key))
            .map((menu, index) => this.renderMenu(menu, 'scrollable', index))}
        </ScrollableMenu>
        <FixedMenu>
          {this.props.data
            .filter(menu => !this.bottomMenuItems.indexOf(menu.key))
            .map((menu, index) => this.renderMenu(menu, 'fixed', index))}
          <MenuExpander
            isVisible={this.state.isExpanderVisible}
            onClick={this.handleToggleMenu}
          />
        </FixedMenu>
      </MenuGroup>
    );
  }
}

export const ScrollableMenu = props => (
  <div className={styles['scrollable-menu']}>{props.children}</div>
);
ScrollableMenu.displayName = 'ScrollableMenu';
ScrollableMenu.propTypes = {
  children: PropTypes.node,
};

export const FixedMenu = props => (
  <div className={styles['fixed-menu']}>{props.children}</div>
);
FixedMenu.displayName = 'FixedMenu';
FixedMenu.propTypes = {
  children: PropTypes.node,
};

export const NavBarLayout = props => (
  <nav
    ref={props.getNode}
    className={styles['left-navigation']}
    data-test="left-navigation"
    data-track-component="Navigation"
  >
    {props.children}
  </nav>
);
NavBarLayout.displayName = 'NavBarLayout';
NavBarLayout.propTypes = {
  getNode: PropTypes.func.isRequired,
  children: PropTypes.node,
};
NavBarLayout.defaultProps = {
  getNode: () => {},
};

export class NavBar extends React.PureComponent {
  static displayName = 'NavBar';

  static propTypes = {
    // From parent
    applicationLanguage: PropTypes.string.isRequired,
    projectKey: PropTypes.string.isRequired,
    useFullRedirectsForLinks: PropTypes.bool.isRequired,
    menuVisibilities: PropTypes.objectOf(PropTypes.bool).isRequired,
    // Injected
    location: PropTypes.object.isRequired,
    isForcedMenuOpen: PropTypes.bool,
    projectExtensionsQuery: PropTypes.shape({
      projectExtension: PropTypes.shape({
        id: PropTypes.string.isRequired,
        applications: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string.isRequired,
            navbarMenu: PropTypes.object.isRequired,
          })
        ).isRequired,
      }),
    }),

    // injectFeatureToggle
    areProjectExtensionsEnabled: PropTypes.bool.isRequired,
  };

  getNode = node => {
    this.node = node;
  };

  render() {
    return (
      <NavBarLayout getNode={this.getNode}>
        <DataMenu
          rootNode={this.node}
          data={
            this.props.projectExtensionsQuery &&
            this.props.projectExtensionsQuery.projectExtension
              ? defaultNavigationItems.concat(
                  this.props.projectExtensionsQuery.projectExtension.applications.map(
                    app => app.navbarMenu
                  )
                )
              : defaultNavigationItems
          }
          isForcedMenuOpen={this.props.isForcedMenuOpen}
          location={this.props.location}
          applicationLanguage={this.props.applicationLanguage}
          projectKey={this.props.projectKey}
          useFullRedirectsForLinks={this.props.useFullRedirectsForLinks}
        />
      </NavBarLayout>
    );
  }
}

export default compose(
  injectFeatureToggle(PROJECT_EXTENSIONS, 'areProjectExtensionsEnabled'),
  withRouter, // Connect again, to access the `location` object
  withProps(() => {
    const cachedIsForcedMenuOpen = storage.get(
      STORAGE_KEYS.IS_FORCED_MENU_OPEN
    );
    return {
      isForcedMenuOpen:
        typeof cachedIsForcedMenuOpen === 'string'
          ? cachedIsForcedMenuOpen === 'true'
          : null,
    };
  }),
  graphql(FetchProjectExtensionsNavbar, {
    name: 'projectExtensionsQuery',
    skip: ownProps => !ownProps.areProjectExtensionsEnabled,
    options: () => ({
      variables: {
        target: GRAPHQL_TARGETS.SETTINGS_SERVICE,
      },
      fetchPolicy: 'cache-and-network',
    }),
  })
)(NavBar);

export const LoadingNavBar = () => (
  <NavBarLayout>
    <MenuGroup level={1}>
      <React.Fragment>
        {Array.from(new Array(5)).map((_, index) => (
          <MenuItem
            key={index}
            hasSubmenu={false}
            isMenuOpen={false}
            isActive={false}
            onClick={() => {}}
          >
            <div className={styles['loading-dot-container']}>
              <LoadingPlaceholder shape="dot" size="m" />
            </div>
          </MenuItem>
        ))}
      </React.Fragment>
    </MenuGroup>
  </NavBarLayout>
);
LoadingNavBar.displayName = 'LoadingNavBar';
