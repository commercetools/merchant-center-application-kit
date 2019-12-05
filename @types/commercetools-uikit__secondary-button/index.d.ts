declare module '@commercetools-uikit/secondary-button' {
  import * as React from 'react';

  export const version: string;

  // <SecondaryButton>
  export type SecondaryButtonProps = {
    // NOTE: only used when `linkTo` is not defined
    type: 'submit' | 'reset' | 'button';
    label: string;
    // Any valid HTML attributes to be passed to the button element
    buttonAttributes?: { [key: string]: string };
    iconLeft?: React.ReactNode;
    isToggleButton: boolean;
    // NOTE: only required if `isToggleButton` is defined
    isToggled?: boolean;
    // NOTE: only valid if `isToggleButton` is defined
    theme: 'default' | 'info';
    isDisabled?: boolean;
    onClick?: (event: React.SyntheticEvent) => void;
    linkTo?:
      | string
      | {
          pathname: string;
          search?: string;
          query?: { [key: string]: string };
        };
    children?: never;
  };
  const SecondaryButton: {
    (props: SecondaryButtonProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<
      SecondaryButtonProps,
      'type' | 'theme' | 'isToggleButton'
    >;
  };
  export default SecondaryButton;
}
