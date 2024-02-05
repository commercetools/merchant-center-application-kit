import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { designTokens } from '@commercetools-uikit/design-system';
import { NAVBAR } from '../../constants';
import { IconWrapper } from './shared.styles';

const Faded = styled.div`
  position: absolute;
  top: -32px;
  height: 32px;
  width: 100%;
  background: linear-gradient(180deg, rgba(0, 153, 135, 0) 0%, #00b39e 100%);
  z-index: 1;
`;

const Expander = styled.li<{ isVisible: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    180deg,
    ${designTokens.colorPrimary} 0%,
    ${designTokens.colorPrimary25} 100%
  );
  padding: ${designTokens.spacing30} ${designTokens.spacing25};
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
    width: calc(100% - 2 * ${designTokens.spacing30});
  }

  :hover,
  :focus {
    background-color: var(--color-primary-40);
  }
`;

const ExpanderIcon = styled.div`
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

const LeftNavigation = styled.nav`
  display: grid;
  width: ${NAVBAR.widthLeftNavigation};
  background: ${designTokens.colorPrimary};
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

const MenuListItem = styled.li<{
  isActive: boolean;
  isRouteActive: boolean;
  isCollapsed: boolean;
}>`
  min-height: ${NAVBAR.itemSize};
  margin: 0;
  background: var(--color-primary);
  list-style: none;
  cursor: pointer;

  ${IconWrapper} {
    width: auto;
    display: flex;
    justify-content: center;
    align-self: flex-start;
  }

  ${(props) => [
    props.isRouteActive &&
      css`
        background: var(--color-accent-30);
        border-radius: var(--border-radius-8);
      `,
    !props.isRouteActive &&
      css`
        :hover,
        :focus-within {
          background-color: var(--color-primary-40);
          border-radius: var(--border-radius-8);
        }
      `,
    !props.isRouteActive &&
      !props.isActive &&
      css`
        :hover,
        :focus-within {
          background-color: var(--color-primary-40);
          border-radius: var(--border-radius-8);
        }
      `,
    props.isActive &&
      css`
        .item-icon-text {
          justify-content: flex-start;
        }
      `,
    !props.isActive &&
      css`
        :hover .icon > svg *:not([fill='none']),
        :focus-within .icon > svg *:not([fill='none']) {
          fill: var(--color-for-navbar-icon-when-active);
        }

        :hover .title,
        :focus-within .title {
          color: var(--color-for-navbar-link-when-hovered);
        }
      `,
    props.isCollapsed &&
      css`
        text-align: center;
      `,
  ]}

  :hover .title,
  :focus-within .title {
    margin-left: calc(var(--spacing-25) + 2px);
  }

  :hover .icon,
  :focus-within .icon {
    /* 1.16 is roughly the ratio of NAVBAR.iconSizeHover to NAVBAR.iconSize */
    transform: scale(1.2);
  }

  :hover .sublist-collapsed__active,
  :hover .sublist-collapsed__active__above,
  :hover .sublist-expanded__active,
  :focus-within .sublist-collapsed__active,
  :focus-within .sublist-collapsed__active__above,
  :focus-within .sublist-expanded__active {
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

  :hover .sublist-collapsed__active.sublist-collapsed__empty,
  :hover .sublist-collapsed__active__above.sublist-collapsed__empty,
  :focus-within .sublist-collapsed__active.sublist-collapsed__empty,
  :focus-within .sublist-collapsed__active__above.sublist-collapsed__empty {
    visibility: hidden;
  }

  :hover .sublist-expanded__active,
  :focus-within .sublist-expanded__active {
    left: ${NAVBAR.sublistIndentationWhenExpanded};
  }
`;

export {
  Expander,
  ExpanderIcon,
  Faded,
  LeftNavigation,
  MenuListItem,
  TextLinkSublistWrapper,
  NavlinkClickableContent,
};
