declare module '@commercetools-uikit/flat-button' {
  import * as React from 'react';

  export const version: string;

  // Taken from: https://www.erikverweij.dev/blog/making-your-components-extensible-with-typescript/
  type MergeElementProps<
    T extends React.ElementType,
    P extends object = {}
  > = Omit<React.ComponentPropsWithRef<T>, keyof P> & P;

  // <FlatButton>
  type BaseProps = {
    tone: 'primary' | 'secondary';
    type: 'submit' | 'reset' | 'button';
    label: string;
    icon?: React.ReactNode;
    iconPosition: 'left' | 'right';
    isDisabled: boolean;
    children?: never;
  };
  export type FlatButtonProps<T extends React.ElementType = 'button'> = {
    as?: T;
  } & MergeElementProps<T, BaseProps>;
  const FlatButton: {
    <T extends React.ElementType = 'button'>(
      props: FlatButtonProps<T>
    ): JSX.Element;
    displayName: string;
    defaultProps: Pick<
      BaseProps,
      'tone' | 'type' | 'iconPosition' | 'isDisabled'
    >;
  };
  export default FlatButton;
}
