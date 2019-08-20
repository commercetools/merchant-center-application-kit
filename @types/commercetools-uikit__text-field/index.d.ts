declare module '@commercetools-uikit/text-field' {
  import * as React from 'react';
  import { FormikValues } from 'formik';

  export const version: string;

  /* Inputs and Fields */
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
  export type CustomFormikErrorsField = {
    [errorKey: string]: boolean; // <-- our ui-kit components use a boolean flag to indicate the error
  };
  export type CustomFormikErrors<Values = FormikValues> = {
    [K in keyof Values]?: CustomFormikErrorsField;
  };
  export interface FieldComponentProps {
    horizontalConstraint: 's' | 'm' | 'l' | 'xl' | 'scale';
    touched?: boolean;
  }
  export interface FieldComponentLabelProps {
    title: string | React.ReactElement;
    hint?: string | React.ReactElement;
    description?: string | React.ReactElement;
    onInfoButtonClick?: (event: React.SyntheticEvent) => void;
    hintIcon?: React.ReactElement;
    badge?: React.ReactNode;
    isRequired?: boolean;
  }
  export interface FieldComponentErrorsProps {
    errors?: CustomFormikErrorsField;
    renderError?: (key: string) => JSX.Element;
  }

  // <TextField>
  export interface TextFieldProps
    extends InputComponentProps<'text', string>,
      FieldComponentProps,
      FieldComponentLabelProps,
      FieldComponentErrorsProps {
    autoComplete?: string;
    isAutofocussed?: boolean;
    isReadOnly?: boolean;
    placeholder?: string;
  }
  const TextField: {
    (props: TextFieldProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<TextFieldProps, 'horizontalConstraint' | 'type'>;
  };
  export default TextField;
}
