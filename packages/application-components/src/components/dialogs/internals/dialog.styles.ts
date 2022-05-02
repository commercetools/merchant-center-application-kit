import { css } from '@emotion/react';
import { customProperties } from '@commercetools-uikit/design-system';

type StyleProps = {
  size: 'm' | 'l' | 7 | 8 | 9 | 10 | 'scale';
  zIndex?: number;
};

const getConstraintForGridStyle = (size: StyleProps['size']) => {
  switch (size) {
    case 7:
    case 'm':
      return customProperties.constraint7;
    case 8:
      return customProperties.constraint8;
    case 9:
      return customProperties.constraint9;
    case 10:
    case 'l':
      return customProperties.constraint10;
    case 'scale':
      return customProperties.constraintScale;
    default:
      return customProperties.constraintScale;
  }
};

export const getModalContentStyles = (props: StyleProps) => {
  const sizeConstraint = getConstraintForGridStyle(props.size);
  const gridStyle =
    props.size === 'scale'
      ? css`
          grid:
            [row1-start] 'top top top' minmax(
              ${customProperties.spacingXl},
              1fr
            )
            [row1-end]
            [row2-start] 'left main right' minmax(0, 100%) [row2-end]
            [row3-start] 'bottom bottom bottom' minmax(
              ${customProperties.spacingXl},
              1fr
            )
            [row3-end] / ${customProperties.spacingXl} 1fr ${customProperties.spacingXl};
        `
      : css`
          grid:
            [row1-start] 'top top top' minmax(
              ${customProperties.spacingXl},
              1fr
            )
            [row1-end]
            [row2-start] 'left main right' minmax(0, 100%) [row2-end]
            [row3-start] 'bottom bottom bottom' minmax(
              ${customProperties.spacingXl},
              1fr
            )
            [row3-end] / minmax(${customProperties.spacingXl}, 1fr)
            ${sizeConstraint}
            minmax(${customProperties.spacingXl}, 1fr);
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

export const getOverlayStyles = (props: StyleProps) => css`
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
