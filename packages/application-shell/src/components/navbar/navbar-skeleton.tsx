import type { ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { designTokens } from '@commercetools-uikit/design-system';

const NavBarLayout = (
  props: TNavBarSkeletonProps & { children: ReactNode }
) => {
  return (
    <nav
      aria-busy={true}
      css={css`
        display: flex;
        flex-direction: column;
        height: 100%;
        width: ${props.isExpanded ? '256px' : '80px'};
      `}
    >
      {props.children}
    </nav>
  );
};

const NavBarBody = styled.div`
  display: flex;
  flex: 1;
  padding: ${designTokens.spacing30};
  flex-direction: column;
  align-items: flex-start;
  gap: ${designTokens.spacing40};
  flex-shrink: 0;
  background: #009987; // TODO: use new design token color-primary-30
  position: relative;

  // bottom gardient
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    height: 36px;
    width: calc(100% - 2 * ${designTokens.spacing30});
    background: linear-gradient(180deg, rgba(0, 153, 135, 0) 0%, #009987 100%);
  }
`;

const NavBarFooter = styled.div<TNavBarSkeletonProps>`
  position: relative;
  display: flex;
  width: 100%;
  flex-direction: column;
  background: linear-gradient(180deg, #009987 0%, #004d44 100%);
  padding: ${designTokens.spacing30}
    ${(props) => (props.isExpanded ? '58px' : '0px')};
  justify-content: center;
  align-items: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    height: 1px;
    width: calc(100% - 2 * ${designTokens.spacing30});
    background: rgba(255, 255, 255, 0.5);
  }
`;

const ExpandIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${designTokens.borderRadius4};
  background: rgba(255, 255, 255, 0.2);
`;

const MenuItemContainer = styled.div<TMenuItem & TNavBarSkeletonProps>`
  display: flex;
  height: 48px;
  padding: 12px
    ${(props) => (props.isExpanded ? designTokens.spacing30 : '12px')};
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: ${
    (props) =>
      props.placement === 'header' ? designTokens.colorAccent10 : '#009987' // TODO: use new design token color-primary-30
  };
`;

const MenuItemIcon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: ${designTokens.borderRadius4};
  background: rgba(255, 255, 255, 0.2);
`;
const MenuItemTitle = styled.div<TMenuItem>`
  ${(props) =>
    props.placement === 'header'
      ? css`
          height: 19px;
          width: 132px;
        `
      : css`
          flex: 1;
          height: 18px;
        `};
  border-radius: ${designTokens.borderRadius4};
  background: rgba(255, 255, 255, 0.2);
`;

const MenuItemGroup = styled.div`
  width: 100%;
`;

type TMenuItem = {
  placement: 'header' | 'body';
};

const MenuItem = (props: TMenuItem & TNavBarSkeletonProps) => {
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

type TNavBarSkeletonProps = {
  isExpanded: boolean;
};
const NavBarSkeleton = (props: TNavBarSkeletonProps) => {
  return (
    <NavBarLayout isExpanded={props.isExpanded}>
      <MenuItemGroup>
        <MenuItem placement="header" isExpanded={props.isExpanded} />
      </MenuItemGroup>

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
