import type {
  TAppNotificationKind,
  TAppNotificationDomain,
} from '@commercetools-frontend/constants';

import { css, keyframes } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
import {
  NOTIFICATION_DOMAINS,
  NOTIFICATION_KINDS_SIDE,
} from '@commercetools-frontend/constants';

type StyleProps = {
  type: TAppNotificationKind;
  domain: TAppNotificationDomain;
  fixed: boolean;
  isNewTheme?: boolean;
};

const getColorByType = (value: TAppNotificationKind) => {
  switch (value) {
    case NOTIFICATION_KINDS_SIDE.success:
      return designTokens.colorPrimary;
    case NOTIFICATION_KINDS_SIDE.info:
      return designTokens.colorInfo;
    case NOTIFICATION_KINDS_SIDE.error:
      return designTokens.colorError;
    case NOTIFICATION_KINDS_SIDE.warning:
      return designTokens.colorWarning;
    default:
      return 'transparent';
  }
};

const getBorderColor = (notificationKind: TAppNotificationKind) => {
  switch (notificationKind) {
    case NOTIFICATION_KINDS_SIDE.success:
      return designTokens.colorPrimary85;
    case NOTIFICATION_KINDS_SIDE.info:
      return designTokens.colorInfo85;
    case NOTIFICATION_KINDS_SIDE.error:
      return designTokens.colorError85;
    case NOTIFICATION_KINDS_SIDE.warning:
      return designTokens.colorWarning85;
    default:
      return 'transparent';
  }
};

const showNotificationAnimation = keyframes`
  0% {
    max-height: 0;
    padding-top: 0;
    padding-bottom: 0;
    overflow: hidden;
  }
  100% {
    max-height: 200px;
  }
`;
const showNotificationSideAnimation = keyframes`
  0% {
    transform: translateX(50px);
  }
  100% {
    transform: translateX(0);
  }
`;

const getStylesForNotificationIcon = (props: StyleProps) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 48px;
  height: 100%;
  color: ${designTokens.colorSurface};
  border-radius: 3px 0 0 3px;
  background: ${getColorByType(props.type)};
`;

const getStylesForCloseIcon = (isNewTheme = false) => css`
  ${isNewTheme ? '& svg { width: 12px; height: 12px; }' : ''}
`;

const getStylesForContent = (props: StyleProps) => {
  const fontColor =
    props.domain === NOTIFICATION_DOMAINS.SIDE
      ? designTokens.colorSolid
      : designTokens.colorSurface;
  return css`
    flex-basis: 100%;
    flex-grow: 1;
    padding: 0
      ${props.isNewTheme ? designTokens.spacingM : designTokens.spacingS};
    margin: 0;
    font-size: ${props.domain === NOTIFICATION_DOMAINS.SIDE
      ? props.isNewTheme
        ? '1rem'
        : '0.929rem'
      : 'inherit'};

    color: ${fontColor};
    p {
      color: ${fontColor};
    }
    ul {
      padding: 0;
      margin: 0;
      list-style: none;
    }
  `;
};

const getStylesForNotification = (props: StyleProps) => {
  const baseStyles = css`
    position: relative;
    display: flex;
    align-items: center;
    padding: ${designTokens.spacingM};
    color: ${designTokens.colorSurface};
  `;
  const pageStyles = css`
    ${baseStyles};
    animation: ${showNotificationAnimation} 0.3s forwards;
    text-align: center;
    background-color: ${props.fixed
      ? 'transparent'
      : getColorByType(props.type)};

    > * + * {
      margin-left: ${designTokens.spacingS};
    }
  `;

  switch (props.domain) {
    case NOTIFICATION_DOMAINS.GLOBAL:
      return css`
        ${pageStyles};
        background-color: ${getColorByType(props.type)};
      `;
    case NOTIFICATION_DOMAINS.PAGE:
      return pageStyles;
    case NOTIFICATION_DOMAINS.SIDE: {
      const sideStyles = css`
        ${baseStyles};
        animation: ${showNotificationAnimation} 0.3s forwards;
        padding: ${designTokens.spacingM} ${designTokens.spacingM}
          ${designTokens.spacingM} 50px !important;
        text-align: left;
        background: ${designTokens.colorSurface};
        border: 1px solid
          ${props.isNewTheme
            ? getBorderColor(props.type)
            : getColorByType(props.type)};
        box-shadow: ${props.isNewTheme
          ? '0px 2px 5px 0px rgba(0, 0, 0, 0.15)'
          : '0 1px 2px rgba(0, 0, 0, 0.24)'};
        border-radius: ${designTokens.borderRadius6};
        word-break: break-word;
        hyphens: auto; /* still not supported on Chrome */
      `;

      if (props.fixed) return sideStyles;
      return css`
        ${sideStyles};
        animation: ${showNotificationSideAnimation} 0.3s forwards;
        position: relative;
        z-index: 10000;
        margin-top: ${designTokens.spacingL} !important;
        right: ${designTokens.spacingXl};
        float: right;
        clear: both;
        max-width: 50%;
      `;
    }
    default:
      return css``;
  }
};

export {
  getStylesForNotificationIcon,
  getStylesForCloseIcon,
  getStylesForContent,
  getStylesForNotification,
};
