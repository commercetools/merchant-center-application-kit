import React from 'react';
import { useIntl, MessageDescriptor } from 'react-intl';
import PrimaryButton from '@commercetools-uikit/primary-button';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import IconButton from '@commercetools-uikit/icon-button';
import { BinLinearIcon } from '@commercetools-uikit/icons';
import { sharedMessages } from '@commercetools-frontend/i18n';
import filterDataAttributes from '../../../utils/filter-data-attributes';

type Label = string | MessageDescriptor;
type Props = {
  label: Label;
  onClick: (event: React.SyntheticEvent) => void;
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

const FormPrimaryButton = (props: Props) => {
  const label = useFormattedLabel(props.label);

  return (
    <PrimaryButton
      label={label}
      onClick={props.onClick}
      isDisabled={props.isDisabled}
      {...filterDataAttributes(props.dataAttributes)}
    />
  );
};

FormPrimaryButton.displayName = 'FormPrimaryButton';
FormPrimaryButton.defaultProps = primaryDefaultProps;

const secondaryDefaultProps: Pick<
  Props,
  'label' | 'isDisabled' | 'dataAttributes'
> = {
  label: sharedMessages.cancel,
  isDisabled: false,
  dataAttributes: {},
};

const FormSecondaryButton = (props: Props) => {
  const label = useFormattedLabel(props.label);

  return (
    <SecondaryButton
      label={label}
      onClick={props.onClick}
      isDisabled={props.isDisabled}
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
