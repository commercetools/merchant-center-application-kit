import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { designTokens } from '@commercetools-uikit/design-system';
import { NAVBAR } from '../../constants';

const visible = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const leftNavigationOpenStyles = css`
  .body__menu-open .left-navigation {
    transition: ${NAVBAR.leftNavigationTransition};
    width: ${NAVBAR.widthLeftNavigationWhenExpanded};
  }

  .body__menu-open .scrollable-menu {
    width: ${NAVBAR.widthLeftNavigationWhenExpanded};
  }

  .body__menu-open .fixed-menu {
    width: ${NAVBAR.widthLeftNavigationWhenExpanded};
  }

  .body__menu-open [data-link-level='text-link'] {
    justify-content: start;
  }

  .body__menu-open .list-item {
    height: auto;
    min-height: ${NAVBAR.itemSize};
    width: 100%;
  }

  .body__menu-open .list-item .title {
    opacity: 1;
    margin-left: var(--spacing-25);
    color: var(--color-surface);
    transition: ${NAVBAR.leftNavigationTransition};
    animation: ${visible} 150ms cubic-bezier(1, 0, 0.58, 1);
  }

  .body__menu-open .item__active {
    max-height: 500px;
    transition: max-height 0.25s ease-in;
  }

  .body__menu-open .item__active .item-icon-text {
    position: relative;
    width: auto;
  }

  .body__menu-open .item__active .item-icon-text {
    margin-left: 0;
  }

  .body__menu-open .item-link {
    width: 100%;
  }

  // List item
  .fixed-menu .list-item .item-icon-text {
    justify-content: center;
    display: flex;
    width: 100%;
  }

  .list-item {
    min-height: ${NAVBAR.itemSize};
    background: var(--color-primary);
    margin: 0;
    list-style: none;
    cursor: pointer;
  }

  .list-item .icon-wrapper {
    width: auto;
    display: flex;
    justify-content: center;
    align-self: flex-start;
  }

  .item_menu-collapsed {
    text-align: center;
  }

  .item__active,
  .item_menu__active,
  .item_menu__active:focus-within {
    background: var(--color-accent-30);
    border-radius: var(--border-radius-8);
  }

  .item__active .item-icon-text {
    justify-content: flex-start;
  }

  .list-item:hover .title,
  .list-item:focus-within .title {
    margin-left: calc(var(--spacing-25) + 2px);
  }

  .list-item:hover .icon,
  .list-item:focus-within .icon {
    /* 1.16 is roughly the ratio of NAVBAR.iconSizeHover to NAVBAR.iconSize */
    transform: scale(1.2);
  }

  .list-item:not(.item_menu__active):hover,
  .list-item:not(.item_menu__active):focus-within {
    background-color: var(--color-primary-40);
    border-radius: var(--border-radius-8);
  }

  .list-item:not(.item__active):hover .icon > svg *:not([fill='none']),
  .list-item:not(.item__active):focus-within .icon > svg *:not([fill='none']) {
    fill: var(--color-for-navbar-icon-when-active);
  }

  .list-item:not(.item__active):hover .title,
  .list-item:not(.item__active):focus-within .title {
    color: var(--color-for-navbar-link-when-hovered);
  }

  .list-item:hover .sublist-collapsed__active,
  .list-item:hover .sublist-collapsed__active__above,
  .list-item:hover .sublist-expanded__active,
  .list-item:focus-within .sublist-collapsed__active,
  .list-item:focus-within .sublist-collapsed__active__above,
  .list-item:focus-within .sublist-expanded__active {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: var(--color-surface);
    /* TODO: add design tokens instead hard-coded values */
    min-height: 50px;
    width: ${NAVBAR.sublistWidth};
    border-radius: var(--border-radius-8);
    /* z-index value must be higher than AppBar's z-index */
    z-index: 20001;
    box-shadow: -2px 4px 25px 0 rgba(89, 89, 89, 0.5);
  }

  .list-item:hover .sublist-collapsed__active.sublist-collapsed__empty,
  .list-item:hover .sublist-collapsed__active__above.sublist-collapsed__empty,
  .list-item:focus-within .sublist-collapsed__active.sublist-collapsed__empty,
  .list-item:focus-within
    .sublist-collapsed__active__above.sublist-collapsed__empty {
    visibility: hidden;
  }

  .list-item:hover .sublist-expanded__active,
  .list-item:focus-within .sublist-expanded__active {
    left: ${NAVBAR.sublistIndentationWhenExpanded};
  }

  // Sublist item

  .item-link {
    color: var(--color-for-navbar-link);
    width: ${NAVBAR.itemSize};
    position: relative;
    display: block;
  }

  /* This pseudo-element is required to enable smooth coursor movement from the main menu item to submenu items with the gap in between */
  .sublist-expanded__active::before,
  .sublist-collapsed__active::before,
  .sublist-collapsed__active__above::before {
    content: '';
    position: absolute;
    display: block;
    width: calc(${NAVBAR.sublistWidth} + var(--spacing-20));
    height: ${NAVBAR.itemSize};
    left: calc(-1 * var(--spacing-20));
  }

  .sublist__inactive {
    /* empty block */
  }

  /* Item active */

  .sublist-expanded__active,
  .sublist-collapsed__active,
  .sublist-collapsed__active__above {
    opacity: 1;
    display: none;
    text-align: left;
    background-color: var(--background-color-for-navbar-when-active);
  }

  .highlighted,
  .highlighted .title {
    color: var(--color-for-navbar-link-when-active) !important;
    font-weight: var(--font-weight-for-navbar-link-when-active);
  }
`;

