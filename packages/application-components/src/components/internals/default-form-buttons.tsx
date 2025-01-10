import type { ReactElement, SyntheticEvent } from 'react';
import { useIntl } from 'react-intl';
import { sharedMessages } from '@commercetools-frontend/i18n';
import type { TIconProps } from '@commercetools-uikit/design-system';
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
  label?: Label;
  onClick: (event: SyntheticEvent) => void;
  isDisabled?: boolean;
  dataAttributes?: { [key: string]: string };
  children?: never;
};

const useFormattedLabel = (label: Label) => {
  const intl = useIntl();

  return typeof label === 'string' ? label : intl.formatMessage(label);
};

type PrimaryButtonProps = {
  iconLeft?: ReactElement<TIconProps>;
} & Props;

const FormPrimaryButton = ({
  label = sharedMessages.confirm,
  isDisabled = false,
  dataAttributes = {},
  ...props
}: PrimaryButtonProps) => {
  const _label = useFormattedLabel(label);

  return (
    <PrimaryButton
      label={_label}
      onClick={props.onClick}
      isDisabled={isDisabled}
      iconLeft={props.iconLeft}
      {...filterDataAttributes(dataAttributes)}
    />
  );
};

FormPrimaryButton.displayName = 'FormPrimaryButton';

type SecondaryButtonProps = {
  iconLeft?: ReactElement<TIconProps>;
} & Props;

const FormSecondaryButton = ({
  label = sharedMessages.cancel,
  isDisabled = false,
  dataAttributes = {},
  ...props
}: SecondaryButtonProps) => {
  const _label = useFormattedLabel(label);

  return (
    <SecondaryButton
      label={_label}
      onClick={props.onClick}
      isDisabled={isDisabled}
      iconLeft={props.iconLeft}
      {...filterDataAttributes(dataAttributes)}
    />
  );
};

FormSecondaryButton.displayName = 'FormSecondaryButton';

const FormDeleteButton = ({
  label = sharedMessages.delete,
  isDisabled = false,
  dataAttributes = {},
  ...props
}: Props) => {
  const _label = useFormattedLabel(label);

  return (
    <IconButton
      icon={<BinLinearIcon />}
      label={_label}
      onClick={props.onClick}
      isDisabled={isDisabled}
      {...filterDataAttributes(dataAttributes)}
    />
  );
};

FormDeleteButton.displayName = 'FormDeleteButton';

export { FormPrimaryButton, FormSecondaryButton, FormDeleteButton };
