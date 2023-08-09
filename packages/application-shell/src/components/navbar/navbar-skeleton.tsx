import type { FC } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { designTokens } from '@commercetools-uikit/design-system';

const NavBarLayout: FC<TNavBarSkeletonProps> = (props) => {
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

const NavBarHeader = styled.div`
  display: flex;
  padding: ${designTokens.spacing30};
  height: 58px;
  justify-content: center;
  align-items: center;
  gap: ${designTokens.spacing20};
  align-self: stretch;
  background: ${designTokens.colorAccent10};
`;

const NavBarBody = styled.div`
  display: flex;
  flex: 1;
  padding: ${designTokens.spacing30};
  flex-direction: column;
  align-items: flex-start;
  gap: ${designTokens.spacing40};
  flex-shrink: 0;
  background: var(--primary-color-primary-30, #009987); // use new design token
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    height: 36px;
    width: calc(100% - 2 * ${designTokens.spacing30});
    background: linear-gradient(180deg, rgba(0, 153, 135, 0) 0%, #009987 100%);
  }
`;

const NavBarFooter = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 106px;
  flex-direction: column;
  align-items: flex-start;
  background: var(
    --footer-gradient,
    linear-gradient(180deg, #009987 0%, #004d44 100%)
  );

  &::before {
    content: '';
    position: absolute;
    top: 0;
    height: 1px;
    width: calc(100% - 2 * ${designTokens.spacing30});
    flex-shrink: 0;
    align-self: center;
    background: rgba(255, 255, 255, 0.5); // use new design token
  }
`;

const MenuItemContainer = styled.div<TMenuItem & TNavBarSkeletonProps>`
  display: flex;
  height: 48px;
  padding: 12px
    ${(props) => (props.isExpanded ? designTokens.spacing30 : '12px')};
  align-items: center;
  gap: 12px;
  border-radius: 8px; // is this necessary?
  background: ${(props) =>
    props.theme === 'light'
      ? 'var(--primary-color-primary-30, #009987)'
      : designTokens.colorAccent10};
`;

const MenuItemIcon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: ${designTokens.borderRadius4};
  background: rgba(255, 255, 255, 0.2); // use new design token
`;
const MenuItemTitle = styled.div`
  height: 18px;
  flex: 1;
  border-radius: ${designTokens.borderRadius4};
  background: rgba(255, 255, 255, 0.2);
`;

const MenuItemGroup = styled.div`
  width: 100%;
`;

type TMenuItem = {
  theme: 'dark' | 'light';
};

const MenuItem = (props: TMenuItem & TNavBarSkeletonProps) => {
  return (
    <MenuItemContainer theme={props.theme} isExpanded={props.isExpanded}>
      <MenuItemIcon />
      {props.isExpanded && <MenuItemTitle />}
    </MenuItemContainer>
  );
};
MenuItem.defaultProps = {
  theme: 'light',
};

type TNavBarSkeletonProps = {
  isExpanded: boolean;
};
const NavBarSkeleton = (props: TNavBarSkeletonProps) => {
  return (
    <NavBarLayout isExpanded={props.isExpanded}>
      <NavBarHeader>
        <MenuItemGroup>
          <MenuItem theme="dark" isExpanded={props.isExpanded} />
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
      <NavBarFooter />
    </NavBarLayout>
  );
};
NavBarSkeleton.displayName = 'NavBarSkeleton';

export default NavBarSkeleton;
