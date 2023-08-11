import {
  MenuItemContainer,
  MenuItemIcon,
  MenuItemTitle,
  NavBarLayout,
  NavBarHeader,
  NavBarBody,
  MenuItemGroup,
  NavBarFooter,
  ExpandIcon,
  type TNavBarSkeletonProps,
  type TMenuItemProps,
} from './navbar-skeleton.styles';

const MenuItem = (props: TMenuItemProps & TNavBarSkeletonProps) => {
  return (
    <MenuItemContainer
      placement={props.placement}
      isExpanded={props.isExpanded}
    >
      <MenuItemIcon />
      {props.isExpanded && <MenuItemTitle placement={props.placement} />}
    </MenuItemContainer>
  );
};
MenuItem.defaultProps = {
  placement: 'body',
};

const NavBarSkeleton = (props: TNavBarSkeletonProps) => {
  return (
    <NavBarLayout isExpanded={props.isExpanded}>
      <NavBarHeader>
        <MenuItem placement="header" isExpanded={props.isExpanded} />
      </NavBarHeader>

      <NavBarBody>
        <MenuItemGroup>
          {[...Array(2).keys()].map((index) => (
            <MenuItem key={index} isExpanded={props.isExpanded} />
          ))}
        </MenuItemGroup>
        <MenuItemGroup>
          {[...Array(10).keys()].map((index) => (
            <MenuItem key={index} isExpanded={props.isExpanded} />
          ))}
        </MenuItemGroup>
        <MenuItemGroup>
          <MenuItem isExpanded={props.isExpanded} />
        </MenuItemGroup>
      </NavBarBody>
      <NavBarFooter isExpanded={props.isExpanded}>
        <ExpandIcon />
      </NavBarFooter>
    </NavBarLayout>
  );
};
NavBarSkeleton.displayName = 'NavBarSkeleton';

export default NavBarSkeleton;
