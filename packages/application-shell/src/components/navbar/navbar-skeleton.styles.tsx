import type { ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { designTokens } from '@commercetools-uikit/design-system';
import { DIMENSIONS } from '../../constants';

type TNavBarSkeletonProps = {
  isExpanded: boolean;
};

type TMenuItemProps = {
  placement: 'header' | 'body';
};

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

const NavBarHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${designTokens.spacing30};
  height: ${DIMENSIONS.header};
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
  background: #009987; // TODO: use new design token color-primary-30
  position: relative;

  // bottom gradient
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

  // divider
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

const getPlacementSpecificContainerStyles = (props: TMenuItemProps) =>
  props.placement === 'header'
    ? css`
        background: ${designTokens.colorAccent10};
      `
    : css`
        padding: 12px;
        height: 48px;
        background: #009987; // TODO: use new design token color-primary-30
      `;

const MenuItemContainer = styled.div<TMenuItemProps & TNavBarSkeletonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  ${getPlacementSpecificContainerStyles}
`;

const MenuItemIcon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: ${designTokens.borderRadius4};
  background: rgba(255, 255, 255, 0.2);
`;

const getPlacementSpecificTitleStyles = (props: TMenuItemProps) =>
  props.placement === 'header'
    ? css`
        height: 19px;
        width: 132px;
      `
    : css`
        flex: 1;
        height: 18px;
      `;

const MenuItemTitle = styled.div<TMenuItemProps>`
  border-radius: ${designTokens.borderRadius4};
  background: rgba(255, 255, 255, 0.2);
  ${getPlacementSpecificTitleStyles}
`;

const MenuItemGroup = styled.div`
  width: 100%;
`;

export {
  NavBarLayout,
  NavBarHeader,
  NavBarBody,
  NavBarFooter,
  ExpandIcon,
  MenuItemContainer,
  MenuItemIcon,
  MenuItemTitle,
  MenuItemGroup,
  type TNavBarSkeletonProps,
  type TMenuItemProps,
};
