import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { designTokens } from '@commercetools-uikit/design-system';
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
  .body__menu-open .left-navigation {
    transition: ${NAVBAR.leftNavigationTransition};
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
  transition: ${NAVBAR.leftNavigationTransition};

  > svg *:not([fill='none']) {
    fill: var(--color-surface);
  }
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

  .title {
    font-weight: 600;
    margin-left: ${designTokens.spacing20};
    transition: ${NAVBAR.leftNavigationTransition};
    animation: ${visible} 150ms cubic-bezier(1, 0, 0.58, 1);
  }
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
