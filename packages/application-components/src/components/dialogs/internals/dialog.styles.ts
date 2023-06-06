import { css, type SerializedStyles } from '@emotion/react';
import { designTokens as uiKitDesignTokens } from '@commercetools-uikit/design-system';
import { designTokens as appKitDesignTokens } from '../../../theming';

type StyleProps = {
  size: 'm' | 'l' | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 16 | 'scale';
  zIndex?: number;
};

const getConstraintForGridStyle = (size: StyleProps['size']) => {
  switch (size) {
    case 'm':
      return appKitDesignTokens.widthForDialogAsMedium;
    case 7:
      return uiKitDesignTokens.constraint7;
    case 8:
      return uiKitDesignTokens.constraint8;
    case 9:
      return uiKitDesignTokens.constraint9;
    case 10:
      return uiKitDesignTokens.constraint10;
    case 11:
      return uiKitDesignTokens.constraint11;
    case 12:
      return uiKitDesignTokens.constraint12;
    case 13:
      return uiKitDesignTokens.constraint13;
    case 16:
      return uiKitDesignTokens.constraint16;
    case 'l':
      return appKitDesignTokens.widthForDialogAsLarge;
    case 'scale':
      return uiKitDesignTokens.constraintScale;
    default:
      return uiKitDesignTokens.constraintScale;
  }
};

export const getModalContentStyles = (props: StyleProps): SerializedStyles => {
  const sizeConstraint = getConstraintForGridStyle(props.size);
  const gridStyle =
    props.size === 'scale'
      ? css`
          grid:
            [row1-start] 'top top top' minmax(
              ${uiKitDesignTokens.spacingXl},
              1fr
            )
            [row1-end]
            [row2-start] 'left main right' minmax(0, 100%) [row2-end]
            [row3-start] 'bottom bottom bottom' minmax(
              ${uiKitDesignTokens.spacingXl},
              1fr
            )
            [row3-end] / ${uiKitDesignTokens.spacingXl} 1fr ${uiKitDesignTokens.spacingXl};
        `
      : css`
          grid:
            [row1-start] 'top top top' minmax(
              ${uiKitDesignTokens.spacingXl},
              1fr
            )
            [row1-end]
            [row2-start] 'left main right' minmax(0, 100%) [row2-end]
            [row3-start] 'bottom bottom bottom' minmax(
              ${uiKitDesignTokens.spacingXl},
              1fr
            )
            [row3-end] / minmax(${uiKitDesignTokens.spacingXl}, 1fr)
            ${sizeConstraint}
            minmax(${uiKitDesignTokens.spacingXl}, 1fr);
        `;

  // To ensure that the mouse click on the overlay surface goes "through"
  // and triggers the modal to close, we need to turn off the pointer events.
  const baseStyles = css`
    display: grid;
    height: 100%;
    width: 100%;
    outline: none;
    pointer-events: none;

    ${gridStyle};
  `;
  return baseStyles;
};

export const getOverlayStyles = (props: StyleProps): SerializedStyles => css`
  display: flex;
  position: absolute;
  z-index: ${typeof props.zIndex === 'number'
    ? // Use `!important` to overwrite the default value assigned by the Stacking Layer System.
      `${props.zIndex} !important`
    : 'auto'};
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(32, 62, 72, 0.5);
  opacity: 1;
`;
