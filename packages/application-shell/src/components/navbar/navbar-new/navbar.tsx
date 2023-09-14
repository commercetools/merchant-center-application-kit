import {
  type MouseEventHandler,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  useRef,
} from 'react';
import { css } from '@emotion/react';
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
import { DIMENSIONS } from '../../../constants';
import type { TFetchProjectQuery } from '../../../types/generated/mc';
import type { TNavbarMenu, TBaseMenu } from '../../../types/generated/proxy';
import messages from '../messages';
// https://babeljs.io/blog/2017/09/11/zero-config-with-babel-macros
import nonNullable from '../non-nullable';
import useNavbarStateManager from '../use-navbar-state-manager';
import {
  type MenuItemLinkProps,
  RestrictedMenuItem,
  MenuItem,
  MenuItemLink,
  MenuGroup,
  MenuLabel,
  ItemContainer,
  Faded,
  MenuExpander,
  NavBarLayout,
} from './menu-items';
import NavBarSkeleton from './navbar-skeleton';
import compiledStyles from /* preval */ './navbar.styles';

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

const getIsSubmenuRouteActive = (
  uriPath: ApplicationMenuProps['menu']['submenu'][number]['uriPath'],
  props: ApplicationMenuProps
) =>
  Boolean(
    matchPath(props.location.pathname, {
      path: `/${props.projectKey}/${uriPath}`,
      exact: true,
      strict: false,
    })
  );

