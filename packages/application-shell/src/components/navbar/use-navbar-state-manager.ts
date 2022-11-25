import type { TApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import type { TNavbarMenu } from '../../types/generated/proxy';
import type {
  TFetchProjectExtensionsNavbarQuery,
  TFetchProjectExtensionsNavbarQueryVariables,
} from '../../types/generated/settings';

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
} from 'react';
import isNil from 'lodash/isNil';
import throttle from 'lodash/throttle';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import { STORAGE_KEYS } from '../../constants';
import { useMcQuery } from '../../hooks/apollo-hooks';
import useApplicationsMenu from '../../hooks/use-applications-menu';
import FetchProjectExtensionsNavbar from './fetch-project-extensions-navbar.settings.graphql';
import nonNullable from './non-nullable';

type HookProps = {
  environment: TApplicationContext<{}>['environment'];
};
type State = {
  activeItemIndex?: string;
  isExpanderVisible: boolean;
  isMenuOpen: boolean;
};
type Action =
  | { type: 'setActiveItemIndex'; payload: string }
  | { type: 'unsetActiveItemIndex' }
  | { type: 'setIsExpanderVisible' }
  | { type: 'toggleIsMenuOpen' }
  | { type: 'setIsMenuOpenAndMakeExpanderVisible'; payload: boolean }
  | { type: 'reset' };

const getInitialState = (isForcedMenuOpen: boolean | null): State => ({
  isExpanderVisible: true,
  isMenuOpen: isNil(isForcedMenuOpen) ? false : isForcedMenuOpen,
});

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setActiveItemIndex':
      return { ...state, activeItemIndex: action.payload };
    case 'unsetActiveItemIndex':
      return { ...state, activeItemIndex: undefined };
    case 'setIsExpanderVisible':
      return { ...state, isExpanderVisible: true };
    case 'toggleIsMenuOpen':
      return { ...state, isMenuOpen: !state.isMenuOpen };
    case 'setIsMenuOpenAndMakeExpanderVisible':
      return { ...state, isExpanderVisible: true, isMenuOpen: action.payload };
    case 'reset':
      return {
        isExpanderVisible: false,
        isMenuOpen: false,
      };
    default:
      return state;
  }
};

