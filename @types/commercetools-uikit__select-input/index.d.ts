declare module '@commercetools-uikit/select-input' {
  import * as React from 'react';
  import {
    Props as ReactSelectProps,
    OptionTypeBase,
    OptionProps,
    ValueContainerProps,
  } from 'react-select';

  export const version: string;

  // <SelectInput>
  export type SelectInputProps<
    OptionType extends OptionTypeBase = { label: string; value: string }
  > = {
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
    hasError?: boolean;
    hasWarning?: boolean;
    isReadOnly?: boolean;
    menuPortalZIndex: number;
    showOptionGroupDivider?: boolean;
    // Custom mapped props to be forwarded to react-select
    isAutofocussed?: boolean;
    containerId?: string;
    value: string | string[];
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
  const SelectInput: {
    <OptionType extends OptionTypeBase = { label: string; value: string }>(
      props: SelectInputProps<OptionType>
    ): JSX.Element;
    displayName: string;
    defaultProps: Pick<SelectInputProps, 'maxMenuHeight' | 'menuPortalZIndex'>;
    // Static fields
    isTouched: (touched: unknown) => boolean;
    // Aliases from react-select built-in components
    Option: {
      <OptionType extends OptionTypeBase = { label: string; value: string }>(
        props: OptionProps<OptionType, false>
      ): JSX.Element;
    };
    ValueContainer: {
      <OptionType extends OptionTypeBase = { label: string; value: string }>(
        props: ValueContainerProps<OptionType, false>
      ): JSX.Element;
    };
  };
  export default SelectInput;
}
