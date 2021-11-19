import type { RouteComponentProps } from 'react-router-dom';
import type {
  TApplicationContext,
  TNormalizedMenuVisibilities,
  TNormalizedPermissions,
  TNormalizedActionRights,
  TNormalizedDataFences,
} from '@commercetools-frontend/application-shell-connectors';
import type { TFetchProjectQuery } from '../../types/generated/mc';
import type {
  TDataFence,
  TActionRight,
  TApplicationsMenu,
  TLocalizedField,
  TNavbarMenu,
  TBaseMenu,
} from '../../types/generated/proxy';

import {
  forwardRef,
  MouseEventHandler,
  ReactNode,
  SyntheticEvent,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { FormattedMessage } from 'react-intl';
import { NavLink, matchPath, useLocation } from 'react-router-dom';
import { ToggleFeature } from '@flopflip/react-broadcast';
import { Global, css } from '@emotion/react';
import classnames from 'classnames';
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
  ListWithSearchIcon,
} from '@commercetools-uikit/icons';
import InlineSvg from '@commercetools-uikit/icons/inline-svg';
import MissingImageSvg from '@commercetools-frontend/assets/images/diagonal-line.svg';
import {
  NO_VALUE_FALLBACK,
  SUPPORT_PORTAL_URL,
} from '@commercetools-frontend/constants';
import {
  normalizeAllAppliedActionRights,
  normalizeAllAppliedDataFences,
  normalizeAllAppliedMenuVisibilities,
  normalizeAllAppliedPermissions,
} from '@commercetools-frontend/application-shell-connectors';
import { RestrictedByPermissions } from '@commercetools-frontend/permissions';
import { location } from '../../utils/location';
import { GtmContext } from '../gtm-booter';
import LoadingPlaceholder from '../loading-placeholder';
import messages from './messages';
import useLoadingMenuLayoutEffect from './use-loading-menu-layout-effect';
import useNavbarStateManager from './use-navbar-state-manager';
import nonNullable from './non-nullable';
// https://babeljs.io/blog/2017/09/11/zero-config-with-babel-macros
import compiledStyles from /* preval */ './navbar.styles';

const styles = compiledStyles.jsonMap;

type TProjectPermissions = {
  permissions: TNormalizedPermissions | null;
  actionRights: TNormalizedActionRights | null;
  dataFences: TNormalizedDataFences | null;
};

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

type IconProps = Parameters<typeof BackIcon>[0];
type IconSwitcherProps = { icon: string } & IconProps;
// The icon is expected to be the `svg` document as a string.
// For backwards compatibility purposes, we still support the legacy "icon name",
// which we then map to one of the pre-defined icons.
// Eventually, we want to get rid of this "switch" logic.
const IconSwitcher = ({ icon, ...iconProps }: IconSwitcherProps) => {
  if (icon.includes('<svg')) {
    return <InlineSvg data={icon} {...iconProps} />;
  }
  // Backwards compatibility for apps using the "icon name".
  switch (icon) {
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
    case 'ListWithSearchIcon':
      return <ListWithSearchIcon {...iconProps} />;
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
      return <img src={MissingImageSvg} alt="missing icon" />;
  }
};
IconSwitcher.displayName = 'IconSwitcher';

type MenuExpanderProps = {
  isVisible: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
};
const MenuExpander = (props: MenuExpanderProps) => (
  <li
    key="expander"
    className={classnames(styles['list-item'], styles.expander, {
      [styles.hidden]: !props.isVisible,
    })}
  >
    <div
      onClick={props.onClick}
      className={styles['expand-icon']}
      data-testid="menu-expander"
    >
      {/*
        FIXME: define hover effect.
        https://github.com/commercetools/merchant-center-frontend/issues/2216
      */}
      <BackIcon color="surface" size="big" />
    </div>
  </li>
);
MenuExpander.displayName = 'MenuExpander';

