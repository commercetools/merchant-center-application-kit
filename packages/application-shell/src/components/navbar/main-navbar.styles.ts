import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { designTokens } from '@commercetools-uikit/design-system';
import { DIMENSIONS } from '../../constants';
import { NAVBAR } from './constants';

export const LeftNavigation = styled.nav`
  display: grid;
  width: ${NAVBAR.widthLeftNavigation};
  background: ${designTokens.colorPrimary};
  height: 100%;
  grid-template-rows: 56px 1fr;
  transition: ${NAVBAR.leftNavigationTransition};
`;

export const leftNavigationOpenStyles = css`
  .body__menu-open [data-nav-migration='left-navigation'] {
    transition: ${NAVBAR.leftNavigationTransition};
    width: ${NAVBAR.widthLeftNavigationWhenExpanded};
  }

  .body__menu-open [data-nav-migration='scrollable-menu'] {
    width: ${NAVBAR.widthLeftNavigationWhenExpanded};
  }

  .body__menu-open [data-nav-migration='fixed-menu'] {
    width: ${NAVBAR.widthLeftNavigationWhenExpanded};
  }
`;

const visible = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const iconContainerStyles = css`
  width: auto;
  display: flex;
  justify-content: center;
`;

export const iconStyles = css`
  width: ${NAVBAR.iconSize};
  height: ${NAVBAR.iconSize};
`;

export const itemIconTextStyles = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const NavigationHeader = styled.div`
  background-color: ${designTokens.colorAccent10};
  color: ${designTokens.colorSurface};
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: ${designTokens.spacing30};
`;

export const HeaderTitle = styled.div`
  font-weight: 600;
  margin-left: ${designTokens.spacing20};
  transition: ${NAVBAR.leftNavigationTransition};
  animation: ${visible} 150ms cubic-bezier(1, 0, 0.58, 1);
`;

export const Expander = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    180deg,
    ${designTokens.colorPrimary} 0%,
    ${designTokens.colorPrimary25} 100%
  );
  padding: ${designTokens.spacing30} ${designTokens.spacing25};

  /* Divider */
  ::before {
    content: '';
    position: absolute;
    top: ${NAVBAR.itemHeight};
    height: 1px;
    background: rgba(255, 255, 255, 0.5);
    width: calc(100% - 2 * ${designTokens.spacing30});
  }

  :hover,
  :focus {
    background-color: var(--color-primary-40);
  }
`;

export const ExpanderIcon = styled.div`
  height: ${NAVBAR.expanderSize};
  width: ${NAVBAR.expanderSize};
  border-radius: ${designTokens.borderRadius4};
  padding: ${designTokens.spacing20};
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;

  :hover,
  :focus {
    background: rgba(255, 255, 255, 0.3);
    cursor: pointer;
  }
`;

export const listStyles = css`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  min-height: 0;
  flex: 1 1 0;
`;

export const TooltipContainer = styled.div<{
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
    props.alignsAgainstBottom
      ? 'bottom'
      : 'top'}: -${DIMENSIONS.navMenuItemHeight};
`;

export const Tooltip = styled.div`
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

export const SublistItem = styled.li<{ isActive: boolean }>`
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

export const TextLinkSublistWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 0;
`;

export const NavlinkClickableContent = styled.div`
  height: 100%;
  width: 100%;
`;

export const sublistStyles = css`
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

export const ScrollableMenu = styled.div`
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

export const FixedMenu = styled.div`
  position: relative;
  width: ${NAVBAR.widthLeftNavigation};
`;

export const textLinkStyles = css`
  color: var(--color-for-navbar-link);
  text-decoration: none;
  display: flex;
  padding: var(--spacing-25);
  align-items: center;
  justify-content: center;
`;

export const SupportMenu = styled.div`
  padding: var(--spacing-10) var(--spacing-30) var(--spacing-20)
    var(--spacing-30);
  height: calc(var(--item-size) + var(--spacing-20));
`;

export const Title = styled.div`
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

export const Text = styled.div`
  font-weight: var(--font-weight-for-navbar-link);
  font-size: var(--font-size-for-navbar-link);
  line-height: var(--line-height-for-navbar-link);
  width: 100%;
  height: 100%;
`;

export const getMenuItemLinkStyles = (isSubmenuLink: boolean) => [
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
