import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { designTokens as appKitDesignTokens } from '@commercetools-frontend/application-components';
import { designTokens as uiKitDesignTokens } from '@commercetools-uikit/design-system';
import { NAVBAR } from '../../constants';
import type { MenuGroupProps } from './menu-items';
import { Icon, IconWrapper, ItemIconText, Title } from './shared.styles';

const getSubmenuPositionBasedOnMenuItemPosition = (
  isSubmenuAboveMenuItem?: boolean,
  submenuVerticalPosition?: number
) => css`
  ${isSubmenuAboveMenuItem ? 'bottom' : 'top'}: ${submenuVerticalPosition}px
`;

const getContainerPositionBasedOnMenuItemPosition = (
  isSubmenuAboveMenuItem?: boolean,
  isSublistActiveWhileIsMenuExpanded?: boolean,
  isSublistActiveWhileIsMenuCollapsed?: boolean
) => [
  isSublistActiveWhileIsMenuCollapsed &&
    css`
      ${isSubmenuAboveMenuItem ? 'bottom' : 'top'}: -${NAVBAR.itemSize};
    `,
  isSublistActiveWhileIsMenuExpanded &&
    isSubmenuAboveMenuItem &&
    css`
      bottom: 0;
    `,
  isSublistActiveWhileIsMenuExpanded &&
    !isSubmenuAboveMenuItem &&
    css`
      top: 0;
    `,
];

const Faded = styled.div`
  position: absolute;
  top: -32px;
  height: 32px;
  width: 100%;
  background: linear-gradient(180deg, rgba(0, 153, 135, 0) 0%, #00b39e 100%);
  z-index: 1;
  visibility: ${appKitDesignTokens.visibilityForNavbarFaded};
`;

