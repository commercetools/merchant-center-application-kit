import React from 'react';
import { useIntl, MessageDescriptor, IntlShape } from 'react-intl';
import {
  Spacings,
  PrimaryButton,
  SecondaryButton,
} from '@commercetools-frontend/ui-kit';
import filterDataAttributes from '../../../utils/filter-data-attributes';

type Label = string | MessageDescriptor;
type Props = {
  labelSecondaryButton: Label;
  labelPrimaryButton: Label;
  onSecondaryButtonClick: (event: React.SyntheticEvent) => void;
  onPrimaryButtonClick: (event: React.SyntheticEvent) => void;
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

const ModalPageHeaderDefaultControls = (props: Props) => {
  const intl = useIntl();
  return (
    <Spacings.Inline alignItems="flex-end">
      <SecondaryButton
        label={getFormattedLabel(props.labelSecondaryButton, intl)}
        onClick={props.onSecondaryButtonClick}
        {...filterDataAttributes(props.dataAttributesSecondaryButton)}
      />
      <PrimaryButton
        label={getFormattedLabel(props.labelPrimaryButton, intl)}
        onClick={props.onPrimaryButtonClick}
        isDisabled={props.isPrimaryButtonDisabled}
        {...filterDataAttributes(props.dataAttributesPrimaryButton)}
      />
    </Spacings.Inline>
  );
};
ModalPageHeaderDefaultControls.displayName = 'ModalPageHeaderDefaultControls';
ModalPageHeaderDefaultControls.defaultProps = defaultProps;

export default ModalPageHeaderDefaultControls;
