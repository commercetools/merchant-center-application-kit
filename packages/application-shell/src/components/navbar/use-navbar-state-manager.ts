import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
} from 'react';
import isNil from 'lodash/isNil';
import throttle from 'lodash/throttle';
import {
  useMcQuery,
  type TApplicationContext,
} from '@commercetools-frontend/application-shell-connectors';
import {
  GRAPHQL_TARGETS,
  STORAGE_KEYS,
} from '@commercetools-frontend/constants';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import { WINDOW_SIZES } from '../../constants';
import useApplicationsMenu from '../../hooks/use-applications-menu';
import type {
  TNavbarMenu,
  TNavbarMenuGroup,
} from '../../types/generated/proxy';
import type {
  TFetchProjectExtensionsNavbarQuery,
  TFetchProjectExtensionsNavbarQueryVariables,
} from '../../types/generated/settings';
import FetchProjectExtensionsNavbar from './fetch-project-extensions-navbar.settings.graphql';
import nonNullable from './non-nullable';

type HookProps = {
  environment: TApplicationContext<{}>['environment'];
};
type State = {
  activeItemIndex?: string;
  isExpanderVisible: boolean;
  isMenuOpen: boolean;
  isSubmenOpen: boolean;
};
type Action =
  | { type: 'setActiveItemIndex'; payload: string }
  | { type: 'unsetActiveItemIndex' }
  | { type: 'setIsExpanderVisible' }
  | { type: 'toggleIsMenuOpen' }
  | { type: 'setIsSubmenOpen'; payload: boolean }
  | { type: 'setIsMenuOpenAndMakeExpanderVisible'; payload: boolean }
  | { type: 'reset' };

const getInitialState = (isForcedMenuOpen: boolean | null): State => ({
  isExpanderVisible: true,
  isSubmenOpen: false,
  isMenuOpen: isNil(isForcedMenuOpen) ? false : isForcedMenuOpen,
});

const isForcedMenuOpenDefaultValue = false;

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setActiveItemIndex':
      return { ...state, activeItemIndex: action.payload };
    case 'unsetActiveItemIndex':
      return { ...state, activeItemIndex: undefined };
    case 'setIsExpanderVisible':
      return { ...state, isExpanderVisible: true };
    case 'setIsSubmenOpen':
      return { ...state, isSubmenOpen: action.payload };
    case 'toggleIsMenuOpen':
      return { ...state, isMenuOpen: !state.isMenuOpen };
    case 'setIsMenuOpenAndMakeExpanderVisible':
      return { ...state, isExpanderVisible: true, isMenuOpen: action.payload };
    case 'reset':
      return {
        isExpanderVisible: false,
        isMenuOpen: false,
        isSubmenOpen: false,
      };
    default:
      return state;
  }
};

const isFocusOutEventCalledBySubmenuItem = (event: FocusEvent) =>
  // a case when a submenu item loses focus
  event.type === 'focusout' &&
  // element receiving focus
  (event.relatedTarget as Element)?.matches('a[data-link-level="text-link"]') &&
  // element losing focus
  (event.target as Element)?.matches('a[data-link-level="text-link-sublist"]');

const useNavbarStateManager = (props: HookProps) => {
  const navBarNode = useRef<HTMLElement>(null);
  const applicationsNavBarMenuGroups = useApplicationsMenu<'navBarGroups'>(
    'navBarGroups',
    {
      queryOptions: {
        onError: reportErrorToSentry,
      },
      environment: props.environment,
    }
  );
  const { data: projectExtensionsQuery } = useMcQuery<
    TFetchProjectExtensionsNavbarQuery,
    TFetchProjectExtensionsNavbarQueryVariables
  >(FetchProjectExtensionsNavbar, {
    skip: !props.environment.servedByProxy,
    context: {
      target: GRAPHQL_TARGETS.SETTINGS_SERVICE,
    },
    fetchPolicy: 'cache-and-network',
    onError: reportErrorToSentry,
  });

  const allCustomApplicationsNavbarMenu =
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
    ? isForcedMenuOpenDefaultValue
    : (JSON.parse(cachedIsForcedMenuOpen) as boolean);

  if (isNil(cachedIsForcedMenuOpen)) {
    window.localStorage.setItem(
      STORAGE_KEYS.IS_FORCED_MENU_OPEN,
      String(isForcedMenuOpen)
    );
  }

  const [state, dispatch] = useReducer<
    (prevState: State, action: Action) => State
  >(reducer, getInitialState(isForcedMenuOpen));

  const checkSize = useCallback(
    throttle(() => {
      const shouldOpen = window.innerWidth > WINDOW_SIZES.STANDARD;
      const canExpandMenu = window.innerWidth > WINDOW_SIZES.WIDE;

      // If the screen is small, we should always keep the menu closed,
      // no matter the settings.
      if (!canExpandMenu) {
        if (state.isMenuOpen || state.isExpanderVisible) {
          // and resets the state to avoid conflicts
          dispatch({ type: 'reset' });
        }
      } else if (isForcedMenuOpen) {
        dispatch({
          type: 'setIsMenuOpenAndMakeExpanderVisible',
          payload: true,
        });
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
    (e: React.MouseEvent<HTMLElement> | MouseEvent | FocusEvent) => void
  >(
    (event) => {
      if (
        !navBarNode?.current?.contains(event.target as Node) &&
        !state.isMenuOpen
      ) {
        dispatch({ type: 'unsetActiveItemIndex' });
      } else if (event.type === 'mouseleave') {
        dispatch({ type: 'unsetActiveItemIndex' });
      } else if (isFocusOutEventCalledBySubmenuItem(event as FocusEvent)) {
        dispatch({ type: 'unsetActiveItemIndex' });
      }
    },
    [state.isMenuOpen]
  );

  useEffect(() => {
    window.addEventListener('resize', checkSize);
    window.addEventListener('click', shouldCloseMenuFly, true);
    window.addEventListener('focusout', shouldCloseMenuFly, true);

    return () => {
      window.removeEventListener('resize', checkSize);
      window.removeEventListener('click', shouldCloseMenuFly, true);
      window.removeEventListener('focusout', shouldCloseMenuFly, true);
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

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLLIElement>) => {
      if (event.key === 'Enter' && !state.isSubmenOpen) {
        return dispatch({
          type: 'setIsSubmenOpen',
          payload: true,
        });
      } else if (
        event.key === 'ArrowLeft' ||
        (event.key === 'Escape' && state.isSubmenOpen)
      ) {
        return dispatch({
          type: 'setIsSubmenOpen',
          payload: false,
        });
      }
    },
    [state.isSubmenOpen]
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

  const allApplicationsNavbarMenuGroups: TNavbarMenuGroup[] = (
    applicationsNavBarMenuGroups || []
  )
    .map((navbarMenuGroup) =>
      navbarMenuGroup.key === '2' && allCustomApplicationsNavbarMenu.length > 0
        ? {
            key: navbarMenuGroup.key,
            items: [
              ...navbarMenuGroup.items,
              ...allCustomApplicationsNavbarMenu,
            ],
          }
        : navbarMenuGroup
    )
    .sort(
      (navBarMenuGroupA, navBarMenuGroupB) =>
        Number(navBarMenuGroupA?.key) - Number(navBarMenuGroupB?.key)
    );

  return {
    ...state,
    navBarNode,
    handleToggleItem,
    handleToggleMenu,
    shouldCloseMenuFly,
    handleKeyDown,
    allApplicationsNavbarMenuGroups,
  };
};

export default useNavbarStateManager;
