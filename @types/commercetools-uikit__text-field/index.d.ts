declare module '@commercetools-uikit/text-field' {
  import * as React from 'react';
  import { FormikValues } from 'formik';
  import { TTextInputProps } from '@commercetools-uikit/text-input';

  export const version: string;

  /* Inputs and Fields */

  export type CustomFormikErrorsField = {
    [errorKey: string]: boolean; // <-- our ui-kit components use a boolean flag to indicate the error
  };
  export type CustomFormikErrors<Values = FormikValues> = {
    [K in keyof Values]?: CustomFormikErrorsField;
  };
  export interface FieldComponentProps {
    horizontalConstraint?:
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
    extends TTextInputProps,
      FieldComponentProps,
      FieldComponentLabelProps,
      FieldComponentErrorsProps {}
  const TextField: {
    (props: TextFieldProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<TextFieldProps, 'horizontalConstraint'>;
  };
  export default TextField;
}
