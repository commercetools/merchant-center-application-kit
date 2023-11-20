import { css, type SerializedStyles } from '@emotion/react';
import { customProperties } from '@commercetools-uikit/design-system';
import type { TModalPageSize } from './modal-page';

type StyleProps = {
  zIndex?: number;
  size: TModalPageSize;
};

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

export const getContainerStyles = (props: StyleProps): SerializedStyles => css`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: ${props.size !== 'scale'
    ? `${stylesBySize[props.size].width} !important`
    : stylesBySize.scale.width};
  display: flex;
  flex-direction: column;
  background-color: ${customProperties.colorSurface};
  box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.1);
  outline: 0;
  transform: translate3d(
    ${props.size !== 'scale' ? stylesBySize[props.size].width : '30px'},
    0,
    0
  );
  transition: transform ${stylesBySize[props.size].transitionTime}ms ease;
`;

export const getOverlayStyles = (props: StyleProps): SerializedStyles => css`
  position: absolute;
  z-index: ${typeof props.zIndex === 'number'
    ? // Use `!important` to overwrite the default value assigned by the Stacking Layer System.
      `${props.zIndex} !important`
    : 'auto'};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: hsla(195, 35%, 20%, 0.05);
  opacity: 0;
  transition: transform ${stylesBySize[props.size].transitionTime}ms ease;
`;

export const getAfterOpenContainerAnimation = (): SerializedStyles => css`
  transform: translate3d(0, 0, 0) !important;
`;

export const getAfterOpenOverlayAnimation = (): SerializedStyles => css`
  opacity: 1 !important;
`;

export const getBeforeCloseContainerAnimation = (
  props: StyleProps
): SerializedStyles => css`
  transform: translate3d(
    ${props.size !== 'scale' ? stylesBySize[props.size].width : '30px'},
    ,
    0,
    0
  ) !important;
`;

export const getBeforeCloseOverlayAnimation = (): SerializedStyles => css`
  opacity: 0 !important;
`;
