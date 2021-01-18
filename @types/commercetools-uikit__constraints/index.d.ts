declare module '@commercetools-uikit/constraints' {
  import * as React from 'react';

  export const version: string;

  type TMaxProp =
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 'scale'
    | 'auto';
  // <ConstraintsHorizontal>
  export type ConstraintsHorizontalProps = {
    max?: TMaxProp;
    constraint?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'scale';
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
