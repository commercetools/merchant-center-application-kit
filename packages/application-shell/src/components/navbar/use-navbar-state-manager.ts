import React from 'react';
import isNil from 'lodash/isNil';
import { useQuery } from 'react-apollo';
import { useFeatureToggle } from '@flopflip/react-broadcast';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { TApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import { TApplicationsMenu, TNavbarMenu } from '../../types/generated/proxy';
import {
  TFetchProjectExtensionsNavbarQuery,
  TFetchProjectExtensionsNavbarQueryVariables,
} from '../../types/generated/settings';
import { PROJECT_EXTENSIONS } from '../../feature-toggles';
import { STORAGE_KEYS } from '../../constants';
import useApplicationsMenu from '../../hooks/use-applications-menu';
import FetchProjectExtensionsNavbar from './fetch-project-extensions-navbar.settings.graphql';
import nonNullable from './non-nullable';

type HookProps = {
  environment: TApplicationContext<{}>['environment'];
  DEV_ONLY__loadNavbarMenuConfig?: () => Promise<TApplicationsMenu['navBar']>;
};

const useNavbarStateManager = (props: HookProps) => {
  const navBarNode = React.useRef<HTMLElement>(null);
  const areProjectExtensionsEnabled = useFeatureToggle(PROJECT_EXTENSIONS);
  const applicationsNavBarMenu = useApplicationsMenu<'navBar'>('navBar', {
    queryOptions: {
      onError: reportErrorToSentry,
    },
    skipRemoteQuery: !props.environment.servedByProxy,
    loadMenuConfig: props.DEV_ONLY__loadNavbarMenuConfig,
  });
  const { data: projectExtensionsQuery } = useQuery<
    TFetchProjectExtensionsNavbarQuery,
    TFetchProjectExtensionsNavbarQueryVariables
  >(FetchProjectExtensionsNavbar, {
    skip: !props.environment.servedByProxy || !areProjectExtensionsEnabled,
    variables: {
      target: GRAPHQL_TARGETS.SETTINGS_SERVICE,
    },
    fetchPolicy: 'cache-and-network',
    onError: reportErrorToSentry,
  });
  const customAppsMenu =
    projectExtensionsQuery &&
    projectExtensionsQuery.projectExtension &&
    projectExtensionsQuery.projectExtension.applications
      ? projectExtensionsQuery.projectExtension.applications
          .map<TNavbarMenu | undefined>(app => {
            // Map the menu properties to match the one from the proxy schema.
            // This is to ensure that the menu object is the same from the proxy
            // config and the custom apps config, thus allowing them to be
            // concatenated and rendered the same way.
            if (!app.navbarMenu) return;
            return {
              key: app.navbarMenu.key,
              uriPath: app.navbarMenu.uriPath,
              labelAllLocales: app.navbarMenu.labelAllLocales || [],
              icon: app.navbarMenu.icon,
              featureToggle: app.navbarMenu.featureToggle,
              permissions: app.navbarMenu.permissions as string[],
              submenu: (app.navbarMenu.submenu || []).map(menu => ({
                key: menu.key,
                uriPath: menu.uriPath,
                labelAllLocales: menu.labelAllLocales || [],
                featureToggle: menu.featureToggle,
                permissions: menu.permissions as string[],
                menuVisibility: undefined,
                actionRights: undefined,
                dataFences: undefined,
              })),
              menuVisibility: undefined,
              actionRights: undefined,
              dataFences: undefined,
              shouldRenderDivider: false,
            };
          })
          .filter(nonNullable)
      : [];
  const cachedIsForcedMenuOpen = window.localStorage.getItem(
    STORAGE_KEYS.IS_FORCED_MENU_OPEN
  );
  const isForcedMenuOpen =
    typeof cachedIsForcedMenuOpen === 'string'
      ? cachedIsForcedMenuOpen === 'true'
      : null;

  const [activeItemIndex, setActiveItemIndex] = React.useState<string | null>(
    null
  );
  const [isExpanderVisible, setIsExpanderVisible] = React.useState(true);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const checkSize = React.useCallback(() => {
    const shouldOpen = window.innerWidth > 1024;
    const canExpandMenu = window.innerWidth > 918;

    // If the screen is small, we should always keep the menu closed,
    // no matter the settings.
    if (!canExpandMenu) {
      if (isMenuOpen || isExpanderVisible) {
        // and resets the state to avoid conflicts
        setIsMenuOpen(false);
        setIsExpanderVisible(false);
        setActiveItemIndex(null);
      }
    } else if (canExpandMenu && isExpanderVisible !== true)
      setIsExpanderVisible(true);
    else if (isNil(isForcedMenuOpen) && isMenuOpen !== shouldOpen) {
      // User has no settings yet (this.props.isForcedMenuOpen === null)
      // We check the viewport size and:
      // - if screen is big, we open the menu
      // - if screen is small we close it
      setIsMenuOpen(shouldOpen);
      setIsExpanderVisible(true);
    } else if (!isNil(isForcedMenuOpen) && isMenuOpen !== isForcedMenuOpen) {
      // User has setting, we should use that and ignore the screen size.
      // Note: if viewport size is small, we should ignore the user settings.
      setIsMenuOpen(isForcedMenuOpen);
      setIsExpanderVisible(true);
    }
  }, [isExpanderVisible, isMenuOpen, isForcedMenuOpen]);

  const shouldCloseMenuFly = React.useCallback<
    (e: React.MouseEvent<HTMLElement> | MouseEvent) => void
  >(
    event => {
      if (
        navBarNode &&
        navBarNode.current &&
        !navBarNode.current.contains(event.target as Node) &&
        !isMenuOpen
      )
        setActiveItemIndex(null);
      else if (event.type === 'mouseleave') setActiveItemIndex(null);
    },
    [isMenuOpen]
  );

  React.useEffect(() => {
    window.addEventListener('resize', checkSize);
    window.addEventListener('click', shouldCloseMenuFly, true);

    checkSize();

    return () => {
      window.removeEventListener('resize', checkSize);
      window.removeEventListener('click', shouldCloseMenuFly, true);
    };
  }, [checkSize, shouldCloseMenuFly]);

  React.useEffect(() => {
    if (isMenuOpen) document.body.classList.add('body__menu-open');
    if (!isMenuOpen) document.body.classList.remove('body__menu-open');
  }, [isMenuOpen]);

  const handleToggleItem = React.useCallback(
    (menuType: string, index: string) => {
      const activeItem = `${menuType}-${index}`;
      if (activeItemIndex !== activeItem) setActiveItemIndex(activeItem);
    },
    [activeItemIndex]
  );

  const handleToggleMenu = React.useCallback(() => {
    if (isMenuOpen && activeItemIndex !== null) {
      setActiveItemIndex(null);
    }
    setIsMenuOpen(prevState => !prevState);
  }, [activeItemIndex, isMenuOpen]);

  // Synchronize the menu state with local storage.
  React.useEffect(() => {
    window.localStorage.setItem(
      STORAGE_KEYS.IS_FORCED_MENU_OPEN,
      String(isMenuOpen)
    );
  }, [isMenuOpen]);

  const allApplicationNavbarMenu = (applicationsNavBarMenu || []).concat(
    customAppsMenu
  );

  return {
    navBarNode,
    isMenuOpen,
    isExpanderVisible,
    activeItemIndex,
    handleToggleItem,
    handleToggleMenu,
    shouldCloseMenuFly,
    allApplicationNavbarMenu,
  };
};

export default useNavbarStateManager;
