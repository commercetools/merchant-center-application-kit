declare module '@commercetools-uikit/async-select-input' {
  import * as React from 'react';
  import { Props as ReactSelectProps, OptionTypeBase } from 'react-select';

  export const version: string;

  type TAsyncOption = {
    label: string;
    value: string;
  };

  // <SelectInput>
  export type AsyncSelectInputProps<
    OptionType extends OptionTypeBase = { label: string; value: string }
  > = {
    hasError?: boolean;
    isReadOnly?: boolean;
    menuPortalZIndex: number;
    containerId?: string;
    name: string;
    value?: string | string[] | TAsyncOption | null;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    loadOptions?: (value: unknown) => void;
    defaultOptions?: string[] | TAsyncOption[];
  } & Pick<
    ReactSelectProps<OptionType>,
    | 'aria-label'
    | 'aria-labelledby'
    | 'backspaceRemovesValue'
    | 'components'
    | 'filterOption'
    | 'id'
    | 'inputValue'
    | 'isClearable'
    | 'isDisabled'
    | 'isOptionDisabled'
    | 'isMulti'
    | 'isSearchable'
    | 'maxMenuHeight'
    | 'menuPortalTarget'
    | 'menuShouldBlockScroll'
    | 'name'
    | 'noOptionsMessage'
    | 'onBlur'
    | 'onFocus'
    | 'onInputChange'
    | 'options'
    | 'placeholder'
    | 'tabIndex'
    | 'tabSelectsValue'
  >;

  // React Selecte's OptionProps is a union of `CommonProps`, `State` and `PropsWithStyles`
  // We want keep props optional
  type DataProp = {
    label: string;
    value: string;
  };

  // We do not use the OptionProps, since it comes as a union with required fields
  // Another approach of doing this, is to specify `defaultProps` with prefilled values
  type AsyncOptionProps = {
    data: DataProp;
    children: React.ReactNode;
  };

  const AsyncSelectInput: {
    <OptionType extends OptionTypeBase>(
      props: AsyncSelectInputProps<OptionType>
    ): JSX.Element;
    displayName: string;
    defaultProps: Pick<
      AsyncSelectInputProps,
      'maxMenuHeight' | 'menuPortalZIndex'
    >;
    // Static fields
    isTouched: (touched: unknown) => boolean;
    Option: {
      (props?: AsyncOptionProps): JSX.Element;
    };
  };

  export default AsyncSelectInput;
}
