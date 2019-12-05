declare module '@commercetools-uikit/secondary-icon-button' {
  import * as React from 'react';

  export const version: string;

  // <SecondaryIconButton>
  export type SecondaryIconButtonProps = {
    // NOTE: only used when `linkTo` is not defined
    type: 'submit' | 'reset' | 'button';
    icon: React.ReactNode;
    color: 'solid' | 'primary';
    label: string;
    onClick: (event: React.SyntheticEvent) => void;
    isDisabled: boolean;
    children?: never;
  };
  const SecondaryIconButton: {
    (props: SecondaryIconButtonProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<
      SecondaryIconButtonProps,
      'color' | 'type' | 'isDisabled'
    >;
  };
  export default SecondaryIconButton;
}
