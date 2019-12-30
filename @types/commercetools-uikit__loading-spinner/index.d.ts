declare module '@commercetools-uikit/loading-spinner' {
  import * as React from 'react';

  export const version: string;

  // <LoadingSpinner>
  export type LoadingSpinnerProps = {
    children?: React.ReactNode;
  };
  const LoadingSpinner: {
    (props: LoadingSpinnerProps): JSX.Element;
    displayName: string;
  };
  export default LoadingSpinner;
}
