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

type TMenuItemComponentProps = Omit<TMenuItemProps, 'contentWidth'> &
  TNavBarSkeletonProps & {
    contentWidth?: 'narrow' | 'wide';
  };
const MenuItem = ({
  contentWidth = 'wide',
  ...props
}: TMenuItemComponentProps) => {
  return (
    <MenuItemContainer
      isExpanded={props.isExpanded}
      contentWidth={contentWidth}
    >
      <MenuItemIcon />
      {props.isExpanded && <MenuItemTitle />}
    </MenuItemContainer>
  );
};

const NavBarSkeleton = (props: TNavBarSkeletonProps) => {
  return (
    <NavBarLayout isExpanded={props.isExpanded}>
      <NavBarHeader>
        <MenuItemGroup>
          <MenuItem contentWidth="narrow" isExpanded={props.isExpanded} />
        </MenuItemGroup>
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
