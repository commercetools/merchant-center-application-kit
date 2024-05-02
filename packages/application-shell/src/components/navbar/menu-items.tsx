import {
  forwardRef,
  lazy,
  Fragment,
  type MouseEventHandler,
  type FocusEventHandler,
  type MouseEvent,
  type KeyboardEvent,
  type ReactNode,
  type SyntheticEvent,
} from 'react';
import { Global } from '@emotion/react';
import { useFlagVariation } from '@flopflip/react-broadcast';
import type { TFlagVariation } from '@flopflip/types';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import type {
  TNormalizedMenuVisibilities,
  TNormalizedPermissions,
  TNormalizedActionRights,
  TNormalizedDataFences,
} from '@commercetools-frontend/application-shell-connectors';
import MissingImageSvg from '@commercetools-frontend/assets/images/diagonal-line.svg';
import { NO_VALUE_FALLBACK } from '@commercetools-frontend/constants';
import { RestrictedByPermissions } from '@commercetools-frontend/permissions';
import {
  BackIcon,
  SidebarExpandIcon,
  SidebarCollapseIcon,
} from '@commercetools-uikit/icons';
import InlineSvg from '@commercetools-uikit/icons/inline-svg';
import type {
  TDataFence,
  TActionRight,
  TLocalizedField,
} from '../../types/generated/proxy';
import { location } from '../../utils/location';
import {
  getMenuItemLinkStyles,
  leftNavigationOpenStyles,
  ItemContent,
} from './main-navbar.styles';
import {
  Expander,
  ExpanderIcon,
  LeftNavigation,
  MenuList,
  MenuListItem,
  TextLinkSublistWrapper,
  NavlinkClickableContent,
} from './menu-items.styles';
import { Icon, IconWrapper, ItemIconText, Title } from './shared.styles';

type TProjectPermissions = {
  permissions: TNormalizedPermissions | null;
  actionRights: TNormalizedActionRights | null;
  dataFences: TNormalizedDataFences | null;
};

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
  onClick: (
    e: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>
  ) => void;
  isMenuOpen: boolean;
};

const getIcon = ({ isMenuOpen }: MenuExpanderProps) => {
  const Icon = isMenuOpen ? SidebarCollapseIcon : SidebarExpandIcon;
  return <Icon color="surface" size="big" />;
};

const MenuExpander = (props: MenuExpanderProps) => {
  return (
    <Expander key="expander" isVisible={props.isVisible}>
      <ExpanderIcon
        onClick={props.onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            props.onClick(e);
          }
        }}
        tabIndex={0}
        data-testid="menu-expander"
      >
        {getIcon(props)}
      </ExpanderIcon>
    </Expander>
  );
};
MenuExpander.displayName = 'MenuExpander';

export type MenuGroupProps = {
  id: string;
  level: 1 | 2;
  isActive?: boolean;
  isExpanded?: boolean;
  hasSubmenu?: boolean;
  children?: ReactNode;
  submenuVerticalPosition?: number;
  isSubmenuAboveMenuItem?: boolean;
  handleKeyDown?: React.KeyboardEventHandler<HTMLUListElement>;
};

const MenuGroup = forwardRef<HTMLUListElement, MenuGroupProps>((props, ref) => {
  if (
    props.isExpanded &&
    ((props.level === 2 && !props.hasSubmenu) ||
      (props.level === 2 && !props.isActive))
  ) {
    return null;
  }
  const isSublistActiveWhileIsMenuExpanded = Boolean(
    props.level === 2 && props.isActive && props.isExpanded
  );
  const isSublistActiveWhileIsMenuCollapsed = Boolean(
    props.level === 2 && props.isActive && !props.isExpanded
  );

  return (
    <MenuList
      ref={ref && props.level === 2 ? ref : null}
      level={props.level}
      id={`group-${props.id}`}
      data-testid={`group-${props.id}`}
      role="menu"
      aria-expanded={
        isSublistActiveWhileIsMenuExpanded ||
        isSublistActiveWhileIsMenuCollapsed
      }
      onKeyDown={props.handleKeyDown}
      className={classnames(
        {
          'sublist-expanded__active': isSublistActiveWhileIsMenuExpanded,
        },
        {
          'sublist-collapsed__empty':
            isSublistActiveWhileIsMenuCollapsed && !props.hasSubmenu,
        },
        {
          'sublist-collapsed__active':
            isSublistActiveWhileIsMenuCollapsed &&
            !props.isSubmenuAboveMenuItem,
        },
        {
          'sublist-collapsed__active__above':
            isSublistActiveWhileIsMenuCollapsed && props.isSubmenuAboveMenuItem,
        }
      )}
      isSublistActiveWhileIsMenuExpanded={isSublistActiveWhileIsMenuExpanded}
      isSublistActiveWhileIsMenuCollapsed={isSublistActiveWhileIsMenuCollapsed}
      isSublistCollapsedAndActive={
        isSublistActiveWhileIsMenuCollapsed && !props.isSubmenuAboveMenuItem
      }
      isSublistCollapsedAndActiveAndAbove={Boolean(
        isSublistActiveWhileIsMenuCollapsed && props.isSubmenuAboveMenuItem
      )}
      isSubmenuAboveMenuItem={props.isSubmenuAboveMenuItem}
      submenuVerticalPosition={props.submenuVerticalPosition}
    >
      {props.children}
    </MenuList>
  );
});
MenuGroup.displayName = 'MenuGroup';

