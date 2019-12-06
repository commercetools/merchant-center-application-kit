declare module '@commercetools-uikit/primary-button' {
  import * as React from 'react';

  export const version: string;

  // <PrimaryButton>
  export type PrimaryButtonProps = {
    type: 'submit' | 'reset' | 'button';
    label: string;
    // Any valid HTML attributes to be passed to the button element
    buttonAttributes?: { [key: string]: string };
    iconLeft?: React.ReactNode;
    isToggleButton: boolean;
    // NOTE: only required if `isToggleButton` is defined
    isToggled?: boolean;
    isDisabled?: boolean;
    onClick?: (event: React.SyntheticEvent) => void;
    size: 'big' | 'small';
    tone: 'urgent' | 'primary';
    children?: never;
  };
  const PrimaryButton: {
    (props: PrimaryButtonProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<
      PrimaryButtonProps,
      'type' | 'size' | 'isToggleButton' | 'tone'
    >;
  };
  export default PrimaryButton;
}
