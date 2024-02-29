import type { ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { designTokens as appKitDesignTokens } from '@commercetools-frontend/application-components';
import { designTokens as uiKitDesignTokens } from '@commercetools-uikit/design-system';
import { DIMENSIONS } from '../../constants';

type TNavBarSkeletonProps = {
  isExpanded: boolean;
};

type TMenuItemProps = {
  contentWidth: 'wide' | 'narrow';
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
  padding: ${uiKitDesignTokens.spacing30};
  height: ${DIMENSIONS.header};
  background: ${appKitDesignTokens.backgroundColorForNavbarHeader};
`;

const NavBarBody = styled.div`
  display: flex;
  flex: 1;
  padding: ${uiKitDesignTokens.spacing30};
  flex-direction: column;
  align-items: flex-start;
  gap: ${uiKitDesignTokens.spacing40};
  flex-shrink: 0;
  background: ${appKitDesignTokens.backgroundColorForNavbarSkeleton};
  position: relative;

  // TODO: remove completely as part of the recolouring rollout cleanup process
  // bottom gradient
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    height: 36px;
    width: calc(100% - 2 * ${uiKitDesignTokens.spacing30});
    background: linear-gradient(180deg, rgba(0, 153, 135, 0) 0%, #009987 100%);
    visibility: ${appKitDesignTokens.visibilityForNavbarFaded};
  }
`;

const NavBarFooter = styled.div<TNavBarSkeletonProps>`
  position: relative;
  display: flex;
  width: 100%;
  flex-direction: column;
  background: ${appKitDesignTokens.backgroundColorForNavbarSkeletonFooter};
  padding: ${uiKitDesignTokens.spacing30}
    ${(props) => (props.isExpanded ? '58px' : '0px')};
  justify-content: center;
  align-items: center;

  // divider
  &::before {
    content: '';
    position: absolute;
    top: 0;
    height: 1px;
    width: calc(100% - 2 * ${uiKitDesignTokens.spacing30});
    background: rgba(255, 255, 255, 0.5);
  }
`;

const ExpandIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${uiKitDesignTokens.borderRadius4};
  background: rgba(255, 255, 255, 0.2);
`;

const MenuItemContainer = styled.div<TMenuItemProps & TNavBarSkeletonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: ${(props) =>
    props.contentWidth === 'wide' || !props.isExpanded ? '12px' : '12px 28px'};
  height: 48px;
`;

const MenuItemIcon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: ${uiKitDesignTokens.borderRadius4};
  background: rgba(255, 255, 255, 0.2);
`;

const MenuItemTitle = styled.div`
  border-radius: ${uiKitDesignTokens.borderRadius4};
  background: rgba(255, 255, 255, 0.2);
  flex: 1;
  height: 18px;
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
