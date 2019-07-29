import { css } from '@emotion/core';
import { customProperties } from '@commercetools-frontend/ui-kit';
import {
  NOTIFICATION_DOMAINS,
  TAppNotificationDomain,
} from '@commercetools-frontend/constants';

type StyleProps = {
  domain: TAppNotificationDomain;
};

const getStyles = (props: StyleProps) => {
  const baseStyles = css`
    color: ${customProperties.colorSurface};
    position: relative;
    width: 100%;
    z-index: 10000;
  `;

  switch (props.domain) {
    case NOTIFICATION_DOMAINS.GLOBAL:
      return css`
        ${baseStyles};
        text-align: center;
        width: 100% !important;

        > {
          display: inline-flex;
          padding-right: 48px;
          height: 100%;
          width: 100%;
        }
      `;
    case NOTIFICATION_DOMAINS.PAGE:
      return css`
        ${baseStyles};
        padding: ${customProperties.spacingM} ${customProperties.spacingL};
      `;
    case NOTIFICATION_DOMAINS.SIDE:
      return css`
        ${baseStyles};
        position: absolute;
        text-align: left;
        height: 0;
        overflow: visible;
      `;
    default:
      return css``;
  }
};

export { getStyles };