const useNavbarStateManager = (props: HookProps) => {
  const navBarNode = useRef<HTMLElement>(null);
  const applicationsNavBarMenu = useApplicationsMenu<'navBar'>('navBar', {
    queryOptions: {
      onError: reportErrorToSentry,
    },
    environment: props.environment,
  });
  const { data: projectExtensionsQuery } = useMcQuery<
    TFetchProjectExtensionsNavbarQuery,
    TFetchProjectExtensionsNavbarQueryVariables
  >(FetchProjectExtensionsNavbar, {
    skip: props.environment.servedByProxy,
    context: {
      target: GRAPHQL_TARGETS.SETTINGS_SERVICE,
    },
    fetchPolicy: 'cache-and-network',
    onError: reportErrorToSentry,
  });
  const legacyCustomAppsMenu =
    projectExtensionsQuery &&
    projectExtensionsQuery.projectExtension &&
    projectExtensionsQuery.projectExtension.applications
      ? projectExtensionsQuery.projectExtension.applications
          .map<TNavbarMenu | undefined>((app) => {
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
              submenu: (app.navbarMenu.submenu || []).map((menu) => ({
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
  const organizationCustomAppsMenu =
    projectExtensionsQuery &&
    projectExtensionsQuery.projectExtension &&
    projectExtensionsQuery.projectExtension.installedApplications
      ? projectExtensionsQuery.projectExtension.installedApplications
          .map<TNavbarMenu | undefined>((installedApplication) => {
            const application = installedApplication.application;
            // Map the menu properties to match the one from the proxy schema.
            // This is to ensure that the menu object is the same from the proxy
            // config and the custom apps config, thus allowing them to be
            // concatenated and rendered the same way.
            return {
              key: application.id,
              uriPath: application.entryPointUriPath,
              labelAllLocales: application.mainMenuLink.labelAllLocales || [],
              icon: application.icon,
              permissions: application.mainMenuLink.permissions as string[],
              defaultLabel: application.mainMenuLink.defaultLabel,
              featureToggle: undefined,
              menuVisibility: undefined,
              actionRights: undefined,
              dataFences: undefined,
              shouldRenderDivider: false,
              submenu: (application.submenuLinks || []).map((submenuLink) => ({
                key: submenuLink.id,
                uriPath: submenuLink.uriPath,
                labelAllLocales: submenuLink.labelAllLocales || [],
                permissions: submenuLink.permissions as string[],
                defaultLabel: submenuLink.defaultLabel,
                featureToggle: undefined,
                menuVisibility: undefined,
                actionRights: undefined,
                dataFences: undefined,
              })),
            };
          })
          .filter(nonNullable)
      : [];
  const cachedIsForcedMenuOpen = window.localStorage.getItem(
    STORAGE_KEYS.IS_FORCED_MENU_OPEN
  );
  const isForcedMenuOpen = isNil(cachedIsForcedMenuOpen)
    ? null
    : (JSON.parse(cachedIsForcedMenuOpen) as boolean);

  const [state, dispatch] = useReducer<
    (prevState: State, action: Action) => State
  >(reducer, getInitialState(isForcedMenuOpen));

  const checkSize = useCallback(
    throttle(() => {
      const shouldOpen = window.innerWidth > 1024;
      const canExpandMenu = window.innerWidth > 918;

      // If the screen is small, we should always keep the menu closed,
      // no matter the settings.
      if (!canExpandMenu) {
        if (state.isMenuOpen || state.isExpanderVisible) {
          // and resets the state to avoid conflicts
          dispatch({ type: 'reset' });
        }
      } else if (canExpandMenu && state.isExpanderVisible !== true) {
        dispatch({ type: 'setIsExpanderVisible' });
      } else if (isNil(isForcedMenuOpen) && state.isMenuOpen !== shouldOpen) {
        // User has no settings yet (this.props.isForcedMenuOpen === null)
        // We check the viewport size and:
        // - if screen is big, we open the menu
        // - if screen is small we close it
        dispatch({
          type: 'setIsMenuOpenAndMakeExpanderVisible',
          payload: shouldOpen,
        });
      } else if (
        !isNil(isForcedMenuOpen) &&
        state.isMenuOpen !== isForcedMenuOpen
      ) {
        // User has setting, we should use that and ignore the screen size.
        // Note: if viewport size is small, we should ignore the user settings.
        dispatch({
          type: 'setIsMenuOpenAndMakeExpanderVisible',
          payload: isForcedMenuOpen,
        });
      }
    }, 100),
    [isForcedMenuOpen, state.isExpanderVisible, state.isMenuOpen]
  );

  const shouldCloseMenuFly = useCallback<
    (e: React.MouseEvent<HTMLElement> | MouseEvent) => void
  >(
    (event) => {
      if (
        navBarNode &&
        navBarNode.current &&
        !navBarNode.current.contains(event.target as Node) &&
        !state.isMenuOpen
      )
        dispatch({ type: 'unsetActiveItemIndex' });
      else if (event.type === 'mouseleave')
        dispatch({ type: 'unsetActiveItemIndex' });
    },
    [state.isMenuOpen]
  );

  useEffect(() => {
    window.addEventListener('resize', checkSize);
    window.addEventListener('click', shouldCloseMenuFly, true);

    return () => {
      window.removeEventListener('resize', checkSize);
      window.removeEventListener('click', shouldCloseMenuFly, true);
    };
  }, [checkSize, shouldCloseMenuFly]);

  useEffect(() => {
    checkSize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // <-- run this only once!!

  useLayoutEffect(() => {
    if (state.isMenuOpen) document.body.classList.add('body__menu-open');
    if (!state.isMenuOpen) document.body.classList.remove('body__menu-open');
  }, [state.isMenuOpen]);

  const handleToggleItem = useCallback(
    (nextActiveItemIndex: string) => {
      if (state.activeItemIndex !== nextActiveItemIndex)
        dispatch({
          type: 'setActiveItemIndex',
          payload: nextActiveItemIndex,
        });
    },
    [state.activeItemIndex]
  );

  const handleToggleMenu = useCallback(() => {
    if (state.isMenuOpen && state.activeItemIndex) {
      dispatch({ type: 'unsetActiveItemIndex' });
    }
    dispatch({ type: 'toggleIsMenuOpen' });
    // Synchronize the menu state with local storage.
    window.localStorage.setItem(
      STORAGE_KEYS.IS_FORCED_MENU_OPEN,
      String(!state.isMenuOpen)
    );
  }, [state.activeItemIndex, state.isMenuOpen]);

  const allInternalApplicationsNavbarMenu = (
    applicationsNavBarMenu || []
  ).concat([
    {
      actionRights: null,
      dataFences: null,
      featureToggle: null,
      icon: '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21 3v.62c0 2.909-1.628 6.975-3.724 9.914v3.742a.62.62 0 0 1-.182.439l-3.103 3.103a.62.62 0 0 1-1.06-.439v-2.225l-1.241-1.242-.803.803a.619.619 0 0 1-.878 0L6.285 13.99a.62.62 0 0 1 0-.878l.803-.803-1.242-1.241H3.621a.62.62 0 0 1-.44-1.06l3.104-3.103a.62.62 0 0 1 .44-.182h3.741C13.405 4.628 17.471 3 20.379 3H21ZM6.103 15.414l2.483 2.483C8.586 19.612 6.088 21 3 21c0-3.088 1.388-5.586 3.103-5.586Zm9.316-8.695a1.864 1.864 0 0 0-1.862 1.862c0 1.027.835 1.862 1.862 1.862a1.864 1.864 0 0 0 1.862-1.862 1.864 1.864 0 0 0-1.862-1.862Z" fill="#000" fill-rule="nonzero"/></svg>',
      key: 'settings',
      labelAllLocales: [{ locale: 'en', value: 'Hello' }],
      permissions: [],
      menuVisibility: null,
      shouldRenderDivider: true,
      submenu: [],
      uriPath: 'settings',
      __typename: 'NavbarMenu',
    },
  ]);
  const allCustomApplicationsNavbarMenu = legacyCustomAppsMenu.concat(
    organizationCustomAppsMenu
  );

  return {
    ...state,
    navBarNode,
    handleToggleItem,
    handleToggleMenu,
    shouldCloseMenuFly,
    allInternalApplicationsNavbarMenu,
    allCustomApplicationsNavbarMenu,
  };
};

export default useNavbarStateManager;
