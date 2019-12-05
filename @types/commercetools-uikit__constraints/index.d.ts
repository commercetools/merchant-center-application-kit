declare module '@commercetools-uikit/constraints' {
  import * as React from 'react';

  export const version: string;

  // <ConstraintsHorizontal>
  export type ConstraintsHorizontalProps = {
    constraint: 'xs' | 's' | 'm' | 'l' | 'xl' | 'scale';
    children: React.ReactNode;
  };
  export const ConstraintsHorizontal: {
    (props: ConstraintsHorizontalProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<ConstraintsHorizontalProps, 'constraint'>;
  };

  const Constraints: {
    Horizontal: typeof ConstraintsHorizontal;
  };
  export default Constraints;
}