const Expander = styled.li<{ isVisible: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${appKitDesignTokens.backgroundColorForNavbarExpander};
  padding: ${uiKitDesignTokens.spacing30} ${uiKitDesignTokens.spacing25};
  ${(props) =>
    !props.isVisible &&
    css`
      display: none;
    `}

  /* Divider */
  ::before {
    content: '';
    position: absolute;
    top: ${NAVBAR.itemHeight};
    height: 1px;
    background: rgba(255, 255, 255, 0.5);
    width: calc(100% - 2 * ${uiKitDesignTokens.spacing30});
  }

  // TODO: remove completely as part of the recolouring rollout cleanup process
  :hover,
  :focus {
    background-color: ${appKitDesignTokens.backgroundColorForNavbarExpanderWhenHovered};
  }
`;

const ExpanderIcon = styled.div`
  height: ${NAVBAR.expanderSize};
  width: ${NAVBAR.expanderSize};
  border-radius: ${uiKitDesignTokens.borderRadius4};
  padding: ${uiKitDesignTokens.spacing20};
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

const LeftNavigation = styled.nav`
  display: grid;
  width: ${NAVBAR.widthLeftNavigation};
  background: ${appKitDesignTokens.backgroundColorForNavbar};
  height: 100%;
  grid-template-rows: 56px 1fr;
  transition: ${NAVBAR.leftNavigationTransition};
`;

const TextLinkSublistWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 0;
`;

const NavlinkClickableContent = styled.div`
  height: 100%;
  width: 100%;
`;

const listStyles = css`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  min-height: 0;
  flex: 1 1 0;
`;

const sublistStyles = css`
  padding: ${uiKitDesignTokens.spacing30};
  font-weight: ${uiKitDesignTokens.fontWeight400};
  font-size: ${uiKitDesignTokens.fontSize20};
  background-color: ${uiKitDesignTokens.colorAccent10};
  left: ${NAVBAR.sublistIndentationWhenCollapsed};
  z-index: -1;
  list-style: none;
  position: fixed;
  display: none;
`;

const MenuList = styled.ul<
  MenuGroupProps & {
    isSublistActiveWhileIsMenuExpanded: boolean;
    isSublistActiveWhileIsMenuCollapsed: boolean;
    isSublistCollapsedAndActive: boolean;
    isSublistCollapsedAndActiveAndAbove: boolean;
  }
>`
  ${(props) => [
    props.level === 1 && listStyles,
    getSubmenuPositionBasedOnMenuItemPosition(
      props.isSubmenuAboveMenuItem,
      props.submenuVerticalPosition
    ),
    props.level === 2 && sublistStyles,
    // prevent glitchy behavior during the initial render when the submenu's vertical position is evaluated as 0
    props.submenuVerticalPosition === 0 &&
      css`
        visibility: hidden;
      `,
    (props.isSublistActiveWhileIsMenuExpanded ||
      props.isSublistCollapsedAndActive ||
      props.isSublistCollapsedAndActiveAndAbove) &&
      css`
        opacity: 1;
        display: none;
        text-align: left;
        background-color: ${uiKitDesignTokens.colorAccent20};

        /* This pseudo-element is required to enable smooth coursor movement from the main menu item to submenu items with the gap in between */
        ::before {
          content: '';
          position: absolute;
          display: block;
          width: calc(${NAVBAR.sublistWidth} + ${uiKitDesignTokens.spacing20});
          height: ${NAVBAR.itemSize};
          left: calc(-1 * ${uiKitDesignTokens.spacing20});

          ${getContainerPositionBasedOnMenuItemPosition(
            props.isSubmenuAboveMenuItem,
            props.isSublistActiveWhileIsMenuExpanded,
            props.isSublistActiveWhileIsMenuCollapsed
          )}
        }
      `,
  ]}

  & .highlighted,
  & .highlighted ${Title} {
    color: ${uiKitDesignTokens.colorSurface} !important;
    font-weight: ${uiKitDesignTokens.fontWeight600};
  }
`;

const SublistItem = styled.li<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  align-self: stretch;

  ${(props) => [
    props.isActive &&
      css`
        border-radius: ${uiKitDesignTokens.borderRadius4};
        background: ${appKitDesignTokens.backgroundColorForNavbarSubmenuItemWhenActive};
      `,
    !props.isActive &&
      css`
        :hover,
        :focus-within {
          color: ${uiKitDesignTokens.colorSurface};
          font-weight: ${uiKitDesignTokens.fontWeight600};
          border-radius: ${uiKitDesignTokens.borderRadius4};
          background: ${uiKitDesignTokens.colorPrimary95};

          [data-link-level='text-link-sublist'] {
            /* additional left padding on hover and focus */
            padding: ${uiKitDesignTokens.spacing25}
              ${uiKitDesignTokens.spacing25} ${uiKitDesignTokens.spacing25}
              calc(
                ${uiKitDesignTokens.spacing30} + ${uiKitDesignTokens.spacing20}
              );
          }
        }
      `,
  ]}
`;

const MenuListItem = styled.li<{
  isActive: boolean;
  isRouteActive: boolean;
  isCollapsed: boolean;
  positionX: number;
  positionY: number;
}>`
  height: ${NAVBAR.itemSize};
  width: ${NAVBAR.itemSize};
  margin: 0;
  background: ${appKitDesignTokens.backgroundColorForNavbar};
  list-style: none;
  cursor: pointer;

  ${IconWrapper} {
    width: auto;
    display: flex;
    justify-content: center;
  }

  ${(props) => [
    props.isRouteActive &&
      css`
        background: ${appKitDesignTokens.backgroundColorForNavbarMenuItemWhenActive};
        border-radius: ${uiKitDesignTokens.borderRadius8};
      `,
    !props.isRouteActive &&
      css`
        :hover,
        :focus-within {
          background-color: ${appKitDesignTokens.backgroundColorForNavbarMenuItemWhenHovered};
          border-radius: ${uiKitDesignTokens.borderRadius8};
        }
      `,
    props.isActive &&
      css`
        ${ItemIconText} {
          justify-content: flex-start;
        }
      `,
    !props.isActive &&
      css`
        :hover ${Icon} > svg *:not([fill='none']),
        :focus-within ${Icon} > svg *:not([fill='none']) {
          fill: ${uiKitDesignTokens.colorSurface};
        }

        :hover .${Title}, :focus-within ${Title} {
          color: ${uiKitDesignTokens.colorSurface};
        }
      `,
    props.isCollapsed &&
      css`
        text-align: center;
      `,
  ]}

  :hover ${Title},
  :focus-within ${Title} {
    margin-left: calc(${uiKitDesignTokens.spacing25} + 2px);
  }

  :hover ${Icon}, :focus-within ${Icon} {
    /* 1.16 is roughly the ratio of NAVBAR.iconSizeHover to NAVBAR.iconSize */
    transform: scale(1.2);
  }

  :hover
    ${MenuList}.sublist-collapsed__active,
    :hover
    ${MenuList}.sublist-collapsed__active__above,
    :hover
    ${MenuList}.sublist-expanded__active,
    :focus-within
    ${MenuList}.sublist-collapsed__active,
    :focus-within
    ${MenuList}.sublist-collapsed__active__above,
    :focus-within
    ${MenuList}.sublist-expanded__active {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: ${uiKitDesignTokens.colorSurface};
    min-height: ${NAVBAR.sublistItemMinHeight};
    width: ${NAVBAR.sublistWidth};
    border-radius: ${uiKitDesignTokens.borderRadius8};
    /* z-index value must be higher than AppBar's z-index */
    z-index: 20001;
    box-shadow: -2px 4px 25px 0 rgba(89, 89, 89, 0.5);
    --safe-start: ${(props) => props.positionX}% ${(props) => props.positionY}%;
  }

  :hover
    ${MenuList}.sublist-collapsed__active.sublist-collapsed__empty,
    :hover
    ${MenuList}.sublist-collapsed__active__above.sublist-collapsed__empty,
    :focus-within
    ${MenuList}.sublist-collapsed__active.sublist-collapsed__empty,
    :focus-within
    ${MenuList}.sublist-collapsed__active__above.sublist-collapsed__empty {
    visibility: hidden;
  }

  :hover
    ${MenuList}.sublist-expanded__active,
    :focus-within
    ${MenuList}.sublist-expanded__active {
    left: ${NAVBAR.sublistIndentationWhenExpanded};
  }
`;

const SafeAreaElement = styled.span`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 100%;
  width: calc(100% - 16px);
  clip-path: polygon(var(--safe-start), 100% 100%, 100% 0);
`;

export {
  Expander,
  ExpanderIcon,
  Faded,
  LeftNavigation,
  MenuList,
  MenuListItem,
  SublistItem,
  TextLinkSublistWrapper,
  NavlinkClickableContent,
  SafeAreaElement,
};
