import { css } from '@emotion/core';
import { customProperties } from '@commercetools-frontend/ui-kit';

export const getModalContentStyles = props => {
  // To ensure that the mouse click on the overlay surface goes "through"
  // and triggers the modal to close, we need to turn off the pointer events.
  const baseStyles = css`
    display: grid;
    height: 100%;
    width: 100%;
    outline: none;
    pointer-events: none;
  `;
  switch (props.size) {
    case 'm':
      return [
        baseStyles,
        css`
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
            [row3-end]
            / minmax(${customProperties.spacingXl}, 1fr)
            ${customProperties.constraintM} minmax(
              ${customProperties.spacingXl},
              1fr
            );
        `,
      ];
    case 'scale':
      return [
        baseStyles,
        css`
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
            [row3-end]
            / ${customProperties.spacingXl} 1fr ${customProperties.spacingXl};
        `,
      ];

    default:
      // size: l
      return [
        baseStyles,
        css`
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
            [row3-end]
            / minmax(${customProperties.spacingXl}, 1fr)
            ${customProperties.constraintL} minmax(
              ${customProperties.spacingXl},
              1fr
            );
        `,
      ];
  }
};

export const getModalOverlayStyles = () => css`
  display: flex;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(32, 62, 72, 0.5);
  opacity: 1;
`;
