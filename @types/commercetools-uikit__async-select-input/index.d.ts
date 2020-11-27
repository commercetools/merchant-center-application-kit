declare module '@commercetools-uikit/async-select-input' {
  import * as React from 'react';
  import { Props as ReactSelectProps, OptionTypeBase } from 'react-select';

  export const version: string;

  type TAsyncOptions = {
    label: string;
    value: string;
  };

  // <SelectInput>
  export type AsyncSelectInputProps<
    OptionType extends OptionTypeBase = { label: string; value: string }
  > = {
    horizontalConstraint?: 's' | 'm' | 'l' | 'xl' | 'scale';
    hasError?: boolean;
    isReadOnly?: boolean;
    menuPortalZIndex: number;
    showOptionGroupDivider?: boolean;
    // Custom mapped props to be forwarded to react-select
    isAutofocussed?: boolean;
    containerId?: string;
    value: string | string[];
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    loadOptions?: (value: unknown) => void;
    defaultOptions?: string[] | TAsyncOptions[];
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