const IconWrapper = styled.div`
  width: auto;
  display: flex;
  justify-content: center;
`;

const Icon = styled.div`
  width: ${NAVBAR.iconSize};
  height: ${NAVBAR.iconSize};
  transition: ${NAVBAR.leftNavigationTransition};

  > svg *:not([fill='none']) {
    fill: var(--color-surface);
  }
`;

const ItemIconText = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
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

const listStyles = css`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  min-height: 0;
  flex: 1 1 0;
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

const SublistItem = styled.li<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  align-self: stretch;

  ${(props) => [
    props.isActive &&
      css`
        border-radius: var(--border-radius-4);
        background: var(--color-accent-30);
      `,
    !props.isActive &&
      css`
        :hover,
        :focus-within {
          color: var(--color-for-navbar-link-when-hovered);
          font-weight: var(--font-weight-for-navbar-link-when-hovered);
          border-radius: var(--border-radius-4);
          background: var(--color-primary-95);
        }

        :not(.sublist-item__active):hover [data-link-level='text-link-sublist'],
        :not(.sublist-item__active):focus-within
          [data-link-level='text-link-sublist'] {
          /* additional left padding on hover and focus */
          padding: var(--spacing-25) var(--spacing-25) var(--spacing-25)
            calc(var(--spacing-30) + var(--spacing-20));
        }
      `,
  ]}
`;

const sublistStyles = css`
  padding: var(--spacing-30);
  font-weight: var(--font-weight-for-navbar-link);
  font-size: var(--font-size-for-navbar-link);
  background-color: var(--background-color-for-navbar);
  left: ${NAVBAR.sublistIndentationWhenCollapsed};
  z-index: -1;
  list-style: none;
  position: fixed;
  display: none;
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

const FixedMenu = styled.div`
  position: relative;
  width: ${NAVBAR.widthLeftNavigation};
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

const Title = styled.div`
  flex: 1;
  font-weight: 600;
  font-size: var(--font-size-for-navbar-link);
  line-height: var(--line-height-for-navbar-link);
  color: var(--color-for-navbar-link);
  opacity: 0;
  transition: ${NAVBAR.leftNavigationTransition};
  text-align: left;
  text-decoration: none;
  z-index: 1;
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
  listStyles,
  sublistStyles,
  // styled components
  FixedMenu,
  HeaderTitle,
  NavigationHeader,
  ScrollableMenu,
  SublistItem,
  SupportMenu,
  Text,
  TextLink,
  Title,
  Tooltip,
  TooltipContainer,
  // common
  Icon,
  IconWrapper,
  ItemIconText,
};