type MenuGroupProps = {
  id: string;
  level: 1 | 2;
  isActive?: boolean;
  isExpanded?: boolean;
  children?: ReactNode;
};
const MenuGroup = (props: MenuGroupProps) => {
  const isSublistActiveWhileIsMenuExpanded =
    props.level === 2 && props.isActive && props.isExpanded;
  const isSublistActiveWhileIsMenuCollapsed =
    props.level === 2 && props.isActive && !props.isExpanded;
  return (
    <ul
      id={`${props.id}-group`}
      data-testid={`${props.id}-group`}
      role="menu"
      aria-expanded={
        isSublistActiveWhileIsMenuExpanded ||
        isSublistActiveWhileIsMenuCollapsed
      }
      className={classnames(
        { [styles.list]: props.level === 1 },
        { [styles.sublist]: props.level === 2 },
        {
          [styles['sublist-no-children']]: props.level === 2 && !props.children,
        },
        {
          [styles['sublist-expanded__active']]:
            isSublistActiveWhileIsMenuExpanded,
        },
        {
          [styles['sublist-collapsed__active']]:
            isSublistActiveWhileIsMenuCollapsed,
        },
        {
          [styles.sublist__inactive]: !isSublistActiveWhileIsMenuCollapsed,
        }
      )}
    >
      {props.children}
    </ul>
  );
};
MenuGroup.displayName = 'MenuGroup';

