import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { customProperties } from '@commercetools-uikit/design-system';

type Props = {
  shape: 'dot' | 'rect';
  size: 's' | 'm' | 'l' | 'xl';
};

const animationPulse = keyframes`
  0% {
    background-color: ${customProperties.colorNeutral};
  }
  100% {
    background-color: ${customProperties.colorNeutral95};
  }
`;

const getWidthBySize = (props: Props) => {
  switch (props.shape) {
    case 'dot':
      switch (props.size) {
        case 's':
          return customProperties.spacingS;
        case 'm':
          return customProperties.spacingM;
        case 'l':
          return customProperties.spacingL;
        case 'xl':
          return customProperties.spacingXl;
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
          return customProperties.borderRadius4;
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
      return customProperties.borderRadius4;
    default:
      return 'none';
  }
};

const LoadingPlaceholder = styled.div<Props>`
  background-color: ${customProperties.colorNeutral};
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
