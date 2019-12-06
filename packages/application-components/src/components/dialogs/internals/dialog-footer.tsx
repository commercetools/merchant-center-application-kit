import React from 'react';
import { useIntl, MessageDescriptor, IntlShape } from 'react-intl';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import PrimaryButton from '@commercetools-uikit/primary-button';
import Spacings from '@commercetools-uikit/spacings';
import filterDataAttributes from '../../../utils/filter-data-attributes';

type Label = string | MessageDescriptor;
type Props = {
  labelSecondary: Label;
  labelPrimary: Label;
  onCancel: (event: React.SyntheticEvent) => void;
  onConfirm: (event: React.SyntheticEvent) => void;
  isPrimaryButtonDisabled: boolean;
  dataAttributesPrimaryButton: { [key: string]: string };
  dataAttributesSecondaryButton: { [key: string]: string };
  children?: never;
};
const defaultProps: Pick<
  Props,
  | 'isPrimaryButtonDisabled'
  | 'dataAttributesPrimaryButton'
  | 'dataAttributesSecondaryButton'
> = {
  isPrimaryButtonDisabled: false,
  dataAttributesPrimaryButton: {},
  dataAttributesSecondaryButton: {},
};

const getFormattedLabel = (label: Label, intl: IntlShape) =>
  typeof label === 'string' ? label : intl.formatMessage(label);

const DialogFooter = (props: Props) => {
  const intl = useIntl();
  return (
    <Spacings.Inline scale="m" alignItems="center" justifyContent="flex-end">
      <SecondaryButton
        label={getFormattedLabel(props.labelSecondary, intl)}
        onClick={props.onCancel}
        {...filterDataAttributes(props.dataAttributesSecondaryButton)}
      />
      <PrimaryButton
        label={getFormattedLabel(props.labelPrimary, intl)}
        onClick={props.onConfirm}
        isDisabled={props.isPrimaryButtonDisabled}
        {...filterDataAttributes(props.dataAttributesPrimaryButton)}
      />
    </Spacings.Inline>
  );
};
DialogFooter.displayName = 'DialogFooter';
DialogFooter.defaultProps = defaultProps;

export default DialogFooter;
