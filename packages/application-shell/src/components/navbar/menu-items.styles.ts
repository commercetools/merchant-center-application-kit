import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { designTokens } from '@commercetools-uikit/design-system';
import { NAVBAR } from '../../constants';

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

export {
  getSubmenuPositionBasedOnMenuItemPosition,
  getContainerPositionBasedOnMenuItemPosition,
  // styled components
  Expander,
  ExpanderIcon,
  Faded,
  LeftNavigation,
  TextLinkSublistWrapper,
  NavlinkClickableContent,
};
