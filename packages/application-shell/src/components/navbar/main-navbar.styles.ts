import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { designTokens } from '@commercetools-uikit/design-system';
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
  color: var(--color-for-navbar-link);
  width: ${NAVBAR.itemSize};
  position: relative;
  display: block;
`;

const ScrollableMenu = styled.div`
  flex: 1 1 0;
  overflow-x: hidden;
  overflow-y: hidden;
  padding: var(--spacing-30) var(--spacing-30) ${NAVBAR.itemSize};
  width: ${NAVBAR.widthLeftNavigation};
  box-sizing: border-box;
  /* For Firefox */
  scrollbar-width: thin;
  scrollbar-color: var(--color-primary-40) transparent;

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
    background-color: var(--color-primary-40);
    border-radius: var(--border-radius-8);
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
      margin-left: var(--spacing-25);
      color: var(--color-surface);
      transition: ${NAVBAR.leftNavigationTransition};
      animation: ${visible} 150ms cubic-bezier(1, 0, 0.58, 1);
    }
  }

  .body__menu-open ${ItemContent} {
    width: 100%;
  }
`;

const NavigationHeader = styled.div`
  background-color: ${designTokens.colorAccent10};
  color: ${designTokens.colorSurface};
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: ${designTokens.spacing30};
`;

const HeaderTitle = styled.div`
  font-weight: 600;
  margin-left: ${designTokens.spacing20};
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
  padding: var(--spacing-10) calc(var(--spacing-20) + var(--spacing-10));
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  border-radius: var(--border-radius-4);
  background: var(--color-accent-10);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.25);
  font-size: var(--font-size-for-navbar-link);
  line-height: var(--line-height-for-navbar-link);
  font-weight: var(--font-weight-for-navbar-link);
  color: var(--color-surface);
  max-height: ${NAVBAR.itemSize};
  visibility: inherit;
`;

const TextLink = styled.a`
  color: var(--color-for-navbar-link);
  text-decoration: none;
  display: flex;
  padding: var(--spacing-25);
  align-items: center;
  justify-content: center;
`;

const SupportMenu = styled.div`
  padding: var(--spacing-10) var(--spacing-30) var(--spacing-20)
    var(--spacing-30);
  height: calc(var(--item-size) + var(--spacing-20));
`;

const Text = styled.div`
  font-weight: var(--font-weight-for-navbar-link);
  font-size: var(--font-size-for-navbar-link);
  line-height: var(--line-height-for-navbar-link);
  width: 100%;
  height: 100%;
`;

const getMenuItemLinkStyles = (isSubmenuLink: boolean) => [
  isSubmenuLink &&
    css`
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      color: var(--color-solid);
      font-weight: var(--font-weight-for-navbar-link-when-hovered);
      text-decoration: none;
      flex: 1;
      padding: var(--spacing-25) var(--spacing-25) var(--spacing-25)
        var(--spacing-30);
      transition: padding 150ms ease-out;
    `,
  !isSubmenuLink &&
    css`
      color: var(--color-for-navbar-link);
      text-decoration: none;
      display: flex;
      padding: var(--spacing-25);
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
