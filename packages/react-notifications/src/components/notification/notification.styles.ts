import { css, keyframes } from '@emotion/core';
import { customProperties } from '@commercetools-uikit/design-system';
import {
  NOTIFICATION_DOMAINS,
  TAppNotificationKind,
  TAppNotificationDomain,
  NOTIFICATION_KINDS_SIDE,
} from '@commercetools-frontend/constants';

type StyleProps = {
  type: TAppNotificationKind;
  domain: TAppNotificationDomain;
  fixed: boolean;
};

const getColorByType = (value: TAppNotificationKind) => {
  switch (value) {
    case NOTIFICATION_KINDS_SIDE.success:
      return customProperties.colorPrimary;
    case NOTIFICATION_KINDS_SIDE.info:
      return customProperties.colorInfo;
    case NOTIFICATION_KINDS_SIDE.error:
      return customProperties.colorError;
    case NOTIFICATION_KINDS_SIDE.warning:
      return customProperties.colorWarning;
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

const getStylesForIcon = (props: StyleProps) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 48px;
  height: 100%;
  color: ${customProperties.colorSurface};
  border-radius: 3px 0 0 3px;
  background: ${getColorByType(props.type)};
`;

const getStylesForContent = (props: StyleProps) => {
  const fontColor =
    props.domain === NOTIFICATION_DOMAINS.SIDE
      ? customProperties.colorSolid
      : customProperties.colorSurface;
  return css`
    flex-basis: 100%;
    flex-grow: 1;
    padding: 0 ${customProperties.spacingS};
    margin: 0;
    font-size: ${props.domain === NOTIFICATION_DOMAINS.SIDE
      ? '0.929rem'
      : 'inherit'};

    color: ${fontColor};

    p,
    a {
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
    padding: ${customProperties.spacingM};
    color: ${customProperties.colorSurface};
  `;
  const pageStyles = css`
    ${baseStyles};
    animation: ${showNotificationAnimation} 0.3s forwards;
    text-align: center;
    background-color: ${props.fixed
      ? 'transparent'
      : getColorByType(props.type)};

    > * + * {
      margin-left: ${customProperties.spacingS};
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
        padding: ${customProperties.spacingM} ${customProperties.spacingM}
          ${customProperties.spacingM} 50px !important;
        text-align: left;
        background: ${customProperties.colorSurface};
        border: 1px solid ${getColorByType(props.type)};
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.24);
        border-radius: ${customProperties.borderRadius6};
        word-break: break-word;
        hyphens: auto; /* still not supported on Chrome */
      `;

      if (props.fixed) return sideStyles;
      return css`
        ${sideStyles};
        animation: ${showNotificationSideAnimation} 0.3s forwards;
        position: relative;
        z-index: 10000;
        margin-top: ${customProperties.spacingL} !important;
        right: ${customProperties.spacingXl};
        float: right;
        clear: both;
        max-width: 50%;
      `;
    }
    default:
      return css``;
  }
};

export { getStylesForIcon, getStylesForContent, getStylesForNotification };
