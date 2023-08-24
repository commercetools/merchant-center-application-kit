import {
  forwardRef,
  lazy,
  MouseEventHandler,
  ReactNode,
  SyntheticEvent,
} from 'react';
import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';
import { useFlagVariation } from '@flopflip/react-broadcast';
import type { TFlagVariation } from '@flopflip/types';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import { designTokens as appkitDesignTokens } from '@commercetools-frontend/application-components';
import type {
  TNormalizedMenuVisibilities,
  TNormalizedPermissions,
  TNormalizedActionRights,
  TNormalizedDataFences,
} from '@commercetools-frontend/application-shell-connectors';
import MissingImageSvg from '@commercetools-frontend/assets/images/diagonal-line.svg';
import { NO_VALUE_FALLBACK } from '@commercetools-frontend/constants';
import { RestrictedByPermissions } from '@commercetools-frontend/permissions';
import { ArrowRightIcon, BackIcon } from '@commercetools-uikit/icons';
import InlineSvg from '@commercetools-uikit/icons/inline-svg';
import type {
  TDataFence,
  TActionRight,
  TLocalizedField,
} from '../../types/generated/proxy';
import { location } from '../../utils/location';
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

const HeartIcon = lazy(() => import('./legacy-icons/heart'));
const PaperclipIcon = lazy(() => import('./legacy-icons/paperclip'));
const PluginIcon = lazy(() => import('./legacy-icons/plugin'));
const RocketIcon = lazy(() => import('./legacy-icons/rocket'));
const StarIcon = lazy(() => import('./legacy-icons/star'));
const ConnectedSquareIcon = lazy(
  () => import('./legacy-icons/connected-square')
);
const WorldIcon = lazy(() => import('./legacy-icons/world'));
const TreeStructureIcon = lazy(() => import('./legacy-icons/tree-structure'));
const UserFilledIcon = lazy(() => import('./legacy-icons/user-filled'));
const SpeedometerIcon = lazy(() => import('./legacy-icons/speedometer'));
const TagMultiIcon = lazy(() => import('./legacy-icons/tag-multi'));
const CartIcon = lazy(() => import('./legacy-icons/cart'));
const BoxIcon = lazy(() => import('./legacy-icons/box'));
const GearIcon = lazy(() => import('./legacy-icons/gear'));
const ListWithSearchIcon = lazy(
  () => import('./legacy-icons/list-with-search')
);

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
    // Legacy application icons
    // TODO: To be removed once MC applications icons updates are published
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
  isMenuOpen: boolean;
};
const MenuExpander = (props: MenuExpanderProps) => {
  return (
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
        <ArrowRightIcon color="surface" size="big" />
      </div>
    </li>
  );
};
MenuExpander.displayName = 'MenuExpander';

const Faded = styled.div`
  position: absolute;
  top: -32px;
  height: 32px;
  width: 100%;
  background: linear-gradient(
    0deg,
    ${appkitDesignTokens.backgroundColorForNavbar} 0%,
    rgba(0, 0, 0, 0) 100%
  );
  z-index: 1;
`;

type MenuGroupProps = {
  id: string;
  level: 1 | 2;
  isActive?: boolean;
  isExpanded?: boolean;
  hasSubmenu?: boolean;
  children?: ReactNode;
};

const MenuGroup = (props: MenuGroupProps) => {
  if (
    props.isExpanded &&
    ((props.level === 2 && !props.hasSubmenu) ||
      (props.level === 2 && !props.isActive))
  ) {
    return null;
  }
  const isSublistActiveWhileIsMenuExpanded =
    props.level === 2 && props.isActive && props.isExpanded;
  const isSublistActiveWhileIsMenuCollapsed =
    props.level === 2 && props.isActive && !props.isExpanded;
  return (
    <ul
      id={`group-${props.id}`}
      data-testid={`group-${props.id}`}
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
  isMainMenuRouteActive?: boolean;
  isMenuOpen: boolean;
  onClick: MouseEventHandler<HTMLElement>;
  onMouseEnter?: MouseEventHandler<HTMLElement>;
  onMouseLeave?: MouseEventHandler<HTMLElement>;
  children: ReactNode;
};
const MenuItem = (props: MenuItemProps) => (
  <li
    role="menuitem"
    className={classnames(styles['list-item'], {
      [styles.item__active]: props.isActive,
      [styles['item_menu__active']]: props.isMainMenuRouteActive ?? false,
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

export type MenuItemLinkProps = {
  linkTo?: string;
  exactMatch: boolean;
  children: ReactNode;
  onClick?: (event: SyntheticEvent<HTMLAnchorElement>) => void;
  useFullRedirectsForLinks?: boolean;
};
const menuItemLinkDefaultProps: Pick<MenuItemLinkProps, 'exactMatch'> = {
  exactMatch: false,
};
const MenuItemLink = (props: MenuItemLinkProps) => {
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
            props.onClick(event);
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

const MenuItemDivider = () => <div className={styles.divider} />;
MenuItemDivider.displayName = 'MenuItemDivider';

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
type TLongLivedFlag = {
  value: boolean;
  reason?: string;
};
const restrictedMenuItemDefaultProps: Pick<
  RestrictedMenuItemProps,
  'permissions'
> = {
  permissions: [],
};
function isLongLivedFlag(
  flag: TFlagVariation | TLongLivedFlag
): flag is TLongLivedFlag {
  return typeof (flag as TLongLivedFlag)?.value === 'boolean';
}
const RestrictedMenuItem = (props: RestrictedMenuItemProps) => {
  // NOTE: Custom application are activated/deactivated while their
  // visibility is not controlled via a visibiility overwrite.
  const flagVariation = useFlagVariation(props.featureToggle);
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
    // A regular short-lived feature toggle
    if (flagVariation === true) return permissionsWrapper;
    // A long-lived feature toggle with `{ value: boolean, string: reason }`
    if (isLongLivedFlag(flagVariation) && flagVariation.value === true)
      return permissionsWrapper;

    return null;
  }

  return permissionsWrapper;
};
RestrictedMenuItem.displayName = 'RestrictedMenuItem';
RestrictedMenuItem.defaultProps = restrictedMenuItemDefaultProps;

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

type TNavBarLayoutProps = {
  children: ReactNode;
};
const NavBarLayout = forwardRef<HTMLElement, TNavBarLayoutProps>(
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
      >
        {props.children}
      </nav>
    </>
  )
);
NavBarLayout.displayName = 'NavBarLayout';

export {
  RestrictedMenuItem,
  MenuItem,
  MenuItemLink,
  IconSwitcher,
  MenuGroup,
  MenuLabel,
  MenuItemDivider,
  MenuExpander,
  Faded,
  NavBarLayout,
};