type MenuItemProps = {
  hasSubmenu: boolean;
  isActive: boolean;
  isMenuOpen: boolean;
  onClick: MouseEventHandler<HTMLElement>;
  onMouseEnter?: MouseEventHandler<HTMLElement>;
  onMouseLeave?: MouseEventHandler<HTMLElement>;
  children: ReactNode;
};
const MenuItem = (props: MenuItemProps) => (
  <li
    role="menu-item"
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

type MenuItemLinkProps = {
  linkTo?: string;
  exactMatch: boolean;
  children: ReactNode;
  onClick?: <TrackFn>(
    event: SyntheticEvent<HTMLAnchorElement>,
    track: TrackFn
  ) => void;
  useFullRedirectsForLinks?: boolean;
};
const menuItemLinkDefaultProps: Pick<MenuItemLinkProps, 'exactMatch'> = {
  exactMatch: false,
};
const MenuItemLink = (props: MenuItemLinkProps) => {
  const gtmTracking = useContext(GtmContext);
  const redirectTo = (targetUrl: string) => location.replace(targetUrl);
  if (props.linkTo) {
    return (
      <NavLink
        to={props.linkTo}
        exact={props.exactMatch}
        activeClassName={styles.highlighted}
        className={styles['text-link']}
        onClick={(event) => {
          if (props.linkTo && props.useFullRedirectsForLinks) {
            event.preventDefault();
            redirectTo(props.linkTo);
          } else if (props.onClick) {
            event.persist();
            props.onClick<typeof gtmTracking.track>(event, gtmTracking.track);
          }
        }}
      >
        {props.children}
      </NavLink>
    );
  }
  return <>{props.children}</>;
};
MenuItemLink.displayName = 'MenuItemLink';
MenuItemLink.defaultProps = menuItemLinkDefaultProps;

// This component just render two divs with borders in order to differentiate
// the settings plugin from the other ones
const MenuItemDivider = () => (
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
const isEveryMenuVisibilitySetToHidden = (
  menuVisibilities?: TNormalizedMenuVisibilities | null,
  namesOfMenuVisibilities?: string[]
) =>
  Array.isArray(namesOfMenuVisibilities) &&
  namesOfMenuVisibilities.length > 0 &&
  namesOfMenuVisibilities.every(
    (nameOfMenuVisibility) =>
      menuVisibilities && menuVisibilities[nameOfMenuVisibility] === true
  );

type RestrictedMenuItemProps = {
  featureToggle?: string;
  namesOfMenuVisibilities?: string[];
  projectPermissions: TProjectPermissions;
  menuVisibilities: TNormalizedMenuVisibilities | null;
  keyOfMenuItem: string;
  permissions: string[];
  actionRights?: TActionRight[];
  dataFences?: TDataFence[];
  children: ReactNode;
};
const restrictedMenuItemDefaultProps: Pick<
  RestrictedMenuItemProps,
  'permissions'
> = {
  permissions: [],
};
const RestrictedMenuItem = (props: RestrictedMenuItemProps) => {
  // NOTE: Custom application are activated/deactivated while their
  // visibility is not controlled via a visibiility overwrite.
  if (
    isEveryMenuVisibilitySetToHidden(
      props.menuVisibilities,
      props.namesOfMenuVisibilities
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
        selectDataFenceData={(demandedDataFence) => {
          switch (demandedDataFence.type) {
            case 'store':
              return demandedDataFence.actualDataFenceValues;
            default:
              return null;
          }
        }}
        // Always check that some of the given permissions match.
        shouldMatchSomePermissions={true}
        projectPermissions={props.projectPermissions}
      >
        {props.children}
      </RestrictedByPermissions>
    ) : (
      <>{props.children}</>
    );

  if (props.featureToggle) {
    return (
      <ToggleFeature flag={props.featureToggle}>
        {permissionsWrapper}
      </ToggleFeature>
    );
  }
  return permissionsWrapper;
};
RestrictedMenuItem.displayName = 'RestrictedMenuItem';
RestrictedMenuItem.defaultProps = restrictedMenuItemDefaultProps;

export const getIconColor = (
  isActive: boolean,
  isAlternativeTheme: boolean
) => {
  if (isActive) return 'primary40';
  return isAlternativeTheme ? 'neutral60' : 'surface';
};

const getMenuVisibilitiesOfSubmenus = (menu: TNavbarMenu) =>
  menu.submenu.map((submenu) => submenu.menuVisibility).filter(nonNullable);
const getMenuVisibilityOfMainmenu = (menu: TNavbarMenu) =>
  menu.menuVisibility ? [menu.menuVisibility] : [];

type MenuLabelProps = {
  labelAllLocales: TLocalizedField[];
  defaultLabel?: string;
  applicationLocale: string;
};
const MenuLabel = (props: MenuLabelProps) => {
  const localizedLabel = props.labelAllLocales.find((loc) =>
    props.applicationLocale.startsWith(loc.locale)
  );
  if (localizedLabel) return <>{localizedLabel.value}</>;
  if (props.defaultLabel) return <>{props.defaultLabel}</>;
  return <>{NO_VALUE_FALLBACK}</>;
};

type TMenuWithDefaultLabel = TNavbarMenu & {
  // derives from `projectExtensionsQuery.installedApplications.application.menu`
  defaultLabel?: string;
};
type TSubmenuWithDefaultLabel = TBaseMenu & {
  // derives from `projectExtensionsQuery.installedApplications.application.menu`
  defaultLabel?: string;
};

type ApplicationMenuProps = {
  location: RouteComponentProps['location'];
  menu: TMenuWithDefaultLabel;
  isActive: boolean;
  isMenuOpen: boolean;
  shouldCloseMenuFly: MouseEventHandler<HTMLElement>;
  projectPermissions: TProjectPermissions;
  menuVisibilities: TNormalizedMenuVisibilities | null;
  handleToggleItem: () => void;
  applicationLocale: string;
  projectKey: string;
  useFullRedirectsForLinks: boolean;
  onMenuItemClick?: MenuItemLinkProps['onClick'];
};
const ApplicationMenu = (props: ApplicationMenuProps) => {
  const isMainMenuRouteActive = Boolean(
    matchPath(props.location.pathname, {
      path: `/${props.projectKey}/${props.menu.uriPath}`,
      exact: false,
      strict: false,
    })
  );
  const hasSubmenu =
    Array.isArray(props.menu.submenu) && props.menu.submenu.length > 0;

  useEffect(() => {
    // On first render, check which menu is active for the current application and expand
    // the submenu automatically unless the all navbar is collapsed or there are no submenu links.
    if (props.isMenuOpen && isMainMenuRouteActive && hasSubmenu) {
      props.handleToggleItem();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isMenuOpen]); // <-- (re)run this only when the all menu expands

  const namesOfMenuVisibilitiesOfAllSubmenus = hasSubmenu
    ? getMenuVisibilitiesOfSubmenus(props.menu)
    : getMenuVisibilityOfMainmenu(props.menu);

  const isMainMenuItemALink =
    // 1. When the navbar is collapsed
    !props.isMenuOpen ||
    // 2. When there is no submenu
    !hasSubmenu ||
    // 3. When the submenu group is active/visible
    props.isActive;

  return (
    <>
      {props.menu.shouldRenderDivider && <MenuItemDivider />}

      <RestrictedMenuItem
        key={props.menu.key}
        keyOfMenuItem={props.menu.key}
        featureToggle={props.menu.featureToggle ?? undefined}
        permissions={props.menu.permissions}
        actionRights={props.menu.actionRights ?? undefined}
        dataFences={props.menu.dataFences ?? undefined}
        projectPermissions={props.projectPermissions}
        menuVisibilities={props.menuVisibilities}
        namesOfMenuVisibilities={namesOfMenuVisibilitiesOfAllSubmenus}
      >
        <MenuItem
          hasSubmenu={hasSubmenu}
          isActive={props.isActive}
          isMenuOpen={props.isMenuOpen}
          onClick={props.handleToggleItem}
          onMouseEnter={props.isMenuOpen ? undefined : props.handleToggleItem}
          onMouseLeave={props.isMenuOpen ? undefined : props.shouldCloseMenuFly}
        >
          <MenuItemLink
            linkTo={
              isMainMenuItemALink
                ? `/${props.projectKey}/${props.menu.uriPath}`
                : undefined
            }
            useFullRedirectsForLinks={props.useFullRedirectsForLinks}
            onClick={props.onMenuItemClick}
          >
            <div className={styles['item-icon-text']}>
              <div className={styles.icon}>
                <IconSwitcher
                  icon={props.menu.icon}
                  size="scale"
                  color={getIconColor(
                    props.isActive || isMainMenuRouteActive,
                    Boolean(props.menu.shouldRenderDivider)
                  )}
                />
              </div>
              <div
                className={styles.title}
                aria-owns={`${props.menu.key}-group`}
              >
                <MenuLabel
                  labelAllLocales={props.menu.labelAllLocales}
                  defaultLabel={props.menu.defaultLabel}
                  applicationLocale={props.applicationLocale}
                />
              </div>
            </div>
          </MenuItemLink>
          <MenuGroup
            id={props.menu.key}
            level={2}
            isActive={props.isActive}
            isExpanded={props.isMenuOpen}
          >
            {hasSubmenu
              ? props.menu.submenu.map((submenu: TSubmenuWithDefaultLabel) => (
                  <RestrictedMenuItem
                    key={`${props.menu.key}-submenu-${submenu.key}`}
                    keyOfMenuItem={submenu.key}
                    featureToggle={submenu.featureToggle ?? undefined}
                    permissions={submenu.permissions}
                    actionRights={submenu.actionRights ?? undefined}
                    dataFences={submenu.dataFences ?? undefined}
                    projectPermissions={props.projectPermissions}
                    menuVisibilities={props.menuVisibilities}
                    namesOfMenuVisibilities={
                      submenu.menuVisibility
                        ? [submenu.menuVisibility]
                        : undefined
                    }
                  >
                    <li className={styles['sublist-item']}>
                      <div className={styles.text}>
                        <MenuItemLink
                          linkTo={`/${props.projectKey}/${submenu.uriPath}`}
                          exactMatch={true}
                          useFullRedirectsForLinks={
                            props.useFullRedirectsForLinks
                          }
                          onClick={props.onMenuItemClick}
                        >
                          <MenuLabel
                            labelAllLocales={submenu.labelAllLocales}
                            defaultLabel={submenu.defaultLabel}
                            applicationLocale={props.applicationLocale}
                          />
                        </MenuItemLink>
                      </div>
                    </li>
                  </RestrictedMenuItem>
                ))
              : null}
          </MenuGroup>
        </MenuItem>
      </RestrictedMenuItem>
    </>
  );
};
ApplicationMenu.displayName = 'ApplicationMenu';

type NavBarLayoutProps = {
  children: ReactNode;
};
const NavBarLayout = forwardRef<HTMLElement, NavBarLayoutProps>(
  (props, ref) => (
    <>
      <Global
        styles={css`
          ${compiledStyles.global}
        `}
      />
      <nav
        ref={ref}
        className={styles['left-navigation']}
        data-test="left-navigation"
        data-testid="left-navigation"
        data-track-component="Navigation"
      >
        {props.children}
      </nav>
    </>
  )
);
NavBarLayout.displayName = 'NavBarLayout';

type NavbarProps<AdditionalEnvironmentProperties extends {}> = {
  applicationLocale: string;
  projectKey: string;
  environment: TApplicationContext<AdditionalEnvironmentProperties>['environment'];
  project: TFetchProjectQuery['project'];
  onMenuItemClick?: MenuItemLinkProps['onClick'];
  DEV_ONLY__loadNavbarMenuConfig?: () => Promise<TApplicationsMenu['navBar']>;
};
const NavBar = <AdditionalEnvironmentProperties extends {}>(
  props: NavbarProps<AdditionalEnvironmentProperties>
) => {
  const {
    navBarNode,
    isMenuOpen,
    isExpanderVisible,
    activeItemIndex,
    handleToggleItem,
    handleToggleMenu,
    shouldCloseMenuFly,
    allApplicationNavbarMenu,
  } = useNavbarStateManager({
    environment: props.environment,
    DEV_ONLY__loadNavbarMenuConfig: props.DEV_ONLY__loadNavbarMenuConfig,
  });
  const useFullRedirectsForLinks = Boolean(
    props.environment.useFullRedirectsForLinks
  );
  const location = useLocation();

  const projectPermissions: TProjectPermissions = useMemo(
    () => ({
      permissions: normalizeAllAppliedPermissions(
        props.project?.allPermissionsForAllApplications.allAppliedPermissions
      ),
      actionRights: normalizeAllAppliedActionRights(
        props.project?.allPermissionsForAllApplications.allAppliedActionRights
      ),
      dataFences: normalizeAllAppliedDataFences(
        props.project?.allPermissionsForAllApplications.allAppliedDataFences
      ),
    }),
    [props.project]
  );
  const menuVisibilities = useMemo(
    () =>
      normalizeAllAppliedMenuVisibilities(
        props.project?.allPermissionsForAllApplications
          .allAppliedMenuVisibilities
      ),
    [props.project]
  );

  return (
    <NavBarLayout ref={navBarNode}>
      <MenuGroup id="main" level={1}>
        <div className={styles['scrollable-menu']}>
          {allApplicationNavbarMenu.map((menu) => {
            const menuType = 'scrollable';
            const itemIndex = `${menuType}-${menu.key}`;
            return (
              <ApplicationMenu
                key={menu.key}
                location={location}
                menu={menu}
                isActive={activeItemIndex === itemIndex}
                handleToggleItem={() => handleToggleItem(itemIndex)}
                isMenuOpen={isMenuOpen}
                shouldCloseMenuFly={shouldCloseMenuFly}
                projectPermissions={projectPermissions}
                menuVisibilities={menuVisibilities}
                applicationLocale={props.applicationLocale}
                projectKey={props.projectKey}
                useFullRedirectsForLinks={useFullRedirectsForLinks}
              />
            );
          })}
        </div>
        <div className={styles['fixed-menu']}>
          <MenuItem
            hasSubmenu={false}
            isActive={false}
            isMenuOpen={isMenuOpen}
            onClick={() => {
              handleToggleItem('fixed-support');
            }}
            onMouseEnter={
              isMenuOpen ? undefined : () => handleToggleItem('fixed-support')
            }
            onMouseLeave={isMenuOpen ? undefined : shouldCloseMenuFly}
          >
            <a
              href={SUPPORT_PORTAL_URL}
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className={styles['item-icon-text']}>
                <div className={styles.icon}>
                  <SupportIcon
                    size="scale"
                    color={getIconColor(
                      activeItemIndex === 'fixed-support',
                      true
                    )}
                  />
                </div>
                <div className={styles.title}>
                  <FormattedMessage {...messages['NavBar.MCSupport.title']} />
                </div>
              </div>
            </a>
          </MenuItem>
          <MenuExpander
            isVisible={isExpanderVisible}
            onClick={handleToggleMenu}
          />
        </div>
      </MenuGroup>
    </NavBarLayout>
  );
};
NavBar.displayName = 'NavBar';

export default NavBar;

export const LoadingNavBar = () => {
  const ref = useRef<HTMLDivElement>(null);
  useLoadingMenuLayoutEffect();
  return (
    <NavBarLayout ref={ref}>
      <MenuGroup id="main" level={1}>
        <>
          {Array.from(new Array(5)).map((_, index) => (
            <MenuItem
              key={index}
              hasSubmenu={false}
              isMenuOpen={false}
              isActive={false}
              onClick={() => undefined}
            >
              <div
                className={styles['loading-dot-container']}
                data-testid={`dot-container-${index}`}
              >
                <LoadingPlaceholder shape="dot" size="m" />
              </div>
            </MenuItem>
          ))}
        </>
      </MenuGroup>
    </NavBarLayout>
  );
};
LoadingNavBar.displayName = 'LoadingNavBar';
