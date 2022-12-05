import type { ReactElement, SyntheticEvent } from 'react';
import { useIntl, type IntlShape } from 'react-intl';
import { css } from '@emotion/react';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import PrimaryButton from '@commercetools-uikit/primary-button';
import Spacings from '@commercetools-uikit/spacings';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import { designTokens as appKitDesignTokens } from '../../../theming';

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
  labelSecondary: Label;
  labelPrimary: Label;
  onCancel: (event: SyntheticEvent) => void;
  onConfirm: (event: SyntheticEvent) => void;
  isPrimaryButtonDisabled: boolean;
  dataAttributesPrimaryButton: { [key: string]: string };
  dataAttributesSecondaryButton: { [key: string]: string };
  children?: never;
  iconLeftSecondaryButton?: ReactElement;
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
    <div
      css={css`
        margin-top: ${appKitDesignTokens.marginTopForDialogFooter};
      `}
    >
      <Spacings.Inline scale="m" alignItems="center" justifyContent="flex-end">
        <SecondaryButton
          label={getFormattedLabel(props.labelSecondary, intl)}
          onClick={props.onCancel}
          iconLeft={props.iconLeftSecondaryButton}
          {...filterDataAttributes(props.dataAttributesSecondaryButton)}
        />
        <PrimaryButton
          label={getFormattedLabel(props.labelPrimary, intl)}
          onClick={props.onConfirm}
          isDisabled={props.isPrimaryButtonDisabled}
          {...filterDataAttributes(props.dataAttributesPrimaryButton)}
        />
      </Spacings.Inline>
    </div>
  );
};
DialogFooter.displayName = 'DialogFooter';
DialogFooter.defaultProps = defaultProps;

export default DialogFooter;
