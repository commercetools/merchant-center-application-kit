import { keyframes, css } from '@emotion/react';
import styled from '@emotion/styled';
import { Content } from '@radix-ui/react-dialog';
import { PORTALS_CONTAINER_INDENTATION_SIZE } from '@commercetools-frontend/constants';
import { designTokens } from '@commercetools-uikit/design-system';
import type { TModalPageSize } from './modal-page';

export const stylesBySize = {
  '10': {
    width: '600px',
    transitionTime: 200,
  },
  '20': {
    width: '900px',
    transitionTime: 200,
  },
  '30': {
    width: '1200px',
    transitionTime: 200,
  },
  scale: {
    width: '100%',
    transitionTime: 300,
  },
};

const overlayShow = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

// we can't use Overlay from Radix-ui because it doesn't appear in DOM when Dialog.Root is rendered with `modal={false}`
export const ModalOverlay = styled.div<{
  size: TModalPageSize;
  zIndex?: number;
}>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: hsla(195, 35%, 20%, 0.05);
  z-index: ${({ zIndex }) =>
    // Use `!important` to overwrite the default value assigned by the Stacking Layer System.
    typeof zIndex === 'number' ? `${zIndex} !important` : 'inherit'};
  opacity: 0;

  ${({ size }) => {
    const transitionDuration = stylesBySize[size].transitionTime;
    return css`
      animation: ${overlayShow} ${transitionDuration}ms ease-out forwards;
    `;
  }}
`;

const getContentShowAnimation = (size: TModalPageSize) =>
  keyframes({
    '0%': {
      opacity: 0,
      transform: `translate3d(${size !== 'scale' ? stylesBySize[size].width : '30px'
        }, 0, 0)`,
    },
    '100%': {
      opacity: 1,
      transform: `translate3d(0, 0, 0)`,
    },
  });

const getContentHideAnimation = (size: TModalPageSize) =>
  keyframes({
    '0%': {
      opacity: 1,
      transform: `translate3d(0, 0, 0)`,
    },
    '100%': {
      opacity: 0,
      transform: `translate3d(${size !== 'scale' ? stylesBySize[size].width : '30px'
        }, 0, 0)`,
    },
  });

export const ModalContent = styled(Content, {
  shouldForwardProp: (prop) => prop !== 'size',
}) <{ size: TModalPageSize }>`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: ${({ size }) =>
    size !== 'scale'
      ? // In case we're using a specific size, we want it to be used until there's no space left.
      // In such scenario, we want the modal to be as wide as possible, but using the shared indentation width size.
      `min(${stylesBySize[size].width}, calc(100% - ${PORTALS_CONTAINER_INDENTATION_SIZE})) !important`
      : stylesBySize.scale.width};
  display: flex;
  flex-direction: column;
  background-color: ${designTokens.colorSurface};
  box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.1);
  outline: 0;
  z-index: inherit;

  &[data-state='open'] {
    animation: ${({ size }) => getContentShowAnimation(size)} 300ms ease
      forwards;
  }

  &[data-state='closed'] {
    animation: ${({ size }) => getContentHideAnimation(size)} 300ms ease
      forwards;
  }
`;