type MenuItemProps = {
  hasSubmenu: boolean;
  isActive: boolean;
  isMainMenuRouteActive?: boolean;
  isMenuOpen: boolean;
  onClick: MouseEventHandler<HTMLElement>;
  onMouseEnter?:
    | MouseEventHandler<HTMLElement>
    | FocusEventHandler<HTMLElement>;
  onMouseLeave?:
    | MouseEventHandler<HTMLElement>
    | FocusEventHandler<HTMLElement>;
  children: ReactNode;
  identifier?: string;
  onMouseMove?: MouseEventHandler<HTMLLIElement>;
  onKeyDown?: (e: React.KeyboardEvent<HTMLLIElement>) => void;
};
const MenuItem = (props: MenuItemProps) => {
  return (
    <MenuListItem
      role="menuitem"
      onClick={props.onClick}
      onMouseEnter={props.onMouseEnter as MouseEventHandler<HTMLElement>}
      onMouseLeave={props.onMouseLeave as MouseEventHandler<HTMLElement>}
      onFocus={props.onMouseEnter as FocusEventHandler<HTMLElement>}
      onBlur={props.onMouseLeave as FocusEventHandler<HTMLElement>}
      onKeyDown={props.onKeyDown}
      data-menuitem={props.identifier}
      className={classnames({
        active: props.isActive,
      })}
      isActive={props.isActive}
      isRouteActive={Boolean(props.isMainMenuRouteActive)}
      isCollapsed={!props.isMenuOpen}
      onMouseMove={props.onMouseMove as MouseEventHandler<HTMLLIElement>}
    >
      <ItemContent>{props.children}</ItemContent>
    </MenuListItem>
  );
};

MenuItem.displayName = 'MenuItem';

export type MenuItemLinkProps = {
  linkTo?: string;
  exactMatch: boolean;
  children: ReactNode;
  onClick?: (event: SyntheticEvent<HTMLAnchorElement>) => void;
  useFullRedirectsForLinks?: boolean;
  isSubmenuLink?: boolean;
  isSubmenuFocused?: boolean;
};
const menuItemLinkDefaultProps: Pick<MenuItemLinkProps, 'exactMatch'> = {
  exactMatch: false,
};
const NavLinkWrapper = (props: MenuItemLinkProps) => {
  const Wrapper = props.isSubmenuLink ? TextLinkSublistWrapper : Fragment;
  return <Wrapper>{props.children}</Wrapper>;
};
const NavLinkClickableContentWrapper = (props: MenuItemLinkProps) => {
  const Wrapper = props.isSubmenuLink ? NavlinkClickableContent : Fragment;
  return <Wrapper>{props.children}</Wrapper>;
};

const MenuItemLink = (props: MenuItemLinkProps) => {
  const redirectTo = (targetUrl: string) => location.replace(targetUrl);
  if (props.linkTo) {
    const linkLevel = props.isSubmenuLink ? 'text-link-sublist' : 'text-link';
    return (
      <NavLinkWrapper {...props}>
        <NavLink
          to={props.linkTo}
          exact={props.exactMatch}
          activeClassName="highlighted"
          data-link-level={linkLevel}
          css={getMenuItemLinkStyles(Boolean(props.isSubmenuLink))}
          tabIndex={props.isSubmenuLink && !props.isSubmenuFocused ? -1 : 0}
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
          <NavLinkClickableContentWrapper {...props}>
            {props.children}
          </NavLinkClickableContentWrapper>
        </NavLink>
      </NavLinkWrapper>
    );
  }
  return <>{props.children}</>;
};
MenuItemLink.displayName = 'MenuItemLink';
MenuItemLink.defaultProps = menuItemLinkDefaultProps;

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
      <Global styles={leftNavigationOpenStyles} />
      <LeftNavigation ref={ref} data-testid="left-navigation">
        {props.children}
      </LeftNavigation>
    </>
  )
);
NavBarLayout.displayName = 'NavBarLayout';

type ItemContainerProps = {
  labelAllLocales: TLocalizedField[];
  defaultLabel?: string;
  applicationLocale: string;
  icon: string;
  isMenuOpen?: boolean;
};

const ItemContainer = (props: ItemContainerProps) => {
  return (
    <ItemIconText>
      <IconWrapper>
        <Icon className="icon">
          <IconSwitcher icon={props.icon} size="scale" />
        </Icon>
      </IconWrapper>
      {props.isMenuOpen ? (
        <Title>
          <MenuLabel
            labelAllLocales={props.labelAllLocales}
            defaultLabel={props.defaultLabel}
            applicationLocale={props.applicationLocale}
          />
        </Title>
      ) : null}
    </ItemIconText>
  );
};

ItemContainer.displayName = 'ItemContainer';

export {
  RestrictedMenuItem,
  MenuItem,
  MenuItemLink,
  IconSwitcher,
  MenuGroup,
  MenuLabel,
  MenuExpander,
  NavBarLayout,
  ItemContainer,
};
