import { MouseEventHandler, useEffect, useMemo } from 'react';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { matchPath, useLocation } from 'react-router-dom';
import type { RouteComponentProps } from 'react-router-dom';
import {
  normalizeAllAppliedActionRights,
  normalizeAllAppliedDataFences,
  normalizeAllAppliedMenuVisibilities,
  normalizeAllAppliedPermissions,
} from '@commercetools-frontend/application-shell-connectors';
import type {
  TApplicationContext,
  TNormalizedMenuVisibilities,
  TNormalizedPermissions,
  TNormalizedActionRights,
  TNormalizedDataFences,
} from '@commercetools-frontend/application-shell-connectors';
import { SUPPORT_PORTAL_URL } from '@commercetools-frontend/constants';
import { SupportIcon } from '@commercetools-uikit/icons';
import type { TFetchProjectQuery } from '../../types/generated/mc';
import type { TNavbarMenu, TBaseMenu } from '../../types/generated/proxy';
import {
  type MenuItemLinkProps,
  RestrictedMenuItem,
  MenuItem,
  MenuItemLink,
  IconSwitcher,
  MenuGroup,
  MenuLabel,
  MenuItemDivider,
  Faded,
  MenuExpander,
  NavBarLayout,
} from './menu-items';
import messages from './messages';
// https://babeljs.io/blog/2017/09/11/zero-config-with-babel-macros
import compiledStyles from /* preval */ './navbar.styles';
import nonNullable from './non-nullable';
import useNavbarStateManager from './use-navbar-state-manager';

const styles = compiledStyles.jsonMap;

type TProjectPermissions = {
  permissions: TNormalizedPermissions | null;
  actionRights: TNormalizedActionRights | null;
  dataFences: TNormalizedDataFences | null;
};

type TMenuWithDefaultLabel = TNavbarMenu & {
  // derives from `projectExtensionsQuery.installedApplications.application.mainMenuLink`
  defaultLabel?: string;
};
type TSubmenuWithDefaultLabel = TBaseMenu & {
  // derives from `projectExtensionsQuery.installedApplications.application.mainMenuLink`
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

const getMenuVisibilitiesOfSubmenus = (menu: TNavbarMenu) =>
  menu.submenu.map((submenu) => submenu.menuVisibility).filter(nonNullable);
const getMenuVisibilityOfMainmenu = (menu: TNavbarMenu) =>
  menu.menuVisibility ? [menu.menuVisibility] : [];

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
        isMainMenuRouteActive={isMainMenuRouteActive}
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
            <div className={styles['icon-container']}>
              <div
                className={classnames(styles.icon, {
                  [styles.icon__active]:
                    props.isActive || isMainMenuRouteActive,
                })}
              >
                <IconSwitcher icon={props.menu.icon} size="scale" />
              </div>
            </div>
            <div className={styles.title} aria-owns={`group-${props.menu.key}`}>
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
          hasSubmenu={hasSubmenu}
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
                        // Allow matching subroutes
                        exactMatch={false}
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
  );
};
ApplicationMenu.displayName = 'ApplicationMenu';

type TNavbarProps = {
  applicationLocale: string;
  projectKey: string;
  environment: TApplicationContext<{
    useFullRedirectsForLinks?: boolean;
  }>['environment'];
  project: TFetchProjectQuery['project'];
  onMenuItemClick?: MenuItemLinkProps['onClick'];
};
const NavBar = (props: TNavbarProps) => {
  const {
    navBarNode,
    isMenuOpen,
    isExpanderVisible,
    activeItemIndex,
    handleToggleItem,
    handleToggleMenu,
    shouldCloseMenuFly,
    allInternalApplicationsNavbarMenu,
    allCustomApplicationsNavbarMenu,
  } = useNavbarStateManager({
    environment: props.environment,
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
          {allInternalApplicationsNavbarMenu.map((menu) => {
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
                onMenuItemClick={props.onMenuItemClick}
              />
            );
          })}
          <MenuItemDivider />
          {allCustomApplicationsNavbarMenu.map((menu) => {
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
                onMenuItemClick={props.onMenuItemClick}
              />
            );
          })}
        </div>
        <div className={styles['fixed-menu']}>
          <Faded />
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
                <div className={styles['icon-container']}>
                  <div
                    className={classnames(styles.icon, {
                      [styles.icon__active]:
                        activeItemIndex === 'fixed-support',
                    })}
                  >
                    <SupportIcon size="scale" />
                  </div>
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
            isMenuOpen={isMenuOpen}
          />
        </div>
      </MenuGroup>
    </NavBarLayout>
  );
};
NavBar.displayName = 'NavBar';

export default NavBar;