export const ApplicationMenu = (props: ApplicationMenuProps) => {
  const [submenuVerticalPosition, setSubmenuVerticalPosition] = useState(0);
  const [isSubmenuAboveMenuItem, setIsSubmenuAboveMenuItem] = useState(false);
  const menuItemRef = useRef<HTMLDivElement>(null);
  const submenuRef = useRef<HTMLUListElement>(null);

  const hasSubmenu =
    Array.isArray(props.menu.submenu) && props.menu.submenu.length > 0;

  const menuItemBoundingClientRect =
    menuItemRef.current?.getBoundingClientRect();
  const menuItemTop = menuItemBoundingClientRect?.top || 0;
  const menuItemBottom = menuItemBoundingClientRect?.bottom || 0;

  const callbackFn: IntersectionObserverCallback = (entries) => {
    const [entry] = entries;
    const doesSubmenuFitViewportBelowMenuItem =
      entry.boundingClientRect.height +
        (props.isMenuOpen ? menuItemTop : menuItemBottom) >
      window.innerHeight;
    // if the submenu does not fit at the bottom of the viewport (below the menu item)
    if (doesSubmenuFitViewportBelowMenuItem) {
      setIsSubmenuAboveMenuItem(true);
      setSubmenuVerticalPosition(
        window.innerHeight - (props.isMenuOpen ? menuItemBottom : menuItemTop)
      );
      // show the submenu above the menu item
    } else {
      setIsSubmenuAboveMenuItem(false);
      setSubmenuVerticalPosition(
        props.isMenuOpen ? menuItemTop : menuItemBottom
      );
    }
  };
  useLayoutEffect(() => {
    const observer = new IntersectionObserver(callbackFn, {
      rootMargin: '-100% 0px 0px 0px',
    });
    const currentSubmenuRef = submenuRef.current;

    if (currentSubmenuRef) {
      observer.observe(currentSubmenuRef);
    }
    return () => {
      if (currentSubmenuRef) {
        observer.unobserve(currentSubmenuRef);
      }
    };
  });

  const isMainMenuRouteActive = Boolean(
    matchPath(props.location.pathname, {
      path: `/${props.projectKey}/${props.menu.uriPath}`,
      exact: false,
      strict: false,
    })
  );

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
        ref={menuItemRef}
        hasSubmenu={hasSubmenu}
        isActive={props.isActive}
        isMainMenuRouteActive={isMainMenuRouteActive}
        isMenuOpen={props.isMenuOpen}
        onClick={props.handleToggleItem}
        onMouseEnter={props.handleToggleItem}
        onMouseLeave={props.shouldCloseMenuFly}
      >
        {/* menu-item should be a link only if it doesn't contain a submenu */}
        {!hasSubmenu ? (
          <MenuItemLink
            linkTo={`/${props.projectKey}/${props.menu.uriPath}`}
            useFullRedirectsForLinks={props.useFullRedirectsForLinks}
            onClick={props.onMenuItemClick}
          >
            <ItemContainer
              labelAllLocales={props.menu.labelAllLocales}
              defaultLabel={props.menu.defaultLabel}
              applicationLocale={props.applicationLocale}
              icon={props.menu.icon}
            />
          </MenuItemLink>
        ) : (
          <ItemContainer
            labelAllLocales={props.menu.labelAllLocales}
            defaultLabel={props.menu.defaultLabel}
            applicationLocale={props.applicationLocale}
            icon={props.menu.icon}
          />
        )}
        <MenuGroup
          id={props.menu.key}
          level={2}
          isActive={props.isActive}
          isExpanded={props.isMenuOpen}
          hasSubmenu={hasSubmenu}
          submenuVerticalPosition={submenuVerticalPosition}
          isSubmenuAboveMenuItem={isSubmenuAboveMenuItem}
          ref={submenuRef}
        >
          {!props.isMenuOpen && (
            <div
              className={styles['tooltip-container']}
              css={css`
                ${isSubmenuAboveMenuItem
                  ? 'bottom'
                  : 'top'}: -${DIMENSIONS.navMenuItemHeight};
              `}
            >
              <div
                className={styles['tooltip']}
                aria-owns={`group-${props.menu.key}`}
              >
                <MenuLabel
                  labelAllLocales={props.menu.labelAllLocales}
                  defaultLabel={props.menu.defaultLabel}
                  applicationLocale={props.applicationLocale}
                />
              </div>
            </div>
          )}
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
                  <li
                    className={classnames(styles['sublist-item'], {
                      [styles['sublist-item__active']]: getIsSubmenuRouteActive(
                        submenu.uriPath,
                        props
                      ),
                    })}
                  >
                    <div className={styles.text}>
                      <MenuItemLink
                        linkTo={`/${props.projectKey}/${submenu.uriPath}`}
                        // We want to use an exact matching strategy to avoid multiple
                        // links matching sub-routes.
                        exactMatch
                        useFullRedirectsForLinks={
                          props.useFullRedirectsForLinks
                        }
                        onClick={props.onMenuItemClick}
                        isSubmenuLink
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

export type TNavbarProps = {
  applicationLocale?: string;
  projectKey: string;
  environment: TApplicationContext<{
    useFullRedirectsForLinks?: boolean;
  }>['environment'];
  project: TFetchProjectQuery['project'];
  onMenuItemClick?: MenuItemLinkProps['onClick'];
  isLoading: boolean;
  isNewNavigationEnabledEvaluationReady: boolean;
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
    newNavigation: true,
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

  const applicationLocale = props.applicationLocale;

  // Render the loading navbar as long as all the data
  // hasn't been loaded, or if the project does not exist.
  if (props.isLoading || typeof applicationLocale === 'undefined') {
    // Do not render anything until we have the feature flag remote value fetched so
    // we avoid a flick effect in case it is 'true' (different value from the default one)
    if (!props.isNewNavigationEnabledEvaluationReady) {
      return null;
    }
    return <NavBarSkeleton isExpanded={isMenuOpen} />;
  }

  return (
    <NavBarLayout ref={navBarNode}>
      <div className={styles['navigation-header']}>Navigation header</div>
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
                applicationLocale={applicationLocale}
                projectKey={props.projectKey}
                useFullRedirectsForLinks={useFullRedirectsForLinks}
                onMenuItemClick={props.onMenuItemClick}
              />
            );
          })}
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
                applicationLocale={applicationLocale}
                projectKey={props.projectKey}
                useFullRedirectsForLinks={useFullRedirectsForLinks}
                onMenuItemClick={props.onMenuItemClick}
              />
            );
          })}
        </div>
        <div className={styles['fixed-menu']}>
          <Faded />
          <div className={styles['support-menu']}>
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
                className={styles['text-link']}
              >
                <div className={styles['item-icon-text']}>
                  <div className={styles['icon-container']}>
                    <div className={styles['icon']}>
                      <SupportIcon size="scale" />
                    </div>
                  </div>
                  <div className={styles.title}>
                    <FormattedMessage {...messages['NavBar.MCSupport.title']} />
                  </div>
                </div>
              </a>
            </MenuItem>
          </div>
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
