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
import { useIntl, FormattedMessage } from 'react-intl';
import {
  matchPath,
  useLocation,
  type RouteComponentProps,
} from 'react-router-dom';
import {
  normalizeAllAppliedActionRights,
  normalizeAllAppliedDataFences,
  normalizeAllAppliedPermissions,
} from '@commercetools-frontend/application-shell-connectors';
import type {
  TApplicationContext,
  TNormalizedPermissions,
  TNormalizedActionRights,
  TNormalizedDataFences,
} from '@commercetools-frontend/application-shell-connectors';
import LogoSVG from '@commercetools-frontend/assets/logos/commercetools_small-logo.svg';
import {
  SUPPORT_PORTAL_URL,
  NO_VALUE_FALLBACK,
} from '@commercetools-frontend/constants';
import { SupportIcon } from '@commercetools-uikit/icons';
import Spacings from '@commercetools-uikit/spacings';
import type { TFetchProjectQuery } from '../../types/generated/mc';
import type { TNavbarMenu, TBaseMenu } from '../../types/generated/proxy';
import type { TLocalizedField } from '../../types/generated/proxy';
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
  MenuExpander,
  NavBarLayout,
} from './menu-items';
import { SublistItem, SafeArea } from './menu-items.styles';
import messages from './messages';
import NavBarSkeleton from './navbar-skeleton';
import { Icon, IconWrapper, ItemIconText, Title } from './shared.styles';
import useNavbarStateManager, {
  TMousePosition,
} from './use-navbar-state-manager';

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

// Helper function to extract accessible label from menu objects
const getMenuAccessibleLabel = (
  labelAllLocales: TLocalizedField[],
  defaultLabel: string | undefined,
  applicationLocale: string
): string => {
  const localizedLabel = labelAllLocales.find((loc) =>
    applicationLocale.startsWith(loc.locale)
  );
  if (localizedLabel) return localizedLabel.value;
  if (defaultLabel) return defaultLabel;
  return NO_VALUE_FALLBACK;
};

