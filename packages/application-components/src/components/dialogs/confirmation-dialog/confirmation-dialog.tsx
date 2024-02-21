import { ReactNode, SyntheticEvent } from 'react';
import { sharedMessages } from '@commercetools-frontend/i18n';
import DialogContainer from '../internals/dialog-container';
import DialogContent from '../internals/dialog-content';
import DialogFooter from '../internals/dialog-footer';
import DialogHeader, { TextTitle } from '../internals/dialog-header';

// NOTE: the `MessageDescriptor` type is exposed by `react-intl`.
// However, we need to explicitly define this otherwise the prop-types babel plugin
// does not recognize the object shape.
type MessageDescriptor = {
  id: string;
  description?: string | object;
  defaultMessage?: string;
};
type Label = string | MessageDescriptor;
export type TConfirmationDialogProps = {
  isOpen: boolean;
  onClose?: (event: SyntheticEvent) => void;
  title: ReactNode;
  ariaTitle?: string;
  size?: 'm' | 'l' | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 16 | 'scale';
  zIndex?: number;
  children: ReactNode;
  labelSecondary: Label;
  labelPrimary: Label;
  isPrimaryButtonDisabled?: boolean;
  onCancel: (event: SyntheticEvent) => void;
  onConfirm: (event: SyntheticEvent) => void;
  dataAttributesSecondaryButton?: { [key: string]: string };
  dataAttributesPrimaryButton?: { [key: string]: string };
  getParentSelector?: () => HTMLElement;
};
const defaultProps: Pick<
  TConfirmationDialogProps,
  'labelSecondary' | 'labelPrimary'
> = {
  labelSecondary: sharedMessages.cancel,
  labelPrimary: sharedMessages.confirm,
};

const ConfirmationDialog = (props: TConfirmationDialogProps) => (
  <DialogContainer
    isOpen={props.isOpen}
    onClose={props.onClose}
    size={props.size}
    zIndex={props.zIndex}
    title={props.title}
    ariaTitle={props.ariaTitle}
    getParentSelector={props.getParentSelector}
  >
    <DialogHeader title={props.title} onClose={props.onClose} />
    <DialogContent>{props.children}</DialogContent>
    <DialogFooter
      labelSecondary={props.labelSecondary}
      labelPrimary={props.labelPrimary}
      isPrimaryButtonDisabled={props.isPrimaryButtonDisabled}
      onCancel={props.onCancel}
      onConfirm={props.onConfirm}
      dataAttributesSecondaryButton={props.dataAttributesSecondaryButton}
      dataAttributesPrimaryButton={props.dataAttributesPrimaryButton}
    />
  </DialogContainer>
);
ConfirmationDialog.displayName = 'ConfirmationDialog';
ConfirmationDialog.defaultProps = defaultProps;
// This is a convenience proxy export to expose pre-defined Intl messages defined in the `@commercetools-frontend/i18n` package.
// The Intl messages can be used for button labels.
ConfirmationDialog.Intl = sharedMessages;
// Allow consumers who want to use a custom title to reuse the same title styles
// as the default dialog title.
ConfirmationDialog.TextTitle = TextTitle;

export default ConfirmationDialog;
