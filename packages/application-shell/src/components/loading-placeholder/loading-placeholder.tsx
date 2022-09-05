import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { designTokens } from '@commercetools-uikit/design-system';

type Props = {
  shape: 'dot' | 'rect';
  size: 's' | 'm' | 'l' | 'xl';
};

const animationPulse = keyframes`
  0% {
    background-color: ${designTokens.colorNeutral};
  }
  100% {
    background-color: ${designTokens.colorNeutral95};
  }
`;

const getWidthBySize = (props: Props) => {
  switch (props.shape) {
    case 'dot':
      switch (props.size) {
        case 's':
          return designTokens.spacingS;
        case 'm':
          return designTokens.spacingM;
        case 'l':
          return designTokens.spacingL;
        case 'xl':
          return designTokens.spacingXl;
        default:
          return 'auto';
      }
    case 'rect':
      switch (props.size) {
        case 's':
          return '150px';
        case 'm':
          return '300px';
        case 'l':
          return '450px';
        case 'xl':
          return '600px';
        default:
          return 'auto';
      }
    default:
      return 'auto';
  }
};
const getHeightBySize = (props: Props) => {
  switch (props.shape) {
    case 'dot':
      return getWidthBySize(props);
    case 'rect':
      return '32px';
    default:
      return 'auto';
  }
};
const getRadiusBySize = (props: Props) => {
  switch (props.shape) {
    case 'dot':
      switch (props.size) {
        case 's':
          return designTokens.borderRadius4;
        case 'm':
          return '8px';
        case 'l':
          return '12px';
        case 'xl':
          return '16px';
        default:
          return 'none';
      }
    case 'rect':
      return designTokens.borderRadius4;
    default:
      return 'none';
  }
};

const LoadingPlaceholder = styled.div<Props>`
  background-color: ${designTokens.colorNeutral};
  animation-name: ${animationPulse};
  animation-duration: 1s;
  animation-timing-function: ease-out;
  animation-delay: 0;
  animation-direction: alternate;
  animation-iteration-count: infinite;

  width: ${getWidthBySize};
  height: ${getHeightBySize};
  border-radius: ${getRadiusBySize};
`;
LoadingPlaceholder.displayName = 'LoadingPlaceholder';

export default LoadingPlaceholder;
