declare module '@commercetools-uikit/flat-button' {
  import * as React from 'react';

  export const version: string;

  // <FlatButton>
  export type FlatButtonProps = {
    tone: 'primary' | 'secondary';
    type: 'submit' | 'reset' | 'button';
    label: string;
    onClick: (event: React.SyntheticEvent) => void;
    icon?: React.ReactNode;
    iconPosition: 'left' | 'right';
    isDisabled: boolean;
    children?: never;
  };
  const FlatButton: {
    (props: FlatButtonProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<
      FlatButtonProps,
      'tone' | 'type' | 'iconPosition' | 'isDisabled'
    >;
  };
  export default FlatButton;
}
