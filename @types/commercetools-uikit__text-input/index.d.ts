declare module '@commercetools-uikit/text-input' {
  import * as React from 'react';

  export const version: string;

  /* Inputs */
  export type InputType =
    | 'text'
    | 'submit'
    | 'button'
    | 'reset'
    | 'password'
    | 'checkbox'
    | 'radio'
    | 'file'
    | 'hidden'
    | 'image';
  export interface InputComponentProps<Type extends InputType, Value> {
    id?: string;
    name?: string;
    type: Type;
    value: Value;
    onChange: (event: React.SyntheticEvent) => void;
    onBlur?: (event: React.SyntheticEvent) => void;
    onFocus?: (event: React.SyntheticEvent) => void;
    isDisabled?: boolean;
  }

  // <TextInput>
  export interface TextInputProps extends InputComponentProps<'text', string> {
    autoComplete?: string;
    isAutofocussed?: boolean;
    isReadOnly?: boolean;
    placeholder?: string;
  }
  const TextInput: {
    (props: TextInputProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<TextInputProps, 'type'>;
  };
  export default TextInput;
}