type ApplicationMenuProps = {
  location: RouteComponentProps['location'];
  menu: TMenuWithDefaultLabel;
  isActive: boolean;
  isMenuOpen: boolean;
  shouldCloseMenuFly: MouseEventHandler<HTMLElement>;
  projectPermissions: TProjectPermissions;
  handleToggleItem: () => void;
  applicationLocale: string;
  projectKey: string;
  useFullRedirectsForLinks: boolean;
  onMenuItemClick?: MenuItemLinkProps['onClick'];
  onMouseMove: MouseEventHandler<HTMLLIElement>;
  mousePosition: TMousePosition;
  pointerEvent?: string;
};

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
  const [isSubmenuFocused, setIsSubmenuFocused] = useState(false);
  const [percentageX, setPercentageX] = useState(0);
  const [percentageY, setPercentageY] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const submenuRef = useRef<HTMLUListElement>(null);
  const submenuSafeAreaRef = useRef<HTMLElement>(null);

  const hasSubmenu =
    Array.isArray(props.menu.submenu) && props.menu.submenu.length > 0;

  const menuItemIdentifier = snakeCase(props.menu.key);

  const calculateSafeAreaStartPositon = useCallback(
    (e: MouseEvent) => {
      const currentSafeAreaRect =
        submenuSafeAreaRef.current?.getBoundingClientRect();

      const menuItemRect = document
        .querySelector(`[data-menuitem="${menuItemIdentifier}"]`)
        ?.getBoundingClientRect();

      const currentSafeAreaLeft = currentSafeAreaRect?.left || 0;
      const currentSafeAreaTop = currentSafeAreaRect?.top || 0;
      const currentSafeAreaWidth = currentSafeAreaRect?.width || 0;
      const currentSafeAreaHeight = currentSafeAreaRect?.height || 0;

      const localX = e.clientX - currentSafeAreaLeft;
      const localY = e.clientY - currentSafeAreaTop;

      let minXPercent = 0;
      if (menuItemRect && currentSafeAreaRect && currentSafeAreaWidth > 0) {
        const minX = Math.max(menuItemRect.left - currentSafeAreaRect.left, 0);
        minXPercent = (minX / currentSafeAreaWidth) * 100;
      } else if (
        menuItemRect &&
        currentSafeAreaRect &&
        currentSafeAreaWidth === 0
      ) {
        // If safe area has no width but menu item exists, consider minXPercent to be 0
        minXPercent = 0;
      }

      // Calculate nextX, ensuring not to divide by zero
      let nextX = minXPercent;
      if (currentSafeAreaWidth > 0) {
        nextX = (localX / currentSafeAreaWidth) * 100;
      }

      // Calculate nextY, ensuring not to divide by zero
      let nextY = 0;
      if (currentSafeAreaHeight > 0) {
        nextY = (localY / currentSafeAreaHeight) * 100;
      }

      // Clamp X to menu item's left border (minXPercent) and safe area bounds (100%)
      nextX = Math.max(nextX, minXPercent);
      nextX = Math.min(nextX, 100);
      if (!Number.isFinite(nextX)) {
        nextX = minXPercent;
      }

      // Clamp Y to safe area bounds (0% to 100%)
      nextY = Math.min(Math.max(nextY, 0), 100);
      if (!Number.isFinite(nextY)) {
        nextY = 0;
      }

      setPercentageX(nextX);
      setPercentageY(nextY);
    },
    [menuItemIdentifier, setPercentageX, setPercentageY]
  );

  useEffect(() => {
    window.addEventListener('mousemove', calculateSafeAreaStartPositon);
    return () => {
      window.removeEventListener('mousemove', calculateSafeAreaStartPositon);
    };
  }, [calculateSafeAreaStartPositon]);

  useLayoutEffect(() => {
    if (!submenuRef.current) return;

    const safeX = Number.isFinite(percentageX) ? percentageX : 0;
    const safeY = Number.isFinite(percentageY) ? percentageY : 100;

    submenuRef.current.style.setProperty('--safe-start', `${safeX}% ${safeY}%`);
  }, [percentageX, percentageY]);

  const callbackFn: IntersectionObserverCallback = useCallback(
    (entries) => {
      const menuItemBoundingClientRect = document
        .querySelector(`[data-menuitem="${menuItemIdentifier}"]`)
        ?.getBoundingClientRect();
      const menuItemTop = menuItemBoundingClientRect?.top || 0;
      const menuItemBottom = menuItemBoundingClientRect?.bottom || 0;

      const [entry] = entries;

      /**
       * Adding a 12 pixel buffer to the height calculation when determining if the submenu fits within the viewport below the menu item.
       * This buffer accounts for the padding added during link hover, accommodating one additional line height.
       * We need this to account for the additional card height when a hovered submenu text link wraps to the next line,
       * as otherwise the submenu would extend beyond the viewport's bottom edge and flip above the menu item.
       */
      const SINGLE_LINE_HEIGHT_BUFFER = 12;

      const doesSubmenuFitWithinViewportBelowMenuItem =
        entry.boundingClientRect.height +
          (props.isMenuOpen ? menuItemTop : menuItemBottom) +
          SINGLE_LINE_HEIGHT_BUFFER >
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
    setIsSubmenuFocused(false);
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

  useEffect(() => {
    // On first render, check which menu is active for the current application and expand
    // the submenu automatically unless the all navbar is collapsed or there are no submenu links.
    if (props.isMenuOpen && isMainMenuRouteActive && hasSubmenu) {
      props.handleToggleItem();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isMenuOpen]); // <-- (re)run this only when the all menu expands

  const handleKeyDown = (e: React.KeyboardEvent<HTMLLIElement>) => {
    const currentlyFocusedItem = submenuRef.current?.querySelector(':focus');

    if (e.key === 'Enter') {
      setIsSubmenuFocused(true);
      if (!currentlyFocusedItem) {
        submenuRef.current?.querySelector('a')?.focus();
      }
    }
  };

  return (
    <RestrictedMenuItem
      key={props.menu.key}
      keyOfMenuItem={props.menu.key}
      featureToggle={props.menu.featureToggle ?? undefined}
      permissions={props.menu.permissions}
      actionRights={props.menu.actionRights ?? undefined}
      dataFences={props.menu.dataFences ?? undefined}
      projectPermissions={props.projectPermissions}
    >
      <MenuItem
        hasSubmenu={hasSubmenu}
        isActive={props.isActive}
        isMainMenuRouteActive={isMainMenuRouteActive}
        isMenuOpen={props.isMenuOpen}
        onClick={props.handleToggleItem}
        onKeyDown={handleKeyDown}
        onMouseEnter={props.handleToggleItem}
        onMouseLeave={props.shouldCloseMenuFly}
        onMouseMove={props.onMouseMove}
        identifier={menuItemIdentifier}
        ariaLabel={getMenuAccessibleLabel(
          props.menu.labelAllLocales,
          props.menu.defaultLabel,
          props.applicationLocale
        )}
      >
        <MenuItemLink
          linkTo={`/${props.projectKey}/${props.menu.uriPath}`}
          useFullRedirectsForLinks={props.useFullRedirectsForLinks}
          onClick={props.onMenuItemClick}
          ariaLabel={getMenuAccessibleLabel(
            props.menu.labelAllLocales,
            props.menu.defaultLabel,
            props.applicationLocale
          )}
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
                >
                  <SublistItem
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
                        isSubmenuFocused={isSubmenuFocused}
                        ariaLabel={getMenuAccessibleLabel(
                          submenu.labelAllLocales,
                          submenu.defaultLabel,
                          props.applicationLocale
                        )}
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
          <SafeArea ref={submenuSafeAreaRef} />
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
  const {
    navBarNode,
    isMenuOpen,
    isExpanderVisible,
    activeItemIndex,
    mousePosition,
    handleToggleItem,
    handleToggleMenu,
    shouldCloseMenuFly,
    allApplicationsNavbarMenuGroups,
    getMousePosition,
  } = useNavbarStateManager({
    environment: props.environment,
    project: props.project,
  });
  const useFullRedirectsForLinks = Boolean(
    props.environment.useFullRedirectsForLinks
  );
  const location = useLocation();
  const { formatMessage } = useIntl();

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

  const applicationLocale = props.applicationLocale;

  // Render the loading navbar as long as all the data
  // hasn't been loaded, or if the project does not exist.
  if (props.isLoading || typeof applicationLocale === 'undefined') {
    return <NavBarSkeleton isExpanded={isMenuOpen} />;
  }

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
      <MenuGroup id="main" level={1}>
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
                        applicationLocale={applicationLocale}
                        projectKey={props.projectKey}
                        useFullRedirectsForLinks={useFullRedirectsForLinks}
                        onMenuItemClick={props.onMenuItemClick}
                        onMouseMove={(e) => getMousePosition(e, itemIndex)}
                        mousePosition={mousePosition}
                      />
                    );
                  })}
                </div>
              );
            })}
          </Spacings.Stack>
        </ScrollableMenu>
        <FixedMenu>
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
              ariaLabel={formatMessage(messages['NavBar.MCSupport.title'])}
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
                aria-label={formatMessage(messages['NavBar.MCSupport.title'])}
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
