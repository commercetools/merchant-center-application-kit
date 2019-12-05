declare module '@commercetools-uikit/icon-button' {
  import * as React from 'react';

  export const version: string;

  // <IconButton>
  export type IconButtonProps = {
    type: 'submit' | 'reset' | 'button';
    label: string;
    icon?: React.ReactNode;
    isDisabled?: boolean;
    onClick?: (event: React.SyntheticEvent) => void;
    shape: 'round' | 'square';
    size: 'small' | 'medium' | 'big';
    isToggleButton: boolean;
    // NOTE: only required if `isToggleButton` is defined
    isToggled?: boolean;
    // NOTE: only valid if `isToggleButton` is defined
    theme: 'default' | 'primary' | 'info';
    children?: never;
  };
  const IconButton: {
    (props: IconButtonProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<
      IconButtonProps,
      'type' | 'theme' | 'size' | 'shape' | 'isToggleButton'
    >;
  };
  export default IconButton;
}
