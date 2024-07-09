import type { ReactElement, SyntheticEvent } from 'react';
import { useIntl } from 'react-intl';
import { sharedMessages } from '@commercetools-frontend/i18n';
import IconButton from '@commercetools-uikit/icon-button';
import { BinLinearIcon } from '@commercetools-uikit/icons';
import PrimaryButton from '@commercetools-uikit/primary-button';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import filterDataAttributes from '../../utils/filter-data-attributes';

// NOTE: the `MessageDescriptor` type is exposed by `react-intl`.
// However, we need to explicitly define this otherwise the prop-types babel plugin
// does not recognize the object shape.
type MessageDescriptor = {
  id: string;
  description?: string | object;
  defaultMessage?: string;
};
type Label = string | MessageDescriptor;
type Props = {
  label: Label;
  onClick: (event: SyntheticEvent) => void;
  isDisabled: boolean;
  dataAttributes: { [key: string]: string };
  children?: never;
};

const primaryDefaultProps: Pick<
  Props,
  'label' | 'isDisabled' | 'dataAttributes'
> = {
  label: sharedMessages.confirm,
  isDisabled: false,
  dataAttributes: {},
};

const useFormattedLabel = (label: Label) => {
  const intl = useIntl();

  return typeof label === 'string' ? label : intl.formatMessage(label);
};

type PrimaryButtonProps = {
  iconLeft?: ReactElement;
} & Props;

const FormPrimaryButton = (props: PrimaryButtonProps) => {
  const label = useFormattedLabel(props.label);

  return (
    <PrimaryButton
      label={label}
      onClick={props.onClick}
      isDisabled={props.isDisabled}
      iconLeft={props.iconLeft}
      {...filterDataAttributes(props.dataAttributes)}
    />
  );
};

FormPrimaryButton.displayName = 'FormPrimaryButton';
FormPrimaryButton.defaultProps = primaryDefaultProps;

type SecondaryButtonProps = {
  iconLeft?: ReactElement;
} & Props;

const secondaryDefaultProps: Pick<
  SecondaryButtonProps,
  'label' | 'isDisabled' | 'dataAttributes'
> = {
  label: sharedMessages.cancel,
  isDisabled: false,
  dataAttributes: {},
};

const FormSecondaryButton = (props: SecondaryButtonProps) => {
  const label = useFormattedLabel(props.label);

  return (
    <SecondaryButton
      label={label}
      onClick={props.onClick}
      isDisabled={props.isDisabled}
      iconLeft={props.iconLeft}
      {...filterDataAttributes(props.dataAttributes)}
    />
  );
};

FormSecondaryButton.displayName = 'FormSecondaryButton';
FormSecondaryButton.defaultProps = secondaryDefaultProps;

const deleteDefaultProps: Pick<
  Props,
  'label' | 'isDisabled' | 'dataAttributes'
> = {
  label: sharedMessages.delete,
  isDisabled: false,
  dataAttributes: {},
};

const FormDeleteButton = (props: Props) => {
  const label = useFormattedLabel(props.label);

  return (
    <IconButton
      icon={<BinLinearIcon />}
      label={label}
      onClick={props.onClick}
      isDisabled={props.isDisabled}
      {...filterDataAttributes(props.dataAttributes)}
    />
  );
};

FormDeleteButton.displayName = 'FormDeleteButton';
FormDeleteButton.defaultProps = deleteDefaultProps;

export { FormPrimaryButton, FormSecondaryButton, FormDeleteButton };
