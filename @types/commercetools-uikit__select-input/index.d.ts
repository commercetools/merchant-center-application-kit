declare module '@commercetools-uikit/select-input' {
  import * as React from 'react';
  import { Props as ReactSelectProps } from 'react-select';

  export const version: string;

  // <SelectInput>
  export type SelectInputProps = {
    horizontalConstraint?: 's' | 'm' | 'l' | 'xl' | 'scale';
    hasError?: boolean;
    hasWarning?: boolean;
    isReadOnly?: boolean;
    menuPortalZIndex: number;
    showOptionGroupDivider?: boolean;
    // Custom mapped props to be forwarded to react-select
    isAutofocussed?: boolean;
    containerId?: string;
    value: string | string[];
  } & Pick<
    ReactSelectProps,
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
    | 'onChange'
    | 'onFocus'
    | 'onInputChange'
    | 'options'
    | 'placeholder'
    | 'tabIndex'
    | 'tabSelectsValue'
  >;
  const SelectInput: {
    (props: SelectInputProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<SelectInputProps, 'maxMenuHeight' | 'menuPortalZIndex'>;
    // Static fields
    isTouched: (touched: unknown) => boolean;
  };
  export default SelectInput;
}
