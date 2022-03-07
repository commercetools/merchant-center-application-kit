import {
  css,
  type SerializedStyles,
  type Interpolation,
  type Theme,
} from '@emotion/react';
import { customProperties as vars } from '@commercetools-uikit/design-system';

const getTabHeaderStateStyles = (
  isActive: boolean,
  isDisabled: boolean
): SerializedStyles[] => {
  const combinedStyles: SerializedStyles[] = [];
  if (isActive) {
    combinedStyles.push(css`
      color: ${vars.colorPrimary};

      @keyframes bottomBorder {
        from {
          background-color: none;
        }
        to {
          background-color: ${vars.colorPrimary};
        }
      }

      // bottom border
      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 4px;
        border-radius: ${vars.borderRadius2};
        animation: bottomBorder ${vars.transitionEaseinout150Ms} forwards;
      }
    `);
  }
  if (!isActive && !isDisabled) {
    combinedStyles.push(css`
      * > &:hover,
      &:focus,
      &:active {
        color: ${vars.colorPrimary};
      }
    `);
  }
  return combinedStyles;
};

export const getTabHeaderStyles = (
  isActive: boolean,
  isDisabled: boolean
): SerializedStyles[] => [
  css`
    color: ${vars.colorAccent};
    min-width: 50px;
    position: relative;
    text-align: center;
    display: inline-block;

    &:first-of-type > * {
      padding-left: 0;
    }

    > * {
      color: inherit;
      text-decoration: inherit;
    }
  `,
  ...getTabHeaderStateStyles(isActive, isDisabled),
];

export const getLinkWrapperStyles = (
  isDisabled: boolean
): Interpolation<Theme> => [
  css`
    font-size: ${vars.fontSizeDefault};
    padding-bottom: ${vars.spacingXs};
    display: block;
    padding: ${vars.spacingM} ${vars.spacingS} ${vars.spacingM} ${vars.spacingS};
  `,
  isDisabled &&
    css`
      opacity: 0.5;
      pointer-events: none;
    `,
];
