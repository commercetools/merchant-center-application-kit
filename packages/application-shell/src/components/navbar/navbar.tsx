import {
  type MouseEventHandler,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  useRef,
} from 'react';
import snakeCase from 'lodash/snakeCase';
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
import LogoSVG from '@commercetools-frontend/assets/logos/commercetools_small-logo.svg';
import { SUPPORT_PORTAL_URL } from '@commercetools-frontend/constants';
import { SupportIcon } from '@commercetools-uikit/icons';
import Spacings from '@commercetools-uikit/spacings';
import type { TFetchProjectQuery } from '../../types/generated/mc';
import type { TNavbarMenu, TBaseMenu } from '../../types/generated/proxy';
import {
  FixedMenu,
  HeaderTitle,
  NavigationHeader,
  ScrollableMenu,
  SupportMenu,
  TextLink,
  Text,
  Tooltip,
  TooltipContainer,
  SupportMenuTooltipContainer,
} from './main-navbar.styles';
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
import { SublistItem } from './menu-items.styles';
import messages from './messages';
import NavBarSkeleton from './navbar-skeleton';
import nonNullable from './non-nullable';
import { Icon, IconWrapper, ItemIconText, Title } from './shared.styles';
import useNavbarStateManager from './use-navbar-state-manager';

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
  const submenuRef = useRef<HTMLUListElement>(null);

  const { handleSubMenuKeyDown, isRightArrowPressed } = useNavbarStateManager({
    environment: props,
  });

  const hasSubmenu =
    Array.isArray(props.menu.submenu) && props.menu.submenu.length > 0;

  const menuItemIdentifier = snakeCase(props.menu.key);

  const callbackFn: IntersectionObserverCallback = useCallback(
    (entries) => {
      const menuItemBoundingClientRect = document
        .querySelector(`[data-menuitem="${menuItemIdentifier}"]`)
        ?.getBoundingClientRect();
      const menuItemTop = menuItemBoundingClientRect?.top || 0;
      const menuItemBottom = menuItemBoundingClientRect?.bottom || 0;

      const [entry] = entries;

      const doesSubmenuFitWithinViewportBelowMenuItem =
        entry.boundingClientRect.height +
          (props.isMenuOpen ? menuItemTop : menuItemBottom) >
        window.innerHeight;
      // if the submenu does not fit at the bottom of the viewport (below the menu item)
      if (doesSubmenuFitWithinViewportBelowMenuItem) {
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
    },
    [menuItemIdentifier, props.isMenuOpen]
  );

  const observerRef = useRef<IntersectionObserver | null>(null);

  useLayoutEffect(() => {
    observerRef.current = new IntersectionObserver(callbackFn, {
      rootMargin: '-100% 0px 0px 0px', // we want to observe if the submenu crosses the bottom line of the viewport - therefore we set the root element top margin to -100% of the viewport height
    });
    return () => observerRef.current?.disconnect();
  }, [callbackFn, props.isMenuOpen]);

  useLayoutEffect(() => {
    const currentSubmenuRef = submenuRef.current;
    const observer = observerRef.current;
    if (!currentSubmenuRef) return;

    if (observer && currentSubmenuRef) {
      observer.observe(currentSubmenuRef);
    }
    return () => observer?.disconnect();
  }, [
    menuItemIdentifier,
    props.isMenuOpen,
    props.handleToggleItem,
    callbackFn,
  ]);

  const isMainMenuRouteActive = Boolean(
    matchPath(props.location.pathname, {
      path: `/${props.projectKey}/${props.menu.uriPath}`,
      exact: false,
      strict: false,
    })
  );

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLUListElement>,
    submenuRef: React.RefObject<HTMLUListElement>
  ) => {
    const currentlyFocused = submenuRef.current?.querySelector('a:focus');

    function getCurrentSibling(
      element: Element | null | undefined,
      levels: number
    ) {
      if (levels === 0 || !element) {
        return element;
      }
      return getCurrentSibling(element.parentElement, levels - 1);
    }
    const previousElement = getCurrentSibling(
      currentlyFocused,
      3
    )?.previousElementSibling;

    const nextElement = getCurrentSibling(
      currentlyFocused,
      3
    )?.nextElementSibling;

    switch (e.key) {
      case 'ArrowUp':
        previousElement?.querySelector('a')?.focus();
        break;

      case 'ArrowDown':
        currentlyFocused?.querySelector('ul')?.focus();
        nextElement?.querySelector('a')?.focus();
        break;

      // ArrowRight open's submenu
      case 'ArrowRight':
        submenuRef?.current?.focus();
        submenuRef.current
          ?.querySelector<HTMLAnchorElement>('a:first-of-type')
          ?.focus();
        break;

      // ArrowLeft close's submenu
      case 'ArrowLeft':
        submenuRef?.current?.focus();
        submenuRef?.current?.blur();
        break;

      // Same as ArrowLeft, Escape close's submenu
      case 'Escape':
        submenuRef?.current?.focus();
        submenuRef?.current?.blur();
        break;

      // Tab click's currently focused item
      case 'Tab':
        (currentlyFocused as HTMLUListElement)?.click();
        e.preventDefault();
        break;

      default:
        break;
    }
  };

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
        hasSubmenu={hasSubmenu}
        isActive={props.isActive}
        isMainMenuRouteActive={isMainMenuRouteActive}
        isMenuOpen={props.isMenuOpen}
        onClick={props.handleToggleItem}
        onMouseEnter={props.handleToggleItem}
        onMouseLeave={props.shouldCloseMenuFly}
        identifier={menuItemIdentifier}
        handleSubMenuKeyDown={handleSubMenuKeyDown}
        isRightArrowPressed={isRightArrowPressed}
      >
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
            isMenuOpen={props.isMenuOpen}
          />
        </MenuItemLink>
        <MenuGroup
          id={`group-${props.menu.key}`}
          level={2}
          isActive={props.isActive}
          isExpanded={props.isMenuOpen}
          hasSubmenu={hasSubmenu}
          submenuVerticalPosition={submenuVerticalPosition}
          isSubmenuAboveMenuItem={isSubmenuAboveMenuItem}
          ref={submenuRef}
          handleKeyDown={(e) => handleKeyDown(e, submenuRef)}
        >
          {!props.isMenuOpen && (
            <TooltipContainer alignsAgainstBottom={isSubmenuAboveMenuItem}>
              <Tooltip aria-owns={`group-${props.menu.key}`} role="tooltip">
                <MenuLabel
                  labelAllLocales={props.menu.labelAllLocales}
                  defaultLabel={props.menu.defaultLabel}
                  applicationLocale={props.applicationLocale}
                />
              </Tooltip>
            </TooltipContainer>
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
                  <SublistItem
                    id={`${props.menu.key}-submenu-${submenu.key}`}
                    isActive={getIsSubmenuRouteActive(submenu.uriPath, props)}
                  >
                    <Text>
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
                    </Text>
                  </SublistItem>
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
};
const NavBar = (props: TNavbarProps) => {
  const navBarMenuRef = useRef(null);

  const {
    navBarNode,
    isMenuOpen,
    isExpanderVisible,
    activeItemIndex,
    handleToggleItem,
    handleToggleMenu,
    shouldCloseMenuFly,
    allApplicationsNavbarMenuGroups,
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

  const applicationLocale = props.applicationLocale;

  // Render the loading navbar as long as all the data
  // hasn't been loaded, or if the project does not exist.
  if (props.isLoading || typeof applicationLocale === 'undefined') {
    return <NavBarSkeleton isExpanded={isMenuOpen} />;
  }

  const handleRightKey = (e) => {
    if (e.key === 'ArrowRight') {
      // // return subMenuRefLevelOne?.current?.focus()
      const nextLevelElement =
        subMenuRefLevelOne?.current?.querySelector('u:first-of-type');
      if (nextLevelElement) {
        return nextLevelElement.focus();
      }
    }
    if (e.key === 'Tab') {
      const nextLevelElement =
        navBarMenuRef?.current?.querySelector('ul:first-of-type');
      if (nextLevelElement) {
        return nextLevelElement.focus();
      }
    }
  };

  return (
    <NavBarLayout ref={navBarNode}>
      <NavigationHeader>
        <IconWrapper>
          <Icon>
            <img src={LogoSVG} width="100%" alt="Logo" />
          </Icon>
        </IconWrapper>
        {isMenuOpen ? <HeaderTitle>Merchant Center</HeaderTitle> : null}
      </NavigationHeader>
      <MenuGroup
        id="main"
        level={1}
        ref={navBarMenuRef}
        handleKeyDown={handleRightKey}
      >
        <ScrollableMenu>
          <Spacings.Stack scale="l">
            {allApplicationsNavbarMenuGroups.map((navbarMenuGroup) => {
              return (
                <div key={navbarMenuGroup.key}>
                  {navbarMenuGroup.items.map((menu) => {
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
              );
            })}
          </Spacings.Stack>
        </ScrollableMenu>
        <FixedMenu>
          {/* TODO: remove <Faded /> completely as part of the recolouring rollout cleanup process */}
          <Faded />
          <SupportMenu>
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
              {!isMenuOpen && (
                <SupportMenuTooltipContainer>
                  <Tooltip role="tooltip">
                    <FormattedMessage {...messages['NavBar.MCSupport.title']} />
                  </Tooltip>
                </SupportMenuTooltipContainer>
              )}
              <TextLink
                href={SUPPORT_PORTAL_URL}
                rel="noopener noreferrer"
                target="_blank"
              >
                <ItemIconText>
                  <IconWrapper>
                    <Icon className="icon">
                      <SupportIcon size="scale" />
                    </Icon>
                  </IconWrapper>
                  {isMenuOpen ? (
                    <Title>
                      <FormattedMessage
                        {...messages['NavBar.MCSupport.title']}
                      />
                    </Title>
                  ) : null}
                </ItemIconText>
              </TextLink>
            </MenuItem>
          </SupportMenu>
          <MenuExpander
            isVisible={isExpanderVisible}
            onClick={handleToggleMenu}
            isMenuOpen={isMenuOpen}
          />
        </FixedMenu>
      </MenuGroup>
    </NavBarLayout>
  );
};
NavBar.displayName = 'NavBar';

export default NavBar;
