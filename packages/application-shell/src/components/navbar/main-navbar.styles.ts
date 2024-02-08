import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { designTokens as appKitDesignTokens } from '@commercetools-frontend/application-components';
import { designTokens as uiKitDesignTokens } from '@commercetools-uikit/design-system';
import { NAVBAR } from '../../constants';
import { MenuListItem, LeftNavigation } from './menu-items.styles';
import { ItemIconText, Title } from './shared.styles';

const visible = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const FixedMenu = styled.div`
  position: relative;
  width: ${NAVBAR.widthLeftNavigation};

  ${MenuListItem} ${ItemIconText} {
    justify-content: center;
    display: flex;
    width: 100%;
  }
`;

const ItemContent = styled.div`
  color: ${appKitDesignTokens.colorForNavbarLink};
  width: ${NAVBAR.itemSize};
  position: relative;
  display: block;
`;

const ScrollableMenu = styled.div`
  flex: 1 1 0;
  overflow-x: hidden;
  overflow-y: hidden;
  padding: ${uiKitDesignTokens.spacing30} ${uiKitDesignTokens.spacing30}
    ${NAVBAR.itemSize};
  width: ${NAVBAR.widthLeftNavigation};
  box-sizing: border-box;
  /* For Firefox */
  scrollbar-width: thin;
  scrollbar-color: ${uiKitDesignTokens.colorPrimary40} transparent;

  :hover {
    overflow-y: scroll;
    padding-right: 8px;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${uiKitDesignTokens.colorPrimary40};
    border-radius: ${uiKitDesignTokens.borderRadius8};
  }
`;

const leftNavigationOpenStyles = css`
  .body__menu-open ${LeftNavigation} {
    transition: ${NAVBAR.leftNavigationTransition};
    width: ${NAVBAR.widthLeftNavigationWhenExpanded};
  }

  .body__menu-open ${ScrollableMenu} {
    width: ${NAVBAR.widthLeftNavigationWhenExpanded};
  }

  .body__menu-open ${FixedMenu} {
    width: ${NAVBAR.widthLeftNavigationWhenExpanded};
  }

  .body__menu-open [data-link-level='text-link'] {
    justify-content: start;
  }

  .body__menu-open ${MenuListItem} {
    height: auto;
    min-height: ${NAVBAR.itemSize};
    width: 100%;

    &.active {
      max-height: 500px;
      transition: max-height 0.25s ease-in;

      ${ItemIconText} {
        position: relative;
        width: auto;
        margin-left: 0;
      }
    }

    ${Title} {
      opacity: 1;
      margin-left: ${uiKitDesignTokens.spacing25};
      color: ${uiKitDesignTokens.colorSurface};
      transition: ${NAVBAR.leftNavigationTransition};
      animation: ${visible} 150ms cubic-bezier(1, 0, 0.58, 1);
    }
  }

  .body__menu-open ${ItemContent} {
    width: 100%;
  }
`;

const NavigationHeader = styled.div`
  background-color: ${uiKitDesignTokens.colorAccent10};
  color: ${uiKitDesignTokens.colorSurface};
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: ${uiKitDesignTokens.spacing30};
`;

const HeaderTitle = styled.div`
  font-weight: 600;
  margin-left: ${uiKitDesignTokens.spacing20};
  transition: ${NAVBAR.leftNavigationTransition};
  animation: ${visible} 150ms cubic-bezier(1, 0, 0.58, 1);
`;

const TooltipContainer = styled.div<{
  alignsAgainstBottom: boolean;
}>`
  position: absolute;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: ${NAVBAR.itemSize};
  visibility: visible;

  ${(props) =>
    props.alignsAgainstBottom ? 'bottom' : 'top'}: -${NAVBAR.itemSize};
`;

const Tooltip = styled.div`
  padding: ${uiKitDesignTokens.spacing10}
    calc(${uiKitDesignTokens.spacing20} + ${uiKitDesignTokens.spacing10});
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  border-radius: ${uiKitDesignTokens.borderRadius4};
  background: ${uiKitDesignTokens.colorAccent10};
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.25);
  font-size: ${appKitDesignTokens.fontSizeForNavbarLink};
  line-height: ${appKitDesignTokens.lineHeightForNavbarLink};
  font-weight: ${appKitDesignTokens.fontWeightForNavbarLink};
  color: ${uiKitDesignTokens.colorSurface};
  max-height: ${NAVBAR.itemSize};
  visibility: inherit;
`;

const TextLink = styled.a`
  color: ${appKitDesignTokens.colorForNavbarLink};
  text-decoration: none;
  display: flex;
  padding: ${uiKitDesignTokens.spacing25};
  align-items: center;
  justify-content: center;
`;

const SupportMenu = styled.div`
  padding: ${uiKitDesignTokens.spacing10} ${uiKitDesignTokens.spacing30}
    ${uiKitDesignTokens.spacing20} ${uiKitDesignTokens.spacing30};
  height: calc(${NAVBAR.itemSize} + ${uiKitDesignTokens.spacing20});
`;

const Text = styled.div`
  font-weight: ${appKitDesignTokens.fontWeightForNavbarLink};
  font-size: ${appKitDesignTokens.fontSizeForNavbarLink};
  line-height: ${appKitDesignTokens.lineHeightForNavbarLink};
  width: 100%;
  height: 100%;
`;

const getMenuItemLinkStyles = (isSubmenuLink: boolean) => [
  isSubmenuLink &&
    css`
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      color: ${uiKitDesignTokens.colorSolid};
      font-weight: ${appKitDesignTokens.fontWeightForNavbarLinkWhenHovered};
      text-decoration: none;
      flex: 1;
      padding: ${uiKitDesignTokens.spacing25} ${uiKitDesignTokens.spacing25}
        ${uiKitDesignTokens.spacing25} ${uiKitDesignTokens.spacing30};
      transition: padding 150ms ease-out;
    `,
  !isSubmenuLink &&
    css`
      color: ${appKitDesignTokens.colorForNavbarLink};
      text-decoration: none;
      display: flex;
      padding: ${uiKitDesignTokens.spacing25};
      align-items: center;
      justify-content: center;
    `,
];

export {
  getMenuItemLinkStyles,
  leftNavigationOpenStyles,
  // styled components
  FixedMenu,
  HeaderTitle,
  ItemContent,
  NavigationHeader,
  ScrollableMenu,
  SupportMenu,
  Text,
  TextLink,
  Title,
  Tooltip,
  TooltipContainer,
};
