import React from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';
import { FormattedMessage } from 'react-intl';
import { NavLink, matchPath, withRouter } from 'react-router-dom';
import { useQuery } from 'react-apollo';
import { ToggleFeature, useFeatureToggle } from '@flopflip/react-broadcast';
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
} from '@commercetools-uikit/icons';
import MissingImageSvg from '@commercetools-frontend/assets/images/diagonal-line.svg';
import {
  GRAPHQL_TARGETS,
  NO_VALUE_FALLBACK,
  SUPPORT_PORTAL_URL,
} from '@commercetools-frontend/constants';
import { RestrictedByPermissions } from '@commercetools-frontend/permissions';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import { PROJECT_EXTENSIONS } from '../../feature-toggles';
import { STORAGE_KEYS } from '../../constants';
import useApplicationsMenu from '../../hooks/use-applications-menu';
import { GtmContext } from '../gtm-booter';
import LoadingPlaceholder from '../loading-placeholder';
import FetchProjectExtensionsNavbar from './fetch-project-extensions-navbar.settings.graphql';
import styles from './navbar.mod.css';
import messages from './messages';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';

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
      <BackIcon color="surface" size="big" />
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
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    useFullRedirectsForLinks: PropTypes.bool,
  };
  static defaultProps = {
    exactMatch: false,
  };
  static contextType = GtmContext;
  redirectTo = targetUrl => window.location.replace(targetUrl);
  render() {
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
          } else if (this.props.onClick) {
            event.persist();
            this.props.onClick(event, this.context.track);
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
const hasMenuEveryMenuVisibilitySetToBeHidden = (
  namesOfMenuVisibilities,
  menuVisibilities
) =>
  Array.isArray(namesOfMenuVisibilities) &&
  namesOfMenuVisibilities.length > 0 &&
  namesOfMenuVisibilities.every(
    nameOfMenuVisibility => menuVisibilities[nameOfMenuVisibility] === true
  );
const isMenuItemDisabledForEnvironment = (keyOfMenuItem, disabledMenuItems) =>
  disabledMenuItems && disabledMenuItems.includes(keyOfMenuItem);
export const RestrictedMenuItem = props => {
  // NOTE: Custom application are activated/deactivated while their
  // visibility is not controlled via a visibiility overwrite.
  if (
    hasMenuEveryMenuVisibilitySetToBeHidden(
      props.namesOfMenuVisibilities,
      props.menuVisibilities
    ) ||
    isMenuItemDisabledForEnvironment(
      props.keyOfMenuItem,
      props.disabledMenuItems
    )
  )
    return null;

  const permissionsWrapper =
    (Array.isArray(props.permissions) && props.permissions.length > 0) ||
    (Array.isArray(props.dataFences) && props.dataFences.length > 0) ? (
      <RestrictedByPermissions
        permissions={props.permissions}
        actionRights={props.actionRights}
        dataFences={props.dataFences}
        selectDataFenceData={demandedDataFence => {
          switch (demandedDataFence.type) {
            case 'store':
              return demandedDataFence.actualDataFenceValues;
            default:
              return null;
          }
        }}
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
  disabledMenuItems: PropTypes.arrayOf(PropTypes.string),
  keyOfMenuItem: PropTypes.string.isRequired,
  dataFences: PropTypes.arrayOf(
    PropTypes.shape({
      group: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    })
  ),
  permissions: PropTypes.arrayOf(PropTypes.string.isRequired),
  actionRights: PropTypes.arrayOf(
    PropTypes.shape({
      group: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired
  ),
  children: PropTypes.element.isRequired,
};
RestrictedMenuItem.defaultProps = {
  permissions: [],
};
export const getIconColor = (isActive, isAlternativeTheme) => {
  if (isActive) return 'primary40';
  return isAlternativeTheme ? 'neutral60' : 'surface';
};
const getMenuVisibilitiesOfSubmenus = menu =>
  menu.submenu.map(submenu => submenu.menuVisibility).filter(Boolean);
const getMenuVisibilityOfMainmenu = menu =>
  [menu.menuVisibility].filter(Boolean);
export class DataMenu extends React.PureComponent {
  static displayName = 'DataMenu';
  static propTypes = {
    rootNode: PropTypes.any,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        labelAllLocales: PropTypes.arrayOf(
          PropTypes.shape({
            locale: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
          }).isRequired
        ),
        uriPath: PropTypes.string,
        icon: PropTypes.string.isRequired,
        featureToggle: PropTypes.string,
        permissions: PropTypes.arrayOf(PropTypes.string.isRequired),
        dataFences: PropTypes.arrayOf(
          PropTypes.shape({
            group: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
          })
        ),
        actionRights: PropTypes.arrayOf(
          PropTypes.shape({
            group: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
          }).isRequired
        ),
        submenu: PropTypes.arrayOf(
          PropTypes.shape({
            key: PropTypes.string.isRequired,
            labelAllLocales: PropTypes.arrayOf(
              PropTypes.shape({
                locale: PropTypes.string.isRequired,
                value: PropTypes.string.isRequired,
              }).isRequired
            ),
            uriPath: PropTypes.string.isRequired,
            featureToggle: PropTypes.string,
            permissions: PropTypes.arrayOf(PropTypes.string.isRequired),
            dataFences: PropTypes.arrayOf(
              PropTypes.shape({
                group: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
                type: PropTypes.string.isRequired,
              })
            ),
            actionRights: PropTypes.arrayOf(
              PropTypes.shape({
                group: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
              }).isRequired
            ),
            menuVisibility: PropTypes.string,
          })
        ),
        shouldRenderDivider: PropTypes.bool,
      })
    ),
    menuVisibilities: PropTypes.objectOf(PropTypes.bool).isRequired,
    applicationLocale: PropTypes.string.isRequired,
    projectKey: PropTypes.string.isRequired,
    disabledMenuItems: PropTypes.arrayOf(PropTypes.string.isRequired),
    isForcedMenuOpen: PropTypes.bool,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    useFullRedirectsForLinks: PropTypes.bool,
    onMenuItemClick: PropTypes.func,
  };
  state = {
    activeItemIndex: null,
    isExpanderVisible: true,
    isMenuOpen: false,
  };

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
      window.localStorage.setItem(
        STORAGE_KEYS.IS_FORCED_MENU_OPEN,
        nextIsMenuOpen
      );
      return { isMenuOpen: nextIsMenuOpen };
    });
  };

  renderLabel = menu => {
    const localizedLabel = menu.labelAllLocales.find(loc =>
      this.props.applicationLocale.startsWith(loc.locale)
    );
    if (localizedLabel) return localizedLabel.value;
    return NO_VALUE_FALLBACK;
  };

  renderMenu = (menu, menuType, index) => {
    const isActive = this.state.activeItemIndex === `${menuType}-${index}`;
    const hasSubmenu = Boolean(menu.submenu) && menu.submenu.length > 0;
    const namesOfMenuVisibilitiesOfAllSubmenus = hasSubmenu
      ? getMenuVisibilitiesOfSubmenus(menu)
      : getMenuVisibilityOfMainmenu(menu);

    return (
      <RestrictedMenuItem
        key={menu.key}
        keyOfMenuItem={menu.key}
        featureToggle={menu.featureToggle}
        permissions={menu.permissions}
        actionRights={menu.actionRights}
        dataFences={menu.dataFences}
        menuVisibilities={this.props.menuVisibilities}
        namesOfMenuVisibilities={namesOfMenuVisibilitiesOfAllSubmenus}
        disabledMenuItems={this.props.disabledMenuItems}
      >
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
          onMouseLeave={this.state.isMenuOpen ? null : this.shouldCloseMenuFly}
        >
          <MenuItemLink
            linkTo={
              !this.state.isMenuOpen || !hasSubmenu
                ? `/${this.props.projectKey}/${menu.uriPath}`
                : null
            }
            useFullRedirectsForLinks={this.props.useFullRedirectsForLinks}
            onClick={this.props.onMenuItemClick}
          >
            <div className={styles['item-icon-text']}>
              <div className={styles.icon}>
                <IconSwitcher
                  iconName={menu.icon}
                  size="scale"
                  color={getIconColor(
                    isActive || this.isMainMenuRouteActive(menu.uriPath),
                    menu.shouldRenderDivider
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
                    keyOfMenuItem={submenu.key}
                    featureToggle={submenu.featureToggle}
                    permissions={submenu.permissions}
                    actionRights={submenu.actionRights}
                    dataFences={submenu.dataFences}
                    menuVisibilities={this.props.menuVisibilities}
                    namesOfMenuVisibilities={[submenu.menuVisibility]}
                    disabledMenuItems={this.props.disabledMenuItems}
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
                          onClick={this.props.onMenuItemClick}
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
      </RestrictedMenuItem>
    );
  };

  renderSupportLink = () => {
    const itemIndex = ['fixed', 'support'];
    const isAlternativeTheme = true;
    const isActive = this.state.activeItemIndex === itemIndex.join('-');
    return (
      <MenuItem
        hasSubmenu={false}
        isActive={false}
        isMenuOpen={this.state.isMenuOpen}
        onClick={() => {
          this.handleToggleItem(...itemIndex);
        }}
        onMouseEnter={
          this.state.isMenuOpen
            ? null
            : () => this.handleToggleItem(...itemIndex)
        }
        onMouseLeave={this.state.isMenuOpen ? null : this.shouldCloseMenuFly}
      >
        <a href={SUPPORT_PORTAL_URL} rel="noopener noreferrer" target="_blank">
          <div className={styles['item-icon-text']}>
            <div className={styles.icon}>
              <SupportIcon
                size="scale"
                color={getIconColor(isActive, isAlternativeTheme)}
              />
            </div>
            <div className={styles.title}>
              <FormattedMessage {...messages['NavBar.MCSupport.title']} />
            </div>
          </div>
        </a>
      </MenuItem>
    );
  };

  render() {
    return (
      <MenuGroup level={1}>
        <div className={styles['scrollable-menu']}>
          {this.props.data.map((menu, index) => (
            <React.Fragment key={index}>
              {menu.shouldRenderDivider && <MenuItemDivider />}
              {this.renderMenu(menu, 'scrollable', index)}
            </React.Fragment>
          ))}
        </div>
        <div className={styles['fixed-menu']}>
          {this.renderSupportLink()}
          <MenuExpander
            isVisible={this.state.isExpanderVisible}
            onClick={this.handleToggleMenu}
          />
        </div>
      </MenuGroup>
    );
  }
}

export const NavBarLayout = React.forwardRef((props, ref) => (
  <nav
    ref={ref}
    className={styles['left-navigation']}
    data-test="left-navigation"
    data-track-component="Navigation"
  >
    {props.children}
  </nav>
));
NavBarLayout.displayName = 'NavBarLayout';
NavBarLayout.propTypes = {
  children: PropTypes.node,
};

export const NavBar = props => {
  const ref = React.useRef();
  const areProjectExtensionsEnabled = useFeatureToggle(PROJECT_EXTENSIONS);
  const disabledMenuItems = useApplicationContext(
    context => context.environment.disabledMenuItems
  );
  const menuVisibilities = useApplicationContext(
    context => context.menuVisibilities
  );
  const applicationsMenu = useApplicationsMenu({
    queryOptions: {
      onError: reportErrorToSentry,
    },
    skipRemoteQuery: !props.environment.servedByProxy,
    options: {
      __DEV_CONFIG__: {
        menuLoader: props.DEV_ONLY__loadNavbarMenuConfig,
        menuKey: 'navBar',
      },
    },
  });
  const { data: projectExtensionsQuery } = useQuery(
    FetchProjectExtensionsNavbar,
    {
      skip: !props.environment.servedByProxy || !areProjectExtensionsEnabled,
      variables: {
        target: GRAPHQL_TARGETS.SETTINGS_SERVICE,
      },
      fetchPolicy: 'cache-and-network',
      onError: reportErrorToSentry,
    }
  );
  const navbarMenu = (applicationsMenu && applicationsMenu.navBar) || [];
  const customAppsMenu =
    projectExtensionsQuery && projectExtensionsQuery.projectExtension
      ? projectExtensionsQuery.projectExtension.applications.map(
          app => app.navbarMenu
        )
      : [];
  const cachedIsForcedMenuOpen = window.localStorage.getItem(
    STORAGE_KEYS.IS_FORCED_MENU_OPEN
  );
  const isForcedMenuOpen =
    typeof cachedIsForcedMenuOpen === 'string'
      ? cachedIsForcedMenuOpen === 'true'
      : null;

  return (
    <NavBarLayout ref={ref}>
      <DataMenu
        rootNode={ref.current}
        data={navbarMenu.concat(customAppsMenu)}
        isForcedMenuOpen={isForcedMenuOpen}
        location={props.location}
        menuVisibilities={menuVisibilities}
        applicationLocale={props.applicationLocale}
        projectKey={props.projectKey}
        disabledMenuItems={disabledMenuItems}
        useFullRedirectsForLinks={props.environment.useFullRedirectsForLinks}
        onMenuItemClick={props.onMenuItemClick}
      />
    </NavBarLayout>
  );
};
NavBar.displayName = 'NavBar';
NavBar.propTypes = {
  // From parent
  applicationLocale: PropTypes.string.isRequired,
  projectKey: PropTypes.string.isRequired,
  environment: PropTypes.shape({
    servedByProxy: PropTypes.bool.isRequired,
    useFullRedirectsForLinks: PropTypes.bool,
  }).isRequired,
  menuVisibilities: PropTypes.objectOf(PropTypes.bool).isRequired,
  DEV_ONLY__loadNavbarMenuConfig: PropTypes.func,
  onMenuItemClick: PropTypes.func,
  // withRouter
  location: PropTypes.object.isRequired,
};

// Use `withRouter` to "connect" again, to access the `location` object
export default withRouter(NavBar);

export const LoadingNavBar = () => {
  const ref = React.useRef();
  return (
    <NavBarLayout ref={ref}>
      <MenuGroup level={1}>
        <React.Fragment>
          {Array.from(new Array(5)).map((_, index) => (
            <MenuItem
              key={index}
              hasSubmenu={false}
              isMenuOpen={false}
              isActive={false}
              onClick={() => undefined}
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
};
LoadingNavBar.displayName = 'LoadingNavBar';
